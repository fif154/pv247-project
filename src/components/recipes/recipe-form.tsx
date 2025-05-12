'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  createRecipe,
  updateRecipe,
  saveRecipeIngredients,
} from '@/app/auth/recipes/actions';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import { Recipe } from '@/server/entities/models/recipe';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Upload, ImageIcon, Globe, Plus, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useUnits } from '@/queries/units';

type RecipeFormProps = {
  recipe?: Recipe; // Optional for edit mode
  isEditMode?: boolean;
};

type IngredientItem = {
  id: string;
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unitId: string;
  unitName: string;
};

// Create form schema for validation
const recipeFormSchema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  description: z.string().optional(),
  servings: z.number().min(1, 'At least 1 serving is required'),
  image: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function RecipeForm({ recipe, isEditMode = false }: RecipeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    recipe?.image || null
  );
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [activeImageTab, setActiveImageTab] = useState<string>('upload');

  // Fetch units from database
  const { data: units = [], isLoading: isLoadingUnits } = useUnits();

  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    recipe?.ingredients?.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      ingredientName: item.ingredient?.name || '',
      quantity: item.quantity,
      unitId: item.unitId,
      unitName: item.unit?.name || '',
    })) || []
  );

  const [newIngredient, setNewIngredient] = useState({
    ingredientName: '',
    quantity: 1,
    unitId: '',
  });

  // Initialize unitId with first unit from the fetched units once they're loaded
  useEffect(() => {
    if (units.length > 0 && !newIngredient.unitId) {
      setNewIngredient((prev) => ({
        ...prev,
        unitId: units[0].id,
      }));
    }
  }, [units, newIngredient.unitId]);

  // Form setup with validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe?.name || '',
      description: recipe?.description || '',
      servings: recipe?.servings || 1,
      image: recipe?.image || '',
    },
  });

  // Handle file drop for image upload
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImageFile(file);

        // Create a preview URL for the image
        const objectUrl = URL.createObjectURL(file);
        setImagePreview(objectUrl);
        setValue('image', objectUrl);
        setActiveImageTab('upload');
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  // Handle image URL input
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput) {
      setImagePreview(imageUrlInput);
      setValue('image', imageUrlInput);
      setImageFile(null);
    }
  };

  // Ingredient management
  const handleIngredientChange = (field: string, value: string | number) => {
    setNewIngredient((prev) => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    if (newIngredient.ingredientName && newIngredient.unitId) {
      const unit = units.find((u) => u.id === newIngredient.unitId);

      setIngredients((prev) => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          ingredientId: `temp-${Date.now()}`,
          ingredientName: newIngredient.ingredientName.trim(),
          quantity: newIngredient.quantity,
          unitId: newIngredient.unitId,
          unitName: unit?.name || '',
        },
      ]);

      // Reset form for next ingredient
      setNewIngredient({
        ingredientName: '',
        quantity: 1,
        unitId: units[0]?.id || '',
      });
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data: RecipeFormValues) => {
    setIsSubmitting(true);

    try {
      let imageUrl = imagePreview || '';

      // If there's a new image file, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const imageData = await response.json();
        imageUrl = imageData.url;
      }

      const recipeData = {
        name: data.name,
        description: data.description || '',
        servings: data.servings,
        image: imageUrl,
      };

      // First save the recipe
      let recipeId;
      if (isEditMode && recipe) {
        await updateRecipe({
          id: recipe.id,
          ...recipeData,
        });
        recipeId = recipe.id;
      } else {
        const newRecipe = await createRecipe(recipeData);
        recipeId = newRecipe.id;
      }

      // Now handle the ingredients
      if (recipeId) {
        try {
          // Prepare the payload for the server action
          const ingredientPayload = ingredients.map((ing) => {
            // Check if it's a new or existing ingredient
            const isNewIngredient = ing.ingredientId.startsWith('temp-');

            if (isNewIngredient) {
              console.log(`Preparing new ingredient: ${ing.ingredientName}`);
              // For new ingredients, send the name but no IDs
              return {
                name: ing.ingredientName,
                quantity: ing.quantity,
                unitId: ing.unitId,
              };
            } else {
              console.log(
                `Using existing ingredient: ${ing.ingredientName} (${ing.ingredientId})`
              );
              // For existing ingredients, send the IDs
              return {
                id: ing.id,
                ingredientId: ing.ingredientId,
                quantity: ing.quantity,
                unitId: ing.unitId,
              };
            }
          });

          console.log(
            `Sending ${ingredientPayload.length} ingredients to save`
          );

          await saveRecipeIngredients(recipeId, ingredientPayload);

          showSuccessToast(
            `Recipe ${isEditMode ? 'updated' : 'created'} successfully`
          );
          router.push('/auth/recipes');
        } catch (error) {
          console.error('Error saving ingredients:', error);
          showErrorToast('Failed to save recipe ingredients');
        }
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      showErrorToast(`Failed to ${isEditMode ? 'update' : 'create'} recipe`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-4xl font-bold">
            {isEditMode ? 'Edit Recipe' : 'Create Recipe'}
          </h1>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/auth/recipes')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="coral" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? 'Saving...'
                  : 'Creating...'
                : isEditMode
                  ? 'Save Recipe'
                  : 'Create Recipe'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Recipe Name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter recipe name"
                    className="p-3"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your recipe"
                    className="min-h-[200px] p-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min="1"
                    {...register('servings', { valueAsNumber: true })}
                    defaultValue={recipe?.servings || 1}
                    className="p-3"
                  />
                  {errors.servings && (
                    <p className="text-destructive text-sm">
                      {errors.servings.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                {ingredients.length > 0 ? (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">
                      Added Ingredients:
                    </h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {ingredients.map((ingredient, index) => (
                        <div
                          key={ingredient.id || index}
                          className="flex items-center justify-between bg-muted p-3 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {ingredient.ingredientName}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {ingredient.quantity} {ingredient.unitName}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm mb-4">
                    No ingredients added yet.
                  </p>
                )}

                <div className="space-y-4 border rounded-md p-4">
                  <h3 className="text-sm font-medium">Add New Ingredient:</h3>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <Label htmlFor="ingredientName" className="mb-2">
                        Ingredient
                      </Label>
                      <Input
                        id="ingredientName"
                        value={newIngredient.ingredientName}
                        onChange={(e) =>
                          handleIngredientChange(
                            'ingredientName',
                            e.target.value
                          )
                        }
                        placeholder="Enter ingredient name"
                        className="p-3"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="quantity" className="mb-2">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={newIngredient.quantity}
                        onChange={(e) =>
                          handleIngredientChange(
                            'quantity',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="p-3"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="unit" className="mb-2">
                        Unit
                      </Label>
                      <select
                        id="unit"
                        value={newIngredient.unitId}
                        onChange={(e) =>
                          handleIngredientChange('unitId', e.target.value)
                        }
                        className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm shadow-sm cursor-pointer"
                        disabled={isLoadingUnits}
                      >
                        {units.map((unit) => (
                          <option
                            key={unit.id}
                            value={unit.id}
                            className="bg-popover text-foreground"
                          >
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1 flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addIngredient}
                        disabled={
                          !newIngredient.ingredientName || isLoadingUnits
                        }
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recipe Image</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="upload"
                  value={activeImageTab}
                  onValueChange={setActiveImageTab}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4 cursor-pointer">
                    <TabsTrigger value="upload" className="cursor-pointer">
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="url" className="cursor-pointer">
                      Paste URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-4 text-center hover:bg-accent/5 transition-colors cursor-pointer ${
                        isDragActive
                          ? 'border-primary bg-accent/10'
                          : 'border-border'
                      }`}
                    >
                      <input {...getInputProps()} />

                      {imagePreview && activeImageTab === 'upload' ? (
                        <div className="space-y-4">
                          <div className="relative w-full h-48 mb-2 group">
                            <Image
                              src={imagePreview}
                              alt="Recipe preview"
                              fill
                              className="object-cover rounded-md"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md">
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImagePreview(null);
                                  setImageFile(null);
                                  setValue('image', '');
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm">
                            Click or drag to replace image
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">
                            {isDragActive
                              ? 'Drop the image here'
                              : "Drag 'n' drop an image here, or click to select"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: JPG, PNG, WebP
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="url">
                    <div className="space-y-4">
                      {imagePreview && activeImageTab === 'url' ? (
                        <div className="relative w-full h-48 mb-4 group">
                          <Image
                            src={imagePreview}
                            alt="Recipe preview"
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                setImagePreview(null);
                                setImageUrlInput('');
                                setValue('image', '');
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : null}

                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <Input
                            placeholder="Paste image URL here"
                            value={imageUrlInput}
                            onChange={handleImageUrlChange}
                            className="p-3"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleImageUrlSubmit}
                          disabled={!imageUrlInput}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Use URL
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}

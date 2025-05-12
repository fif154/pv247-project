'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useCallback } from 'react';
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
import { ImageIcon, Globe, Plus, Trash2, X } from 'lucide-react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type RecipeFormProps = {
  recipe?: Recipe; // Optional for edit mode
  isEditMode?: boolean;
  units: { id: string; name: string }[];
};

// Create a comprehensive form schema for validation
const recipeFormSchema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  description: z.string().optional(),
  servings: z.number().min(1, 'At least 1 serving is required'),
  image: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        id: z.string().optional(),
        ingredientId: z.string().optional(),
        ingredientName: z.string().min(1, 'Ingredient name is required'),
        quantity: z.number().min(0.1, 'Quantity must be at least 0.1'),
        unitId: z.string().min(1, 'Unit is required'),
      })
    )
    .optional(),
  newIngredient: z
    .object({
      ingredientName: z.string().optional(),
      quantity: z.number().min(0.1),
      unitId: z.string().optional(),
    })
    .optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function RecipeForm({
  recipe,
  isEditMode = false,
  units = [],
}: RecipeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    recipe?.image || null
  );
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [activeImageTab, setActiveImageTab] = useState<string>('upload');

  // Setup React Hook Form with all form fields
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe?.name || '',
      description: recipe?.description || '',
      servings: recipe?.servings || 1,
      image: recipe?.image || '',
      ingredients:
        recipe?.ingredients?.map((item) => ({
          id: item.id,
          ingredientId: item.ingredientId,
          ingredientName: item.ingredient?.name || '',
          quantity: item.quantity,
          unitId: item.unitId,
        })) || [],
      newIngredient: {
        ingredientName: '',
        quantity: 1,
        unitId: units.length > 0 ? units[0].id : '',
      },
    },
  });

  // Setup field array for ingredients
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
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
        form.setValue('image', objectUrl);
        setActiveImageTab('upload');
      }
    },
    [form]
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
      form.setValue('image', imageUrlInput);
      setImageFile(null);
    }
  };

  // Add new ingredient
  const addIngredient = () => {
    const newIngredient = form.getValues('newIngredient');

    if (newIngredient?.ingredientName && newIngredient.unitId) {
      const unit = units.find((u) => u.id === newIngredient.unitId);

      append({
        id: `temp-${Date.now()}`,
        ingredientId: `temp-${Date.now()}`,
        ingredientName: newIngredient.ingredientName.trim(),
        quantity: newIngredient.quantity,
        unitId: newIngredient.unitId,
      });

      // Reset new ingredient form
      form.setValue('newIngredient', {
        ingredientName: '',
        quantity: 1,
        unitId: units.length > 0 ? units[0].id : '',
      });
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<RecipeFormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      let imageUrl = imagePreview || '';

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

      if (recipeId && data.ingredients && data.ingredients.length > 0) {
        try {
          const ingredientPayload = data.ingredients.map((ing) => {
            // Check if it's a new or existing ingredient
            const isNewIngredient = ing.ingredientId?.startsWith('temp-');

            if (isNewIngredient) {
              // For new ingredients, send the name but no IDs
              return {
                name: ing.ingredientName,
                quantity: ing.quantity,
                unitId: ing.unitId,
              };
            } else {
              // For existing ingredients, send the IDs
              return {
                id: ing.id,
                ingredientId: ing.ingredientId,
                quantity: ing.quantity,
                unitId: ing.unitId,
              };
            }
          });

          await saveRecipeIngredients(recipeId, ingredientPayload);

          showSuccessToast(
            `Recipe ${isEditMode ? 'updated' : 'created'} successfully`
          );
          router.push('/auth/recipes');
        } catch (error) {
          console.error('Error saving ingredients:', error);
          showErrorToast('Failed to save recipe ingredients');
        }
      } else {
        showSuccessToast(
          `Recipe ${isEditMode ? 'updated' : 'created'} successfully`
        );
        router.push('/auth/recipes');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      showErrorToast(`Failed to ${isEditMode ? 'update' : 'create'} recipe`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter recipe name"
                            className="p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your recipe"
                            className="min-h-[200px] p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            className="p-3"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  {fields.length > 0 ? (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">
                        Added Ingredients:
                      </h3>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {fields.map((ingredient, index) => {
                          const unitName =
                            units.find(
                              (u) =>
                                u.id ===
                                form.getValues(`ingredients.${index}.unitId`)
                            )?.name || '';
                          return (
                            <div
                              key={ingredient.id}
                              className="flex items-center justify-between bg-muted p-3 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {form.getValues(
                                    `ingredients.${index}.ingredientName`
                                  )}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {form.getValues(
                                    `ingredients.${index}.quantity`
                                  )}{' '}
                                  {unitName}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          );
                        })}
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
                        <FormField
                          control={form.control}
                          name="newIngredient.ingredientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ingredient</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter ingredient name"
                                  className="p-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name="newIngredient.quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0.1"
                                  step="0.1"
                                  className="p-3"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name="newIngredient.unitId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full cursor-pointer">
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {units.map((unit) => (
                                    <SelectItem
                                      key={unit.id}
                                      value={unit.id}
                                      className="cursor-pointer"
                                    >
                                      {unit.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={addIngredient}
                          disabled={!form.watch('newIngredient.ingredientName')}
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
                                    form.setValue('image', '');
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
                                  form.setValue('image', '');
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
    </Form>
  );
}

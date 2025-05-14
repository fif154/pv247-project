import { Ingredient } from '@/server/entities/models/ingredient';
import Image from 'next/image';
import { macroBgColors, macroTextColors } from '../macros';
import { Separator } from '../ui/separator';
import { PercentageBar } from '../percentage-bar';

function NutrientBar({
  label,
  value,
  unit,
  max,
  colorClass,
  textColorClass,
}: {
  label: string;
  value?: number | null;
  unit: string;
  max: number;
  colorClass: string;
  textColorClass: string;
}) {
  if (value === undefined || value === null) return null;
  
  const percentage = Math.min(value / max, 1);
  // Format to 2 decimal places
  const formattedValue = Number(value.toFixed(2));
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className={textColorClass}>
          {formattedValue} {unit}
        </span>
      </div>
      <PercentageBar percentage={percentage} bgColor={colorClass} />
    </div>
  );
}

export function IngredientDetails({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="space-y-4">
      {ingredient.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            src={ingredient.imageUrl}
            alt={ingredient.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Category</p>
            <p>{ingredient.category?.name || 'Not categorized'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Base quantity</p>
            <p>{ingredient.baseMacroQuantity || 100}g</p>
          </div>
        </div>
      </div>
      
      {ingredient.description && (
        <div>
          <h3 className="text-lg font-semibold">Description</h3>
          <Separator className="my-2" />
          <p className="text-sm">{ingredient.description}</p>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold">Nutritional Information</h3>
        <Separator className="my-2" />
        <div className="space-y-4">
          <NutrientBar
            label="Calories"
            value={ingredient.calories}
            unit="kcal"
            max={800}
            colorClass={macroBgColors.calories}
            textColorClass={macroTextColors.calories}
          />
          <NutrientBar
            label="Protein"
            value={ingredient.protein}
            unit="g"
            max={30}
            colorClass={macroBgColors.protein}
            textColorClass={macroTextColors.protein}
          />
          <NutrientBar
            label="Carbs"
            value={ingredient.carbs}
            unit="g"
            max={60}
            colorClass={macroBgColors.carbs}
            textColorClass={macroTextColors.carbs}
          />
          <NutrientBar
            label="Fats"
            value={ingredient.fats}
            unit="g"
            max={40}
            colorClass={macroBgColors.fat}
            textColorClass={macroTextColors.fat}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Values per {ingredient.baseMacroQuantity || 100}g
        </p>
      </div>
    </div>
  );
}
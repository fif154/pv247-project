import { Ingredient } from '@/server/entities/models/ingredient';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { macroTextColors } from '../macros';

type IngredientCardProps = {
  ingredient: Ingredient;
  onClick: () => void;
};

export function IngredientCard({ ingredient, onClick }: IngredientCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md hover:translate-y-[-4px] cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 bg-muted">
        {ingredient.imageUrl ? (
          <Image
            src={ingredient.imageUrl}
            alt={ingredient.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-3 left-4 text-white font-semibold text-lg">
          {ingredient.name}
        </h3>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-3 truncate">
          {ingredient.category?.name || 'Uncategorized'}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <MacroStat
            value={ingredient.calories}
            label="kcal"
            colorClass={macroTextColors.calories}
          />
          <MacroStat
            value={ingredient.protein}
            label="protein"
            colorClass={macroTextColors.protein}
          />
          <MacroStat
            value={ingredient.carbs}
            label="carbs"
            colorClass={macroTextColors.carbs}
          />
          <MacroStat
            value={ingredient.fats}
            label="fats"
            colorClass={macroTextColors.fat}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MacroStat({
  value,
  label,
  colorClass,
}: {
  value?: number | null;
  label: string;
  colorClass: string;
}) {
  if (value === undefined || value === null) return null;

  const formattedValue = Number(value.toFixed(2));

  return (
    <div className="flex items-baseline gap-1">
      <span className={`font-medium ${colorClass}`}>{formattedValue}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

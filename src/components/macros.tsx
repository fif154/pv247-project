import { MacroItem } from "./macro-item";
import { Card, CardContent } from "./ui/card";

type Props = {
    carbs: number;
    protein: number;
    fat: number;
    calories: number;
};

export type MacroItemType = {
    label: string;
    value: number;
    icon: string;
    bgColor: string;
    textColor: string;
    unit: "kcal" | "g";
    percentage: number;
};

export const macroTextColors = {
    calories: "text-macro-calories",
    carbs: "text-macro-carbs",
    protein: "text-macro-protein",
    fat: "text-macro-fat",
};

export const macroBgColors = {
    calories: "bg-macro-calories",
    carbs: "bg-macro-carbs",
    protein: "bg-macro-protein",
    fat: "bg-macro-fat",
};

export const Macros = (props: Props) => {
    const macroItems: MacroItemType[] = [
        {
            label: "Calories",
            value: props.calories,
            icon: "🔥",
            bgColor: macroBgColors.calories,
            textColor: macroTextColors.calories,
            unit: "kcal",
            // TODO: Add a percentage calculation based on the daily recommended intake
            percentage: props.calories / 2000,
        },
        {
            label: "Carbs",
            value: props.carbs,
            icon: "🍞",
            bgColor: macroBgColors.carbs,
            textColor: macroTextColors.carbs,
            unit: "g",
            percentage: props.carbs / 200,
        },
        {
            label: "Protein",
            value: props.protein,
            icon: "🍗",
            bgColor: macroBgColors.protein,
            textColor: macroTextColors.protein,
            unit: "g",
            percentage: props.protein / 200,
        },
        {
            label: "Fat",
            value: props.fat,
            icon: "🥑",
            bgColor: macroBgColors.fat,
            textColor: macroTextColors.fat,
            unit: "g",
            percentage: props.fat / 70,
        },
    ];
    return (
        <Card className="w-full">
            <CardContent className="px-4 py-2">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {macroItems.map((item) => (
                        <MacroItem key={item.label} {...item} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

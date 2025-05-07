import { mockMeals } from "@/utils/mock";
import { MealCard } from "./meal-card";

export const Meals = () => {
    return (
        <div className="grid gap-6">
            {mockMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}
        </div>
    );
};

import { listIngredientsAction } from '@/app/ingredients/actions';

const Page = async () => {
  const ingredients = await listIngredientsAction();

  console.log(ingredients);

  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Ingredients</h1>
      </div>
    </div>
  );
};
export default Page;

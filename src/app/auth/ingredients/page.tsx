export const metadata = {
  title: 'Ingredients | MealMate',
  description: 'Browse, manage, and organize ingredients used in your meals.',
};

const Page = async () => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Ingredients</h1>
      </div>
    </div>
  );
};
export default Page;

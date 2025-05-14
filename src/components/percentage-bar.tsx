export const PercentageBar = ({
  percentage,
  bgColor,
}: {
  percentage: number;
  bgColor: string;
}) => {
  return (
    <div className="relative h-2 bg-muted-foreground rounded-full w-full">
      <div
        className={`absolute top-0 left-0 h-full ${bgColor} rounded-full`}
        style={{ width: `${Math.min(100, percentage * 100)}%` }}
      ></div>
    </div>
  );
};

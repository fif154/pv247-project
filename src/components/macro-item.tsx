import { MacroItemType } from './macros';

export const MacroItem = (props: MacroItemType) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground">{props.label}</span>
      <div className="flex flex-row gap-2 items-baseline">
        <span className={`text-2xl font-bold ${props.textColor}`}>
          {props.value}
        </span>
        {props.unit}
      </div>
      <div className="relative h-2 bg-muted-foreground rounded-full w-full">
        <div
          className={`absolute top-0 left-0 h-full ${props.bgColor} rounded-full`}
          style={{ width: `${props.percentage * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

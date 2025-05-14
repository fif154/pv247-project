import { MacroItemType } from './macros';
import { PercentageBar } from './percentage-bar';

export const MacroItem = (props: MacroItemType) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground">{props.label}</span>
      <div className="flex flex-row gap-2 items-baseline">
        <span className={`text-2xl font-bold ${props.textColor}`}>
          {props.value.toFixed()}
        </span>
        {props.unit}
      </div>
      <PercentageBar percentage={props.percentage} bgColor={props.bgColor} />
    </div>
  );
};

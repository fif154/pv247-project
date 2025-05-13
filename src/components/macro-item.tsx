import { MacroItemType } from './macros';
import { PercentageBar } from './percentage-bar';

export const MacroItem = (props: MacroItemType) => {
  const percentage = props.percentage > 1 ? 1 : props.percentage;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground">{props.label}</span>
      <div className="flex flex-row gap-2 items-baseline">
        <span className={`text-2xl font-bold ${props.textColor}`}>
          {props.value.toFixed()}
        </span>
        <div>
          <span className='text-gray-400'> / {props.userSetting} {props.unit}</span>
        </div>
      </div>
      <PercentageBar percentage={percentage} bgColor={props.bgColor} />
    </div>
  );
};

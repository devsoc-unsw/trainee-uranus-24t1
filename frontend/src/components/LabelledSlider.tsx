import { column } from "../resources";

interface LabelledSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onSlide: (newValue: number) => void;
  label: string;
}

const LabelledSlider: React.FC<LabelledSliderProps> = ({
  min,
  max,
  step,
  value,
  onSlide,
  label,
}) => {
  return (
    <div className={column}>
      <input
        className="
          bg-secondary-bg-500
					rounded-full
          appearance-none
          cursor-pointer
          h-2
          my-3
          touch-none
          bg-gray-300
          rounded-full
        "
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={(e) => onSlide(Number(e.target.value))}
      />
      <div
        className="
        h-auto
        flex
        relative
        mx-2
        mb-3
				"
      >
        <div
          className="
            absolute h-[20px]
            w-[20px]
            r-full
            transform
            translate-x-[-50%]
            translate-y-[-50%]
            text-secondary-bg-500
            font-bold
            text-sm
          "
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default LabelledSlider;

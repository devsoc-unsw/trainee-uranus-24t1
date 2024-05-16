// ProgressBar.js
import { FC } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full relative">
      <div
        className="
          flex
          items-center
          justify-center
          bg-secondary-bg-500
          rounded-full
          transition-width
          duration-300
          ease-in-out
          h-[8px]"
        style={{ width: `${progress}%` }}
      />
      <div
        className="
          bg-secondary-bg-500
          rounded-full
          absolute
          transform
          translate-x-1/2
          transition-width
          duration-300
          ease-in-out
          h-[12px]
          w-[12px]
          top-[-2px]"
        style={{
          left: `clamp(-8px, calc(${progress}% - 16px), calc(100% - 8px))`,
        }}
      />
    </div>
  );
};

export default ProgressBar;

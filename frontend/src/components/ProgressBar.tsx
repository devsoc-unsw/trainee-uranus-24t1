// ProgressBar.js
import { FC } from 'react';

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
          bg-indigo-600
          rounded-full
          transition-width
          duration-300
          ease-in-out"
        style={{ width: `${progress}%`, height: '8px' }}
      />
      <div
        className="
          bg-indigo-600
          rounded-full
          absolute
          transform
          translate-x-1/2
          transition-width
          duration-300
          ease-in-out"
        style={{
          width: '12px',
          height: '12px',
          top: '-2px',
          left: `${Math.max(progress - 2, -1)}%`
        }}
      />
    </div>
  );
};

export default ProgressBar;

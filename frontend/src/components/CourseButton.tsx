{
  /* example use:
<CourseButton course='COMP1531' disabled={false}/>
<CourseButton course='COMP1511' disabled={true}/>
*/
}
import React, { useState } from "react";

interface CourseButtonProps {
  children: React.ReactNode;
  disabled: boolean;
}

const CourseButton: React.FC<CourseButtonProps> = ({ disabled, children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsClicked((prevState) => !prevState);
    }
  };

  const dynamicStyle = disabled
    ? "text-tertiary-500 bg-tertiary-bg-500 border-tertiary-bg-500"
    : isClicked
      ? "bg-secondary-bg-500 border-secondary-bg-600 text-white"
      : "text-secondary-bg-500 bg-white hover:bg-secondary-bg-500 hover:text-white";

  return (
    <button
      className={`rounded-full  transition-all duration-250  px-6 py-2  border-2 border-secondary-bg-500 outline-none ${dynamicStyle}`}
      onClick={!disabled ? handleClick : undefined}
    >
      {children}
    </button>
  );
};
export default CourseButton;

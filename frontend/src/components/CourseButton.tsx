{
  /* example use:
<CourseButton course='COMP1531' disabled={false}/>
<CourseButton course='COMP1511' disabled={true}/>
*/
}
import { useState } from "react";

interface CourseButtonProps {
  course: string;
  disabled: boolean;
  onClickHandler: () => void;
  initiallyClicked?: boolean;
}

const CourseButton: React.FC<CourseButtonProps> = ({
  course,
  disabled,
  onClickHandler,
  initiallyClicked = false,
}) => {
  const [isClicked, setIsClicked] = useState(initiallyClicked);

  const handleClick = () => {
    if (!disabled) {
      onClickHandler();
      setIsClicked((prevState) => !prevState);
    }
  };

  const dynamicStyle = disabled
    ? "text-tertiary-500 bg-tertiary-bg-500 border-tertiary-bg-500"
    : isClicked
    ? "bg-secondary-bg-500 text-white"
    : "text-secondary-bg-500 bg-white";

  return (
    <button
      className={`font-semibold rounded-full transition-all duration-150 px-12 py-[10px] border-3 border-secondary-bg-500 outline-none ${dynamicStyle}`}
      onClick={!disabled ? handleClick : undefined}
    >
      {course}
    </button>
  );
};
export default CourseButton;

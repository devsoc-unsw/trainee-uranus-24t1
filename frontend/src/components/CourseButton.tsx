import dashCircle from '../../images/dashCircle.svg'
import { useState } from 'react';

interface CourseButtonProps {
  label: string;
  disabled?: boolean;
  showDash?: boolean;
}

const CourseButton: React.FC<CourseButtonProps> = ({label, disabled = false, showDash = false}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && !showDash) {
      setIsClicked(prevState => !prevState);
    }   
  };


  const dynamicStyle = disabled ? 'text-tertiary-500 bg-tertiary-bg-500 border-tertiary-bg-500' : 
  isClicked ? 'bg-secondary-bg-500 border-secondary-bg-500 text-white' : `text-secondary-bg-500 bg-whit`;

  return (
    <button className={`rounded-full transition-all duration-250 px-4 py-2 border-2 border-secondary-bg-500 relative ${dynamicStyle}`} 
    onClick={handleClick}>
      {showDash && (
        <img src={dashCircle} alt="Dash Icon" className="absolute top-0 left-0 w-5 h-5 mt-[-9px] ml-[-6.5px] filter" />
      )}
      {label}
    </button>
  )
} 
export default CourseButton
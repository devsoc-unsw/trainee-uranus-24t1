{/* example use:
<CourseButton course='COMP1531' disabled={false}/>
<CourseButton course='COMP1511' disabled={true}/>
*/}
import { useState } from 'react';

interface CourseButtonProps {
    course: string;
    disabled: boolean;
}
const CourseButton: React.FC<CourseButtonProps> = ({ course, disabled }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (!disabled) {
            setIsClicked(prevState => !prevState);
        }   
    };

    return (
        <button
            className={`rounded-full  px-6 py-2  border-2 border-secondary-bg-500 
            ${disabled ? 'text-tertiary-500 bg-tertiary-bg-500 border-tertiary-bg-500' : 
            `${isClicked ? 'bg-secondary-bg-500 text-white ' : 'text-secondary-bg-500 bg-white'}} 
            hover:text-white hover:bg-secondary-bg-500`}`} 
            onClick={!disabled ? handleClick : undefined}
            >
        {course}
        </button>
    )
} 
export default CourseButton
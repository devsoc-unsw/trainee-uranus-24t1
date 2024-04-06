{/* example use:
<CourseButton course='1531'/> 
*/}
import { useState } from 'react';

const CourseButton = ({ course }: { course: string }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(prevState => !prevState);
    };

    return (
        <button
            className={`rounded-full  px-6 py-2  border-2 border-secondary-bg-500 ${isClicked ? 'text-white bg-secondary-bg-500' : 'bg-white text-secondary-bg-500'} hover:text-white hover:bg-secondary-bg-500`}
            onClick={handleClick}
        >
        {course}
        </button>
    )
} 
export default CourseButton
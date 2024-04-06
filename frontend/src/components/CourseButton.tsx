{/* example use:
<CourseButton course='1531'/> 
*/}

const CourseButton = ({ course }: { course: string }) => {
    return (
        <button className = "rounded-full bg-white px-6 py-2 text-secondary-bg-500 border-2 border-secondary-bg-500 hover:text-white hover:bg-secondary-bg-500"> 
        {course}
        </button>
    )
} 
export default CourseButton
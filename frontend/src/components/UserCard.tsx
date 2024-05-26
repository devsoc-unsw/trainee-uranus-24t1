import { bigButton, cardStyle, column, row } from "../resources";

interface UserCardProps {
  avatarUrl: string;
  currentCourses: string[];
  untakenCourses: string[];
  languages: string[];
  onMatch: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ avatarUrl, currentCourses, untakenCourses, languages, onMatch }) => {
  const sectionStyle = `
    font-bold
  `;

  const spacerStyle = `
    w-[1px]
    h-[20px]
  `;

  return (
    <div className="
      h-full
      w-full
      bg-secondary-bg-100
      flex
      justify-center
      items-center 
    ">
      <div className={`
        ${column}
        bg-primary-50
        rounded-2xl
        w-full
        m-4
      `}>
        <img className="
          rounded-t-2xl
          h-[40vh]
          object-cover
          " src={avatarUrl || "/src/assets/frenchman.jpeg"}
        />
        
        <div className={`${column} p-3`}>
          <div className={sectionStyle}>Current Courses</div>
          <div className={row}>
            {currentCourses.map(course => (<div className={cardStyle}>{course}</div>))}
          </div>

          <div className={spacerStyle}/>

          <div className={sectionStyle}>Untaken Courses</div>
          <div className={row}>
            {untakenCourses.map(course => (<div className={cardStyle}>{course}</div>))}
          </div>

          <div className={spacerStyle}/>

          <div className={sectionStyle}>Languages</div>
          <div className={row}>
            {languages.map(language => (<div className={cardStyle}>{language}</div>))}
          </div>

          <button className={`${bigButton} w-[350px] self-center`} onClick={onMatch}>
            I have a crush on you
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

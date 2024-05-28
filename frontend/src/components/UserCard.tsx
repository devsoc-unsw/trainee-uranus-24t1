import { cardStyle, column, row } from "../resources";
import CustomButton from "./CustomButton";

interface UserCardProps {
  avatarUrl: string;
  name: string;
  currentCourses: string[];
  untakenCourses: string[];
  languages: string[];
  onMatch: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  currentCourses,
  untakenCourses,
  languages,
  onMatch,
}) => {
  const sectionStyle = `
    font-bold
  `;

  const spacerStyle = `
    w-[1px]
    h-[20px]
  `;

  return (
    <div
      className="
      flex
      justify-center
      items-center
    "
    >
      <div
        className={`
        ${column}
        bg-white
        rounded-2xl
        w-full
        mx-4
        my-3
        shadow-xl
      `}
      >
        <img
          className="
          rounded-t-2xl
          h-[30vh]
          object-cover
          "
          src={avatarUrl || "/src/assets/frenchman.jpeg"}
        />
        <div className={`${column} px-3 pt-3`}>
          <p className={`${sectionStyle} text-2xl`}>{name}</p>
        </div>

        <div className={`${column} p-3`}>
          <div className={sectionStyle}>Current Courses</div>
          <div className={`${row} max-w-[95%] flex-wrap`}>
            {currentCourses &&
              currentCourses.map((course) => (
                <div className={cardStyle}>{course}</div>
              ))}
          </div>

          <div className={spacerStyle} />

          <div className={sectionStyle}>Untaken Courses</div>
          <div className={`${row} max-w-[95%] flex-wrap`}>
            {untakenCourses &&
              untakenCourses.map((course) => (
                <div className={cardStyle}>{course}</div>
              ))}
          </div>

          <div className={spacerStyle} />

          <div className={sectionStyle}>Languages</div>
          <div className={`${row} max-w-full flex-wrap`}>
            {languages &&
              languages.map((language) => (
                <div className={cardStyle}>{language}</div>
              ))}
          </div>

          <CustomButton type="button" onClick={onMatch} disabled={false}>
            Message
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import { cardStyle, column, row } from "../resources";
import CustomButton from "./CustomButton";
import LoadContainer from "./LoadContainer";

interface UserCardProps {
  avatarUrl?: string;
  name?: string;
  currentCourses?: string[];
  untakenCourses?: string[];
  languages?: string[];
  onMatch?: () => void;
  loading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  currentCourses,
  untakenCourses,
  languages,
  onMatch,
  loading,
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
        <LoadContainer loading={loading} className="h-[30vh] rounded-t-2xl">
          <img
            className="
            rounded-t-2xl
            h-[30vh]
            object-cover
            w-full
            "
            src={avatarUrl || "/src/assets/frenchman.jpeg"}
          />
        </LoadContainer>

        <LoadContainer
          loading={loading}
          className="h-[40px] w-[200px] mx-3 mt-3"
        >
          <div className={`${column} px-3 pt-3`}>
            <p className={`${sectionStyle} text-2xl`}>{name}</p>
          </div>
        </LoadContainer>

        <div className={`${column} p-3`}>
          <div className={sectionStyle}>Current Courses</div>
          <LoadContainer loading={loading} className="h-[40px] w-full">
            <div className={`${row} max-w-[95%] flex-wrap`}>
              {currentCourses &&
                currentCourses.map((course) => (
                  <div className={cardStyle} key={course}>
                    {course}
                  </div>
                ))}
            </div>
          </LoadContainer>

          <div className={spacerStyle} />

          <div className={sectionStyle}>Untaken Courses</div>
          <LoadContainer loading={loading} className="h-[40px] w-full">
            <div className={`${row} max-w-[95%] flex-wrap`}>
              {untakenCourses &&
                untakenCourses.map((course) => (
                  <div className={cardStyle} key={course}>
                    {course}
                  </div>
                ))}
            </div>
          </LoadContainer>

          <div className={spacerStyle} />

          <div className={sectionStyle}>Languages</div>
          <LoadContainer loading={loading} className="h-[40px] w-full">
            <div className={`${row} max-w-full flex-wrap`}>
              {languages &&
                languages.map((language) => (
                  <div className={cardStyle} key={language}>
                    {language}
                  </div>
                ))}
            </div>
          </LoadContainer>

          <LoadContainer loading={loading} className="h-[40px] w-full mt-2">
            <CustomButton
              type="button"
              onClick={onMatch ?? (() => {})}
              disabled={false}
            >
              Message
            </CustomButton>
          </LoadContainer>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

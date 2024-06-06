import { cardStyle, column, row } from "../resources";
import CustomButton from "./CustomButton";
import LoadContainer from "./LoadContainer";
import frenchman from "../assets/frenchman.jpeg";

interface UserCardProps {
  avatarUrl?: string;
  name?: string;
  currentCourses?: string[];
  untakenCourses?: string[];
  languages?: string[];
  wam?: string;
  academicSocialRatio?: number;
  age?: number;
  hobbies?: string[];
  programmingLanguages?: string[];
  pronouns?: string[];
  onMatch?: () => void;
  loading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  currentCourses,
  untakenCourses,
  languages,
  wam,
  academicSocialRatio,
  age,
  hobbies,
  programmingLanguages,
  pronouns,
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

  const list = (section: string, values: string[] | undefined) =>
    (values || loading) && (
      <>
        <div className={sectionStyle}>{section}</div>
        <LoadContainer loading={loading} className="h-[40px] w-full">
          <div className={`${row} max-w-full flex-wrap`}>
            {values &&
              values.map((value) => (
                <div className={cardStyle} key={value}>
                  {value}
                </div>
              ))}
          </div>
        </LoadContainer>
        <div className={spacerStyle} />
      </>
    );
  const box = (section: string, value: string | undefined) =>
    value && (
      <div className={`${column} w-full`}>
        <div className="text-primary-300">{section}</div>
        <div className="font-bold text-2xl">{value}</div>
      </div>
    );

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
            src={avatarUrl || frenchman}
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
          <LoadContainer loading={loading} className="h-[40px] w-[300px] mb-3">
            <div className={row}>
              {box("Age", age?.toString())}
              {box("Pronouns", pronouns?.join(", "))}
            </div>
            <div className={spacerStyle} />
          </LoadContainer>
          <LoadContainer loading={loading} className="h-[40px] w-[300px] mb-3">
            <div className={row}>
              {box(
                "Academic Social Ratio",
                `${Math.round(academicSocialRatio! * 100)}%`,
              )}
              {box("WAM", wam)}
            </div>
            <div className={spacerStyle} />
          </LoadContainer>

          {list("Current Courses", currentCourses)}
          {list("Untaken Courses", untakenCourses)}
          {list("Languages", languages)}
          {list("Hobbies", hobbies)}
          {list("Programming Languages", programmingLanguages)}

          <LoadContainer loading={loading} className="h-[40px] w-full mt-2">
            {onMatch && (
              <CustomButton
                type="button"
                onClick={onMatch ?? (() => {})}
                disabled={false}
              >
                Message
              </CustomButton>
            )}
          </LoadContainer>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import UserCard from "../../components/UserCard";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  UserInfo,
  getSelfMatches,
  startConversation,
} from "../../backendCommunication";
import ErrorModal from "../../components/ErrorModal";
import UNSWipeLogo from "../../assets/UNSWipe-logo-md.png";

const Swipe = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [matches, setMatches] = useState([] as UserInfo[]);

  const pageTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setMatches(await getSelfMatches(token));
      } catch {
        setErrorMessage(
          "There was a problem retrieving your data. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pageTopRef &&
      pageTopRef.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, [matches]);

  return (
    <div className="relative flex flex-col h-svh w-svw">
      <div className="content-center grow overflow-auto w-full">
        <div
          className="mt-5 mb-2 w-full flex justify-center items-center"
          ref={pageTopRef}
        >
          <img src={UNSWipeLogo} alt="UNSWipe Logo" />
        </div>
        {loading ? (
          <UserCard loading={true} />
        ) : (
          matches.map((match) => (
            <UserCard
              key={match._id}
              avatarUrl={match.avatarUrl ?? ""}
              name={
                match.firstName && match.lastName
                  ? `${match.firstName} ${match.lastName}`
                  : ""
              }
              currentCourses={match.courses}
              untakenCourses={match.futureCourses}
              languages={match.languages}
              wam={match.wam}
              academicSocialRatio={match.academicSocialRatio}
              age={match.age}
              pronouns={match.pronouns}
              hobbies={match.hobbies}
              programmingLanguages={match.programmingLanguages}
              onMatch={async () => {
                await startConversation(token, match._id);
                navigate(`/messages/${match._id}`);
              }}
            />
          ))
        )}
      </div>

      <div className="w-full">
        <NavBar navigate={navigate} index={0} />
      </div>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default Swipe;

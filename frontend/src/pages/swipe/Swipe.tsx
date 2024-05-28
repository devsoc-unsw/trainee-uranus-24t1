import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import UserCard from "../../components/UserCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  UserInfo,
  getSelfMatches,
  startConversation,
} from "../../backendCommunication";
import { Spinner } from "react-bootstrap";
import { center } from "../../resources";
import ErrorModal from "../../components/ErrorModal";

const Swipe = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [matches, setMatcehs] = useState([] as UserInfo[]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setMatcehs(await getSelfMatches(token));
      } catch {
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={`h-svh w-svw ${center}`}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-svh w-svw">
      <div className="content-center grow overflow-auto w-full">
        {matches.map((match) => (
          <UserCard
            avatarUrl={match.avatarUrl}
            currentCourses={match.courses}
            untakenCourses={match.futureCourses}
            languages={match.languages}
            onMatch={async () => {
              await startConversation(token, match._id);
              navigate(`/messages/${match._id}`);
            }}
          />
        ))}
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

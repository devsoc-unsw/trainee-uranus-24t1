import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { center, column, bigButton, searchBar } from "../../resources";
import { Spinner } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import ProgressBar from "../../components/ProgressBar";
import ErrorModal from "../../components/ErrorModal";
import { useNavigate } from "react-router-dom";
import {
  getSelfData,
  getStaticData,
  putSelfData,
} from "../../backendCommunication";
import { AxiosError } from "axios";
import ListSearch from "../../components/ListSearch";

const RegisterFutureCoursesPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [futureCourseSelection, setFutureCourseSelection] = useState(
    [] as boolean[],
  );

  const futureCoursesRef = useRef([] as string[]);
  const toggleFutureCourseSelection = (index: number) =>
    setFutureCourseSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value)),
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const staticData = await getStaticData(token);
        const selfData = await getSelfData(token);
        const courses = selfData.courses || [];
        futureCoursesRef.current = staticData.courses.filter(
          (course: string) => !courses.includes(course),
        );
        setFutureCourseSelection(
          futureCoursesRef.current.map((course) =>
            selfData.futureCourses?.includes(course),
          ),
        );
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
    <div className={`${column} relative w-svw h-svh p-4`}>
      <div className="w-full relative flex items-center justify-center">
        <div className="absolute left-0">
          <BackButton onBack={() => navigate("/register-courses")} />
        </div>
        <div className={center}>
          <img className="w-[120px]" src="/src/assets/UNSWipe-cat.png" />
        </div>
      </div>

      <div className="flex justify-end">2 of 5</div>

      <div className="h-[10px]" />

      <div className={center}>
        <ProgressBar progress={40} />
      </div>

      <div className="h-[30px]" />

      <div className="text-[2.5rem] font-bold">Future Courses?</div>
      <div>Select all the courses you are doing in the future</div>

      <div className="h-[60px]" />

      <input
        className={searchBar}
        onChange={(e) => {
          e.preventDefault();
          setSearchInput(e.target.value);
        }}
        placeholder="🔍 Search"
        type="input"
      />

      <div className="h-[90px]" />

      <ListSearch
        contents={futureCoursesRef.current}
        selected={futureCourseSelection}
        searchInput={searchInput}
        onSelect={(i) => toggleFutureCourseSelection(i)}
      />

      <div className={`${center}`}>
        <button
          className={bigButton}
          onClick={async (e: FormEvent) => {
            e.preventDefault();

            if (futureCourseSelection.every((selection) => !selection)) {
              setErrorMessage("Please select at least one course");
              return;
            }

            try {
              setLoading(true);

              await putSelfData(token, {
                futureCourses: futureCoursesRef.current.filter(
                  (_, i) => futureCourseSelection[i],
                ),
              });
              navigate("/register-hobbies");
            } catch (e: unknown) {
              setLoading(false);
              if (e instanceof AxiosError) {
                setErrorMessage(e.response?.data.errors[0].message);
              } else {
                setErrorMessage("Internal error");
              }
            }
          }}
        >
          Next
        </button>
      </div>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default RegisterFutureCoursesPage;

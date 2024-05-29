import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { center, column, bigButton, searchBar } from "../../resources";
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
import Heading from "../../components/Heading";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";

const RegisterFutureCoursesPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [futureCourseSelection, setFutureCourseSelection] = useState(
    [] as boolean[]
  );

  const futureCoursesRef = useRef([] as string[]);
  const toggleFutureCourseSelection = (index: number) =>
    setFutureCourseSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const staticData = await getStaticData(token);
        const selfData = await getSelfData(token);
        const courses = selfData.courses || [];
        futureCoursesRef.current = staticData.courses.filter(
          (course: string) => !courses.includes(course)
        );
        setFutureCourseSelection(
          futureCoursesRef.current.map((course) =>
            selfData.futureCourses?.includes(course)
          )
        );
      } catch {
        setErrorMessage(
          "There was a problem retrieving your data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${column} relative w-svw h-svh px-4 pb-4`}>
      <div className="w-full relative flex items-center justify-center">
        <div className="absolute left-0">
          <BackButton onBack={() => navigate("/register-courses")} />
        </div>
        <div className={center}>
          <img className="w-[100px]" src={UNSWipeCat} />
        </div>
      </div>

      <div className="flex justify-end opacity-60 text-sm pb-[10px]">
        2 of 5
      </div>

      <div className={`${center} pb-[20px]`}>
        <ProgressBar progress={40} />
      </div>

      <div className="h-[30px]" />

      <Heading>Future Courses?</Heading>
      <div>Select all the courses you are doing in the future</div>

      <div className="h-[60px]" />

      <input
        className={`${searchBar} mb-4`}
        onChange={(e) => {
          e.preventDefault();
          setSearchInput(e.target.value);
        }}
        placeholder="🔍 Search"
        type="input"
      />

      <ListSearch
        contents={futureCoursesRef.current}
        selected={futureCourseSelection}
        searchInput={searchInput}
        onSelect={(i) => toggleFutureCourseSelection(i)}
        loading={loading}
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
                  (_, i) => futureCourseSelection[i]
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

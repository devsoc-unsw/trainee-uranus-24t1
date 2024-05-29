import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { AppContext } from "../../contexts/AppContext";
import ErrorModal from "../../components/ErrorModal";
import { center, column, bigButton, searchBar } from "../../resources";
import { useNavigate } from "react-router-dom";
import {
  getSelfData,
  getStaticData,
  putSelfData,
} from "../../backendCommunication";
import { AxiosError } from "axios";
import ListSearch from "../../components/ListSearch";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";

const RegisterCoursesPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [courseSelection, setCourseSelection] = useState([] as boolean[]);

  const coursesRef = useRef([] as string[]);
  const toggleCourseSelection = (index: number) =>
    setCourseSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value)),
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const staticData = await getStaticData(token);
        coursesRef.current = staticData.courses;
        const selfData = await getSelfData(token);
        setCourseSelection(
          coursesRef.current.map((course) =>
            selfData.courses?.includes(course),
          ),
        );
      } catch {
        localStorage.clear();
        location.reload();
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${column} relative w-svw h-svh px-4 pb-4`}>
      <div className="w-full relative flex items-center justify-center">
        <div className={center}>
          <img className="w-[100px]" src={UNSWipeCat} />
        </div>
      </div>

      <div className="flex justify-end opacity-60 text-sm pb-[10px]">
        1 of 5
      </div>

      <div className={`${center} pb-[20px]`}>
        <ProgressBar progress={20} />
      </div>

      <div className="text-[2.5rem] font-extrabold text-primary-500">
        Courses?
      </div>
      <div className="pb-3">Select all the courses you are currently doing</div>

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
        contents={coursesRef.current}
        selected={courseSelection}
        searchInput={searchInput}
        onSelect={(i) => toggleCourseSelection(i)}
        loading={loading}
      />

      <div className={`${center}`}>
        <button
          className={bigButton}
          onClick={async (e: FormEvent) => {
            e.preventDefault();

            if (courseSelection.every((selection) => !selection)) {
              setErrorMessage("Please select at least one course");
              return;
            }

            try {
              setLoading(true);

              await putSelfData(token, {
                courses: coursesRef.current.filter(
                  (_, i) => courseSelection[i],
                ),
              });
              navigate("/register-future-courses");
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

export default RegisterCoursesPage;

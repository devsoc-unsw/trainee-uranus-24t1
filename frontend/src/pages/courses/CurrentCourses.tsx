import React, { useCallback, useMemo, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import UNSWipeIcon from "../../assets/UNSWipe-cat.png";
import CustomButton from "../../components/CustomButton";
import { COURSES_LIST } from "../../utils/constants";
import CourseButton from "../../components/CourseButton";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const CurrentCourses = () => {
  const [courseList, setCourseList] = useState<string[]>(COURSES_LIST);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedCurrentCourses") || "[]")
  );
  const navigate = useNavigate();

  const handleSearchCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredCourses = COURSES_LIST.filter((course) =>
      course.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCourseList(filteredCourses);
  };

  const handleSelectCourse = useCallback(
    (course: string) => {
      if (selectedCourses.includes(course)) {
        setSelectedCourses((prevState) =>
          prevState.filter((selectedCourse) => selectedCourse !== course)
        );
      } else {
        setSelectedCourses((prevState) => [...prevState, course]);
      }
    },
    [selectedCourses]
  );

  const handleGoNext = () => {
    localStorage.setItem(
      "selectedCurrentCourses",
      JSON.stringify(selectedCourses)
    );
    navigate("/register/future-courses");
  };

  const handleGoBack = () => {
    localStorage.setItem(
      "selectedCurrentCourses",
      JSON.stringify(selectedCourses)
    );
    navigate("/register");
  };

  const courseButtonList = useMemo(() => {
    return courseList.map((course) => (
      <div className="my-3" key={course}>
        <CourseButton
          key={course}
          disabled={false}
          course={course}
          onClickHandler={() => handleSelectCourse(course)}
          initiallyClicked={selectedCourses.includes(course)}
        />
      </div>
    ));
  }, [courseList, handleSelectCourse, selectedCourses]);

  return (
    <>
      <div className="absolute top-5 left-5">
        <BackButton onClickHandler={handleGoBack} />
      </div>
      <div className="h-svh w-svw p-3 flex flex-col justify-center items-center">
        <img src={UNSWipeIcon} alt="UNSWipe Icon" className="h-28" />
        <ProgressBar progress={20} />
        <div className="w-full m-3">
          <h1 className="text-secondary-bg-600 font-black text-4xl">
            Courses?
          </h1>
          <div className="max-w-[90%]">
            <p className="inline font-extralight text-sm">
              Select all the courses you are{" "}
            </p>
            <p className="inline text-red-600 font-black">⚠️ CURRENTLY ⚠️</p>
            <p className="inline font-extralight text-sm"> doing.</p>
          </div>
        </div>
        <SearchBar handleChange={handleSearchCourse} />
        <div className="w-full h-[90%] m-1 overflow-auto flex flex-wrap flex-row justify-around item-center">
          {courseButtonList}
        </div>
        <CustomButton disabled={false} type="button" onClick={handleGoNext}>
          NEXT
        </CustomButton>
      </div>
    </>
  );
};

export default CurrentCourses;

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { center, column, bigButton } from "../../resources";
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
import ListView from "../../components/ListView";
import LabelledSlider from "../../components/LabelledSlider";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";

const RegisterInfoPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [erorrMessage, setErrorMessage] = useState("");
  const [languageSelection, setLanguageSelection] = useState([] as boolean[]);
  const [pronounSelection, setPronounSelection] = useState([] as boolean[]);
  const [age, setAge] = useState(17);
  const [wam, setWam] = useState(3);
  const [programmingLanguagesSelection, setProgrammingLanguageSelection] =
    useState([] as boolean[]);

  const languagesRef = useRef([] as string[]);
  const pronounsRef = useRef([] as string[]);
  const wamsRef = useRef([] as string[]);
  const programmingLanguagesRef = useRef([] as string[]);

  const toggleLanguageSelection = (index: number) =>
    setLanguageSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const togglePronounSelection = (index: number) =>
    setPronounSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const toggleProgrammingLanguageSelection = (index: number) =>
    setProgrammingLanguageSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const staticData = await getStaticData(token);
        languagesRef.current = staticData.languages;
        pronounsRef.current = staticData.pronouns;
        wamsRef.current = staticData.wams;
        programmingLanguagesRef.current = staticData.programmingLanguages;
        const selfData = await getSelfData(token);
        setLanguageSelection(
          languagesRef.current.map((language) =>
            selfData.languages?.includes(language)
          )
        );
        setProgrammingLanguageSelection(
          programmingLanguagesRef.current.map((language) =>
            selfData.programmingLanguages?.includes(language)
          )
        );
        setPronounSelection(
          pronounsRef.current.map((pronoun) =>
            selfData.pronouns?.includes(pronoun)
          )
        );
        setAge(selfData.age || 17);
        setWam(wamsRef.current.indexOf(selfData.wam || 1));
      } catch (e) {
        localStorage.clear();
        location.reload();
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
    <div className={`${column} relative w-svw h-svh px-4 pb-4`}>
      <div className="w-full relative flex items-center justify-center">
        <div className="absolute left-0">
          <BackButton onBack={() => navigate("/register-preferences")} />
        </div>
        <div className={center}>
          <img className="w-[100px]" src={UNSWipeCat} />
        </div>
      </div>

      <div className="flex justify-end opacity-60 text-sm pb-[10px]">
        5 of 5
      </div>

      <div className={`${center} pb-[20px]`}>
        <ProgressBar progress={100} />
      </div>

      <div className="text-[2.5rem] font-extrabold text-primary-500 pb-3">
        Your Info?
      </div>

      <div className={`${column} h-full`}>
        <div className="pb-3">
          <div className="text-lg font-bold">Languages:</div>
          <ListView
            contents={languagesRef.current}
            selected={languageSelection}
            onSelect={toggleLanguageSelection}
          />
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Programming Languages:</div>
          <ListView
            contents={programmingLanguagesRef.current}
            selected={programmingLanguagesSelection}
            onSelect={toggleProgrammingLanguageSelection}
          />
        </div>
        <div className="pb-3">
          <div className="text-lg font-bold">Pronouns:</div>
          <ListView
            contents={pronounsRef.current}
            selected={pronounSelection}
            onSelect={togglePronounSelection}
          />
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Age:</div>
          <LabelledSlider
            min={15}
            max={30}
            value={age}
            onSlide={setAge}
            label={age.toString()}
          />
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">WAM:</div>
          <LabelledSlider
            min={0}
            max={wamsRef.current.length - 1}
            value={wam}
            onSlide={setWam}
            label={wamsRef.current[wam]}
          />
        </div>
      </div>

      <div className={center}>
        <button
          className={bigButton}
          onClick={async (e: FormEvent) => {
            e.preventDefault();

            if (languageSelection.every((selection) => !selection)) {
              setErrorMessage("Please select at least one language");
              return;
            }

            if (
              programmingLanguagesSelection.filter((selection) => selection)
                .length < 1
            ) {
              setErrorMessage(
                "Please select at least one programming language"
              );
              return;
            }

            if (pronounSelection.filter((selection) => selection).length < 1) {
              setErrorMessage("Please select at least one pair of pronouns");
              return;
            }

            try {
              setLoading(true);

              await putSelfData(token, {
                languages: languagesRef.current.filter(
                  (_, i) => languageSelection[i]
                ),
                pronouns: pronounsRef.current.filter(
                  (_, i) => pronounSelection[i]
                ),
                age: age,
                wam: wamsRef.current[wam],
                programmingLanguages: programmingLanguagesRef.current.filter(
                  (_, i) => programmingLanguagesSelection[i]
                ),
              });
              navigate("/");
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
        errorMessage={erorrMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default RegisterInfoPage;

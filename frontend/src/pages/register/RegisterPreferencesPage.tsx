import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { center, column, bigButton } from "../../resources";
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
import LoadContainer from "../../components/LoadContainer";

const RegisterPreferencesPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferredLanguageSelection, setPreferredLanguageSelection] = useState(
    [] as boolean[]
  );
  const [preferredPronounSelection, setPreferredPronounSelection] = useState(
    [] as boolean[]
  );
  const [preferredAgeRangeMin, setPreferredAgeRangeMin] = useState(17);
  const [preferredAgeRangeMax, setPreferredAgeRangeMax] = useState(27);
  const [preferredWamRangeMin, setPreferredWamRangeMin] = useState(0);
  const [preferredWamRangeMax, setPreferredWamRangeMax] = useState(4);
  const [socialAcademicRatio, setSocialAcademicRatio] = useState(0.5);

  const languagesRef = useRef([] as string[]);
  const pronounsRef = useRef([] as string[]);
  const wamsRef = useRef([] as string[]);

  const togglePreferredLanguageSelection = (index: number) =>
    setPreferredLanguageSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const togglePreferredPronounSelection = (index: number) =>
    setPreferredPronounSelection((prevState) =>
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
        const selfData = await getSelfData(token);
        setPreferredLanguageSelection(
          languagesRef.current.map((language) =>
            selfData.preferredLanguages?.includes(language)
          )
        );
        setPreferredPronounSelection(
          pronounsRef.current.map((pronoun) =>
            selfData.preferredPronouns?.includes(pronoun)
          )
        );
        setPreferredAgeRangeMin(selfData.preferredAgeRange?.[0] || 17);
        setPreferredAgeRangeMax(selfData.preferredAgeRange?.[1] || 27);
        setPreferredWamRangeMin(
          wamsRef.current.indexOf(selfData.preferredWamRange?.[0] ?? 0)
        );
        setPreferredWamRangeMax(
          wamsRef.current.indexOf(selfData.preferredWamRange?.[1] ?? 4)
        );
        setSocialAcademicRatio(selfData.academicSocialRatio || 0.5);
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
          <BackButton onBack={() => navigate("/register-hobbies")} />
        </div>
        <div className={center}>
          <img className="w-[100px]" src={UNSWipeCat} />
        </div>
      </div>

      <div className="flex justify-end opacity-60 text-sm pb-[10px]">
        4 of 5
      </div>

      <div className={`${center} pb-[20px]`}>
        <ProgressBar progress={80} />
      </div>

      <div className="text-[2.5rem] font-extrabold text-primary-500">
        Preferences?
      </div>
      <div className="pb-3 text-sm opacity-65">
        What are you looking for in someone?
      </div>

      <div className={column}>
        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Languages:</div>
          <LoadContainer loading={loading} className="w-[250px] h-[40px]">
            <ListView
              contents={languagesRef.current}
              selected={preferredLanguageSelection}
              onSelect={togglePreferredLanguageSelection}
            />
          </LoadContainer>
        </div>
        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Pronouns:</div>
          <LoadContainer loading={loading} className="w-[250px] h-[40px]">
            <ListView
              contents={pronounsRef.current}
              selected={preferredPronounSelection}
              onSelect={togglePreferredPronounSelection}
            />
          </LoadContainer>
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Minimum Age:</div>
          <LoadContainer loading={loading} className="w-[100%] h-[40px]">
            <LabelledSlider
              min={15}
              max={30}
              value={preferredAgeRangeMin}
              onSlide={setPreferredAgeRangeMin}
              label={preferredAgeRangeMin.toString()}
            />
          </LoadContainer>
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Maximum Age:</div>
          <LoadContainer loading={loading} className="w-[100%] h-[40px]">
            <LabelledSlider
              min={15}
              max={30}
              value={preferredAgeRangeMax}
              onSlide={setPreferredAgeRangeMax}
              label={preferredAgeRangeMax.toString()}
            />
          </LoadContainer>
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Minimum WAM:</div>
          <LoadContainer loading={loading} className="w-[100%] h-[40px]">
            <LabelledSlider
              min={0}
              max={wamsRef.current.length - 1}
              value={preferredWamRangeMin}
              onSlide={setPreferredWamRangeMin}
              label={wamsRef.current[preferredWamRangeMin]}
            />
          </LoadContainer>
        </div>

        <div className="pb-3">
          <div className="text-lg font-bold">Preferred Maximum WAM:</div>
          <LoadContainer loading={loading} className="w-[100%] h-[40px]">
            <LabelledSlider
              min={0}
              max={wamsRef.current.length - 1}
              value={preferredWamRangeMax}
              onSlide={setPreferredWamRangeMax}
              label={wamsRef.current[preferredWamRangeMax]}
            />
          </LoadContainer>
        </div>

        <div className="text-lg font-bold pb-1">Academic vs Social Ratio:</div>
        <div className="text-xs">
          <b>What do you value?</b>
        </div>
        <div className="text-xs">
          With 0% being that you are completely looking for someone to fulfil
          your academic goals and 100% being you are looking for someone that
          matches your social aspirations!
        </div>
        <LoadContainer loading={loading} className="w-[100%] h-[40px]">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-primary-500 font-bold text-sm opacity-75">
              Academic
            </p>
            <div className="w-[60%]">
              <LabelledSlider
                min={0}
                max={1}
                step={0.01}
                value={socialAcademicRatio}
                onSlide={setSocialAcademicRatio}
                label={`${Math.round(socialAcademicRatio * 100)}%`}
              />
            </div>
            <p className="text-primary-500 font-bold text-sm opacity-75">
              Social
            </p>
          </div>
        </LoadContainer>
      </div>

      <div className={center}>
        <button
          className={bigButton}
          onClick={async (e: FormEvent) => {
            e.preventDefault();

            if (preferredLanguageSelection.every((selection) => !selection)) {
              setErrorMessage("Please select at least one preferred language");
              return;
            }

            if (preferredPronounSelection.every((selection) => !selection)) {
              setErrorMessage(
                "Please select at least one preferred pronoun pair"
              );
              return;
            }

            if (preferredAgeRangeMax < preferredAgeRangeMin) {
              setErrorMessage("Please select a non-empty age range");
              return;
            }

            if (preferredWamRangeMax < preferredWamRangeMin) {
              setErrorMessage("Please select a non-empty WAM range");
              return;
            }

            try {
              setLoading(true);

              await putSelfData(token, {
                preferredLanguages: languagesRef.current.filter(
                  (_, i) => preferredLanguageSelection[i]
                ),
                preferredPronouns: pronounsRef.current.filter(
                  (_, i) => preferredPronounSelection[i]
                ),
                preferredAgeRange: [preferredAgeRangeMin, preferredAgeRangeMax],
                preferredWamRange: [
                  wamsRef.current[preferredWamRangeMin],
                  wamsRef.current[preferredWamRangeMax],
                ],
                academicSocialRatio: socialAcademicRatio,
              });
              navigate("/register-info");
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

export default RegisterPreferencesPage;

import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  center,
  column,
  inputStyle,
  bigButton,
  row,
  bigButtonEmphasised,
} from "../../resources";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InputModal from "../../components/InputModal";
import ErrorModal from "../../components/ErrorModal";
import { AppContext } from "../../contexts/AppContext";
import {
  getSelfData,
  getStaticData,
  putSelfAvatar,
  putSelfData,
} from "../../backendCommunication";
import ListView from "../../components/ListView";
import PencilEntry from "../../components/PencilEntry";
import LabelledSlider from "../../components/LabelledSlider";
import { AxiosError } from "axios";
import UNSWipeLogo from "../../assets/UNSWipe-logo-md.png";
import LoadContainer from "../../components/LoadContainer";

const groupTitleStyle = `
  font-bold
`;

const spacerStyle = `
  h-[20px]
`;
const subSpacerStyle = `
  h-[10px]
`;

const Profile = () => {
  const navigate = useNavigate();
  const { token, updateToken } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [nameInputModalShow, setNameInputModalShow] = useState(false);
  const [ageInputModalShow, setAgeInputModalShow] = useState(false);
  const [pronounsModalInputShow, setPronounsModalInputShow] = useState(false);
  const [asrInputModalShow, setAsrInputModalShow] = useState(false);
  const [wamInputModalShow, setWamInputModalShow] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const languagesRef = useRef([] as string[]);
  const pronounsRef = useRef([] as string[]);
  const wamsRef = useRef([] as string[]);
  const coursesRef = useRef([] as string[]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [asr, setAsr] = useState(0);
  const [wam, setWam] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [courseSelection, setCourseSelection] = useState([] as boolean[]);
  const [futureCourseSelection, setFutureCourseSelection] = useState(
    [] as boolean[]
  );
  const [languageSelection, setLanguageSelection] = useState([] as boolean[]);
  const [pronounSelection, setPronounSelection] = useState([] as boolean[]);
  const [preferredLanguageSelection, setPreferredLanguageSelection] = useState(
    [] as boolean[]
  );
  const [preferredPronounSelection, setPreferredPronounSelection] = useState(
    [] as boolean[]
  );
  // const [preferredAgeRange, setPreferredAgeRange] = useState([] as number[]);
  // const [preferredWamRange, setPreferredWamRange] = useState([] as string[]);

  const toggleCourseSelection = (index: number) =>
    setCourseSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const toggleFutureCourseSelection = (index: number) =>
    setFutureCourseSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const toggleLanguageSelection = (index: number) =>
    setLanguageSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const togglePronounSelection = (index: number) =>
    setPronounSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const togglePreferredLanguageSelection = (index: number) =>
    setPreferredLanguageSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  const togglePreferredPronounSelection = (index: number) =>
    setPreferredPronounSelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );

  const [imgRefresh, setImgRefresh] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // await sleep(3000);
        const staticData = await getStaticData(token);
        languagesRef.current = staticData.languages;
        pronounsRef.current = staticData.pronouns;
        wamsRef.current = staticData.wams;
        coursesRef.current = staticData.courses;

        const selfData = await getSelfData(token);
        console.log(selfData);
        setFirstName(selfData.firstName);
        setLastName(selfData.lastName);
        setAge(selfData.age);
        setAsr(selfData.academicSocialRatio);
        setWam(wamsRef.current.indexOf(selfData.wam));
        setAvatarUrl(selfData.avatarUrl);
        setCourseSelection(
          coursesRef.current.map((course) => selfData.courses.includes(course))
        );
        setFutureCourseSelection(
          coursesRef.current.map((course) =>
            selfData.futureCourses.includes(course)
          )
        );
        setLanguageSelection(
          languagesRef.current.map((language) =>
            selfData.languages.includes(language)
          )
        );
        setPreferredLanguageSelection(
          languagesRef.current.map((language) =>
            selfData.preferredLanguages.includes(language)
          )
        );
        console.log(selfData);
        setPronounSelection(
          pronounsRef.current.map((pronoun) =>
            selfData.pronouns.includes(pronoun)
          )
        );
        setPreferredPronounSelection(
          pronounsRef.current.map((pronoun) =>
            selfData.preferredPronouns.includes(pronoun)
          )
        );
      } catch (e) {
        localStorage.clear();
        location.reload();
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col h-svh w-svw">
      <div
        className="
        content-center
        justify-center
        items-center
        overflow-auto
        w-full
        h-full
        p-4
      "
      >
        <div className="flex justify-center items-center my-4">
          <img src={UNSWipeLogo} alt="UNSWipe logo" />
        </div>
        <div
          className={`
          ${column}
          bg-primary-50
          rounded-2xl
        `}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="collapse"
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              const file = e.target.files?.[0];
              if (!file) {
                return;
              }

              try {
                setLoading(true);
                const url = await putSelfAvatar(token, file);
                setAvatarUrl(url);
              } catch (e) {
                if (e instanceof AxiosError) {
                  setErrorMessage(e.response?.data.errors[0].message);
                } else {
                  setErrorMessage("Internal error: Could not update avatar");
                }
              } finally {
                setImgRefresh((prev) => prev + 0.05); // Force <img> to re-fetch and not use cache
                setLoading(false);
              }
            }}
          />
          <LoadContainer loading={loading} className="w-full h-[40vh] rounded-t-2xl">
            <button
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                className="
                w-full
                rounded-t-2xl
                h-[40vh]
                object-cover
              "
                src={`${avatarUrl}?${imgRefresh}` || "/src/assets/frenchman.jpeg"}
              />
            </button>
          </LoadContainer>

          <div className={`${column} p-3`}>
            <div className={subSpacerStyle} />
            <PencilEntry
              descriptor="Name"
              text={`${firstName} ${lastName}`}
              onEdit={() => setNameInputModalShow(true)}
              loading={loading}
            />

            <div className={subSpacerStyle} />
            <div className={row}>
              <div className={`${column} w-[50%]`}>
                <PencilEntry
                  descriptor="Age"
                  text={age.toString()}
                  onEdit={() => setAgeInputModalShow(true)}
                  loading={loading}
                  />
                <div className={subSpacerStyle} />
                <PencilEntry
                  descriptor="Academic Social Ratio"
                  text={`${Math.round(asr * 100)}%`}
                  onEdit={() => setAsrInputModalShow(true)}
                  loading={loading}
                />
              </div>
              <div className={`${column} w-[50%]`}>
                <PencilEntry
                  descriptor="Pronouns"
                  text={pronounSelection
                    .map((b, i) => (b ? pronounsRef.current[i] : null))
                    .filter((x) => x != undefined)
                    .join(", ")}
                  onEdit={() => setPronounsModalInputShow(true)}
                  loading={loading}
                />
                <div className={subSpacerStyle} />
                <PencilEntry
                  descriptor="WAM"
                  text={wamsRef.current[wam]}
                  onEdit={() => setWamInputModalShow(true)}
                  loading={loading}
                />
              </div>
            </div>

            <div className={subSpacerStyle} />

            <div className={groupTitleStyle}>Current Courses</div>
            <LoadContainer loading={loading} className="h-[45px] w-[350px]">
              <ListView
                contents={coursesRef.current}
                selected={courseSelection}
                onSelect={toggleCourseSelection}
              />
            </LoadContainer>

            <div className={spacerStyle} />

            <div className={groupTitleStyle}>Untaken Courses</div>
            <LoadContainer loading={loading} className="h-[45px] w-[350px]">
              <ListView
                contents={coursesRef.current}
                selected={futureCourseSelection}
                onSelect={toggleFutureCourseSelection}
              />
            </LoadContainer>

            <div className={spacerStyle} />

            <div className={groupTitleStyle}>Languages</div>
            <ListView
              contents={languagesRef.current}
              selected={languageSelection}
              onSelect={toggleLanguageSelection}
            />

            {seeMore && (
              <>
                <div className={spacerStyle} />
                <div className={groupTitleStyle}>
                  Preferred Matched Languages
                </div>
                <ListView
                  contents={languagesRef.current}
                  selected={preferredLanguageSelection}
                  onSelect={togglePreferredLanguageSelection}
                />

                <div className={spacerStyle} />
                <div className={groupTitleStyle}>
                  Preferred Matched Pronouns
                </div>
                <ListView
                  contents={pronounsRef.current}
                  selected={preferredPronounSelection}
                  onSelect={togglePreferredPronounSelection}
                />
              </>
            )}

            <div
              className="mt-4 text-sm underline opacity-75 cursor-pointer"
              onClick={() => setSeeMore((prev) => !prev)}
            >
              {seeMore ? "See Less" : "See More"}
            </div>
          </div>
        </div>
        <div className={`${center} flex-col`}>
          <button
            className={bigButton}
            onClick={async (e: FormEvent) => {
              e.preventDefault();

              if (!courseSelection.some((selection) => selection)) {
                setErrorMessage("Please select at least one course");
                return;
              }

              if (!futureCourseSelection.some((selection) => selection)) {
                setErrorMessage("Please select at least one future course");
                return;
              }

              if (!languageSelection.some((selection) => selection)) {
                setErrorMessage("Please select at least one language");
                return;
              }

              if (!preferredLanguageSelection.some((selection) => selection)) {
                setErrorMessage(
                  "Please select at least one preferred language"
                );
                return;
              }

              if (!preferredPronounSelection.some((selection) => selection)) {
                setErrorMessage("Please select at least one preferred pronoun");
                return;
              }

              if (!preferredLanguageSelection.some((selection) => selection)) {
                setErrorMessage(
                  "Please select at least one preferred language"
                );
                return;
              }

              if (!preferredPronounSelection.some((selection) => selection)) {
                setErrorMessage("Please select at least one preferred pronoun");
                return;
              }

              try {
                // setLoading(true);

                await putSelfData(token, {
                  firstName,
                  lastName,
                  age,
                  academicSocialRatio: asr,
                  wam: wamsRef.current[wam],
                  pronouns: pronounsRef.current.filter(
                    (_, i) => pronounSelection[i]
                  ),
                  courses: coursesRef.current.filter(
                    (_, i) => courseSelection[i]
                  ),
                  futureCourses: coursesRef.current.filter(
                    (_, i) => futureCourseSelection[i]
                  ),
                  languages: languagesRef.current.filter(
                    (_, i) => languageSelection[i]
                  ),
                  preferredLanguages: languagesRef.current.filter(
                    (_, i) => preferredLanguageSelection[i]
                  ),
                  preferredPronouns: pronounsRef.current.filter(
                    (_, i) => preferredPronounSelection[i]
                  ),
                });
              } catch (e: unknown) {
                if (e instanceof AxiosError) {
                  setErrorMessage(e.response?.data.errors[0].message);
                } else {
                  setErrorMessage("Internal error");
                }
              } finally {
                // setLoading(false);
              }
            }}
          >
            {updateLoading ? <Spinner /> : "Save"}
          </button>
          <button
            className={`${bigButtonEmphasised} mt-0`}
            onClick={() => {
              updateToken(null);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-full">
        <NavBar navigate={navigate} index={1} />
      </div>

      <InputModal
        title="Name"
        show={nameInputModalShow}
        onHide={() => setNameInputModalShow(false)}
      >
        <div className={`${column} gap-y-4`}>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputStyle}
          />
        </div>
      </InputModal>
      <InputModal
        title="Age"
        show={ageInputModalShow}
        onHide={() => setAgeInputModalShow(false)}
      >
        <div className="w-[80%]">
          <LabelledSlider
            min={15}
            max={30}
            value={age}
            onSlide={setAge}
            label={age.toString()}
          />
        </div>
      </InputModal>
      <InputModal
        title="Pronouns"
        show={pronounsModalInputShow}
        onHide={() => setPronounsModalInputShow(false)}
      >
        {pronounsRef.current.map((pronoun, i) => (
          <button
            className="m-1 py-2 px-3 rounded-full bg-secondary-bg-200"
            key={i}
            onClick={() => {
              togglePronounSelection(i);
              setPronounsModalInputShow(false);
            }}
          >
            {pronoun}
          </button>
        ))}
      </InputModal>
      <InputModal
        title="Academic Social Ratio"
        show={asrInputModalShow}
        onHide={() => setAsrInputModalShow(false)}
      >
        <div className="w-[80%]">
          <LabelledSlider
            min={0}
            max={1}
            step={0.01}
            value={asr}
            onSlide={setAsr}
            label={`${Math.round(asr * 100)}%`}
          />
        </div>
      </InputModal>
      <InputModal
        title="WAM"
        show={wamInputModalShow}
        onHide={() => setWamInputModalShow(false)}
      >
        <div className="w-[80%]">
          <LabelledSlider
            min={0}
            max={wamsRef.current.length - 1}
            value={wam}
            onSlide={setWam}
            label={wamsRef.current[wam]}
          />
        </div>
      </InputModal>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default Profile;

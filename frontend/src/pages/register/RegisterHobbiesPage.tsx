import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { center, column, bigButton, searchBar } from "../../resources";
import ErrorModal from "../../components/ErrorModal";
import BackButton from "../../components/BackButton";
import ProgressBar from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import {
  getSelfData,
  getStaticData,
  putSelfData,
} from "../../backendCommunication";
import { AxiosError } from "axios";
import ListSearch from "../../components/ListSearch";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";

const RegisterHobbies = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hobbySelection, setHobbySelection] = useState([] as boolean[]);

  const hobbiesRef = useRef([] as string[]);
  const toggleHobbySelection = (index: number) =>
    setHobbySelection((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const staticData = await getStaticData(token);
        hobbiesRef.current = staticData.hobbies;
        const selfData = await getSelfData(token);
        setHobbySelection(
          hobbiesRef.current.map((hobby) => selfData.hobbies?.includes(hobby))
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
          <BackButton onBack={() => navigate("/register-future-courses")} />
        </div>
        <div className={center}>
          <img className="w-[100px]" src={UNSWipeCat} />
        </div>
      </div>

      <div className="flex justify-end opacity-60 text-sm pb-[10px]">
        3 of 5
      </div>

      <div className={`${center} pb-[20px]`}>
        <ProgressBar progress={60} />
      </div>

      <div className="text-[2.5rem] font-extrabold text-primary-500">
        Hobbies?
      </div>
      <div className="pb-3">What do you like doing in your free time?</div>

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
        contents={hobbiesRef.current}
        selected={hobbySelection}
        searchInput={searchInput}
        onSelect={(i) => toggleHobbySelection(i)}
        loading={loading}
      />

      <div className={center}>
        <button
          className={bigButton}
          onClick={async (e: FormEvent) => {
            e.preventDefault();

            if (hobbySelection.every((selection) => !selection)) {
              setErrorMessage("Please select at least one hobby");
              return;
            }

            try {
              setLoading(true);

              await putSelfData(token, {
                hobbies: hobbiesRef.current.filter((_, i) => hobbySelection[i]),
              });
              navigate("/register-preferences");
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

export default RegisterHobbies;

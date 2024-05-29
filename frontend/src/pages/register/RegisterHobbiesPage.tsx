import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Spinner } from "react-bootstrap";
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
      prevState.map((value, i) => (i === index ? !value : value)),
    );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const staticData = await getStaticData(token);
        hobbiesRef.current = staticData.hobbies;
        const selfData = await getSelfData(token);
        setHobbySelection(
          hobbiesRef.current.map((hobby) => selfData.hobbies?.includes(hobby)),
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
          <BackButton onBack={() => navigate("/register-future-courses")} />
        </div>
        <div className={center}>
          <img className="w-[120px]" src="/src/assets/UNSWipe-cat.png" />
        </div>
      </div>

      <div className="flex justify-end">3 of 5</div>

      <div className="h-[10px]" />

      <div className={center}>
        <ProgressBar progress={60} />
      </div>

      <div className="h-[30px]" />

      <div className="text-[2.5rem] font-bold">Hobbies?</div>
      <div>What do you like doing in your free time?</div>

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
        contents={hobbiesRef.current}
        selected={hobbySelection}
        searchInput={searchInput}
        onSelect={(i) => toggleHobbySelection(i)}
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

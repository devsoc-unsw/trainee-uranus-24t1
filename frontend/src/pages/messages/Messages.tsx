import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { center, column, row, searchBar } from "../../resources";
import { AppContext } from "../../contexts/AppContext";
import ErrorModal from "../../components/ErrorModal";
import { Spinner } from "react-bootstrap";
import {
  Message,
  UserInfo,
  getSelfData,
  getSelfMessages,
  getUsersFromId,
} from "../../backendCommunication";
import { messagesByMongodbTimestamp } from "../../sorting";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";

type ConversationMap = { [id: string]: Message[] };
type NameMap = { [id: string]: string };
type AvatarMap = NameMap;

const Messages = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [conversations, setConversations] = useState({} as ConversationMap);
  const [names, setNames] = useState({} as NameMap);
  const [avatars, setAvatars] = useState({} as AvatarMap);

  useEffect(() => {
    const load = async () => {
      try {
        const selfData = await getSelfData(token);
        const selfId: string = selfData._id;
        const messages: Message[] = await getSelfMessages(token);

        const conversationMap: { [id: string]: Message[] } = {};
        messages.forEach((message) => {
          const user = message.members.find((id) => id !== selfId);
          if (user == undefined) {
            return;
          }
          conversationMap[user] ??= [];
          conversationMap[user].push(message);
        });
        Object.keys(conversationMap).forEach((user) => {
          conversationMap[user].sort(messagesByMongodbTimestamp);
        });
        setConversations(conversationMap);

        const ids = Array.from(
          new Set(messages.flatMap((message) => message.members))
        );
        const users: UserInfo[] = await getUsersFromId(token, ids);

        const nameMap: NameMap = {};
        const avatarMap: AvatarMap = {};
        users.forEach((user) => {
          nameMap[user._id] = `${user.firstName} ${user.lastName}`;
          avatarMap[user._id] = user.avatarUrl;
        });
        setNames(nameMap);
        setAvatars(avatarMap);
      } catch {
        setErrorMessage("Could not retrieve server data");
      }
    };

    const intervalId = setInterval(load, 20000);
    (async () => {
      setLoading(true);
      await load();
      setLoading(false);
    })();
    return () => clearInterval(intervalId);
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
      <div className={`${column} content-center grow h-full p-4 overflow-clip`}>
        <div className="flex justify-center items-center">
          <img src={UNSWipeCat} alt="UNSWipe Cat Mascot" className="h-24" />
        </div>
        <div className="text-[2.5rem] font-bold text-primary-500">Messages</div>

        <input
          className={searchBar}
          placeholder="🔍 Search"
          type="input"
          onChange={(e) => {
            e.preventDefault();
            setSearchInput(e.target.value);
          }}
        />

        <div className={`${column} gap-2 mt-4 overflow-auto`}>
          {Object.keys(conversations)
            .sort((a, b) =>
              messagesByMongodbTimestamp(
                conversations[b][conversations[b].length - 1],
                conversations[a][conversations[a].length - 1]
              )
            )
            .map((user) => {
              if (
                !names[user]
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase())
              ) {
                return undefined;
              }

              return (
                <button
                  key={user}
                  onClick={() => navigate(`/messages/${user}`)}
                  className="my-2"
                >
                  <div className={`${row} items-center gap-2`}>
                    <img
                      src={avatars[user]}
                      className="w-[55px] h-[55px] rounded-full object-cover"
                    />
                    <div className={`${column} items-start flex-grow`}>
                      <div className="font-bold">{names[user]}</div>
                      <div className="text-primary-300">
                        {
                          conversations[user][conversations[user].length - 1]
                            .content
                        }
                      </div>
                    </div>
                    <div>notif dot</div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      <div className="w-full">
        <NavBar navigate={navigate} index={2} />
      </div>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default Messages;

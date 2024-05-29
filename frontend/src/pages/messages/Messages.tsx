import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import NavBar from "../../components/NavBar";
import { useContext, useEffect, useRef, useState } from "react";
import { column, row, searchBar } from "../../resources";
import { AppContext } from "../../contexts/AppContext";
import ErrorModal from "../../components/ErrorModal";
import {
  Message,
  MessageType,
  UserInfo,
  getSelfData,
  getSelfMessages,
  getUsersFromId,
} from "../../backendCommunication";
import { messagesByMongodbTimestamp } from "../../sorting";
import UNSWipeCat from "../../assets/UNSWipe-cat.png";
import LoadContainer from "../../components/LoadContainer";

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

  const selfIdRef = useRef("");

  useEffect(() => {
    const load = async () => {
      try {
        const selfData = await getSelfData(token);
        selfIdRef.current = selfData._id;
        const messages: Message[] = await getSelfMessages(token);

        const conversationMap: { [id: string]: Message[] } = {};
        messages.forEach((message) => {
          const user = message.members.find((id) => id !== selfIdRef.current);
          if (user == undefined) {
            return;
          }
          conversationMap[user] ??= [];
          conversationMap[user].push(message);
        });
        Object.keys(conversationMap).forEach((user) => {
          conversationMap[user].sort(messagesByMongodbTimestamp);
        });

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
        setConversations(conversationMap);
      } catch {
        setErrorMessage(
          "There was a problem retrieving your data. Please try again."
        );
      }
    };

    const intervalId = setInterval(load, 5000);
    (async () => {
      setLoading(true);
      await load();
      setLoading(false);
    })();
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (loading) {
  //   return (
  //     <div className={`h-svh w-svw ${center}`}>
  //       <Spinner />
  //     </div>
  //   );
  // }

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

        <div className="grow">
          <LoadContainer loading={loading} className="mt-4 w-full h-[75px]">
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

                  const unreadMessage =
                    conversations[user]
                      .filter(
                        (m) =>
                          (m.sender !== selfIdRef.current &&
                            m.type === MessageType.Default) ||
                          (m.sender === selfIdRef.current &&
                            m.type === MessageType.Seen)
                      )
                      .pop()?.type === MessageType.Default;

                  const latestMessage =
                    conversations[user]
                      .filter((m) => m.type === MessageType.Default)
                      .pop()?.content ?? "";

                  return (
                    <button
                      key={user}
                      onClick={() => navigate(`/messages/${user}`)}
                      className="my-2 overflow-hidden"
                    >
                      <div className={`${row} items-center gap-2`}>
                        <img
                          src={avatars[user]}
                          className="w-[55px] h-[55px] rounded-full object-cover"
                        />
                        <div className={`${column} items-start flex-grow`}>
                          <div className="font-bold">{names[user]}</div>
                          <div
                            className={`text-primary-300 text-left ${
                              unreadMessage && "font-semibold"
                            }`}
                          >
                            {latestMessage?.length > 35
                              ? latestMessage.slice(0, 35) + "..."
                              : latestMessage}
                          </div>
                        </div>
                        {unreadMessage && (
                          <div className={`${row} gap-1`}>
                            <GoDotFill className="text-secondary-bg-400 h-[30px] animate-ping-slow" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </LoadContainer>
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

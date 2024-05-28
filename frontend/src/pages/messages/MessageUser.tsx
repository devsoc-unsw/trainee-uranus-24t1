import { useContext, useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import ErrorModal from "../../components/ErrorModal";
import { center, column, row } from "../../resources";
import { Spinner } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import {
  Message,
  getSelfData,
  getSelfMessages,
  getUsersFromId,
} from "../../backendCommunication";
import { messagesByMongodbTimestamp } from "../../sorting";
import { Socket, io } from "socket.io-client";
import { LOCAL_HOST, SOCKET_PATH } from "../../utils/constants";

const MessageUser = () => {
  const navigate = useNavigate();
  const { user: userId } = useParams<{ user: string }>();
  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [messages, setMessages] = useState([] as Message[]);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const socketRef = useRef(undefined as Socket | undefined);
  const selfIdRef = useRef("");

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const messageContainerEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const users = await getUsersFromId(token, [userId]);
        const user = users[0];
        setName(`${user.firstName} ${user.lastName}`);
        setAvatarUrl(user.avatarUrl);

        const messages = await getSelfMessages(token);
        messages.sort(messagesByMongodbTimestamp);
        setMessages(messages);

        const self = await getSelfData(token);
        selfIdRef.current = self._id;

        socketRef.current = io(`${LOCAL_HOST}`, { path: SOCKET_PATH });
        socketRef.current.emit("token", token);
        socketRef.current.on("chat message out", (message) => {
          setMessages((prevMessages) => prevMessages.concat([message]));
        });
        socketRef.current.on("disconnect", () => {
          localStorage.clear();
          navigate("/login");
        });

        setMessages(messages);
      } catch {
        localStorage.clear();
        location.reload();
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // messageContainerEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const container = messageContainerRef.current;
    const newMessage: HTMLElement = messageContainerEndRef.current?.previousSibling as HTMLElement;
    if (container && newMessage) {
      const itemHeight = newMessage.offsetHeight;
      container.scrollBy({ top: itemHeight, behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className={`h-svh w-svw ${center}`}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`${column} relative w-svw h-svh p-4 overflow-clip`}>
      <div className="w-full relative flex items-center justify-center gap-2">
        <BackButton onBack={() => navigate("/messages")} />
        <img
          src={avatarUrl}
          className="w-[55px] h-[55px] rounded-full object-cover"
        />
        <div className="flex-grow font-bold">{name}</div>
        <button onClick={() => setErrorMessage("🛠️")}>
          <IoMdInformationCircleOutline className="text-4xl text-secondary-bg-400" />
        </button>
      </div>

      <div
        className={`flex-grow ${column} overflow-y-auto`}
        ref={messageContainerRef}
      >
        {messages.map((message) => {
          const senderStyle =
            message.sender === selfIdRef.current
              ? "self-end text-white bg-secondary-bg-400"
              : "self-start bg-primary-50";
          return (
            <div className={`p-2.5 my-1 rounded-full ${senderStyle}`}>
              {message.content}
            </div>
          );
        })}
        <div ref={messageContainerEndRef} />
      </div>

      <div className={`${row} items-center h-[40px] gap-2`}>
        <input
          className="grow rounded-full py-2 px-3 bg-primary-50 h-full"
          type="text"
          placeholder="Message"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (inputContent.length === 0) {
              return;
            }

            socketRef.current?.emit("chat message in", {
              sender: selfIdRef.current,
              receiver: userId,
              content: inputContent,
            });
            setInputContent("");
          }}
        >
          <div className="aspect-square h-full">
            <PiPaperPlaneRightFill
              className="
              rounded-full
              bg-secondary-bg-400
              p-2.5
              text-4xl
              text-white
              w-full
              h-full"
            />
          </div>
        </button>
      </div>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default MessageUser;

import { useContext, useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import ErrorModal from "../../components/ErrorModal";
import { /*center,*/ column, row } from "../../resources";
// import { Spinner } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import {
  Message,
  MessageType,
  getSelfData,
  getSelfMessages,
  getUsersFromId,
} from "../../backendCommunication";
import { messagesByMongodbTimestamp } from "../../sorting";
import { Socket, io } from "socket.io-client";
import { LOCAL_HOST, SOCKET_PATH } from "../../utils/constants";
import LoadContainer from "../../components/LoadContainer";

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
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);

        const users = await getUsersFromId(token, [userId]);
        const user = users[0];
        setName(`${user.firstName} ${user.lastName}`);
        setAvatarUrl(user.avatarUrl);

        const self = await getSelfData(token);
        selfIdRef.current = self._id;

        const messages = await getSelfMessages(token);

        setMessages(
          messages
            .filter(
              (message) =>
                message.members.includes(user._id) &&
                message.members.includes(self._id)
            )
            .sort(messagesByMongodbTimestamp)
        );
        if (!isMounted) {
          socketRef.current = io(`${LOCAL_HOST}`, { path: SOCKET_PATH });
          socketRef.current.emit("token", token);
          socketRef.current.on("chat message out", (message) => {
            setMessages((prevMessages) => prevMessages.concat([message]));
            if (message.type === MessageType.Default) {
              socketRef.current?.emit("chat message in", {
                sender: selfIdRef.current,
                receiver: userId,
                type: MessageType.Seen,
                content: "",
              });
            }
          });
          socketRef.current?.emit("chat message in", {
            sender: selfIdRef.current,
            receiver: userId,
            type: MessageType.Seen,
            content: "",
          });
        }
      } catch {
        setErrorMessage(
          "There was a problem retrieving your data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messageContainerEndRef &&
      messageContainerEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  return (
    <div className={`${column} relative w-svw h-svh p-4 overflow-clip`}>
      <div className="w-full relative flex items-center justify-center gap-2 pb-3">
        <BackButton onBack={() => navigate("/messages")} />
        <LoadContainer
          loading={loading}
          className="w-[55px] h-[55px] rounded-full object-cover overflow-clip"
        >
          <img
            src={avatarUrl}
            className="w-[55px] h-[55px] rounded-full object-cover"
          />
        </LoadContainer>
        <div className="grow">
          <LoadContainer loading={loading} className="h-[25px] w-[200px]">
            <div className="font-bold">{name}</div>
          </LoadContainer>
        </div>
        <button onClick={() => setErrorMessage("🛠️")}>
          <IoMdInformationCircleOutline className="text-4xl text-secondary-bg-400" />
        </button>
      </div>

      <div
        className={`flex-grow ${column} overflow-y-auto`}
        ref={messageContainerRef}
      >
        {messages.map((message) => {
          if (
            messages
              .slice()
              .reverse()
              .find(
                (m) =>
                  m.sender !== selfIdRef.current && m.type === MessageType.Seen
              ) === message
          ) {
            return (
              <img
                key={message._id}
                src={avatarUrl}
                className="w-[20px] h-[20px] rounded-full object-cover my-3"
              />
            );
          }
          if (message.type !== MessageType.Default) {
            return undefined;
          }

          const senderStyle =
            message.sender === selfIdRef.current
              ? "self-end text-white bg-secondary-bg-400"
              : "self-start bg-primary-50";
          return (
            <div
              key={message._id}
              className={`px-3.5 py-2.5 my-1 rounded-3xl max-w-[80%] ${senderStyle}`}
            >
              {message.content}
            </div>
          );
        })}
        <div ref={messageContainerEndRef} />
      </div>

      <form
        className={`${row} items-center h-[40px] gap-2 mt-2`}
        onSubmit={async (e) => {
          e.preventDefault();
          if (inputContent.length === 0) {
            return;
          }

          socketRef.current?.emit("chat message in", {
            sender: selfIdRef.current,
            receiver: userId,
            type: MessageType.Default,
            content: inputContent,
          });
          setInputContent("");
        }}
      >
        <LoadContainer loading={loading} className="grow h-full">
          <input
            className="grow rounded-full py-2 px-3 bg-primary-50 h-full"
            type="text"
            placeholder="Message"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
        </LoadContainer>
        <LoadContainer loading={loading} className="aspect-square h-full">
          <button type="submit">
            <div className="aspect-square h-full">
              <PiPaperPlaneRightFill
                className="
                rounded-full
                bg-secondary-bg-400
                p-2
                text-white
                w-full
                h-full"
              />
            </div>
          </button>
        </LoadContainer>
      </form>

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default MessageUser;

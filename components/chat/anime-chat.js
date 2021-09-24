import { useEffect, useState, useContext } from "react";
import UserContext from "../../store/user-context";

//import { ChatEngine } from "react-chat-engine/dist/index.modern";
import dynamic from "next/dynamic";
// const ChatEngine = dynamic(
//   () => import("react-chat-engine/dist/index.modern").then((a) => a.ChatEngine),
//   { ssr: false }
// );

const ChatEngine = dynamic(
  () =>
    import("../../lib/react-chat-engine/dist/index.modern").then(
      (a) => a.ChatEngine
    ),
  { ssr: false }
);

const AnimeChat = () => {
  const [secret, setSecret] = useState("");
  const [username, setUsername] = useState("");
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setSecret(localStorage.getItem("user-chat-profile-secret"));
    setUsername(userCtx.user?.username);
  }, [userCtx]);

  if (!username)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>Loading...</div>
    );

  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.CHAT_PROJECT_ID}
      userName={username}
      userSecret={secret}
    />
  );
};

export default AnimeChat;

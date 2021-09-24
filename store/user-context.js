import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/client";
import { toast } from "react-toastify";

const UserContext = createContext({
  user: null,
  session: null,
  unread_messages: null,
  addUserFavAnime: function (userData, favAnime) {},
  deleteUserFavAnime: function (userData, favAnime) {},
});

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [unreadMessages, setUnreadMessages] = useState();

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      const users = await axios.get("/api/users");
      const user = users.data.filter(
        (user) => user.email === session?.user.email
      )[0];

      if (user) {
        const userChats = await axios({
          method: "GET",
          url: "https://api.chatengine.io/chats/",
          headers: {
            "Project-ID": `${process.env.CHAT_PROJECT_ID}`,
            "User-Name": user.username,
            "User-Secret": localStorage.getItem("user-chat-profile-secret"),
          },
        });

        let unreadMessages = 0;

        userChats.data.map((chat) => {
          const lastMessage = chat.last_message.id;
          const currentUser = chat.people.filter(
            (person) => person.person.username === user.username
          )[0];
          if (currentUser.last_read !== lastMessage) {
            unreadMessages = unreadMessages + 1;
          }
        });

        setUnreadMessages(unreadMessages);
      }
      setCurrentSession(session);
      setCurrentUser(user);
    }
    fetchData();
  }, []);

  async function addUserFavAnimeHandler(userData, favAnime) {
    let currentUserData = { ...userData };
    let userFavAnimes = currentUserData.liked_animes;
    userFavAnimes.push(favAnime);

    currentUserData.liked_animes = userFavAnimes;

    toast.info("Pending...", { toastId: "updateFav",autoClose:10000 });

    await axios
      .patch(`/api/users/${currentUserData._id}`, {
        liked_animes: userFavAnimes,
      })
      .then((data) => {
        console.log("success add");
        toast.dismiss("updateFav");
      })
      .catch((error) => console.log(error.response.data.message));
    if (favAnime.type === "anime") {
      toast.success("Anime is added to favourites.");
    } else {
      toast.success("Manga is added to favourites.");
    }

    setCurrentUser(currentUserData);
  }

  async function deleteUserFavAnimeHandler(userData, favAnime) {
    let currentUserData = { ...userData };
    let userFavAnimes = currentUserData.liked_animes;
    userFavAnimes = userFavAnimes.filter((anime) => anime._id !== favAnime._id);
    currentUserData.liked_animes = userFavAnimes;

    toast.info("Pending...", { toastId: "updateFav",autoClose:10000 });

    await axios
      .patch(`/api/users/${currentUserData._id}`, {
        liked_animes: userFavAnimes,
      })
      .then((data) => {
        console.log("success delete");
        toast.dismiss("updateFav");
      })
      .catch((error) => console.log(error.response.data.message));
    if (favAnime.type === "anime") {
      toast.warning("Anime is removed from favourites.");
    } else {
      toast.warning("Manga is removed from favourites.");
    }

    setCurrentUser(currentUserData);
  }

  const context = {
    user: currentUser,
    session: currentSession,
    unread_messages: unreadMessages,
    addUserFavAnime: addUserFavAnimeHandler,
    deleteUserFavAnime: deleteUserFavAnimeHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

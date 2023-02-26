import Head from "next/head";
import AnimeChat from "../../components/chat/anime-chat";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import axios from "axios";
import { getSession } from "next-auth/client";
import { Fragment, useState } from "react";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { User } from '../../backend/models/user';

function ChatPage() {
  const [innerWidth, setInnerWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : ""
  );

  if (typeof window !== "undefined") {
    window.addEventListener("resize", function () {
      setInnerWidth(window.innerWidth);
      return window.innerWidth;
    });
  }

  console.log(innerWidth);

  return (
    <Fragment>
      <Head>
        <title>Chat Page</title>
        <meta
          name="description"
          content="chat with your friends about your favourites animes  and mangas."
        />
      </Head>

      <Navbar />
      <div> {innerWidth > 767 && <Slidebar />}</div>

      <div className="chat-box">
        <AnimeChat />
      </div>

      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

   const allUsers = await getAllModelDocuments(User, "username");


  const chatUsers = await axios({
    method: "GET",
    url: "https://api.chatengine.io/users/",
    headers: { "PRIVATE-KEY": `${process.env.CHAT_PRIVATE_KEY}` },
  });

  let chatUsersEmailsList = [];
  chatUsers.data.map((user) => chatUsersEmailsList.push(user.email));

  let usersList = [];
  allUsers.map((user) => usersList.push(user));

  for (let chatEmail of chatUsersEmailsList) {
    for (let user of usersList) {
      if (chatEmail === user.email) {
        usersList = usersList.filter((element) => element.email !== user.email);
      }
    }
  }

  for (let user of usersList) {
    await axios({
      method: "POST",
      url: "https://api.chatengine.io/users/",
      data: {
        username: user.username,
        first_name: user.username,
        last_name: user.username,
        secret: `${process.env.CHAT_SECRET}`,
        email: user.email,
      },
      headers: { "PRIVATE-KEY": `${process.env.CHAT_PRIVATE_KEY}` },
    });
  }

  return {
    props: { allUsers: allUsers },
  };
}
export default ChatPage;

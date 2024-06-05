import Head from "next/head";

import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import { useContext, useEffect, useState } from "react";

import UserContext from "../../store/user-context";
import SavedItems from "./../../components/anime/anime-saved-items";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { User } from "./../../backend/models/user";

function SavedAnimePage(props) {
  const { favAnimesList } = props; // from server
  const [favAnimes, setFavAnimes] = useState(favAnimesList);
  const userCtx = useContext(UserContext);

  const currentData = favAnimes ? favAnimes : favAnimesList;
  useEffect(() => {
    setFavAnimes(userCtx?.user?.liked_animes);
  }, [userCtx]);

  return (
    <Fragment>
      <Head>
        <title>Favourites</title>
        <meta
          name="description"
          content="This is the user favourites anime page."
        />
      </Head>

      <Navbar />
      <Slidebar />
      <div className="favourites-page">
        {currentData.map((anime) => (
          <SavedItems key={anime._id} anime={anime} />
        ))}
      </div>
      <Footer />
    </Fragment>
  );
}

//// Server Side  ////
// export async function getStaticProps(context) {
//   const { userId } = context.params;
//   const allUsers = await getAllModelDocuments(User, "username");

//   const userData = allUsers.filter((user) => user._id === userId);
//   const favAnimes = userData[0].liked_animes;
//   return { props: { favAnimesList: favAnimes }, revalidate: 30 };
// }

// export async function getStaticPaths() {
//   const allUsers = await getAllModelDocuments(User, "username");

//   const ids = allUsers.map((user) => ({
//     params: {
//       userId: user._id,
//     },
//   }));

//   return { paths: ids, fallback: false };
// }

export async function getServerSideProps(context) {
  const { userId } = context.params;
  const allUsers = await getAllModelDocuments(User, "username");

  const userData = allUsers.filter((user) => user._id === userId);
  const favAnimes = userData[0].liked_animes;

  return { props: { favAnimesList: favAnimes } };
}

export default SavedAnimePage;

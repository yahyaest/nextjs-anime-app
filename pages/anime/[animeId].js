import Head from "next/head";
import React, { useContext } from "react";
import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import AnimeInfo from "./../../components/anime/anime-page-info";
import AnimeComments from "../../components/anime/anime-comments";
import { getAnimeById } from "../../backend/helpers/mongodb-util";
import UserContext from "../../store/user-context";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { Comment } from "./../../backend/models/comment";
import { getAllCollectionDocuments } from "../../backend/helpers/mongodb-util";

function AnimePage(props) {
  const { animeData, animeComments, animeId } = props;

  const userCtx = useContext(UserContext);

  return (
    <Fragment>
      <Head>
        <title>{animeData.title}</title>
        <meta
          name="description"
          content={
            animeData.synopsis ? animeData.synopsis : animeData.description
          }
        />
      </Head>
      <Navbar />
      <Slidebar />
      <div className="anime-page">
        <AnimeInfo animeData={animeData} />
        <AnimeComments
          animeComments={animeComments}
          currentUser={userCtx.user}
          animeId={animeId}
          type={"anime"}
        />
      </div>
      <Footer />
    </Fragment>
  );
}

//// Server Side  ////
export async function getStaticProps(context) {
  try {
    const { animeId } = context.params;
    const anime = await getAnimeById(animeId);
    const allComments = await getAllModelDocuments(Comment, "created_at");
    const animeComments = allComments.filter(
      (comment) => comment.anime._id === animeId
    );

    return {
      props: { animeData: anime, animeComments, animeId },
      revalidate: 30,
    };
  } catch (err) {
    console.log(err);
    return { props: {}, revalidate: 30 };
  }
}

export async function getStaticPaths() {
  try {
    // const basePath = process.env.BASEPATH
    // const basePath = process.env.NODE_ENV === 'production' ? '/my-app' : '';
    const allAnimes = await getAllCollectionDocuments("animes", { title: 1 });
    const ids = allAnimes.map((anime) => ({
      params: {
        animeId: anime._id,
      },
    }));

    return { paths: ids, fallback: true };
  } catch (err) {
    console.log(err);
    return { paths: [], fallback: true };
  }
}

export default AnimePage;

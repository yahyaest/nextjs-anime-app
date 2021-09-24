import Head from "next/head";
import React, { useContext } from "react";
import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import MangaInfo from "./../../components/anime/manga-page-info";
import MangaComments from "../../components/anime/anime-comments";
import {getMangaById} from "../../backend/helpers/mongodb-util";
import UserContext from "../../store/user-context";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { Comment } from './../../backend/models/comment';
import { getAllCollectionDocuments } from "../../backend/helpers/mongodb-util";

function MangaPage(props) {
  const { mangaData, mangaComments, mangaId } = props;

  const userCtx = useContext(UserContext);

  return (
    <Fragment>
      <Head>
        <title>{mangaData.title}</title>
        <meta
          name="description"
          content={
            mangaData.synopsis ? mangaData.synopsis : mangaData.description
          }
        />
      </Head>
      <Navbar />
      <Slidebar />
      <div className="anime-page">
        <MangaInfo mangaData={mangaData} />
        <MangaComments
          animeComments={mangaComments}
          currentUser={userCtx.user}
          animeId={mangaId}
          type={"manga"}
        />
      </div>
      <Footer />
    </Fragment>
  );
}

//// Server Side  ////
export async function getStaticProps(context) {
  const { mangaId } = context.params;
  const manga = await getMangaById(mangaId);
  const allComments = await getAllModelDocuments(Comment, "created_at");
  const mangaComments = allComments.filter(
    (comment) => comment.manga?._id === mangaId
  );

  return {
    props: { mangaData: manga, mangaComments, mangaId },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allMangas = await getAllCollectionDocuments("mangas", { title: 1 });
  const ids = allMangas.map((manga) => ({
    params: {
      mangaId: manga._id,
    },
  }));

  return { paths: ids, fallback: false };
}

export default MangaPage;

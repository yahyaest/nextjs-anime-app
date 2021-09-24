import Head from "next/head";
import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import AnimePageCard from "./../../components/anime/anime-page-card";
import { getAllAnimes } from "../../backend/helpers/api-util";
import { getAllCollectionDocuments } from "../../backend/helpers/mongodb-util";

function AnimePage(props) {
  const { allAnimes } = props;
 // const { currentUser ,currentSession} = props;
  return (
    <Fragment>
      <Head>
        <title>Anime Page</title>
        <meta
          name="description"
          content="this page contain all animes listed in our site."
        />
      </Head>

      <Navbar />
      <Slidebar />

      <div id="anime-page" className=" anime-component">
        <h1 className="text-center my-5" style={{ color: "#ff3838" }}>
          Anime List
        </h1>
        <div className="anime-list">
          {allAnimes.map((anime) => (
            <AnimePageCard key={anime._id} data={anime} type={"anime"} />
          ))}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allAnimes = await getAllCollectionDocuments("animes", { title: 1 });

  return {
    props: { allAnimes },
    revalidate: 180,
  };
}

export default AnimePage;

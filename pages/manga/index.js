import Head from "next/head";
import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import MangaPageCard from "./../../components/anime/anime-page-card";
import { getAllMangas } from "../../backend/helpers/api-util";
import { getAllCollectionDocuments } from "../../backend/helpers/mongodb-util";

function MangaPage(props) {
  const { allMangas } = props;
 // const { currentUser ,currentSession} = props;
  return (
    <Fragment>
      <Head>
        <title>Manga Page</title>
        <meta
          name="description"
          content="this page contain all mangas listed in our site."
        />
      </Head>

      <Navbar />
      <Slidebar />

      <div id="anime-page" className=" anime-component">
        <h1 className="text-center my-5" style={{ color: "#0076bd" }}>
          Manga List
        </h1>
        <div className="anime-list">
          {allMangas.map((manga) => (
            <MangaPageCard key={manga._id} data={manga} type={"manga"} />
          ))}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allMangas = await getAllCollectionDocuments("mangas", { title: 1 });
  return {
    props: { allMangas },
    revalidate: 180,
  };
}

export default MangaPage;

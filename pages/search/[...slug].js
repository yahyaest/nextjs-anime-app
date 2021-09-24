import Head from "next/head";
import React from "react";
import axios from "axios";
import { Fragment } from "react";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import AnimeSearchItem from "../../components/anime/anime-search-item";
import MangaSearchItem from "../../components/anime/manga-search-item";

import { getAllAnimes, getAllMangas } from "../../backend/helpers/api-util";
import { getAllCollectionDocuments } from "../../backend/helpers/mongodb-util";

function AnimeResultPage(props) {
  const { searchData, isRegistered, _id, type } = props;

  return (
    <Fragment>
      <Head>
        <title>{searchData.attributes.canonicalTitle}</title>
        <meta
          name="description"
          content={
            searchData.attributes.synopsis
              ? searchData.attributes.synopsis
              : searchData.attributes.description
          }
        />
      </Head>

      <Navbar />
      <Slidebar />
      <div className="anime-page">
        {type === "anime" ? (
          <AnimeSearchItem
            searchData={searchData}
            isRegistered={isRegistered}
            _id={_id}
          />
        ) : (
          <MangaSearchItem
            searchData={searchData}
            isRegistered={isRegistered}
            _id={_id}
          />
        )}
      </div>
      <Footer />
    </Fragment>
  );
}

//// Server Side  ////
export async function getServerSideProps(context) {
  const filteredData = context.params.slug;
  const type = filteredData[0];
  const id = parseInt(filteredData[2]);
  if (isNaN(id)) {
    return { props: { hasError: true } };
  }

  const searchData = await axios.get(`https://kitsu.io/api/edge/${type}/${id}`);

  const allAnimes = await getAllCollectionDocuments("animes", { title: 1 });

  const allMangas = await getAllCollectionDocuments("mangas", { title: 1 });

  const allData =
    type === "anime" ? allAnimes : allMangas;

  let findData = {};

  if (type === "anime") {
    findData = allData.find(
      (data) => parseInt(data.animeId) === parseInt(searchData.data.data.id)
    );
  } else {
    findData = allData.find(
      (data) => parseInt(data.mangaId) === parseInt(searchData.data.data.id)
    );
  }

  const isRegistered = findData ? true : false;

  if (findData)
    return {
      props: {
        searchData: searchData.data.data,
        isRegistered,
        _id: findData._id,
        type,
      },
    };

  return {
    props: { searchData: searchData.data.data, isRegistered, type },
  };
}

export default AnimeResultPage;

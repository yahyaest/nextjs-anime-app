import Head from "next/head";
import { useRef, useState, Fragment } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import SearchCard from "../../components/anime/search-card";

function SearchPage(props) {
  const searchInput = useRef();
  const [searchData, setSearchData] = useState([]);
    const [searchType, setSearchType] = useState("anime");


  const getSearchData = async (e) => {
    e.preventDefault();
    const searchQuery = searchInput.current.value;
    
    const url = searchType === "anime" ? `https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}&page[limit]=20` : `https://kitsu.io/api/edge/manga?filter[text]=${searchQuery}&page[limit]=20`
   
    let searchResult = await axios.get( url);

    searchResult = searchResult.data.data;
    let idsTable = [];

    for (let element of searchResult) {
      idsTable.push(parseInt(element.id));
    }

    idsTable = idsTable.sort((a, b) => a - b);

    let finalData = [];
    for (let id of idsTable) {
      const elementToAdd = searchResult.find(
        (element) => parseInt(element.id) === id
      );
      finalData.push(elementToAdd);
    }

    setSearchData(finalData);
  };

  return (
    <Fragment>
      <Head>
        <title>Search Page</title>
        <meta
          name="description"
          content="find your favourites animes and add them to your saved list."
        />
      </Head>

      <Navbar />
      <Slidebar />

      <div id="search-page" className=" search-component">
        <h1 className="text-center my-5">Find your favourites animes & mangas</h1>

         <div className="searchBy my-5">
          <label className="mx-2" htmlFor="search-type">Search for : </label>
          <select name="" id="search-type" onChange={(e)=> setSearchType(e.currentTarget.value)}>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>
        </div>


        <form
          className="form-inline d-flex align-content-center search-form"
          onSubmit={getSearchData}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={searchInput}
          ></input>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>

       
        
        <div className="search-result">
          {searchData.map((item) => (
            <SearchCard key={item.id} item={item} type={searchType}/>
          ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default SearchPage;

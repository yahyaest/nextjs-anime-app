import { Fragment, useState,useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../store/user-context";


function AnimeSearchItem(props) {
  const { isRegistered, _id } = props;
  const animeData = props.searchData
  const [isSaved, setIsSaved] = useState(isRegistered);
  const userCtx = useContext(UserContext)


  const getImageComponent = () => {
    if (animeData.attributes.coverImage)
      return (
        <Image
          src={animeData.attributes.coverImage.small}
          alt=""
          width={1920}
          height={600} className="skeleton"
        />
      );
    else
      return (
        <Image
          src={animeData.attributes.posterImage.large}
          alt=""
          width={400}
          height={1000} className="skeleton"
        />
      );
  };

  const handleAddAnimeButton = async () => {
    const newAnime = {
      animeId: animeData.id,
      type:animeData.type,
      title: animeData.attributes.canonicalTitle,
      synopsis: animeData.attributes.synopsis,
      description: animeData.attributes.description,
      showType: animeData.attributes.showType,
      startDate: animeData.attributes.startDate,
      endDate: animeData.attributes.endDate,
      status: animeData.attributes.status,
      episodeCount: animeData.attributes.episodeCount,
      coverImage: animeData.attributes.coverImage?.small,
      posterImage: animeData.attributes.posterImage?.large,
      youtubeVideoId: animeData.attributes?.youtubeVideoId,
    };

    if (!isSaved) {
      await axios
        .post("/api/animes/", { anime: newAnime })
        .then((data) => console.log("success add"))
        .catch((error) => console.log(error.response.data.message));
      toast.success("Anime is saved to the database.");
      setIsSaved(!isSaved);
    } else {
      // if(_id)
      // {
      await axios
        .delete(`/api/animes/${_id}`)
        .then((data) => console.log("success delete"))
        .catch((error) => console.log(error.response.data.message));
      toast.warning("Anime is removed from database.");
      setIsSaved(!isSaved);
      //}
      // else toast.error("an error has occured.");
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mb-3">{animeData.attributes.canonicalTitle}</h1>
      <div id="cover" className="text-center">
        {getImageComponent()}
      </div>

      <div className="my-5">
           <p>
        <strong>Synopsis : </strong>
        {animeData.attributes.synopsis
          ? animeData.attributes.synopsis
          : animeData.attributes.description}
      </p>
      <p>
        <strong>Show Type : </strong>
        {animeData.attributes.showType}
      </p>
      <p>
        <strong>Start Date : </strong>
        {animeData.attributes.startDate}
      </p>
      {animeData.attributes.endDate && (
        <p>
          <strong>End Date : </strong>
          {animeData.attributes.endDate}
        </p>
      )}
      <p>
        <strong>Status : </strong>
        {animeData.attributes.status}
      </p>
      {animeData.attributes.episodeCount && (
        <p>
          <strong>Episode Count : </strong>
          {animeData.attributes.episodeCount}
        </p>
        )}
      </div>


    {userCtx.user?.isAdmin &&  <button className="btn btn-crimson" onClick={handleAddAnimeButton}>
        {!isSaved ? (
          <i className="bx bxs-heart mx-2"></i>
        ) : (
          <i className="bx bx-heart mx-2"></i>
        )}
        {!isSaved ? "Add To Database" : "Remove From Database "}
      </button>}
    </Fragment>
  );
}

export default AnimeSearchItem;

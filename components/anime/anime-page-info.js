import { Fragment, useState, useContext, useEffect } from "react";
import Image from "next/image";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import UserContext from "../../store/user-context";

function AnimeInfo(props) {
  const { animeData } = props;
  const [isOpen, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const index = userCtx.user?.liked_animes.findIndex(
      (anime) => anime._id === animeData._id
    );


    if (index === -1 || index === undefined) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }, [userCtx]);


  const getImageComponent = () => {
    if (animeData.coverImage)
      return (
        <Image src={animeData.coverImage} alt="" width={1920} height={600} className="skeleton" />
      );
    else
      return (
        <Image src={animeData.posterImage} alt="" width={400} height={1000} className="skeleton" />
      );
  };

  const handleFavouriteButton = async () => {
    if (!isFavourite) {
      await userCtx.addUserFavAnime(userCtx.user, animeData);
      setIsFavourite(!isFavourite);
    } else {
      await userCtx.deleteUserFavAnime(userCtx.user, animeData);
      setIsFavourite(!isFavourite);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mb-3">{animeData.title}</h1>
      <div id="cover" className="text-center">
        {getImageComponent()}
      </div>

      <div className="my-5">
        <p>
          <strong>Synopsis : </strong>
          {animeData.synopsis ? animeData.synopsis : animeData.description}
        </p>
        <p>
          <strong>Show Type : </strong>
          {animeData.showType}
        </p>
        <p>
          <strong>Start Date : </strong>
          {animeData.startDate}
        </p>
        {animeData.endDate && (
          <p>
            <strong>End Date : </strong>
            {animeData.endDate}
          </p>
        )}
        <p>
          <strong>Status : </strong>
          {animeData.status}
        </p>
        {animeData.episodeCount && (
          <p>
            <strong>Episode Count : </strong>
            {animeData.episodeCount}
          </p>
        )}
      </div>

      {animeData.youtubeVideoId && (
        <div>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={animeData.youtubeVideoId}
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <div className="flex">
        {animeData.youtubeVideoId && (
          <button
            className="btn btn-primary mb-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            <i className="bx bxl-youtube mx-2"></i>
            Watch Trailer
          </button>
        )}
        {userCtx.user && (
          <button
            className="btn btn-crimson mx-4"
            onClick={handleFavouriteButton}
          >
            {!isFavourite ? (
              <i className="bx bxs-heart mx-2"></i>
            ) : (
              <i className="bx bx-heart mx-2"></i>
            )}
            {!isFavourite ? "Add To Favourites" : "Remove From Favourites "}
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default AnimeInfo;

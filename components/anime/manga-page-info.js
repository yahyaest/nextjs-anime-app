import { Fragment, useState, useContext, useEffect } from "react";
import Image from "next/image";
import "react-modal-video/css/modal-video.min.css";
import UserContext from "../../store/user-context";

function AnimeInfo(props) {
  const { mangaData } = props;
  const [isFavourite, setIsFavourite] = useState();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const index = userCtx.user?.liked_animes.findIndex(
      (anime) => anime._id === mangaData._id
    );


    if (index === -1 || index === undefined) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }, [userCtx]);


  const getImageComponent = () => {
    if (mangaData.coverImage)
      return (
        <Image src={mangaData.coverImage} alt="" width={1920} height={600} className="skeleton"/>
      );
    else
      return (
        <Image src={mangaData.posterImage} alt="" width={400} height={1000} className="skeleton"/>
      );
  };

  const handleFavouriteButton = async () => {
    if (!isFavourite) {
      await userCtx.addUserFavAnime(userCtx.user, mangaData);
      setIsFavourite(!isFavourite);
    } else {
      await userCtx.deleteUserFavAnime(userCtx.user, mangaData);
      setIsFavourite(!isFavourite);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mb-3">{mangaData.title}</h1>
      <div id="cover" className="text-center">{getImageComponent()}</div>

            <div className="my-5">  <p>
        <strong>Synopsis : </strong>
        {mangaData.synopsis ? mangaData.synopsis : mangaData.description}
      </p>
     
      <p>
          <strong>Start Date : </strong>
          {mangaData.startDate}
        </p>
        {mangaData.endDate && (
          <p>
            <strong>End Date : </strong>
            {mangaData.endDate}
          </p>
        )}
        <p>
          <strong>Status : </strong>
          {mangaData.status}
        </p>
        {mangaData.chapterCount && (
          <p>
            <strong>Chaptre Count : </strong>
            {mangaData.chapterCount}
          </p>
        )}

         {mangaData.volumeCount && (
          <p>
            <strong>Volume Count : </strong>
            {mangaData.volumeCount}
          </p>
        )}

      </div>

    

     

      <div >
       
       {userCtx.user && <button className="btn btn-crimson mx-4" onClick={handleFavouriteButton}>
          {!isFavourite ? (
            <i className="bx bxs-heart mx-2"></i>
          ) : (
            <i className="bx bx-heart mx-2"></i>
          )}
          {!isFavourite ? "Add To Favourites" : "Remove From Favourites "}
        </button>}
      </div>
    </Fragment>
  );
}

export default AnimeInfo;

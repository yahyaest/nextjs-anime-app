import { Fragment, useState, useContext } from "react";
import Image from "next/legacy/image";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../store/user-context";

function MangaSearchItem(props) {
  const { isRegistered, _id } = props;
  const mangaData = props.searchData;
  const [isSaved, setIsSaved] = useState(isRegistered);
  const userCtx = useContext(UserContext);

  const getImageComponent = () => {
    if (mangaData.attributes.coverImage)
      return (
        <Image
          src={mangaData.attributes.coverImage.original}
          alt=""
          width={1920}
          height={600}
          className="skeleton"
        />
      );
    else
      return (
        <Image
          src={mangaData.attributes.posterImage.large}
          alt=""
          width={400}
          height={1000}
          className="skeleton"
        />
      );
  };

  const handleAddMangaButton = async () => {
    const newManga = {
      mangaId: mangaData.id,
      type: mangaData.type,
      title: mangaData.attributes.canonicalTitle,
      synopsis: mangaData.attributes.synopsis,
      description: mangaData.attributes.description,
      startDate: mangaData.attributes.startDate,
      endDate: mangaData.attributes.endDate,
      status: mangaData.attributes.status,
      chapterCount: mangaData.attributes.chapterCount,
      volumeCount: mangaData.attributes.volumeCount,
      coverImage: mangaData.attributes.coverImage?.original,
      posterImage: mangaData.attributes.posterImage?.large,
    };

    if (!isSaved) {
      await axios
        .post("/api/mangas/", { manga: newManga })
        .then((data) => console.log("success add"))
        .catch((error) => console.log(error.response.data.message));
      toast.success("Manga is saved to the database.");
      setIsSaved(!isSaved);
    } else {
      // if(_id)
      // {
      await axios
        .delete(`/api/mangas/${_id}`)
        .then((data) => console.log("success delete"))
        .catch((error) => console.log(error.response.data.message));
      toast.warning("Manga is removed from database.");
      setIsSaved(!isSaved);
      //}
      // else toast.error("an error has occured.");
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mb-3">
        {mangaData.attributes.canonicalTitle}
      </h1>
      <div id="cover" className="text-center">
        {getImageComponent()}
      </div>

      <div className="my-5">
        <p>
          <strong>Synopsis : </strong>
          {mangaData.attributes.synopsis
            ? mangaData.attributes.synopsis
            : mangaData.attributes.description}
        </p>

        <p>
          <strong>Start Date : </strong>
          {mangaData.attributes.startDate}
        </p>
        {mangaData.attributes.endDate && (
          <p>
            <strong>End Date : </strong>
            {mangaData.attributes.endDate}
          </p>
        )}
        <p>
          <strong>Status : </strong>
          {mangaData.attributes.status}
        </p>
        {mangaData.attributes.chapterCount && (
          <p>
            <strong>Chaptre Count : </strong>
            {mangaData.attributes.chapterCount}
          </p>
        )}

        {mangaData.attributes.volumeCount && (
          <p>
            <strong>Volume Count : </strong>
            {mangaData.attributes.volumeCount}
          </p>
        )}
      </div>

      {userCtx.user?.isAdmin && (
        <button className="btn btn-crimson" onClick={handleAddMangaButton}>
          {!isSaved ? (
            <i className="bx bxs-heart mx-2"></i>
          ) : (
            <i className="bx bx-heart mx-2"></i>
          )}
          {!isSaved ? "Add To Database" : "Remove From Database "}
        </button>
      )}
    </Fragment>
  );
}

export default MangaSearchItem;

import { useContext } from "react";
import UserContext from "../../store/user-context";

function SavedItems(props) {
  const { anime } = props;
  const userCtx = useContext(UserContext);

  return (
    <article
      className={`postcard ${
        anime.type === "anime" ? "light blue" : "dark red"
      } `}
      key={anime._id}
    >
      <a className="postcard__img_link" href="#">
        <img
          className="postcard__img skeleton"
          src={anime.posterImage}
          alt="Image Title"
        />
      </a>
      <div
        className={`postcard__text ${
          anime.type === "anime" ? "t-dark" : ""
        } mx-3`}
      >
        <h1
          className={`postcard__title ${
            anime.type === "anime" ? " blue" : " red"
          } mx-1`}
        >
          {anime.title}
        </h1>
        <div className="postcard__subtitle small mx-1">
          <time dateTime={anime.startDate}>
            <i className="fa fa-calendar mr-2 mx-2"></i>
            Start date : {anime.startDate}
          </time>
        </div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt">
          {anime.synopsis ? anime.synopsis : anime.description}
        </div>
        <ul className="postcard__tagbox">
          {anime.type === "anime" ? (
            <li className="tag__item">
              <i className="fa fa-tv mr-2"></i> {anime.type}
            </li>
          ) : (
            <li className="tag__item">
              <i className="fa fa-book mr-2"></i> {anime.type}
            </li>
          )}

          {anime.showType && (
            <li className="tag__item">
              <i className="fa fa-tag mr-2"></i> {anime.showType}
            </li>
          )}

          {anime.episodeCount && (
            <li className="tag__item">
              <i className="fa fa-cubes mr-2"></i> {anime.episodeCount} episodes
            </li>
          )}

          {anime.chapterCount && (
            <li className="tag__item">
              <i className="fa fa-cubes mr-2"></i> {anime.chapterCount} chapters
            </li>
          )}

          {anime.status === "finished" ? (
            <li className="tag__item">
              <i className="fa fa-toggle-on mr-2"></i> {anime.status}
            </li>
          ) : (
            <li className="tag__item">
              <i className="fa fa-toggle-off mr-2"></i> {anime.status}
            </li>
          )}

          <li
            className={`tag__item play ${
              anime.type === "anime" ? "blue" : "red"
            }`}
          >
            <a onClick={() => userCtx.deleteUserFavAnime(userCtx.user, anime)}>
              <i className="fa fa-trash mr-2 mx-1"></i>Delete from favourites
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default SavedItems;

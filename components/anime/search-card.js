import { useRouter } from "next/router";
import { truncate } from "../../utils/utils";


function SearchCard(props) {
  const router = useRouter();

 const { item,type } = props;
 
  const getTitleFontSize = (title) => {
    let fontSize = "1.3rem";

    if (title.length > 20) fontSize = "1.125rem";
    if (title.length > 30) fontSize = "1rem";
    if (title.length > 40) fontSize = "0.8rem";

    return (
      <h2 className="anime-card__title text-white" style={{ fontSize: `${fontSize}` }}>
        {title}
      </h2>
    );
  };

  return (
    <div
      className="anime-card skeleton"
      style={{
        backgroundImage: `url(${item.attributes.posterImage.large})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="anime-card__content">
        {getTitleFontSize(item.attributes.canonicalTitle)}

        <p className="anime-card__description">
          {truncate(`${item.attributes.description}`, 100)}
        </p>
        <button
          className="anime-card__btn"
          onClick={() =>
            router.push(
              `/search/${type}/${item.attributes.canonicalTitle.replace("/", " ")}/${
                item.id
              }`
            )
          }
        >
          Visit
        </button>
      </div>
    </div>
  );
}

export default SearchCard;

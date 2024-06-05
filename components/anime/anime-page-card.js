import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { truncate } from "./../../utils/utils";

function AnimePageCard(props) {
  const router = useRouter();

  const { data, type } = props;

  const getTitleFontSize = (title) => {
    let fontSize = "1.5rem";

    if (title.length > 20) fontSize = "1.25rem";
    if (title.length > 30) fontSize = "1rem";
    if (title.length > 40) fontSize = "0.75rem";

    return (
      <h1
        className="card__title"
        style={{ fontSize: `${fontSize}`, marginBottom: "1.25rem" }}
      >
        {title}
      </h1>
    );
  };

  return (
    <div className={`card ${type === "manga" ? "card-manga" : ""} mx-1 `}>
      <Image
        src={data.posterImage}
        alt={data.title}
        width={400}
        height={800}
        className="skeleton"
      />
      <div className="descriptions">
        {getTitleFontSize(data.title)}
        <p >
          {data.description
            ? truncate(data.description, 300)
            : truncate(data.synopsis, 300)}
        </p>
        <button onClick={() => router.push(`/${type}/${data._id}`)}>
          Visit
        </button>
      </div>
    </div>
  );
}

export default AnimePageCard;

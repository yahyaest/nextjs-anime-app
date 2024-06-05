import Image from "next/legacy/image";

function ProvidersSection() {
  return (
    <section>
      <div className="row m-2 text-white text-center">
        <div className="col-lg-4 col-md-6">
          <Image
            className="bd-placeholder-img rounded-circle"
            src={`/images/crunchyroll.jpg`}
            alt={"crunchyroll.jpg"}
            width={140}
            height={140}
          />

          <h2>Crunchyroll</h2>
          <p>
            Crunchyroll. World&apos;s Largest Collection of Anime. Catch your
            favorite shows and movies. Play Store ·
          </p>
          <p>
            <a
              className="btn btn-secondary"
              href="https://www.crunchyroll.com/"
            >
              View details &raquo;
            </a>
          </p>
        </div>
        <div className="col-lg-4 col-md-6">
          <Image
            className="bd-placeholder-img rounded-circle"
            src={`/images/funimation.png`}
            alt={"funimation.png"}
            width={140}
            height={140}
          />

          <h2>Funimation</h2>
          <p>
            Enjoy over 10,000 episodes and movies from our huge library of subs
            and dubs, featuring a deep catalog of big hits, fan favorites and
            all-time classics.
          </p>
          <p>
            <a className="btn btn-secondary" href="https://www.funimation.com/">
              View details &raquo;
            </a>
          </p>
        </div>
        <div className="col-lg-4 col-md-6">
          <Image
            className="bd-placeholder-img rounded-circle"
            src={`/images/netflix.png`}
            alt={"netflix.png"}
            width={140}
            height={140}
          />

          <h2>Netflix</h2>
          <p>
            Action-packed adventures, offbeat comedies and, inspirational
            stories. These anime movies and TV shows have a style and spirit
            unlike anything else.
          </p>
          <p>
            <a className="btn btn-secondary" href="https://www.netflix.com/">
              View details &raquo;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProvidersSection;

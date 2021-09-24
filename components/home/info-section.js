import Image from "next/image";

function InfoSection() {
  return (
    <section>
      <div className="container my-5 bg-light">
        <div className=" row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-5 p-3 p-lg-5 pt-lg-3">
            <h2 className="display-4 fw-bold lh-1">AnimeLab. Everywhere. </h2>
            <p className="lead">
              Visit us from the comfort of your living room or on the go with
              our handy mobile apps.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              >
                Primary
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Default
              </button>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1 p-0 overflow-hidden shadow-lg mx-lg-3 mb-3">
            <Image
              className="rounded-lg-3 "
              src={"/images/bg-1.jpg"}
              alt=""
              layout="responsive"
              width={1920}
              height={1080}
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;

import Carousel from "react-bootstrap/Carousel";

function CarouselSection() {
 return (
   <section className="my__carousel_main">
     <Carousel>
       <Carousel.Item interval={1000}>
         <div className="d-block w-100 img1-overlay"></div>

         <Carousel.Caption>
           <h3>Anime</h3>
           <p>We provide a large set of animes for all kind of genres.</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item interval={500}>
         <div className="d-block w-100 img2-overlay"></div>

         <Carousel.Caption>
           <h3>Manga</h3>
           <p>Our API offer a wide library of diffrents manga.</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <div className="d-block w-100 img3-overlay"></div>

         <Carousel.Caption>
           <h3>Movie</h3>
           <p>
             Find latest anime movies.
           </p>
         </Carousel.Caption>
       </Carousel.Item>
     </Carousel>
   </section>
 );
}

export default CarouselSection


function IntroSection() {
 return (
   <section className="intro  position-relative mb-5 ">
     <div className=" m-2 text-center text-white m-2 absolute-center">
       <div className="col-sm-6 intro-content">
         <h1 className="text-white">Anime Lab</h1>
         <p className="lead">
           Anime fans love AnimeLab! Watch anime hits and fast-tracked simulcast
           shows direct from Japan in HD. AnimeLab features thousands episodes
           available to watch for free and new shows are added every week.
           AnimeLab supports the anime creators and is free and legal.
         </p>
         <p className="lead">
           <a
             href="/search"
             className="btn btn-lg btn-secondary fw-bold border-white bg-white text-black-50"
           >
             Get Started
           </a>
         </p>
       </div>
     </div>
   </section>
 );
}

export default IntroSection

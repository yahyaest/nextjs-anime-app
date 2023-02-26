import { Fragment } from "react";
import Head from "next/head";
import axios from "axios";
import moment from "moment"
import Navbar from "./../components/navbar";
import Slidebar from './../components/slidebar';
import Footer from './../components/footer';

function news(props) {

  const { animeNews  } = props;
 
 if (!animeNews?.articles) return (
   <Fragment>
     <Navbar />
     <Slidebar />
     <div className="news_component text-center py-5">
      <h5> Anime news API is down please try later</h5>
     </div>
     <Footer />
   </Fragment>
 );

 return (
   <Fragment>
     <Head>
       <title>News Page</title>
       <meta name="description" content="find latest anime news and more ..." />
     </Head>

     <Navbar />
     <Slidebar />
     <div className="news_component">
       <h1 className="text-center mb-4">Lastest Anime News</h1>
       <div className="news_list">
         {animeNews.articles.map((news, i) => (
           <div
             className="news-card shadow col-lg-3 col-md-5 col-sm-10 mb-5"
             key={i}
             onClick={() => window.open(`${news.url}`)}
           >
             <div className="news-image-container">
              <div className="news-title">
               <h5 >{news.title}</h5>
               <h6 >By : {news.author}</h6>
              </div>
               <img
                 style={{ maxWidth: "125px", maxHeight: "125px" }}
                 src={news?.urlToImage || `/images/news.jpg`}
                 alt="news"
               />
             </div>

             <p>
               {news.description.length > 200
                 ? `${news.description.substring(0, 200)}...`
                 : news.description}
             </p>

             <div className="provider-container">
               <div>
                 <img
                   style={{ maxWidth: "50px", maxHeight: "50px" }}
                   src={news?.urlToImage || `/images/news.jpg`}
                   alt="news"
                 />
                 <p className="provider-name">{news?.source?.name}</p>
               </div>
               <p>{moment(news.publishedAt).startOf("ss").fromNow()}</p>
             </div>
           </div>
         ))}
       </div>
     </div>
     <Footer />
   </Fragment>
 );
}

export default news;

export async function getServerSideProps() {
  let date = new Date()
  let toDate = date.toISOString().split("T")[0];
  let fromDate = date.setDate(date.getDate() - 7)
  fromDate = new Date(fromDate)
  fromDate = fromDate.toISOString().split("T")[0];

  
  const API_KEY = "d7b269e561c342a69e33bc0bb2b86ddf";
  const url = `https://newsapi.org/v2/everything?q=japanese-anime&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${API_KEY}`;

try {
  const response = await axios.get(url);
   return {
     props: {
       animeNews: response.data,
     },
   };
  
} catch (error) {
  console.error(error);
  return{
    props: {
       animeNews: null,
     },
  }
}
}

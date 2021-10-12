import { Fragment } from "react";
import Head from "next/head";
import axios from "axios";
import moment from "moment"
import Navbar from "./../components/navbar";
import Slidebar from './../components/slidebar';
import Footer from './../components/footer';

function news(props) {
  const { animeNews  } = props;
 
 if (!animeNews?.value) return "Loading...";

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
         {animeNews.value.map((news, i) => (
           <div
             className="news-card shadow col-lg-3 col-md-5 col-sm-10 mb-5"
             key={i}
             onClick={() => window.open(`${news.url}`)}
           >
             <div className="news-image-container">
               <h4 className="news-title">{news.name}</h4>
               <img
                 style={{ maxWidth: "125px", maxHeight: "125px" }}
                 src={news?.image?.thumbnail?.contentUrl || `/images/news.jpg`}
                 alt="news"
               />
             </div>

             <p>
               {news.description.length > 100
                 ? `${news.description.substring(0, 100)}...`
                 : news.description}
             </p>

             <div className="provider-container">
               <div>
                 <img
                   style={{ maxWidth: "50px", maxHeight: "50px" }}
                   src={
                     news.provider[0]?.image?.thumbnail?.contentUrl ||
                     `/images/news.jpg`
                   }
                   alt="news"
                 />
                 <p className="provider-name">{news.provider[0]?.name}</p>
               </div>
               <p>{moment(news.datePublished).startOf("ss").fromNow()}</p>
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
  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search?q=anime&freshness=Day&count=50",
    params: { safeSearch: "Off", textFormat: "Raw" },
    headers: {
      "accept-language": "en",
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "039a9846e8msh09b07e71c9a02acp1703cdjsna6d0a8007ad0",
    },
  };

  

 const response = await axios.request(options);

  return {
    props: {
      animeNews: response.data,
    },
  };
}

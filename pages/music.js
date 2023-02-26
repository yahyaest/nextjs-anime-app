import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import millify from "millify";
import ytSearch from "yt-search";
import { Input, Select, Space, Button,Typography } from "antd";

import Navbar from "./../components/navbar";
import Slidebar from "./../components/slidebar";
import Footer from "./../components/footer";

import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const Music = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [musicSelector, setMusicSelector] = useState("opening");
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  
  const { videos } = props;
  const { Option } = Select;
  const { Title } = Typography;

  const router = useRouter();
  
  const selector = (
    <Select
      defaultValue="opening"
      className="select-before"
      onSelect={async (e) => {
        setMusicSelector(e);
      }}
    >
      <Option value="ost">Ost</Option>
      <Option value="opening">Opening</Option>
      <Option value="ending">Ending</Option>
    </Select>
  );

  const button = (
    <Button
      type="ghost"
      size="middle"
      onClick={async () => {
        const urlPathname = router.pathname;
        const urlSearch = "?" + router.asPath.split("?")[1];
        const queryParams = new URLSearchParams(urlSearch);
        queryParams.set("search", searchQuery);
        queryParams.set("type", musicSelector);
        await router.replace(
          `${urlPathname}?${queryParams.toString().replace("undefined=&", "")}`
        );
      }}
    >
      Submit
    </Button>
  );

  return (
    <Fragment>
      <Head>
        <title>Music Page</title>
        <meta
          name="description"
          content="find your favourites anime openings,  endings, ost and more ..."
        />
      </Head>
      <Navbar />
      <Slidebar />

      <div className="music_component">
        <Title level={2} className="text-center mb-5">Anime Music</Title>
        <Space direction="vertical" classname="video_search_input my-5">
          <Input
            addonBefore={selector}
            addonAfter={button}
            defaultValue=""
            size="large"
            onChange={async (e) => {
              setSearchQuery(e.currentTarget.value);
            }}
          />
        </Space>
        <div className="video_search_result">
          {videos.length > 0
            ? videos?.map((video) => (
                <div
                  className="video_card my-3"
                  key={video.videoId}
                  onClick={() => {
                    setVideoId(video.videoId);
                    setOpen(true);
                  }}
                >
                  <div className="video_card_img mx-3">
                    <Image
                      src={video.image}
                      alt={video.image}
                      width={400}
                      height={200}
                      className="skeleton"
                    />
                  </div>
                  <div className="video_card_info">
                    <h5 className="video_title">{video.title}</h5>
                    <p>
                      {millify(video.views)} {"views * "} {video.ago}{" "}
                      {" * duration "} {video.timestamp}
                    </p>
                    <p>By {video.author.name}</p>
                    <p>
                      {video.description.length > 200
                        ? video.description.slice(0, 200) + "..."
                        : video.description}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
        {videoId && (
          <div>
            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={isOpen}
              videoId={videoId}
              onClose={() => setOpen(false)}
            />
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Music;

export async function getServerSideProps(context) {
  const { query } = context;
  const keys = Object.keys(query);
  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    return videoResult.videos.length > 1
      ? JSON.parse(JSON.stringify(videoResult.videos))
      : null;
  };

  let videos = {};

  if (keys.length !== 0) {
    videos = await videoFinder(`${query.search} ${query.type}`);
  }

  return {
    props: {
      videos: videos,
    },
  };
}

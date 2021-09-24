import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { Bot } from './../../backend/models/bot';

function getBackgroundColor(length) {
  const backgroundArray = [
    {
      backgroundColor: "#0d7c0a",
      gradientColor: "#343a40",
      textColor: "black",
    },
    {
      backgroundColor: "#135b9e",
      gradientColor: "#343a40",
      textColor: "white",
    },
    {
      backgroundColor: "#9c1d18",
      gradientColor: "#343a40",
      textColor: "white",
    },
    {
      backgroundColor: "#b9a21f",
      gradientColor: "#343a40",
      textColor: "black",
    },
    {
      backgroundColor: "#242724",
      gradientColor: "#343a40",
      textColor: "white",
    },
  ];

  let result = [];

  for (let i = 0; i < length; i++) {
    const index = i % backgroundArray.length;
    result.push(backgroundArray[index]);
  }
  return result;
}

function BotDiscordPage(props) {
  const { bots } = props;
  const [botItems, setBotItems] = useState([]);
  // let botItems = [];
  let dragStartIndex;

  const cardBotStyle = getBackgroundColor(bots.length);

  function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
  }

  function dragEnter() {
    this.classList.add("over");
  }

  function dragLeave() {
    this.classList.remove("over");
  }

  function swapItems(fromIndex, toIndex) {
    console.log(fromIndex, toIndex);

    let botArray = [];
    const dragListItems = document.querySelectorAll(".bot-li");
    dragListItems.forEach((draggable, index) => {
      draggable.setAttribute("data-index", index);
      botArray.push(draggable);
    });

    const botsDiv = document.getElementById("bots-list");
    botsDiv.innerHTML = "";

    for (let index = 0; index < botArray.length; index++) {
      if (index === fromIndex) botsDiv.appendChild(botArray[toIndex]);
      else if (index === toIndex) botsDiv.appendChild(botArray[fromIndex]);
      else botsDiv.appendChild(botArray[index]);
    }
  }

  if (typeof window !== "undefined") {
    const dragListItems = document.querySelectorAll(".bot-li");
    const draggables = document.querySelectorAll(".bot-card");

    dragListItems.forEach((draggable) => {
      draggable.addEventListener("dragover", dragOver);
      draggable.addEventListener("drop", dragDrop);
      draggable.addEventListener("dragenter", dragEnter);
      draggable.addEventListener("dragleave", dragLeave);
    });

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", dragStart);
    });
  }

  useEffect(() => {
    let botArray = [];
    const dragListItems = document.querySelectorAll(".bot-li");
    dragListItems.forEach((draggable, index) => {
      draggable.setAttribute("data-index", index);
      botArray.push(draggable);
    });
    setBotItems(botArray);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Discord Page</title>
        <meta
          name="description"
          content="speak with your favourites anime characters."
        />
      </Head>

      <Navbar />
      <Slidebar />

      <div className="discord_page">
        <h1 className="text-center">Anime Discord</h1>
        <ul id="bots-list">
          {bots.map((bot, index) => (
            <li key={bot._id} className="bot-li">
              <div
                key={bot._id}
                className="bot-card shadow"
                draggable="true"
                style={{
                  background: `linear-gradient(to right, ${cardBotStyle[index].backgroundColor},${cardBotStyle[index].gradientColor})`,
                  color: `${cardBotStyle[index].textColor}`,
                }}
              >
                <h2>{bot.name}</h2>
                <h4>Anime : {bot.anime}</h4>
                <img
                  src={`/uploads/images/${bot.avatar}`}
                  alt={`${bot.avatar}`}
                  className="skeleton"
                />
                <div className="bot-buttons my-2">
                  <button className="btn btn-site shadow">
                    <Link href={`/discord/${bot._id}`}>Chat in this site</Link>
                  </button>
                  <button
                    className="btn btn-discord shadow my-2"
                    // onClick={() => (document.location.href = `${bot.discord}`)}
                    onClick={() =>
                      window.open(`${bot.discord}`, "_blank").focus()
                    }
                  >
                    Chat in discord
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default BotDiscordPage;

export async function getServerSideProps(context) {
  const allBots = await getAllModelDocuments(Bot, "name");

  return {
    props: {
      bots: allBots,
    },
  };
}

import { Fragment, useState } from "react";
import Head from "next/head";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import Navbar from "../../components/navbar";
import Slidebar from "../../components/slidebar";
import Footer from "../../components/footer";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { Bot } from './../../backend/models/bot';

async function getChatData(message, API_URL, botName) {
  // const payload = {
  //   inputs: {
  //     text: message,
  //   },
  // };
  const payload = {inputs : message}
  const headers = {
    Authorization: "Bearer " + process.env.HUGGINGFACE_TOKEN,
  };

  try {
    const response = await axios(API_URL, {
      method: "POST",
      data: payload,
      headers: headers,
    });

    const data = await response.data;
    // return data.generated_text;
    return data[0].generated_text;
  } catch (err) {
    console.log(err.error);
    return err.error || `${botName} is loading ...`;
  }
}

function BotDiscordPage(props) {
  const { bot } = props;

  const [userMessage, setUserMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    if (typeof window !== "undefined") {
      const previewInput = document.getElementById("input_preview");
      const previewImage = document.getElementById("preview_image");
      previewInput.style.display = "block";
      previewInput.style.position = "fixed";
      previewInput.style.bottom = "70px";
      previewImage.style.display = "block";
    }
  };

  let scrollingElement = null;
  if (typeof window !== "undefined") {
    scrollingElement = document.scrollingElement || document.body;
  }
  function scrollToBottom() {
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  async function sendMessage() {
    if (typeof window !== "undefined") {
      const chatDiv = document.querySelector(".chat_display");
      //// Handle User Message
      if (!image && userMessage.length > 0) {
        const userChatElement = document.createElement("div");
        userChatElement.classList.add("user-chat-element");
        const userChatMessage = document.createElement("p");
        userChatMessage.innerHTML = `${userMessage}`;
        userChatElement.appendChild(userChatMessage);
        chatDiv.appendChild(userChatElement);
      } else if (image) {
        const userChatElement = document.createElement("div");
        userChatElement.classList.add("user-chat-img");
        const userChatImage = document.createElement("img");
        userChatImage.id = "image_message";
        userChatImage.src = image;
        userChatImage.alt = "image_message";
        //userChatImage.style.maxWidth = "250px";
        userChatElement.appendChild(userChatImage);
        chatDiv.appendChild(userChatElement);
      } else {
        // do nothing
      }

      ////handle Bot Message
      if (image || userMessage.length > 0) {
        const botResponse = await getChatData(userMessage, bot.url, bot.name);
        try {
          setBotMessage(botResponse.replace("\\N", " "));
        } catch (error) {
          setBotMessage(botResponse);
        }

        const botChatElement = document.createElement("div");
        botChatElement.classList.add("bot-chat-element");
        const botChatImage = document.createElement("img");
        botChatImage.id = "bot_avatar";
        botChatImage.src = `/uploads/images/${bot.avatar}`;
        botChatImage.alt = `${bot.avatar}`;
        const botChatMessage = document.createElement("p");
        try {
          botChatMessage.innerHTML = `${botResponse.replace("\\N", " ")}`;
        } catch (error) {
          botChatMessage.innerHTML = `${botResponse}`;
        }
        botChatElement.appendChild(botChatImage);
        botChatElement.appendChild(botChatMessage);
        chatDiv.appendChild(botChatElement);
      }

      //// Clear chat input
      const previewInput = document.getElementById("input_preview");
      const previewImage = document.getElementById("preview_image");
      if (previewInput && previewImage) {
        previewInput.style.display = "none";
        previewImage.style.display = "none";
      }
      setImage(null);
      scrollToBottom();
      setUserMessage("");
      // const chatInput = document.getElementById("chat_input")
      // chatInput.style.bottom = "10px"
    }
  }

  return (
    <Fragment>
      <Head>
        <title>{bot.name}</title>
        <meta name="description" content={`speak with ${bot.name}`} />
      </Head>

      <Navbar />
      <Slidebar />

      <div className="discord_page">
        <div className="discord_title">
          {" "}
          <img
            style={{ width: "50px", heigth: "50px" }}
            src={`/uploads/images/${bot.avatar}`}
            alt={bot.name}
          />
          <h1 className="text-center mx-3">{bot.name}</h1>
        </div>

        <div className="chat_display">
          {/* <p>User : {userMessage}</p>
        <p>Bot : {botMessage}</p> */}
        </div>

        <div id="input_preview">
          <img id="preview_image" src={image} alt="preview image" />
        </div>

        <div className="chat_input shadow" id="chat_input">
          <InputEmoji
            value={userMessage}
            //cleanOnEnter
            onChange={setUserMessage}
            placeholder="Type a message"
          />

          <div className="image_input" onChange={onImageChange}>
            <label htmlFor="file-input">
              <i className="fa fa-image"></i>
            </label>
            <input id="file-input" type="file" style={{ display: "none" }} />
          </div>
          <i className="fa fa-paper-plane" onClick={sendMessage}></i>
        </div>
      </div>
    </Fragment>
  );
}

export default BotDiscordPage;

export async function getStaticProps(context) {
  const { botId } = context.params;
  const allBots = await getAllModelDocuments(Bot, "name");
  const bot = allBots.filter((bot) => bot._id === botId)[0];

  return {
    props: {
      bot: bot,
      revalidate: 30,
    },
  };
}

export async function getStaticPaths() {
  const allBots = await getAllModelDocuments(Bot, "name");
  const ids = allBots.map((bot) => ({
    params: {
      botId: bot._id,
    },
  }));

  return { paths: ids, fallback: false };
}

const auth = require("./tokens");

// Set Up the Bot to Run Continuously
const keepAlive = require("./server");

// discord.js import (Ver < 13)
const Discord = require("discord.js");
// node-fetch for making HTTP requests
const fetch = require("node-fetch");

keepAlive();

for (const bot of auth.config) {
  const client = new Discord.Client();
  client.on("ready", () => {
    console.log("I am ready !");
    console.log(client.user.tag);
  });

  client.on("message", async (message) => {
    // ignore messages from the bot itself
    if (message.author.bot) {
      return;
    }

    // check bot has permission in server
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
      return;
    }

    // check bot has permission IN CHANNELin channel
    if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      return;
    }

    // form the payload
    const payload = {
      inputs: {
        text: message.content,
      },
    };
    // form the request headers with Hugging Face API key
    const headers = {
      Authorization: "Bearer " + process.env.HUGGINGFACE_TOKEN,
    };

    // set status to typing
    message.channel.startTyping();
    // query the server
    const response = await fetch(bot.api_url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: headers,
    });
    const data = await response.json();

    console.log("admin : ", message.content);
    console.log(client.user.tag, data.generated_text);

    let botResponse = "";
    if (data.hasOwnProperty("generated_text")) {
      botResponse = data.generated_text;
    } else if (data.hasOwnProperty("error")) {
      // error condition
      botResponse = data.error;
    }
    // stop typing
    message.channel.stopTyping();
    // send message to channel as a reply

    message.reply(botResponse);
  });

  client.login(bot.token);
}

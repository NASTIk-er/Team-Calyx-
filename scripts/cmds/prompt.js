const { existsSync, mkdirSync } = require("fs");
const axios = require("axios");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "prompt",
    aliases: ["p"],
    version: "1.0",
    author: "Vex_Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Generate prompt for an image",
    longDescription: "generate prompt for an image",
    category: "image",
    guide: {
      en: "{p}prompt (reply to image)"
    }
  },

  onStart: async function ({ message, event, api }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);
    const { type, messageReply } = event;
    const { attachments, threadID } = messageReply || {};

    if (type === "message_reply" && attachments) {
      const [attachment] = attachments;
      const { url, type: attachmentType } = attachment || {};

      if (!attachment || attachmentType !== "photo") {
        return message.reply("𝙿𝙻𝚉 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰𝙽 𝙸𝙼𝙰𝙶𝙴_🎀");
      }

      try {
        const tinyUrl = await tinyurl.shorten(url);
        const apiUrl = `https://prompt-gen-eight.vercel.app/kshitiz?url=${encodeURIComponent(tinyUrl)}`;
        const response = await axios.get(apiUrl);

        const { prompt } = response.data;

        message.reply(prompt, threadID);
      } catch (error) {
        console.error(error);
        message.reply("❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚙𝚛𝚘𝚖𝚙𝚝.");
      }
    } else {
      message.reply("𝙿𝙻𝚉 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰𝙽 𝙸𝙼𝙰𝙶𝙴_🎀");
    }
  }
};

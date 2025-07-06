const fs = require('fs');

module.exports = {
  config: {
    name: "givefile",
    aliases: ["file"],
    version: "1.0",
    author: "TANVIR",
    countDown: 5,
    role: 0,
    description: "extract file",
    category: "owner",
    guide: "{pn} Write a file name"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61573467434571","61561619394932"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("-𝚁𝙰 𝙱𝙾𝙻𝙾𝙳 𝙴𝙸 𝙲𝙼𝙳 𝙹𝚄𝚂𝚃 𝙰𝙼𝚁 𝙱𝙾𝚂𝚂 𝚄𝚂𝙴 𝙺𝙾𝚁𝚃𝙴 𝙿𝙰𝚁𝙱𝙾-🤡", event.threadID, event.messageID);
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("-𝙿𝙻𝚉 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝙵𝙸𝙻𝙴 𝙽𝙰𝙼𝙴:-📃", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};

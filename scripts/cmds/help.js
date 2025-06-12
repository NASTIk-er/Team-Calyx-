fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[𝗞 𝗔 𝗠 𝗨 ]"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "xos Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────❁";

      msg += `\n│𝚃𝙰𝙽𝚅𝙸𝚁-𝙱𝙾𝚃 𝙷𝙴𝙻𝙿 𝙻𝙸𝚂𝚃\n╰────────────❁`; 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────✰[𝙴𝙽𝙹𝙾𝚈]\n│>𝚃𝙾𝚃𝙰𝙻 𝙲𝙼𝙳: [${totalCommands}].\n│𝚃𝚈𝙿𝙴:[ ${prefix}𝙷𝙴𝙻𝙿 \n│.]\n╰────────────✰`;
      msg += ``;
      msg += `\n╭─────✰\n│ ╣𝚃𝙰𝙽𝚅𝙸𝚁-𝙱𝙾𝚃╠\n╰────────────✰`; 

const helpListImages = [ "https://i.ibb.co/TBv1QsBN/image.jpg" ];


      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`𝙲𝚘𝚖𝚖𝚊𝚗𝚍 "${commandName}" 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
╔═════════════════════╗
║ 🔹 𝙲𝙾𝙼𝙼𝙰𝙽𝙳: 🔶 ${configCommand.name}
╠═══════════════════════╣
║ 📌 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${longDescription}
║ 🆔 𝙰𝚕𝚒𝚊𝚜𝚎𝚜: ${configCommand.aliases}
║ 📎 𝚅𝚎𝚛𝚜𝚒𝚘𝚗:  ${configCommand.version || "1.0"}
║ 👤 𝚁𝚘𝚕𝚎: ${roleText}
║ ⏳ 𝙲𝚘𝚘𝚕𝚍𝚘𝚠𝚗: ${configCommand.countDown}
║ 👨‍💻 𝙰𝚞𝚝𝚑𝚘𝚛:  ${author}
║ 📖 𝚄𝚜𝚊𝚐𝚎: ${usage}
╚═══════════════════════╝`;
        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}

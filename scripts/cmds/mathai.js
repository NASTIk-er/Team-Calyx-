.cmd install mathai.js const axios = require('axios');
const diptoApi = "https://noobs-api.top/dipto/mathai";

module.exports.config = {
  name: "mathai",
  version: "6.9",
  author: "dipto",
  countDown: 5,
  role: 0,
  category: "",
  description: "",
  guide: {
    en: "",
  },
}

  module.exports.onStart = async ({ api, event, message ,args }) => {
    try {
      const { senderID } = event;
      const prompt = args.join(" ");
      const { data } = await axios.get(`${diptoApi}?text=${prompt}&senderID=${senderID}`)
      message.reply(data.response);
    } catch (error) {
      console.error(error);
      message.reply(error.message);
    }
  };

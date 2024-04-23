const v = require('../index.js')?.getData()?.variables;
const ChannelVar = require('../schema/channelVar.js');
const GuildVar = require('../schema/guildVar.js');
const UserVar = require('../schema/userVar.js');
const GlobalUserVar = require('../schema/globalUserVar.js');
const GlobalVar = require('../schema/globalVar.js');


module.exports = {
  name: "$mongoArray",
  type: "djs",
  code: async d => {

  }
};
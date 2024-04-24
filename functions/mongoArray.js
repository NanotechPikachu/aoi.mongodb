const v = require('../index.js')?.getData()?.variables;
const { convertType } = require('../func/convertType.js');
const ChannelVar = require('../schema/channelVar.js');
const GuildVar = require('../schema/guildVar.js');
const UserVar = require('../schema/userVar.js');
const GlobalUserVar = require('../schema/globalUserVar.js');
const GlobalVar = require('../schema/globalVar.js');
const MessageVar = require('../schema/messageVar.js');

module.exports = {
  name: "$mongoArray",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, value, action, varType, id = null ] = data.inside.splits;
    let query;
    let res;
    let find;
    let varTypes = [ "guild", "globaluser", "user", "message", "global", "channel" ];

    varname = varname?.trim();
    action = action?.toLowerCase()?.trim();
    varType = varType?.toLowerCase()?.trim();
    id = id?.trim();
    value = value?.trim();

    // Converting the Data Type of Value depending on the input
    value = convertType(value);

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");
    if (!varTypes.includes(varType)) return d.channel.send("Invalid variable Type supplied!");
    if (action !== "push" && action !== "pull") return d.channel.send("Invalid action provided!");
    if (!Array.isArray(value)) return d.channel.send("Enter value is not a valid `Array`");

    // The main code starts NOW!
    if (varType === "guild") {
      let guildId; let userId;
      if (!id || id === "") {
        userId = d.author?.id; guildId = d.guild?.id;
      } else {
        userId = id?.split(":")[0].trim();
        guildId = id?.split(":")[1].trim();
      };
      if (!guildId || !userId) return d.channel.send("Guild ID or User ID not provided or Syntax Error!");
      query = { "guildId": guildId, "userId": userId, "variable": varname };
      find = await GuildVar.findOne({
        guildId: guildId,
        userId: userId,
        variable: varname
      });
    } else if (varType === "globaluser") {
      query = {};
    } else if (varType === "user") {
      query = {};
    } else if (varType === "message") {
      query = {};
    } else if (varType === "global") {
      query = {};
    } else if (varType === "channel") {
      query = {};
    };

    try {
      if (action === "push") {

      } else {

      };
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

    return {
      code: d.util.setCode(data),
    };

  }
};
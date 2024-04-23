const v = require('../index.js')?.getData()?.variables;
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

    let [ varname, action, varType, id = null ] = data.inside.splits;
    let query;
    let res;
    let varTypes = [ "guild", "globaluser", "user", "message", "global", "channel" ];

    varname = varname?.trim();
    action = action?.toLowerCase()?.trim();
    varType = varType?.toLowerCase()?.trim();
    id = id?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");
    if (!varTypes.includes(varType)) return d.channel.send("Invalid variable Type supplied!");
    if (action !== "push" && action !== "pull") return d.channel.send("Invalid action provided!");

    // The main code starts NOW!
    if (varType === "guild") {

    } else if () {

    }

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
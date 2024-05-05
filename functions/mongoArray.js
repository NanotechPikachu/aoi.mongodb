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
    let db;
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
      db = GuildVar;
      query = { guildId: guildId, userId: userId, variable: varname };
      find = await GuildVar.findOne(query);
    } else if (varType === "globaluser") {
      db = GlobalUserVar;
      query = { userId: userId, variable: varname };
      find = await GlobalUserVar.findOne(query);
    } else if (varType === "user") {
      db = UserVar;
      query = { userId: userId, variable: varname };
      find = await UserVar.findOne(query);
    } else if (varType === "message") {
      db = MessageVar;
      query = { messageId: messageId, variable: varname };
      find = await MessageVar.findOne(query);
    } else if (varType === "global") {
      db = GlobalVar;
      query = { variable: varname };
      find = await GlobalVar.findOne(query);
    } else if (varType === "channel") {
      db = ChannelVar;
      query = { channelId: channelId, variable: varname };
      find = await ChannelVar.findOne(query);
    };

    if (!find || !find?.value || !Array.isArray(find?.value)) return d.channel.send("Enter value is not a valid `Array`");

    try {
      if (action === "push") {
        const u = await db.findOneAndUpdate({
          query
        }, {
          $push: { value: value },
        }, {
           upsert: true, new: true
        });
        await u.markModified();
        await u.save();
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
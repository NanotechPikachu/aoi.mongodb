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
      let guildId; 
      if (!id || id === "") {
        guildId = d.guild?.id;
      } else {
        guildId = id;
      };
      if (!guildId) return d.channel.send("Guild ID not provided or Syntax Error!");
      db = GuildVar;
      query = { guildId: guildId, userId: userId, variable: varname };
      find = await GuildVar.findOne(query);
    } else if (varType === "globaluser") {
      let userId = id?.trim();
      if (!id || id === "") userId = d.author?.id;
      if (!userId) return d.channel.send("User ID not provided or Syntax Error!");
      db = GlobalUserVar;
      query = { userId: userId, variable: varname };
      find = await GlobalUserVar.findOne(query);
    } else if (varType === "user") {
      let userId = id?.split(":")[0]?.trim();
      let guildId = id?.split(":")[0]?.trim();
      if (!id || id === "") {
        userId = d.author?.id;
        guildId = d.guild?.id;
      };
      if (!guildId || !userId) return d.channel.send("Guild ID or User ID not provided or Syntax Error!");
      db = UserVar;
      query = { userId: userId, guildId: guildId, variable: varname };
      find = await UserVar.findOne(query);
    } else if (varType === "message") {
      let messageId = id?.trim();
      if (!id || id === "") messageId = d.message?.id;
      if (!messageId) return d.channel.send("Message ID not provided or Syntax Error!");
      db = MessageVar;
      query = { messageId: messageId, variable: varname };
      find = await MessageVar.findOne(query);
    } else if (varType === "global") {
      db = GlobalVar;
      query = { variable: varname };
      find = await GlobalVar.findOne(query);
    } else if (varType === "channel") {
      let channelId = id?.trim();
      if (!id || id === "") channelId = d.channel?.id;
      if (!channelId) return d.channel.send("Channel ID not provided or Syntax Error!");
      db = ChannelVar;
      query = { channelId: channelId, variable: varname };
      find = await ChannelVar.findOne(query);
    };

    if (!find || find?.value === undefined) {
      const find = await db.findOneAndUpdate(
        query, {
        $set: { value: v[varname] }
      }, {
        upsert: true, new: true
      });
      newAssign.markModified();
      await newAssign.save();
   };

    if (!Array.isArray(find?.value)) return d.channel.send("Enter value is not a valid `Array`");

    try {
      if (action === "push") {
        const u = await db.findOneAndUpdate(
          query, {
          $push: { value: value },
        }, {
           upsert: true, new: true
        });
        await u.markModified();
        await u.save();
      } else if (action === "pull") {
        const u = await db.findOneAndUpdate(
          query, {
          $pull: { value: value },
        }, {
           upsert: true, new: true
        });
        await u.markModified();
        await u.save();
      } else {
        return d.channel.send('Invalid action provided!');
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
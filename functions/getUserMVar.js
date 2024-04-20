const v = require('../index.js')?.getData()?.variables;
const UserVar = require('../schema/userVar.js');

module.exports = {
  name: "$getUserMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, userId = d.author?.id, guildId = d.guild?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    userId = userId?.trim()
    guildId = guildId?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const userVariable = await UserVar.findOne({
        userId: userId,
        guildId: guildId,
        variable: varname
      });

      if (!userVariable) {
        const newAssign = await UserVar.findOneAndUpdate({
          userId: userId,
          guildId: guildId,
          variable: varname      
        }, {
          $set: { value: v[varname] }
        }, {
          upsert: true, new: true
        });
        newAssign.markModified();
        await newAssign.save();
        res = v[varname];
      } else {
        res = userVariable.value;
      }
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

    data.result = res;
    return {
      code: d.util.setCode(data),
    };
  }
};

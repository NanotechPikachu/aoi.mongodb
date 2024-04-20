const v = require('../index.js')?.getData()?.variables;
const GuildVar = require('../schema/guildVar.js');

module.exports = {
  name: "$getGuildMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, guildId = d.guild?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    guildId = guildId?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const guildVariable = await GuildVar.findOne({
        guildId: guildId,
        variable: varname
      });

      if (!guildVariable) {
        const newAssign = await GuildVar.findOneAndUpdate({
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
        res = (typeof guildVariable.value === 'object') ? JSON.stringify(guildVariable.value) : guildVariable.value; 
      };

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
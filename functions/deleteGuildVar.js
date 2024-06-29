const v = require('../index.js')?.getData()?.variables;
const GuildVar = require('../schema/guildVar.js');

module.exports = {
  name: "$deleteGuildVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, guildId = d.guild?.id, returnCount = "false" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    guildId = guildId?.trim();
    returnCount = returnCount?.trim()?.toLowerCase();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
        if (guildId !== "all") {
            const guildVariable = await GuildVar.deleteOne({
              guildId: guildId,
              variable: varname
            }); 
            res = guildVariable.deletedCount;
        } else if (guildId === "all") {
             const guildVariable = await GuildVar.deleteMany({
              variable: varname
            });
            res = guildVariable.deletedCount;
        };
    } catch (err) {
       console.error(`Error in ${data.function}. Error: ${err}`);
        return;
    };

    data.result = ( returnCount === "true" ? res : null );
    return {
      code: d.util.setCode(data),
    };
  }
}
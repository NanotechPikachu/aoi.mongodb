const v = require('../index.js')?.getData()?.variables;
const UserVar = require('../schema/userVar.js');

module.exports = {
  name: "$deleteUserVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, userId = d.author?.id, guildId = d.guild?.id, returnCount = "false" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    userId = userId?.trim();
    guildId = guildId?.trim();
    returnCount = returnCount?.trim()?.to lowercase();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    data.result = ( returnCount === "true" ? res : null );
    return {
      code: d.util.setCode(data),
    };
  }
}
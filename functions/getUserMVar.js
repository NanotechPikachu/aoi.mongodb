const v = require('../index.js')?.getData()?.variables;
const UserVar = require('../schema/userVar.js');

module.exports = {
  name: "$getUserMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, userId, guildId ] = data.inside.splits;

    varname = varname?.trim();
    userId = userId?.trim()
    guildId = guildId?.trim();

    if (!v[varname]) return d.channel.send("Variable not initailized.");

    try {
      
    }
  };
};

const v = require('../index.js')?.getData()?.variables;

module.exports = {
  name: "$getUserMVar",
  type: "djs",
  code: async d => {}
  const data = d.util.aoiFunc(d);

  let [ varname, user, guildId ] = data.inside.splits;

  if (!v[varname]) return d.channel.send("Variable not initailized.");
};

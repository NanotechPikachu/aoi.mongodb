const v = require('../index.js')?.getData()?.variables;
const ChannelVar = require('../schema/channelVar.js');

module.exports = {
  name: "$deleteChannelVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, channelId = d.channel?.id, returnCount = "false" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    channelId = channelId?.trim();
    returnCount = returnCount?.trim()?.toLowerCase();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
        if (channelId !== "all") {
            const channelVariable = await ChannelVar.deleteOne({
              channelId: channelId,
              variable: varname
            }); 
            res = channelVariable.deletedCount;
        } else if (channelId === "all") {
             const channelVariable = await ChannelVar.deleteMany({
              variable: varname
            });
            res = channelVariable.deletedCount;
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
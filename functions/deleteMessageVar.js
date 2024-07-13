const v = require('../index.js')?.getData()?.variables;
const MessageVar = require('../schema/messageVar.js');

module.exports = {
  name: "$deleteMessageVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, messageId = d.message?.id, returnCount = "false" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    messageId = messageId?.trim();
    returnCount = returnCount?.trim()?.toLowerCase();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
        if (messageId !== "all") {
            const msgVariable = await MessageVar.deleteOne({
              messageId: messageId,
              variable: varname
            }); 
            res = msgVariable.deletedCount;
        } else if (messageId === "all") {
             const msgVariable = await MessageVar.deleteMany({ 
              variable: varname
            });
            res = msgVariable.deletedCount;
        } 
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
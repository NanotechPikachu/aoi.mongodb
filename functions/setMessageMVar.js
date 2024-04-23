const v = require('../index.js')?.getData()?.variables;
const MessageVar = require('../schema/messageVar.js');
const { convertType } = require('../func/convertType.js');

module.exports = {
  name: "$setMessageMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, value, messageId = d.message?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    value = value?.trim();
    messageId = messageId?.trim();

    // Converting the Data Type of Value depending on the input
    value = convertType(value);

    if (v[varname] === undefined) return d.channel.send("Variable not initialized.");

    try {
      const newAssign = await MessageVar.findOneAndUpdate({
        messageId: messageId,
        variable: varname      
      }, {
        $set: { value: value }
      }, {
        upsert: true, new: true
      });
        newAssign.markModified();
        await newAssign.save();
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

    return {
      code: d.util.setCode(data),
    };
  }
};

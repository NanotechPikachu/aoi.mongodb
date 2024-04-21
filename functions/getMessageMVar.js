const v = require('../index.js')?.getData()?.variables;
const MessageVar = require('../schema/messageVar.js');

module.exports = {
  name: "$getMessageMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, messageId = d.message?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    messageId = messageId?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const messageVariable = await MessageVar.findOne({
        messageId: messageId,
        variable: varname
      });

      if (!messageVariable) {
        const newAssign = await MessageVar.findOneAndUpdate({
          messageId: messageId,
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
        res = (typeof messageVariable.value === 'object') ? JSON.stringify(messageVariable.value) : messageVariable.value; 
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
const v = require('../index.js')?.getData()?.variables;
const ChannelVar = require('../schema/channelVar.js');

module.exports = {
  name: "$getChannelMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, channelId = d.channel?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    channelId = channelId?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const channelVariable = await ChannelVar.findOne({
        channelId: channelId,
        variable: varname
      });

      if (!channelVariable) {
        const newAssign = await ChannelVar.findOneAndUpdate({
          channelId: channelId,
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
        res = (typeof channelVariable.value === 'object') ? JSON.stringify(channelVariable.value) : channelVariable.value; 
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
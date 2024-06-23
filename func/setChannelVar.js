const v = require('../index.js')?.getData()?.variables;
const ChannelVar = require('../schema/channelVar.js');
const { convertType } = require('./convertType.js');

async function setChannelVar(varname, value, channelId) {
  value = convertType(value);

  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await ChannelVar.findOneAndUpdate({
        channelId: channelId,
        variable: varname      
      }, {
        $set: { value: value }
      }, {
        upsert: true, new: true
      });
        newAssign.markModified();
        await newAssign.save();
        return;
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };
  
};

module.exports = setChannelVar;

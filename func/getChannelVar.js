const ChannelVar = require('../schema/channelVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getChannelVar(varname, channelId) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await ChannelVar.findOne({
      channelId: channelId,
      variable: varname    
    });
    if (!a) {
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
      return v[varname];
    };
    return (typeof a?.value === 'object') ? JSON.stringify(a?.value) : a?.value; 
    
  } catch (err) {
    console.error(err);
    return;
  };
};

module.exports = getChannelVar;

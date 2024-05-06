const MessageVar = require('../schema/messageVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getGuildVar(varname, messageId) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await MessageVar.findOne({
      messageId: messageId,
      variable: varname    
    });
    if (!a) {
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
      return v[varname];
    };
    return (typeof a?.value === 'object') ? JSON.stringify(a?.value) : a?.value; 
    
  } catch (err) {
    console.error(err);
    return;
  };
};

module.exports = getMessageVar;

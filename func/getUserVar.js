const UserVar = require('../schema/userVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getUserVar(varname, userId, guildId) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await UserVar.findOne({
      userId: userId,
      guildId: guildId,
      variable: varname    
    });
    if (!a) {
      const newAssign = await UserVar.findOneAndUpdate({
        userId: userId,
        guildId: guildId,
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

module.exports = getUserVar;

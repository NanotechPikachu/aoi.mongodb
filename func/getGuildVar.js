const GuildVar = require('../schema/guildVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getGuildVar(varname, guildId) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await GuildVar.findOne({
      guildId: guildId,
      variable: varname    
    });
    if (!a) {
      const newAssign = await GuildVar.findOneAndUpdate({
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

module.exports = getGuildVar;

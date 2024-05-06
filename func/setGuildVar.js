const v = require('../index.js')?.getData()?.variables;
const GuildVar = require('../schema/guildVar.js');
const { convertType } = require('./convertType.js');

async function setGuildVar(varname, value, guildId) {

  value = convertType(value);
  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await GuildVar.findOneAndUpdate({
        guildId: guildId,
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

module.exports = setGuildVar;

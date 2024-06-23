const v = require('../index.js')?.getData()?.variables;
const UserVar = require('../schema/userVar.js');
const { convertType } = require('./convertType.js');

async function setUserVar(varname, value, userId, guildId) {

  value = convertType(value);
  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await UserVar.findOneAndUpdate({
        userId: userId,
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

module.exports = setUserVar;

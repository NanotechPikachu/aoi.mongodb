const v = require('../index.js')?.getData()?.variables;
const GlobalUserVar = require('../schema/globalUserVar.js');
const { convertType } = require('./convertType.js');

async function setGlobalUserVar(varname, value, userId) {

  value = convertType(value);
  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await GlobalUserVar.findOneAndUpdate({
        userId: userId,
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

module.exports = setGlobalUserVar;

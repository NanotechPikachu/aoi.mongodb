const v = require('../index.js')?.getData()?.variables;
const GlobalVar = require('../schema/globalVar.js');
const { convertType } = require('./convertType.js');

async funtion setGlobalVar(varname, value) {

  value = convertType(value);
  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await GlobalVar.findOneAndUpdate({
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
      console.error(`Error: ${err}`);
      return;
    };
  
};

module.exports = setGlobalVar;

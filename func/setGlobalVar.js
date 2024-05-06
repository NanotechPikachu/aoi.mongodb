const v = require('../index.js')?.getData()?.variables;
const GlobalVar = require('../schema/globalVar.js');
const { convertType } = require('./convertType.js');

async funtion setGlobalVar(varname, value) {
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
    } catch (err) {
      console.error(`Error: ${err}`);
      return;
    };
  
};

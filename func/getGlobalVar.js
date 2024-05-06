const GlobalVar = require('../schema/globalVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getGlobalVar(varname) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await GlobalVar.findOne({
      variable: varname    
    });
    if (!a) {
      const newAssign = await GlobalVar.findOneAndUpdate({
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

const GlobalUserVar = require('../schema/globalUserVar.js');
const v = require('../index.js')?.getData()?.variables;

async function getGlobalUserVar(varname, userId) {
  if (v[varname] === undefined) return "Variable not initailized.";
  
  try {
    const a = await GlobalUserVar.findOne({
      userId: userId,
      variable: varname    
    });
    if (!a) {
      const newAssign = await GlobalUserVar.findOneAndUpdate({
        userId: userId,
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

module.exports = getGlobalUserVar;

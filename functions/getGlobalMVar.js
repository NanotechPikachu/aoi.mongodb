const v = require('../index.js')?.getData()?.variables;
const GlobalVar = require('../schema/globalVar.js');

module.exports = {
  name: "$getMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname ] = data.inside.splits;
    let res;

    varname = varname?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const globalVariable = await GlobalVar.findOne({
        variable: varname
      });

      if (!globalVariable) {
        const newAssign = await GlobalVar.findOneAndUpdate({
          variable: varname      
        }, {
          $set: { value: v[varname] }
        }, {
          upsert: true, new: true
        });
        newAssign.markModified();
        await newAssign.save();
        res = (typeof v[varname] === 'object' ? JSON.stringify(v[varname]) : v[varname]);
      } else {
        res = (typeof globalVariable.value === 'object') ? JSON.stringify(globalVariable.value) : globalVariable.value; 
      };

    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

    data.result = res;
    return {
      code: d.util.setCode(data),
    };
  }
};
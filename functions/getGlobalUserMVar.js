const v = require('../index.js')?.getData()?.variables;
const GlobalUserVar = require('../schema/globalUserVar.js');

module.exports = {
  name: "$getGlobalUserMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, userId = d.author?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    userId = userId?.trim();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
      const globalUserVariable = await GlobalUserVar.findOne({
        userId: userId,
        variable: varname
      });

      if (!globalUserVariable) {
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
        res = (typeof v[varname] === 'object' ? JSON.stringify(v[varname]) : v[varname]);
      } else {
        res = (typeof globalUserVariable.value === 'object') ? JSON.stringify(globalUserVariable.value) : globalUserVariable.value; 
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
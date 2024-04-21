const v = require('../index.js')?.getData()?.variables;
const GlobalUserVar = require('../schema/globalUserVar.js');
const { convertType } = require('../func/convertType.js');

module.exports = {
  name: "$setGlobalUserMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, value ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    value = value?.trim();

    // Converting the Data Type of Value depending on the input
    value = convertType(value);

    if (v[varname] === undefined) return d.channel.send("Variable not initialized.");

    try {
      const newAssign = await GlobalUserVar.findOneAndUpdate({
        variable: varname      
      }, {
        $set: { value: value }
      }, {
        upsert: true, new: true
      });
        newAssign.markModified();
        await newAssign.save();
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };
  }
};

const v = require('../index.js')?.getData()?.variables;
const url = require('../index.js')?.getData()?.mongoURL;
const GlobalVar = require('../schema/globalVar.js');
const { convertType } = require('../func/convertType.js');
const mongoose = require('mongoose');

module.exports = {
  name: "$setMVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, value, table = "aoi" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    value = value?.trim();

    // Converting the Data Type of Value depending on the input
    value = convertType(value);

    if (v[varname] === undefined) return d.channel.send("Variable not initialized.");

    try {
      const DB = await mongoose.createConnection(`${url}/${table}`)
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
      console.error(`Error in ${data.function}. Error: ${err}`);
    } finally {
      await DB.close();
    };

    return {
      code: d.util.setCode(data),
    };
  }
};

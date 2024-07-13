const v = require('../index.js')?.getData()?.variables;
const GlobalUserVar = require('../schema/globalUserVar.js');

module.exports = {
  name: "$deleteGlobalUserVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, userId = d.author?.id, returnCount = "false" ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    userId = userId?.trim();
    returnCount = returnCount?.trim()?.toLowerCase();

    if (v[varname] === undefined) return d.channel.send("Variable not initailized.");

    try {
        if (userId !== "all") {
            const globalUserVariable = await GlobalUserVar.deleteOne({
              userId: userId,
              variable: varname
            }); 
            res = globalUserVariable.deletedCount;
        } else if (userId === "all") {
             const globalUserVariable = await GlobalUserVar.deleteMany({       
              variable: varname
            });
            res = globalUserVariable.deletedCount;
        } 
    } catch (err) {
       console.error(`Error in ${data.function}. Error: ${err}`);
        return;
    };

    data.result = ( returnCount === "true" ? res : null );
    return {
      code: d.util.setCode(data),
    };
  }
}
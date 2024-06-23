const mongoose = require('mongoose');

module.exports = {
  name: "$mongoPing",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    const start = Date.now();
    await mongoose.connection.db.command({ ping: 1 });
    const end = Date.now();

    const ping = end - start;

    data.result = ping;
    return {
      code: d.util.setCode(data)
    };
  }
};
const mongoose = require("mongoose");

module.exports = {
    setup: (Obj) => {
        const client = Obj.bot || Obj.client;
        const mongoURL = Obj.mongoURL || null;

        this.data = {
            "client": client,
            "dirname": process.cwd(),
            "mongoURL": mongoURL
        };

      if (!mongoURL) {
        console.error("Mongo URL not given!");
        process.exit(1);
      } else {
        mongoose.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(() => console.log("Successfully connected to Mongo DB!")).catch((err) => {
          console.error(`Mongo DB connection failed: ${err}`));
          process.exit(1);
        };
      };
      
        for (const file of fs.readdirSync(path.join(__dirname, "./functions")).filter(file => file.endsWith(".js"))) {
            var funcs = require("./functions/"+file);
            client.functionManager.createFunction(
                funcs
            );
        };
    },
      
    getData: () => {
        return this.data;
    },
};

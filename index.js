const mongoose = require("mongoose");
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    setup: (Obj) => {
        const client = Obj.bot || Obj.client;
        const mongoURL = Obj.mongoURL || null;
        const variables = Obj.variables;

        this.data = {
            "client": client,
            "dirname": process.cwd(),
            "mongoURL": mongoURL,
            "variables": variables
        };
        
        if (!variables) {
            console.error("Variables file not found!");
            process.exit(1);
        } else if (typeof variables !== 'object') {
            console.error("Variables file is not an Object!");
            process.exit(1);
        };
        
        if (!mongoURL) {
            console.error("Mongo URL not given!");
            process.exit(1);
        } else {
            mongoose.connect(mongoURL)
                .then(() => console.log("Successfully connected to Mongo DB! ~ aoi.mongoDB"))
                .catch((err) => {
                    console.error(`Mongo DB connection failed: ${err}`);
                    process.exit(1);
                });
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

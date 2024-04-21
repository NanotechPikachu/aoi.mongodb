# aoi.MongoDB

A Mongo DB connecting package for AoiJS without conflicting with AoiDB!

## Installation

```
npm install github:NanotechPikachu/aoi.mongodb
```

## Index Setup

```js
const aoimongo = require("aoi.mongodb");
const { AoiClient } = require("aoi.js");

// AOI setup
const client = new AoiClient({
    token: "DISCORD BOT TOKEN",
    prefix: "DISCORD BOT PREFIX",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});

client.loadCommands("./commands/", true);

// aoi.MongoDB setup
aoimongo.setup({
    client: client,
    mongoURL: "MONGO URL", // Like - "mongodb+srv://..."
    variables: require('Path to Variable File') // You MUST initialize a file with variables and require() it here
});
```

## Variables File

```js
module.exports = {
    num: 0, // Number
    ar: [], // Array
    ob: {}, // Object
    st: "Hola!" // String
    boo: true // Boolean
}
```


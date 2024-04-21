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
    st: "Hola!", // String
    boo: true // Boolean
}
```

> [!WARNING]
> Without the variables file, you cannot use functions nor the app(bot) will work.

> [!NOTE]
> It is also essential to make(initialize) the variable in this file before accessing it; the same as AoiDB.

## Functions

| aoi.MongoDB | AoiDB | Usage |
| ---- | ---- | ----- |
|  `$getMVar` | `$getVar` | `$getMVar[varname]` |
|  `$getGlobalUserMVar` | `$getGlobalUserVar` | `$getGlobalUserMVar[varname;userId?]` |
|  `$getGuildMVar` | `$getGuildVar` | `$getGuildMVar[varname;guildId?]` |
|  `$getMessageMVar` | `$getMessageVar` | `$getMessageMVar[varname;messageId?]` |
|  `$getUserMVar` | `$getUserVar` | `$getUserMVar[varname;userId?;guildId?]` |
|  `$setMVar` | `$setVar` | `$setMVar[varname;value]` |
|  `$setGlobalUserMVar` | `$setGlobalUserVar` | `$setGlobalUserMVar[varname;value;userId?]` |
|  `$setGuildMVar` | `$setGuildVar` | `$setGuildMVar[varname;value;guildId?]` |
|  `$setMessageMVar` | `$setMessageVar` | `$setMessageMVar[varname;value;messageId?]` |
|  `$setUserMVar` | `$setUserVar` | `$setUserMVar[varname;value;userId?;guildId?]` |

> [!NOTE]
> Basically, the difference is that you have to add an "M" before the "Var" in the function name and Walah! you can use AoiDB as well as, Mongo DB in your app!

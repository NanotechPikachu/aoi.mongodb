# aoi.MongoDB

A Mongo DB connecting package for AoiJS without conflicting with AoiDB!

<hr />

## Table Of Contents

- [Installation](#installation)
- [Index Setup](#index-setup)

<hr />

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
    variables: require("Path to Variable File") // You MUST initialize a file with variables and require() it here. Like - require("./var.js") if var.js is the variables file name
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
> It is also essential to make(initialize) the variable in this file before accessing it; the same as AoiDB. Provided, it must not be the same file AKA this file and the AoiDB variables file are different.

## Functions

| aoi.MongoDB | AoiDB | Usage |
| ---- | ---- | ----- |
|  `$getMVar` | `$getVar` | `$getMVar[varname]` |
|  `$getGlobalUserMVar` | `$getGlobalUserVar` | `$getGlobalUserMVar[varname;userId?]` |
|  `$getGuildMVar` | `$getGuildVar` | `$getGuildMVar[varname;guildId?]` |
|  `$getMessageMVar` | `$getMessageVar` | `$getMessageMVar[varname;messageId?]` |
|  `$getUserMVar` | `$getUserVar` | `$getUserMVar[varname;userId?;guildId?]` |
|  `$getChannelMVar` | `$getChannelVar` | `$getChannelMVar[varname;channelId?]` |
|  `$setMVar` | `$setVar` | `$setMVar[varname;value]` |
|  `$setGlobalUserMVar` | `$setGlobalUserVar` | `$setGlobalUserMVar[varname;value;userId?]` |
|  `$setGuildMVar` | `$setGuildVar` | `$setGuildMVar[varname;value;guildId?]` |
|  `$setMessageMVar` | `$setMessageVar` | `$setMessageMVar[varname;value;messageId?]` |
|  `$setUserMVar` | `$setUserVar` | `$setUserMVar[varname;value;userId?;guildId?]` |
|  `$setChannelMVar` | `$setChannelVar` | `$setChannelMVar[varname;value;channelId?]` |

### Add-on Functions

#### `$mongoArray`

A function for performing Array functions "push" and "pull".

Syntax: `$mongoArray[varname;value;action;varType;id?]`

- action - push / pull

- varType - user / globaluser / guild / global / message / channel

- id - default null(or depending on varType default will be auto added). If you want to use vars which has 2 params like user(which supports guildId and userId) use like - if "user" -> userId:guildId

#### `$mongoPing`

A function which returns the latency of mongo DB in ms.

Syntax: `$mongoPing`

#### `$deleteUserVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteUserVar[varname;userId?;guildId?;returnCount?]`

- userId - The User ID whose var should be reset. **You can also pass "all" to reset all users var in a specific guild.** (Default - Author ID)

- guildId - ID of the guild where user is in to reset. (Default - User's Guild ID)

- returnCount - If you wish to return the number of users var that it has reset, enable it by passing "true". Only when passing "all" in `userId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular user in Mongo DB). (Default - false)

#### `$deleteGuildVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteGuildVar[varname;guildId?;returnCount?]`

- guildId - ID of the guild to reset. **You can also pass "all" to reset all users var in a specific guild.** (Default - The current Guild ID)

- returnCount - If you wish to return the number of guilds var that it has reset, enable it by passing "true". Only when passing "all" in `guildId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular guild in Mongo DB). (Default - false)

<br />
<hr />
<br />

> [!NOTE]
> Basically, the difference is that you have to add an "M" before the "Var" in the function name and Walah! you can use AoiDB as well as, Mongo DB in your app!

<br />
<hr />
<br />

## DiscordJS Usage

This package also has JavaScript functions which can be used with `$djsEval` which you are evaling DJS / JS in aoi or not. 

> [!NOTE]
> This section can only be used in JS evaling. But, **can be used with non aoi packages too!**

### Functions 

- `getUserVar()`
- `getGlobalUserVar()`
- `getGuildVar()`
- `getChannelVar()`
- `getMessageVar()`
- `getGlobalVar()`
- `setUserVar()`
- `setGlobalUserVar()`
- `setGuildVar()`
- `setChannelVar()`
- `setMessageVar()`
- `setGlobalVar()`

In order to use the above function, import it in the JS medium like:

```js
const { functionName } = require('aoi.mongodb/func'); // 'func' is the path where these functions are made
```
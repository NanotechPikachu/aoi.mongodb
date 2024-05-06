const getGlobalVar = require('./getGlobalVar.js');
const getMessageVar = require('./getMessageVar.js');
const getGlobalUserVar = require('./getGlobalUserVar.js');
const getUserVar = require('./getUserVar.js');
const getGuildVar = require('./getGuildVar.js');
const getChannelVar = require('./getChannelVar.js');

const setGlobalVar = require('./setGlobalVar.js');
const setMessageVar = require('./setMessageVar.js');
const setGlobalUserVar = require('./setGlobalUserVar.js');
const setUserVar = require('./setUserVar.js');
const setGuildVar = require('./setGuildVar.js');
const setChannelVar = require('./setChannelVar.js');

module.exports = {
  getGlobalVar,
  getMessageVar,
  getGlobalUserVar,
  getUserVar,
  getGuildVar,
  getChannelVar,
  
  setGlobalVar,
  setMessageVar,
  setGlobalUserVar,
  setUserVar,
  setGuildVar,
  setChannelVar
};

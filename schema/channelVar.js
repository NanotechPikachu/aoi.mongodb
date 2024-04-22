const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const channelVarSchema = new Schema({
  channelId: String,
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('ChannelVar', channelVarSchema);
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const messageVarSchema = new Schema({
  messageId: String,
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('MessageVar', messageVarSchema);
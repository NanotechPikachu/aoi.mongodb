const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userVarSchema = new Schema({
  userId: String,
  guildId: String,
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('UserVar', userVarSchema);

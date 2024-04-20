const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const guildVarSchema = new Schema({
  guildId: String,
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('GuildVar', guildVarSchema);
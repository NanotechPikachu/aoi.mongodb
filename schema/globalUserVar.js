const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const globalUserVarSchema = new Schema({
  userId: String,
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('GlobalUserVar', globalUserVarSchema);
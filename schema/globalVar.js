const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const globalVarSchema = new Schema({
  variable: String,
  value: Schema.Types.Mixed,
});

module.exports = mongoose.model('GlobalVar', globalVarSchema);
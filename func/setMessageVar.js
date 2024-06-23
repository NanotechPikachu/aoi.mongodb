const v = require('../index.js')?.getData()?.variables;
const MessageVar = require('../schema/messageVar.js');
const { convertType } = require('./convertType.js');

async function setMessageVar(varname, value, messageId) {

  value = convertType(value);
  if (v[varname] === undefined) return "Variable not initialized.";

  try {
      const newAssign = await MessageVar.findOneAndUpdate({
        messageId: messageId,
        variable: varname      
      }, {
        $set: { value: value }
      }, {
        upsert: true, new: true
      });
        newAssign.markModified();
        await newAssign.save();
        return;
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

};

module.exports = setMessageVar;

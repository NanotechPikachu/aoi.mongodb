function convertType(str) {
  // Try to convert to number
  if (!isNaN(str)) {
    return Number(str);
  };
  
  // Try to convert to boolean
  if (str?.toLowerCase() === 'true') {
    return true;
  };
  if (str?.toLowerCase() === 'false') {
    return false;
  };
  
  // Try to parse as JSON
  try {
    return JSON.parse(str);
  } catch (e) {
    // Not JSON, return as string
  };
  
  // Return as string if all else fails
  return str;
};

module.exports = { convertType };

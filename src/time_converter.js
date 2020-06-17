/**
 * Convert 24hr format to 12hr format
 * 
 * @param {int} hours 
 */

function to12hrFormat( hours ) {
  
  hours = hours % 12;

  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return hours;
}

/**
 * 
 * @param {int} hours 
 */

function utcToEthiopic ( hours ) {
    return hours - 6 <= 0 ? hours + 6 : hours - 6;
}

/**
 * 
 * @param {int} hours 
 */

function ethiopicToUtc ( hours ) {
    return hours > 6 ? hours - 6 : hours + 6;
}


/**
 * Module exports.
 * @public
 */

module.exports.to12hrFormat = to12hrFormat;

module.exports.utcToEthiopic = utcToEthiopic;

module.exports.ethiopicToUtc = ethiopicToUtc;
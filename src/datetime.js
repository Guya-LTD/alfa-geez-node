var Local = require('./local');
var Language = require('./language');
var JDNConverter = require('./JDN_converter');
var TimeConverter = require('./time_converter');

/**
 *  Create an new DateTime object for the given Date object
 * 
 * @param {Date} date 
 * @public
 */

function DateTime (date, timezone = 'Africa/Addis_Ababa') {
    
    if( !(date instanceof Date) )
        throw 'Datetime must be instance of Date';

    this.date = date;

    if( timezone != null )
        this.timezone( timezone );

}

/**
 * Convert time UTC/GMT timezone to Ethiopic time zone 
 *  i.e UTC + 3 Hours
 *      GMT + 3 Hours
 * 
 * @param {string} timezone
 * @return null
 */

DateTime.prototype.timezone = function ( timezone ) {

    date_str = this.date.toLocaleString("en-US", {timeZone: timezone});

    this.date = new Date( date_str );

}

/**
 * 
 * @return dictionary
 */

DateTime.prototype.gregorianToEthiopic = function () {

    year = this.date.getFullYear();

    month = this.date.getMonth();

    day = this.date.getDate();

    hours = this.date.getHours();

    jdn = JDNConverter.gregorianToJDN ( year, month, day );

    era = JDNConverter.getEraFromJDN ( jdn );
    
    date = JDNConverter.jdnToEthiopic ( jdn, era );

    hours = TimeConverter.utcToEthiopic( TimeConverter.to12hrFormat(hours) );

    var datetime = {
        'year' : date['year'],
        'month' : date['month'],
        'day' : date['day'],
        'hour': hours,
        'minute': this.date.getMinutes(), 
        'second' : this.date.getSeconds()
    }

	return datetime;
}

/**
 * 
 * @return dictionary
 */
DateTime.prototype.ethiopicToGregorian = function () {

    year = this.date.getFullYear();

    month = this.date.getMonth();

    day = this.date.getDate();

    hours = this.date.getHours();

    jdn = JDNConverter.ethCopticToJDN ( year, month, day );

    date = JDNConverter.jdnToGregorian ( jdn );
    
    hours = TimeConverter.ethiopicToUtc( TimeConverter.to12hrFormat(hours) );

    var datetime = {
        'year' : date['year'],
        'month' : date['month'],
        'day' : date['day'],
        'hour': hours,
        'minute': this.date.getMinutes(), 
        'second' : this.date.getSeconds()
    }

	return datetime;
}

/**
 * Converter
 * 
 * @param {Local} local
 * @param {Language} language
 * @return dictionay
 */

DateTime.prototype.convert = function ( local = Local.ETHIOPIC, lanugage = Language.AMHARIC ) {

    if( Object.values(Local).indexOf(local) == -1 )
        throw 'Local must be instance of Alfa Gee`z\'s Local';

    if( Object.values(Local).indexOf(local) == -1 )
        throw 'Language must be instance of Alfa Gee`z\'s Language';

    // Assigning prototypes
    this.local = local;
    this.lanugage = lanugage;

    if( local == Local.ETHIOPIC )
        new_datetime = this.gregorianToEthiopic();
    else if( local == Local.GREGORIAN )
        new_datetime = this.ethiopicToGregorian();

    this.new_datetime = new_datetime

    return new_datetime;
}



/**
 * Module exports.
 * @public
 */

module.exports = DateTime
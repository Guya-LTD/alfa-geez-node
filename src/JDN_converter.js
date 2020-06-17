/**
 * @private
 */
const JD_EPOCH_OFFSET_AMETE_ALEM = -285019; // ዓ/ዓ
const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856; // ዓ/ም
const JD_EPOCH_OFFSET_GREGORIAN = 1721426;

/**
 * 
 * @param {int} jdn 
 */

function getEraFromJDN ( jdn ) {
    return jdn >= JD_EPOCH_OFFSET_AMETE_MIHRET+365 ? JD_EPOCH_OFFSET_AMETE_MIHRET : JD_EPOCH_OFFSET_AMETE_ALEM;
}

/**
 * Convert Gregorian Calander to JDN Number
 * 
 * @param {int} year
 * @param {int} month
 * @param {int} date
 * @public
 */

function gregorianToJDN ( year, month, day ) {
    // Round down the reminder i.e quotient
    s = (Math.floor((year / 4)) 
        - Math.floor(((year -1) / 4))
        - Math.floor((year / 100))
        + Math.floor(((year - 1) / 100))
        + Math.floor((year / 400))
        - Math.floor(((year - 1) / 400))
    );

    t = Math.floor( ((14 - month) / 12) );

    n = (31 * t * (month - 1)
        + (1 - t) * (59 + s + 30 * (month - 3) + Math.floor((3 * month - 7)/5))
        + day - 1
    );

    j = (JD_EPOCH_OFFSET_GREGORIAN
		+ 365 * (year - 1)
		+ Math.floor((year - 1) / 4)
        - Math.floor((year - 1) / 100)
		+ Math.floor((year - 1) / 400)
		+ n
    );

	return j;       
}

/**
 * 
 * @param {int} jdn 
 * @param {int} era 
 * @return dictionary
 */

function jdnToEthiopic ( jdn, era = JD_EPOCH_OFFSET_AMETE_MIHRET ) {

    r = ((jdn - era) % 1461);

    n = ((r % 365) + 365 * Math.floor(r / 1460)); 

    year = (4 * Math.floor((jdn - era) / 1461)
            + Math.floor(r / 365)
            - Math.floor(r / 1460));    

    month = Math.floor(n / 30) + 1 ;
    
    day = (n % 30 ) + 1;

    return {'year' : year, 'month' : month, 'day' : day}
}

/**
 * 
 * @param {int} year 
 * @param {int} month 
 * @param {int} day 
 * @param {int} era 
 */

function ethCopticToJDN ( year, month, day, era = JD_EPOCH_OFFSET_AMETE_MIHRET ) {
    jdn = ((era + 365)
        + 365 * (year - 1)
        + Math.floor(year / 4)
        + 30 * month
        + day - 31);

    return jdn;
}

/**
 * Determines if a Gregorian year is leap year or not
 *
 * @param {int} year
 * @return Boolean
 */
function isGregorianLeap ( year = 1 ) {
    return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
}

/**
 * 
 * @param {int} j 
 */

function jdnToGregorian ( j ) {
    nMonths = 12;

    monthDays = [
        0,
        31, 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    ];

    r2000 = ((j - JD_EPOCH_OFFSET_GREGORIAN) % 730485);
    r400 = ( (j - JD_EPOCH_OFFSET_GREGORIAN ) % 146097);
    r100 = (r400 % 36524 );
    r4 = (r100 % 1461 );

    n = (r4 % 365) + 365 * Math.floor(r4 / 1460);
    s = Math.floor(r4 / 1095);
    
    aprime = (400 * Math.floor((j - JD_EPOCH_OFFSET_GREGORIAN) / 146097)
              + 100 * Math.floor(r400 / 36524)
              + 4 * Math.floor(r100 / 1461)
              + Math.floor(r4 / 365)
              - Math.floor(r4 / 1460)
              - Math.floor(r2000 / 730484)
    );
    
    year = aprime + 1;
    t = Math.floor((364 + s - n) / 306);
    month = t * (Math.floor(n /31) + 1) + (1 - t) * (Math.floor((5 * (n - s) + 13) / 153) +  1);
    /*
    int day    = t * ( n - s - 31*month + 32 )
               + ( 1 - t ) * ( n - s - 30*month - quotient((3*month - 2), 5) + 33 )
    ;
    */
    
    // int n2000 = quotient( r2000, 730484 );
    n +=  1 - Math.floor(r2000 / 730484);
    day = n;


   if((r100 == 0) && (n == 0) && (r400 != 0)) {
        month = 12;
        day = 31;
    } else {
        monthDays[2] = (isGregorianLeap(year)) ? 29 : 28;
        for(i=1; i <= nMonths; ++i) {
            if(n <= monthDays[i]) {
                day = n;
                break;
            }
            n -= monthDays[i];
        }
    }

    return {'year' : year, 'month' : month, 'day' : day}
}

/**
 * Module exports.
 * @public
 */

module.exports.gregorianToJDN = gregorianToJDN

module.exports.getEraFromJDN = getEraFromJDN

module.exports.jdnToEthiopic = jdnToEthiopic
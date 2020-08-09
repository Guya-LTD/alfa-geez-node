[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Build Status](https://travis-ci.org/Guya-LTD/alfa-geez-node.svg?branch=master)](https://travis-ci.org/Guya-LTD/alfa-geez-node)

# Alfa Gee'z

Localization for Ethiopian date, time and number `Nodejs` implementation

`alfa-geez` is a light-weight package that makes an easy way for converting other calendar(date-time) to Ethiopic datetime. Currently `alfa-aeez` package supports conversion from

- Gregorian Calendar
- From Any time zone to Ethiopic time

## Installation

Install via NPM:

```bash
$ npm install alfa-geez
```

## Usage

### node

```javascript
var alfaGeez = require('alfa-geez');

var date = new Date();  // Create new date

var alfaGeezDatetime = new alfaGeez.DateTime(date);

var eth_datetime = alfaGeezDatetime.convert(
    local = alfaGeez.Local.ETHIOPIC,
    language = alfaGeez.Language.AMHARIC
);  // Return key-value paired datetime
```

### Local Resources List

- `Local.ETHIOPIC` to Ethiopic date time
- `Local.GREGORIAN` to Gregorian date time

### Language Resources List

- `Langauge.ARABIC` for Arabic Language
- `Langauge.COPTIC` for Greek Language
- `Langauge.GEEZ` for GEEZ Language
- `Langauge.ENGLISH` for ENGLISH Language
- `Langauge.AMHARIC` for AMHARIC Language
- `Langauge.TIGRINYA` for TIGRINYA Language

## Tests

```bash
$ npm test
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

## Credits

- [Simon Belete][link-author]
- [All Contributors][link-contributors]

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).



[link-author]: https://github.com/Simonbelete
[link-contributors]: ../../contributors
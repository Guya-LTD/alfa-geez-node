var assert = require('assert');
var timeConverter = require('../src/time_converter');

describe('timeConverter', function () {
    describe('#indexOf()', function () {
        it('24hr format to 12hr format', function () {
            assert.equal(timeConverter.to12hrFormat(1), 1);
            assert.equal(timeConverter.to12hrFormat(2), 2);
            assert.equal(timeConverter.to12hrFormat(3), 3);
            assert.equal(timeConverter.to12hrFormat(4), 4);
            assert.equal(timeConverter.to12hrFormat(5), 5);
            assert.equal(timeConverter.to12hrFormat(6), 6);
            assert.equal(timeConverter.to12hrFormat(7), 7);
            assert.equal(timeConverter.to12hrFormat(8), 8);
            assert.equal(timeConverter.to12hrFormat(9), 9);
            assert.equal(timeConverter.to12hrFormat(10), 10);
            assert.equal(timeConverter.to12hrFormat(11), 11);
            assert.equal(timeConverter.to12hrFormat(12), 12);
            assert.equal(timeConverter.to12hrFormat(13), 1);
            assert.equal(timeConverter.to12hrFormat(14), 2);
            assert.equal(timeConverter.to12hrFormat(15), 3);
            assert.equal(timeConverter.to12hrFormat(16), 4);
            assert.equal(timeConverter.to12hrFormat(17), 5);
            assert.equal(timeConverter.to12hrFormat(18), 6);
            assert.equal(timeConverter.to12hrFormat(19), 7);
            assert.equal(timeConverter.to12hrFormat(20), 8);
            assert.equal(timeConverter.to12hrFormat(21), 9);
            assert.equal(timeConverter.to12hrFormat(22), 10);
            assert.equal(timeConverter.to12hrFormat(23), 11);
            assert.equal(timeConverter.to12hrFormat(24), 12);
        })

        it('Back and forth between Utc and Ethiopic', function () {
            for(i = 1; i <= 12; i++){
                e = timeConverter.utcToEthiopic(i)
                u = timeConverter.ethiopicToUtc(e)
                assert.equal(i, u);
            }
        })
    })
})
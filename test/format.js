var Mondo = require('mondo');
var chai = require('chai');
var should = require('chai').should();

describe('formatting', function() {

    var date;

    before(function(){
        require('globalize/lib/cultures/globalize.culture.de-CH');
        Mondo.culture('de-CH');    
        date = new Date('2013-02-18 08:00');
    });

    describe('date function', function() {

        it('should format given date', function() {
            var d = Mondo.date(date);
            d.should.be.a('string');
            d.should.equal('18.02.2013');
        });

        it('d alias function should produce the same output', function() {
            var d1 = Mondo.date(date);
            var d2 = Mondo.d(date);

            d2.should.equal(d1);

        });
    });

    describe('time function', function() {

        it('should format the given date', function() {
            var t = Mondo.time(date);
            t.should.be.a('string');
            t.should.equal('08:00');
        });

        it('t alias function should produce the same output', function() {
            var t1 = Mondo.time(date);
            var t2 = Mondo.t(date);
            t2.should.equal(t1);
        });

    });

    describe('currency function', function() {

        it('should format the given amount', function() {
            var c = Mondo.currency(123.5);
            c.should.be.a('string');
            c.should.equal('Fr. 123.50');
        });

        it('c alias function should produce the same output', function() {
            var c1 = Mondo.currency(123.5);
            var c2 = Mondo.c(123.5);
            c2.should.equal(c1);
        });
    });

    describe('percent function', function() {

        it('should format the given number', function() {
            var p = Mondo.percent(0.2);
            p.should.be.a('string');
            p.should.equal('20.00%');
        });

        it('c alias function should produce the same output', function() {
            var p1 = Mondo.percent(0.2);
            var p2 = Mondo.p(0.2);
            p2.should.equal(p1);
        });
    });
});
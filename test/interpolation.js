var Mondo = require('mondo');
var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;

describe('interpolation', function() {

    before(function(){
        require('globalize/lib/cultures/globalize.culture.de-CH');
        Mondo.culture('de-CH');
    });
    

    it('should replace placeholders', function() {

        Mondo.addTranslation('de-CH', { foo: '**{{bar}}**' });
        Mondo.localize('foo', {bar: 'test'}).should.equal('**test**');
        Mondo.localize('foo', {bar: 1}).should.equal('**1**');
        
    });

    it('should cache compiled handlebar messages', function() {
        
        Mondo.addTranslation('de-CH', { toBeCached: '**{{foo}}**' });
        expect(Mondo.culture().messages.toBeCached).to.be.a('string');
        Mondo.localize('toBeCached', { foo: 'Foo' });
        expect(Mondo.culture().messages.toBeCached).to.be.a('function');

    })
 }); 
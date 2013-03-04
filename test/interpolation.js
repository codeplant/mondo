var Mondo = require('mondo');
var chai = require('chai');
var should = require('chai').should();

describe('interpolation', function() {

    require('globalize/lib/cultures/globalize.culture.de-CH');

    Mondo.culture('de-CH');

    it('should replace placeholders', function() {

        Mondo.addTranslation('de-CH', { foo: '**{{bar}}**' });
        Mondo.localize('foo', {bar: 'test'}).should.equal('**test**');
        Mondo.localize('foo', {bar: 1}).should.equal('**1**');
        
    });
 }); 
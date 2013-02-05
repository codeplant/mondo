var Mondo = require('mondo');

Mondo.addTranslations('de-CH',{ foo: 'das isch z foo', bar: { one: 'bar', other: 'bars'}});
Mondo.addTranslations('fr-CH',{ foo: "c'est trop foo"});

Mondo.culture('de-CH');

console.log(Mondo.l('foo'));
console.log(Mondo.l('bar', { pluralize: 0}));
console.log(Mondo.l('bar', { pluralize: 1}));
console.log(Mondo.l('bar', { pluralize: 2}));
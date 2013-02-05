(function(window, undefined) {

var Mondo;

Mondo = function() {};

if ( typeof require !== "undefined" &&
    typeof exports !== "undefined" &&
    typeof module !== "undefined" ) {
    Mondo.env = 'node';
    Mondo.globalize = require('globalize');
    Mondo._ = require('underscore');
    Mondo.cldr = require('cldr-plurals').CLDR;
    Mondo.handlebars = require('handlebars');
    // Assume CommonJS
    module.exports = Mondo;
} else if ( typeof define === "function" && define.amd ) {
    Mondo.env = 'requirejs';
    define( "mondo", ['globalize', 'underscore', 'plurals', 'handlebars'], function (globalize, _, plurals, handlebars) { 
        Mondo.globalize = globalize;
        Mondo._ = _;
        Mondo.cldr = plurals;
        Mondo.handlebars = handlebars;
        return Mondo;
    } );
} else {
    Mondo.env = 'browser';
    Mondo.globalize = Globalize;
    Mondo._ = _;
    Mondo.cldr = CLDR;
    Mondo.handlebars = Handlebars;
    // Export as global variable
    window.Mondo = Mondo;
}

Mondo.format = Mondo.f = function(value, format) {
    return this.globalize.format(value,format);
};

Mondo.date = Mondo.d = function(date) {
    return this.format(date,'d');
};

Mondo.time = Mondo.t = function(time) {
    return this.format(time,'t');
};

Mondo.timestamp = Mondo.ts = function(timestamp) {
    return this.format(timestamp, '')
};

Mondo.localize = Mondo.l = function(key, options) {
    options = options || {};
    var pluralizedKey = this.pluralize(key, options);
    var message = this.translate(pluralizedKey);    
    return this.interpolate(message, options);
};

Mondo.interpolate = function(source, options) {
    return this.handlebars.compile(source)(options);
};

Mondo.translate = function(key) {
    console.log("*** " + key);
    var message = this.globalize.culture().messages;
    var path = key.split('.');
    for(part in path) {
        message = message[path[part]];
        if(!message) return '';
    }
    return message;
};

Mondo.pluralize = function(key, options) {
    var pluralize = options.pluralize;
    if(pluralize || pluralize === 0) {
        var size;
        if(this._.isNumber(pluralize)) {
            size = pluralize;
        }
        else if(pluralize.length) {
            size = pluralize.length;    
        }
        else if(pluralize.size) {
            size = pluralize.size;    
        }
        else if(this._.isObject(pluralize)) {
            size = this._.size(pluralize);
        }

        return key + '.' + this.cldr.pluralForm(size, this.globalize.culture().language);
    }
    return key;
};

Mondo.culture = function(selector) {
    return this.globalize.culture(selector);
};

Mondo.addTranslations = function(selector, messages) {
    var culture = this.culture(selector);
    if(this.env === 'node' && (!culture || culture.name !== selector)) {
        require('Globalize/lib/cultures/globalize.culture.' + selector);
    }
    this.globalize.addCultureInfo(selector, { 'messages': messages});
}

}(this));
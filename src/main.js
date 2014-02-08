(function(window) {
    'use strict';

    // make sure xEasy is running in a browser
    if(!window || !window.document) {
        throw 'No window object found! Make sure xEasy is running in a browser.';
    }

    // load polyfills and shortcuts
    require('./polyfills');
    require('./shortcuts');

    // add shortcut to window.document
    window.document.on = Element.prototype.on;

    // load modules
    var xe = {};
    xe.config = require('./config');
    xe.functions = require('./functions');
    xe.domParser = require('./domParser');
    xe.init = require('./core').init;
    xe.binding = require('./binding');
    xe.ctrl = require('./controllers');

    // when all is loaded, wire up the controllers
    window.document.on('DOMContentLoaded', function() {
        xe.init();
    });

    window.xe = xe;

}(window));
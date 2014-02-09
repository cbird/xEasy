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
    xe.binding = require('./binding');
    xe.ctrl = require('./controllers');
    xe.validation = require('./validation');

    // when all is loaded, wire up the controllers
    window.document.on('DOMContentLoaded', function() {
        if(window.document.children) {
            xe.domParser.parse(window.document.children);
        } else {
            xe.domParser.parse(window.document.childNodes);
        }
    });

    window.xe = xe;

}(window));
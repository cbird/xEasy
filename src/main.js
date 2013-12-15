(function (window) {
    'use strict';

    // make sure xEasy is running in a browser
    if(!window || !window.document) {
        throw 'No window object found! Make sure xEasy is running in a browser.';
    }

    // load modules
    var xe = {};
    xe.functions = require('./functions');
    xe.domParser = require('./domParser');
    xe.init = require('./core').init;
    xe.binding = require('./binding');
    xe.ctrl = require('./controllers');

    // when all is loaded, wire up the controllers
    window.onload = function() {
        xe.init();
    };

    window.xe = xe;
}(window));
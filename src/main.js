(function (window) {
    'use strict';

    // make sure xEasy is running in a browser
    if(!window || !window.document) throw 'No window object found! Make sure xEasy is running in a browser.';

    // load modules
    var xe = {};
    xe.functions = functions;
    xe.domParser = domParser;
    xe.init = core.init;
    xe.binding = binding;
    xe.ctrl = controllers;

    // when all is loaded, wire up the controllers
    window.onload = function() {
        xe.init();
    };

    window.xe = xe;
})(window);
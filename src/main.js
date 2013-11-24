(function (window, xe) {
    'use strict';

    // make sure xEasy is running in a browser
    if(!window || !window.document) {
        throw 'No window object found! Make sure xEasy is running in a browser.';
    }

    // init function
    xe.init = function(options) {
        xe.domParser(window.document.children, window.document);
    };

    // when all is loaded, wire up the controllers
    window.onload = function() {
        xe.init();
    };

    window.xe = xe;
})(window, window && window.xe ? window.xe : {});
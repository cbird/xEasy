var core = (function () {

    // init function
    var init = function(options) {
        xe.domParser.parse(window.document.children, window.document);
    };

    return {
        init: init
    };

})();
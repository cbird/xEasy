var core = (function () {

    // init function
    var init = function() {
        xe.domParser.parse(window.document.children, window.document);
    };

    return {
        init: init
    };

})();
module.exports = (function () {

    // init function
    var init = function() {
        if(window.document.children) {
            xe.domParser.parse(window.document.children, window.document);
        } else {
            xe.domParser.parse(window.document.childNodes, window.document);
        }
    };

    return {
        init: init
    };

}());
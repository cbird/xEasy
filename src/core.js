module.exports = (function() {

    /**
     * Initializes xEasy
     * @return {Object}
     */
    var init = function() {
        if(window.document.children) {
            xe.domParser.parse(window.document.children, window.document);
        } else {
            xe.domParser.parse(window.document.childNodes, window.document);
        }

        return this;
    };

    return {
        init: init
    };
}());
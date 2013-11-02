(function (window) {
    var version = '0.0.1',
        isDebug = false,
        xe = function (options) {
            if (isDebug) console.log('hej');
        };

    xe.fn = xe.prototype;

    xe.debug = xe.fn.debug = function(debug) {
        if (typeof debug === 'undefined') debug = true;
        isDebug = debug;
    }

    if (typeof window === 'object' && typeof window.document === 'object') {
        window.xe = xe;
    }
})(window);
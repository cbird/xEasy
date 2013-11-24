(function(){
    /*
     * object.watch polyfill
     *
     * 2012-04-03
     *
     * By Eli Grey, http://eligrey.com
     * Public Domain.
     * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     *
     * Modified by Carl Ripa, setter is now working as expected
     */
    if (!Object.prototype.watch) {
        Object.defineProperty(Object.prototype, 'watch', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: function (prop, handler) {
                var actual = this[prop],
                    old = actual,
                    getter = function () {
                        return actual;
                    },
                    setter = function (val) {
                        old = actual;
                        actual = val;
                        return handler.call(this, prop, old, val);
                    };

                if (delete this[prop]) {
                    Object.defineProperty(this, prop, {
                        get: getter,
                        set: setter,
                        enumerable: true,
                        configurable: true
                    });
                }
            }
        });
    }
    if (!Object.prototype.unwatch) {
        Object.defineProperty(Object.prototype, 'unwatch', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: function (prop) {
                var val = this[prop];
                delete this[prop];
                this[prop] = val;
            }
        });
    }
})();
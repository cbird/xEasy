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

    /*
     * polyfills/shortcuts on the window object
     */
    if(typeof window !== 'undefined') {
        if (!window.$ && !window.document.querySelectorAll) {
            window.$ = document.querySelectorAll.bind(document);
        }
        if(!Element.prototype.on) {
            if (Element.prototype.addEventListener) {
                Element.prototype.on = function(ev, cb) {
                    this.addEventListener(ev, cb, false);
                };
            } else if (Element.prototype.attachEvent) {
                Element.prototype.on = function(ev, cb) {
                    this.attachEvent(ev === 'input' ? 'onpropertychange': ev, cb);
                };
            }
            else {
                throw 'neither addEventListener nor attachEvent was found';
            }
        }
        if(!Element.prototype.hasClass) {
            Element.prototype.hasClass = function(cls) {
                return this.className && new RegExp('(\\s|^)' + cls + '(\\s|$)').test(this.className);
            };
        }
        if(!Element.prototype.addClass) {
            Element.prototype.addClass = function(cls) {
                this.className += ' ' + cls;
            };
        }
        if(!Element.prototype.removeClass) {
            Element.prototype.removeClass = function(cls) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                this.className = this.className.replace(reg, ' ').replace(/(^\s*)|(\s*$)/g,'');
            };
        }
    }
})();
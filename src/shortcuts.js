module.exports = (function() {

    if (typeof window !== 'undefined' && !window.$ && !window.document.querySelectorAll) {
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

})();
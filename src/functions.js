module.exports = (function() {

    var element = {

        /**
         * Used when binding data to an element
         * @param {Object} DOM element to set data to
         * @param {Object} Value to be set
         * @param {String} Where to bind data in the element: text = innerHTML, value = value, both = innerHTML + value
         */
        setData: function (elm, val, target) {
            switch(elm.tagName) {
                case 'INPUT':
                    if(elm.type === 'checkbox' && elm.checked !== val) {
                        elm.checked = val;
                    } else if (elm.value !== val) {
                        elm.value = val;
                    }
                    break;
                case 'OPTION':
                    if(elm.innerHTML !== val && (target === 'text' || target === 'both')) {
                        elm.innerHTML = val;
                    }
                    if(elm.value !== val && (!target || target === 'value' || target === 'both')) {
                        elm.value = val;
                    }
                    break;
                case 'SELECT':
                    if(elm.value !== val) {
                        elm.value = val;
                    }
                    break;
                default:
                    if(elm.innerHTML !== val) {
                        elm.innerHTML = val;
                    }
                    break;
            }
        },

        /**
         * Used when binding a style to an element
         * @param {Object} DOM element to set style to
         * @param {String} Name of the style property
         * @param {String} Value of the style
         */
        setStyle: function(elm, name, val) {
            elm.style[name] = val ? val : '';
        },

        /**
         * Used when binding a whole CSS object to an element
         * @param {Object} DOM element to set CSS to
         * @param {Object} The CSS object containing all the styles
         */
        setCss: function(elm, css) {
            for(var name in css) {
                elm.style[name] = css[name];
            }
        }

    };

    return {
        element: element
    };

 }());
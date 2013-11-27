var functions = (function() {
    var element = {
        setData: function (elm, val, target) {
            switch(elm.tagName) {
                case 'INPUT':
                    if(elm.type === 'checkbox') {
                        if(elm.checked !== val) elm.checked = val;
                        break;
                    }
                case 'OPTION':
                    if(target && (target === 'text' || target === 'both')) {
                        if(elm.innerHTML !== val) elm.innerHTML = val;
                        if(target === 'text') break;
                    }
                case 'SELECT':
                    if(elm.value !== val) elm.value = val;
                    break;
                default:
                    if(elm.innerHTML !== val) elm.innerHTML = val;
                    break;
            }
        },
        setStyle: function(elm, name, val) {
            elm.style[name] = val ? val : '';
        },
        setCss: function(elm, css) {
            for(var name in css) {
                elm.style[name] = css[name];
            }
        },
        addEventListener: function(elm, event, callback) {
            if (elm.addEventListener) {
                elm.addEventListener(event, callback, false);
            } else if (elm.attachEvent) {
                elm.attachEvent(event === 'input' ? 'onpropertychange': event, callback);
            }
        }
    };

    return {
        element: element
    };
 })();
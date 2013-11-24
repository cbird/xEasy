(function(window, xe){
    'use strict';

    xe.functions = {
        element: {
            setValue: function (elm, val, target) {
                switch(elm.tagName) {
                    case 'INPUT':
                        if(elm.type === 'checkbox') {
                            elm.checked = val;
                            break;
                        }
                    case 'OPTION':
                        if(target && (target === 'text' || target === 'both')) {
                            elm.innerHTML = val;
                            if(target === 'text') break;
                        }
                    case 'SELECT':
                        elm.value = val;
                        break;
                    default:
                        elm.innerHTML = val;
                        break;
                }
            },
            css: function(elm, name, val) {
                elm.style[name] = val ? val : '';
            },
            addEventListener: function(elm, event, callback) {
                if (elm.addEventListener) {
                    elm.addEventListener(event, callback, false);
                } else if (elm.attachEvent) {
                    elm.attachEvent(event === 'input' ? 'onpropertychange': event, callback);
                }
            }
        }
    };

    window.xe = xe;
 })(window, window && window.xe ? window.xe : {});
(function (window) {
    'use strict';

    var version = '0.0.1',
        isDebug = false,
        xe = function (options) {
            if (isDebug) console.log('hej');
        };

    xe.fn = xe.prototype;

    xe.debug = xe.fn.debug = function(debug) {
        if (typeof debug === 'undefined') debug = true;
        isDebug = debug;
    };
    xe.controllers = { };

    var wireUp = function (children, parent, ctrl) {
        var segments;

        for (var i = 0, iLength = children.length; i < iLength; i++) {
            if(children[i].attributes) {
                for (var j = 0, jLength = children[i].attributes.length; j < jLength; j++) {
                    if(children[i].attributes[j].name.indexOf('xe') === 0 || children[i].attributes[j].name.indexOf('data-xe') === 0) {
                        console.log(children[i].attributes[j].name, children[i].attributes[j].value);

                        segments = children[i].attributes[j].value.split('.');

                        if(segments.length > 1) { // invalid if less than 2 segments

                            switch(segments[0]) {
                                case 'ctrl':
                                    if(xe.controllers && xe.controllers[segments[1]]) {
                                        ctrl = xe.controllers[segments[1]]
                                    }
                                break;
                                case 'click':
                                    if(ctrl) {
                                        children[i].onclick = ctrl[segments[1]];
                                    }
                                break;
                                default:
                                    throw 'invalid handler ' + segments[0];
                                break;
                            }
                        }
                    }
                }
            }

            if(children[i].children) {
                wireUp(children[i].children, children[i], ctrl);
            }
        }
    };

    window.onload = function() {
        // when all is loaded, wire up the controllers
        wireUp(window.document.children, window.document);
    };

    if (typeof window === 'object' && typeof window.document === 'object') {
        window.xe = xe;
    }
})(window);
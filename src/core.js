(function (window) {
    'use strict';
    if (typeof window === 'object' && typeof window.document === 'object') {

        var version = '0.0.1',
            isDebug = false,
            xe = function (options) {
                if (isDebug) console.log('aw yiss');
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
                            if(xe.isDebug) console.log(children[i].attributes[j].name, children[i].attributes[j].value);

                            segments = children[i].attributes[j].value.split('.');

                            if(segments.length > 1) { // invalid if less than 2 segments
                                if(segments[0] === 'ctrl') {
                                    ctrl = xe.controllers[segments[1]]
                                }
                                else if (ctrl) {
                                    /* events according to http://www.w3schools.com/jsref/dom_obj_event.asp */
                                    switch(segments[0]) {
                                        /* mouse events */
                                        case 'click':
                                            children[i].onclick = ctrl[segments[1]];
                                        break;
                                        case 'dblclick':
                                            children[i].ondblclick = ctrl[segments[1]];
                                        break;
                                        case 'mousedown':
                                            children[i].onmousedown = ctrl[segments[1]];
                                        break;
                                        case 'mousemove':
                                            children[i].onmousemove = ctrl[segments[1]];
                                        break;
                                        case 'mouseover':
                                            children[i].onmouseover = ctrl[segments[1]];
                                        break;
                                        case 'mouseout':
                                            children[i].onmouseout = ctrl[segments[1]];
                                        break;
                                        case 'mouseup':
                                            children[i].mouseup = ctrl[segments[1]];
                                        break;

                                        /* keyboard events */
                                        case 'keydown':
                                            children[i].onkeydown = ctrl[segments[1]];
                                        break;
                                        case 'keypress':
                                            children[i].onkeypress = ctrl[segments[1]];
                                        break;
                                        case 'keyup':
                                            children[i].onkeyup = ctrl[segments[1]];
                                        break;

                                        /* frame/object events */
                                        case 'abort':
                                            children[i].abort = ctrl[segments[1]];
                                        break;
                                        case 'error':
                                            children[i].onerror = ctrl[segments[1]];
                                        break;
                                        case 'load':
                                            children[i].onload = ctrl[segments[1]];
                                        break;
                                        case 'resize':
                                            children[i].onresize = ctrl[segments[1]];
                                        break;
                                        case 'scroll':
                                            children[i].onscroll = ctrl[segments[1]];
                                        break;
                                        case 'unload':
                                            children[i].onunload = ctrl[segments[1]];
                                        break;

                                        /* form events */
                                        case 'blur':
                                            children[i].onblur = ctrl[segments[1]];
                                        break;
                                        case 'change':
                                            children[i].onchange = ctrl[segments[1]];
                                        break;
                                        case 'focus':
                                            children[i].onfocus = ctrl[segments[1]];
                                        break;
                                        case 'reset':
                                            children[i].onreset = ctrl[segments[1]];
                                        break;
                                        case 'select':
                                            children[i].onselect = ctrl[segments[1]];
                                        break;
                                        case 'submit':
                                            children[i].onsubmit = ctrl[segments[1]];
                                        break;

                                        /* invalid */
                                        default:
                                            throw 'invalid handler ' + segments[0];
                                        break;
                                    }
                                }
                                else {
                                    throw 'controller not found for ' + segments[0];
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

        // set to global
        window.xe = xe;
    }
})(window);
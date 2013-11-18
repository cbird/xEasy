(function (window) {
    'use strict';
    if (typeof window === 'object' && typeof window.document === 'object') {

        var xe = {
            version: '0.0.1',
            isDebug: false,
            controllers: {},
            init: function(options) {
                setup(window.document.children, window.document);
            },
            debug: function(debug) {
                if (typeof debug === 'undefined') debug = true;
                isDebug = debug;
            }
        },
        setup = function (children, parent, ctrl) {
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
                                    val = ctrl[segments[1]];

                                    /* events according to http://www.w3schools.com/jsref/dom_obj_event.asp */
                                    switch(segments[0]) {
                                        /* mouse events */
                                        case 'click':
                                            children[i].onclick = val;
                                        break;
                                        case 'dblclick':
                                            children[i].ondblclick = val;
                                        break;
                                        case 'mousedown':
                                            children[i].onmousedown = val;
                                        break;
                                        case 'mousemove':
                                            children[i].onmousemove = val;
                                        break;
                                        case 'mouseover':
                                            children[i].onmouseover = val;
                                        break;
                                        case 'mouseout':
                                            children[i].onmouseout = val;
                                        break;
                                        case 'mouseup':
                                            children[i].mouseup = val;
                                        break;

                                        /* keyboard events */
                                        case 'keydown':
                                            children[i].onkeydown = val;
                                        break;
                                        case 'keypress':
                                            children[i].onkeypress = val;
                                        break;
                                        case 'keyup':
                                            children[i].onkeyup = val;
                                        break;

                                        /* frame/object events */
                                        case 'abort':
                                            children[i].abort = val;
                                        break;
                                        case 'error':
                                            children[i].onerror = val;
                                        break;
                                        case 'load':
                                            children[i].onload = val;
                                        break;
                                        case 'resize':
                                            children[i].onresize = val;
                                        break;
                                        case 'scroll':
                                            children[i].onscroll = val;
                                        break;
                                        case 'unload':
                                            children[i].onunload = val;
                                        break;

                                        /* form events */
                                        case 'blur':
                                            children[i].onblur = val;
                                        break;
                                        case 'change':
                                            children[i].onchange = val;
                                        break;
                                        case 'focus':
                                            children[i].onfocus = val;
                                        break;
                                        case 'reset':
                                            children[i].onreset = val;
                                        break;
                                        case 'select':
                                            children[i].onselect = val;
                                        break;
                                        case 'submit':
                                            children[i].onsubmit = val;
                                        break;

                                        /* model binding */
                                        case 'model':
                                            switch(children[i].tagName) {
                                                case 'INPUT':
                                                case 'SELECT':
                                                case 'OPTION':
                                                    children[i].value = val;
                                                    break;
                                                default:
                                                    children[i].innerHTML = val;
                                                    break;
                                            }
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
                    setup(children[i].children, children[i], ctrl);
                }
            }
        };

        // when all is loaded, wire up the controllers
        window.onload = function() {
            xe.init();
        };

        // set to global
        window.xe = xe;
    }
})(window);
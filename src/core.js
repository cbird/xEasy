(function (window) {
    'use strict';
    if (typeof window === 'object' && typeof window.document === 'object') {

        var xe = {
            version: '0.0.1',
            isDebug: false,
            listeners: {},
            controllers: {},
            init: function(options) {
                setup(window.document.children, window.document);
            },
            debug: function(debug) {
                if (typeof debug === 'undefined') debug = true;
                isDebug = debug;
            }
        },
        bindElmVal = function (elm, val) {
            switch(elm.tagName) {
                case 'INPUT':
                    if(elm.type === 'checkbox') {
                        elm.checked = val;
                        break;
                    }
                case 'SELECT':
                case 'OPTION':
                    elm.value = val;
                    break;
                default:
                    elm.innerHTML = val;
                    break;
            }
        },
        setup = function (children, parent, ctrl) {
            var segments, handlers, val;

            for (var i = 0, iLength = children.length; i < iLength; i++) {
                if(children[i].attributes) {
                    for (var j = 0, jLength = children[i].attributes.length; j < jLength; j++) {
                        if(children[i].attributes[j].name.indexOf('xe') === 0 || children[i].attributes[j].name.indexOf('data-xe') === 0) {
                            if(xe.isDebug) console.log(children[i].attributes[j].name, children[i].attributes[j].value);

                            handlers = children[i].attributes[j].value.split(';');

                            for(var k = 0, kLength = handlers.length; k < kLength; k++) {
                                segments = handlers[k].split('.');

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
                                                bindElmVal(children[i], val);

                                                var ref = segments[1];

                                                xe.listeners[ref] = xe.listeners[ref] ? xe.listeners[ref] : [];
                                                xe.listeners[ref].push(children[i]);

                                                // bind changes in DOM to controller
                                                if(children[i].type === 'checkbox') {
                                                    children[i].addEventListener('change', function(event) {
                                                        ctrl[ref] = event.target.checked;
                                                    }, false);
                                                } else {
                                                    children[i].addEventListener('input', function(event) {
                                                        ctrl[ref] = event.target.value;
                                                    }, false);
                                                }

                                                // binds changes in controller to DOM
                                                ctrl.watch(ref, function(id, oldVal, newVal) {
                                                    for(var key in xe.listeners){
                                                        if(ref === key) {
                                                            for (var i = 0, length = xe.listeners[key].length; i < length; i++) {
                                                                bindElmVal(xe.listeners[key][i], newVal);
                                                            }
                                                        }
                                                    }
                                                });

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
                                } else {
                                    throw 'not enough segments in ' + handlers[k];
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
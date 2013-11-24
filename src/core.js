(function (window) {
    'use strict';
    if (typeof window === 'object' && typeof window.document === 'object') {

        var xe = {
            binding: {
                entities: {},
                set: function(elm, ctrl, modelName, actions) {
                    var name = ctrl.name + '-' + modelName;
                    xe.binding.entities[name] = xe.binding.entities[name] ? xe.binding.entities[name] : [];

                    // update existing entity
                    for (var i = 0, length = xe.binding.entities[name].length; i < length; i++){
                        if(xe.binding.entities[name][i].elm === elm) {
                            // update action
                            for(var key in xe.binding.entities[name][i].actions) {
                                if(actions[key]) {
                                    xe.binding.entities[name][i].actions[key] = actions[key];
                                }
                            }
                            // add new action
                            for(var key in actions) {
                                if(!xe.binding.entities[name][i].actions[key]) {
                                    xe.binding.entities[name][i].actions[key] = actions[key];
                                }
                            }
                            return;
                        }
                    }

                    // bind changes in DOM to controller
                    if(elm.type === 'checkbox') {
                        elmFunctions.addEventListener(elm, 'change', function(event) {
                            ctrl[modelName] = event.target.checked;
                        });
                    } else if(elm.tagName === 'SELECT') {
                        elmFunctions.addEventListener(elm, 'change', function(event) {
                            ctrl[modelName] = event.target.value;
                        });
                    } else {
                        elmFunctions.addEventListener(elm, 'input', function(event) {
                            ctrl[modelName] = event.target.value;
                        });
                    }

                    // binds changes in controller to DOM
                    ctrl.watch(modelName, function(id, oldVal, newVal) {
                        for(var key in xe.binding.entities){
                            if(name === key) {
                                for (var i = 0, length = xe.binding.entities[key].length; i < length; i++) {
                                    var option;

                                    // action: data binding
                                    if(xe.binding.entities[key][i].actions.hasOwnProperty('model')) {
                                        option = xe.binding.entities[key][i].actions['model'];
                                        elmFunctions.setValue(xe.binding.entities[key][i].elm, newVal, option);
                                    }

                                    // action: visibility of element
                                    if(xe.binding.entities[key][i].actions.hasOwnProperty('visibility')) {
                                        option = xe.binding.entities[key][i].actions['visibility'];
                                        var hide = (option === 'show' && newVal === false) || (option === 'hide' && newVal === true);

                                        elmFunctions.css(xe.binding.entities[key][i].elm, 'display', hide ? 'none' : '');
                                    }

                                }
                            }
                        }
                    });

                    // add new entity
                    xe.binding.entities[name].push({
                        elm: elm,
                        actions: actions
                    });
                },
                remove: function(name) {
                    delete xe.binding.entities[name];
                }
            },
            ctrl: {},
            init: function(options) {
                setup(window.document.children, window.document);
            }
        },
        elmFunctions = {
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
        },
        setup = function (children, parent, ctrl) {
            var segments, handlers, action, val;

            for (var i = 0, iLength = children.length; i < iLength; i++) {
                if(children[i].attributes) {
                    for (var j = 0, jLength = children[i].attributes.length; j < jLength; j++) {
                        if(children[i].attributes[j].name.indexOf('xe') === 0 || children[i].attributes[j].name.indexOf('data-xe') === 0) {
                            handlers = children[i].attributes[j].value.split(';');

                            for(var k = 0, kLength = handlers.length; k < kLength; k++) {
                                segments = handlers[k].split('.');

                                if(segments.length > 1) { // invalid if less than 2 segments
                                    if(segments[0] === 'ctrl') {
                                        ctrl = xe.ctrl[segments[1]]
                                        ctrl.name = segments[1];
                                    }
                                    else if (ctrl) {
                                        val = ctrl[segments[1]];
                                        action = segments[0].toLowerCase();

                                        switch(action) {

                                            /* model binding */
                                            case 'model':
                                                var cache = {
                                                    modelName: segments[1],
                                                    option: segments[2]
                                                };

                                                // set the initial value from the controller
                                                elmFunctions.setValue(children[i], val, cache.option);

                                                // set binding
                                                xe.binding.set(children[i], ctrl, cache.modelName, { model: cache.option });
                                            break;

                                            /* css manipulation */
                                            case 'show':
                                            case 'hide':
                                                // set binding
                                                xe.binding.set(
                                                    children[i],
                                                    ctrl,
                                                    segments[1],
                                                    { visibility: segments[0] }
                                                );
                                            break;

                                            /* events according to http://www.w3schools.com/jsref/dom_obj_event.asp, and some touch events */
                                            default:
                                                children[i]['on' + action] = val;
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
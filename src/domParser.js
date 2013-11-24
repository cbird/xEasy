(function(window, xe){
    'use strict';

    xe.domParser = function (children, parent, ctrl) {
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
                                    ctrl = xe.ctrl[segments[1]];
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
                                            xe.functions.element.setValue(children[i], val, cache.option);

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
                xe.domParser(children[i].children, children[i], ctrl);
            }
        }
    };

    window.xe = xe;
})(window, window && window.xe ? window.xe : {});
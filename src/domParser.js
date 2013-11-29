var domParser = (function() {
    var parse = function (children, parent, ctrl) {
        var segments, handlers, action, val, bindingName, binder;

        for (var i = 0, iLength = children.length; i < iLength; i++) {
            if(children[i].attributes) {
                for (var j = 0, jLength = children[i].attributes.length; j < jLength; j++) {
                    if(children[i].attributes[j].name.indexOf('xe') === 0 || children[i].attributes[j].name.indexOf('data-xe') === 0) {
                        handlers = children[i].attributes[j].value.split(';');

                        for(var k = 0, kLength = handlers.length; k < kLength; k++) {
                            segments = handlers[k].split('->');

                            if(segments.length < 2) {
                                throw 'not enough segments in ' + handlers[k]; // invalid if less than 2 segments
                            }

                            if(segments[0] === 'ctrl') {
                                ctrl = xe.ctrl[segments[1]];
                                ctrl.name = segments[1];
                                xe.ctrl.installTo(ctrl);
                            }
                            else if (ctrl) {
                                var bindingActions = {};
                                action = segments[0].toLowerCase();
                                bindingName = ctrl.name + '_' + segments[1].replace('.', '_');
                                binder = xe.binding.getBinder(ctrl, segments[1]);
                                val = binder[0][binder[1]];

                                switch(action) {

                                    /* model binding */
                                    case 'model':
                                        bindingActions[action] = bindingActions[action] ? bindingActions[action] : segments[2];

                                        // set the initial data from the controller
                                        xe.functions.element.setData(children[i], val, segments[2]);
                                    break;

                                    /* css manipulation */
                                    case 'show':
                                        bindingActions[action] = bindingActions[action] ? bindingActions[action] : '';

                                        // set the initial value from the controller
                                        xe.functions.element.setStyle(children[i], 'display', val === false ? 'none' : '');
                                    break;
                                    case 'hide':
                                        bindingActions[action] = bindingActions[action] ? bindingActions[action] : '';

                                        // set the initial value from the controller
                                        xe.functions.element.setStyle(children[i], 'display', val === true ? 'none' : '');
                                    break;
                                    case 'css':
                                        bindingActions[action] = bindingActions[action] ? bindingActions[action] : '';

                                        // set the initial css from the controller
                                        xe.functions.element.setCss(children[i], val);
                                    break;

                                    /* events according to http://www.w3schools.com/jsref/dom_obj_event.asp, and some touch events */
                                    default:
                                        bindingActions = undefined;
                                        children[i]['on' + action] = val;
                                    break;
                                }

                                if(bindingActions) {
                                    // set binding
                                    xe.binding.set(
                                        bindingName,
                                        children[i],
                                        binder[0],
                                        binder[1],
                                        bindingActions
                                    );
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
                parse(children[i].children, children[i], ctrl);
            }
        }
    };

    return {
        parse: parse
    };
})();
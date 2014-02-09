module.exports = (function() {

    /**
     * Used when parsing though th DOM
     * @param  {Array} Underlying children in a DOM element
     * @param  {Object} A DOM element
     * @param  {Object} Controller used in the scope
     * @param  {Object} Form used in the scope
     * @return {Object}
     */
    var parse = function(children, parent, ctrl, form) {
        var segments, handlers, action, val, bindingName, binder;

        for(var i = 0, iLength = children.length; i < iLength; i++) {
            handlers = children[i].attributes['data-xe'] ? children[i].attributes['data-xe'].value : undefined;
            handlers = children[i].attributes['xe'] ? children[i].attributes['xe'].value : handlers;

            if(handlers) {
                handlers = handlers.split(';');

                for(var k = 0, kLength = handlers.length; k < kLength; k++) {
                    segments = handlers[k].split(xe.config.separator);

                    if(segments.length < 2) {
                        throw 'not enough segments in ' + handlers[k]; // invalid if less than 2 segments
                    }

                    action = segments[0];

                    if(action === 'ctrl') {
                        ctrl = xe.ctrl[segments[1]];
                        ctrl.name = segments[1];
                        xe.ctrl.$installTo(ctrl);
                    }

                    if(ctrl) {
                        var bindingActions = {};
                        bindingName = ctrl.name + '_' + segments[1].replace('.', '_');
                        binder = xe.binding.getBinder(ctrl, segments[1]);
                        val = binder.val;

                        switch(action) {
                            /* form validation */
                            case 'form':
                                var validate = segments[2] === 'validate';
                                ctrl.form = {};
                                form = ctrl.form[segments[1]] = {
                                    validate: validate,
                                    isValid: !validate,
                                    isDirty: false,
                                    root: children[i]
                                };
                            break;

                            /* model binding */
                            case 'model':
                                bindingActions[action] = bindingActions[action] ? bindingActions[action] : segments[2];

                                // set the initial data from the controller
                                xe.functions.element.setData(children[i], val, segments[2]);
                            break;

                            /* radio buttons */
                            case 'radio':
                                bindingActions[action] = bindingActions[action] ? bindingActions[action] : segments[2];

                                // set the initial data from the controller
                                children[i].checked = children[i].value === val;
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
                                binder.obj,
                                binder.prop,
                                bindingActions
                            );
                        }
                    }
                    else {
                        throw 'controller not found for ' + segments[0];
                    }
                }
            }

            /* form validation */
            if(form && form.root !== children[i] && form.root === children[i].form) {
                xe.validation.bind(children[i], form);
            }

            if(children[i].children) {
                parse(children[i].children, children[i], ctrl, form);
            } else {
                parse(children[i].childNodes, children[i], ctrl, form);
            }
        }

        return this;
    };

    return {
        parse: parse
    };
}());
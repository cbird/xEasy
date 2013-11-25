(function(window, xe){
    'use strict';

    xe.binding = {
        entities: {},
        set: function(name, elm, obj, prop, actions) {
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
            if(typeof obj[prop] !== 'object') {
                if(elm.type === 'checkbox') {
                    xe.functions.element.addEventListener(elm, 'change', function(event) {
                        obj[prop] = event.target.checked;
                    });
                } else if(elm.tagName === 'SELECT') {
                    xe.functions.element.addEventListener(elm, 'change', function(event) {
                        obj[prop] = event.target.value;
                    });
                } else {
                    xe.functions.element.addEventListener(elm, 'input', function(event) {
                        obj[prop] = event.target.value;
                    });
                }
            }

            // binds changes in controller to DOM.
            // todo: don't notify elements that are the origin of the event, ex. event in elm1 -> obj updates -> pushes to elm1, elm2, elm3
            obj.watch(prop, function(id, oldVal, newVal) {
                for(var key in xe.binding.entities){
                    if(name === key) {
                        for (var i = 0, length = xe.binding.entities[key].length; i < length; i++) {
                            var option;

                            // action: data binding
                            if(xe.binding.entities[key][i].actions.hasOwnProperty('model')) {
                                option = xe.binding.entities[key][i].actions['model'];
                                xe.functions.element.setData(xe.binding.entities[key][i].elm, newVal, option);
                            }

                            // action: show element
                            if(xe.binding.entities[key][i].actions.hasOwnProperty('show')) {
                                xe.functions.element.setStyle(xe.binding.entities[key][i].elm, 'display', newVal === false ? 'none' : '');
                            }

                            // action: hide element
                            if(xe.binding.entities[key][i].actions.hasOwnProperty('hide')) {
                                xe.functions.element.setStyle(xe.binding.entities[key][i].elm, 'display', newVal === true ? 'none' : '');
                            }

                            // action: css object
                            if(xe.binding.entities[key][i].actions.hasOwnProperty('css')) {
                                xe.functions.element.setCss(xe.binding.entities[key][i].elm, obj);
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
        },
        getBinder: function(obj, prop) {
            // creates correct object to bind to
            var segments = prop.split('.'),
                binder = [obj, prop];

            // loop until correct
            for(var i = 1, length = segments.length; i < length; i++) {
                binder[0] = binder[0][segments[i-1]];
                binder[1] = segments[i];
            }

            return binder;
        }
    };

    window.xe = xe;
})(window, window && window.xe ? window.xe : {});
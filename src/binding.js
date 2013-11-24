(function(window, xe){
    'use strict';

    xe.binding = {
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
                xe.functions.element.addEventListener(elm, 'change', function(event) {
                    ctrl[modelName] = event.target.checked;
                });
            } else if(elm.tagName === 'SELECT') {
                xe.functions.element.addEventListener(elm, 'change', function(event) {
                    ctrl[modelName] = event.target.value;
                });
            } else {
                xe.functions.element.addEventListener(elm, 'input', function(event) {
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
                                xe.functions.element.setValue(xe.binding.entities[key][i].elm, newVal, option);
                            }

                            // action: visibility of element
                            if(xe.binding.entities[key][i].actions.hasOwnProperty('visibility')) {
                                option = xe.binding.entities[key][i].actions['visibility'];
                                var hide = (option === 'show' && newVal === false) || (option === 'hide' && newVal === true);

                                xe.functions.element.css(xe.binding.entities[key][i].elm, 'display', hide ? 'none' : '');
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
    };

    window.xe = xe;
})(window, window && window.xe ? window.xe : {});
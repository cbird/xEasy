module.exports = (function() {

    var _entities = {};

    /**
     * Used when initializing the two-way binding
     * @param {String} Name of the binding
     * @param {Object} DOM element to bind to
     * @param {Object} Object to bind to
     * @param {String} Name of the property on the object to bind to
     * @param {Object} Map of actions used in the binding
     */
    var set = function(name, elm, obj, prop, actions) {
        _entities[name] = _entities[name] ? _entities[name] : [];

        // update existing entity
        for (var i = 0, length = _entities[name].length; i < length; i++){
            if(_entities[name][i].elm === elm) {
                // update action
                for(var key in _entities[name][i].actions) {
                    if(actions[key]) {
                        _entities[name][i].actions[key] = actions[key];
                    }
                }
                // add new action
                for(var k in actions) {
                    if(!_entities[name][i].actions[k]) {
                        _entities[name][i].actions[k] = actions[k];
                    }
                }
                return;
            }
        }

        // bind changes in DOM to controller
        if(typeof obj[prop] !== 'object') {
            if(elm.type === 'checkbox') {
                elm.on('change', function(event) {
                    obj[prop] = event.target.checked;
                });
            } else if(elm.type === 'radio') {
                elm.on('click', function(event) {
                    obj[prop] = event.target.value;
                });
                elm.name = prop;
            } else if(elm.tagName === 'SELECT') {
                elm.on('change', function(event) {
                    obj[prop] = event.target.value;
                });
            } else {
                elm.on('input', function(event) {
                    obj[prop] = event.target.value;
                });
            }
        }

        // binds changes in controller to DOM.
        // todo: don't notify elements that are the origin of the event, ex. event in elm1 -> obj updates -> pushes to elm1, elm2, elm3
        obj.watch(prop, function(id, oldVal, newVal) {
            for(var key in _entities){
                if(name.indexOf(key) > -1) {
                    for (var i = 0, length = _entities[key].length; i < length; i++) {
                        var option;

                        // action: data binding
                        if(_entities[key][i].actions.hasOwnProperty('model')) {
                            option = _entities[key][i].actions.model;
                            xe.functions.element.setData(_entities[key][i].elm, newVal, option);
                        }

                        // action: show element
                        if(_entities[key][i].actions.hasOwnProperty('show')) {
                            xe.functions.element.setStyle(_entities[key][i].elm, 'display', newVal === false ? 'none' : '');
                        }

                        // action: hide element
                        if(_entities[key][i].actions.hasOwnProperty('hide')) {
                            xe.functions.element.setStyle(_entities[key][i].elm, 'display', newVal === true ? 'none' : '');
                        }

                        // action: css object
                        if(_entities[key][i].actions.hasOwnProperty('css')) {
                            xe.functions.element.setCss(_entities[key][i].elm, obj);
                        }

                    }
                }
            }
        });

        // add new entity
        _entities[name].push({
            elm: elm,
            actions: actions
        });
    };

    /**
     * Used when removing a binding
     * @param  {String} Name of the binding to delete
     * @return {Object}
     */
    var remove = function(name) {
        delete _entities[name];
        return this;
    };

    /**
     * Used when creating the correct object to bind to
     * @param  {Object} Object used
     * @param  {String} Property on the object
     * @return {Object}
     */
    var getBinder = function(obj, prop) {
        var segments = prop.split('.'),
            binder = [obj, prop];

        // loop until correct
        for(var i = 1, length = segments.length; i < length; i++) {
            binder[0] = binder[0][segments[i-1]];
            binder[1] = segments[i];
        }

        return {
            obj: binder[0],
            prop: binder[1],
            val: binder[0][binder[1]]
        };
    };

    return {
        entities: _entities,
        set: set,
        remove: remove,
        getBinder: getBinder
    };
}());
/*global module: false, xe: false*/
module.exports = (function () {
    'use strict';
    
    var entities = {},
        /**
         * Used when initializing the two-way binding
         * @param {String} Name of the binding
         * @param {Object} DOM element to bind to
         * @param {Object} Object to bind to
         * @param {String} Name of the property on the object to bind to
         * @param {Object} Map of actions used in the binding
         */
        set = function (name, elm, obj, prop, actions) {
            var i, length, key;
            entities[name] = entities[name] || [];

            // update existing entity
            for (i = 0, length = entities[name].length; i < length; i += 1) {
                if (entities[name][i].elm === elm) {
                    // update action
                    for (key in entities[name][i].actions) {
                        if (entities[name][i].actions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
                            entities[name][i].actions[key] = actions[key];
                        }
                    }
                    // add new action
                    for (key in actions) {
                        if (actions.hasOwnProperty(key) && !entities[name][i].actions.hasOwnProperty(key)) {
                            entities[name][i].actions[key] = actions[key];
                        }
                    }
                    return;
                }
            }

            // bind changes in DOM to controller
            if (typeof obj[prop] !== 'object') {
                if (elm.type === 'checkbox') {
                    elm.on('change', function (event) {
                        obj[prop] = event.target.checked;
                    });
                } else if (elm.type === 'radio') {
                    elm.on('click', function (event) {
                        obj[prop] = event.target.value;
                    });
                    elm.name = prop;
                } else if (elm.nodeName === 'SELECT') {
                    elm.on('change', function (event) {
                        obj[prop] = event.target.value;
                    });
                } else {
                    elm.on('input', function (event) {
                        obj[prop] = event.target.value;
                    });
                }
            }

            // binds changes in controller to DOM.
            // todo: don't notify elements that are the origin of the event, ex. event in elm1 -> obj updates -> pushes to elm1, elm2, elm3
            obj.watch(prop, function (id, oldVal, newVal) {
                var key, option;
                for (key in entities) {
                    if (entities.hasOwnProperty(key) && name.indexOf(key) > -1) {
                        for (i = 0, length = entities[key].length; i < length; i += 1) {
                            
                            // action: data binding
                            if (entities[key][i].actions.hasOwnProperty('model')) {
                                option = entities[key][i].actions.model;
                                xe.functions.element.setData(entities[key][i].elm, newVal, option);
                            }

                            // action: show element
                            if (entities[key][i].actions.hasOwnProperty('show')) {
                                xe.functions.element.setStyle(entities[key][i].elm, 'display', newVal === false ? 'none' : '');
                            }

                            // action: hide element
                            if (entities[key][i].actions.hasOwnProperty('hide')) {
                                xe.functions.element.setStyle(entities[key][i].elm, 'display', newVal === true ? 'none' : '');
                            }

                            // action: css object
                            if (entities[key][i].actions.hasOwnProperty('css')) {
                                xe.functions.element.setCss(entities[key][i].elm, obj);
                            }
                        }
                    }
                }
            });

            // add new entity
            entities[name].push({
                elm: elm,
                actions: actions
            });
        },

        /**
         * Used when removing a binding
         * @param  {String} Name of the binding to delete
         * @return {Object}
         */
        remove = function (name) {
            delete entities[name];
            return this;
        },

        /**
         * Used when creating the correct object to bind to
         * @param  {Object} Object used
         * @param  {String} Property on the object
         * @return {Object}
         */
        getBinder = function (obj, prop) {
            var segments = prop.split('.'),
                binder = [obj, prop],
                i,
                length;

            // loop until correct
            for (i = 1, length = segments.length; i < length; i += 1) {
                binder[0] = binder[0][segments[i - 1]];
                binder[1] = segments[i];
            }

            return {
                obj: binder[0],
                prop: binder[1],
                val: binder[0][binder[1]]
            };
        };

    return {
        entities: entities,
        set: set,
        remove: remove,
        getBinder: getBinder
    };
}());
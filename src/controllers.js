/*global module: false*/
module.exports = (function () {
    'use strict';
    
    var events = {},

        /**
         * Subscribe to an event
         * @param  {String}   Name of the event
         * @param  {Function} Function called when event is raised
         * @return {Object}
         */
        subscribe = function (name, cb) {
            if (!events.hasOwnProperty(name)) {
                events[name] = [];
            }

            events[name].push({
                context: this,
                callback: cb
            });

            return this;
        },

        /**
         * Publish/broadcast an event to other controllers
         * @param  {String} Name of the event
         * @return {Object}
         */
        publish = function (name) {
            if (!events.hasOwnProperty(name)) {
                return false;
            }

            var args = Array.prototype.slice.call(arguments, 1), sub, i, l;
            for (i = 0, l = events[name].length; i < l; i += 1) {
                sub = events[name][i];
                sub.callback.apply(sub.context, args);
            }

            return this;
        };

    return {
        $events: events,
        $publish: publish,
        $subscribe: subscribe,
        $installTo: function (obj) {
            obj.$subscribe = subscribe;
            obj.$publish = publish;
        }
    };
}());
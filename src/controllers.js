module.exports = (function() {

    var _events = {};

    /**
     * Subscribe to an event
     * @param  {String}   Name of the event
     * @param  {Function} Function called when event is raised
     * @return {Object}
     */
    var subscribe = function(name, cb) {
        if (!_events[name]){
            _events[name] = [];
        }

        _events[name].push({
            context: this,
            callback: cb
        });

        return this;
    };

    /**
     * Publish/broadcast an event to other controllers
     * @param  {String} Name of the event
     * @return {Object}
     */
    var publish = function(name) {
        if (!_events[name]){
            return false;
        }

        var args = Array.prototype.slice.call(arguments, 1), sub;
        for (var i = 0, l = _events[name].length; i < l; i++) {
            sub = _events[name][i];
            sub.callback.apply(sub.context, args);
        }

        return this;
    };

    return {
        events: _events,
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());
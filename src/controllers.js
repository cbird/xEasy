module.exports = (function() {
    var topics = {};

    /**
     * Subscribe to an event
     * @param  {String}   Name of the event
     * @param  {Function} Function called when event is raised
     * @return {Object}
     */
    var subscribe = function(topic, cb) {
        if (!topics[topic]){
          topics[topic] = [];
        }

        topics[topic].push({
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
    var publish = function(topic) {
        if (!topics[topic]){
          return false;
        }

        var args = Array.prototype.slice.call(arguments, 1), sub;
        for (var i = 0, l = topics[topic].length; i < l; i++) {
            sub = topics[topic][i];
            sub.callback.apply(sub.context, args);
        }

        return this;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());
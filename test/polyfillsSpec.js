describe('polyfills', function() {

    var _polyfills;

    beforeEach(function() {
        _polyfills = undefined;
        _polyfills = require('../src/polyfills');
    });

    describe('#watch()', function() {

        it('should polyfill Object.watch', function() {
            assert.isDefined(Object.watch, 'it is defined');
        });

        it('should trigger when a property changes on an object', function() {
            var obj = {
                val: 1
            };

            var callback = sinon.spy();

            obj.watch('val', callback);
            obj.val = 2;

            assert.isTrue(callback.called, 'callback has been triggerd');
            assert.isTrue(callback.calledOnce, 'callback has been triggered once');
        });

    });

    describe('#unwatch()', function() {

        it('should polyfill Object.unwatch', function() {
            assert.isDefined(Object.unwatch, 'it is defined');
        });

        it('should unbind the watch of a property', function() {
            var obj = {
                val: 1
            };

            var callback = sinon.spy();

            obj.watch('val', callback);
            obj.unwatch('val');
            obj.val = 2;

            assert.isFalse(callback.called, 'callback has not been triggerd');
        });

    });

});
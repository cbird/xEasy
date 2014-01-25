describe('polyfills', function(){
    var _polyfills;

    beforeEach(function(){
        _polyfills = undefined;
        _polyfills = require('../src/polyfills');
    });

    describe('#watch()', function(){
        it('should polyfill Object.watch', function(){
            assert.isDefined(Object.watch, 'it is defined');
        });
        it('should trigger when a property changes on an object', function(){
            var obj = {
                val: 1
            };

            assert.throw(function(){
                obj.watch('val', function(id, oldVal, newVal) {
                    if(oldVal !== newVal){
                        throw id + ': ' + oldVal + ' -> ' + newVal;
                    }
                });
                obj.val = 2;
            }, 'val: 1 -> 2');

        });
    });

    describe('#unwatch()', function(){
        it('should polyfill Object.unwatch', function(){
            assert.isDefined(Object.unwatch, 'it is defined');
        });

        it('should unbind the watch of a property', function(){
            var obj = {
                val: 1
            };

            assert.doesNotThrow(function(){
                var fn = function() {
                    throw 'value changed';
                };
                obj.watch('val', fn);
                obj.unwatch('val');
                obj.val = 2;
            }, 'did not trigger watch');
        });
    });
});
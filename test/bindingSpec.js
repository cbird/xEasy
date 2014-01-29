describe('binding', function() {

    var _binding;

    beforeEach(function() {
        _binding = undefined;
        _binding = require('../src/binding');
    });

    describe('#getBinder()', function() {

        var complexObj = {
            val: {
                data: 1
            },
            val2: 'hello world'
        };

        it('should return correct object given complex object', function() {
            var binder = _binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.obj, complexObj.val, 'the values match');
        });

        it('should return correct property given complex object', function() {
            var binder = _binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.prop, 'data', 'the values match');
        });

        it('should return correct value given complex object', function() {
            var binder = _binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.val, complexObj.val.data, 'the values match');
        });

    });

});
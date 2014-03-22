/*global describe: false, beforeEach: false, require: false, it: false, assert: false*/
describe('binding', function () {
    'use strict';
    
    var binding;

    beforeEach(function () {
        binding = undefined;
        binding = require('../src/binding');
    });

    describe('#getBinder()', function () {

        var complexObj = {
            val: {
                data: 1
            },
            val2: 'hello world'
        };

        it('should return correct object given complex object', function () {
            var binder = binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.obj, complexObj.val, 'the values match');
        });

        it('should return correct property given complex object', function () {
            var binder = binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.prop, 'data', 'the values match');
        });

        it('should return correct value given complex object', function () {
            var binder = binding.getBinder(complexObj, 'val.data');
            assert.equal(binder.val, complexObj.val.data, 'the values match');
        });

    });

});
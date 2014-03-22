/*global describe: false, beforeEach: false, require: false, it: false, assert: false, sinon: false*/
describe('controllers', function () {
    'use strict';
    
    var controllers;

    beforeEach(function () {
        controllers = undefined;
        controllers = require('../src/controllers');
    });

    describe('#subscribe()', function () {

        it('should return module controllers', function () {
            assert.equal(controllers.$subscribe('shouldReturn', function () {}), controllers, 'it returns controllers');
        });

        it('should populate events', function () {
            controllers.$subscribe('shouldPopulate', function () {});
            assert.notEqual(controllers.$events, {}, 'there are events');
        });

    });

    describe('#publish()', function () {

        it('should return module controllers if event is found', function () {
            controllers.$subscribe('eventFound', function () {});
            assert.equal(controllers.$publish('eventFound'), controllers, 'it returns controllers');
        });

        it('should return false if event is not found', function () {
            assert.equal(controllers.$publish('eventNotFound'), false, 'it returns false');
        });

        it('should fire the callback of an event', function () {
            var callback = sinon.spy();

            controllers.$subscribe('shouldFireCallback', callback);
            controllers.$publish('shouldFireCallback');

            assert.isTrue(callback.called, 'callback has been triggerd');
            assert.isTrue(callback.calledOnce, 'callback has been triggered once');
        });

    });

    describe('#installTo()', function () {

        it('should install subscribe() and publish() onto an object', function () {
            var obj = {};

            controllers.$installTo(obj);

            assert.isDefined(controllers.$subscribe, 'subscribe is bound to object');
            assert.isDefined(controllers.$publish, 'publish is bound to object');
        });

    });
});
/*global describe: false, beforeEach: false, require: false, it: false, assert: false, sinon: false*/
describe('controllers', function () {
    'use strict';
    
    var controllers,
        perfCount = 10000;

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

        it('should subscribe ' + perfCount + ' times', function () {
            var callback = sinon.spy(),
                obj = {},
                i;
            
            controllers.$installTo(obj);
            obj.$subscribe('subscribe perfTest', callback);
            
            for (i = 0; i < perfCount; i += 1) {
                controllers.$publish('subscribe perfTest');
            }
            
            assert.isTrue(callback.called, 'callback has been triggerd');
            assert.equal(callback.callCount, perfCount, 'callback has been triggerd ' + perfCount + ' times');
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

        it('should publish to ' + perfCount + ' subscribers', function () {
            var callback = sinon.spy(),
                arr = [],
                i;
            
            for (i = 0; i < perfCount; i += 1) {
                arr[0] = {};
                controllers.$installTo(arr[0]);
                arr[0].$subscribe('publish perfTest', callback);
            }
            
            controllers.$publish('publish perfTest');

            assert.isTrue(callback.called, 'callback has been triggerd');
            assert.equal(callback.callCount, perfCount, 'callback has been triggerd ' + perfCount + ' times');
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
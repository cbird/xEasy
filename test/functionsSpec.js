/*global describe: false, beforeEach: false, require: false, it: false, assert: false*/
describe('functions', function () {
    'use strict';
    
    var functions;

    beforeEach(function () {
        functions = undefined;
        functions = require('../src/functions');
    });

    describe('element', function () {

        describe('#setData()', function () {

            it('should set value to input', function () {
                var elm = {
                    nodeName: 'INPUT'
                };

                functions.element.setData(elm, 'test');

                assert.equal(elm.value, 'test', 'value is set');
            });

            it('should check checkbox', function () {
                var elm = {
                    nodeName: 'INPUT',
                    type: 'checkbox'
                };

                functions.element.setData(elm, true);

                assert.equal(elm.checked, true, 'checked checkbox');
            });

            it('should set text to option', function () {
                var elm = {
                    nodeName: 'OPTION'
                };

                functions.element.setData(elm, 'test', 'text');

                assert.equal(elm.innerHTML, 'test', 'text is set');
            });

            it('should set text and value to option', function () {
                var elm = {
                    nodeName: 'OPTION'
                };

                functions.element.setData(elm, 'test', 'both');

                assert.equal(elm.innerHTML, 'test', 'text is set');
                assert.equal(elm.value, 'test', 'value is set');
            });

            it('should set value to selectbox', function () {
                var elm = {
                    nodeName: 'SELECT'
                };

                functions.element.setData(elm, 'test');

                assert.equal(elm.value, 'test', 'value is set');
            });

            it('should set innerHTML', function () {
                var elm = {
                    nodeName: 'DIV'
                };

                functions.element.setData(elm, 'test');

                assert.equal(elm.innerHTML, 'test', 'value is set');
            });

        });

        describe('#setStyle()', function () {

            it('should set value to given property', function () {
                var elm = {
                    nodeName: 'INPUT',
                    style: {}
                };

                functions.element.setStyle(elm, 'display', 'none');

                assert.equal(elm.style.display, 'none', 'value is set');
            });

        });

        describe('#setCss()', function () {

            it('should set css object to element', function () {
                var elm = {
                        nodeName: 'INPUT',
                        style: {}
                    },
                    css = {
                        display: 'none',
                        color: 'red'
                    };

                functions.element.setCss(elm, css);

                assert.equal(elm.style.display, css.display, 'display is set');
                assert.equal(elm.style.color, css.color, 'color is set');
            });

        });

    });

});
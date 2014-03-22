/*global module*/
module.exports = (function () {
    'use strict';
    return {
        separator: '->',
        regEx: {
            number: /^\d+$/,
            email: /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,
            phone: /^\d+$/
        }
    };
}());
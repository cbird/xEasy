/*global module: false, xe: false*/
module.exports = (function () {
    'use strict';
    
    var form,
        validate = function (event) {
            var invalid = true, val = event.target.type === 'checkbox' ? event.target.checked : event.target.value, i, iLength, j, jLength;

            form.isDirty = true;
            form.root.addClass('dirty');
            event.target.addClass('dirty');

            invalid = (typeof event.target.attributes.required !== 'undefined' && !val) ||
                (typeof event.target.attributes.pattern !== 'undefined' && !event.target.value.match(new RegExp(event.target.attributes.pattern.value))) ||
                (event.target.type === 'email' && !xe.config.regEx.email.test(event.target.value)) ||
                (event.target.type === 'tel' && !xe.config.regEx.phone.test(event.target.value)) ||
                (event.target.type === 'number' && !xe.config.regEx.number.test(event.target.value));

            form.isValid = !invalid;

            if (form.isValid && !event.target.hasClass('valid')) {
                event.target.removeClass('invalid');
                event.target.addClass('valid');
            } else if (!form.isValid  && !event.target.hasClass('invalid')) {
                event.target.removeClass('valid');
                event.target.addClass('invalid');
            }

            for (i = 0, iLength = form.fields.length; i < iLength; i += 1) {
                form.isValid = form.isValid && (form.fields[i].hasClass('valid') || (typeof form.fields[i].attributes.required === 'undefined' && (!form.fields[i].value || !form.fields[i].checked)));
            }

            if (form.isValid && !form.root.hasClass('valid')) {
                form.root.removeClass('invalid');
                form.root.addClass('valid');
            } else if (!form.isValid  && !form.root.hasClass('invalid')) {
                form.root.removeClass('valid');
                form.root.addClass('invalid');
            }

            for (j = 0, jLength = form.triggers.length; j < jLength; j += 1) {
                if (form.isValid && typeof form.triggers[j].disabled !== 'undefined') {
                    form.triggers[j].removeAttribute('disabled');
                } else if (!form.isValid) {
                    form.triggers[j].setAttribute('disabled', 'disabled');
                }
            }
        },
        bind = function (elm, inForm) {
            form = inForm;

            if (form.validate) {
                if (elm.type === 'checkbox') {
                    elm.on('change', validate);
                } else if (elm.type === 'radio') {
                    elm.on('click', validate);
                } else if (elm.nodeName === 'SELECT') {
                    elm.on('change', validate);
                } else {
                    elm.on('input', validate);
                }
            }

            if (elm.type === 'submit') {
                elm.setAttribute('disabled', 'disabled');
                form.triggers = form.triggers || [];
                form.triggers.push(elm);
            } else if (elm.nodeName === 'INPUT' || elm.nodeName === 'TEXTAREA' || elm.nodeName === 'SELECT') {
                form.fields = form.fields || [];
                form.fields.push(elm);
            }

            return form;
        };

    return {
        bind: bind
    };
}());
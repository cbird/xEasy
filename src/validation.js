module.exports = (function() {
    var _form,
        validate = function(event) {
            var invalid = true, val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

            _form.isDirty = true;
            _form.root.addClass('dirty');
            event.target.addClass('dirty');

            invalid = (typeof event.target.attributes['required'] !== 'undefined' && !val) ||
                (typeof event.target.attributes['pattern'] !== 'undefined' && !event.target.value.match(new RegExp(event.target.attributes['pattern'].value))) ||
                (event.target.type === 'email' && !xe.config.regEx.email.test(event.target.value)) ||
                (event.target.type === 'tel' && !xe.config.regEx.phone.test(event.target.value)) ||
                (event.target.type === 'number' && !xe.config.regEx.number.test(event.target.value));

            _form.isValid = !invalid;

            if(_form.isValid && !event.target.hasClass('valid')) {
                event.target.removeClass('invalid');
                event.target.addClass('valid');
            } else if(!_form.isValid  && !event.target.hasClass('invalid')) {
                event.target.removeClass('valid');
                event.target.addClass('invalid');
            }

            for (var i = 0, iLength = _form.fields.length; i < iLength; i++) {
                _form.isValid = _form.isValid && (_form.fields[i].hasClass('valid') || typeof _form.fields[i].attributes['required'] === 'undefined' && (!_form.fields[i].value || !_form.fields[i].checked));
            }

            if(_form.isValid && !_form.root.hasClass('valid')) {
                _form.root.removeClass('invalid');
                _form.root.addClass('valid');
            } else if(!_form.isValid  && !_form.root.hasClass('invalid')) {
                _form.root.removeClass('valid');
                _form.root.addClass('invalid');
            }

            for (var j = 0, jLength = _form.triggers.length; j < jLength; j++) {
                if(_form.isValid && typeof _form.triggers[j]['disabled'] !== 'undefined') {
                    _form.triggers[j].removeAttribute('disabled');
                } else if(!_form.isValid) {
                    _form.triggers[j].setAttribute('disabled', 'disabled');
                }
            }
        },
        bind = function(elm, form) {
            _form = form;

            if(_form.validate) {
                if(elm.type === 'checkbox') {
                    elm.on('change', validate);
                } else if(elm.type === 'radio') {
                    elm.on('click', validate);
                } else if(elm.nodeName === 'SELECT') {
                    elm.on('change', validate);
                } else {
                    elm.on('input', validate);
                }
            }

            if(elm.type === 'submit') {
                elm.setAttribute('disabled', 'disabled');
                _form.triggers = _form.triggers ? _form.triggers : [];
                _form.triggers.push(elm);
            }
            else if(elm.nodeName === 'INPUT' || elm.nodeName === 'TEXTAREA' || elm.nodeName === 'SELECT') {
                _form.fields = _form.fields ? _form.fields : [];
                _form.fields.push(elm);
            }

            return _form;
        };

    return {
        bind: bind
    };
}());
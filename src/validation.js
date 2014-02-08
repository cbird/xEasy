module.exports = (function() {

    var installTo = function(formElm, formObj) {


        if(formElm.children) {
            parse(formElm.children, formObj);
        } else {
            parse(formElm.childNodes, formObj);
        }
    };

    var parse = function(children, formObj) {
        for(var i = 0, iLength = children.length; i < iLength; i++) {

            //if(children[i].)


            if(children[i].type === 'checkbox') {
                children[i].on('change', function(event) {

                });
            } else if(children[i].type === 'radio') {
                children[i].on('click', function(event) {
                    //obj[prop] = event.target.value;
                });
            } else if(children[i].tagName === 'SELECT') {
                children[i].on('change', function(event) {

                });
            } else {
                children[i].on('input', function(event) {

                });
            }

            if(children[i].children) {
                parse(children[i].children, formObj);
            } else if(children[i].childNodes) {
                parse(children[i].childNodes, formObj);
            }
        }
    };

    return {
        installTo: installTo
    };
}());
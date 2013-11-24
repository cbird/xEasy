(function(){
    xe.ctrl.home = {
        testData: 'test',
        testBool: true,
        handleClick: function() {
            console.log('handleClick clicked!', xe.ctrl.home.testData);
        },
        handleKeyup: function() {
            console.log('handleClick keyup!', xe.ctrl.home.testData);
        }
    };

    xe.ctrl.user = {
        login: function() {
            console.log('login clicked!');
        },
        logout: function() {
            console.log('logout clicked!');
        },
        handleBlur: function() {
            console.log('blurred!');
        },
        handleFocus: function() {
            console.log('focused!');
        }
    };
})();
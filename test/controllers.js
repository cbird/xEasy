(function(){
    xe.ctrl.home = {
        testData: 'test',
        testBool: true,
        cssObject: {
            background: '#fff',
            color: '#888'
        },
        handleClick: function() {
            console.log('handleClick clicked!', xe.ctrl.home.testData);
        },
        handleKeyup: function() {
            console.log('handleClick keyup!', xe.ctrl.home.testData);
        },
        handleTouch: function() {
            alert('cant touch this!');
        }
    };

    xe.ctrl.user = {
        testData: 'test2',
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
xe.ctrl.home = (function(){
    var testData = 'test',
        testBool = true,
        cssObject = {
            background: '#fff',
            color: '#888'
        },
        radioData = 'yes';

    var handleClick = function() {
            console.log('handleClick clicked!', xe.ctrl.home.testData);
        },
        handleKeyup = function() {
            console.log('handleClick keyup!', xe.ctrl.home.testData);
        },
        handleTouch = function() {
            alert('cant touch this!');
        },
        printRadioData = function() {
            console.log('radioData', xe.ctrl.home.radioData);
        };

    xe.ctrl.subscribe('user logged in', function(data){
        console.log('subscribed!', data);
    });

    return {
        testData: testData,
        testBool: testBool,
        radioData: radioData,
        cssObject: cssObject,
        handleClick: handleClick,
        handleKeyup: handleKeyup,
        handleTouch: handleTouch,
        printRadioData: printRadioData
    };
})();

xe.ctrl.user = (function(){
    var testData = 'test2';

    var login = function() {
            console.log('login clicked!');
            xe.ctrl.user.publish('user logged in', {someData: 'testing'});
        },
        logout = function() {
            console.log('logout clicked!');
        },
        handleBlur = function() {
            console.log('blurred!');
        },
        handleFocus = function() {
            console.log('focused!');
        };

    return {
        testData: testData,
        login: login,
        logout: logout,
        handleBlur: handleBlur,
        handleFocus: handleFocus
    };
})();
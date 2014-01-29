xe.ctrl.home = (function() {
    var _testData = 'test',
        _testBool = true,
        _cssObject = {
            background: '#fff',
            color: '#888'
        },
        _radioData = 'yes';

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

    xe.ctrl.subscribe('user logged in', function(data) {
        console.log('ctrl.home subscribed!', data);
    });

    return {
        testData: _testData,
        testBool: _testBool,
        radioData: _radioData,
        cssObject: _cssObject,
        handleClick: handleClick,
        handleKeyup: handleKeyup,
        handleTouch: handleTouch,
        printRadioData: printRadioData
    };
})();

xe.ctrl.user = (function() {
    var _testData = 'test2';

    var login = function() {
            console.log('login clicked!');
            xe.ctrl.user.publish('user logged in', { someData: 'testing' });
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

    xe.ctrl.subscribe('user logged in', function(data) {
        console.log('ctrl.user subscribed!', data);
    });

    return {
        testData: _testData,
        login: login,
        logout: logout,
        handleBlur: handleBlur,
        handleFocus: handleFocus
    };
})();
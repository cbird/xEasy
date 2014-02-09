xe.ctrl.home = function(home) {
    home.testData = 'test';
    home.testBool = true;
    home.cssObject = {
        background: '#fff',
        color: '#888'
    };
    home.radioData = 'yes';

    home.handleClick = function() {
        console.log('handleClick clicked!', home.testData);
    };
    home.handleKeyup = function() {
        console.log('handleClick keyup!', home.testData);
    };
    home.handleTouch = function() {
        alert('cant touch this!');
    };
    home.printRadioData = function() {
        console.log('radioData', home.radioData);
    };

    home.$subscribe('user logged in', function(data) {
        console.log('ctrl.home subscribed!', data);
    });
};

xe.ctrl.user = function(user) {
    user.testData = 'test2';

    user.login = function() {
        console.log('login clicked!');
        user.$publish('user logged in', { someData: 'testing' });
    };
    user.logout = function() {
        console.log('logout clicked!');
    };
    user.handleBlur = function() {
        console.log('blurred!');
    };
    user.handleFocus = function() {
        console.log('focused!');
    };

    user.$subscribe('user logged in', function(data) {
        console.log('ctrl.user subscribed!', data);
    });
};
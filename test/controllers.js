xe.controllers.home = home = {
    testData: 'from ctrl',
    handleClick: function() {
        console.log('handleClick clicked!', home.testData);
    },
    handleKeyup: function() {
        console.log('handleClick keyup!', home.testData);
    }
};

xe.controllers.user = user = {
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
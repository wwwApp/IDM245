var gameObj = {
    // Global variables are decleared here!
    gScore: 0,
    gTime: "00:00"
};

gameObj.Boot = function (game) {};

gameObj.Boot.prototype = {
    preload: function () {
        console.log("State - Boot");

        // preload minimum of image to get the game booted
        // replace all 'game.' in prototype with 'this.' 
        this.load.image('preloadBg', './img/loading_bg.png');
        this.load.image('preloadBar', './img/loading_bar.png');

    },
    create: function () {

        this.state.start('Preloader');
    }
};

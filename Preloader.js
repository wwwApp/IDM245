gameObj.Preloader = function (game) {};

gameObj.Preloader.prototype = {
    preload: function () {
        console.log("State - Preloader");

        this.stage.backgroundColor = 'black';

        // progress bar animation
        this.preloadBg = this.add.sprite((960 - 300) / 2, (720 - 105) / 2, 'preloadBg');
        this.preloadBar = this.add.sprite((960 - 300) / 2, (720 - 105) / 2, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);



        /* preload for main.html */
        // get rid of all duplicate load - such as play button
        // add webfont
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // add background image
        this.load.image('mainBackground', 'img/bg_intro.png');

        // add buttons
        this.load.spritesheet('playButton', 'img/btn_play_280x65.png', 280, 65);
        this.load.spritesheet('howToButton', 'img/btn_howto_280x65.png', 280, 65);

        // add portal sprite
        // last three parameter: width of cell, height of cell, number of cells to be used
        this.load.spritesheet('mainPortal', 'img/sp_intro_500x500.png', 500, 500);



        /* preload for howto.html */
        // add background image
        this.load.image('howToBackground', 'img/bg_howto.png');



        /* preload for play.html */
        // add background image
        this.load.image('playBackground', 'img/bg_play.png');

        // add game elements
        this.load.image('defender', 'img/img_defender.png');
        this.load.image('invader', 'img/img_invader.png');
        this.load.image('playPortal', 'img/img_portal.png');


        /* preload for win.html */
        // add background image
        this.load.image('winBackground', 'img/bg_win.png');

        // add replay button
        this.load.spritesheet('replayButton', 'img/btn_replay_280x65.png', 280, 65);

        // add win portal
        this.load.image('flash', 'img/img_flash.png');
        this.load.image('winPortal', 'img/img_win_portal.png');



        /* preload for lose.html */
        // add background image
        this.load.image('loseBackground', 'img/bg_lose.png');

        // add replay button
        this.load.spritesheet('tryAgainButton', 'img/btn_tryagain_280x65.png', 280, 65);

        // add lose portal and its parts
        this.load.image('losePortal', 'img/img_lose_portal.png');
        this.load.image('losePortalPart1', 'img/img_lose_portal_part_1.png');
        this.load.image('losePortalPart2', 'img/img_lose_portal_part_2.png');


        /* preload for audio */
        this.load.audio('blip', 'audio/blip.mp3');
        this.load.audio('winSound', 'audio/shooting_star.mp3');
        this.load.audio('loseSound', 'audio/grenade.mp3');


    },
    create: function () {
        this.state.start('Main');
    }
};

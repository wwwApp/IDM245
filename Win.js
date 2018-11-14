gameObj.Win = function (game) {
    var winSoundObj;
    var soundsLoadedFlag; // All sounds loaded flag
};

gameObj.Win.prototype = {
    create: function () {
        console.log('State - Win');

        var spBackground = this.add.sprite(0, 0, 'winBackground');

        var btnReplay = this.add.button(this.world.centerX, 550, 'replayButton', this.actionOnReplay, this, 1, 0, 2);
        btnReplay.anchor.setTo(0.5, 0.5); //offset from x,y ; make your marker exactly centered

        // add shining animation using tween function from phaser
        var spFlash = this.add.sprite(this.world.centerX, 205, 'flash');
        spFlash.anchor.setTo(0.5, 0.5);
        spFlash.alpha = 0.5;
        this.add.tween(spFlash).to({
            alpha: 1
        }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);

        var spWinPortal = this.add.sprite(this.world.centerX, 200, 'winPortal');
        spWinPortal.anchor.setTo(0.5, 0.5);

        // text styles
        var style = {
            fill: 'white',
            font: 'Dosis'
        };

        // add win scren title
        var titleStr = 'DEFENDED';
        var txtTitle = this.add.text(this.world.centerX, 210, titleStr, style);
        txtTitle.anchor.setTo(0.5, 0.5);
        txtTitle.fontSize = 70;
        txtTitle.setShadow(1, 1, '#A633B1', 5);

        // add score
        var scoreTitleStr = 'DEFENSE POINT';
        var txtScoreTitle = this.add.text(290, 380, scoreTitleStr, style);
        txtScoreTitle.fontSize = 20;
        txtScoreTitle.setShadow(1, 1, '#A633B1', 5);

        var scoreStr = 'X' + gameObj.gScore;
        var txtScore = this.add.text(290, 410, scoreStr, style);
        txtScore.fontSize = 50;
        txtScore.setShadow(1, 1, '#A633B1', 5);

        // add timer
        var timerTitleStr = 'TIME LEFT';
        var txtTimerTitle = this.add.text(560, 380, timerTitleStr, style);
        txtTimerTitle.fontSize = 20;
        txtTimerTitle.setShadow(1, 1, '#A633B1', 5);

        var txtTimer = this.add.text(560, 410, gameObj.gTime, style);
        txtTimer.fontSize = 50;
        txtTimer.setShadow(1, 1, '#A633B1', 5);

        // load audio
        winSoundObj = this.add.audio('winSound');
        // mp3 files take time to decode, so check to make sure they are loaded
        soundsLoadedFlag = false;
        this.sound.setDecodedCallback([winSoundObj], this.soundsLoadedFun, this);

        // play audio for win screen
        if (soundsLoadedFlag) {
            winSoundObj.play();
        }

    },
    actionOnReplay: function () {
        this.state.start('Play');
    },
    soundsLoadedFun: function () {
        //console.log('Win screen sound decoded');
        soundsLoadedFlag = true;
    }
};

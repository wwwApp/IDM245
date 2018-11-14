gameObj.Lose = function (game) {
    var loseSoundObj;
    var soundsLoadedFlag; // All sounds loaded flag
};

gameObj.Lose.prototype = {
    create: function () {
        console.log('State - Lose');

        var spBackground = this.add.sprite(0, 0, 'loseBackground');

        var btnTryAgain = this.add.button(this.world.centerX, 550, 'tryAgainButton', this.actionOnTryagain, this, 1, 0, 2);
        btnTryAgain.anchor.setTo(0.5, 0.5); //offset from x,y ; make your marker exactly centered


        // add crushing animation using tween function from phaser
        var spLosePortal = this.add.sprite(this.world.centerX, 200, 'losePortal');
        spLosePortal.anchor.setTo(0.5, 0.5);
        this.add.tween(spLosePortal).to({
            y: 210
        }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        var spLosePortalPart1 = this.add.sprite(550, 220, 'losePortalPart1');
        this.add.tween(spLosePortalPart1).to({
            y: 210
        }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        var spLosePortalPart2 = this.add.sprite(170, 90, 'losePortalPart2');
        this.add.tween(spLosePortalPart2).to({
            x: 160
        }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.add.tween(spLosePortalPart2).to({
            y: 80
        }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        // text styles
        var style = {
            fill: 'white',
            font: 'Dosis'
        };

        // add win scren title
        var titleStr = 'DEFEATED';
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
        loseSoundObj = this.add.audio('loseSound');
        // mp3 files take time to decode, so check to make sure they are loaded
        soundsLoadedFlag = false;
        this.sound.setDecodedCallback([loseSoundObj], this.soundsLoadedFun, this);

        // play audio for lose screen
        if (soundsLoadedFlag) {
            loseSoundObj.play();
        }

    },
    actionOnTryagain: function () {
        this.state.start('Play');
    },
    soundsLoadedFun: function () {
        //console.log('Lose screen sound decoded');
        soundsLoadedFlag = true;
    }
};

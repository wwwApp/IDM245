gameObj.Play = function (game) {
    var txtScore;
    var txtTimer;
    var timerObj;
    var timerSec;

    var spDefender;
    var spInvader;
    var spPortal;
    var invaderSpeed;

    var blipObj;
    var soundsLoadedFlag; // All sounds loaded flag

    var portalDefeated; // flag for portal + invader collision
};

gameObj.Play.prototype = {
    create: function () {
        console.log('State - Play');

        // initial definition of portalDefeated
        portalDefeated = false;

        var spBackground = this.add.sprite(0, 0, 'playBackground');

        spPortal = this.add.sprite(170, 190, 'playPortal');
        spDefender = this.add.sprite(560, 400, 'defender');
        spInvader = this.add.sprite(700, 560, 'invader');

        this.add.tween(spPortal).to({
            y: 180
        }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        // text styles
        var style = {
            fill: 'white',
            font: 'Dosis'
        };

        // add score
        var scoreTitleStr = 'DEFENSE POINT';
        var txtScoreTitle = this.add.text(20, 20, scoreTitleStr, style);
        txtScoreTitle.fontSize = 25;
        txtScoreTitle.setShadow(1, 1, '#A633B1', 5);

        gameObj.gScore = 0;
        var scoreStr = 'X0';
        txtScore = this.add.text(20, 50, scoreStr, style);
        txtScore.fontSize = 50;
        txtScore.setShadow(1, 1, '#A633B1', 5);

        // add timer
        var timerStr = '02:00';
        txtTimer = this.add.text(830, 10, timerStr, style);
        txtTimer.fontSize = 50;
        txtTimer.setShadow(1, 1, '#A633B1', 5);


        // initiate the count down
        timerSec = 120;
        timerObj = this.game.time.create(false);
        timerObj.loop(1000, this.updateTimerFun, this);
        timerObj.start();

        // setup for defener/invade movement and collision
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable([spDefender, spInvader, spPortal], Phaser.Physics.ARCADE);

        spDefender.body.immovable = true;
        invaderSpeed = 375;
        spInvader.body.velocity.setTo(invaderSpeed, invaderSpeed);
        spInvader.body.collideWorldBounds = true;
        spInvader.body.bounce.set(1, 1);

        // setup for collision with portal
        spPortal.body.immovable = true;
        // set body size of collision for portal object
        spPortal.body.setSize(50, 50, 50, 50);

        // load audio
        blipObj = this.add.audio('blip');
        // mp3 files take time to decode, so check to make sure they are loaded
        soundsLoadedFlag = false;
        this.sound.setDecodedCallback([blipObj], this.soundsLoadedFun, this);

    },
    winnerFun: function () {
        console.log('Winner Fun called');
        this.state.start('Win');
    },
    loserFun: function () {
        console.log('Loser Fun called');
        this.state.start('Lose');
    },
    pointFun: function () {
        gameObj.gScore += 10;
        txtScore.text = 'X' + gameObj.gScore;

        // play collision sound effect
        if (soundsLoadedFlag) {
            blipObj.play();
        }
    },
    updateTimerFun: function () {
        timerSec--;
        if (timerSec >= 0) {
            var displayMin = Math.floor(timerSec / 60);
            if (displayMin < 10) {
                displayMin = '0' + displayMin;
            }

            var displaySec = timerSec % 60;
            if (displaySec < 10) {
                displaySec = '0' + displaySec;
            }
            gameObj.gTime = displayMin + ':' + displaySec;
            txtTimer.text = gameObj.gTime;

            if (timerSec == 60) {
                // if timer hits '01:00', the speed of invader will increase
                console.log('Invader speed increased');
                invaderSpeed = 500;
                spInvader.body.velocity.setTo(invaderSpeed, invaderSpeed);
            }
        } else {
            this.winnerFun();
        }
    },
    collisionDetected: function () {
        console.log('Collision detected');
        this.loserFun();
    },
    soundsLoadedFun: function () {
        //console.log('Collision sound decoded');
        soundsLoadedFlag = true;
    },
    update: function () {
        // increase points when defender collides with invader
        this.physics.arcade.collide(spDefender, spInvader, this.pointFun);

        // go to lose screen when invader hits portal
        this.physics.arcade.collide(spPortal, spInvader, function () {
            // flag that collision has detected and portal has been defeated
            portalDefeated = true;
            //console.log('Portal Defeated: ' + portalDefeated);
        });

        if (portalDefeated) {
            this.state.start('Lose');
        }

        // defender movement mapped to arrow keys
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            spDefender.x -= 5.5;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            spDefender.x += 5.5;
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            spDefender.y -= 5.5;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            spDefender.y += 5.5;
        }
    },
    render: function () {
        //debug helper
        //this.debug.spriteInfo(spInvader, 32, 32);
    }
};

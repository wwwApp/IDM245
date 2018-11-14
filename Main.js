gameObj.Main = function (game) {};

gameObj.Main.prototype = {
    create: function () {
        console.log('State - Main');

        var spBackground = this.add.sprite(0, 0, 'mainBackground');

        var btnPlay = this.add.button(this.world.centerX, 565, 'playButton', this.actionOnPlay, this, 1, 0, 2);
        btnPlay.anchor.setTo(0.5, 0.5); //offset from x,y ; make your marker exactly centered

        var btnHowTo = this.add.button(this.world.centerX, 495, 'howToButton', this.actionOnHowto, this, 1, 0, 2);
        btnHowTo.anchor.setTo(0.5, 0.5);

        var spPortal = this.add.sprite(this.world.centerX, 225, 'mainPortal');
        spPortal.anchor.setTo(0.5, 0.5);

        this.add.tween(spPortal).to({
            y: 240
        }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        // add game title
        var titleStr = 'HEXAGON\nDEFENSE';
        var txtTitle = this.add.text(this.world.centerX, 245, titleStr);
        txtTitle.anchor.setTo(0.5, 0.5);
        txtTitle.fill = 'white';
        txtTitle.align = 'center';
        txtTitle.fontSize = 75;
        txtTitle.font = 'Dosis';
        txtTitle.setShadow(1, 1, '#A633B1', 5);

    },
    actionOnPlay: function () {
        this.state.start('Play');
    },
    actionOnHowto: function () {
        this.state.start('HowTo');
    }
};

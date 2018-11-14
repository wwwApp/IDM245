gameObj.HowTo = function (game) {};

gameObj.HowTo.prototype = {
    create: function () {
        console.log('State - HowTo');

        var spBackground = this.add.sprite(0, 0, 'howToBackground');

        var btnPlay = this.add.button(this.world.centerX, 620, 'playButton', this.actionOnPlay, this, 1, 0, 2);
        btnPlay.anchor.setTo(0.5, 0.5); //offset from x,y ; make your marker exactly centered

        // add screen title
        var titleStr = 'HOW TO';
        var txtTitle = this.add.text(this.world.centerX, 105, titleStr);
        txtTitle.anchor.setTo(0.5, 0.5);
        txtTitle.fill = 'white';
        txtTitle.align = 'center';
        txtTitle.fontSize = 40;
        txtTitle.font = 'Dosis';
        txtTitle.setShadow(1, 1, '#A633B1', 5);

    },
    actionOnPlay: function () {
        this.state.start('Play');
    }
};


var GamePage =function (game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.UI = this.game.UI;
    this.viewer = this.game.viewer;
    this.name = 'game';
}

GamePage.prototype.show = function () {
    var is_from_wn = this.model.is_from_wn;
    var firstBlood = this.model.firstBlood;

    if (!is_from_wn && !this.game.guider) {
        // this.UI.observe.visible = true
        if (firstBlood) {
            this.viewer.lookers.showLookers({
                avaImg: false,
                icon: true,
                wording: true
            });
        } else {
            this.viewer.open();
        }
    }

    this.UI.showScore();

    this.UI.scoreText.obj.position.y = 21;
    this.UI.scoreText.obj.position.x = -13;
    this.UI.scoreText.changeStyle({ textAlign: 'left' });
}
GamePage.prototype.hide = function () {
    this.viewer.close();
    // this.UI.observe.visible = false
    this.UI.hideScore();
}
GamePage.prototype.hideLookersShare = function () {
    var firstBlood = this.model.firstBlood;
    if (firstBlood) {
        this.model.setFirstBlood(false);
        this.viewer.open();
    }
}
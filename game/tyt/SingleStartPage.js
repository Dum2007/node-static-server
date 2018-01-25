var SingleStartPage = function (game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.name = 'startPage';
}
SingleStartPage.prototype.show = function () {
    var _this = this;

    if (!this.full2D) {
        this.game.handleWxOnError({
            message: 'can not find full 2D',
            stack: ''
        });
    }
    setTimeout(function () {
        if (_this.full2D) {
            _this.full2D.showStartPage();
        } else {
            // wx.exitMiniProgram()
        }
    }, 0);
}

SingleStartPage.prototype.hide = function () {
    this.full2D.hide2D();
}

// var GroupPage = require('./GroupPage');

var GroupShareCtrl = function (game, modeCtrl) {
    this.name = 'groupShare';
    this.game = game;
    this.gameCtrl = this.game.gameCtrl;
    this.model = this.game.gameModel;
    this.view = this.game.gameView;
    this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
    this.modeCtrl = modeCtrl;
    this.groupPage = new GroupPage(game);

    this.shareTicket = '';
    this.shareInfoTimeout = null;
}

GroupShareCtrl.init = function () {

}
GroupShareCtrl.afterLogin = function () {

}
GroupShareCtrl.setShareInfoTimeout = function () {

}
GroupShareCtrl.clearShareInfoTimeout = function () {

}
GroupShareCtrl.handleShareInfoTimeout = function () {

}
GroupShareCtrl.goToGroupShareFail = function () {

}
GroupShareCtrl.showGroupRankPage = function () {

}
GroupShareCtrl.destroy = function () {

}
GroupShareCtrl.groupPlayGame = function () {

}
GroupShareCtrl.wxOnhide = function () {

}
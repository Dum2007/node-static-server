// var WaitingPage = require('./WaitingPage');
// var GgPage = require('./GgPage');
// var OutPage = require('./OutPage');

var ObserveCtrl = function (game, modeCtrl) {
    this.game = game;
    this.name = 'observe';
    this.gameCtrl = this.game.gameCtrl;
    this.model = this.game.gameModel;
    this.view = this.game.gameView;
    this.modeCtrl = modeCtrl;
    this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
    this.gameSocket = this.game.gameSocket;
    this.currentPage = null;

    this.waitingPage = new WaitingPage(game);
    this.ggPage = new GgPage(game);
    this.outPage = new OutPage(game);

    this.gameId = '';
    this.longTimeout = null;
}

ObserveCtrl.init = function () {

}

ObserveCtrl.afterLogin = function (success) {

}
ObserveCtrl.socketJoinSuccess = function (success) {

}
ObserveCtrl.goToObserveStateFail = function () {

}
ObserveCtrl.setLongTimeHandle = function () {

}
ObserveCtrl.handleLongTime = function () {

}
ObserveCtrl.clearLongTimeHandle = function () {

}
ObserveCtrl.showPlayerDead = function () {

}
ObserveCtrl.checkPlayerState = function () {

}
ObserveCtrl.judgePlayerState = function () {

}
ObserveCtrl.handleSyncopErr = function () {

}
ObserveCtrl.clearCheckPlayerTimeout = function () {

}
ObserveCtrl.destroy = function () {

}
ObserveCtrl.showPlayerWaiting = function () {

}
ObserveCtrl.showPlayerGG = function () {

}
ObserveCtrl.onPlayerOut = function () {

}
ObserveCtrl.onViewerStart = function () {

}
ObserveCtrl.showGameOverPage = function () {

}
ObserveCtrl.wxOnhide = function () {

}
ObserveCtrl.wxOnshow = function () {

}

// exports.ObserveCtrl = ObserveCtrl;
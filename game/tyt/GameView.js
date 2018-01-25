var GameView = function (game) {
    this.game = game;
}

GameView.prototype.init = function () {

}

GameView.prototype.showIdentifyModeErr = function (wording) {
    this.showModal(wording);
}

GameView.prototype.showNoSession = function () {
    this.showModal();
}

GameView.prototype.showGetPkIdFail = function () {
    this.showModal();
}
GameView.prototype.showGroupShareFail = function () {
    var wording = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '网络异常,点击确定回到游戏';

    this.showModal(wording);
}
GameView.prototype.showGoToBattleFail = function () {
    this.showModal();
}
GameView.prototype.showUploadPkScoreFail = function () {
    this.showModal('数据上传失败');
}
GameView.prototype.showShareObserveCardFail = function (res) {
    this.showModal(res);
}
GameView.prototype.showObserveStateFail = function () {
    this.showModal('服务器异常');
}
GameView.prototype.showModal = function () {
    var wording = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '网络异常,点击确定回到游戏';
}
GameView.prototype.showServeConfigForbiddenObserveMode = function () {
    this.showModal('当前围观人数过多，请稍后再试');
}
GameView.prototype.showServeConfigForbiddenGroupShare = function () {
    this.showModal('查看群排行人数过多，请稍后再试');
}
GameView.prototype.showSocketCloseErr = function () {

}
GameView.prototype.showSyncopErr = function () {

}




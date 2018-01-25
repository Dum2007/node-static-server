
// var _network = require('./Network')

var SERVERCONFIG = 60000;

var NetworkCtrl = function (game) {
    this.game = game;
    this.gameCtrl = game.gameCtrl;
    this.model = game.gameModel;
    this.loginCb = null;

    // 服务器拉取配置的定时器
    this.serverConfigInterval = null;

    this.historyTimes = this.game.historyTimes;
}

NetworkCtrl.prototype.netWorkLogin = function (cb) {
    if (cb) {
        this.loginCb = cb;
    }

    Network.requestLogin(this.afterRequestLogin.bind(this));
}

NetworkCtrl.prototype.afterRequestLogin = function (success) {

}

NetworkCtrl.prototype.requestServerInit = function () {
    
}

NetworkCtrl.prototype.clearServerInit = function () {
    
}

NetworkCtrl.prototype.upDateFriendsScoreList = function () {
    
}

NetworkCtrl.prototype.updateFriendsScore = function (res, data) {
    
}

NetworkCtrl.prototype.updateFriendsScore2 = function () {
    
}

NetworkCtrl.prototype.uploadScore = function () {

}
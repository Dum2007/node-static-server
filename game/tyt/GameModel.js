// var Session = require('./Session');

var GameModel = function (game) {
    this.game = game;
    this.mode = '';
    this.stage = '';
    this.is_from_wn = 0;
    this.firstBlood = false;
    this.currentScore = 0;
    this.highestScore = 0;
    this.observeInfo = {};
    this.friendsScore = [];
    this.weekBestScore = 0;
    this.startTime = Math.floor(Date.now() / 1000);
}
GameModel.prototype.setMode = function (mode) {
    this.mode = mode;
    this.game.mode = mode;
}
GameModel.prototype.setStage = function (stage) {
    this.stage = stage;
    this.game.stage = stage;
}
GameModel.prototype.init = function () {
    Session.init();

    var fb = MStorage.getFirstBlood();
    if (!fb) {
        this.setFirstBlood(true);
        MStorage.saveFirstBlood();
    }

    this.highestScore = MStorage.getHeighestScore() || 0;
    Session.setServerConfig(MStorage.getServerConfig());

    this.weekBestScore = MStorage.getWeekBestScore() || 0;
    this.friendsScore = MStorage.getFriendsScore();
}
GameModel.prototype.getServerConfig = function () {
    return Session.serverConfig;
}
GameModel.prototype.setIsFromWn = function (number) {
    this.is_from_wn = number;
    this.game.is_from_wn = number;
}
GameModel.prototype.setFirstBlood = function (bool) {
    this.firstBlood = bool;
    this.game.firstBlood = bool;
}
GameModel.prototype.getMode = function () {
    return this.mode;
}
GameModel.prototype.setScore = function (score) {
    this.currentScore = score;
}
GameModel.prototype.saveHeighestScore = function (score) {
    var verifyData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (verifyData) {
        var expire = this.getNextSunday();
        var vData = {
            ts: expire,
            data: verifyData
        };
    } else {
        var vData = '';
    }

    MStorage.saveHeighestScore(score);
    MStorage.saveActionData(vData);
    this.highestScore = score;
}
GameModel.prototype.saveWeekBestScore = function () {
    var score = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var data = {
        ts: this.getNextSunday(),
        data: score
    };
    MStorage.saveWeekBestScore(data);
}
GameModel.prototype.getActionData = function () {
    return Session.getActionData();
}
GameModel.prototype.getHighestScore = function () {
    return this.highestScore;
}
GameModel.prototype.saveFriendsScore = function (data) {
    this.friendsScore = data;
    var formatData = {
        ts: this.getNextSunday(),
        data: data
    };
    Session.saveFriendsScore(formatData);
}
GameModel.prototype.getSessionId = function () {
    return Session.sessionId;
}
GameModel.prototype.getPkId = function () {
    return Session.pkId;
}
GameModel.prototype.clearPkId = function () {
    Session.clearPkId();
}
GameModel.prototype.setShareTicket = function (rawData) {
    Session.setShareTicket(rawData);
}
GameModel.prototype.getShareTicket = function () {
    return Session.shareTicket;
}
GameModel.prototype.clearShareTicket = function () {
    Session.clearShareTicket();
}
GameModel.prototype.setGameId = function () {
    Session.setGameId(id);
}
GameModel.prototype.setGameTicket = function (ticket) {
    Session.setGameTicket(ticket);
}

GameModel.prototype.clearGameId = function () {
    Session.clearGameId();
}
GameModel.prototype.clearGameTicket = function () {
    Session.clearGameTicket();
}
GameModel.prototype.setObserveInfo = function (opt) {
    this.observeInfo.headimg = opt.headimg;
    this.observeInfo.nickName = opt.nickName;
}
GameModel.prototype.clearObserveInfo = function () {
    this.observeInfo.headimg = null;
    this.observeInfo.nickName = null;
}
GameModel.prototype.getNextSunday = function () {
    var now = new Date();
    var day = now.getDay();
    now.setHours(0, 0, 0, 0);
    var expire = now.valueOf() + (8 - day) % 7 * 24 * 60 * 60 * 1000;
    return expire;
}

// exports.GameModel = GameModel;
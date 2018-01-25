
var networkConfig = {
    // AJAX_URL: 'https://wxardm.weixin.qq.com',
    AJAX_URL: 'https://mp.weixin.qq.com'
};

var MNetwork = function () {

}

MNetwork.prototype.onServerConfigForbid = function (cb) {
    this.emmitServerConfigForbid = cb;
}

MNetwork.prototype.getUserInfo = function () {

}

MNetwork.prototype.requestLogin = function (afterLoginProcess) {
    afterLoginProcess(true);
}

MNetwork.prototype.requestFriendsScore = function () {
    
}
MNetwork.prototype.requestSettlement = function () {
    
}

MNetwork.prototype.requestCreateGame = function () {
    
}

MNetwork.prototype.reGetSessionId = function () {
    
}

MNetwork.prototype.requestInit = function () {
    
}

MNetwork.prototype.requestServerInit = function () {
    
}

MNetwork.prototype.getGroupScore = function () {
    
}

MNetwork.prototype.createPK = function () {
    
}

MNetwork.prototype.getBattleData = function () {
    
}

MNetwork.prototype.updatepkinfo = function () {
    
}

MNetwork.prototype.quitGame = function () {
    
}

MNetwork.prototype.syncop = function () {
    
}

MNetwork.prototype.sendReport = function () {
    
}

MNetwork.prototype.badReport = function () {
    
}

MNetwork.prototype.sendServerError = function () {
    
}
var Network = new MNetwork();

var MSession = function () {

}

MSession.prototype.init = function () {
    this.sessionId = '';
    this.gameId = '';
    this.gameTicket = '';
    this.serverConfig = '';
    this.shareTicket = '';
    this.pkId = '';
    this.serverConfig = '';
}

MSession.prototype.setLoginState = function (sessionId) {
    this.sessionId = sessionId;
}

MSession.prototype.setGameId = function (gameId) {
    this.gameId = gameId;
}
MSession.prototype.setGameTicket = function (gameTicket) {
    this.gameTicket = gameTicket;
}
MSession.prototype.setServerConfig = function (config) {
    this.serverConfig = config;
}
MSession.prototype.setShareTicket = function (ticket) {
    this.shareTicket = ticket;
}
MSession.prototype.setPkId = function (id) {
    this.pkId = id;
}
MSession.prototype.clearPkId = function () {
    this.pkId = '';
}
MSession.prototype.clearGameId = function () {
    this.gameId = '';
}
MSession.prototype.clearShareTicket = function () {
    this.ShareTicket = '';
}
MSession.prototype.clearGameTicket = function () {
    this.gameTicket = '';
}
MSession.prototype.setServerConfig = function (config) {
    this.serverConfig = config;
}
var Session = new MSession();
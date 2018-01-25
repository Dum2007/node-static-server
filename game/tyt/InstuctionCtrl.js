var InstuctionCtrl = function (game) {
    this.game = game;
    this.commandList = [];

    this.isRunning = false;
    this.icTimeout = null;
    this.cmdHandler = function () {
        // console.log('InstuctionCtrl receive No handler')
    };

    this.gameId = 0;

    this.seq = 0;
}
InstuctionCtrl.prototype.onReceiveCommand = function (data, seq) {
    // console.log('seq', seq)
    if (this.gameId != this.game.gameCtrl.modeCtrl.observeCtrl.gameId) {
        // console.log('矫正gameId')
        this.gameId = this.game.gameCtrl.modeCtrl.observeCtrl.gameId;
        this.seq = seq - 1;
    }

    // 正常情况下 deltaNum = 1
    var deltaNum = seq - this.seq;

    if (deltaNum != 1) {
        var word;
        if (deltaNum > 1) {
            // 掉帧
            word = 0;
        }
        if (deltaNum < 1) {
            // 帧乱
            word = 1;
        }
        this.game.sendServerError(word);
        this.game.socketFirstSync = true;
    }

    this.seq = seq;
    this.commandList.push(data);
    this.checkRunningState();
}
InstuctionCtrl.prototype.checkRunningState = function () {
    if (!this.isRunning) {
        this.runCommand();
    }
}
InstuctionCtrl.prototype.runCommand = function () {
    var cmd = this.commandList.pop();
    // 这个地方一定要在cmdHandler前面，否则会引起循环调用的坑
    this.isRunning = true;
    this.cmdHandler(cmd);
}
InstuctionCtrl.prototype.bindCmdHandler = function (func) {
    this.cmdHandler = func;
}
InstuctionCtrl.prototype.onCmdComplete = function () {
    if (this.commandList.length) {
        this.runCommand();
    } else {
        this.isRunning = false;
    }
}
InstuctionCtrl.prototype.destroy = function () {
    this.commandList = [];
    this.gameId = 0;
    this.seq = 0;
    if (this.icTimeout) {
        clearTimeout(this.icTimeout);
    }
    this.icTimeout = null;
    this.isRunning = false;
}
var GameSocket = function (game) {
    this.alive = false;
    this.noErr = false;
    // this.joinGame = false
    this.game = game;

    this.handlers = {};
    this.handleSocketErr = '';
    // 用来清除心跳，防止发送过多心跳
    this.heartBeat = [];

    /**
     * 命令池,数据格式
     * cmdPool = {
     *  'gameId': {
     *    n:当前帧序号
     *    arr:[]序号指令池
     *  }
     * }
     */
    this.cmdPool = {};

    this.heartBeat.push(setTimeout(this.sendHeartBeat.bind(this), 5000));
}
GameSocket.prototype.cleanHeartBeat = function () {
    if (this.heartBeat.length) {
        while (this.heartBeat.length) {
            var heartBeat = this.heartBeat.pop();
            clearTimeout(heartBeat);
        }
    }
}
GameSocket.prototype.handleSocketOpen = function () {
    this.joinGame();
    this.alive = true;
}
GameSocket.prototype.connectSocket = function () {
    var _this2 = this;

    this.alive = true;
}
GameSocket.prototype.addHandler = function (cmd, cb) {
    if (!this.handlers[cmd]) {
        this.handlers[cmd] = [cb];
    } else {
        this.handlers[cmd].push(cb);
    }
}
GameSocket.prototype.sendCommand = function (cmdSequence, data) {
    console.log('----sendCommand-------')
}
GameSocket.prototype.cleanHeartBeat = function (cmdSequence, data) {
    var gameId = _session2.default.gameId;
    var gameTicket = _session2.default.gameTicket;
    if (!gameId || !gameTicket || !cmdSequence) {
        return;
    }
    if (typeof gameId !== 'string') {
        console.warn('Socket send cmd need gameId');
        return;
    }

    var obj = {
        cmd: 102,
        i: gameId,
        n: cmdSequence,
        k: gameTicket,
        o: [JSON.stringify(data)]
        // const obj = {
        //   cmd: 102,
        //   i: gameId,
        //   k: gameTicket,
        //   o: []
        // }
        // console.log('send Message', JSON.stringify(obj))
    };
    // wx.sendSocketMessage({
    //     data: JSON.stringify(obj)
    // });
}
GameSocket.prototype.sendNullCommand = function () {
    var gameId = _session2.default.gameId;
    var gameTicket = _session2.default.gameTicket;
    if (!gameId || !gameTicket) {
        return;
    }
    if (typeof gameId !== 'string') {
        console.warn('Socket send cmd need gameId');
        return;
    }

    var obj = {
        cmd: 102,
        i: gameId,
        k: gameTicket,
        o: []
        // console.log('send heartBeat Message', JSON.stringify(obj))
    };
    // wx.sendSocketMessage({
    //     data: JSON.stringify(obj)
    // });
}
GameSocket.prototype.getCommand = function () {

}
GameSocket.prototype.onPeopleCome = function (cb) {
    this.peopleCome = cb;
}
GameSocket.prototype.onReciveCommand = function (cb) {
    this.observerMessage = cb;
}
GameSocket.prototype.onJoinSuccess = function (cb) {
    this.joinSuccess = cb;
}
GameSocket.prototype.onPlayerOut = function (cb) {
    this.playerOutHandler = cb;
}
GameSocket.prototype.receiveCommand = function (cb) {

}
GameSocket.prototype.onPlayerOut = function (res) {
    if (typeof this.observerMessage !== 'function') {
        return;
    }
    if (!res.o) {
        return;
    }
    if (!res.o[0]) {
        return;
    }
    if (!res.o[0].o) {
        return;
    }
    this.observerMessage(res.n, JSON.parse(res.o[0].o));
    return;
}
GameSocket.prototype.handlePeopleCome = function (res) {
    if (typeof this.peopleCome !== 'function') {
        return;
    }
    this.peopleCome(res);
    return;
}
GameSocket.prototype.receiveACK = function (cb) {

}
GameSocket.prototype.joinGame = function () {
    var gameId = Session.gameId;
    if (!Session.default.sessionId || !gameId) {
        // console.log('Socket join game fail')
        // this.handleConnectSocketFail()
        return;
    }
    var obj = {
        cmd: 101,
        game_id: gameId,
        fast: 1,
        session_id: Session.default.sessionId
    };

    // wx.sendSocketMessage({
    //     data: JSON.stringify(obj)
    // });
}
GameSocket.prototype.handleACK = function (data) {
    if (this.handlers['ack']) {
        this.handlers['ack'].forEach(function (cb) {
            cb(data);
        });
    }
}
GameSocket.prototype.handleJoinGame = function (data) {
    if (this.game.mode == 'observe') {
        switch (data.ret) {
            // 成功
            case 0:
                this.joinSuccess(true);
                break;
            // 不活跃
            case 2:
                this.joinSuccess(true);
                break;
            default:
                this.joinSuccess(false);
                break;
        }
    } else {
        if (data.ret != 0) {
            this.joinSuccess(false);
        } else {
            this.joinSuccess(true);
        }
    }
}
GameSocket.prototype.sendHeartBeat = function () {
    if (this.game.mode == 'player') {
        this.sendNullCommand();
    } else {

        var obj = {
            cmd: 104
        };
        // wx.sendSocketMessage({
        //     data: JSON.stringify(obj)
        // });
    }
}
GameSocket.prototype.quitObserve = function () {
    if (!this.alive) {
        return;
    }
    // console.log('quitObservequitObserve')
    var obj = {
        cmd: 109,
        fast: 1,
        game_id: Session.default.gameId,
        session_id: Session.default.sessionId
        // console.log(obj)
    };
    // wx.sendSocketMessage({
    //     data: JSON.stringify(obj)
    // });
}
GameSocket.prototype.close = function () {
    var _this3 = this;

    if (!this.alive) {
        return;
    }

    this.alive = false;
    this.noErr = true;
    // console.log('emmit close')
    // wx.closeSocket();

    Session.clearShareTicket();
    Session.clearGameId();

    setTimeout(function () {
        _this3.reset();
    }, 1000);
}
GameSocket.prototype.onSocketErr = function (cb) {
    this.handleSocketErr = cb;
}
GameSocket.prototype.reset = function () {
    this.alive = false;
    this.noErr = false;
}
GameSocket.prototype.handlePlayerOut = function () {
    if (typeof this.playerOutHandler == 'function') {
        this.playerOutHandler();
    }
}

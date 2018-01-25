// var SingleStartPage = require('./SingleStartPage');
// var GamePage = require('./GamePage');
// var SingleGameOverPage = require('./SingleGameOverPage');
// var SingleFriendRankPage = require('./SingleFriendRankPage');

// var Network = require('./Network')

var SingleCtrl = function (game, modeCtrl) {
    this.name = 'single';
    this.game = game;
    this.gameCtrl = this.game.gameCtrl;
    this.model = this.game.gameModel;
    this.view = this.game.gameView;
    this.modeCtrl = modeCtrl;
    this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
    this.gameSocket = this.game.gameSocket;

    this.startPage = new SingleStartPage(game);
    this.gamePage = new GamePage(game);
    this.gameOverPage = new SingleGameOverPage(game);
    this.friendRankPage = new SingleFriendRankPage(game);
    this.currentPage = null;
    this.lastPage = null;

    this.socketTimeout = null;
}

SingleCtrl.prototype.init = function (options) {
    this.startPage.show();
    this.model.setStage(this.startPage.name);
    this.currentPage = this.startPage;
}

SingleCtrl.prototype.clickStart = function () {
    this.hideCurrentPage();
    this.gamePage.show();
    this.game.replayGame();
    this.model.setStage(this.gamePage.name);
    this.currentPage = this.gamePage;
}

SingleCtrl.prototype.showGameOverPage = function () {
    this.hideCurrentPage();
    this.gameOverPage.show();

    // 清空上次留存的pkId
    this.model.clearPkId();
    this.model.setStage(this.gameOverPage.name);
    this.currentPage = this.gameOverPage;
}

SingleCtrl.prototype.gameOverClickReplay = function () {
    this.clickStart();
}

SingleCtrl.prototype.showFriendRank = function () {
    this.lastPage = this.currentPage;
    this.hideCurrentPage();
    this.friendRankPage.show();
    this.model.setStage(this.friendRankPage.name);
    this.currentPage = this.friendRankPage;
}

SingleCtrl.prototype.friendRankReturn = function () {
    this.hideCurrentPage();
    this.lastPage.show();

    this.model.setStage(this.lastPage.name);
    this.currentPage = this.lastPage;
}

SingleCtrl.prototype.shareGroupRank = function () {
    var _this = this;

    // (0, _shareApp.shareGroupRank)(function (success, isGroup) {
    //     _this.gameCtrl.afterShareGroupRank(success, isGroup);
    // });
}

SingleCtrl.prototype.clickRank = function () {
    this.showFriendRank();
}

SingleCtrl.prototype.shareBattleCard = function () {
    var _this2 = this;

    var sessionId = this.model.getSessionId();
    var currentScore = this.model.currentScore;
    var pkId = this.model.getPkId();
    if (!sessionId) {
        this.view.showNoSession();
        return;
    }

    if (!pkId) {
        Network.createPK(currentScore).then(function () {
            _this2.afterHavePkId();
        }, function () {
            _this2.getPKErr();
        }).catch(function (err) {
            return console.log(err);
        });
    } else {
        this.afterHavePkId();
    }
}

SingleCtrl.prototype.afterHavePkId = function () {
    var _this3 = this;

    var pkId = this.model.getPkId();
    var score = this.model.currentScore;

    // (0, _shareApp.shareBattle)(pkId, score, function (success, isGroup) {
    //     _this3.gameCtrl.afterShareBattle(success, isGroup);
    // });
}

SingleCtrl.prototype.getPKErr = function () {
    this.view.showGetPkIdFail();
}

SingleCtrl.shareObservCard = function () {
    this.gamePage.hideLookersShare();
    this.model.setStage('loading');
    // wx.showLoading();
    var sessionId = this.model.getSessionId();
    if (!sessionId) {
        this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
    } else {
        this.afterLogin(true);
    }
}

SingleCtrl.prototype.afterLogin = function () {
    var _this4 = this;

    if (success) {
        // 连接socket和请求gameId
        Network.requestCreateGame(function (success, res) {
            if (success) {
                _this4.model.setGameId(res.data.game_id);
                _this4.model.setGameTicket(res.data.up_op_ticket);
                _this4.shareObservCardA();
            } else {
                _this4.shareObservCardFail(res);
            }
        });
    } else {
        this.shareObservCardFail();
    }
}

SingleCtrl.prototype.shareObservCardFail = function (res) {
    // 提示wording弹窗
    this.view.showShareObserveCardFail(res);

    // 清理gameId，gameTicket
    this.model.clearGameId();
    this.model.clearGameTicket();

    // 切回stage loading -> game
    if (this.model.stage == 'loading') {
        this.model.setStage('game');
    }

    // 清除定时器
    this.clearSocketTimeout();

    // 关闭socket 回到游戏页面
    this.gameSocket.close();

    // 清除wx.showloading
    // wx.hideLoading();
}

SingleCtrl.prototype.shareObservCardA = function () {
    this.socketTimeout = setTimeout(this.shareObservCardFail.bind(this), 5000);

    /**
     * 连接网络
     * socket连接上自动joingame，中间出错，直接调用分享失败,关闭socket
     */
    this.gameSocket.connectSocket();
}

SingleCtrl.prototype.socketJoinSuccess = function () {
    // wx.hideLoading();
    if (success) {

        // 取消定时器
        this.clearSocketTimeout();
        this.shareObservCardB();
    } else {
        this.shareObservCardFail();
    }
}

SingleCtrl.prototype.shareObservCardB = function () {
    var _this5 = this;

    (0, _shareApp.shareObserve)(function (success, num) {
        if (!!success) {
            _this5.gameCtrl.afterShareObserveCard(num);
        }
        setTimeout(function () {
            // console.log('!!!!!shareObservCardB,stage', this.model.stage)
            if (_this5.model.stage == 'loading') {
                _this5.model.setStage('game');
            }
            _this5.modeCtrl.singleChangeToPlayer();
            _this5.currentPage = null;
        }, 50);
    });
}

SingleCtrl.prototype.clearSocketTimeout = function () {
    if (this.socketTimeout != null) {
        clearTimeout(this.socketTimeout);
        this.socketTimeout = null;
    }
}

SingleCtrl.prototype.wxOnhide = function () {

}

SingleCtrl.prototype.wxOnshow = function () {

}

SingleCtrl.prototype.destroy = function () {
    this.hideCurrentPage();
    this.currentPage = null;
    this.model.setStage('');
    // 清理gameId，gameTicket
    this.model.clearGameId();
    this.model.clearGameTicket();

    // 清除定时器
    this.clearSocketTimeout();

    this.game.resetScene();
}

SingleCtrl.prototype.hideCurrentPage = function () {
    if (this.currentPage) {
        this.currentPage.hide();
    }
}
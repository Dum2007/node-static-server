
// var QueryCtrl = require('./QueryCtrl');
// var NetworkCtrl = require('./NetworkCtrl');
// var ModeCtrl = require('./ModeCtrl');

var GameCtrl = function (game) {
    this.game = game;
}

GameCtrl.prototype.init = function() {
    this.gameView = this.game.gameView;
    this.queryCtrl = new QueryCtrl(this.game);
    this.netWorkCtrl = new NetworkCtrl(this.game);
    this.modeCtrl = new ModeCtrl(this.game);
    this.model = this.game.gameModel;

    this.reporter = this.game.reporter;
    this.historyTimes = this.game.historyTimes;
    this.viewer = this.game.viewer;
}
GameCtrl.prototype.firstInitGame = function (options) {
    this.queryCtrl.identifyMode(options);
    this.modeCtrl.initFirstPage(options);
}
GameCtrl.prototype.identifyModeErr = function (wording) {
    this.gameView.showIdentifyModeErr(wording);
}
GameCtrl.prototype.onLoginSuccess = function () {
    this.reporter.setTimer(Config.REPORTERTIMEOUT);
}
GameCtrl.prototype.clickStart = function () {
    this.modeCtrl.clickStart();
}
GameCtrl.prototype.showFriendRank = function () {
    this.modeCtrl.showFriendRank();
}
GameCtrl.prototype.clickRank = function () {
    this.modeCtrl.clickRank();
}
GameCtrl.prototype.gameOver = function (score) {
    this.model.setScore(score);
    if (this.model.mode != 'observe') {
        var highestScore = this.model.getHighestScore();
        var weekBestScore = this.model.weekBestScore;

        // 加一局玩过的次数
        this.historyTimes.addOne();
        var gameTimes = this.historyTimes.getTimes();

        this.reporter.playGameReport(score, highestScore, gameTimes);
        //console.log("wtf", JSON.stringify(this.game.actionList), JSON.stringify(this.game.musicList), this.game.randomSeed,  JSON.stringify(this.game.touchList));
        // !!! 这里因为调用的都是同一个接口，为了节省服务器资源，最高分跟回合次数耦合在一起了
        if (weekBestScore < score) {
            // 如果产生了最高分
            // !!! 这里上传了最高分和历史回合次数
            var verifyData = {
                seed: this.game.randomSeed,
                action: this.game.actionList,
                musicList: this.game.musicList,
                touchList: this.game.touchList,
                version: 1
            };
            this.historyTimes.upLoadHistoryTimes(score, verifyData);
            // this.model.weekBestScore = score
            // if (highestScore < score) {
            //   this.model.saveHeighestScore(score)
            // }
        } else {

            // 检查是否需要上传次数
            this.historyTimes.checkUp();
        }

        // 更新排行榜分数
        this.netWorkCtrl.upDateFriendsScoreList();
    }

    if (this.mode == 'player') {
        this.reporter.playAudienceReport();
    }

    if (this.mode == 'battle') {
        this.reporter.playPKReport(score);
    }
}
GameCtrl.prototype.gameOverShowPage = function () {
    this.modeCtrl.showGameOverPage();
    if (this.model.mode != 'observe') {
        if (this.model.currentScore >= this.model.weekBestScore) {
            this.model.weekBestScore = this.model.currentScore;
            this.model.saveWeekBestScore(this.model.currentScore);
            if (this.model.currentScore > this.model.getHighestScore()) {
                var verifyData = {
                    seed: this.game.randomSeed,
                    action: this.game.actionList
                };
                this.model.saveHeighestScore(this.model.currentScore, verifyData);
            }
        }
    }
}
GameCtrl.prototype.clickReplay = function () {
    this.reporter.playAudienceReportStart();
    this.modeCtrl.gameOverClickReplay();
}
GameCtrl.prototype.friendRankReturn = function () {
    this.modeCtrl.friendRankReturn();
}
GameCtrl.prototype.netWorkLogin = function () {
    this.netWorkCtrl.netWorkLogin();
}
GameCtrl.prototype.shareGroupRank = function () {
    this.modeCtrl.shareGroupRank();
}
GameCtrl.prototype.afterShareGroupRank = function (success, isGroup) {
    this.reporter.shareGroupReport(isGroup);
}
GameCtrl.prototype.shareBattleCard = function () {
    this.modeCtrl.shareBattleCard();
}
GameCtrl.prototype.afterShareBattle = function (success, isGroup) {
    if (success) {
        this.reporter.sharePKReport(isGroup);
    }
}
GameCtrl.prototype.groupPlayGame = function () {
    this.modeCtrl.groupPlayGame();
}
GameCtrl.prototype.loginBattle = function (isGroup) {
    this.reporter.joinPKReport(isGroup);
    this.reporter.playPKReportStart(isGroup);
}
GameCtrl.prototype.showPkPage = function (ownerScore) {
    this.reporter.playPKScore(ownerScore);
}
GameCtrl.prototype.onBattlePlay = function (pk) {
    this.modeCtrl.battlePlay(pk);
}
GameCtrl.prototype.battleToSingle = function () {
    this.reporter.resetPKReport();
}
GameCtrl.prototype.shareObservCard = function () {
    this.modeCtrl.shareObservCard();
}
GameCtrl.prototype.socketJoinSuccess = function (success) {
    this.modeCtrl.socketJoinSuccess(success);
    if (this.model.mode == 'observe') {
        if (success) {
            this.game.socketFirstSync = true;
            this.reporter.joinAudienceReportStart();
        }
    } else {
        this.reporter.joinAudienceReport();
    }

    if (this.model.mode == 'player') {
        this.reporter.playAudienceReportStart();
    }
}
GameCtrl.prototype.afterShareObserveCard = function (isGroup) {
    this.reporter.shareAudienceReport(isGroup);
}
GameCtrl.prototype.showPlayerGG = function (data) {
    this.modeCtrl.showPlayerGG(data);
}
GameCtrl.prototype.showPlayerWaiting = function () {
    this.modeCtrl.showPlayerWaiting();
}
GameCtrl.prototype.onPlayerOut = function () {
    this.modeCtrl.onPlayerOut();
}
GameCtrl.prototype.onViewerStart = function () {
    this.game.audioManager.scale_intro.stop();
    if (this.game.deadTimeout) {
        clearTimeout(this.game.deadTimeout);
        this.game.deadTimeout = null;
    }
    this.game.pendingReset = false;
    // TweenAnimation.killAll();
    this.modeCtrl.onViewerStart();
    this.reporter.joinAudienceReport();
}
GameCtrl.prototype.wxOnShow = function (options) {
    var _this = this;

    this.netWorkCtrl.requestServerInit();
    this.reporter.setTimer(Config.REPORTERTIMEOUT);
    setTimeout(function () {

        // 根据传进来的mode参数判断，如果有mode说明需要更换场景
        if (!!options.query && options.query.hasOwnProperty('mode')) {
            _this.modeCtrl.reInitFirstPage(options);
        } else if (_this.model.mode != 'single' && _this.model.mode != 'player' && _this.model.mode != 'battle') {
            // 进来没有参数onshow，单人，围观，挑战，有可能在分享时候回来
            _this.modeCtrl.changeMode('singleCtrl');
        }
    }, 300);
}
GameCtrl.prototype.wxOnhide = function () {
    this.reporter.quitReport();
    if (this.model.mode == 'observe') {
        this.reporter.joinAudienceReport();
    }

    // 清除定时器，1、服务器下发配置的定时器，2、上报的定时器
    this.netWorkCtrl.clearServerInit();
    this.reporter.clearTimer();

    this.modeCtrl.wxOnhide();
}
GameCtrl.prototype.onReplayGame = function () {
    var mode = this.model.mode;
    if (mode != 'observe') {
        this.reporter.playGameReportStart();
    }
}
GameCtrl.prototype.onPeopleCome = function (data) {
    if (data.audience_cmd == 0) {

        // 来人了
        this.viewer.peopleCome(data);
        this.reporter.playAudienceReportMaxPeople(this.viewer.num);
    } else if (data.audience_cmd == 1) {

        // 人走了
        this.viewer.peopleOut(data);
    }
}
GameCtrl.prototype.onServerConfigForbid = function () {

}
GameCtrl.prototype.onSocketCloseErr = function () {
    this.gameView.showSocketCloseErr();
    this.modeCtrl.changeMode('singleCtrl');
}

// exports.GameCtrl = GameCtrl;




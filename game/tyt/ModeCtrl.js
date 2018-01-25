
// var SingleCtrl = require('./SingleCtrl');
// var GroupShareCtrl = require('./GroupShareCtrl');
// var BattleCtrl = require('./BattleCtrl');
//
// var ObserveCtrl = require('./ObserveCtrl');
// var PlayerCtrl = require('./PlayerCtrl');

var ModeCtrl = function (game) {

    this.game = game;
    this.singleCtrl = new SingleCtrl(game, this);
    this.groupShareCtrl = new GroupShareCtrl(game, this);
    this.battleCtrl = new BattleCtrl(game, this);
    this.observeCtrl = new ObserveCtrl(game, this);
    this.playerCtrl = new PlayerCtrl(game, this);

    this.model = game.gameModel;
    this.gameCtrl = game.gameCtrl;
    this.currentCtrl = null;
    
}

ModeCtrl.prototype.initFirstPage = function (options) {
    var mode = this.model.getMode();
    switch (mode) {
        case 'single':
            this.currentCtrl = this.singleCtrl;
            this.singleCtrl.init(options);
            this.gameCtrl.netWorkLogin();
            break;
        case 'groupShare':
            this.currentCtrl = this.groupShareCtrl;
            this.groupShareCtrl.init(options);
            break;
        case 'battle':
            this.currentCtrl = this.battleCtrl;
            this.battleCtrl.init(options);
            break;
        case 'observe':
            this.currentCtrl = this.observeCtrl;
            this.observeCtrl.init(options);
            break;

        default:
            this.currentCtrl = this.singleCtrl;
            this.model.setMode('single');
            this.singleCtrl.init(options);
            this.gameCtrl.netWorkLogin();
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            // console.log('InitFirstPage 找不到对应mode')
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            break;
    }
}

ModeCtrl.prototype.reInitFirstPage = function (options) {
    if (this.currentCtrl) {
        this.currentCtrl.destroy();
        this.currentCtrl = null;
    }
    this.gameCtrl.queryCtrl.identifyMode(options);
    this.initFirstPage(options);
}

ModeCtrl.prototype.clickStart = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.clickStart) {
            this.currentCtrl.clickStart();
        }
    }
}

ModeCtrl.prototype.showGameOverPage = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.showGameOverPage) {
            this.currentCtrl.showGameOverPage();
        }
    }
}

ModeCtrl.prototype.gameOverClickReplay = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.gameOverClickReplay) {
            this.currentCtrl.gameOverClickReplay();
        } else {
            this.game.handleWxOnError({
                message: 'cannot Find this.currentCtrl.gameOverClickReplay',
                stack: this.game.mode + '' + this.game.stage
            });
        }
    }
}

ModeCtrl.prototype.showFriendRank = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.showFriendRank) {
            this.currentCtrl.showFriendRank();
        }
    }
}
ModeCtrl.prototype.friendRankReturn = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.friendRankReturn) {
            this.currentCtrl.friendRankReturn();
        }
    }
}
ModeCtrl.prototype.shareGroupRank = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.shareGroupRank) {
            this.currentCtrl.shareGroupRank();
        }
    }
}

ModeCtrl.prototype.clickRank = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.clickRank) {
            this.currentCtrl.clickRank();
        }
    }
}

ModeCtrl.prototype.shareBattleCard = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.shareBattleCard) {
            this.currentCtrl.shareBattleCard();
        }
    }
}
ModeCtrl.prototype.changeMode = function (name) {
    if (this.currentCtrl) {
        if (this.currentCtrl.destroy) {
            this.currentCtrl.destroy();
        }
    }
    this.model.setMode(this[name].name);
    this.currentCtrl = this[name];
    this[name].init();
}
ModeCtrl.prototype.singleChangeToPlayer = function () {
    // 因为是单机转主播，所以不需要hide
    this.model.setMode(this.playerCtrl.name);
    this.currentCtrl = this.playerCtrl;
    this.playerCtrl.init();
}
ModeCtrl.prototype.groupPlayGame = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.groupPlayGame) {
            this.currentCtrl.groupPlayGame();
        }
    }
}
ModeCtrl.prototype.directPlaySingleGame = function () {
    if (this.currentCtrl) {
        this.currentCtrl.destroy();
    }
    this.model.setMode(this.singleCtrl.name);
    this.currentCtrl = this.singleCtrl;
    this.singleCtrl.clickStart();
}
ModeCtrl.prototype.battlePlay = function (pk) {
    if (this.currentCtrl) {
        if (this.currentCtrl.battlePlay) {
            this.currentCtrl.battlePlay(pk);
        }
    }
}
ModeCtrl.prototype.shareObservCard = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.shareObservCard) {
            this.currentCtrl.shareObservCard();
        }
    }
}
ModeCtrl.prototype.socketJoinSuccess = function (success) {
    if (this.currentCtrl) {
        if (this.currentCtrl.socketJoinSuccess) {
            this.currentCtrl.socketJoinSuccess(success);
        }
    }
}
ModeCtrl.prototype.showPlayerGG = function (data) {
    if (this.currentCtrl) {
        if (this.currentCtrl.showPlayerGG) {
            this.currentCtrl.showPlayerGG(data);
        }
    }
}
ModeCtrl.prototype.showPlayerWaiting = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.showPlayerWaiting) {
            this.currentCtrl.showPlayerWaiting();
        }
    }
}
ModeCtrl.prototype.onPlayerOut = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.onPlayerOut) {
            this.currentCtrl.onPlayerOut();
        } else {
            this.game.handleWxOnError({
                message: 'cannot Find this.currentCtrl.onPlayerOut',
                stack: this.game.mode + '' + this.game.stage
            });
        }
    }
}
ModeCtrl.prototype.onViewerStart = function () {
    if (this.currentCtrl) {
        if (this.currentCtrl.onViewerStart) {
            this.currentCtrl.onViewerStart();
        }
    }
}
ModeCtrl.prototype.wxOnhide = function (options) {
    if (this.currentCtrl) {
        if (this.currentCtrl.wxOnhide) {
            this.currentCtrl.wxOnhide();
        }
    }
}

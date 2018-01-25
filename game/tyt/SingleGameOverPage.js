

var SingleGameOverPage = function (game) {
        this.game = game;
        this.model = this.game.gameModel;
        this.full2D = this.game.full2D;
        this.name = 'singleSettlementPgae';

}

SingleGameOverPage.prototype.show = function () {
    var _this = this;

    var score = this.model.currentScore;
    var highest_score = this.model.getHighestScore();
    var start_time = this.model.startTime;
    var week_best_score = this.model.weekBestScore;
    var game_cnt = this.game.historyTimes.getTimes();
    if (!this.full2D) {
        this.game.handleWxOnError({
            message: 'can not find full 2D gameOverPage',
            stack: ''
        });
    }

    setTimeout(function () {
        if (_this.full2D) {
            _this.full2D.showGameOverPage({
                score: score,
                highest_score: highest_score,
                start_time: start_time,
                week_best_score: week_best_score,
                game_cnt: game_cnt
            });
        } else {
            // wx.exitMiniProgram()
        }
    }, 0);
}

SingleGameOverPage.prototype.hide = function () {
    this.full2D.hide2D();
}
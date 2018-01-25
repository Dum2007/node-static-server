
var SingleFriendRankPage = function (game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.name = 'friendRankList';
}

SingleFriendRankPage.show = function() {
    this.full2D.showFriendRankList({
        week_best_score: this.model.weekBestScore
    });
}

SingleFriendRankPage.hide = function hide() {
    this.full2D.hide2D();
}


var GroupPage = function (game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.name = 'groupRankList';
}

GroupPage.show = function () {
    this.full2D.showGroupRankList(list, myUserInfo);
}

GroupPage.hide = function () {
    this.full2D.hide2D();
}
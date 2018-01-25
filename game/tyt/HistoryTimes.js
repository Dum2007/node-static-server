
var HistoryTimes = function (game) {
    this.times = MStorage.getHistoryTimes();
    if (!this.times) {
        this.times = {
            accurate: 0,
            bonus: 0
        };
    }
    this.game = game;
    this.limitScore = 5;
}

HistoryTimes.prototype.verifyScore = function (onlineScore) {
    if (onlineScore >= this.times.accurate) {

        // 如果网上的分数比当前分数大，则赋值，更新本地缓存
        this.times.accurate = onlineScore;

        if (this.times.bonus >= this.limitScore) {

            // 如果累加分数超过5分
            this.upLoadHistoryTimes();
        } else {

            _storage2.default.saveHistoryTimes(this.times);
        }
    } else {
        this.upLoadHistoryTimes();
    }
}

HistoryTimes.prototype.addOne = function () {
    this.times.bonus++;
}
HistoryTimes.prototype.checkUp = function () {
    if (this.times.bonus >= this.limitScore) {

        // 如果累加分数超过5分
        this.upLoadHistoryTimes();
    } else {
        MStorage.saveHistoryTimes(this.times);
    }
}
HistoryTimes.prototype.upLoadHistoryTimes = function () {
    var highestScore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var verifyData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var times = this.times.accurate + this.times.bonus;
    // 上传分数
    Network.requestSettlement(highestScore, times, this.afterUpload.bind(this), verifyData);
}
HistoryTimes.prototype.afterUpload = function (success) {
    if (success) {
        this.times.accurate += this.times.bonus;
        this.times.bonus = 0;
    }
    MStorage.default.saveHistoryTimes(this.times);
}
HistoryTimes.prototype.getTimes = function () {
    return this.times.accurate + this.times.bonus;
}
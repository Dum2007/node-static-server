
var reporter = function () {
    this.timeOut = null;
    this.reportList = [];
    this.pkState = {
        isGroup: 0,
        score: 0
    };
    this.singleState = 0;
    this.observeState = {
        startTime: 0,
        success: 0
    };
    this.playerState = {
        startTime: 0,
        maxAudience: 0
    };
    this.gameStartTime = 0;

    try {
        // var res = wx.getSystemInfoSync();
        // this.clientInfo = {
        //     platform: res.platform,
        //     brand: res.brand,
        //     model: res.model,
        //     system: res.system
        // };
    } catch (error) {
        console.log(error);
    }
}
reporter.prototype.getTime = function () {
    var time = Date.now();
    time = Math.floor(time / 1000);
    return time;
}
reporter.prototype.enterReport = function (scene) {
    this.gameStartTime = this.getTime();
    if (!scene) {
        // console.log('enterReport need scene')
        return;
    }
    var data = {
        ts: this.getTime(),
        type: 0,
        scene: scene
    };
    this.reportList.push(data);
}
// PlayGameReport:  //游戏局内上报
// ts            //uint32，秒级日志时间戳
// type          //uint32，填2
// score         //uint32, 当局分数
// best_score    //uint32, 历史最高分（包括当局）
// break_record  //uint32, 当局是否打破记录
// duration      //uint32，秒级游戏时长
// times         //unit32，次数
reporter.prototype.quitReport = function () {
    if (!this.gameStartTime) {
        return;
    }
    var data = {
        ts: this.getTime(),
        type: 1,
        duration: this.getTime() - this.gameStartTime
    };
    this.reportList.push(data);
}
reporter.prototype.playGameReport = function (score, bestScore, times) {
    if (!this.singleState) {
        return;
    }
    var data = {
        ts: this.getTime(),
        type: 2,
        score: score,
        best_score: bestScore,
        break_record: score > bestScore ? 1 : 0,
        duration: this.getTime() - this.singleState,
        times: times
    };
    this.reportList.push(data);
    this.singleState = 0;
}
reporter.prototype.playGameReportStart = function () {
    this.singleState = this.getTime();
}
reporter.prototype.shareAudienceReport = function (isGroup) {
    var data = {
        ts: this.getTime(),
        type: 3,
        is_group: isGroup
    };
    this.reportList.push(data);
}
reporter.prototype.playAudienceReport = function () {
    if (!this.playerState.startTime) {
        return;
    }
    var data = {
        ts: this.getTime(),
        type: 4,
        duration: this.getTime() - this.playerState.startTime,
        max_audience: this.playerState.maxAudience
    };
    this.reportList.push(data);
    this.playerState.startTime = 0;
    this.playerState.maxAudience = 0;
}
reporter.prototype.playAudienceReportStart = function () {
    this.playerState.startTime = this.getTime();
    var data = {
        ts: this.getTime(),
        type: 10
    };
    this.reportList.push(data);
}
reporter.prototype.playAudienceReportMaxPeople = function (n) {
    if (this.playerState.maxAudience < n) {

        this.playerState.maxAudience = n;
    }
}
reporter.prototype.joinAudienceReport = function () {
    var time = this.observeState.startTime == 0 ? 0 : this.getTime() - this.observeState.startTime;
    var data = {
        ts: this.getTime(),
        type: 5,
        duration: time,
        join_audience_success: this.observeState.success
    };
    this.reportList.push(data);
    this.observeState.startTime = 0;
    this.observeState.success = 0;
}
reporter.prototype.joinAudienceReportStart = function () {
    this.observeState.startTime = this.getTime();
    this.observeState.success = 1;
}
reporter.prototype.shareGroupReport = function (isGroup) {
    var data = {
        ts: this.getTime(),
        type: 6,
        is_group: isGroup
    };
    this.reportList.push(data);
}
reporter.prototype.sharePKReport = function (isGroup) {
    var data = {
        ts: this.getTime(),
        type: 7,
        is_group: isGroup
    };
    this.reportList.push(data);
}
reporter.prototype.joinPKReport = function () {
    var data = {
        ts: this.getTime(),
        type: 8,
        is_group: isGroup
    };
    this.reportList.push(data);
}
reporter.prototype.playPKReport = function (currentScore) {
    var result = 0;
    if (currentScore == this.pkState.score) {
        result = 1;
    }
    if (currentScore > this.pkState.score) {
        result = 3;
    }
    var data = {
        ts: this.getTime(),
        type: 9,
        is_group: this.pkState.isGroup,
        result: result
    };
    this.reportList.push(data);
}
reporter.prototype.playPKReportStart = function (isGroup) {
    this.pkState.isGroup = isGroup;
}
reporter.prototype.playPKScore = function (score) {
    this.pkState.score = score;
}
reporter.prototype.resetPKReport = function () {
    this.pkState.isGroup = 0;
    this.pkState.score = 0;
}
reporter.prototype.sendReport = function () {
    if (this.reportList.length) {
        Network.default.sendReport(this.reportList, this.clientInfo);
        this.reportList = [];
    }
}
reporter.prototype.clearTimer = function () {
    if (this.timeOut) {
        clearInterval(this.timeOut);
    }
}
reporter.prototype.setTimer = function (REPORTERTIMEOUT) {
    this.timeOut = setInterval(this.sendReport.bind(this), REPORTERTIMEOUT);
}


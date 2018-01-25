
// var Config = require('./Config');

var AudioManager = function (game) {
    var _this = this;
    this.game = game;
    this.musicPool = ['success', 'combo1', 'combo2', 'combo3', 'combo4', 'combo5', 'combo6',
        'combo7', 'combo8', 'scale_intro', 'scale_loop', 'restart', 'fall', 'fall_2',
        'pop', 'icon', 'sing', 'store', 'water'];
    this.musicPool.forEach(function (key) {
        _this[key] = {};//wx.createInnerAudioContext();
        _this[key].src = Config.AUDIO[key];
    });

    this.scale_loop.loop = true;
}

AudioManager.prototype.resetAudio = function () {

}
AudioManager.prototype.register = function () {

}
AudioManager.prototype.clearTimer = function () {

}
AudioManager.prototype.replay = function () {

}

// exports.AudioManager = AudioManager;
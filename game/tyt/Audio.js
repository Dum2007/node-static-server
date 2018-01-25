
var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;

var _innerAudioContext = new WeakMap();
var _src = new WeakMap();
var _loop = new WeakMap();
var _autoplay = new WeakMap();

var Audio = function (url) {
    this.HAVE_NOTHING = HAVE_NOTHING;
    this.HAVE_METADATA = HAVE_METADATA;
    this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA;
    this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA;
    this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA;
    this.readyState = HAVE_NOTHING;

    _src.set(this, '');

    // var innerAudioContext = wx.createInnerAudioContext();
    //
    // _innerAudioContext.set(_this, innerAudioContext);
    //
    // innerAudioContext.onCanplay(function () {
    //     this.dispatchEvent({ type: 'load' });
    //     this.dispatchEvent({ type: 'loadend' });
    //     this.dispatchEvent({ type: 'canplay' });
    //     this.dispatchEvent({ type: 'canplaythrough' });
    //     this.dispatchEvent({ type: 'loadedmetadata' });
    //     this.readyState = HAVE_CURRENT_DATA;
    // });
    // innerAudioContext.onPlay(function () {
    //     _this.dispatchEvent({ type: 'play' });
    // });
    // innerAudioContext.onPause(function () {
    //     _this.dispatchEvent({ type: 'pause' });
    // });
    // innerAudioContext.onEnded(function () {
    //     _this.dispatchEvent({ type: 'ended' });
    //     _this.readyState = HAVE_ENOUGH_DATA;
    // });
    // innerAudioContext.onError(function () {
    //     _this.dispatchEvent({ type: 'error' });
    // });
    //
    // if (url) {
    //     _innerAudioContext.get(_this).src = url;
    // }

    return this;
}

Audio.prototype.load = function () {

}

Audio.prototype.play =function () {

}
Audio.prototype.pause =function () {

}
Audio.prototype.canPlayType =function () {

}
Audio.prototype.cloneNode =function () {

}
Audio.prototype.currentTime =function () {

}
Audio.prototype.src =function () {

}
Audio.prototype.loop =function () {

}
Audio.prototype.autoplay =function () {

}
Audio.prototype.paused =function () {

}

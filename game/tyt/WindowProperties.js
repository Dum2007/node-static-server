var wx$getSystemInfoSync = {screenWidth:window.width, screenHeight:window.height},
    screenWidth = wx$getSystemInfoSync.screenWidth,
    screenHeight = wx$getSystemInfoSync.screenHeight,
    devicePixelRatio = wx$getSystemInfoSync.devicePixelRatio;

var innerWidth = exports.innerWidth = screenWidth;
var innerHeight = exports.innerHeight = screenHeight;
exports.devicePixelRatio = devicePixelRatio;
var screen = exports.screen = {
    availWidth: innerWidth,
    availHeight: innerHeight
};
var performance = exports.performance = {
    now: function now() {
        return Date.now() / 1000;
    }
};
var ontouchstart = exports.ontouchstart = null;
var ontouchmove = exports.ontouchmove = null;
var ontouchend = exports.ontouchend = null;
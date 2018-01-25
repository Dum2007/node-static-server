
var HTMLElement = require('./HTMLElement');

function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : typeof(superClass)));
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : typeof(call)) === "object" || typeof call === "function") ? call : self;
}

var HTMLMediaElement = function (type) {
    inherits(HTMLMediaElement, HTMLElement);
    return possibleConstructorReturn(this, (HTMLMediaElement.__proto__ || Object.getPrototypeOf(HTMLMediaElement)).call(this, type));
}

HTMLMediaElement.prototype.addTextTrack = function () {

}
HTMLMediaElement.prototype.captureStream = function () {

}
HTMLMediaElement.prototype.fastSeek = function () {

}
HTMLMediaElement.prototype.load = function () {

}
HTMLMediaElement.prototype.pause = function () {

}
HTMLMediaElement.prototype.play = function () {

}

exports.HTMLMediaElement = HTMLMediaElement;
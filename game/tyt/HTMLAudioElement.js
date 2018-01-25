
var HTMLMediaElement = require('./HTMLMediaElement');

var HTMLAudioElement = function () {
    return possibleConstructorReturn(this, (HTMLAudioElement.__proto__ || Object.getPrototypeOf(HTMLAudioElement)).call(this, 'audio'));
}(HTMLMediaElement);

exports.HTMLAudioElement = HTMLAudioElement;
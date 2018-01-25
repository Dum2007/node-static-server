
var WindowProperties = require('./WindowProperties');
var ELement = require('./ELement');

var HTMLElement = function () {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    classCallCheck(this, HTMLElement);

    var _this = possibleConstructorReturn(this, (HTMLElement.__proto__ || Object.getPrototypeOf(HTMLElement)).call(this));

    _this.className = '';
    _this.childern = [];
    _this.style = {
        width: WindowProperties.innerWidth + 'px',
        height: WindowProperties.innerHeight + 'px'
    };
    _this.insertBefore = _util.noop;
    _this.innerHTML = '';

    _this.tagName = tagName.toUpperCase();
    return _this;
}
HTMLElement.prototype.setAttribute = function (name, value) {
    this[name] = value;
}
HTMLElement.prototype.getAttribute = function (name) {
    return this[name];
}
HTMLElement.prototype.getBoundingClientRect = function () {
    return {
        top: 0,
        left: 0,
        width: WindowProperties.innerWidth,
        height: WindowProperties.innerHeight
    };
}
HTMLElement.prototype.focus = function () {

}
HTMLElement.prototype.clientWidth = function () {
    var ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length;

    return Number.isNaN(ret) ? 0 : ret;
}
HTMLElement.prototype.clientHeight = function () {
    var ret = parseInt(this.style.fontSize, 10);

    return Number.isNaN(ret) ? 0 : ret;
}
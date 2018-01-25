
function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var ELement = function (Node) {
    inherits(ELement, Node);

    function ELement() {
        classCallCheck(this, ELement);

        var _this = possibleConstructorReturn(this, (ELement.__proto__ || Object.getPrototypeOf(ELement)).call(this));

        _this.className = '';
        _this.children = [];
        return _this;
    }
    return ELement;
};

exports.ELement = ELement;
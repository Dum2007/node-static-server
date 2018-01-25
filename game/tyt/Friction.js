var Friction = function (drag) {
    this._drag = drag;
    this._dragLog = Math.log(drag);
    this._x = 0;
    this._v = 0;
    this._startTime = 0;
}

Friction.prototype.set = function (x, v) {
    this._x = x;
    this._v = v;
    this._startTime = new Date().getTime();
}
Friction.prototype.x = function (dt) {
    if (dt === undefined) dt = (new Date().getTime() - this._startTime) / 1000;
    var powDragDt;
    if (dt === this._dt && this._powDragDt) {
        powDragDt = this._powDragDt;
    } else {
        powDragDt = this._powDragDt = Math.pow(this._drag, dt);
    }
    this._dt = dt;
    return this._x + this._v * powDragDt / this._dragLog - this._v / this._dragLog;
}
Friction.prototype.dx = function (dt) {
    if (dt === undefined) dt = (new Date().getTime() - this._startTime) / 1000;
    var powDragDt;
    if (dt === this._dt && this._powDragDt) {
        powDragDt = this._powDragDt;
    } else {
        powDragDt = this._powDragDt = Math.pow(this._drag, dt);
    }
    this._dt = dt;
    return this._v * powDragDt;
}
Friction.prototype.done = function () {
    return Math.abs(this.dx()) < 3;
}

exports.Friction = Friction;
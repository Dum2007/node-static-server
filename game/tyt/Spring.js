var epsilon = 0.4;

var Spring = function (mass, springConstant, damping) {
    this._m = mass;
    this._k = springConstant;
    this._c = damping;
    this._solution = null;
    this._endPosition = 0;
    this._startTime = 0;
}

Spring.prototype._solve = function (initial, velocity) {
    var c = this._c;
    var m = this._m;
    var k = this._k;
    // Solve the quadratic equation; root = (-c +/- sqrt(c^2 - 4mk)) / 2m.
    var cmk = c * c - 4 * m * k;
    if (cmk == 0) {
        // The spring is critically damped.
        // x = (c1 + c2*t) * e ^(-c/2m)*t
        var r = -c / (2 * m);
        var c1 = initial;
        var c2 = velocity / (r * initial);
        return {
            x: function x(t) {
                return (c1 + c2 * t) * Math.pow(Math.E, r * t);
            },
            dx: function dx(t) {
                var pow = Math.pow(Math.E, r * t);return r * (c1 + c2 * t) * pow + c2 * pow;
            }
        };
    } else if (cmk > 0) {
        // The spring is overdamped; no bounces.
        // x = c1*e^(r1*t) + c2*e^(r2t)
        // Need to find r1 and r2, the roots, then solve c1 and c2.
        var r1 = (-c - Math.sqrt(cmk)) / (2 * m);
        var r2 = (-c + Math.sqrt(cmk)) / (2 * m);
        var c2 = (velocity - r1 * initial) / (r2 - r1);
        var c1 = initial - c2;

        return {
            x: function x(t) {
                var powER1T, powER2T;
                if (t === this._t) {
                    powER1T = this._powER1T;
                    powER2T = this._powER2T;
                }

                this._t = t;

                if (!powER1T) {
                    powER1T = this._powER1T = Math.pow(Math.E, r1 * t);
                }
                if (!powER2T) {
                    powER2T = this._powER2T = Math.pow(Math.E, r2 * t);
                }

                return c1 * powER1T + c2 * powER2T;
            },
            dx: function dx(t) {
                var powER1T, powER2T;
                if (t === this._t) {
                    powER1T = this._powER1T;
                    powER2T = this._powER2T;
                }

                this._t = t;

                if (!powER1T) {
                    powER1T = this._powER1T = Math.pow(Math.E, r1 * t);
                }
                if (!powER2T) {
                    powER2T = this._powER2T = Math.pow(Math.E, r2 * t);
                }

                return c1 * r1 * powER1T + c2 * r2 * powER2T;
            }
        };
    } else {
        // The spring is underdamped, it has imaginary roots.
        // r = -(c / 2*m) +- w*i
        // w = sqrt(4mk - c^2) / 2m
        // x = (e^-(c/2m)t) * (c1 * cos(wt) + c2 * sin(wt))
        var w = Math.sqrt(4 * m * k - c * c) / (2 * m);
        var r = -(c / 2 * m);
        var c1 = initial;
        var c2 = (velocity - r * initial) / w;

        return {
            x: function x(t) {
                return Math.pow(Math.E, r * t) * (c1 * Math.cos(w * t) + c2 * Math.sin(w * t));
            },
            dx: function dx(t) {
                var power = Math.pow(Math.E, r * t);
                var cos = Math.cos(w * t);
                var sin = Math.sin(w * t);
                return power * (c2 * w * cos - c1 * w * sin) + r * power * (c2 * sin + c1 * cos);
            }
        };
    }
}

Spring.prototype.x = function (dt) {
    if (dt == undefined) dt = (new Date().getTime() - this._startTime) / 1000.0;
    return this._solution ? this._endPosition + this._solution.x(dt) : 0;
}
Spring.prototype.dx = function (dt) {
    if (dt == undefined) dt = (new Date().getTime() - this._startTime) / 1000.0;
    return this._solution ? this._solution.dx(dt) : 0;
}
Spring.prototype.setEnd = function (x, velocity, t) {
    if (!t) t = new Date().getTime();
    if (x == this._endPosition && this.almostZero(velocity, epsilon)) return;
    velocity = velocity || 0;
    var position = this._endPosition;
    if (this._solution) {
        // Don't whack incoming velocity.
        if (this.almostZero(velocity, epsilon)) velocity = this._solution.dx((t - this._startTime) / 1000.0);
        position = this._solution.x((t - this._startTime) / 1000.0);
        if (this.almostZero(velocity, epsilon)) velocity = 0;
        if (this.almostZero(position, epsilon)) position = 0;
        position += this._endPosition;
    }
    if (this._solution && this.almostZero(position - x, epsilon) && this.almostZero(velocity, epsilon)) {
        return;
    }
    this._endPosition = x;
    this._solution = this._solve(position - this._endPosition, velocity);
    this._startTime = t;
}
Spring.prototype.snap = function (x) {
    this._startTime = new Date().getTime();
    this._endPosition = x;
    this._solution = {
        x: function x() {
            return 0;
        },
        dx: function dx() {
            return 0;
        }
    };
}
Spring.prototype.done = function (t) {
    if (!t) t = new Date().getTime();
    return this.almostEqual(this.x(), this._endPosition, epsilon) && this.almostZero(this.dx(), epsilon);
}
Spring.prototype.almostEqual = function (a, b, epsilon) {
    return a > b - epsilon && a < b + epsilon;
}
Spring.prototype.almostZero = function (a, epsilon) {
    return this.almostEqual(a, 0, epsilon);
}

exports.Spring = Spring;
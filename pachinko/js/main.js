/*
 TweenJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2010 gskinner.com, inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
this.createjs = this.createjs || {};
createjs.extend = function(a, e) {
    function b() {
        this.constructor = a
    }
    b.prototype = e.prototype;
    return a.prototype = new b
}
;
this.createjs = this.createjs || {};
createjs.promote = function(a, e) {
    var b = a.prototype
      , c = Object.getPrototypeOf && Object.getPrototypeOf(b) || b.__proto__;
    if (c) {
        b[(e += "_") + "constructor"] = c.constructor;
        for (var d in c)
            b.hasOwnProperty(d) && "function" == typeof c[d] && (b[e + d] = c[d])
    }
    return a
}
;
this.createjs = this.createjs || {};
createjs.deprecate = function(a, e) {
    return function() {
        var b = "Deprecated property or method '" + e + "'. See docs for info.";
        console && (console.warn ? console.warn(b) : console.log(b));
        return a && a.apply(this, arguments)
    }
}
;
this.createjs = this.createjs || {};
(function() {
    function a(b, c, d) {
        this.type = b;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!c;
        this.cancelable = !!d;
        this.timeStamp = (new Date).getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1
    }
    var e = a.prototype;
    e.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }
    ;
    e.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    e.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    e.remove = function() {
        this.removed = !0
    }
    ;
    e.clone = function() {
        return new a(this.type,this.bubbles,this.cancelable)
    }
    ;
    e.set = function(b) {
        for (var c in b)
            this[c] = b[c];
        return this
    }
    ;
    e.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ;
    createjs.Event = a
}
)();
this.createjs = this.createjs || {};
(function() {
    function a() {
        this._captureListeners = this._listeners = null
    }
    var e = a.prototype;
    a.initialize = function(b) {
        b.addEventListener = e.addEventListener;
        b.on = e.on;
        b.removeEventListener = b.off = e.removeEventListener;
        b.removeAllEventListeners = e.removeAllEventListeners;
        b.hasEventListener = e.hasEventListener;
        b.dispatchEvent = e.dispatchEvent;
        b._dispatchEvent = e._dispatchEvent;
        b.willTrigger = e.willTrigger
    }
    ;
    e.addEventListener = function(b, c, d) {
        var f = d ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var k = f[b];
        k && this.removeEventListener(b, c, d);
        (k = f[b]) ? k.push(c) : f[b] = [c];
        return c
    }
    ;
    e.on = function(b, c, d, f, k, g) {
        c.handleEvent && (d = d || c,
        c = c.handleEvent);
        d = d || this;
        return this.addEventListener(b, function(p) {
            c.call(d, p, k);
            f && p.remove()
        }, g)
    }
    ;
    e.removeEventListener = function(b, c, d) {
        if (d = d ? this._captureListeners : this._listeners) {
            var f = d[b];
            if (f)
                for (var k = 0, g = f.length; k < g; k++)
                    if (f[k] == c) {
                        1 == g ? delete d[b] : f.splice(k, 1);
                        break
                    }
        }
    }
    ;
    e.off = e.removeEventListener;
    e.removeAllEventListeners = function(b) {
        b ? (this._listeners && delete this._listeners[b],
        this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
    }
    ;
    e.dispatchEvent = function(b, c, d) {
        if ("string" == typeof b) {
            var f = this._listeners;
            if (!(c || f && f[b]))
                return !0;
            b = new createjs.Event(b,c,d)
        } else
            b.target && b.clone && (b = b.clone());
        try {
            b.target = this
        } catch (k) {}
        if (b.bubbles && this.parent) {
            d = this;
            for (c = [d]; d.parent; )
                c.push(d = d.parent);
            f = c.length;
            for (d = f - 1; 0 <= d && !b.propagationStopped; d--)
                c[d]._dispatchEvent(b, 1 + (0 == d));
            for (d = 1; d < f && !b.propagationStopped; d++)
                c[d]._dispatchEvent(b, 3)
        } else
            this._dispatchEvent(b, 2);
        return !b.defaultPrevented
    }
    ;
    e.hasEventListener = function(b) {
        var c = this._listeners
          , d = this._captureListeners;
        return !!(c && c[b] || d && d[b])
    }
    ;
    e.willTrigger = function(b) {
        for (var c = this; c; ) {
            if (c.hasEventListener(b))
                return !0;
            c = c.parent
        }
        return !1
    }
    ;
    e.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    e._dispatchEvent = function(b, c) {
        var d, f, k = 2 >= c ? this._captureListeners : this._listeners;
        if (b && k && (f = k[b.type]) && (d = f.length)) {
            try {
                b.currentTarget = this
            } catch (p) {}
            try {
                b.eventPhase = c | 0
            } catch (p) {}
            b.removed = !1;
            f = f.slice();
            for (k = 0; k < d && !b.immediatePropagationStopped; k++) {
                var g = f[k];
                g.handleEvent ? g.handleEvent(b) : g(b);
                b.removed && (this.off(b.type, g, 1 == c),
                b.removed = !1)
            }
        }
        2 === c && this._dispatchEvent(b, 2.1)
    }
    ;
    createjs.EventDispatcher = a
}
)();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "Ticker cannot be instantiated.";
    }
    a.RAF_SYNCHED = "synched";
    a.RAF = "raf";
    a.TIMEOUT = "timeout";
    a.timingMode = null;
    a.maxDelta = 0;
    a.paused = !1;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    createjs.EventDispatcher.initialize(a);
    a._addEventListener = a.addEventListener;
    a.addEventListener = function() {
        !a._inited && a.init();
        return a._addEventListener.apply(a, arguments)
    }
    ;
    a._inited = !1;
    a._startTime = 0;
    a._pausedTime = 0;
    a._ticks = 0;
    a._pausedTicks = 0;
    a._interval = 50;
    a._lastTime = 0;
    a._times = null;
    a._tickTimes = null;
    a._timerId = null;
    a._raf = !0;
    a._setInterval = function(c) {
        a._interval = c;
        a._inited && a._setupTick()
    }
    ;
    a.setInterval = createjs.deprecate(a._setInterval, "Ticker.setInterval");
    a._getInterval = function() {
        return a._interval
    }
    ;
    a.getInterval = createjs.deprecate(a._getInterval, "Ticker.getInterval");
    a._setFPS = function(c) {
        a._setInterval(1E3 / c)
    }
    ;
    a.setFPS = createjs.deprecate(a._setFPS, "Ticker.setFPS");
    a._getFPS = function() {
        return 1E3 / a._interval
    }
    ;
    a.getFPS = createjs.deprecate(a._getFPS, "Ticker.getFPS");
    try {
        Object.defineProperties(a, {
            interval: {
                get: a._getInterval,
                set: a._setInterval
            },
            framerate: {
                get: a._getFPS,
                set: a._setFPS
            }
        })
    } catch (c) {
        console.log(c)
    }
    a.init = function() {
        a._inited || (a._inited = !0,
        a._times = [],
        a._tickTimes = [],
        a._startTime = a._getTime(),
        a._times.push(a._lastTime = 0),
        a.interval = a._interval)
    }
    ;
    a.reset = function() {
        if (a._raf) {
            var c = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            c && c(a._timerId)
        } else
            clearTimeout(a._timerId);
        a.removeAllEventListeners("tick");
        a._timerId = a._times = a._tickTimes = null;
        a._startTime = a._lastTime = a._ticks = a._pausedTime = 0;
        a._inited = !1
    }
    ;
    a.getMeasuredTickTime = function(c) {
        var d = 0
          , f = a._tickTimes;
        if (!f || 1 > f.length)
            return -1;
        c = Math.min(f.length, c || a._getFPS() | 0);
        for (var k = 0; k < c; k++)
            d += f[k];
        return d / c
    }
    ;
    a.getMeasuredFPS = function(c) {
        var d = a._times;
        if (!d || 2 > d.length)
            return -1;
        c = Math.min(d.length - 1, c || a._getFPS() | 0);
        return 1E3 / ((d[0] - d[c]) / c)
    }
    ;
    a.getTime = function(c) {
        return a._startTime ? a._getTime() - (c ? a._pausedTime : 0) : -1
    }
    ;
    a.getEventTime = function(c) {
        return a._startTime ? (a._lastTime || a._startTime) - (c ? a._pausedTime : 0) : -1
    }
    ;
    a.getTicks = function(c) {
        return a._ticks - (c ? a._pausedTicks : 0)
    }
    ;
    a._handleSynch = function() {
        a._timerId = null;
        a._setupTick();
        a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick()
    }
    ;
    a._handleRAF = function() {
        a._timerId = null;
        a._setupTick();
        a._tick()
    }
    ;
    a._handleTimeout = function() {
        a._timerId = null;
        a._setupTick();
        a._tick()
    }
    ;
    a._setupTick = function() {
        if (null == a._timerId) {
            var c = a.timingMode;
            if (c == a.RAF_SYNCHED || c == a.RAF) {
                var d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (d) {
                    a._timerId = d(c == a.RAF ? a._handleRAF : a._handleSynch);
                    a._raf = !0;
                    return
                }
            }
            a._raf = !1;
            a._timerId = setTimeout(a._handleTimeout, a._interval)
        }
    }
    ;
    a._tick = function() {
        var c = a.paused
          , d = a._getTime()
          , f = d - a._lastTime;
        a._lastTime = d;
        a._ticks++;
        c && (a._pausedTicks++,
        a._pausedTime += f);
        if (a.hasEventListener("tick")) {
            var k = new createjs.Event("tick")
              , g = a.maxDelta;
            k.delta = g && f > g ? g : f;
            k.paused = c;
            k.time = d;
            k.runTime = d - a._pausedTime;
            a.dispatchEvent(k)
        }
        for (a._tickTimes.unshift(a._getTime() - d); 100 < a._tickTimes.length; )
            a._tickTimes.pop();
        for (a._times.unshift(d); 100 < a._times.length; )
            a._times.pop()
    }
    ;
    var e = window
      , b = e.performance.now || e.performance.mozNow || e.performance.msNow || e.performance.oNow || e.performance.webkitNow;
    a._getTime = function() {
        return (b && b.call(e.performance) || (new Date).getTime()) - a._startTime
    }
    ;
    createjs.Ticker = a
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(b) {
        this.EventDispatcher_constructor();
        this.ignoreGlobalPause = !1;
        this.loop = 0;
        this.bounce = this.reversed = this.useTicks = !1;
        this.timeScale = 1;
        this.position = this.duration = 0;
        this.rawPosition = -1;
        this._paused = !0;
        this._labelList = this._labels = this._parent = this._prev = this._next = null;
        b && (this.useTicks = !!b.useTicks,
        this.ignoreGlobalPause = !!b.ignoreGlobalPause,
        this.loop = !0 === b.loop ? -1 : b.loop || 0,
        this.reversed = !!b.reversed,
        this.bounce = !!b.bounce,
        this.timeScale = b.timeScale || 1,
        b.onChange && this.addEventListener("change", b.onChange),
        b.onComplete && this.addEventListener("complete", b.onComplete))
    }
    var e = createjs.extend(a, createjs.EventDispatcher);
    e._setPaused = function(b) {
        createjs.Tween._register(this, b);
        return this
    }
    ;
    e.setPaused = createjs.deprecate(e._setPaused, "AbstractTween.setPaused");
    e._getPaused = function() {
        return this._paused
    }
    ;
    e.getPaused = createjs.deprecate(e._getPaused, "AbstactTween.getPaused");
    e._getCurrentLabel = function(b) {
        var c = this.getLabels();
        null == b && (b = this.position);
        for (var d = 0, f = c.length; d < f && !(b < c[d].position); d++)
            ;
        return 0 === d ? null : c[d - 1].label
    }
    ;
    e.getCurrentLabel = createjs.deprecate(e._getCurrentLabel, "AbstractTween.getCurrentLabel");
    try {
        Object.defineProperties(e, {
            paused: {
                set: e._setPaused,
                get: e._getPaused
            },
            currentLabel: {
                get: e._getCurrentLabel
            }
        })
    } catch (b) {}
    e.advance = function(b, c) {
        this.setPosition(this.rawPosition + b * this.timeScale, c)
    }
    ;
    e.setPosition = function(b, c, d, f) {
        var k = this.duration
          , g = this.loop
          , p = this.rawPosition
          , m = 0;
        0 > b && (b = 0);
        if (0 === k) {
            var l = !0;
            if (-1 !== p)
                return l
        } else {
            var n = b / k | 0;
            m = b - n * k;
            (l = -1 !== g && b >= g * k + k) && (b = (m = k) * (n = g) + k);
            if (b === p)
                return l;
            !this.reversed !== !(this.bounce && n % 2) && (m = k - m)
        }
        this.position = m;
        this.rawPosition = b;
        this._updatePosition(d, l);
        l && (this.paused = !0);
        f && f(this);
        c || this._runActions(p, b, d, !d && -1 === p);
        this.dispatchEvent("change");
        l && this.dispatchEvent("complete")
    }
    ;
    e.calculatePosition = function(b) {
        var c = this.duration
          , d = this.loop
          , f = 0;
        if (0 === c)
            return 0;
        -1 !== d && b >= d * c + c ? (b = c,
        f = d) : 0 > b ? b = 0 : (f = b / c | 0,
        b -= f * c);
        return !this.reversed !== !(this.bounce && f % 2) ? c - b : b
    }
    ;
    e.getLabels = function() {
        var b = this._labelList;
        if (!b) {
            b = this._labelList = [];
            var c = this._labels, d;
            for (d in c)
                b.push({
                    label: d,
                    position: c[d]
                });
            b.sort(function(f, k) {
                return f.position - k.position
            })
        }
        return b
    }
    ;
    e.setLabels = function(b) {
        this._labels = b;
        this._labelList = null
    }
    ;
    e.addLabel = function(b, c) {
        this._labels || (this._labels = {});
        this._labels[b] = c;
        var d = this._labelList;
        if (d) {
            for (var f = 0, k = d.length; f < k && !(c < d[f].position); f++)
                ;
            d.splice(f, 0, {
                label: b,
                position: c
            })
        }
    }
    ;
    e.gotoAndPlay = function(b) {
        this.paused = !1;
        this._goto(b)
    }
    ;
    e.gotoAndStop = function(b) {
        this.paused = !0;
        this._goto(b)
    }
    ;
    e.resolve = function(b) {
        var c = Number(b);
        isNaN(c) && (c = this._labels && this._labels[b]);
        return c
    }
    ;
    e.toString = function() {
        return "[AbstractTween]"
    }
    ;
    e.clone = function() {
        throw "AbstractTween can not be cloned.";
    }
    ;
    e._init = function(b) {
        b && b.paused || (this.paused = !1);
        b && null != b.position && this.setPosition(b.position)
    }
    ;
    e._updatePosition = function(b, c) {}
    ;
    e._goto = function(b) {
        b = this.resolve(b);
        null != b && this.setPosition(b, !1, !0)
    }
    ;
    e._runActions = function(b, c, d, f) {
        if (this._actionHead || this.tweens) {
            var k = this.duration, g = this.reversed, p = this.bounce, m = this.loop, l, n, h;
            if (0 === k) {
                var q = l = n = h = 0;
                g = p = !1
            } else
                q = b / k | 0,
                l = c / k | 0,
                n = b - q * k,
                h = c - l * k;
            -1 !== m && (l > m && (h = k,
            l = m),
            q > m && (n = k,
            q = m));
            if (d)
                return this._runActionsRange(h, h, d, f);
            if (q !== l || n !== h || d || f) {
                -1 === q && (q = n = 0);
                b = b <= c;
                c = q;
                do {
                    m = c === q ? n : b ? 0 : k;
                    var r = c === l ? h : b ? k : 0;
                    !g !== !(p && c % 2) && (m = k - m,
                    r = k - r);
                    if ((!p || c === q || m !== r) && this._runActionsRange(m, r, d, f || c !== q && !p))
                        return !0;
                    f = !1
                } while (b && ++c <= l || !b && --c >= l)
            }
        }
    }
    ;
    e._runActionsRange = function(b, c, d, f) {}
    ;
    createjs.AbstractTween = createjs.promote(a, "EventDispatcher")
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(d, f) {
        this.AbstractTween_constructor(f);
        this.pluginData = null;
        this.target = d;
        this.passive = !1;
        this._stepTail = this._stepHead = new e(null,0,0,{},null,!0);
        this._stepPosition = 0;
        this._injected = this._pluginIds = this._plugins = this._actionTail = this._actionHead = null;
        f && (this.pluginData = f.pluginData,
        f.override && a.removeTweens(d));
        this.pluginData || (this.pluginData = {});
        this._init(f)
    }
    function e(d, f, k, g, p, m) {
        this.next = null;
        this.prev = d;
        this.t = f;
        this.d = k;
        this.props = g;
        this.ease = p;
        this.passive = m;
        this.index = d ? d.index + 1 : 0
    }
    function b(d, f, k, g, p) {
        this.next = null;
        this.prev = d;
        this.t = f;
        this.d = 0;
        this.scope = k;
        this.funct = g;
        this.params = p
    }
    var c = createjs.extend(a, createjs.AbstractTween);
    a.IGNORE = {};
    a._tweens = [];
    a._plugins = null;
    a._tweenHead = null;
    a._tweenTail = null;
    a.get = function(d, f) {
        return new a(d,f)
    }
    ;
    a.tick = function(d, f) {
        for (var k = a._tweenHead; k; ) {
            var g = k._next;
            f && !k.ignoreGlobalPause || k._paused || k.advance(k.useTicks ? 1 : d);
            k = g
        }
    }
    ;
    a.handleEvent = function(d) {
        "tick" === d.type && this.tick(d.delta, d.paused)
    }
    ;
    a.removeTweens = function(d) {
        if (d.tweenjs_count) {
            for (var f = a._tweenHead; f; ) {
                var k = f._next;
                f.target === d && a._register(f, !0);
                f = k
            }
            d.tweenjs_count = 0
        }
    }
    ;
    a.removeAllTweens = function() {
        for (var d = a._tweenHead; d; ) {
            var f = d._next;
            d._paused = !0;
            d.target && (d.target.tweenjs_count = 0);
            d._next = d._prev = null;
            d = f
        }
        a._tweenHead = a._tweenTail = null
    }
    ;
    a.hasActiveTweens = function(d) {
        return d ? !!d.tweenjs_count : !!a._tweenHead
    }
    ;
    a._installPlugin = function(d) {
        for (var f = d.priority = d.priority || 0, k = a._plugins = a._plugins || [], g = 0, p = k.length; g < p && !(f < k[g].priority); g++)
            ;
        k.splice(g, 0, d)
    }
    ;
    a._register = function(d, f) {
        var k = d.target;
        if (!f && d._paused)
            k && (k.tweenjs_count = k.tweenjs_count ? k.tweenjs_count + 1 : 1),
            (k = a._tweenTail) ? (a._tweenTail = k._next = d,
            d._prev = k) : a._tweenHead = a._tweenTail = d,
            !a._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", a),
            a._inited = !0);
        else if (f && !d._paused) {
            k && k.tweenjs_count--;
            k = d._next;
            var g = d._prev;
            k ? k._prev = g : a._tweenTail = g;
            g ? g._next = k : a._tweenHead = k;
            d._next = d._prev = null
        }
        d._paused = f
    }
    ;
    c.wait = function(d, f) {
        0 < d && this._addStep(+d, this._stepTail.props, null, f);
        return this
    }
    ;
    c.to = function(d, f, k) {
        if (null == f || 0 > f)
            f = 0;
        f = this._addStep(+f, null, k);
        this._appendProps(d, f);
        return this
    }
    ;
    c.label = function(d) {
        this.addLabel(d, this.duration);
        return this
    }
    ;
    c.call = function(d, f, k) {
        return this._addAction(k || this.target, d, f || [this])
    }
    ;
    c.set = function(d, f) {
        return this._addAction(f || this.target, this._set, [d])
    }
    ;
    c.play = function(d) {
        return this._addAction(d || this, this._set, [{
            paused: !1
        }])
    }
    ;
    c.pause = function(d) {
        return this._addAction(d || this, this._set, [{
            paused: !0
        }])
    }
    ;
    c.w = c.wait;
    c.t = c.to;
    c.c = c.call;
    c.s = c.set;
    c.toString = function() {
        return "[Tween]"
    }
    ;
    c.clone = function() {
        throw "Tween can not be cloned.";
    }
    ;
    c._addPlugin = function(d) {
        var f = this._pluginIds || (this._pluginIds = {})
          , k = d.ID;
        if (k && !f[k]) {
            f[k] = !0;
            f = this._plugins || (this._plugins = []);
            k = d.priority || 0;
            for (var g = 0, p = f.length; g < p; g++)
                if (k < f[g].priority) {
                    f.splice(g, 0, d);
                    return
                }
            f.push(d)
        }
    }
    ;
    c._updatePosition = function(d, f) {
        var k = this._stepHead.next
          , g = this.position
          , p = this.duration;
        if (this.target && k) {
            for (var m = k.next; m && m.t <= g; )
                k = k.next,
                m = k.next;
            this._updateTargetProps(k, f ? 0 === p ? 1 : g / p : (g - k.t) / k.d, f)
        }
        this._stepPosition = k ? g - k.t : 0
    }
    ;
    c._updateTargetProps = function(d, f, k) {
        if (!(this.passive = !!d.passive)) {
            var g, p = d.prev.props, m = d.props;
            if (g = d.ease)
                f = g(f, 0, 1, 1);
            g = this._plugins;
            var l;
            a: for (l in p) {
                var n = p[l];
                var h = m[l];
                n = n !== h && "number" === typeof n ? n + (h - n) * f : 1 <= f ? h : n;
                if (g) {
                    h = 0;
                    for (var q = g.length; h < q; h++) {
                        var r = g[h].change(this, d, l, n, f, k);
                        if (r === a.IGNORE)
                            continue a;
                        void 0 !== r && (n = r)
                    }
                }
                this.target[l] = n
            }
        }
    }
    ;
    c._runActionsRange = function(d, f, k, g) {
        var p = (k = d > f) ? this._actionTail : this._actionHead
          , m = f
          , l = d;
        k && (m = d,
        l = f);
        for (var n = this.position; p; ) {
            var h = p.t;
            if (h === f || h > l && h < m || g && h === d)
                if (p.funct.apply(p.scope, p.params),
                n !== this.position)
                    return !0;
            p = k ? p.prev : p.next
        }
    }
    ;
    c._appendProps = function(d, f, k) {
        var g = this._stepHead.props, p = this.target, m = a._plugins, l, n, h = f.prev, q = h.props, r = f.props || (f.props = this._cloneProps(q)), u = {};
        for (l in d)
            if (d.hasOwnProperty(l) && (u[l] = r[l] = d[l],
            void 0 === g[l])) {
                var v = void 0;
                if (m)
                    for (n = m.length - 1; 0 <= n; n--) {
                        var x = m[n].init(this, l, v);
                        void 0 !== x && (v = x);
                        if (v === a.IGNORE) {
                            delete r[l];
                            delete u[l];
                            break
                        }
                    }
                v !== a.IGNORE && (void 0 === v && (v = p[l]),
                q[l] = void 0 === v ? null : v)
            }
        for (l in u) {
            var t;
            for (d = h; (t = d) && (d = t.prev); )
                if (d.props !== t.props) {
                    if (void 0 !== d.props[l])
                        break;
                    d.props[l] = q[l]
                }
        }
        if (!1 !== k && (m = this._plugins))
            for (n = m.length - 1; 0 <= n; n--)
                m[n].step(this, f, u);
        if (k = this._injected)
            this._injected = null,
            this._appendProps(k, f, !1)
    }
    ;
    c._injectProp = function(d, f) {
        (this._injected || (this._injected = {}))[d] = f
    }
    ;
    c._addStep = function(d, f, k, g) {
        f = new e(this._stepTail,this.duration,d,f,k,g || !1);
        this.duration += d;
        return this._stepTail = this._stepTail.next = f
    }
    ;
    c._addAction = function(d, f, k) {
        d = new b(this._actionTail,this.duration,d,f,k);
        this._actionTail ? this._actionTail.next = d : this._actionHead = d;
        this._actionTail = d;
        return this
    }
    ;
    c._set = function(d) {
        for (var f in d)
            this[f] = d[f]
    }
    ;
    c._cloneProps = function(d) {
        var f = {}, k;
        for (k in d)
            f[k] = d[k];
        return f
    }
    ;
    createjs.Tween = createjs.promote(a, "AbstractTween")
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(b) {
        if (b instanceof Array || null == b && 1 < arguments.length) {
            var c = b;
            var d = arguments[1];
            b = arguments[2]
        } else
            b && (c = b.tweens,
            d = b.labels);
        this.AbstractTween_constructor(b);
        this.tweens = [];
        c && this.addTween.apply(this, c);
        this.setLabels(d);
        this._init(b)
    }
    var e = createjs.extend(a, createjs.AbstractTween);
    e.addTween = function(b) {
        b._parent && b._parent.removeTween(b);
        var c = arguments.length;
        if (1 < c) {
            for (var d = 0; d < c; d++)
                this.addTween(arguments[d]);
            return arguments[c - 1]
        }
        if (0 === c)
            return null;
        this.tweens.push(b);
        b._parent = this;
        b.paused = !0;
        c = b.duration;
        0 < b.loop && (c *= b.loop + 1);
        c > this.duration && (this.duration = c);
        0 <= this.rawPosition && b.setPosition(this.rawPosition);
        return b
    }
    ;
    e.removeTween = function(b) {
        var c = arguments.length;
        if (1 < c) {
            for (var d = !0, f = 0; f < c; f++)
                d = d && this.removeTween(arguments[f]);
            return d
        }
        if (0 === c)
            return !0;
        c = this.tweens;
        for (f = c.length; f--; )
            if (c[f] === b)
                return c.splice(f, 1),
                b._parent = null,
                b.duration >= this.duration && this.updateDuration(),
                !0;
        return !1
    }
    ;
    e.updateDuration = function() {
        for (var b = this.duration = 0, c = this.tweens.length; b < c; b++) {
            var d = this.tweens[b]
              , f = d.duration;
            0 < d.loop && (f *= d.loop + 1);
            f > this.duration && (this.duration = f)
        }
    }
    ;
    e.toString = function() {
        return "[Timeline]"
    }
    ;
    e.clone = function() {
        throw "Timeline can not be cloned.";
    }
    ;
    e._updatePosition = function(b, c) {
        for (var d = this.position, f = 0, k = this.tweens.length; f < k; f++)
            this.tweens[f].setPosition(d, !0, b)
    }
    ;
    e._runActionsRange = function(b, c, d, f) {
        for (var k = this.position, g = 0, p = this.tweens.length; g < p; g++)
            if (this.tweens[g]._runActions(b, c, d, f),
            k !== this.position)
                return !0
    }
    ;
    createjs.Timeline = createjs.promote(a, "AbstractTween")
}
)();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "Ease cannot be instantiated.";
    }
    a.linear = function(e) {
        return e
    }
    ;
    a.none = a.linear;
    a.get = function(e) {
        -1 > e ? e = -1 : 1 < e && (e = 1);
        return function(b) {
            return 0 == e ? b : 0 > e ? b * (b * -e + 1 + e) : b * ((2 - b) * e + (1 - e))
        }
    }
    ;
    a.getPowIn = function(e) {
        return function(b) {
            return Math.pow(b, e)
        }
    }
    ;
    a.getPowOut = function(e) {
        return function(b) {
            return 1 - Math.pow(1 - b, e)
        }
    }
    ;
    a.getPowInOut = function(e) {
        return function(b) {
            return 1 > (b *= 2) ? .5 * Math.pow(b, e) : 1 - .5 * Math.abs(Math.pow(2 - b, e))
        }
    }
    ;
    a.quadIn = a.getPowIn(2);
    a.quadOut = a.getPowOut(2);
    a.quadInOut = a.getPowInOut(2);
    a.cubicIn = a.getPowIn(3);
    a.cubicOut = a.getPowOut(3);
    a.cubicInOut = a.getPowInOut(3);
    a.quartIn = a.getPowIn(4);
    a.quartOut = a.getPowOut(4);
    a.quartInOut = a.getPowInOut(4);
    a.quintIn = a.getPowIn(5);
    a.quintOut = a.getPowOut(5);
    a.quintInOut = a.getPowInOut(5);
    a.sineIn = function(e) {
        return 1 - Math.cos(e * Math.PI / 2)
    }
    ;
    a.sineOut = function(e) {
        return Math.sin(e * Math.PI / 2)
    }
    ;
    a.sineInOut = function(e) {
        return -.5 * (Math.cos(Math.PI * e) - 1)
    }
    ;
    a.getBackIn = function(e) {
        return function(b) {
            return b * b * ((e + 1) * b - e)
        }
    }
    ;
    a.backIn = a.getBackIn(1.7);
    a.getBackOut = function(e) {
        return function(b) {
            return --b * b * ((e + 1) * b + e) + 1
        }
    }
    ;
    a.backOut = a.getBackOut(1.7);
    a.getBackInOut = function(e) {
        e *= 1.525;
        return function(b) {
            return 1 > (b *= 2) ? .5 * b * b * ((e + 1) * b - e) : .5 * ((b -= 2) * b * ((e + 1) * b + e) + 2)
        }
    }
    ;
    a.backInOut = a.getBackInOut(1.7);
    a.circIn = function(e) {
        return -(Math.sqrt(1 - e * e) - 1)
    }
    ;
    a.circOut = function(e) {
        return Math.sqrt(1 - --e * e)
    }
    ;
    a.circInOut = function(e) {
        return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
    }
    ;
    a.bounceIn = function(e) {
        return 1 - a.bounceOut(1 - e)
    }
    ;
    a.bounceOut = function(e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }
    ;
    a.bounceInOut = function(e) {
        return .5 > e ? .5 * a.bounceIn(2 * e) : .5 * a.bounceOut(2 * e - 1) + .5
    }
    ;
    a.getElasticIn = function(e, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d)
                return d;
            var f = b / c * Math.asin(1 / e);
            return -(e * Math.pow(2, 10 * --d) * Math.sin((d - f) * c / b))
        }
    }
    ;
    a.elasticIn = a.getElasticIn(1, .3);
    a.getElasticOut = function(e, b) {
        var c = 2 * Math.PI;
        return function(d) {
            return 0 == d || 1 == d ? d : e * Math.pow(2, -10 * d) * Math.sin((d - b / c * Math.asin(1 / e)) * c / b) + 1
        }
    }
    ;
    a.elasticOut = a.getElasticOut(1, .3);
    a.getElasticInOut = function(e, b) {
        var c = 2 * Math.PI;
        return function(d) {
            var f = b / c * Math.asin(1 / e);
            return 1 > (d *= 2) ? -.5 * e * Math.pow(2, 10 * --d) * Math.sin((d - f) * c / b) : e * Math.pow(2, -10 * --d) * Math.sin((d - f) * c / b) * .5 + 1
        }
    }
    ;
    a.elasticInOut = a.getElasticInOut(1, .3 * 1.5);
    createjs.Ease = a
}
)();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "MotionGuidePlugin cannot be instantiated.";
    }
    a.priority = 0;
    a.ID = "MotionGuide";
    a.install = function() {
        createjs.Tween._installPlugin(a);
        return createjs.Tween.IGNORE
    }
    ;
    a.init = function(e, b, c) {
        "guide" == b && e._addPlugin(a)
    }
    ;
    a.step = function(e, b, c) {
        for (var d in c)
            if ("guide" === d) {
                var f = b.props.guide
                  , k = a._solveGuideData(c.guide, f);
                f.valid = !k;
                var g = f.endData;
                e._injectProp("x", g.x);
                e._injectProp("y", g.y);
                if (k || !f.orient)
                    break;
                f.startOffsetRot = (void 0 === b.prev.props.rotation ? e.target.rotation || 0 : b.prev.props.rotation) - f.startData.rotation;
                if ("fixed" == f.orient)
                    f.endAbsRot = g.rotation + f.startOffsetRot,
                    f.deltaRotation = 0;
                else {
                    k = void 0 === c.rotation ? e.target.rotation || 0 : c.rotation;
                    g = k - f.endData.rotation - f.startOffsetRot;
                    var p = g % 360;
                    f.endAbsRot = k;
                    switch (f.orient) {
                    case "auto":
                        f.deltaRotation = g;
                        break;
                    case "cw":
                        f.deltaRotation = (p + 360) % 360 + 360 * Math.abs(g / 360 | 0);
                        break;
                    case "ccw":
                        f.deltaRotation = (p - 360) % 360 + -360 * Math.abs(g / 360 | 0)
                    }
                }
                e._injectProp("rotation", f.endAbsRot)
            }
    }
    ;
    a.change = function(e, b, c, d, f, k) {
        if ((d = b.props.guide) && b.props !== b.prev.props && d !== b.prev.props.guide) {
            if ("guide" === c && !d.valid || "x" == c || "y" == c || "rotation" === c && d.orient)
                return createjs.Tween.IGNORE;
            a._ratioToPositionData(f, d, e.target)
        }
    }
    ;
    a.debug = function(e, b, c) {
        e = e.guide || e;
        var d = a._findPathProblems(e);
        d && console.error("MotionGuidePlugin Error found: \n" + d);
        if (!b)
            return d;
        var f, k = e.path, g = k.length;
        b.save();
        b.lineCap = "round";
        b.lineJoin = "miter";
        b.beginPath();
        b.moveTo(k[0], k[1]);
        for (f = 2; f < g; f += 4)
            b.quadraticCurveTo(k[f], k[f + 1], k[f + 2], k[f + 3]);
        b.strokeStyle = "black";
        b.lineWidth = 4.5;
        b.stroke();
        b.strokeStyle = "white";
        b.lineWidth = 3;
        b.stroke();
        b.closePath();
        k = c.length;
        if (c && k) {
            g = {};
            var p = {};
            a._solveGuideData(e, g);
            for (f = 0; f < k; f++)
                g.orient = "fixed",
                a._ratioToPositionData(c[f], g, p),
                b.beginPath(),
                b.moveTo(p.x, p.y),
                b.lineTo(p.x + 9 * Math.cos(.0174533 * p.rotation), p.y + 9 * Math.sin(.0174533 * p.rotation)),
                b.strokeStyle = "black",
                b.lineWidth = 4.5,
                b.stroke(),
                b.strokeStyle = "red",
                b.lineWidth = 3,
                b.stroke(),
                b.closePath()
        }
        b.restore();
        return d
    }
    ;
    a._solveGuideData = function(e, b) {
        var c;
        if (c = a.debug(e))
            return c;
        var d = b.path = e.path;
        b.orient = e.orient;
        b.subLines = [];
        b.totalLength = 0;
        b.startOffsetRot = 0;
        b.deltaRotation = 0;
        b.startData = {
            ratio: 0
        };
        b.endData = {
            ratio: 1
        };
        b.animSpan = 1;
        var f = d.length, k, g = {};
        var p = d[0];
        var m = d[1];
        for (c = 2; c < f; c += 4) {
            var l = d[c];
            var n = d[c + 1];
            var h = d[c + 2];
            var q = d[c + 3];
            var r = {
                weightings: [],
                estLength: 0,
                portion: 0
            }
              , u = p;
            var v = m;
            for (k = 1; 10 >= k; k++)
                a._getParamsForCurve(p, m, l, n, h, q, k / 10, !1, g),
                u = g.x - u,
                v = g.y - v,
                v = Math.sqrt(u * u + v * v),
                r.weightings.push(v),
                r.estLength += v,
                u = g.x,
                v = g.y;
            b.totalLength += r.estLength;
            for (k = 0; 10 > k; k++)
                v = r.estLength,
                r.weightings[k] /= v;
            b.subLines.push(r);
            p = h;
            m = q
        }
        v = b.totalLength;
        d = b.subLines.length;
        for (c = 0; c < d; c++)
            b.subLines[c].portion = b.subLines[c].estLength / v;
        c = isNaN(e.start) ? 0 : e.start;
        d = isNaN(e.end) ? 1 : e.end;
        a._ratioToPositionData(c, b, b.startData);
        a._ratioToPositionData(d, b, b.endData);
        b.startData.ratio = c;
        b.endData.ratio = d;
        b.animSpan = b.endData.ratio - b.startData.ratio
    }
    ;
    a._ratioToPositionData = function(e, b, c) {
        var d = b.subLines, f, k = 0, g = e * b.animSpan + b.startData.ratio;
        var p = d.length;
        for (f = 0; f < p; f++) {
            var m = d[f].portion;
            if (k + m >= g) {
                var l = f;
                break
            }
            k += m
        }
        void 0 === l && (l = p - 1,
        k -= m);
        d = d[l].weightings;
        var n = m;
        p = d.length;
        for (f = 0; f < p; f++) {
            m = d[f] * n;
            if (k + m >= g)
                break;
            k += m
        }
        l = 4 * l + 2;
        p = b.path;
        a._getParamsForCurve(p[l - 2], p[l - 1], p[l], p[l + 1], p[l + 2], p[l + 3], f / 10 + (g - k) / m * .1, b.orient, c);
        b.orient && (c.rotation = .99999 <= e && 1.00001 >= e && void 0 !== b.endAbsRot ? b.endAbsRot : c.rotation + (b.startOffsetRot + e * b.deltaRotation));
        return c
    }
    ;
    a._getParamsForCurve = function(e, b, c, d, f, k, g, p, m) {
        var l = 1 - g;
        m.x = l * l * e + 2 * l * g * c + g * g * f;
        m.y = l * l * b + 2 * l * g * d + g * g * k;
        p && (m.rotation = 57.2957795 * Math.atan2((d - b) * l + (k - d) * g, (c - e) * l + (f - c) * g))
    }
    ;
    a._findPathProblems = function(e) {
        var b = e.path
          , c = b && b.length || 0;
        if (6 > c || (c - 2) % 4)
            return "\tCannot parse 'path' array due to invalid number of entries in path. There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\nOnly [ " + (c + " ] values found. Expected: " + Math.max(4 * Math.ceil((c - 2) / 4) + 2, 6));
        for (var d = 0; d < c; d++)
            if (isNaN(b[d]))
                return "All data in path array must be numeric";
        b = e.start;
        if (isNaN(b) && void 0 !== b)
            return "'start' out of bounds. Expected 0 to 1, got: " + b;
        b = e.end;
        if (isNaN(b) && void 0 !== b)
            return "'end' out of bounds. Expected 0 to 1, got: " + b;
        if ((e = e.orient) && "fixed" != e && "auto" != e && "cw" != e && "ccw" != e)
            return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + e
    }
    ;
    createjs.MotionGuidePlugin = a
}
)();
this.createjs = this.createjs || {};
(function() {
    var a = createjs.TweenJS = createjs.TweenJS || {};
    a.version = "1.0.0";
    a.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT"
}
)();
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , e = "undefined" !== typeof module && module.exports
      , b = function() {
        for (var f, k = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], g = 0, p = k.length, m = {}; g < p; g++)
            if ((f = k[g]) && f[1]in a) {
                for (g = 0; g < f.length; g++)
                    m[k[0][g]] = f[g];
                return m
            }
        return !1
    }()
      , c = {
        change: b.fullscreenchange,
        error: b.fullscreenerror
    }
      , d = {
        request: function(f) {
            return new Promise(function(k, g) {
                var p = function() {
                    this.off("change", p);
                    k()
                }
                .bind(this);
                this.on("change", p);
                f = f || a.documentElement;
                Promise.resolve(f[b.requestFullscreen]())["catch"](g)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(f, k) {
                if (this.isFullscreen) {
                    var g = function() {
                        this.off("change", g);
                        f()
                    }
                    .bind(this);
                    this.on("change", g);
                    Promise.resolve(a[b.exitFullscreen]())["catch"](k)
                } else
                    f()
            }
            .bind(this))
        },
        toggle: function(f) {
            return this.isFullscreen ? this.exit() : this.request(f)
        },
        onchange: function(f) {
            this.on("change", f)
        },
        onerror: function(f) {
            this.on("error", f)
        },
        on: function(f, k) {
            var g = c[f];
            g && a.addEventListener(g, k, !1)
        },
        off: function(f, k) {
            var g = c[f];
            g && a.removeEventListener(g, k, !1)
        },
        raw: b
    };
    b ? (Object.defineProperties(d, {
        isFullscreen: {
            get: function() {
                return !!a[b.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[b.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[b.fullscreenEnabled]
            }
        }
    }),
    e ? module.exports = d : window.screenfull = d) : e ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}
)();
(function() {
    function a(t) {
        t = String(t);
        return t.charAt(0).toUpperCase() + t.slice(1)
    }
    function e(t, y) {
        var G = -1
          , z = t ? t.length : 0;
        if ("number" == typeof z && -1 < z && z <= q)
            for (; ++G < z; )
                y(t[G], G, t);
        else
            c(t, y)
    }
    function b(t) {
        t = String(t).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t)
    }
    function c(t, y) {
        for (var G in t)
            u.call(t, G) && y(t[G], G, t)
    }
    function d(t) {
        return null == t ? a(t) : v.call(t).slice(8, -1)
    }
    function f(t, y) {
        var G = null != t ? typeof t[y] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(G) && ("object" == G ? !!t[y] : !0)
    }
    function k(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?")
    }
    function g(t, y) {
        var G = null;
        e(t, function(z, H) {
            G = y(G, z, H, t)
        });
        return G
    }
    function p(t) {
        function y(S) {
            return g(S, function(Q, N) {
                var U = N.pattern || k(N);
                !Q && (Q = RegExp("\\b" + U + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + U + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + U + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((Q = String(N.label && !RegExp(U, "i").test(N.label) ? N.label : Q).split("/"))[1] && !/[\d.]+/.test(Q[0]) && (Q[0] += " " + Q[1]),
                N = N.label || N,
                Q = b(Q[0].replace(RegExp(U, "i"), N).replace(RegExp("; *(?:" + N + "[_-])?", "i"), " ").replace(RegExp("(" + N + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return Q
            })
        }
        function G(S) {
            return g(S, function(Q, N) {
                return Q || (RegExp(N + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null
            })
        }
        var z = l
          , H = t && "object" == typeof t && "String" != d(t);
        H && (z = t,
        t = null);
        var I = z.navigator || {}
          , A = I.userAgent || "";
        t || (t = A);
        var P = H ? !!I.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(v.toString())
          , R = H ? "Object" : "ScriptBridgingProxyObject"
          , D = H ? "Object" : "Environment"
          , E = H && z.java ? "JavaPackage" : d(z.java)
          , T = H ? "Object" : "RuntimeObject";
        D = (E = /\bJava/.test(E) && z.java) && d(z.environment) == D;
        var W = E ? "a" : "\u03b1", C = E ? "b" : "\u03b2", O = z.document || {}, J = z.operamini || z.opera, K = r.test(K = H && J ? J["[[Class]]"] : d(J)) ? K : J = null, w, Z = t;
        H = [];
        var aa = null
          , Y = t == A;
        A = Y && J && "function" == typeof J.version && J.version();
        var L = function(S) {
            return g(S, function(Q, N) {
                return Q || RegExp("\\b" + (N.pattern || k(N)) + "\\b", "i").exec(t) && (N.label || N)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , B = function(S) {
            return g(S, function(Q, N) {
                return Q || RegExp("\\b" + (N.pattern || k(N)) + "\\b", "i").exec(t) && (N.label || N)
            })
        }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
            label: "Microsoft Edge",
            pattern: "Edge"
        }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
            label: "Samsung Internet",
            pattern: "SamsungBrowser"
        }, "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Sleipnir", "SlimBrowser", {
            label: "SRWare Iron",
            pattern: "Iron"
        }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
            label: "Opera Mini",
            pattern: "OPiOS"
        }, "Opera", {
            label: "Opera",
            pattern: "OPR"
        }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
        }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
        }, {
            label: "Firefox for iOS",
            pattern: "FxiOS"
        }, {
            label: "IE",
            pattern: "IEMobile"
        }, {
            label: "IE",
            pattern: "MSIE"
        }, "Safari"])
          , M = y([{
            label: "BlackBerry",
            pattern: "BB10"
        }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
        }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
        }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
        }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
        }, {
            label: "Galaxy S5",
            pattern: "SM-G900"
        }, {
            label: "Galaxy S6",
            pattern: "SM-G920"
        }, {
            label: "Galaxy S6 Edge",
            pattern: "SM-G925"
        }, {
            label: "Galaxy S7",
            pattern: "SM-G930"
        }, {
            label: "Galaxy S7 Edge",
            pattern: "SM-G935"
        }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
        }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
        }, "Xoom"])
          , V = function(S) {
            return g(S, function(Q, N, U) {
                return Q || (N[M] || N[/^[a-z]+(?: +[a-z]+\b)*/i.exec(M)] || RegExp("\\b" + k(U) + "(?:\\b|\\w*\\d)", "i").exec(t)) && U
            })
        }({
            Apple: {
                iPad: 1,
                iPhone: 1,
                iPod: 1
            },
            Archos: {},
            Amazon: {
                Kindle: 1,
                "Kindle Fire": 1
            },
            Asus: {
                Transformer: 1
            },
            "Barnes & Noble": {
                Nook: 1
            },
            BlackBerry: {
                PlayBook: 1
            },
            Google: {
                "Google TV": 1,
                Nexus: 1
            },
            HP: {
                TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
                Xbox: 1,
                "Xbox One": 1
            },
            Motorola: {
                Xoom: 1
            },
            Nintendo: {
                "Wii U": 1,
                Wii: 1
            },
            Nokia: {
                Lumia: 1
            },
            Samsung: {
                "Galaxy S": 1,
                "Galaxy S2": 1,
                "Galaxy S3": 1,
                "Galaxy S4": 1
            },
            Sony: {
                PlayStation: 1,
                "PlayStation Vita": 1
            }
        })
          , F = function(S) {
            return g(S, function(Q, N) {
                var U = N.pattern || k(N);
                if (!Q && (Q = RegExp("\\b" + U + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t))) {
                    var X = Q
                      , ba = N.label || N
                      , ca = {
                        "10.0": "10",
                        "6.4": "10 Technical Preview",
                        "6.3": "8.1",
                        "6.2": "8",
                        "6.1": "Server 2008 R2 / 7",
                        "6.0": "Server 2008 / Vista",
                        "5.2": "Server 2003 / XP 64-bit",
                        "5.1": "XP",
                        "5.01": "2000 SP1",
                        "5.0": "2000",
                        "4.0": "NT",
                        "4.90": "ME"
                    };
                    U && ba && /^Win/i.test(X) && !/^Windows Phone /i.test(X) && (ca = ca[/[\d.]+$/.exec(X)]) && (X = "Windows " + ca);
                    X = String(X);
                    U && ba && (X = X.replace(RegExp(U, "i"), ba));
                    Q = X = b(X.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return Q
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        L && (L = [L]);
        V && !M && (M = y([V]));
        if (w = /\bGoogle TV\b/.exec(M))
            M = w[0];
        /\bSimulator\b/i.test(t) && (M = (M ? M + " " : "") + "Simulator");
        "Opera Mini" == B && /\bOPiOS\b/.test(t) && H.push("running in Turbo/Uncompressed mode");
        "IE" == B && /\blike iPhone OS\b/.test(t) ? (w = p(t.replace(/like iPhone OS/, "")),
        V = w.manufacturer,
        M = w.product) : /^iP/.test(M) ? (B || (B = "Safari"),
        F = "iOS" + ((w = / OS ([\d_]+)/i.exec(t)) ? " " + w[1].replace(/_/g, ".") : "")) : "Konqueror" != B || /buntu/i.test(F) ? V && "Google" != V && (/Chrome/.test(B) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(M)) || /\bAndroid\b/.test(F) && /^Chrome/.test(B) && /\bVersion\//i.test(t) ? (B = "Android Browser",
        F = /\bAndroid\b/.test(F) ? F : "Android") : "Silk" == B ? (/\bMobi/i.test(t) || (F = "Android",
        H.unshift("desktop mode")),
        /Accelerated *= *true/i.test(t) && H.unshift("accelerated")) : "PaleMoon" == B && (w = /\bFirefox\/([\d.]+)\b/.exec(t)) ? H.push("identifying as Firefox " + w[1]) : "Firefox" == B && (w = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (F || (F = "Firefox OS"),
        M || (M = w[1])) : !B || (w = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(B)) ? (B && !M && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(w + "/") + 8)) && (B = null),
        (w = M || V || F) && (M || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) && (B = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(F) ? F : w) + " Browser")) : "Electron" == B && (w = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && H.push("Chromium " + w) : F = "Kubuntu";
        A || (A = G(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", k(B), "(?:Firefox|Minefield|NetFront)"]));
        if (w = "iCab" == L && 3 < parseFloat(A) && "WebKit" || /\bOpera\b/.test(B) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(L) && "WebKit" || !L && /\bMSIE\b/i.test(t) && ("Mac OS" == F ? "Tasman" : "Trident") || "WebKit" == L && /\bPlayStation\b(?! Vita\b)/i.test(B) && "NetFront")
            L = [w];
        "IE" == B && (w = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (B += " Mobile",
        F = "Windows Phone " + (/\+$/.test(w) ? w : w + ".x"),
        H.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (B = "IE Mobile",
        F = "Windows Phone 8.x",
        H.unshift("desktop mode"),
        A || (A = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : "IE" != B && "Trident" == L && (w = /\brv:([\d.]+)/.exec(t)) && (B && H.push("identifying as " + B + (A ? " " + A : "")),
        B = "IE",
        A = w[1]);
        if (Y) {
            if (f(z, "global"))
                if (E && (w = E.lang.System,
                Z = w.getProperty("os.arch"),
                F = F || w.getProperty("os.name") + " " + w.getProperty("os.version")),
                D) {
                    try {
                        A = z.require("ringo/engine").version.join("."),
                        B = "RingoJS"
                    } catch (S) {
                        (w = z.system) && w.global.system == z.system && (B = "Narwhal",
                        F || (F = w[0].os || null))
                    }
                    B || (B = "Rhino")
                } else
                    "object" == typeof z.process && !z.process.browser && (w = z.process) && ("object" == typeof w.versions && ("string" == typeof w.versions.electron ? (H.push("Node " + w.versions.node),
                    B = "Electron",
                    A = w.versions.electron) : "string" == typeof w.versions.nw && (H.push("Chromium " + A, "Node " + w.versions.node),
                    B = "NW.js",
                    A = w.versions.nw)),
                    B || (B = "Node.js",
                    Z = w.arch,
                    F = w.platform,
                    A = (A = /[\d.]+/.exec(w.version)) ? A[0] : null));
            else
                d(w = z.runtime) == R ? (B = "Adobe AIR",
                F = w.flash.system.Capabilities.os) : d(w = z.phantom) == T ? (B = "PhantomJS",
                A = (w = w.version || null) && w.major + "." + w.minor + "." + w.patch) : "number" == typeof O.documentMode && (w = /\bTrident\/(\d+)/i.exec(t)) ? (A = [A, O.documentMode],
                (w = +w[1] + 4) != A[1] && (H.push("IE " + A[1] + " mode"),
                L && (L[1] = ""),
                A[1] = w),
                A = "IE" == B ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof O.documentMode && /^(?:Chrome|Firefox)\b/.test(B) && (H.push("masking as " + B + " " + A),
                B = "IE",
                A = "11.0",
                L = ["Trident"],
                F = "Windows");
            F = F && b(F)
        }
        A && (w = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (Y && I.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (aa = /b/i.test(w) ? "beta" : "alpha",
        A = A.replace(RegExp(w + "\\+?$"), "") + ("beta" == aa ? C : W) + (/\d+\+?/.exec(w) || ""));
        if ("Fennec" == B || "Firefox" == B && /\b(?:Android|Firefox OS)\b/.test(F))
            B = "Firefox Mobile";
        else if ("Maxthon" == B && A)
            A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(M))
            "Xbox 360" == M && (F = null),
            "Xbox 360" == M && /\bIEMobile\b/.test(t) && H.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(B) && (!B || M || /Browser|Mobi/.test(B)) || "Windows CE" != F && !/Mobi/i.test(t))
            if ("IE" == B && Y)
                try {
                    null === z.external && H.unshift("platform preview")
                } catch (S) {
                    H.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(M) || /\bBB10\b/.test(t)) && (w = (RegExp(M.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || A) ? (w = [w, /BB10/.test(t)],
                F = (w[1] ? (M = null,
                V = "BlackBerry") : "Device Software") + " " + w[0],
                A = null) : this != c && "Wii" != M && (Y && J || /Opera/.test(B) && /\b(?:MSIE|Firefox)\b/i.test(t) || "Firefox" == B && /\bOS X (?:\d+\.){2,}/.test(F) || "IE" == B && (F && !/^Win/.test(F) && 5.5 < A || /\bWindows XP\b/.test(F) && 8 < A || 8 == A && !/\bTrident\b/.test(t))) && !r.test(w = p.call(c, t.replace(r, "") + ";")) && w.name && (w = "ing as " + w.name + ((w = w.version) ? " " + w : ""),
                r.test(B) ? (/\bIE\b/.test(w) && "Mac OS" == F && (F = null),
                w = "identify" + w) : (w = "mask" + w,
                B = K ? b(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(w) && (F = null),
                Y || (A = null)),
                L = ["Presto"],
                H.push(w));
        else
            B += " Mobile";
        if (w = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) {
            w = [parseFloat(w.replace(/\.(\d)$/, ".0$1")), w];
            if ("Safari" == B && "+" == w[1].slice(-1))
                B = "WebKit Nightly",
                aa = "alpha",
                A = w[1].slice(0, -1);
            else if (A == w[1] || A == (w[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1]))
                A = null;
            w[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
            537.36 == w[0] && 537.36 == w[2] && 28 <= parseFloat(w[1]) && "WebKit" == L && (L = ["Blink"]);
            Y && (P || w[1]) ? (L && (L[1] = "like Chrome"),
            w = w[1] || (w = w[0],
            530 > w ? 1 : 532 > w ? 2 : 532.05 > w ? 3 : 533 > w ? 4 : 534.03 > w ? 5 : 534.07 > w ? 6 : 534.1 > w ? 7 : 534.13 > w ? 8 : 534.16 > w ? 9 : 534.24 > w ? 10 : 534.3 > w ? 11 : 535.01 > w ? 12 : 535.02 > w ? "13+" : 535.07 > w ? 15 : 535.11 > w ? 16 : 535.19 > w ? 17 : 536.05 > w ? 18 : 536.1 > w ? 19 : 537.01 > w ? 20 : 537.11 > w ? "21+" : 537.13 > w ? 23 : 537.18 > w ? 24 : 537.24 > w ? 25 : 537.36 > w ? 26 : "Blink" != L ? "27" : "28")) : (L && (L[1] = "like Safari"),
            w = (w = w[0],
            400 > w ? 1 : 500 > w ? 2 : 526 > w ? 3 : 533 > w ? 4 : 534 > w ? "4+" : 535 > w ? 5 : 537 > w ? 6 : 538 > w ? 7 : 601 > w ? 8 : "8"));
            L && (L[1] += " " + (w += "number" == typeof w ? ".x" : /[.+]/.test(w) ? "" : "+"));
            "Safari" == B && (!A || 45 < parseInt(A)) && (A = w)
        }
        "Opera" == B && (w = /\bzbov|zvav$/.exec(F)) ? (B += " ",
        H.unshift("desktop mode"),
        "zvav" == w ? (B += "Mini",
        A = null) : B += "Mobile",
        F = F.replace(RegExp(" *" + w + "$"), "")) : "Safari" == B && /\bChrome\b/.exec(L && L[1]) && (H.unshift("desktop mode"),
        B = "Chrome Mobile",
        A = null,
        /\bOS X\b/.test(F) ? (V = "Apple",
        F = "iOS 4.3+") : F = null);
        A && 0 == A.indexOf(w = /[\d.]+$/.exec(F)) && -1 < t.indexOf("/" + w + "-") && (F = String(F.replace(w, "")).replace(/^ +| +$/g, ""));
        L && !/\b(?:Avant|Nook)\b/.test(B) && (/Browser|Lunascape|Maxthon/.test(B) || "Safari" != B && /^iOS/.test(F) && /\bSafari\b/.test(L[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(B) && L[1]) && (w = L[L.length - 1]) && H.push(w);
        H.length && (H = ["(" + H.join("; ") + ")"]);
        V && M && 0 > M.indexOf(V) && H.push("on " + V);
        M && H.push((/^on /.test(H[H.length - 1]) ? "" : "on ") + M);
        if (F) {
            var da = (w = / ([\d.+]+)$/.exec(F)) && "/" == F.charAt(F.length - w[0].length - 1);
            F = {
                architecture: 32,
                family: w && !da ? F.replace(w[0], "") : F,
                version: w ? w[1] : null,
                toString: function() {
                    var S = this.version;
                    return this.family + (S && !da ? " " + S : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (w = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Z)) && !/\bi686\b/i.test(Z) ? (F && (F.architecture = 64,
        F.family = F.family.replace(RegExp(" *" + w), "")),
        B && (/\bWOW64\b/i.test(t) || Y && /\w(?:86|32)$/.test(I.cpuClass || I.platform) && !/\bWin64; x64\b/i.test(t)) && H.unshift("32-bit")) : F && /^OS X/.test(F.family) && "Chrome" == B && 39 <= parseFloat(A) && (F.architecture = 64);
        t || (t = null);
        z = {};
        z.description = t;
        z.layout = L && L[0];
        z.manufacturer = V;
        z.name = B;
        z.prerelease = aa;
        z.product = M;
        z.ua = t;
        z.version = B && A;
        z.os = F || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        z.parse = p;
        z.toString = function() {
            return this.description || ""
        }
        ;
        z.version && H.unshift(A);
        z.name && H.unshift(B);
        F && B && (F != String(F).split(" ")[0] || F != B.split(" ")[0] && !M) && H.push(M ? "(" + F + ")" : "on " + F);
        H.length && (z.description = H.join(" "));
        return z
    }
    var m = {
        "function": !0,
        object: !0
    }
      , l = m[typeof window] && window || this
      , n = m[typeof exports] && exports;
    m = m[typeof module] && module && !module.nodeType && module;
    var h = n && m && "object" == typeof global && global;
    !h || h.global !== h && h.window !== h && h.self !== h || (l = h);
    var q = Math.pow(2, 53) - 1
      , r = /\bOpera/;
    h = Object.prototype;
    var u = h.hasOwnProperty
      , v = h.toString
      , x = p();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (l.platform = x,
    define(function() {
        return x
    })) : n && m ? c(x, function(t, y) {
        n[y] = t
    }) : l.platform = x
}
).call(this);
function buildIOSMeta() {
    for (var a = [{
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
    }, {
        name: "apple-mobile-web-app-capable",
        content: "yes"
    }, {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
    }], e = 0; e < a.length; e++) {
        var b = document.createElement("meta");
        b.name = a[e].name;
        b.content = a[e].content;
        var c = window.document.head.querySelector('meta[name="' + b.name + '"]');
        c && c.parentNode.removeChild(c);
        window.document.head.appendChild(b)
    }
}
function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}
function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}
function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}
function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product)
        switch (window.devicePixelRatio) {
        case 2:
            switch (window.innerWidth) {
            case 568:
                320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                break;
            case 667:
                375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 808:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            default:
                hideIOSFullscreenPanel()
            }
            break;
        case 3:
            switch (window.innerWidth) {
            case 736:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 724:
                375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 808:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            default:
                hideIOSFullscreenPanel()
            }
            break;
        default:
            hideIOSFullscreenPanel()
        }
}
function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize()
    }, 500)
}
function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
function isIOSLessThen13() {
    var a = platform.os
      , e = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === e && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(),
    buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iScaleFactor = 1, s_iOffsetX, s_iOffsetY, s_bIsIphone = !1, s_bFocus = !0;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
)(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function getSize(a) {
    var e = a.toLowerCase()
      , b = window.document
      , c = b.documentElement;
    if (void 0 === window["inner" + a])
        a = c["client" + a];
    else if (window["inner" + a] != c["client" + a]) {
        var d = b.createElement("body");
        d.id = "vpw-test-b";
        d.style.cssText = "overflow:scroll";
        var f = b.createElement("div");
        f.id = "vpw-test-d";
        f.style.cssText = "position:absolute;top:-1000px";
        f.innerHTML = "<style>@media(" + e + ":" + c["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + e + ":7px!important}}</style>";
        d.appendChild(f);
        c.insertBefore(d, b.head);
        a = 7 == f["offset" + a] ? c["client" + a] : window["inner" + a];
        c.removeChild(d)
    } else
        a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}
function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}
function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone"))
        return s_bIsIphone = !0;
    for (; a.length; )
        if (navigator.platform === a.pop())
            return s_bIsIphone = !0;
    return s_bIsIphone = !1
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var e = getSize("Width");
        s_bFocus && _checkOrientation(e, a);
        var b = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH)
          , c = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var d = a - b;
            b += d;
            c += CANVAS_WIDTH / CANVAS_HEIGHT * d
        } else
            c < e && (d = e - c,
            c += d,
            b += CANVAS_HEIGHT / CANVAS_WIDTH * d);
        d = a / 2 - b / 2;
        var f = e / 2 - c / 2
          , k = CANVAS_WIDTH / c;
        if (f * k < -EDGEBOARD_X || d * k < -EDGEBOARD_Y)
            b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            c = Math.round(CANVAS_WIDTH * b),
            b = Math.round(CANVAS_HEIGHT * b),
            d = (a - b) / 2,
            f = (e - c) / 2,
            k = CANVAS_WIDTH / c;
        s_iOffsetX = -1 * f * k;
        s_iOffsetY = -1 * d * k;
        0 <= d && (s_iOffsetY = 0);
        0 <= f && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", c + "px");
        $("#canvas").css("height", b + "px");
        0 > d || (d = (a - b) / 2);
        $("#canvas").css("top", d + "px");
        $("#canvas").css("left", f + "px");
        if (DEBUG_BOX2D) {
            if (s_bMobile || isChrome())
                $("#debug").css("width", c + "px"),
                $("#debug").css("height", b + "px");
            0 > d || (d = (a - b) / 2);
            $("#debug").css("top", d + "px");
            $("#debug").css("left", f + "px")
        }
        fullscreenHandler()
    }
}
function _checkOrientation(a, e) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > e ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()))
}
function playSound(a, e, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(e),
    s_aSounds[a].loop(b),
    s_aSounds[a]) : null
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}
function setVolume(a, e) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(e)
}
function setMute(a, e) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(e)
}
function fadeSound(a, e, b, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].fade(e, b, c)
}
function soundPlaying(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
        return s_aSounds[a].playing()
}
function smartResize(a, e, b) {
    if (null !== a.getBounds())
        return e = inRectResize(a, CANVAS_WIDTH - 2 * s_iOffsetX - e, CANVAS_HEIGHT - 2 * s_iOffsetY - b),
        a.scaleX = a.scaleY = 1,
        1 > e && (a.scaleX = a.scaleY = e),
        a.scaleX
}
function zoomInCamera(a, e, b, c, d) {
    if (null !== a.getBounds() && void 0 !== a.getBounds())
        return e /= c,
        b /= d,
        b = e <= b ? e : b,
        a.scaleX = a.scaleY = b
}
function inRectResize(a, e, b) {
    if (null !== a.getBounds() && void 0 !== a.getBounds()) {
        var c = a.getBounds().width;
        e /= c;
        c = a.getBounds().height;
        b = Math.min(e, b / c);
        return a.scaleX = a.scaleY = b
    }
}
function createBitmap(a, e, b) {
    var c = new createjs.Bitmap(a)
      , d = new createjs.Shape;
    e && b ? d.graphics.beginFill("#fff").drawRect(0, 0, e, b) : d.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    c.hitArea = d;
    return c
}
function createSprite(a, e, b, c, d, f) {
    a = null !== e ? new createjs.Sprite(a,e) : new createjs.Sprite(a);
    e = new createjs.Shape;
    e.graphics.beginFill("#000000").drawRect(-b, -c, d, f);
    a.hitArea = e;
    return a
}
function pad(a, e, b) {
    a += "";
    return a.length >= e ? a : Array(e - a.length + 1).join(b || "0") + a
}
function linearFunction(a, e, b, c, d) {
    return (a - e) * (d - c) / (b - e) + c
}
function randomFloatBetween(a, e, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(b))
}
function rotateVector2D(a, e) {
    var b = e.getX() * Math.cos(a) + e.getY() * Math.sin(a)
      , c = e.getX() * -Math.sin(a) + e.getY() * Math.cos(a);
    e.set(b, c)
}
function tweenVectorsOnX(a, e, b) {
    return a + b * (e - a)
}
function shuffle(a) {
    for (var e = a.length, b, c; 0 !== e; )
        c = Math.floor(Math.random() * e),
        --e,
        b = a[e],
        a[e] = a[c],
        a[c] = b;
    return a
}
function bubbleSort(a) {
    do {
        var e = !1;
        for (var b = 0; b < a.length - 1; b++)
            a[b] > a[b + 1] && (e = a[b],
            a[b] = a[b + 1],
            a[b + 1] = e,
            e = !0)
    } while (e)
}
function compare(a, e) {
    return a.index > e.index ? -1 : a.index < e.index ? 1 : 0
}
function easeLinear(a, e, b, c) {
    return b * a / c + e
}
function easeInQuad(a, e, b, c) {
    return b * (a /= c) * a + e
}
function easeInSine(a, e, b, c) {
    return -b * Math.cos(a / c * (Math.PI / 2)) + b + e
}
function easeInCubic(a, e, b, c) {
    return b * (a /= c) * a * a + e
}
function getTrajectoryPoint(a, e) {
    var b = new createjs.Point
      , c = (1 - a) * (1 - a)
      , d = a * a;
    b.x = c * e.start.x + 2 * (1 - a) * a * e.traj.x + d * e.end.x;
    b.y = c * e.start.y + 2 * (1 - a) * a * e.traj.y + d * e.end.y;
    return b
}
function formatTime(a) {
    a /= 1E3;
    var e = Math.floor(a / 60);
    a = parseFloat(a - 60 * e).toFixed(1);
    var b = "";
    b = 10 > e ? b + ("0" + e + ":") : b + (e + ":");
    return 10 > a ? b + ("0" + a) : b + a
}
function formatValue(a) {
    return TEXT_CURRENCY + a.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
function arraysEqual(a, e) {
    return JSON.stringify(a) == JSON.stringify(e)
}
function radiansToDegree(a) {
    return 180 / Math.PI * a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function dotProductV2(a, e) {
    return a.getX() * e.getX() + a.getY() * e.getY()
}
function angleBetweenVectors(a, e) {
    var b = Math.acos(dotProductV2(a, e) / (a.length() * e.length()));
    return 1 == isNaN(b) ? 0 : b
}
function checkRectCollision(a, e) {
    var b = getBounds(a, .9);
    var c = getBounds(e, .98);
    return calculateIntersection(b, c)
}
function calculateIntersection(a, e) {
    var b, c, d, f;
    var k = a.x + (b = a.width / 2);
    var g = a.y + (c = a.height / 2);
    var p = e.x + (d = e.width / 2);
    var m = e.y + (f = e.height / 2);
    k = Math.abs(k - p) - (b + d);
    g = Math.abs(g - m) - (c + f);
    return 0 > k && 0 > g ? (k = Math.min(Math.min(a.width, e.width), -k),
    g = Math.min(Math.min(a.height, e.height), -g),
    {
        x: Math.max(a.x, e.x),
        y: Math.max(a.y, e.y),
        width: k,
        height: g,
        rect1: a,
        rect2: e
    }) : null
}
function getBounds(a, e) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var c = a.children, d = c.length, f;
        for (f = 0; f < d; f++) {
            var k = getBounds(c[f], 1);
            k.x < b.x && (b.x = k.x);
            k.y < b.y && (b.y = k.y);
            k.x + k.width > b.x2 && (b.x2 = k.x + k.width);
            k.y + k.height > b.y2 && (b.y2 = k.y + k.height)
        }
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            d = a.sourceRect || a.image;
            f = d.width * e;
            var g = d.height * e
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                d = a.spriteSheet.getFrame(a.currentFrame);
                f = d.rect.width;
                g = d.rect.height;
                c = d.regX;
                var p = d.regY
            } else
                b.x = a.x || 0,
                b.y = a.y || 0;
        else
            b.x = a.x || 0,
            b.y = a.y || 0;
        c = c || 0;
        f = f || 0;
        p = p || 0;
        g = g || 0;
        b.regX = c;
        b.regY = p;
        d = a.localToGlobal(0 - c, 0 - p);
        k = a.localToGlobal(f - c, g - p);
        f = a.localToGlobal(f - c, 0 - p);
        c = a.localToGlobal(0 - c, g - p);
        b.x = Math.min(Math.min(Math.min(d.x, k.x), f.x), c.x);
        b.y = Math.min(Math.min(Math.min(d.y, k.y), f.y), c.y);
        b.width = Math.max(Math.max(Math.max(d.x, k.x), f.x), c.x) - b.x;
        b.height = Math.max(Math.max(Math.max(d.y, k.y), f.y), c.y) - b.y
    }
    return b
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var e = a.length, b, c; 0 < e; )
        c = Math.floor(Math.random() * e),
        e--,
        b = a[e],
        a[e] = a[c],
        a[c] = b;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
        case "touchstart":
            this.onTouchStart(a);
            break;
        case "touchmove":
            this.onTouchMove(a);
            break;
        case "touchend":
            this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", !0, !0);
            a.dispatchEvent(e)
        }
    }
};
(function() {
    function a(b) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in c ? document.body.className = c[b.type] : (document.body.className = this[e] ? "hidden" : "visible",
        "hidden" === document.body.className ? (s_oMain.stopUpdate(),
        s_bFocus = !1) : (s_oMain.startUpdate(),
        s_bFocus = !0))
    }
    var e = "hidden";
    e in document ? document.addEventListener("visibilitychange", a) : (e = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (e = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (e = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var e = window.location.search.substring(1).split("&"), b = 0; b < e.length; b++) {
        var c = e[b].split("=");
        if (c[0] == a)
            return c[1]
    }
}
String.prototype.format = function() {
    for (var a = this, e = arguments.length; e--; )
        a = a.replace(new RegExp("\\{" + e + "\\}","gm"), arguments[e]);
    return a
}
;
function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen,
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled)
    screenfull.on("change", function() {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut()
    });
function CSpriteLibrary() {
    var a = {}, e, b, c, d, f, k;
    this.init = function(g, p, m) {
        e = {};
        c = b = 0;
        d = g;
        f = p;
        k = m
    }
    ;
    this.addSprite = function(g, p) {
        if (!a.hasOwnProperty(g)) {
            var m = new Image;
            a[g] = e[g] = {
                szPath: p,
                oSprite: m,
                bLoaded: !1
            };
            b++
        }
    }
    ;
    this.getSprite = function(g) {
        return a.hasOwnProperty(g) ? a[g].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        b = 0;
        f.call(k)
    }
    ;
    this._onSpriteLoaded = function() {
        d.call(k);
        ++c === b && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var g in e)
            e[g].oSprite.oSpriteLibrary = this,
            e[g].oSprite.szKey = g,
            e[g].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            e[g].oSprite.onerror = function(p) {
                var m = p.currentTarget;
                setTimeout(function() {
                    e[m.szKey].oSprite.src = e[m.szKey].szPath
                }, 500)
            }
            ,
            e[g].oSprite.src = e[g].szPath
    }
    ;
    this.setLoaded = function(g) {
        a[g].bLoaded = !0
    }
    ;
    this.isLoaded = function(g) {
        return a[g].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 768, CANVAS_HEIGHT = 1280, CANVAS_WIDTH_HALF = CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF = CANVAS_HEIGHT / 2, EDGEBOARD_X = 100, EDGEBOARD_Y = 140, GAME_NAME = "pinball", PRIMARY_FONT = "walibi0615bold", PRIMARY_FONT_COLOUR = "#fff600", SOUNDTRACK_VOLUME_IN_GAME = .1, FPS = 60, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, ON_EXIT_HELP = 6, WHEEL_STATE_IDLE = 0, WHEEL_STATE_SPINNING = 1, WHEEL_STATE_SHOW_WIN = 2, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, ON_REEL_ARRIVED = 0, ON_REEL_STOP = 1, ON_WHEEL_READY_TO_SPIN = 0, ON_WHEEL_STOP = 1, ON_WHEEL_CLOSED = 2, ON_WHEEL_WIN = 3, ON_SENSOR_BASKET = 0, ON_SENSOR_BONUS = 1, ON_CONTROLLER = 0, CONTACT_BEGIN = 0, CONTACT_END = 1, CONTACT_PRESOLVE = 2, CONTACT_POSTSOLVE = 3, SETTINGS_HEIGHT = 240, TODEGREE_PROPORTION = 180 / Math.PI, ZOOM_TABLE_SIZE = {
    w: 1,
    h: 1
}, BALL_OUT_SAFE_LIMIT = 40, DEBUG_BOX2D = !1, DEBUG_BOX2D_ALPHA = .8, WORLD_SCALE = 100, GRAVITY = 13.6, GENERAL_RESTITUTION = .3, GENERAL_FRICTION = .7, ZOOM = 1, ZOOM_PER_WORLDSCALE = ZOOM * WORLD_SCALE, BALL_STARTPOS_GAME = {
    x: 115 - CANVAS_WIDTH / 2,
    y: 308 - CANVAS_HEIGHT / 2
}, BALL_STARTPOS_WORLD = {
    x: BALL_STARTPOS_GAME.x / WORLD_SCALE,
    y: BALL_STARTPOS_GAME.y / WORLD_SCALE
}, BALL_RADIUS = 10, LERP_SLOW = {
    x: .01,
    y: .01
}, LERP_FOLLOW_BALL = {
    x: .05,
    y: .15
}, ALLOW_BET_WHILEPLAYING = !0, BALL_SPAWN_TIMER = 400, BALL_POOL_DIM = 20, START_CREDITS, BALLS_PER_BET, BET, WIN_PERCENTAGE, PAYTABLE, BANK, SYMBOL_WIDTH = 78, SYMBOL_HEIGHT = 97, NUM_SYMBOLS = 3, SPACE_BETWEEN_SYMBOLS = 26, SPACE_HEIGHT_BETWEEN_SYMBOLS = 0, SCALE_SYMBOL = 1, NUM_ROWS = 1, NUM_REELS = 3, REEL_OFFSET_X = -144, REEL_OFFSET_Y = -12, REEL_DELAY = 20, MAX_FRAMES_REEL_EASE = 7, OFFSET_LIMIT_Y = 0, REEL_START_Y = REEL_OFFSET_Y - (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS, REEL_ARRIVAL_Y = REEL_OFFSET_Y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_LIMIT_Y, MIN_REEL_LOOPS = 4, ANIM_WIN_LOOPS = 4, WHEEL_WINNING_COMBO = [[0, 0, 0], [1, 1, 1], [2, 2, 2]], ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, TEXT_PRELOADER_CONTINUE = "START", TEXT_CURRENCY = "$", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_PAUSE = "PAUSE", TEXT_GAMEOVER = "YOU RUN OUT OF MONEY, WANT TO RECHARGE?", TEXT_BALLS_TO_PLAY = "YOU STILL HAVE SOME BALLS TO PLAY", TEXT_HELP1 = "LAUNCH A BALL IN ONE OF THE LUCKY HOLES TO GET THE CHANCE TO ENTER THE BONUS GAME", TEXT_HELP2 = "IN THE BONUS GAME, MATCH 3 IDENTICAL SYMBOLS TO GET A PRIZE", TEXT_PAYTABLE = "PAYTABLE", TEXT_DEVELOPED = "DEVELOPED BY", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better";
function CPreloader() {
    var a, e, b, c, d, f, k, g, p;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        p = new createjs.Container;
        s_oStage.addChild(p)
    }
    ;
    this.unload = function() {
        p.removeAllChildren()
    }
    ;
    this._onImagesLoaded = function() {}
    ;
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    }
    ;
    this.attachSprites = function() {
        var m = new createjs.Shape;
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.addChild(m);
        m = s_oSpriteLibrary.getSprite("200x200");
        k = createBitmap(m);
        k.regX = .5 * m.width;
        k.regY = .5 * m.height;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 180;
        p.addChild(k);
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
        p.addChild(g);
        k.mask = g;
        m = s_oSpriteLibrary.getSprite("progress_bar");
        c = createBitmap(m);
        c.x = CANVAS_WIDTH / 2 - m.width / 2;
        c.y = CANVAS_HEIGHT / 2 + 50;
        p.addChild(c);
        a = m.width;
        e = m.height;
        d = new createjs.Shape;
        d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, 1, e);
        p.addChild(d);
        c.mask = d;
        b = new createjs.Text("","30px " + PRIMARY_FONT,PRIMARY_FONT_COLOUR);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        p.addChild(b);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.addChild(f);
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(f);
            p.removeChild(f)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(m) {
        b.text = m + "%";
        100 === m && (s_oMain._onRemovePreloader(),
        b.visible = !1,
        c.visible = !1);
        d.graphics.clear();
        m = Math.floor(m * a / 100);
        d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, m, e)
    }
    ;
    this._init()
}
function CMain(a) {
    var e, b = 0, c = 0, d = STATE_LOADING, f, k;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && (s_oStage.enableMouseOver(FPS),
        $("body").on("contextmenu", "#canvas", function(p) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        f = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        e = !0
    }
    ;
    this.soundLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / c * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_on_pin",
            loop: !1,
            volume: 1,
            ingamename: "ball_on_pin"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_in_bonus",
            loop: !1,
            volume: 1,
            ingamename: "ball_in_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_in_recover",
            loop: !1,
            volume: 1,
            ingamename: "ball_in_recover"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "good_luck",
            loop: !1,
            volume: 1,
            ingamename: "good_luck"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "launch",
            loop: !1,
            volume: 1,
            ingamename: "launch"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_on_nose",
            loop: !1,
            volume: 1,
            ingamename: "ball_on_nose"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_win",
            loop: !1,
            volume: 1,
            ingamename: "bonus_win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "exultation_1",
            loop: !1,
            volume: 1,
            ingamename: "exultation_1"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "exultation_2",
            loop: !1,
            volume: 1,
            ingamename: "exultation_2"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "exultation_3",
            loop: !1,
            volume: 1,
            ingamename: "exultation_3"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "exultation_4",
            loop: !1,
            volume: 1,
            ingamename: "exultation_4"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "well_done",
            loop: !1,
            volume: 1,
            ingamename: "well_done"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reels",
            loop: !1,
            volume: 1,
            ingamename: "reels"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reels_stop",
            loop: !1,
            volume: 1,
            ingamename: "reels_stop"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "platform_turn",
            loop: !1,
            volume: 1,
            ingamename: "platform_turn"
        });
        c += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var p = 0; p < s_aSoundsInfo.length; p++)
            this.tryToLoadSound(s_aSoundsInfo[p], !1)
    }
    ;
    this.tryToLoadSound = function(p, m) {
        setTimeout(function() {
            s_aSounds[p.ingamename] = new Howl({
                src: [p.path + p.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: p.loop,
                volume: p.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(l, n) {
                    for (var h = 0; h < s_aSoundsInfo.length; h++)
                        if (l === s_aSounds[s_aSoundsInfo[h].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[h], !0);
                            break
                        }
                },
                onplayerror: function(l) {
                    for (var n = 0; n < s_aSoundsInfo.length; n++)
                        if (l === s_aSounds[s_aSoundsInfo[n].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[n].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[n].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[n].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, m ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        for (var p = 0; 4 > p; p++)
            s_oSpriteLibrary.addSprite("bg_menu_anim_" + p, "./sprites/menu/bg_menu_anim/bg_menu_anim_" + p + ".jpg");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/menu/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_big", "./sprites/msg_box_big.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_next", "./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("but_prev", "./sprites/but_prev.png");
        s_oSpriteLibrary.addSprite("help_holes", "./sprites/help_holes.png");
        s_oSpriteLibrary.addSprite("bottom_panel", "./sprites/bottom_panel.png");
        s_oSpriteLibrary.addSprite("hand_anim", "./sprites/hand_anim.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/menu/bg_menu.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("ear_mask", "./sprites/ear_mask.png");
        s_oSpriteLibrary.addSprite("bg_cat", "./sprites/bg_cat.png");
        s_oSpriteLibrary.addSprite("holes_mask_ground", "./sprites/holes_mask_ground.png");
        s_oSpriteLibrary.addSprite("holes_mask", "./sprites/holes_mask.png");
        s_oSpriteLibrary.addSprite("but_buy", "./sprites/but_buy.png");
        s_oSpriteLibrary.addSprite("power_level", "./sprites/power_level.png");
        s_oSpriteLibrary.addSprite("power_bg", "./sprites/power_bg.png");
        s_oSpriteLibrary.addSprite("pin", "./sprites/pin.png");
        s_oSpriteLibrary.addSprite("pin_nose", "./sprites/pin_nose.png");
        s_oSpriteLibrary.addSprite("arrow_start", "./sprites/arrow_start.png");
        s_oSpriteLibrary.addSprite("controller", "./sprites/controller.png");
        s_oSpriteLibrary.addSprite("bg_reels", "./sprites/bonus/bg_reels.jpg");
        s_oSpriteLibrary.addSprite("head", "./sprites/bonus/head.png");
        s_oSpriteLibrary.addSprite("arm", "./sprites/bonus/arm.png");
        s_oSpriteLibrary.addSprite("bonus_ball_counter", "./sprites/bonus/bonus_ball_counter.png");
        s_oSpriteLibrary.addSprite("wall_platform_mask", "./sprites/bonus/wall_platform_mask.png");
        for (p = 0; 50 > p; p++)
            s_oSpriteLibrary.addSprite("bonus_platform_" + p, "./sprites/bonus/platform/bonus_platform_" + p + ".png");
        for (p = 0; 3 > p; p++)
            s_oSpriteLibrary.addSprite("symbol_" + p, "./sprites/bonus/symbols/symbol_" + p + ".jpg"),
            s_oSpriteLibrary.addSprite("symbol_" + p + "_anim", "./sprites/bonus/symbols/symbol_" + p + "_anim.jpg");
        for (p = 0; 3 > p; p++)
            s_oSpriteLibrary.addSprite("arrow_top_" + p, "./sprites/arrow_top_" + p + ".png"),
            s_oSpriteLibrary.addSprite("arrow_down_" + p, "./sprites/arrow_down_" + p + ".png");
        s_oSpriteLibrary.addSprite("arrow_down_3", "./sprites/arrow_down_3.png");
        s_oSpriteLibrary.addSprite("pachinko_text", "./sprites/pachinko_text.png");
        s_oSpriteLibrary.addSprite("bonus_text", "./sprites/bonus_text.png");
        c += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / c * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this._onRemovePreloader = function() {
        f.unload();
        new CSymbolsSettings;
        s_oTweenController = new CTweenController;
        s_oSoundtrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        d = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        k = new CGame(g);
        d = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        d = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        e = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        Howler.mute(!0)
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        e = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && Howler.mute(!1)
    }
    ;
    this._update = function(p) {
        if (!1 !== e) {
            var m = (new Date).getTime();
            s_iTimeElaps = m - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = m;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            d === STATE_GAME && k.update();
            s_oStage.update(p)
        }
    }
    ;
    s_oMain = this;
    var g = a;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    SHOW_CREDITS = a.show_credits;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_bFullscreen = !1, s_aSounds = [], s_aSoundsInfo = [], s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundtrack, s_oCanvas, s_oLocalStorage, s_oTweenController;
function CTextButton(a, e, b, c, d, f, k, g, p) {
    var m = 1, l, n = !1, h, q, r = [], u, v, x, t;
    this._init = function(y, G, z, H, I, A, P, R, D) {
        l = !1;
        h = [];
        q = [];
        t = createBitmap(z);
        t.regX = z.width / 2;
        t.regY = z.height / 2;
        u = new createjs.Container;
        u.x = y;
        u.y = G;
        u.cursor = "pointer";
        y = z.width - 44;
        R || (y = z.width / 2 - 20,
        R = new createjs.SpriteSheet({
            images: [z],
            frames: {
                width: z.width / 2,
                height: z.height,
                regX: z.width / 2 / 2,
                regY: z.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        }),
        t = createSprite(R, "state_false", z.width / 2 / 2, z.height / 2, z.width / 2, z.height),
        u.regX = 0,
        u.regY = 0);
        u.addChild(t);
        z = z.height - 20;
        x = new CTLText(u,-(y / 2) + 2,-4 - z / 2 + 2,y,z,P,"center","#000",I,1,4,0,H,!0,!0,!1,!1);
        v = new CTLText(u,-(y / 2),-4 - z / 2,y,z,P,"center",A,I,1,4,0,H,!0,!0,!1,!1);
        D.addChild(u);
        this._initListener()
    }
    ;
    this.unload = function() {
        u.removeAllEventListeners();
        p.removeChild(u)
    }
    ;
    this.setVisible = function(y) {
        u.visible = y
    }
    ;
    this._initListener = function() {
        u.on("mousedown", this.buttonDown);
        u.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(y, G, z, H) {
        h[y] = G;
        q[y] = z;
        r = H
    }
    ;
    this.buttonRelease = function() {
        l || n || (playSound("click", 1, !1),
        u.scaleX = 1 * m,
        u.scaleY = 1 * m,
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(q[ON_MOUSE_UP], r))
    }
    ;
    this.buttonDown = function() {
        l || n || (u.scaleX = .9 * m,
        u.scaleY = .9 * m,
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN], r))
    }
    ;
    this.setClickable = function(y) {
        l = !y;
        y || (u.cursor = "arrow")
    }
    ;
    this.desaturate = function() {
        u.cursor = "default";
        g || t.gotoAndStop("state_false")
    }
    ;
    this.enable = function() {
        l = !1;
        u.cursor = "pointer";
        g || t.gotoAndStop("state_true")
    }
    ;
    this.disable = function() {
        l = !0;
        u.cursor = "default";
        g || t.gotoAndStop("state_false")
    }
    ;
    this.toggle = function() {
        l = !l;
        g || (l ? t.gotoAndStop("state_false") : t.gotoAndStop("state_true"))
    }
    ;
    this.removeShadow = function() {
        x.setAlpha(0)
    }
    ;
    this.setTextPosition = function(y, G) {}
    ;
    this.setTextX = function(y) {
        x.setX(y + 2);
        v.setX(y)
    }
    ;
    this.setTextY = function(y) {
        x.setY(y + 2);
        v.setY(y)
    }
    ;
    this.setText = function(y) {
        v.refreshText(y);
        x.refreshText(y)
    }
    ;
    this.setPosition = function(y, G) {
        u.x = y;
        u.y = G
    }
    ;
    this.setX = function(y) {
        u.x = y
    }
    ;
    this.setY = function(y) {
        u.y = y
    }
    ;
    this.getButtonImage = function() {
        return t
    }
    ;
    this.getX = function() {
        return u.x
    }
    ;
    this.getY = function() {
        return u.y
    }
    ;
    this.block = function(y) {
        n = y
    }
    ;
    this.setScale = function(y) {
        m = y;
        u.scaleX = y;
        u.scaleY = y
    }
    ;
    this.setScaleX = function(y) {
        t.scaleX = y
    }
    ;
    this._init(a, e, b, c, d, f, k, g, p);
    return this
}
function CToggle(a, e, b, c, d) {
    var f, k, g, p, m, l, n;
    this._init = function(h, q, r, u, v) {
        m = [];
        l = [];
        var x = new createjs.SpriteSheet({
            images: [r],
            frames: {
                width: r.width / 2,
                height: r.height,
                regX: r.width / 2 / 2,
                regY: r.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = u;
        n = createSprite(x, "state_" + f, r.width / 2 / 2, r.height / 2, r.width / 2, r.height);
        n.x = h;
        n.y = q;
        n.stop();
        v.addChild(n);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? n.off("mousedown", k) : (n.off("mousedown", k),
        n.off("mouseover", p));
        n.off("pressup", g);
        d.removeChild(n)
    }
    ;
    this._initListener = function() {
        s_bMobile ? k = n.on("mousedown", this.buttonDown) : (k = n.on("mousedown", this.buttonDown),
        p = n.on("mouseover", this.buttonOver));
        g = n.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(h, q, r) {
        m[h] = q;
        l[h] = r
    }
    ;
    this.addText = function() {}
    ;
    this.setActive = function(h) {
        f = h;
        n.gotoAndStop("state_" + f)
    }
    ;
    this.buttonRelease = function() {
        n.scaleX = 1;
        n.scaleY = 1;
        playSound("click", 1, !1);
        f = !f;
        n.gotoAndStop("state_" + f);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(l[ON_MOUSE_UP], f)
    }
    ;
    this.buttonDown = function() {
        n.scaleX = .9;
        n.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
    }
    ;
    this.buttonOver = function(h) {
        s_bMobile || (h.target.cursor = "pointer")
    }
    ;
    this.setPosition = function(h, q) {
        n.x = h;
        n.y = q
    }
    ;
    this.getButtonImage = function() {
        return n
    }
    ;
    this._init(a, e, b, c, d)
}
function CGfxButton(a, e, b, c) {
    var d, f, k, g, p, m, l, n = [], h;
    this._init = function(r, u, v, x) {
        d = !1;
        f = 1;
        m = [];
        l = [];
        h = createBitmap(v);
        h.x = r;
        h.y = u;
        h.scaleX = h.scaleY = f;
        h.regX = v.width / 2;
        h.regY = v.height / 2;
        x.addChild(h);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? h.off("mousedown", k) : (h.off("mousedown", k),
        h.off("mouseover", p));
        h.off("pressup", g);
        c.removeChild(h)
    }
    ;
    this.setVisible = function(r) {
        h.visible = r
    }
    ;
    this.setClickable = function(r) {
        d = !r
    }
    ;
    this._initListener = function() {
        s_bMobile ? k = h.on("mousedown", this.buttonDown) : (k = h.on("mousedown", this.buttonDown),
        p = h.on("mouseover", this.buttonOver));
        g = h.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(r, u, v) {
        m[r] = u;
        l[r] = v
    }
    ;
    this.addEventListenerWithParams = function(r, u, v, x) {
        m[r] = u;
        l[r] = v;
        n = x
    }
    ;
    this.buttonRelease = function() {
        d || (h.scaleX = f,
        h.scaleY = f,
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(l[ON_MOUSE_UP], n))
    }
    ;
    this.buttonDown = function() {
        d || (h.scaleX = .9 * f,
        h.scaleY = .9 * f,
        playSound("click", 1, !1),
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], n))
    }
    ;
    this.buttonOver = function(r) {
        s_bMobile || d || (r.target.cursor = "pointer")
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(h).to({
            scaleX: 1.1 * f,
            scaleY: 1.1 * f
        }, 850, createjs.Ease.quadOut).to({
            scaleX: f,
            scaleY: f
        }, 650, createjs.Ease.quadIn).call(function() {
            q.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(h).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            q.trebleAnimation()
        })
    }
    ;
    this.setPosition = function(r, u) {
        h.x = r;
        h.y = u
    }
    ;
    this.setX = function(r) {
        h.x = r
    }
    ;
    this.setY = function(r) {
        h.y = r
    }
    ;
    this.getButtonImage = function() {
        return h
    }
    ;
    this.getX = function() {
        return h.x
    }
    ;
    this.getY = function() {
        return h.y
    }
    ;
    var q = this;
    this._init(a, e, b, c);
    return this
}
function CMenu() {
    var a, e, b, c, d, f, k, g, p, m, l, n, h = null, q = null;
    this._init = function() {
        for (var r = [], u = 0; 4 > u; u++)
            r.push(s_oSpriteLibrary.getSprite("bg_menu_anim_" + u));
        u = r[0].width;
        var v = r[0].height;
        r = new createjs.SpriteSheet({
            framerate: 4,
            images: r,
            frames: {
                width: u,
                height: v,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 3]
            }
        });
        r = createSprite(r, "idle", 0, 0, u, v);
        s_oStage.addChild(r);
        r = [];
        for (u = 0; 4 > u; u++)
            r.push(s_oSpriteLibrary.getSprite("logo_menu_" + u));
        r = s_oSpriteLibrary.getSprite("logo_menu");
        (new CLightIndicator(r,CANVAS_WIDTH / 2,350,s_oStage,0,0)).highlight2(1500);
        r = s_oSpriteLibrary.getSprite("bg_menu");
        k = createBitmap(r);
        k.regY = r.height;
        k.y = CANVAS_HEIGHT;
        s_oStage.addChild(k);
        r = s_oSpriteLibrary.getSprite("but_play");
        g = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 300,r,s_oStage);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            r = s_oSpriteLibrary.getSprite("audio_icon"),
            b = CANVAS_WIDTH - r.width / 4 - 10,
            c = r.height / 2 + 10,
            m = new CToggle(b,c,r,s_bAudioActive,s_oStage),
            m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (r = s_oSpriteLibrary.getSprite("but_credits"),
        d = r.width / 2 + 10,
        f = r.height / 2 + 10,
        l = new CGfxButton(d,f,r,s_oStage),
        l.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this),
        a = d + r.width + 10,
        e = f) : (r = s_oSpriteLibrary.getSprite("but_fullscreen"),
        a = 10 + r.width / 4,
        e = r.height / 2 + 10);
        r = window.document;
        u = r.documentElement;
        h = u.requestFullscreen || u.mozRequestFullScreen || u.webkitRequestFullScreen || u.msRequestFullscreen;
        q = r.exitFullscreen || r.mozCancelFullScreen || r.webkitExitFullscreen || r.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (h = !1);
        h && screenfull.isEnabled && (r = s_oSpriteLibrary.getSprite("but_fullscreen"),
        n = new CToggle(a,e,r,s_bFullscreen,s_oStage),
        n.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        p = new createjs.Shape;
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(p);
        createjs.Tween.get(p).to({
            alpha: 0
        }, 1E3).call(function() {
            p.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        g.unload();
        g = null;
        p.visible = !1;
        SHOW_CREDITS && l.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            m.unload(),
            m = null;
        h && screenfull.isEnabled && n.unload();
        s_oStage.removeAllChildren();
        s_oMenu = k = null
    }
    ;
    this.refreshButtonPos = function(r, u) {
        SHOW_CREDITS && l.setPosition(d + r, u + f);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || m.setPosition(b - r, u + c);
        h && screenfull.isEnabled && n.setPosition(a + r, e + u)
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onCreditsBut = function() {
        new CCreditsPanel
    }
    ;
    this.resetFullscreenBut = function() {
        h && screenfull.isEnabled && n.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? q.call(window.document) : h.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var e, b, c, d, f, k = 0, g = 0, p, m, l, n, h, q = null, r, u, v, x, t, y, G, z, H, I, A, P;
    this._init = function() {
        c = b = e = !1;
        n = d = 0;
        p = START_CREDITS;
        m = BANK;
        l = Math.max.apply(null, PAYTABLE);
        new CPhysicsController;
        new CObjectBuilder;
        t = new createjs.Container;
        t.scaleX = t.scaleY = ZOOM;
        t.x = CANVAS_WIDTH / 2;
        t.y = CANVAS_HEIGHT / 2 - 85;
        s_oStage.addChild(t);
        y = new createjs.Container;
        t.addChild(y);
        G = new createjs.Container;
        t.addChild(G);
        z = new createjs.Container;
        t.addChild(z);
        var D = s_oSpriteLibrary.getSprite("bg_game")
          , E = createBitmap(D);
        E.regX = D.width / 2;
        E.regY = D.height / 2;
        y.addChild(E);
        v = new CTable(y,z);
        v.addEventListener(ON_SENSOR_BASKET, this._onSaveBall, this);
        v.addEventListener(ON_SENSOR_BONUS, this._onEnterBonusBall, this);
        D = s_oSpriteLibrary.getSprite("pachinko_text");
        P = new CLightIndicator(D,-80,-480,z,0,0);
        P.lit(!0);
        I = new CBonusPlatform(0,40,z);
        I.addEventListener(ON_WHEEL_READY_TO_SPIN, this._onWheelReadyToSpin, this);
        I.addEventListener(ON_WHEEL_STOP, this._onWheelStop, this);
        I.addEventListener(ON_WHEEL_CLOSED, this._onWheelClosed, this);
        I.addEventListener(ON_WHEEL_WIN, this._onWheelWin, this);
        A = new CBallsPool(G);
        A.getCurBall().SetPosition(BALL_STARTPOS_WORLD);
        A.setCurBallVisible();
        H = {
            x: t.x,
            y: t.y
        };
        h = new CInterface(z);
        h.refreshCredits(START_CREDITS);
        r = new CHelpPanel(s_oStage);
        r.addEventListener(ON_EXIT_HELP, this._onExitHelp, this);
        r.show();
        q = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        u = new CMsgBox;
        e = !0
    }
    ;
    this.unload = function() {
        e = !1;
        h.unload();
        q.unload();
        r.unload();
        u.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oPhysicsController.unload()
    }
    ;
    this.refreshPos = function() {
        ZOOM = zoomInCamera(t, CANVAS_WIDTH - 2 * s_iOffsetX, CANVAS_HEIGHT - 2 * s_iOffsetY - 150, 670, 1080);
        var D = linearFunction(s_iOffsetX, 0, 100, -480, -480 - s_iOffsetX);
        -540 > D && (D = -540);
        var E = linearFunction(s_iOffsetX, 0, 100, .6, 1);
        P.setPos(-80, D);
        P.scale(E)
    }
    ;
    this.onControllerChanged = function(D) {
        d = D;
        0 === d && (b = !1)
    }
    ;
    this._onWheelReadyToSpin = function() {
        0 < g ? R.spinWheel() : I.deactivate()
    }
    ;
    this._onWheelStop = function() {}
    ;
    this._onWheelWin = function(D) {
        P.longFlashing();
        D = PAYTABLE[D];
        p += D;
        m -= D;
        $(s_oMain).trigger("save_score", p);
        h.refreshCredits(p);
        h.winAnimation(D)
    }
    ;
    this._onWheelClosed = function() {
        0 < g && I.activate()
    }
    ;
    this.spinWheel = function() {
        var D = WIN_PERCENTAGE / 100;
        m < l && (D = 0);
        D = Math.random() < D ? this._generateWinCombo() : this._generateLoseCombo();
        g--;
        I.setNumBalls(g);
        I.spin(D)
    }
    ;
    this._generateLoseCombo = function() {
        var D = [];
        do
            for (var E = 0; E < NUM_REELS; E++)
                D[E] = Math.floor(Math.random() * NUM_SYMBOLS);
        while (this._isAWinningCombo(D));
        return D
    }
    ;
    this._generateWinCombo = function() {
        return WHEEL_WINNING_COMBO[Math.floor(Math.random() * WHEEL_WINNING_COMBO.length)]
    }
    ;
    this._isAWinningCombo = function(D) {
        for (var E = 0; E < WHEEL_WINNING_COMBO.length; E++)
            if (arraysEqual(WHEEL_WINNING_COMBO[E], D))
                return !0;
        return !1
    }
    ;
    this.moveBall = function(D) {
        D = {
            x: D.localX / WORLD_SCALE,
            y: D.localY / WORLD_SCALE
        };
        x = A.getCurBall();
        x.SetLinearVelocity({
            x: 0,
            y: 0
        });
        x.SetAngularVelocity(0);
        x.SetPosition(D);
        A.setCurBallVisible()
    }
    ;
    this.releaseBall = function() {
        x.SetActive(!0);
        x = A.setNextBall()
    }
    ;
    this.ballInGame = function(D) {
        b = D
    }
    ;
    this.restartGame = function() {
        e = !0;
        $(s_oMain).trigger("recharge")
    }
    ;
    this._onEnterBonusBall = function(D) {
        A.resetBall(D);
        g++;
        I.setNumBalls(g);
        I.activate()
    }
    ;
    this._onSaveBall = function(D) {
        A.resetBall(D);
        n++;
        h.increaseBallRemaining(n);
        k++
    }
    ;
    this.buyBalls = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        !ALLOW_BET_WHILEPLAYING && 0 < n ? u.show(TEXT_BALLS_TO_PLAY) : p >= BET ? ($(s_oMain).trigger("bet_placed", BET),
        n += BALLS_PER_BET,
        p -= BET,
        m += BET,
        h.refreshBallRemaining(n),
        h.refreshCredits(p)) : 0 === n ? this.gameOver() : ALLOW_BET_WHILEPLAYING && u.show(TEXT_BALLS_TO_PLAY)
    }
    ;
    this.addMoney = function(D) {
        p += D;
        h.refreshCredits(p);
        h.refreshBallRemaining(n)
    }
    ;
    this.getBall = function() {
        return x
    }
    ;
    this.getBallRemaining = function() {
        return n
    }
    ;
    this.onExit = function() {
        $(s_oMain).trigger("end_session");
        s_oGame.unload();
        s_oMain.gotoMenu();
        setVolume("soundtrack", 1)
    }
    ;
    this.showHelp = function() {
        r.show()
    }
    ;
    this._onExitHelp = function() {
        P.slowOff(1500, 0);
        playSound("good_luck", 1, !1);
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
    }
    ;
    this.onExitFromEndPanel = function(D) {
        q.hide();
        D ? s_oGame.restartGame() : h.refreshBallRemaining(n)
    }
    ;
    this.gameOver = function() {
        q.show()
    }
    ;
    this.onPause = function() {
        e = !1;
        I.pause(!0);
        h.pause(!0)
    }
    ;
    this.onResume = function() {
        e = !0;
        I.pause(!1);
        h.pause(!1)
    }
    ;
    this._onCannonUsing = function() {
        b ? (c || (c = !0,
        s_oTable.arrowsLaunchAnimation()),
        0 === n && (b = !1)) : c && (c = !1,
        s_oTable.arrowsIdleAnimation())
    }
    ;
    this._launchABall = function() {
        playSound("launch", 1, !1);
        n--;
        h.refreshBallRemaining(n);
        var D = A.getCurBall();
        A.setCurBallInForeground();
        D.SetAngularVelocity(0);
        D.SetPosition(BALL_STARTPOS_WORLD);
        D.SetActive(!0);
        var E = new CVector2(1,-1)
          , T = 6 * d;
        2 > T && (T = linearFunction(T, 0, 2, 45, 0),
        T = degreesToRadians(T),
        rotateVector2D(T, E),
        T = 2);
        var W = degreesToRadians(-10 + 20 * Math.random());
        rotateVector2D(W, E);
        E.scalarProduct(T);
        D.SetLinearVelocity({
            x: E.getX(),
            y: E.getY()
        })
    }
    ;
    this._ballSpawnControl = function() {
        f -= s_iTimeElaps;
        0 > f && 0 < n && (b = !0,
        f = BALL_SPAWN_TIMER,
        this._launchABall(),
        A.prepareNextBall())
    }
    ;
    this.update = function() {
        e && (0 < d ? this._ballSpawnControl() : f = BALL_SPAWN_TIMER,
        A.update(),
        s_oPhysicsController.update(H),
        I.update(),
        this._onCannonUsing())
    }
    ;
    WIN_PERCENTAGE = a.win_occurrence;
    START_CREDITS = a.start_credits;
    BALLS_PER_BET = a.balls_per_bet;
    BET = a.bet;
    PAYTABLE = a.paytable;
    s_oGame = this;
    var R = this;
    this._init()
}
var s_oGame;
function CInterface(a) {
    var e, b, c, d, f, k, g, p, m, l, n, h, q, r = null, u = null;
    this._init = function(v) {
        var x = s_oSpriteLibrary.getSprite("but_exit");
        f = CANVAS_WIDTH - x.width / 2 - 10;
        k = x.height / 2 + 10;
        p = new CGfxButton(f,k,x,s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onExit, this);
        c = v = f - x.width - 10;
        d = x.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            x = s_oSpriteLibrary.getSprite("audio_icon"),
            g = new CToggle(c,d,x,s_bAudioActive,s_oStage),
            g.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            v = c - x.width / 2 - 10;
        m = new CGfxButton(0,0,s_oSpriteLibrary.getSprite("but_info"),s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onHelp, this);
        x = window.document;
        var t = x.documentElement;
        r = t.requestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullScreen || t.msRequestFullscreen;
        u = x.exitFullscreen || x.mozCancelFullScreen || x.webkitExitFullscreen || x.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (r = !1);
        r && screenfull.isEnabled && (x = s_oSpriteLibrary.getSprite("but_fullscreen"),
        e = v - 10,
        b = x.height / 2 + 10,
        l = new CToggle(e,b,x,s_bFullscreen,s_oStage),
        l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        q = new CBottomBar(CANVAS_WIDTH / 2,CANVAS_HEIGHT,s_oStage);
        n = new CPausePanel(s_oStage);
        x = s_oSpriteLibrary.getSprite("but_settings");
        h = new CGUIExpandible(f,k,x,s_oStage);
        h.addButton(p);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.addButton(g);
        r && screenfull.isEnabled && h.addButton(l);
        h.addButton(m);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            g.unload(),
            g = null;
        r && screenfull.isEnabled && l.unload();
        h.unload();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(v, x) {
        h.refreshPos(v, x);
        q.refreshPos();
        s_oGame.refreshPos()
    }
    ;
    this.pause = function(v) {
        v ? n.show() : n.hide()
    }
    ;
    this.refreshCredits = function(v) {
        q.refreshCredits(v)
    }
    ;
    this.winAnimation = function(v) {
        q.winAnim(v)
    }
    ;
    this.refreshBallRemaining = function(v) {
        q.refreshBallRemaining(v)
    }
    ;
    this.increaseBallRemaining = function(v) {
        this.refreshBallRemaining(v);
        q.ballRemainingIncreaseAnim()
    }
    ;
    this._onHelp = function() {
        s_oGame.showHelp()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        new CAreYouSurePanel(s_oGame.onExit)
    }
    ;
    this.resetFullscreenBut = function() {
        r && screenfull.isEnabled && l.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? u.call(window.document) : r.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oInterface = this;
    this._init(a);
    return this
}
var s_oInterface = null;
function CHelpPanel(a) {
    var e, b, c, d, f, k, g, p, m, l, n, h, q;
    this._init = function(u) {
        c = [];
        d = [];
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        p = f.on("mousedown", function() {
            r.hide()
        });
        u.addChild(f);
        k = new createjs.Container;
        g = k.on("mousedown", function() {
            r.hide()
        });
        u.addChild(k);
        var v = s_oSpriteLibrary.getSprite("msg_box_big")
          , x = createBitmap(v);
        x.regX = v.width / 2;
        x.regY = v.height / 2;
        k.addChild(x);
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT + v.height / 2;
        e = k.y;
        m = new createjs.Container;
        m.x = k.x;
        m.y = k.y;
        u.addChild(m);
        h = new CGfxButton(200,400,s_oSpriteLibrary.getSprite("but_next"),m);
        h.addEventListener(ON_MOUSE_UP, this._onPag2, this);
        q = new CGfxButton(-200,400,s_oSpriteLibrary.getSprite("but_prev"),m);
        q.addEventListener(ON_MOUSE_UP, this._onPag1, this);
        l = new createjs.Container;
        k.addChild(l);
        var t = 500
          , y = 100;
        new CTLText(l,-(t / 2),-210 - y / 2,t,y,40,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1.2,2,2,TEXT_HELP1,!0,!0,!0,!1);
        v = s_oSpriteLibrary.getSprite("help_holes");
        u = createBitmap(v);
        u.regX = v.width / 2;
        u.regY = v.height / 2;
        u.y = -90;
        l.addChild(u);
        t = 500;
        y = 100;
        new CTLText(l,-(t / 2),110 - y / 2,t,y,40,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1.2,2,2,TEXT_HELP2,!0,!0,!0,!1);
        v = 100;
        for (u = 0; 3 > u; u++) {
            var G = createSprite(s_aSymbolData[0]);
            G.regX = SYMBOL_WIDTH / 2;
            G.x = -v + u * v;
            G.y = 180;
            l.addChild(G)
        }
        n = new createjs.Container;
        k.addChild(n);
        t = 500;
        y = 50;
        new CTLText(n,-(t / 2),-210 - y / 2,t,y,40,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1,2,2,TEXT_PAYTABLE,!0,!0,!1,!1);
        v = 1 * (SYMBOL_WIDTH + 2);
        x = 1 * (SYMBOL_HEIGHT + 16);
        for (u = 0; u < NUM_SYMBOLS; u++) {
            var z = 10 - x + u * x;
            for (t = 0; 3 > t; t++)
                G = createSprite(s_aSymbolData[u]),
                G.regX = SYMBOL_WIDTH / 2,
                G.x = -100 - v + t * v,
                G.y = z,
                G.scaleX = G.scaleY = 1,
                n.addChild(G);
            t = 150;
            y = 50;
            var H = G.x + 120;
            z += x / 2;
            new CTLText(n,H - t / 2,z - y / 2,t,y,30,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1,2,2,formatValue(PAYTABLE[u]),!0,!0,!1,!1)
        }
        this._onPag1()
    }
    ;
    this.unload = function() {
        a.removeChild(f);
        a.removeChild(k);
        h.unload();
        q.unload();
        k.off("mousedown", g);
        f.off("mousedown", p)
    }
    ;
    this.addEventListener = function(u, v, x) {
        c[u] = v;
        d[u] = x
    }
    ;
    this.show = function() {
        b = !1;
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        (new createjs.Tween.get(k)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.cubicOut);
        (new createjs.Tween.get(m)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.cubicOut)
    }
    ;
    this.hide = function() {
        b || (b = !0,
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500),
        (new createjs.Tween.get(m)).to({
            y: e
        }, 400, createjs.Ease.backIn),
        (new createjs.Tween.get(k)).to({
            y: e
        }, 400, createjs.Ease.backIn).call(function() {
            c[ON_EXIT_HELP] && c[ON_EXIT_HELP].call(d[ON_EXIT_HELP])
        }))
    }
    ;
    this._onPag1 = function() {
        h.setVisible(!0);
        q.setVisible(!1);
        l.visible = !0;
        n.visible = !1
    }
    ;
    this._onPag2 = function() {
        h.setVisible(!1);
        q.setVisible(!0);
        l.visible = !1;
        n.visible = !0
    }
    ;
    var r = this;
    this._init(a)
}
function CCreditsPanel() {
    var a, e, b, c, d, f, k;
    this._init = function() {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        s_oStage.addChild(e);
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        f = new createjs.Shape;
        f.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = .01;
        k = f.on("click", this._onLogoButRelease);
        s_oStage.addChild(f);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var g = s_oSpriteLibrary.getSprite("msg_box")
          , p = createBitmap(g);
        p.regX = g.width / 2;
        p.regY = g.height / 2;
        b.addChild(p);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + g.height / 2;
        a = b.y;
        createjs.Tween.get(b).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        g = 240;
        p = 60;
        new CTLText(b,-(g / 2),-90 - p / 2,g,p,40,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1.3,2,2,TEXT_DEVELOPED,!0,!0,!0,!1);
        g = 400;
        p = 60;
        new CTLText(b,-(g / 2),70 - p / 2,g,p,40,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1.3,2,2,"www.codethislab.com",!0,!0,!0,!1);
        g = s_oSpriteLibrary.getSprite("ctl_logo");
        d = createBitmap(g);
        d.regX = g.width / 2;
        d.regY = g.height / 2;
        b.addChild(d);
        g = s_oSpriteLibrary.getSprite("but_exit");
        c = new CGfxButton(170,-110,g,b);
        c.addEventListener(ON_MOUSE_UP, this.unload, this)
    }
    ;
    this.unload = function() {
        f.off("click", k);
        c.setClickable(!1);
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(b).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(e);
            s_oStage.removeChild(b);
            c.unload()
        })
    }
    ;
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    }
    ;
    this._onMoreGamesReleased = function() {
        window.open("http://codecanyon.net/collections/5409142-games")
    }
    ;
    this._init()
}
function CAreYouSurePanel(a, e) {
    var b, c, d, f, k, g;
    this._init = function(m, l) {
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        g = f.on("mousedown", function() {});
        s_oStage.addChild(f);
        createjs.Tween.get(f).to({
            alpha: .7
        }, 500);
        k = new createjs.Container;
        s_oStage.addChild(k);
        var n = s_oSpriteLibrary.getSprite("msg_box")
          , h = createBitmap(n);
        h.regX = n.width / 2;
        h.regY = n.height / 2;
        k.addChild(h);
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT + n.height / 2;
        b = k.y;
        createjs.Tween.get(k).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        h = new createjs.Text(TEXT_ARE_SURE," 34px " + PRIMARY_FONT,"#000000");
        h.y = -n.height / 2 + 120;
        h.textAlign = "center";
        h.textBaseline = "middle";
        h.lineWidth = 400;
        h.outline = 5;
        k.addChild(h);
        n = new createjs.Text(TEXT_ARE_SURE," 34px " + PRIMARY_FONT,PRIMARY_FONT_COLOUR);
        n.y = h.y;
        n.textAlign = "center";
        n.textBaseline = "middle";
        n.lineWidth = 400;
        k.addChild(n);
        c = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),k);
        c.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        d = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_no"),k);
        d.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        d.pulseAnimation()
    }
    ;
    this._onButYes = function() {
        d.setClickable(!1);
        c.setClickable(!1);
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(k).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            p.unload();
            a && a()
        })
    }
    ;
    this._onButNo = function() {
        d.setClickable(!1);
        c.setClickable(!1);
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(k).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            p.unload();
            e && e()
        })
    }
    ;
    this.unload = function() {
        d.unload();
        c.unload();
        s_oStage.removeChild(f);
        s_oStage.removeChild(k);
        f.off("mousedown", g)
    }
    ;
    var p = this;
    this._init(a, e)
}
function CEndPanel(a) {
    var e, b, c, d, f, k;
    this._init = function(g) {
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0;
        k = c.on("mousedown", function() {});
        s_oStage.addChild(c);
        b = new createjs.Container;
        s_oStage.addChild(b);
        g = s_oSpriteLibrary.getSprite("msg_box");
        var p = createBitmap(g);
        p.regX = g.width / 2;
        p.regY = g.height / 2;
        b.addChild(p);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + g.height / 2;
        e = b.y;
        new CTLText(b,-200,-140,400,60,30,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1.2,2,2,TEXT_GAMEOVER,!0,!0,!0,!1);
        f = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),b);
        f.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        f.pulseAnimation();
        d = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_no"),b);
        d.addEventListener(ON_MOUSE_UP, this._onExit, this)
    }
    ;
    this.unload = function() {
        c.off("mousedown", k);
        s_oStage.removeChild(b);
        s_oStage.removeChild(c)
    }
    ;
    this.show = function(g) {
        f.setClickable(!0);
        d.setClickable(!0);
        playSound("game_over", 1, !1);
        createjs.Tween.get(c).to({
            alpha: .7
        }, 500);
        createjs.Tween.get(b).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        $(s_oMain).trigger("end_level", 1)
    }
    ;
    this.hide = function() {
        createjs.Tween.get(c).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(b).to({
            y: e
        }, 400, createjs.Ease.backIn)
    }
    ;
    this._onRestart = function() {
        f.setClickable(!1);
        d.setClickable(!1);
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.onExitFromEndPanel(!0)
    }
    ;
    this._onExit = function() {
        f.setClickable(!1);
        d.setClickable(!1);
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.onExitFromEndPanel(!1)
    }
    ;
    this._init(a);
    return this
}
function CPhysicsController() {
    var a = Box2D.Common.Math.b2Vec2, e = Box2D.Dynamics.b2World, b = Box2D.Dynamics.b2DebugDraw, c, d, f = this, k, g, p;
    this.init = function() {
        c = new a(0,GRAVITY);
        d = new e(c,!0);
        k = [];
        g = [];
        if (DEBUG_BOX2D) {
            var m = document.createElement("canvas");
            m.id = "debug";
            m.width = s_oCanvas.width;
            m.height = s_oCanvas.height;
            m.style.position = "fixed";
            document.body.appendChild(m);
            $("#debug").css("pointer-events", "none");
            p = document.getElementById("debug").getContext("2d");
            m = new b;
            m.SetSprite(p);
            m.SetDrawScale(WORLD_SCALE * ZOOM);
            m.SetFillAlpha(DEBUG_BOX2D_ALPHA);
            m.SetLineThickness(1);
            m.SetFlags(b.e_shapeBit);
            d.SetDebugDraw(m);
            sizeHandler()
        }
        this.createAContactListener()
    }
    ;
    this.createAContactListener = function() {
        var m = new Box2D.Dynamics.b2ContactListener;
        m.BeginContact = function(l) {
            var n = l.GetFixtureA().GetUserData()
              , h = l.GetFixtureB().GetUserData();
            s_oPhysicsController.processContactEvent(CONTACT_BEGIN, n, l);
            s_oPhysicsController.processContactEvent(CONTACT_BEGIN, h, l)
        }
        ;
        m.EndContact = function(l) {
            var n = l.GetFixtureA().GetUserData()
              , h = l.GetFixtureB().GetUserData();
            s_oPhysicsController.processContactEvent(CONTACT_END, n, l);
            s_oPhysicsController.processContactEvent(CONTACT_END, h, l)
        }
        ;
        d.SetContactListener(m)
    }
    ;
    this.destroyBodyVector = function(m) {
        d.DestroyBody(m)
    }
    ;
    this.destroyAllBodies = function() {
        for (var m = d.GetBodyList(); m; ) {
            var l = m;
            m = m.GetNext();
            d.DestroyBody(l)
        }
    }
    ;
    this.destroyAllJoints = function() {
        for (var m = d.GetJointList(); m; ) {
            var l = m;
            m = m.GetNext();
            d.DestroyJoint(l)
        }
    }
    ;
    this.destroyAllContacts = function() {
        for (var m = d.GetContactList(); m; ) {
            var l = m.GetNext();
            d.DestroyJoint(l)
        }
    }
    ;
    this.unload = function() {
        s_oPhysicsController.destroyAllJoints();
        s_oPhysicsController.destroyAllBodies();
        s_oPhysicsController.destroyAllContacts();
        DEBUG_BOX2D && document.getElementById("debug").remove();
        d = s_oPhysicsController = null
    }
    ;
    this.processContactEvent = function(m, l, n) {
        l && l.contacttype === m && l.callback(l.params, n)
    }
    ;
    this.startComputing = function(m) {
        m.GetBody().SetActive(!0)
    }
    ;
    this.movePlayer = function(m, l, n) {
        l = {
            x: l / WORLD_SCALE,
            y: n / WORLD_SCALE
        };
        m.GetBody().SetPosition(l)
    }
    ;
    this.applyImpulse = function(m) {
        m.GetBody().ApplyImpulse({
            x: .8,
            y: 1
        }, m.GetBody().GetWorldCenter())
    }
    ;
    this.decreaseSpeedRotation = function(m) {
        var l = .99 * m.GetBody().GetAngularVelocity();
        m.GetBody().SetAngularVelocity(l)
    }
    ;
    this.getSpeedRotation = function(m) {
        return m.GetBody().GetAngularVelocity()
    }
    ;
    this.moveObject = function(m, l, n) {
        l = {
            x: l / WORLD_SCALE,
            y: n / WORLD_SCALE
        };
        m.GetBody().SetPosition(l)
    }
    ;
    this.destroyBody = function(m) {
        d.DestroyBody(m.GetBody())
    }
    ;
    this.getInstance = function() {
        null === f && (f = new CPhysicsController);
        return f
    }
    ;
    this.update = function(m) {
        d.Step(1 / FPS, 8, 8);
        DEBUG_BOX2D && (p.save(),
        p.clearRect(0, 0, s_oCanvas.width, s_oCanvas.height),
        p.translate(m.x, m.y),
        p.scale(ZOOM, ZOOM),
        d.DrawDebugData(),
        p.restore());
        d.ClearForces();
        this._deactiveAllBodyInList();
        this._activeAllBodyInList()
    }
    ;
    this.getWorld = function() {
        return d
    }
    ;
    this.getElementPosition = function(m) {
        var l = m.GetBody().GetPosition();
        return {
            x: l.x * WORLD_SCALE,
            y: l.y * WORLD_SCALE,
            angle: 180 * m.GetBody().GetAngle() / Math.PI
        }
    }
    ;
    this.getElementAngle = function(m) {
        return 180 * m.GetBody().GetAngle() / Math.PI
    }
    ;
    this.enableBody = function(m, l) {
        g.push({
            body: m,
            pos: l
        })
    }
    ;
    this.disableBody = function(m, l) {
        k.push({
            body: m,
            pos: l
        })
    }
    ;
    this._deactiveAllBodyInList = function() {
        for (var m = 0; m < k.length; m++)
            k[m].body.SetActive(!1),
            k[m].pos && k[m].body.SetPosition({
                x: k[m].pos.x / WORLD_SCALE,
                y: k[m].pos.y / WORLD_SCALE
            });
        k = []
    }
    ;
    this._activeAllBodyInList = function() {
        for (var m = 0; m < g.length; m++)
            g[m].body.SetActive(!0),
            g[m].pos && g[m].body.SetPosition({
                x: g[m].pos.x / WORLD_SCALE,
                y: g[m].pos.y / WORLD_SCALE
            });
        g = []
    }
    ;
    this.init();
    s_oPhysicsController = this
}
var s_oPhysicsController = null;
function CObjectBuilder() {
    var a = Box2D.Common.Math.b2Vec2, e = Box2D.Dynamics.b2BodyDef, b = Box2D.Dynamics.b2Body, c = Box2D.Dynamics.b2FixtureDef, d = Box2D.Collision.Shapes.b2PolygonShape, f = Box2D.Collision.Shapes.b2CircleShape, k = Box2D.Dynamics.Joints.b2RevoluteJointDef, g, p;
    this.init = function() {
        p = s_oPhysicsController.getInstance();
        g = p.getWorld()
    }
    ;
    this.addButton = function(m, l, n, h, q, r, u, v, x) {
        var t = new c;
        t.density = r;
        t.friction = u;
        t.restitution = v;
        t.color = 16777215;
        t.userData = x;
        r = new e;
        r.type = b.b2_staticBody;
        t.shape = new d;
        t.shape.SetAsBox(m / 2 / WORLD_SCALE, l / 2 / WORLD_SCALE);
        r.position.Set(n / WORLD_SCALE, h / WORLD_SCALE);
        r.angle = q * Math.PI / 180;
        m = g.CreateBody(r);
        m.CreateFixture(t);
        return m
    }
    ;
    this.addEdge = function(m, l, n, h, q, r) {
        var u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        h = new e;
        h.type = b.b2_staticBody;
        u.shape = new d;
        m = new a(m.x / WORLD_SCALE,m.y / WORLD_SCALE);
        l = new a(l.x / WORLD_SCALE,l.y / WORLD_SCALE);
        u.shape.SetAsEdge(m, l);
        h.angle = n * Math.PI / 180;
        n = g.CreateBody(h);
        n.CreateFixture(u);
        return n
    }
    ;
    this.addPolygon = function(m, l, n, h, q) {
        var r = new c;
        r.density = n;
        r.friction = h;
        r.restitution = q;
        n = new e;
        n.type = b.b2_staticBody;
        r.shape = new d;
        h = [];
        for (q = 0; q < m.length; q++) {
            var u = new a;
            u.Set(m[q].x / WORLD_SCALE, m[q].y / WORLD_SCALE);
            h.push(u)
        }
        r.shape.SetAsArray(h, h.length);
        n.angle = l * Math.PI / 180;
        g.CreateBody(n).CreateFixture(r)
    }
    ;
    this.addBall = function(m, l, n, h, q, r, u) {
        var v = new c;
        v.density = h;
        v.friction = q;
        v.restitution = r;
        v.userData = {
            id: "ball",
            index: u
        };
        h = new e;
        h.type = b.b2_dynamicBody;
        v.shape = new f(m / WORLD_SCALE);
        h.allowSleep = !1;
        h.bullet = !0;
        h.position.x = l / WORLD_SCALE;
        h.position.y = n / WORLD_SCALE;
        m = g.CreateBody(h);
        m.CreateFixture(v);
        return m
    }
    ;
    this.addCircle = function(m, l, n, h, q, r) {
        var u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        h = new e;
        h.type = b.b2_dynamicBody;
        u.shape = new f(m / WORLD_SCALE);
        h.position.x = l / WORLD_SCALE;
        h.position.y = n / WORLD_SCALE;
        return g.CreateBody(h).CreateFixture(u)
    }
    ;
    this.addStaticCircle = function(m, l, n, h, q, r, u) {
        var v = new c;
        v.density = h;
        v.friction = q;
        v.restitution = r;
        v.userData = u;
        h = new e;
        h.type = b.b2_staticBody;
        v.shape = new f(m / WORLD_SCALE);
        h.position.x = l / WORLD_SCALE;
        h.position.y = n / WORLD_SCALE;
        return g.CreateBody(h).CreateFixture(v)
    }
    ;
    this.addRevoluteRectangle = function(m, l, n, h, q, r, u, v) {
        var x = new c;
        x.density = q;
        x.friction = r;
        x.restitution = u;
        q = new e;
        q.type = b.b2_dynamicBody;
        v && (q.angularVelocity = 3);
        x.shape = new d;
        x.shape.SetAsBox(m / WORLD_SCALE, l / WORLD_SCALE);
        q.position.Set(n / WORLD_SCALE, h / WORLD_SCALE);
        m = g.CreateBody(q);
        x = m.CreateFixture(x);
        l = new c;
        l.density = 3;
        l.friction = 1;
        l.restitution = .1;
        v = new e;
        v.type = b.b2_staticBody;
        l.shape = new f(10 / WORLD_SCALE);
        v.position.Set(n / WORLD_SCALE, h / WORLD_SCALE);
        n = g.CreateBody(v);
        h = n.CreateFixture(l);
        l = new k;
        l.Initialize(m, n, m.GetWorldCenter());
        g.CreateJoint(l);
        return {
            fixture1: x,
            fixture2: h
        }
    }
    ;
    this.addLeftFlipper = function(m, l, n, h, q, r) {
        var u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        var v = new e;
        v.type = b.b2_dynamicBody;
        u.shape = new d;
        for (var x = [], t = 0; t < m.length; t++) {
            var y = new a;
            y.Set(m[t].x / WORLD_SCALE * -1, m[t].y / WORLD_SCALE);
            x.push(y)
        }
        u.shape.SetAsArray(x, x.length);
        v.position.Set(l / WORLD_SCALE, (n + 28) / WORLD_SCALE);
        m = g.CreateBody(v);
        m.CreateFixture(u);
        u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        h = new e;
        h.type = b.b2_staticBody;
        u.shape = new f(11 / WORLD_SCALE);
        h.position.Set(l / WORLD_SCALE, n / WORLD_SCALE);
        l = g.CreateBody(h);
        l.CreateFixture(u);
        n = new k;
        h = {
            x: l.GetWorldCenter().x,
            y: l.GetWorldCenter().y
        };
        n.Initialize(m, l, h);
        n.lowerAngle = 5 * Math.PI / 180;
        n.upperAngle = 50 * Math.PI / 180;
        n.enableLimit = !0;
        n.maxMotorTorque = 1E3;
        n.enableMotor = !0;
        l = g.CreateJoint(n);
        l.EnableMotor(!0);
        return l
    }
    ;
    this.addRightFlipper = function(m, l, n, h, q, r) {
        var u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        var v = new e;
        v.type = b.b2_dynamicBody;
        u.shape = new d;
        for (var x = [], t = 0; t < m.length; t++) {
            var y = new a;
            y.Set(m[t].x / WORLD_SCALE, m[t].y / WORLD_SCALE);
            x.push(y)
        }
        u.shape.SetAsArray(x, x.length);
        v.position.Set(l / WORLD_SCALE, (n + 28) / WORLD_SCALE);
        m = g.CreateBody(v);
        m.CreateFixture(u);
        u = new c;
        u.density = h;
        u.friction = q;
        u.restitution = r;
        h = new e;
        h.type = b.b2_staticBody;
        u.shape = new f(11 / WORLD_SCALE);
        h.position.Set(l / WORLD_SCALE, n / WORLD_SCALE);
        l = g.CreateBody(h);
        l.CreateFixture(u);
        n = new k;
        h = {
            x: l.GetWorldCenter().x,
            y: l.GetWorldCenter().y
        };
        n.Initialize(m, l, h);
        n.lowerAngle = -50 * Math.PI / 180;
        n.upperAngle = -5 * Math.PI / 180;
        n.enableLimit = !0;
        n.maxMotorTorque = 1E3;
        n.enableMotor = !0;
        l = g.CreateJoint(n);
        l.EnableMotor(!0);
        return l
    }
    ;
    this.addRectangle = function(m, l, n, h, q, r, u, v) {
        var x = new c;
        x.density = r;
        x.friction = u;
        x.restitution = v;
        r = new e;
        r.type = b.b2_staticBody;
        x.shape = new d;
        x.shape.SetAsBox(m / WORLD_SCALE, l / WORLD_SCALE);
        r.position.Set(n / WORLD_SCALE, h / WORLD_SCALE);
        r.angle = q * Math.PI / 180;
        return g.CreateBody(r).CreateFixture(x)
    }
    ;
    this.init();
    s_oObjectBuilder = this
}
var s_oObjectBuilder = null
  , EDGE_FRAME = "edge_frame"
  , PIN = "pin"
  , BUMPER = "bumper"
  , SENSOR_BASKET = "sensor_basket"
  , RECOVER_BASKET = "recover_basket"
  , SENSOR_BONUS = "sensor_bonus"
  , BONUS_FRAME = "bonus_frame";
function CTable(a, e) {
    var b, c, d, f, k, g, p, m;
    this._init = function(l, n) {
        d = [];
        f = [];
        var h = s_oSpriteLibrary.getSprite("bg_cat");
        b = h.width;
        c = h.height;
        p = createBitmap(h);
        p.regX = h.width / 2;
        p.regY = h.height / 2;
        l.addChild(p);
        h = s_oSpriteLibrary.getSprite("holes_mask_ground");
        var q = createBitmap(h);
        q.x = -66;
        q.y = CANVAS_HEIGHT / 2 - 68;
        q.regX = h.width / 2;
        q.regY = h.height;
        l.addChild(q);
        h = s_oSpriteLibrary.getSprite("holes_mask");
        q = createBitmap(h);
        q.y = CANVAS_HEIGHT / 2;
        q.regX = h.width / 2;
        q.regY = h.height;
        n.addChild(q);
        ZOOM_TABLE_SIZE = {
            w: b * ZOOM,
            h: c * ZOOM
        };
        m = new CArrowsStart(BALL_STARTPOS_GAME.x - 14,BALL_STARTPOS_GAME.y + 36,l);
        this._buildTable()
    }
    ;
    this.addEventListener = function(l, n, h) {
        d[l] = n;
        f[l] = h
    }
    ;
    this._buildTable = function() {
        for (var l = TileMaps.levelsettings.layers, n = 0; n < l.length; n++)
            if ("objectgroup" === l[n].type) {
                var h = l[n].objects;
                switch (l[n].name) {
                case EDGE_FRAME:
                    this._addShapes(h, 0);
                    break;
                case PIN:
                    this._buildPins(h);
                    break;
                case SENSOR_BONUS:
                    this._setBonusSensors(h);
                    break;
                case BONUS_FRAME:
                    this._addShapes(h, GENERAL_RESTITUTION / 2);
                    break;
                case SENSOR_BASKET:
                    this._setRecoverSensors(h);
                    break;
                case RECOVER_BASKET:
                    this._addShapes(h, GENERAL_RESTITUTION)
                }
            }
    }
    ;
    this._addShapes = function(l, n) {
        for (var h = 0; h < l.length; h++)
            for (var q = this.getAdjustedPoints(l[h].x, l[h].y, l[h].polyline), r = 0; r < q.length - 1; r++)
                s_oObjectBuilder.addEdge({
                    x: q[r].x,
                    y: q[r].y
                }, {
                    x: q[r + 1].x,
                    y: q[r + 1].y
                }, 0, 1, GENERAL_FRICTION, n)
    }
    ;
    this._buildPins = function(l) {
        for (var n = 0; n < l.length; n++) {
            var h = l[n]
              , q = s_oTable.getAdjustedPoints(0, 0, [{
                x: h.x,
                y: h.y
            }]);
            this._addPin(h.width / 2, q[0].x + h.width / 2, q[0].y + h.width / 2, n, l[n].type)
        }
    }
    ;
    this._addPin = function(l, n, h, q, r) {
        var u = s_oSpriteLibrary.getSprite("pin");
        q = 0;
        var v = 10;
        "nose" === r && (u = s_oSpriteLibrary.getSprite("pin_nose"),
        v = 0,
        q = 1);
        r = new CLightIndicator(u,n,h,e,0,v);
        r.setSpecialType(q);
        s_oObjectBuilder.addStaticCircle(l, n, h, 0, 0, GENERAL_RESTITUTION, {
            contacttype: CONTACT_BEGIN,
            callback: this._onPinCollision,
            params: r
        })
    }
    ;
    this._onPinCollision = function(l, n) {
        l.litAndslowOff(500, 0);
        if (1 === l.getSpecialType())
            playSound("ball_on_nose", 1, !1);
        else {
            var h = s_oTable._findBallBodyFromCollision(n).GetLinearVelocity();
            h = Math.pow(h.x, 2) + Math.pow(h.y, 2);
            40 < h && (h = 40);
            h = linearFunction(h, 0, 40, 0, 1);
            .2 < h && playSound("ball_on_pin", h, !1)
        }
    }
    ;
    this._setRecoverSensors = function(l) {
        var n = [{
            x: 1,
            y: -65
        }, {
            x: 0,
            y: -110
        }, {
            x: -44,
            y: -120
        }, {
            x: -40,
            y: -110
        }];
        g = [];
        for (var h = 0; h < l.length; h++) {
            var q = l[h];
            q = s_oTable.getAdjustedPoints(0, 0, [{
                x: q.x,
                y: q.y
            }]);
            s_oObjectBuilder.addButton(8, 8, q[0].x, q[0].y, 0, 0, 0, 0, {
                contacttype: CONTACT_BEGIN,
                callback: this._onRecoverSensor,
                params: h
            }).GetFixtureList().SetSensor(!0);
            var r = s_oSpriteLibrary.getSprite("arrow_down_" + h);
            q = new CLightIndicator(r,q[0].x + n[h].x,q[0].y + n[h].y,a,0,0);
            g.push(q)
        }
    }
    ;
    this._setBonusSensors = function(l) {
        var n = [{
            x: -70,
            y: -44
        }, {
            x: 0,
            y: -60
        }, {
            x: 70,
            y: -44
        }];
        k = [];
        for (var h = 0; h < l.length; h++) {
            var q = l[h];
            q = s_oTable.getAdjustedPoints(0, 0, [{
                x: q.x,
                y: q.y
            }]);
            s_oObjectBuilder.addButton(8, 8, q[0].x, q[0].y, 0, 0, 0, 0, {
                contacttype: CONTACT_BEGIN,
                callback: this._onBonusSensor,
                params: h
            }).GetFixtureList().SetSensor(!0);
            var r = s_oSpriteLibrary.getSprite("arrow_top_" + h);
            q = new CLightIndicator(r,q[0].x + n[h].x,q[0].y + n[h].y,a,0,0);
            k.push(q)
        }
    }
    ;
    this._findBallBodyFromCollision = function(l) {
        var n = l.GetFixtureA().GetUserData()
          , h = l.GetFixtureB().GetUserData();
        if (n.hasOwnProperty("index"))
            return l.GetFixtureA().GetBody();
        if (h.hasOwnProperty("index"))
            return l.GetFixtureB().GetBody()
    }
    ;
    this._findBallIndexInCollision = function(l) {
        var n = l.GetFixtureA().GetUserData();
        l = l.GetFixtureB().GetUserData();
        if (n.hasOwnProperty("index"))
            var h = n.index;
        l.hasOwnProperty("index") && (h = l.index);
        return h
    }
    ;
    this._onRecoverSensor = function(l, n) {
        g[l].flashing();
        playSound("ball_in_recover", 1, !1);
        var h = s_oTable._findBallIndexInCollision(n);
        d[ON_SENSOR_BASKET] && d[ON_SENSOR_BASKET].call(f[ON_SENSOR_BASKET], h)
    }
    ;
    this._onBonusSensor = function(l, n) {
        k[l].flashing();
        playSound("ball_in_bonus", 1, !1);
        var h = s_oTable._findBallIndexInCollision(n);
        d[ON_SENSOR_BONUS] && d[ON_SENSOR_BONUS].call(f[ON_SENSOR_BONUS], h)
    }
    ;
    this.arrowsLaunchAnimation = function() {
        m.whilePlayingLighting()
    }
    ;
    this.arrowsIdleAnimation = function() {
        m.startLighting()
    }
    ;
    this.getTableSize = function() {
        return {
            w: b,
            h: c
        }
    }
    ;
    this.getAdjustedPoints = function(l, n, h) {
        for (var q = [], r = 0; r < h.length; r++)
            q[r] = {
                x: p.x - p.regX + l + h[r].x,
                y: p.y - p.regY + n + h[r].y
            };
        return q
    }
    ;
    s_oTable = this;
    this._init(a, e)
}
var s_oTable;
(function(a, e) {
    "undefined" === typeof onTileMapLoaded ? ("undefined" === typeof TileMaps && (TileMaps = {}),
    TileMaps[a] = e) : onTileMapLoaded(a, e);
    "object" === typeof module && module && module.exports && (module.exports = e)
}
)("levelsettings", {
    height: 1,
    infinite: !1,
    layers: [{
        data: [0],
        height: 1,
        name: "Livello tile 1",
        opacity: 1,
        type: "tilelayer",
        visible: !0,
        width: 1,
        x: 0,
        y: 0
    }, {
        image: "../sprites/bg_cat.png",
        name: "layout",
        opacity: .55,
        type: "imagelayer",
        visible: !0,
        x: 0,
        y: 0
    }, {
        image: "../sprites/holes_mask.png",
        name: "bottom",
        offsetx: 0,
        offsety: 880,
        opacity: 1,
        type: "imagelayer",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "bonus_frame",
        objects: [{
            height: 0,
            id: 78,
            name: "",
            polyline: [{
                x: 163,
                y: 119.5
            }, {
                x: 93,
                y: 95
            }, {
                x: 54.5,
                y: 66.5
            }, {
                x: 27.5,
                y: 36
            }, {
                x: 19,
                y: 1.5
            }, {
                x: 18,
                y: -22
            }, {
                x: 25.5,
                y: -48
            }, {
                x: 37.5,
                y: -66.5
            }, {
                x: 90,
                y: -49
            }, {
                x: 105.5,
                y: -69.5
            }, {
                x: 55,
                y: -86.5
            }, {
                x: 82.3333,
                y: -106.167
            }, {
                x: 107.833,
                y: -119.667
            }, {
                x: 141.333,
                y: -133.667
            }, {
                x: 179.333,
                y: -144.167
            }, {
                x: 225,
                y: -150.5
            }, {
                x: 226,
                y: -104.5
            }, {
                x: 253.492,
                y: -105.026
            }, {
                x: 252.5,
                y: -150
            }, {
                x: 284.969,
                y: -145.778
            }, {
                x: 321.433,
                y: -136.215
            }, {
                x: 352,
                y: -125
            }, {
                x: 384,
                y: -110
            }, {
                x: 418.5,
                y: -86
            }, {
                x: 371,
                y: -67
            }, {
                x: 391,
                y: -47
            }, {
                x: 440.5,
                y: -66
            }, {
                x: 453.5,
                y: -40.5
            }, {
                x: 460.5,
                y: -15
            }, {
                x: 456,
                y: 18.5
            }, {
                x: 439.5,
                y: 50
            }, {
                x: 417,
                y: 74
            }, {
                x: 373,
                y: 99
            }, {
                x: 318.5,
                y: 119
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 145,
            y: 744
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "sensor_bonus",
        objects: [{
            height: 0,
            id: 155,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 232,
            y: 683
        }, {
            height: 0,
            id: 156,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 384,
            y: 628
        }, {
            height: 0,
            id: 157,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 537,
            y: 684.5
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "recover_basket",
        objects: [{
            height: 0,
            id: 79,
            name: "",
            polyline: [{
                x: 0,
                y: 0
            }, {
                x: 17.5,
                y: 61
            }, {
                x: 42,
                y: 61
            }, {
                x: 61,
                y: -.5
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 628,
            y: 463.5
        }, {
            height: 0,
            id: 149,
            name: "",
            polyline: [{
                x: -2.66667,
                y: -3.33333
            }, {
                x: -5.16667,
                y: 10.5
            }, {
                x: 7.16667,
                y: 51.3333
            }, {
                x: 27.333,
                y: 70.67
            }, {
                x: 47.333,
                y: 76.0033
            }, {
                x: 58.6663,
                y: 71.3367
            }, {
                x: 67.333,
                y: 54.67
            }, {
                x: 63.9997,
                y: 24.67
            }, {
                x: 46.6663,
                y: -7.99667
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 142.667,
            y: 1093.33
        }, {
            height: 0,
            id: 160,
            name: "",
            polyline: [{
                x: -2.66667,
                y: -3.33333
            }, {
                x: -5.16667,
                y: 11.1667
            }, {
                x: 8.5,
                y: 51.3333
            }, {
                x: 27.333,
                y: 70.67
            }, {
                x: 52.6663,
                y: 80.0033
            }, {
                x: 65.9996,
                y: 71.3367
            }, {
                x: 72.6663,
                y: 43.3367
            }, {
                x: 53.9997,
                y: -1.99667
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 273.333,
            y: 1118
        }, {
            height: 0,
            id: 161,
            name: "",
            polyline: [{
                x: -5.33334,
                y: -2.66666
            }, {
                x: -.500003,
                y: 29.8333
            }, {
                x: 13.8333,
                y: 58
            }, {
                x: 38.6663,
                y: 60.0033
            }, {
                x: 57.9997,
                y: 44.67
            }, {
                x: 59.9996,
                y: 6.00337
            }, {
                x: 51.333,
                y: -13.33
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 459.333,
            y: 1122
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "sensor_basket",
        objects: [{
            height: 0,
            id: 150,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 655.667,
            y: 519
        }, {
            height: 0,
            id: 152,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 492.666,
            y: 1172.34
        }, {
            height: 0,
            id: 153,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 324.999,
            y: 1186.33
        }, {
            height: 0,
            id: 154,
            name: "",
            point: !0,
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 189.667,
            y: 1159.67
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "pin",
        objects: [{
            ellipse: !0,
            height: 34,
            id: 9,
            name: "",
            rotation: 0,
            type: "nose",
            visible: !0,
            width: 34,
            x: 306,
            y: 421
        }, {
            ellipse: !0,
            height: 8,
            id: 17,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 151.5,
            y: 413
        }, {
            ellipse: !0,
            height: 8,
            id: 18,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 172,
            y: 384.5
        }, {
            ellipse: !0,
            height: 8,
            id: 19,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 207,
            y: 374.5
        }, {
            ellipse: !0,
            height: 8,
            id: 20,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 239.5,
            y: 384
        }, {
            ellipse: !0,
            height: 8,
            id: 21,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 259,
            y: 403.5
        }, {
            ellipse: !0,
            height: 8,
            id: 33,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 375.25,
            y: 388.75
        }, {
            ellipse: !0,
            height: 8,
            id: 34,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 394.25,
            y: 361.25
        }, {
            ellipse: !0,
            height: 8,
            id: 35,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 427.25,
            y: 347.75
        }, {
            ellipse: !0,
            height: 8,
            id: 36,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 460.75,
            y: 351.25
        }, {
            ellipse: !0,
            height: 8,
            id: 37,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 484.25,
            y: 374.75
        }, {
            ellipse: !0,
            height: 8,
            id: 39,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 102.5,
            y: 471.5
        }, {
            ellipse: !0,
            height: 8,
            id: 40,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 134.5,
            y: 474
        }, {
            ellipse: !0,
            height: 8,
            id: 42,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 102.5,
            y: 506
        }, {
            ellipse: !0,
            height: 8,
            id: 43,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 132,
            y: 506
        }, {
            ellipse: !0,
            height: 8,
            id: 45,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 117,
            y: 539
        }, {
            ellipse: !0,
            height: 8,
            id: 46,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 148,
            y: 532
        }, {
            ellipse: !0,
            height: 8,
            id: 47,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 507.5,
            y: 430
        }, {
            ellipse: !0,
            height: 8,
            id: 48,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 535,
            y: 425
        }, {
            ellipse: !0,
            height: 8,
            id: 49,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 562,
            y: 413.5
        }, {
            ellipse: !0,
            height: 8,
            id: 50,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 512,
            y: 464
        }, {
            ellipse: !0,
            height: 8,
            id: 51,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 541.5,
            y: 462
        }, {
            ellipse: !0,
            height: 8,
            id: 52,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 570.5,
            y: 454.5
        }, {
            ellipse: !0,
            height: 8,
            id: 54,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 518.5,
            y: 498.5
        }, {
            ellipse: !0,
            height: 8,
            id: 55,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 549,
            y: 497
        }, {
            ellipse: !0,
            height: 8,
            id: 56,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 436.5,
            y: 267.5
        }, {
            ellipse: !0,
            height: 8,
            id: 57,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 435.5,
            y: 298.5
        }, {
            ellipse: !0,
            height: 8,
            id: 58,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 467,
            y: 302
        }, {
            ellipse: !0,
            height: 8,
            id: 59,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 480.5,
            y: 275
        }, {
            ellipse: !0,
            height: 8,
            id: 61,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 178.5,
            y: 329.5
        }, {
            ellipse: !0,
            height: 8,
            id: 62,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 144.5,
            y: 344
        }, {
            ellipse: !0,
            height: 8,
            id: 64,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 616.5,
            y: 383.167
        }, {
            ellipse: !0,
            height: 8,
            id: 65,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 616,
            y: 416.5
        }, {
            ellipse: !0,
            height: 8,
            id: 66,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 649.333,
            y: 380.167
        }, {
            ellipse: !0,
            height: 8,
            id: 67,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 649.5,
            y: 413.5
        }, {
            ellipse: !0,
            height: 8,
            id: 68,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 681,
            y: 384
        }, {
            ellipse: !0,
            height: 8,
            id: 69,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 682,
            y: 415
        }, {
            ellipse: !0,
            height: 8,
            id: 70,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 325,
            y: 472
        }, {
            ellipse: !0,
            height: 8,
            id: 71,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 364.5,
            y: 471
        }, {
            ellipse: !0,
            height: 8,
            id: 72,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 282,
            y: 481
        }, {
            ellipse: !0,
            height: 8,
            id: 97,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 153.25,
            y: 1021
        }, {
            ellipse: !0,
            height: 8,
            id: 98,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 99.25,
            y: 817.5
        }, {
            ellipse: !0,
            height: 8,
            id: 99,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 87.25,
            y: 745
        }, {
            ellipse: !0,
            height: 8,
            id: 100,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 91.75,
            y: 857.5
        }, {
            ellipse: !0,
            height: 8,
            id: 101,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 78.75,
            y: 914
        }, {
            ellipse: !0,
            height: 8,
            id: 102,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 114.75,
            y: 905.5
        }, {
            ellipse: !0,
            height: 8,
            id: 104,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 281.25,
            y: 1014
        }, {
            ellipse: !0,
            height: 8,
            id: 105,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 50.25,
            y: 893.5
        }, {
            ellipse: !0,
            height: 8,
            id: 107,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 138.25,
            y: 813
        }, {
            ellipse: !0,
            height: 8,
            id: 108,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 188.75,
            y: 945.5
        }, {
            ellipse: !0,
            height: 8,
            id: 109,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 220.75,
            y: 929.5
        }, {
            ellipse: !0,
            height: 8,
            id: 110,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 158.25,
            y: 845
        }, {
            ellipse: !0,
            height: 8,
            id: 111,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 235.25,
            y: 1020
        }, {
            ellipse: !0,
            height: 8,
            id: 112,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 125.75,
            y: 865.5
        }, {
            ellipse: !0,
            height: 8,
            id: 113,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 251.75,
            y: 968
        }, {
            ellipse: !0,
            height: 8,
            id: 114,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 160.25,
            y: 908.5
        }, {
            ellipse: !0,
            height: 8,
            id: 115,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 98.75,
            y: 993
        }, {
            ellipse: !0,
            height: 8,
            id: 116,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 115.25,
            y: 1033
        }, {
            ellipse: !0,
            height: 8,
            id: 117,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 189.25,
            y: 887.5
        }, {
            ellipse: !0,
            height: 8,
            id: 118,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 214.25,
            y: 980.5
        }, {
            ellipse: !0,
            height: 8,
            id: 119,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 120.25,
            y: 944
        }, {
            ellipse: !0,
            height: 8,
            id: 120,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 84.75,
            y: 958
        }, {
            ellipse: !0,
            height: 8,
            id: 121,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 131.25,
            y: 981
        }, {
            ellipse: !0,
            height: 8,
            id: 128,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 617.25,
            y: 810.75
        }, {
            ellipse: !0,
            height: 8,
            id: 129,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 630.5,
            y: 862.75
        }, {
            ellipse: !0,
            height: 8,
            id: 130,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 582,
            y: 854.25
        }, {
            ellipse: !0,
            height: 8,
            id: 131,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 581.5,
            y: 927.75
        }, {
            ellipse: !0,
            height: 8,
            id: 132,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 603.5,
            y: 898.25
        }, {
            ellipse: !0,
            height: 8,
            id: 133,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 548,
            y: 894
        }, {
            ellipse: !0,
            height: 8,
            id: 134,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 561.5,
            y: 963.5
        }, {
            ellipse: !0,
            height: 8,
            id: 135,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 541,
            y: 1E3
        }, {
            ellipse: !0,
            height: 8,
            id: 136,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 524,
            y: 1034
        }, {
            ellipse: !0,
            height: 8,
            id: 138,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 522,
            y: 937
        }, {
            ellipse: !0,
            height: 8,
            id: 139,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 496.5,
            y: 971
        }, {
            ellipse: !0,
            height: 8,
            id: 140,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 480,
            y: 1010
        }, {
            ellipse: !0,
            height: 8,
            id: 143,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 481.5,
            y: 897.5
        }, {
            ellipse: !0,
            height: 8,
            id: 144,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 455.5,
            y: 940
        }, {
            ellipse: !0,
            height: 8,
            id: 145,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 434.5,
            y: 974
        }, {
            ellipse: !0,
            height: 8,
            id: 146,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 415.5,
            y: 1015.5
        }, {
            ellipse: !0,
            height: 8,
            id: 158,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 603,
            y: 475
        }, {
            ellipse: !0,
            height: 8,
            id: 159,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 599,
            y: 508
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "edge_frame",
        objects: [{
            height: 0,
            id: 6,
            name: "",
            polyline: [{
                x: -330.667,
                y: -199
            }, {
                x: -282.667,
                y: -414.667
            }, {
                x: -282.667,
                y: -461.333
            }, {
                x: -275.333,
                y: -531.333
            }, {
                x: -291.667,
                y: -561
            }, {
                x: -305.417,
                y: -596.25
            }, {
                x: -314.667,
                y: -657.5
            }, {
                x: -309.667,
                y: -723.667
            }, {
                x: -298.667,
                y: -758.666
            }, {
                x: -302.666,
                y: -873.333
            }, {
                x: -272,
                y: -906.667
            }, {
                x: -170.667,
                y: -880
            }, {
                x: -70.6667,
                y: -904
            }, {
                x: 13.3333,
                y: -902.667
            }, {
                x: 81.3333,
                y: -958.667
            }, {
                x: 116,
                y: -964
            }, {
                x: 145.333,
                y: -942.667
            }, {
                x: 169.333,
                y: -888
            }, {
                x: 204,
                y: -766.667
            }, {
                x: 246.667,
                y: -774.667
            }, {
                x: 292,
                y: -768
            }, {
                x: 329.333,
                y: -733.333
            }, {
                x: 340,
                y: -706.667
            }, {
                x: 329.333,
                y: -592
            }, {
                x: 328,
                y: -462.667
            }, {
                x: 270.667,
                y: -348
            }, {
                x: 302.667,
                y: -194.666
            }],
            rotation: 0,
            type: "",
            visible: !0,
            width: 0,
            x: 380,
            y: 1100
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !0,
        x: 0,
        y: 0
    }, {
        draworder: "topdown",
        name: "temp_todelete",
        objects: [{
            ellipse: !0,
            height: 8,
            id: 122,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 180.5,
            y: 1064
        }, {
            ellipse: !0,
            height: 8,
            id: 123,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 138,
            y: 1070.5
        }, {
            ellipse: !0,
            height: 8,
            id: 124,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 303.5,
            y: 1058.5
        }, {
            ellipse: !0,
            height: 8,
            id: 125,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 257.5,
            y: 1064.5
        }, {
            ellipse: !0,
            height: 8,
            id: 137,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 504.5,
            y: 1069.5
        }, {
            ellipse: !0,
            height: 8,
            id: 141,
            name: "",
            rotation: 0,
            type: "",
            visible: !0,
            width: 8,
            x: 451.5,
            y: 1054
        }],
        opacity: 1,
        type: "objectgroup",
        visible: !1,
        x: 0,
        y: 0
    }],
    nextobjectid: 162,
    orientation: "orthogonal",
    renderorder: "right-down",
    tiledversion: "2018.03.21",
    tileheight: 1280,
    tilesets: [],
    tilewidth: 768,
    type: "map",
    version: 1.2,
    width: 1
});
function CLightIndicator(a, e, b, c, d, f) {
    var k, g, p, m, l;
    this._init = function(n, h, q, r, u, v) {
        g = new createjs.Container;
        g.x = h;
        g.y = q;
        r.addChild(g);
        h = n.width / 2;
        q = n.height;
        u = h / 2 + u;
        v = q / 2 + v;
        n = new createjs.SpriteSheet({
            images: [n],
            frames: {
                width: h,
                height: q,
                regX: u,
                regY: v
            },
            animations: {
                state_false: [0],
                state_true: [1]
            }
        });
        m = createSprite(n, "state_false", u, v, h, q);
        g.addChild(m);
        p = createSprite(n, "state_true", u, v, h, q);
        p.alpha = 0;
        g.addChild(p)
    }
    ;
    this.unload = function() {
        createjs.Tween.removeTweens(p);
        c.removeChild(p)
    }
    ;
    this.lit = function(n) {
        createjs.Tween.removeTweens(p);
        p.alpha = n ? 1 : 0
    }
    ;
    this.slowOn = function(n, h) {
        createjs.Tween.get(p, {
            override: !0
        }).wait(h).to({
            alpha: 1
        }, n)
    }
    ;
    this.slowOff = function(n, h) {
        createjs.Tween.get(p, {
            override: !0
        }).wait(h).to({
            alpha: 0
        }, n)
    }
    ;
    this.highlight = function(n) {
        p.alpha = 0;
        createjs.Tween.get(p, {
            override: !0,
            loop: !0
        }).to({
            alpha: 1
        }, n / 3).wait(n / 3).to({
            alpha: 0
        }, n / 3)
    }
    ;
    this.highlight2 = function(n) {
        createjs.Tween.get(p, {
            override: !0,
            loop: !0
        }).to({
            alpha: 1
        }, n / 2, createjs.Ease.cubicIn).to({
            alpha: 0
        }, n / 2, createjs.Ease.cubicOut)
    }
    ;
    this.slowHighlight = function(n, h, q) {
        p.alpha = 0;
        createjs.Tween.get(p, {
            override: !0
        }).wait(h).to({
            alpha: 1
        }, n / 3).wait(n / 3).to({
            alpha: 0
        }, n / 3).call(function() {
            q()
        })
    }
    ;
    this.litAndslowOff = function(n, h) {
        p.alpha = 1;
        createjs.Tween.get(p, {
            override: !0
        }).wait(h).to({
            alpha: 0
        }, n, createjs.Ease.cubicIn)
    }
    ;
    this.flashing = function() {
        createjs.Tween.get(p, {
            override: !0
        }).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100)
    }
    ;
    this.longFlashing = function() {
        createjs.Tween.get(p, {
            override: !0
        }).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100)
    }
    ;
    this.addPreciseText = function(n, h, q, r, u, v, x) {
        l = (new CTLText(g,h - v / 2,q - x / 2,v,x,r,"center",u,PRIMARY_FONT,1.3,2,2,n,!0,!0,!0,!1)).getText()
    }
    ;
    this.addText = function(n, h, q, r, u) {
        l = new createjs.Text(n,r + "px " + PRIMARY_FONT,u);
        l.x = h;
        l.y = q;
        l.textAlign = "center";
        l.textBaseline = "middle";
        l.lineWidth = 200;
        g.addChild(l);
        l.cache(-g.getBounds().width / 2, -g.getBounds().height / 2, g.getBounds().width, g.getBounds().height)
    }
    ;
    this.setText = function(n) {
        l.text = n;
        l.updateCache()
    }
    ;
    this.textRotate = function(n) {
        l.rotation = n
    }
    ;
    this.setVisible = function(n) {
        g.visible = n
    }
    ;
    this.setPos = function(n, h) {
        g.x = n;
        g.y = h
    }
    ;
    this.setSpecialType = function(n) {
        k = n
    }
    ;
    this.getSpecialType = function() {
        return k
    }
    ;
    this.rotate = function(n) {
        g.rotation = n
    }
    ;
    this.scale = function(n) {
        g.scaleX = g.scaleY = n
    }
    ;
    this.flipX = function() {
        g.scaleX = -1
    }
    ;
    this._init(a, e, b, c, d, f)
}
function CGUIExpandible(a, e, b, c) {
    var d, f, k, g, p, m, l, n;
    this._init = function(q, r, u, v) {
        g = [];
        m = new createjs.Container;
        m.x = q;
        m.y = r;
        v.addChild(m);
        l = new createjs.Container;
        m.addChild(l);
        n = new createjs.Container;
        m.addChild(n);
        k = !1;
        p = new CGfxButton(0,0,u,n);
        p.addEventListener(ON_MOUSE_UP, this._onMenu, this);
        f = d = 120
    }
    ;
    this.unload = function() {
        p.unload();
        c.removeChild(m)
    }
    ;
    this.refreshPos = function(q, r) {
        m.x = a - q;
        m.y = e + r
    }
    ;
    this.addButton = function(q) {
        q = q.getButtonImage();
        q.x = 0;
        q.y = 0;
        q.visible = 0;
        l.addChildAt(q, 0);
        g.push(q)
    }
    ;
    this._onMenu = function() {
        (k = !k) ? (h._expand(),
        s_oGame.onPause()) : (h._collapse(),
        s_oGame.onResume())
    }
    ;
    this._expand = function() {
        for (var q = 0; q < g.length; q++)
            g[q].visible = !0,
            createjs.Tween.get(g[q], {
                override: !0
            }).wait(300 * q / 2).to({
                y: d + q * f
            }, 300, createjs.Ease.cubicOut)
    }
    ;
    this._collapse = function() {
        for (var q = 0; q < g.length; q++) {
            var r = g[g.length - 1 - q];
            createjs.Tween.get(r, {
                override: !0
            }).wait(300 * q / 2).to({
                y: 0
            }, 300, createjs.Ease.cubicOut).call(function(u) {
                u.visible = !1
            }, [r])
        }
    }
    ;
    var h = this;
    this._init(a, e, b, c)
}
function CPausePanel(a) {
    var e, b;
    this._init = function(c) {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function() {});
        c.addChild(e);
        b = new createjs.Container;
        c.addChild(b);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2;
        c = new createjs.Text(TEXT_PAUSE," 54px " + PRIMARY_FONT,PRIMARY_FONT_COLOUR);
        c.y = 0;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.lineWidth = 400;
        b.addChild(c);
        e.alpha = 0;
        b.alpha = 0
    }
    ;
    this.show = function() {
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        createjs.Tween.get(b).to({
            alpha: 1
        }, 500)
    }
    ;
    this.hide = function() {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500)
    }
    ;
    this._init(a)
}
function CMsgBox() {
    var a, e, b, c;
    this._init = function() {
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = 0;
        b = a.on("mousedown", function() {});
        s_oStage.addChild(a);
        e = new createjs.Container;
        s_oStage.addChild(e);
        var f = s_oSpriteLibrary.getSprite("msg_box")
          , k = createBitmap(f);
        k.regX = f.width / 2;
        k.regY = f.height / 2;
        e.addChild(k);
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT + f.height / 2;
        f = f.width - 100;
        c = new CTLText(e,-(f / 2),-100,f,200,34,"center","#ff0",PRIMARY_FONT,1.2,2,2," ",!0,!0,!0,!1)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(a);
        s_oStage.removeChild(e);
        a.off("mousedown", b)
    }
    ;
    this.show = function(f) {
        c.refreshText(f);
        (new createjs.Tween.get(a)).to({
            alpha: .7
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: CANVAS_HEIGHT / 2
        }, 300, createjs.Ease.quartIn).wait(2E3).call(function() {
            d.hide()
        })
    }
    ;
    this.hide = function() {
        var f = s_oSpriteLibrary.getSprite("msg_box");
        (new createjs.Tween.get(a)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: CANVAS_HEIGHT + f.height / 2
        }, 500, createjs.Ease.cubicIn)
    }
    ;
    var d = this;
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText)
            for (var a = this._iFontSize; (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--,
            this._oText.font = a + "px " + this._szFont,
            this._oText.lineHeight = Math.round(a * this._fLineHeightFactor),
            this.__updateY(),
            this.__verticalAlign(),
            8 > a); )
                ;
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
        case "middle":
            this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape,
        this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight),
        this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(a,this._iFontSize + "px " + this._szFont,this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
        case "center":
            this._oText.x = this._x + this._iWidth / 2;
            break;
        case "left":
            this._oText.x = this._x + this._iPaddingH;
            break;
        case "right":
            this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function(a, e, b, c) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,e,b,c))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setX: function(a) {
        this._x = this._oText.x = a
    },
    setY: function(a) {
        this._y = this._oText.y = a
    },
    setFontSize: function(a) {
        this._iFontSize = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getX: function() {
        return this._x
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};
function CTLText(a, e, b, c, d, f, k, g, p, m, l, n, h, q, r, u, v) {
    this._oContainer = a;
    this._x = e;
    this._y = b;
    this._iWidth = c;
    this._iHeight = d;
    this._bMultiline = u;
    this._iFontSize = f;
    this._szAlign = k;
    this._szColor = g;
    this._szFont = p;
    this._iPaddingH = l;
    this._iPaddingV = n;
    this._bVerticalAlign = r;
    this._bFitText = q;
    this._bDebug = v;
    this._oDebugShape = null;
    this._fLineHeightFactor = m;
    this._oText = null;
    h && this.__createText(h)
}
function CController(a, e, b) {
    var c, d, f, k, g, p, m, l;
    this._init = function(h, q, r) {
        g = [];
        p = [];
        m = new createjs.Container;
        m.x = h;
        m.y = q;
        r.addChild(m);
        h = s_oSpriteLibrary.getSprite("controller");
        l = createBitmap(h);
        l.regX = h.width / 2;
        l.regY = h.height / 2;
        m.addChild(l);
        f = 170;
        k = new CVector2(0,-1);
        m.on("mousedown", this._onClick);
        m.on("pressmove", this._onMove);
        m.on("pressup", this._onRelease)
    }
    ;
    this.addEventListener = function(h, q, r, u) {
        g[h] = q;
        p[h] = r;
        _aParams = u
    }
    ;
    this._calculateRotation = function(h, q) {
        var r = new CVector2(h,q);
        r.normalize();
        r = angleBetweenVectors(r, k);
        r = radiansToDegree(r);
        0 > h && (r = -r);
        return r
    }
    ;
    this._onClick = function(h) {
        c = n._calculateRotation(h.localX, h.localY)
    }
    ;
    this._onMove = function(h) {
        var q = n._calculateRotation(h.localX, h.localY) - c;
        l.rotation += q;
        Math.abs(l.rotation) > f && (l.rotation -= q);
        c = n._calculateRotation(h.localX, h.localY);
        d = n.getPercent() / 100;
        n.sendData(d)
    }
    ;
    this._onRelease = function(h) {
        d = l.rotation = 0;
        n.sendData(d)
    }
    ;
    this.getPercent = function() {
        var h = (l.rotation + f) / (2 * f) * 100
          , q = h - 50;
        return 50 <= h ? 2 * q : 2 * -q
    }
    ;
    this.getCurValue = function() {
        return d
    }
    ;
    this.sendData = function(h) {
        g[ON_CONTROLLER] && g[ON_CONTROLLER].call(p[ON_CONTROLLER], h)
    }
    ;
    var n = this;
    this._init(a, e, b)
}
function CVector2(a, e) {
    var b, c;
    this._init = function(d, f) {
        b = d;
        c = f
    }
    ;
    this.add = function(d, f) {
        b += d;
        c += f
    }
    ;
    this.addV = function(d) {
        b += d.getX();
        c += d.getY()
    }
    ;
    this.scalarDivision = function(d) {
        b /= d;
        c /= d
    }
    ;
    this.subV = function(d) {
        b -= d.getX();
        c -= d.getY()
    }
    ;
    this.scalarProduct = function(d) {
        b *= d;
        c *= d
    }
    ;
    this.invert = function() {
        b *= -1;
        c *= -1
    }
    ;
    this.dotProduct = function(d) {
        return b * d.getX() + c * d.getY()
    }
    ;
    this.set = function(d, f) {
        b = d;
        c = f
    }
    ;
    this.setV = function(d) {
        b = d.getX();
        c = d.getY()
    }
    ;
    this.length = function() {
        return Math.sqrt(b * b + c * c)
    }
    ;
    this.length2 = function() {
        return b * b + c * c
    }
    ;
    this.normalize = function() {
        var d = this.length();
        0 < d && (b /= d,
        c /= d)
    }
    ;
    this.getNormalize = function(d) {
        this.length();
        d.set(b, c);
        d.normalize()
    }
    ;
    this.rot90CCW = function() {
        var d = b;
        b = -c;
        c = d
    }
    ;
    this.rot90CW = function() {
        var d = b;
        b = c;
        c = -d
    }
    ;
    this.getRotCCW = function(d) {
        d.set(b, c);
        d.rot90CCW()
    }
    ;
    this.getRotCW = function(d) {
        d.set(b, c);
        d.rot90CW()
    }
    ;
    this.ceil = function() {
        b = Math.ceil(b);
        c = Math.ceil(c)
    }
    ;
    this.round = function() {
        b = Math.round(b);
        c = Math.round(c)
    }
    ;
    this.toString = function() {
        return "Vector2: " + b + ", " + c
    }
    ;
    this.print = function() {
        trace("Vector2: " + b + ", " + c)
    }
    ;
    this.getX = function() {
        return b
    }
    ;
    this.getY = function() {
        return c
    }
    ;
    this._init(a, e)
}
function CBallsPool(a) {
    var e, b, c, d;
    this._init = function(f) {
        d = new createjs.Container;
        f.addChild(d);
        e = 0;
        b = [];
        for (var k = 0; k < BALL_POOL_DIM; k++)
            b[k] = s_oObjectBuilder.addBall(BALL_RADIUS, BALL_STARTPOS_GAME.x, BALL_STARTPOS_GAME.y, .1, .7, 0, k),
            b[k].SetActive(!1);
        c = [];
        f = s_oSpriteLibrary.getSprite("ball");
        for (k = 0; k < BALL_POOL_DIM; k++) {
            var g = createBitmap(f);
            g.regX = f.width / 2;
            g.regY = f.height / 2;
            d.addChild(g);
            c[k] = g
        }
        f = s_oSpriteLibrary.getSprite("ear_mask");
        k = createBitmap(f);
        k.regX = f.width / 2;
        k.regY = f.height / 2;
        k.x = BALL_STARTPOS_GAME.x + 5;
        k.y = BALL_STARTPOS_GAME.y - 2;
        d.addChild(k)
    }
    ;
    this.unload = function() {
        a.removeChild(d)
    }
    ;
    this.resetBall = function(f) {
        var k = b[f];
        c[f].visible = !1;
        s_oPhysicsController.disableBody(k, BALL_STARTPOS_GAME)
    }
    ;
    this.setCurBallVisible = function() {
        c[e].visible = !0;
        this._updateSprite(e)
    }
    ;
    this.setCurBallInForeground = function() {
        var f = e;
        setTimeout(function() {
            d.setChildIndex(c[f], d.numChildren - 1)
        }, 100)
    }
    ;
    this.prepareNextBall = function() {
        this.setNextBall();
        this.setCurBallVisible();
        d.setChildIndex(c[e], 0);
        c[e].x = BALL_STARTPOS_GAME.x;
        c[e].y = BALL_STARTPOS_GAME.y + 10;
        var f = BALL_STARTPOS_GAME.y;
        createjs.Tween.get(c[e]).to({
            y: f
        }, BALL_SPAWN_TIMER)
    }
    ;
    this.setNextBall = function() {
        var f = e + 1;
        f >= b.length && (f = 0);
        if (b[f].IsActive()) {
            var k = this._findFirstAvailableBall();
            -1 !== k && (f = k)
        }
        e = f
    }
    ;
    this._findFirstAvailableBall = function() {
        for (var f = 0; f < BALL_POOL_DIM; f++)
            if (!1 === b[f].IsActive())
                return f;
        return -1
    }
    ;
    this.getCurBall = function(f) {
        return b[e]
    }
    ;
    this.getBall = function(f) {
        return b[f]
    }
    ;
    this._isBallExit = function(f) {
        return b[f].GetPosition().y > CANVAS_HEIGHT / WORLD_SCALE
    }
    ;
    this._updateSprite = function(f) {
        c[f].x = b[f].GetPosition().x * WORLD_SCALE;
        c[f].y = b[f].GetPosition().y * WORLD_SCALE
    }
    ;
    this.update = function() {
        for (var f = 0, k = 0; k < BALL_POOL_DIM; k++)
            b[k].IsActive() && (f++,
            this._updateSprite(k),
            this._isBallExit(k) && this.resetBall(k))
    }
    ;
    this._init(a)
}
function CBottomBar(a, e, b) {
    var c, d, f, k, g, p, m, l;
    this._init = function(h, q, r) {
        c = new createjs.Container;
        c.x = h;
        c.y = q;
        r.addChild(c);
        h = s_oSpriteLibrary.getSprite("power_bg");
        q = createBitmap(h);
        q.regX = h.width / 2;
        q.regY = h.height;
        q.x = 188;
        q.y = -35;
        c.addChild(q);
        h = s_oSpriteLibrary.getSprite("power_level");
        r = createBitmap(h);
        r.regX = h.width / 2;
        r.regY = h.height;
        r.x = q.x;
        r.y = q.y;
        c.addChild(r);
        h = s_oSpriteLibrary.getSprite("power_level");
        d = new createjs.Shape;
        d.graphics.beginFill("rgba(255,0,0,1)").drawRect(-h.width / 2, 0, h.width, -h.height);
        d.x = r.x;
        d.y = r.y;
        r.mask = d;
        h = s_oSpriteLibrary.getSprite("bottom_panel");
        q = createBitmap(h);
        q.regX = h.width / 2;
        q.regY = h.height;
        c.addChild(q);
        var u = -h.height / 2 + 44;
        r = q = 70;
        h = u - 3;
        f = new CTLText(c,-180 - q / 2,h - r / 2,q,r,28,"center","#f7f7f7",PRIMARY_FONT,1,2,2,"0",!0,!0,!1,!1);
        q = 180;
        k = new CTLText(c,36 - q / 2,h - r / 2,q,r,28,"center",PRIMARY_FONT_COLOUR,PRIMARY_FONT,1,2,2,formatValue(START_CREDITS),!0,!0,!1,!1);
        h = s_oSpriteLibrary.getSprite("but_buy");
        g = new CGfxButton(-298,u,h,c);
        g.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        h = s_oSpriteLibrary.getSprite("hand_anim");
        q = h.width / 5;
        r = h.height / 2;
        h = new createjs.SpriteSheet({
            images: [h],
            frames: {
                width: q,
                height: r,
                regX: q - 30,
                regY: r - 10
            },
            animations: {
                start: [5, 9, "stop"],
                stop: [9, 9, "back", .02],
                back: [0, 4, "start"],
                single_frame: [0, 0]
            }
        });
        m = createSprite(h, "start", q / 2, r / 2, q, r);
        m.x = g.getX();
        m.y = g.getY();
        c.addChild(m);
        p = new CController(265,-115,c);
        p.addEventListener(ON_CONTROLLER, this._onControllerChanged, this);
        l = createSprite(h, "single_frame", q / 2, r / 2, q, r);
        l.x = 265;
        l.y = -115;
        l.scaleY = -1;
        l.visible = !1;
        c.addChild(l);
        this._handWheelAnim(1);
        this._changePowerLevel(0)
    }
    ;
    this.unload = function() {
        g.unload();
        createjs.Tween.removeTweens(l);
        b.removeChild(c)
    }
    ;
    this.pause = function(h) {}
    ;
    this.refreshPos = function() {
        c.y = e - s_iOffsetY;
        smartResize(c, 0, 0)
    }
    ;
    this.refreshCredits = function(h) {
        k.refreshText(formatValue(h))
    }
    ;
    this.refreshBallRemaining = function(h) {
        f.refreshText(h);
        0 === h && (m.visible = !0)
    }
    ;
    this.ballRemainingIncreaseAnim = function() {
        var h = f.getX() + 25
          , q = f.getY() + 10;
        (new CAnimText("+1",h,q,c,"#19ca01")).moveUp()
    }
    ;
    this.winAnim = function(h) {
        var q = k.getX() + 85
          , r = k.getY() + 10;
        (new CAnimText("+ " + formatValue(h),q,r,c,"#ff0")).moveUpAndFlash()
    }
    ;
    this._handWheelAnim = function(h) {
        l.x = 265;
        l.y = -200;
        var q = 265 + 70 * h;
        createjs.Tween.get(l).to({
            x: q
        }, 500, createjs.Ease.sineOut).to({
            x: 265
        }, 500, createjs.Ease.sineIn);
        createjs.Tween.get(l).to({
            y: -50
        }, 1E3).wait(1E3).call(function() {
            h *= -1;
            n._handWheelAnim(h)
        })
    }
    ;
    this._checkHandWheelAnimToShown = function() {
        0 < s_oGame.getBallRemaining() && (l.visible = !0)
    }
    ;
    this._changePowerLevel = function(h) {
        d.scaleY = h
    }
    ;
    this._onButPlusRelease = function() {
        s_oGame.buyBalls();
        m.visible = !1;
        n._checkHandWheelAnimToShown()
    }
    ;
    this._onControllerChanged = function(h) {
        0 < h ? l.visible = !1 : n._checkHandWheelAnimToShown();
        n._changePowerLevel(h);
        s_oGame.onControllerChanged(h)
    }
    ;
    var n = this;
    this._init(a, e, b)
}
function CBonusPlatform(a, e, b) {
    var c, d, f, k, g, p, m, l, n;
    this._init = function(q, r, u) {
        c = [];
        d = [];
        k = new createjs.Container;
        k.x = q;
        k.y = r;
        u.addChild(k);
        q = s_oSpriteLibrary.getSprite("wall_platform_mask");
        r = createBitmap(q);
        r.regX = q.width / 2;
        r.regY = q.height / 2;
        r.y = -15;
        k.addChild(r);
        p = new CWheelEngine(k);
        p.addEventListener(ON_WHEEL_STOP, this._onWheelStop, this);
        p.addEventListener(ON_WHEEL_WIN, this._onWheelWin, this);
        u = [];
        for (var v = 0; 50 > v; v++)
            u.push(s_oSpriteLibrary.getSprite("bonus_platform_" + v));
        q = u[0].width;
        r = u[0].height;
        var x = []
          , t = {
            frames: [],
            next: "flip_to_idle",
            speed: 1
        };
        for (v = 49; 21 <= v; v--)
            x.push(v);
        t.frames = x;
        x = [];
        var y = {
            frames: [],
            next: "state_close",
            speed: 1
        };
        for (v = 20; 1 <= v; v--)
            x.push(v);
        y.frames = x;
        u = new createjs.SpriteSheet({
            framerate: 30,
            images: u,
            frames: {
                width: q,
                height: r,
                regX: q / 2,
                regY: r / 2
            },
            animations: {
                flip_to_bonus: [1, 20, "open_shutter"],
                open_shutter: [21, 49, "state_open"],
                state_open: [49, 49],
                state_close: [0, 0],
                close_shutter: t,
                flip_to_idle: y
            }
        });
        g = createSprite(u, "state_close", q / 2, r / 2, q, r);
        g.on("animationend", this._onAnimationEnd, this);
        k.addChild(g);
        q = s_oSpriteLibrary.getSprite("bonus_ball_counter");
        u = createBitmap(q);
        u.regX = q.width / 2;
        u.regY = q.height / 2;
        u.y = 170;
        u.scaleX = u.scaleY = 1.3;
        k.addChild(u);
        q = 30;
        r = 22;
        m = new CTLText(k,u.x - q / 2,u.y + 2 - r / 2,q,r,18,"center","#f7f7f7",PRIMARY_FONT,1,2,2,"0",!0,!0,!1,!1);
        h.hideReels();
        q = s_oSpriteLibrary.getSprite("bonus_text");
        l = new CLightIndicator(q,-1,124,k,0,0);
        l.setVisible(!1);
        n = new CManekinekoAnim(k);
        f = [];
        for (v = 1; 4 >= v; v++)
            f.push("exultation_" + v)
    }
    ;
    this.addEventListener = function(q, r, u) {
        c[q] = r;
        d[q] = u
    }
    ;
    this.activate = function() {
        "state_close" === g.currentAnimation && (g.gotoAndPlay("flip_to_bonus"),
        n.hide(),
        playSound("platform_turn", 1, !1))
    }
    ;
    this.deactivate = function() {
        g.gotoAndPlay("close_shutter")
    }
    ;
    this.pause = function(q) {
        n.pause(q);
        p.pause(q)
    }
    ;
    this.showReels = function() {
        p.setVisible(!0)
    }
    ;
    this.hideReels = function() {
        p.setVisible(!1)
    }
    ;
    this.setNumBalls = function(q) {
        m.refreshText(q)
    }
    ;
    this.spin = function(q) {
        p.generateWheelCombo(q)
    }
    ;
    this._onWheelStop = function() {
        c[ON_WHEEL_STOP] && c[ON_WHEEL_STOP].call(d[ON_WHEEL_STOP], "");
        c[ON_WHEEL_READY_TO_SPIN] && c[ON_WHEEL_READY_TO_SPIN].call(d[ON_WHEEL_READY_TO_SPIN], "");
        l.highlight2(3E3)
    }
    ;
    this._onWheelWin = function(q) {
        l.longFlashing();
        playSound("bonus_win", 1, !1);
        2 > q ? playSound(f[Math.floor(Math.random() * f.length)], 1, !1) : playSound("well_done", 1, !1);
        c[ON_WHEEL_WIN] && c[ON_WHEEL_WIN].call(d[ON_WHEEL_WIN], q)
    }
    ;
    this._onAnimationEnd = function() {
        switch (g.currentAnimation) {
        case "flip_to_bonus":
            h.showReels();
            l.setVisible(!0);
            l.highlight2(3E3);
            break;
        case "close_shutter":
            h.hideReels();
            l.setVisible(!1);
            playSound("platform_turn", 1, !1);
            break;
        case "flip_to_idle":
            n.show();
            break;
        case "state_open":
            c[ON_WHEEL_READY_TO_SPIN] && c[ON_WHEEL_READY_TO_SPIN].call(d[ON_WHEEL_READY_TO_SPIN], "");
            break;
        case "state_close":
            c[ON_WHEEL_CLOSED] && c[ON_WHEEL_CLOSED].call(d[ON_WHEEL_CLOSED], "")
        }
    }
    ;
    this.update = function() {
        p.update()
    }
    ;
    var h = this;
    this._init(a, e, b)
}
function CWheelEngine(a) {
    var e, b, c, d, f, k, g, p, m, l, n, h, q, r;
    this._init = function(v) {
        e = !1;
        b = WHEEL_STATE_IDLE;
        f = d = c = 0;
        k = ANIM_WIN_LOOPS * NUM_REELS;
        m = [];
        for (var x = 0; x < NUM_REELS; x++)
            m.push(x);
        d = m[0];
        g = [];
        p = [];
        h = [];
        n = [];
        for (x = 0; x < NUM_ROWS; x++) {
            n[x] = [];
            for (var t = 0; t < NUM_REELS; t++)
                n[x][t] = 0
        }
        q = new createjs.Container;
        v.addChild(q);
        x = s_oSpriteLibrary.getSprite("bg_reels");
        t = createBitmap(x);
        t.regX = x.width / 2;
        t.y = REEL_OFFSET_Y;
        q.addChild(t);
        r = new createjs.Shape;
        r.graphics.beginFill("rgba(255,250,0,0.01)").drawRect(REEL_OFFSET_X, REEL_OFFSET_Y, SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * NUM_REELS, SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * NUM_ROWS);
        v = 0;
        var y = REEL_OFFSET_X
          , G = REEL_OFFSET_Y;
        l = [];
        for (x = 0; x < NUM_REELS; x++) {
            var z = [];
            for (t = 0; t < NUM_ROWS; t++)
                z.push(Math.floor(Math.random() * NUM_SYMBOLS));
            l[x] = new CReelColumn(x,y,G,v,z,q,q);
            l[x + NUM_REELS] = new CReelColumn(x + NUM_REELS,y,G + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS,v,z,q,q);
            l[x].addEventListener(ON_REEL_ARRIVED, this.reelArrived, this);
            l[x + NUM_REELS].addEventListener(ON_REEL_ARRIVED, this.reelArrived, this);
            l[x].addEventListener(ON_REEL_STOP, this.stopNextReel, this);
            l[x + NUM_REELS].addEventListener(ON_REEL_STOP, this.stopNextReel, this);
            l[x].setMask(r);
            l[x + NUM_REELS].setMask(r);
            y += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS;
            v += REEL_DELAY
        }
    }
    ;
    this.addEventListener = function(v, x, t) {
        g[v] = x;
        p[v] = t
    }
    ;
    this.pause = function(v) {
        v ? setVolume("reels", 0) : setVolume("reels", 1)
    }
    ;
    this.setVisible = function(v) {
        q.visible = v
    }
    ;
    this.resetWheel = function() {
        for (var v = 0; v < h.length; v++)
            h[v].stop(),
            q.removeChild(h[v]);
        h = [];
        k = ANIM_WIN_LOOPS * NUM_REELS
    }
    ;
    this.stopNextReel = function() {
        f++;
        0 === f % 2 ? (d = m[f / 2],
        f === 2 * NUM_REELS && this._endReelAnimation()) : playSound("reels_stop", 1, !1)
    }
    ;
    this.reelArrived = function(v, x) {
        if (c > MIN_REEL_LOOPS && e)
            if (d === x) {
                if (!1 === l[v].isReadyToStop()) {
                    var t = v;
                    if (v < NUM_REELS) {
                        t += NUM_REELS;
                        for (var y = [], G = 0; G < n.length; G++)
                            y.push(n[G][v])
                    } else
                        for (t -= NUM_REELS,
                        y = [],
                        G = 0; G < n.length; G++)
                            y.push(n[G][t]);
                    l[t].setReadyToStop();
                    l[v].restart(y, !0)
                }
            } else
                l[v].restart(this._generateRandSymbols(), !1);
        else
            l[v].restart(this._generateRandSymbols(), !1),
            0 === v && c++
    }
    ;
    this._generateRandSymbols = function() {
        for (var v = [], x = 0; x < NUM_ROWS; x++)
            v[x] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return v
    }
    ;
    this.generateWheelCombo = function(v) {
        playSound("reels", .5, !0);
        u.resetWheel();
        for (var x = 0, t = 0; t < NUM_ROWS; t++)
            for (var y = 0; y < NUM_REELS; y++)
                n[t][y] = v[x],
                x++;
        for (t = 0; t < NUM_REELS; t++)
            l[t].activate(),
            l[t + NUM_REELS].activate();
        e = !0;
        b = WHEEL_STATE_SPINNING
    }
    ;
    this._endReelAnimation = function() {
        b = WHEEL_STATE_IDLE;
        f = c = 0;
        d = m[0];
        e = !1;
        stopSound("reels");
        this._isAWinningCombo(n[0]) ? (u.showWin(),
        g[ON_WHEEL_WIN] && g[ON_WHEEL_WIN].call(p[ON_WHEEL_WIN], n[0][0])) : g[ON_WHEEL_STOP] && g[ON_WHEEL_STOP].call(p[ON_WHEEL_STOP], "")
    }
    ;
    this.showWin = function() {
        var v = REEL_OFFSET_X
          , x = REEL_OFFSET_Y;
        h = [];
        for (var t = 0; t < NUM_REELS; t++) {
            var y = createSprite(s_aSymbolsWinAnim[n[0][t]], "win", 0, 0, 0, 0);
            y.on("animationend", this._onWinAnimationEnd, this);
            y.x = v;
            y.y = x;
            q.addChild(y);
            v += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS;
            h.push(y)
        }
    }
    ;
    this._onWinAnimationEnd = function() {
        k--;
        0 >= k && (u.resetWheel(),
        g[ON_WHEEL_STOP] && g[ON_WHEEL_STOP].call(p[ON_WHEEL_STOP], ""))
    }
    ;
    this._isAWinningCombo = function(v) {
        for (var x = 0; x < WHEEL_WINNING_COMBO.length; x++)
            if (arraysEqual(WHEEL_WINNING_COMBO[x], v))
                return !0;
        return !1
    }
    ;
    this.update = function() {
        switch (b) {
        case WHEEL_STATE_SPINNING:
            for (var v = 0; v < l.length; v++)
                l[v].update()
        }
    }
    ;
    var u = this;
    this._init(a)
}
function CReelColumn(a, e, b, c, d, f, k) {
    var g, p, m, l, n, h, q, r, u, v, x, t, y, G, z, H, I, A, P, R = null, D, E, T, W;
    this._init = function(C, O, J, K, w, Z, aa) {
        m = p = g = !1;
        q = 0;
        l = C;
        h = K;
        u = -1;
        z = [];
        H = [];
        n = l < NUM_REELS ? l : l - NUM_REELS;
        v = 0;
        x = MAX_FRAMES_REEL_EASE;
        r = REEL_STATE_START;
        y = t = J;
        G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        T = Z;
        W = aa;
        this.initContainer(O, J, w);
        P = []
    }
    ;
    this.initContainer = function(C, O, J) {
        E = new createjs.Container;
        E.x = C;
        E.y = O;
        C = 0;
        I = [];
        A = [];
        for (O = 0; O < NUM_ROWS; O++) {
            var K = J[O]
              , w = new createjs.Sprite(s_aSymbolData[J[O]]);
            w.x = 0;
            w.y = C;
            E.addChild(w);
            I[O] = w;
            A[O] = K;
            C += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
        T.addChild(E)
    }
    ;
    this.unload = function() {
        T.removeChild(E)
    }
    ;
    this.addEventListener = function(C, O, J) {
        z[C] = O;
        H[C] = J
    }
    ;
    this.setMask = function(C) {
        E.mask = C
    }
    ;
    this.showDark = function(C) {}
    ;
    this.activate = function() {
        y = E.y;
        G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        g = !0
    }
    ;
    this.setSymbol = function(C) {
        E.removeAllChildren();
        for (var O = 0, J = 0; J < C.length; J++) {
            var K = new createjs.Sprite(s_aSymbolData[C[J]]);
            K.x = 0;
            K.y = O;
            K.gotoAndStop("static");
            K.scaleX = K.scaleY = SCALE_SYMBOL;
            E.addChild(K);
            I[J] = K;
            A[J] = C[J];
            r === REEL_STATE_MOVING && I[J].gotoAndStop("blur");
            O += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
    }
    ;
    this.refreshPos = function(C, O) {
        v = 0;
        x = MAX_FRAMES_REEL_EASE;
        t = y = O;
        G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        E.x = C;
        E.y = O;
        for (var J = 0, K = 0; K < d.length; K++)
            I[K].x = 0,
            I[K].y = J,
            I[K].scaleX = I[K].scaleY = SCALE_SYMBOL,
            J += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS;
        null !== R && (R.x = E.x + I[u].x - SCALE_SYMBOL,
        R.y = E.y + I[u].y - SCALE_SYMBOL,
        R.scaleX = R.scaleY = SCALE_SYMBOL,
        D.x = E.x + I[u].x,
        D.y = E.y + I[u].y,
        D.scaleX = D.scaleY = SCALE_SYMBOL);
        for (K = 0; K < P.length; K++)
            P[K].highlight.x = E.x + I[P[K].index].x,
            P[K].highlight.y = E.y + I[P[K].index].y,
            P[K].winframe.x = E.x + I[P[K].index].x - SCALE_SYMBOL,
            P[K].winframe.y = E.y + I[P[K].index].y - SCALE_SYMBOL
    }
    ;
    this.forceStop = function(C, O) {
        null !== C && this.setSymbol(C);
        for (var J = 0; J < I.length; J++)
            I[J].gotoAndStop("static");
        E.y = O;
        g = !1;
        v = 0;
        x = MAX_FRAMES_REEL_EASE;
        r = REEL_STATE_START;
        q = 0;
        m = p = !1
    }
    ;
    this.highlightSymbol = function(C) {
        D = new createjs.Sprite(s_aSymbolData[A[C]]);
        D.gotoAndStop("highlight");
        D.x = E.x + I[C].x;
        D.y = E.y + I[C].y;
        D.scaleX = D.scaleY = SCALE_SYMBOL;
        W.addChild(D);
        R = new createjs.Bitmap(s_oSpriteLibrary.getSprite("frame_win"));
        R.x = E.x + I[C].x - SCALE_SYMBOL;
        R.y = E.y + I[C].y - SCALE_SYMBOL;
        R.scaleX = R.scaleY = SCALE_SYMBOL;
        W.addChild(R);
        u = C;
        P.push({
            highlight: D,
            winframe: R,
            index: u
        })
    }
    ;
    this.removeHighlight = function() {
        for (var C = 0; C < P.length; C++)
            W.removeChild(P[C].highlight),
            W.removeChild(P[C].winframe);
        P = []
    }
    ;
    this.showSymbol = function(C) {
        I[C].visible = !0;
        null !== R && (W.removeChild(R),
        R = null,
        W.removeChild(D),
        D = null,
        u = -1);
        P = []
    }
    ;
    this.hideSymbol = function(C) {
        I[C].visible = !1
    }
    ;
    this.restart = function(C, O) {
        E.y = y = REEL_START_Y;
        G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        this.setSymbol(C);
        if (p = O) {
            v = 0;
            x = MAX_FRAMES_REEL_EASE;
            r = REEL_STATE_STOP;
            m = !0;
            for (var J = 0; J < I.length; J++)
                I[J].gotoAndStop("static")
        }
    }
    ;
    this.setReadyToStop = function() {
        v = 0;
        x = MAX_FRAMES_REEL_EASE;
        r = REEL_STATE_STOP
    }
    ;
    this.isReadyToStop = function() {
        return p
    }
    ;
    this.getValue = function(C) {
        return A[C]
    }
    ;
    this.getY = function() {
        return E.y
    }
    ;
    this.isCurrentlyVisible = function() {
        return E.y >= G ? !1 : !0
    }
    ;
    this.getPosBottomCenter = function(C) {
        return {
            x: E.x + SYMBOL_WIDTH / 2,
            y: t + SYMBOL_HEIGHT * (C + 1)
        }
    }
    ;
    this.getPosBottomLeft = function(C) {
        return {
            x: E.x,
            y: t + SYMBOL_HEIGHT * (C + 1)
        }
    }
    ;
    this.getPosUpLeft = function(C) {
        return {
            x: E.x,
            y: E.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * C
        }
    }
    ;
    this.getPosUpCenter = function(C) {
        return {
            x: E.x + SYMBOL_WIDTH / 2,
            y: t + SYMBOL_HEIGHT * C
        }
    }
    ;
    this.getPosCenterLeft = function(C) {
        return {
            x: E.x,
            y: t + SYMBOL_HEIGHT * C + SYMBOL_HEIGHT / 2
        }
    }
    ;
    this.getPosCenter = function(C) {
        return {
            x: E.x + SYMBOL_WIDTH / 2,
            y: t + SYMBOL_HEIGHT * C + SYMBOL_HEIGHT / 2
        }
    }
    ;
    this._updateStart = function() {
        v++;
        var C = 4 * x;
        if (v > C) {
            v = 0;
            r++;
            y = E.y;
            G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
            for (var O = 0; O < I.length; O++)
                I[O].gotoAndStop("blur")
        }
        C = s_oTweenController.easeInBack(v, 0, 1, C);
        C = s_oTweenController.tweenValue(y, G, C);
        E.y = C
    }
    ;
    this._updateMoving = function() {
        v++;
        v > x && (v = 0,
        y = E.y,
        G = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        var C = s_oTweenController.easeLinear(v, 0, 1, x);
        C = s_oTweenController.tweenValue(y, G, C);
        E.y = C
    }
    ;
    this._updateStopping = function() {
        v++;
        if (v > x) {
            g = !1;
            v = 0;
            x = MAX_FRAMES_REEL_EASE;
            r = REEL_STATE_START;
            q = 0;
            p = !1;
            if (m)
                m = !1,
                E.y = REEL_OFFSET_Y;
            else
                for (var C = 0; C < I.length; C++)
                    I[C].gotoAndStop("static");
            z[ON_REEL_STOP] && z[ON_REEL_STOP].call(H[ON_REEL_STOP], "")
        } else
            p = !0,
            C = s_oTweenController.easeOutBack(v, 0, 1, x),
            C = s_oTweenController.tweenValue(y, G, C),
            E.y = C
    }
    ;
    this.update = function() {
        if (!1 !== g && (q++,
        q > h))
            switch (!1 === p && E.y > REEL_ARRIVAL_Y && z[ON_REEL_ARRIVED] && z[ON_REEL_ARRIVED].call(H[ON_REEL_ARRIVED], l, n),
            r) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
            }
    }
    ;
    this._init(a, e, b, c, d, f, k)
}
function CTweenController() {
    this.tweenValue = function(a, e, b) {
        return a + b * (e - a)
    }
    ;
    this.easeLinear = function(a, e, b, c) {
        return b * a / c + e
    }
    ;
    this.easeInCubic = function(a, e, b, c) {
        c = (a /= c) * a * a;
        return e + b * c
    }
    ;
    this.easeBackInQuart = function(a, e, b, c) {
        c = (a /= c) * a;
        return e + b * (2 * c * c + 2 * c * a + -3 * c)
    }
    ;
    this.easeInBack = function(a, e, b, c) {
        return b * (a /= c) * a * (2.70158 * a - 1.70158) + e
    }
    ;
    this.easeOutCubic = function(a, e, b, c) {
        return b * ((a = a / c - 1) * a * a + 1) + e
    }
    ;
    this.easeOutElastic = function(a, e, b, c) {
        if (0 === a)
            return e;
        if (1 === (a /= c))
            return e + b;
        var d = .3 * c;
        return b * Math.pow(2, -10 * a) * Math.sin(2 * (a * c - d / 4) * Math.PI / d) + b + e
    }
    ;
    this.easeOutBack = function(a, e, b, c) {
        return b * ((a = a / c - 1) * a * (2.70158 * a + 1.70158) + 1) + e
    }
}
function CSymbolsSettings() {
    this._init = function() {
        this._initSymbolAnims();
        this._initSymbolsOccurence();
        this._initSymbolsSpritesheets()
    }
    ;
    this._initSymbolAnims = function() {
        s_aSymbolsWinAnim = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var e = s_oSpriteLibrary.getSprite("symbol_" + a + "_anim");
            e = new createjs.SpriteSheet({
                framerate: 30,
                images: [e],
                frames: {
                    width: e.width / 5,
                    height: e.height / 4,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    win: [0, 19]
                }
            });
            s_aSymbolsWinAnim.push(e)
        }
    }
    ;
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 10 > a; a++)
            s_aRandSymbols.push(0);
        for (a = 0; 10 > a; a++)
            s_aRandSymbols.push(1);
        for (a = 0; 10 > a; a++)
            s_aRandSymbols.push(2)
    }
    ;
    this._initSymbolsSpritesheets = function() {
        s_aSymbolData = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var e = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_WIDTH,
                    height: SYMBOL_HEIGHT,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0],
                    blur: [1]
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(e)
        }
    }
    ;
    this._init()
}
var s_aSymbolData, s_aRandSymbols, s_aSymbolsWinAnim;
function CManekinekoAnim(a) {
    var e, b, c, d, f;
    this._init = function(g) {
        b = 8E3;
        c = new createjs.Container;
        g.addChild(c);
        var p = {
            frames: [],
            next: "state_open",
            speed: 1
        };
        g = [5, 5, 5, 0, 0, 5, 5, 5];
        p.frames = g;
        var m = {
            frames: [],
            next: "state_open",
            speed: 1
        };
        g = [5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5];
        m.frames = g;
        var l = {
            frames: [],
            next: "state_open",
            speed: .5
        };
        g = [12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18];
        l.frames = g;
        var n = {
            frames: [],
            next: "state_open",
            speed: .5
        };
        g = [19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 24, 25, 26];
        n.frames = g;
        var h = {
            frames: [],
            next: "state_open",
            speed: .3
        };
        g = [12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 24, 25, 26];
        h.frames = g;
        var q = {
            frames: [],
            next: "state_close",
            speed: .3
        };
        g = [12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 24, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 28, 29, 30, 31, 32];
        q.frames = g;
        var r = {
            frames: [],
            next: "state_close",
            speed: .3
        };
        g = [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0];
        r.frames = g;
        var u = {
            frames: [],
            next: "state_open",
            speed: .3
        };
        g = [9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 24, 25, 26];
        u.frames = g;
        var v = {
            frames: [],
            next: "state_close",
            speed: .3
        };
        g = [9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 24, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 28, 29, 30, 31, 32];
        v.frames = g;
        var x = s_oSpriteLibrary.getSprite("head");
        g = x.width / 3;
        var t = x.height / 11;
        p = {
            framerate: 30,
            images: [x],
            frames: {
                width: g,
                height: t,
                regX: g / 2,
                regY: t / 2
            },
            animations: {
                state_open: [5, 5],
                state_close: [0, 0],
                close_eyes: [5, 8, "state_close"],
                blink: p,
                blink2: m,
                look_left: l,
                look_right: n,
                opened_wary: h,
                opened_wary_and_close: q,
                open_eyes: [0, 5, "state_open"],
                wary: u,
                wary_and_close: v,
                straight_left: {
                    frames: [15],
                    next: "state_close",
                    speed: .01
                },
                straight_right: {
                    frames: [22],
                    next: "state_close",
                    speed: .01
                },
                furtively: r
            }
        };
        p = new createjs.SpriteSheet(p);
        d = createSprite(p, "state_close", g / 2, t / 2, g, t);
        d.on("animationend", this._onAnimationHeadEnd, this);
        d.y = -9;
        c.addChild(d);
        x = s_oSpriteLibrary.getSprite("arm");
        g = x.width / 10;
        t = x.height / 3;
        p = {
            framerate: 30,
            images: [x],
            frames: {
                width: g,
                height: t,
                regX: g / 2,
                regY: t / 2
            },
            animations: {
                idle: [0, 29]
            }
        };
        p = new createjs.SpriteSheet(p);
        f = createSprite(p, "idle", g / 2, t / 2, g, t);
        f.x = -48;
        f.y = -4;
        c.addChild(f)
    }
    ;
    this.show = function(g) {
        c.visible = !0;
        f.gotoAndPlay("idle")
    }
    ;
    this.hide = function() {
        c.visible = !1
    }
    ;
    this.pause = function(g) {
        clearTimeout(e);
        g ? (f.stop(),
        d.stop()) : (f.play(),
        d.play())
    }
    ;
    this._onAnimationHeadEnd = function() {
        switch (d.currentAnimation) {
        case "state_open":
            k._chooseAnimFromOpenState();
            break;
        case "state_close":
            k._chooseAnimFromClosedState()
        }
    }
    ;
    this._chooseAnimFromOpenState = function() {
        var g = "close_eyes close_eyes blink blink blink blink2 blink2 look_left look_right opened_wary opened_wary_and_close".split(" ");
        k._prepareNextAnimation(g[Math.floor(Math.random() * g.length)])
    }
    ;
    this._chooseAnimFromClosedState = function() {
        var g = "open_eyes wary wary_and_close straight_left straight_right furtively".split(" ");
        k._prepareNextAnimation(g[Math.floor(Math.random() * g.length)])
    }
    ;
    this._prepareNextAnimation = function(g) {
        e = setTimeout(function() {
            d.gotoAndPlay(g)
        }, b)
    }
    ;
    var k = this;
    this._init(a)
}
function CAnimText(a, e, b, c, d) {
    var f;
    this._init = function(k, g, p, m, l) {
        f = new createjs.Text("0"," 30px " + PRIMARY_FONT,l);
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.text = k;
        f.x = g;
        f.y = p;
        f.alpha = 0;
        m.addChild(f)
    }
    ;
    this.moveUp = function() {
        var k = this
          , g = f.y - 50;
        createjs.Tween.get(f).to({
            y: g
        }, 800, createjs.Ease.sineIn).call(function() {
            k.unload()
        });
        createjs.Tween.get(f).to({
            alpha: 1
        }, 400, createjs.Ease.cubicOut).to({
            alpha: 0
        }, 400, createjs.Ease.cubicIn)
    }
    ;
    this.moveUpAndFlash = function() {
        var k = this;
        f.alpha = 1;
        var g = f.y - 16;
        createjs.Tween.get(f).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200);
        createjs.Tween.get(f).to({
            y: g
        }, 800, createjs.Ease.sineIn).wait(2E3).call(function() {
            k.unload()
        })
    }
    ;
    this.unload = function() {
        c.removeChild(f)
    }
    ;
    this._init(a, e, b, c, d)
}
function CArrowsStart(a, e, b) {
    var c, d, f;
    this._init = function(g, p, m) {
        f = new createjs.Container;
        f.x = g;
        f.y = p;
        m.addChild(f);
        c = 0;
        d = [];
        g = s_oSpriteLibrary.getSprite("arrow_start");
        g = new CLightIndicator(g,4,0,f,0,0);
        d.unshift(g);
        g = s_oSpriteLibrary.getSprite("arrow_start");
        g = new CLightIndicator(g,-5,30,f,0,0);
        g.rotate(-10);
        d.unshift(g);
        g = s_oSpriteLibrary.getSprite("arrow_start");
        g = new CLightIndicator(g,-12,60,f,0,0);
        g.rotate(-16);
        d.unshift(g);
        g = s_oSpriteLibrary.getSprite("arrow_start");
        g = new CLightIndicator(g,-14,90,f,0,0);
        g.rotate(-22);
        d.unshift(g);
        this.startLighting()
    }
    ;
    this.startLighting = function() {
        for (var g = c = 0; g < d.length; g++)
            d[g].slowHighlight(600, 300 * g, this.endLighting)
    }
    ;
    this.whilePlayingLighting = function() {
        for (var g = c = 0; g < d.length; g++)
            d[g].slowHighlight(300, 50 * g, this.endLighting2)
    }
    ;
    this.endLighting2 = function() {
        c++;
        c >= d.length && k.whilePlayingLighting()
    }
    ;
    this.endLighting = function() {
        c++;
        c >= d.length && k.startLighting()
    }
    ;
    this.stopAnimLighting = function() {
        for (var g = 0; g < d.length; g++)
            d[g].slowOff(1E3, 0)
    }
    ;
    var k = this;
    this._init(a, e, b)
}
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var e = a.split(".")
      , b = e.length;
    2 < b && (a = e[b - 2] + "." + e[b - 1]);
    return a
}
var getClosestTop = function() {
    var a = window
      , e = !1;
    try {
        for (; a.parent.document !== a.document; )
            if (a.parent.document)
                a = a.parent;
            else {
                e = !0;
                break
            }
    } catch (b) {
        e = !0
    }
    return {
        topFrame: a,
        err: e
    }
}
  , getBestPageUrl = function(a) {
    var e = a.topFrame
      , b = "";
    if (a.err)
        try {
            try {
                b = window.top.location.href
            } catch (d) {
                var c = window.location.ancestorOrigins;
                b = c[c.length - 1]
            }
        } catch (d) {
            b = e.document.referrer
        }
    else
        b = e.location.href;
    return b
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), e = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], b = 0; b < e.length; b++)
        if (e[b] === a)
            return !0;
    return !1
}
;
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
createjs.extend = function(a, c) {
    function b() {
        this.constructor = a
    }
    b.prototype = c.prototype;
    return a.prototype = new b
}
;
this.createjs = this.createjs || {};
createjs.promote = function(a, c) {
    var b = a.prototype
      , d = Object.getPrototypeOf && Object.getPrototypeOf(b) || b.__proto__;
    if (d) {
        b[(c += "_") + "constructor"] = d.constructor;
        for (var e in d)
            b.hasOwnProperty(e) && "function" == typeof d[e] && (b[c + e] = d[e])
    }
    return a
}
;
this.createjs = this.createjs || {};
createjs.deprecate = function(a, c) {
    return function() {
        var b = "Deprecated property or method '" + c + "'. See docs for info.";
        console && (console.warn ? console.warn(b) : console.log(b));
        return a && a.apply(this, arguments)
    }
}
;
this.createjs = this.createjs || {};
(function() {
    function a(a, c, e) {
        this.type = a;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!c;
        this.cancelable = !!e;
        this.timeStamp = (new Date).getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1
    }
    var c = a.prototype;
    c.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }
    ;
    c.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    c.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    c.remove = function() {
        this.removed = !0
    }
    ;
    c.clone = function() {
        return new a(this.type,this.bubbles,this.cancelable)
    }
    ;
    c.set = function(a) {
        for (var b in a)
            this[b] = a[b];
        return this
    }
    ;
    c.toString = function() {
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
    var c = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = c.addEventListener;
        a.on = c.on;
        a.removeEventListener = a.off = c.removeEventListener;
        a.removeAllEventListeners = c.removeAllEventListeners;
        a.hasEventListener = c.hasEventListener;
        a.dispatchEvent = c.dispatchEvent;
        a._dispatchEvent = c._dispatchEvent;
        a.willTrigger = c.willTrigger
    }
    ;
    c.addEventListener = function(a, c, e) {
        var b = e ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var d = b[a];
        d && this.removeEventListener(a, c, e);
        (d = b[a]) ? d.push(c) : b[a] = [c];
        return c
    }
    ;
    c.on = function(a, c, e, f, h, g) {
        c.handleEvent && (e = e || c,
        c = c.handleEvent);
        e = e || this;
        return this.addEventListener(a, function(a) {
            c.call(e, a, h);
            f && a.remove()
        }, g)
    }
    ;
    c.removeEventListener = function(a, c, e) {
        if (e = e ? this._captureListeners : this._listeners) {
            var b = e[a];
            if (b)
                for (var d = 0, g = b.length; d < g; d++)
                    if (b[d] == c) {
                        1 == g ? delete e[a] : b.splice(d, 1);
                        break
                    }
        }
    }
    ;
    c.off = c.removeEventListener;
    c.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a],
        this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }
    ;
    c.dispatchEvent = function(a, c, e) {
        if ("string" == typeof a) {
            var b = this._listeners;
            if (!(c || b && b[a]))
                return !0;
            a = new createjs.Event(a,c,e)
        } else
            a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (h) {}
        if (a.bubbles && this.parent) {
            e = this;
            for (c = [e]; e.parent; )
                c.push(e = e.parent);
            b = c.length;
            for (e = b - 1; 0 <= e && !a.propagationStopped; e--)
                c[e]._dispatchEvent(a, 1 + (0 == e));
            for (e = 1; e < b && !a.propagationStopped; e++)
                c[e]._dispatchEvent(a, 3)
        } else
            this._dispatchEvent(a, 2);
        return !a.defaultPrevented
    }
    ;
    c.hasEventListener = function(a) {
        var b = this._listeners
          , c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }
    ;
    c.willTrigger = function(a) {
        for (var b = this; b; ) {
            if (b.hasEventListener(a))
                return !0;
            b = b.parent
        }
        return !1
    }
    ;
    c.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    c._dispatchEvent = function(a, c) {
        var b, d, h = 2 >= c ? this._captureListeners : this._listeners;
        if (a && h && (d = h[a.type]) && (b = d.length)) {
            try {
                a.currentTarget = this
            } catch (m) {}
            try {
                a.eventPhase = c | 0
            } catch (m) {}
            a.removed = !1;
            d = d.slice();
            for (h = 0; h < b && !a.immediatePropagationStopped; h++) {
                var g = d[h];
                g.handleEvent ? g.handleEvent(a) : g(a);
                a.removed && (this.off(a.type, g, 1 == c),
                a.removed = !1)
            }
        }
        2 === c && this._dispatchEvent(a, 2.1)
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
    a._setInterval = function(b) {
        a._interval = b;
        a._inited && a._setupTick()
    }
    ;
    a.setInterval = createjs.deprecate(a._setInterval, "Ticker.setInterval");
    a._getInterval = function() {
        return a._interval
    }
    ;
    a.getInterval = createjs.deprecate(a._getInterval, "Ticker.getInterval");
    a._setFPS = function(b) {
        a._setInterval(1E3 / b)
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
    } catch (d) {
        console.log(d)
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
            var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            b && b(a._timerId)
        } else
            clearTimeout(a._timerId);
        a.removeAllEventListeners("tick");
        a._timerId = a._times = a._tickTimes = null;
        a._startTime = a._lastTime = a._ticks = a._pausedTime = 0;
        a._inited = !1
    }
    ;
    a.getMeasuredTickTime = function(b) {
        var c = 0
          , d = a._tickTimes;
        if (!d || 1 > d.length)
            return -1;
        b = Math.min(d.length, b || a._getFPS() | 0);
        for (var h = 0; h < b; h++)
            c += d[h];
        return c / b
    }
    ;
    a.getMeasuredFPS = function(b) {
        var c = a._times;
        if (!c || 2 > c.length)
            return -1;
        b = Math.min(c.length - 1, b || a._getFPS() | 0);
        return 1E3 / ((c[0] - c[b]) / b)
    }
    ;
    a.getTime = function(b) {
        return a._startTime ? a._getTime() - (b ? a._pausedTime : 0) : -1
    }
    ;
    a.getEventTime = function(b) {
        return a._startTime ? (a._lastTime || a._startTime) - (b ? a._pausedTime : 0) : -1
    }
    ;
    a.getTicks = function(b) {
        return a._ticks - (b ? a._pausedTicks : 0)
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
            var b = a.timingMode;
            if (b == a.RAF_SYNCHED || b == a.RAF) {
                var c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (c) {
                    a._timerId = c(b == a.RAF ? a._handleRAF : a._handleSynch);
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
        var b = a.paused
          , c = a._getTime()
          , f = c - a._lastTime;
        a._lastTime = c;
        a._ticks++;
        b && (a._pausedTicks++,
        a._pausedTime += f);
        if (a.hasEventListener("tick")) {
            var h = new createjs.Event("tick")
              , g = a.maxDelta;
            h.delta = g && f > g ? g : f;
            h.paused = b;
            h.time = c;
            h.runTime = c - a._pausedTime;
            a.dispatchEvent(h)
        }
        for (a._tickTimes.unshift(a._getTime() - c); 100 < a._tickTimes.length; )
            a._tickTimes.pop();
        for (a._times.unshift(c); 100 < a._times.length; )
            a._times.pop()
    }
    ;
    var c = window
      , b = c.performance.now || c.performance.mozNow || c.performance.msNow || c.performance.oNow || c.performance.webkitNow;
    a._getTime = function() {
        return (b && b.call(c.performance) || (new Date).getTime()) - a._startTime
    }
    ;
    createjs.Ticker = a
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(a) {
        this.EventDispatcher_constructor();
        this.ignoreGlobalPause = !1;
        this.loop = 0;
        this.bounce = this.reversed = this.useTicks = !1;
        this.timeScale = 1;
        this.position = this.duration = 0;
        this.rawPosition = -1;
        this._paused = !0;
        this._labelList = this._labels = this._parent = this._prev = this._next = null;
        a && (this.useTicks = !!a.useTicks,
        this.ignoreGlobalPause = !!a.ignoreGlobalPause,
        this.loop = !0 === a.loop ? -1 : a.loop || 0,
        this.reversed = !!a.reversed,
        this.bounce = !!a.bounce,
        this.timeScale = a.timeScale || 1,
        a.onChange && this.addEventListener("change", a.onChange),
        a.onComplete && this.addEventListener("complete", a.onComplete))
    }
    var c = createjs.extend(a, createjs.EventDispatcher);
    c._setPaused = function(a) {
        createjs.Tween._register(this, a);
        return this
    }
    ;
    c.setPaused = createjs.deprecate(c._setPaused, "AbstractTween.setPaused");
    c._getPaused = function() {
        return this._paused
    }
    ;
    c.getPaused = createjs.deprecate(c._getPaused, "AbstactTween.getPaused");
    c._getCurrentLabel = function(a) {
        var b = this.getLabels();
        null == a && (a = this.position);
        for (var c = 0, f = b.length; c < f && !(a < b[c].position); c++)
            ;
        return 0 === c ? null : b[c - 1].label
    }
    ;
    c.getCurrentLabel = createjs.deprecate(c._getCurrentLabel, "AbstractTween.getCurrentLabel");
    try {
        Object.defineProperties(c, {
            paused: {
                set: c._setPaused,
                get: c._getPaused
            },
            currentLabel: {
                get: c._getCurrentLabel
            }
        })
    } catch (b) {}
    c.advance = function(a, c) {
        this.setPosition(this.rawPosition + a * this.timeScale, c)
    }
    ;
    c.setPosition = function(a, c, e, f) {
        var b = this.duration
          , d = this.loop
          , m = this.rawPosition
          , l = 0;
        0 > a && (a = 0);
        if (0 === b) {
            var n = !0;
            if (-1 !== m)
                return n
        } else {
            var q = a / b | 0;
            l = a - q * b;
            (n = -1 !== d && a >= d * b + b) && (a = (l = b) * (q = d) + b);
            if (a === m)
                return n;
            !this.reversed !== !(this.bounce && q % 2) && (l = b - l)
        }
        this.position = l;
        this.rawPosition = a;
        this._updatePosition(e, n);
        n && (this.paused = !0);
        f && f(this);
        c || this._runActions(m, a, e, !e && -1 === m);
        this.dispatchEvent("change");
        n && this.dispatchEvent("complete")
    }
    ;
    c.calculatePosition = function(a) {
        var b = this.duration
          , c = this.loop
          , f = 0;
        if (0 === b)
            return 0;
        -1 !== c && a >= c * b + b ? (a = b,
        f = c) : 0 > a ? a = 0 : (f = a / b | 0,
        a -= f * b);
        return !this.reversed !== !(this.bounce && f % 2) ? b - a : a
    }
    ;
    c.getLabels = function() {
        var a = this._labelList;
        if (!a) {
            a = this._labelList = [];
            var c = this._labels, e;
            for (e in c)
                a.push({
                    label: e,
                    position: c[e]
                });
            a.sort(function(a, b) {
                return a.position - b.position
            })
        }
        return a
    }
    ;
    c.setLabels = function(a) {
        this._labels = a;
        this._labelList = null
    }
    ;
    c.addLabel = function(a, c) {
        this._labels || (this._labels = {});
        this._labels[a] = c;
        var b = this._labelList;
        if (b) {
            for (var f = 0, d = b.length; f < d && !(c < b[f].position); f++)
                ;
            b.splice(f, 0, {
                label: a,
                position: c
            })
        }
    }
    ;
    c.gotoAndPlay = function(a) {
        this.paused = !1;
        this._goto(a)
    }
    ;
    c.gotoAndStop = function(a) {
        this.paused = !0;
        this._goto(a)
    }
    ;
    c.resolve = function(a) {
        var b = Number(a);
        isNaN(b) && (b = this._labels && this._labels[a]);
        return b
    }
    ;
    c.toString = function() {
        return "[AbstractTween]"
    }
    ;
    c.clone = function() {
        throw "AbstractTween can not be cloned.";
    }
    ;
    c._init = function(a) {
        a && a.paused || (this.paused = !1);
        a && null != a.position && this.setPosition(a.position)
    }
    ;
    c._updatePosition = function(a, c) {}
    ;
    c._goto = function(a) {
        a = this.resolve(a);
        null != a && this.setPosition(a, !1, !0)
    }
    ;
    c._runActions = function(a, c, e, f) {
        if (this._actionHead || this.tweens) {
            var b = this.duration, d = this.reversed, m = this.bounce, l = this.loop, n, q, k;
            if (0 === b) {
                var t = n = q = k = 0;
                d = m = !1
            } else
                t = a / b | 0,
                n = c / b | 0,
                q = a - t * b,
                k = c - n * b;
            -1 !== l && (n > l && (k = b,
            n = l),
            t > l && (q = b,
            t = l));
            if (e)
                return this._runActionsRange(k, k, e, f);
            if (t !== n || q !== k || e || f) {
                -1 === t && (t = q = 0);
                a = a <= c;
                c = t;
                do {
                    l = c === t ? q : a ? 0 : b;
                    var u = c === n ? k : a ? b : 0;
                    !d !== !(m && c % 2) && (l = b - l,
                    u = b - u);
                    if ((!m || c === t || l !== u) && this._runActionsRange(l, u, e, f || c !== t && !m))
                        return !0;
                    f = !1
                } while (a && ++c <= n || !a && --c >= n)
            }
        }
    }
    ;
    c._runActionsRange = function(a, c, e, f) {}
    ;
    createjs.AbstractTween = createjs.promote(a, "EventDispatcher")
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(b, f) {
        this.AbstractTween_constructor(f);
        this.pluginData = null;
        this.target = b;
        this.passive = !1;
        this._stepTail = this._stepHead = new c(null,0,0,{},null,!0);
        this._stepPosition = 0;
        this._injected = this._pluginIds = this._plugins = this._actionTail = this._actionHead = null;
        f && (this.pluginData = f.pluginData,
        f.override && a.removeTweens(b));
        this.pluginData || (this.pluginData = {});
        this._init(f)
    }
    function c(a, b, c, d, m, l) {
        this.next = null;
        this.prev = a;
        this.t = b;
        this.d = c;
        this.props = d;
        this.ease = m;
        this.passive = l;
        this.index = a ? a.index + 1 : 0
    }
    function b(a, b, c, d, m) {
        this.next = null;
        this.prev = a;
        this.t = b;
        this.d = 0;
        this.scope = c;
        this.funct = d;
        this.params = m
    }
    var d = createjs.extend(a, createjs.AbstractTween);
    a.IGNORE = {};
    a._tweens = [];
    a._plugins = null;
    a._tweenHead = null;
    a._tweenTail = null;
    a.get = function(b, c) {
        return new a(b,c)
    }
    ;
    a.tick = function(b, c) {
        for (var e = a._tweenHead; e; ) {
            var f = e._next;
            c && !e.ignoreGlobalPause || e._paused || e.advance(e.useTicks ? 1 : b);
            e = f
        }
    }
    ;
    a.handleEvent = function(a) {
        "tick" === a.type && this.tick(a.delta, a.paused)
    }
    ;
    a.removeTweens = function(b) {
        if (b.tweenjs_count) {
            for (var c = a._tweenHead; c; ) {
                var e = c._next;
                c.target === b && a._register(c, !0);
                c = e
            }
            b.tweenjs_count = 0
        }
    }
    ;
    a.removeAllTweens = function() {
        for (var b = a._tweenHead; b; ) {
            var c = b._next;
            b._paused = !0;
            b.target && (b.target.tweenjs_count = 0);
            b._next = b._prev = null;
            b = c
        }
        a._tweenHead = a._tweenTail = null
    }
    ;
    a.hasActiveTweens = function(b) {
        return b ? !!b.tweenjs_count : !!a._tweenHead
    }
    ;
    a._installPlugin = function(b) {
        for (var c = b.priority = b.priority || 0, e = a._plugins = a._plugins || [], d = 0, m = e.length; d < m && !(c < e[d].priority); d++)
            ;
        e.splice(d, 0, b)
    }
    ;
    a._register = function(b, c) {
        var e = b.target;
        if (!c && b._paused)
            e && (e.tweenjs_count = e.tweenjs_count ? e.tweenjs_count + 1 : 1),
            (e = a._tweenTail) ? (a._tweenTail = e._next = b,
            b._prev = e) : a._tweenHead = a._tweenTail = b,
            !a._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", a),
            a._inited = !0);
        else if (c && !b._paused) {
            e && e.tweenjs_count--;
            e = b._next;
            var d = b._prev;
            e ? e._prev = d : a._tweenTail = d;
            d ? d._next = e : a._tweenHead = e;
            b._next = b._prev = null
        }
        b._paused = c
    }
    ;
    d.wait = function(a, b) {
        0 < a && this._addStep(+a, this._stepTail.props, null, b);
        return this
    }
    ;
    d.to = function(a, b, c) {
        if (null == b || 0 > b)
            b = 0;
        b = this._addStep(+b, null, c);
        this._appendProps(a, b);
        return this
    }
    ;
    d.label = function(a) {
        this.addLabel(a, this.duration);
        return this
    }
    ;
    d.call = function(a, b, c) {
        return this._addAction(c || this.target, a, b || [this])
    }
    ;
    d.set = function(a, b) {
        return this._addAction(b || this.target, this._set, [a])
    }
    ;
    d.play = function(a) {
        return this._addAction(a || this, this._set, [{
            paused: !1
        }])
    }
    ;
    d.pause = function(a) {
        return this._addAction(a || this, this._set, [{
            paused: !0
        }])
    }
    ;
    d.w = d.wait;
    d.t = d.to;
    d.c = d.call;
    d.s = d.set;
    d.toString = function() {
        return "[Tween]"
    }
    ;
    d.clone = function() {
        throw "Tween can not be cloned.";
    }
    ;
    d._addPlugin = function(a) {
        var b = this._pluginIds || (this._pluginIds = {})
          , c = a.ID;
        if (c && !b[c]) {
            b[c] = !0;
            b = this._plugins || (this._plugins = []);
            c = a.priority || 0;
            for (var e = 0, d = b.length; e < d; e++)
                if (c < b[e].priority) {
                    b.splice(e, 0, a);
                    return
                }
            b.push(a)
        }
    }
    ;
    d._updatePosition = function(a, b) {
        var c = this._stepHead.next
          , e = this.position
          , d = this.duration;
        if (this.target && c) {
            for (var f = c.next; f && f.t <= e; )
                c = c.next,
                f = c.next;
            this._updateTargetProps(c, b ? 0 === d ? 1 : e / d : (e - c.t) / c.d, b)
        }
        this._stepPosition = c ? e - c.t : 0
    }
    ;
    d._updateTargetProps = function(b, c, d) {
        if (!(this.passive = !!b.passive)) {
            var e, f = b.prev.props, h = b.props;
            if (e = b.ease)
                c = e(c, 0, 1, 1);
            e = this._plugins;
            var n;
            a: for (n in f) {
                var q = f[n];
                var k = h[n];
                q = q !== k && "number" === typeof q ? q + (k - q) * c : 1 <= c ? k : q;
                if (e) {
                    k = 0;
                    for (var t = e.length; k < t; k++) {
                        var u = e[k].change(this, b, n, q, c, d);
                        if (u === a.IGNORE)
                            continue a;
                        void 0 !== u && (q = u)
                    }
                }
                this.target[n] = q
            }
        }
    }
    ;
    d._runActionsRange = function(a, b, c, d) {
        var e = (c = a > b) ? this._actionTail : this._actionHead
          , f = b
          , g = a;
        c && (f = a,
        g = b);
        for (var h = this.position; e; ) {
            var k = e.t;
            if (k === b || k > g && k < f || d && k === a)
                if (e.funct.apply(e.scope, e.params),
                h !== this.position)
                    return !0;
            e = c ? e.prev : e.next
        }
    }
    ;
    d._appendProps = function(b, c, d) {
        var e = this._stepHead.props, f = this.target, h = a._plugins, n, q, k = c.prev, t = k.props, u = c.props || (c.props = this._cloneProps(t)), r = {};
        for (n in b)
            if (b.hasOwnProperty(n) && (r[n] = u[n] = b[n],
            void 0 === e[n])) {
                var z = void 0;
                if (h)
                    for (q = h.length - 1; 0 <= q; q--) {
                        var D = h[q].init(this, n, z);
                        void 0 !== D && (z = D);
                        if (z === a.IGNORE) {
                            delete u[n];
                            delete r[n];
                            break
                        }
                    }
                z !== a.IGNORE && (void 0 === z && (z = f[n]),
                t[n] = void 0 === z ? null : z)
            }
        for (n in r) {
            var v;
            for (b = k; (v = b) && (b = v.prev); )
                if (b.props !== v.props) {
                    if (void 0 !== b.props[n])
                        break;
                    b.props[n] = t[n]
                }
        }
        if (!1 !== d && (h = this._plugins))
            for (q = h.length - 1; 0 <= q; q--)
                h[q].step(this, c, r);
        if (d = this._injected)
            this._injected = null,
            this._appendProps(d, c, !1)
    }
    ;
    d._injectProp = function(a, b) {
        (this._injected || (this._injected = {}))[a] = b
    }
    ;
    d._addStep = function(a, b, d, g) {
        b = new c(this._stepTail,this.duration,a,b,d,g || !1);
        this.duration += a;
        return this._stepTail = this._stepTail.next = b
    }
    ;
    d._addAction = function(a, c, d) {
        a = new b(this._actionTail,this.duration,a,c,d);
        this._actionTail ? this._actionTail.next = a : this._actionHead = a;
        this._actionTail = a;
        return this
    }
    ;
    d._set = function(a) {
        for (var b in a)
            this[b] = a[b]
    }
    ;
    d._cloneProps = function(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    ;
    createjs.Tween = createjs.promote(a, "AbstractTween")
}
)();
this.createjs = this.createjs || {};
(function() {
    function a(a) {
        if (a instanceof Array || null == a && 1 < arguments.length) {
            var b = a;
            var c = arguments[1];
            a = arguments[2]
        } else
            a && (b = a.tweens,
            c = a.labels);
        this.AbstractTween_constructor(a);
        this.tweens = [];
        b && this.addTween.apply(this, b);
        this.setLabels(c);
        this._init(a)
    }
    var c = createjs.extend(a, createjs.AbstractTween);
    c.addTween = function(a) {
        a._parent && a._parent.removeTween(a);
        var b = arguments.length;
        if (1 < b) {
            for (var c = 0; c < b; c++)
                this.addTween(arguments[c]);
            return arguments[b - 1]
        }
        if (0 === b)
            return null;
        this.tweens.push(a);
        a._parent = this;
        a.paused = !0;
        b = a.duration;
        0 < a.loop && (b *= a.loop + 1);
        b > this.duration && (this.duration = b);
        0 <= this.rawPosition && a.setPosition(this.rawPosition);
        return a
    }
    ;
    c.removeTween = function(a) {
        var b = arguments.length;
        if (1 < b) {
            for (var c = !0, f = 0; f < b; f++)
                c = c && this.removeTween(arguments[f]);
            return c
        }
        if (0 === b)
            return !0;
        b = this.tweens;
        for (f = b.length; f--; )
            if (b[f] === a)
                return b.splice(f, 1),
                a._parent = null,
                a.duration >= this.duration && this.updateDuration(),
                !0;
        return !1
    }
    ;
    c.updateDuration = function() {
        for (var a = this.duration = 0, c = this.tweens.length; a < c; a++) {
            var e = this.tweens[a]
              , f = e.duration;
            0 < e.loop && (f *= e.loop + 1);
            f > this.duration && (this.duration = f)
        }
    }
    ;
    c.toString = function() {
        return "[Timeline]"
    }
    ;
    c.clone = function() {
        throw "Timeline can not be cloned.";
    }
    ;
    c._updatePosition = function(a, c) {
        for (var b = this.position, d = 0, h = this.tweens.length; d < h; d++)
            this.tweens[d].setPosition(b, !0, a)
    }
    ;
    c._runActionsRange = function(a, c, e, f) {
        for (var b = this.position, d = 0, m = this.tweens.length; d < m; d++)
            if (this.tweens[d]._runActions(a, c, e, f),
            b !== this.position)
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
    a.linear = function(a) {
        return a
    }
    ;
    a.none = a.linear;
    a.get = function(a) {
        -1 > a ? a = -1 : 1 < a && (a = 1);
        return function(b) {
            return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
        }
    }
    ;
    a.getPowIn = function(a) {
        return function(b) {
            return Math.pow(b, a)
        }
    }
    ;
    a.getPowOut = function(a) {
        return function(b) {
            return 1 - Math.pow(1 - b, a)
        }
    }
    ;
    a.getPowInOut = function(a) {
        return function(b) {
            return 1 > (b *= 2) ? .5 * Math.pow(b, a) : 1 - .5 * Math.abs(Math.pow(2 - b, a))
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
    a.sineIn = function(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }
    ;
    a.sineOut = function(a) {
        return Math.sin(a * Math.PI / 2)
    }
    ;
    a.sineInOut = function(a) {
        return -.5 * (Math.cos(Math.PI * a) - 1)
    }
    ;
    a.getBackIn = function(a) {
        return function(b) {
            return b * b * ((a + 1) * b - a)
        }
    }
    ;
    a.backIn = a.getBackIn(1.7);
    a.getBackOut = function(a) {
        return function(b) {
            return --b * b * ((a + 1) * b + a) + 1
        }
    }
    ;
    a.backOut = a.getBackOut(1.7);
    a.getBackInOut = function(a) {
        a *= 1.525;
        return function(b) {
            return 1 > (b *= 2) ? .5 * b * b * ((a + 1) * b - a) : .5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
        }
    }
    ;
    a.backInOut = a.getBackInOut(1.7);
    a.circIn = function(a) {
        return -(Math.sqrt(1 - a * a) - 1)
    }
    ;
    a.circOut = function(a) {
        return Math.sqrt(1 - --a * a)
    }
    ;
    a.circInOut = function(a) {
        return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
    }
    ;
    a.bounceIn = function(c) {
        return 1 - a.bounceOut(1 - c)
    }
    ;
    a.bounceOut = function(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
    }
    ;
    a.bounceInOut = function(c) {
        return .5 > c ? .5 * a.bounceIn(2 * c) : .5 * a.bounceOut(2 * c - 1) + .5
    }
    ;
    a.getElasticIn = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d)
                return d;
            var e = b / c * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * --d) * Math.sin((d - e) * c / b))
        }
    }
    ;
    a.elasticIn = a.getElasticIn(1, .3);
    a.getElasticOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            return 0 == d || 1 == d ? d : a * Math.pow(2, -10 * d) * Math.sin((d - b / c * Math.asin(1 / a)) * c / b) + 1
        }
    }
    ;
    a.elasticOut = a.getElasticOut(1, .3);
    a.getElasticInOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            var e = b / c * Math.asin(1 / a);
            return 1 > (d *= 2) ? -.5 * a * Math.pow(2, 10 * --d) * Math.sin((d - e) * c / b) : a * Math.pow(2, -10 * --d) * Math.sin((d - e) * c / b) * .5 + 1
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
    a.init = function(c, b, d) {
        "guide" == b && c._addPlugin(a)
    }
    ;
    a.step = function(c, b, d) {
        for (var e in d)
            if ("guide" === e) {
                var f = b.props.guide
                  , h = a._solveGuideData(d.guide, f);
                f.valid = !h;
                var g = f.endData;
                c._injectProp("x", g.x);
                c._injectProp("y", g.y);
                if (h || !f.orient)
                    break;
                f.startOffsetRot = (void 0 === b.prev.props.rotation ? c.target.rotation || 0 : b.prev.props.rotation) - f.startData.rotation;
                if ("fixed" == f.orient)
                    f.endAbsRot = g.rotation + f.startOffsetRot,
                    f.deltaRotation = 0;
                else {
                    h = void 0 === d.rotation ? c.target.rotation || 0 : d.rotation;
                    g = h - f.endData.rotation - f.startOffsetRot;
                    var m = g % 360;
                    f.endAbsRot = h;
                    switch (f.orient) {
                    case "auto":
                        f.deltaRotation = g;
                        break;
                    case "cw":
                        f.deltaRotation = (m + 360) % 360 + 360 * Math.abs(g / 360 | 0);
                        break;
                    case "ccw":
                        f.deltaRotation = (m - 360) % 360 + -360 * Math.abs(g / 360 | 0)
                    }
                }
                c._injectProp("rotation", f.endAbsRot)
            }
    }
    ;
    a.change = function(c, b, d, e, f, h) {
        if ((e = b.props.guide) && b.props !== b.prev.props && e !== b.prev.props.guide) {
            if ("guide" === d && !e.valid || "x" == d || "y" == d || "rotation" === d && e.orient)
                return createjs.Tween.IGNORE;
            a._ratioToPositionData(f, e, c.target)
        }
    }
    ;
    a.debug = function(c, b, d) {
        c = c.guide || c;
        var e = a._findPathProblems(c);
        e && console.error("MotionGuidePlugin Error found: \n" + e);
        if (!b)
            return e;
        var f, h = c.path, g = h.length;
        b.save();
        b.lineCap = "round";
        b.lineJoin = "miter";
        b.beginPath();
        b.moveTo(h[0], h[1]);
        for (f = 2; f < g; f += 4)
            b.quadraticCurveTo(h[f], h[f + 1], h[f + 2], h[f + 3]);
        b.strokeStyle = "black";
        b.lineWidth = 4.5;
        b.stroke();
        b.strokeStyle = "white";
        b.lineWidth = 3;
        b.stroke();
        b.closePath();
        h = d.length;
        if (d && h) {
            g = {};
            var m = {};
            a._solveGuideData(c, g);
            for (f = 0; f < h; f++)
                g.orient = "fixed",
                a._ratioToPositionData(d[f], g, m),
                b.beginPath(),
                b.moveTo(m.x, m.y),
                b.lineTo(m.x + 9 * Math.cos(.0174533 * m.rotation), m.y + 9 * Math.sin(.0174533 * m.rotation)),
                b.strokeStyle = "black",
                b.lineWidth = 4.5,
                b.stroke(),
                b.strokeStyle = "red",
                b.lineWidth = 3,
                b.stroke(),
                b.closePath()
        }
        b.restore();
        return e
    }
    ;
    a._solveGuideData = function(c, b) {
        var d;
        if (d = a.debug(c))
            return d;
        var e = b.path = c.path;
        b.orient = c.orient;
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
        var f = e.length, h, g = {};
        var m = e[0];
        var l = e[1];
        for (d = 2; d < f; d += 4) {
            var n = e[d];
            var q = e[d + 1];
            var k = e[d + 2];
            var t = e[d + 3];
            var u = {
                weightings: [],
                estLength: 0,
                portion: 0
            }
              , r = m;
            var z = l;
            for (h = 1; 10 >= h; h++)
                a._getParamsForCurve(m, l, n, q, k, t, h / 10, !1, g),
                r = g.x - r,
                z = g.y - z,
                z = Math.sqrt(r * r + z * z),
                u.weightings.push(z),
                u.estLength += z,
                r = g.x,
                z = g.y;
            b.totalLength += u.estLength;
            for (h = 0; 10 > h; h++)
                z = u.estLength,
                u.weightings[h] /= z;
            b.subLines.push(u);
            m = k;
            l = t
        }
        z = b.totalLength;
        e = b.subLines.length;
        for (d = 0; d < e; d++)
            b.subLines[d].portion = b.subLines[d].estLength / z;
        d = isNaN(c.start) ? 0 : c.start;
        e = isNaN(c.end) ? 1 : c.end;
        a._ratioToPositionData(d, b, b.startData);
        a._ratioToPositionData(e, b, b.endData);
        b.startData.ratio = d;
        b.endData.ratio = e;
        b.animSpan = b.endData.ratio - b.startData.ratio
    }
    ;
    a._ratioToPositionData = function(c, b, d) {
        var e = b.subLines, f, h = 0, g = c * b.animSpan + b.startData.ratio;
        var m = e.length;
        for (f = 0; f < m; f++) {
            var l = e[f].portion;
            if (h + l >= g) {
                var n = f;
                break
            }
            h += l
        }
        void 0 === n && (n = m - 1,
        h -= l);
        e = e[n].weightings;
        var q = l;
        m = e.length;
        for (f = 0; f < m; f++) {
            l = e[f] * q;
            if (h + l >= g)
                break;
            h += l
        }
        n = 4 * n + 2;
        m = b.path;
        a._getParamsForCurve(m[n - 2], m[n - 1], m[n], m[n + 1], m[n + 2], m[n + 3], f / 10 + (g - h) / l * .1, b.orient, d);
        b.orient && (d.rotation = .99999 <= c && 1.00001 >= c && void 0 !== b.endAbsRot ? b.endAbsRot : d.rotation + (b.startOffsetRot + c * b.deltaRotation));
        return d
    }
    ;
    a._getParamsForCurve = function(a, b, d, e, f, h, g, m, l) {
        var c = 1 - g;
        l.x = c * c * a + 2 * c * g * d + g * g * f;
        l.y = c * c * b + 2 * c * g * e + g * g * h;
        m && (l.rotation = 57.2957795 * Math.atan2((e - b) * c + (h - e) * g, (d - a) * c + (f - d) * g))
    }
    ;
    a._findPathProblems = function(a) {
        var b = a.path
          , c = b && b.length || 0;
        if (6 > c || (c - 2) % 4)
            return "\tCannot parse 'path' array due to invalid number of entries in path. There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\nOnly [ " + (c + " ] values found. Expected: " + Math.max(4 * Math.ceil((c - 2) / 4) + 2, 6));
        for (var e = 0; e < c; e++)
            if (isNaN(b[e]))
                return "All data in path array must be numeric";
        b = a.start;
        if (isNaN(b) && void 0 !== b)
            return "'start' out of bounds. Expected 0 to 1, got: " + b;
        b = a.end;
        if (isNaN(b) && void 0 !== b)
            return "'end' out of bounds. Expected 0 to 1, got: " + b;
        if ((a = a.orient) && "fixed" != a && "auto" != a && "cw" != a && "ccw" != a)
            return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + a
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
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }
    function c(a, b) {
        var c = -1
          , e = a ? a.length : 0;
        if ("number" == typeof e && -1 < e && e <= t)
            for (; ++c < e; )
                b(a[c], c, a);
        else
            d(a, b)
    }
    function b(b) {
        b = String(b).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }
    function d(a, b) {
        for (var c in a)
            r.call(a, c) && b(a[c], c, a)
    }
    function e(b) {
        return null == b ? a(b) : z.call(b).slice(8, -1)
    }
    function f(a, b) {
        var c = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) && ("object" == c ? !!a[b] : !0)
    }
    function h(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }
    function g(a, b) {
        var d = null;
        c(a, function(c, e) {
            d = b(d, c, e, a)
        });
        return d
    }
    function m(a) {
        function c(c) {
            return g(c, function(c, d) {
                var e = d.pattern || h(d);
                !c && (c = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((c = String(d.label && !RegExp(e, "i").test(d.label) ? d.label : c).split("/"))[1] && !/[\d.]+/.test(c[0]) && (c[0] += " " + c[1]),
                d = d.label || d,
                c = b(c[0].replace(RegExp(e, "i"), d).replace(RegExp("; *(?:" + d + "[_-])?", "i"), " ").replace(RegExp("(" + d + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return c
            })
        }
        function l(b) {
            return g(b, function(b, c) {
                return b || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var k = n
          , r = a && "object" == typeof a && "String" != e(a);
        r && (k = a,
        a = null);
        var q = k.navigator || {}
          , v = q.userAgent || "";
        a || (a = v);
        var t = r ? !!q.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(z.toString())
          , D = r ? "Object" : "ScriptBridgingProxyObject"
          , R = r ? "Object" : "Environment"
          , M = r && k.java ? "JavaPackage" : e(k.java)
          , V = r ? "Object" : "RuntimeObject";
        R = (M = /\bJava/.test(M) && k.java) && e(k.environment) == R;
        var W = M ? "a" : "\u03b1", X = M ? "b" : "\u03b2", S = k.document || {}, K = k.operamini || k.opera, O = u.test(O = r && K ? K["[[Class]]"] : e(K)) ? O : K = null, p, P = a;
        r = [];
        var Q = null
          , L = a == v;
        v = L && K && "function" == typeof K.version && K.version();
        var B = function(b) {
            return g(b, function(b, c) {
                return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , w = function(b) {
            return g(b, function(b, c) {
                return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
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
          , C = c([{
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
          , J = function(b) {
            return g(b, function(b, c, d) {
                return b || (c[C] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(C)] || RegExp("\\b" + h(d) + "(?:\\b|\\w*\\d)", "i").exec(a)) && d
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
          , x = function(c) {
            return g(c, function(c, d) {
                var e = d.pattern || h(d);
                if (!c && (c = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                    var f = c
                      , g = d.label || d
                      , k = {
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
                    e && g && /^Win/i.test(f) && !/^Windows Phone /i.test(f) && (k = k[/[\d.]+$/.exec(f)]) && (f = "Windows " + k);
                    f = String(f);
                    e && g && (f = f.replace(RegExp(e, "i"), g));
                    c = f = b(f.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return c
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        B && (B = [B]);
        J && !C && (C = c([J]));
        if (p = /\bGoogle TV\b/.exec(C))
            C = p[0];
        /\bSimulator\b/i.test(a) && (C = (C ? C + " " : "") + "Simulator");
        "Opera Mini" == w && /\bOPiOS\b/.test(a) && r.push("running in Turbo/Uncompressed mode");
        "IE" == w && /\blike iPhone OS\b/.test(a) ? (p = m(a.replace(/like iPhone OS/, "")),
        J = p.manufacturer,
        C = p.product) : /^iP/.test(C) ? (w || (w = "Safari"),
        x = "iOS" + ((p = / OS ([\d_]+)/i.exec(a)) ? " " + p[1].replace(/_/g, ".") : "")) : "Konqueror" != w || /buntu/i.test(x) ? J && "Google" != J && (/Chrome/.test(w) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(C)) || /\bAndroid\b/.test(x) && /^Chrome/.test(w) && /\bVersion\//i.test(a) ? (w = "Android Browser",
        x = /\bAndroid\b/.test(x) ? x : "Android") : "Silk" == w ? (/\bMobi/i.test(a) || (x = "Android",
        r.unshift("desktop mode")),
        /Accelerated *= *true/i.test(a) && r.unshift("accelerated")) : "PaleMoon" == w && (p = /\bFirefox\/([\d.]+)\b/.exec(a)) ? r.push("identifying as Firefox " + p[1]) : "Firefox" == w && (p = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (x || (x = "Firefox OS"),
        C || (C = p[1])) : !w || (p = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(w)) ? (w && !C && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(p + "/") + 8)) && (w = null),
        (p = C || J || x) && (C || J || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(x)) && (w = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(x) ? x : p) + " Browser")) : "Electron" == w && (p = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && r.push("Chromium " + p) : x = "Kubuntu";
        v || (v = l(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", h(w), "(?:Firefox|Minefield|NetFront)"]));
        if (p = "iCab" == B && 3 < parseFloat(v) && "WebKit" || /\bOpera\b/.test(w) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(B) && "WebKit" || !B && /\bMSIE\b/i.test(a) && ("Mac OS" == x ? "Tasman" : "Trident") || "WebKit" == B && /\bPlayStation\b(?! Vita\b)/i.test(w) && "NetFront")
            B = [p];
        "IE" == w && (p = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (w += " Mobile",
        x = "Windows Phone " + (/\+$/.test(p) ? p : p + ".x"),
        r.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (w = "IE Mobile",
        x = "Windows Phone 8.x",
        r.unshift("desktop mode"),
        v || (v = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != w && "Trident" == B && (p = /\brv:([\d.]+)/.exec(a)) && (w && r.push("identifying as " + w + (v ? " " + v : "")),
        w = "IE",
        v = p[1]);
        if (L) {
            if (f(k, "global"))
                if (M && (p = M.lang.System,
                P = p.getProperty("os.arch"),
                x = x || p.getProperty("os.name") + " " + p.getProperty("os.version")),
                R) {
                    try {
                        v = k.require("ringo/engine").version.join("."),
                        w = "RingoJS"
                    } catch (U) {
                        (p = k.system) && p.global.system == k.system && (w = "Narwhal",
                        x || (x = p[0].os || null))
                    }
                    w || (w = "Rhino")
                } else
                    "object" == typeof k.process && !k.process.browser && (p = k.process) && ("object" == typeof p.versions && ("string" == typeof p.versions.electron ? (r.push("Node " + p.versions.node),
                    w = "Electron",
                    v = p.versions.electron) : "string" == typeof p.versions.nw && (r.push("Chromium " + v, "Node " + p.versions.node),
                    w = "NW.js",
                    v = p.versions.nw)),
                    w || (w = "Node.js",
                    P = p.arch,
                    x = p.platform,
                    v = (v = /[\d.]+/.exec(p.version)) ? v[0] : null));
            else
                e(p = k.runtime) == D ? (w = "Adobe AIR",
                x = p.flash.system.Capabilities.os) : e(p = k.phantom) == V ? (w = "PhantomJS",
                v = (p = p.version || null) && p.major + "." + p.minor + "." + p.patch) : "number" == typeof S.documentMode && (p = /\bTrident\/(\d+)/i.exec(a)) ? (v = [v, S.documentMode],
                (p = +p[1] + 4) != v[1] && (r.push("IE " + v[1] + " mode"),
                B && (B[1] = ""),
                v[1] = p),
                v = "IE" == w ? String(v[1].toFixed(1)) : v[0]) : "number" == typeof S.documentMode && /^(?:Chrome|Firefox)\b/.test(w) && (r.push("masking as " + w + " " + v),
                w = "IE",
                v = "11.0",
                B = ["Trident"],
                x = "Windows");
            x = x && b(x)
        }
        v && (p = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(v) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (L && q.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (Q = /b/i.test(p) ? "beta" : "alpha",
        v = v.replace(RegExp(p + "\\+?$"), "") + ("beta" == Q ? X : W) + (/\d+\+?/.exec(p) || ""));
        if ("Fennec" == w || "Firefox" == w && /\b(?:Android|Firefox OS)\b/.test(x))
            w = "Firefox Mobile";
        else if ("Maxthon" == w && v)
            v = v.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(C))
            "Xbox 360" == C && (x = null),
            "Xbox 360" == C && /\bIEMobile\b/.test(a) && r.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(w) && (!w || C || /Browser|Mobi/.test(w)) || "Windows CE" != x && !/Mobi/i.test(a))
            if ("IE" == w && L)
                try {
                    null === k.external && r.unshift("platform preview")
                } catch (U) {
                    r.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(C) || /\bBB10\b/.test(a)) && (p = (RegExp(C.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || v) ? (p = [p, /BB10/.test(a)],
                x = (p[1] ? (C = null,
                J = "BlackBerry") : "Device Software") + " " + p[0],
                v = null) : this != d && "Wii" != C && (L && K || /Opera/.test(w) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == w && /\bOS X (?:\d+\.){2,}/.test(x) || "IE" == w && (x && !/^Win/.test(x) && 5.5 < v || /\bWindows XP\b/.test(x) && 8 < v || 8 == v && !/\bTrident\b/.test(a))) && !u.test(p = m.call(d, a.replace(u, "") + ";")) && p.name && (p = "ing as " + p.name + ((p = p.version) ? " " + p : ""),
                u.test(w) ? (/\bIE\b/.test(p) && "Mac OS" == x && (x = null),
                p = "identify" + p) : (p = "mask" + p,
                w = O ? b(O.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(p) && (x = null),
                L || (v = null)),
                B = ["Presto"],
                r.push(p));
        else
            w += " Mobile";
        if (p = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            p = [parseFloat(p.replace(/\.(\d)$/, ".0$1")), p];
            if ("Safari" == w && "+" == p[1].slice(-1))
                w = "WebKit Nightly",
                Q = "alpha",
                v = p[1].slice(0, -1);
            else if (v == p[1] || v == (p[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1]))
                v = null;
            p[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == p[0] && 537.36 == p[2] && 28 <= parseFloat(p[1]) && "WebKit" == B && (B = ["Blink"]);
            L && (t || p[1]) ? (B && (B[1] = "like Chrome"),
            p = p[1] || (p = p[0],
            530 > p ? 1 : 532 > p ? 2 : 532.05 > p ? 3 : 533 > p ? 4 : 534.03 > p ? 5 : 534.07 > p ? 6 : 534.1 > p ? 7 : 534.13 > p ? 8 : 534.16 > p ? 9 : 534.24 > p ? 10 : 534.3 > p ? 11 : 535.01 > p ? 12 : 535.02 > p ? "13+" : 535.07 > p ? 15 : 535.11 > p ? 16 : 535.19 > p ? 17 : 536.05 > p ? 18 : 536.1 > p ? 19 : 537.01 > p ? 20 : 537.11 > p ? "21+" : 537.13 > p ? 23 : 537.18 > p ? 24 : 537.24 > p ? 25 : 537.36 > p ? 26 : "Blink" != B ? "27" : "28")) : (B && (B[1] = "like Safari"),
            p = (p = p[0],
            400 > p ? 1 : 500 > p ? 2 : 526 > p ? 3 : 533 > p ? 4 : 534 > p ? "4+" : 535 > p ? 5 : 537 > p ? 6 : 538 > p ? 7 : 601 > p ? 8 : "8"));
            B && (B[1] += " " + (p += "number" == typeof p ? ".x" : /[.+]/.test(p) ? "" : "+"));
            "Safari" == w && (!v || 45 < parseInt(v)) && (v = p)
        }
        "Opera" == w && (p = /\bzbov|zvav$/.exec(x)) ? (w += " ",
        r.unshift("desktop mode"),
        "zvav" == p ? (w += "Mini",
        v = null) : w += "Mobile",
        x = x.replace(RegExp(" *" + p + "$"), "")) : "Safari" == w && /\bChrome\b/.exec(B && B[1]) && (r.unshift("desktop mode"),
        w = "Chrome Mobile",
        v = null,
        /\bOS X\b/.test(x) ? (J = "Apple",
        x = "iOS 4.3+") : x = null);
        v && 0 == v.indexOf(p = /[\d.]+$/.exec(x)) && -1 < a.indexOf("/" + p + "-") && (x = String(x.replace(p, "")).replace(/^ +| +$/g, ""));
        B && !/\b(?:Avant|Nook)\b/.test(w) && (/Browser|Lunascape|Maxthon/.test(w) || "Safari" != w && /^iOS/.test(x) && /\bSafari\b/.test(B[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(w) && B[1]) && (p = B[B.length - 1]) && r.push(p);
        r.length && (r = ["(" + r.join("; ") + ")"]);
        J && C && 0 > C.indexOf(J) && r.push("on " + J);
        C && r.push((/^on /.test(r[r.length - 1]) ? "" : "on ") + C);
        if (x) {
            var T = (p = / ([\d.+]+)$/.exec(x)) && "/" == x.charAt(x.length - p[0].length - 1);
            x = {
                architecture: 32,
                family: p && !T ? x.replace(p[0], "") : x,
                version: p ? p[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !T ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (p = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(P)) && !/\bi686\b/i.test(P) ? (x && (x.architecture = 64,
        x.family = x.family.replace(RegExp(" *" + p), "")),
        w && (/\bWOW64\b/i.test(a) || L && /\w(?:86|32)$/.test(q.cpuClass || q.platform) && !/\bWin64; x64\b/i.test(a)) && r.unshift("32-bit")) : x && /^OS X/.test(x.family) && "Chrome" == w && 39 <= parseFloat(v) && (x.architecture = 64);
        a || (a = null);
        k = {};
        k.description = a;
        k.layout = B && B[0];
        k.manufacturer = J;
        k.name = w;
        k.prerelease = Q;
        k.product = C;
        k.ua = a;
        k.version = w && v;
        k.os = x || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        k.parse = m;
        k.toString = function() {
            return this.description || ""
        }
        ;
        k.version && r.unshift(v);
        k.name && r.unshift(w);
        x && w && (x != String(x).split(" ")[0] || x != w.split(" ")[0] && !C) && r.push(C ? "(" + x + ")" : "on " + x);
        r.length && (k.description = r.join(" "));
        return k
    }
    var l = {
        "function": !0,
        object: !0
    }
      , n = l[typeof window] && window || this
      , q = l[typeof exports] && exports;
    l = l[typeof module] && module && !module.nodeType && module;
    var k = q && l && "object" == typeof global && global;
    !k || k.global !== k && k.window !== k && k.self !== k || (n = k);
    var t = Math.pow(2, 53) - 1
      , u = /\bOpera/;
    k = Object.prototype;
    var r = k.hasOwnProperty
      , z = k.toString
      , D = m();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (n.platform = D,
    define(function() {
        return D
    })) : q && l ? d(D, function(a, b) {
        q[b] = a
    }) : n.platform = D
}
).call(this);
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , c = "undefined" !== typeof module && module.exports
      , b = function() {
        for (var b, c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], d = 0, e = c.length, l = {}; d < e; d++)
            if ((b = c[d]) && b[1]in a) {
                for (d = 0; d < b.length; d++)
                    l[c[0][d]] = b[d];
                return l
            }
        return !1
    }()
      , d = {
        change: b.fullscreenchange,
        error: b.fullscreenerror
    }
      , e = {
        request: function(c) {
            return new Promise(function(d, e) {
                var f = function() {
                    this.off("change", f);
                    d()
                }
                .bind(this);
                this.on("change", f);
                c = c || a.documentElement;
                Promise.resolve(c[b.requestFullscreen]())["catch"](e)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(c, d) {
                if (this.isFullscreen) {
                    var e = function() {
                        this.off("change", e);
                        c()
                    }
                    .bind(this);
                    this.on("change", e);
                    Promise.resolve(a[b.exitFullscreen]())["catch"](d)
                } else
                    c()
            }
            .bind(this))
        },
        toggle: function(a) {
            return this.isFullscreen ? this.exit() : this.request(a)
        },
        onchange: function(a) {
            this.on("change", a)
        },
        onerror: function(a) {
            this.on("error", a)
        },
        on: function(b, c) {
            var e = d[b];
            e && a.addEventListener(e, c, !1)
        },
        off: function(b, c) {
            var e = d[b];
            e && a.removeEventListener(e, c, !1)
        },
        raw: b
    };
    b ? (Object.defineProperties(e, {
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
    c ? module.exports = e : window.screenfull = e) : c ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}
)();
var s_iScaleFactor = 1, s_bIsIphone = !1, s_iOffsetX, s_iOffsetY;
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
    var c = a.toLowerCase()
      , b = window.document
      , d = b.documentElement;
    if (void 0 === window["inner" + a])
        a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var e = b.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var f = b.createElement("div");
        f.id = "vpw-test-d";
        f.style.cssText = "position:absolute;top:-1000px";
        f.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        e.appendChild(f);
        d.insertBefore(e, b.head);
        a = 7 == f["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(e)
    } else
        a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length; )
        if (navigator.platform === a.pop())
            return !0;
    return s_bIsIphone = !1
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH)
          , d = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var e = a - b;
            b += e;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * e
        } else
            d < c && (e = c - d,
            d += e,
            b += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        e = a / 2 - b / 2;
        var f = c / 2 - d / 2
          , h = CANVAS_WIDTH / d;
        if (f * h < -EDGEBOARD_X || e * h < -EDGEBOARD_Y)
            b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            d = Math.round(CANVAS_WIDTH * b),
            b = Math.round(CANVAS_HEIGHT * b),
            e = (a - b) / 2,
            f = (c - d) / 2,
            h = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * f * h;
        s_iOffsetY = -1 * e * h;
        0 <= e && (s_iOffsetY = 0);
        0 <= f && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", d + "px");
        $("#canvas").css("height", b + "px");
        0 > e || (e = (a - b) / 2);
        $("#canvas").css("top", e + "px");
        $("#canvas").css("left", f + "px");
        fullscreenHandler()
    }
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}
function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(c),
    s_aSounds[a].loop(b),
    s_aSounds[a]) : null
}
function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}
function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[c].mute(a)
}
function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()))
}
function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a)
      , e = new createjs.Shape;
    c && b ? e.graphics.beginFill("#fff").drawRect(0, 0, c, b) : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = e;
    return d
}
function createSprite(a, c, b, d, e, f) {
    a = null !== c ? new createjs.Sprite(a,c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, e, f);
    a.hitArea = c;
    return a
}
function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}
function rotateVector2D(a, c) {
    var b = c.getX() * Math.cos(a) + c.getY() * Math.sin(a)
      , d = c.getX() * -Math.sin(a) + c.getY() * Math.cos(a);
    c.set(b, d)
}
function tweenVectorsOnX(a, c, b) {
    return a + b * (c - a)
}
function shuffle(a) {
    for (var c = a.length, b, d; 0 !== c; )
        d = Math.floor(Math.random() * c),
        --c,
        b = a[c],
        a[c] = a[d],
        a[d] = b;
    return a
}
function bubbleSort(a) {
    do {
        var c = !1;
        for (var b = 0; b < a.length - 1; b++)
            a[b] > a[b + 1] && (c = a[b],
            a[b] = a[b + 1],
            a[b + 1] = c,
            c = !0)
    } while (c)
}
function compare(a, c) {
    return a.index > c.index ? -1 : a.index < c.index ? 1 : 0
}
function easeLinear(a, c, b, d) {
    return b * a / d + c
}
function easeInQuad(a, c, b, d) {
    return b * (a /= d) * a + c
}
function easeInSine(a, c, b, d) {
    return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
}
function easeInCubic(a, c, b, d) {
    return b * (a /= d) * a * a + c
}
function getTrajectoryPoint(a, c) {
    var b = new createjs.Point
      , d = (1 - a) * (1 - a)
      , e = a * a;
    b.x = d * c.start.x + 2 * (1 - a) * a * c.traj.x + e * c.end.x;
    b.y = d * c.start.y + 2 * (1 - a) * a * c.traj.y + e * c.end.y;
    return b
}
function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}
function formatValue(a) {
    return TEXT_CURRENCY + a.toFixed(2)
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, c) {
    var b = getBounds(a, .9);
    var d = getBounds(c, .98);
    return calculateIntersection(b, d)
}
function calculateIntersection(a, c) {
    var b, d, e, f;
    var h = a.x + (b = a.width / 2);
    var g = a.y + (d = a.height / 2);
    var m = c.x + (e = c.width / 2);
    var l = c.y + (f = c.height / 2);
    h = Math.abs(h - m) - (b + e);
    g = Math.abs(g - l) - (d + f);
    return 0 > h && 0 > g ? (h = Math.min(Math.min(a.width, c.width), -h),
    g = Math.min(Math.min(a.height, c.height), -g),
    {
        x: Math.max(a.x, c.x),
        y: Math.max(a.y, c.y),
        width: h,
        height: g,
        rect1: a,
        rect2: c
    }) : null
}
function getBounds(a, c) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var d = a.children, e = d.length, f;
        for (f = 0; f < e; f++) {
            var h = getBounds(d[f], 1);
            h.x < b.x && (b.x = h.x);
            h.y < b.y && (b.y = h.y);
            h.x + h.width > b.x2 && (b.x2 = h.x + h.width);
            h.y + h.height > b.y2 && (b.y2 = h.y + h.height)
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
            e = a.sourceRect || a.image;
            f = e.width * c;
            var g = e.height * c
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                e = a.spriteSheet.getFrame(a.currentFrame);
                f = e.rect.width;
                g = e.rect.height;
                d = e.regX;
                var m = e.regY
            } else
                b.x = a.x || 0,
                b.y = a.y || 0;
        else
            b.x = a.x || 0,
            b.y = a.y || 0;
        d = d || 0;
        f = f || 0;
        m = m || 0;
        g = g || 0;
        b.regX = d;
        b.regY = m;
        e = a.localToGlobal(0 - d, 0 - m);
        h = a.localToGlobal(f - d, g - m);
        f = a.localToGlobal(f - d, 0 - m);
        d = a.localToGlobal(0 - d, g - m);
        b.x = Math.min(Math.min(Math.min(e.x, h.x), f.x), d.x);
        b.y = Math.min(Math.min(Math.min(e.y, h.y), f.y), d.y);
        b.width = Math.max(Math.max(Math.max(e.x, h.x), f.x), d.x) - b.x;
        b.height = Math.max(Math.max(Math.max(e.y, h.y), f.y), d.y) - b.y
    }
    return b
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var c = a.length, b, d; 0 < c; )
        d = Math.floor(Math.random() * c),
        c--,
        b = a[c],
        a[c] = a[d],
        a[d] = b;
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
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};
(function() {
    function a(a) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[c] ? "hidden" : "visible",
        "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a)
            return d[1]
    }
}
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
    var a = {}, c, b, d, e, f, h;
    this.init = function(a, m, l) {
        c = {};
        d = b = 0;
        e = a;
        f = m;
        h = l
    }
    ;
    this.addSprite = function(d, e) {
        if (!a.hasOwnProperty(d)) {
            var f = new Image;
            a[d] = c[d] = {
                szPath: e,
                oSprite: f,
                bLoaded: !1
            };
            b++
        }
    }
    ;
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        b = 0;
        f.call(h)
    }
    ;
    this._onSpriteLoaded = function() {
        e.call(h);
        ++d === b && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var a in c)
            c[a].oSprite.oSpriteLibrary = this,
            c[a].oSprite.szKey = a,
            c[a].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            c[a].oSprite.onerror = function(a) {
                var b = a.currentTarget;
                setTimeout(function() {
                    c[b.szKey].oSprite.src = c[b.szKey].szPath
                }, 500)
            }
            ,
            c[a].oSprite.src = c[a].szPath
    }
    ;
    this.setLoaded = function(b) {
        a[b].bLoaded = !0
    }
    ;
    this.isLoaded = function(b) {
        return a[b].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 768, CANVAS_HEIGHT = 1280, EDGEBOARD_X = 40, EDGEBOARD_Y = 160, FPS = 30, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_LOADING_WHEEL = 2, STATE_GAME = 3, PRIMARY_FONT = "Arial", SECONDARY_FONT = "impact", THIRD_FONT = "comfortaa-bold", ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, GAME_MODE_BET = 0, GAME_MODE_INSTANT = 1, WHEEL_IDLE = 0, WHEEL_MOVEMENT = 1, SPIN_MODE_NORMAL = 0, SPIN_MODE_FREE = 1, TIME_ANIM_IDLE = 1E4, ANIM_IDLE1_TIMESPEED = 250, ANIM_IDLE2_TIMESPEED = 50, ANIM_IDLE3_TIMESPEED = 1E3, ANIM_SPIN_TIMESPEED = 50, TIME_ANIM_WIN = 5E3, ANIM_WIN1_TIMESPEED = 50, ANIM_WIN2_TIMESPEED = 100, TIME_ANIM_LOSE = 5E3, STATE_IDLE = 0, STATE_SPIN = 1, STATE_WIN = 2, STATE_LOSE = 3, LED_SPIN = 4, TIME_LOOP_WAIT = 1E3, MIN_AI_THINKING = 1E3, MAX_AI_THINKING = 1500, MIN_FAKE_SPIN = 3, WHEEL_SPIN_TIME, WHEEL_STRENGHT_ACTIVATION = 10, PRECISION = 1, NUM_SEGMENT_TO_RENDER = 1230, LABEL_HEIGHT = 40, START_CREDIT, START_BET, MAX_MULTIPLIER, MONEY_WHEEL_SETTINGS, AD_SHOW_COUNTER = [], BANK_CASH, WIN_OCCURRENCE, ENABLE_CREDITS, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, NUM_MONEY_BACKGROUNDS, NUM_IMAGES_BACKGROUNDS, WHEEL_TEXT_PIXEL_MAX_SIZE = 180, TEXT_PRELOADER_CONTINUE = "START", TEXT_GAMEOVER = "I'M SORRY, NO MORE CREDITS TO PLAY\nRECHARGE?", TEXT_CREDITS = "CREDITS", TEXT_SPIN = "SPIN", TEXT_PLUS = "+", TEXT_MIN = "-", TEXT_CURRENCY = "$", TEXT_WIN = "WIN", TEXT_FREESPIN = "FREE SPIN", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_DEVELOPED = "DEVELOPED BY", TEXT_HELP1 = 'CLICK ON "+" or "-" BUTTONS TO SELECT YOUR BET. PRIZE WILL VARY ACCORDING TO THE WAGER.', TEXT_HELP3 = "SPIN OR SWIPE ON THE WHEEL TO PLAY!", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better?";
function CPreloader() {
    var a, c, b, d, e, f, h, g, m, l;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        l = new createjs.Container;
        s_oStage.addChild(l)
    }
    ;
    this.unload = function() {
        l.removeAllChildren();
        m.unload()
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
        var n = new createjs.Shape;
        n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(n);
        n = s_oSpriteLibrary.getSprite("200x200");
        h = createBitmap(n);
        h.regX = .5 * n.width;
        h.regY = .5 * n.height;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 180;
        l.addChild(h);
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
        l.addChild(g);
        h.mask = g;
        n = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(n);
        d.x = CANVAS_WIDTH / 2 - n.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        l.addChild(d);
        a = n.width;
        c = n.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, c);
        l.addChild(e);
        d.mask = e;
        b = new createjs.Text("","30px " + PRIMARY_FONT,"#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        l.addChild(b);
        n = s_oSpriteLibrary.getSprite("but_start");
        m = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2,n,TEXT_PRELOADER_CONTINUE,"Arial","#000",50,!0,l);
        m.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        m.setVisible(!1);
        m.removeShadow();
        m.setTextHeight(62);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(f);
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(f);
            l.removeChild(f)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(f) {
        b.text = f + "%";
        100 === f && (s_oMain._onRemovePreloader(),
        b.visible = !1,
        d.visible = !1);
        e.graphics.clear();
        f = Math.floor(f * a / 100);
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, f, c)
    }
    ;
    this._init()
}
function CMain(a) {
    var c, b = 0, d = 0, e = STATE_LOADING, f, h;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20),
        $("body").on("contextmenu", "#canvas", function(a) {
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
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        c = !0
    }
    ;
    this.soundLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / d * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_button",
            loop: !1,
            volume: 1,
            ingamename: "click"
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
            filename: "reel",
            loop: !0,
            volume: 1,
            ingamename: "reel"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win"
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var a = 0; a < s_aSoundsInfo.length; a++)
            this.tryToLoadSound(s_aSoundsInfo[a], !1)
    }
    ;
    this.tryToLoadSound = function(a, b) {
        setTimeout(function() {
            s_aSounds[a.ingamename] = new Howl({
                src: [a.path + a.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: a.loop,
                volume: a.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(a, b) {
                    for (var c = 0; c < s_aSoundsInfo.length; c++)
                        if (a === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[c], !0);
                            break
                        }
                },
                onplayerror: function(a) {
                    for (var b = 0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[b].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[b].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[b].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, b ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("credits_panel", "./sprites/credits_panel.png");
        s_oSpriteLibrary.addSprite("swipe_hand", "./sprites/swipe_hand.png");
        s_oSpriteLibrary.addSprite("logo_game", "./sprites/logo_game.png");
        s_oSpriteLibrary.addSprite("gui_panel", "./sprites/gui_panel.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_spin", "./sprites/but_spin.png");
        s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
        s_oSpriteLibrary.addSprite("bet_panel", "./sprites/bet_panel.png");
        s_oSpriteLibrary.addSprite("credits_money_panel", "./sprites/credits_money_panel.png");
        s_oSpriteLibrary.addSprite("win_panel", "./sprites/win_panel.png");
        s_oSpriteLibrary.addSprite("leds", "./sprites/leds.png");
        s_oSpriteLibrary.addSprite("but_long_text", "./sprites/but_long_text.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("wheel_shadow", "./sprites/wheel_shadow.png");
        s_oSpriteLibrary.addSprite("wheel_back", "./sprites/wheel_back.png");
        for (var a = 0; a < NUM_MONEY_BACKGROUNDS; a++)
            s_oSpriteLibrary.addSprite("bg_" + a, "./sprites/money_prize_images/bg_" + a + ".png");
        s_oSpriteLibrary.addSprite("borderframe", "./sprites/borderframe.png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / d * 100))
    }
    ;
    this._onRemovePreloader = function() {
        f.unload();
        this.gotoMenu();
        new CWheel
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.gotoModeMenu = function() {
        new CModeMenu;
        e = STATE_MENU
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        e = STATE_MENU
    }
    ;
    this.gotoLoadingWheel = function() {
        e = STATE_LOADING_WHEEL;
        s_oLoadingPanel = new CLoadingPanel
    }
    ;
    this.gotoGame = function() {
        e = STATE_GAME;
        h = new CGame(g);
        $(s_oMain).trigger("game_start")
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        e = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    }
    ;
    this._update = function(a) {
        if (!1 !== c) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            switch (e) {
            case STATE_GAME:
                h.update();
                break;
            case STATE_LOADING_WHEEL:
                s_oLoadingPanel && s_oLoadingPanel.update()
            }
            null === s_oWheel || s_oWheel.isLoaded() || s_oWheel.loading();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    var g = a;
    ENABLE_CREDITS = a.show_credits;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    ENABLE_FULLSCREEN = a.fullscreen;
    MAX_MULTIPLIER = a.max_multiplier;
    MONEY_WHEEL_SETTINGS = a.money_wheel_settings;
    INSTANT_WHEEL_SETTINGS = a.instant_win_wheel_settings;
    NUM_MONEY_BACKGROUNDS = a.total_money_backgrounds_in_folder;
    NUM_IMAGES_BACKGROUNDS = a.total_images_backgrounds_in_folder;
    WHEEL_SPIN_TIME = a.wheel_spin_time;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bEasyMode, s_bAudioActive = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oCanvas, s_bFullscreen = !1, s_oLoadingPanel = null, s_aSounds, s_aSoundsInfo;
function CTextButton(a, c, b, d, e, f, h, g, m) {
    var l, n, q, k, t, u, r, z, D;
    this._init = function(a, b, c, d, e, f, g, h, m) {
        l = !1;
        n = [];
        q = [];
        r = createBitmap(c);
        var v = Math.ceil(g / 20);
        u = new createjs.Text(d,"bold " + g + "px " + e,"#000000");
        u.textAlign = "center";
        u.textBaseline = "alphabetic";
        var z = u.getBounds();
        u.x = c.width / 2 + v;
        u.y = Math.floor(c.height / 2) + z.height / 3 + v - 7;
        t = new createjs.Text(d,"bold " + g + "px " + e,f);
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        z = t.getBounds();
        t.x = c.width / 2;
        t.y = Math.floor(c.height / 2) + z.height / 3 - 7;
        k = new createjs.Container;
        k.x = a;
        k.y = b;
        k.regX = c.width / 2;
        k.regY = c.height / 2;
        k.cursor = "pointer";
        h || (a = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        }),
        r = createSprite(a, "state_false", c.width / 2 / 2, c.height / 2, c.width / 2, c.height),
        u.x = v,
        u.y = v + 17,
        t.x = 0,
        t.y = 17,
        k.regX = 0,
        k.regY = 0);
        k.addChild(r, u, t);
        m.addChild(k);
        this._initListener()
    }
    ;
    this.unload = function() {
        k.off("mousedown", z);
        k.off("pressup", D);
        m.removeChild(k)
    }
    ;
    this.setVisible = function(a) {
        k.visible = a
    }
    ;
    this.setClickable = function(a) {
        l = !a;
        a || (k.cursor = "arrow")
    }
    ;
    this._initListener = function() {
        oParent = this;
        z = k.on("mousedown", this.buttonDown);
        D = k.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        n[a] = b;
        q[a] = c
    }
    ;
    this.buttonRelease = function() {
        l || (k.scaleX = 1,
        k.scaleY = 1,
        n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(q[ON_MOUSE_UP]))
    }
    ;
    this.buttonDown = function() {
        l || (k.scaleX = .9,
        k.scaleY = .9,
        playSound("click", 1, !1),
        n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN]))
    }
    ;
    this.enable = function() {
        l = !1;
        g || r.gotoAndStop("state_true")
    }
    ;
    this.disable = function() {
        l = !0;
        g || r.gotoAndStop("state_false")
    }
    ;
    this.removeShadow = function() {
        u.visible = !1
    }
    ;
    this.fadeOut = function() {
        this.setClickable(!1);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500)
    }
    ;
    this.fadeIn = function() {
        this.setClickable(!0);
        createjs.Tween.get(k).to({
            alpha: 1
        }, 500)
    }
    ;
    this.setTextPosition = function(a, b) {
        var c = Math.ceil(h / 20);
        u.x = a + c;
        u.y = b + c;
        t.x = a;
        t.y = b
    }
    ;
    this.setTextHeight = function(a) {
        u.y = a + Math.ceil(h / 20);
        t.y = a
    }
    ;
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    }
    ;
    this.setX = function(a) {
        k.x = a
    }
    ;
    this.setY = function(a) {
        k.y = a
    }
    ;
    this.getButtonImage = function() {
        return k
    }
    ;
    this.getX = function() {
        return k.x
    }
    ;
    this.getY = function() {
        return k.y
    }
    ;
    this._init(a, c, b, d, e, f, h, g, m);
    return this
}
function CToggle(a, c, b, d) {
    var e, f, h, g, m, l;
    this._init = function(a, b, c, d) {
        f = [];
        h = [];
        var k = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        e = d;
        g = createSprite(k, "state_" + e, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        g.x = a;
        g.y = b;
        g.stop();
        g.cursor = "pointer";
        s_oStage.addChild(g);
        this._initListener()
    }
    ;
    this.unload = function() {
        g.off("mousedown", m);
        g.off("pressup", l);
        s_oStage.removeChild(g)
    }
    ;
    this._initListener = function() {
        m = g.on("mousedown", this.buttonDown);
        l = g.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        f[a] = b;
        h[a] = c
    }
    ;
    this.setActive = function(a) {
        e = a;
        g.gotoAndStop("state_" + e)
    }
    ;
    this.buttonRelease = function() {
        g.scaleX = 1;
        g.scaleY = 1;
        e = !e;
        g.gotoAndStop("state_" + e);
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(h[ON_MOUSE_UP], e)
    }
    ;
    this.buttonDown = function() {
        g.scaleX = .9;
        g.scaleY = .9;
        playSound("click", 1, !1);
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(a, b) {
        g.x = a;
        g.y = b
    }
    ;
    this._init(a, c, b, d)
}
function CGfxButton(a, c, b, d) {
    var e, f, h, g, m = [], l, n, q, k;
    this._init = function(a, b, c, d) {
        e = !1;
        f = 1;
        h = [];
        g = [];
        l = createBitmap(c);
        l.x = a;
        l.y = b;
        l.scaleX = l.scaleY = f;
        l.regX = c.width / 2;
        l.regY = c.height / 2;
        d.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? l.off("mousedown", n) : (l.off("mousedown", n),
        l.off("mouseover", k));
        l.off("pressup", q);
        d.removeChild(l)
    }
    ;
    this.setVisible = function(a) {
        l.visible = a
    }
    ;
    this.setClickable = function(a) {
        e = !a
    }
    ;
    this._initListener = function() {
        s_bMobile ? n = l.on("mousedown", this.buttonDown) : (n = l.on("mousedown", this.buttonDown),
        k = l.on("mouseover", this.buttonOver));
        q = l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        h[a] = b;
        g[a] = c
    }
    ;
    this.addEventListenerWithParams = function(a, b, c, d) {
        h[a] = b;
        g[a] = c;
        m = d
    }
    ;
    this.buttonRelease = function() {
        e || (l.scaleX = f,
        l.scaleY = f,
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(g[ON_MOUSE_UP], m))
    }
    ;
    this.buttonDown = function() {
        e || (l.scaleX = .9 * f,
        l.scaleY = .9 * f,
        playSound("click", 1, !1),
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], m))
    }
    ;
    this.buttonOver = function(a) {
        s_bMobile || e || (a.target.cursor = "pointer")
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(l).to({
            scaleX: .9 * f,
            scaleY: .9 * f
        }, 850, createjs.Ease.quadOut).to({
            scaleX: f,
            scaleY: f
        }, 650, createjs.Ease.quadIn).call(function() {
            t.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(l).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            t.trebleAnimation()
        })
    }
    ;
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    }
    ;
    this.setX = function(a) {
        l.x = a
    }
    ;
    this.setY = function(a) {
        l.y = a
    }
    ;
    this.getButtonImage = function() {
        return l
    }
    ;
    this.getX = function() {
        return l.x
    }
    ;
    this.getY = function() {
        return l.y
    }
    ;
    var t = this;
    this._init(a, c, b, d);
    return this
}
function CMenu() {
    var a, c, b, d = null, e = null, f, h, g, m, l, n, q;
    this._init = function() {
        h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(h);
        var k = s_oSpriteLibrary.getSprite("but_play");
        g = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 300,k,s_oStage);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            k = s_oSpriteLibrary.getSprite("audio_icon"),
            a = CANVAS_WIDTH - k.width / 4 - 10,
            c = k.height / 2 + 14,
            n = new CToggle(a,c,k,s_bAudioActive),
            n.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        k = s_oSpriteLibrary.getSprite("but_credits");
        var t = {
            x: k.width / 2 + 10,
            y: k.height / 2 + 14
        }
          , u = {
            x: t.x + k.width + 10,
            y: k.height / 2 + 14
        };
        ENABLE_CREDITS && (q = t,
        m = new CGfxButton(q.x,q.y,k,s_oStage),
        m.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this));
        k = window.document;
        var r = k.documentElement;
        d = r.requestFullscreen || r.mozRequestFullScreen || r.webkitRequestFullScreen || r.msRequestFullscreen;
        e = k.exitFullscreen || k.mozCancelFullScreen || k.webkitExitFullscreen || k.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (d = !1);
        d && screenfull.isEnabled && (k = s_oSpriteLibrary.getSprite("but_fullscreen"),
        b = ENABLE_CREDITS ? u : t,
        f = new CToggle(b.x,b.y,k,s_bFullscreen,!0),
        f.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(l);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 1E3).call(function() {
            l.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        g.unload();
        g = null;
        ENABLE_CREDITS && m.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            n.unload(),
            n = null;
        d && screenfull.isEnabled && f.unload();
        s_oStage.removeChild(h);
        s_oMenu = h = null
    }
    ;
    this.refreshButtonPos = function(e, g) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || n.setPosition(a - e, g + c);
        d && screenfull.isEnabled && f.setPosition(b.x + e, b.y + g);
        ENABLE_CREDITS && m.setPosition(q.x + e, q.y + g)
    }
    ;
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this.resetFullscreenBut = function() {
        d && screenfull.isEnabled && f.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? e.call(window.document) : d.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oWheel.isLoaded() ? s_oMain.gotoGame() : s_oMain.gotoLoadingWheel()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var c, b, d, e, f, h, g, m, l, n, q, k, t, u, r, z = null, D, v, I;
    this._init = function() {
        m = 1;
        d = b = 0;
        l = START_BET.toFixed(2) / 1;
        n = START_CREDIT.toFixed(2) / 1;
        q = -1;
        f = STATE_IDLE;
        h = SPIN_MODE_NORMAL;
        k = 0;
        t = BANK_CASH;
        g = 0;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        u = [];
        c = !0;
        D = new createjs.Container;
        D.scaleX = D.scaleY = 1.2;
        s_oStage.addChild(D);
        this.attachWheel();
        r = new CInterface;
        new CHelpPanel;
        this._initProbability();
        n < START_BET && this.gameOver()
    }
    ;
    this.attachWheel = function() {
        var a = CANVAS_HEIGHT / 2 - 105;
        s_oWheel.attachWheel(200, a, D);
        I = new CLeds(200,a,D);
        e = I.getState();
        v = s_oWheel
    }
    ;
    this._initProbability = function() {
        for (var a = [], b = 0; b < MONEY_WHEEL_SETTINGS.length; b++)
            a[b] = MONEY_WHEEL_SETTINGS[b].win_occurrence;
        for (b = 0; b < a.length; b++)
            for (var c = 0; c < a[b]; c++)
                u.push(b)
    }
    ;
    this.modifyBonus = function(a) {
        "plus" === a ? m++ : m--;
        m > MAX_MULTIPLIER ? m = MAX_MULTIPLIER : 1 > m ? m = 1 : m > n / START_BET && (m = Math.floor(n / START_BET));
        l = (START_BET * m).toFixed(2) / 1;
        r.refreshBet(l);
        v.setText(m)
    }
    ;
    this.addCredits = function(a) {
        n += a;
        r.refreshCredit(n.toFixed(2) / 1)
    }
    ;
    this.tryShowAd = function() {
        k++;
        k === AD_SHOW_COUNTER && (k = 0,
        $(s_oMain).trigger("show_interlevel_ad"))
    }
    ;
    this._getBetPrize = function() {
        for (var a, b = [], c = 0; c < u.length; c++)
            a = MONEY_WHEEL_SETTINGS[u[c]].prize * m,
            (a <= t || "freespin" === MONEY_WHEEL_SETTINGS[u[c]].type) && b.push({
                prize: a,
                index: c
            });
        return u[b[Math.floor(Math.random() * b.length)].index]
    }
    ;
    this.spinWheel = function() {
        r.disableSpin(!0);
        f = STATE_SPIN;
        d = 0;
        $(s_oMain).trigger("bet_placed", l);
        v.setText(m);
        this.setNewRound();
        h === SPIN_MODE_FREE ? (g--,
        r.enterInFreeSpinMode(g)) : (r.refreshMoney(0),
        n -= l,
        t += l,
        r.refreshCredit(n.toFixed(2) / 1));
        q = this._getBetPrize();
        playSound("start_reel", 1, !1);
        playSound("reel", .2, !0);
        v.spin(q)
    }
    ;
    this.setNewRound = function() {
        0 > q || (r.refreshCredit(n.toFixed(2) / 1),
        r.clearMoneyPanel(),
        q = -1)
    }
    ;
    this.releaseWheel = function() {
        this.tryShowAd();
        r.disableSpin(!1);
        stopSound("reel");
        MONEY_WHEEL_SETTINGS[q].prize > l || "freespin" === MONEY_WHEEL_SETTINGS[q].type ? (f = STATE_WIN,
        playSound("win", 1, !1)) : (f = STATE_LOSE,
        playSound("game_over", 1, !1));
        "prize" === MONEY_WHEEL_SETTINGS[q].type && s_oGame.setWinPrize();
        this.checkSpinMode();
        h === SPIN_MODE_NORMAL ? n < START_BET ? this.gameOver() : m > n / START_BET && (m = Math.floor(n / START_BET),
        l = (m * START_BET).toFixed(2) / 1,
        r.refreshBet(l),
        v.setText(m)) : this.spinWheel()
    }
    ;
    this.setWinPrize = function() {
        r.refreshMoney(MONEY_WHEEL_SETTINGS[q].prize * m);
        n += MONEY_WHEEL_SETTINGS[q].prize * m;
        t -= MONEY_WHEEL_SETTINGS[q].prize * m;
        $(s_oMain).trigger("save_score", [n]);
        r.refreshCredit(n.toFixed(2) / 1);
        0 < MONEY_WHEEL_SETTINGS[q].prize && r.animWin()
    }
    ;
    this.checkSpinMode = function() {
        "freespin" === MONEY_WHEEL_SETTINGS[q].type ? (g += MONEY_WHEEL_SETTINGS[q].prize,
        r.enterInFreeSpinMode(g),
        h === SPIN_MODE_NORMAL && (h = SPIN_MODE_FREE)) : h === SPIN_MODE_FREE && 0 === g && (h = SPIN_MODE_NORMAL,
        m > n / START_BET && (m = Math.floor(n / START_BET),
        l = (m * START_BET).toFixed(2) / 1,
        r.refreshBet(l),
        v.setText(m)),
        r.exitFromFreeSpinMode(l))
    }
    ;
    this.unload = function() {
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1);
        c = !1;
        r.unload();
        null !== z && z.unload();
        s_oWheel.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    }
    ;
    this.onExit = function() {
        stopSound("reel");
        $(s_oMain).trigger("save_score", [n]);
        $(s_oMain).trigger("share_event", n);
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu()
    }
    ;
    this.gameOver = function() {
        z = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        z.show()
    }
    ;
    this._animLedIdle = function() {
        b += s_iTimeElaps;
        if (b > TIME_ANIM_IDLE) {
            b = 0;
            for (var a = Math.floor(Math.random() * I.getNumAnim()); a === e; )
                a = Math.floor(Math.random() * I.getNumAnim());
            I.changeAnim(a);
            e = a
        }
    }
    ;
    this._animLedSpin = function() {
        I.changeAnim(LED_SPIN);
        f = -1
    }
    ;
    this._animLedWin = function() {
        0 === d ? I.changeAnim(LED_SPIN + 1 + Math.round(Math.random())) : d > TIME_ANIM_WIN && (b = TIME_ANIM_IDLE,
        f = STATE_IDLE,
        d = 0);
        d += s_iTimeElaps
    }
    ;
    this._animLedLose = function() {
        0 === d ? I.changeAnim(7) : d > TIME_ANIM_LOSE && (b = TIME_ANIM_IDLE,
        f = STATE_IDLE,
        d = 0);
        d += s_iTimeElaps
    }
    ;
    this.startUpdate = function() {
        c = !0;
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    }
    ;
    this.stopUpdate = function() {
        c = !1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    }
    ;
    this.update = function() {
        if (c) {
            I.update();
            switch (f) {
            case STATE_IDLE:
                this._animLedIdle();
                break;
            case STATE_SPIN:
                this._animLedSpin();
                break;
            case STATE_WIN:
                this._animLedWin();
                break;
            case STATE_LOSE:
                this._animLedLose()
            }
            v.update()
        }
    }
    ;
    s_oGame = this;
    START_CREDIT = a.start_credit;
    START_BET = a.start_bet;
    MAX_MULTIPLIER = a.max_multiplier;
    AD_SHOW_COUNTER = a.ad_show_counter;
    BANK_CASH = a.bank_cash;
    this._init()
}
var s_oGame;
function CFormatText(a, c, b, d) {
    var e, f, h, g;
    this._init = function(a, b, c, d) {
        e = 0;
        g = new createjs.Container;
        g.x = a;
        g.y = b;
        d.addChild(g);
        a = 85;
        b = a / 20;
        for (d = 0; d < c.length; d++) {
            var k = a + "px";
            f = new createjs.Text;
            f.text = c[d];
            f.font = "bold " + k + " " + PRIMARY_FONT;
            f.color = "#000000";
            f.textAlign = "left";
            f.textBaseline = "middle";
            f.x = e + 2;
            f.y = 2;
            g.addChild(f);
            h = new createjs.Text;
            h.text = c[d];
            h.font = "bold " + k + " " + PRIMARY_FONT;
            h.color = "#ffffff";
            h.textAlign = "left";
            h.textBaseline = "middle";
            h.x = e;
            g.addChild(h);
            e += h.getMeasuredWidth() + b;
            a -= 9
        }
        g.cache(0, -g.getBounds().height / 2, g.getBounds().width, g.getBounds().height)
    }
    ;
    this.unload = function() {
        d.removeChild(g)
    }
    ;
    this.rotateText = function(a) {
        g.rotation = a
    }
    ;
    this._init(a, c, b, d)
}
function CInterface() {
    var a, c, b, d, e, f, h = null, g = null, m, l, n, q, k, t, u, r, z, D, v, I;
    this._init = function() {
        v = this;
        u = 0;
        var F, y = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - y.width / 2 - 10;
        d = y.height / 2 + 14;
        n = new CGfxButton(b,d,y,s_oStage);
        n.addEventListener(ON_MOUSE_UP, this._onExit, this);
        a = F = CANVAS_WIDTH - y.width / 2 - 112;
        c = y.height / 2 + 14;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            y = s_oSpriteLibrary.getSprite("audio_icon"),
            l = new CToggle(a,c,y,s_bAudioActive),
            l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var A = window.document
          , H = A.documentElement;
        h = H.requestFullscreen || H.mozRequestFullScreen || H.webkitRequestFullScreen || H.msRequestFullscreen;
        g = A.exitFullscreen || A.mozCancelFullScreen || A.webkitExitFullscreen || A.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (h = !1);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            F = a - y.width / 2 - 10;
        h && screenfull.isEnabled && (y = s_oSpriteLibrary.getSprite("but_fullscreen"),
        e = F,
        f = y.height / 2 + 14,
        m = new CToggle(e,f,y,s_bFullscreen,!0),
        m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        F = new createjs.Container;
        F.x = CANVAS_WIDTH / 2 + 210;
        F.y = 76;
        F.scaleX = F.scaleY = .9;
        s_oStage.addChild(F);
        y = s_oSpriteLibrary.getSprite("gui_panel");
        A = createBitmap(y);
        A.regX = y.width / 2;
        A.regY = y.height / 2;
        A.y = 760;
        F.addChild(A);
        y = s_oSpriteLibrary.getSprite("logo_game");
        A = createBitmap(y);
        A.regX = y.width / 2;
        A.regY = y.height / 2;
        A.y = 376;
        F.addChild(A);
        var E = new createjs.Container;
        E.y = CANVAS_HEIGHT - 330;
        F.addChild(E);
        y = s_oSpriteLibrary.getSprite("bet_panel");
        var G = createBitmap(y);
        G.regX = y.width / 2;
        G.regY = y.height / 2;
        G.y = -100;
        E.addChild(G);
        A = y.width - 20;
        y = y.height - 20;
        H = G.x;
        G = G.y - 2;
        D = new CTLText(E,H - A / 2,G - y / 2,A,y,26,"center","#fff",THIRD_FONT,1,2,2,formatValue(START_BET),!0,!0,!1,!1);
        y = s_oSpriteLibrary.getSprite("but_spin");
        q = new CTextButton(0,0,y,TEXT_SPIN,THIRD_FONT,"#ffffff",60,!1,E);
        q.enable();
        q.addEventListener(ON_MOUSE_UP, this._onButSpinRelease, this);
        y = s_oSpriteLibrary.getSprite("but_plus");
        k = new CTextButton(98,-100,y,TEXT_PLUS,THIRD_FONT,"#ffffff",60,!1,E);
        k.enable();
        k.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        y = s_oSpriteLibrary.getSprite("but_plus");
        t = new CTextButton(-98,-100,y,TEXT_MIN,THIRD_FONT,"#ffffff",60,!1,E);
        t.enable();
        t.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        t.setTextPosition(-2, 10);
        y = s_oSpriteLibrary.getSprite("credits_money_panel");
        E = createBitmap(y);
        E.regX = y.width / 2;
        E.regY = y.height / 2;
        E.y = 600;
        F.addChild(E);
        var N = 28;
        A = 180;
        y = 40;
        H = E.x + 2;
        G = E.y - N + 2;
        new CTLText(F,H - A / 2,G - y / 2,A,y,30,"center","#000",THIRD_FONT,1,2,2,TEXT_CREDITS,!0,!0,!1,!1);
        H = E.x;
        G = E.y - N;
        new CTLText(F,H - A / 2,G - y / 2,A,y,30,"center","#ff0",THIRD_FONT,1,2,2,TEXT_CREDITS,!0,!0,!1,!1);
        A = 140;
        y = 40;
        H = E.x;
        G = E.y + 20;
        r = new CTLText(F,H - A / 2,G - y / 2,A,y,28,"center","#fff",THIRD_FONT,1,2,2,formatValue(START_CREDIT),!0,!0,!1,!1);
        y = s_oSpriteLibrary.getSprite("win_panel");
        E = createBitmap(y);
        E.regX = y.width / 2;
        E.regY = y.height / 2;
        E.y = 740;
        F.addChild(E);
        N = 24;
        A = 180;
        y = 40;
        H = E.x + 2;
        G = E.y - N + 2;
        new CTLText(F,H - A / 2,G - y / 2,A,y,30,"center","#000",THIRD_FONT,1,2,2,TEXT_WIN,!0,!0,!1,!1);
        H = E.x;
        G = E.y - N;
        new CTLText(F,H - A / 2,G - y / 2,A,y,30,"center","#ff0",THIRD_FONT,1,2,2,TEXT_WIN,!0,!0,!1,!1);
        A = 180;
        y = 40;
        H = E.x;
        G = E.y + 24;
        z = new CTLText(F,H - A / 2,G - y / 2,A,y,28,"center","#fff",THIRD_FONT,1,2,2,formatValue(0),!0,!0,!1,!1);
        I = new CTLText(F,H - A / 2,G - y / 2,A,y,28,"center","#ff0",THIRD_FONT,1,2,2,formatValue(0),!0,!0,!1,!1);
        I.setAlpha(0);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            l.unload(),
            l = null;
        n.unload();
        q.unload();
        h && screenfull.isEnabled && m.unload();
        s_oInterface = null
    }
    ;
    this.refreshCredit = function(a) {
        r.refreshText(formatValue(a))
    }
    ;
    this.clearMoneyPanel = function() {
        I.setAlpha(0);
        createjs.Tween.removeTweens(I.getText())
    }
    ;
    this.refreshMoney = function(a) {
        z.refreshText(formatValue(a));
        I.refreshText(formatValue(a))
    }
    ;
    this.refreshBet = function(a) {
        D.refreshText(formatValue(a))
    }
    ;
    this.refreshNumSpin = function(a) {
        (void 0).refreshText(a)
    }
    ;
    this.animWin = function() {
        u = 1 === u ? 0 : 1;
        createjs.Tween.get(I.getText()).to({
            alpha: u
        }, 150, createjs.Ease.cubicOut).call(function() {
            v.animWin()
        })
    }
    ;
    this._onButSpinRelease = function() {
        s_oGame.spinWheel()
    }
    ;
    this._onButPlusRelease = function() {
        s_oGame.modifyBonus("plus")
    }
    ;
    this._onButMinRelease = function() {
        s_oGame.modifyBonus("min")
    }
    ;
    this.disableSpin = function(a) {
        !0 === a ? (q.disable(),
        k.disable(),
        t.disable()) : (q.enable(),
        k.enable(),
        t.enable())
    }
    ;
    this.enterInFreeSpinMode = function(a) {
        t.fadeOut();
        k.fadeOut();
        createjs.Tween.get(D).to({
            alpha: 0
        }, 500).call(function() {
            D.refreshText("x" + a);
            D.setColor("#fff000");
            createjs.Tween.get(D).to({
                alpha: 1
            }, 500)
        })
    }
    ;
    this.exitFromFreeSpinMode = function(a) {
        t.fadeIn();
        k.fadeIn();
        createjs.Tween.get(D).to({
            alpha: 0
        }, 500).call(function() {
            D.refreshText(formatValue(a));
            D.setColor("#FFFFFF");
            createjs.Tween.get(D).to({
                alpha: 1
            }, 500)
        })
    }
    ;
    this.refreshButtonPos = function(g, k) {
        n.setPosition(b - g, k + d);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(a - g, k + c);
        h && screenfull.isEnabled && m.setPosition(e - g, f + k)
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this.resetFullscreenBut = function() {
        h && screenfull.isEnabled && m.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? g.call(window.document) : h.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onExit = function() {
        new CAreYouSurePanel
    }
    ;
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;
function CHelpPanel() {
    var a, c, b, d;
    this._init = function() {
        var e = this;
        b = new createjs.Container;
        s_oStage.addChild(b);
        a = new createjs.Shape;
        a.graphics.beginFill("rgba(0,0,0,1)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        createjs.Tween.get(a).to({
            alpha: .7
        }, 500);
        b.addChild(a);
        var h = s_oSpriteLibrary.getSprite("msg_box");
        c = createBitmap(h);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        c.regX = h.width / 2;
        c.regY = h.height / 2;
        b.addChild(c);
        var g = h.width - 100;
        h = 70;
        var m = CANVAS_WIDTH / 2
          , l = CANVAS_HEIGHT / 2 + 20;
        (new CTLText(b,m - g / 2,l - h / 2,g,h,20,"center","#000",THIRD_FONT,1.2,2,2,TEXT_HELP1,!0,!0,!0,!1)).setOutline(5);
        new CTLText(b,m - g / 2,l - h / 2,g,h,20,"center","#fff",THIRD_FONT,1.2,2,2,TEXT_HELP1,!0,!0,!0,!1);
        var n = new createjs.Container;
        n.x = CANVAS_WIDTH / 2;
        n.y = 680;
        b.addChild(n);
        h = s_oSpriteLibrary.getSprite("bet_panel");
        l = createBitmap(h);
        l.regX = h.width / 2;
        l.regY = h.height / 2;
        l.y = -100;
        n.addChild(l);
        g = h.width - 20;
        h = h.height - 20;
        m = l.x;
        l = l.y - 2;
        new CTLText(n,m - g / 2,l - h / 2,g,h,20,"center","#fff",THIRD_FONT,1,2,2,formatValue(START_BET),!0,!0,!1,!1);
        h = s_oSpriteLibrary.getSprite("but_plus");
        g = new CTextButton(98,-100,h,TEXT_PLUS,THIRD_FONT,"#ffffff",60,!1,n);
        g.enable();
        g.setClickable(!1);
        h = s_oSpriteLibrary.getSprite("but_plus");
        g = new CTextButton(-98,-100,h,TEXT_MIN,THIRD_FONT,"#ffffff",60,!1,n);
        g.enable();
        g.setTextPosition(-2, 10);
        g.setClickable(!1);
        m = CANVAS_WIDTH / 2;
        n = CANVAS_HEIGHT / 2 + 114;
        g = 200;
        h = 70;
        l = n;
        (new CTLText(b,m - g / 2,l - h / 2,g,h,20,"center","#000",THIRD_FONT,1.2,2,2,TEXT_HELP3,!0,!0,!0,!1)).setOutline(5);
        new CTLText(b,m - g / 2,l - h / 2,g,h,20,"center","#fff",THIRD_FONT,1.2,2,2,TEXT_HELP3,!0,!0,!0,!1);
        g = new createjs.Container;
        g.x = CANVAS_WIDTH / 2 - 170;
        g.y = 760;
        g.scaleX = g.scaleY = .5;
        b.addChild(g);
        h = s_oSpriteLibrary.getSprite("but_spin");
        g = new CTextButton(0,0,h,TEXT_SPIN,THIRD_FONT,"#ffffff",60,!1,g);
        g.enable();
        g.setClickable(!1);
        h = s_oSpriteLibrary.getSprite("swipe_hand");
        g = createBitmap(h);
        g.x = CANVAS_WIDTH / 2 + 170;
        g.y = 745;
        g.regX = h.width / 2;
        g.regY = h.height / 2;
        b.addChild(g);
        createjs.Tween.get(g, {
            loop: !0
        }).to({
            y: 775
        }, 1E3, createjs.Ease.cubicOut);
        d = b.on("pressup", function() {
            e._onExitHelp()
        })
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(b);
        b.off("pressup", d)
    }
    ;
    this._onExitHelp = function() {
        e.unload()
    }
    ;
    var e = this;
    this._init()
}
function CEndPanel(a) {
    var c, b, d, e, f, h, g, m;
    this._init = function(a) {
        b = new createjs.Container;
        b.alpha = 0;
        b.visible = !1;
        f = new createjs.Shape;
        f.alpha = 0;
        f.graphics.beginFill("rgba(0,0,0,1)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        createjs.Tween.get(f).to({
            alpha: .7
        }, 500);
        b.addChild(f);
        c = createBitmap(a);
        c.regX = a.width / 2;
        c.regY = a.height / 2;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        b.addChild(c);
        a = a.width - 70;
        var h = c.x
          , k = c.y - 24;
        d = new CTLText(b,h - a / 2,k - 40,a,80,30,"center","#000",THIRD_FONT,1.2,2,2," ",!0,!0,!0,!1);
        d.setOutline(5);
        e = new CTLText(b,h - a / 2,k - 40,a,80,30,"center","#fff",THIRD_FONT,1.2,2,2," ",!0,!0,!0,!1);
        g = new CGfxButton(c.x + 180,c.y + 130,s_oSpriteLibrary.getSprite("but_yes"),b);
        g.addEventListener(ON_MOUSE_UP, this._onYes, this);
        m = new CGfxButton(c.x - 180,c.y + 130,s_oSpriteLibrary.getSprite("but_no"),b);
        m.addEventListener(ON_MOUSE_UP, this._onExit, this);
        s_oStage.addChild(b)
    }
    ;
    this.unload = function() {
        b.off("mousedown", h);
        g.unload();
        m.unload();
        s_oStage.removeChild(b)
    }
    ;
    this._initListener = function() {
        h = b.on("mousedown", function() {})
    }
    ;
    this.show = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        d.refreshText(TEXT_GAMEOVER);
        e.refreshText(TEXT_GAMEOVER);
        b.visible = !0;
        createjs.Tween.get(b).to({
            alpha: 1
        }, 500).call(function() {
            l._initListener()
        })
    }
    ;
    this._onYes = function() {
        $(s_oMain).trigger("recharge");
        l.unload()
    }
    ;
    this._onExit = function() {
        b.off("mousedown", h);
        s_oStage.removeChild(b);
        $(s_oMain).trigger("end_session");
        s_oGame.onExit()
    }
    ;
    this._init(a);
    var l = this;
    return this
}
function CWheel() {
    var a, c, b, d, e, f, h, g, m, l, n, q, k, t, u;
    this._init = function(b, d) {
        a = !1;
        c = WHEEL_IDLE;
        f = 0;
        u = {
            cur: f
        };
        PRECISION = s_bMobile ? 3 : 1;
        t = new createjs.Container;
        t.visible = !1;
        var e = s_oSpriteLibrary.getSprite("wheel_back")
          , g = createBitmap(e);
        g.y = 16;
        g.regX = e.width / 2;
        g.regY = e.height / 2;
        t.addChild(g);
        e = 0;
        k = [];
        g = [];
        for (var h = 0; h < MONEY_WHEEL_SETTINGS.length; h++)
            g.push({
                sprite: MONEY_WHEEL_SETTINGS[h].background,
                prize: MONEY_WHEEL_SETTINGS[h].prize,
                type: MONEY_WHEEL_SETTINGS[h].type,
                size: 80,
                color: MONEY_WHEEL_SETTINGS[h].textcolor,
                stroke: 10,
                strokecolor: MONEY_WHEEL_SETTINGS[h].textstrokecolor
            });
        var l = [];
        for (h = 0; h < MAX_MULTIPLIER; h++) {
            l[h] = [];
            for (var r = 0; r < g.length; r++) {
                var m = "prize" === g[r].type ? (g[r].prize * (h + 1)).toFixed(2) / 1 : g[r].prize.toFixed(2) / 1;
                l[h][r] = {
                    sprite: g[r].sprite,
                    prize: m,
                    type: g[r].type,
                    size: g[r].size,
                    color: g[r].color,
                    stroke: g[r].stroke,
                    strokecolor: g[r].strokecolor
                }
            }
            r = new CReel(0,0,l[h],NUM_SEGMENT_TO_RENDER / PRECISION - PRECISION,t,e);
            k[e] = {
                element: r,
                loaded: !1
            };
            e++
        }
        e = s_oSpriteLibrary.getSprite("wheel_shadow");
        g = createBitmap(e);
        g.regX = e.width / 2;
        g.regY = e.height / 2;
        t.addChild(g);
        e = s_oSpriteLibrary.getSprite("arrow");
        g = createBitmap(e);
        g.x = -70;
        g.regX = e.width;
        g.regY = e.height / 2;
        t.addChild(g)
    }
    ;
    this.unload = function() {
        for (var a = 0; a < k.length; a++)
            k[a].element.setVisible(!1);
        c = WHEEL_IDLE;
        f = 0;
        t.off("mousedown", h);
        t.off("pressmove", g);
        t.off("pressup", m)
    }
    ;
    this.attachWheel = function(a, b, c) {
        e = 0;
        t.x = a;
        t.y = b;
        t.visible = !0;
        c.addChild(t);
        k[e].element.setVisible(!0);
        k[e].element.render();
        h = t.on("mousedown", this._onMouseDown);
        g = t.on("pressmove", this._onMouseMove);
        m = t.on("pressup", this._onMouseUp)
    }
    ;
    this._onMouseDown = function(a) {
        c !== WHEEL_MOVEMENT && (n = l = a.localY,
        b = f)
    }
    ;
    this._onMouseMove = function(a) {
        c !== WHEEL_MOVEMENT && (q = n - a.localY,
        f = s_oWheel.getRotation(b + (l - a.localY) / PRECISION),
        n = a.localY)
    }
    ;
    this._onMouseUp = function(a) {
        c !== WHEEL_MOVEMENT && q < -WHEEL_STRENGHT_ACTIVATION && s_oGame.spinWheel()
    }
    ;
    this.elementLoaded = function(b) {
        k[b].loaded = !0;
        for (b = 0; b < k.length; b++)
            if (!k[b].loaded)
                return;
        a = !0;
        s_oLoadingPanel && (s_oLoadingPanel.unload(),
        s_oMain.gotoGame())
    }
    ;
    this.isLoaded = function() {
        return a
    }
    ;
    this.loading = function() {
        for (var a = 0; a < k.length; a++)
            k[a].element.loading()
    }
    ;
    this.setText = function(a) {
        k[e].element.setVisible(!1);
        e = a - 1;
        k[e].element.clear();
        k[e].element.update(f);
        k[e].element.render();
        k[e].element.setVisible(!0)
    }
    ;
    this.getNumSegmentsOfASingleFrame = function() {
        return k[e].element.getNumSegmentsOfASingleFrame()
    }
    ;
    this.getTotalSegments = function() {
        return k[e].element.getNumSegments()
    }
    ;
    this.getDegree = function() {
        return f
    }
    ;
    this.getRotation = function(a) {
        a = Math.floor(a % this.getTotalSegments());
        0 > a && (a = this.getTotalSegments() + a);
        return a
    }
    ;
    this.spin = function(a) {
        var e = this.getNumSegmentsOfASingleFrame()
          , g = this.getTotalSegments();
        d = -(g * (MIN_FAKE_SPIN + Math.floor(3 * Math.random())) + (g - (a * e + (16 + Math.random() * (e - 32)))));
        c = WHEEL_MOVEMENT;
        b = f;
        a = 1E3 * WHEEL_SPIN_TIME;
        u.cur = b;
        createjs.Tween.get(u).to({
            cur: d
        }, a, createjs.Ease.cubicOut).call(function() {
            c = WHEEL_IDLE;
            s_oGame.releaseWheel()
        }).addEventListener("change", s_oWheel._onWheelMove)
    }
    ;
    this._onWheelMove = function() {
        f = s_oWheel.getRotation(u.cur)
    }
    ;
    this.update = function() {
        for (var a = 0; a < k.length; a++)
            k[a].element.update(f);
        k[e].element.render()
    }
    ;
    this._init();
    s_oWheel = this
}
var s_oWheel = null;
function CReel(a, c, b, d, e, f) {
    var h, g, m, l, n, q, k, t;
    this._init = function(a, b, c, d, e, f) {
        h = !1;
        this._initColors();
        t = new createjs.Container;
        this.setVisible(!1);
        e.addChild(t);
        this._initReel()
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(t)
    }
    ;
    this._initReel = function() {
        k = new CCircularList;
        q = [];
        for (var a = 0; a < b.length; a++)
            this._addFrame(b[a], a);
        k.setCircularList();
        this._setReelParameters()
    }
    ;
    this._addFrame = function(a, b) {
        var c = s_oSpriteLibrary.getSprite(a.sprite);
        c = new CComplexFrame(0,0,c,t,a);
        q.push(c);
        c = c.getFragments();
        for (var d = 0; d < c.length; d++)
            c[d].visible = !1,
            k.addElement(c[d], b)
    }
    ;
    this._setReelParameters = function() {
        g = 0;
        m = d;
        var a = Math.floor(m / 2);
        l = [];
        for (var b = 0; b < a; b++) {
            var c = Math.sqrt(1 - Math.pow(b / a, 2));
            l.push({
                scalex: c,
                scaley: 2 * c,
                y: b * PRECISION * c
            });
            if (c < Math.sqrt(.5))
                break
        }
        a = m - a;
        n = [];
        for (b = 0; b < a && !(c = Math.sqrt(1 - Math.pow(b / a, 2)),
        n.push({
            scalex: c,
            scaley: 2 * c,
            y: (-b - 1) * PRECISION * c
        }),
        c < Math.sqrt(.5)); b++)
            ;
    }
    ;
    this.render = function() {
        this.clear();
        for (var a = k.getElement(g), b, c = 0; c < l.length - PRECISION; c++)
            b = l[c].y,
            a.object.visible = !0,
            a.object.scaleX = l[c].scalex,
            a.object.scaleY = l[c].scaley,
            a.object.y = b,
            a = a.next;
        for (c = 0; c < PRECISION; c++)
            a.object.visible = !1,
            a = a.next;
        a = k.getElement(g).prev;
        for (c = 0; c < n.length; c++)
            b = n[c].y,
            a.object.visible = !0,
            a.object.scaleX = n[c].scalex,
            a.object.scaleY = n[c].scaley,
            a.object.y = b,
            a = a.prev;
        a.object.visible = !1
    }
    ;
    this.clear = function() {
        for (var a = k.getElement(0), b = 0; b < k.getLength(); b++)
            a.object.visible = !1,
            a = a.next
    }
    ;
    this.getNumSegmentsOfASingleFrame = function() {
        return q[0].getFragments().length
    }
    ;
    this.getNumSegments = function() {
        return k.getLength()
    }
    ;
    this.getFrameIndex = function(a) {
        return k.getElement(a).index
    }
    ;
    this._initColors = function() {}
    ;
    this.setText = function(a, b) {
        a.setText(TEXT_CURRENCY + b.prize, b.size, b.color, b.stroke, b.strokecolor)
    }
    ;
    this.setVisible = function(a) {
        t.visible = a
    }
    ;
    this.updateText = function(a) {
        for (var c = 0; c < q.length; c++)
            q[c].setText(TEXT_CURRENCY + b[c].prize * a, b[c].size, b[c].color, b[c].stroke, b[c].strokecolor)
    }
    ;
    this.getDegree = function() {
        return g
    }
    ;
    this.setDegree = function(a) {
        g = a
    }
    ;
    this.loading = function() {
        if (!h) {
            h = !0;
            for (var a = 0; a < q.length; a++)
                q[a].loadFragment(),
                q[a].isLoaded() || (h = !1);
            h && s_oWheel.elementLoaded(f)
        }
    }
    ;
    this.update = function(a) {
        g = a
    }
    ;
    this._init(a, c, b, d, e, f)
}
function CLeds(a, c, b) {
    var d, e, f, h, g, m, l, n, q, k, t, u, r;
    this._init = function(a, b, c) {
        h = 4;
        e = Math.floor(Math.random() * h);
        f = 0;
        l = [];
        n = [];
        n = ["green", "red", "blue", "violet", "yellow"];
        r = new createjs.Container;
        r.x = a;
        r.y = b;
        c.addChild(r);
        a = {
            images: [s_oSpriteLibrary.getSprite("leds")],
            frames: {
                width: 70,
                height: 70,
                regX: 35,
                regY: 35
            },
            animations: {
                off: [0],
                green: [1],
                red: [2],
                blue: [3],
                violet: [4],
                yellow: [5],
                white: [5]
            }
        };
        a = new createjs.SpriteSheet(a);
        b = [{
            x: -143,
            y: 319
        }, {
            x: 142,
            y: 319
        }, {
            x: -143,
            y: 234
        }, {
            x: 142,
            y: 234
        }, {
            x: -143,
            y: 149
        }, {
            x: 142,
            y: 149
        }, {
            x: -143,
            y: 54
        }, {
            x: 142,
            y: 54
        }, {
            x: -143,
            y: -46
        }, {
            x: 142,
            y: -46
        }, {
            x: -143,
            y: -150
        }, {
            x: 142,
            y: -150
        }, {
            x: -143,
            y: -260
        }, {
            x: 142,
            y: -260
        }, {
            x: -143,
            y: -360
        }, {
            x: 142,
            y: -360
        }, {
            x: -46,
            y: -360
        }, {
            x: 51,
            y: -360
        }];
        for (c = 0; c < b.length; c++)
            l[c] = createSprite(a, "off", 0, 0, 70, 70),
            l[c].x = b[c].x,
            l[c].y = b[c].y,
            r.addChild(l[c]);
        l[6].visible = !1;
        l[8].visible = !1;
        q = [];
        k = [];
        for (c = 0; c < l.length; c++)
            0 === c % 2 ? q.push(l[c]) : k.push(l[c]);
        t = [];
        for (c = 0; c < l.length; c++)
            t[c] = c < l.length / 2 ? q[c] : k[Math.abs(l.length - c - 1)];
        u = [];
        for (c = 0; c < l.length; c++)
            u[c] = t[t.length - 1 - c]
    }
    ;
    this.unload = function() {
        b.removeChild(r)
    }
    ;
    this.setWinColor = function(a) {}
    ;
    this.getState = function() {
        return e
    }
    ;
    this.getNumAnim = function() {
        return h
    }
    ;
    this.changeAnim = function(a) {
        f = 0;
        e = a;
        this.turnOffLights()
    }
    ;
    this.turnOffLights = function() {
        for (var a = 0; a < l.length; a++)
            l[a].gotoAndStop("off")
    }
    ;
    this.animIdle0 = function() {
        0 === f && (d = n[Math.floor(Math.random() * n.length)],
        g = 0);
        f += s_iTimeElaps;
        f > ANIM_IDLE1_TIMESPEED && (g > q.length - 1 ? (g = 0,
        this.turnOffLights()) : (q[g].gotoAndStop(d),
        k[g].gotoAndStop(d),
        g++,
        f = 1))
    }
    ;
    this.animIdle1 = function() {
        0 === f && (d = n[Math.floor(Math.random() * n.length)],
        m = g = 0);
        f += s_iTimeElaps;
        f > ANIM_IDLE2_TIMESPEED && (g > t.length - 1 ? (t[m].gotoAndStop("off"),
        m++,
        f = 1,
        m > t.length - 1 && (f = 0)) : (t[g].gotoAndStop(d),
        g++,
        f = 1))
    }
    ;
    this.animIdle2 = function() {
        0 === f && (d = n[Math.floor(Math.random() * n.length)],
        m = g = 0);
        f += s_iTimeElaps;
        f > ANIM_IDLE2_TIMESPEED && (g > u.length - 1 ? (u[m].gotoAndStop("off"),
        m++,
        f = 1,
        m > u.length - 1 && (f = 0)) : (u[g].gotoAndStop(d),
        g++,
        f = 1))
    }
    ;
    this.animIdle3 = function() {
        0 === f && (d = n[Math.floor(Math.random() * n.length)],
        g = 0);
        f += s_iTimeElaps;
        if (f > ANIM_IDLE3_TIMESPEED) {
            if (0 === g % 2)
                for (var a = 0; a < q.length; a++)
                    0 === a % 2 ? (q[a].gotoAndStop(d),
                    k[a].gotoAndStop("off")) : (q[a].gotoAndStop("off"),
                    k[a].gotoAndStop(d));
            else
                for (a = 0; a < q.length; a++)
                    0 === a % 2 ? (q[a].gotoAndStop("off"),
                    k[a].gotoAndStop(d)) : (q[a].gotoAndStop(d),
                    k[a].gotoAndStop("off"));
            g++;
            f = 1
        }
    }
    ;
    this.animSpin0 = function() {
        0 === f && (g = Math.floor(Math.random() * q.length),
        d = n[Math.floor(Math.random() * n.length)]);
        f += s_iTimeElaps;
        f > ANIM_SPIN_TIMESPEED && (0 > g && (g = q.length - 1,
        f = 1),
        g === q.length - 1 ? (q[0].gotoAndStop("off"),
        q[q.length - 1].gotoAndStop(d),
        k[0].gotoAndStop("off"),
        k[q.length - 1].gotoAndStop(d)) : (q[g + 1].gotoAndStop("off"),
        q[g].gotoAndStop(d),
        k[g + 1].gotoAndStop("off"),
        k[g].gotoAndStop(d)),
        g--,
        f = 1)
    }
    ;
    this.animWin0 = function() {
        f += s_iTimeElaps;
        if (f > ANIM_WIN1_TIMESPEED) {
            for (var a = 0; a < l.length; a++)
                d = n[Math.floor(Math.random() * n.length)],
                l[a].gotoAndStop(d);
            f = 1
        }
    }
    ;
    this.animWin1 = function() {
        f += s_iTimeElaps;
        d = n[Math.floor(Math.random() * n.length)];
        if (f > ANIM_WIN2_TIMESPEED) {
            for (var a = 0; a < l.length; a++)
                l[a].gotoAndStop(d);
            f = 1
        }
    }
    ;
    this.animLose = function() {
        d = n[Math.floor(Math.random() * n.length)];
        for (var a = 0; a < l.length; a++)
            l[a].gotoAndStop(d);
        e = -1
    }
    ;
    this.update = function() {
        switch (e) {
        case 0:
            this.animIdle0();
            break;
        case 1:
            this.animIdle1();
            break;
        case 2:
            this.animIdle2();
            break;
        case 3:
            this.animIdle3();
            break;
        case 4:
            this.animSpin0();
            break;
        case 5:
            this.animWin0();
            break;
        case 6:
            this.animWin1();
            break;
        case 7:
            this.animLose()
        }
    }
    ;
    this._init(a, c, b)
}
function CCircularList() {
    var a;
    this._init = function() {
        a = []
    }
    ;
    this.addElement = function(c, b) {
        a.push({
            object: c,
            index: b,
            next: null,
            prev: null
        })
    }
    ;
    this.getElement = function(c) {
        return a[c]
    }
    ;
    this.getLength = function() {
        return a.length
    }
    ;
    this.setCircularList = function() {
        for (var c = 0; c < a.length; c++)
            switch (c) {
            case 0:
                a[0].next = a[1];
                a[0].prev = a[a.length - 1];
                break;
            case a.length - 1:
                a[a.length - 1].next = a[0];
                a[a.length - 1].prev = a[a.length - 2];
                break;
            default:
                a[c].next = a[c + 1],
                a[c].prev = a[c - 1]
            }
    }
    ;
    this._set1Element = function() {
        a[0] = {
            object: a[0].object,
            next: a[0],
            prev: a[0]
        }
    }
    ;
    this._setNElements = function() {
        for (var c = 0; c < a.length; c++)
            switch (c) {
            case 0:
                a[0] = {
                    object: a[0].object,
                    next: a[1],
                    prev: a[a.length - 1]
                };
                break;
            case a.length - 1:
                a[a.length - 1] = {
                    object: a[a.length - 1].object,
                    next: a[0],
                    prev: a[a.length - 2]
                };
                break;
            default:
                a[c] = {
                    object: a[c].object,
                    prev: a[c - 1]
                },
                a[c - c] = {
                    object: a[c - 1].object,
                    next: a[c],
                    prev: a[c - 2]
                }
            }
    }
    ;
    this._init()
}
function CComplexFrame(a, c, b, d, e) {
    var f, h, g, m, l, n, q, k, t, u, r, z;
    this._init = function(a, b, c, d, e) {
        n = !1;
        k = 0;
        t = 5;
        f = 0;
        h = c.height - LABEL_HEIGHT;
        g = c.width;
        m = LABEL_HEIGHT;
        l = c.height - LABEL_HEIGHT / 2;
        z = [];
        for (d = q = 0; d < c.height; d += PRECISION)
            z[q] = new createjs.Container,
            z[q].x = a,
            z[q].y = b,
            z[q].regX = c.width / 2,
            z[q].regY = q * PRECISION,
            z[q].visible = !1,
            q++
    }
    ;
    this.getFragments = function() {
        return z
    }
    ;
    this.setText = function(a, c, d, e, f, g) {
        u = new createjs.Text(c," " + d + "px " + SECONDARY_FONT,g);
        u.x = b.width / 2;
        u.y = b.height / 2 + 3;
        u.textAlign = "center";
        u.textBaseline = "middle";
        u.outline = f;
        r = new createjs.Text(c," " + d + "px " + SECONDARY_FONT,e);
        r.x = b.width / 2;
        r.y = b.height / 2;
        r.textAlign = "center";
        r.textBaseline = "middle";
        for (c = d; u.getBounds().width > WHEEL_TEXT_PIXEL_MAX_SIZE; )
            c--,
            u.font = " " + c + "px " + SECONDARY_FONT,
            r.font = " " + c + "px " + SECONDARY_FONT;
        a.addChild(u, r)
    }
    ;
    this.setLabel = function(a, c, d, e) {
        var k = new createjs.Shape;
        k.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(f, h, g, m);
        r = new createjs.Text(c," " + d + "px " + SECONDARY_FONT,e);
        r.x = b.width / 2;
        r.y = l;
        r.textAlign = "center";
        r.textBaseline = "middle";
        for (c = d; r.getBounds().width > WHEEL_TEXT_PIXEL_MAX_SIZE; )
            c--,
            r.font = " " + c + "px " + SECONDARY_FONT;
        a.addChild(k, r)
    }
    ;
    this.isLoaded = function() {
        return n
    }
    ;
    this.loadFragment = function() {
        if (k === q)
            n = !0;
        else
            for (var a = 0; a < t; a++) {
                var c = createBitmap(b);
                z[k].addChild(c);
                d.addChild(z[k]);
                null !== e.prize && void 0 !== e.prize && ("prize" === e.type ? this.setText(z[k], TEXT_CURRENCY + e.prize, e.size, e.color, e.stroke, e.strokecolor) : this.setText(z[k], TEXT_FREESPIN + "\n x" + e.prize, e.size, e.color, e.stroke, e.strokecolor));
                null !== e.label && void 0 !== e.label && "" !== e.label && this.setLabel(z[k], e.label, 30, "#FFFFFF");
                c = createBitmap(s_oSpriteLibrary.getSprite("borderframe"));
                z[k].addChild(c);
                z[k].cache(0, k * PRECISION, b.width, PRECISION);
                k++;
                if (k === q) {
                    n = !0;
                    break
                }
            }
    }
    ;
    this._init(a, c, b, d, e)
}
function CLoadingPanel() {
    var a, c, b, d, e, f;
    this._init = function() {
        a = !0;
        c = 0;
        d = new createjs.Container;
        var h = (new createjs.Graphics).beginFill("rgba(0,0,0,0.3)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e = new createjs.Shape(h);
        f = e.on("click", function() {});
        var g = s_oSpriteLibrary.getSprite("logo_game");
        h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        h.x = .5 * CANVAS_WIDTH;
        h.y = 500;
        g = s_oSpriteLibrary.getSprite("leds");
        g = new createjs.SpriteSheet({
            images: [g],
            frames: {
                width: 70,
                height: 70,
                regX: 35,
                regY: 35
            },
            animations: {
                off: [0],
                green: [1],
                red: [2],
                blue: [3],
                violet: [4],
                yellow: [5],
                white: [5]
            }
        });
        b = [];
        for (var m = 0; 3 > m; m++)
            b[m] = createSprite(g, "violet", 0, 0, 70, 70),
            b[m].x = .5 * CANVAS_WIDTH - 72 + 70 * m,
            b[m].y = .5 * CANVAS_HEIGHT + 50;
        d.addChild(e, h, b[0], b[1], b[2]);
        s_oStage.addChild(d)
    }
    ;
    this.unload = function() {
        a = !1;
        e.off("click", f);
        s_oStage.removeChild(d);
        s_oLoadingPanel = null
    }
    ;
    this.update = function() {
        a && (c += s_iTimeElaps,
        0 <= c && c < TIME_LOOP_WAIT / 4 ? (b[0].visible = !1,
        b[1].visible = !1,
        b[2].visible = !1) : c >= TIME_LOOP_WAIT / 4 && c < 2 * TIME_LOOP_WAIT / 4 ? b[0].visible = !0 : c >= 2 * TIME_LOOP_WAIT / 4 && c < 3 * TIME_LOOP_WAIT / 4 ? b[1].visible = !0 : c >= 3 * TIME_LOOP_WAIT / 4 && c < TIME_LOOP_WAIT ? b[2].visible = !0 : c = 0)
    }
    ;
    this._init();
    s_oLoadingPanel = this
}
s_oLoadingPanel = null;
function CCreditsPanel() {
    var a, c, b, d, e, f, h;
    this._init = function() {
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0;
        s_oStage.addChild(c);
        f = new createjs.Shape;
        f.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = .01;
        h = f.on("click", this._onLogoButRelease);
        s_oStage.addChild(f);
        (new createjs.Tween.get(c)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var g = s_oSpriteLibrary.getSprite("credits_panel")
          , m = createBitmap(g);
        m.regX = g.width / 2;
        m.regY = g.height / 2;
        b.addChild(m);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + g.height / 2;
        a = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        m = g.width - 230;
        var l = 70
          , n = 0
          , q = -80;
        (new CTLText(b,n - m / 2,q - l / 2,m,l,30,"center","#000",THIRD_FONT,1,2,2,TEXT_DEVELOPED,!0,!0,!1,!1)).setOutline(5);
        new CTLText(b,n - m / 2,q - l / 2,m,l,30,"center","#ff0",THIRD_FONT,1,2,2,TEXT_DEVELOPED,!0,!0,!1,!1);
        m = g.width - 230;
        l = 70;
        n = 0;
        q = 80;
        (new CTLText(b,n - m / 2,q - l / 2,m,l,30,"center","#000",THIRD_FONT,1,2,2,"www.codethislab.com",!0,!0,!1,!1)).setOutline(5);
        new CTLText(b,n - m / 2,q - l / 2,m,l,30,"center","#ff0",THIRD_FONT,1,2,2,"www.codethislab.com",!0,!0,!1,!1);
        g = s_oSpriteLibrary.getSprite("ctl_logo");
        e = createBitmap(g);
        e.regX = g.width / 2;
        e.regY = g.height / 2;
        b.addChild(e);
        g = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(212,-126,g,b);
        d.addEventListener(ON_MOUSE_UP, this.unload, this)
    }
    ;
    this.unload = function() {
        d.setClickable(!1);
        (new createjs.Tween.get(c)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(c);
            s_oStage.removeChild(b);
            d.unload()
        });
        f.off("click", h)
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
function CAreYouSurePanel() {
    var a, c, b, d, e, f;
    this._init = function() {
        s_oGame.stopUpdate();
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = 0;
        f = d.on("mousedown", function() {});
        s_oStage.addChild(d);
        (new createjs.Tween.get(d)).to({
            alpha: .7
        }, 500);
        e = new createjs.Container;
        s_oStage.addChild(e);
        var g = s_oSpriteLibrary.getSprite("msg_box")
          , h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        e.addChild(h);
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT + g.height / 2;
        a = e.y;
        (new createjs.Tween.get(e)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        h = g.width - 100;
        g = -g.height / 2 + 180;
        (new CTLText(e,-(h / 2),g - 35,h,70,34,"center","#000",THIRD_FONT,1,2,2,TEXT_ARE_SURE,!0,!0,!1,!1)).setOutline(5);
        new CTLText(e,-(h / 2),g - 35,h,70,34,"center","#fff",THIRD_FONT,1,2,2,TEXT_ARE_SURE,!0,!0,!1,!1);
        c = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),e);
        c.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        b = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_no"),e);
        b.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        b.pulseAnimation()
    }
    ;
    this._onButYes = function() {
        b.setClickable(!1);
        c.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            h.unload();
            s_oGame.onExit()
        })
    }
    ;
    this._onButNo = function() {
        s_oGame.startUpdate();
        b.setClickable(!1);
        c.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            h.unload()
        })
    }
    ;
    this.unload = function() {
        b.unload();
        c.unload();
        s_oStage.removeChild(d);
        s_oStage.removeChild(e);
        d.off("mousedown", f)
    }
    ;
    var h = this;
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var a = this._iFontSize; (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--,
            this._oText.font = a + "px " + this._szFont,
            this._oText.lineHeight = Math.round(a * this._fLineHeightFactor),
            this.__updateY(),
            this.__verticalAlign(),
            8 > a); )
                ;
            this._iFontSize = a
        }
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
    setShadow: function(a, c, b, d) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,c,b,d))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setY: function(a) {
        this._y = this._oText.y = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
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
function CTLText(a, c, b, d, e, f, h, g, m, l, n, q, k, t, u, r, z) {
    this._oContainer = a;
    this._x = c;
    this._y = b;
    this._iWidth = d;
    this._iHeight = e;
    this._bMultiline = r;
    this._iFontSize = f;
    this._szAlign = h;
    this._szColor = g;
    this._szFont = m;
    this._iPaddingH = n;
    this._iPaddingV = q;
    this._bVerticalAlign = u;
    this._bFitText = t;
    this._bDebug = z;
    this._oDebugShape = null;
    this._fLineHeightFactor = l;
    this._oText = null;
    k && this.__createText(k)
}
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var c = a.split(".")
      , b = c.length;
    2 < b && (a = c[b - 2] + "." + c[b - 1]);
    return a
}
var getClosestTop = function() {
    var a = window
      , c = !1;
    try {
        for (; a.parent.document !== a.document; )
            if (a.parent.document)
                a = a.parent;
            else {
                c = !0;
                break
            }
    } catch (b) {
        c = !0
    }
    return {
        topFrame: a,
        err: c
    }
}
  , getBestPageUrl = function(a) {
    var c = a.topFrame
      , b = "";
    if (a.err)
        try {
            try {
                b = window.top.location.href
            } catch (e) {
                var d = window.location.ancestorOrigins;
                b = d[d.length - 1]
            }
        } catch (e) {
            b = c.document.referrer
        }
    else
        b = c.location.href;
    return b
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), c = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], b = 0; b < c.length; b++)
        if (c[b] === a)
            return !0;
    return !1
}
;
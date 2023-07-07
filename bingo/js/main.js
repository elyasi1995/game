/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , b = "undefined" !== typeof module && module.exports
      , c = function() {
        for (var c, b = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], d = 0, f = b.length, k = {}; d < f; d++)
            if ((c = b[d]) && c[1]in a) {
                for (d = 0; d < c.length; d++)
                    k[b[0][d]] = c[d];
                return k
            }
        return !1
    }()
      , d = {
        change: c.fullscreenchange,
        error: c.fullscreenerror
    }
      , f = {
        request: function(b) {
            return new Promise(function(d, e) {
                var f = function() {
                    this.off("change", f);
                    d()
                }
                .bind(this);
                this.on("change", f);
                b = b || a.documentElement;
                Promise.resolve(b[c.requestFullscreen]())["catch"](e)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(b, d) {
                if (this.isFullscreen) {
                    var e = function() {
                        this.off("change", e);
                        b()
                    }
                    .bind(this);
                    this.on("change", e);
                    Promise.resolve(a[c.exitFullscreen]())["catch"](d)
                } else
                    b()
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
        on: function(c, b) {
            var e = d[c];
            e && a.addEventListener(e, b, !1)
        },
        off: function(c, b) {
            var e = d[c];
            e && a.removeEventListener(e, b, !1)
        },
        raw: c
    };
    c ? (Object.defineProperties(f, {
        isFullscreen: {
            get: function() {
                return !!a[c.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[c.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[c.fullscreenEnabled]
            }
        }
    }),
    b ? module.exports = f : window.screenfull = f) : b ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}
)();
(function() {
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }
    function b(a, c) {
        var b = -1
          , p = a ? a.length : 0;
        if ("number" == typeof p && -1 < p && p <= x)
            for (; ++b < p; )
                c(a[b], b, a);
        else
            d(a, c)
    }
    function c(c) {
        c = String(c).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(c) ? c : a(c)
    }
    function d(a, c) {
        for (var b in a)
            B.call(a, b) && c(a[b], b, a)
    }
    function f(c) {
        return null == c ? a(c) : t.call(c).slice(8, -1)
    }
    function m(a, c) {
        var b = null != a ? typeof a[c] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(b) && ("object" == b ? !!a[c] : !0)
    }
    function g(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }
    function e(a, c) {
        var d = null;
        b(a, function(b, e) {
            d = c(d, b, e, a)
        });
        return d
    }
    function q(a) {
        function b(b) {
            return e(b, function(b, d) {
                var e = d.pattern || g(d);
                !b && (b = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((b = String(d.label && !RegExp(e, "i").test(d.label) ? d.label : b).split("/"))[1] && !/[\d.]+/.test(b[0]) && (b[0] += " " + b[1]),
                d = d.label || d,
                b = c(b[0].replace(RegExp(e, "i"), d).replace(RegExp("; *(?:" + d + "[_-])?", "i"), " ").replace(RegExp("(" + d + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return b
            })
        }
        function k(c) {
            return e(c, function(c, b) {
                return c || (RegExp(b + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var r = u
          , A = a && "object" == typeof a && "String" != f(a);
        A && (r = a,
        a = null);
        var n = r.navigator || {}
          , p = n.userAgent || "";
        a || (a = p);
        var v = A ? !!n.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(t.toString())
          , B = A ? "Object" : "ScriptBridgingProxyObject"
          , x = A ? "Object" : "Environment"
          , C = A && r.java ? "JavaPackage" : f(r.java)
          , L = A ? "Object" : "RuntimeObject";
        x = (C = /\bJava/.test(C) && r.java) && f(r.environment) == x;
        var K = C ? "a" : "\u03b1", J = C ? "b" : "\u03b2", M = r.document || {}, E = r.operamini || r.opera, I = l.test(I = A && E ? E["[[Class]]"] : f(E)) ? I : E = null, h, R = a;
        A = [];
        var U = null
          , N = a == p;
        p = N && E && "function" == typeof E.version && E.version();
        var G = function(c) {
            return e(c, function(c, b) {
                return c || RegExp("\\b" + (b.pattern || g(b)) + "\\b", "i").exec(a) && (b.label || b)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , w = function(c) {
            return e(c, function(c, b) {
                return c || RegExp("\\b" + (b.pattern || g(b)) + "\\b", "i").exec(a) && (b.label || b)
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
          , H = b([{
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
          , F = function(c) {
            return e(c, function(c, b, d) {
                return c || (b[H] || b[/^[a-z]+(?: +[a-z]+\b)*/i.exec(H)] || RegExp("\\b" + g(d) + "(?:\\b|\\w*\\d)", "i").exec(a)) && d
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
          , y = function(b) {
            return e(b, function(b, d) {
                var e = d.pattern || g(d);
                if (!b && (b = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                    var f = b
                      , p = d.label || d
                      , r = {
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
                    e && p && /^Win/i.test(f) && !/^Windows Phone /i.test(f) && (r = r[/[\d.]+$/.exec(f)]) && (f = "Windows " + r);
                    f = String(f);
                    e && p && (f = f.replace(RegExp(e, "i"), p));
                    b = f = c(f.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return b
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        G && (G = [G]);
        F && !H && (H = b([F]));
        if (h = /\bGoogle TV\b/.exec(H))
            H = h[0];
        /\bSimulator\b/i.test(a) && (H = (H ? H + " " : "") + "Simulator");
        "Opera Mini" == w && /\bOPiOS\b/.test(a) && A.push("running in Turbo/Uncompressed mode");
        "IE" == w && /\blike iPhone OS\b/.test(a) ? (h = q(a.replace(/like iPhone OS/, "")),
        F = h.manufacturer,
        H = h.product) : /^iP/.test(H) ? (w || (w = "Safari"),
        y = "iOS" + ((h = / OS ([\d_]+)/i.exec(a)) ? " " + h[1].replace(/_/g, ".") : "")) : "Konqueror" != w || /buntu/i.test(y) ? F && "Google" != F && (/Chrome/.test(w) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(H)) || /\bAndroid\b/.test(y) && /^Chrome/.test(w) && /\bVersion\//i.test(a) ? (w = "Android Browser",
        y = /\bAndroid\b/.test(y) ? y : "Android") : "Silk" == w ? (/\bMobi/i.test(a) || (y = "Android",
        A.unshift("desktop mode")),
        /Accelerated *= *true/i.test(a) && A.unshift("accelerated")) : "PaleMoon" == w && (h = /\bFirefox\/([\d.]+)\b/.exec(a)) ? A.push("identifying as Firefox " + h[1]) : "Firefox" == w && (h = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (y || (y = "Firefox OS"),
        H || (H = h[1])) : !w || (h = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(w)) ? (w && !H && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(h + "/") + 8)) && (w = null),
        (h = H || F || y) && (H || F || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(y)) && (w = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(y) ? y : h) + " Browser")) : "Electron" == w && (h = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && A.push("Chromium " + h) : y = "Kubuntu";
        p || (p = k(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", g(w), "(?:Firefox|Minefield|NetFront)"]));
        if (h = "iCab" == G && 3 < parseFloat(p) && "WebKit" || /\bOpera\b/.test(w) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(G) && "WebKit" || !G && /\bMSIE\b/i.test(a) && ("Mac OS" == y ? "Tasman" : "Trident") || "WebKit" == G && /\bPlayStation\b(?! Vita\b)/i.test(w) && "NetFront")
            G = [h];
        "IE" == w && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (w += " Mobile",
        y = "Windows Phone " + (/\+$/.test(h) ? h : h + ".x"),
        A.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (w = "IE Mobile",
        y = "Windows Phone 8.x",
        A.unshift("desktop mode"),
        p || (p = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != w && "Trident" == G && (h = /\brv:([\d.]+)/.exec(a)) && (w && A.push("identifying as " + w + (p ? " " + p : "")),
        w = "IE",
        p = h[1]);
        if (N) {
            if (m(r, "global"))
                if (C && (h = C.lang.System,
                R = h.getProperty("os.arch"),
                y = y || h.getProperty("os.name") + " " + h.getProperty("os.version")),
                x) {
                    try {
                        p = r.require("ringo/engine").version.join("."),
                        w = "RingoJS"
                    } catch (X) {
                        (h = r.system) && h.global.system == r.system && (w = "Narwhal",
                        y || (y = h[0].os || null))
                    }
                    w || (w = "Rhino")
                } else
                    "object" == typeof r.process && !r.process.browser && (h = r.process) && ("object" == typeof h.versions && ("string" == typeof h.versions.electron ? (A.push("Node " + h.versions.node),
                    w = "Electron",
                    p = h.versions.electron) : "string" == typeof h.versions.nw && (A.push("Chromium " + p, "Node " + h.versions.node),
                    w = "NW.js",
                    p = h.versions.nw)),
                    w || (w = "Node.js",
                    R = h.arch,
                    y = h.platform,
                    p = (p = /[\d.]+/.exec(h.version)) ? p[0] : null));
            else
                f(h = r.runtime) == B ? (w = "Adobe AIR",
                y = h.flash.system.Capabilities.os) : f(h = r.phantom) == L ? (w = "PhantomJS",
                p = (h = h.version || null) && h.major + "." + h.minor + "." + h.patch) : "number" == typeof M.documentMode && (h = /\bTrident\/(\d+)/i.exec(a)) ? (p = [p, M.documentMode],
                (h = +h[1] + 4) != p[1] && (A.push("IE " + p[1] + " mode"),
                G && (G[1] = ""),
                p[1] = h),
                p = "IE" == w ? String(p[1].toFixed(1)) : p[0]) : "number" == typeof M.documentMode && /^(?:Chrome|Firefox)\b/.test(w) && (A.push("masking as " + w + " " + p),
                w = "IE",
                p = "11.0",
                G = ["Trident"],
                y = "Windows");
            y = y && c(y)
        }
        p && (h = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(p) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (N && n.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (U = /b/i.test(h) ? "beta" : "alpha",
        p = p.replace(RegExp(h + "\\+?$"), "") + ("beta" == U ? J : K) + (/\d+\+?/.exec(h) || ""));
        if ("Fennec" == w || "Firefox" == w && /\b(?:Android|Firefox OS)\b/.test(y))
            w = "Firefox Mobile";
        else if ("Maxthon" == w && p)
            p = p.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(H))
            "Xbox 360" == H && (y = null),
            "Xbox 360" == H && /\bIEMobile\b/.test(a) && A.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(w) && (!w || H || /Browser|Mobi/.test(w)) || "Windows CE" != y && !/Mobi/i.test(a))
            if ("IE" == w && N)
                try {
                    null === r.external && A.unshift("platform preview")
                } catch (X) {
                    A.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(H) || /\bBB10\b/.test(a)) && (h = (RegExp(H.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || p) ? (h = [h, /BB10/.test(a)],
                y = (h[1] ? (H = null,
                F = "BlackBerry") : "Device Software") + " " + h[0],
                p = null) : this != d && "Wii" != H && (N && E || /Opera/.test(w) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == w && /\bOS X (?:\d+\.){2,}/.test(y) || "IE" == w && (y && !/^Win/.test(y) && 5.5 < p || /\bWindows XP\b/.test(y) && 8 < p || 8 == p && !/\bTrident\b/.test(a))) && !l.test(h = q.call(d, a.replace(l, "") + ";")) && h.name && (h = "ing as " + h.name + ((h = h.version) ? " " + h : ""),
                l.test(w) ? (/\bIE\b/.test(h) && "Mac OS" == y && (y = null),
                h = "identify" + h) : (h = "mask" + h,
                w = I ? c(I.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(h) && (y = null),
                N || (p = null)),
                G = ["Presto"],
                A.push(h));
        else
            w += " Mobile";
        if (h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            h = [parseFloat(h.replace(/\.(\d)$/, ".0$1")), h];
            if ("Safari" == w && "+" == h[1].slice(-1))
                w = "WebKit Nightly",
                U = "alpha",
                p = h[1].slice(0, -1);
            else if (p == h[1] || p == (h[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1]))
                p = null;
            h[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == h[0] && 537.36 == h[2] && 28 <= parseFloat(h[1]) && "WebKit" == G && (G = ["Blink"]);
            N && (v || h[1]) ? (G && (G[1] = "like Chrome"),
            h = h[1] || (h = h[0],
            530 > h ? 1 : 532 > h ? 2 : 532.05 > h ? 3 : 533 > h ? 4 : 534.03 > h ? 5 : 534.07 > h ? 6 : 534.1 > h ? 7 : 534.13 > h ? 8 : 534.16 > h ? 9 : 534.24 > h ? 10 : 534.3 > h ? 11 : 535.01 > h ? 12 : 535.02 > h ? "13+" : 535.07 > h ? 15 : 535.11 > h ? 16 : 535.19 > h ? 17 : 536.05 > h ? 18 : 536.1 > h ? 19 : 537.01 > h ? 20 : 537.11 > h ? "21+" : 537.13 > h ? 23 : 537.18 > h ? 24 : 537.24 > h ? 25 : 537.36 > h ? 26 : "Blink" != G ? "27" : "28")) : (G && (G[1] = "like Safari"),
            h = (h = h[0],
            400 > h ? 1 : 500 > h ? 2 : 526 > h ? 3 : 533 > h ? 4 : 534 > h ? "4+" : 535 > h ? 5 : 537 > h ? 6 : 538 > h ? 7 : 601 > h ? 8 : "8"));
            G && (G[1] += " " + (h += "number" == typeof h ? ".x" : /[.+]/.test(h) ? "" : "+"));
            "Safari" == w && (!p || 45 < parseInt(p)) && (p = h)
        }
        "Opera" == w && (h = /\bzbov|zvav$/.exec(y)) ? (w += " ",
        A.unshift("desktop mode"),
        "zvav" == h ? (w += "Mini",
        p = null) : w += "Mobile",
        y = y.replace(RegExp(" *" + h + "$"), "")) : "Safari" == w && /\bChrome\b/.exec(G && G[1]) && (A.unshift("desktop mode"),
        w = "Chrome Mobile",
        p = null,
        /\bOS X\b/.test(y) ? (F = "Apple",
        y = "iOS 4.3+") : y = null);
        p && 0 == p.indexOf(h = /[\d.]+$/.exec(y)) && -1 < a.indexOf("/" + h + "-") && (y = String(y.replace(h, "")).replace(/^ +| +$/g, ""));
        G && !/\b(?:Avant|Nook)\b/.test(w) && (/Browser|Lunascape|Maxthon/.test(w) || "Safari" != w && /^iOS/.test(y) && /\bSafari\b/.test(G[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(w) && G[1]) && (h = G[G.length - 1]) && A.push(h);
        A.length && (A = ["(" + A.join("; ") + ")"]);
        F && H && 0 > H.indexOf(F) && A.push("on " + F);
        H && A.push((/^on /.test(A[A.length - 1]) ? "" : "on ") + H);
        if (y) {
            var W = (h = / ([\d.+]+)$/.exec(y)) && "/" == y.charAt(y.length - h[0].length - 1);
            y = {
                architecture: 32,
                family: h && !W ? y.replace(h[0], "") : y,
                version: h ? h[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !W ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(R)) && !/\bi686\b/i.test(R) ? (y && (y.architecture = 64,
        y.family = y.family.replace(RegExp(" *" + h), "")),
        w && (/\bWOW64\b/i.test(a) || N && /\w(?:86|32)$/.test(n.cpuClass || n.platform) && !/\bWin64; x64\b/i.test(a)) && A.unshift("32-bit")) : y && /^OS X/.test(y.family) && "Chrome" == w && 39 <= parseFloat(p) && (y.architecture = 64);
        a || (a = null);
        r = {};
        r.description = a;
        r.layout = G && G[0];
        r.manufacturer = F;
        r.name = w;
        r.prerelease = U;
        r.product = H;
        r.ua = a;
        r.version = w && p;
        r.os = y || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        r.parse = q;
        r.toString = function() {
            return this.description || ""
        }
        ;
        r.version && A.unshift(p);
        r.name && A.unshift(w);
        y && w && (y != String(y).split(" ")[0] || y != w.split(" ")[0] && !H) && A.push(H ? "(" + y + ")" : "on " + y);
        A.length && (r.description = A.join(" "));
        return r
    }
    var k = {
        "function": !0,
        object: !0
    }
      , u = k[typeof window] && window || this
      , v = k[typeof exports] && exports;
    k = k[typeof module] && module && !module.nodeType && module;
    var n = v && k && "object" == typeof global && global;
    !n || n.global !== n && n.window !== n && n.self !== n || (u = n);
    var x = Math.pow(2, 53) - 1
      , l = /\bOpera/;
    n = Object.prototype;
    var B = n.hasOwnProperty
      , t = n.toString
      , C = q();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (u.platform = C,
    define(function() {
        return C
    })) : v && k ? d(C, function(a, c) {
        v[c] = a
    }) : u.platform = C
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
    }], b = 0; b < a.length; b++) {
        var c = document.createElement("meta");
        c.name = a[b].name;
        c.content = a[b].content;
        var d = window.document.head.querySelector('meta[name="' + c.name + '"]');
        d && d.parentNode.removeChild(d);
        window.document.head.appendChild(c)
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
$(document).ready(function() {
    platform && "iPhone" === platform.product && !iosInIframe() && (buildIOSFullscreenPanel(),
    buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_bIsIphone = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
)(navigator.userAgent || navigator.vendor || window.opera);
function isTablet() {
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("ipad") ? !0 : -1 < a.indexOf("android") && -1 === a.indexOf("mobile") ? !0 : !1
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
$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function getSize(a) {
    var b = a.toLowerCase()
      , c = window.document
      , d = c.documentElement;
    if (void 0 === window["inner" + a])
        a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var f = c.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var m = c.createElement("div");
        m.id = "vpw-test-d";
        m.style.cssText = "position:absolute;top:-1000px";
        m.innerHTML = "<style>@media(" + b + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        f.appendChild(m);
        d.insertBefore(f, c.head);
        a = 7 == m["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(f)
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
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var b = getSize("Width");
        _checkOrientation(b, a);
        var c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH)
          , d = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var f = a - c;
            c += f;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * f
        } else
            d < b && (f = b - d,
            d += f,
            c += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        f = a / 2 - c / 2;
        var m = b / 2 - d / 2
          , g = CANVAS_WIDTH / d;
        if (m * g < -EDGEBOARD_X || f * g < -EDGEBOARD_Y)
            c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            d = Math.round(CANVAS_WIDTH * c),
            c = Math.round(CANVAS_HEIGHT * c),
            f = (a - c) / 2,
            m = (b - d) / 2,
            g = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * m * g;
        s_iOffsetY = -1 * f * g;
        0 <= f && (s_iOffsetY = 0);
        0 <= m && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oCardSelection && s_oCardSelection.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * d,
        s_oStage.canvas.height = 2 * c,
        canvas.style.width = d + "px",
        canvas.style.height = c + "px",
        s_iScaleFactor = 2 * Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", d + "px"),
        $("#canvas").css("height", c + "px")) : (s_oStage.canvas.width = d,
        s_oStage.canvas.height = c,
        s_iScaleFactor = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > f || (f = (a - c) / 2);
        $("#canvas").css("top", f + "px");
        $("#canvas").css("left", m + "px");
        fullscreenHandler()
    }
}
function _checkOrientation(a, b) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > b ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()))
}
function createBitmap(a, b, c) {
    var d = new createjs.Bitmap(a)
      , f = new createjs.Shape;
    b && c ? f.graphics.beginFill("#fff").drawRect(0, 0, b, c) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = f;
    return d
}
function createSprite(a, b, c, d, f, m) {
    a = null !== b ? new createjs.Sprite(a,b) : new createjs.Sprite(a);
    b = new createjs.Shape;
    b.graphics.beginFill("#000000").drawRect(-c, -d, f, m);
    a.hitArea = b;
    return a
}
function pad(a, b, c) {
    a += "";
    return a.length >= b ? a : Array(b - a.length + 1).join(c || "0") + a
}
function randomFloatBetween(a, b, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c))
}
function rotateVector2D(a, b) {
    var c = b.getX() * Math.cos(a) + b.getY() * Math.sin(a)
      , d = b.getX() * -Math.sin(a) + b.getY() * Math.cos(a);
    b.set(c, d)
}
function tweenVectorsOnX(a, b, c) {
    return a + c * (b - a)
}
function shuffle(a) {
    for (var b = a.length, c, d; 0 !== b; )
        d = Math.floor(Math.random() * b),
        --b,
        c = a[b],
        a[b] = a[d],
        a[d] = c;
    return a
}
function bubbleSort(a) {
    do {
        var b = !1;
        for (var c = 0; c < a.length - 1; c++)
            a[c] > a[c + 1] && (b = a[c],
            a[c] = a[c + 1],
            a[c + 1] = b,
            b = !0)
    } while (b)
}
function compare(a, b) {
    return a.index > b.index ? -1 : a.index < b.index ? 1 : 0
}
function easeLinear(a, b, c, d) {
    return c * a / d + b
}
function easeInQuad(a, b, c, d) {
    return c * (a /= d) * a + b
}
function easeInSine(a, b, c, d) {
    return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
}
function easeInCubic(a, b, c, d) {
    return c * (a /= d) * a * a + b
}
function getTrajectoryPoint(a, b) {
    var c = new createjs.Point
      , d = (1 - a) * (1 - a)
      , f = a * a;
    c.x = d * b.start.x + 2 * (1 - a) * a * b.traj.x + f * b.end.x;
    c.y = d * b.start.y + 2 * (1 - a) * a * b.traj.y + f * b.end.y;
    return c
}
function formatTime(a) {
    a /= 1E3;
    var b = Math.floor(a / 60);
    a = parseFloat(a - 60 * b).toFixed(1);
    var c = "";
    c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
    return 10 > a ? c + ("0" + a) : c + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, b) {
    var c = getBounds(a, .9);
    var d = getBounds(b, .98);
    return calculateIntersection(c, d)
}
function calculateIntersection(a, b) {
    var c, d, f, m;
    var g = a.x + (c = a.width / 2);
    var e = a.y + (d = a.height / 2);
    var q = b.x + (f = b.width / 2);
    var k = b.y + (m = b.height / 2);
    g = Math.abs(g - q) - (c + f);
    e = Math.abs(e - k) - (d + m);
    return 0 > g && 0 > e ? (g = Math.min(Math.min(a.width, b.width), -g),
    e = Math.min(Math.min(a.height, b.height), -e),
    {
        x: Math.max(a.x, b.x),
        y: Math.max(a.y, b.y),
        width: g,
        height: e,
        rect1: a,
        rect2: b
    }) : null
}
function getBounds(a, b) {
    var c = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        c.x2 = -Infinity;
        c.y2 = -Infinity;
        var d = a.children, f = d.length, m;
        for (m = 0; m < f; m++) {
            var g = getBounds(d[m], 1);
            g.x < c.x && (c.x = g.x);
            g.y < c.y && (c.y = g.y);
            g.x + g.width > c.x2 && (c.x2 = g.x + g.width);
            g.y + g.height > c.y2 && (c.y2 = g.y + g.height)
        }
        Infinity == c.x && (c.x = 0);
        Infinity == c.y && (c.y = 0);
        Infinity == c.x2 && (c.x2 = 0);
        Infinity == c.y2 && (c.y2 = 0);
        c.width = c.x2 - c.x;
        c.height = c.y2 - c.y;
        delete c.x2;
        delete c.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            f = a.sourceRect || a.image;
            m = f.width * b;
            var e = f.height * b
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                f = a.spriteSheet.getFrame(a.currentFrame);
                m = f.rect.width;
                e = f.rect.height;
                d = f.regX;
                var q = f.regY
            } else
                c.x = a.x || 0,
                c.y = a.y || 0;
        else
            c.x = a.x || 0,
            c.y = a.y || 0;
        d = d || 0;
        m = m || 0;
        q = q || 0;
        e = e || 0;
        c.regX = d;
        c.regY = q;
        f = a.localToGlobal(0 - d, 0 - q);
        g = a.localToGlobal(m - d, e - q);
        m = a.localToGlobal(m - d, 0 - q);
        d = a.localToGlobal(0 - d, e - q);
        c.x = Math.min(Math.min(Math.min(f.x, g.x), m.x), d.x);
        c.y = Math.min(Math.min(Math.min(f.y, g.y), m.y), d.y);
        c.width = Math.max(Math.max(Math.max(f.x, g.x), m.x), d.x) - c.x;
        c.height = Math.max(Math.max(Math.max(f.y, g.y), m.y), d.y) - c.y
    }
    return c
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var b = a.length, c, d; 0 < b; )
        d = Math.floor(Math.random() * b),
        b--,
        c = a[b],
        a[b] = a[d],
        a[d] = c;
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
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            a.dispatchEvent(b)
        }
    }
};
(function() {
    function a(a) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in c ? document.body.className = c[a.type] : (document.body.className = this[b] ? "hidden" : "visible",
        "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var b = "hidden";
    b in document ? document.addEventListener("visibilitychange", a) : (b = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (b = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (b = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var b = window.location.search.substring(1).split("&"), c = 0; c < b.length; c++) {
        var d = b[c].split("=");
        if (d[0] == a)
            return d[1]
    }
}
function playSound(a, b, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(b),
    s_aSounds[a].loop(c),
    s_aSounds[a]) : null
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}
function setVolume(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(b)
}
function setMute(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.mute(b)
}
function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen,
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut(),
    null !== s_oCardSelection && s_oCardSelection.resetFullscreenBut())
}
if (screenfull.isEnabled)
    screenfull.on("change", function() {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
        null !== s_oCardSelection && s_oCardSelection.resetFullscreenBut()
    });
function CSpriteLibrary() {
    var a = {}, b, c, d, f, m, g;
    this.init = function(a, q, k) {
        b = {};
        d = c = 0;
        f = a;
        m = q;
        g = k
    }
    ;
    this.addSprite = function(d, f) {
        if (a.hasOwnProperty(d))
            return !1;
        var e = new Image;
        a[d] = b[d] = {
            szPath: f,
            oSprite: e,
            bLoaded: !1
        };
        c++;
        return !0
    }
    ;
    this.getSprite = function(c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        c = 0;
        m.call(g)
    }
    ;
    this._onSpriteLoaded = function() {
        f.call(g);
        ++d === c && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var a in b)
            b[a].oSprite.oSpriteLibrary = this,
            b[a].oSprite.szKey = a,
            b[a].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            b[a].oSprite.onerror = function(a) {
                var c = a.currentTarget;
                setTimeout(function() {
                    b[c.szKey].oSprite.src = b[c.szKey].szPath
                }, 500)
            }
            ,
            b[a].oSprite.src = b[a].szPath
    }
    ;
    this.setLoaded = function(c) {
        a[c].bLoaded = !0
    }
    ;
    this.isLoaded = function(c) {
        return a[c].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1920, CANVAS_HEIGHT = 1080, EDGEBOARD_X = 250, EDGEBOARD_Y = 80, FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, PRIMARY_FONT = "aachendeemedregular", STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, ON_BUT_EXIT = 6, ON_BUT_RECHARGE = 7, NUM_DIFFERENT_BALLS = 5, ANIMATION_SPEED, WIN_OCCURRENCE = [], BANK, START_PLAYER_MONEY, CARD_ROWS = 3, CARD_COLS = 9, LABEL_EMPTY = "empty", LABEL_FILL = "fill", COIN_BETS, MIN_CARDS = 1, MAX_CARDS = 6, NUM_EXTRACTIONS = [45, 55, 65], NUM_NUMBERS = 90, PAYTABLE_INFO, BUTTON_Y_OFFSET = 3, CARD_POSITION = [];
CARD_POSITION.num_1 = [{
    x: 430,
    y: 440,
    scale: 1
}];
CARD_POSITION.num_2 = [{
    x: 300,
    y: 480,
    scale: .58
}, {
    x: 1E3,
    y: 480,
    scale: .58
}];
CARD_POSITION.num_3 = [{
    x: 308,
    y: 400,
    scale: .58
}, {
    x: 992,
    y: 400,
    scale: .58
}, {
    x: 650,
    y: 650,
    scale: .58
}];
CARD_POSITION.num_4 = [{
    x: 310,
    y: 400,
    scale: .58
}, {
    x: 990,
    y: 400,
    scale: .58
}, {
    x: 310,
    y: 650,
    scale: .58
}, {
    x: 990,
    y: 650,
    scale: .58
}];
CARD_POSITION.num_5 = [{
    x: 270,
    y: 470,
    scale: .41
}, {
    x: 740,
    y: 470,
    scale: .41
}, {
    x: 1210,
    y: 470,
    scale: .41
}, {
    x: 515,
    y: 650,
    scale: .41
}, {
    x: 985,
    y: 650,
    scale: .41
}];
CARD_POSITION.num_6 = [{
    x: 270,
    y: 460,
    scale: .41
}, {
    x: 740,
    y: 460,
    scale: .41
}, {
    x: 1210,
    y: 460,
    scale: .41
}, {
    x: 270,
    y: 650,
    scale: .41
}, {
    x: 740,
    y: 650,
    scale: .41
}, {
    x: 1210,
    y: 650,
    scale: .41
}];
var BALL_COLORS = ["#fdb400", "#a3e21a", "#1ab9e2", "#be1ae0", "#ff3a3a"], SOUNDTRACK_VOLUME_IN_GAME = .4, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, TEXT_CURRENCY = "$", TEXT_PLAY = "PLAY", TEXT_START = "START", TEXT_SELECT_CARD = "SELECT CARDS", TEXT_TOT_BET = "TOT BET", TEXT_PLUS = "+", TEXT_MIN = "-", TEXT_SELECT_NUM_CARDS = "NUM CARDS", TEXT_SELECT_NUM_BALLS = "NUMBER TO EXTRACT", TEXT_BUY_CARDS = "BUY CARDS", TEXT_GAMEOVER = "YOU RUN OUT OF MONEY!!!", TEXT_EXIT = "EXIT", TEXT_PAYTABLE = "PAYTABLE", TEXT_MONEY = "MONEY", TEXT_COIN = "COIN", TEXT_WIN = "WIN", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_YES = "YES", TEXT_NO = "NO", TEXT_CREDITS_DEVELOPED = "DEVELOPED BY", TEXT_PRELOADER_CONTINUE = "START", TEXT_RECHARGE = "RECHARGE", TEXT_PAYTABLE_PRIZES = ["ANY LINE", "ANY 2 LINES", "FULL HOUSE"], TEXT_CONGRATULATIONS = "Congratulations!", TEXT_SHARE_1 = "You collected <strong>", TEXT_SHARE_2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_3 = "My score is ", TEXT_SHARE_4 = " points! Can you do better?";
function CPreloader() {
    var a, b, c, d, f, m, g, e, q, k;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        k = new createjs.Container;
        s_oStage.addChild(k)
    }
    ;
    this.unload = function() {
        k.removeAllChildren();
        q.unload()
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
        var u = new createjs.Shape;
        u.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(u);
        u = s_oSpriteLibrary.getSprite("200x200");
        g = createBitmap(u);
        g.regX = .5 * u.width;
        g.regY = .5 * u.height;
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 180;
        k.addChild(g);
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(g.x - 100, g.y - 100, 200, 200, 10);
        k.addChild(e);
        g.mask = e;
        u = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(u);
        d.x = CANVAS_WIDTH / 2 - u.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        k.addChild(d);
        a = u.width;
        b = u.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, b);
        k.addChild(f);
        d.mask = f;
        c = new createjs.Text("","30px " + PRIMARY_FONT,"#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 100;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        k.addChild(c);
        u = s_oSpriteLibrary.getSprite("but_start");
        q = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2,u,TEXT_PRELOADER_CONTINUE,"Arial","#000",40,0,k);
        q.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        q.setVisible(!1);
        m = new createjs.Shape;
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(m);
        createjs.Tween.get(m).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(m);
            k.removeChild(m)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(e) {
        c.text = e + "%";
        100 === e && (s_oMain._onRemovePreloader(),
        c.visible = !1,
        d.visible = !1);
        f.graphics.clear();
        e = Math.floor(e * a / 100);
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, e, b)
    }
    ;
    this._init()
}
function CMain(a) {
    var b, c = 0, d = 0, f = STATE_LOADING, m, g;
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
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        m = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        b = !0
    }
    ;
    this.soundLoaded = function() {
        c++;
        m.refreshLoader(Math.floor(c / d * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
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
            filename: "launch_ball",
            loop: !1,
            volume: 1,
            ingamename: "launch_ball"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win_row",
            loop: !1,
            volume: 1,
            ingamename: "win_row"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var a = 0; a < s_aSoundsInfo.length; a++)
            this.tryToLoadSound(s_aSoundsInfo[a], !1)
    }
    ;
    this.tryToLoadSound = function(a, c) {
        setTimeout(function() {
            s_aSounds[a.ingamename] = new Howl({
                src: [a.path + a.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: a.loop,
                volume: a.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(a, c) {
                    for (var b = 0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[b], !0);
                            break
                        }
                },
                onplayerror: function(a) {
                    for (var c = 0; c < s_aSoundsInfo.length; c++)
                        if (a === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[c].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[c].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[c].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, c ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_card", "./sprites/bg_select_card.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_paytable", "./sprites/but_paytable.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
        s_oSpriteLibrary.addSprite("but_generic", "./sprites/but_generic.png");
        s_oSpriteLibrary.addSprite("plus_display", "./sprites/plus_display.png");
        s_oSpriteLibrary.addSprite("money_panel", "./sprites/money_panel.png");
        s_oSpriteLibrary.addSprite("tube", "./sprites/tube.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("card_cell", "./sprites/card_cell.png");
        s_oSpriteLibrary.addSprite("but_gui", "./sprites/but_gui.png");
        s_oSpriteLibrary.addSprite("but_ball", "./sprites/but_ball.png");
        s_oSpriteLibrary.addSprite("board_cell", "./sprites/board_cell.png");
        s_oSpriteLibrary.addSprite("number_extract_bg", "./sprites/number_extract_bg.png");
        s_oSpriteLibrary.addSprite("ball_preview", "./sprites/ball_preview.png");
        s_oSpriteLibrary.addSprite("card_highlight_1", "./sprites/card_highlight_1.png");
        s_oSpriteLibrary.addSprite("card_highlight_2", "./sprites/card_highlight_2.png");
        s_oSpriteLibrary.addSprite("display_small", "./sprites/display_small.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("logo_credits", "./sprites/logo_credits.png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        c++;
        m.refreshLoader(Math.floor(c / d * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this._onRemovePreloader = function() {
        m.unload();
        playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        g = new CGame(e);
        f = STATE_GAME;
        $(s_oMain).trigger("game_start")
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        b = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        b = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    }
    ;
    this._update = function(a) {
        if (!1 !== b) {
            var c = (new Date).getTime();
            s_iTimeElaps = c - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = c;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            f === STATE_GAME && g.update();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    var e = a;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    SHOW_CREDITS = a.show_credits;
    ENABLE_FULLSCREEN = e.fullscreen;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_bFullscreen = !1;
function CTextButton(a, b, c, d, f, m, g, e, q) {
    var k, u, v, n, x, l, B, t, C, p, D;
    this._init = function(a, c, b, d, e, f, g, l) {
        k = !1;
        u = 1;
        v = [];
        n = [];
        D = createBitmap(b);
        t = new createjs.Container;
        t.x = a;
        t.y = c;
        t.regX = b.width / 2;
        t.regY = b.height / 2;
        s_bMobile || (t.cursor = "pointer");
        t.addChild(D, p);
        q.addChild(t);
        C = new CTLText(t,12,7,b.width - 20,b.height - 10,g,"center","#000",e,1,l,0,d,!0,!0,!1,!1);
        p = new CTLText(t,10,5,b.width - 20,b.height - 10,g,"center",f,e,1,l,0,d,!0,!0,!1,!1);
        this._initListener()
    }
    ;
    this.unload = function() {
        t.off("mousedown", x);
        t.off("pressup", l);
        q.removeChild(t)
    }
    ;
    this.setVisible = function(a) {
        t.visible = a
    }
    ;
    this.setAlign = function(a) {
        p.textAlign = a;
        C.textAlign = a
    }
    ;
    this.setTextX = function(a) {
        p.x = a;
        C.x = a
    }
    ;
    this.setScale = function(a) {
        u = t.scaleX = t.scaleY = a
    }
    ;
    this.enable = function() {
        k = !1
    }
    ;
    this.disable = function() {
        k = !0
    }
    ;
    this._initListener = function() {
        x = t.on("mousedown", this.buttonDown);
        l = t.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        v[a] = c;
        n[a] = b
    }
    ;
    this.addEventListenerWithParams = function(a, c, b, d) {
        v[a] = c;
        n[a] = b;
        B = d
    }
    ;
    this.buttonRelease = function() {
        k || (playSound("click", 1, !1),
        t.scaleX = u,
        t.scaleY = u,
        v[ON_MOUSE_UP] && v[ON_MOUSE_UP].call(n[ON_MOUSE_UP], B))
    }
    ;
    this.buttonDown = function() {
        k || (t.scaleX = .9 * u,
        t.scaleY = .9 * u,
        v[ON_MOUSE_DOWN] && v[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN]))
    }
    ;
    this.setPosition = function(a, c) {
        t.x = a;
        t.y = c
    }
    ;
    this.tweenPosition = function(a, c, b, d, e, f, p) {
        createjs.Tween.get(t).wait(d).to({
            x: a,
            y: c
        }, b, e).call(function() {
            void 0 !== f && f.call(p)
        })
    }
    ;
    this.changeText = function(a) {
        p.refreshText(a);
        C.refreshText(a)
    }
    ;
    this.setX = function(a) {
        t.x = a
    }
    ;
    this.setY = function(a) {
        t.y = a
    }
    ;
    this.getButtonImage = function() {
        return t
    }
    ;
    this.getX = function() {
        return t.x
    }
    ;
    this.getY = function() {
        return t.y
    }
    ;
    this.getSprite = function() {
        return t
    }
    ;
    this.getScale = function() {
        return t.scaleX
    }
    ;
    this._init(a, b, c, d, f, m, g, e)
}
function CTextSpritesheetBut(a, b, c, d, f, m, g, e, q) {
    var k = 1, u, v = !1, n, x, l, B, t, C;
    this._init = function(a, c, b, d, e, f, g, k, q) {
        u = !1;
        n = [];
        x = [];
        C = createBitmap(b);
        var p = Math.ceil(g / 20);
        t = new createjs.Text(d," " + g + "px " + e,"#000000");
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        var r = t.getBounds();
        t.x = b.width / 2 + p;
        t.y = Math.floor(b.height / 2) + r.height / 3 + p - 7;
        B = new createjs.Text(d," " + g + "px " + e,f);
        B.textAlign = "center";
        B.textBaseline = "alphabetic";
        r = B.getBounds();
        B.x = b.width / 2;
        B.y = Math.floor(b.height / 2) + r.height / 3 - 7;
        l = new createjs.Container;
        l.x = a;
        l.y = c;
        l.regX = b.width / 2;
        l.regY = b.height / 2;
        l.cursor = "pointer";
        k || (a = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        }),
        C = createSprite(a, "state_false", b.width / 2 / 2, b.height / 2, b.width / 2, b.height),
        t.x = p,
        t.y = p + 17,
        B.x = 0,
        B.y = 17,
        l.regX = 0,
        l.regY = 0);
        l.addChild(C, t, B);
        q.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        l.off("mousedown");
        l.off("pressup");
        q.removeChild(l)
    }
    ;
    this.setVisible = function(a) {
        l.visible = a
    }
    ;
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        n[a] = c;
        x[a] = b
    }
    ;
    this.buttonRelease = function() {
        u || v || (playSound("click", 1, !1),
        l.scaleX = 1 * k,
        l.scaleY = 1 * k,
        n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(x[ON_MOUSE_UP]))
    }
    ;
    this.buttonDown = function() {
        u || v || (l.scaleX = .9 * k,
        l.scaleY = .9 * k,
        n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(x[ON_MOUSE_DOWN]))
    }
    ;
    this.enable = function() {
        u = !1;
        e || C.gotoAndStop("state_true")
    }
    ;
    this.disable = function() {
        u = !0;
        e || C.gotoAndStop("state_false")
    }
    ;
    this.toggle = function() {
        u = !u;
        e || (u ? C.gotoAndStop("state_false") : C.gotoAndStop("state_true"))
    }
    ;
    this.setTextPosition = function(a, c) {
        var b = Math.ceil(g / 20);
        t.x = a + b;
        t.y = c + b;
        B.x = a;
        B.y = c
    }
    ;
    this.setText = function(a) {
        B.text = a;
        t.text = a
    }
    ;
    this.setPosition = function(a, c) {
        l.x = a;
        l.y = c
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
    this.block = function(a) {
        v = a
    }
    ;
    this.setScale = function(a) {
        k = a;
        l.scaleX = a;
        l.scaleY = a
    }
    ;
    this.setScaleX = function(a) {
        C.scaleX = a
    }
    ;
    this._init(a, b, c, d, f, m, g, e, q);
    return this
}
function CToggle(a, b, c, d) {
    var f, m, g, e, q, k;
    this._init = function(a, c, b, d) {
        m = [];
        g = [];
        var e = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = d;
        k = createSprite(e, "state_" + f, b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        k.x = a;
        k.y = c;
        k.stop();
        k.cursor = "pointer";
        s_oStage.addChild(k);
        this._initListener()
    }
    ;
    this.unload = function() {
        k.off("mousedown", e);
        k.off("pressup", q);
        s_oStage.removeChild(k)
    }
    ;
    this._initListener = function() {
        e = k.on("mousedown", this.buttonDown);
        q = k.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        m[a] = c;
        g[a] = b
    }
    ;
    this.setActive = function(a) {
        f = a;
        k.gotoAndStop("state_" + f)
    }
    ;
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        playSound("click", 1, !1);
        f = !f;
        k.gotoAndStop("state_" + f);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(g[ON_MOUSE_UP], f)
    }
    ;
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(a, c) {
        k.x = a;
        k.y = c
    }
    ;
    this._init(a, b, c, d)
}
function CGfxButton(a, b, c) {
    var d, f, m, g, e;
    this._init = function(a, c, b) {
        d = [];
        f = [];
        e = createBitmap(b);
        e.x = a;
        e.y = c;
        e.regX = b.width / 2;
        e.regY = b.height / 2;
        e.cursor = "pointer";
        s_oStage.addChild(e);
        this._initListener()
    }
    ;
    this.unload = function() {
        e.off("mousedown", m);
        e.off("pressup", g);
        s_oStage.removeChild(e)
    }
    ;
    this.setVisible = function(a) {
        e.visible = a
    }
    ;
    this._initListener = function() {
        m = e.on("mousedown", this.buttonDown);
        g = e.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        d[a] = c;
        f[a] = b
    }
    ;
    this.buttonRelease = function() {
        playSound("click", 1, !1);
        e.scaleX = 1;
        e.scaleY = 1;
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(f[ON_MOUSE_UP])
    }
    ;
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(a, c) {
        e.x = a;
        e.y = c
    }
    ;
    this.setX = function(a) {
        e.x = a
    }
    ;
    this.setY = function(a) {
        e.y = a
    }
    ;
    this.getButtonImage = function() {
        return e
    }
    ;
    this.getX = function() {
        return e.x
    }
    ;
    this.getY = function() {
        return e.y
    }
    ;
    this._init(a, b, c);
    return this
}
function CToggleText(a, b, c, d, f, m, g, e, q, k, u) {
    var v, n, x, l, B, t, C, p, D, z;
    this._init = function(a, c, b, d, e, f, g, k, q, m) {
        l = [];
        B = [];
        v = a;
        n = e;
        x = f;
        z = new createjs.Container;
        z.x = c;
        z.y = b;
        z.regX = n / 2;
        z.regY = x / 2;
        r.addChild(z);
        a = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: n,
                height: x
            },
            animations: {
                on: [0],
                off: [1]
            }
        });
        p = v ? createSprite(a, "on", 0, 0, n, x) : createSprite(a, "off", 0, 0, n, x);
        p.stop();
        p.cursor = "pointer";
        z.addChild(p);
        D = new createjs.Text(g,m + "px " + k,q);
        D.textAlign = "center";
        D.shadow = new createjs.Shadow("#000",2,2,2);
        D.textBaseline = "middle";
        D.lineHeight = 24;
        D.x = n / 2;
        D.y = x / 2;
        z.addChild(D);
        this._initListener()
    }
    ;
    this.unload = function() {
        z.off("mousedown", t);
        z.off("pressup", C);
        r.removeChild(p)
    }
    ;
    this.activate = function(a) {
        (v = a) ? p.gotoAndStop("on") : p.gotoAndStop("off")
    }
    ;
    this.setPosition = function(a, c) {
        z.x = a;
        z.y = c
    }
    ;
    this.setScale = function(a) {
        z.scaleX = z.scaleY = a
    }
    ;
    this._initListener = function() {
        t = z.on("mousedown", this.buttonDown);
        C = z.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        l[a] = c;
        B[a] = b
    }
    ;
    this.buttonRelease = function() {
        playSound("click", 1, !1);
        (v = !v) ? p.gotoAndStop("on") : p.gotoAndStop("off");
        l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(B[ON_MOUSE_UP], {
            active: v
        })
    }
    ;
    this.buttonDown = function() {
        l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(B[ON_MOUSE_DOWN])
    }
    ;
    this.getContainer = function() {
        return z
    }
    ;
    var r = u;
    this._init(a, b, c, d, f, m, g, e, q, k)
}
function CMenu() {
    var a, b, c, d, f, m, g, e, q, k, u, v, n = null, x = null;
    this._init = function() {
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(g);
        var l = s_oSpriteLibrary.getSprite("but_play");
        e = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 200,l);
        e.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            l = s_oSpriteLibrary.getSprite("audio_icon"),
            f = CANVAS_WIDTH - l.height / 2 - 10,
            m = l.height / 2 + 10,
            k = new CToggle(f,m,l,s_bAudioActive),
            k.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            setVolume("soundtrack", 1);
        SHOW_CREDITS ? (l = s_oSpriteLibrary.getSprite("but_paytable"),
        a = 10 + l.width / 2,
        b = l.height / 2 + 10,
        u = new CGfxButton(a,b,l,s_oStage),
        u.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        c = a + l.width + 10,
        d = b) : (l = s_oSpriteLibrary.getSprite("but_fullscreen"),
        c = 10 + l.width / 4,
        d = l.height / 2 + 10);
        l = window.document;
        var B = l.documentElement;
        n = B.requestFullscreen || B.mozRequestFullScreen || B.webkitRequestFullScreen || B.msRequestFullscreen;
        x = l.exitFullscreen || l.mozCancelFullScreen || l.webkitExitFullscreen || l.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n && screenfull.isEnabled && (l = s_oSpriteLibrary.getSprite("but_fullscreen"),
        v = new CToggle(c,d,l,s_bFullscreen,!0),
        v.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        q = new createjs.Shape;
        q.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(q);
        createjs.Tween.get(q).to({
            alpha: 0
        }, 1E3).call(function() {
            q.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        e.unload();
        e = null;
        q.visible = !1;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            k.unload(),
            k = null;
        n && screenfull.isEnabled && v.unload();
        SHOW_CREDITS && u.unload();
        s_oStage.removeChild(g);
        s_oMenu = g = null
    }
    ;
    this.refreshButtonPos = function(e, g) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || k.setPosition(f - e, g + m);
        n && screenfull.isEnabled && v.setPosition(c + e, d + g);
        SHOW_CREDITS && u.setPosition(a + e, b + g)
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame()
    }
    ;
    this.resetFullscreenBut = function() {
        n && screenfull.isEnabled && v.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? x.call(window.document) : n.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onCredits = function() {
        _oCreditsPanel = new CCreditsPanel
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var b, c, d, f, m, g, e, q, k, u, v, n, x, l, B = null, t, C, p, D, z;
    this._init = function() {
        b = !0;
        c = BANK;
        d = START_PLAYER_MONEY;
        e = q = 0;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        D = new createjs.Container;
        s_oStage.addChild(D);
        C = new CNumberBoard(620,82,D);
        l = new CInterface;
        new CCardSelection(d,s_oStage);
        z = new CMsgBox(s_oSpriteLibrary.getSprite("msg_box"));
        z.addEventListener(ON_BUT_EXIT, l.enableGUI, l);
        z.addEventListener(ON_BUT_RECHARGE, this._onRecharge, this)
    }
    ;
    this.unload = function() {
        l.unload();
        t && t.unload();
        null !== B && B.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        z.unload();
        s_oGame = null
    }
    ;
    this.initGame = function(a, c, b, e, k) {
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        f = a;
        m = c;
        d = b;
        g = e;
        l.refreshTotBet(g);
        l.refreshMoney(d);
        t = new CAnimBalls(340,-30,m,D);
        this._generateNewCardSet();
        u = WIN_OCCURRENCE[k];
        x = PAYTABLE_INFO[k];
        p = new CPaytablePanel(s_oStage);
        p.initPrizes(x)
    }
    ;
    this._resetGame = function() {
        e = 0;
        void 0 !== t && t.unload();
        t = new CAnimBalls(340,-30,m,D);
        for (var a = 0; a < v.length; a++)
            v[a].reset();
        C.reset()
    }
    ;
    this._removeCards = function() {
        for (var a = 0; a < v.length; a++)
            v[a].unload()
    }
    ;
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge")
    }
    ;
    this.setMoney = function(a) {
        null !== s_oCardSelection ? s_oCardSelection.setMoney(a) : (d += a,
        l.refreshMoney(d),
        l.enableGUI())
    }
    ;
    this.startGame = function() {
        if (0 > d - g)
            z.show(TEXT_GAMEOVER, !0);
        else {
            b || this._resetGame();
            d -= g;
            c += g;
            l.refreshMoney(d);
            b = !1;
            $(s_oMain).trigger("bet_placed", g);
            k = 0;
            var a = 1 + Math.floor(100 * Math.random());
            c < COIN_BETS[s_iCurCoinBet] * x[x.length - 1] && (a = u + 1);
            if (a <= u) {
                a = v[Math.floor(Math.random() * v.length)].getRow(Math.floor(3 * Math.random()));
                n = [];
                for (var e = 0; e < a.length; e++)
                    n.push(a[e]);
                a = [];
                for (e = 0; e < NUM_NUMBERS; e++)
                    a[e] = e + 1;
                for (e = n.length - 1; 0 <= e; e--)
                    a.splice(n[e] - 1, 1);
                this.setRandomNumberToExtract(a, m - n.length)
            } else {
                do {
                    a = [];
                    for (e = 0; e < NUM_NUMBERS; e++)
                        a[e] = e + 1;
                    n = [];
                    this.setRandomNumberToExtract(a, m)
                } while (!0 === this._checkWin())
            }
            shuffle(n);
            this.extractNextNumber()
        }
    }
    ;
    this._generateNewCardSet = function() {
        var a = CARD_POSITION["num_" + f];
        v = [];
        for (var c = 0; c < f; c++) {
            var b = new CCard(a[c].x,a[c].y,a[c].scale,D);
            v.push(b)
        }
    }
    ;
    this.setRandomNumberToExtract = function(a, c) {
        for (var b = 0; b < c; b++) {
            var d = Math.floor(Math.random() * a.length);
            n.push(a[d]);
            a.splice(d, 1)
        }
    }
    ;
    this._checkWin = function() {
        for (var a = !1, c = 0; c < v.length; c++)
            0 < v[c].checkNumberExtracted(n).length && (a = !0);
        return a
    }
    ;
    this.extractNextNumber = function() {
        if (k === n.length) {
            this._calculateWins();
            l.enableGUI();
            for (var a = 0; a < v.length; a++)
                v[a].hideHighlight();
            q++;
            q === AD_SHOW_COUNTER && (q = 0,
            $(s_oMain).trigger("show_interlevel_ad"));
            $(s_oMain).trigger("save_score", d)
        } else {
            t.extractNextBall(n[k], k + 1);
            C.numExtracted(n[k]);
            for (a = 0; a < v.length; a++)
                v[a].findNumberExtracted(n[k]);
            k++
        }
    }
    ;
    this._calculateWins = function() {
        for (var a = e = 0; a < v.length; a++) {
            var b = v[a].getRowHighlighted();
            0 < b && (e += COIN_BETS[s_iCurCoinBet] * x[b - 1],
            v[a].initWinAnim())
        }
        l.refreshWin(e);
        0 < e && (d += e,
        l.refreshMoney(d),
        c -= e,
        playSound("win", 1, !1))
    }
    ;
    this.onPaytable = function() {
        p.show()
    }
    ;
    this.onBuyNewCards = function() {
        this._resetGame();
        this._removeCards();
        this._resetGame();
        b = !0;
        new CCardSelection(d,s_oStage)
    }
    ;
    this.onExit = function() {
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", d);
        this.unload();
        s_oMain.gotoMenu()
    }
    ;
    this.gameOver = function() {
        B = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        B.show()
    }
    ;
    this.update = function() {}
    ;
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    COIN_BETS = a.coin_bet;
    BANK = a.bank_money;
    START_PLAYER_MONEY = a.start_player_money;
    TIME_EXTRACTION = a.time_extraction;
    PAYTABLE_INFO = a.paytable;
    AD_SHOW_COUNTER = a.ad_show_counter;
    this._init()
}
var s_oGame;
function CInterface() {
    var a, b, c, d, f, m, g, e, q, k, u, v, n, x, l, B, t, C, p, D, z, r, A, O, S, V, T, P, Q, L, K, J = null, M = null;
    this._init = function() {
        var E = s_oSpriteLibrary.getSprite("but_exit");
        p = CANVAS_WIDTH - E.height / 2 - 10;
        D = E.height / 2 + 10;
        r = new CGfxButton(p,D,E,!0);
        r.addEventListener(ON_MOUSE_UP, this._onExit, this);
        var I = 10;
        s_bMobile && !isTablet() && (I = 30);
        E = s_oSpriteLibrary.getSprite("but_paytable");
        a = p - E.width - I;
        b = D;
        Q = new CGfxButton(a,b,E,!0);
        Q.addEventListener(ON_MOUSE_UP, this._onPaytable, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (t = a - E.width - I,
        C = b,
        E = s_oSpriteLibrary.getSprite("audio_icon"),
        z = new CToggle(t,C,E,s_bAudioActive),
        z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        c = t - E.width / 2,
        d = C) : (c = a - E.width - I,
        d = b);
        E = window.document;
        I = E.documentElement;
        J = I.requestFullscreen || I.mozRequestFullScreen || I.webkitRequestFullScreen || I.msRequestFullscreen;
        M = E.exitFullscreen || E.mozCancelFullScreen || E.webkitExitFullscreen || E.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (J = !1);
        J && screenfull.isEnabled && (E = s_oSpriteLibrary.getSprite("but_fullscreen"),
        K = new CToggle(c,d,E,s_bFullscreen,!0),
        K.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        l = 300;
        B = CANVAS_HEIGHT - 90;
        A = new CDisplayText(l,B,s_oSpriteLibrary.getSprite("plus_display"),TEXT_CURRENCY + START_PLAYER_MONEY,TEXT_MONEY,40,s_oStage);
        n = 530;
        x = CANVAS_HEIGHT - 90;
        S = new CDisplayText(n,x,s_oSpriteLibrary.getSprite("plus_display"),"",TEXT_TOT_BET,40,s_oStage);
        f = 760;
        m = CANVAS_HEIGHT - 90;
        V = new CDisplayText(f,m,s_oSpriteLibrary.getSprite("display_small"),"",TEXT_COIN,37,s_oStage);
        u = 894;
        v = CANVAS_HEIGHT - 90;
        O = new CDisplayText(u,v,s_oSpriteLibrary.getSprite("plus_display"),"0" + TEXT_CURRENCY,TEXT_WIN,40,s_oStage);
        q = 1530;
        k = CANVAS_HEIGHT - 50;
        T = new CTextButton(q,k,s_oSpriteLibrary.getSprite("but_gui"),TEXT_START,PRIMARY_FONT,"#ffffff",50,0,s_oStage);
        T.addEventListener(ON_MOUSE_UP, this._onButPlay, this);
        g = 1290;
        e = CANVAS_HEIGHT - 50;
        P = new CTextButton(g,e,s_oSpriteLibrary.getSprite("but_gui"),TEXT_BUY_CARDS,PRIMARY_FONT,"#ffffff",36,0,s_oStage);
        P.addEventListener(ON_MOUSE_UP, this._onButBuy, this);
        L = new CAreYouSurePanel(s_oStage);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            z.unload(),
            z = null;
        J && screenfull.isEnabled && K.unload();
        r.unload();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(E, I) {
        r.setPosition(p - E, I + D);
        Q.setPosition(a - E, b + I);
        T.setPosition(q, k - I);
        P.setPosition(g, e - I);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || z.setPosition(t - E, I + C);
        J && screenfull.isEnabled && K.setPosition(c - E, d + I);
        A.setPosition(l, B - I);
        S.setPosition(n, x - I);
        O.setPosition(u, v - I);
        V.setPosition(f, m - I)
    }
    ;
    this.refreshMoney = function(a) {
        A.changeText(a + TEXT_CURRENCY)
    }
    ;
    this.refreshTotBet = function(a) {
        S.changeText(a + TEXT_CURRENCY);
        V.changeText(COIN_BETS[s_iCurCoinBet] + TEXT_CURRENCY)
    }
    ;
    this.refreshWin = function(a) {
        O.changeText(a + TEXT_CURRENCY)
    }
    ;
    this.enableGUI = function() {
        T.enable();
        P.enable()
    }
    ;
    this.disableGUI = function() {
        T.disable();
        P.disable()
    }
    ;
    this._onButPlay = function() {
        this.disableGUI();
        O.changeText("0" + TEXT_CURRENCY);
        s_oGame.startGame()
    }
    ;
    this._onButBuy = function() {
        s_oGame.onBuyNewCards()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        L.show()
    }
    ;
    this._onPaytable = function() {
        s_oGame.onPaytable()
    }
    ;
    this.resetFullscreenBut = function() {
        J && screenfull.isEnabled && K.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? M.call(window.document) : J.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;
function CEndPanel(a) {
    var b, c, d;
    this._init = function(a) {
        c = new createjs.Container;
        c.alpha = 0;
        c.visible = !1;
        s_oStage.addChild(c);
        b = createBitmap(a);
        c.addChild(b);
        d = new CTLText(c,CANVAS_WIDTH / 2 - 250,CANVAS_HEIGHT / 2 - 200,500,400,100,"center","#fff",PRIMARY_FONT,1,0,0," ",!0,!0,!0,!1)
    }
    ;
    this.unload = function() {
        c.off("mousedown", this._onExit)
    }
    ;
    this._initListener = function() {
        c.on("mousedown", this._onExit)
    }
    ;
    this.show = function() {
        playSound("game_over", 1, !1);
        d.refreshText(TEXT_GAMEOVER);
        c.visible = !0;
        var a = this;
        createjs.Tween.get(c).to({
            alpha: 1
        }, 500).call(function() {
            a._initListener()
        })
    }
    ;
    this._onExit = function() {
        c.off("mousedown", this._onExit);
        s_oStage.removeChild(c);
        $(s_oMain).trigger("end_session");
        s_oGame.onExit()
    }
    ;
    this._init(a);
    return this
}
function CAnimBalls(a, b, c, d) {
    var f, m, g, e, q, k, u, v, n, x, l, B, t, C, p, D, z, r;
    this._init = function(a, c, b) {
        f = b;
        u = 1;
        r = new createjs.Container;
        r.x = a;
        r.y = c;
        A.addChild(r);
        D = new createjs.Container;
        r.addChild(D);
        a = s_oSpriteLibrary.getSprite("ball");
        c = {
            images: [a],
            frames: {
                width: a.width / NUM_DIFFERENT_BALLS,
                height: a.height,
                regX: a.width / NUM_DIFFERENT_BALLS / 2,
                regY: a.height / 2
            },
            animations: {
                red: [0],
                green: [1],
                cyan: [0],
                violet: [1],
                blue: [1]
            }
        };
        t = new createjs.SpriteSheet(c);
        m = a.height;
        var d = s_oSpriteLibrary.getSprite("tube");
        c = createBitmap(d);
        c.x = -48;
        c.y = 24;
        b = (new createjs.Graphics).beginFill("rgba(255,0,0,0.01)").drawRoundRectComplex(c.x, c.y + 301, 296, 80, 0, 40, 40, 0);
        l = new createjs.Shape(b);
        n = [];
        z = new createjs.Container;
        r.addChild(z);
        b = d.height - a.height - a.height / 2;
        for (d = 0; 7 > d; d++)
            n[d] = new CBallExtracted(0,b,a.width / NUM_DIFFERENT_BALLS,a.height,Math.floor(Math.random() * NUM_DIFFERENT_BALLS),32,3,t,D),
            b -= a.height;
        r.addChild(c);
        r.addChild(l);
        k = n[0].getY();
        a = s_oSpriteLibrary.getSprite("ball_preview");
        c = {
            images: [a],
            frames: {
                width: a.width / NUM_DIFFERENT_BALLS,
                height: a.height,
                regX: a.width / NUM_DIFFERENT_BALLS / 2,
                regY: a.height / 2
            },
            animations: {
                red: [0],
                green: [1],
                cyan: [0],
                violet: [1],
                blue: [1]
            }
        };
        C = new createjs.SpriteSheet(c);
        x = [];
        g = a.width / NUM_DIFFERENT_BALLS;
        c = new CBallExtracted(50 - g / 2,122 + a.height / 2,g,a.height,n[0].getColor(),80,5,C,z);
        x.push(c);
        a = s_oSpriteLibrary.getSprite("number_extract_bg");
        b = createBitmap(a);
        b.x = 40;
        b.y = 112;
        r.addChild(b);
        b = (new createjs.Graphics).beginFill("rgba(255,255,255,0.01)").drawCircle(b.x + a.width / 2, b.y + a.height / 2, 92);
        B = new createjs.Shape(b);
        r.addChild(B);
        p = new createjs.Text("0/" + f," 24px " + PRIMARY_FONT,"#fff");
        p.x = 150;
        p.y = 304;
        p.textAlign = "center";
        p.textBaseline = "middle";
        r.addChild(p);
        c.setMask(B)
    }
    ;
    this.unload = function() {
        clearTimeout(v);
        A.removeChild(r)
    }
    ;
    this.reset = function(a) {
        f = a;
        p.text = "0/" + f
    }
    ;
    this.extractNextBall = function(a, c) {
        e = 0;
        playSound("launch_ball", 1, !1);
        for (var b = 0; b < n.length; b++)
            if (n[b].getY() > k) {
                n[b].setMask(l);
                var d = n[b].getX() + m;
                n[b].moveX(d, this.placeNewBall, this)
            } else {
                d = n[b].getY() + m;
                var u = "";
                d > k && (u = a);
                n[b].moveY(d, u, this.placeNewBall, this)
            }
        q = 0;
        x[x.length - 1].setText(a);
        for (b = 0; b < x.length; b++)
            d = x[b].getX() + g,
            x[b].moveX(d, this.placeNewPreviewBall, this);
        p.text = c + "/" + f
    }
    ;
    this.placeNewBall = function() {
        e++;
        if (e === n.length) {
            var a = s_oSpriteLibrary.getSprite("ball")
              , c = Math.floor(Math.random() * NUM_DIFFERENT_BALLS);
            a = new CBallExtracted(0,n[n.length - 1].getY() - a.height,a.width / NUM_DIFFERENT_BALLS,a.height,c,32,3,t,D);
            n.push(a);
            n[0].getX() > 3 * m ? (n[0].unload(),
            n.splice(0, 1)) : u++;
            v = setTimeout(function() {
                null !== s_oGame && s_oGame.extractNextNumber()
            }, TIME_EXTRACTION)
        }
    }
    ;
    this.placeNewPreviewBall = function() {
        q++;
        if (q === x.length) {
            var a = s_oSpriteLibrary.getSprite("ball_preview");
            a = new CBallExtracted(50 - g / 2,122 + a.height / 2,a.width / NUM_DIFFERENT_BALLS,a.height,n[u].getColor(),80,5,C,z);
            a.setMask(B);
            x.push(a);
            x[0].getX() > g && (x[0].unload(),
            x.splice(0, 1))
        }
    }
    ;
    var A = d;
    this._init(a, b, c)
}
function CCardSelection(a, b) {
    var c, d, f, m, g, e, q, k, u, v, n, x, l, B, t, C, p, D, z, r, A, O, S, V, T, P, Q, L, K, J, M, E, I, h, R, U, N, G, w = null, H = null, F;
    this._init = function(a) {
        p = a;
        z = s_iCurNumCards;
        A = NUM_EXTRACTIONS[s_iCurNumToExtract];
        D = COIN_BETS[s_iCurCoinBet] * z;
        r = 0;
        F = new createjs.Container;
        F.on("click", function() {});
        y.addChild(F);
        a = createBitmap(s_oSpriteLibrary.getSprite("bg_select_card"));
        F.addChild(a);
        (new CTLText(F,CANVAS_WIDTH / 2 - 450,150,900,100,100,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_SELECT_CARD,!0,!0,!1,!1)).setOutline(4);
        new CTLText(F,CANVAS_WIDTH / 2 - 450,150,900,100,100,"center","#ff7803",PRIMARY_FONT,1,0,0,TEXT_SELECT_CARD,!0,!0,!1,!1);
        l = 310;
        B = CANVAS_HEIGHT - 90;
        T = new CDisplayText(l,B,s_oSpriteLibrary.getSprite("plus_display"),p + TEXT_CURRENCY,TEXT_MONEY,40,F);
        t = 640;
        C = CANVAS_HEIGHT - 90;
        P = new CDisplayText(t,C,s_oSpriteLibrary.getSprite("display_small"),COIN_BETS[s_iCurCoinBet] + TEXT_CURRENCY,TEXT_COIN,37,F);
        a = s_oSpriteLibrary.getSprite("but_plus");
        u = 806;
        v = CANVAS_HEIGHT - 50;
        K = new CTextSpritesheetBut(u,v,a,TEXT_PLUS,PRIMARY_FONT,"#ffffff",70,!1,F);
        s_iCurCoinBet === COIN_BETS.length - 1 ? K.disable() : K.enable();
        K.addEventListener(ON_MOUSE_UP, this._onButBetPlusRelease, this);
        a = s_oSpriteLibrary.getSprite("but_plus");
        u = 596;
        v = CANVAS_HEIGHT - 50;
        J = new CTextSpritesheetBut(u,v,a,TEXT_MIN,PRIMARY_FONT,"#ffffff",70,!1,F);
        0 === s_iCurCoinBet ? J.disable() : J.enable();
        J.setScaleX(-1);
        J.addEventListener(ON_MOUSE_UP, this._onButBetMinRelease, this);
        n = 872;
        x = CANVAS_HEIGHT - 90;
        Q = new CDisplayText(n,x,s_oSpriteLibrary.getSprite("plus_display"),D + TEXT_CURRENCY,TEXT_TOT_BET,40,F);
        new CTLText(F,CANVAS_WIDTH / 2 - 400,370,400,34,34,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_SELECT_NUM_CARDS,!0,!0,!0,!1);
        L = new createjs.Text(z," 44px " + PRIMARY_FONT,"#fff");
        L.x = CANVAS_WIDTH / 2 - 200;
        L.y = 480;
        L.textAlign = "center";
        L.textBaseline = "middle";
        F.addChild(L);
        a = s_oSpriteLibrary.getSprite("but_plus");
        M = new CTextSpritesheetBut(CANVAS_WIDTH / 2 - 50,480,a,TEXT_PLUS,PRIMARY_FONT,"#ffffff",70,!1,F);
        M.enable();
        M.addEventListener(ON_MOUSE_UP, this._onButCardPlusRelease, this);
        a = s_oSpriteLibrary.getSprite("but_plus");
        E = new CTextSpritesheetBut(CANVAS_WIDTH / 2 - 350,480,a,TEXT_MIN,PRIMARY_FONT,"#ffffff",70,!1,F);
        E.enable();
        E.setScaleX(-1);
        E.addEventListener(ON_MOUSE_UP, this._onButCardMinRelease, this);
        a = new createjs.Text(TEXT_SELECT_NUM_BALLS," 34px " + PRIMARY_FONT,"#fff");
        a.x = CANVAS_WIDTH / 2 - 200;
        a.y = 626;
        a.textAlign = "center";
        a.textBaseline = "middle";
        F.addChild(a);
        a = s_oSpriteLibrary.getSprite("but_ball");
        I = new CToggleText(0 === s_iCurNumToExtract ? !0 : !1,CANVAS_WIDTH / 2 - a.width - 200,700,a,a.width / 2,a.height,NUM_EXTRACTIONS[0],PRIMARY_FONT,"#ffffff",50,F);
        I.addEventListener(ON_MOUSE_UP, this._onButNumBall1Release, this);
        h = new CToggleText(1 === s_iCurNumToExtract ? !0 : !1,CANVAS_WIDTH / 2 - 200,700,a,a.width / 2,a.height,NUM_EXTRACTIONS[1],PRIMARY_FONT,"#ffffff",50,F);
        h.addEventListener(ON_MOUSE_UP, this._onButNumBall2Release, this);
        R = new CToggleText(2 === s_iCurNumToExtract ? !0 : !1,CANVAS_WIDTH / 2 + a.width - 200,700,a,a.width / 2,a.height,NUM_EXTRACTIONS[2],PRIMARY_FONT,"#ffffff",50,F);
        R.addEventListener(ON_MOUSE_UP, this._onButNumBall3Release, this);
        this._initCards();
        q = 1350;
        k = CANVAS_HEIGHT - 50;
        U = new CTextButton(q,k,s_oSpriteLibrary.getSprite("but_gui"),TEXT_PLAY,PRIMARY_FONT,"#ffffff",50,0,F);
        U.addEventListener(ON_MOUSE_UP, this._onButPlay, this);
        a = s_oSpriteLibrary.getSprite("but_exit");
        g = CANVAS_WIDTH - a.height / 2 - 10;
        e = a.height / 2 + 10;
        V = new CGfxButton(g,e,a,!0);
        V.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            f = g - a.width - 10,
            m = e,
            a = s_oSpriteLibrary.getSprite("audio_icon"),
            S = new CToggle(f,m,a,s_bAudioActive),
            S.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        a = window.document;
        var b = a.documentElement;
        w = b.requestFullscreen || b.mozRequestFullScreen || b.webkitRequestFullScreen || b.msRequestFullscreen;
        H = a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (w = !1);
        w && screenfull.isEnabled && (a = s_oSpriteLibrary.getSprite("but_fullscreen"),
        c = a.width / 4 + 10,
        d = a.height / 2 + 10,
        G = new CToggle(c,d,a,s_bFullscreen,!0),
        G.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        N = new CMsgBox(s_oSpriteLibrary.getSprite("msg_box"));
        N.addEventListener(ON_BUT_RECHARGE, this._onRecharge, this);
        this._checkIfCanPlay();
        this._setButtonsStates();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(a, b) {
        T.setPosition(l, B - b);
        Q.setPosition(n, x - b);
        P.setPosition(t, C - b);
        K.setPosition(K.getX(), v - b);
        J.setPosition(J.getX(), v - b);
        U.setPosition(q, k - b);
        V.setPosition(g - a, b + e);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || S.setPosition(f - a, b + m);
        w && screenfull.isEnabled && G.setPosition(c + a, d + b)
    }
    ;
    this.unload = function() {
        K.unload();
        J.unload();
        M.unload();
        E.unload();
        I.unload();
        h.unload();
        R.unload();
        U.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            S.unload(),
            S = null;
        w && screenfull.isEnabled && G.unload();
        V.unload();
        N.unload();
        F.off("click", function() {});
        y.removeChild(F);
        s_oCardSelection = null
    }
    ;
    this.setMoney = function(a) {
        p += a;
        T.changeText(p + TEXT_CURRENCY);
        this._setButtonsStates()
    }
    ;
    this._initCards = function() {
        new CTLText(F,CANVAS_WIDTH / 2 + 120,275,370,34,34,"center","#ff7803",PRIMARY_FONT,1,0,0,TEXT_PAYTABLE,!0,!0,!1,!1);
        var a = s_oSpriteLibrary.getSprite("card_cell")
          , b = a.width / 4;
        a = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: b,
                height: b
            },
            animations: {
                state_empty: [0],
                state_fill: [1],
                state_extracted: [2],
                state_highlight: [3]
            }
        });
        O = [];
        O[0] = new CPaytableCard(1100,666,b,0,a,F);
        O[1] = new CPaytableCard(1100,500,b,1,a,F);
        O[2] = new CPaytableCard(1100,330,b,2,a,F);
        this.initPrizes(PAYTABLE_INFO[r])
    }
    ;
    this.initPrizes = function(a) {
        for (var b = 0; b < O.length; b++)
            O[b].setMsg(TEXT_PAYTABLE_PRIZES[b] + ": x" + a[b])
    }
    ;
    this._checkIfEnoughMoney = function() {
        return p < D ? !1 : !0
    }
    ;
    this._checkIfCanPlay = function() {
        this._checkIfEnoughMoney() || (s_iCurCoinBet = 0,
        z = 1,
        P.changeText(TEXT_CURRENCY + COIN_BETS[s_iCurCoinBet]),
        D = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * z,
        L.text = z,
        Q.changeText(D + TEXT_CURRENCY),
        !1 === this._checkIfEnoughMoney() && N.show(TEXT_GAMEOVER, !0))
    }
    ;
    this._setButtonsStates = function() {
        this._setBetButtonsStates();
        this._setCardButtonsStates()
    }
    ;
    this._setBetButtonsStates = function() {
        K.enable();
        J.enable();
        0 === s_iCurCoinBet && J.disable();
        s_iCurCoinBet === COIN_BETS.length - 1 && K.disable();
        s_iCurCoinBet < COIN_BETS.length - 1 && p < COIN_BETS[s_iCurCoinBet + 1] / COIN_BETS[0] * COIN_BETS[0] * z && K.disable()
    }
    ;
    this._setCardButtonsStates = function() {
        M.enable();
        E.enable();
        1 === z && E.disable();
        z === MAX_CARDS && M.disable();
        z < MAX_CARDS && p < COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * (z + 1) && M.disable()
    }
    ;
    this._onButBetPlusRelease = function() {
        s_iCurCoinBet++;
        P.changeText(TEXT_CURRENCY + COIN_BETS[s_iCurCoinBet]);
        D = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * z;
        Q.changeText(D + TEXT_CURRENCY);
        this._setButtonsStates()
    }
    ;
    this._onButBetMinRelease = function() {
        s_iCurCoinBet--;
        P.changeText(TEXT_CURRENCY + COIN_BETS[s_iCurCoinBet]);
        D = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * z;
        Q.changeText(D + TEXT_CURRENCY);
        this._setButtonsStates()
    }
    ;
    this._onButCardPlusRelease = function() {
        z++;
        L.text = z;
        D = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * z;
        Q.changeText(D + TEXT_CURRENCY);
        this._setButtonsStates()
    }
    ;
    this._onButCardMinRelease = function() {
        z--;
        L.text = z;
        D = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * z;
        Q.changeText(D + TEXT_CURRENCY);
        this._setButtonsStates()
    }
    ;
    this._onButNumBall1Release = function() {
        A !== NUM_EXTRACTIONS[0] ? (A = NUM_EXTRACTIONS[0],
        h.activate(!1),
        R.activate(!1)) : I.activate(!0);
        r = 0;
        this.initPrizes(PAYTABLE_INFO[r])
    }
    ;
    this._onButNumBall2Release = function() {
        A !== NUM_EXTRACTIONS[1] ? (A = NUM_EXTRACTIONS[1],
        I.activate(!1),
        R.activate(!1)) : h.activate(!0);
        r = 1;
        this.initPrizes(PAYTABLE_INFO[r])
    }
    ;
    this._onButNumBall3Release = function() {
        A !== NUM_EXTRACTIONS[2] ? (A = NUM_EXTRACTIONS[2],
        h.activate(!1),
        I.activate(!1)) : R.activate(!0);
        r = 2;
        this.initPrizes(PAYTABLE_INFO[r])
    }
    ;
    this._onButPlay = function() {
        !1 === this._checkIfEnoughMoney() ? N.show(TEXT_GAMEOVER, !0) : (s_iCurNumCards = z,
        s_iCurNumToExtract = r,
        s_oCardSelection.unload(),
        s_oGame.initGame(z, A, p, D, r))
    }
    ;
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge")
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        s_oCardSelection.unload();
        s_oMain.gotoMenu()
    }
    ;
    this.resetFullscreenBut = function() {
        w && screenfull.isEnabled && G.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? H.call(window.document) : w.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    var y = b;
    s_oCardSelection = this;
    this._init(a)
}
var s_oCardSelection = null
  , s_iCurNumCards = 4
  , s_iCurNumToExtract = 0
  , s_iCurCoinBet = 0;
function CCard(a, b, c, d) {
    var f, m, g = -1, e, q, k, u, v, n;
    this._init = function(a, b, c) {
        var d = []
          , g = 1;
        m = 0;
        for (var k, l = 0; l < CARD_COLS; l++) {
            d[l] = [];
            k = 0 === l ? 9 : l === CARD_COLS - 1 ? 11 : 10;
            for (var r = 0; r < k; r++)
                d[l].push(g),
                g++
        }
        k = [];
        e = [];
        for (l = 0; l < CARD_ROWS; l++)
            for (e[l] = [],
            r = 0; r < CARD_COLS; r++)
                e[l][r] = LABEL_EMPTY,
                k[r] = 0;
        for (l = 0; l < CARD_ROWS - 1; l++)
            for (g = [0, 1, 2, 3, 4, 5, 6, 7, 8],
            r = 0; 5 > r; r++) {
                var t = Math.floor(Math.random() * g.length);
                e[l][g[t]] = LABEL_FILL;
                k[g[t]] += 1;
                g.splice(t, 1)
            }
        g = [];
        var B = 5;
        for (t = 0; t < CARD_COLS; t++)
            0 === k[t] ? (e[l][t] = LABEL_FILL,
            k[t] += 1,
            B--) : g.push(t);
        for (r = 0; r < B; r++)
            t = Math.floor(Math.random() * g.length),
            e[l][g[t]] = LABEL_FILL,
            k[g[t]] += 1,
            g.splice(t, 1);
        g = [];
        for (t = 0; t < CARD_COLS; t++) {
            g[t] = [];
            for (r = 0; r < k[t]; r++)
                l = Math.floor(Math.random() * d[t].length),
                g[t].push(d[t][l]),
                d[t].splice(l, 1);
            bubbleSort(g[t])
        }
        n = new createjs.Container;
        n.scaleX = n.scaleY = c;
        n.x = a;
        n.y = b;
        x.addChild(n);
        l = s_oSpriteLibrary.getSprite("card_cell");
        f = l.width / 4;
        a = new createjs.SpriteSheet({
            images: [l],
            frames: {
                width: f,
                height: f
            },
            animations: {
                state_empty: [0],
                state_fill: [1],
                state_extracted: [2],
                state_highlight: [3]
            }
        });
        c = b = 0;
        q = [];
        for (l = 0; l < CARD_ROWS; l++) {
            q[l] = [];
            for (r = 0; r < CARD_COLS; r++)
                d = createSprite(a, "state_" + e[l][r], 0, 0, f, f),
                d.x = b,
                d.y = c,
                n.addChild(d),
                q[l][r] = d,
                e[l][r] === LABEL_FILL ? (d = new createjs.Text(g[r][0]," 64px " + PRIMARY_FONT,"#000"),
                d.x = b + f / 2,
                d.y = c + f / 2,
                d.textAlign = "center",
                d.textBaseline = "middle",
                n.addChild(d),
                e[l][r] = g[r][0],
                g[r].splice(0, 1)) : e[l][r] = 0,
                b += f;
            b = 0;
            c += f
        }
        this.initRows();
        u = createBitmap(s_oSpriteLibrary.getSprite("card_highlight_1"));
        u.x = -28;
        u.y = -27;
        u.visible = !1;
        n.addChild(u);
        v = createBitmap(s_oSpriteLibrary.getSprite("card_highlight_2"));
        v.x = -28;
        v.y = -27;
        v.visible = !1;
        n.addChild(v)
    }
    ;
    this.unload = function() {
        x.removeChild(n)
    }
    ;
    this.initRows = function() {
        k = [];
        for (var a = 0; a < CARD_ROWS; a++) {
            k[a] = [];
            for (var b = 0; b < CARD_COLS; b++)
                0 !== e[a][b] && k[a].push(parseInt(e[a][b]))
        }
    }
    ;
    this.reset = function() {
        -1 !== g && (clearInterval(g),
        g = -1);
        m = 0;
        u.visible = !1;
        v.visible = !1;
        for (var a = 0; a < q.length; a++)
            for (var b = 0; b < q[a].length; b++)
                0 === e[a][b] ? q[a][b].gotoAndStop("state_empty") : q[a][b].gotoAndStop("state_fill")
    }
    ;
    this.hideHighlight = function() {
        u.visible = !1;
        v.visible = !1
    }
    ;
    this.checkNumberExtracted = function(a) {
        for (var b = [], c = 0; c < k.length; c++) {
            for (var d = 0, e = 0; e < k[c].length; e++)
                for (var f = 0; f < a.length; f++)
                    a[f] === k[c][e] && d++;
            5 === d && b.push(c)
        }
        return b
    }
    ;
    this.findNumberExtracted = function(a) {
        for (var b = !1, c = 0, d = 0, f = 0; f < e.length; f++)
            for (var g = 0; g < e[f].length; g++)
                if (e[f][g] === a) {
                    b = !0;
                    c = f;
                    d = g;
                    break
                }
        b && (q[c][d].gotoAndStop("state_extracted"),
        this._checkWins())
    }
    ;
    this._checkWins = function() {
        for (var a = 0; a < q.length; a++) {
            for (var b = 0, c = 0; c < q[a].length; c++)
                2 === q[a][c].currentFrame && b++;
            if (5 === b) {
                for (b = 0; b < q[a].length; b++)
                    v.visible = !0,
                    u.visible = !1,
                    "state_empty" !== q[a][b].currentAnimation && q[a][b].gotoAndStop("state_highlight");
                m++;
                playSound("win_row", 1, !1)
            } else
                4 !== b || v.visible || (v.visible = !1,
                u.visible = !0)
        }
    }
    ;
    this.initWinAnim = function() {
        v.visible = !0;
        var a = this;
        g = setInterval(function() {
            a._playWinAnim()
        }, 300)
    }
    ;
    this._playWinAnim = function() {
        v.visible = !v.visible
    }
    ;
    this.printGrid = function() {
        for (var a = 0; a < CARD_ROWS; a++)
            for (var b = 0; b < CARD_COLS; b++)
                trace("_aGrid[" + a + "][" + b + "]: " + e[a][b])
    }
    ;
    this.getRow = function(a) {
        return k[a]
    }
    ;
    this.getRowHighlighted = function() {
        return m
    }
    ;
    var x = d;
    this._init(a, b, c)
}
function CMsgBox(a) {
    var b, c, d, f, m, g, e;
    this._init = function(a) {
        b = [];
        c = [];
        f = new createjs.Container;
        f.alpha = 0;
        f.visible = !1;
        f.on("click", function() {}, this);
        d = createBitmap(a);
        f.addChild(d);
        m = new CTLText(f,CANVAS_WIDTH / 2 - 250,CANVAS_HEIGHT / 2 - 250,500,250,100,"center","#fff",PRIMARY_FONT,1,0,0," ",!0,!0,!0,!1);
        g = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2 + 150,s_oSpriteLibrary.getSprite("but_gui"),TEXT_EXIT,PRIMARY_FONT,"#ffffff",50,0,f);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this);
        e = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2 + 100,s_oSpriteLibrary.getSprite("but_gui"),TEXT_RECHARGE,PRIMARY_FONT,"#ffffff",50,0,f);
        e.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        s_oStage.addChild(f)
    }
    ;
    this.show = function(a, b) {
        playSound("game_over", 1, !1);
        m.refreshText(a);
        f.visible = !0;
        createjs.Tween.get(f).to({
            alpha: 1
        }, 500);
        b ? (g.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 200),
        e.setVisible(!0)) : (g.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 150),
        e.setVisible(!1))
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(f);
        g.unload();
        e.unload();
        f.removeAllEventListeners()
    }
    ;
    this.addEventListener = function(a, d, e) {
        b[a] = d;
        c[a] = e
    }
    ;
    this.hide = function() {
        f.visible = !1
    }
    ;
    this._onExit = function() {
        this.hide();
        b[ON_BUT_EXIT] && b[ON_BUT_EXIT].call(c[ON_BUT_EXIT])
    }
    ;
    this._onRecharge = function() {
        this.hide();
        b[ON_BUT_RECHARGE] && b[ON_BUT_RECHARGE].call(c[ON_BUT_RECHARGE])
    }
    ;
    this._init(a);
    return this
}
function CNumberBoard(a, b, c) {
    var d, f;
    this._init = function(a, b) {
        f = new createjs.Container;
        f.x = a;
        f.y = b;
        m.addChild(f);
        this._initGrid()
    }
    ;
    this._initGrid = function() {
        var c = s_oSpriteLibrary.getSprite("board_cell")
          , e = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 3,
                height: c.height
            },
            animations: {
                state_1: [0],
                state_2: [1],
                state_3: [2]
            }
        })
          , f = a
          , k = b
          , u = "state_1";
        d = [];
        for (var v = 0; 5 > v; v++) {
            for (var n = 0; 18 > n; n++) {
                var x = new CNumberBoardCell(f,k,18 * v + (n + 1),c.width / 3,c.height,e,m);
                u = "state_1" === u ? "state_2" : "state_1";
                x.setState(u);
                d.push(x);
                f += c.width / 3
            }
            f = a;
            k += c.height;
            u = "state_1" === u ? "state_2" : "state_1"
        }
    }
    ;
    this.reset = function() {
        for (var a = "state_1", b = 0; b < d.length; b++)
            a = "state_1" === a ? "state_2" : "state_1",
            d[b].setState(a),
            0 === (b + 1) % 18 && (a = "state_1" === a ? "state_2" : "state_1")
    }
    ;
    this.numExtracted = function(a) {
        d[a - 1].setState("state_3")
    }
    ;
    var m = c;
    this._init(a, b)
}
function CNumberBoardCell(a, b, c, d, f, m, g) {
    var e, q, k, u;
    this._init = function(a, b, c, d, f, g) {
        u = new createjs.Container;
        u.x = a;
        u.y = b;
        v.addChild(u);
        e = createSprite(g, "", 0, 0, d, f);
        u.addChild(e);
        k = new createjs.Text(c,"36px " + PRIMARY_FONT,"#000");
        k.x = d / 2 + 1;
        k.y = f / 2 + 1;
        k.textAlign = "center";
        k.textBaseline = "middle";
        u.addChild(k);
        q = new createjs.Text(c,"36px " + PRIMARY_FONT,"#fff");
        q.x = d / 2;
        q.y = f / 2;
        q.textAlign = "center";
        q.textBaseline = "middle";
        u.addChild(q)
    }
    ;
    this.setState = function(a) {
        e.gotoAndStop(a);
        q.color = "state_3" === a ? "#ff7803" : "#fff"
    }
    ;
    var v = g;
    this._init(a, b, c, d, f, m)
}
function CBallExtracted(a, b, c, d, f, m, g, e, q) {
    var k, u, v, n, x;
    this._init = function(a, b, c, d, e, f, g, m) {
        k = e;
        x = new createjs.Container;
        x.x = a;
        x.y = b;
        l.addChild(x);
        u = createSprite(m, e, c / 2, d / 2, c, d);
        u.gotoAndStop(e);
        x.addChild(u);
        v = new createjs.Text("",f + "px " + PRIMARY_FONT,"#222");
        v.textAlign = "center";
        v.textBaseline = "middle";
        v.outline = g;
        x.addChild(v);
        n = new createjs.Text("",f + "px " + PRIMARY_FONT,"#fff");
        n.textAlign = "center";
        n.textBaseline = "middle";
        x.addChild(n)
    }
    ;
    this.setMask = function(a) {
        x.mask = a;
        -1 < navigator.userAgent.indexOf("Chrome/50.0") && (x.compositeOperation = "hard-light")
    }
    ;
    this.unload = function() {
        l.removeChild(x)
    }
    ;
    this.setText = function(a) {
        v.text = a;
        n.text = a
    }
    ;
    this.moveX = function(a, b, c) {
        createjs.Tween.get(x).to({
            x: a
        }, 300, createjs.Ease.cubicOut).call(function() {
            b.call(c)
        })
    }
    ;
    this.moveY = function(a, b, c, d) {
        this.setText(b);
        createjs.Tween.get(x).to({
            y: a
        }, 300, createjs.Ease.cubicOut).call(function() {
            c.call(d)
        })
    }
    ;
    this.getX = function() {
        return x.x + u.x
    }
    ;
    this.getY = function() {
        return x.y + u.y
    }
    ;
    this.getColor = function() {
        return k
    }
    ;
    var l = q;
    this._init(a, b, c, d, f, m, g, e)
}
function CPaytablePanel(a) {
    var b, c, d;
    this._init = function() {
        d = new createjs.Container;
        d.on("click", function() {});
        d.visible = !1;
        m.addChild(d);
        var a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(a);
        new CTLText(d,CANVAS_WIDTH / 2 - 250,250,500,44,44,"center","#ff7803",PRIMARY_FONT,1,0,0,TEXT_PAYTABLE,!0,!0,!1,!1);
        this._initCards();
        c = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 150,s_oSpriteLibrary.getSprite("but_gui"),TEXT_PLAY,PRIMARY_FONT,"#ffffff",50,0,d);
        c.addEventListener(ON_MOUSE_UP, this._onButPlay, this)
    }
    ;
    this.unload = function() {
        c.unload();
        d.off("click", function() {})
    }
    ;
    this.show = function() {
        d.visible = !0;
        createjs.Ticker.paused = !0
    }
    ;
    this.hide = function() {
        d.visible = !1;
        createjs.Ticker.paused = !1
    }
    ;
    this._initCards = function() {
        var a = s_oSpriteLibrary.getSprite("card_cell")
          , c = a.width / 4;
        a = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: c,
                height: c
            },
            animations: {
                state_empty: [0],
                state_fill: [1],
                state_extracted: [2],
                state_highlight: [3]
            }
        });
        b = [];
        b[0] = new CPaytableCard(800,660,c,0,a,d);
        b[1] = new CPaytableCard(800,480,c,1,a,d);
        b[2] = new CPaytableCard(800,300,c,2,a,d)
    }
    ;
    this.initPrizes = function(a) {
        for (var c = 0; c < b.length; c++)
            b[c].setMsg(TEXT_PAYTABLE_PRIZES[c] + ": x" + a[c])
    }
    ;
    this._onButPlay = function() {
        f.hide()
    }
    ;
    var f = this;
    var m = a;
    this._init()
}
function CPaytableCard(a, b, c, d, f, m) {
    var g, e;
    this._init = function(a, b, c, d, f) {
        e = new createjs.Container;
        e.x = a;
        e.y = b;
        q.addChild(e);
        for (var k = b = a = 0; k < CARD_ROWS; k++) {
            for (var m = 0; m < CARD_COLS; m++) {
                var n = d < k ? createSprite(f, "state_empty", 0, 0, c, c) : createSprite(f, "state_highlight", 0, 0, c, c);
                n.x = a;
                n.y = b;
                n.scaleX = n.scaleY = .3;
                e.addChild(n);
                a += .3 * c
            }
            a = 0;
            b += .3 * c
        }
        g = new CTLText(e,.3 * c * CARD_COLS / 2 - 196,b + 8,392,40,40,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_PAYTABLE_PRIZES[d],!0,!0,!1,!1)
    }
    ;
    this.setMsg = function(a) {
        g.refreshText(a)
    }
    ;
    var q = m;
    this._init(a, b, c, d, f)
}
function CDisplayText(a, b, c, d, f, m, g) {
    var e, q;
    this._init = function(a, b, c, d, f, g) {
        q = new createjs.Container;
        q.x = a;
        q.y = b;
        k.addChild(q);
        a = createBitmap(c);
        q.addChild(a);
        e = new CTLText(q,20,16,c.width - 40,c.height - 40,g,"center","#fff",PRIMARY_FONT,1,0,0,d,!0,!0,!1,!1);
        new CTLText(q,0,-40,c.width,36,36,"center","#fff",PRIMARY_FONT,1,10,0,f,!0,!0,!1,!1)
    }
    ;
    this.setPosition = function(a, b) {
        q.x = a;
        q.y = b
    }
    ;
    this.changeText = function(a) {
        e.refreshText(a)
    }
    ;
    var k = g;
    this._init(a, b, c, d, f, m)
}
function CAreYouSurePanel(a) {
    var b, c, d;
    this._init = function() {
        d = new createjs.Container;
        d.visible = !1;
        f.addChild(d);
        var a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(a);
        new CTLText(d,CANVAS_WIDTH / 2 - 250,CANVAS_HEIGHT / 2 - 200,500,250,100,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_ARE_SURE,!0,!0,!0,!1);
        b = new CTextButton(CANVAS_WIDTH / 2 + 170,770,s_oSpriteLibrary.getSprite("but_gui"),TEXT_YES,PRIMARY_FONT,"#ffffff",50,0,d);
        b.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        c = new CTextButton(CANVAS_WIDTH / 2 - 170,770,s_oSpriteLibrary.getSprite("but_gui"),TEXT_NO,PRIMARY_FONT,"#ffffff",50,0,d);
        c.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    }
    ;
    this.show = function() {
        createjs.Ticker.paused = !0;
        d.visible = !0
    }
    ;
    this._onButYes = function() {
        createjs.Ticker.paused = !1;
        s_oGame.onExit()
    }
    ;
    this._onButNo = function() {
        createjs.Ticker.paused = !1;
        d.visible = !1
    }
    ;
    var f = a;
    this._init()
}
function CCreditsPanel() {
    var a, b, c, d, f, m, g, e, q;
    this._init = function() {
        q = new createjs.Container;
        s_oStage.addChild(q);
        var k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        q.addChild(k);
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        q.addChild(m);
        k = s_oSpriteLibrary.getSprite("msg_box");
        c = createBitmap(k);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        c.regX = k.width / 2;
        c.regY = k.height / 2;
        q.addChild(c);
        g = new createjs.Shape;
        g.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = .01;
        b = g.on("click", this._onLogoButRelease);
        q.addChild(g);
        k = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 270;
        d = new CGfxButton(a,280,k,q);
        d.addEventListener(ON_MOUSE_UP, this.unload, this);
        f = new createjs.Text(TEXT_CREDITS_DEVELOPED,"36px " + PRIMARY_FONT,"#ffffff");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 80;
        f.textAlign = "center";
        q.addChild(f);
        k = s_oSpriteLibrary.getSprite("logo_credits");
        var u = createBitmap(k);
        u.regX = k.width / 2;
        u.regY = k.height / 2;
        u.x = CANVAS_WIDTH / 2;
        u.y = CANVAS_HEIGHT / 2;
        q.addChild(u);
        e = new createjs.Text("www.codethislab.com","34px " + PRIMARY_FONT,"#ffffff");
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 + 50;
        e.textAlign = "center";
        q.addChild(e)
    }
    ;
    this.unload = function() {
        g.off("click", b);
        d.unload();
        d = null;
        s_oStage.removeChild(q)
    }
    ;
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    }
    ;
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
    setShadow: function(a, b, c, d) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,b,c,d))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
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
function CTLText(a, b, c, d, f, m, g, e, q, k, u, v, n, x, l, B, t) {
    this._oContainer = a;
    this._x = b;
    this._y = c;
    this._iWidth = d;
    this._iHeight = f;
    this._bMultiline = B;
    this._iFontSize = m;
    this._szAlign = g;
    this._szColor = e;
    this._szFont = q;
    this._iPaddingH = u;
    this._iPaddingV = v;
    this._bVerticalAlign = l;
    this._bFitText = x;
    this._bDebug = t;
    this._oDebugShape = null;
    this._fLineHeightFactor = k;
    this._oText = null;
    n && this.__createText(n)
}
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var b = a.split(".")
      , c = b.length;
    2 < c && (a = b[c - 2] + "." + b[c - 1]);
    return a
}
var getClosestTop = function() {
    var a = window
      , b = !1;
    try {
        for (; a.parent.document !== a.document; )
            if (a.parent.document)
                a = a.parent;
            else {
                b = !0;
                break
            }
    } catch (c) {
        b = !0
    }
    return {
        topFrame: a,
        err: b
    }
}
  , getBestPageUrl = function(a) {
    var b = a.topFrame
      , c = "";
    if (a.err)
        try {
            try {
                c = window.top.location.href
            } catch (f) {
                var d = window.location.ancestorOrigins;
                c = d[d.length - 1]
            }
        } catch (f) {
            c = b.document.referrer
        }
    else
        c = b.location.href;
    return c
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), b = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], c = 0; c < b.length; c++)
        if (b[c] === a)
            return !0;
    return !1
}
;
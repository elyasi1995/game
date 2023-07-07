/*
 screenfull
 v5.0.0 - 2019-09-09
 (c) Sindre Sorhus; MIT License
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , e = "undefined" !== typeof module && module.exports
      , c = function() {
        for (var c, f = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], e = 0, k = f.length, b = {}; e < k; e++)
            if ((c = f[e]) && c[1]in a) {
                for (e = 0; e < c.length; e++)
                    b[f[0][e]] = c[e];
                return b
            }
        return !1
    }()
      , f = {
        change: c.fullscreenchange,
        error: c.fullscreenerror
    }
      , g = {
        request: function(f) {
            return new Promise(function(e, g) {
                var k = function() {
                    this.off("change", k);
                    e()
                }
                .bind(this);
                this.on("change", k);
                f = f || a.documentElement;
                Promise.resolve(f[c.requestFullscreen]())["catch"](g)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(f, e) {
                if (this.isFullscreen) {
                    var g = function() {
                        this.off("change", g);
                        f()
                    }
                    .bind(this);
                    this.on("change", g);
                    Promise.resolve(a[c.exitFullscreen]())["catch"](e)
                } else
                    f()
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
        on: function(c, e) {
            var g = f[c];
            g && a.addEventListener(g, e, !1)
        },
        off: function(c, e) {
            var g = f[c];
            g && a.removeEventListener(g, e, !1)
        },
        raw: c
    };
    c ? (Object.defineProperties(g, {
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
    e ? module.exports = g : window.screenfull = g) : e ? module.exports = {
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
    function e(a, b) {
        var d = -1
          , c = a ? a.length : 0;
        if ("number" == typeof c && -1 < c && c <= r)
            for (; ++d < c; )
                b(a[d], d, a);
        else
            f(a, b)
    }
    function c(b) {
        b = String(b).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }
    function f(a, b) {
        for (var d in a)
            q.call(a, d) && b(a[d], d, a)
    }
    function g(b) {
        return null == b ? a(b) : z.call(b).slice(8, -1)
    }
    function m(a, b) {
        var d = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(d) && ("object" == d ? !!a[b] : !0)
    }
    function h(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }
    function l(a, b) {
        var d = null;
        e(a, function(c, f) {
            d = b(d, c, f, a)
        });
        return d
    }
    function k(a) {
        function b(b) {
            return l(b, function(b, d) {
                var f = d.pattern || h(d);
                !b && (b = RegExp("\\b" + f + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + f + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + f + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((b = String(d.label && !RegExp(f, "i").test(d.label) ? d.label : b).split("/"))[1] && !/[\d.]+/.test(b[0]) && (b[0] += " " + b[1]),
                d = d.label || d,
                b = c(b[0].replace(RegExp(f, "i"), d).replace(RegExp("; *(?:" + d + "[_-])?", "i"), " ").replace(RegExp("(" + d + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return b
            })
        }
        function e(b) {
            return l(b, function(b, d) {
                return b || (RegExp(d + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var r = d
          , t = a && "object" == typeof a && "String" != g(a);
        t && (r = a,
        a = null);
        var u = r.navigator || {}
          , q = u.userAgent || "";
        a || (a = q);
        var H = t ? !!u.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(z.toString())
          , y = t ? "Object" : "ScriptBridgingProxyObject"
          , G = t ? "Object" : "Environment"
          , D = t && r.java ? "JavaPackage" : g(r.java)
          , M = t ? "Object" : "RuntimeObject";
        G = (D = /\bJava/.test(D) && r.java) && g(r.environment) == G;
        var S = D ? "a" : "\u03b1", p = D ? "b" : "\u03b2", N = r.document || {}, O = r.operamini || r.opera, T = x.test(T = t && O ? O["[[Class]]"] : g(O)) ? T : O = null, n, U = a;
        t = [];
        var V = null
          , Q = a == q;
        q = Q && O && "function" == typeof O.version && O.version();
        var A = function(b) {
            return l(b, function(b, d) {
                return b || RegExp("\\b" + (d.pattern || h(d)) + "\\b", "i").exec(a) && (d.label || d)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , v = function(b) {
            return l(b, function(b, d) {
                return b || RegExp("\\b" + (d.pattern || h(d)) + "\\b", "i").exec(a) && (d.label || d)
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
          , B = b([{
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
          , K = function(b) {
            return l(b, function(b, d, c) {
                return b || (d[B] || d[/^[a-z]+(?: +[a-z]+\b)*/i.exec(B)] || RegExp("\\b" + h(c) + "(?:\\b|\\w*\\d)", "i").exec(a)) && c
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
          , w = function(b) {
            return l(b, function(b, d) {
                var f = d.pattern || h(d);
                if (!b && (b = RegExp("\\b" + f + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                    var e = b
                      , n = d.label || d
                      , g = {
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
                    f && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (g = g[/[\d.]+$/.exec(e)]) && (e = "Windows " + g);
                    e = String(e);
                    f && n && (e = e.replace(RegExp(f, "i"), n));
                    b = e = c(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return b
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        A && (A = [A]);
        K && !B && (B = b([K]));
        if (n = /\bGoogle TV\b/.exec(B))
            B = n[0];
        /\bSimulator\b/i.test(a) && (B = (B ? B + " " : "") + "Simulator");
        "Opera Mini" == v && /\bOPiOS\b/.test(a) && t.push("running in Turbo/Uncompressed mode");
        "IE" == v && /\blike iPhone OS\b/.test(a) ? (n = k(a.replace(/like iPhone OS/, "")),
        K = n.manufacturer,
        B = n.product) : /^iP/.test(B) ? (v || (v = "Safari"),
        w = "iOS" + ((n = / OS ([\d_]+)/i.exec(a)) ? " " + n[1].replace(/_/g, ".") : "")) : "Konqueror" != v || /buntu/i.test(w) ? K && "Google" != K && (/Chrome/.test(v) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(B)) || /\bAndroid\b/.test(w) && /^Chrome/.test(v) && /\bVersion\//i.test(a) ? (v = "Android Browser",
        w = /\bAndroid\b/.test(w) ? w : "Android") : "Silk" == v ? (/\bMobi/i.test(a) || (w = "Android",
        t.unshift("desktop mode")),
        /Accelerated *= *true/i.test(a) && t.unshift("accelerated")) : "PaleMoon" == v && (n = /\bFirefox\/([\d.]+)\b/.exec(a)) ? t.push("identifying as Firefox " + n[1]) : "Firefox" == v && (n = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (w || (w = "Firefox OS"),
        B || (B = n[1])) : !v || (n = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(v)) ? (v && !B && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(n + "/") + 8)) && (v = null),
        (n = B || K || w) && (B || K || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(w)) && (v = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(w) ? w : n) + " Browser")) : "Electron" == v && (n = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && t.push("Chromium " + n) : w = "Kubuntu";
        q || (q = e(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", h(v), "(?:Firefox|Minefield|NetFront)"]));
        if (n = "iCab" == A && 3 < parseFloat(q) && "WebKit" || /\bOpera\b/.test(v) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(A) && "WebKit" || !A && /\bMSIE\b/i.test(a) && ("Mac OS" == w ? "Tasman" : "Trident") || "WebKit" == A && /\bPlayStation\b(?! Vita\b)/i.test(v) && "NetFront")
            A = [n];
        "IE" == v && (n = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (v += " Mobile",
        w = "Windows Phone " + (/\+$/.test(n) ? n : n + ".x"),
        t.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (v = "IE Mobile",
        w = "Windows Phone 8.x",
        t.unshift("desktop mode"),
        q || (q = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != v && "Trident" == A && (n = /\brv:([\d.]+)/.exec(a)) && (v && t.push("identifying as " + v + (q ? " " + q : "")),
        v = "IE",
        q = n[1]);
        if (Q) {
            if (m(r, "global"))
                if (D && (n = D.lang.System,
                U = n.getProperty("os.arch"),
                w = w || n.getProperty("os.name") + " " + n.getProperty("os.version")),
                G) {
                    try {
                        q = r.require("ringo/engine").version.join("."),
                        v = "RingoJS"
                    } catch (X) {
                        (n = r.system) && n.global.system == r.system && (v = "Narwhal",
                        w || (w = n[0].os || null))
                    }
                    v || (v = "Rhino")
                } else
                    "object" == typeof r.process && !r.process.browser && (n = r.process) && ("object" == typeof n.versions && ("string" == typeof n.versions.electron ? (t.push("Node " + n.versions.node),
                    v = "Electron",
                    q = n.versions.electron) : "string" == typeof n.versions.nw && (t.push("Chromium " + q, "Node " + n.versions.node),
                    v = "NW.js",
                    q = n.versions.nw)),
                    v || (v = "Node.js",
                    U = n.arch,
                    w = n.platform,
                    q = (q = /[\d.]+/.exec(n.version)) ? q[0] : null));
            else
                g(n = r.runtime) == y ? (v = "Adobe AIR",
                w = n.flash.system.Capabilities.os) : g(n = r.phantom) == M ? (v = "PhantomJS",
                q = (n = n.version || null) && n.major + "." + n.minor + "." + n.patch) : "number" == typeof N.documentMode && (n = /\bTrident\/(\d+)/i.exec(a)) ? (q = [q, N.documentMode],
                (n = +n[1] + 4) != q[1] && (t.push("IE " + q[1] + " mode"),
                A && (A[1] = ""),
                q[1] = n),
                q = "IE" == v ? String(q[1].toFixed(1)) : q[0]) : "number" == typeof N.documentMode && /^(?:Chrome|Firefox)\b/.test(v) && (t.push("masking as " + v + " " + q),
                v = "IE",
                q = "11.0",
                A = ["Trident"],
                w = "Windows");
            w = w && c(w)
        }
        q && (n = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(q) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (Q && u.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (V = /b/i.test(n) ? "beta" : "alpha",
        q = q.replace(RegExp(n + "\\+?$"), "") + ("beta" == V ? p : S) + (/\d+\+?/.exec(n) || ""));
        if ("Fennec" == v || "Firefox" == v && /\b(?:Android|Firefox OS)\b/.test(w))
            v = "Firefox Mobile";
        else if ("Maxthon" == v && q)
            q = q.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(B))
            "Xbox 360" == B && (w = null),
            "Xbox 360" == B && /\bIEMobile\b/.test(a) && t.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(v) && (!v || B || /Browser|Mobi/.test(v)) || "Windows CE" != w && !/Mobi/i.test(a))
            if ("IE" == v && Q)
                try {
                    null === r.external && t.unshift("platform preview")
                } catch (X) {
                    t.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(B) || /\bBB10\b/.test(a)) && (n = (RegExp(B.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || q) ? (n = [n, /BB10/.test(a)],
                w = (n[1] ? (B = null,
                K = "BlackBerry") : "Device Software") + " " + n[0],
                q = null) : this != f && "Wii" != B && (Q && O || /Opera/.test(v) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == v && /\bOS X (?:\d+\.){2,}/.test(w) || "IE" == v && (w && !/^Win/.test(w) && 5.5 < q || /\bWindows XP\b/.test(w) && 8 < q || 8 == q && !/\bTrident\b/.test(a))) && !x.test(n = k.call(f, a.replace(x, "") + ";")) && n.name && (n = "ing as " + n.name + ((n = n.version) ? " " + n : ""),
                x.test(v) ? (/\bIE\b/.test(n) && "Mac OS" == w && (w = null),
                n = "identify" + n) : (n = "mask" + n,
                v = T ? c(T.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(n) && (w = null),
                Q || (q = null)),
                A = ["Presto"],
                t.push(n));
        else
            v += " Mobile";
        if (n = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            n = [parseFloat(n.replace(/\.(\d)$/, ".0$1")), n];
            if ("Safari" == v && "+" == n[1].slice(-1))
                v = "WebKit Nightly",
                V = "alpha",
                q = n[1].slice(0, -1);
            else if (q == n[1] || q == (n[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1]))
                q = null;
            n[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == n[0] && 537.36 == n[2] && 28 <= parseFloat(n[1]) && "WebKit" == A && (A = ["Blink"]);
            Q && (H || n[1]) ? (A && (A[1] = "like Chrome"),
            n = n[1] || (n = n[0],
            530 > n ? 1 : 532 > n ? 2 : 532.05 > n ? 3 : 533 > n ? 4 : 534.03 > n ? 5 : 534.07 > n ? 6 : 534.1 > n ? 7 : 534.13 > n ? 8 : 534.16 > n ? 9 : 534.24 > n ? 10 : 534.3 > n ? 11 : 535.01 > n ? 12 : 535.02 > n ? "13+" : 535.07 > n ? 15 : 535.11 > n ? 16 : 535.19 > n ? 17 : 536.05 > n ? 18 : 536.1 > n ? 19 : 537.01 > n ? 20 : 537.11 > n ? "21+" : 537.13 > n ? 23 : 537.18 > n ? 24 : 537.24 > n ? 25 : 537.36 > n ? 26 : "Blink" != A ? "27" : "28")) : (A && (A[1] = "like Safari"),
            n = (n = n[0],
            400 > n ? 1 : 500 > n ? 2 : 526 > n ? 3 : 533 > n ? 4 : 534 > n ? "4+" : 535 > n ? 5 : 537 > n ? 6 : 538 > n ? 7 : 601 > n ? 8 : "8"));
            A && (A[1] += " " + (n += "number" == typeof n ? ".x" : /[.+]/.test(n) ? "" : "+"));
            "Safari" == v && (!q || 45 < parseInt(q)) && (q = n)
        }
        "Opera" == v && (n = /\bzbov|zvav$/.exec(w)) ? (v += " ",
        t.unshift("desktop mode"),
        "zvav" == n ? (v += "Mini",
        q = null) : v += "Mobile",
        w = w.replace(RegExp(" *" + n + "$"), "")) : "Safari" == v && /\bChrome\b/.exec(A && A[1]) && (t.unshift("desktop mode"),
        v = "Chrome Mobile",
        q = null,
        /\bOS X\b/.test(w) ? (K = "Apple",
        w = "iOS 4.3+") : w = null);
        q && 0 == q.indexOf(n = /[\d.]+$/.exec(w)) && -1 < a.indexOf("/" + n + "-") && (w = String(w.replace(n, "")).replace(/^ +| +$/g, ""));
        A && !/\b(?:Avant|Nook)\b/.test(v) && (/Browser|Lunascape|Maxthon/.test(v) || "Safari" != v && /^iOS/.test(w) && /\bSafari\b/.test(A[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(v) && A[1]) && (n = A[A.length - 1]) && t.push(n);
        t.length && (t = ["(" + t.join("; ") + ")"]);
        K && B && 0 > B.indexOf(K) && t.push("on " + K);
        B && t.push((/^on /.test(t[t.length - 1]) ? "" : "on ") + B);
        if (w) {
            var W = (n = / ([\d.+]+)$/.exec(w)) && "/" == w.charAt(w.length - n[0].length - 1);
            w = {
                architecture: 32,
                family: n && !W ? w.replace(n[0], "") : w,
                version: n ? n[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !W ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (n = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(U)) && !/\bi686\b/i.test(U) ? (w && (w.architecture = 64,
        w.family = w.family.replace(RegExp(" *" + n), "")),
        v && (/\bWOW64\b/i.test(a) || Q && /\w(?:86|32)$/.test(u.cpuClass || u.platform) && !/\bWin64; x64\b/i.test(a)) && t.unshift("32-bit")) : w && /^OS X/.test(w.family) && "Chrome" == v && 39 <= parseFloat(q) && (w.architecture = 64);
        a || (a = null);
        r = {};
        r.description = a;
        r.layout = A && A[0];
        r.manufacturer = K;
        r.name = v;
        r.prerelease = V;
        r.product = B;
        r.ua = a;
        r.version = v && q;
        r.os = w || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        r.parse = k;
        r.toString = function() {
            return this.description || ""
        }
        ;
        r.version && t.unshift(q);
        r.name && t.unshift(v);
        w && v && (w != String(w).split(" ")[0] || w != v.split(" ")[0] && !B) && t.push(B ? "(" + w + ")" : "on " + w);
        t.length && (r.description = t.join(" "));
        return r
    }
    var b = {
        "function": !0,
        object: !0
    }
      , d = b[typeof window] && window || this
      , t = b[typeof exports] && exports;
    b = b[typeof module] && module && !module.nodeType && module;
    var u = t && b && "object" == typeof global && global;
    !u || u.global !== u && u.window !== u && u.self !== u || (d = u);
    var r = Math.pow(2, 53) - 1
      , x = /\bOpera/;
    u = Object.prototype;
    var q = u.hasOwnProperty
      , z = u.toString
      , y = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (d.platform = y,
    define(function() {
        return y
    })) : t && b ? f(y, function(a, b) {
        t[b] = a
    }) : d.platform = y
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
        var c = document.createElement("meta");
        c.name = a[e].name;
        c.content = a[e].content;
        var f = window.document.head.querySelector('meta[name="' + c.name + '"]');
        f && f.parentNode.removeChild(f);
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
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && (buildIOSFullscreenPanel(),
    buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1, s_bIsIphone = !1;
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
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length; )
        if (navigator.platform === a.pop())
            return !0;
    return s_bIsIphone = !1
}
function getSize(a) {
    var e = a.toLowerCase()
      , c = window.document
      , f = c.documentElement;
    if (void 0 === window["inner" + a])
        a = f["client" + a];
    else if (window["inner" + a] != f["client" + a]) {
        var g = c.createElement("body");
        g.id = "vpw-test-b";
        g.style.cssText = "overflow:scroll";
        var m = c.createElement("div");
        m.id = "vpw-test-d";
        m.style.cssText = "position:absolute;top:-1000px";
        m.innerHTML = "<style>@media(" + e + ":" + f["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + e + ":7px!important}}</style>";
        g.appendChild(m);
        f.insertBefore(g, c.head);
        a = 7 == m["offset" + a] ? f["client" + a] : window["inner" + a];
        f.removeChild(g)
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
        var e = getSize("Width");
        _checkOrientation(e, a);
        var c = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH)
          , f = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var g = a - c;
            c += g;
            f += CANVAS_WIDTH / CANVAS_HEIGHT * g
        } else
            f < e && (g = e - f,
            f += g,
            c += CANVAS_HEIGHT / CANVAS_WIDTH * g);
        g = a / 2 - c / 2;
        var m = e / 2 - f / 2
          , h = CANVAS_WIDTH / f;
        if (m * h < -EDGEBOARD_X || g * h < -EDGEBOARD_Y)
            c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            f = Math.round(CANVAS_WIDTH * c),
            c = Math.round(CANVAS_HEIGHT * c),
            g = (a - c) / 2,
            m = (e - f) / 2,
            h = CANVAS_WIDTH / f;
        s_iOffsetX = -1 * m * h;
        s_iOffsetY = -1 * g * h;
        0 <= g && (s_iOffsetY = 0);
        0 <= m && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * f,
        s_oStage.canvas.height = 2 * c,
        canvas.style.width = f + "px",
        canvas.style.height = c + "px",
        e = Math.min(f / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_iScaleFactor = 2 * e,
        s_oStage.scaleX = s_oStage.scaleY = 2 * e) : s_bMobile && !1 === isIOS() ? ($("#canvas").css("width", f + "px"),
        $("#canvas").css("height", c + "px")) : (s_oStage.canvas.width = f,
        s_oStage.canvas.height = c,
        s_iScaleFactor = Math.min(f / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > g || (g = (a - c) / 2);
        $("#canvas").css("top", g + "px");
        $("#canvas").css("left", m + "px");
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
function createBitmap(a, e, c) {
    var f = new createjs.Bitmap(a)
      , g = new createjs.Shape;
    e && c ? g.graphics.beginFill("#fff").drawRect(0, 0, e, c) : g.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    f.hitArea = g;
    return f
}
function createSprite(a, e, c, f, g, m) {
    a = null !== e ? new createjs.Sprite(a,e) : new createjs.Sprite(a);
    e = new createjs.Shape;
    e.graphics.beginFill("#000000").drawRect(-c, -f, g, m);
    a.hitArea = e;
    return a
}
function randomFloatBetween(a, e, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(c))
}
function shuffle(a) {
    for (var e = a.length, c, f; 0 !== e; )
        f = Math.floor(Math.random() * e),
        --e,
        c = a[e],
        a[e] = a[f],
        a[f] = c;
    return a
}
function formatTime(a) {
    a /= 1E3;
    var e = Math.floor(a / 60);
    a = parseFloat(a - 60 * e).toFixed(1);
    var c = "";
    c = 10 > e ? c + ("0" + e + ":") : c + (e + ":");
    return 10 > a ? c + ("0" + a) : c + a
}
function rotateVector2D(a, e) {
    var c = e.getX() * Math.cos(a) + e.getY() * Math.sin(a)
      , f = e.getX() * -Math.sin(a) + e.getY() * Math.cos(a);
    e.set(c, f)
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
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
            3 === a.nodeType && (a = a.parentNode);
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", !0, !0);
            a.dispatchEvent(e)
        }
    }
};
function getUrlVars(a) {
    a = a.trim();
    var e = [];
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
        var f = a[c].split("=");
        e[f[0]] = f[1]
    }
    return e
}
function tryCheckLogin() {
    var a = checkLogin();
    a = getUrlVars(a);
    "true" === a.res ? (s_bLogged = !0,
    WHEEL_SETTINGS = a.bonus_prize.split("#"),
    s_oGameSettings.initSymbolWin(a.paytable),
    COIN_BET = a.coin_bet.split("#"),
    MAX_BET = parseFloat(COIN_BET[COIN_BET.length - 1]),
    MIN_BET = parseFloat(COIN_BET[0]),
    $(s_oMain).trigger("start_session"),
    s_oMenu.exitFromMenu()) : s_oMsgBox.show("can't login #" + a.desc)
}
function tryCallSpin(a, e, c) {
    a = callSpin(c, a, e);
    a = getUrlVars(a);
    if ("true" === a.res)
        s_oGame.onSpinReceived(a);
    else
        s_oMsgBox.show(a.desc)
}
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var e = window.location.search.substring(1).split("&"), c = 0; c < e.length; c++) {
        var f = e[c].split("=");
        if (f[0] == a)
            return f[1]
    }
}
function playSound(a, e, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(e),
    s_aSounds[a].loop(c),
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
        a.type in c ? document.body.className = c[a.type] : (document.body.className = this[e] ? "hidden" : "visible",
        "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var e = "hidden";
    e in document ? document.addEventListener("visibilitychange", a) : (e = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (e = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (e = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
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
    var a = {}, e, c, f, g, m, h;
    this.init = function(a, k, b) {
        e = {};
        f = c = 0;
        g = a;
        m = k;
        h = b
    }
    ;
    this.addSprite = function(f, g) {
        if (!a.hasOwnProperty(f)) {
            var b = new Image;
            a[f] = e[f] = {
                szPath: g,
                oSprite: b,
                bLoaded: !1
            };
            c++
        }
    }
    ;
    this.getSprite = function(c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        c = 0;
        m.call(h)
    }
    ;
    this._onSpriteLoaded = function() {
        g.call(h);
        ++f === c && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var a in e)
            e[a].oSprite.oSpriteLibrary = this,
            e[a].oSprite.szKey = a,
            e[a].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            e[a].oSprite.onerror = function(a) {
                var b = a.currentTarget;
                setTimeout(function() {
                    e[b.szKey].oSprite.src = e[b.szKey].szPath
                }, 500)
            }
            ,
            e[a].oSprite.src = e[a].szPath
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
var CANVAS_WIDTH = 1500, CANVAS_HEIGHT = 640, EDGEBOARD_X = 300, EDGEBOARD_Y = 0, FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, FONT_GAME = "rugamikaregular", FONT_PAYTABLE = "Arial", STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, GAME_STATE_IDLE = 0, GAME_STATE_SPINNING = 1, GAME_STATE_SHOW_ALL_WIN = 2, GAME_STATE_SHOW_WIN = 3, GAME_STATE_BONUS = 4, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, REEL_OFFSET_X = 380, REEL_OFFSET_Y = 84, NUM_REELS = 5, NUM_ROWS = 3, NUM_SYMBOLS = 10, WILD_SYMBOL = 8, BONUS_SYMBOL = 8, FREESPINS_SYMBOL = 9, NUM_PAYLINES = 20, SYMBOL_SIZE = 140, SPACE_BETWEEN_SYMBOLS = 10, MAX_FRAMES_REEL_EASE = 16, MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE, REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE, TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, COIN_BET, MIN_BET, MAX_BET, TOTAL_MONEY, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, FREESPIN_OCCURRENCE, BONUS_OCCURRENCE, FREESPIN_SYMBOL_NUM_OCCURR, NUM_FREESPIN, BONUS_PRIZE, BONUS_PRIZE_OCCURR, PAYTABLE_VALUES, BONUS_FREESPIN = 1, BONUS_WHEEL = 2, WHEEL_SETTINGS, SEGMENT_ROT = 18, TIME_ANIM_IDLE = 1E4, MIN_FAKE_SPIN = 3, WHEEL_SPIN_TIMESPEED = 2600, ANIM_SPIN_TIMESPEED = 50, TIME_ANIM_WIN = 5E3, ANIM_WIN1_TIMESPEED = 300, ANIM_WIN2_TIMESPEED = 50, LED_SPIN = 3, ANIM_IDLE1_TIMESPEED = 2E3, ANIM_IDLE2_TIMESPEED = 100, ANIM_IDLE3_TIMESPEED = 150, STATE_BONUS_IDLE = 0, STATE_BONUS_SPIN = 1, STATE_BONUS_WIN = 2, STATE_BONUS_LOSE = 3, NUM_SPIN_FOR_ADS, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS;
function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    }
    ;
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
            var e = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_SIZE,
                    height: SYMBOL_SIZE,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(e)
        }
    }
    ;
    this._initPaylines = function() {
        s_aPaylineCombo = [[{
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 0,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 0,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 1,
            col: 0
        }, {
            row: 0,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 0,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 1,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 0,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 0,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 1,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 0,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 0,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 1,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 1,
            col: 3
        }, {
            row: 1,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 0,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 0,
            col: 3
        }, {
            row: 0,
            col: 4
        }], [{
            row: 2,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 0,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 2,
            col: 4
        }], [{
            row: 0,
            col: 0
        }, {
            row: 2,
            col: 1
        }, {
            row: 2,
            col: 2
        }, {
            row: 2,
            col: 3
        }, {
            row: 0,
            col: 4
        }]]
    }
    ;
    this.initSymbolWin = function(a) {
        a = a.split("#");
        s_aSymbolWin = [];
        for (var e = 0; e < a.length; e++) {
            var c = a[e].split(",");
            s_aSymbolWin[e] = [];
            for (var f = 0; f < c.length; f++)
                s_aSymbolWin[e][f] = parseFloat(c[f])
        }
    }
    ;
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        var a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[1] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_9_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[8] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_10_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[9] = new createjs.SpriteSheet(a)
    }
    ;
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(1);
        for (a = 0; 2 > a; a++)
            s_aRandSymbols.push(2);
        for (a = 0; 3 > a; a++)
            s_aRandSymbols.push(3);
        for (a = 0; 4 > a; a++)
            s_aRandSymbols.push(4);
        for (a = 0; 4 > a; a++)
            s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++)
            s_aRandSymbols.push(6);
        for (a = 0; 6 > a; a++)
            s_aRandSymbols.push(7);
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(8);
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(9);
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(10)
    }
    ;
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_AUTOSPIN = "AUTO\nSPIN";
TEXT_WIN = "WIN";
TEXT_OK = "OK";
TEXT_STOP_AUTO = "STOP\nAUTO";
TEXT_HELP_WILD = "THIS SIMBOL IS A JOLLY WHICH \nCAN REPLACE ANY OTHER \nSYMBOL TO MAKE UP A COMBO";
TEXT_HELP_BONUS1 = "3 OR MORE ON ANY REELS, WILL TRIGGER WHEEL OF FORTUNE BONUS!!";
TEXT_HELP_BONUS2 = "CLICK SPIN BUTTON TO GET YOUR PRIZE!!";
TEXT_HELP_FREESPIN = "GET 3 OR MORE FREESPIN SYMBOL ON ANY REEL TO TRIGGER FREESPINS";
TEXT_BONUS_HELP = "SPIN THE WHEEL!!";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
var TEXT_PRELOADER_CONTINUE = "START";
TEXT_NO_MAX_BET = "NOT ENOUGH MONEY FOR MAX BET!!";
TEXT_CONNECTION_LOST = "CONNECTION DOWN! PLEASE TRY AGAIN";
TEXT_NOT_ENOUGH_MONEY = "NOT ENOUGH MONEY FOR THE CURRENT BET!";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_MSG_SHARE1 = "You collected <strong>";
TEXT_MSG_SHARE2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_MSG_SHARING1 = "My score is ";
TEXT_MSG_SHARING2 = " points! Can you do better?";
function CPreloader() {
    var a, e, c, f, g, m, h, l, k, b;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        b = new createjs.Container;
        s_oStage.addChild(b)
    }
    ;
    this.unload = function() {
        b.removeAllChildren();
        k.unload()
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
        var d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.addChild(d);
        d = s_oSpriteLibrary.getSprite("200x200");
        h = createBitmap(d);
        h.regX = .5 * d.width;
        h.regY = .5 * d.height;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 180;
        b.addChild(h);
        l = new createjs.Shape;
        l.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
        b.addChild(l);
        h.mask = l;
        d = s_oSpriteLibrary.getSprite("progress_bar");
        f = createBitmap(d);
        f.x = CANVAS_WIDTH / 2 - d.width / 2;
        f.y = CANVAS_HEIGHT / 2 + 50;
        b.addChild(f);
        a = d.width;
        e = d.height;
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, 1, e);
        b.addChild(g);
        f.mask = g;
        c = new createjs.Text("","30px " + FONT_GAME,"#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 100;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        b.addChild(c);
        d = s_oSpriteLibrary.getSprite("but_start");
        k = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2,d,TEXT_PRELOADER_CONTINUE,"Arial","#000",40,b);
        k.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        k.setVisible(!1);
        m = new createjs.Shape;
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.addChild(m);
        createjs.Tween.get(m).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(m);
            b.removeChild(m)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(b) {
        c.text = b + "%";
        100 === b && (s_oMain._onRemovePreloader(),
        c.visible = !1,
        f.visible = !1);
        g.graphics.clear();
        b = Math.floor(b * a / 100);
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, b, e)
    }
    ;
    this._init()
}
function CMain(a) {
    var e, c = 0, f = 0, g = STATE_LOADING, m, h;
    this.initContainer = function() {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        s_oAttachSection = new createjs.Container;
        s_oStage.addChild(s_oAttachSection);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        m = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        e = !0
    }
    ;
    this.soundLoaded = function() {
        c++;
        m.refreshLoader(Math.floor(c / f * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
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
            filename: "reels",
            loop: !1,
            volume: 1,
            ingamename: "reels"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over_bonus",
            loop: !1,
            volume: 1,
            ingamename: "game_over_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_bonus",
            loop: !1,
            volume: 1,
            ingamename: "reel_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel_bonus",
            loop: !1,
            volume: 1,
            ingamename: "start_reel_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win_bonus",
            loop: !1,
            volume: 1,
            ingamename: "win_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel"
        });
        f += s_aSoundsInfo.length;
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
                    for (var d = 0; d < s_aSoundsInfo.length; d++)
                        if (a === s_aSounds[s_aSoundsInfo[d].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[d], !0);
                            break
                        }
                },
                onplayerror: function(a) {
                    for (var b = 0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[b].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[b].ingamename].play()
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
        s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("but_autospin", "./sprites/but_autospin.png");
        s_oSpriteLibrary.addSprite("spin_bg", "./sprites/spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_arrow_next", "./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev", "./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("freespin_panel", "./sprites/freespin_panel.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("logo_freespin", "./sprites/logo_freespin.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        for (var a = 1; a < NUM_SYMBOLS + 1; a++)
            s_oSpriteLibrary.addSprite("symbol_" + a, "./sprites/symbol_" + a + ".png"),
            s_oSpriteLibrary.addSprite("symbol_" + a + "_anim", "./sprites/symbol_" + a + "_anim.png");
        for (a = 1; a < NUM_PAYLINES + 1; a++)
            s_oSpriteLibrary.addSprite("payline_" + a, "./sprites/payline_" + a + ".png");
        s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.png");
        s_oSpriteLibrary.addSprite("but_spin_bonus", "./sprites/bonus/but_spin_bonus.png");
        s_oSpriteLibrary.addSprite("leds", "./sprites/bonus/leds.png");
        s_oSpriteLibrary.addSprite("wheel", "./sprites/bonus/wheel.png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        c++;
        m.refreshLoader(Math.floor(c / f * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this._onRemovePreloader = function() {
        s_oGameSettings = new CSlotSettings;
        s_oMsgBox = new CMsgBox;
        m.unload();
        WIN_OCCURRENCE = l.win_occurrence;
        MIN_REEL_LOOPS = l.min_reel_loop;
        REEL_DELAY = l.reel_delay;
        TIME_SHOW_WIN = l.time_show_win;
        TIME_SHOW_ALL_WINS = l.time_show_all_wins;
        SLOT_CASH = l.slot_cash;
        TOTAL_MONEY = parseFloat(l.money);
        FREESPIN_OCCURRENCE = l.freespin_occurrence;
        BONUS_OCCURRENCE = l.bonus_occurrence;
        FREESPIN_SYMBOL_NUM_OCCURR = l.freespin_symbol_num_occur;
        NUM_FREESPIN = l.num_freespin;
        BONUS_PRIZE = l.bonus_prize;
        BONUS_PRIZE_OCCURR = l.bonus_prize_occur;
        COIN_BET = l.coin_bet;
        NUM_SPIN_FOR_ADS = a.num_spin_ads_showing;
        PAYTABLE_VALUES = [];
        for (var c = 0; 7 > c; c++)
            PAYTABLE_VALUES[c] = a["paytable_symbol_" + (c + 1)];
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        g = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        h = new CGame(l);
        g = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        g = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        e = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        e = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    }
    ;
    this._update = function(a) {
        if (!1 !== e) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            g === STATE_GAME && h.update();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    var l = a;
    ENABLE_FULLSCREEN = l.fullscreen;
    ENABLE_CHECK_ORIENTATION = l.check_orientation;
    SHOW_CREDITS = l.show_credits;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_bFullscreen = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oAttachSection, s_oMain, s_oSpriteLibrary, s_bLogged = !1, s_oMsgBox, s_oGameSettings;
function CTextButton(a, e, c, f, g, m, h, l) {
    var k, b, d, t, u, r, x, q, z, y;
    this._init = function(a, c, f, e, g, r, h) {
        k = !1;
        b = 1;
        d = [];
        t = [];
        y = createBitmap(f);
        q = new createjs.Container;
        q.x = a;
        q.y = c;
        q.regX = f.width / 2;
        q.regY = f.height / 2;
        s_bMobile || (q.cursor = "pointer");
        q.addChild(y, z);
        l.addChild(q);
        z = new CTLText(q,10,10,f.width - 20,f.height - 20,h,"center",r,g,1,5,10,e,!0,!0,!0,!1);
        z.setShadow("#000", 2, 2, 2);
        this._initListener()
    }
    ;
    this.unload = function() {
        q.off("mousedown", u);
        q.off("pressup", r);
        l.removeChild(q)
    }
    ;
    this.setVisible = function(a) {
        q.visible = a
    }
    ;
    this.setAlign = function(a) {
        z.textAlign = a
    }
    ;
    this.setTextX = function(a) {
        z.x = a
    }
    ;
    this.setScale = function(a) {
        b = q.scaleX = q.scaleY = a
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
        u = q.on("mousedown", this.buttonDown);
        r = q.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        d[a] = b;
        t[a] = c
    }
    ;
    this.addEventListenerWithParams = function(a, b, c, f) {
        d[a] = b;
        t[a] = c;
        x = f
    }
    ;
    this.buttonRelease = function() {
        k || (q.scaleX = b,
        q.scaleY = b,
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(t[ON_MOUSE_UP], x))
    }
    ;
    this.buttonDown = function() {
        k || (q.scaleX = .9 * b,
        q.scaleY = .9 * b,
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(t[ON_MOUSE_DOWN]))
    }
    ;
    this.setPosition = function(a, b) {
        q.x = a;
        q.y = b
    }
    ;
    this.tweenPosition = function(a, b, d, c, f, e, g) {
        createjs.Tween.get(q).wait(c).to({
            x: a,
            y: b
        }, d, f).call(function() {
            void 0 !== e && e.call(g)
        })
    }
    ;
    this.setText = function(a) {
        z.refreshText(a)
    }
    ;
    this.setX = function(a) {
        q.x = a
    }
    ;
    this.setY = function(a) {
        q.y = a
    }
    ;
    this.getButtonImage = function() {
        return q
    }
    ;
    this.getX = function() {
        return q.x
    }
    ;
    this.getY = function() {
        return q.y
    }
    ;
    this.getSprite = function() {
        return q
    }
    ;
    this.getText = function() {
        return z.getString()
    }
    ;
    this.getScale = function() {
        return q.scaleX
    }
    ;
    this._init(a, e, c, f, g, m, h)
}
function CGfxButton(a, e, c, f) {
    var g, m, h = [], l, k, b;
    this._init = function(a, c, f) {
        g = [];
        m = [];
        b = createBitmap(f);
        b.x = a;
        b.y = c;
        b.regX = f.width / 2;
        b.regY = f.height / 2;
        s_bMobile || (b.cursor = "pointer");
        d.addChild(b);
        this._initListener()
    }
    ;
    this.unload = function() {
        b.off("mousedown", l);
        b.off("pressup", k);
        d.removeChild(b)
    }
    ;
    this.setVisible = function(a) {
        b.visible = a
    }
    ;
    this._initListener = function() {
        l = b.on("mousedown", this.buttonDown);
        k = b.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, d) {
        g[a] = b;
        m[a] = d
    }
    ;
    this.addEventListenerWithParams = function(a, b, d, c) {
        g[a] = b;
        m[a] = d;
        h = c
    }
    ;
    this.buttonRelease = function() {
        playSound("press_but", 1, !1);
        b.scaleX = 1;
        b.scaleY = 1;
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(m[ON_MOUSE_UP], h)
    }
    ;
    this.buttonDown = function() {
        b.scaleX = .9;
        b.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], h)
    }
    ;
    this.setPosition = function(a, d) {
        b.x = a;
        b.y = d
    }
    ;
    this.setX = function(a) {
        b.x = a
    }
    ;
    this.setY = function(a) {
        b.y = a
    }
    ;
    this.getButtonImage = function() {
        return b
    }
    ;
    this.getX = function() {
        return b.x
    }
    ;
    this.getY = function() {
        return b.y
    }
    ;
    var d = f;
    this._init(a, e, c);
    return this
}
function CToggle(a, e, c, f, g) {
    var m, h, l, k, b, d, t;
    this._init = function(a, b, d, c, f) {
        t = void 0 !== f ? f : s_oStage;
        h = [];
        l = [];
        f = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        m = c;
        k = createSprite(f, "state_" + m, d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        k.x = a;
        k.y = b;
        k.stop();
        s_bMobile || (k.cursor = "pointer");
        t.addChild(k);
        this._initListener()
    }
    ;
    this.unload = function() {
        k.off("mousedown", b);
        k.off("pressup", d);
        t.removeChild(k)
    }
    ;
    this._initListener = function() {
        b = k.on("mousedown", this.buttonDown);
        d = k.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, d) {
        h[a] = b;
        l[a] = d
    }
    ;
    this.setCursorType = function(a) {
        k.cursor = a
    }
    ;
    this.setActive = function(a) {
        m = a;
        k.gotoAndStop("state_" + m)
    }
    ;
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        playSound("press_but", 1, !1);
        m = !m;
        k.gotoAndStop("state_" + m);
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(l[ON_MOUSE_UP], m)
    }
    ;
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    }
    ;
    this._init(a, e, c, f, g)
}
function CBetBut(a, e, c) {
    var f, g, m, h = [], l;
    this._init = function(a, b, d) {
        f = !1;
        g = [];
        m = [];
        d = s_oSpriteLibrary.getSprite("bet_but");
        var c = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        l = createSprite(c, "on", 0, 0, d.width / 2, d.height);
        l.stop();
        l.x = a;
        l.y = b;
        l.regX = d.width / 2;
        l.regY = d.height / 2;
        s_oAttachSection.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        l.off("mousedown", this.buttonDown);
        l.off("pressup", this.buttonRelease);
        s_oAttachSection.removeChild(l)
    }
    ;
    this.disable = function(a) {
        f = a
    }
    ;
    this.setVisible = function(a) {
        l.visible = a
    }
    ;
    this.setOn = function() {
        l.gotoAndStop("on")
    }
    ;
    this.setOff = function() {
        l.gotoAndStop("off")
    }
    ;
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, d) {
        g[a] = b;
        m[a] = d
    }
    ;
    this.addEventListenerWithParams = function(a, b, d, c) {
        g[a] = b;
        m[a] = d;
        h = c
    }
    ;
    this.buttonRelease = function() {
        g[ON_MOUSE_UP] && !1 === f && (playSound("press_but", 1, !1),
        g[ON_MOUSE_UP].call(m[ON_MOUSE_UP], h))
    }
    ;
    this.buttonDown = function() {
        g[ON_MOUSE_DOWN] && !1 === f && g[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], h)
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
    this._init(a, e, c)
}
function CMenu() {
    var a, e, c, f, g, m, h = null, l = null, k, b, d, t, u, r;
    this._init = function() {
        d = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oAttachSection.addChild(d);
        var x = s_oSpriteLibrary.getSprite("but_bg");
        t = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 164,x,TEXT_PLAY,FONT_GAME,"#ffffff",40,s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            x = s_oSpriteLibrary.getSprite("audio_icon"),
            g = CANVAS_WIDTH - x.width / 4 - 10,
            m = x.height / 2 + 10,
            u = new CToggle(g,m,x,s_bAudioActive,s_oAttachSection),
            u.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (x = s_oSpriteLibrary.getSprite("but_credits"),
        a = x.height / 2 + 10,
        e = x.height / 2 + 10,
        k = new CGfxButton(a,e,x,s_oAttachSection),
        k.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        c = a + x.width,
        f = e) : (c = x.height / 2 + 10,
        f = x.height / 2 + 10);
        x = window.document;
        var q = x.documentElement;
        h = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        l = x.exitFullscreen || x.mozCancelFullScreen || x.webkitExitFullscreen || x.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (h = !1);
        h && screenfull.isEnabled && (x = s_oSpriteLibrary.getSprite("but_fullscreen"),
        b = new CToggle(c,f,x,s_bFullscreen,s_oAttachSection),
        b.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        r = new createjs.Shape;
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oAttachSection.addChild(r);
        createjs.Tween.get(r).to({
            alpha: 0
        }, 400).call(function() {
            r.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        t.unload();
        t = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            u.unload(),
            u = null;
        SHOW_CREDITS && k.unload();
        h && screenfull.isEnabled && b.unload();
        s_oAttachSection.removeChild(d);
        d = null;
        s_oAttachSection.removeChild(r);
        s_oMenu = r = null
    }
    ;
    this.refreshButtonPos = function(d, r) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || u.setPosition(g - d, r + m);
        SHOW_CREDITS && k.setPosition(a + d, e + r);
        h && screenfull.isEnabled && b.setPosition(c + d, f + r)
    }
    ;
    this._onButPlayRelease = function() {
        tryCheckLogin()
    }
    ;
    this.exitFromMenu = function() {
        this.unload();
        s_oMain.gotoGame()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    }
    ;
    this.resetFullscreenBut = function() {
        h && screenfull.isEnabled && b.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? l.call(window.document) : h.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var e = !1, c = !1, f, g, m, h, l, k, b, d, t, u, r, x, q, z, y, H, I, L, C, J, E, P, F, R, G, D, M, S, p, N = null, O;
    this._init = function() {
        g = GAME_STATE_IDLE;
        I = l = m = 0;
        P = [0, 1, 2, 3, 4];
        h = P[0];
        k = NUM_PAYLINES;
        r = TOTAL_MONEY;
        t = MIN_BET;
        u = t * k;
        f = !1;
        L = z = q = 0;
        s_oTweenController = new CTweenController;
        R = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oAttachSection.addChild(R);
        this._initReels();
        S = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oAttachSection.addChild(S);
        G = new createjs.Bitmap(s_oSpriteLibrary.getSprite("logo"));
        G.x = 590;
        G.y = 0;
        s_oAttachSection.addChild(G);
        D = new createjs.Bitmap(s_oSpriteLibrary.getSprite("logo_freespin"));
        D.x = 590;
        D.y = 0;
        D.visible = !1;
        s_oAttachSection.addChild(D);
        M = new createjs.Bitmap(s_oSpriteLibrary.getSprite("freespin_panel"));
        M.x = 940;
        M.y = 3;
        M.visible = !1;
        s_oAttachSection.addChild(M);
        p = new CInterface(t,u,r);
        this._initStaticSymbols();
        N = new CPayTablePanel;
        r < u && p.disableSpin(f);
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
        for (var a = 0; a < s_aSymbolWin.length; a++)
            for (var b = s_aSymbolWin[a], d = 0; d < b.length; d++)
                0 !== b[d] && b[d] < MIN_WIN && (MIN_WIN = b[d]);
        O = new CBonusPanel;
        e = !0
    }
    ;
    this.unload = function() {
        stopSound("reels");
        p.unload();
        N.unload();
        for (var a = 0; a < C.length; a++)
            C[a].unload();
        for (a = 0; a < NUM_ROWS; a++)
            for (var b = 0; b < NUM_REELS; b++)
                J[a][b].unload();
        s_oAttachSection.removeAllChildren()
    }
    ;
    this._initReels = function() {
        var a = REEL_OFFSET_X
          , b = REEL_OFFSET_Y
          , d = 0;
        C = [];
        for (var c = 0; c < NUM_REELS; c++)
            C[c] = new CReelColumn(c,a,b,d),
            C[c + NUM_REELS] = new CReelColumn(c + NUM_REELS,a,b + SYMBOL_SIZE * NUM_ROWS,d),
            a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS,
            d += REEL_DELAY
    }
    ;
    this._initStaticSymbols = function() {
        var a = REEL_OFFSET_X
          , b = REEL_OFFSET_Y;
        J = [];
        for (var d = 0; d < NUM_ROWS; d++) {
            J[d] = [];
            for (var c = 0; c < NUM_REELS; c++) {
                var f = new CStaticSymbolCell(d,c,a,b);
                J[d][c] = f;
                a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            a = REEL_OFFSET_X;
            b += SYMBOL_SIZE
        }
    }
    ;
    this.generateLosingPattern = function() {
        for (var a = [], b = 0; b < NUM_ROWS; b++) {
            var d = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            d = s_aRandSymbols[d];
            a[b] = d
        }
        F = [];
        for (b = 0; b < NUM_ROWS; b++) {
            F[b] = [];
            for (var f = 0; f < NUM_REELS; f++)
                if (0 === f)
                    F[b][f] = a[b];
                else {
                    do
                        d = Math.floor(Math.random() * (s_aRandSymbols.length - 2)),
                        d = s_aRandSymbols[d];
                    while (a[0] === d || a[1] === d || a[2] === d);
                    F[b][f] = d
                }
        }
        E = [];
        c = !0
    }
    ;
    this._generateRandSymbols = function() {
        for (var a = [], b = 0; b < NUM_ROWS; b++)
            a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return a
    }
    ;
    this.reelArrived = function(a, b) {
        if (m > MIN_REEL_LOOPS)
            if (h === b) {
                if (!1 === C[a].isReadyToStop()) {
                    var d = a;
                    a < NUM_REELS ? (d += NUM_REELS,
                    C[d].setReadyToStop(),
                    C[a].restart([F[0][a], F[1][a], F[2][a]], !0)) : (d -= NUM_REELS,
                    C[d].setReadyToStop(),
                    C[a].restart([F[0][d], F[1][d], F[2][d]], !0))
                }
            } else
                C[a].restart(this._generateRandSymbols(), !1);
        else
            C[a].restart(this._generateRandSymbols(), !1),
            c && 0 === a && m++
    }
    ;
    this.stopNextReel = function() {
        l++;
        0 === l % 2 && (playSound("reel_stop", 1, !1),
        h = P[l / 2],
        l === 2 * NUM_REELS && this._endReelAnimation())
    }
    ;
    this._endReelAnimation = function() {
        stopSound("reels");
        c = !1;
        l = m = 0;
        h = P[0];
        0 < z && (p.disableSpin(f),
        p.disableGuiButtons(!1));
        !1 === M.visible && 0 === q || p.refreshFreeSpinNum(q);
        if (0 < E.length) {
            for (var a = 0; a < E.length; a++) {
                0 < E[a].line && (N.highlightCombo(E[a].value - 1, E[a].num_win),
                p.showLine(E[a].line));
                for (var d = E[a].list, e = 0; e < d.length; e++)
                    J[d[e].row][d[e].col].show(d[e].value),
                    C[d[e].col].setVisible(d[e].row, !1),
                    C[d[e].col + NUM_REELS].setVisible(d[e].row, !1)
            }
            0 < q ? (G.visible = !1,
            D.visible = !0,
            M.visible = !0) : (G.visible = !0,
            D.visible = !1,
            M.visible = !1,
            p.refreshFreeSpinNum(""));
            0 < x && p.refreshWinText(x);
            b = 0;
            g = GAME_STATE_SHOW_ALL_WIN;
            playSound("win", .3, !1);
            z !== BONUS_WHEEL && p.refreshMoney(r)
        } else
            0 < q ? (G.visible = !1,
            D.visible = !0,
            M.visible = !0,
            p.disableSpin(f),
            this.onSpin()) : (G.visible = !0,
            D.visible = !1,
            M.visible = !1,
            p.refreshFreeSpinNum(""),
            f ? r < u && 0 === q ? (this.resetCoinBet(),
            f = !1,
            p.enableGuiButtons()) : (p.enableAutoSpin(),
            this.onSpin()) : g = GAME_STATE_IDLE);
        r < u && 0 === q ? (this.resetCoinBet(),
        f = !1,
        p.enableGuiButtons()) : f || 0 !== q || 0 !== z || (p.enableGuiButtons(),
        p.disableBetBut(!1));
        L++;
        L === NUM_SPIN_FOR_ADS && (L = 0,
        $(s_oMain).trigger("show_interlevel_ad"));
        $(s_oMain).trigger("save_score", r)
    }
    ;
    this.hidePayTable = function() {
        N.hide()
    }
    ;
    this._showWin = function() {
        if (0 < d) {
            stopSound("win");
            var a = E[d - 1].line;
            0 < a && p.hideLine(a);
            a = E[d - 1].list;
            for (var b = 0; b < a.length; b++)
                J[a[b].row][a[b].col].stopAnim(),
                C[a[b].col].setVisible(a[b].row, !0),
                C[a[b].col + NUM_REELS].setVisible(a[b].row, !0)
        }
        if (d === E.length) {
            d = 0;
            if (0 < q) {
                p.disableSpin(f);
                this.onSpin();
                return
            }
            if (z === BONUS_WHEEL)
                O.show(y, H),
                g = GAME_STATE_BONUS;
            else if (f) {
                p.enableAutoSpin();
                this.onSpin();
                return
            }
        }
        a = E[d].line;
        0 < a && p.showLine(a);
        a = E[d].list;
        for (b = 0; b < a.length; b++)
            J[a[b].row][a[b].col].show(a[b].value),
            C[a[b].col].setVisible(a[b].row, !1),
            C[a[b].col + NUM_REELS].setVisible(a[b].row, !1);
        d++
    }
    ;
    this._hideAllWins = function() {
        for (var a = 0; a < E.length; a++)
            for (var c = E[a].list, f = 0; f < c.length; f++)
                J[c[f].row][c[f].col].stopAnim(),
                C[c[f].col].setVisible(c[f].row, !0),
                C[c[f].col + NUM_REELS].setVisible(c[f].row, !0);
        p.hideAllLines();
        d = b = 0;
        b = TIME_SHOW_WIN;
        g = GAME_STATE_SHOW_WIN
    }
    ;
    this.activateLines = function(a) {
        k = a;
        this.removeWinShowing();
        u = a = t * k;
        p.refreshTotalBet(u);
        p.refreshNumLines(k);
        a > r ? p.disableSpin(f) : p.enableSpin()
    }
    ;
    this.addLine = function() {
        k === NUM_PAYLINES ? k = 1 : k++;
        var a = t * k;
        u = a = parseFloat(a.toFixed(2));
        p.refreshTotalBet(u);
        p.refreshNumLines(k);
        p.enableSpin()
    }
    ;
    this.resetCoinBet = function() {
        I = 0;
        var a = parseFloat(COIN_BET[I])
          , b = a * k;
        t = a;
        t = Math.floor(100 * t) / 100;
        u = b;
        p.refreshBet(t);
        p.refreshTotalBet(u);
        p.enableSpin()
    }
    ;
    this.changeCoinBet = function() {
        I++;
        I === COIN_BET.length && (I = 0);
        var a = parseFloat(COIN_BET[I])
          , b = a * k;
        b = parseFloat(b.toFixed(2));
        t = a;
        t = Math.floor(100 * t) / 100;
        u = b;
        p.refreshBet(t);
        p.refreshTotalBet(u);
        p.enableSpin()
    }
    ;
    this.onMaxBet = function() {
        if (r < MAX_BET * NUM_PAYLINES)
            s_oMsgBox.show(TEXT_NO_MAX_BET);
        else {
            var a = MAX_BET;
            k = NUM_PAYLINES;
            a *= k;
            t = MAX_BET;
            u = a;
            p.refreshBet(t);
            p.refreshTotalBet(u);
            p.refreshNumLines(k);
            a > r ? p.disableSpin(f) : (p.enableSpin(),
            this.onSpin())
        }
    }
    ;
    this.removeWinShowing = function() {
        N.resetHighlightCombo();
        p.resetWin();
        for (var a = 0; a < NUM_ROWS; a++)
            for (var b = 0; b < NUM_REELS; b++)
                J[a][b].hide(),
                C[b].setVisible(a, !0),
                C[b + NUM_REELS].setVisible(a, !0);
        for (a = 0; a < C.length; a++)
            C[a].activate();
        g = GAME_STATE_IDLE
    }
    ;
    this.onSpin = function() {
        r < u && 0 === q ? (p.enableGuiButtons(),
        f = !1,
        s_oMsgBox.show(TEXT_NOT_ENOUGH_MONEY)) : (stopSound("win"),
        playSound("reels", 1, !1),
        p.disableBetBut(!0),
        this.removeWinShowing(),
        !0 === s_bLogged ? (u = D.visible ? 0 : t * k,
        tryCallSpin(t, u, k)) : this.generateLosingPattern(),
        p.hideAllLines(),
        p.disableGuiButtons(f))
    }
    ;
    this.onAutoSpin = function() {
        f = !0;
        this.onSpin()
    }
    ;
    this.onStopAutoSpin = function() {
        f = !1;
        g !== GAME_STATE_SPINNING && g !== GAME_STATE_BONUS && p.enableGuiButtons()
    }
    ;
    this.generateLosingPattern = function() {
        for (var a = [], b = 0; b < NUM_ROWS; b++) {
            var d = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            d = s_aRandSymbols[d];
            a[b] = d
        }
        F = [];
        for (b = 0; b < NUM_ROWS; b++) {
            F[b] = [];
            for (var f = 0; f < NUM_REELS; f++)
                if (0 === f)
                    F[b][f] = a[b];
                else {
                    do
                        d = Math.floor(Math.random() * (s_aRandSymbols.length - 2)),
                        d = s_aRandSymbols[d];
                    while (a[0] === d || a[1] === d || a[2] === d);
                    F[b][f] = d
                }
        }
        E = [];
        c = !0
    }
    ;
    this.onSpinReceived = function(a) {
        r -= u;
        p.refreshMoney(r);
        g = GAME_STATE_SPINNING;
        "true" === a.res ? (q = parseInt(a.freespin),
        "true" === a.win ? (F = JSON.parse(a.pattern),
        E = JSON.parse(a.win_lines),
        0 < parseInt(a.freespin) ? z = BONUS_FREESPIN : 0 < parseInt(a.bonus) ? (z = BONUS_WHEEL,
        y = a.bonus_prize,
        H = a.bonus_win) : z = 0,
        x = parseFloat(a.tot_win)) : (z = 0,
        F = JSON.parse(a.pattern),
        E = []),
        c = !0,
        r = parseFloat(a.money)) : s_oGame.generateLosingPattern()
		
    }
    ;
    this.onInfoClicked = function() {
        g !== GAME_STATE_SPINNING && (N.isVisible() ? N.hide() : N.show())
    }
    ;
    this.onConnectionLost = function() {
        s_oMsgBox.show(TEXT_CONNECTION_LOST);
        p.enableGuiButtons()
    }
    ;
    this.exitFromBonus = function() {
        $(s_oMain).trigger("bonus_end", r);
        p.refreshMoney(r);
        f ? (p.enableAutoSpin(),
        this.onSpin()) : (p.enableGuiButtons(),
        p.disableBetBut(!1),
        p.enableSpin());
        $(s_oMain).trigger("save_score", r)
    }
    ;
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", {
            img: "200x200.jpg",
            title: TEXT_CONGRATULATIONS,
            msg: TEXT_MSG_SHARE1 + r + TEXT_MSG_SHARE2,
            msg_share: TEXT_MSG_SHARING1 + r + TEXT_MSG_SHARING2
        })
    }
    ;
    this.getState = function() {
        return g
    }
    ;
    this.update = function() {
        if (!1 !== e)
            switch (g) {
            case GAME_STATE_SPINNING:
                for (var a = 0; a < C.length; a++)
                    C[a].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                b += s_iTimeElaps;
                b > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                b += s_iTimeElaps;
                b > TIME_SHOW_WIN && (b = 0,
                this._showWin());
                break;
            case GAME_STATE_BONUS:
                O.update()
            }
    }
    ;
    s_oGame = this;
    this._init()
}
var s_oGame, s_oTweenController;
function CReelColumn(a, e, c, f) {
    var g, m, h, l, k, b, d, t, u, r, x, q, z, y;
    this._init = function(a, c, f, e) {
        h = m = g = !1;
        d = 0;
        l = a;
        b = e;
        k = l < NUM_REELS ? l : l - NUM_REELS;
        u = 0;
        r = MAX_FRAMES_REEL_EASE;
        t = REEL_STATE_START;
        x = f;
        q = x + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(c, f)
    }
    ;
    this.initContainer = function(a, b) {
        y = new createjs.Container;
        y.x = a;
        y.y = b;
        var d = 0;
        z = [];
        for (var c = 0; c < NUM_ROWS; c++) {
            var f = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            f.stop();
            f.x = 0;
            f.y = d;
            y.addChild(f);
            z[c] = f;
            d += SYMBOL_SIZE
        }
        s_oAttachSection.addChild(y)
    }
    ;
    this.unload = function() {
        s_oAttachSection.removeChild(y)
    }
    ;
    this.activate = function() {
        x = y.y;
        q = x + SYMBOL_SIZE * NUM_ROWS;
        g = !0
    }
    ;
    this._setSymbol = function(a) {
        y.removeAllChildren();
        for (var b = 0, d = 0; d < a.length; d++) {
            var c = new createjs.Sprite(s_aSymbolData[a[d]],"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
            c.stop();
            c.x = 0;
            c.y = b;
            y.addChild(c);
            z[d] = c;
            b += SYMBOL_SIZE
        }
    }
    ;
    this.setVisible = function(a, b) {
        z[a].visible = b
    }
    ;
    this.restart = function(a, b) {
        y.y = x = REEL_START_Y;
        q = x + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(a);
        if (m = b) {
            u = 0;
            r = MAX_FRAMES_REEL_EASE;
            t = REEL_STATE_STOP;
            for (var d = 0; d < NUM_ROWS; d++)
                z[d].gotoAndStop("static");
            h = !0
        } else
            for (d = 0; d < NUM_ROWS; d++)
                z[d].gotoAndStop("moving")
    }
    ;
    this.setReadyToStop = function() {
        u = 0;
        r = MAX_FRAMES_REEL_EASE;
        t = REEL_STATE_STOP
    }
    ;
    this.isReadyToStop = function() {
        return m
    }
    ;
    this._updateStart = function() {
        0 === u && l < NUM_REELS && playSound("start_reel", 1, !1);
        u++;
        u > r && (u = 0,
        r /= 2,
        t++,
        x = y.y,
        q = x + SYMBOL_SIZE * NUM_ROWS);
        var a = s_oTweenController.easeInBack(u, 0, 1, r);
        a = s_oTweenController.tweenValue(x, q, a);
        y.y = a
    }
    ;
    this._updateMoving = function() {
        u++;
        u > r && (u = 0,
        x = y.y,
        q = x + SYMBOL_SIZE * NUM_ROWS);
        var a = s_oTweenController.easeLinear(u, 0, 1, r);
        a = s_oTweenController.tweenValue(x, q, a);
        y.y = a
    }
    ;
    this._updateStopping = function() {
        u++;
        if (u >= r)
            g = !1,
            u = 0,
            r = MAX_FRAMES_REEL_EASE,
            t = REEL_STATE_START,
            d = 0,
            m = !1,
            h && (h = !1,
            y.y = REEL_OFFSET_Y),
            s_oGame.stopNextReel();
        else {
            var a = s_oTweenController.easeOutCubic(u, 0, 1, r);
            a = s_oTweenController.tweenValue(x, q, a);
            y.y = a
        }
    }
    ;
    this.update = function() {
        if (!1 !== g && (d++,
        d > b))
            switch (!1 === m && y.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(l, k),
            t) {
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
    this._init(a, e, c, f)
}
function CInterface(a, e, c) {
    var f, g, m, h, l, k, b, d, t, u, r, x, q, z, y, H, I, L = null, C = null, J, E, P, F, R, G;
    this._init = function(a, c, e) {
        var p = s_oSpriteLibrary.getSprite("but_exit");
        f = CANVAS_WIDTH - p.width / 2 - 2;
        g = p.height / 2 + 2;
        t = new CGfxButton(f,g,p,s_oAttachSection);
        t.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (p = s_oSpriteLibrary.getSprite("audio_icon"),
        l = f - p.width / 2 - 2,
        k = p.height / 2 + 2,
        z = new CToggle(l,k,p,s_bAudioActive,s_oAttachSection),
        z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        m = l - p.width / 2 - 2) : (p = s_oSpriteLibrary.getSprite("but_fullscreen"),
        m = f - p.width / 2 - 2);
        h = p.height / 2 + 2;
        p = window.document;
        var D = p.documentElement;
        L = D.requestFullscreen || D.mozRequestFullScreen || D.webkitRequestFullScreen || D.msRequestFullscreen;
        C = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (L = !1);
        L && (p = s_oSpriteLibrary.getSprite("but_fullscreen"),
        I = new CToggle(m,h,p,s_bFullscreen,s_oAttachSection),
        I.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        p = createBitmap(s_oSpriteLibrary.getSprite("spin_bg"));
        p.x = 1040;
        p.y = 551;
        s_oAttachSection.addChild(p);
        p = s_oSpriteLibrary.getSprite("but_autospin");
        r = new CTextButton(1030 + p.width / 2,595,p,TEXT_AUTOSPIN,FONT_GAME,"#ffffff",22,s_oAttachSection);
        r.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
        p = s_oSpriteLibrary.getSprite("spin_but");
        u = new CTextButton(1111 + p.width / 2,595,p,TEXT_SPIN,FONT_GAME,"#ffffff",26,s_oAttachSection);
        u.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        p = s_oSpriteLibrary.getSprite("info_but");
        x = new CTextButton(296 + p.width / 2,595,p,TEXT_INFO,FONT_GAME,"#ffffff",30,s_oAttachSection);
        x.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        p = s_oSpriteLibrary.getSprite("but_lines_bg");
        q = new CTextButton(436 + p.width / 2,595,p,TEXT_LINES,FONT_GAME,"#ffffff",30,s_oAttachSection);
        q.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        p = s_oSpriteLibrary.getSprite("coin_but");
        y = new CTextButton(620 + p.width / 2,595,p,TEXT_COIN,FONT_GAME,"#ffffff",30,s_oAttachSection);
        y.addEventListener(ON_MOUSE_UP, this._onBet, this);
        p = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        H = new CTextButton(805 + p.width / 2,595,p,TEXT_MAX_BET,FONT_GAME,"#ffffff",30,s_oAttachSection);
        H.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        E = new CTLText(s_oAttachSection,341,20,128,50,24,"center","#ffde00",FONT_GAME,1,0,0,TEXT_MONEY + "\n" + e.toFixed(2) + TEXT_CURRENCY,!0,!0,!0,!1);
		F = new CTLText(s_oAttachSection,460,CANVAS_HEIGHT - 118,134,30,30,"center","#ffffff",FONT_GAME,1,0,0,NUM_PAYLINES,!0,!0,!1,!1);
        F.setShadow("#000", 1, 1, 2);
        J = new CTLText(s_oAttachSection,644,CANVAS_HEIGHT - 118,134,30,30,"center","#ffffff",FONT_GAME,1,0,0,a.toFixed(2),!0,!0,!1,!1);
        J.setShadow("#000", 1, 1, 2);
        P = new CTLText(s_oAttachSection,827,CANVAS_HEIGHT - 118,174,30,30,"center","#ffffff",FONT_GAME,1,0,0,TEXT_BET + ": " + c.toFixed(2),!0,!0,!1,!1);
        P.setShadow("#000", 1, 1, 2);
        R = new CTLText(s_oAttachSection,1049,CANVAS_HEIGHT - 118,134,30,30,"center","#ffde00",FONT_GAME,1,0,0," ",!0,!0,!1,!1);
        R.setShadow("#000", 1, 1, 2);
        G = new createjs.Text("","54px " + FONT_GAME,"#ffde00");
        G.x = 974;
        G.y = 59;
        G.textAlign = "center";
        G.textBaseline = "alphabetic";
        s_oAttachSection.addChild(G);
        p = s_oSpriteLibrary.getSprite("bet_but");
        b = [];
        a = p.height / 2;
        c = 84 + a;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        b[3] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        b[1] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        b[19] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        b[15] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        b[9] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        b[0] = e;
        c += 44;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        b[10] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        b[16] = e;
        c += 43;
        e = new CBetBut(319 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        b[2] = e;
        e = new CBetBut(319 + p.width / 2,c + 43,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        b[4] = e;
        c = 84 + a;
        e = new CBetBut(1130 + p.width / 2,c,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        b[13] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        b[11] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        b[8] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        b[17] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        b[5] = e;
        c += 44;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        b[6] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        b[18] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        b[7] = e;
        c += 43;
        e = new CBetBut(1130 + p.width / 2,c,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        b[12] = e;
        e = new CBetBut(1130 + p.width / 2,c + 43,p,!0);
        e.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        b[14] = e;
        d = [];
        for (a = 0; a < NUM_PAYLINES; a++)
            c = createBitmap(s_oSpriteLibrary.getSprite("payline_" + (a + 1))),
            c.visible = !1,
            s_oAttachSection.addChild(c),
            d[a] = c;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        t.unload();
        t = null;
        u.unload();
        u = null;
        r.unload();
        r = null;
        x.unload();
        x = null;
        q.unload();
        q = null;
        y.unload();
        y = null;
        H.unload();
        H = null;
        !1 === DISABLE_SOUND_MOBILE && (z.unload(),
        z = null);
        L && screenfull.isEnabled && I.unload();
        for (var a = 0; a < NUM_PAYLINES; a++)
            b[a].unload();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(a, b) {
        t.setPosition(f - a, b + g);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || z.setPosition(l - a, b + k);
        L && screenfull.isEnabled && I.setPosition(m - a, h + b)
    }
    ;
    this.refreshMoney = function(a) {
        E.refreshText(TEXT_MONEY + "\n" + a.toFixed(2) + TEXT_CURRENCY)
		//console.log(a)
	}
    ;
	
    this.refreshBet = function(a) {
        J.refreshText(a.toFixed(2))
    }
    ;
    this.refreshTotalBet = function(a) {
        P.refreshText(TEXT_BET + ": " + a.toFixed(2))
    }
    ;
    this.refreshNumLines = function(a) {
        F.refreshText(a);
        for (var c = 0; c < NUM_PAYLINES; c++)
            c < a ? (b[c].setOn(),
            d[c].visible = !0) : b[c].setOff();
        setTimeout(function() {
            for (var a = 0; a < NUM_PAYLINES; a++)
                d[a].visible = !1
        }, 1E3)
    }
    ;
    this.resetWin = function() {
        R.refreshText(" ")
    }
    ;
    this.refreshWinText = function(a) {
        R.refreshText(TEXT_WIN + " " + a.toFixed(2))
    }
    ;
    this.refreshFreeSpinNum = function(a) {
        G.text = a
    }
    ;
    this.showLine = function(a) {
        d[a - 1].visible = !0
    }
    ;
    this.hideLine = function(a) {
        d[a - 1].visible = !1
    }
    ;
    this.hideAllLines = function() {
        for (var a = 0; a < NUM_PAYLINES; a++)
            d[a].visible = !1
    }
    ;
    this.disableBetBut = function(a) {
        for (var d = 0; d < NUM_PAYLINES; d++)
            b[d].disable(a)
    }
    ;
    this.enableGuiButtons = function() {
        u.enable();
        r.setText(TEXT_AUTOSPIN);
        r.enable();
        H.enable();
        y.enable();
        q.enable();
        x.enable()
    }
    ;
    this.enableSpin = function() {
        u.enable();
        r.setText(TEXT_AUTOSPIN);
        r.enable();
        H.enable()
    }
    ;
    this.enableAutoSpin = function() {
        r.enable()
    }
    ;
    this.disableSpin = function(a) {
        u.disable();
        a ? r.setText(TEXT_STOP_AUTO) : r.disable();
        H.disable()
    }
    ;
    this.disableAutoSpin = function() {
        r.disable()
    }
    ;
    this.disableGuiButtons = function(a) {
        u.disable();
        a ? r.setText(TEXT_STOP_AUTO) : r.disable();
        H.disable();
        y.disable();
        q.disable();
        x.disable()
    }
    ;
    this._onBetLineClicked = function(a) {
        this.refreshNumLines(a);
        s_oGame.activateLines(a)
    }
    ;
    this._onExit = function() {
        s_oGame.onExit()
    }
    ;
    this._onSpin = function() {
        s_oGame.onSpin()
	
    }
    ;
    this._onAutoSpin = function() {
        if (r.getText() === TEXT_AUTOSPIN)
            s_oGame.onAutoSpin();
        else
            r.disable(),
            r.setText(TEXT_AUTOSPIN),
            s_oGame.onStopAutoSpin()
    }
    ;
    this._onAddLine = function() {
        s_oGame.addLine()
    }
    ;
    this._onInfo = function() {
        s_oGame.onInfoClicked()
    }
    ;
    this._onBet = function() {
        s_oGame.changeCoinBet()
    }
    ;
    this._onMaxBet = function() {
        s_oGame.onMaxBet()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this.resetFullscreenBut = function() {
        L && screenfull.isEnabled && I.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? C.call(window.document) : L.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oInterface = this;
    this._init(a, e, c);
    return this
}
var s_oInterface = null;
function CPayTablePanel() {
    var a, e, c, f, g, m, h, l, k;
    this._init = function() {
        a = 0;
        f = [];
        k = new createjs.Container;
        k.visible = !1;
        s_oAttachSection.addChild(k);
        var b = new createjs.Container;
        k.addChild(b);
        var d = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
        b.addChild(d);
        this._createPayouts(b);
        new CTLText(b,756,460,464,130,54,"center","#ffff00",FONT_GAME,1,10,5,TEXT_HELP_WILD,!0,!0,!0,!1);
        f[0] = b;
        b = new createjs.Container;
        b.visible = !1;
        k.addChild(b);
        d = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
        b.addChild(d);
        new CTLText(b,756,94,460,132,40,"center","#ffff00",FONT_GAME,1,15,5,TEXT_HELP_BONUS1,!0,!0,!0,!1);
        new CTLText(b,280,270,460,122,40,"center","#ffff00",FONT_GAME,1,15,5,TEXT_HELP_BONUS2,!0,!0,!0,!1);
        f[1] = b;
        b = new createjs.Container;
        b.visible = !1;
        k.addChild(b);
        d = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
        b.addChild(d);
        new CTLText(b,493,320,540,148,40,"center","#ffff00",FONT_GAME,1,15,5,TEXT_HELP_FREESPIN,!0,!0,!0,!1);
        f[2] = b;
        g = f[a];
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var c = this;
        m.on("click", function() {
            c._onExit()
        });
        k.addChild(m);
        h = new CGfxButton(CANVAS_WIDTH - 300,50,s_oSpriteLibrary.getSprite("but_arrow_next"),k);
        h.addEventListener(ON_MOUSE_UP, this._onNext, this);
        l = new CGfxButton(300,50,s_oSpriteLibrary.getSprite("but_arrow_prev"),k);
        l.addEventListener(ON_MOUSE_UP, this._onPrev, this)
    }
    ;
    this.unload = function() {
        var a = this;
        m.off("click", function() {
            a._onExit()
        });
        s_oAttachSection.removeChild(k);
        for (var d = 0; d < e.length; d++)
            k.removeChild(e[d]);
        for (d = 0; d < c.length; d++)
            k.removeChild(c[d])
    }
    ;
    this._createPayouts = function(a) {
        e = [];
        c = [];
        a = [{
            x: 435,
            y: 158
        }, {
            x: 765,
            y: 158
        }, {
            x: 1087,
            y: 158
        }, {
            x: 435,
            y: 340
        }, {
            x: 765,
            y: 340
        }, {
            x: 1087,
            y: 340
        }, {
            x: 435,
            y: 524
        }];
        for (var b = 0; b < s_aSymbolWin.length - 3; b++) {
            var f = s_aSymbolWin[b];
            e[b] = [];
            c[b] = [];
            var g = new createjs.Container;
            g.x = a[b].x;
            g.y = a[b].y;
            k.addChild(g);
            for (var h = 0, m = f.length - 1; 0 <= m; m--)
                if (0 !== f[m]) {
                    var l = new CTLText(g,0,h,50,30,125,"left","#ffffff",FONT_GAME,1,2,2,"X" + (m + 1),!0,!0,!0,!1);
                    h += l.getFontSize();
                    e[b][m] = l;
                    l = new CTLText(g,50,l.getY(),50,30,125,"right","#ffff00",FONT_GAME,1,2,2,f[m],!0,!0,!0,!1);
                    c[b][m] = l
                }
            g.regY = g.getBounds().height / 2
        }
    }
    ;
    this._onNext = function() {
        a === f.length - 1 ? a = 0 : a++;
        g.visible = !1;
        f[a].visible = !0;
        g = f[a]
    }
    ;
    this._onPrev = function() {
        0 === a ? a = f.length - 1 : a--;
        g.visible = !1;
        f[a].visible = !0;
        g = f[a]
    }
    ;
    this.show = function() {
        a = 0;
        g.visible = !1;
        f[a].visible = !0;
        g = f[a];
        k.visible = !0
    }
    ;
    this.hide = function() {
        k.visible = !1
    }
    ;
    this.resetHighlightCombo = function() {
        for (var a = 0; a < e.length; a++)
            for (var d = 0; d < e[a].length; d++) {
                var f = e[a][d]
                  , g = c[a][d];
                f && f.setColor("#ffffff");
                g && (c[a][d].setColor("#ffff00"),
                c[a][d].removeTweens(),
                c[a][d].setAlpha(1))
            }
    }
    ;
    this.highlightCombo = function(a, d) {
        a !== BONUS_SYMBOL && a !== WILD_SYMBOL && a !== FREESPINS_SYMBOL && (c[a][d - 1].setColor("#ff0000"),
        this.tweenAlpha(c[a][d - 1].getText(), 0))
    }
    ;
    this.tweenAlpha = function(a, d) {
        var b = this;
        createjs.Tween.get(a).to({
            alpha: d
        }, 200).call(function() {
            1 === d ? b.tweenAlpha(a, 0) : b.tweenAlpha(a, 1)
        })
    }
    ;
    this._onExit = function() {
        s_oGame.hidePayTable()
    }
    ;
    this.isVisible = function() {
        return k.visible
    }
    ;
    this._init()
}
function CStaticSymbolCell(a, e, c, f) {
    var g = -1, m, h, l, k;
    this._init = function(a, d, c, f) {
        k = new createjs.Container;
        k.visible = !1;
        h = [];
        for (a = 0; a < NUM_SYMBOLS; a++)
            d = createSprite(s_aSymbolAnims[a], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE),
            d.stop(),
            d.x = c,
            d.y = f,
            d.on("animationend", this._onAnimEnded, null, !1, {
                index: a
            }),
            k.addChild(d),
            h[a] = d,
            h[a].visible = !1;
        a = {
            framerate: 60,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 19]
            }
        };
        a = new createjs.SpriteSheet(a);
        l = new createjs.Sprite(a,"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
        l.stop();
        l.x = c;
        l.y = f;
        k.addChild(l);
        s_oAttachSection.addChild(k)
    }
    ;
    this.unload = function() {
        s_oAttachSection.removeChild(k)
    }
    ;
    this.hide = function() {
        -1 < g && (l.gotoAndStop("static"),
        l.visible = !1,
        h[g].gotoAndPlay("static"),
        k.visible = !1)
    }
    ;
    this.show = function(a) {
        l.gotoAndPlay("anim");
        l.visible = !0;
        for (var b = 0; b < NUM_SYMBOLS; b++)
            h[b].visible = b + 1 === a ? !0 : !1;
        h[a - 1].gotoAndPlay("anim");
        g = a - 1;
        m = h[a - 1].spriteSheet.getNumFrames();
        k.visible = !0
    }
    ;
    this._onAnimEnded = function(a, d) {
        h[d.index].currentFrame !== m && (h[d.index].stop(),
        setTimeout(function() {
            h[d.index].gotoAndPlay(1)
        }, 100))
    }
    ;
    this.stopAnim = function() {
        h[g].gotoAndStop("static");
        h[g].visible = !1;
        l.gotoAndStop("static");
        l.visible = !1
    }
    ;
    this._init(a, e, c, f)
}
function CTweenController() {
    this.tweenValue = function(a, e, c) {
        return a + c * (e - a)
    }
    ;
    this.easeLinear = function(a, e, c, f) {
        return c * a / f + e
    }
    ;
    this.easeInCubic = function(a, e, c, f) {
        f = (a /= f) * a * a;
        return e + c * f
    }
    ;
    this.easeBackInQuart = function(a, e, c, f) {
        f = (a /= f) * a;
        return e + c * (2 * f * f + 2 * f * a + -3 * f)
    }
    ;
    this.easeInBack = function(a, e, c, f) {
        return c * (a /= f) * a * (2.70158 * a - 1.70158) + e
    }
    ;
    this.easeOutCubic = function(a, e, c, f) {
        return c * ((a = a / f - 1) * a * a + 1) + e
    }
}
function CMsgBox() {
    var a, e, c, f, g;
    this._init = function() {
        g = new createjs.Container;
        g.visible = !1;
        s_oStage.addChild(g);
        a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        g.addChild(a);
        c = new CTLText(g,CANVAS_WIDTH / 2 - 298,CANVAS_HEIGHT / 2 - 118,600,150,40,"center","#000",FONT_GAME,1,0,0," ",!0,!0,!0,!1);
        e = new CTLText(g,CANVAS_WIDTH / 2 - 300,CANVAS_HEIGHT / 2 - 120,600,150,40,"center","#fff",FONT_GAME,1,0,0," ",!0,!0,!0,!1);
        f = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 200,s_oSpriteLibrary.getSprite("but_bg"),TEXT_OK,"walibi0615bold","#ffffff",40,g);
        f.addEventListener(ON_MOUSE_UP, this._onExit, this)
    }
    ;
    this.show = function(a) {
        c.refreshText(a);
        e.refreshText(a);
        g.visible = !0
    }
    ;
    this.hide = function() {
        g.visible = !1
    }
    ;
    this._onExit = function() {
        this.hide()
    }
    ;
    this._init();
    return this
}
function CVector2(a, e) {
    var c, f;
    this._init = function(a, e) {
        c = a;
        f = e
    }
    ;
    this.add = function(a, e) {
        c += a;
        f += e
    }
    ;
    this.addV = function(a) {
        c += a.getX();
        f += a.getY()
    }
    ;
    this.scalarDivision = function(a) {
        c /= a;
        f /= a
    }
    ;
    this.subV = function(a) {
        c -= a.getX();
        f -= a.getY()
    }
    ;
    this.scalarProduct = function(a) {
        c *= a;
        f *= a
    }
    ;
    this.invert = function() {
        c *= -1;
        f *= -1
    }
    ;
    this.dotProduct = function(a) {
        return c * a.getX() + f * a.getY()
    }
    ;
    this.set = function(a, e) {
        c = a;
        f = e
    }
    ;
    this.setV = function(a) {
        c = a.getX();
        f = a.getY()
    }
    ;
    this.length = function() {
        return Math.sqrt(c * c + f * f)
    }
    ;
    this.length2 = function() {
        return c * c + f * f
    }
    ;
    this.normalize = function() {
        var a = this.length();
        0 < a && (c /= a,
        f /= a)
    }
    ;
    this.getNormalize = function(a) {
        this.length();
        a.set(c, f);
        a.normalize()
    }
    ;
    this.rot90CCW = function() {
        var a = c;
        c = -f;
        f = a
    }
    ;
    this.rot90CW = function() {
        var a = c;
        c = f;
        f = -a
    }
    ;
    this.getRotCCW = function(a) {
        a.set(c, f);
        a.rot90CCW()
    }
    ;
    this.getRotCW = function(a) {
        a.set(c, f);
        a.rot90CW()
    }
    ;
    this.ceil = function() {
        c = Math.ceil(c);
        f = Math.ceil(f)
    }
    ;
    this.round = function() {
        c = Math.round(c);
        f = Math.round(f)
    }
    ;
    this.toString = function() {
        return "Vector2: " + c + ", " + f
    }
    ;
    this.print = function() {
        trace("Vector2: " + c + ", " + f)
    }
    ;
    this.getX = function() {
        return c
    }
    ;
    this.getY = function() {
        return f
    }
    ;
    this._init(a, e)
}
function CFormatText(a, e, c, f) {
    var g, m, h, l;
    this._init = function(a, b, d, c) {
        g = 0;
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        c.addChild(l);
        a = 56;
        b = a / 20;
        for (c = 0; c < d.length; c++) {
            var e = a + "px";
            m = new createjs.Text;
            m.text = d[c];
            m.font = e + " " + FONT_GAME;
            m.color = "#000000";
            m.textAlign = "left";
            m.textBaseline = "middle";
            m.x = g + 2;
            m.y = 2;
            l.addChild(m);
            h = new createjs.Text;
            h.text = d[c];
            h.font = e + " " + FONT_GAME;
            h.color = "#ffffff";
            h.textAlign = "left";
            h.textBaseline = "middle";
            h.x = g;
            l.addChild(h);
            g += m.getMeasuredWidth() + b;
            a -= 9
        }
    }
    ;
    this.unload = function() {
        f.removeChild(l)
    }
    ;
    this.rotateText = function(a) {
        l.rotation = a
    }
    ;
    this._init(a, e, c, f)
}
function CWheelBonus(a, e, c) {
    var f, g, m, h, l;
    this._init = function(a, d) {
        f = [];
        g = [];
        m = [];
        for (var b = 0; b < WHEEL_SETTINGS.length; b++)
            m[b] = WHEEL_SETTINGS[b];
        this._initColors();
        b = s_oSpriteLibrary.getSprite("wheel");
        l = new createjs.Container;
        l.x = a;
        l.y = d;
        k.addChild(l);
        h = createBitmap(b);
        h.regX = b.width / 2;
        h.regY = b.height / 2;
        l.addChild(h);
        this.setText(1)
    }
    ;
    this.unload = function() {
        k.removeChild(l)
    }
    ;
    this._initColors = function() {
        for (var a = 0; 9 > a; a++)
            g[0] = "violet";
        for (a = 351; 360 >= a; a++)
            g[a] = "violet";
        for (var d = 0; 4 > d; d++)
            for (a = 9 + d * SEGMENT_ROT * 5; a < 27 + d * SEGMENT_ROT * 5; a++)
                g[a] = "blue";
        for (d = 0; 4 > d; d++)
            for (a = 27 + d * SEGMENT_ROT * 5; a < 45 + d * SEGMENT_ROT * 5; a++)
                g[a] = "green";
        for (d = 0; 4 > d; d++)
            for (a = 45 + d * SEGMENT_ROT * 5; a < 63 + d * SEGMENT_ROT * 5; a++)
                g[a] = "yellow";
        for (d = 0; 4 > d; d++)
            for (a = 63 + d * SEGMENT_ROT * 5; a < 81 + d * SEGMENT_ROT * 5; a++)
                g[a] = "red";
        for (d = 0; 3 > d; d++)
            for (a = 81 + d * SEGMENT_ROT * 5; a <= 99 + d * SEGMENT_ROT * 5; a++)
                g[a] = "violet";
        for (a = 315; 333 >= a; a++)
            g[a] = "white"
    }
    ;
    this.setText = function(a) {
        for (var b = new CVector2(-210,3), c = SEGMENT_ROT, e = Math.PI * SEGMENT_ROT / 180, g = 0; g < m.length; g++)
            f[g] = new CFormatText(b.getX(),b.getY(),"x" + m[g] * a,l),
            f[g].rotateText(-c * g),
            rotateVector2D(e, b)
    }
    ;
    this.clearText = function() {
        for (var a = 0; a < m.length; a++)
            f[a].unload()
    }
    ;
    this.spin = function(a, c) {
        playSound("start_reel_bonus", 1, !1);
        playSound("reel_bonus", 1, !0);
        createjs.Tween.get(l).to({
            rotation: l.rotation + a
        }, WHEEL_SPIN_TIMESPEED * c, createjs.Ease.quartOut).call(function() {
            l.rotation %= 360;
            s_oBonusPanel.wheelArrived();
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || stopSound("reel_bonus")
        })
    }
    ;
    this.getDegree = function() {
        return l.rotation
    }
    ;
    this.getColor = function() {
        return g[Math.round(l.rotation)]
    }
    ;
    var k = c;
    this._init(a, e)
}
function CBonusPanel() {
    var a, e, c, f, g, m, h, l, k, b, d, t, u;
    this._init = function() {
        h = f = c = 0;
        a = !1;
        g = STATE_BONUS_IDLE;
        u = new createjs.Container;
        u.visible = !1;
        s_oAttachSection.addChild(u);
        k = new CWheelBonus(890,320,u);
        var r = createBitmap(s_oSpriteLibrary.getSprite("bg_bonus"));
        u.addChild(r);
        b = new CLedsBonus(890,320,u);
        e = b.getState();
        r = s_oSpriteLibrary.getSprite("but_spin_bonus");
        d = new CTextButton(360 + r.width / 2,490,r,TEXT_SPIN,FONT_GAME,"#ffffff",40,u);
        d.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        new CTLText(u,352,72,310,50,56,"left","#000",FONT_GAME,1,0,0,TEXT_BONUS_HELP,!0,!0,!1,!1);
        new CTLText(u,350,70,310,50,56,"left","#fff",FONT_GAME,1,0,0,TEXT_BONUS_HELP,!0,!0,!1,!1);
        t = new CTLText(u,370,294,182,50,56,"center","yellow",FONT_GAME,1,0,0,TEXT_CURRENCY + "0",!0,!0,!1,!1);
        t.setAlpha(h)
    }
    ;
    this.show = function(b, c) {
        d.enable();
        t.refreshText(" ");
        t.setAlpha(1);
        m = b;
        l = c;
        a = u.visible = !0;
        $(s_oMain).trigger("bonus_start")
    }
    ;
    this._onSpin = function() {
        d.disable();
        g = STATE_BONUS_SPIN;
        f = 0;
        var a = MIN_FAKE_SPIN + Math.floor(3 * Math.random())
          , b = SEGMENT_ROT - 3;
        b = -b / 2 + Math.random() * b;
        b = (360 - k.getDegree() + m * SEGMENT_ROT + b) % 360;
        k.spin(360 * a + b, a)
    }
    ;
    this._animLedIdle = function() {
        c += s_iTimeElaps;
        if (c > TIME_ANIM_IDLE) {
            c = 0;
            for (var a = Math.floor(Math.random() * b.getNumAnim()); a === e; )
                a = Math.floor(Math.random() * b.getNumAnim());
            b.changeAnim(a);
            e = a
        }
    }
    ;
    this._animLedSpin = function() {
        b.changeAnim(LED_SPIN);
        g = -1
    }
    ;
    this._animLedWin = function() {
        0 === f ? (b.changeAnim(4 + Math.round(Math.random())),
        b.setWinColor(this.getCurColor())) : f > TIME_ANIM_WIN && (c = TIME_ANIM_IDLE,
        g = STATE_BONUS_IDLE,
        s_oBonusPanel.unload(),
        f = 0);
        f += s_iTimeElaps
    }
    ;
    this._animLedLose = function() {
        0 === f ? (b.changeAnim(6),
        b.setWinColor(this.getCurColor())) : f > TIME_ANIM_LOSE && (c = TIME_ANIM_IDLE,
        g = STATE_BONUS_IDLE,
        s_oBonusPanel.unload(),
        f = 0);
        f += s_iTimeElaps
    }
    ;
    this.getCurColor = function() {
        return k.getColor()
    }
    ;
    this.wheelArrived = function() {
        t.refreshText(TEXT_CURRENCY + l);
        this._animWinText();
        0 >= WHEEL_SETTINGS[m].prize ? (g = STATE_BONUS_LOSE,
        playSound("game_over_bonus", 1, !1)) : (g = STATE_BONUS_WIN,
        playSound("win_bonus", 1, !1))
    }
    ;
    this._animWinText = function() {
        h = 1 === h ? 0 : 1;
        createjs.Tween.get(t.getText()).to({
            alpha: h
        }, 150, createjs.Ease.cubicOut).call(function() {
            s_oBonusPanel._animWinText()
        })
    }
    ;
    this.unload = function() {
        a = !1;
        u.visible = !1;
        createjs.Tween.removeTweens(t.getText());
        s_oGame.exitFromBonus()
    }
    ;
    this.update = function() {
        if (a)
            switch (b.update(),
            g) {
            case STATE_BONUS_IDLE:
                this._animLedIdle();
                break;
            case STATE_BONUS_SPIN:
                this._animLedSpin();
                break;
            case STATE_BONUS_WIN:
                this._animLedWin();
                break;
            case STATE_BONUS_LOSE:
                this._animLedLose()
            }
    }
    ;
    s_oBonusPanel = this;
    this._init()
}
var s_oBonusPanel = null;
function CLedsBonus(a, e, c) {
    var f, g, m, h, l, k, b, d, t;
    this._init = function(a, b) {
        l = 3;
        m = Math.floor(Math.random() * l);
        h = 0;
        d = [];
        t = new createjs.Container;
        t.x = a;
        t.y = b;
        u.addChild(t);
        var c = {
            images: [s_oSpriteLibrary.getSprite("leds")],
            frames: {
                width: 54,
                height: 54,
                regX: 27,
                regY: 27
            },
            animations: {
                off: [0],
                white: [1],
                green: [2],
                blue: [3],
                violet: [4],
                red: [5],
                yellow: [6]
            }
        };
        c = new createjs.SpriteSheet(c);
        for (var e = new CVector2(-255,0), f = 360 / WHEEL_SETTINGS.length * Math.PI / 180, g = 0; g < WHEEL_SETTINGS.length; g++)
            d[g] = createSprite(c, "off", 0, 0, 54, 54),
            d[g].x = e.getX(),
            d[g].y = e.getY(),
            rotateVector2D(f, e),
            t.addChild(d[g]);
        d[0].visible = !1
    }
    ;
    this.unload = function() {
        u.removeChild(t)
    }
    ;
    this.setWinColor = function(a) {
        f = a
    }
    ;
    this.getState = function() {
        return m
    }
    ;
    this.getNumAnim = function() {
        return l
    }
    ;
    this.changeAnim = function(a) {
        h = 0;
        m = a;
        for (a = 0; a < d.length; a++)
            d[a].gotoAndStop("off")
    }
    ;
    this.animIdle0 = function() {
        h += s_iTimeElaps;
        if (0 <= h && h < ANIM_IDLE1_TIMESPEED / 2)
            for (var a = 0; a < d.length; a++)
                0 === a % 2 ? d[a].gotoAndStop("white") : d[a].gotoAndStop("off");
        else if (h >= ANIM_IDLE1_TIMESPEED / 2 && h < ANIM_IDLE1_TIMESPEED)
            for (a = 0; a < d.length; a++)
                0 === a % 2 ? d[a].gotoAndStop("off") : d[a].gotoAndStop("white");
        else
            h = 0
    }
    ;
    this.animIdle1 = function() {
        0 === h && (k = 0,
        d[k].gotoAndStop("white"),
        d[d.length / 4].gotoAndStop("white"),
        d[d.length / 2].gotoAndStop("white"),
        d[3 * d.length / 4].gotoAndStop("white"));
        h += s_iTimeElaps;
        h > ANIM_IDLE2_TIMESPEED && (k === d.length / 4 && (k = 0,
        h = 1),
        0 === k ? (d[d.length - 1].gotoAndStop("off"),
        d[0].gotoAndStop("white"),
        d[d.length / 4 - 1].gotoAndStop("off"),
        d[d.length / 4].gotoAndStop("white"),
        d[d.length / 2 - 1].gotoAndStop("off"),
        d[d.length / 2].gotoAndStop("white"),
        d[3 * d.length / 4 - 1].gotoAndStop("off"),
        d[3 * d.length / 4].gotoAndStop("white")) : (d[k - 1].gotoAndStop("off"),
        d[k].gotoAndStop("white"),
        d[d.length / 4 + k - 1].gotoAndStop("off"),
        d[d.length / 4 + k].gotoAndStop("white"),
        d[d.length / 2 + k - 1].gotoAndStop("off"),
        d[d.length / 2 + k].gotoAndStop("white"),
        d[3 * d.length / 4 + k - 1].gotoAndStop("off"),
        d[3 * d.length / 4 + k].gotoAndStop("white")),
        k++,
        h = 1)
    }
    ;
    this.animIdle2 = function() {
        0 === h && (k = 0,
        b = d.length / 2,
        d[k].gotoAndStop("white"),
        d[b].gotoAndStop("white"));
        h += s_iTimeElaps;
        h > ANIM_IDLE3_TIMESPEED && (k === d.length / 2 && (k = 0,
        b = d.length / 2,
        h = 1),
        0 === k ? (d[d.length - 1].gotoAndStop("off"),
        d[1].gotoAndStop("off"),
        d[0].gotoAndStop("white"),
        d[d.length / 2 + 1].gotoAndStop("off"),
        d[d.length / 2 - 1].gotoAndStop("off"),
        d[d.length / 2].gotoAndStop("white")) : (d[k - 1].gotoAndStop("off"),
        d[k].gotoAndStop("white"),
        1 !== k && d[d.length - k + 1].gotoAndStop("off"),
        d[d.length - k].gotoAndStop("white"),
        d[b + 1].gotoAndStop("off"),
        d[b].gotoAndStop("white"),
        d[d.length - b - 1].gotoAndStop("off"),
        0 !== b && d[d.length - b].gotoAndStop("white")),
        k++,
        b--,
        h = 1)
    }
    ;
    this.animSpin0 = function() {
        0 === h && (k = Math.floor(Math.random() * d.length),
        d[k].gotoAndStop("white"));
        h += s_iTimeElaps;
        h > ANIM_SPIN_TIMESPEED && (0 > k && (k = d.length - 1,
        h = 1),
        k === d.length - 1 ? (d[0].gotoAndStop("off"),
        d[d.length - 1].gotoAndStop("white")) : (d[k + 1].gotoAndStop("off"),
        d[k].gotoAndStop("white")),
        k--,
        h = 1)
    }
    ;
    this.animWin0 = function() {
        h += s_iTimeElaps;
        if (0 <= h && h < ANIM_WIN1_TIMESPEED / 2)
            for (var a = 0; a < d.length; a++)
                0 === a % 2 ? d[a].gotoAndStop(f) : d[a].gotoAndStop("off");
        else if (h >= ANIM_WIN1_TIMESPEED / 2 && h < ANIM_WIN1_TIMESPEED)
            for (a = 0; a < d.length; a++)
                0 === a % 2 ? d[a].gotoAndStop("off") : d[a].gotoAndStop(f);
        else
            h = 0
    }
    ;
    this.animWin1 = function() {
        0 === h && (k = 0,
        b = d.length / 2,
        g = f,
        d[k].gotoAndStop(g),
        d[b].gotoAndStop(g));
        h += s_iTimeElaps;
        h > ANIM_WIN2_TIMESPEED && (k > d.length / 4 && (k = 0,
        b = d.length / 2,
        h = 1,
        g = g === f ? "off" : f),
        0 === k ? (d[0].gotoAndStop(g),
        d[d.length / 2].gotoAndStop(g)) : k <= d.length / 4 && (d[k].gotoAndStop(g),
        d[d.length - k].gotoAndStop(g),
        d[b].gotoAndStop(g),
        0 !== b && d[d.length - b].gotoAndStop(g)),
        k++,
        b--,
        h = 1)
    }
    ;
    this.animLose = function() {
        for (var a = 0; a < d.length; a++)
            d[a].gotoAndStop(f);
        m = -1
    }
    ;
    this.update = function() {
        switch (m) {
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
            this.animSpin0();
            break;
        case 4:
            this.animWin0();
            break;
        case 5:
            this.animWin1();
            break;
        case 6:
            this.animLose()
        }
    }
    ;
    var u = c;
    this._init(a, e)
}
var s_aSession = [];
NUM_ROWS = 3;
NUM_REELS = 5;
var _aFinalSymbols = []
  , _aRandSymbols = [];
_aRandSymbols = _initSymbolsOccurence();
var _aPaylineCombo = [];
_aPaylineCombo = _initPaylines();
var _aSymbolWin = []
  , _iNumSymbolFreeSpin = 0;
s_aSession.bBonus = 0;
function _initSettings() {
    s_aSession.iMoney = TOTAL_MONEY;
    s_aSession.iSlotCash = SLOT_CASH;
    s_aSession.win_occurrence = WIN_OCCURRENCE;
    s_aSession.freespin_occurrence = FREESPIN_OCCURRENCE;
    s_aSession.bonus_occurrence = BONUS_OCCURRENCE;
    s_aSession.freespin_symbol_num_occur = FREESPIN_SYMBOL_NUM_OCCURR;
    s_aSession.num_freespin = NUM_FREESPIN;
    s_aSession.bonus_prize = BONUS_PRIZE;
    s_aSession.bonus_prize_occur = BONUS_PRIZE_OCCURR;
    s_aSession.coin_bet = COIN_BET;
    _aSymbolWin = _initSymbolWin()
}
function checkLogin() {
    s_aSession.iTotFreeSpin = 0;
    s_aSession.bFreeSpin = 0;
    _initSettings();
    _setMinWin();
    return _tryToCheckLogin()
}
function callSpin(a, e, c) {
    return _onSpin(a, e, c)
}
function _tryToCheckLogin() {
    for (var a = [], e = 0; e < _aSymbolWin.length; e++)
        a[e] = _aSymbolWin[e].join(",");
    return "res=true&login=true&money=" + s_aSession.iMoney + "&bonus_prize=" + s_aSession.bonus_prize.join("#") + "&paytable=" + a.join("#") + "&coin_bet=" + s_aSession.coin_bet.join("#")
}
function _setMinWin() {
    s_aSession.min_win = 9999999999999;
    for (var a = 0; a < _aSymbolWin.length; a++)
        for (var e = _aSymbolWin[a], c = 0; c < e.length; c++)
            0 !== e[c] && e[c] < s_aSession.min_win && (s_aSession.min_win = e[c])
}
function _onSpin(a, e, c) {
    if (c > s_aSession.iMoney)
        _dieError("INVALID BET: " + c + ",money:" + s_aSession.iMoney);
    else {
        $(s_oMain).trigger("bet_placed", {
            bet: e,
            tot_bet: c
        });
        s_aSession.iMoney -= c;
        s_aSession.iSlotCash += c;
        var f = s_aSession.bBonus = 0
          , g = 0;
        if (s_aSession.iSlotCash < s_aSession.min_win * e)
            return generLosingPattern(),
            1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin,
            0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0,
            s_aSession.bFreeSpin = 0)),
            "res=true&win=false&pattern=" + JSON.stringify(_aFinalSymbols) + "&money=" + s_aSession.iMoney + "&freespin=" + s_aSession.iTotFreeSpin + "&bonus=false&bonus_prize=-1&bonus_win=0&cash=" + s_aSession.iSlotCash;
        if (Math.floor(100 * Math.random()) < s_aSession.win_occurrence) {
            if (0 === s_aSession.bFreeSpin && 0 === s_aSession.bBonus) {
                var m = Math.floor(101 * Math.random());
                0 === s_aSession.iTotFreeSpin && m < s_aSession.freespin_occurrence + s_aSession.bonus_occurrence && (m = Math.floor(Math.random() * (s_aSession.freespin_occurrence + s_aSession.bonus_occurrence) + 1),
                m <= s_aSession.freespin_occurrence ? f = 1 : g = s_aSession.iSlotCash >= s_aSession.bonus_prize[0] * e ? 1 : 0)
            }
            var h;
            m = 0;
            do {
                generateRandomSymbols(f, g);
                var l = checkWin(f, g, a)
                  , k = 0;
                for (h = 0; h < l.length; h++)
                    k += l[h].amount;
                k *= e;
                var b = 0;
                h = -1;
                if (1 === g) {
                    s_aSession.bBonus = 1;
                    h = [];
                    for (b = 0; b < s_aSession.bonus_prize_occur.length; b++)
                        for (var d = s_aSession.bonus_prize_occur[b], t = 0; t < d; t++)
                            h.push(b);
                    h = h[Math.floor(Math.random() * h.length)];
                    b = s_aSession.bonus_prize[h] * e
                }
                m++
            } while (0 === l.length || b + k > s_aSession.iSlotCash || b + k < c);
            s_aSession.iMoney = s_aSession.iMoney + k + b;
            s_aSession.iSlotCash = s_aSession.iSlotCash - k - b;
            1 === f && 2 < _iNumSymbolFreeSpin ? (s_aSession.bFreeSpin = 1,
            s_aSession.iTotFreeSpin = s_aSession.num_freespin[_iNumSymbolFreeSpin - 3]) : 1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin,
            0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0,
            s_aSession.bFreeSpin = 0));
            return "res=true&win=true&pattern=" + JSON.stringify(_aFinalSymbols) + "&win_lines=" + JSON.stringify(l) + "&money=" + s_aSession.iMoney + "&tot_win=" + k + "&freespin=" + s_aSession.iTotFreeSpin + "&bonus=" + s_aSession.bBonus + "&bonus_prize=" + h + "&bonus_win=" + b + "&cash=" + s_aSession.iSlotCash
        
		}
        generLosingPattern();
        1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin,
        0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0,
        s_aSession.bFreeSpin = 0));
        return "res=true&win=false&pattern=" + JSON.stringify(_aFinalSymbols) + "&money=" + s_aSession.iMoney + "&freespin=" + s_aSession.iTotFreeSpin + "&bonus=false&bonus_prize=-1&bonus_win=0"
    }
	
}
function _initPaylines() {
    _aPaylineCombo[0] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[1] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[2] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[3] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[4] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[5] = [{
        row: 1,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[6] = [{
        row: 1,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[7] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[8] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[9] = [{
        row: 1,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[10] = [{
        row: 2,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[11] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[12] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[13] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[14] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[15] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[16] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[17] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[18] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[19] = [{
        row: 0,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    return _aPaylineCombo
}
function _initSymbolsOccurence() {
    var a;
    for (a = 0; 1 > a; a++)
        _aRandSymbols.push(1);
    for (a = 0; 2 > a; a++)
        _aRandSymbols.push(2);
    for (a = 0; 3 > a; a++)
        _aRandSymbols.push(3);
    for (a = 0; 4 > a; a++)
        _aRandSymbols.push(4);
    for (a = 0; 5 > a; a++)
        _aRandSymbols.push(5);
    for (a = 0; 6 > a; a++)
        _aRandSymbols.push(6);
    for (a = 0; 7 > a; a++)
        _aRandSymbols.push(7);
    for (a = 0; 1 > a; a++)
        _aRandSymbols.push(8);
    for (a = 0; 2 > a; a++)
        _aRandSymbols.push(9);
    for (a = 0; 2 > a; a++)
        _aRandSymbols.push(10);
    return _aRandSymbols
}
function _initSymbolWin() {
    _aSymbolWin[0] = PAYTABLE_VALUES[0];
    _aSymbolWin[1] = PAYTABLE_VALUES[1];
    _aSymbolWin[2] = PAYTABLE_VALUES[2];
    _aSymbolWin[3] = PAYTABLE_VALUES[3];
    _aSymbolWin[4] = PAYTABLE_VALUES[4];
    _aSymbolWin[5] = PAYTABLE_VALUES[5];
    _aSymbolWin[6] = PAYTABLE_VALUES[6];
    _aSymbolWin[7] = [0, 0, 0, 0, 0, 0];
    _aSymbolWin[8] = [0, 0, 0, 0, 0, 0];
    _aSymbolWin[9] = [0, 0, 0, 0, 0, 0];
    return _aSymbolWin
}
function generLosingPattern() {
    for (var a = [], e = 0; e < NUM_ROWS; e++) {
        do
            var c = Math.floor(Math.random() * _aRandSymbols.length);
        while (9 === _aRandSymbols[c] || 10 === _aRandSymbols[c] || 8 === _aRandSymbols[c]);
        c = _aRandSymbols[c];
        a[e] = c
    }
    for (e = 0; e < NUM_ROWS; e++) {
        _aFinalSymbols[e] = [];
        for (var f = 0; f < NUM_REELS; f++)
            if (0 == f)
                _aFinalSymbols[e][f] = a[e];
            else {
                do
                    c = Math.floor(Math.random() * _aRandSymbols.length),
                    c = _aRandSymbols[c];
                while (a[0] === c || a[1] === c || a[2] === c || 9 === c || 10 === c || 8 === c);
                _aFinalSymbols[e][f] = c
            }
    }
}
function generateRandomSymbols(a, e) {
    for (var c = 0; c < NUM_ROWS; c++) {
        _aFinalSymbols[c] = [];
        for (var f = 0; f < NUM_REELS; f++) {
            do
                iRandSymbol = _aRandSymbols[Math.floor(Math.random() * _aRandSymbols.length)],
                _aFinalSymbols[c][f] = iRandSymbol;
            while (9 === iRandSymbol || 10 === iRandSymbol)
        }
    }
    if (1 === a) {
        var g = [];
        for (c = 0; c < s_aSession.freespin_symbol_num_occur.length; c++)
            for (f = 0; f < s_aSession.freespin_symbol_num_occur[c]; f++)
                g.push(c);
        _iNumSymbolFreeSpin = 3 + g[Math.floor(Math.random() * g.length)];
        c = [0, 1, 2, 3, 4];
        c = shuffle(c);
        for (f = 0; f < _iNumSymbolFreeSpin; f++)
            g = Math.floor(3 * Math.random()),
            _aFinalSymbols[g][c[f]] = 10
    } else if (1 === e) {
        c = [0, 1, 2, 3, 4];
        c = shuffle(c);
        var m = Math.floor(3 * Math.random() + 3);
        for (f = 0; f < m; f++)
            g = Math.floor(3 * Math.random()),
            _aFinalSymbols[g][c[f]] = 9
    }
}
function checkWin(a, e, c) {
    for (var f = [], g = 0; g < c; g++) {
        var m = _aPaylineCombo[g]
          , h = []
          , l = _aFinalSymbols[m[0].row][m[0].col]
          , k = 1
          , b = 1;
        for (h.push({
            row: m[0].row,
            col: m[0].col,
            value: _aFinalSymbols[m[0].row][m[0].col]
        }); 8 === l && b < NUM_REELS; )
            k++,
            l = _aFinalSymbols[m[b].row][m[b].col],
            h.push({
                row: m[b].row,
                col: m[b].col,
                value: _aFinalSymbols[m[b].row][m[b].col]
            }),
            b++;
        for (; b < m.length; b++)
            if (_aFinalSymbols[m[b].row][m[b].col] === l || 8 === _aFinalSymbols[m[b].row][m[b].col])
                k++,
                h.push({
                    row: m[b].row,
                    col: m[b].col,
                    value: _aFinalSymbols[m[b].row][m[b].col]
                });
            else
                break;
        0 < _aSymbolWin[l - 1][k - 1] && f.push({
            line: g + 1,
            amount: _aSymbolWin[l - 1][k - 1],
            num_win: k,
            value: l,
            list: h
        })
    }
    if (1 === a) {
        h = [];
        for (a = 0; a < NUM_ROWS; a++)
            for (e = 0; e < NUM_REELS; e++)
                10 === _aFinalSymbols[a][e] && h.push({
                    row: a,
                    col: e,
                    value: 10
                });
        f.push({
            line: 0,
            amount: 0,
            num_win: h.length,
            value: 10,
            list: h
        })
    } else if (1 === e) {
        h = [];
        for (a = 0; a < NUM_ROWS; a++)
            for (e = 0; e < NUM_REELS; e++)
                9 === _aFinalSymbols[a][e] && h.push({
                    row: a,
                    col: e,
                    value: 9
                });
        f.push({
            line: 0,
            amount: 0,
            num_win: h.length,
            value: 9,
            list: h
        })
    }
    return f
}
function shuffle(a) {
    for (var e, c, f = a.length; f; e = Math.floor(Math.random() * f),
    c = a[--f],
    a[f] = a[e],
    a[e] = c)
        ;
    return a
}
function _dieError(a) {
    return "res=false&desc=" + a
}
function CCreditsPanel() {
    var a, e, c, f, g, m, h, l, k, b;
    this._init = function() {
        b = new createjs.Container;
        b.alpha = 0;
        s_oStage.addChild(b);
        e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        b.addChild(e);
        h = new createjs.Shape;
        h.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = .01;
        h.on("click", this._onLogoButRelease);
        b.addChild(h);
        var d = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 380;
        f = new CGfxButton(a,190,d,b);
        f.addEventListener(ON_MOUSE_UP, this.unload, this);
        m = new createjs.Text(TEXT_CREDITS_DEVELOPED,"38px " + FONT_GAME,"#000");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 270;
        m.outline = 2;
        b.addChild(m);
        g = new createjs.Text(TEXT_CREDITS_DEVELOPED,"38px " + FONT_GAME,"#fff");
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = CANVAS_WIDTH / 2;
        g.y = 270;
        b.addChild(g);
        d = s_oSpriteLibrary.getSprite("logo_ctl");
        c = createBitmap(d);
        c.regX = d.width / 2;
        c.regY = d.height / 2;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        b.addChild(c);
        k = new createjs.Text("www.codethislab.com","34px " + FONT_GAME,"#000");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 385;
        k.outline = 2;
        b.addChild(k);
        l = new createjs.Text("www.codethislab.com","34px " + FONT_GAME,"#fff");
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = CANVAS_WIDTH / 2;
        l.y = 385;
        b.addChild(l);
        createjs.Tween.get(b).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(a, b) {}
    ;
    this.unload = function() {
        h.off("click", this._onLogoButRelease);
        f.unload();
        f = null;
        s_oStage.removeChild(b)
    }
    ;
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
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
    unload: function() {
        this._bDebug && this._oContainer.removeChild(this._oDebugShape);
        this._oContainer.removeChild(this._oText)
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
    setShadow: function(a, e, c, f) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,e,c,f))
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
    getString: function() {
        return this._oText.text
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
function CTLText(a, e, c, f, g, m, h, l, k, b, d, t, u, r, x, q, z) {
    this._oContainer = a;
    this._x = e;
    this._y = c;
    this._iWidth = f;
    this._iHeight = g;
    this._bMultiline = q;
    this._iFontSize = m;
    this._szAlign = h;
    this._szColor = l;
    this._szFont = k;
    this._iPaddingH = d;
    this._iPaddingV = t;
    this._bVerticalAlign = x;
    this._bFitText = r;
    this._bDebug = z;
    this._oDebugShape = null;
    this._fLineHeightFactor = b;
    this._oText = null;
    u && this.__createText(u)
}
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var e = a.split(".")
      , c = e.length;
    2 < c && (a = e[c - 2] + "." + e[c - 1]);
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
    } catch (c) {
        e = !0
    }
    return {
        topFrame: a,
        err: e
    }
}
  , getBestPageUrl = function(a) {
    var e = a.topFrame
      , c = "";
    if (a.err)
        try {
            try {
                c = window.top.location.href
            } catch (g) {
                var f = window.location.ancestorOrigins;
                c = f[f.length - 1]
            }
        } catch (g) {
            c = e.document.referrer
        }
    else
        c = e.location.href;
    return c
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), e = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], c = 0; c < e.length; c++)
        if (e[c] === a)
            return !0;
    return !1
}
;

/*
 screenfull
 v5.0.0 - 2019-09-09
 (c) Sindre Sorhus; MIT License
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
!function() {
    var a = "undefined" != typeof window && void 0 !== window.document ? window.document : {}
      , b = "undefined" != typeof module && module.exports
      , c = function() {
        for (var g, m = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], k = 0, f = m.length, h = {}; k < f; k++)
            if ((g = m[k]) && g[1]in a) {
                for (k = 0; k < g.length; k++)
                    h[m[0][k]] = g[k];
                return h
            }
        return !1
    }()
      , d = {
        change: c.fullscreenchange,
        error: c.fullscreenerror
    }
      , e = {
        request: function(g) {
            return new Promise(function(m, k) {
                var f = function() {
                    this.off("change", f);
                    m()
                }
                .bind(this);
                this.on("change", f);
                g = g || a.documentElement;
                Promise.resolve(g[c.requestFullscreen]())["catch"](k)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(g, m) {
                if (this.isFullscreen) {
                    var k = function() {
                        this.off("change", k);
                        g()
                    }
                    .bind(this);
                    this.on("change", k);
                    Promise.resolve(a[c.exitFullscreen]())["catch"](m)
                } else
                    g()
            }
            .bind(this))
        },
        toggle: function(g) {
            return this.isFullscreen ? this.exit() : this.request(g)
        },
        onchange: function(g) {
            this.on("change", g)
        },
        onerror: function(g) {
            this.on("error", g)
        },
        on: function(g, m) {
            var k = d[g];
            k && a.addEventListener(k, m, !1)
        },
        off: function(g, m) {
            var k = d[g];
            k && a.removeEventListener(k, m, !1)
        },
        raw: c
    };
    c ? (Object.defineProperties(e, {
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
    b ? module.exports = e : window.screenfull = e) : b ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}();
(function() {
    function a(l) {
        l = String(l);
        return l.charAt(0).toUpperCase() + l.slice(1)
    }
    function b(l, J) {
        var I = -1
          , B = l ? l.length : 0;
        if ("number" == typeof B && -1 < B && B <= v)
            for (; ++I < B; )
                J(l[I], I, l);
        else
            d(l, J)
    }
    function c(l) {
        l = String(l).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(l) ? l : a(l)
    }
    function d(l, J) {
        for (var I in l)
            H.call(l, I) && J(l[I], I, l)
    }
    function e(l) {
        return null == l ? a(l) : E.call(l).slice(8, -1)
    }
    function g(l, J) {
        var I = null != l ? typeof l[J] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(I) && ("object" == I ? !!l[J] : !0)
    }
    function m(l) {
        return String(l).replace(/([ -])(?!$)/g, "$1?")
    }
    function k(l, J) {
        var I = null;
        b(l, function(B, u) {
            I = J(I, B, u, l)
        });
        return I
    }
    function f(l) {
        function J(Y) {
            return k(Y, function(R, n) {
                var F = n.pattern || m(n);
                !R && (R = RegExp("\\b" + F + " *\\d+[.\\w_]*", "i").exec(l) || RegExp("\\b" + F + " *\\w+-[\\w]*", "i").exec(l) || RegExp("\\b" + F + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(l)) && ((R = String(n.label && !RegExp(F, "i").test(n.label) ? n.label : R).split("/"))[1] && !/[\d.]+/.test(R[0]) && (R[0] += " " + R[1]),
                n = n.label || n,
                R = c(R[0].replace(RegExp(F, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return R
            })
        }
        function I(Y) {
            return k(Y, function(R, n) {
                return R || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(l) || 0)[1] || null
            })
        }
        var B = r
          , u = l && "object" == typeof l && "String" != e(l);
        u && (B = l,
        l = null);
        var N = B.navigator || {}
          , A = N.userAgent || "";
        l || (l = A);
        var Q = u ? !!N.likeChrome : /\bChrome\b/.test(l) && !/internal|\n/i.test(E.toString())
          , U = u ? "Object" : "ScriptBridgingProxyObject"
          , O = u ? "Object" : "Environment"
          , P = u && B.java ? "JavaPackage" : e(B.java)
          , C = u ? "Object" : "RuntimeObject";
        O = (P = /\bJava/.test(P) && B.java) && e(B.environment) == O;
        var V = P ? "a" : "\u03b1", S = P ? "b" : "\u03b2", da = B.document || {}, ba = B.operamini || B.opera, Z = w.test(Z = u && ba ? ba["[[Class]]"] : e(ba)) ? Z : ba = null, q, W = l;
        u = [];
        var G = null
          , M = l == A;
        A = M && ba && "function" == typeof ba.version && ba.version();
        var z = function(Y) {
            return k(Y, function(R, n) {
                return R || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(l) && (n.label || n)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , p = function(Y) {
            return k(Y, function(R, n) {
                return R || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(l) && (n.label || n)
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
          , D = J([{
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
          , X = function(Y) {
            return k(Y, function(R, n, F) {
                return R || (n[D] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(D)] || RegExp("\\b" + m(F) + "(?:\\b|\\w*\\d)", "i").exec(l)) && F
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
          , K = function(Y) {
            return k(Y, function(R, n) {
                var F = n.pattern || m(n);
                if (!R && (R = RegExp("\\b" + F + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(l))) {
                    var L = R
                      , T = n.label || n
                      , aa = {
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
                    F && T && /^Win/i.test(L) && !/^Windows Phone /i.test(L) && (aa = aa[/[\d.]+$/.exec(L)]) && (L = "Windows " + aa);
                    L = String(L);
                    F && T && (L = L.replace(RegExp(F, "i"), T));
                    R = L = c(L.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return R
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        z && (z = [z]);
        X && !D && (D = J([X]));
        if (q = /\bGoogle TV\b/.exec(D))
            D = q[0];
        /\bSimulator\b/i.test(l) && (D = (D ? D + " " : "") + "Simulator");
        "Opera Mini" == p && /\bOPiOS\b/.test(l) && u.push("running in Turbo/Uncompressed mode");
        "IE" == p && /\blike iPhone OS\b/.test(l) ? (q = f(l.replace(/like iPhone OS/, "")),
        X = q.manufacturer,
        D = q.product) : /^iP/.test(D) ? (p || (p = "Safari"),
        K = "iOS" + ((q = / OS ([\d_]+)/i.exec(l)) ? " " + q[1].replace(/_/g, ".") : "")) : "Konqueror" != p || /buntu/i.test(K) ? X && "Google" != X && (/Chrome/.test(p) && !/\bMobile Safari\b/i.test(l) || /\bVita\b/.test(D)) || /\bAndroid\b/.test(K) && /^Chrome/.test(p) && /\bVersion\//i.test(l) ? (p = "Android Browser",
        K = /\bAndroid\b/.test(K) ? K : "Android") : "Silk" == p ? (/\bMobi/i.test(l) || (K = "Android",
        u.unshift("desktop mode")),
        /Accelerated *= *true/i.test(l) && u.unshift("accelerated")) : "PaleMoon" == p && (q = /\bFirefox\/([\d.]+)\b/.exec(l)) ? u.push("identifying as Firefox " + q[1]) : "Firefox" == p && (q = /\b(Mobile|Tablet|TV)\b/i.exec(l)) ? (K || (K = "Firefox OS"),
        D || (D = q[1])) : !p || (q = !/\bMinefield\b/i.test(l) && /\b(?:Firefox|Safari)\b/.exec(p)) ? (p && !D && /[\/,]|^[^(]+?\)/.test(l.slice(l.indexOf(q + "/") + 8)) && (p = null),
        (q = D || X || K) && (D || X || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(K)) && (p = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(K) ? K : q) + " Browser")) : "Electron" == p && (q = (/\bChrome\/([\d.]+)\b/.exec(l) || 0)[1]) && u.push("Chromium " + q) : K = "Kubuntu";
        A || (A = I(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", m(p), "(?:Firefox|Minefield|NetFront)"]));
        if (q = "iCab" == z && 3 < parseFloat(A) && "WebKit" || /\bOpera\b/.test(p) && (/\bOPR\b/.test(l) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(l) && !/^(?:Trident|EdgeHTML)$/.test(z) && "WebKit" || !z && /\bMSIE\b/i.test(l) && ("Mac OS" == K ? "Tasman" : "Trident") || "WebKit" == z && /\bPlayStation\b(?! Vita\b)/i.test(p) && "NetFront")
            z = [q];
        "IE" == p && (q = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(l) || 0)[1]) ? (p += " Mobile",
        K = "Windows Phone " + (/\+$/.test(q) ? q : q + ".x"),
        u.unshift("desktop mode")) : /\bWPDesktop\b/i.test(l) ? (p = "IE Mobile",
        K = "Windows Phone 8.x",
        u.unshift("desktop mode"),
        A || (A = (/\brv:([\d.]+)/.exec(l) || 0)[1])) : "IE" != p && "Trident" == z && (q = /\brv:([\d.]+)/.exec(l)) && (p && u.push("identifying as " + p + (A ? " " + A : "")),
        p = "IE",
        A = q[1]);
        if (M) {
            if (g(B, "global"))
                if (P && (q = P.lang.System,
                W = q.getProperty("os.arch"),
                K = K || q.getProperty("os.name") + " " + q.getProperty("os.version")),
                O) {
                    try {
                        A = B.require("ringo/engine").version.join("."),
                        p = "RingoJS"
                    } catch (Y) {
                        (q = B.system) && q.global.system == B.system && (p = "Narwhal",
                        K || (K = q[0].os || null))
                    }
                    p || (p = "Rhino")
                } else
                    "object" == typeof B.process && !B.process.browser && (q = B.process) && ("object" == typeof q.versions && ("string" == typeof q.versions.electron ? (u.push("Node " + q.versions.node),
                    p = "Electron",
                    A = q.versions.electron) : "string" == typeof q.versions.nw && (u.push("Chromium " + A, "Node " + q.versions.node),
                    p = "NW.js",
                    A = q.versions.nw)),
                    p || (p = "Node.js",
                    W = q.arch,
                    K = q.platform,
                    A = (A = /[\d.]+/.exec(q.version)) ? A[0] : null));
            else
                e(q = B.runtime) == U ? (p = "Adobe AIR",
                K = q.flash.system.Capabilities.os) : e(q = B.phantom) == C ? (p = "PhantomJS",
                A = (q = q.version || null) && q.major + "." + q.minor + "." + q.patch) : "number" == typeof da.documentMode && (q = /\bTrident\/(\d+)/i.exec(l)) ? (A = [A, da.documentMode],
                (q = +q[1] + 4) != A[1] && (u.push("IE " + A[1] + " mode"),
                z && (z[1] = ""),
                A[1] = q),
                A = "IE" == p ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof da.documentMode && /^(?:Chrome|Firefox)\b/.test(p) && (u.push("masking as " + p + " " + A),
                p = "IE",
                A = "11.0",
                z = ["Trident"],
                K = "Windows");
            K = K && c(K)
        }
        A && (q = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(l + ";" + (M && N.appMinorVersion)) || /\bMinefield\b/i.test(l) && "a") && (G = /b/i.test(q) ? "beta" : "alpha",
        A = A.replace(RegExp(q + "\\+?$"), "") + ("beta" == G ? S : V) + (/\d+\+?/.exec(q) || ""));
        if ("Fennec" == p || "Firefox" == p && /\b(?:Android|Firefox OS)\b/.test(K))
            p = "Firefox Mobile";
        else if ("Maxthon" == p && A)
            A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(D))
            "Xbox 360" == D && (K = null),
            "Xbox 360" == D && /\bIEMobile\b/.test(l) && u.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(p) && (!p || D || /Browser|Mobi/.test(p)) || "Windows CE" != K && !/Mobi/i.test(l))
            if ("IE" == p && M)
                try {
                    null === B.external && u.unshift("platform preview")
                } catch (Y) {
                    u.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(D) || /\bBB10\b/.test(l)) && (q = (RegExp(D.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(l) || 0)[1] || A) ? (q = [q, /BB10/.test(l)],
                K = (q[1] ? (D = null,
                X = "BlackBerry") : "Device Software") + " " + q[0],
                A = null) : this != d && "Wii" != D && (M && ba || /Opera/.test(p) && /\b(?:MSIE|Firefox)\b/i.test(l) || "Firefox" == p && /\bOS X (?:\d+\.){2,}/.test(K) || "IE" == p && (K && !/^Win/.test(K) && 5.5 < A || /\bWindows XP\b/.test(K) && 8 < A || 8 == A && !/\bTrident\b/.test(l))) && !w.test(q = f.call(d, l.replace(w, "") + ";")) && q.name && (q = "ing as " + q.name + ((q = q.version) ? " " + q : ""),
                w.test(p) ? (/\bIE\b/.test(q) && "Mac OS" == K && (K = null),
                q = "identify" + q) : (q = "mask" + q,
                p = Z ? c(Z.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(q) && (K = null),
                M || (A = null)),
                z = ["Presto"],
                u.push(q));
        else
            p += " Mobile";
        if (q = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(l) || 0)[1]) {
            q = [parseFloat(q.replace(/\.(\d)$/, ".0$1")), q];
            if ("Safari" == p && "+" == q[1].slice(-1))
                p = "WebKit Nightly",
                G = "alpha",
                A = q[1].slice(0, -1);
            else if (A == q[1] || A == (q[2] = (/\bSafari\/([\d.]+\+?)/i.exec(l) || 0)[1]))
                A = null;
            q[1] = (/\bChrome\/([\d.]+)/i.exec(l) || 0)[1];
            537.36 == q[0] && 537.36 == q[2] && 28 <= parseFloat(q[1]) && "WebKit" == z && (z = ["Blink"]);
            M && (Q || q[1]) ? (z && (z[1] = "like Chrome"),
            q = q[1] || (q = q[0],
            530 > q ? 1 : 532 > q ? 2 : 532.05 > q ? 3 : 533 > q ? 4 : 534.03 > q ? 5 : 534.07 > q ? 6 : 534.1 > q ? 7 : 534.13 > q ? 8 : 534.16 > q ? 9 : 534.24 > q ? 10 : 534.3 > q ? 11 : 535.01 > q ? 12 : 535.02 > q ? "13+" : 535.07 > q ? 15 : 535.11 > q ? 16 : 535.19 > q ? 17 : 536.05 > q ? 18 : 536.1 > q ? 19 : 537.01 > q ? 20 : 537.11 > q ? "21+" : 537.13 > q ? 23 : 537.18 > q ? 24 : 537.24 > q ? 25 : 537.36 > q ? 26 : "Blink" != z ? "27" : "28")) : (z && (z[1] = "like Safari"),
            q = (q = q[0],
            400 > q ? 1 : 500 > q ? 2 : 526 > q ? 3 : 533 > q ? 4 : 534 > q ? "4+" : 535 > q ? 5 : 537 > q ? 6 : 538 > q ? 7 : 601 > q ? 8 : "8"));
            z && (z[1] += " " + (q += "number" == typeof q ? ".x" : /[.+]/.test(q) ? "" : "+"));
            "Safari" == p && (!A || 45 < parseInt(A)) && (A = q)
        }
        "Opera" == p && (q = /\bzbov|zvav$/.exec(K)) ? (p += " ",
        u.unshift("desktop mode"),
        "zvav" == q ? (p += "Mini",
        A = null) : p += "Mobile",
        K = K.replace(RegExp(" *" + q + "$"), "")) : "Safari" == p && /\bChrome\b/.exec(z && z[1]) && (u.unshift("desktop mode"),
        p = "Chrome Mobile",
        A = null,
        /\bOS X\b/.test(K) ? (X = "Apple",
        K = "iOS 4.3+") : K = null);
        A && 0 == A.indexOf(q = /[\d.]+$/.exec(K)) && -1 < l.indexOf("/" + q + "-") && (K = String(K.replace(q, "")).replace(/^ +| +$/g, ""));
        z && !/\b(?:Avant|Nook)\b/.test(p) && (/Browser|Lunascape|Maxthon/.test(p) || "Safari" != p && /^iOS/.test(K) && /\bSafari\b/.test(z[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(p) && z[1]) && (q = z[z.length - 1]) && u.push(q);
        u.length && (u = ["(" + u.join("; ") + ")"]);
        X && D && 0 > D.indexOf(X) && u.push("on " + X);
        D && u.push((/^on /.test(u[u.length - 1]) ? "" : "on ") + D);
        if (K) {
            var ca = (q = / ([\d.+]+)$/.exec(K)) && "/" == K.charAt(K.length - q[0].length - 1);
            K = {
                architecture: 32,
                family: q && !ca ? K.replace(q[0], "") : K,
                version: q ? q[1] : null,
                toString: function() {
                    var Y = this.version;
                    return this.family + (Y && !ca ? " " + Y : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (q = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(W)) && !/\bi686\b/i.test(W) ? (K && (K.architecture = 64,
        K.family = K.family.replace(RegExp(" *" + q), "")),
        p && (/\bWOW64\b/i.test(l) || M && /\w(?:86|32)$/.test(N.cpuClass || N.platform) && !/\bWin64; x64\b/i.test(l)) && u.unshift("32-bit")) : K && /^OS X/.test(K.family) && "Chrome" == p && 39 <= parseFloat(A) && (K.architecture = 64);
        l || (l = null);
        B = {};
        B.description = l;
        B.layout = z && z[0];
        B.manufacturer = X;
        B.name = p;
        B.prerelease = G;
        B.product = D;
        B.ua = l;
        B.version = p && A;
        B.os = K || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        B.parse = f;
        B.toString = function() {
            return this.description || ""
        }
        ;
        B.version && u.unshift(A);
        B.name && u.unshift(p);
        K && p && (K != String(K).split(" ")[0] || K != p.split(" ")[0] && !D) && u.push(D ? "(" + K + ")" : "on " + K);
        u.length && (B.description = u.join(" "));
        return B
    }
    var h = {
        "function": !0,
        object: !0
    }
      , r = h[typeof window] && window || this
      , x = h[typeof exports] && exports;
    h = h[typeof module] && module && !module.nodeType && module;
    var t = x && h && "object" == typeof global && global;
    !t || t.global !== t && t.window !== t && t.self !== t || (r = t);
    var v = Math.pow(2, 53) - 1
      , w = /\bOpera/;
    t = Object.prototype;
    var H = t.hasOwnProperty
      , E = t.toString
      , y = f();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (r.platform = y,
    define(function() {
        return y
    })) : x && h ? d(y, function(l, J) {
        x[J] = l
    }) : r.platform = y
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
      , b = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === b && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(),
    buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1, s_bIsIphone = !1, s_bFocus = !0;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
)(navigator.userAgent || navigator.vendor || window.Firefox);
$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone"))
        return s_bIsIphone = !0;
    for (; a.length; )
        if (navigator.platform === a.pop())
            return !0;
    return s_bIsIphone = !1
}
function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}
function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}
function getSize(a) {
    var b = a.toLowerCase()
      , c = window.document
      , d = c.documentElement;
    if (void 0 === window["inner" + a])
        a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var e = c.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var g = c.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + b + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        e.appendChild(g);
        d.insertBefore(e, c.head);
        a = 7 == g["offset" + a] ? d["client" + a] : window["inner" + a];
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
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var b = getSize("Width");
        s_bFocus && _checkOrientation(b, a);
        var c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH)
          , d = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var e = a - c;
            c += e;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * e
        } else
            d < b && (e = b - d,
            d += e,
            c += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        e = a / 2 - c / 2;
        var g = b / 2 - d / 2
          , m = CANVAS_WIDTH / d;
        if (g * m < -EDGEBOARD_X || e * m < -EDGEBOARD_Y)
            c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            d = Math.round(CANVAS_WIDTH * c),
            c = Math.round(CANVAS_HEIGHT * c),
            e = (a - c) / 2,
            g = (b - d) / 2,
            m = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * g * m;
        s_iOffsetY = -1 * e * m;
        0 <= e && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone && s_oStage ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * d,
        s_oStage.canvas.height = 2 * c,
        canvas.style.width = d + "px",
        canvas.style.height = c + "px",
        b = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_iScaleFactor = 2 * b,
        s_oStage.scaleX = s_oStage.scaleY = 2 * b) : s_bMobile || isChrome() ? ($("#canvas").css("width", d + "px"),
        $("#canvas").css("height", c + "px")) : s_oStage && (s_oStage.canvas.width = d,
        s_oStage.canvas.height = c,
        s_iScaleFactor = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > e || (e = (a - c) / 2);
        $("#canvas").css("top", e + "px");
        $("#canvas").css("left", g + "px");
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
      , e = new createjs.Shape;
    b && c ? e.graphics.beginFill("#fff").drawRect(0, 0, b, c) : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = e;
    return d
}
function createSprite(a, b, c, d, e, g) {
    a = null !== b ? new createjs.Sprite(a,b) : new createjs.Sprite(a);
    b = new createjs.Shape;
    b.graphics.beginFill("#000000").drawRect(-c, -d, e, g);
    a.hitArea = b;
    return a
}
function randomFloatBetween(a, b, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c))
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
function interpolate(a, b, c) {
    return {
        x: a.x + (b.x - a.x) * c,
        y: a.y + (b.y - a.y) * c
    }
}
function formatTime(a) {
    a /= 1E3;
    var b = Math.floor(a / 60);
    a = parseFloat(a - 60 * b).toFixed(1);
    var c = "";
    c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
    return 10 > a ? c + ("0" + a) : c + a
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
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            a.dispatchEvent(b)
        }
    }
};
function playSound(a, b, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(b),
    s_aSounds[a].loop(c),
    s_aSounds[a]) : null
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}
function setVolume(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(b)
}
function setMute(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(b)
}
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
(function() {
    function a(c) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        c = c || window.event;
        c.type in d ? document.body.className = d[c.type] : (document.body.className = this[b] ? "hidden" : "visible",
        "hidden" === document.body.className ? (s_oMain.stopUpdate(),
        s_bFocus = !1) : (s_oMain.startUpdate(),
        s_bFocus = !0))
    }
    var b = "hidden";
    b in document ? document.addEventListener("visibilitychange", a) : (b = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (b = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (b = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
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
function saveItem(a, b) {
    s_bStorageAvailable && localStorage.setItem(a, b)
}
function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}
function clearLocalStorage() {
    TOTAL_MONEY = START_MONEY;
    if (s_bStorageAvailable)
        for (var a = 0; null !== localStorage.key(a); ) {
            var b = localStorage.key(a);
            -1 !== b.indexOf(LOCALSTORAGE_STRING) ? localStorage.removeItem(b) : a++
        }
}
function CSpriteLibrary() {
    var a = {}, b, c, d, e, g, m;
    this.init = function(k, f, h) {
        b = {};
        d = c = 0;
        e = k;
        g = f;
        m = h
    }
    ;
    this.addSprite = function(k, f) {
        if (a.hasOwnProperty(k))
            return !1;
        var h = new Image;
        a[k] = b[k] = {
            szPath: f,
            oSprite: h,
            bLoaded: !1
        };
        c++;
        return !0
    }
    ;
    this.getSprite = function(k) {
        return a.hasOwnProperty(k) ? a[k].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        c = 0;
        g.call(m)
    }
    ;
    this._onSpriteLoaded = function() {
        e.call(m);
        ++d === c && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var k in b)
            b[k].oSprite.oSpriteLibrary = this,
            b[k].oSprite.szKey = k,
            b[k].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            b[k].oSprite.onerror = function(f) {
                var h = f.currentTarget;
                setTimeout(function() {
                    b[h.szKey].oSprite.src = b[h.szKey].szPath
                }, 500)
            }
            ,
            b[k].oSprite.src = b[k].szPath
    }
    ;
    this.setLoaded = function(k) {
        a[k].bLoaded = !0
    }
    ;
    this.isLoaded = function(k) {
        return a[k].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1920, CANVAS_HEIGHT = 1080, EDGEBOARD_X = 256, EDGEBOARD_Y = 84, FPS = 60, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, DISABLE_SOUND_DESKTOP = !1, LOCALSTORAGE_STRING = "slot_zeus_treasure_", FONT_GAME_1 = "robotoblack", STATE_LOADING = 0, STATE_MENU = 1, STATE_GAME = 2, GAME_STATE_IDLE = 0, GAME_STATE_SPINNING = 1, GAME_STATE_SHOW_ALL_WIN = 2, GAME_STATE_SHOW_WIN = 3, GAME_STATE_BONUS = 4, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, SPIN_BUT_STATE_SPIN = "spin", SPIN_BUT_STATE_STOP = "stop", SPIN_BUT_STATE_AUTOSPIN = "autospin", SPIN_BUT_STATE_DISABLE = "disable", SPIN_BUT_STATE_FREESPIN = "freespin", SPIN_BUT_STATE_SKIP = "skip", ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, ON_END_BIG_WIN = 6, ON_BUT_YES_DOWN = 7, BONUS_BUTTON_1 = "up_left", BONUS_BUTTON_2 = "center_left", BONUS_BUTTON_3 = "down_left", BONUS_BUTTON_4 = "up_right", BONUS_BUTTON_5 = "center_right", BONUS_BUTTON_6 = "down_right", REEL_OFFSET_X = 320, REEL_OFFSET_Y = 150, START_REEL_OFFSET_X, START_REEL_OFFSET_Y, NUM_REELS = 5, NUM_ROWS = 3, NUM_SYMBOLS = 10, WILD_SYMBOL = 7, BONUS_SYMBOL = 9, FREESPIN_SYMBOL = 8, NUM_PAYLINES = 20, SYMBOL_WIDTH = 240, SYMBOL_HEIGHT = 230, SYMBOL_ANIM_WIDTH = 480, SYMBOL_ANIM_HEIGHT = 460, WIN_BIG_ANIM_WIDTH = 564, WIN_BIG_ANIM_HEIGHT = 542, SPACE_BETWEEN_SYMBOLS = 17, SPACE_HEIGHT_BETWEEN_SYMBOLS = 0, OFFSET_Y_SYMBOLS = 24, MAX_FRAMES_REEL_EASE = 24, MIN_REEL_LOOPS, SUSPANCE_REEL_LOOPS = 5, REEL_DELAY, REEL_START_Y = 80 - 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS), REEL_ARRIVAL_Y = 80 + 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS), TIME_SHOW_WIN, TIME_SHOW_ALL_WINS = 2E3, TIME_SPIN_BUT_CHANGE = 1E3, TIME_HOLD_AUTOSPIN = 1E3, MIN_TIME_EFFECT_FREESPIN = 600, MAX_TIME_EFFECT_FREESPIN = 3E3, WIN_PER_BIG_WIN = 25, MAX_BET, TOTAL_MONEY, START_BET, COIN_BET, BONUS_FREESPIN = 1, BONUS_GAME = 2, REEL_SCALE = .85, STATE_BONUS_IDLE = 0, STATE_BONUS_KICK = 1, STATE_BONUS_WIN = 2, STATE_BONUS_LOSE = 3, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SOUNDTRACK_VOLUME_IN_GAME = 1, RESTART_CREDIT, NUM_SPIN_FOR_ADS, START_MONEY, WIN_OCCURRENCE = 35, FREESPIN_OCCURRENCE = 10, BONUS_OCCURRENCE = 10, SLOT_CASH = 100, NUM_FREESPIN = [3, 4, 5], BONUS_PRIZE = [10, 30, 60, 90, 100], BONUS_PRIZE_OCCURRENCE = [40, 25, 20, 10, 5], MAX_PRIZES_BONUS = 5, _iCoinBets = [.05, .1, .15, .2, .25, .3, .35, .4, .45, .5], PAYTABLE_VALUES = [[0, 0, 5, 20, 100], [0, 0, 5, 20, 100], [0, 0, 5, 20, 100], [0, 0, 10, 30, 150], [0, 0, 20, 50, 200], [0, 0, 25, 70, 300], [0, 0, 25, 100, 500]], _bBonus = !1, _bFreespinEnable = !1, _iMinWin, _iTotFreeSpin = 0, _iNumSymbolFreeSpin = 0, _aCbCompleted = [], _aCbOwner = [], _aSymbolWin = [], _iFreespinSymbolNumOccur = [50, 30, 20], _aPaylineCombo = [], _aFinalSymbols;
function APIgetSlotInfos(a, b) {
    a.call(b, {
        start_money: TOTAL_MONEY,
        bets: _iCoinBets,
        start_bet: _iCoinBets[0],
        paytable: PAYTABLE_VALUES
    })
}
function APIAttemptSpin(a, b, c, d, e) {
    if (a > TOTAL_MONEY)
        _dieError("INVALID BET: " + a + ",money:" + TOTAL_MONEY, d, e);
    else {
        TOTAL_MONEY -= a;
        SLOT_CASH += a;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
        var g = _bBonus = !1;
        if (SLOT_CASH < _iMinWin * b)
            generLosingPattern(),
            !0 === _bFreespinEnable && (_iTotFreeSpin--,
            0 > _iTotFreeSpin && (_iTotFreeSpin = 0,
            _bFreespinEnable = !1)),
            a = {
                res: !0,
                win: !1,
                pattern: _aFinalSymbols,
                win_lines: {},
                money: TOTAL_MONEY,
                tot_win: 0,
                freespin: !1,
                num_freespin: _iTotFreeSpin,
                bonus: !1,
                bonus_prize: -1,
                cash: SLOT_CASH
            };
        else if (Math.floor(100 * Math.random()) < WIN_OCCURRENCE) {
            if (!1 === _bFreespinEnable && !1 === _bBonus) {
                var m = Math.floor(100 * Math.random());
                0 === _iTotFreeSpin && m < FREESPIN_OCCURRENCE + BONUS_OCCURRENCE && (m = Math.floor(Math.random() * (FREESPIN_OCCURRENCE + BONUS_OCCURRENCE) + 1),
                m <= FREESPIN_OCCURRENCE ? g = !0 : _bBonus = SLOT_CASH >= BONUS_PRIZE[0] * b ? !0 : !1)
            }
            m = 0;
            do {
                generateRandomSymbols(g);
                for (var k = checkWin(g, c), f = 0, h = 0; h < k.length; h++)
                    f += k[h].amount;
                f *= b;
                m++
            } while (0 === k.length || 0 + f > SLOT_CASH || 0 + f < a);
            TOTAL_MONEY += f + 0;
            SLOT_CASH -= f + 0;
            TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
            SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
            g && 2 < _iNumSymbolFreeSpin ? (_bFreespinEnable = !0,
            _iTotFreeSpin = NUM_FREESPIN[_iNumSymbolFreeSpin - 3]) : !0 === _bFreespinEnable && (_iTotFreeSpin--,
            0 > _iTotFreeSpin && (_iTotFreeSpin = 0,
            _bFreespinEnable = !1));
            a = {
                res: !0,
                win: !0,
                pattern: _aFinalSymbols,
                win_lines: k,
                money: TOTAL_MONEY,
                tot_win: f,
                freespin: g,
                num_freespin: _iTotFreeSpin,
                bonus: _bBonus,
                bonus_prize: -1,
                cash: SLOT_CASH
            }
        } else
            generLosingPattern(),
            !0 === _bFreespinEnable && (_iTotFreeSpin--,
            0 > _iTotFreeSpin && (_iTotFreeSpin = 0,
            _bFreespinEnable = !1)),
            a = {
                res: !0,
                win: !1,
                pattern: _aFinalSymbols,
                win_lines: {},
                money: TOTAL_MONEY,
                tot_win: 0,
                freespin: !1,
                num_freespin: _iTotFreeSpin,
                bonus: !1,
                bonus_prize: -1
            };
        d.call(e, a)
    }
}
function apiAttemptBonus(a, b, c) {
    for (var d = [], e = 0; e < BONUS_PRIZE_OCCURRENCE.length; e++)
        for (var g = BONUS_PRIZE_OCCURRENCE[e], m = 0; m < g; m++)
            d.push(e);
    g = Math.floor(Math.random() * MAX_PRIZES_BONUS) + 1;
    m = [];
    var k = 0;
    for (e = 0; e < g; e++) {
        var f = BONUS_PRIZE[d[Math.floor(Math.random() * d.length)]] * a;
        k + f > SLOT_CASH && (f = 0);
        k += f;
        m.push(f);
        TOTAL_MONEY += f;
        SLOT_CASH -= f;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2))
    }
    0 === m.length && (m = [0],
    k = 0);
    a = {
        res: !0,
        money: TOTAL_MONEY,
        bonus_win: k,
        prize_list: JSON.stringify(m)
    };
    b.call(c, a)
}
function checkWin(a, b) {
    for (var c = [], d = 0; d < b; d++) {
        var e = _aPaylineCombo[d]
          , g = []
          , m = _aFinalSymbols[e[0].row][e[0].col]
          , k = 1
          , f = 1;
        for (g.push({
            row: e[0].row,
            col: e[0].col,
            value: _aFinalSymbols[e[0].row][e[0].col]
        }); m === WILD_SYMBOL && f < NUM_REELS; )
            k++,
            m = _aFinalSymbols[e[f].row][e[f].col],
            g.push({
                row: e[f].row,
                col: e[f].col,
                value: _aFinalSymbols[e[f].row][e[f].col]
            }),
            f++;
        for (; f < e.length; f++)
            if (_aFinalSymbols[e[f].row][e[f].col] === m || _aFinalSymbols[e[f].row][e[f].col] === WILD_SYMBOL)
                k++,
                g.push({
                    row: e[f].row,
                    col: e[f].col,
                    value: _aFinalSymbols[e[f].row][e[f].col]
                });
            else
                break;
        !(0 < _aSymbolWin[m][k - 1]) || a && m === FREESPIN_SYMBOL || _bBonus && m === BONUS_SYMBOL || (g.sort(sortListByCol),
        c.push({
            line: d + 1,
            amount: _aSymbolWin[m][k - 1],
            num_win: k,
            value: m,
            list: g
        }))
    }
    if (a) {
        g = [];
        for (d = 0; d < NUM_ROWS; d++)
            for (e = 0; e < NUM_REELS; e++)
                _aFinalSymbols[d][e] === FREESPIN_SYMBOL && g.push({
                    row: d,
                    col: e,
                    value: FREESPIN_SYMBOL
                });
        g.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: g.length,
            value: FREESPIN_SYMBOL,
            list: g
        })
    } else if (_bBonus) {
        g = [];
        for (d = 0; d < NUM_ROWS; d++)
            for (e = 0; e < NUM_REELS; e++)
                _aFinalSymbols[d][e] === BONUS_SYMBOL && g.push({
                    row: d,
                    col: e,
                    value: BONUS_SYMBOL
                });
        g.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: g.length,
            value: BONUS_SYMBOL,
            list: g
        })
    }
    return c
}
function generateRandomSymbols(a) {
    _aFinalSymbols = [];
    for (var b = 0; b < NUM_ROWS; b++) {
        _aFinalSymbols[b] = [];
        for (var c = 0; c < NUM_REELS; c++) {
            do {
                var d = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
                _aFinalSymbols[b][c] = d
            } while (d === BONUS_SYMBOL || d === FREESPIN_SYMBOL)
        }
    }
    if (a) {
        a = [];
        for (b = 0; b < _iFreespinSymbolNumOccur.length; b++)
            for (c = 0; c < _iFreespinSymbolNumOccur[b]; c++)
                a.push(b);
        _iNumSymbolFreeSpin = 3 + a[Math.floor(Math.random() * a.length)];
        b = [0, 1, 2, 3, 4];
        b = shuffle(b);
        for (c = 0; c < _iNumSymbolFreeSpin; c++)
            a = Math.floor(3 * Math.random()),
            _aFinalSymbols[a][b[c]] = FREESPIN_SYMBOL
    } else if (_bBonus)
        for (b = [0, 1, 2, 3, 4],
        b = shuffle(b),
        d = Math.floor(3 * Math.random() + 3),
        c = 0; c < d; c++)
            a = Math.floor(3 * Math.random()),
            _aFinalSymbols[a][b[c]] = BONUS_SYMBOL
}
function generLosingPattern() {
    for (var a = [], b = 0; b < NUM_ROWS; b++) {
        do
            var c = Math.floor(Math.random() * s_aRandSymbols.length);
        while (s_aRandSymbols[c] === BONUS_SYMBOL || s_aRandSymbols[c] === FREESPIN_SYMBOL || s_aRandSymbols[c] === WILD_SYMBOL);
        c = s_aRandSymbols[c];
        a[b] = c
    }
    var d = 0
      , e = 0;
    _aFinalSymbols = [];
    for (b = 0; b < NUM_ROWS; b++) {
        _aFinalSymbols[b] = [];
        for (var g = 0; g < NUM_REELS; g++)
            if (0 == g)
                _aFinalSymbols[b][g] = a[b];
            else {
                do
                    c = Math.floor(Math.random() * s_aRandSymbols.length),
                    c = s_aRandSymbols[c];
                while (a[0] === c || a[1] === c || a[2] === c || c === BONUS_SYMBOL && 2 === d || c === FREESPIN_SYMBOL && 2 === e || c === WILD_SYMBOL);
                _aFinalSymbols[b][g] = c;
                c === BONUS_SYMBOL ? d++ : c === FREESPIN_SYMBOL && e++
            }
    }
    return _aFinalSymbols
}
function refreshCredit(a, b, c) {
    TOTAL_MONEY = a;
    b.call(c, TOTAL_MONEY)
}
function formatEntries(a) {
    return a.toFixed(2)
}
function _dieError(a, b, c) {
    b.call(c, "res=false&desc=" + a)
}
function sortListByCol(a, b) {
    return a.col < b.col ? -1 : a.col > b.col ? 1 : 0
}
function _initSymbolWin() {
    _aSymbolWin = [];
    for (var a = 0; a < PAYTABLE_VALUES.length; a++) {
        _aSymbolWin[a] = [];
        for (var b = 0; b < PAYTABLE_VALUES[a].length; b++)
            _aSymbolWin[a][b] = PAYTABLE_VALUES[a][b]
    }
    for (a = PAYTABLE_VALUES.length; a < NUM_SYMBOLS; a++)
        _aSymbolWin[a] = [0, 0, 0, 0, 0]
}
function _setMinWin() {
    _iMinWin = 9999999999999;
    for (var a = 0; a < _aSymbolWin.length; a++)
        for (var b = _aSymbolWin[a], c = 0; c < b.length; c++)
            0 !== b[c] && b[c] < _iMinWin && (_iMinWin = b[c])
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
        row: 1,
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
function _init() {
    _initSymbolWin();
    _aPaylineCombo = _initPaylines();
    _setMinWin()
}
_init();
function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    }
    ;
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var b = s_oSpriteLibrary.getSprite("symbol_" + a);
            s_aSymbolData[a] = new createjs.SpriteSheet({
                images: [b],
                frames: {
                    width: SYMBOL_WIDTH,
                    height: b.height,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": 0,
                    moving: 1
                }
            })
        }
    }
    ;
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(9);
        for (a = 0; 2 > a; a++)
            s_aRandSymbols.push(8);
        for (a = 0; 3 > a; a++)
            s_aRandSymbols.push(7);
        for (a = 0; 4 > a; a++)
            s_aRandSymbols.push(6);
        for (a = 0; 5 > a; a++)
            s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++)
            s_aRandSymbols.push(4);
        for (a = 0; 7 > a; a++)
            s_aRandSymbols.push(3);
        for (a = 0; 8 > a; a++)
            s_aRandSymbols.push(2),
            s_aRandSymbols.push(1),
            s_aRandSymbols.push(0)
    }
    ;
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var b = {
                framerate: FPS,
                images: [s_oSpriteLibrary.getSprite("symbol_" + a + "_0"), s_oSpriteLibrary.getSprite("symbol_" + a + "_1"), s_oSpriteLibrary.getSprite("symbol_" + a + "_2"), s_oSpriteLibrary.getSprite("symbol_" + a + "_3"), s_oSpriteLibrary.getSprite("symbol_" + a + "_4"), s_oSpriteLibrary.getSprite("symbol_" + a + "_5"), s_oSpriteLibrary.getSprite("symbol_" + a + "_6"), s_oSpriteLibrary.getSprite("symbol_" + a + "_7")],
                frames: {
                    width: SYMBOL_ANIM_WIDTH,
                    height: SYMBOL_ANIM_HEIGHT
                },
                animations: {
                    "static": 0,
                    anim: [0, 119]
                }
            };
            s_aSymbolAnims[a] = new createjs.SpriteSheet(b)
        }
    }
    ;
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolAnims, s_aRandSymbols;
function CMenu() {
    var a, b, c, d, e, g, m, k, f = null, h = null, r, x, t, v, w, H, E, y;
    this._init = function() {
        r = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oAttachSection.addChild(r);
        var l = s_oSpriteLibrary.getSprite("logo_menu")
          , J = createBitmap(l);
        J.regX = l.width / 2;
        J.regY = l.height / 2;
        J.x = CANVAS_WIDTH / 2;
        J.y = CANVAS_HEIGHT / 2 - 150;
        J.alpha = 0;
        J.scale = 0;
        s_oAttachSection.addChild(J);
        l = s_oSpriteLibrary.getSprite("but_play");
        x = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 250,l,s_oAttachSection);
        x.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            l = s_oSpriteLibrary.getSprite("audio_icon"),
            m = CANVAS_WIDTH - l.width / 4 - 4,
            k = l.height / 2 + 4,
            v = new CToggle(m,k,l,s_bAudioActive),
            v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (l = s_oSpriteLibrary.getSprite("but_credits"),
        a = l.width / 2 + 4,
        b = l.height / 2 + 4,
        w = new CGfxButton(a,b,l,s_oAttachSection),
        w.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        e = a + l.width + 4,
        g = b) : (e = l.width / 2 + 4,
        g = l.height / 2 + 4);
        l = window.document;
        var I = l.documentElement;
        f = I.requestFullscreen || I.mozRequestFullScreen || I.webkitRequestFullScreen || I.msRequestFullscreen;
        h = l.exitFullscreen || l.mozCancelFullScreen || l.webkitExitFullscreen || l.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (f = !1);
        f && screenfull.isEnabled && (l = s_oSpriteLibrary.getSprite("but_fullscreen"),
        H = new CToggle(e,g,l,s_bFullscreen,s_oAttachSection),
        H.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        l = s_oSpriteLibrary.getSprite("but_delete_savings");
        c = l.width / 2 + 4;
        d = CANVAS_HEIGHT - l.height / 2 - 4;
        t = new CGfxButton(c,d,l,s_oAttachSection);
        t.addEventListener(ON_MOUSE_UP, this._onDeleteSavings, this);
        s_bStorageAvailable ? !RESTART_CREDIT && getItem(LOCALSTORAGE_STRING + "score") ? TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING + "score")) : t.setVisible(!1) : (s_oMsgBox.show(TEXT_ERR_LS),
        t.setVisible(!1));
        y = new CAreYouSurePanel;
        y.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        E = new createjs.Shape;
        E.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oAttachSection.addChild(E);
        createjs.Tween.get(E).to({
            alpha: 0
        }, 400).call(function() {
            E.visible = !1
        });
        this.refreshButtonPos();
        createjs.Tween.get(J).to({
            alpha: 1
        }, 800, createjs.Ease.quintOut);
        createjs.Tween.get(J).to({
            scale: 1
        }, 800, createjs.Ease.backOut)
    }
    ;
    this.unload = function() {
        x.unload();
        x = null;
        t.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            v.unload(),
            v = null;
        SHOW_CREDITS && w.unload();
        f && screenfull.isEnabled && H.unload();
        s_oAttachSection.removeChild(r);
        r = null;
        s_oAttachSection.removeChild(E);
        s_oMenu = E = null
    }
    ;
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(m - s_iOffsetX, s_iOffsetY + k);
        SHOW_CREDITS && w.setPosition(a + s_iOffsetX, b + s_iOffsetY);
        f && screenfull.isEnabled && H.setPosition(e + s_iOffsetX, g + s_iOffsetY);
        t.setPosition(c + s_iOffsetX, d - s_iOffsetY)
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
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
        f && screenfull.isEnabled && H.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? h.call(window.document) : f.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onDeleteSavings = function() {
        y.show(TEXT_DELETE_SAVINGS + ": " + START_MONEY + TEXT_CURRENCY + "\n" + TEXT_ARE_SURE)
    }
    ;
    this._onExitYes = function() {
        clearLocalStorage();
        t.setVisible(!1)
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CCreditsPanel() {
    var a, b, c, d, e, g, m, k, f = this;
    this._init = function() {
        k = new createjs.Container;
        s_oStage.addChild(k);
        c = new createjs.Shape;
        b = c.on("click", function() {});
        c.alpha = 0;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(c);
        d = new createjs.Container;
        k.addChild(d);
        var h = s_oSpriteLibrary.getSprite("msg_box");
        m = createBitmap(h);
        m.regX = h.width / 2;
        m.regY = h.height / 2;
        d.addChild(m);
        a = m.on("click", this._onLogoButRelease);
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        h = new createjs.Text("www.codethislab.com","52px " + FONT_GAME_1,"#ffba00");
        h.y = 40;
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.lineWidth = 300;
        d.addChild(h);
        h = s_oSpriteLibrary.getSprite("ctl_logo");
        g = createBitmap(h);
        g.y = -150;
        g.regX = h.width / 2;
        g.regY = h.height / 2;
        d.addChild(g);
        h = s_oSpriteLibrary.getSprite("but_yes");
        e = new CGfxButton(0,200,h,d);
        e.addEventListener(ON_MOUSE_UP, this.hide, this);
        d.scale = 0;
        c.alpha = 0;
        createjs.Tween.get(c).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut)
    }
    ;
    this.unload = function() {
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500).call(function() {
            s_oStage.removeChild(k);
            e.unload()
        });
        c.off("click", b);
        m.off("click", a)
    }
    ;
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    }
    ;
    this.hide = function() {
        e.disable();
        createjs.Tween.get(c).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            f.unload()
        })
    }
    ;
    this._init()
}
function CAreYouSurePanel() {
    var a, b, c, d, e, g, m, k, f, h, r = this;
    this._init = function() {
        a = [];
        b = [];
        f = new createjs.Container;
        f.visible = !1;
        s_oStage.addChild(f);
        h = new createjs.Shape;
        c = h.on("click", function() {});
        h.alpha = 0;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(h);
        var x = s_oSpriteLibrary.getSprite("msg_box_small");
        k = new createjs.Container;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2;
        k.regX = .5 * x.width;
        k.regY = .5 * x.height;
        f.addChild(k);
        d = createBitmap(x);
        k.addChild(d);
        e = new CTLText(k,50,60,x.width - 100,180,90,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_ARE_SURE,!0,!0,!0,!1);
        g = new CGfxButton(x.width - 130,380,s_oSpriteLibrary.getSprite("but_yes"),k);
        g.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        m = new CGfxButton(130,380,s_oSpriteLibrary.getSprite("but_no"),k);
        m.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        this.disableButtons()
    }
    ;
    this.addEventListener = function(x, t, v) {
        a[x] = t;
        b[x] = v
    }
    ;
    this.disableButtons = function() {
        g.disable();
        m.disable()
    }
    ;
    this.enableButtons = function() {
        m.enable();
        g.enable()
    }
    ;
    this.show = function(x) {
        e.refreshText(x);
        f.visible = !0;
        k.scale = 0;
        h.alpha = 0;
        createjs.Tween.get(h).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(k).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            s_oMain.stopUpdateNoBlock();
            r.enableButtons()
        })
    }
    ;
    this.hide = function(x) {
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(k).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            f.visible = !1;
            x && a[ON_BUT_YES_DOWN] && a[ON_BUT_YES_DOWN].call(b[ON_BUT_YES_DOWN])
        })
    }
    ;
    this.unload = function() {
        m.unload();
        g.unload();
        h.off("click", c)
    }
    ;
    this._onButYes = function() {
        r.disableButtons();
        r.hide(!0)
    }
    ;
    this._onButNo = function() {
        r.disableButtons();
        r.hide(!1)
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
    setY: function(a) {
        this._y = this._oText.y = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getString: function() {
        return this._oText.text
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
function CTLText(a, b, c, d, e, g, m, k, f, h, r, x, t, v, w, H, E) {
    this._oContainer = a;
    this._x = b;
    this._y = c;
    this._iWidth = d;
    this._iHeight = e;
    this._bMultiline = H;
    this._iFontSize = g;
    this._szAlign = m;
    this._szColor = k;
    this._szFont = f;
    this._iPaddingH = r;
    this._iPaddingV = x;
    this._bVerticalAlign = w;
    this._bFitText = v;
    this._bDebug = E;
    this._oDebugShape = null;
    this._fLineHeightFactor = h;
    this._oText = null;
    t && this.__createText(t)
}
function CPreloader() {
    var a, b, c, d, e, g, m, k, f;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        f = new createjs.Container;
        s_oStage.addChild(f)
    }
    ;
    this.unload = function() {
        f.removeAllChildren()
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
        var h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(h);
        h = s_oSpriteLibrary.getSprite("200x200");
        m = createBitmap(h);
        m.regX = .5 * h.width;
        m.regY = .5 * h.height;
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2 - 120;
        f.addChild(m);
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(m.x - 100, m.y - 100, 200, 200, 10);
        f.addChild(k);
        m.mask = k;
        h = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(h);
        d.x = CANVAS_WIDTH / 2 - h.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        f.addChild(d);
        a = h.width;
        b = h.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, b);
        f.addChild(e);
        d.mask = e;
        c = new createjs.Text("","30px " + FONT_GAME_1,"#ffba00");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 120;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        f.addChild(c);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(g);
        createjs.Tween.get(g).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(g);
            f.removeChild(g)
        })
    }
    ;
    this.refreshLoader = function(h) {
        c.text = h + "%";
        100 === h && (s_oMain._onRemovePreloader(),
        c.visible = !1,
        d.visible = !1);
        e.graphics.clear();
        h = Math.floor(h * a / 100);
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, h, b)
    }
    ;
    this._init()
}
function CMain(a) {
    var b, c = 0, d = 0, e = STATE_LOADING, g, m;
    this.initContainer = function() {
        var f = document.getElementById("canvas");
        s_oStage = new createjs.Stage(f);
        s_oAttachSection = new createjs.Container;
        s_oStage.addChild(s_oAttachSection);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = FPS;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        this._loadImages();
        (!1 === DISABLE_SOUND_DESKTOP && !1 === s_bMobile || !0 === s_bMobile && !1 === DISABLE_SOUND_MOBILE) && this._initSounds();
        b = !0
    }
    ;
    this.soundLoaded = function() {
        c++;
        g.refreshLoader(Math.floor(c / d * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ambience_game",
            loop: !0,
            volume: 1,
            ingamename: "ambience_game"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
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
            filename: "reel_stop_bonus",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop_freespin",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop_freespin"
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
            filename: "spin_but",
            loop: !1,
            volume: 1,
            ingamename: "spin_but"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol0",
            loop: !1,
            volume: 1,
            ingamename: "symbol0"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol1",
            loop: !1,
            volume: 1,
            ingamename: "symbol1"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol2",
            loop: !1,
            volume: 1,
            ingamename: "symbol2"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol3",
            loop: !1,
            volume: 1,
            ingamename: "symbol3"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol4",
            loop: !1,
            volume: 1,
            ingamename: "symbol4"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol5",
            loop: !1,
            volume: 1,
            ingamename: "symbol5"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol6",
            loop: !1,
            volume: 1,
            ingamename: "symbol6"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol7",
            loop: !1,
            volume: 1,
            ingamename: "symbol7"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol8",
            loop: !1,
            volume: 1,
            ingamename: "symbol8"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol9",
            loop: !1,
            volume: 1,
            ingamename: "symbol9"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "avatar_win_0",
            loop: !1,
            volume: 1,
            ingamename: "avatar_win_0"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "avatar_win_1",
            loop: !1,
            volume: 1,
            ingamename: "avatar_win_1"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_end",
            loop: !1,
            volume: 1,
            ingamename: "bonus_end"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "bonus_soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "freespin_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "freespin_soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_game_jar_explosion",
            loop: !1,
            volume: 1,
            ingamename: "bonus_game_jar_explosion"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_mult",
            loop: !1,
            volume: 1,
            ingamename: "bonus_mult"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_zeus_punch",
            loop: !1,
            volume: 1,
            ingamename: "bonus_zeus_punch"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "thunder",
            loop: !1,
            volume: 1,
            ingamename: "thunder"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "avatar_start_freespins",
            loop: !1,
            volume: 1,
            ingamename: "avatar_start_freespins"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "score_counter",
            loop: !1,
            volume: 1,
            ingamename: "score_counter"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "suspance",
            loop: !0,
            volume: 1,
            ingamename: "suspance"
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var f = 0; f < s_aSoundsInfo.length; f++)
            this.tryToLoadSound(s_aSoundsInfo[f], !1)
    }
    ;
    this.tryToLoadSound = function(f, h) {
        setTimeout(function() {
            s_aSounds[f.ingamename] = new Howl({
                src: [f.path + f.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: f.loop,
                volume: f.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(r, x) {
                    for (var t = 0; t < s_aSoundsInfo.length; t++)
                        if (r === s_aSounds[s_aSoundsInfo[t].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[t], !0);
                            break
                        }
                },
                onplayerror: function(r) {
                    for (var x = 0; x < s_aSoundsInfo.length; x++)
                        if (r === s_aSounds[s_aSoundsInfo[x].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[x].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[x].ingamename].play();
                                "ambience_game" === s_aSoundsInfo[x].ingamename && null !== s_oGame && setVolume("ambience_game", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, h ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("paytable4", "./sprites/paytable4.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_0", "./sprites/win_frame_anim_0.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_1", "./sprites/win_frame_anim_1.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_0", "./sprites/win_frame_anim_big_0.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_1", "./sprites/win_frame_anim_big_1.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_2", "./sprites/win_frame_anim_big_2.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_3", "./sprites/win_frame_anim_big_3.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_4", "./sprites/win_frame_anim_big_4.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_5", "./sprites/win_frame_anim_big_5.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_6", "./sprites/win_frame_anim_big_6.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_7", "./sprites/win_frame_anim_big_7.png");
        s_oSpriteLibrary.addSprite("but_text", "./sprites/but_text.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_small", "./sprites/msg_box_small.png");
        s_oSpriteLibrary.addSprite("but_arrow_next", "./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev", "./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus", "./sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("but_exit_info", "./sprites/but_exit_info.png");
        s_oSpriteLibrary.addSprite("bg_freespins_off", "./sprites/bg_freespins_off.jpg");
        s_oSpriteLibrary.addSprite("bg_freespins_on", "./sprites/bg_freespins_on.jpg");
        s_oSpriteLibrary.addSprite("amount_freespins", "./sprites/amount_freespins.png");
        s_oSpriteLibrary.addSprite("amount_freespin_win", "./sprites/amount_freespin_win.png");
        s_oSpriteLibrary.addSprite("amount_bonus_win", "./sprites/amount_bonus_win.png");
        for (var f = 0; f < NUM_SYMBOLS; f++) {
            s_oSpriteLibrary.addSprite("symbol_" + f, "./sprites/symbol_" + f + ".png");
            for (var h = 0; 8 > h; h++)
                s_oSpriteLibrary.addSprite("symbol_" + f + "_" + h, "./sprites/symbols/symbol_" + f + "_" + h + ".jpg")
        }
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/paylines/bet_but.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_delete_savings", "./sprites/but_delete_savings.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        for (f = 1; f < NUM_PAYLINES + 1; f++)
            s_oSpriteLibrary.addSprite("payline_" + f, "./sprites/paylines/payline_" + f + ".png");
        for (f = 0; 37 > f; f++)
            s_oSpriteLibrary.addSprite("thunder_avatar_" + f, "./sprites/thunder_avatar/thunder_avatar_" + f + ".png");
        for (f = 0; 350 > f; f++)
            s_oSpriteLibrary.addSprite("avatar_" + f, "./sprites/avatar/avatar_" + f + ".png");
        for (h = 2; 50 > h; h++)
            s_oSpriteLibrary.addSprite("big_win_" + h, "./sprites/big_win/big_win_" + h + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        c++;
        g.refreshLoader(Math.floor(c / d * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this._onRemovePreloader = function() {
        APIgetSlotInfos(this.settingPhase, this)
    }
    ;
    this.settingPhase = function(f) {
        try {
            saveItem(LOCALSTORAGE_STRING + "ls_available", "ok")
        } catch (h) {
            s_bStorageAvailable = !1
        }
        s_oGameSettings = new CSlotSettings;
        s_oMsgBox = new CMsgBox;
        g.unload();
        COIN_BET = f.bets;
        START_BET = f.start_bet;
        MIN_BET = f.bets[0];
        MIN_REEL_LOOPS = k.min_reel_loop;
        REEL_DELAY = k.reel_delay;
        TIME_SHOW_WIN = k.time_show_win;
        TIME_SHOW_ALL_WINS = k.time_show_all_wins;
        ENABLE_FULLSCREEN = a.fullscreen;
        SHOW_CREDITS = a.show_credits;
        ENABLE_CHECK_ORIENTATION = a.check_orientation;
        PAYTABLE_VALUES = f.paytable;
        playSound("ambience_game", 1, !0);
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        _oMenu = new CMenu;
        e = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        m = new CGame(k);
        e = STATE_GAME
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
    this.stopUpdateNoBlock = function() {
        b = !1;
        createjs.Ticker.paused = !0
    }
    ;
    this.startUpdateNoBlock = function() {
        s_iPrevTime = (new Date).getTime();
        b = !0;
        createjs.Ticker.paused = !1
    }
    ;
    this._update = function(f) {
        if (!1 !== b) {
            var h = (new Date).getTime();
            s_iTimeElaps = h - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = h;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            e === STATE_GAME && m.update();
            s_oStage.update(f)
        }
    }
    ;
    s_oMain = this;
    var k = a;
    ENABLE_CHECK_ORIENTATION = k.check_orientation;
    NUM_SPIN_FOR_ADS = a.num_spin_for_ads;
    RESTART_CREDIT = a.restart_credit;
    s_bAudioActive = a.audio_enable_on_startup;
    TOTAL_MONEY = START_MONEY = a.start_credit;
    this.initContainer()
}
var s_bMobile, s_bFullscreen = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oAttachSection, s_oMain, s_oSpriteLibrary, s_oMsgBox, s_oGameSettings, s_aSounds, s_aSoundsInfo, s_bStorageAvailable = !0;
function CSpriteSheetTextButton(a, b, c, d, e, g, m, k) {
    var f, h, r, x, t, v, w, H, E, y, l, J;
    this._init = function(I, B, u, N, A, Q, U, O) {
        f = !1;
        x = Q;
        t = [];
        v = [];
        J = O;
        h = u.width / 2;
        r = u.height;
        E = new createjs.Container;
        E.x = I;
        E.y = B;
        E.regX = h / 2;
        E.regY = r / 2;
        E.cursor = "pointer";
        J.addChild(E);
        I = new createjs.SpriteSheet({
            images: [u],
            frames: {
                width: h,
                height: r
            },
            animations: {
                state_enable: 0,
                state_disable: 1
            }
        });
        y = createSprite(I, "state_enable", 0, 0, h, r);
        E.addChild(y);
        l = new CTLText(E,10,10,h - 20,r,U,"center",Q,A,1,0,0,N,!0,!0,!1,!1);
        this._initListener()
    }
    ;
    this.unload = function() {
        E.off("mousedown", w);
        E.off("pressup", H);
        J.removeChild(E)
    }
    ;
    this.setVisible = function(I) {
        E.visible = I
    }
    ;
    this.enable = function() {
        f = !1;
        y.gotoAndStop("state_enable");
        l.setColor(x)
    }
    ;
    this.disable = function() {
        f = !0;
        y.gotoAndStop("state_disable");
        l.setColor("#636363")
    }
    ;
    this.setText = function(I) {
        l.refreshText(I)
    }
    ;
    this._initListener = function() {
        w = E.on("mousedown", this.buttonDown);
        H = E.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(I, B, u) {
        t[I] = B;
        v[I] = u
    }
    ;
    this.buttonRelease = function() {
        f || (playSound("press_but", 1, !1),
        E.scaleX = 1,
        E.scaleY = 1,
        t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(v[ON_MOUSE_UP]))
    }
    ;
    this.buttonDown = function() {
        f || (E.scaleX = .9,
        E.scaleY = .9,
        t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(v[ON_MOUSE_DOWN]))
    }
    ;
    this.setPosition = function(I, B) {
        E.x = I;
        E.y = B
    }
    ;
    this.changeText = function(I) {
        l.refreshText(I)
    }
    ;
    this.setX = function(I) {
        E.x = I
    }
    ;
    this.setY = function(I) {
        E.y = I
    }
    ;
    this.getButtonImage = function() {
        return E
    }
    ;
    this.getX = function() {
        return E.x
    }
    ;
    this.getY = function() {
        return E.y
    }
    ;
    this.getText = function() {
        return l.getString()
    }
    ;
    this._init(a, b, c, d, e, g, m, k);
    return this
}
function CGfxButton(a, b, c, d) {
    var e, g, m, k, f, h, r, x, t;
    this._init = function(v, w, H, E) {
        e = !1;
        g = 1;
        m = [];
        k = [];
        t = createBitmap(H);
        t.x = v;
        t.y = w;
        t.scaleX = t.scaleY = g;
        t.regX = H.width / 2;
        t.regY = H.height / 2;
        E.addChild(t);
        this._initListener()
    }
    ;
    this.unload = function() {
        t.off("mousedown", h);
        t.off("pressup", r);
        s_bMobile || t.off("mouseover", x);
        createjs.Tween.removeTweens(t);
        d.removeChild(t)
    }
    ;
    this.setVisible = function(v) {
        t.visible = v
    }
    ;
    this.enable = function() {
        e = !1
    }
    ;
    this.disable = function() {
        e = !0
    }
    ;
    this._initListener = function() {
        h = t.on("mousedown", this.buttonDown);
        r = t.on("pressup", this.buttonRelease);
        s_bMobile || (x = t.on("mouseover", this.buttonOver))
    }
    ;
    this.addEventListener = function(v, w, H) {
        m[v] = w;
        k[v] = H
    }
    ;
    this.addEventListenerWithParams = function(v, w, H, E) {
        m[v] = w;
        k[v] = H;
        f = E
    }
    ;
    this.buttonRelease = function() {
        e || (t.scaleX = g,
        t.scaleY = g,
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(k[ON_MOUSE_UP], f))
    }
    ;
    this.buttonDown = function() {
        e || (t.scaleX = .9 * g,
        t.scaleY = .9 * g,
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], f))
    }
    ;
    this.buttonOver = function(v) {
        s_bMobile || e || (v.target.cursor = "pointer")
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(t, {
            loop: -1
        }).to({
            scaleX: 1.1 * g,
            scaleY: 1.1 * g
        }, 850, createjs.Ease.quadOut).to({
            scaleX: g,
            scaleY: g
        }, 650, createjs.Ease.quadIn)
    }
    ;
    this.moveY = function(v, w, H, E) {
        createjs.Tween.get(t).wait(H).to({
            y: v
        }, w, E)
    }
    ;
    this.setPosition = function(v, w) {
        t.x = v;
        t.y = w
    }
    ;
    this.setX = function(v) {
        t.x = v
    }
    ;
    this.setY = function(v) {
        t.y = v
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
    this._init(a, b, c, d);
    return this
}
function CToggle(a, b, c, d, e) {
    var g, m, k, f, h, r, x;
    this._init = function(t, v, w, H, E) {
        x = void 0 !== E ? E : s_oStage;
        m = [];
        k = [];
        E = new createjs.SpriteSheet({
            images: [w],
            frames: {
                width: w.width / 2,
                height: w.height,
                regX: w.width / 2 / 2,
                regY: w.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        g = H;
        f = createSprite(E, "state_" + g, w.width / 2 / 2, w.height / 2, w.width / 2, w.height);
        f.x = t;
        f.y = v;
        f.stop();
        s_bMobile || (f.cursor = "pointer");
        x.addChild(f);
        this._initListener()
    }
    ;
    this.unload = function() {
        f.off("mousedown", h);
        f.off("pressup", r);
        x.removeChild(f)
    }
    ;
    this._initListener = function() {
        h = f.on("mousedown", this.buttonDown);
        r = f.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(t, v, w) {
        m[t] = v;
        k[t] = w
    }
    ;
    this.setCursorType = function(t) {
        f.cursor = t
    }
    ;
    this.setActive = function(t) {
        g = t;
        f.gotoAndStop("state_" + g)
    }
    ;
    this.buttonRelease = function() {
        f.scaleX = 1;
        f.scaleY = 1;
        playSound("press_but", 1, !1);
        g = !g;
        f.gotoAndStop("state_" + g);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(k[ON_MOUSE_UP], g)
    }
    ;
    this.buttonDown = function() {
        f.scaleX = .9;
        f.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(t, v) {
        f.x = t;
        f.y = v
    }
    ;
    this._init(a, b, c, d, e)
}
function CBetBut(a, b, c, d) {
    var e, g, m, k = [], f, h;
    this._init = function(x, t, v) {
        e = !1;
        g = [];
        m = [];
        h = new createjs.Container;
        h.x = x;
        h.y = t;
        r.addChild(h);
        x = {
            images: [s_oSpriteLibrary.getSprite("bet_but")],
            frames: {
                width: 102,
                height: 82
            },
            animations: {
                bet_but1_on: 0,
                bet_but1_off: 1,
                bet_but2_on: 2,
                bet_but2_off: 3,
                bet_but3_on: 4,
                bet_but3_off: 5,
                bet_but4_on: 6,
                bet_but4_off: 7,
                bet_but5_on: 8,
                bet_but5_off: 9,
                bet_but6_on: 10,
                bet_but6_off: 11,
                bet_but7_on: 12,
                bet_but7_off: 13,
                bet_but8_on: 14,
                bet_but8_off: 15,
                bet_but9_on: 16,
                bet_but9_off: 17,
                bet_but10_on: 18,
                bet_but10_off: 19,
                bet_but11_on: 20,
                bet_but11_off: 21,
                bet_but12_on: 22,
                bet_but12_off: 23,
                bet_but13_on: 24,
                bet_but13_off: 25,
                bet_but14_on: 26,
                bet_but14_off: 27,
                bet_but15_on: 28,
                bet_but15_off: 29,
                bet_but16_on: 30,
                bet_but16_off: 31,
                bet_but17_on: 32,
                bet_but17_off: 33,
                bet_but18_on: 34,
                bet_but18_off: 35,
                bet_but19_on: 36,
                bet_but19_off: 37,
                bet_but20_on: 38,
                bet_but20_off: 39
            }
        };
        x = new createjs.SpriteSheet(x);
        f = createSprite(x, v + "_on", 0, 0, 102, 82);
        f.stop();
        f.cursor = "pointer";
        h.addChild(f);
        this._initListener()
    }
    ;
    this.unload = function() {
        f.off("mousedown", this.buttonDown);
        f.off("pressup", this.buttonRelease);
        r.removeChild(f)
    }
    ;
    this.disable = function(x) {
        e = x
    }
    ;
    this.setVisible = function(x) {
        f.visible = x
    }
    ;
    this.setOn = function() {
        f.gotoAndStop(c + "_on")
    }
    ;
    this.setOff = function() {
        f.gotoAndStop(c + "_off")
    }
    ;
    this._initListener = function() {
        f.on("mousedown", this.buttonDown);
        f.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(x, t, v) {
        g[x] = t;
        m[x] = v
    }
    ;
    this.addEventListenerWithParams = function(x, t, v, w) {
        g[x] = t;
        m[x] = v;
        k = w
    }
    ;
    this.buttonRelease = function() {
        g[ON_MOUSE_UP] && !1 === e && (playSound("press_but", 1, !1),
        g[ON_MOUSE_UP].call(m[ON_MOUSE_UP], k))
    }
    ;
    this.buttonDown = function() {
        g[ON_MOUSE_DOWN] && !1 === e && g[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], k)
    }
    ;
    this.setPosition = function(x, t) {
        f.x = x;
        f.y = t
    }
    ;
    this.setX = function(x) {
        f.x = x
    }
    ;
    this.setY = function(x) {
        f.y = x
    }
    ;
    this.getButtonImage = function() {
        return f
    }
    ;
    this.getX = function() {
        return f.x
    }
    ;
    this.getY = function() {
        return f.y
    }
    ;
    var r = d;
    this._init(a, b, c)
}
function CGame() {
    var a = !1, b = !1, c, d, e, g, m, k, f, h, r, x, t, v, w, H, E, y, l, J, I, B, u, N, A, Q, U, O, P, C, V, S, da, ba, Z, q, W, G, M, z, p, D, X = null, K, ca, Y, R;
    this._init = function() {
        g = GAME_STATE_IDLE;
        r = l = N = f = m = 0;
        V = [0, 1, 2, 3, 4];
        k = V[0];
        h = NUM_PAYLINES;
        w = TOTAL_MONEY;
        t = START_BET;
        t = parseFloat(t.toFixed(2));
        for (var n = 0; n < COIN_BET.length; n++)
            if (t === COIN_BET[n]) {
                Q = n;
                break
            }
        v = t * h;
        e = c = !1;
        B = u = 0;
        A = [];
        s_oTweenController = new CTweenController;
        ba = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oAttachSection.addChild(ba);
        Z = createBitmap(s_oSpriteLibrary.getSprite("bg_freespins_off"));
        Z.alpha = 0;
        s_oAttachSection.addChild(Z);
        q = createBitmap(s_oSpriteLibrary.getSprite("bg_freespins_on"));
        q.alpha = 0;
        s_oAttachSection.addChild(q);
        ca = new createjs.Container;
        ca.x = REEL_OFFSET_X;
        ca.y = REEL_OFFSET_Y;
        ca.scaleX = ca.scaleY = REEL_SCALE;
        s_oAttachSection.addChild(ca);
        this._initReels();
        da = new CSuspanceEffect(ca);
        M = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        M.x = -85;
        M.y = -55;
        ca.addChild(M);
        n = {
            images: [s_oSpriteLibrary.getSprite("logo")],
            frames: {
                width: 523,
                height: 196,
                regX: 261,
                regY: 0
            },
            animations: {
                normal: 0,
                freespin: [1, 23]
            }
        };
        n = new createjs.SpriteSheet(n);
        W = createSprite(n, "normal", 261, 0, 523, 196);
        W.x = 750;
        W.y = -100;
        ca.addChild(W);
        D = new CInterface(t,v,ca);
        this._initStaticSymbols();
        R = new CAvatar(s_oAttachSection);
        R.show("idle");
        G = new CBigWin(s_oStage);
        G.addEventListener(ON_END_BIG_WIN, this._onEndBigWin, this);
        X = new CPayTablePanel;
        K = new CBonusPanel;
        z = new CFreespinPanel(s_oStage);
        p = new CResultFreespin(s_oStage);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        playSound("ambience_game", 1, !0);
        a = !0;
        w < v && new CRechargePanel
    }
    ;
    this.unload = function() {
        stopSound("ambience_game");
        D.unload();
        X.unload();
        for (var n = 0; n < O.length; n++)
            O[n].unload();
        for (n = 0; n < NUM_ROWS; n++)
            for (var F = 0; F < NUM_REELS; F++)
                P[n][F].unload();
        s_oMsgBox.unload();
        s_oAttachSection.removeAllChildren();
        s_oGame = null
    }
    ;
    this.refreshButtonPos = function() {
        D.refreshButtonPos();
        X.refreshButtonPos();
        K.refreshButtonPos();
        R.refreshButtonPos()
    }
    ;
    this._initReels = function() {
        Y = new createjs.Container;
        ca.addChild(Y);
        var n = START_REEL_OFFSET_X = 122
          , F = START_REEL_OFFSET_Y = 83
          , L = new createjs.Shape;
        L.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(n, F, SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1), SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1));
        ca.addChild(L);
        this._generateLosingPattern();
        var T = 0;
        O = [];
        for (var aa = 0; aa < NUM_REELS; aa++)
            O[aa] = new CReelColumn(aa,n,F,T,[S[0][aa], S[1][aa], S[2][aa]],Y),
            O[aa + NUM_REELS] = new CReelColumn(aa + NUM_REELS,n,F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS,T,[S[0][aa], S[1][aa], S[2][aa]],Y),
            n += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS,
            T += REEL_DELAY;
        Y.mask = L
    }
    ;
    this._initStaticSymbols = function() {
        var n = REEL_OFFSET_X + START_REEL_OFFSET_X
          , F = REEL_OFFSET_Y + START_REEL_OFFSET_Y;
        P = [];
        for (var L = 0; L < NUM_ROWS; L++) {
            P[L] = [];
            for (var T = 0; T < NUM_REELS; T++) {
                var aa = new CStaticSymbolCell(L,T,n,F);
                P[L][T] = aa;
                n += (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS) * REEL_SCALE
            }
            n = REEL_OFFSET_X + START_REEL_OFFSET_X;
            F += (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * REEL_SCALE
        }
    }
    ;
    this._generateRandSymbols = function() {
        for (var n = [], F = 0; F < NUM_ROWS; F++)
            n[F] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return n
    }
    ;
    this.reelArrived = function(n, F) {
        if (m > U)
            if (k === F) {
                if (!1 === O[n].isReadyToStop()) {
                    var L = n;
                    n < NUM_REELS ? (L += NUM_REELS,
                    O[L].setReadyToStop(),
                    O[n].restart([S[0][n], S[1][n], S[2][n]], !0)) : (L -= NUM_REELS,
                    O[L].setReadyToStop(),
                    O[n].restart([S[0][L], S[1][L], S[2][L]], !0))
                }
            } else
                O[n].restart(this._generateRandSymbols(), !1);
        else
            O[n].restart(this._generateRandSymbols(), !1),
            !b || 0 !== n && n !== NUM_REELS - 1 || m++
    }
    ;
    this.stopNextReel = function() {
        f++;
        if (0 === f % 2) {
            da.hide();
            for (var n = 0; n < NUM_ROWS; n++)
                S[n][k] === BONUS_SYMBOL && H++,
                S[n][k] === FREESPIN_SYMBOL && E++;
            k = V[f / 2];
            f === 2 * NUM_REELS && this._endReelAnimation()
        }
        1 < k && (2 === H || 2 === E) ? (m = 0,
        U = SUSPANCE_REEL_LOOPS,
        da.show(START_REEL_OFFSET_X + k * (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS), START_REEL_OFFSET_Y)) : U = MIN_REEL_LOOPS
    }
    ;
    this._realEndReelAnimation = function() {
        da.hide();
        -1 !== A.indexOf(BONUS_GAME) || 0 < u ? (this.resetAutoSpin(),
        D.disableGuiButtons(c, 0 < u ? !0 : !1)) : c ? D.enableSpin(!0) : D.enableGuiButtons();
        D.setSpinState(TEXT_SPIN);
        "normal" !== W.currentAnimation && D.refreshFreeSpinNum(u);
        if (0 < C.length) {
            if ("normal" === W.currentAnimation) {
                var n = .5 < Math.random() ? 0 : 1;
                R.show("win_" + n);
                playSound("avatar_win_" + n, 1, !1)
            }
            for (n = 0; n < C.length; n++) {
                7 > C[n].value && X.highlightCombo(C[n].value, C[n].num_win);
                0 < C[n].line && D.showLine(C[n].line);
                for (var F = C[n].list, L = 0; L < F.length; L++)
                    P[F[L].row][F[L].col].showWinFrame()
            }
            0 < y && D.refreshWinText(y);
            "normal" === W.currentAnimation && y / v >= WIN_PER_BIG_WIN ? (TIME_SHOW_ALL_WINS = 5E3,
            this._showBigWin()) : TIME_SHOW_ALL_WINS = 2E3;
            r = 0;
            g = GAME_STATE_SHOW_ALL_WIN;
            D.refreshMoney(w)
        } else if (0 < u)
            D.disableSpin(0 < u ? !1 : !0),
            this.onSpin();
        else if ("freespin" === W.currentAnimation && (p.show(l),
        W.gotoAndStop("normal"),
        R.show("end_freespin"),
        D.refreshFreeSpinNum(""),
        D.refreshFreeSpinAmount(0),
        createjs.Tween.get(Z).to({
            alpha: 0
        }, 2E3, createjs.Ease.cubicOut),
        q.alpha = 0,
        setVolume("ambience_game", 1),
        stopSound("freespin_soundtrack"),
        D.enableGuiButtons()),
        c)
            if (w < v && 0 === u)
                D.enableGuiButtons(),
                this.resetAutoSpin(),
                D.enableGuiButtons(),
                g = GAME_STATE_IDLE;
            else
                this.onSpin();
        else
            D.enableGuiButtons(),
            g = GAME_STATE_IDLE;
        w < v && 0 === u ? (D.enableGuiButtons(),
        this.resetAutoSpin()) : c || ("freespin" !== W.currentAnimation ? 0 < u || -1 !== A.indexOf(BONUS_GAME) ? D.enableSpin(!1) : (D.enableGuiButtons(),
        D.disableBetBut(!1)) : 0 < C.length && (D.enableSpin(!1),
        D.disableBetBut(!0)));
        D.refreshFreeSpinAmount(l)
    }
    ;
    this.refreshMoney = function(n) {
        w = n;
        D.refreshMoney(w);
        saveItem(LOCALSTORAGE_STRING + "score", w)
    }
    ;
    this._showBigWin = function() {
        createjs.Tween.get(Z).to({
            alpha: 1
        }, 2E3, createjs.Ease.cubicOut);
        J = 0;
        I = 500;
        R.show("start_freespin");
        e = !0;
        G.show(y)
    }
    ;
    this._onEndBigWin = function() {
        e = !1;
        G.hide();
        createjs.Tween.get(Z).to({
            alpha: 0
        }, 2E3, createjs.Ease.cubicOut);
        q.alpha = 0;
        R.show("end_freespin")
    }
    ;
    this._endReelAnimation = function() {
        b = !1;
        x = f = m = 0;
        k = V[0];
        this._realEndReelAnimation()
    }
    ;
    this.hidePayTable = function() {
        X.hide()
    }
    ;
    this.showWin = function() {
        if (g === GAME_STATE_SHOW_WIN) {
            if (0 < x) {
                var n = C[x - 1].line;
                D.hideLine(n);
                var F = C[x - 1].list;
                for (n = 0; n < F.length; n++)
                    O[F[n].col].setVisible(F[n].row, !0),
                    O[F[n].col + NUM_REELS].setVisible(F[n].row, !0)
            }
            if (x === C.length)
                if (x = 0,
                "freespin" === W.currentAnimation && 0 === u && (p.show(l),
                W.gotoAndStop("normal"),
                R.show("end_freespin"),
                D.refreshFreeSpinNum(""),
                D.refreshFreeSpinAmount(""),
                createjs.Tween.get(Z).to({
                    alpha: 0
                }, 2E3, createjs.Ease.cubicOut),
                q.alpha = 0,
                setVolume("ambience_game", 1),
                stopSound("freespin_soundtrack"),
                D.enableGuiButtons()),
                -1 !== A.indexOf(BONUS_GAME))
                    this._hideAllWins(),
                    $(s_oMain).trigger("bonus_call", {
                        bet: COIN_BET[Q]
                    });
                else if (d)
                    d = !1,
                    z.show(B);
                else if (0 < u)
                    D.disableSpin(0 < u ? !1 : !0),
                    this.onSpin();
                else if (c)
                    this.onSpin();
                else
                    D.enableGuiButtons(),
                    D.disableBetBut(!1),
                    g = GAME_STATE_IDLE,
                    D.enableGuiButtons();
            else {
                n = C[x].line;
                F = C[x].list;
                if (0 === n) {
                    var L = Math.floor(F.length / 2);
                    n = F[L].row;
                    L = F[L].col
                } else {
                    D.showLine(n);
                    L = 2;
                    var T = !1;
                    3 > F.length ? C[x].value === FREESPIN_SYMBOL ? (L = F[0].col,
                    n = F[0].row,
                    T = !0) : (L = F.length - 1,
                    n = F[L].row) : n = F[L].row;
                    for (; !T && S[n][L] === WILD_SYMBOL; )
                        if (L--,
                        0 > L) {
                            L = 0;
                            n = F[L].row;
                            break
                        } else
                            n = F[L].row
                }
                F = {
                    x: 0,
                    y: 0
                };
                0 === n ? 0 === L ? T = {
                    x: 0,
                    y: 0
                } : 4 === L ? (T = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: 0
                },
                F = {
                    x: SYMBOL_WIDTH,
                    y: 0
                }) : (T = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: 0
                },
                F = {
                    x: SYMBOL_WIDTH / 2,
                    y: 0
                }) : 1 === n ? 0 === L ? (T = {
                    x: 0,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                },
                F = {
                    x: 0,
                    y: SYMBOL_HEIGHT / 2
                }) : 4 === L ? (T = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                },
                F = {
                    x: SYMBOL_WIDTH,
                    y: SYMBOL_HEIGHT / 2
                }) : (T = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                },
                F = {
                    x: SYMBOL_WIDTH / 2,
                    y: SYMBOL_HEIGHT / 2
                }) : 0 === L ? (T = {
                    x: 0,
                    y: WIN_BIG_ANIM_HEIGHT
                },
                F = {
                    x: 0,
                    y: SYMBOL_HEIGHT
                }) : 4 === L ? (T = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: WIN_BIG_ANIM_HEIGHT
                },
                F = {
                    x: SYMBOL_WIDTH,
                    y: SYMBOL_HEIGHT
                }) : (T = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: WIN_BIG_ANIM_HEIGHT
                },
                F = {
                    x: SYMBOL_WIDTH / 2,
                    y: SYMBOL_HEIGHT
                });
                P[n][L].show(S[n][L] + 1, C[x].amount, F, T, c || !1 === d && 0 < u ? 1 : 3);
                x++
            }
        }
    }
    ;
    this._hideAllWins = function() {
        for (var n = 0; n < NUM_ROWS; n++)
            for (var F = 0; F < NUM_REELS; F++)
                P[n][F].hideWinFrame();
        D.hideAllLines()
    }
    ;
    this._prepareForWinsShowing = function() {
        r = TIME_SHOW_WIN;
        g = GAME_STATE_SHOW_WIN;
        this.showWin()
    }
    ;
    this.activateLines = function(n) {
        h = n;
        this.removeWinShowing();
        v = n = t * h;
        D.refreshTotalBet(v);
        D.refreshNumLines(h);
        n > w ? D.disableSpin(0 < u ? !1 : !0) : D.enableSpin(0 < u ? !1 : !0)
    }
    ;
    this.addLine = function() {
        h === NUM_PAYLINES ? h = 1 : h++;
        v = t * h;
        D.refreshTotalBet(v);
        D.refreshNumLines(h);
        D.enableSpin(0 < u ? !1 : !0)
    }
    ;
    this.resetCoinBet = function() {
        Q = 0;
        var n = COIN_BET[Q]
          , F = n * h;
        t = n;
        v = F;
        D.refreshBet(t);
        D.refreshTotalBet(v);
        D.enableSpin(0 < u ? !1 : !0)
    }
    ;
    this.changeCoinBet = function() {
        Q++;
        Q === COIN_BET.length && (Q = 0);
        var n = parseFloat(COIN_BET[Q])
          , F = n * h;
        t = n;
        t = Math.floor(100 * t) / 100;
        v = F;
        D.refreshBet(t);
        D.refreshTotalBet(v);
        D.enableSpin(0 < u ? !1 : !0)
    }
    ;
    this.removeWinShowing = function() {
        X.resetHighlightCombo();
        D.resetWin();
        for (var n = 0; n < NUM_ROWS; n++)
            for (var F = 0; F < NUM_REELS; F++)
                P[n][F].hide(),
                O[F].setVisible(n, !0),
                O[F + NUM_REELS].setVisible(n, !0);
        for (n = 0; n < O.length; n++)
            O[n].activate();
        g = GAME_STATE_IDLE
    }
    ;
    this.forceStopReel = function() {
        0 === u && this.resetAutoSpin();
        g = GAME_STATE_IDLE;
        for (var n = 0; n < NUM_REELS; n++) {
            var F = REEL_OFFSET_Y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
            O[n].forceStop([S[0][n], S[1][n], S[2][n]], START_REEL_OFFSET_Y - 27);
            O[n + NUM_REELS].forceStop(null, F)
        }
        this._endReelAnimation()
    }
    ;
    this.onSpin = function() {
        U = MIN_REEL_LOOPS;
        E = H = 0;
        !(0 < u && "freespin" !== W.currentAnimation || -1 !== A.indexOf(BONUS_GAME) || 0 === u && "freespin" === W.currentAnimation) || g !== GAME_STATE_SHOW_ALL_WIN && g !== GAME_STATE_SHOW_WIN ? -1 === A.indexOf(BONUS_FREESPIN) || g !== GAME_STATE_SHOW_ALL_WIN && g !== GAME_STATE_SHOW_WIN ? w < v && 0 === u ? (this.resetAutoSpin(),
        new CRechargePanel) : (b = !1,
        playSound("spin_but", 1, !1),
        D.disableBetBut(!0),
        this.removeWinShowing(),
        v = "freespin" === W.currentAnimation ? 0 : t * h,
        A = [],
        this._hideAllWins(),
        D.disableGuiButtons(c, 0 < u ? !0 : !1),
        w -= v,
        D.refreshMoney(w),
        $(s_oMain).trigger("bet_placed", {
            bet: COIN_BET[Q],
            tot_bet: v,
            payline: h
        }),
        g = GAME_STATE_SPINNING) : (this._hideAllWins(),
        D.disableSpin(!0),
        this.removeWinShowing(),
        d = !1,
        z.show(B)) : (this._hideAllWins(),
        this.removeWinShowing(),
        x = C.length,
        g = GAME_STATE_SHOW_WIN,
        this.showWin())
    }
    ;
    this.onSpinReceived = function(n) {
        N++;
        N === NUM_SPIN_FOR_ADS && (N = 0,
        $(s_oMain).trigger("show_interlevel_ad"));
        if (!0 === n.res) {
            S = n.pattern;
            C = n.win_lines;
            var F = parseFloat(n.tot_win)
              , L = n.bonus;
            B = parseInt(n.num_freespin);
            w = parseFloat(n.money);
            "normal" !== W.currentAnimation && !1 === d && (l += F);
            u = B;
            0 < F || !0 === L || 0 < u ? (d = !1,
            n.freespin && (A.push(BONUS_FREESPIN),
            d = !0,
            l = 0),
            L && A.push(BONUS_GAME),
            y = F) : C = [];
            b = !0;
            $(s_oMain).trigger("save_score", w);
            saveItem(LOCALSTORAGE_STRING + "score", w)
        } else
            s_oGame._generateLosingPattern()
    }
    ;
    this.onBonusStart = function(n) {
        trace(n);
        w = parseFloat(n.money);
        parseFloat(n.bonus_win);
        K.show(JSON.parse(n.prize_list), t);
        g = GAME_STATE_BONUS;
        $(s_oMain).trigger("save_score", w);
        saveItem(LOCALSTORAGE_STRING + "score", w)
    }
    ;
    this.onAutoSpin = function(n) {
        if ((c = n) && g === GAME_STATE_IDLE)
            this.onSpin()
    }
    ;
    this.onStopAutoSpin = function() {
        this.resetAutoSpin();
        g !== GAME_STATE_SPINNING && g !== GAME_STATE_BONUS && D.enableGuiButtons()
    }
    ;
    this.resetAutoSpin = function() {
        c = !1;
        D.setAutoSpinState(TEXT_AUTO_SPIN)
    }
    ;
    this._generateLosingPattern = function() {
        for (var n = [], F = 0; F < NUM_ROWS; F++) {
            var L = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            L = s_aRandSymbols[L];
            n[F] = L
        }
        S = [];
        for (F = 0; F < NUM_ROWS; F++) {
            S[F] = [];
            for (var T = 0; T < NUM_REELS; T++)
                if (0 === T)
                    S[F][T] = n[F];
                else {
                    do
                        L = Math.floor(Math.random() * (s_aRandSymbols.length - 2)),
                        L = s_aRandSymbols[L];
                    while (n[0] === L || n[1] === L || n[2] === L);
                    S[F][T] = L
                }
        }
        C = [];
        b = !0
    }
    ;
    this.onInfoClicked = function() {
        g !== GAME_STATE_SPINNING && (X.isVisible() ? X.hide() : X.show())
    }
    ;
    this.exitFromFreespinPanel = function() {
        setVolume("ambience_game", 0);
        playSound("freespin_soundtrack", 1, !0);
        D.refreshFreeSpinNum(u);
        D.refreshFreeSpinAmount(0);
        W.gotoAndPlay("freespin");
        R.show("start_freespin");
        createjs.Tween.get(Z).to({
            alpha: 1
        }, 2E3, createjs.Ease.cubicOut);
        J = 0;
        I = Math.floor(Math.random() * (MAX_TIME_EFFECT_FREESPIN - MIN_TIME_EFFECT_FREESPIN + 1)) + MIN_TIME_EFFECT_FREESPIN;
        D.disableSpin(0 < u ? !1 : !0);
        g = GAME_STATE_IDLE;
        this.onSpin()
    }
    ;
    this.exitFromBonus = function(n) {
        D.refreshMoney(w);
        D.refreshWinText(n);
        if (d)
            d = !1,
            z.show(B);
        else if (c)
            this.onSpin();
        else
            D.enableGuiButtons(),
            D.disableBetBut(!1),
            D.enableSpin(0 < u ? !1 : !0),
            D.enableGuiButtons();
        g = GAME_STATE_IDLE
    }
    ;
    this.onExit = function() {
        $(s_oMain).trigger("start_session");
        this.unload();
        s_oMain.gotoMenu()
    }
    ;
    this.getState = function() {
        return g
    }
    ;
    this.update = function() {
        if (!1 !== a) {
            switch (g) {
            case GAME_STATE_SPINNING:
                for (var n = 0; n < O.length; n++)
                    O[n].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                r += s_iTimeElaps;
                r > TIME_SHOW_ALL_WINS && (r = 0,
                this._hideAllWins(),
                x = c ? C.length : 0,
                this._prepareForWinsShowing());
                break;
            case GAME_STATE_BONUS:
                K.update()
            }
            if ("freespin" === W.currentAnimation || e)
                J += s_iTimeElaps,
                J > I && (I = Math.floor(Math.random() * (MAX_TIME_EFFECT_FREESPIN - MIN_TIME_EFFECT_FREESPIN + 1)) + MIN_TIME_EFFECT_FREESPIN,
                J = 0,
                createjs.Tween.get(q).to({
                    alpha: 1
                }, 400, createjs.Ease.cubicIn).to({
                    alpha: 0
                }, 200, createjs.Ease.cubicOut))
        }
    }
    ;
    s_oGame = this;
    this._init()
}
var s_oGame = null, s_oTweenController;
function CReelColumn(a, b, c, d, e, g) {
    var m, k, f, h, r, x, t, v, w, H, E, y, l, J, I, B;
    this._init = function(u, N, A, Q, U) {
        h = f = k = m = !1;
        v = 0;
        r = u;
        t = Q;
        x = r < NUM_REELS ? r : r - NUM_REELS;
        H = 0;
        E = MAX_FRAMES_REEL_EASE;
        w = REEL_STATE_START;
        y = A;
        l = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        this.initContainer(N, A, U)
    }
    ;
    this.initContainer = function(u, N, A) {
        B = new createjs.Container;
        B.x = u;
        B.y = N;
        u = -OFFSET_Y_SYMBOLS;
        J = [];
        I = [];
        for (N = 0; N < NUM_ROWS; N++) {
            var Q = createSprite(s_aSymbolData[A[N]], "static", 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            Q.stop();
            Q.x = 0;
            Q.y = u;
            B.addChild(Q);
            J[N] = Q;
            I[N] = A[N];
            u += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
        g.addChild(B)
    }
    ;
    this.unload = function() {
        g.removeChild(B)
    }
    ;
    this.activate = function() {
        y = B.y;
        l = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        m = !0
    }
    ;
    this._setSymbol = function(u) {
        for (var N = 0, A = 0; A < u.length; A++)
            J[A].spriteSheet = s_aSymbolData[u[A]],
            J[A].gotoAndStop("static"),
            J[A].x = 0,
            J[A].y = N,
            I[A] = u[A],
            N += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
    }
    ;
    this.forceStop = function(u, N) {
        null !== u && this._setSymbol(u);
        B.y = N;
        m = !1;
        H = 0;
        E = MAX_FRAMES_REEL_EASE;
        w = REEL_STATE_START;
        v = 0;
        f = k = !1
    }
    ;
    this.setVisible = function(u, N) {
        J[u].visible = N
    }
    ;
    this.restart = function(u, N) {
        B.y = y = REEL_START_Y;
        l = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        this._setSymbol(u);
        if (k = N) {
            H = 0;
            E = MAX_FRAMES_REEL_EASE;
            w = REEL_STATE_STOP;
            for (var A = 0; A < NUM_ROWS; A++)
                J[A].gotoAndStop("static");
            f = !0
        } else
            for (A = 0; A < NUM_ROWS; A++)
                J[A].gotoAndStop("moving")
    }
    ;
    this.setReadyToStop = function() {
        H = 0;
        E = MAX_FRAMES_REEL_EASE;
        w = REEL_STATE_STOP
    }
    ;
    this.isReadyToStop = function() {
        return k
    }
    ;
    this.getPosUpLeft = function(u) {
        return {
            x: B.x,
            y: B.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * u
        }
    }
    ;
    this.getY = function() {
        return B.y
    }
    ;
    this._updateStart = function() {
        0 === H && r < NUM_REELS && playSound("start_reel", 1, !1);
        H++;
        H > E && (H = 0,
        E /= 2,
        w++,
        y = B.y,
        l = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS);
        var u = s_oTweenController.easeInBack(H, 0, 1, E);
        u = s_oTweenController.tweenValue(y, l, u);
        B.y = u
    }
    ;
    this._updateMoving = function() {
        H++;
        H > E && (H = 0,
        y = B.y,
        l = y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS);
        var u = s_oTweenController.easeLinear(H, 0, 1, E);
        u = s_oTweenController.tweenValue(y, l, u);
        B.y = u
    }
    ;
    this._updateStopping = function() {
        H++;
        if (H >= E)
            m = !1,
            H = 0,
            E = MAX_FRAMES_REEL_EASE,
            w = REEL_STATE_START,
            v = 0,
            h = k = !1,
            f && (f = !1,
            B.y = l),
            s_oGame.stopNextReel();
        else {
            var u = s_oTweenController.easeOutBack(H, 0, 1, E);
            u = s_oTweenController.tweenValue(y, l, u);
            B.y = u;
            !1 === h && H >= .7 * E && f && (h = !0,
            I[0] === BONUS_SYMBOL || I[1] === BONUS_SYMBOL || I[2] === BONUS_SYMBOL ? playSound("reel_stop_bonus", 1, !1) : I[0] === FREESPIN_SYMBOL || I[1] === FREESPIN_SYMBOL || I[2] === FREESPIN_SYMBOL ? playSound("reel_stop_freespin", 1, !1) : playSound("reel_stop", 1, !1))
        }
    }
    ;
    this.update = function() {
        if (!1 !== m && (v++,
        v > t))
            switch (!1 === k && B.y > REEL_ARRIVAL_Y && w !== REEL_STATE_STOP && s_oGame.reelArrived(r, x),
            w) {
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
    this._init(a, b, c, d, e)
}
function CInterface(a, b, c) {
    var d, e, g, m, k, f, h, r, x, t, v, w, H, E, y, l, J, I, B, u, N, A, Q, U, O, P, C, V, S, da, ba, Z, q = null, W = null;
    this._init = function(G, M, z) {
        this._initPaylines(z);
        var p = s_oSpriteLibrary.getSprite("but_text");
        r = CANVAS_HEIGHT - p.height / 2 - 170;
        I = new CSpriteSheetTextButton(272,r,p,TEXT_PAYTABLE,FONT_GAME_1,"#8d4402",34,z);
        I.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        t = CANVAS_HEIGHT - p.height / 2 - 170;
        u = new CSpriteSheetTextButton(520,t,p,TEXT_COIN + " " + formatEntries(G),FONT_GAME_1,"#8d4402",34,z);
        u.addEventListener(ON_MOUSE_UP, this._onBet, this);
        x = CANVAS_HEIGHT - p.height / 2 - 170;
        B = new CSpriteSheetTextButton(758,x,p,TEXT_LINES + " " + NUM_PAYLINES,FONT_GAME_1,"#8d4402",34,z);
        B.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        v = CANVAS_HEIGHT - p.height / 2 - 170;
        N = new CSpriteSheetTextButton(996,v,p,TEXT_AUTO_SPIN,FONT_GAME_1,"#8d4402",34,z);
        N.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
        w = 1234;
        H = CANVAS_HEIGHT - p.height / 2 - 170;
        J = new CSpriteSheetTextButton(w,H,p,TEXT_SPIN,FONT_GAME_1,"#8d4402",34,z);
        J.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        h = CANVAS_HEIGHT - 290;
        O = new CTLText(z,148,h,278,30,30,"left","#ffba00",FONT_GAME_1,1,0,0,TEXT_MONEY + ": " + formatEntries(TOTAL_MONEY) + TEXT_CURRENCY,!0,!0,!1,!1);
        P = new CTLText(z,776,h,278,30,30,"left","#ffba00",FONT_GAME_1,1,0,0,TEXT_BET + ": " + formatEntries(M) + TEXT_CURRENCY,!0,!0,!1,!1);
        C = new CTLText(z,1086,h,278,30,30,"left","#ffba00",FONT_GAME_1,1,0,0,TEXT_WIN + ": 0.00" + TEXT_CURRENCY,!0,!0,!1,!1);
        M = s_oSpriteLibrary.getSprite("amount_freespins");
        Q = new createjs.Container;
        Q.visible = !1;
        Q.x = 400;
        Q.y = -25;
        Q.regX = M.width / 2;
        Q.regY = M.height / 2;
        z.addChild(Q);
        G = createBitmap(M);
        Q.addChild(G);
        V = new CTLText(Q,20,M.height / 2,M.width - 40,M.height / 2 - 10,48,"center","#fce0ab",FONT_GAME_1,1,0,0,"0",!0,!0,!1,!1);
        M = s_oSpriteLibrary.getSprite("amount_freespin_win");
        U = new createjs.Container;
        U.visible = !1;
        U.x = 1100;
        U.y = -25;
        U.regX = M.width / 2;
        U.regY = M.height / 2;
        z.addChild(U);
        G = createBitmap(M);
        U.addChild(G);
        S = new CTLText(U,20,M.height / 2,M.width - 40,M.height / 2 - 10,48,"center","#fce0ab",FONT_GAME_1,1,0,0,"0",!0,!0,!1,!1);
        z = s_oSpriteLibrary.getSprite("but_exit");
        d = CANVAS_WIDTH - z.width / 2 - 4;
        e = z.height / 2 + 4;
        A = new CGfxButton(d,e,z,s_oAttachSection);
        A.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (p = s_oSpriteLibrary.getSprite("audio_icon"),
        k = p.width / 4 + 4,
        f = e,
        da = new CToggle(k,f,p,s_bAudioActive,s_oAttachSection),
        da.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        g = k + p.width / 2 + 4,
        m = f) : (g = p.width / 2 + 4,
        m = e);
        p = window.document;
        z = p.documentElement;
        q = z.requestFullscreen || z.mozRequestFullScreen || z.webkitRequestFullScreen || z.msRequestFullscreen;
        W = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (q = !1);
        q && screenfull.isEnabled && (p = s_oSpriteLibrary.getSprite("but_fullscreen"),
        ba = new CToggle(g,m,p,s_bFullscreen,s_oAttachSection),
        ba.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        Z = new CAreYouSurePanel;
        Z.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        s_bMobile || (document.onkeyup = this.onKeyUp);
        this.refreshButtonPos()
    }
    ;
    this.onKeyUp = function(G) {
        G || (G = window.event);
        13 === G.keyCode && s_oInterface._onSpin();
        G.preventDefault();
        return !1
    }
    ;
    this.refreshButtonPos = function() {
        w - s_iOffsetX > CANVAS_WIDTH - 210 && J.setPosition(w - s_iOffsetX, H - s_iOffsetY);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || da.setPosition(k + s_iOffsetX, s_iOffsetY + f);
        q && screenfull.isEnabled && ba.setPosition(g + s_iOffsetX, m + s_iOffsetY);
        A.setPosition(d - s_iOffsetX, e + s_iOffsetY)
    }
    ;
    this.unload = function() {
        J.unload();
        J = null;
        I.unload();
        I = null;
        B.unload();
        B = null;
        u.unload();
        u = null;
        N.unload();
        N = null;
        A.unload();
        Z.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            da.unload(),
            da = null;
        q && screenfull.isEnabled && ba.unload();
        for (var G = 0; G < NUM_PAYLINES; G++)
            y[G].unload();
        s_oInterface = null
    }
    ;
    this._initPaylines = function(G) {
        var M = s_oSpriteLibrary.getSprite("bet_but");
        y = [];
        var z = 91
          , p = new CBetBut(-M.width / 4 + 70,z,"bet_but4",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        y[3] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but2",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        y[1] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but20",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        y[19] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but16",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        y[15] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but10",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        y[9] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but1",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        y[0] = p;
        z += 69;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but11",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        y[10] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but17",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        y[16] = p;
        z += 68;
        p = new CBetBut(-M.width / 4 + 70,z,"bet_but3",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        y[2] = p;
        p = new CBetBut(-M.width / 4 + 70,z + 68,"bet_but5",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        y[4] = p;
        z = 91;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but14",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        y[13] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but12",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        y[11] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but9",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        y[8] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but18",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        y[17] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but6",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        y[5] = p;
        z += 69;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but7",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        y[6] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but19",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        y[18] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but8",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        y[7] = p;
        z += 68;
        p = new CBetBut(1434 - M.width / 4,z,"bet_but13",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        y[12] = p;
        p = new CBetBut(1434 - M.width / 4,z + 68,"bet_but15",G);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        y[14] = p;
        M = [{
            x: 122,
            y: 470
        }, {
            x: 122,
            y: 200
        }, {
            x: 122,
            y: 678
        }, {
            x: 122,
            y: 126
        }, {
            x: 122,
            y: 180
        }, {
            x: 122,
            y: 122
        }, {
            x: 122,
            y: 460
        }, {
            x: 122,
            y: 198
        }, {
            x: 122,
            y: 130
        }, {
            x: 122,
            y: 228
        }, {
            x: 122,
            y: 214
        }, {
            x: 122,
            y: 190
        }, {
            x: 122,
            y: 420
        }, {
            x: 122,
            y: 126
        }, {
            x: 122,
            y: 422
        }, {
            x: 122,
            y: 230
        }, {
            x: 122,
            y: 470
        }, {
            x: 122,
            y: 148
        }, {
            x: 122,
            y: 120
        }, {
            x: 122,
            y: 260
        }];
        l = [];
        for (z = 0; z < NUM_PAYLINES; z++)
            p = new createBitmap(s_oSpriteLibrary.getSprite("payline_" + (z + 1))),
            p.x = M[z].x,
            p.y = M[z].y,
            p.visible = !1,
            G.addChild(p),
            l[z] = p
    }
    ;
    this.refreshMoney = function(G) {
        O.refreshText(TEXT_MONEY + ": " + formatEntries(G) + TEXT_CURRENCY)
    }
    ;
    this.refreshBet = function(G) {
        u.setText(TEXT_COIN + " " + formatEntries(G))
    }
    ;
    this.refreshTotalBet = function(G) {
        P.refreshText(TEXT_BET + ": " + formatEntries(G) + TEXT_CURRENCY)
    }
    ;
    this.refreshNumLines = function(G) {
        E = !0;
        B.setText(TEXT_LINES + " " + G);
        for (var M = 0; M < NUM_PAYLINES; M++)
            M < G ? (y[M].setOn(),
            l[M].visible = !0) : y[M].setOff();
        setTimeout(function() {
            for (var z = 0; z < NUM_PAYLINES; z++)
                l[z].visible = !1;
            E = !1
        }, 1E3)
    }
    ;
    this.resetWin = function() {
        C.refreshText(TEXT_WIN + ": " + formatEntries(0))
    }
    ;
    this.refreshWinText = function(G) {
        C.refreshText(TEXT_WIN + ": " + formatEntries(G))
    }
    ;
    this.refreshFreeSpinNum = function(G) {
        V.refreshText(G);
        "" === G ? (Q.visible = !1,
        U.visible = !1) : (Q.visible = !0,
        U.visible = !0)
    }
    ;
    this.refreshFreeSpinAmount = function(G) {
        "" === G ? S.refreshText(G) : S.refreshText(formatEntries(G))
    }
    ;
    this.showLine = function(G) {
        0 < G && (l[G - 1].visible = !0)
    }
    ;
    this.hideLine = function(G) {
        0 < G && (l[G - 1].visible = !1)
    }
    ;
    this.hideAllLines = function() {
        for (var G = 0; G < NUM_PAYLINES; G++)
            l[G].visible = !1
    }
    ;
    this.disableBetBut = function(G) {
        for (var M = 0; M < NUM_PAYLINES; M++)
            y[M].disable(G)
    }
    ;
    this.enableGuiButtons = function() {
        J.enable();
        N.enable();
        u.enable();
        B.enable();
        I.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    }
    ;
    this.enableSpin = function(G) {
        J.enable();
        G && N.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    }
    ;
    this.disableSpin = function(G) {
        J.disable();
        G && N.disable();
        s_bMobile || (document.onkeyup = null)
    }
    ;
    this.disableGuiButtons = function(G, M) {
        s_bMobile || (document.onkeyup = null);
        M ? (N.disable(),
        this.disableSpin(!0)) : G ? (J.disable(),
        N.setText(TEXT_STOP_AUTO)) : (N.disable(),
        J.setText(TEXT_SKIP));
        u.disable();
        B.disable();
        I.disable()
    }
    ;
    this.setAutoSpinState = function(G) {
        N.setText(G)
    }
    ;
    this.setSpinState = function(G) {
        J.setText(G)
    }
    ;
    this._onBetLineClicked = function(G) {
        E || (this.refreshNumLines(G),
        s_oGame.activateLines(G))
    }
    ;
    this._onSpin = function() {
        if (J.getText() === TEXT_SKIP)
            s_oGame.forceStopReel(),
            J.setText(TEXT_SPIN);
        else
            s_oGame.onSpin()
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
    this._onAutoSpin = function() {
        N.getText() === TEXT_STOP_AUTO ? (N.setText(TEXT_AUTO_SPIN),
        s_oGame.onAutoSpin(!1)) : (N.setText(TEXT_STOP_AUTO),
        s_oGame.onAutoSpin(!0))
    }
    ;
    this.resetFullscreenBut = function() {
        q && screenfull.isEnabled && ba.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? W.call(window.document) : q.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        Z.show(TEXT_ARE_SURE)
    }
    ;
    this._onExitYes = function() {
        s_oGame.onExit()
    }
    ;
    s_oInterface = this;
    this._init(a, b, c)
}
var s_oInterface = null;
function CPayTablePanel() {
    var a, b, c, d, e, g, m, k, f;
    this._init = function() {
        a = 0;
        d = [];
        f = new createjs.Container;
        f.on("click", function() {});
        f.visible = !1;
        s_oAttachSection.addChild(f);
        var h = new createjs.Container;
        f.addChild(h);
        var r = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
        h.addChild(r);
        this._createPayouts(h);
        d[0] = h;
        h = new createjs.Container;
        h.visible = !1;
        f.addChild(h);
        r = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
        h.addChild(r);
        d[1] = h;
        e = d[a];
        h = new createjs.Container;
        h.visible = !1;
        f.addChild(h);
        r = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
        h.addChild(r);
        r = new CTLText(h,1E3,366,546,118,36,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_HELP_BONUS1,!0,!0,!0,!1);
        new CTLText(h,1E3,544,546,280,36,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_HELP_BONUS2,!0,!0,!0,!1);
        d[2] = h;
        h = new createjs.Container;
        h.visible = !1;
        f.addChild(h);
        r = createBitmap(s_oSpriteLibrary.getSprite("paytable4"));
        h.addChild(r);
        for (var x = 400, t = 0; 3 > t; t++)
            r = new createjs.Text(t + 3 + "X  " + NUM_FREESPIN[t],"40px " + FONT_GAME_1,"#ffba00"),
            r.textAlign = "left",
            r.x = CANVAS_WIDTH / 2 + 44,
            r.y = x,
            r.textBaseline = "alphabetic",
            h.addChild(r),
            x += 42;
        r = new CTLText(h,CANVAS_WIDTH / 2 - 280,550,560,280,56,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_HELP_FREESPIN,!0,!0,!0,!1);
        d[3] = h;
        e = d[a];
        m = new CGfxButton(CANVAS_WIDTH - 270,CANVAS_HEIGHT / 2,s_oSpriteLibrary.getSprite("but_arrow_next"),f);
        m.addEventListener(ON_MOUSE_UP, this._onNext, this);
        k = new CGfxButton(270,CANVAS_HEIGHT / 2,s_oSpriteLibrary.getSprite("but_arrow_prev"),f);
        k.addEventListener(ON_MOUSE_UP, this._onPrev, this);
        h = s_oSpriteLibrary.getSprite("but_exit_info");
        g = new CGfxButton(1566,266,h,f);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this)
    }
    ;
    this.unload = function() {}
    ;
    this._createPayouts = function(h) {
        b = [];
        c = [];
        for (var r = [{
            x: 1164,
            y: 744
        }, {
            x: 800,
            y: 744
        }, {
            x: 1290,
            y: 558
        }, {
            x: 940,
            y: 558
        }, {
            x: 590,
            y: 558
        }, {
            x: 1164,
            y: 374
        }, {
            x: 800,
            y: 374
        }], x = 0, t = 0; t < PAYTABLE_VALUES.length; t++) {
            var v = PAYTABLE_VALUES[t];
            do {
                var w = v.indexOf(0);
                -1 !== w && v.splice(w, 1)
            } while (-1 !== w);
            w = v.length;
            if (0 !== w) {
                var H = 40;
                4 === w && (H = 32);
                var E = r[x].y;
                b[t] = [];
                c[t] = [];
                for (var y = 0; y < w; y++) {
                    var l = new createjs.Text("X" + (5 - y),"40px " + FONT_GAME_1,"#ffffff");
                    l.textAlign = "center";
                    l.x = r[x].x;
                    l.y = E;
                    l.textBaseline = "alphabetic";
                    h.addChild(l);
                    b[t][y] = l;
                    var J = new createjs.Text(v[w - y - 1],"40px " + FONT_GAME_1,"#ffba00");
                    J.textAlign = "center";
                    J.x = l.x + 70;
                    J.y = l.y;
                    J.textBaseline = "alphabetic";
                    h.addChild(J);
                    c[t][y] = J;
                    E += H
                }
                x++
            }
        }
    }
    ;
    this._onNext = function() {
        a === d.length - 1 ? a = 0 : a++;
        e.visible = !1;
        d[a].visible = !0;
        e = d[a]
    }
    ;
    this._onPrev = function() {
        0 === a ? a = d.length - 1 : a--;
        e.visible = !1;
        d[a].visible = !0;
        e = d[a]
    }
    ;
    this.refreshButtonPos = function(h, r) {}
    ;
    this.show = function() {
        a = 0;
        e.visible = !1;
        d[a].visible = !0;
        e = d[a];
        f.visible = !0
    }
    ;
    this.hide = function() {
        f.visible = !1
    }
    ;
    this.resetHighlightCombo = function() {
        for (var h = 0; h < b.length; h++)
            if (void 0 !== b[h])
                for (var r = 0; r < b[h].length; r++)
                    b[h][r].color = "#ffffff",
                    c[h][r].color = "#ffff00",
                    createjs.Tween.removeTweens(c[h][r]),
                    c[h][r].alpha = 1
    }
    ;
    this.highlightCombo = function(h, r) {
        c[h][NUM_REELS - r].color = "#ff9000";
        this.tweenAlpha(c[h][NUM_REELS - r], 0)
    }
    ;
    this.tweenAlpha = function(h, r) {
        createjs.Tween.get(h, {
            loop: -1
        }).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200)
    }
    ;
    this._onExit = function() {
        s_oGame.hidePayTable()
    }
    ;
    this.isVisible = function() {
        return f.visible
    }
    ;
    this._init()
}
function CStaticSymbolCell(a, b, c, d) {
    var e, g, m, k, f = -1, h, r, x, t, v, w, H;
    this._init = function(y, l, J, I) {
        m = J;
        k = I;
        e = 0;
        H = new createjs.Container;
        H.visible = !1;
        s_oAttachSection.addChild(H);
        w = new createjs.Container;
        w.visible = !1;
        w.x = J;
        w.y = I;
        H.addChild(w);
        w.scaleX = w.scaleY = .5 * REEL_SCALE;
        h = [];
        for (y = 0; y < NUM_SYMBOLS; y++)
            l = createSprite(s_aSymbolAnims[y], "static", 0, 0, SYMBOL_ANIM_WIDTH, SYMBOL_ANIM_HEIGHT),
            l.on("animationend", this._onAnimEnded, null, !1),
            w.addChild(l),
            h[y] = l,
            h[y].visible = !1;
        y = {
            images: [s_oSpriteLibrary.getSprite("win_frame_anim_big_0"), s_oSpriteLibrary.getSprite("win_frame_anim_big_1"), s_oSpriteLibrary.getSprite("win_frame_anim_big_2"), s_oSpriteLibrary.getSprite("win_frame_anim_big_3"), s_oSpriteLibrary.getSprite("win_frame_anim_big_4"), s_oSpriteLibrary.getSprite("win_frame_anim_big_5"), s_oSpriteLibrary.getSprite("win_frame_anim_big_6"), s_oSpriteLibrary.getSprite("win_frame_anim_big_7")],
            framerate: 60,
            frames: {
                width: WIN_BIG_ANIM_WIDTH,
                height: WIN_BIG_ANIM_HEIGHT
            },
            animations: {
                "static": 0,
                anim: [1, 64]
            }
        };
        y = new createjs.SpriteSheet(y);
        x = createSprite(y, "static", 0, 0, WIN_BIG_ANIM_WIDTH, WIN_BIG_ANIM_HEIGHT);
        x.x = -36;
        x.y = -32;
        w.addChild(x);
        y = s_oSpriteLibrary.getSprite("amount_bonus_win");
        v = createBitmap(y);
        v.regX = y.width / 2;
        v.regY = y.height / 2;
        v.x = SYMBOL_ANIM_WIDTH / 2;
        v.y = SYMBOL_ANIM_HEIGHT;
        w.addChild(v);
        t = new CTLText(w,SYMBOL_ANIM_WIDTH / 2 - 125,SYMBOL_ANIM_HEIGHT - 37,250,76,76,"center","#ffba00",FONT_GAME_1,1.1,0,0," ",!0,!0,!1,!1);
        y = {
            images: [s_oSpriteLibrary.getSprite("win_frame_anim_0"), s_oSpriteLibrary.getSprite("win_frame_anim_1")],
            framerate: 40,
            frames: {
                width: 342,
                height: 336
            },
            animations: {
                "static": 0,
                anim: [0, 42]
            }
        };
        y = new createjs.SpriteSheet(y);
        r = createSprite(y, "static", 0, 0, 342, 336);
        r.x = J - 60;
        r.y = I - 60;
        r.scaleX = r.scaleY = REEL_SCALE;
        H.addChild(r)
    }
    ;
    this.unload = function() {
        s_oAttachSection.removeChild(H)
    }
    ;
    this.hide = function() {
        -1 < f && (stopSound("symbol" + f),
        r.gotoAndStop("static"),
        r.visible = !1,
        x.gotoAndStop("static"),
        x.visible = !1,
        v.visible = !1,
        t.refreshText(" "),
        h[f].gotoAndPlay("static"),
        h[f].visible = !1,
        H.visible = !1,
        f = -1)
    }
    ;
    this.show = function(y, l, J, I, B) {
        e = 0;
        g = B;
        for (B = 0; B < NUM_SYMBOLS; B++)
            h[B].visible = B + 1 === y ? !0 : !1;
        v.visible = !1;
        0 < l ? (t.refreshText(formatEntries(l)),
        v.visible = !0) : t.refreshText(" ");
        x.gotoAndPlay("anim");
        x.visible = !0;
        h[y - 1].gotoAndPlay("anim");
        f = y - 1;
        h[y - 1].spriteSheet.getNumFrames();
        w.regX = I.x;
        w.regY = I.y;
        w.x = m + J.x;
        w.y = k + J.y;
        w.scaleX = w.scaleY = .5 * REEL_SCALE;
        w.visible = !0;
        w.alpha = 1;
        H.visible = !0;
        createjs.Tween.get(w).to({
            scaleX: REEL_SCALE,
            scaleY: REEL_SCALE
        }, 1E3, createjs.Ease.cubicOut);
        playSound("symbol" + f, 1, !1)
    }
    ;
    this.showWinFrame = function() {
        r.gotoAndPlay("anim");
        r.visible = !0;
        H.visible = !0
    }
    ;
    this.hideWinFrame = function() {
        createjs.Tween.removeTweens(w);
        r.gotoAndPlay("static");
        r.visible = !1;
        H.visible = !1
    }
    ;
    this._onAnimEnded = function() {
        e++;
        e === g && -1 < f && (h[f].stop(),
        createjs.Tween.get(w).to({
            scaleX: .52,
            scaleY: .52,
            alpha: 0
        }, 500, createjs.Ease.cubicOut).call(function() {
            E.stopAnim();
            s_oGame.showWin()
        }))
    }
    ;
    this.stopAnim = function() {
        -1 !== f && (stopSound("symbol" + f),
        h[f].visible = !1,
        w.visible = !1,
        r.gotoAndStop("static"),
        r.visible = !1)
    }
    ;
    var E = this;
    this._init(a, b, c, d)
}
function CTweenController() {
    this.tweenValue = function(a, b, c) {
        return a + c * (b - a)
    }
    ;
    this.easeLinear = function(a, b, c, d) {
        return c * a / d + b
    }
    ;
    this.easeInCubic = function(a, b, c, d) {
        d = (a /= d) * a * a;
        return b + c * d
    }
    ;
    this.easeBackInQuart = function(a, b, c, d) {
        d = (a /= d) * a;
        return b + c * (2 * d * d + 2 * d * a + -3 * d)
    }
    ;
    this.easeInBack = function(a, b, c, d) {
        return c * (a /= d) * a * (2.70158 * a - 1.70158) + b
    }
    ;
    this.easeOutBack = function(a, b, c, d) {
        return c * ((a = a / d - 1) * a * (2.70158 * a + 1.70158) + 1) + b
    }
    ;
    this.easeOutCubic = function(a, b, c, d) {
        return c * ((a = a / d - 1) * a * a + 1) + b
    }
    ;
    this.getTrajectoryPoint = function(a, b) {
        var c = new createjs.Point
          , d = (1 - a) * (1 - a)
          , e = a * a;
        c.x = d * b.start.x + 2 * (1 - a) * a * b.traj.x + e * b.end.x;
        c.y = d * b.start.y + 2 * (1 - a) * a * b.traj.y + e * b.end.y;
        return c
    }
}
function CMsgBox() {
    var a, b, c, d, e, g, m;
    this._init = function() {
        m = new createjs.Container;
        m.visible = !1;
        s_oStage.addChild(m);
        b = new createjs.Shape;
        b.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a = b.on("click", function() {});
        m.addChild(b);
        var k = s_oSpriteLibrary.getSprite("msg_box");
        g = new createjs.Container;
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2;
        g.regX = k.width / 2;
        g.regY = k.height / 2;
        g.scale = 0;
        m.addChild(g);
        c = createBitmap(k);
        g.addChild(c);
        d = new CTLText(g,70,60,k.width - 140,400,42,"center","#ffba00",FONT_GAME_1,1,0,0," ",!0,!0,!0,!1);
        e = new CGfxButton(k.width / 2,k.height - 150,s_oSpriteLibrary.getSprite("but_yes"),g);
        e.addEventListener(ON_MOUSE_UP, this._onExit, this)
    }
    ;
    this.unload = function() {
        b.off("click", a);
        e.unload()
    }
    ;
    this.show = function(k) {
        d.refreshText(k);
        m.visible = !0;
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(g).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut)
    }
    ;
    this.hide = function() {
        e.disable();
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(g).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            m.visible = !1
        })
    }
    ;
    this._onExit = function() {
        this.hide()
    }
    ;
    this._init()
}
function CBonusPanel() {
    var a, b, c, d = !1, e, g, m, k, f, h, r, x, t, v, w, H, E, y, l, J, I, B, u, N, A = null, Q, U, O, P;
    this._init = function() {
        c = !1;
        d = !0;
        x = [504, 808, 1112, 1416];
        P.removeAllChildren();
        P.visible = !1;
        var C = s_oSpriteLibrary.getSprite("bg_bonus");
        l = createBitmap(C);
        P.addChild(l);
        C = [];
        for (var V = 0; 101 > V; V++)
            C.push(s_oSpriteLibrary.getSprite("zeus_animations_" + V));
        C = {
            images: C,
            framerate: 40,
            frames: {
                width: 490,
                height: 750,
                regX: 245,
                regY: 375
            },
            animations: {
                start: 0,
                idle: [0, 60],
                punch: [61, 100, "idle"]
            }
        };
        C = new createjs.SpriteSheet(C);
        I = createSprite(C, "start", 245, 375, 490, 750);
        I.on("animationend", this._onZeusAnimationEnd, this);
        I.x = CANVAS_WIDTH / 2;
        I.y = 388;
        P.addChild(I);
        U = new createjs.Container;
        P.addChild(U);
        C = [];
        for (V = 0; 32 > V; V++)
            C.push(s_oSpriteLibrary.getSprite("thunderbolt_" + V));
        C = {
            images: C,
            framerate: 40,
            frames: {
                width: 240,
                height: 902,
                regX: 120,
                regY: 902
            },
            animations: {
                start: 0,
                anim: [0, 31, "end"],
                end: 32
            }
        };
        C = new createjs.SpriteSheet(C);
        N = createSprite(C, "start", 120, 902, 240, 902);
        N.visible = !1;
        P.addChild(N);
        Q = new CBonusCloud(P);
        C = s_oSpriteLibrary.getSprite("amount_bonus_win");
        a = 14;
        b = CANVAS_HEIGHT - C.height - 20;
        y = new createjs.Container;
        y.x = a;
        y.y = b;
        P.addChild(y);
        V = createBitmap(C);
        y.addChild(V);
        E = new createjs.Text(formatEntries(0),"56px " + FONT_GAME_1,"#ffba00");
        E.textAlign = "center";
        E.x = C.width / 2;
        E.y = 28;
        E.shadow = new createjs.Shadow("#000",2,2,2);
        y.addChild(E);
        O = new createjs.Shape;
        O.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        H = O.on("click", function() {});
        P.addChild(O);
        this._startBonus()
    }
    ;
    this._loadAllResources = function() {
        P = new createjs.Container;
        s_oAttachSection.addChild(P);
        var C = s_oSpriteLibrary.getSprite("bg_loading_bonus");
        J = createBitmap(C);
        P.addChild(J);
        C = s_oSpriteLibrary.getSprite("progress_bar");
        u = createBitmap(C);
        u.x = CANVAS_WIDTH / 2 - C.width / 2;
        u.y = CANVAS_HEIGHT - 182;
        P.addChild(u);
        g = C.width;
        m = C.height;
        w = new createjs.Shape;
        w.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(u.x, u.y, 1, m);
        P.addChild(w);
        u.mask = w;
        B = new createjs.Text("","30px " + FONT_GAME_1,"#ffba00");
        B.x = CANVAS_WIDTH / 2;
        B.y = CANVAS_HEIGHT - 200;
        B.shadow = new createjs.Shadow("#000",2,2,2);
        B.textBaseline = "alphabetic";
        B.textAlign = "center";
        P.addChild(B);
        s_oSpriteLibrary.init(this._onResourceBonusLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("clouds", "./sprites/bonus/clouds.png");
        s_oSpriteLibrary.addSprite("jar", "./sprites/bonus/jar.png");
        for (C = 0; 30 > C; C++)
            s_oSpriteLibrary.addSprite("jar_anim_" + C, "./sprites/bonus/jar_anim/jar_anim_" + C + ".png");
        for (C = 0; 32 > C; C++)
            s_oSpriteLibrary.addSprite("thunderbolt_" + C, "./sprites/bonus/thunderbolt/thunderbolt_" + C + ".png");
        s_oSpriteLibrary.addSprite("column_0", "./sprites/bonus/column_0.png");
        s_oSpriteLibrary.addSprite("column_1", "./sprites/bonus/column_1.png");
        s_oSpriteLibrary.addSprite("column_2", "./sprites/bonus/column_2.png");
        s_oSpriteLibrary.addSprite("column_3", "./sprites/bonus/column_3.png");
        for (C = 0; 101 > C; C++)
            s_oSpriteLibrary.addSprite("zeus_animations_" + C, "./sprites/bonus/zeus_animations/zeus_animations_" + C + ".png");
        k = 0;
        f = s_oSpriteLibrary.getNumSprites();
        0 === f ? this._startBonus() : s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onResourceBonusLoaded = function() {
        k++;
        var C = Math.floor(k / f * 100);
        B.text = C + "%";
        w.graphics.clear();
        C = Math.floor(C * g / 100);
        w.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(u.x, u.y, C, m);
        k === f && this._init()
    }
    ;
    this.unload = function() {
        O.off("click", H);
        for (var C = 0; C < v.length; C++)
            v[C].unload()
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.reset = function() {
        E.text = formatEntries(0);
        createjs.Tween.removeTweens(I);
        I.y = 388;
        null !== A && (A.unload(),
        A = null)
    }
    ;
    this.refreshButtonPos = function() {
        void 0 !== y && (y.x = a + s_iOffsetX,
        y.y = b - s_iOffsetY)
    }
    ;
    this.show = function(C, V) {
        t = C;
        d ? this._startBonus() : this._loadAllResources()
    }
    ;
    this.hide = function() {
        c = !1;
        stop("bonus_soundtrack");
        l.off("click", function() {});
        P.visible = !1;
        this.reset();
        s_oGame.exitFromBonus(h)
    }
    ;
    this._startBonus = function() {
        this.refreshButtonPos();
        h = 0;
        v = [];
        this._initColumsButtons();
        I.gotoAndPlay("idle");
        createjs.Tween.get(I, {
            loop: !0,
            bounce: !0
        }).to({
            y: 336
        }, 4E3, createjs.Ease.sineInOut);
        l.on("click", function() {});
        c = P.visible = !0;
        playSound("bonus_soundtrack", 1, !0)
    }
    ;
    this.endBonus = function() {
        new CBonusResultPanel(h,P);
        playSound("bonus_end", 1, !1)
    }
    ;
    this._initColumsButtons = function() {
        if (0 === t.length)
            this.endBonus();
        else {
            N.visible = !1;
            v = [];
            e = t.shift();
            h += e;
            for (var C = 0; 4 > C; C++) {
                var V = new CBonusBut(C,x[C],CANVAS_HEIGHT,U);
                V.addEventListener(ON_MOUSE_UP, this._onButtonRelease, this);
                0 !== C && 3 !== C || V.setScale(.86);
                v.push(V)
            }
            s_oBonusPanel._showAllButtons()
        }
    }
    ;
    this._showAllButtons = function() {
        O.visible = !1;
        for (var C = 500, V = [380, 528, 528, 380], S = 0; S < v.length; S++)
            v[S].tweenDown(V[S], C),
            C += 200
    }
    ;
    this._disableAllButtons = function() {
        O.visible = !0
    }
    ;
    this.refreshScoreAmount = function() {
        E.text = formatEntries(h)
    }
    ;
    this._onButtonRelease = function(C) {
        s_oBonusPanel._disableAllButtons();
        r = C;
        I.gotoAndPlay("punch");
        playSound("bonus_zeus_punch", 1, !1);
        for (C = 0; C < v.length; C++)
            r !== C && v[C].tweenUp(CANVAS_HEIGHT, 500)
    }
    ;
    this._onZeusAnimationEnd = function(C) {
        "punch" === C.currentTarget.currentAnimation && (N.x = v[r].getX(),
        N.visible = !0,
        N.gotoAndPlay("anim"),
        playSound("thunder", 1, !1),
        0 === r || 3 === r ? (N.y = v[r].getY() + 248,
        N.scaleX = N.scaleY = .86) : (N.y = v[r].getY() + 294,
        N.scaleX = N.scaleY = 1),
        this._destroyJar())
    }
    ;
    this._destroyJar = function() {
        v[r].explode();
        A = new CScoreText(formatEntries(e),v[r].getX(),v[r].getY(),P);
        this.refreshScoreAmount();
        setTimeout(function() {
            v[r].tweenUp(CANVAS_HEIGHT, 500)
        }, 1500);
        setTimeout(function() {
            s_oBonusPanel._initColumsButtons()
        }, 2E3)
    }
    ;
    this.update = function() {
        c && Q.update()
    }
    ;
    s_oBonusPanel = this
}
var s_oBonusPanel = null;
function CBonusResultPanel(a, b) {
    var c, d;
    this._init = function(e) {
        c = new createjs.Container;
        b.addChild(c);
        var g = s_oSpriteLibrary.getSprite("msg_box_small");
        d = new createjs.Container;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.regX = g.width / 2;
        d.regY = g.height / 2;
        d.scale = 0;
        c.addChild(d);
        var m = createBitmap(g);
        d.addChild(m);
        new CTLText(d,50,60,g.width - 100,74,74,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_CONGRATS,!0,!0,!1,!1);
        new CTLText(d,50,150,g.width - 100,280,70,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_YOU_WIN + "\n" + formatEntries(e),!0,!0,!0,!1);
        var k = this;
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                k.hide()
            }, 3E3)
        })
    }
    ;
    this.hide = function() {
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            b.removeChild(c);
            s_oBonusPanel.hide()
        })
    }
    ;
    this._init(a)
}
function CBonusBut(a, b, c, d) {
    var e, g, m, k, f, h, r, x, t, v;
    this._init = function(H, E) {
        e = !1;
        g = [];
        m = [];
        r = new createjs.Container;
        r.x = H;
        r.y = E;
        d.addChild(r);
        var y = s_oSpriteLibrary.getSprite("column_" + a)
          , l = createBitmap(y);
        l.regX = y.width / 2;
        l.y = 254;
        r.addChild(l);
        l = [];
        for (var J = 0; 30 > J; J++)
            l.push(s_oSpriteLibrary.getSprite("jar_anim_" + J));
        l = new createjs.SpriteSheet({
            images: l,
            framerate: 40,
            frames: {
                width: 852,
                height: 546,
                regX: 426
            },
            animations: {
                "static": 0,
                anim: [0, 29, "end"],
                end: 29
            }
        });
        t = createSprite(l, "static", 426, 0, 852, 546);
        t.visible = !1;
        r.addChild(t);
        v = createBitmap(s_oSpriteLibrary.getSprite("jar"));
        v.x = -86;
        v.y = 14;
        r.addChild(v);
        x = new createjs.Shape;
        x.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(-y.width / 2, 0, y.width, y.height);
        r.addChild(x);
        k = x.on("mousedown", this.buttonDown);
        f = x.on("pressup", this.buttonRelease);
        s_bMobile || (h = x.on("mouseover", this.buttonOver))
    }
    ;
    this.unload = function() {
        x.off("mousedown", k);
        x.off("pressup", f);
        s_bMobile || x.off("mouseover", h);
        d.removeChild(r)
    }
    ;
    this.setVisible = function(H) {
        r.visible = H
    }
    ;
    this.addEventListener = function(H, E, y) {
        g[H] = E;
        m[H] = y
    }
    ;
    this.buttonRelease = function() {
        e || g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(m[ON_MOUSE_UP], a)
    }
    ;
    this.buttonDown = function() {
        e || g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN])
    }
    ;
    this.buttonOver = function(H) {
        s_bMobile || e || (H.target.cursor = "pointer")
    }
    ;
    this.tweenDown = function(H, E) {
        createjs.Tween.get(r).to({
            y: H
        }, E, createjs.Ease.backOut)
    }
    ;
    this.tweenUp = function(H, E) {
        createjs.Tween.get(r).to({
            y: H
        }, E, createjs.Ease.backIn).call(function() {
            w.unload()
        })
    }
    ;
    this.explode = function() {
        v.visible = !1;
        t.visible = !0;
        t.gotoAndPlay("anim");
        playSound("bonus_game_jar_explosion", 1, !1)
    }
    ;
    this.setScale = function(H) {
        r.scaleX = r.scaleY = H
    }
    ;
    this.getX = function() {
        return r.x
    }
    ;
    this.getY = function() {
        return r.y
    }
    ;
    this.update = function() {}
    ;
    var w = this;
    this._init(b, c)
}
function CBonusCloud(a) {
    var b, c, d;
    this._init = function() {
        d = new createjs.Container;
        a.addChild(d);
        c = [];
        var e = s_oSpriteLibrary.getSprite("clouds");
        b = e.width;
        var g = createBitmap(e);
        g.x = -b;
        g.regY = e.height;
        g.y = CANVAS_HEIGHT;
        d.addChild(g);
        c.push(g);
        g = createBitmap(e);
        g.x = 0;
        g.regY = e.height;
        g.y = CANVAS_HEIGHT;
        d.addChild(g);
        c.push(g)
    }
    ;
    this.update = function() {
        for (var e = 0; e < c.length; e++)
            c[e].x += 1,
            c[e].x > CANVAS_WIDTH && (c[e].x = -b)
    }
    ;
    this._init()
}
function CScoreText(a, b, c, d) {
    var e;
    this._init = function(g, m, k) {
        e = new createjs.Text("00000","100px " + FONT_GAME_1,"#ffba00");
        e.textAlign = "center";
        e.text = g;
        e.x = m;
        e.y = k;
        e.alpha = 0;
        e.shadow = new createjs.Shadow("#000",1,1,1);
        d.addChild(e);
        var f = this;
        createjs.Tween.get(e).to({
            alpha: 1
        }, 200, createjs.Ease.quadIn).call(function() {
            f.moveUp()
        })
    }
    ;
    this.moveUp = function() {
        var g = e.y - 400
          , m = this;
        createjs.Tween.get(e).to({
            y: g
        }, 1500, createjs.Ease.sineIn).call(function() {
            m.unload()
        });
        createjs.Tween.get(e).wait(800).to({
            alpha: 0
        }, 500)
    }
    ;
    this.unload = function() {
        d.removeChild(e)
    }
    ;
    this._init(a, b, c)
}
function CFreespinPanel(a) {
    var b, c, d, e;
    this._init = function() {
        e = new createjs.Container;
        e.on("click", function() {});
        e.visible = !1;
        a.addChild(e);
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(b);
        var g = s_oSpriteLibrary.getSprite("msg_box_small");
        d = new createjs.Container;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.regX = g.width / 2;
        d.regY = g.height / 2;
        e.addChild(d);
        var m = createBitmap(g);
        d.addChild(m);
        new CTLText(d,50,40,g.width - 100,74,74,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_CONGRATS,!0,!0,!0,!1);
        c = new CTLText(d,50,140,g.width - 100,300,60,"center","#ffba00",FONT_GAME_1,1,0,0," ",!0,!0,!0,!1)
    }
    ;
    this.show = function(g) {
        c.refreshText(TEXT_YOU_WIN + " " + g + " " + TEXT_FREESPINS);
        e.visible = !0;
        d.scale = 0;
        b.alpha = 0;
        var m = this;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                m.hide()
            }, 3E3)
        });
        playSound("bonus_end", 1, !1)
    }
    ;
    this.hide = function() {
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            s_oGame.exitFromFreespinPanel()
        })
    }
    ;
    this._init()
}
function CAvatar(a) {
    var b, c, d, e, g;
    this._init = function() {
        b = -150;
        c = CANVAS_HEIGHT;
        g = new createjs.Container;
        g.x = b;
        g.y = c;
        m.addChild(g);
        for (var k = [], f = 0; 350 > f; f++)
            k.push(s_oSpriteLibrary.getSprite("avatar_" + f));
        k = {
            images: k,
            framerate: 40,
            frames: {
                width: 649,
                height: 635,
                regX: 0,
                regY: 635
            },
            animations: {
                idle: [0, 89],
                win_0: [90, 149, "idle"],
                win_1: [150, 222, "idle"],
                start_freespin: [223, 265, "start_lightning"],
                start_lightning: [266, 287, "freespin_loop"],
                freespin_loop: [288, 324],
                end_freespin: [325, 349, "idle"]
            }
        };
        k = new createjs.SpriteSheet(k);
        d = createSprite(k, "start", 0, 635, 649, 635);
        d.on("animationend", this._onAnimationEnd, this);
        g.addChild(d);
        k = [];
        for (f = 0; 37 > f; f++)
            k.push(s_oSpriteLibrary.getSprite("thunder_avatar_" + f));
        k = {
            images: k,
            frames: {
                width: 637,
                height: 1080,
                regX: 0,
                regY: 1080
            },
            animations: {
                start: 0,
                anim: [0, 21]
            }
        };
        k = new createjs.SpriteSheet(k);
        e = new createjs.Sprite(k,"start");
        e.visible = !1;
        e.x = 162;
        e.y = 0;
        g.addChild(e);
        this.refreshButtonPos()
    }
    ;
    this._hideAllAnims = function() {}
    ;
    this.refreshButtonPos = function() {
        g.x = 0 < b + s_iOffsetX ? 0 : b + s_iOffsetX;
        g.y = CANVAS_HEIGHT - s_iOffsetY
    }
    ;
    this.show = function(k) {
        "end_freespin" === k ? (e.gotoAndStop("start"),
        e.visible = !1) : "start_freespin" === k && (e.gotoAndStop("start"),
        e.visible = !1,
        playSound("avatar_start_freespins", 1, !1));
        d.gotoAndPlay(k)
    }
    ;
    this._onAnimationEnd = function(k) {
        "start_freespin" === k.currentTarget.currentAnimation && (e.visible = !0,
        e.gotoAndPlay("anim"))
    }
    ;
    var m = a;
    this._init()
}
function CResultFreespin(a) {
    var b, c, d, e, g, m, k;
    this._init = function() {
        k = new createjs.Container;
        k.visible = !1;
        f.addChild(k);
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g = b.on("click", function() {});
        k.addChild(b);
        var h = s_oSpriteLibrary.getSprite("msg_box_small");
        e = new createjs.Container;
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2;
        e.regX = h.width / 2;
        e.regY = h.height / 2;
        k.addChild(e);
        var r = createBitmap(h);
        e.addChild(r);
        c = new CTLText(e,50,60,h.width - 100,74,74,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_CONGRATS,!0,!0,!0,!1);
        d = new CTLText(e,50,150,h.width - 100,210,70,"center","#ffba00",FONT_GAME_1,1,0,0,TEXT_CONGRATS,!0,!0,!0,!1);
        m = new CGfxButton(h.width / 2,h.height - 120,s_oSpriteLibrary.getSprite("but_yes"),e);
        m.addEventListener(ON_MOUSE_UP, this.hide, this)
    }
    ;
    this.unload = function() {
        m.unload();
        b.off("click", g)
    }
    ;
    this.show = function(h) {
        m.enable();
        0 === h ? (c.refreshText(""),
        d.y = 0,
        d.refreshText(TEXT_NO_WIN)) : (c.refreshText(TEXT_CONGRATS),
        d.y = 30,
        d.refreshText(TEXT_YOU_WON + " " + formatEntries(h)));
        k.alpha = 1;
        k.visible = !0;
        e.scale = 0;
        b.alpha = 0;
        var r = this;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(e).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                r.hide()
            }, 3E3)
        });
        playSound("bonus_end", 1, !1)
    }
    ;
    this.hide = function() {
        m.disable();
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(e).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            k.visible = !1
        })
    }
    ;
    var f = a;
    this._init()
}
function CBigWin(a) {
    var b, c, d, e, g, m, k, f;
    this._init = function() {
        b = [];
        c = [];
        f = new createjs.Container;
        f.visible = !1;
        a.addChild(f);
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(d);
        for (var h = [], r = 2; 50 > r; r++)
            h.push(s_oSpriteLibrary.getSprite("big_win_" + r));
        h = new createjs.SpriteSheet({
            images: h,
            framerate: 40,
            frames: {
                width: 1385,
                height: 669,
                regX: 692
            },
            animations: {
                start: 0,
                anim1: [0, 17, "stop_anim1"],
                stop_anim1: 17,
                anim2: [18, 46, "end"],
                end: 47
            }
        });
        m = createSprite(h, "end", 692, 0, 1385, 669);
        m.x = CANVAS_WIDTH / 2;
        m.on("animationend", this._onAnimationEnd, this);
        f.addChild(m);
        e = new createjs.Text("","140px " + FONT_GAME_1,"#fff");
        e.textAlign = "center";
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 + 100;
        f.addChild(e);
        g = new createjs.Text("","140px " + FONT_GAME_1,"#ffba00");
        g.textAlign = "center";
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 + 100;
        g.outline = 4;
        f.addChild(g);
        k = new CRollingScore
    }
    ;
    this.addEventListener = function(h, r, x) {
        b[h] = r;
        c[h] = x
    }
    ;
    this.show = function(h) {
        f.visible = !0;
        d.alpha = 0;
        createjs.Tween.get(d).to({
            alpha: .5
        }, 500, createjs.Ease.cubicOut).call(function() {
            e.text = 0;
            g.text = 0;
            k.rolling(e, g, h);
            m.gotoAndPlay("anim1")
        })
    }
    ;
    this.hide = function() {
        f.visible = !1
    }
    ;
    this._onAnimationEnd = function(h) {
        "anim1" === h.currentTarget.currentAnimation ? setTimeout(function() {
            m.gotoAndPlay("anim2")
        }, 1E3) : "anim2" === h.currentTarget.currentAnimation && (e.text = "",
        g.text = "",
        b[ON_END_BIG_WIN] && b[ON_END_BIG_WIN].call(c[ON_END_BIG_WIN]))
    }
    ;
    this._init()
}
var MS_ROLLING_SCORE = 2500;
function CRollingScore() {
    var a = null
      , b = null;
    this.rolling = function(c, d, e) {
        a = createjs.Tween.get(c, {
            override: !0
        }).to({
            text: e
        }, MS_ROLLING_SCORE, createjs.Ease.linear).addEventListener("change", function() {
            c.text = formatEntries(c.text);
            playSound("score_counter", .5, !1)
        }).call(function() {
            createjs.Tween.removeTweens(a)
        });
        null !== d && (b = createjs.Tween.get(d, {
            override: !0
        }).to({
            text: e
        }, MS_ROLLING_SCORE, createjs.Ease.linear).addEventListener("change", function() {
            d.text = formatEntries(d.text)
        }).call(function() {
            createjs.Tween.removeTweens(b)
        }))
    }
    ;
    return this
}
function CRechargePanel() {
    var a, b, c, d, e, g, m, k = this;
    this._init = function() {
        m = new createjs.Container;
        s_oStage.addChild(m);
        b = new createjs.Shape;
        a = b.on("click", function() {});
        b.alpha = 0;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        m.addChild(b);
        var f = s_oSpriteLibrary.getSprite("msg_box_small");
        c = new createjs.Container;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        c.regX = .5 * f.width;
        c.regY = .5 * f.height;
        m.addChild(c);
        g = createBitmap(f);
        c.addChild(g);
        new CTLText(c,50,60,f.width - 100,180,90,"center","#ffba00",FONT_GAME_1,1,40,10,TEXT_RECHARGE,!0,!0,!0,!1);
        var h = s_oSpriteLibrary.getSprite("but_no");
        e = new CGfxButton(130,380,h,c);
        e.addEventListener(ON_MOUSE_UP, this.hide, this);
        d = new CGfxButton(f.width - 130,380,s_oSpriteLibrary.getSprite("but_yes"),c);
        d.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        this.disableButtons();
        m.visible = !0;
        c.scale = 0;
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(c).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            k.enableButtons()
        })
    }
    ;
    this.unload = function() {
        e.unload();
        d.unload();
        b.off("click", a);
        s_oStage.removeChild(m)
    }
    ;
    this.disableButtons = function() {
        d.disable();
        e.disable()
    }
    ;
    this.enableButtons = function() {
        e.enable();
        d.enable()
    }
    ;
    this.hide = function() {
        var f = this;
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(c).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            f.unload()
        })
    }
    ;
    this._onRecharge = function() {
        k.hide();
        $(s_oMain).trigger("recharge")
    }
    ;
    this._init()
}
function CSuspanceEffect(a) {
    var b, c, d;
    this._init = function() {
        d = new createjs.Container;
        d.visible = !1;
        a.addChild(d);
        for (var e = [], g = 0; 37 > g; g++)
            e.push(s_oSpriteLibrary.getSprite("thunder_avatar_" + g));
        e = new createjs.SpriteSheet({
            images: e,
            framerate: 40,
            frames: {
                width: 637,
                height: 1080,
                regX: 0
            },
            animations: {
                start: 0,
                anim: [0, 21],
                anim_1: [15, 21]
            }
        });
        b = createSprite(e, "start", 0, 0, 637, 1080);
        b.scale = .7;
        d.addChild(b);
        c = createSprite(e, "start", 0, 0, 637, 1080);
        c.x = SYMBOL_WIDTH - 446;
        c.scale = .7;
        d.addChild(c)
    }
    ;
    this.show = function(e, g) {
        d.visible = !0;
        d.alpha = 0;
        d.x = e;
        d.y = g;
        b.gotoAndPlay("anim");
        c.gotoAndPlay("anim_1");
        createjs.Tween.get(d).to({
            alpha: 1
        }, 500, createjs.Ease.cubicOut);
        playSound("suspance", 1, !0)
    }
    ;
    this.hide = function() {
        d.visible = !1;
        b.gotoAndStop("start");
        c.gotoAndStop("start");
        stopSound("suspance")
    }
    ;
    this._init()
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
            } catch (e) {
                var d = window.location.ancestorOrigins;
                c = d[d.length - 1]
            }
        } catch (e) {
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
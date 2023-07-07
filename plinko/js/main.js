/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }
    function e(a, d) {
        var c = -1
          , b = a ? a.length : 0;
        if ("number" == typeof b && -1 < b && b <= q)
            for (; ++c < b; )
                d(a[c], c, a);
        else
            f(a, d)
    }
    function b(d) {
        d = String(d).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(d) ? d : a(d)
    }
    function f(a, d) {
        for (var c in a)
            r.call(a, c) && d(a[c], c, a)
    }
    function h(d) {
        return null == d ? a(d) : w.call(d).slice(8, -1)
    }
    function k(a, d) {
        var c = null != a ? typeof a[d] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) && ("object" == c ? !!a[d] : !0)
    }
    function g(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }
    function d(a, d) {
        var c = null;
        e(a, function(b, g) {
            c = d(c, b, g, a)
        });
        return c
    }
    function p(a) {
        function c(c) {
            return d(c, function(d, c) {
                var p = c.pattern || g(c);
                !d && (d = RegExp("\\b" + p + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + p + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + p + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((d = String(c.label && !RegExp(p, "i").test(c.label) ? c.label : d).split("/"))[1] && !/[\d.]+/.test(d[0]) && (d[0] += " " + d[1]),
                c = c.label || c,
                d = b(d[0].replace(RegExp(p, "i"), c).replace(RegExp("; *(?:" + c + "[_-])?", "i"), " ").replace(RegExp("(" + c + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return d
            })
        }
        function e(c) {
            return d(c, function(d, c) {
                return d || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var m = n
          , q = a && "object" == typeof a && "String" != h(a);
        q && (m = a,
        a = null);
        var t = m.navigator || {}
          , r = t.userAgent || "";
        a || (a = r);
        var F = q ? !!t.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(w.toString())
          , z = q ? "Object" : "ScriptBridgingProxyObject"
          , P = q ? "Object" : "Environment"
          , J = q && m.java ? "JavaPackage" : h(m.java)
          , T = q ? "Object" : "RuntimeObject";
        P = (J = /\bJava/.test(J) && m.java) && h(m.environment) == P;
        var U = J ? "a" : "\u03b1", V = J ? "b" : "\u03b2", Q = m.document || {}, H = m.operamini || m.opera, K = x.test(K = q && H ? H["[[Class]]"] : h(H)) ? K : H = null, l, L = a;
        q = [];
        var M = null
          , I = a == r;
        r = I && H && "function" == typeof H.version && H.version();
        var A = function(c) {
            return d(c, function(c, d) {
                return c || RegExp("\\b" + (d.pattern || g(d)) + "\\b", "i").exec(a) && (d.label || d)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , u = function(c) {
            return d(c, function(c, d) {
                return c || RegExp("\\b" + (d.pattern || g(d)) + "\\b", "i").exec(a) && (d.label || d)
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
          , B = c([{
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
          , E = function(c) {
            return d(c, function(d, c, b) {
                return d || (c[B] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(B)] || RegExp("\\b" + g(b) + "(?:\\b|\\w*\\d)", "i").exec(a)) && b
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
          , v = function(c) {
            return d(c, function(c, d) {
                var p = d.pattern || g(d);
                if (!c && (c = RegExp("\\b" + p + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                    var f = c
                      , e = d.label || d
                      , h = {
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
                    p && e && /^Win/i.test(f) && !/^Windows Phone /i.test(f) && (h = h[/[\d.]+$/.exec(f)]) && (f = "Windows " + h);
                    f = String(f);
                    p && e && (f = f.replace(RegExp(p, "i"), e));
                    c = f = b(f.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return c
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        A && (A = [A]);
        E && !B && (B = c([E]));
        if (l = /\bGoogle TV\b/.exec(B))
            B = l[0];
        /\bSimulator\b/i.test(a) && (B = (B ? B + " " : "") + "Simulator");
        "Opera Mini" == u && /\bOPiOS\b/.test(a) && q.push("running in Turbo/Uncompressed mode");
        "IE" == u && /\blike iPhone OS\b/.test(a) ? (l = p(a.replace(/like iPhone OS/, "")),
        E = l.manufacturer,
        B = l.product) : /^iP/.test(B) ? (u || (u = "Safari"),
        v = "iOS" + ((l = / OS ([\d_]+)/i.exec(a)) ? " " + l[1].replace(/_/g, ".") : "")) : "Konqueror" != u || /buntu/i.test(v) ? E && "Google" != E && (/Chrome/.test(u) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(B)) || /\bAndroid\b/.test(v) && /^Chrome/.test(u) && /\bVersion\//i.test(a) ? (u = "Android Browser",
        v = /\bAndroid\b/.test(v) ? v : "Android") : "Silk" == u ? (/\bMobi/i.test(a) || (v = "Android",
        q.unshift("desktop mode")),
        /Accelerated *= *true/i.test(a) && q.unshift("accelerated")) : "PaleMoon" == u && (l = /\bFirefox\/([\d.]+)\b/.exec(a)) ? q.push("identifying as Firefox " + l[1]) : "Firefox" == u && (l = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (v || (v = "Firefox OS"),
        B || (B = l[1])) : !u || (l = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(u)) ? (u && !B && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(l + "/") + 8)) && (u = null),
        (l = B || E || v) && (B || E || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(v)) && (u = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(v) ? v : l) + " Browser")) : "Electron" == u && (l = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && q.push("Chromium " + l) : v = "Kubuntu";
        r || (r = e(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", g(u), "(?:Firefox|Minefield|NetFront)"]));
        if (l = "iCab" == A && 3 < parseFloat(r) && "WebKit" || /\bOpera\b/.test(u) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(A) && "WebKit" || !A && /\bMSIE\b/i.test(a) && ("Mac OS" == v ? "Tasman" : "Trident") || "WebKit" == A && /\bPlayStation\b(?! Vita\b)/i.test(u) && "NetFront")
            A = [l];
        "IE" == u && (l = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (u += " Mobile",
        v = "Windows Phone " + (/\+$/.test(l) ? l : l + ".x"),
        q.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (u = "IE Mobile",
        v = "Windows Phone 8.x",
        q.unshift("desktop mode"),
        r || (r = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != u && "Trident" == A && (l = /\brv:([\d.]+)/.exec(a)) && (u && q.push("identifying as " + u + (r ? " " + r : "")),
        u = "IE",
        r = l[1]);
        if (I) {
            if (k(m, "global"))
                if (J && (l = J.lang.System,
                L = l.getProperty("os.arch"),
                v = v || l.getProperty("os.name") + " " + l.getProperty("os.version")),
                P) {
                    try {
                        r = m.require("ringo/engine").version.join("."),
                        u = "RingoJS"
                    } catch (S) {
                        (l = m.system) && l.global.system == m.system && (u = "Narwhal",
                        v || (v = l[0].os || null))
                    }
                    u || (u = "Rhino")
                } else
                    "object" == typeof m.process && !m.process.browser && (l = m.process) && ("object" == typeof l.versions && ("string" == typeof l.versions.electron ? (q.push("Node " + l.versions.node),
                    u = "Electron",
                    r = l.versions.electron) : "string" == typeof l.versions.nw && (q.push("Chromium " + r, "Node " + l.versions.node),
                    u = "NW.js",
                    r = l.versions.nw)),
                    u || (u = "Node.js",
                    L = l.arch,
                    v = l.platform,
                    r = (r = /[\d.]+/.exec(l.version)) ? r[0] : null));
            else
                h(l = m.runtime) == z ? (u = "Adobe AIR",
                v = l.flash.system.Capabilities.os) : h(l = m.phantom) == T ? (u = "PhantomJS",
                r = (l = l.version || null) && l.major + "." + l.minor + "." + l.patch) : "number" == typeof Q.documentMode && (l = /\bTrident\/(\d+)/i.exec(a)) ? (r = [r, Q.documentMode],
                (l = +l[1] + 4) != r[1] && (q.push("IE " + r[1] + " mode"),
                A && (A[1] = ""),
                r[1] = l),
                r = "IE" == u ? String(r[1].toFixed(1)) : r[0]) : "number" == typeof Q.documentMode && /^(?:Chrome|Firefox)\b/.test(u) && (q.push("masking as " + u + " " + r),
                u = "IE",
                r = "11.0",
                A = ["Trident"],
                v = "Windows");
            v = v && b(v)
        }
        r && (l = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(r) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (I && t.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (M = /b/i.test(l) ? "beta" : "alpha",
        r = r.replace(RegExp(l + "\\+?$"), "") + ("beta" == M ? V : U) + (/\d+\+?/.exec(l) || ""));
        if ("Fennec" == u || "Firefox" == u && /\b(?:Android|Firefox OS)\b/.test(v))
            u = "Firefox Mobile";
        else if ("Maxthon" == u && r)
            r = r.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(B))
            "Xbox 360" == B && (v = null),
            "Xbox 360" == B && /\bIEMobile\b/.test(a) && q.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(u) && (!u || B || /Browser|Mobi/.test(u)) || "Windows CE" != v && !/Mobi/i.test(a))
            if ("IE" == u && I)
                try {
                    null === m.external && q.unshift("platform preview")
                } catch (S) {
                    q.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(B) || /\bBB10\b/.test(a)) && (l = (RegExp(B.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || r) ? (l = [l, /BB10/.test(a)],
                v = (l[1] ? (B = null,
                E = "BlackBerry") : "Device Software") + " " + l[0],
                r = null) : this != f && "Wii" != B && (I && H || /Opera/.test(u) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == u && /\bOS X (?:\d+\.){2,}/.test(v) || "IE" == u && (v && !/^Win/.test(v) && 5.5 < r || /\bWindows XP\b/.test(v) && 8 < r || 8 == r && !/\bTrident\b/.test(a))) && !x.test(l = p.call(f, a.replace(x, "") + ";")) && l.name && (l = "ing as " + l.name + ((l = l.version) ? " " + l : ""),
                x.test(u) ? (/\bIE\b/.test(l) && "Mac OS" == v && (v = null),
                l = "identify" + l) : (l = "mask" + l,
                u = K ? b(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(l) && (v = null),
                I || (r = null)),
                A = ["Presto"],
                q.push(l));
        else
            u += " Mobile";
        if (l = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            l = [parseFloat(l.replace(/\.(\d)$/, ".0$1")), l];
            if ("Safari" == u && "+" == l[1].slice(-1))
                u = "WebKit Nightly",
                M = "alpha",
                r = l[1].slice(0, -1);
            else if (r == l[1] || r == (l[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1]))
                r = null;
            l[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == l[0] && 537.36 == l[2] && 28 <= parseFloat(l[1]) && "WebKit" == A && (A = ["Blink"]);
            I && (F || l[1]) ? (A && (A[1] = "like Chrome"),
            l = l[1] || (l = l[0],
            530 > l ? 1 : 532 > l ? 2 : 532.05 > l ? 3 : 533 > l ? 4 : 534.03 > l ? 5 : 534.07 > l ? 6 : 534.1 > l ? 7 : 534.13 > l ? 8 : 534.16 > l ? 9 : 534.24 > l ? 10 : 534.3 > l ? 11 : 535.01 > l ? 12 : 535.02 > l ? "13+" : 535.07 > l ? 15 : 535.11 > l ? 16 : 535.19 > l ? 17 : 536.05 > l ? 18 : 536.1 > l ? 19 : 537.01 > l ? 20 : 537.11 > l ? "21+" : 537.13 > l ? 23 : 537.18 > l ? 24 : 537.24 > l ? 25 : 537.36 > l ? 26 : "Blink" != A ? "27" : "28")) : (A && (A[1] = "like Safari"),
            l = (l = l[0],
            400 > l ? 1 : 500 > l ? 2 : 526 > l ? 3 : 533 > l ? 4 : 534 > l ? "4+" : 535 > l ? 5 : 537 > l ? 6 : 538 > l ? 7 : 601 > l ? 8 : "8"));
            A && (A[1] += " " + (l += "number" == typeof l ? ".x" : /[.+]/.test(l) ? "" : "+"));
            "Safari" == u && (!r || 45 < parseInt(r)) && (r = l)
        }
        "Opera" == u && (l = /\bzbov|zvav$/.exec(v)) ? (u += " ",
        q.unshift("desktop mode"),
        "zvav" == l ? (u += "Mini",
        r = null) : u += "Mobile",
        v = v.replace(RegExp(" *" + l + "$"), "")) : "Safari" == u && /\bChrome\b/.exec(A && A[1]) && (q.unshift("desktop mode"),
        u = "Chrome Mobile",
        r = null,
        /\bOS X\b/.test(v) ? (E = "Apple",
        v = "iOS 4.3+") : v = null);
        r && 0 == r.indexOf(l = /[\d.]+$/.exec(v)) && -1 < a.indexOf("/" + l + "-") && (v = String(v.replace(l, "")).replace(/^ +| +$/g, ""));
        A && !/\b(?:Avant|Nook)\b/.test(u) && (/Browser|Lunascape|Maxthon/.test(u) || "Safari" != u && /^iOS/.test(v) && /\bSafari\b/.test(A[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(u) && A[1]) && (l = A[A.length - 1]) && q.push(l);
        q.length && (q = ["(" + q.join("; ") + ")"]);
        E && B && 0 > B.indexOf(E) && q.push("on " + E);
        B && q.push((/^on /.test(q[q.length - 1]) ? "" : "on ") + B);
        if (v) {
            var R = (l = / ([\d.+]+)$/.exec(v)) && "/" == v.charAt(v.length - l[0].length - 1);
            v = {
                architecture: 32,
                family: l && !R ? v.replace(l[0], "") : v,
                version: l ? l[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !R ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (l = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(L)) && !/\bi686\b/i.test(L) ? (v && (v.architecture = 64,
        v.family = v.family.replace(RegExp(" *" + l), "")),
        u && (/\bWOW64\b/i.test(a) || I && /\w(?:86|32)$/.test(t.cpuClass || t.platform) && !/\bWin64; x64\b/i.test(a)) && q.unshift("32-bit")) : v && /^OS X/.test(v.family) && "Chrome" == u && 39 <= parseFloat(r) && (v.architecture = 64);
        a || (a = null);
        m = {};
        m.description = a;
        m.layout = A && A[0];
        m.manufacturer = E;
        m.name = u;
        m.prerelease = M;
        m.product = B;
        m.ua = a;
        m.version = u && r;
        m.os = v || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        m.parse = p;
        m.toString = function() {
            return this.description || ""
        }
        ;
        m.version && q.unshift(r);
        m.name && q.unshift(u);
        v && u && (v != String(v).split(" ")[0] || v != u.split(" ")[0] && !B) && q.push(B ? "(" + v + ")" : "on " + v);
        q.length && (m.description = q.join(" "));
        return m
    }
    var c = {
        "function": !0,
        object: !0
    }
      , n = c[typeof window] && window || this
      , t = c[typeof exports] && exports;
    c = c[typeof module] && module && !module.nodeType && module;
    var m = t && c && "object" == typeof global && global;
    !m || m.global !== m && m.window !== m && m.self !== m || (n = m);
    var q = Math.pow(2, 53) - 1
      , x = /\bOpera/;
    m = Object.prototype;
    var r = m.hasOwnProperty
      , w = m.toString
      , z = p();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (n.platform = z,
    define(function() {
        return z
    })) : t && c ? f(z, function(a, c) {
        t[c] = a
    }) : n.platform = z
}
).call(this);
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , e = "undefined" !== typeof module && module.exports
      , b = function() {
        for (var b, g = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], d = 0, p = g.length, c = {}; d < p; d++)
            if ((b = g[d]) && b[1]in a) {
                for (d = 0; d < b.length; d++)
                    c[g[0][d]] = b[d];
                return c
            }
        return !1
    }()
      , f = {
        change: b.fullscreenchange,
        error: b.fullscreenerror
    }
      , h = {
        request: function(f) {
            return new Promise(function(g, d) {
                var p = function() {
                    this.off("change", p);
                    g()
                }
                .bind(this);
                this.on("change", p);
                f = f || a.documentElement;
                Promise.resolve(f[b.requestFullscreen]())["catch"](d)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(f, g) {
                if (this.isFullscreen) {
                    var d = function() {
                        this.off("change", d);
                        f()
                    }
                    .bind(this);
                    this.on("change", d);
                    Promise.resolve(a[b.exitFullscreen]())["catch"](g)
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
        on: function(b, g) {
            var d = f[b];
            d && a.addEventListener(d, g, !1)
        },
        off: function(b, g) {
            var d = f[b];
            d && a.removeEventListener(d, g, !1)
        },
        raw: b
    };
    b ? (Object.defineProperties(h, {
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
    e ? module.exports = h : window.screenfull = h) : e ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}
)();
!function() {
    function a(e) {
        var h = e;
        if (f[h])
            h = f[h];
        else {
            for (var g = h, d, p = [], c = 0; g; ) {
                if (null !== (d = b.text.exec(g)))
                    p.push(d[0]);
                else if (null !== (d = b.modulo.exec(g)))
                    p.push("%");
                else if (null !== (d = b.placeholder.exec(g))) {
                    if (d[2]) {
                        c |= 1;
                        var n = [], t = d[2], m;
                        if (null !== (m = b.key.exec(t)))
                            for (n.push(m[1]); "" !== (t = t.substring(m[0].length)); )
                                if (null !== (m = b.key_access.exec(t)))
                                    n.push(m[1]);
                                else if (null !== (m = b.index_access.exec(t)))
                                    n.push(m[1]);
                                else
                                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                        else
                            throw new SyntaxError("[sprintf] failed to parse named argument key");
                        d[2] = n
                    } else
                        c |= 2;
                    if (3 === c)
                        throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    p.push({
                        placeholder: d[0],
                        param_no: d[1],
                        keys: d[2],
                        sign: d[3],
                        pad_char: d[4],
                        align: d[5],
                        width: d[6],
                        precision: d[7],
                        type: d[8]
                    })
                } else
                    throw new SyntaxError("[sprintf] unexpected placeholder");
                g = g.substring(d[0].length)
            }
            h = f[h] = p
        }
        g = arguments;
        d = 1;
        p = h.length;
        n = "";
        var q, x;
        for (t = 0; t < p; t++)
            if ("string" === typeof h[t])
                n += h[t];
            else if ("object" === typeof h[t]) {
                m = h[t];
                if (m.keys)
                    for (c = g[d],
                    q = 0; q < m.keys.length; q++) {
                        if (void 0 == c)
                            throw Error(a('[sprintf] Cannot access property "%s" of undefined value "%s"', m.keys[q], m.keys[q - 1]));
                        c = c[m.keys[q]]
                    }
                else
                    c = m.param_no ? g[m.param_no] : g[d++];
                b.not_type.test(m.type) && b.not_primitive.test(m.type) && c instanceof Function && (c = c());
                if (b.numeric_arg.test(m.type) && "number" !== typeof c && isNaN(c))
                    throw new TypeError(a("[sprintf] expecting number but found %T", c));
                b.number.test(m.type) && (x = 0 <= c);
                switch (m.type) {
                case "b":
                    c = parseInt(c, 10).toString(2);
                    break;
                case "c":
                    c = String.fromCharCode(parseInt(c, 10));
                    break;
                case "d":
                case "i":
                    c = parseInt(c, 10);
                    break;
                case "j":
                    c = JSON.stringify(c, null, m.width ? parseInt(m.width) : 0);
                    break;
                case "e":
                    c = m.precision ? parseFloat(c).toExponential(m.precision) : parseFloat(c).toExponential();
                    break;
                case "f":
                    c = m.precision ? parseFloat(c).toFixed(m.precision) : parseFloat(c);
                    break;
                case "g":
                    c = m.precision ? String(Number(c.toPrecision(m.precision))) : parseFloat(c);
                    break;
                case "o":
                    c = (parseInt(c, 10) >>> 0).toString(8);
                    break;
                case "s":
                    c = String(c);
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "t":
                    c = String(!!c);
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "T":
                    c = Object.prototype.toString.call(c).slice(8, -1).toLowerCase();
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "u":
                    c = parseInt(c, 10) >>> 0;
                    break;
                case "v":
                    c = c.valueOf();
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "x":
                    c = (parseInt(c, 10) >>> 0).toString(16);
                    break;
                case "X":
                    c = (parseInt(c, 10) >>> 0).toString(16).toUpperCase()
                }
                if (b.json.test(m.type))
                    n += c;
                else {
                    if (!b.number.test(m.type) || x && !m.sign)
                        var r = "";
                    else
                        r = x ? "+" : "-",
                        c = c.toString().replace(b.sign, "");
                    q = m.pad_char ? "0" === m.pad_char ? "0" : m.pad_char.charAt(1) : " ";
                    var w = m.width - (r + c).length;
                    w = m.width ? 0 < w ? q.repeat(w) : "" : "";
                    n += m.align ? r + c + w : "0" === q ? r + w + c : w + r + c
                }
            }
        return n
    }
    function e(b, f) {
        return a.apply(null, [b].concat(f || []))
    }
    var b = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }
      , f = Object.create(null);
    "undefined" !== typeof exports && (exports.sprintf = a,
    exports.vsprintf = e);
    "undefined" !== typeof window && (window.sprintf = a,
    window.vsprintf = e,
    "function" === typeof define && define.amd && define(function() {
        return {
            sprintf: a,
            vsprintf: e
        }
    }))
}();
var s_iScaleFactor = 1, s_iOffsetX, s_iOffsetY, s_bIsIphone = !1;
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
      , f = b.documentElement;
    if (void 0 === window["inner" + a])
        a = f["client" + a];
    else if (window["inner" + a] != f["client" + a]) {
        var h = b.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var k = b.createElement("div");
        k.id = "vpw-test-d";
        k.style.cssText = "position:absolute;top:-1000px";
        k.innerHTML = "<style>@media(" + e + ":" + f["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + e + ":7px!important}}</style>";
        h.appendChild(k);
        f.insertBefore(h, b.head);
        a = 7 == k["offset" + a] ? f["client" + a] : window["inner" + a];
        f.removeChild(h)
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
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length; )
        if (navigator.platform === a.pop())
            return !0;
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
        var a = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var e = getSize("Width");
        _checkOrientation(e, a);
        var b = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH)
          , f = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var h = a - b;
            b += h;
            f += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else
            f < e && (h = e - f,
            f += h,
            b += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - b / 2;
        var k = e / 2 - f / 2
          , g = CANVAS_WIDTH / f;
        if (k * g < -EDGEBOARD_X || h * g < -EDGEBOARD_Y)
            b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            f = Math.round(CANVAS_WIDTH * b),
            b = Math.round(CANVAS_HEIGHT * b),
            h = (a - b) / 2,
            k = (e - f) / 2,
            g = CANVAS_WIDTH / f;
        s_iOffsetX = -1 * k * g;
        s_iOffsetY = -1 * h * g;
        0 <= h && (s_iOffsetY = 0);
        0 <= k && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * f,
        s_oStage.canvas.height = 2 * b,
        canvas.style.width = f + "px",
        canvas.style.height = b + "px",
        s_iScaleFactor = 2 * Math.min(f / CANVAS_WIDTH, b / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", f + "px"),
        $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = f,
        s_oStage.canvas.height = b,
        s_iScaleFactor = Math.min(f / CANVAS_WIDTH, b / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > h || (h = (a - b) / 2);
        $("#canvas").css("top", h + "px");
        $("#canvas").css("left", k + "px");
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
function fadeSound(a, e, b, f) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].fade(e, b, f)
}
function soundPlaying(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
        return s_aSounds[a].playing()
}
function createBitmap(a, e, b) {
    var f = new createjs.Bitmap(a)
      , h = new createjs.Shape;
    e && b ? h.graphics.beginFill("#fff").drawRect(0, 0, e, b) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    f.hitArea = h;
    return f
}
function createSprite(a, e, b, f, h, k) {
    a = null !== e ? new createjs.Sprite(a,e) : new createjs.Sprite(a);
    e = new createjs.Shape;
    e.graphics.beginFill("#000000").drawRect(-b, -f, h, k);
    a.hitArea = e;
    return a
}
function pad(a, e, b) {
    a += "";
    return a.length >= e ? a : Array(e - a.length + 1).join(b || "0") + a
}
function randomFloatBetween(a, e, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(b))
}
function rotateVector2D(a, e) {
    var b = e.getX() * Math.cos(a) + e.getY() * Math.sin(a)
      , f = e.getX() * -Math.sin(a) + e.getY() * Math.cos(a);
    e.set(b, f)
}
function tweenVectorsOnX(a, e, b) {
    return a + b * (e - a)
}
function shuffle(a) {
    for (var e = a.length, b, f; 0 !== e; )
        f = Math.floor(Math.random() * e),
        --e,
        b = a[e],
        a[e] = a[f],
        a[f] = b;
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
function easeLinear(a, e, b, f) {
    return b * a / f + e
}
function easeInQuad(a, e, b, f) {
    return b * (a /= f) * a + e
}
function easeInSine(a, e, b, f) {
    return -b * Math.cos(a / f * (Math.PI / 2)) + b + e
}
function easeInCubic(a, e, b, f) {
    return b * (a /= f) * a * a + e
}
function getTrajectoryPoint(a, e) {
    var b = new createjs.Point
      , f = (1 - a) * (1 - a)
      , h = a * a;
    b.x = f * e.start.x + 2 * (1 - a) * a * e.traj.x + h * e.end.x;
    b.y = f * e.start.y + 2 * (1 - a) * a * e.traj.y + h * e.end.y;
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
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, e) {
    var b = getBounds(a, .9);
    var f = getBounds(e, .98);
    return calculateIntersection(b, f)
}
function calculateIntersection(a, e) {
    var b, f, h, k;
    var g = a.x + (b = a.width / 2);
    var d = a.y + (f = a.height / 2);
    var p = e.x + (h = e.width / 2);
    var c = e.y + (k = e.height / 2);
    g = Math.abs(g - p) - (b + h);
    d = Math.abs(d - c) - (f + k);
    return 0 > g && 0 > d ? (g = Math.min(Math.min(a.width, e.width), -g),
    d = Math.min(Math.min(a.height, e.height), -d),
    {
        x: Math.max(a.x, e.x),
        y: Math.max(a.y, e.y),
        width: g,
        height: d,
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
        var f = a.children, h = f.length, k;
        for (k = 0; k < h; k++) {
            var g = getBounds(f[k], 1);
            g.x < b.x && (b.x = g.x);
            g.y < b.y && (b.y = g.y);
            g.x + g.width > b.x2 && (b.x2 = g.x + g.width);
            g.y + g.height > b.y2 && (b.y2 = g.y + g.height)
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
            h = a.sourceRect || a.image;
            k = h.width * e;
            var d = h.height * e
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                h = a.spriteSheet.getFrame(a.currentFrame);
                k = h.rect.width;
                d = h.rect.height;
                f = h.regX;
                var p = h.regY
            } else
                b.x = a.x || 0,
                b.y = a.y || 0;
        else
            b.x = a.x || 0,
            b.y = a.y || 0;
        f = f || 0;
        k = k || 0;
        p = p || 0;
        d = d || 0;
        b.regX = f;
        b.regY = p;
        h = a.localToGlobal(0 - f, 0 - p);
        g = a.localToGlobal(k - f, d - p);
        k = a.localToGlobal(k - f, 0 - p);
        f = a.localToGlobal(0 - f, d - p);
        b.x = Math.min(Math.min(Math.min(h.x, g.x), k.x), f.x);
        b.y = Math.min(Math.min(Math.min(h.y, g.y), k.y), f.y);
        b.width = Math.max(Math.max(Math.max(h.x, g.x), k.x), f.x) - b.x;
        b.height = Math.max(Math.max(Math.max(h.y, g.y), k.y), f.y) - b.y
    }
    return b
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var e = a.length, b, f; 0 < e; )
        f = Math.floor(Math.random() * e),
        e--,
        b = a[e],
        a[e] = a[f],
        a[f] = b;
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
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[e] ? "hidden" : "visible",
        "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
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
        var f = e[b].split("=");
        if (f[0] == a)
            return f[1]
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
    var a = {}, e, b, f, h, k, g;
    this.init = function(a, p, c) {
        e = {};
        f = b = 0;
        h = a;
        k = p;
        g = c
    }
    ;
    this.addSprite = function(d, g) {
        if (!a.hasOwnProperty(d)) {
            var c = new Image;
            a[d] = e[d] = {
                szPath: g,
                oSprite: c,
                bLoaded: !1
            };
            b++
        }
    }
    ;
    this.getSprite = function(d) {
        return a.hasOwnProperty(d) ? a[d].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        b = 0;
        k.call(g)
    }
    ;
    this._onSpriteLoaded = function() {
        h.call(g);
        ++f === b && this._onSpritesLoaded()
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
                var c = a.currentTarget;
                setTimeout(function() {
                    e[c.szKey].oSprite.src = e[c.szKey].szPath
                }, 500)
            }
            ,
            e[a].oSprite.src = e[a].szPath
    }
    ;
    this.setLoaded = function(d) {
        a[d].bLoaded = !0
    }
    ;
    this.isLoaded = function(d) {
        return a[d].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 1280, CANVAS_HEIGHT = 1920, EDGEBOARD_X = 150, EDGEBOARD_Y = 200, GAME_NAME = "plinko", PRIMARY_FONT = "impact", FPS = 30, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, BOARD_ROW = 13, BOARD_COL = 7, BALL_RADIUS, NUM_INSERT_TUBE, CELL_SIZE = 140, CELL_PIVOT_FROM_CENTER = 90, BALL_FALL_MAX_ANGLE = .5, BALL_FALL_MAX_ROTATION = 80, BALL_FALL_ROTATION_ATTENUATION_FACTOR = 20, BALL_FALL_SPEED_INCREASE = .75, BALL_FALL_MAX_SPEED_LIMIT = 500, BASKET_LIT_ITERATION = 10, SOUNDTRACK_VOLUME_IN_GAME = .3, PRIZE, PRIZE_PROBABILITY, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, AD_SHOW_COUNTER, TEXT_PRELOADER_CONTINUE = "START", TEXT_GAMEOVER = "I'M SORRY, NO MORE CREDITS TO PLAY.\n RECHARGE?", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_PLUS = "+", TEXT_MIN = "-", TEXT_CURRENCY = "$%s", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better";
function CPreloader() {
    var a, e, b, f, h, k, g, d, p, c;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        c = new createjs.Container;
        s_oStage.addChild(c)
    }
    ;
    this.unload = function() {
        c.removeAllChildren();
        p.unload()
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
        c.addChild(n);
        n = s_oSpriteLibrary.getSprite("200x200");
        g = createBitmap(n);
        g.regX = .5 * n.width;
        g.regY = .5 * n.height;
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 180;
        c.addChild(g);
        d = new createjs.Shape;
        d.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(g.x - 100, g.y - 100, 200, 200, 10);
        c.addChild(d);
        g.mask = d;
        n = s_oSpriteLibrary.getSprite("progress_bar");
        f = createBitmap(n);
        f.x = CANVAS_WIDTH / 2 - n.width / 2;
        f.y = CANVAS_HEIGHT / 2 + 50;
        c.addChild(f);
        a = n.width;
        e = n.height;
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, 1, e);
        c.addChild(h);
        f.mask = h;
        b = new createjs.Text("","30px " + PRIMARY_FONT,"#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        c.addChild(b);
        n = s_oSpriteLibrary.getSprite("but_start");
        p = CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, n, TEXT_PRELOADER_CONTINUE, "Arial", "#000", 50, !0, c);
        p.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        p.setVisible(!1);
        p.setTextHeight(60);
        p.hideShadow();
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(k);
            c.removeChild(k)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(c) {
        b.text = c + "%";
        100 === c && (b.visible = !1,
        f.visible = !1,
        s_oMain._onRemovePreloader());
        h.graphics.clear();
        c = Math.floor(c * a / 100);
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, c, e)
    }
    ;
    this._init()
}
function CMain(a) {
    var e, b = 0, f = 0, h = STATE_LOADING, k, g;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !0;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(FPS),
        $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        k = new CPreloader
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
        k.refreshLoader(Math.floor(b / f * 100))
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
            filename: "ball_collision",
            loop: !1,
            volume: 1,
            ingamename: "ball_collision"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_in_basket",
            loop: !1,
            volume: 1,
            ingamename: "ball_in_basket"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ball_in_basket_negative",
            loop: !1,
            volume: 1,
            ingamename: "ball_in_basket_negative"
        });
        f += s_aSoundsInfo.length;
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
                    for (var d = 0; d < s_aSoundsInfo.length; d++)
                        if (a === s_aSounds[s_aSoundsInfo[d].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[d], !0);
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
        s_oSpriteLibrary.addSprite("logo_game", "./sprites/logo_game.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("credits_panel", "./sprites/credits_panel.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("side_right", "./sprites/side_right.png");
        s_oSpriteLibrary.addSprite("side_left", "./sprites/side_left.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
        s_oSpriteLibrary.addSprite("bet_panel", "./sprites/bet_panel.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("stake", "./sprites/stake.png");
        s_oSpriteLibrary.addSprite("ball_generator", "./sprites/ball_generator.png");
        s_oSpriteLibrary.addSprite("holes_occluder", "./sprites/holes_occluder.png");
        s_oSpriteLibrary.addSprite("hole_board_occluder", "./sprites/hole_board_occluder.png");
        s_oSpriteLibrary.addSprite("basket_display", "./sprites/basket_display.jpg");
        s_oSpriteLibrary.addSprite("hand_anim", "./sprites/hand_anim.png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        b++;
        k.refreshLoader(Math.floor(b / f * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this._onRemovePreloader = function() {
        k.unload();
        s_oSoundtrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        h = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        g = new CGame(d);
        h = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        h = STATE_HELP
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
    this._update = function(a) {
        if (!1 !== e) {
            var c = (new Date).getTime();
            s_iTimeElaps = c - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = c;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            h === STATE_GAME && g.update();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    var d = a;
    ENABLE_CREDITS = a.show_credits;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_bFullscreen = !1, s_aSounds = [], s_aSoundsInfo = [], s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundtrack, s_oCanvas;
function CTextButton(a, e, b, f, h, k, g, d, p) {
    var c, n, t, m, q, x, r, w, z, F;
    this._init = function(a, d, b, g, f, p, e, h, m) {
        c = !1;
        q = [];
        x = [];
        F = createBitmap(b);
        var n = Math.ceil(e / 20);
        z = new createjs.Text(g,"bold " + e + "px " + f,"#000000");
        z.textAlign = "center";
        z.textBaseline = "alphabetic";
        var k = z.getBounds();
        z.x = b.width / 2 + n;
        z.y = Math.floor(b.height / 2) + k.height / 3 + n - 7;
        w = new createjs.Text(g,"bold " + e + "px " + f,p);
        w.textAlign = "center";
        w.textBaseline = "alphabetic";
        k = w.getBounds();
        w.x = b.width / 2;
        w.y = Math.floor(b.height / 2) + k.height / 3 - 7;
        r = new createjs.Container;
        r.x = a;
        r.y = d;
        r.regX = b.width / 2;
        r.regY = b.height / 2;
        r.cursor = "pointer";
        h || (a = new createjs.SpriteSheet({
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
        F = createSprite(a, "state_false", b.width / 2 / 2, b.height / 2, b.width / 2, b.height),
        z.x = n,
        z.y = n + 17,
        w.x = 0,
        w.y = 17,
        r.regX = 0,
        r.regY = 0);
        r.addChild(F, z, w);
        m.addChild(r);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? r.off("mousedown", n) : (r.off("mousedown", n),
        r.off("mouseover", m));
        r.off("pressup", t);
        p.removeChild(r)
    }
    ;
    this.setVisible = function(a) {
        r.visible = a
    }
    ;
    this.setClickable = function(a) {
        c = !a;
        a || (r.cursor = "arrow")
    }
    ;
    this._initListener = function() {
        s_bMobile ? n = r.on("mousedown", this.buttonDown) : (n = r.on("mousedown", this.buttonDown),
        m = r.on("mouseover", this.buttonOver));
        t = r.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, d) {
        q[a] = c;
        x[a] = d
    }
    ;
    this.buttonRelease = function() {
        c || (r.scaleX = 1,
        r.scaleY = 1,
        q[ON_MOUSE_UP] && q[ON_MOUSE_UP].call(x[ON_MOUSE_UP]))
    }
    ;
    this.buttonDown = function() {
        c || (r.scaleX = .9,
        r.scaleY = .9,
        playSound("click", 1, !1),
        q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(x[ON_MOUSE_DOWN]))
    }
    ;
    this.buttonOver = function(a) {
        s_bMobile || c || (a.target.cursor = "pointer")
    }
    ;
    this.enable = function() {
        c = !1;
        d || F.gotoAndStop("state_true")
    }
    ;
    this.disable = function() {
        c = !0;
        d || F.gotoAndStop("state_false")
    }
    ;
    this.fadeOut = function() {
        this.setClickable(!1);
        createjs.Tween.get(r).to({
            alpha: 0
        }, 500)
    }
    ;
    this.fadeIn = function() {
        this.setClickable(!0);
        createjs.Tween.get(r).to({
            alpha: 1
        }, 500)
    }
    ;
    this.hideShadow = function() {
        z.visible = !1
    }
    ;
    this.setTextPosition = function(a, c) {
        var d = Math.ceil(g / 20);
        z.x = a + d;
        z.y = c + d;
        w.x = a;
        w.y = c
    }
    ;
    this.setTextHeight = function(a) {
        z.y = a + Math.ceil(g / 20);
        w.y = a
    }
    ;
    this.setPosition = function(a, c) {
        r.x = a;
        r.y = c
    }
    ;
    this.setX = function(a) {
        r.x = a
    }
    ;
    this.setY = function(a) {
        r.y = a
    }
    ;
    this.getButtonImage = function() {
        return r
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
    this._init(a, e, b, f, h, k, g, d, p);
    return this
}
function CToggle(a, e, b, f, h) {
    var k, g, d, p, c, n, t;
    this._init = function(a, d, b, g, f) {
        c = [];
        n = [];
        var p = new createjs.SpriteSheet({
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
        k = g;
        t = createSprite(p, "state_" + k, b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        t.x = a;
        t.y = d;
        t.stop();
        f.addChild(t);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? t.off("mousedown", g) : (t.off("mousedown", g),
        t.off("mouseover", p));
        t.off("pressup", d);
        t.parent.removeChild(t)
    }
    ;
    this._initListener = function() {
        s_bMobile ? g = t.on("mousedown", this.buttonDown) : (g = t.on("mousedown", this.buttonDown),
        p = t.on("mouseover", this.buttonOver));
        d = t.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, d, b) {
        c[a] = d;
        n[a] = b
    }
    ;
    this.setActive = function(a) {
        k = a;
        t.gotoAndStop("state_" + k)
    }
    ;
    this.buttonRelease = function() {
        t.scaleX = 1;
        t.scaleY = 1;
        playSound("click", 1, !1);
        k = !k;
        t.gotoAndStop("state_" + k);
        c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(n[ON_MOUSE_UP], k)
    }
    ;
    this.buttonDown = function() {
        t.scaleX = .9;
        t.scaleY = .9;
        c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN])
    }
    ;
    this.buttonOver = function(a) {
        s_bMobile || (a.target.cursor = "pointer")
    }
    ;
    this.setPosition = function(a, c) {
        t.x = a;
        t.y = c
    }
    ;
    this.getButtonImage = function() {
        return t
    }
    ;
    this._init(a, e, b, f, h)
}
function CGfxButton(a, e, b, f) {
    var h, k, g, d, p = [], c, n, t, m, q;
    this._init = function(a, b, f, p) {
        h = !1;
        k = 1;
        g = [];
        d = [];
        c = new createjs.Container;
        c.x = a;
        c.y = b;
        c.scaleX = c.scaleY = k;
        p.addChild(c);
        n = createBitmap(f);
        n.regX = f.width / 2;
        n.regY = f.height / 2;
        c.addChild(n);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? c.off("mousedown", t) : (c.off("mousedown", t),
        c.off("mouseover", q));
        c.off("pressup", m);
        c.parent.removeChild(c)
    }
    ;
    this.setVisible = function(a) {
        c.visible = a
    }
    ;
    this.setClickable = function(a) {
        h = !a
    }
    ;
    this._initListener = function() {
        s_bMobile ? t = c.on("mousedown", this.buttonDown) : (t = c.on("mousedown", this.buttonDown),
        q = c.on("mouseover", this.buttonOver));
        m = c.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        g[a] = c;
        d[a] = b
    }
    ;
    this.addEventListenerWithParams = function(a, c, b, f) {
        g[a] = c;
        d[a] = b;
        p = f
    }
    ;
    this.buttonRelease = function() {
        h || (c.scaleX = k,
        c.scaleY = k,
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(d[ON_MOUSE_UP], p))
    }
    ;
    this.buttonDown = function() {
        h || (c.scaleX = .9 * k,
        c.scaleY = .9 * k,
        playSound("click", 1, !1),
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], p))
    }
    ;
    this.buttonOver = function(a) {
        s_bMobile || h || (a.target.cursor = "pointer")
    }
    ;
    this.addText = function(a) {
        a = new createjs.Text(a," 50px " + PRIMARY_FONT,"#ffffff");
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.lineWidth = 200;
        c.addChild(a)
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(c).to({
            scaleX: 1.1 * k,
            scaleY: 1.1 * k
        }, 850, createjs.Ease.quadOut).to({
            scaleX: k,
            scaleY: k
        }, 650, createjs.Ease.quadIn).call(function() {
            x.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(c).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            x.trebleAnimation()
        })
    }
    ;
    this.setPosition = function(a, d) {
        c.x = a;
        c.y = d
    }
    ;
    this.setX = function(a) {
        c.x = a
    }
    ;
    this.setY = function(a) {
        c.y = a
    }
    ;
    this.getButtonImage = function() {
        return c
    }
    ;
    this.getX = function() {
        return c.x
    }
    ;
    this.getY = function() {
        return c.y
    }
    ;
    this.getPos = function() {
        return {
            x: c.x,
            y: c.y
        }
    }
    ;
    var x = this;
    this._init(a, e, b, f);
    return this
}
function CMenu() {
    var a, e, b, f, h, k, g, d, p, c, n = null, t = null, m;
    this._init = function() {
        h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(h);
        var q = s_oSpriteLibrary.getSprite("logo_menu")
          , x = createBitmap(q);
        x.regX = q.width / 2;
        x.regY = q.height / 2;
        x.x = CANVAS_WIDTH / 2;
        x.y = 500;
        s_oStage.addChild(x);
        q = s_oSpriteLibrary.getSprite("but_play");
        k = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 540,q,s_oStage);
        k.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        k.pulseAnimation();
        q = s_oSpriteLibrary.getSprite("but_credits");
        x = {
            x: q.width / 2 + 10,
            y: q.height / 2 + 10
        };
        var r = {
            x: x.x + q.width + 10,
            y: q.height / 2 + 10
        };
        b = x.x;
        f = x.y;
        ENABLE_CREDITS && (p = new CGfxButton(b,f,q,s_oStage),
        p.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this));
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            q = s_oSpriteLibrary.getSprite("audio_icon"),
            a = CANVAS_WIDTH - q.width / 4 - 10,
            e = q.height / 2 + 10,
            d = new CToggle(a,e,q,s_bAudioActive,s_oStage),
            d.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        q = window.document;
        var w = q.documentElement;
        n = w.requestFullscreen || w.mozRequestFullScreen || w.webkitRequestFullScreen || w.msRequestFullscreen;
        t = q.exitFullscreen || q.mozCancelFullScreen || q.webkitExitFullscreen || q.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n && screenfull.isEnabled && (m = ENABLE_CREDITS ? r : x,
        q = s_oSpriteLibrary.getSprite("but_fullscreen"),
        c = new CToggle(m.x,m.y,q,s_bFullscreen,s_oStage),
        c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(g);
        createjs.Tween.get(g).to({
            alpha: 0
        }, 1E3).call(function() {
            g.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        k.unload();
        k = null;
        g.visible = !1;
        ENABLE_CREDITS && p.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            d.unload(),
            d = null;
        n && screenfull.isEnabled && c.unload();
        s_oStage.removeAllChildren();
        s_oMenu = h = null
    }
    ;
    this.refreshButtonPos = function(g, h) {
        ENABLE_CREDITS && p.setPosition(b + g, h + f);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || d.setPosition(a - g, h + e);
        n && screenfull.isEnabled && c.setPosition(m.x + g, m.y + h)
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
        n && screenfull.isEnabled && c.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? t.call(window.document) : n.call(window.document.documentElement);
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
    var e, b, f, h, k, g, d, p = null, c, n, t, m, q, x, r, w, z = null;
    this._init = function() {
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        b = 1;
        f = START_BET.toFixed(2) / 1;
        h = START_CREDIT.toFixed(2) / 1;
        k = BANK_CASH;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        a = s_oSpriteLibrary.getSprite("logo_game");
        var g = createBitmap(a);
        g.regX = a.width / 2;
        g.regY = a.height / 2;
        g.x = CANVAS_WIDTH / 2;
        g.y = 250;
        m = new createjs.Container;
        s_oStage.addChild(m);
        q = new createjs.Container;
        s_oStage.addChild(q);
        x = new createjs.Container;
        s_oStage.addChild(x);
        r = new createjs.Container;
        s_oStage.addChild(r);
        this._setBoard();
        NUM_INSERT_TUBE = w[0].length;
        a = s_oSpriteLibrary.getSprite("side_left");
        a = createBitmap(a);
        a.x = 100;
        r.addChild(a);
        a = s_oSpriteLibrary.getSprite("side_right");
        g = createBitmap(a);
        g.regX = a.width;
        g.x = CANVAS_WIDTH - 100;
        r.addChild(g);
        BALL_RADIUS = s_oSpriteLibrary.getSprite("ball").height / 2;
        c = new CBallGenerator(x);
        n = new CInsertTubeController(x);
        t = new CScoreBasketController(m);
        this._initProbability();
        d = new CInterface(m);
        n.showSlots();
        $(s_oMain).trigger("start_level", 1);
        this.checkEndGame()
    }
    ;
    this._setBoard = function() {
        var a = BOARD_ROW
          , c = BOARD_COL;
        w = [];
        for (var d = 0; d < a; d++) {
            w[d] = [];
            for (var b = 0; b < c - (d + 1) % 2; b++)
                w[d][b] = new CCell(0 === d % 2 ? b * CELL_SIZE : -CELL_SIZE / 2 + b * CELL_SIZE,d * CELL_SIZE / 2,q,d,b),
                d !== BOARD_ROW - 1 && (1 !== d % 2 || 0 !== b && b !== BOARD_COL - 1) || w[d][b].removeStake()
        }
        q.regX = q.getBounds().x + q.getBounds().width / 2;
        q.regY = q.getBounds().y + q.getBounds().height / 2;
        q.x = CANVAS_WIDTH / 2;
        q.y = CANVAS_HEIGHT / 2 - 29;
        new CGridMapping(w)
    }
    ;
    this._initProbability = function() {
        g = [];
        for (var a = 0; a < PRIZE_PROBABILITY.length; a++)
            for (var c = 0; c < PRIZE_PROBABILITY[a]; c++)
                g.push(a)
    }
    ;
    this.launch = function(a) {
        e = a;
        this._placeBet();
        this.setBall();
        n.hideSlots();
        c.shiftBallAnimation();
        a = s_oGame.getBallPivotCellPos(0, a);
        z.launchAnim(a)
    }
    ;
    this._placeBet = function() {
        h -= f;
        k += f;
        d.hideControls();
        d.refreshCredit(h.toFixed(2) / 1);
        $(s_oMain).trigger("bet_placed", [f])
    }
    ;
    this.setBall = function() {
        z = c.getNextBall();
        var a = z.getPos();
        a = q.globalToLocal(a.x * s_iScaleFactor, a.y * s_iScaleFactor);
        q.addChild(z.getSprite());
        z.setPos(a)
    }
    ;
    this.getFallPath = function() {
        var a = this._setEndCol();
        a = s_oGridMapping.getRandomPathFromColToCol(e, a);
        for (var c = 0; c < a.length; c++)
            w[a[c].row][a[c].col].highlight(!0);
        a = this.getPathCopy(a);
        z.startPathAnim(a, 500);
        z = null
    }
    ;
    this.ballArrived = function(a) {
        PRIZE[a] * b >= f ? playSound("ball_in_basket", 1, !1) : playSound("ball_in_basket_negative", 1, !1);
        t.litBasket(a, PRIZE[a] * b / f);
        h += PRIZE[a] * b;
        k -= PRIZE[a] * b;
        $(s_oMain).trigger("save_score", [h]);
        n.showSlots();
        d.showControls();
        d.refreshCredit(h.toFixed(2) / 1);
        this.checkEndGame()
    }
    ;
    this.checkEndGame = function() {
        h < START_BET ? this.gameOver() : b > h / START_BET && (b = Math.floor(h / START_BET),
        f = (b * START_BET).toFixed(2) / 1,
        d.refreshBet(f),
        t.refreshText(b))
    }
    ;
    this.modifyBonus = function(a) {
        "plus" === a ? b++ : b--;
        b > MAX_MULTIPLIER ? b = MAX_MULTIPLIER : 1 > b ? b = 1 : b > h / START_BET && (b = Math.floor(h / START_BET));
        f = (START_BET * b).toFixed(2) / 1;
        d.refreshBet(f);
        t.refreshText(b)
    }
    ;
    this._setEndCol = function() {
        for (var a, c = [], d = 0; d < g.length; d++)
            a = PRIZE[g[d]] * b,
            a <= k && c.push({
                prize: a,
                index: d
            });
        return g[c[Math.floor(Math.random() * c.length)].index]
    }
    ;
    this.getBall = function() {
        return z
    }
    ;
    this.getBoard = function() {
        return w
    }
    ;
    this.getBallPivotCellPos = function(a, c) {
        return w[a][c].getCenterOfBallOnPivot()
    }
    ;
    this.getPathCopy = function(a) {
        for (var c = [], d = 0; d < a.length; d++)
            c.push(a[d]);
        return c
    }
    ;
    this.restartGame = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        b = 1;
        f = START_BET.toFixed(2) / 1;
        k = BANK_CASH;
        t.refreshText(b);
        d.refreshCredit(h);
        d.refreshBet(f);
        d.showControls()
    }
    ;
    this.addNewCredits = function(a) {
        h += a.toFixed(2) / 1;
        d.refreshCredit(h)
    }
    ;
    this.unload = function() {
        d.unload();
        null !== p && p.unload();
        t.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    }
    ;
    this.onExit = function() {
        setVolume("soundtrack", 1);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("end_level", 1);
        s_oGame.unload();
        s_oMain.gotoMenu()
    }
    ;
    this._onExitHelp = function() {}
    ;
    this.gameOver = function() {
        d.hideControls();
        p = new CEndPanel(h)
    }
    ;
    this.getSlotPosition = function(a) {
        return n.getSlotPos(a)
    }
    ;
    this.sortChildren = function(a, c, d) {
        return a.y < c.y ? 1 : a.y > c.y ? -1 : 0
    }
    ;
    this.update = function() {
        q.sortChildren(this.sortChildren)
    }
    ;
    s_oGame = this;
    START_CREDIT = a.start_credit;
    START_BET = a.start_bet;
    MAX_MULTIPLIER = a.max_multiplier;
    BANK_CASH = a.bank_cash;
    PRIZE = a.prize;
    PRIZE_PROBABILITY = a.prize_probability;
    AD_SHOW_COUNTER = a.ad_show_counter;
    this._init()
}
var s_oGame;
function CInterface(a) {
    var e, b, f, h, k, g, d, p, c, n, t, m, q, x, r, w, z = null, F = null;
    this._init = function(a) {
        var y = s_oSpriteLibrary.getSprite("hand_anim")
          , C = y.width / 6
          , D = y.height / 4;
        y = new createjs.SpriteSheet({
            framerate: 20,
            images: [y],
            frames: [[1, 1, 256, 230, 0, 0, 0], [259, 1, 256, 230, 0, 0, 0], [517, 1, 256, 230, 0, 0, 0], [775, 1, 256, 230, 0, 0, 0], [1033, 1, 256, 230, 0, 0, 0], [1291, 1, 256, 230, 0, 0, 0], [1, 233, 256, 230, 0, 0, 0], [259, 233, 256, 230, 0, 0, 0], [517, 233, 256, 230, 0, 0, 0], [775, 233, 256, 230, 0, 0, 0], [1033, 233, 256, 230, 0, 0, 0], [1291, 233, 256, 230, 0, 0, 0], [1, 465, 256, 230, 0, 0, 0], [259, 465, 256, 230, 0, 0, 0], [517, 465, 256, 230, 0, 0, 0], [775, 465, 256, 230, 0, 0, 0], [1033, 465, 256, 230, 0, 0, 0], [1291, 465, 256, 230, 0, 0, 0], [1, 697, 256, 230, 0, 0, 0], [259, 697, 256, 230, 0, 0, 0], [517, 697, 256, 230, 0, 0, 0], [775, 697, 256, 230, 0, 0, 0]],
            animations: {
                idle: [0, 21]
            }
        });
        t = 0;
        w = createSprite(y, "idle", C / 2, D / 2, C, D);
        y = s_oGame.getSlotPosition(t);
        w.x = y.x;
        w.y = y.y;
        w.regX = C / 2 - 30;
        w.regY = D / 2;
        w.on("animationend", this._moveHand);
        s_oStage.addChild(w);
        y = s_oSpriteLibrary.getSprite("but_exit");
        k = CANVAS_WIDTH - y.width / 2 - 10;
        g = y.height / 2 + 10;
        p = new CGfxButton(k,g,y,s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = C = k - y.width - 10;
        h = y.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            y = s_oSpriteLibrary.getSprite("audio_icon"),
            d = new CToggle(f,h,y,s_bAudioActive,s_oStage),
            d.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            C = f - y.width / 2 - 10;
        y = window.document;
        D = y.documentElement;
        z = D.requestFullscreen || D.mozRequestFullScreen || D.webkitRequestFullScreen || D.msRequestFullscreen;
        F = y.exitFullscreen || y.mozCancelFullScreen || y.webkitExitFullscreen || y.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (z = !1);
        z && screenfull.isEnabled && (y = s_oSpriteLibrary.getSprite("but_fullscreen"),
        e = C,
        b = y.height / 2 + 10,
        c = new CToggle(e,b,y,s_bFullscreen,s_oStage),
        c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        var G = new createjs.Container;
        G.x = 854;
        G.y = 1650;
        a.addChild(G);
        y = s_oSpriteLibrary.getSprite("bet_panel");
        C = createBitmap(y);
        C.regX = y.width / 2;
        C.regY = y.height / 2;
        G.addChild(C);
        var N = C.x
          , O = C.y;
        C = y.width - 100;
        D = 36;
        m = new CTLText(G,N - C / 2,O - D / 2,C,D,D,"center","#fff",PRIMARY_FONT,1,0,0,sprintf(TEXT_CURRENCY, START_BET.toFixed(2)),!0,!0,!1,!1);
        y = s_oSpriteLibrary.getSprite("but_plus");
        q = new CTextButton(160,0,y,TEXT_PLUS,PRIMARY_FONT,"#0083ea",80,!1,G);
        q.enable();
        q.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        q.setTextPosition(1, 26);
        q.hideShadow();
        y = s_oSpriteLibrary.getSprite("but_plus");
        x = new CTextButton(-160,0,y,TEXT_MIN,PRIMARY_FONT,"#0083ea",80,!1,G);
        x.enable();
        x.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        x.setTextPosition(2, 26);
        x.hideShadow();
        y = s_oSpriteLibrary.getSprite("credits_panel");
        C = createBitmap(y);
        C.regX = y.width / 2;
        C.regY = y.height / 2;
        C.x = 332;
        C.y = G.y;
        a.addChild(C);
        N = C.x + 10;
        O = C.y;
        C = y.width - 90;
        D = 36;
        r = new CTLText(a,N - C / 2,O - D / 2,C,D,D,"center","#fff",PRIMARY_FONT,1,0,0,sprintf(TEXT_CURRENCY, START_CREDIT.toFixed(2)),!0,!0,!1,!1);
        y = s_oSpriteLibrary.getSprite("but_settings");
        n = new CGUIExpandible(k,g,y,s_oStage);
        n.addButton(p);
        n.addButton(d);
        z && screenfull.isEnabled && n.addButton(c);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            d.unload(),
            d = null;
        p.unload();
        z && screenfull.isEnabled && c.unload();
        x.unload();
        q.unload();
        n.unload();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(a, c) {
        n.refreshPos(a, c)
    }
    ;
    this.refreshBet = function(a) {
        m.refreshText(sprintf(TEXT_CURRENCY, a.toFixed(2)))
    }
    ;
    this.refreshCredit = function(a) {
        r.refreshText(sprintf(TEXT_CURRENCY, a.toFixed(2)))
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
    this.hideControls = function() {
        x.setVisible(!1);
        q.setVisible(!1);
        this.setHelpVisible(!1)
    }
    ;
    this.showControls = function() {
        x.setVisible(!0);
        q.setVisible(!0);
        this.setHelpVisible(!0)
    }
    ;
    this.setHelpVisible = function(a) {
        (w.visible = a) && w.gotoAndPlay("idle")
    }
    ;
    this._moveHand = function() {
        t++;
        t === NUM_INSERT_TUBE && (t = 0);
        var a = s_oGame.getSlotPosition(t);
        w.x = a.x;
        w.y = a.y
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
        z && screenfull.isEnabled && c.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? F.call(window.document) : z.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oInterface = this;
    this._init(a);
    return this
}
var s_oInterface = null;
function CCreditsPanel() {
    var a, e, b, f, h, k, g;
    this._init = function() {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        s_oStage.addChild(e);
        k = new createjs.Shape;
        k.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = .01;
        g = k.on("click", this._onLogoButRelease);
        s_oStage.addChild(k);
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var d = s_oSpriteLibrary.getSprite("msg_box")
          , p = createBitmap(d);
        p.regX = d.width / 2;
        p.regY = d.height / 2;
        b.addChild(p);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + d.height / 2;
        a = b.y;
        createjs.Tween.get(b).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        d = new createjs.Text("DEVELOPED BY"," 50px " + PRIMARY_FONT,"#ffffff");
        d.y = -100;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 300;
        b.addChild(d);
        d = new createjs.Text("www.codethislab.com"," 50px " + PRIMARY_FONT,"#ffffff");
        d.y = 90;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 300;
        b.addChild(d);
        d = s_oSpriteLibrary.getSprite("ctl_logo");
        h = createBitmap(d);
        h.regX = d.width / 2;
        h.regY = d.height / 2;
        b.addChild(h);
        d = s_oSpriteLibrary.getSprite("but_exit");
        f = new CGfxButton(298,-200,d,b);
        f.addEventListener(ON_MOUSE_UP, this.unload, this)
    }
    ;
    this.unload = function() {
        f.setClickable(!1);
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(b).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(e);
            s_oStage.removeChild(b);
            s_oStage.removeChild(k);
            f.unload()
        });
        k.off("click", g)
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
    var b, f, h, k, g, d;
    this._init = function(a, p) {
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = 0;
        d = k.on("mousedown", function() {});
        s_oStage.addChild(k);
        createjs.Tween.get(k).to({
            alpha: .7
        }, 500);
        g = new createjs.Container;
        s_oStage.addChild(g);
        var c = s_oSpriteLibrary.getSprite("msg_box")
          , e = createBitmap(c);
        e.regX = c.width / 2;
        e.regY = c.height / 2;
        g.addChild(e);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT + c.height / 2;
        b = g.y;
        createjs.Tween.get(g).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        new CTLText(g,-200,-c.height / 2 + 160 - 30,400,60,60,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_ARE_SURE,!0,!0,!1,!1);
        f = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),g);
        f.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        h = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_no"),g);
        h.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        h.pulseAnimation()
    }
    ;
    this._onButYes = function() {
        h.setClickable(!1);
        f.setClickable(!1);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(g).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            p.unload();
            a && a()
        })
    }
    ;
    this._onButNo = function() {
        h.setClickable(!1);
        f.setClickable(!1);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(g).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            p.unload();
            e && e()
        })
    }
    ;
    this.unload = function() {
        h.unload();
        f.unload();
        s_oStage.removeChild(k);
        s_oStage.removeChild(g);
        k.off("mousedown", d)
    }
    ;
    var p = this;
    this._init(a, e)
}
function CEndPanel(a) {
    var e, b, f, h, k;
    this._init = function(a) {
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        k = f.on("mousedown", function() {});
        s_oStage.addChild(f);
        createjs.Tween.get(f).to({
            alpha: .7
        }, 500);
        h = new createjs.Container;
        s_oStage.addChild(h);
        var d = s_oSpriteLibrary.getSprite("msg_box")
          , c = createBitmap(d);
        c.regX = d.width / 2;
        c.regY = d.height / 2;
        h.addChild(c);
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT + d.height / 2;
        createjs.Tween.get(h).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        new CTLText(h,-300,-d.height / 2 + 180 - 100,600,200,60,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_GAMEOVER,!0,!0,!0,!1);
        e = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),h);
        e.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        e.pulseAnimation();
        b = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_home"),h);
        b.addEventListener(ON_MOUSE_UP, this._onExit, this);
        $(s_oMain).trigger("save_score", a);
        $(s_oMain).trigger("share_event", a)
    }
    ;
    this.unload = function() {
        f.off("mousedown", k);
        s_oStage.removeChild(f);
        s_oStage.removeChild(h)
    }
    ;
    this._onRestart = function() {
        g.unload();
        s_oGame.restartGame();
        $(s_oMain).trigger("end_level", 1);
        $(s_oMain).trigger("recharge");
        s_oGame.checkEndGame()
    }
    ;
    this._onExit = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        g.unload();
        s_oGame.onExit()
    }
    ;
    var g = this;
    this._init(a);
    return this
}
var DIR_TOPRIGHT = "DIR_TOPRIGHT"
  , DIR_BOTRIGHT = "DIR_BOTRIGHT"
  , DIR_TOPLEFT = "DIR_TOPLEFT"
  , DIR_BOTLEFT = "DIR_BOTLEFT"
  , DIR_SELF = "DIR_SELF";
function CGridMapping(a) {
    var e, b, f, h, k;
    this._init = function(a) {
        e = BOARD_ROW;
        b = BOARD_COL;
        h = [];
        f = [];
        for (var d = 0; d < a.length; d++) {
            f[d] = [];
            for (var g = 0; g < a[d].length; g++)
                f[d][g] = []
        }
        this._buildMap();
        k = [];
        for (d = 0; d < a[0].length; d++)
            k[d] = this.getAllPathFrom({
                row: 0,
                col: d
            })
    }
    ;
    this._buildMap = function() {
        for (var b = 0; b < a.length; b++)
            for (var d = 0; d < a[b].length; d++)
                f[b][d][DIR_BOTRIGHT] = this._setNeighbor(b, d, DIR_BOTRIGHT),
                f[b][d][DIR_BOTLEFT] = this._setNeighbor(b, d, DIR_BOTLEFT),
                f[b][d][DIR_SELF] = this._setNeighbor(b, d, DIR_SELF)
    }
    ;
    this._setNeighbor = function(a, d, f) {
        var c = null;
        switch (f) {
        case DIR_TOPRIGHT:
            0 < a && d < b - a % 2 && (c = {
                row: a - 1,
                col: d + (a + 1) % 2
            });
            break;
        case DIR_BOTRIGHT:
            a < e - 1 && d + a % 2 < b && (c = {
                row: a + 1,
                col: d + (a + 1) % 2
            });
            break;
        case DIR_TOPLEFT:
            0 < a && 0 <= d - (a - 1) % 2 && (c = {
                row: a - 1,
                col: d - (a + 1) % 2
            });
            break;
        case DIR_BOTLEFT:
            a < e - 1 && d >= a % 2 && (c = {
                row: a + 1,
                col: d - a % 2
            });
            break;
        case DIR_SELF:
            c = {
                row: a,
                col: d
            }
        }
        return c
    }
    ;
    this._getNeighborByDir = function(a, d, b) {
        return f[a][d][b]
    }
    ;
    this._getAllNeighbor = function(a, d) {
        var b = [], c;
        for (c in f[a][d])
            null !== f[a][d][c] && b.push(f[a][d][c]);
        return b
    }
    ;
    this._getMainDiagonal = function(a, d, b) {
        var c = []
          , g = b[a][d].getColor();
        this._findInDirection(a, d, DIR_BOTRIGHT, c, 99, g, b);
        this._findInDirection(a, d, DIR_TOPLEFT, c, 99, g, b);
        return c
    }
    ;
    this._getSecondDiagonal = function(a, d, b) {
        var c = []
          , g = b[a][d].getColor();
        this._findInDirection(a, d, DIR_BOTLEFT, c, 99, g, b);
        this._findInDirection(a, d, DIR_TOPRIGHT, c, 99, g, b);
        return c
    }
    ;
    this._getRow = function(a, d, b) {
        var c = []
          , g = b[a][d].getColor();
        this._findInDirection(a, d, DIR_LEFT, c, 99, g, b);
        this._findInDirection(a, d, DIR_RIGHT, c, 99, g, b);
        return c
    }
    ;
    this._getCol = function(a, d, b) {
        var c = []
          , g = b[a][d].getColor();
        this._findInDirection(a, d, DIR_TOP, c, 99, g, b);
        this._findInDirection(a, d, DIR_BOT, c, 99, g, b);
        return c
    }
    ;
    this._getStraightByDirAndRadius = function(a, d, b, c, f) {
        var g = [];
        h = [];
        h.push({
            radius: c,
            direction: null
        });
        var e = f[a][d].getColor();
        this._findInDirection(a, d, b, g, c, e, f);
        return g
    }
    ;
    this._getStraightRowByRadius = function(a, d, b) {
        var c = [];
        h = [];
        h.push({
            radius: b,
            direction: null
        });
        this._findInDirection(a, d, DIR_LEFT, c, b);
        this._findInDirection(a, d, DIR_RIGHT, c, b);
        return c
    }
    ;
    this._getStraightColByRadius = function(a, d, b) {
        var c = [];
        h = [];
        h.push({
            radius: b,
            direction: null
        });
        this._findInDirection(a, d, DIR_TOP, c, b);
        this._findInDirection(a, d, DIR_BOT, c, b);
        return c
    }
    ;
    this._findInDirection = function(a, b, e, c, k, t, m) {
        --k;
        if (null !== f[a][b][e] && 0 <= k) {
            var d = f[a][b][e].row;
            a = f[a][b][e].col;
            t ? (b = m[d][a].getColor(),
            b !== t && (null === b ? (c.push({
                row: d,
                col: a
            }),
            h.push({
                radius: k,
                direction: e
            }),
            this._findInDirection(d, a, e, c, k, t, m)) : (c.push({
                row: d,
                col: a
            }),
            h.push({
                radius: k,
                direction: e
            })))) : (c.push({
                row: d,
                col: a
            }),
            h.push({
                radius: k,
                direction: e
            }),
            this._findInDirection(d, a, e, c, k, t, m))
        }
    }
    ;
    this.getAllPathFrom = function(a) {
        return this._findAllPathDFS(f[a.row][a.col], [], [])
    }
    ;
    this.getRandomPathFrom = function(a) {
        a = s_oGridMapping.getAllPathFrom(a);
        var b = [];
        0 < a.length && (b = a[Math.floor(Math.random() * (a.length - 1))]);
        return b
    }
    ;
    this.getAllPathFromTo = function(a, b) {
        for (var d = s_oGridMapping.getAllPathFrom(a), c = d.length - 1; 0 <= c; c--) {
            for (var f = !1, e = 0; e < d[c].length; e++)
                if (d[c][e].row === b.row && d[c][e].col === b.col) {
                    f = !0;
                    break
                }
            f || d.splice(c, 1)
        }
        return d
    }
    ;
    this.getRandomPathFromTo = function(a, b) {
        var d = s_oGridMapping.getAllPathFromTo(a, b)
          , c = [];
        0 < d.length && (c = d[Math.floor(Math.random() * (d.length - 1))]);
        return c
    }
    ;
    this.getRandomPathFromCol = function(a) {
        a = k[a];
        return a[Math.floor(Math.random() * (a.length - 1))]
    }
    ;
    this.getRandomPathFromColToCol = function(a, b) {
        for (var d = [], c = f.length - 1, e = 0; e < k[a].length; e++) {
            var h = k[a][e];
            h[c].col === b && d.push(h)
        }
        c = [];
        0 < d.length && (c = d[Math.floor(Math.random() * (d.length - 1))]);
        return c
    }
    ;
    this._findAllPathDFS = function(a, b, f) {
        b = b.slice(0);
        var c = 0
          , d = this._getChildren(a)
          , e = d.length;
        b.push(a[DIR_SELF]);
        if (0 === e)
            return f.push(b),
            f;
        for (c; c < e; c++)
            this._findAllPathDFS(d[c], b, f);
        return f
    }
    ;
    this._getChildren = function(a) {
        var b = [], e;
        for (e in a)
            null === a[e] || e !== DIR_BOTLEFT && e !== DIR_BOTRIGHT || b.push(f[a[e].row][a[e].col]);
        return b
    }
    ;
    this._init(a);
    s_oGridMapping = this
}
var s_oGridMapping;
function CCell(a, e, b, f, h, k) {
    var g, d, p;
    this._init = function(a, b, e, f, h, k) {
        g = new createjs.Container;
        g.x = a;
        g.y = b;
        g.alpha = 0;
        e.addChild(g);
        d = new createjs.Shape;
        d.graphics.beginFill("rgba(255,255,255,0.51)").drawRect(-50, -50, 100, 100);
        d.visible = !1;
        d.rotation = 45;
        g.addChild(d);
        f = s_oSpriteLibrary.getSprite("stake");
        p = createBitmap(f);
        p.regX = f.width / 2;
        p.x = a;
        p.y = b + 60;
        e.addChild(p)
    }
    ;
    this.unload = function() {
        b.removeChild(g)
    }
    ;
    this.getCenterPos = function() {
        return {
            x: a,
            y: e
        }
    }
    ;
    this.getPivotPos = function() {
        return {
            x: a,
            y: e + CELL_PIVOT_FROM_CENTER
        }
    }
    ;
    this.getCenterOfBallOnPivot = function() {
        return {
            x: a,
            y: e + CELL_PIVOT_FROM_CENTER - BALL_RADIUS
        }
    }
    ;
    this.checkBallOverlap = function(b) {
        var c = b.x - a;
        b = b.y - e;
        return c * c + b * b < BALL_RADIUS * BALL_RADIUS
    }
    ;
    this.removeStake = function() {
        p.visible = !1
    }
    ;
    this.highlight = function(a) {
        d.visible = a
    }
    ;
    this._debug = function() {
        g.alpha = 1;
        var a = new createjs.Text(f + "," + h,"bold 30px Arial","#000000");
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.lineWidth = 200;
        a.outline = 4;
        g.addChild(a);
        var b = new createjs.Text(a.text,"bold 30px Arial","#ffffff");
        b.textAlign = a.textAlign;
        b.textBaseline = a.textBaseline;
        b.lineWidth = a.lineWidth;
        g.addChild(b)
    }
    ;
    this._init(a, e, b, f, h, k)
}
function CBall(a, e) {
    var b, f, h, k;
    this._init = function(a, e) {
        h = new createjs.Container;
        h.x = a.x;
        h.y = a.y;
        e.addChild(h);
        var c = s_oSpriteLibrary.getSprite("ball");
        k = createBitmap(c);
        k.regX = c.width / 2;
        k.regY = c.height / 2;
        h.addChild(k);
        b = c.height
    }
    ;
    this.unload = function() {
        h.parent.removeChild(h)
    }
    ;
    this.getPos = function() {
        return {
            x: h.x,
            y: h.y
        }
    }
    ;
    this.getSprite = function() {
        return h
    }
    ;
    this.resetPos = function() {
        h.x = a.x;
        h.y = a.y
    }
    ;
    this.setPos = function(a) {
        h.x = a.x;
        h.y = a.y
    }
    ;
    this.setPosToPivot = function() {
        h.regY = b / 2
    }
    ;
    this._getFallParams = function(a, b) {
        var c = s_oGame.getBallPivotCellPos(a[0].row, a[0].col);
        if (1 < a.length)
            if (s_oGame.getBallPivotCellPos(a[1].row, a[1].col).x > c.x) {
                var d = Math.random() * BALL_FALL_MAX_ANGLE;
                var e = "right"
            } else
                d = -Math.random() * BALL_FALL_MAX_ANGLE,
                e = "left";
        else
            d = -BALL_FALL_MAX_ANGLE + Math.random() * BALL_FALL_MAX_ANGLE * 2,
            e = "right";
        var g = new CVector2(0,-BALL_RADIUS);
        rotateVector2D(d, g);
        g.subtract(new CVector2(0,-BALL_RADIUS));
        var p = c.x - g.getX();
        g = c.y + g.getY();
        d *= BALL_FALL_ROTATION_ATTENUATION_FACTOR;
        c = c.x > h.x ? k.rotation + BALL_FALL_MAX_ROTATION - d : k.rotation - BALL_FALL_MAX_ROTATION - d;
        (h.x < p ? "right" : "left") === e ? (e = b * BALL_FALL_SPEED_INCREASE,
        e < BALL_FALL_MAX_SPEED_LIMIT && (e = BALL_FALL_MAX_SPEED_LIMIT)) : e = f;
        return {
            rotation: c,
            posx: p,
            posy: g,
            newtime: e
        }
    }
    ;
    this.launchAnim = function(a) {
        createjs.Tween.get(h).to({
            x: a.x
        }, 1E3, createjs.Ease.sineOut);
        createjs.Tween.get(h).to({
            y: a.y - 400
        }, 500, createjs.Ease.cubicOut).to({
            y: a.y
        }, 500, createjs.Ease.cubicIn).call(function() {
            s_oGame.getFallPath()
        })
    }
    ;
    this.startPathAnim = function(a, b) {
        f = b;
        this._jumpBall(a, b)
    }
    ;
    this._jumpBall = function(a, b) {
        playSound("ball_collision", 1, !1);
        var c = a.splice(0, 1);
        if (1 === a.length)
            g._lastJumpBallAnim(a, b);
        else {
            c = s_oGame.getBallPivotCellPos(c[0].row, c[0].col);
            var d = s_oGame.getBallPivotCellPos(a[0].row, a[0].col);
            createjs.Tween.get(h).to({
                x: d.x
            }, b);
            createjs.Tween.get(h).to({
                y: c.y - 10
            }, b / 4, createjs.Ease.cubicOut).to({
                y: d.y
            }, 3 * b / 4, createjs.Ease.cubicIn).call(function() {
                g._jumpBall(a, b)
            })
        }
    }
    ;
    this._fallBall = function(a, b) {
        a.splice(0, 1);
        if (1 === a.length)
            g._lastFallBallAnim(a, b);
        else {
            var c = this._getFallParams(a, b);
            createjs.Tween.get(k).to({
                rotation: c.rotation
            }, b, createjs.Ease.sineIn);
            createjs.Tween.get(h, {
                override: !0
            }).to({
                x: c.posx
            }, b, createjs.Ease.sineIn);
            createjs.Tween.get(h).to({
                y: c.posy
            }, b, createjs.Ease.cubicIn).call(function() {
                g._fallBall(a, c.newtime)
            })
        }
    }
    ;
    this.releaseBallAnim = function(a) {
        var b = s_oGame.getBoard()[0][a].getCenterOfBallOnPivot();
        createjs.Tween.get(h).to({
            y: b.y
        }, 500, createjs.Ease.sineIn).call(function() {
            s_oGame.launchBall(a)
        })
    }
    ;
    this._lastFallBallAnim = function(a, b) {
        var c = this._getFallParams(a, b)
          , d = c.posy + 170;
        createjs.Tween.get(k).to({
            rotation: c.rotation
        }, b, createjs.Ease.sineIn);
        createjs.Tween.get(h, {
            override: !0
        }).to({
            x: c.posx
        }, b, createjs.Ease.sineIn);
        createjs.Tween.get(h).to({
            y: d
        }, b, createjs.Ease.cubicIn).call(function() {
            createjs.Tween.get(h).to({
                y: d - 100
            }, b / 2, createjs.Ease.cubicOut).to({
                y: d
            }, b, createjs.Ease.bounceOut);
            s_oGame.ballArrived(a[0].col)
        })
    }
    ;
    this._lastJumpBallAnim = function(a, b) {
        var c = s_oGame.getBallPivotCellPos(a[0].row, a[0].col)
          , d = c.y + 220;
        createjs.Tween.get(h, {
            override: !0
        }).to({
            x: c.x
        }, b, createjs.Ease.sineIn);
        createjs.Tween.get(h).to({
            y: h.y - 10
        }, b / 4, createjs.Ease.cubicOut).to({
            y: d
        }, 3 * b / 4, createjs.Ease.cubicIn).call(function() {
            s_oGame.ballArrived(a[0].col);
            createjs.Tween.get(h).to({
                y: d - 100
            }, b / 2, createjs.Ease.cubicOut).to({
                y: d
            }, b, createjs.Ease.bounceOut).call(function() {
                createjs.Tween.get(h).to({
                    alpha: 0
                }, 3E3, createjs.Ease.cubicIn).call(function() {
                    g.unload()
                })
            })
        })
    }
    ;
    var g = this;
    this._init(a, e)
}
function CBallGenerator(a) {
    var e, b, f, h, k, g, d;
    this._init = function(a) {
        g = new createjs.Container;
        a.addChild(g);
        d = new createjs.Container;
        a.addChild(d);
        f = 3;
        h = 2 * BALL_RADIUS - 20;
        e = 182;
        b = 264;
        k = [];
        for (a = 0; a < f; a++)
            k[a] = new CBall({
                x: e - a * h,
                y: b
            },g);
        a = s_oSpriteLibrary.getSprite("ball_generator");
        a = createBitmap(a);
        a.x = 0;
        a.y = 196;
        d.addChild(a)
    }
    ;
    this.unload = function() {
        a.removeChild(g);
        a.removeChild(d)
    }
    ;
    this.shiftBallAnimation = function() {
        k.splice(0, 1);
        var a = f - 1
          , c = {
            x: e - a * h,
            y: b
        };
        k[a] = new CBall(c,g);
        for (a = 0; 2 > a; a++)
            c = {
                x: e - a * h,
                y: b
            },
            createjs.Tween.get(k[a].getSprite(), {
                override: !0
            }).wait(200 * a).to({
                x: c.x
            }, 1E3, createjs.Ease.cubicIn)
    }
    ;
    this.getNextBall = function() {
        return k[0]
    }
    ;
    this._init(a)
}
function CInsertTubeController(a) {
    var e, b;
    this._init = function(a) {
        b = new createjs.Container;
        a.addChild(b);
        a = s_oSpriteLibrary.getSprite("holes_occluder");
        var f = createBitmap(a);
        f.regX = a.width / 2;
        f.regY = a.height / 2;
        f.x = CANVAS_WIDTH / 2;
        f.y = 408;
        b.addChild(f);
        a = s_oSpriteLibrary.getSprite("hole_board_occluder");
        f = [];
        for (var k = 0; k < NUM_INSERT_TUBE; k++) {
            f.push({
                x: 288 + 140 * k,
                y: 356
            });
            var g = createBitmap(a);
            g.regX = a.width / 2;
            g.regY = a.height / 2;
            g.x = f[k].x;
            g.y = f[k].y;
            b.addChild(g)
        }
        e = [];
        s_oSpriteLibrary.getSprite("bg_number");
        for (k = 0; k < NUM_INSERT_TUBE; k++)
            a = new CSlot(f[k].x,f[k].y + 20,90,100,b),
            a.addEventListenerWithParams(ON_MOUSE_UP, this._onSlot, this, k),
            e.push(a);
        this.hideSlots()
    }
    ;
    this.unload = function() {
        a.removeChild(b)
    }
    ;
    this.checkBallOverlap = function(a) {
        for (var b, f = 0; f < NUM_INSERT_TUBE; f++)
            if (b = e[f].checkOverlap(a))
                return {
                    pos: e[f].getPos(),
                    index: f
                }
    }
    ;
    this.getSlotPos = function(a) {
        return e[a].getPos()
    }
    ;
    this.hideSlots = function() {
        for (var a = 0; a < NUM_INSERT_TUBE; a++)
            e[a].setVisible(!1)
    }
    ;
    this.showSlots = function() {
        for (var a = 0; a < NUM_INSERT_TUBE; a++)
            e[a].setVisible(!0)
    }
    ;
    this._onSlot = function(a) {
        s_oGame.launch(a)
    }
    ;
    this._init(a)
}
function CSlot(a, e, b, f, h) {
    var k, g, d, p, c = [], n, t, m, q, x;
    this._init = function(a, c, e) {
        k = !1;
        g = 1;
        d = [];
        p = [];
        n = new createjs.Container;
        n.x = a;
        n.y = c;
        n.scaleX = n.scaleY = g;
        e.addChild(n);
        t = new createjs.Shape;
        t.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-b / 2, -f / 2, b, f);
        n.addChild(t);
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? n.off("mousedown", m) : (n.off("mousedown", m),
        n.off("mouseover", x));
        n.off("pressup", q);
        n.parent.removeChild(n)
    }
    ;
    this.setVisible = function(a) {
        n.visible = a
    }
    ;
    this.setClickable = function(a) {
        k = !a
    }
    ;
    this._initListener = function() {
        s_bMobile ? m = n.on("mousedown", this.buttonDown) : (m = n.on("mousedown", this.buttonDown),
        x = n.on("mouseover", this.buttonOver));
        q = n.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        d[a] = b;
        p[a] = c
    }
    ;
    this.addEventListenerWithParams = function(a, b, e, f) {
        d[a] = b;
        p[a] = e;
        c = f
    }
    ;
    this.buttonRelease = function() {
        k || (n.scaleX = g,
        n.scaleY = g,
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(p[ON_MOUSE_UP], c))
    }
    ;
    this.buttonDown = function() {
        k || (n.scaleX = .9 * g,
        n.scaleY = .9 * g,
        playSound("click", 1, !1),
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN], c))
    }
    ;
    this.buttonOver = function(a) {
        s_bMobile || k || (a.target.cursor = "pointer")
    }
    ;
    this.addText = function(a) {
        a = new createjs.Text(a," 50px " + PRIMARY_FONT,"#ffffff");
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.lineWidth = 200;
        n.addChild(a)
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(n).to({
            scaleX: 1.1 * g,
            scaleY: 1.1 * g
        }, 850, createjs.Ease.quadOut).to({
            scaleX: g,
            scaleY: g
        }, 650, createjs.Ease.quadIn).call(function() {
            r.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(n).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            r.trebleAnimation()
        })
    }
    ;
    this.setPosition = function(a, b) {
        n.x = a;
        n.y = b
    }
    ;
    this.setX = function(a) {
        n.x = a
    }
    ;
    this.setY = function(a) {
        n.y = a
    }
    ;
    this.getButtonImage = function() {
        return n
    }
    ;
    this.getX = function() {
        return n.x
    }
    ;
    this.getY = function() {
        return n.y
    }
    ;
    this.getPos = function() {
        return {
            x: n.x,
            y: n.y
        }
    }
    ;
    var r = this;
    this._init(a, e, h);
    return this
}
function CScoreBasketController(a) {
    var e;
    this._init = function(a) {
        var b = new createjs.Container;
        b.y = 1472;
        a.addChild(b);
        var h = s_oSpriteLibrary.getSprite("basket_display");
        a = h.width / 4;
        var k = h.height;
        h = new createjs.SpriteSheet({
            images: [h],
            frames: {
                width: a,
                height: k,
                regX: a / 2,
                regY: k / 2
            },
            animations: {
                state_off: [0],
                state_green: [1],
                state_yellow: [2],
                state_red: [3]
            }
        });
        e = [];
        for (var g = 0; g < PRIZE.length; g++)
            e.push(new CBasket(290 + 140 * g,0,b,h,a,k,PRIZE[g].toString()))
    }
    ;
    this.unload = function() {
        for (var a = 0; a < PRIZE.length; a++)
            e[a].unload()
    }
    ;
    this.litBasket = function(a, f) {
        e[a].lit(f)
    }
    ;
    this.refreshText = function(a) {
        for (var b = 0; b < PRIZE.length; b++)
            e[b].refreshText((a * PRIZE[b]).toString())
    }
    ;
    this._init(a)
}
function CBasket(a, e, b, f, h, k, g) {
    var d, p, c, n;
    this._init = function(a, b, e, f, g, h, k) {
        c = new createjs.Container;
        c.y = b;
        c.x = a;
        e.addChild(c);
        a = createSprite(f, "state_off", g / 2, h / 2, g, h);
        c.addChild(a);
        n = createSprite(f, "state_on", g / 2, h / 2, g, h);
        n.alpha = 0;
        c.addChild(n);
        f = this._verticalizeText(k);
        d = 40;
        p = new createjs.Text(f," " + d + "px " + PRIMARY_FONT,"#ffffff");
        p.textAlign = "center";
        p.textBaseline = "middle";
        p.lineWidth = 200;
        c.addChild(p);
        this._setText(d)
    }
    ;
    this.unload = function() {
        b.removeChild(c)
    }
    ;
    this.refreshText = function(a) {
        a = this._verticalizeText(a);
        p.text = a;
        this._setText(d)
    }
    ;
    this._setText = function(a) {
        for (var b = a; p.getBounds().height > k - a; )
            b--,
            p.font = " " + b + "px " + PRIMARY_FONT;
        p.y = -p.getBounds().height / 2 + 10
    }
    ;
    this._verticalizeText = function(a) {
        for (var b = "", c = 0; c < a.length; c++)
            b = c !== a.length - 1 ? b + (a[c] + "\n") : b + a[c];
        return b
    }
    ;
    this.lit = function(a) {
        1 > a ? n.gotoAndPlay("state_red") : 4 >= a ? n.gotoAndPlay("state_yellow") : n.gotoAndPlay("state_green");
        t._recursiveLit(BASKET_LIT_ITERATION)
    }
    ;
    this._recursiveLit = function(a) {
        a--;
        0 > a || createjs.Tween.get(n).to({
            alpha: 1
        }, 100).to({
            alpha: 0
        }, 100).call(function() {
            t._recursiveLit(a)
        })
    }
    ;
    var t = this;
    this._init(a, e, b, f, h, k, g)
}
function CGUIExpandible(a, e, b, f) {
    var h, k, g, d, p, c, n, t;
    this._init = function(a, b, e, f) {
        d = [];
        c = new createjs.Container;
        c.x = a;
        c.y = b;
        f.addChild(c);
        n = new createjs.Container;
        c.addChild(n);
        t = new createjs.Container;
        c.addChild(t);
        g = !1;
        p = new CGfxButton(0,0,e,t);
        p.addEventListener(ON_MOUSE_UP, this._onMenu, this);
        k = h = 120
    }
    ;
    this.unload = function() {
        p.unload();
        f.removeChild(c)
    }
    ;
    this.refreshPos = function(b, d) {
        c.x = a - b;
        c.y = e + d
    }
    ;
    this.addButton = function(a) {
        a = a.getButtonImage();
        a.x = 0;
        a.y = 0;
        a.visible = 0;
        n.addChildAt(a, 0);
        d.push(a)
    }
    ;
    this._onMenu = function() {
        (g = !g) ? m._expand() : m._collapse()
    }
    ;
    this._expand = function() {
        for (var a = 0; a < d.length; a++)
            d[a].visible = !0,
            createjs.Tween.get(d[a], {
                override: !0
            }).wait(300 * a / 2).to({
                y: h + a * k
            }, 300, createjs.Ease.cubicOut)
    }
    ;
    this._collapse = function() {
        for (var a = 0; a < d.length; a++) {
            var b = d[d.length - 1 - a];
            createjs.Tween.get(b, {
                override: !0
            }).wait(300 * a / 2).to({
                y: 0
            }, 300, createjs.Ease.cubicOut).call(function(a) {
                a.visible = !1
            }, [b])
        }
    }
    ;
    var m = this;
    this._init(a, e, b, f)
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
    setShadow: function(a, e, b, f) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,e,b,f))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setX: function(a) {
        this._x = a;
        this._oText.x = a
    },
    setY: function(a) {
        this._y = a;
        this._oText.y = a
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
function CTLText(a, e, b, f, h, k, g, d, p, c, n, t, m, q, x, r, w) {
    this._oContainer = a;
    this._x = e;
    this._y = b;
    this._iWidth = f;
    this._iHeight = h;
    this._bMultiline = r;
    this._iFontSize = k;
    this._szAlign = g;
    this._szColor = d;
    this._szFont = p;
    this._iPaddingH = n;
    this._iPaddingV = t;
    this._bVerticalAlign = x;
    this._bFitText = q;
    this._bDebug = w;
    this._oDebugShape = null;
    this._fLineHeightFactor = c;
    this._oText = null;
    m && this.__createText(m)
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
            } catch (h) {
                var f = window.location.ancestorOrigins;
                b = f[f.length - 1]
            }
        } catch (h) {
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
/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    function a(c) {
        c = String(c);
        return c.charAt(0).toUpperCase() + c.slice(1)
    }
    function e(c, n) {
        var G = -1
          , y = c ? c.length : 0;
        if ("number" == typeof y && -1 < y && y <= u)
            for (; ++G < y; )
                n(c[G], G, c);
        else
            g(c, n)
    }
    function f(c) {
        c = String(c).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(c) ? c : a(c)
    }
    function g(c, n) {
        for (var G in c)
            x.call(c, G) && n(c[G], G, c)
    }
    function k(c) {
        return null == c ? a(c) : F.call(c).slice(8, -1)
    }
    function l(c, n) {
        var G = null != c ? typeof c[n] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(G) && ("object" == G ? !!c[n] : !0)
    }
    function r(c) {
        return String(c).replace(/([ -])(?!$)/g, "$1?")
    }
    function p(c, n) {
        var G = null;
        e(c, function(y, E) {
            G = n(G, y, E, c)
        });
        return G
    }
    function h(c) {
        function n(R) {
            return p(R, function(Q, O) {
                var U = O.pattern || r(O);
                !Q && (Q = RegExp("\\b" + U + " *\\d+[.\\w_]*", "i").exec(c) || RegExp("\\b" + U + " *\\w+-[\\w]*", "i").exec(c) || RegExp("\\b" + U + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(c)) && ((Q = String(O.label && !RegExp(U, "i").test(O.label) ? O.label : Q).split("/"))[1] && !/[\d.]+/.test(Q[0]) && (Q[0] += " " + Q[1]),
                O = O.label || O,
                Q = f(Q[0].replace(RegExp(U, "i"), O).replace(RegExp("; *(?:" + O + "[_-])?", "i"), " ").replace(RegExp("(" + O + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return Q
            })
        }
        function G(R) {
            return p(R, function(Q, O) {
                return Q || (RegExp(O + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(c) || 0)[1] || null
            })
        }
        var y = v
          , E = c && "object" == typeof c && "String" != k(c);
        E && (y = c,
        c = null);
        var L = y.navigator || {}
          , B = L.userAgent || "";
        c || (c = B);
        var H = E ? !!L.likeChrome : /\bChrome\b/.test(c) && !/internal|\n/i.test(F.toString())
          , P = E ? "Object" : "ScriptBridgingProxyObject"
          , S = E ? "Object" : "Environment"
          , C = E && y.java ? "JavaPackage" : k(y.java)
          , W = E ? "Object" : "RuntimeObject";
        S = (C = /\bJava/.test(C) && y.java) && k(y.environment) == S;
        var K = C ? "a" : "\u03b1", X = C ? "b" : "\u03b2", Z = y.document || {}, T = y.operamini || y.opera, aa = q.test(aa = E && T ? T["[[Class]]"] : k(T)) ? aa : T = null, b, t = c;
        E = [];
        var I = null
          , M = c == B;
        B = M && T && "function" == typeof T.version && T.version();
        var J = function(R) {
            return p(R, function(Q, O) {
                return Q || RegExp("\\b" + (O.pattern || r(O)) + "\\b", "i").exec(c) && (O.label || O)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , w = function(R) {
            return p(R, function(Q, O) {
                return Q || RegExp("\\b" + (O.pattern || r(O)) + "\\b", "i").exec(c) && (O.label || O)
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
          , N = n([{
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
          , V = function(R) {
            return p(R, function(Q, O, U) {
                return Q || (O[N] || O[/^[a-z]+(?: +[a-z]+\b)*/i.exec(N)] || RegExp("\\b" + r(U) + "(?:\\b|\\w*\\d)", "i").exec(c)) && U
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
          , D = function(R) {
            return p(R, function(Q, O) {
                var U = O.pattern || r(O);
                if (!Q && (Q = RegExp("\\b" + U + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(c))) {
                    var Y = Q
                      , ba = O.label || O
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
                    U && ba && /^Win/i.test(Y) && !/^Windows Phone /i.test(Y) && (ca = ca[/[\d.]+$/.exec(Y)]) && (Y = "Windows " + ca);
                    Y = String(Y);
                    U && ba && (Y = Y.replace(RegExp(U, "i"), ba));
                    Q = Y = f(Y.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return Q
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        J && (J = [J]);
        V && !N && (N = n([V]));
        if (b = /\bGoogle TV\b/.exec(N))
            N = b[0];
        /\bSimulator\b/i.test(c) && (N = (N ? N + " " : "") + "Simulator");
        "Opera Mini" == w && /\bOPiOS\b/.test(c) && E.push("running in Turbo/Uncompressed mode");
        "IE" == w && /\blike iPhone OS\b/.test(c) ? (b = h(c.replace(/like iPhone OS/, "")),
        V = b.manufacturer,
        N = b.product) : /^iP/.test(N) ? (w || (w = "Safari"),
        D = "iOS" + ((b = / OS ([\d_]+)/i.exec(c)) ? " " + b[1].replace(/_/g, ".") : "")) : "Konqueror" != w || /buntu/i.test(D) ? V && "Google" != V && (/Chrome/.test(w) && !/\bMobile Safari\b/i.test(c) || /\bVita\b/.test(N)) || /\bAndroid\b/.test(D) && /^Chrome/.test(w) && /\bVersion\//i.test(c) ? (w = "Android Browser",
        D = /\bAndroid\b/.test(D) ? D : "Android") : "Silk" == w ? (/\bMobi/i.test(c) || (D = "Android",
        E.unshift("desktop mode")),
        /Accelerated *= *true/i.test(c) && E.unshift("accelerated")) : "PaleMoon" == w && (b = /\bFirefox\/([\d.]+)\b/.exec(c)) ? E.push("identifying as Firefox " + b[1]) : "Firefox" == w && (b = /\b(Mobile|Tablet|TV)\b/i.exec(c)) ? (D || (D = "Firefox OS"),
        N || (N = b[1])) : !w || (b = !/\bMinefield\b/i.test(c) && /\b(?:Firefox|Safari)\b/.exec(w)) ? (w && !N && /[\/,]|^[^(]+?\)/.test(c.slice(c.indexOf(b + "/") + 8)) && (w = null),
        (b = N || V || D) && (N || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) && (w = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : b) + " Browser")) : "Electron" == w && (b = (/\bChrome\/([\d.]+)\b/.exec(c) || 0)[1]) && E.push("Chromium " + b) : D = "Kubuntu";
        B || (B = G(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", r(w), "(?:Firefox|Minefield|NetFront)"]));
        if (b = "iCab" == J && 3 < parseFloat(B) && "WebKit" || /\bOpera\b/.test(w) && (/\bOPR\b/.test(c) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(c) && !/^(?:Trident|EdgeHTML)$/.test(J) && "WebKit" || !J && /\bMSIE\b/i.test(c) && ("Mac OS" == D ? "Tasman" : "Trident") || "WebKit" == J && /\bPlayStation\b(?! Vita\b)/i.test(w) && "NetFront")
            J = [b];
        "IE" == w && (b = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(c) || 0)[1]) ? (w += " Mobile",
        D = "Windows Phone " + (/\+$/.test(b) ? b : b + ".x"),
        E.unshift("desktop mode")) : /\bWPDesktop\b/i.test(c) ? (w = "IE Mobile",
        D = "Windows Phone 8.x",
        E.unshift("desktop mode"),
        B || (B = (/\brv:([\d.]+)/.exec(c) || 0)[1])) : "IE" != w && "Trident" == J && (b = /\brv:([\d.]+)/.exec(c)) && (w && E.push("identifying as " + w + (B ? " " + B : "")),
        w = "IE",
        B = b[1]);
        if (M) {
            if (l(y, "global"))
                if (C && (b = C.lang.System,
                t = b.getProperty("os.arch"),
                D = D || b.getProperty("os.name") + " " + b.getProperty("os.version")),
                S) {
                    try {
                        B = y.require("ringo/engine").version.join("."),
                        w = "RingoJS"
                    } catch (R) {
                        (b = y.system) && b.global.system == y.system && (w = "Narwhal",
                        D || (D = b[0].os || null))
                    }
                    w || (w = "Rhino")
                } else
                    "object" == typeof y.process && !y.process.browser && (b = y.process) && ("object" == typeof b.versions && ("string" == typeof b.versions.electron ? (E.push("Node " + b.versions.node),
                    w = "Electron",
                    B = b.versions.electron) : "string" == typeof b.versions.nw && (E.push("Chromium " + B, "Node " + b.versions.node),
                    w = "NW.js",
                    B = b.versions.nw)),
                    w || (w = "Node.js",
                    t = b.arch,
                    D = b.platform,
                    B = (B = /[\d.]+/.exec(b.version)) ? B[0] : null));
            else
                k(b = y.runtime) == P ? (w = "Adobe AIR",
                D = b.flash.system.Capabilities.os) : k(b = y.phantom) == W ? (w = "PhantomJS",
                B = (b = b.version || null) && b.major + "." + b.minor + "." + b.patch) : "number" == typeof Z.documentMode && (b = /\bTrident\/(\d+)/i.exec(c)) ? (B = [B, Z.documentMode],
                (b = +b[1] + 4) != B[1] && (E.push("IE " + B[1] + " mode"),
                J && (J[1] = ""),
                B[1] = b),
                B = "IE" == w ? String(B[1].toFixed(1)) : B[0]) : "number" == typeof Z.documentMode && /^(?:Chrome|Firefox)\b/.test(w) && (E.push("masking as " + w + " " + B),
                w = "IE",
                B = "11.0",
                J = ["Trident"],
                D = "Windows");
            D = D && f(D)
        }
        B && (b = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(B) || /(?:alpha|beta)(?: ?\d)?/i.exec(c + ";" + (M && L.appMinorVersion)) || /\bMinefield\b/i.test(c) && "a") && (I = /b/i.test(b) ? "beta" : "alpha",
        B = B.replace(RegExp(b + "\\+?$"), "") + ("beta" == I ? X : K) + (/\d+\+?/.exec(b) || ""));
        if ("Fennec" == w || "Firefox" == w && /\b(?:Android|Firefox OS)\b/.test(D))
            w = "Firefox Mobile";
        else if ("Maxthon" == w && B)
            B = B.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(N))
            "Xbox 360" == N && (D = null),
            "Xbox 360" == N && /\bIEMobile\b/.test(c) && E.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(w) && (!w || N || /Browser|Mobi/.test(w)) || "Windows CE" != D && !/Mobi/i.test(c))
            if ("IE" == w && M)
                try {
                    null === y.external && E.unshift("platform preview")
                } catch (R) {
                    E.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(N) || /\bBB10\b/.test(c)) && (b = (RegExp(N.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(c) || 0)[1] || B) ? (b = [b, /BB10/.test(c)],
                D = (b[1] ? (N = null,
                V = "BlackBerry") : "Device Software") + " " + b[0],
                B = null) : this != g && "Wii" != N && (M && T || /Opera/.test(w) && /\b(?:MSIE|Firefox)\b/i.test(c) || "Firefox" == w && /\bOS X (?:\d+\.){2,}/.test(D) || "IE" == w && (D && !/^Win/.test(D) && 5.5 < B || /\bWindows XP\b/.test(D) && 8 < B || 8 == B && !/\bTrident\b/.test(c))) && !q.test(b = h.call(g, c.replace(q, "") + ";")) && b.name && (b = "ing as " + b.name + ((b = b.version) ? " " + b : ""),
                q.test(w) ? (/\bIE\b/.test(b) && "Mac OS" == D && (D = null),
                b = "identify" + b) : (b = "mask" + b,
                w = aa ? f(aa.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(b) && (D = null),
                M || (B = null)),
                J = ["Presto"],
                E.push(b));
        else
            w += " Mobile";
        if (b = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(c) || 0)[1]) {
            b = [parseFloat(b.replace(/\.(\d)$/, ".0$1")), b];
            if ("Safari" == w && "+" == b[1].slice(-1))
                w = "WebKit Nightly",
                I = "alpha",
                B = b[1].slice(0, -1);
            else if (B == b[1] || B == (b[2] = (/\bSafari\/([\d.]+\+?)/i.exec(c) || 0)[1]))
                B = null;
            b[1] = (/\bChrome\/([\d.]+)/i.exec(c) || 0)[1];
            537.36 == b[0] && 537.36 == b[2] && 28 <= parseFloat(b[1]) && "WebKit" == J && (J = ["Blink"]);
            M && (H || b[1]) ? (J && (J[1] = "like Chrome"),
            b = b[1] || (b = b[0],
            530 > b ? 1 : 532 > b ? 2 : 532.05 > b ? 3 : 533 > b ? 4 : 534.03 > b ? 5 : 534.07 > b ? 6 : 534.1 > b ? 7 : 534.13 > b ? 8 : 534.16 > b ? 9 : 534.24 > b ? 10 : 534.3 > b ? 11 : 535.01 > b ? 12 : 535.02 > b ? "13+" : 535.07 > b ? 15 : 535.11 > b ? 16 : 535.19 > b ? 17 : 536.05 > b ? 18 : 536.1 > b ? 19 : 537.01 > b ? 20 : 537.11 > b ? "21+" : 537.13 > b ? 23 : 537.18 > b ? 24 : 537.24 > b ? 25 : 537.36 > b ? 26 : "Blink" != J ? "27" : "28")) : (J && (J[1] = "like Safari"),
            b = (b = b[0],
            400 > b ? 1 : 500 > b ? 2 : 526 > b ? 3 : 533 > b ? 4 : 534 > b ? "4+" : 535 > b ? 5 : 537 > b ? 6 : 538 > b ? 7 : 601 > b ? 8 : "8"));
            J && (J[1] += " " + (b += "number" == typeof b ? ".x" : /[.+]/.test(b) ? "" : "+"));
            "Safari" == w && (!B || 45 < parseInt(B)) && (B = b)
        }
        "Opera" == w && (b = /\bzbov|zvav$/.exec(D)) ? (w += " ",
        E.unshift("desktop mode"),
        "zvav" == b ? (w += "Mini",
        B = null) : w += "Mobile",
        D = D.replace(RegExp(" *" + b + "$"), "")) : "Safari" == w && /\bChrome\b/.exec(J && J[1]) && (E.unshift("desktop mode"),
        w = "Chrome Mobile",
        B = null,
        /\bOS X\b/.test(D) ? (V = "Apple",
        D = "iOS 4.3+") : D = null);
        B && 0 == B.indexOf(b = /[\d.]+$/.exec(D)) && -1 < c.indexOf("/" + b + "-") && (D = String(D.replace(b, "")).replace(/^ +| +$/g, ""));
        J && !/\b(?:Avant|Nook)\b/.test(w) && (/Browser|Lunascape|Maxthon/.test(w) || "Safari" != w && /^iOS/.test(D) && /\bSafari\b/.test(J[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(w) && J[1]) && (b = J[J.length - 1]) && E.push(b);
        E.length && (E = ["(" + E.join("; ") + ")"]);
        V && N && 0 > N.indexOf(V) && E.push("on " + V);
        N && E.push((/^on /.test(E[E.length - 1]) ? "" : "on ") + N);
        if (D) {
            var da = (b = / ([\d.+]+)$/.exec(D)) && "/" == D.charAt(D.length - b[0].length - 1);
            D = {
                architecture: 32,
                family: b && !da ? D.replace(b[0], "") : D,
                version: b ? b[1] : null,
                toString: function() {
                    var R = this.version;
                    return this.family + (R && !da ? " " + R : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (b = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(t)) && !/\bi686\b/i.test(t) ? (D && (D.architecture = 64,
        D.family = D.family.replace(RegExp(" *" + b), "")),
        w && (/\bWOW64\b/i.test(c) || M && /\w(?:86|32)$/.test(L.cpuClass || L.platform) && !/\bWin64; x64\b/i.test(c)) && E.unshift("32-bit")) : D && /^OS X/.test(D.family) && "Chrome" == w && 39 <= parseFloat(B) && (D.architecture = 64);
        c || (c = null);
        y = {};
        y.description = c;
        y.layout = J && J[0];
        y.manufacturer = V;
        y.name = w;
        y.prerelease = I;
        y.product = N;
        y.ua = c;
        y.version = w && B;
        y.os = D || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        y.parse = h;
        y.toString = function() {
            return this.description || ""
        }
        ;
        y.version && E.unshift(B);
        y.name && E.unshift(w);
        D && w && (D != String(D).split(" ")[0] || D != w.split(" ")[0] && !N) && E.push(N ? "(" + D + ")" : "on " + D);
        E.length && (y.description = E.join(" "));
        return y
    }
    var d = {
        "function": !0,
        object: !0
    }
      , v = d[typeof window] && window || this
      , z = d[typeof exports] && exports;
    d = d[typeof module] && module && !module.nodeType && module;
    var m = z && d && "object" == typeof global && global;
    !m || m.global !== m && m.window !== m && m.self !== m || (v = m);
    var u = Math.pow(2, 53) - 1
      , q = /\bOpera/;
    m = Object.prototype;
    var x = m.hasOwnProperty
      , F = m.toString
      , A = h();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (v.platform = A,
    define(function() {
        return A
    })) : z && d ? g(A, function(c, n) {
        z[n] = c
    }) : v.platform = A
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
        var f = document.createElement("meta");
        f.name = a[e].name;
        f.content = a[e].content;
        var g = window.document.head.querySelector('meta[name="' + f.name + '"]');
        g && g.parentNode.removeChild(g);
        window.document.head.appendChild(f)
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
var s_iScaleFactor = 1, s_bIsIphone = !1, s_iOffsetX, s_iOffsetY, s_bFocus = !0;
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
    var e = a.toLowerCase()
      , f = window.document
      , g = f.documentElement;
    if (void 0 === window["inner" + a])
        a = g["client" + a];
    else if (window["inner" + a] != g["client" + a]) {
        var k = f.createElement("body");
        k.id = "vpw-test-b";
        k.style.cssText = "overflow:scroll";
        var l = f.createElement("div");
        l.id = "vpw-test-d";
        l.style.cssText = "position:absolute;top:-1000px";
        l.innerHTML = "<style>@media(" + e + ":" + g["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + e + ":7px!important}}</style>";
        k.appendChild(l);
        g.insertBefore(k, f.head);
        a = 7 == l["offset" + a] ? g["client" + a] : window["inner" + a];
        g.removeChild(k)
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
        var e = getSize("Width");
        s_bFocus && _checkOrientation(e, a);
        var f = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH)
          , g = Math.round(CANVAS_WIDTH * f);
        f = Math.round(CANVAS_HEIGHT * f);
        if (f < a) {
            var k = a - f;
            f += k;
            g += CANVAS_WIDTH / CANVAS_HEIGHT * k
        } else
            g < e && (k = e - g,
            g += k,
            f += CANVAS_HEIGHT / CANVAS_WIDTH * k);
        k = a / 2 - f / 2;
        var l = e / 2 - g / 2
          , r = CANVAS_WIDTH / g;
        if (l * r < -EDGEBOARD_X || k * r < -EDGEBOARD_Y)
            f = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            g = Math.round(CANVAS_WIDTH * f),
            f = Math.round(CANVAS_HEIGHT * f),
            k = (a - f) / 2,
            l = (e - g) / 2,
            r = CANVAS_WIDTH / g;
        s_iOffsetX = -1 * l * r;
        s_iOffsetY = -1 * k * r;
        0 <= k && (s_iOffsetY = 0);
        0 <= l && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * g,
        s_oStage.canvas.height = 2 * f,
        canvas.style.width = g + "px",
        canvas.style.height = f + "px",
        e = Math.min(g / CANVAS_WIDTH, f / CANVAS_HEIGHT),
        s_iScaleFactor = 2 * e,
        s_oStage.scaleX = s_oStage.scaleY = 2 * e) : s_bMobile && !1 === isIOS() ? ($("#canvas").css("width", g + "px"),
        $("#canvas").css("height", f + "px")) : (s_oStage.canvas.width = g,
        s_oStage.canvas.height = f,
        s_iScaleFactor = Math.min(g / CANVAS_WIDTH, f / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > k || (k = (a - f) / 2);
        $("#canvas").css("top", k + "px");
        $("#canvas").css("left", l + "px");
        fullscreenHandler()
    }
}
function createBitmap(a, e, f) {
    var g = new createjs.Bitmap(a)
      , k = new createjs.Shape;
    e && f ? k.graphics.beginFill("#fff").drawRect(0, 0, e, f) : k.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    g.hitArea = k;
    return g
}
function createSprite(a, e, f, g, k, l) {
    a = null !== e ? new createjs.Sprite(a,e) : new createjs.Sprite(a);
    e = new createjs.Shape;
    e.graphics.beginFill("#000000").drawRect(-f, -g, k, l);
    a.hitArea = e;
    return a
}
function _checkOrientation(a, e) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > e ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()))
}
function randomFloatBetween(a, e, f) {
    "undefined" === typeof f && (f = 2);
    return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(f))
}
function shuffle(a) {
    for (var e = a.length, f, g; 0 !== e; )
        g = Math.floor(Math.random() * e),
        --e,
        f = a[e],
        a[e] = a[g],
        a[g] = f;
    return a
}
function playSound(a, e, f) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(e),
    s_aSounds[a].loop(f),
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
function formatTime(a) {
    a /= 1E3;
    var e = Math.floor(a / 60);
    a = parseFloat(a - 60 * e).toFixed(1);
    var f = "";
    f = 10 > e ? f + ("0" + e + ":") : f + (e + ":");
    return 10 > a ? f + ("0" + a) : f + a
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
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var e = window.location.search.substring(1).split("&"), f = 0; f < e.length; f++) {
        var g = e[f].split("=");
        if (g[0] == a)
            return g[1]
    }
}
(function() {
    function a(f) {
        var g = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        f = f || window.event;
        f.type in g ? document.body.className = g[f.type] : (document.body.className = this[e] ? "hidden" : "visible",
        "hidden" === document.body.className ? (s_oMain.stopUpdate(),
        s_bFocus = !1) : (s_oMain.startUpdate(),
        s_bFocus = !0))
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
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
        null !== s_oLevelMenu && s_oLevelMenu.resetFullscreenBut()
    });
function CSpriteLibrary() {
    var a = {}, e, f, g, k, l, r;
    this.init = function(p, h, d) {
        e = {};
        g = f = 0;
        k = p;
        l = h;
        r = d
    }
    ;
    this.addSprite = function(p, h) {
        if (!a.hasOwnProperty(p)) {
            var d = new Image;
            a[p] = e[p] = {
                szPath: h,
                oSprite: d,
                bLoaded: !1
            };
            f++
        }
    }
    ;
    this.getSprite = function(p) {
        return a.hasOwnProperty(p) ? a[p].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        f = 0;
        l.call(r)
    }
    ;
    this._onSpriteLoaded = function() {
        k.call(r);
        ++g === f && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var p in e)
            e[p].oSprite.oSpriteLibrary = this,
            e[p].oSprite.szKey = p,
            e[p].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            e[p].oSprite.onerror = function(h) {
                var d = h.currentTarget;
                setTimeout(function() {
                    e[d.szKey].oSprite.src = e[d.szKey].szPath
                }, 500)
            }
            ,
            e[p].oSprite.src = e[p].szPath
    }
    ;
    this.setLoaded = function(p) {
        a[p].bLoaded = !0
    }
    ;
    this.isLoaded = function(p) {
        return a[p].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return f
    }
}
var CANVAS_WIDTH = 1500, CANVAS_HEIGHT = 640, EDGEBOARD_X = 300, EDGEBOARD_Y = 0, FONT_GAME = "walibi0615bold", FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, GAME_STATE_IDLE = 0, GAME_STATE_SPINNING = 1, GAME_STATE_SHOW_ALL_WIN = 2, GAME_STATE_SHOW_WIN = 3, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, REEL_OFFSET_X = 380, REEL_OFFSET_Y = 123, NUM_REELS = 5, NUM_ROWS = 3, NUM_SYMBOLS = 10, WILD_SYMBOL = 10, BONUS_SYMBOL = 9, NUM_PAYLINES = 5, SYMBOL_SIZE = 140, SPACE_BETWEEN_SYMBOLS = 10, MAX_FRAMES_REEL_EASE = 16, MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE, REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE, TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET, MAX_BET, TOTAL_MONEY, MAX_NUM_HOLD, NUM_PRIZES = 3, NUM_SYMBOLS_FOR_BONUS = 3, PERC_WIN_BONUS_PRIZE_1, PERC_WIN_BONUS_PRIZE_2, PERC_WIN_BONUS_PRIZE_3, SOUNDTRACK_VOLUME = .5, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, BONUS_OCCURRENCE, PAYTABLE_VALUES, BONUS_PRIZE = [[5, 50, 100], [10, 100, 200], [50, 200, 500]], ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, SOUNDTRACK_VOLUME_IN_GAME = 1;
function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolsOccurence();
        this._initBonus()
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
        }]]
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
    this._initSymbolWin = function() {
        s_aSymbolWin = [];
        s_aSymbolWin[0] = PAYTABLE_VALUES[0];
        s_aSymbolWin[1] = PAYTABLE_VALUES[1];
        s_aSymbolWin[2] = PAYTABLE_VALUES[2];
        s_aSymbolWin[3] = PAYTABLE_VALUES[3];
        s_aSymbolWin[4] = PAYTABLE_VALUES[4];
        s_aSymbolWin[5] = PAYTABLE_VALUES[5];
        s_aSymbolWin[6] = PAYTABLE_VALUES[6];
        s_aSymbolWin[7] = PAYTABLE_VALUES[7]
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
        for (a = 0; 7 > a; a++)
            s_aRandSymbols.push(7);
        for (a = 0; 8 > a; a++)
            s_aRandSymbols.push(8);
        for (a = 0; 2 > a; a++)
            s_aRandSymbols.push(9);
        for (a = 0; 1 > a; a++)
            s_aRandSymbols.push(10)
    }
    ;
    this._initBonus = function() {
        s_aBonusItemOccurence = [];
        var a;
        for (a = 0; a < PERC_WIN_BONUS_PRIZE_1; a++)
            s_aBonusItemOccurence.push(0);
        for (a = 0; a < PERC_WIN_BONUS_PRIZE_2; a++)
            s_aBonusItemOccurence.push(1);
        for (a = 0; a < PERC_WIN_BONUS_PRIZE_3; a++)
            s_aBonusItemOccurence.push(2)
    }
    ;
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols, s_aBonusItemOccurence;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HOLD = "HOLD";
TEXT_HELP_WILD = "JOLLY SYMBOL CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_HELP_BONUS = "3 OR MORE RIBBON BOW LET YOU PLAY THE BONUS GAME!";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
var TEXT_PRELOADER_CONTINUE = "START"
  , TEXT_NO_MONEY = "NO MONEY! DO YOU WANT TO RECHARGE?"
  , TEXT_RECHARGE = "RECHARGE"
  , TEXT_EXIT = "EXIT";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_MSG_SHARE1 = "You collected <strong>";
TEXT_MSG_SHARE2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_MSG_SHARING1 = "My score is ";
TEXT_MSG_SHARING2 = " points! Can you do better?";
function CPreloader() {
    var a, e, f, g, k, l, r, p, h;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        h = new createjs.Container;
        s_oStage.addChild(h)
    }
    ;
    this.unload = function() {
        h.removeAllChildren()
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
        h.addChild(d);
        d = s_oSpriteLibrary.getSprite("200x200");
        r = createBitmap(d);
        r.regX = .5 * d.width;
        r.regY = .5 * d.height;
        r.x = CANVAS_WIDTH / 2;
        r.y = CANVAS_HEIGHT / 2 - 180;
        h.addChild(r);
        p = new createjs.Shape;
        p.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(r.x - 100, r.y - 100, 200, 200, 10);
        h.addChild(p);
        r.mask = p;
        d = s_oSpriteLibrary.getSprite("progress_bar");
        g = createBitmap(d);
        g.x = CANVAS_WIDTH / 2 - d.width / 2;
        g.y = CANVAS_HEIGHT / 2 + 50;
        h.addChild(g);
        a = d.width;
        e = d.height;
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, 1, e);
        h.addChild(k);
        g.mask = k;
        f = new createjs.Text("","30px " + FONT_GAME,"#fff");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 + 100;
        f.textBaseline = "alphabetic";
        f.textAlign = "center";
        h.addChild(f);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(l);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(l);
            h.removeChild(l)
        })
    }
    ;
    this.refreshLoader = function(d) {
        f.text = d + "%";
        100 === d && (s_oMain._onRemovePreloader(),
        f.visible = !1,
        g.visible = !1);
        k.graphics.clear();
        d = Math.floor(d * a / 100);
        k.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, d, e)
    }
    ;
    this._init()
}
function CMain(a) {
    var e, f = 0, g = 0, k = STATE_LOADING, l, r;
    this.initContainer = function() {
        var d = document.getElementById("canvas");
        s_oStage = new createjs.Stage(d);
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        l = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        e = !0
    }
    ;
    this.soundLoaded = function() {
        f++;
        l.refreshLoader(Math.floor(f / g * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !0,
            volume: 1,
            ingamename: "win"
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
            filename: "reels",
            loop: !1,
            volume: 1,
            ingamename: "reels"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_item_choosen",
            loop: !1,
            volume: 1,
            ingamename: "bonus_item_choosen"
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
            filename: "reveal_prize",
            loop: !1,
            volume: 1,
            ingamename: "reveal_prize"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_hold",
            loop: !1,
            volume: 1,
            ingamename: "press_hold"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack_bonus",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        g += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var d = 0; d < s_aSoundsInfo.length; d++)
            this.tryToLoadSound(s_aSoundsInfo[d], !1)
    }
    ;
    this.tryToLoadSound = function(d, v) {
        setTimeout(function() {
            s_aSounds[d.ingamename] = new Howl({
                src: [d.path + d.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: d.loop,
                volume: d.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(z, m) {
                    for (var u = 0; u < s_aSoundsInfo.length; u++)
                        if (z === s_aSounds[s_aSoundsInfo[u].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[u], !0);
                            break
                        }
                },
                onplayerror: function(z) {
                    for (var m = 0; m < s_aSoundsInfo.length; m++)
                        if (z === s_aSounds[s_aSoundsInfo[m].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[m].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[m].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[m].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, v ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("but_play_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hit_area_col", "./sprites/hit_area_col.png");
        s_oSpriteLibrary.addSprite("hold_col", "./sprites/hold_col.png");
        s_oSpriteLibrary.addSprite("bonus_bg", "./sprites/bonus_bg.jpg");
        s_oSpriteLibrary.addSprite("star_bonus", "./sprites/star_bonus.png");
        s_oSpriteLibrary.addSprite("bonus_item", "./sprites/bonus_item.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        for (var d = 1; d < NUM_SYMBOLS + 1; d++)
            s_oSpriteLibrary.addSprite("symbol_" + d, "./sprites/symbol_" + d + ".png"),
            s_oSpriteLibrary.addSprite("symbol_" + d + "_anim", "./sprites/symbol_" + d + "_anim.png");
        for (d = 1; d < NUM_PAYLINES + 1; d++)
            s_oSpriteLibrary.addSprite("payline_" + d, "./sprites/payline_" + d + ".png");
        for (d = 0; 25 > d; d++)
            s_oSpriteLibrary.addSprite("bonus_item_" + d, "./sprites/bonus_item/bonus_item_" + d + ".png");
        g += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        f++;
        l.refreshLoader(Math.floor(f / g * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this._onRemovePreloader = function() {
        l.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        k = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        r = new CGame(p);
        k = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        k = STATE_HELP
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
    this._update = function(d) {
        if (!1 !== e) {
            var v = (new Date).getTime();
            s_iTimeElaps = v - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = v;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            k === STATE_GAME && r.update();
            s_oStage.update(d)
        }
    }
    ;
    s_oMain = this;
    var p = a;
    PAYTABLE_VALUES = [];
    for (var h = 0; 8 > h; h++)
        PAYTABLE_VALUES[h] = a["paytable_symbol_" + (h + 1)];
    ENABLE_FULLSCREEN = p.fullscreen;
    ENABLE_CHECK_ORIENTATION = p.check_orientation;
    SHOW_CREDITS = p.show_credits;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_bFullscreen = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null;
function CTextButton(a, e, f, g, k, l, r, p) {
    var h, d, v, z, m, u, q, x, F, A;
    this._init = function(c, n, G, y, E, L, B) {
        h = !1;
        d = 1;
        v = [];
        z = [];
        A = createBitmap(G);
        x = new createjs.Container;
        x.x = c;
        x.y = n;
        x.regX = G.width / 2;
        x.regY = G.height / 2;
        s_bMobile || (x.cursor = "pointer");
        x.addChild(A, F);
        p.addChild(x);
        F = new CTLText(x,10,10,G.width - 20,G.height - 20,B,"center",L,E,1.1,2,2,y,!0,!0,!1,!1);
        this._initListener()
    }
    ;
    this.unload = function() {
        x.off("mousedown", m);
        x.off("pressup", u);
        p.removeChild(x)
    }
    ;
    this.setVisible = function(c) {
        x.visible = c
    }
    ;
    this.setAlign = function(c) {
        F.textAlign = c
    }
    ;
    this.setTextX = function(c) {
        F.x = c
    }
    ;
    this.setScale = function(c) {
        d = x.scaleX = x.scaleY = c
    }
    ;
    this.enable = function() {
        h = !1
    }
    ;
    this.disable = function() {
        h = !0
    }
    ;
    this._initListener = function() {
        m = x.on("mousedown", this.buttonDown);
        u = x.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(c, n, G) {
        v[c] = n;
        z[c] = G
    }
    ;
    this.addEventListenerWithParams = function(c, n, G, y) {
        v[c] = n;
        z[c] = G;
        q = y
    }
    ;
    this.buttonRelease = function() {
        h || (playSound("press_but", 1, !1),
        x.scaleX = d,
        x.scaleY = d,
        v[ON_MOUSE_UP] && v[ON_MOUSE_UP].call(z[ON_MOUSE_UP], q))
    }
    ;
    this.buttonDown = function() {
        h || (x.scaleX = .9 * d,
        x.scaleY = .9 * d,
        v[ON_MOUSE_DOWN] && v[ON_MOUSE_DOWN].call(z[ON_MOUSE_DOWN]))
    }
    ;
    this.setPosition = function(c, n) {
        x.x = c;
        x.y = n
    }
    ;
    this.tweenPosition = function(c, n, G, y, E, L, B) {
        createjs.Tween.get(x).wait(y).to({
            x: c,
            y: n
        }, G, E).call(function() {
            void 0 !== L && L.call(B)
        })
    }
    ;
    this.changeText = function(c) {
        F.refreshText(c)
    }
    ;
    this.setX = function(c) {
        x.x = c
    }
    ;
    this.setY = function(c) {
        x.y = c
    }
    ;
    this.getButtonImage = function() {
        return x
    }
    ;
    this.getX = function() {
        return x.x
    }
    ;
    this.getY = function() {
        return x.y
    }
    ;
    this.getSprite = function() {
        return x
    }
    ;
    this.getScale = function() {
        return x.scaleX
    }
    ;
    this._init(a, e, f, g, k, l, r)
}
function CGfxButton(a, e, f, g) {
    var k, l, r, p, h, d, v, z, m;
    this._init = function(u, q, x, F) {
        k = !1;
        p = [];
        h = [];
        m = createBitmap(x);
        m.x = u;
        m.y = q;
        l = x.width;
        r = x.height;
        m.regX = x.width / 2;
        m.regY = x.height / 2;
        m.cursor = "pointer";
        !1 !== F && s_oStage.addChild(m);
        this._initListener()
    }
    ;
    this.unload = function() {
        m.off("mousedown", d);
        m.off("pressup", v);
        s_oStage.removeChild(m)
    }
    ;
    this.setVisible = function(u) {
        m.visible = u
    }
    ;
    this.enable = function() {
        k = !1;
        m.filters = [];
        m.cache(0, 0, l, r)
    }
    ;
    this.disable = function() {
        k = !0;
        var u = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        m.filters = [new createjs.ColorMatrixFilter(u)];
        m.cache(0, 0, l, r)
    }
    ;
    this._initListener = function() {
        d = m.on("mousedown", this.buttonDown);
        v = m.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(u, q, x) {
        p[u] = q;
        h[u] = x
    }
    ;
    this.addEventListenerWithParams = function(u, q, x, F) {
        p[u] = q;
        h[u] = x;
        z = F
    }
    ;
    this.buttonRelease = function() {
        k || (playSound("press_but", 1, !1),
        m.scaleX = 1,
        m.scaleY = 1,
        p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(h[ON_MOUSE_UP], z))
    }
    ;
    this.buttonDown = function() {
        k || (m.scaleX = .9,
        m.scaleY = .9,
        p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], z))
    }
    ;
    this.setPosition = function(u, q) {
        m.x = u;
        m.y = q
    }
    ;
    this.setX = function(u) {
        m.x = u
    }
    ;
    this.setY = function(u) {
        m.y = u
    }
    ;
    this.getButtonImage = function() {
        return m
    }
    ;
    this.getX = function() {
        return m.x
    }
    ;
    this.getY = function() {
        return m.y
    }
    ;
    this.getSprite = function() {
        return m
    }
    ;
    this._init(a, e, f, g);
    return this
}
function CToggle(a, e, f, g, k) {
    var l, r, p, h, d, v, z;
    this._init = function(m, u, q, x, F) {
        z = void 0 !== F ? F : s_oStage;
        r = [];
        p = [];
        F = new createjs.SpriteSheet({
            images: [q],
            frames: {
                width: q.width / 2,
                height: q.height,
                regX: q.width / 2 / 2,
                regY: q.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        l = x;
        h = createSprite(F, "state_" + l, q.width / 2 / 2, q.height / 2, q.width / 2, q.height);
        h.x = m;
        h.y = u;
        h.stop();
        s_bMobile || (h.cursor = "pointer");
        z.addChild(h);
        this._initListener()
    }
    ;
    this.unload = function() {
        h.off("mousedown", d);
        h.off("pressup", v);
        z.removeChild(h)
    }
    ;
    this._initListener = function() {
        d = h.on("mousedown", this.buttonDown);
        v = h.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(m, u, q) {
        r[m] = u;
        p[m] = q
    }
    ;
    this.setCursorType = function(m) {
        h.cursor = m
    }
    ;
    this.setActive = function(m) {
        l = m;
        h.gotoAndStop("state_" + l)
    }
    ;
    this.buttonRelease = function() {
        h.scaleX = 1;
        h.scaleY = 1;
        playSound("press_but", 1, !1);
        l = !l;
        h.gotoAndStop("state_" + l);
        r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(p[ON_MOUSE_UP], l)
    }
    ;
    this.buttonDown = function() {
        h.scaleX = .9;
        h.scaleY = .9;
        r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(m, u) {
        h.x = m;
        h.y = u
    }
    ;
    this._init(a, e, f, g, k)
}
function CBetBut(a, e, f) {
    var g, k, l, r = [], p;
    this._init = function(h, d, v) {
        g = !1;
        k = [];
        l = [];
        v = s_oSpriteLibrary.getSprite("bet_but");
        var z = new createjs.SpriteSheet({
            images: [v],
            frames: {
                width: v.width / 2,
                height: v.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        p = createSprite(z, "on", 0, 0, v.width / 2, v.height);
        p.stop();
        p.x = h;
        p.y = d;
        p.regX = v.width / 2;
        p.regY = v.height / 2;
        p.cursor = "pointer";
        s_oStage.addChild(p);
        this._initListener()
    }
    ;
    this.unload = function() {
        p.off("mousedown", this.buttonDown);
        p.off("pressup", this.buttonRelease);
        s_oStage.removeChild(p)
    }
    ;
    this.disable = function(h) {
        g = h
    }
    ;
    this.setVisible = function(h) {
        p.visible = h
    }
    ;
    this.setOn = function() {
        p.gotoAndStop("on")
    }
    ;
    this.setOff = function() {
        p.gotoAndStop("off")
    }
    ;
    this._initListener = function() {
        p.on("mousedown", this.buttonDown);
        p.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(h, d, v) {
        k[h] = d;
        l[h] = v
    }
    ;
    this.addEventListenerWithParams = function(h, d, v, z) {
        k[h] = d;
        l[h] = v;
        r = z
    }
    ;
    this.buttonRelease = function() {
        k[ON_MOUSE_UP] && !1 === g && (playSound("press_but", 1, !1),
        k[ON_MOUSE_UP].call(l[ON_MOUSE_UP], r))
    }
    ;
    this.buttonDown = function() {
        k[ON_MOUSE_DOWN] && !1 === g && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], r)
    }
    ;
    this.setPosition = function(h, d) {
        p.x = h;
        p.y = d
    }
    ;
    this.setX = function(h) {
        p.x = h
    }
    ;
    this.setY = function(h) {
        p.y = h
    }
    ;
    this.getButtonImage = function() {
        return p
    }
    ;
    this.getX = function() {
        return p.x
    }
    ;
    this.getY = function() {
        return p.y
    }
    ;
    this._init(a, e, f)
}
function CMenu() {
    var a, e, f, g, k, l, r = null, p = null, h, d, v, z, m, u;
    this._init = function() {
        v = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(v);
        var q = s_oSpriteLibrary.getSprite("but_play_bg");
        z = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 60,q,TEXT_PLAY,FONT_GAME,"#ffffff",32,s_oStage);
        z.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            q = s_oSpriteLibrary.getSprite("audio_icon"),
            k = CANVAS_WIDTH - q.width / 4 - 10,
            l = q.height / 2 + 10,
            m = new CToggle(k,l,q,s_bAudioActive,s_oStage),
            m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            null === s_oSoundTrack && (s_oSoundTrack = playSound("soundtrack", SOUNDTRACK_VOLUME, !0));
        SHOW_CREDITS ? (q = s_oSpriteLibrary.getSprite("but_credits"),
        a = q.height / 2 + 10,
        e = q.height / 2 + 10,
        h = new CGfxButton(a,e,q,s_oStage),
        h.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        f = a + q.width,
        g = e) : (f = q.height / 2 + 10,
        g = q.height / 2 + 10);
        q = window.document;
        var x = q.documentElement;
        r = x.requestFullscreen || x.mozRequestFullScreen || x.webkitRequestFullScreen || x.msRequestFullscreen;
        p = q.exitFullscreen || q.mozCancelFullScreen || q.webkitExitFullscreen || q.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (r = !1);
        r && screenfull.isEnabled && (q = s_oSpriteLibrary.getSprite("but_fullscreen"),
        d = new CToggle(f,g,q,s_bFullscreen,s_oStage),
        d.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        u = new createjs.Shape;
        u.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(u);
        createjs.Tween.get(u).to({
            alpha: 0
        }, 600).call(function() {
            u.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(q, x) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || m.setPosition(k - q, x + l);
        SHOW_CREDITS && h.setPosition(a + q, e + x);
        r && screenfull.isEnabled && d.setPosition(f + q, g + x)
    }
    ;
    this.unload = function() {
        z.unload();
        z = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            m.unload(),
            m = null;
        SHOW_CREDITS && h.unload();
        r && screenfull.isEnabled && d.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
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
        r && screenfull.isEnabled && d.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? p.call(window.document) : r.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var e = !1, f, g, k = !0, l, r, p, h, d, v, z, m, u, q, x, F = 0, A, c, n, G, y, E, L, B, H, P, S, C, W, K, X = null, Z, T;
    this._init = function() {
        l = GAME_STATE_IDLE;
        f = !0;
        c = x = h = r = 0;
        E = [0, 1, 2, 3, 4];
        p = E[0];
        d = NUM_PAYLINES;
        q = TOTAL_MONEY;
        m = MIN_BET;
        u = m * d;
        L = [];
        for (var b = 0; b < NUM_ROWS; b++) {
            L[b] = [];
            for (var t = 0; t < NUM_REELS; t++)
                L[b][t] = 0
        }
        s_oTweenController = new CTweenController;
        C = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(C);
        this._initReels();
        W = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(W);
        this._initStaticSymbols();
        this._initHitAreaColumn();
        K = new CInterface(m,u,q);
        Z = new CBonusPanel;
        X = new CPayTablePanel;
        T = new CRechargePanel;
        q < u && (T.show(),
        K.disableSpin());
        e = !0
    }
    ;
    this.unload = function() {
        stopSound("reels");
        stopSound("soundtrack");
        s_oSoundTrack = null;
        s_oStage.removeChild(C);
        s_oStage.removeChild(W);
        K.unload();
        X.unload();
        T.unload();
        for (var b = 0; b < n.length; b++)
            n[b].unload();
        for (b = 0; b < NUM_ROWS; b++)
            for (var t = 0; t < NUM_REELS; t++)
                G[b][t].unload();
        Z.unload()
    }
    ;
    this._initReels = function() {
        var b = REEL_OFFSET_X
          , t = REEL_OFFSET_Y
          , I = 0;
        n = [];
        for (var M = 0; M < NUM_REELS; M++)
            n[M] = new CReelColumn(M,b,t,I),
            n[M + NUM_REELS] = new CReelColumn(M + NUM_REELS,b,t + SYMBOL_SIZE * NUM_ROWS,I),
            b += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS,
            I += REEL_DELAY
    }
    ;
    this._initStaticSymbols = function() {
        var b = REEL_OFFSET_X
          , t = REEL_OFFSET_Y;
        G = [];
        for (var I = 0; I < NUM_ROWS; I++) {
            G[I] = [];
            for (var M = 0; M < NUM_REELS; M++) {
                var J = new CStaticSymbolCell(I,M,b,t);
                G[I][M] = J;
                b += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            b = REEL_OFFSET_X;
            t += SYMBOL_SIZE
        }
    }
    ;
    this._initHitAreaColumn = function() {
        S = [];
        P = [];
        I = 376;
        M = 120;
        for (var b = 0; b < NUM_REELS; b++) {
            var t = createBitmap(s_oSpriteLibrary.getSprite("hold_col"));
            t.x = I;
            t.y = M;
            t.visible = !1;
            s_oStage.addChild(t);
            I += 150;
            P.push(t);
            S[b] = !1
        }
        B = [];
        H = [];
        var I = 381
          , M = 108;
        b = s_oSpriteLibrary.getSprite("hit_area_col");
        for (t = 0; t < NUM_REELS; t++) {
            var J = new CTLText(s_oStage,I,M + b.height - 20,b.width,22,22,"center","#fff",FONT_GAME,1,0,0," ",!0,!0,!1,!1);
            J.setShadow("#000", 2, 2, 2);
            B[t] = J;
            J = new CGfxButton(I + b.width / 2,M + b.height / 2,b);
            J.setVisible(!1);
            J.addEventListenerWithParams(ON_MOUSE_UP, this._onHitAreaCol, this, {
                index: t
            });
            I += 150;
            H.push(J)
        }
    }
    ;
    this.generateFinalSymbols = function() {
        for (var b = 0; b < NUM_ROWS; b++)
            for (var t = 0; t < NUM_REELS; t++)
                !1 === n[t].isHold() && (L[b][t] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]);
        b = this._checkForCombos();
        this._checkForBonus();
        return b
    }
    ;
    this._checkForCombos = function() {
        y = [];
        for (var b = A = 0; b < d; b++) {
            var t = s_aPaylineCombo[b]
              , I = []
              , M = L[t[0].row][t[0].col];
            if (M !== BONUS_SYMBOL) {
                var J = 1
                  , w = 1;
                for (I.push({
                    row: t[0].row,
                    col: t[0].col,
                    value: L[t[0].row][t[0].col]
                }); M === WILD_SYMBOL && w < NUM_REELS; )
                    J++,
                    M = L[t[w].row][t[w].col],
                    I.push({
                        row: t[w].row,
                        col: t[w].col,
                        value: L[t[w].row][t[w].col]
                    }),
                    w++;
                for (; w < t.length; w++)
                    if (L[t[w].row][t[w].col] === M || L[t[w].row][t[w].col] === WILD_SYMBOL) {
                        if (L[t[w].row][t[w].col] === BONUS_SYMBOL)
                            break;
                        J++;
                        I.push({
                            row: t[w].row,
                            col: t[w].col,
                            value: L[t[w].row][t[w].col]
                        })
                    } else
                        break;
                M !== BONUS_SYMBOL && 0 < s_aSymbolWin[M - 1][J - 1] && (A += s_aSymbolWin[M - 1][J - 1],
                y.push({
                    line: b + 1,
                    amount: s_aSymbolWin[M - 1][J - 1],
                    num_win: J,
                    value: M,
                    list: I
                }))
            }
        }
        return A * m > u ? !0 : !1
    }
    ;
    this._checkForBonus = function() {
        g = !1;
        F = 0;
        for (var b = [], t = 0; t < NUM_ROWS; t++)
            for (var I = 0; I < NUM_REELS; I++)
                L[t][I] === BONUS_SYMBOL && (b.push({
                    row: t,
                    col: I,
                    value: L[t][I]
                }),
                F++);
        F >= NUM_SYMBOLS_FOR_BONUS && (y.push({
            line: -1,
            amount: 0,
            num_win: F,
            value: BONUS_SYMBOL,
            list: b
        }),
        5 < F && (F = 5),
        g = !0)
    }
    ;
    this._generateRandSymbols = function() {
        for (var b = [], t = 0; t < NUM_ROWS; t++)
            b[t] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return b
    }
    ;
    this.reelArrived = function(b, t) {
        if (r > MIN_REEL_LOOPS)
            if (p === t) {
                if (!1 === n[b].isReadyToStop()) {
                    var I = b;
                    b < NUM_REELS ? (I += NUM_REELS,
                    n[I].setReadyToStop(),
                    n[b].restart([L[0][b], L[1][b], L[2][b]], !0)) : (I -= NUM_REELS,
                    n[I].setReadyToStop(),
                    n[b].restart([L[0][I], L[1][I], L[2][I]], !0))
                }
            } else
                n[b].restart(this._generateRandSymbols(), !1);
        else
            n[b].restart(this._generateRandSymbols(), !1),
            0 === b && r++
    }
    ;
    this.increaseReelLoops = function() {
        r += 2
    }
    ;
    this.stopNextReel = function() {
        h++;
        0 === h % 2 && (playSound("reel_stop", .3, !1),
        p = E[h / 2],
        h === 2 * NUM_REELS && this._endReelAnimation())
    }
    ;
    this._endReelAnimation = function() {
        stopSound("reels");
        h = r = 0;
        p = E[0];
        for (var b = 0; b < NUM_REELS; b++)
            S[b] = !1,
            P[b].visible = !1,
            n[b].setHold(!1),
            n[b + NUM_REELS].setHold(!1);
        x = 0;
        if (0 < y.length) {
            for (var t = 0; t < y.length; t++) {
                X.highlightCombo(y[t].value, y[t].num_win);
                -1 !== y[t].line && K.showLine(y[t].line);
                var I = y[t].list;
                for (b = 0; b < I.length; b++)
                    G[I[b].row][I[b].col].show(I[b].value)
            }
            A *= m;
            q += A;
            SLOT_CASH -= A;
            0 < A && (K.refreshMoney(q),
            K.refreshWinText(A));
            v = 0;
            l = GAME_STATE_SHOW_ALL_WIN;
            playSound("win", 1, !1);
            f = !0;
            !1 === g && (K.disableBetBut(!1),
            K.enableGuiButtons())
        } else
            f ? (this.enableColumnHitArea(),
            f = !1,
            K.enableSpin(),
            K.disableMaxBet()) : (K.disableBetBut(!1),
            K.enableGuiButtons(),
            f = !0),
            l = GAME_STATE_IDLE;
        c++;
        c === aa && (c = 0,
        $(s_oMain).trigger("show_interlevel_ad"));
        $(s_oMain).trigger("save_score", q)
    }
    ;
    this.hidePayTable = function() {
        X.hide()
    }
    ;
    this._showWin = function() {
        if (0 < z) {
            stopSound("win");
            if (-1 !== y[z - 1].line) {
                var b = y[z - 1].line;
                K.hideLine(b)
            }
            b = y[z - 1].list;
            for (var t = 0; t < b.length; t++)
                G[b[t].row][b[t].col].stopAnim()
        }
        z === y.length && (z = 0);
        -1 !== y[z].line && (b = y[z].line,
        K.showLine(b));
        b = y[z].list;
        for (t = 0; t < b.length; t++)
            G[b[t].row][b[t].col].show(b[t].value);
        z++
    }
    ;
    this._hideAllWins = function() {
        for (var b = 0; b < y.length; b++)
            for (var t = y[b].list, I = 0; I < t.length; I++)
                G[t[I].row][t[I].col].stopAnim();
        K.hideAllLines();
        z = v = 0;
        v = TIME_SHOW_WIN;
        l = GAME_STATE_SHOW_WIN;
        g && Z.show(F, m)
    }
    ;
    this.enableColumnHitArea = function() {
        for (var b = 0; b < NUM_REELS; b++)
            B[b].refreshText(TEXT_HOLD),
            H[b].setVisible(!0)
    }
    ;
    this.disableColumnHitArea = function() {
        for (var b = 0; b < NUM_REELS; b++)
            B[b].refreshText(" "),
            H[b].setVisible(!1)
    }
    ;
    this.activateLines = function(b) {
        d = b;
        this.removeWinShowing();
        u = b = m * d;
        K.refreshTotalBet(u);
        K.refreshNumLines(d);
        b > q ? K.disableSpin() : K.enableSpin()
    }
    ;
    this.addLine = function() {
        d === NUM_PAYLINES ? d = 1 : d++;
        var b = m * d;
        u = b;
        u = Math.floor(100 * u) / 100;
        K.refreshTotalBet(u);
        K.refreshNumLines(d);
        b > q ? K.disableSpin() : K.enableSpin()
    }
    ;
    this.changeCoinBet = function() {
        var b = Math.floor(100 * (m + .05)) / 100;
        b > MAX_BET ? (m = MIN_BET,
        u = m * d,
        u = Math.floor(100 * u) / 100,
        K.refreshBet(m),
        K.refreshTotalBet(u),
        b = u) : (b *= d,
        b = Math.floor(100 * b) / 100,
        m += 5,
        m = Math.floor(100 * m) / 100,
        u = b,
        K.refreshBet(m),
        K.refreshTotalBet(u));
        b > q ? K.disableSpin() : K.enableSpin()
    }
    ;
    this.onMaxBet = function() {
        var b = MAX_BET;
        d = NUM_PAYLINES;
        b *= d;
        m = MAX_BET;
        u = b;
        K.refreshBet(m);
        K.refreshTotalBet(u);
        K.refreshNumLines(d);
        b > q ? (K.disableSpin(),
        T.show()) : (K.enableSpin(),
        this.onSpin())
    }
    ;
    this._onHitAreaCol = function(b) {
        b = b.index;
        !0 === S[b] ? (S[b] = !1,
        P[b].visible = !1,
        B[b].refreshText(TEXT_HOLD),
        x--,
        n[b].setHold(!1),
        n[b + NUM_REELS].setHold(!1)) : x < MAX_NUM_HOLD && (S[b] = !0,
        x++,
        P[b].visible = !0,
        B[b].refreshText(" "),
        n[b].setHold(!0),
        n[b + NUM_REELS].setHold(!0),
        playSound("press_hold", 1, !1))
    }
    ;
    this.removeWinShowing = function() {
        X.resetHighlightCombo();
        K.resetWin();
        for (var b = 0; b < NUM_ROWS; b++)
            for (var t = 0; t < NUM_REELS; t++)
                G[b][t].hide();
        for (b = 0; b < n.length; b++)
            n[b].activate();
        l = GAME_STATE_IDLE
    }
    ;
    this.endBonus = function(b) {
        b *= m;
        q += b;
        K.refreshMoney(q);
        SLOT_CASH -= b;
        K.disableBetBut(!1);
        K.enableGuiButtons();
        $(s_oMain).trigger("bonus_end", q);
        $(s_oMain).trigger("save_score", q)
    }
    ;
    this.setMoney = function(b) {
        q = b;
        K.refreshMoney(q);
        K.enableGuiButtons()
    }
    ;
    this.onSpin = function() {
        if (f && q < u)
            T.show();
        else {
            stopSound("win");
            playSound("reels", .3, !1);
            this.disableColumnHitArea();
            K.disableBetBut(!0);
            this.removeWinShowing();
            MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
            for (var b = 0; b < s_aSymbolWin.length; b++)
                for (var t = s_aSymbolWin[b], I = 0; I < t.length; I++)
                    0 !== t[I] && t[I] < MIN_WIN && (MIN_WIN = t[I]);
            MIN_WIN *= m;
            f && (q -= u,
            K.refreshMoney(q),
            SLOT_CASH += u,
            $(s_oMain).trigger("bet_placed", {
                bet: m,
                tot_bet: u
            }));
            if (!k && n[0].visible && n[1].visible && this._checkForCombos())
                this._assignWin();
            else if (SLOT_CASH < MIN_WIN) {
                do
                    b = this.generateFinalSymbols();
                while (!0 === b || g)
            } else if (Math.floor(100 * Math.random()) > WIN_OCCURRENCE) {
                do
                    b = this.generateFinalSymbols();
                while (!0 === b || g)
            } else
                this._assignWin();
            K.hideAllLines();
            K.disableGuiButtons();
            k = !1;
            l = GAME_STATE_SPINNING
        }
    }
    ;
    this._assignWin = function() {
        if (SLOT_CASH < BONUS_PRIZE[0][0] * m) {
            var b = 0;
            do {
                var t = this.generateFinalSymbols();
                b++
            } while ((!1 === t || A * m > SLOT_CASH || g) && 1E4 >= b)
        } else if (Math.floor(100 * Math.random()) >= BONUS_OCCURRENCE) {
            b = 0;
            do
                t = this.generateFinalSymbols(),
                b++;
            while ((!1 === t || A * m > SLOT_CASH || g) && 1E4 >= b)
        } else {
            b = 0;
            do {
                t = this.generateFinalSymbols();
                var I = 0;
                g && (I = F - 3);
                b++
            } while ((!1 === t || A * m + BONUS_PRIZE[I][0] * m > SLOT_CASH || !1 === g) && 1E4 >= b)
        }
        if (1E4 < b) {
            do
                t = this.generateFinalSymbols();
            while (!0 === t || g)
        }
    }
    ;
    this.onInfoClicked = function() {
        l !== GAME_STATE_SPINNING && (X.isVisible() ? X.hide() : X.show())
    }
    ;
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", {
            img: "200x200.jpg",
            title: TEXT_CONGRATULATIONS,
            msg: TEXT_MSG_SHARE1 + q + TEXT_MSG_SHARE2,
            msg_share: TEXT_MSG_SHARING1 + q + TEXT_MSG_SHARING2
        })
    }
    ;
    this.getState = function() {
        return l
    }
    ;
    this.update = function() {
        if (!1 !== e)
            switch (l) {
            case GAME_STATE_SPINNING:
                for (var b = 0; b < n.length; b++)
                    n[b].update(p);
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                v += s_iTimeElaps;
                v > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                v += s_iTimeElaps,
                v > TIME_SHOW_WIN && (v = 0,
                this._showWin())
            }
    }
    ;
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    SLOT_CASH = a.slot_cash;
    BONUS_OCCURRENCE = a.bonus_occurrence;
    MIN_REEL_LOOPS = a.min_reel_loop;
    REEL_DELAY = a.reel_delay;
    TIME_SHOW_WIN = a.time_show_win;
    TIME_SHOW_ALL_WINS = a.time_show_all_wins;
    TOTAL_MONEY = a.money;
    MIN_BET = a.min_bet;
    MAX_BET = a.max_bet;
    MAX_NUM_HOLD = a.max_hold;
    PERC_WIN_BONUS_PRIZE_1 = a.perc_win_bonus_prize_1;
    PERC_WIN_BONUS_PRIZE_2 = a.perc_win_bonus_prize_2;
    PERC_WIN_BONUS_PRIZE_3 = a.perc_win_bonus_prize_3;
    var aa = a.num_spin_ads_showing;
    new CSlotSettings;
    this._init()
}
var s_oGame, s_oTweenController;
function CReelColumn(a, e, f, g) {
    var k, l, r, p, h, d, v, z, m, u, q, x, F, A, c;
    this._init = function(n, G, y, E) {
        p = r = l = k = !1;
        z = 0;
        h = n;
        v = E;
        d = h < NUM_REELS ? h : h - NUM_REELS;
        u = 0;
        q = MAX_FRAMES_REEL_EASE;
        m = REEL_STATE_START;
        x = y;
        F = x + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(G, y)
    }
    ;
    this.initContainer = function(n, G) {
        c = new createjs.Container;
        c.x = n;
        c.y = G;
        var y = 0;
        A = [];
        for (var E = 0; E < NUM_ROWS; E++) {
            var L = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            L.stop();
            L.x = 0;
            L.y = y;
            c.addChild(L);
            A[E] = L;
            y += SYMBOL_SIZE
        }
        s_oStage.addChild(c)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(c)
    }
    ;
    this.activate = function() {
        x = c.y;
        F = x + SYMBOL_SIZE * NUM_ROWS;
        k = !0
    }
    ;
    this._setSymbol = function(n) {
        c.removeAllChildren();
        for (var G = 0, y = 0; y < n.length; y++) {
            var E = new createSprite(s_aSymbolData[n[y]],"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
            E.stop();
            E.x = 0;
            E.y = G;
            c.addChild(E);
            A[y] = E;
            G += SYMBOL_SIZE
        }
    }
    ;
    this.setHold = function(n) {
        k = !1;
        z = 0;
        p = n
    }
    ;
    this.restart = function(n, G) {
        c.y = x = REEL_START_Y;
        F = x + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(n);
        if (l = G) {
            u = 0;
            q = MAX_FRAMES_REEL_EASE;
            m = REEL_STATE_STOP;
            for (var y = 0; y < NUM_ROWS; y++)
                A[y].gotoAndStop("static");
            r = !0
        } else
            for (y = 0; y < NUM_ROWS; y++)
                A[y].gotoAndStop("moving")
    }
    ;
    this.setReadyToStop = function() {
        u = 0;
        q = MAX_FRAMES_REEL_EASE;
        m = REEL_STATE_STOP
    }
    ;
    this.isReadyToStop = function() {
        return l
    }
    ;
    this.isHold = function() {
        return p
    }
    ;
    this._updateStart = function() {
        0 === u && h < NUM_REELS && playSound("start_reel", .3, !1);
        u++;
        u > q && (u = 0,
        q /= 2,
        m++,
        x = c.y,
        F = x + SYMBOL_SIZE * NUM_ROWS);
        var n = s_oTweenController.easeInBack(u, 0, 1, q);
        n = s_oTweenController.tweenValue(x, F, n);
        c.y = n
    }
    ;
    this._updateMoving = function() {
        u++;
        u > q && (u = 0,
        x = c.y,
        F = x + SYMBOL_SIZE * NUM_ROWS);
        var n = s_oTweenController.easeLinear(u, 0, 1, q);
        n = s_oTweenController.tweenValue(x, F, n);
        c.y = n
    }
    ;
    this._updateStopping = function() {
        u++;
        if (u >= q)
            k = !1,
            u = 0,
            q = MAX_FRAMES_REEL_EASE,
            m = REEL_STATE_START,
            z = 0,
            l = !1,
            r && (r = !1,
            c.y = REEL_OFFSET_Y),
            s_oGame.stopNextReel();
        else {
            var n = s_oTweenController.easeOutCubic(u, 0, 1, q);
            n = s_oTweenController.tweenValue(x, F, n);
            c.y = n
        }
    }
    ;
    this.update = function(n) {
        if (!1 !== k && (z++,
        z > v))
            if (p)
                n === h && (k = !1,
                s_oGame.stopNextReel(),
                s_oGame.stopNextReel(),
                0 === h && s_oGame.increaseReelLoops());
            else
                switch (!1 === l && c.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(h, d),
                m) {
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
    this._init(a, e, f, g)
}
function CInterface(a, e, f) {
    var g, k, l, r, p, h, d, v, z = null, m = null, u, q, x, F, A, c, n, G, y, E, L, B;
    this._init = function(H, P, S) {
        var C = s_oSpriteLibrary.getSprite("but_exit");
        l = CANVAS_WIDTH - C.width / 2 - 10;
        r = C.height / 2 + 10;
        u = new CGfxButton(l,r,C,!0);
        u.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (C = s_oSpriteLibrary.getSprite("audio_icon"),
        p = u.getX() - C.width / 2,
        h = C.height / 2 + 10,
        A = new CToggle(p,h,C,s_bAudioActive,s_oStage),
        A.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        g = p - C.width / 2,
        k = h) : (g = u.getX() - C.width,
        k = C.height / 2 + 10);
        C = window.document;
        var W = C.documentElement;
        z = W.requestFullscreen || W.mozRequestFullScreen || W.webkitRequestFullScreen || W.msRequestFullscreen;
        m = C.exitFullscreen || C.mozCancelFullScreen || C.webkitExitFullscreen || C.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (z = !1);
        z && screenfull.isEnabled && (C = s_oSpriteLibrary.getSprite("but_fullscreen"),
        G = new CToggle(g,k,C,s_bFullscreen,s_oStage),
        G.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        C = s_oSpriteLibrary.getSprite("spin_but");
        q = new CTextButton(1090 + C.width / 2,CANVAS_HEIGHT - C.height / 2,C,"",FONT_GAME,"#ffde00",22,s_oStage);
        q.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        C = s_oSpriteLibrary.getSprite("info_but");
        x = new CTextButton(328 + C.width / 2,CANVAS_HEIGHT - C.height / 2,C,TEXT_INFO,FONT_GAME,"#ffffff",30,s_oStage);
        x.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        C = s_oSpriteLibrary.getSprite("but_lines_bg");
        F = new CTextButton(494 + C.width / 2,CANVAS_HEIGHT - C.height / 2,C,TEXT_LINES,FONT_GAME,"#ffffff",30,s_oStage);
        F.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        B = new CTLText(s_oStage,494,CANVAS_HEIGHT - 86,C.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,NUM_PAYLINES,!0,!0,!1,!1);
        B.setShadow("#000", 2, 2, 2);
        C = s_oSpriteLibrary.getSprite("coin_but");
        c = new CTextButton(680 + C.width / 2,CANVAS_HEIGHT - C.height / 2,C,TEXT_COIN,FONT_GAME,"#ffffff",30,s_oStage);
        c.addEventListener(ON_MOUSE_UP, this._onBet, this);
        y = new CTLText(s_oStage,680,CANVAS_HEIGHT - 86,C.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,H.toFixed(2),!0,!0,!1,!1);
        y.setShadow("#000", 2, 2, 2);
        C = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        n = new CTextButton(866 + C.width / 2,CANVAS_HEIGHT - C.height / 2,C,TEXT_MAX_BET,FONT_GAME,"#ffffff",30,s_oStage);
        n.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        L = new CTLText(s_oStage,866,CANVAS_HEIGHT - 86,C.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,TEXT_BET + ": " + P.toFixed(2),!0,!0,!1,!1);
        L.setShadow("#000", 2, 2, 2);
        E = new CTLText(s_oStage,349,22,C.width - 20,60,60,"center","#ffde00",FONT_GAME,1,0,0,TEXT_MONEY + "\n" + S.toFixed(2) + TEXT_CURRENCY,!0,!0,!0,!1);
        C = s_oSpriteLibrary.getSprite("bet_but");
        d = [];
        H = new CBetBut(328 + C.width / 2,276 + C.height / 2,C,!0);
        H.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        d[0] = H;
        H = new CBetBut(326 + C.width / 2,176 + C.height / 2,C,!0);
        H.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        d[1] = H;
        H = new CBetBut(326 + C.width / 2,426 + C.height / 2,C,!0);
        H.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        d[2] = H;
        H = new CBetBut(326 + C.width / 2,106 + C.height / 2,C,!0);
        H.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        d[3] = H;
        H = new CBetBut(326 + C.width / 2,495 + C.height / 2,C,!0);
        H.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        d[4] = H;
        v = [];
        for (H = 0; H < NUM_PAYLINES; H++)
            P = new createjs.Bitmap(s_oSpriteLibrary.getSprite("payline_" + (H + 1))),
            P.x = 0,
            P.y = 0,
            P.visible = !1,
            s_oStage.addChild(P),
            v[H] = P;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        u.unload();
        u = null;
        q.unload();
        q = null;
        x.unload();
        x = null;
        F.unload();
        F = null;
        c.unload();
        c = null;
        n.unload();
        n = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            A.unload(),
            A = null;
        z && screenfull.isEnabled && G.unload();
        for (var H = 0; H < NUM_PAYLINES; H++)
            d[H].unload();
        s_oStage.removeAllChildren();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(H, P) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || A.setPosition(p - H, P + h);
        z && screenfull.isEnabled && G.setPosition(g - H, k + P);
        u.setPosition(l - H, P + r)
    }
    ;
    this.refreshMoney = function(H) {
        E.refreshText(TEXT_MONEY + "\n" + H.toFixed(2) + TEXT_CURRENCY)
    }
    ;
    this.refreshBet = function(H) {
        y.refreshText(H.toFixed(2))
    }
    ;
    this.refreshTotalBet = function(H) {
        L.refreshText(TEXT_BET + ": " + H.toFixed(2))
    }
    ;
    this.refreshNumLines = function(H) {
        B.refreshText(H);
        for (var P = 0; P < NUM_PAYLINES; P++)
            P < H ? (d[P].setOn(),
            v[P].visible = !0) : d[P].setOff();
        setTimeout(function() {
            for (var S = 0; S < NUM_PAYLINES; S++)
                v[S].visible = !1
        }, 1E3)
    }
    ;
    this.resetWin = function() {
        q.changeText("")
    }
    ;
    this.refreshWinText = function(H) {
        q.changeText(TEXT_WIN + "\n" + H.toFixed(2))
    }
    ;
    this.showLine = function(H) {
        v[H - 1].visible = !0
    }
    ;
    this.hideLine = function(H) {
        v[H - 1].visible = !1
    }
    ;
    this.hideAllLines = function() {
        for (var H = 0; H < NUM_PAYLINES; H++)
            v[H].visible = !1
    }
    ;
    this.disableBetBut = function(H) {
        for (var P = 0; P < NUM_PAYLINES; P++)
            d[P].disable(H)
    }
    ;
    this.enableGuiButtons = function() {
        q.enable();
        n.enable();
        c.enable();
        F.enable();
        x.enable()
    }
    ;
    this.enableSpin = function() {
        q.enable();
        n.enable()
    }
    ;
    this.disableSpin = function() {
        q.disable();
        n.disable()
    }
    ;
    this.enableMaxBet = function() {
        n.enable()
    }
    ;
    this.disableMaxBet = function() {
        n.disable()
    }
    ;
    this.disableGuiButtons = function() {
        q.disable();
        n.disable();
        c.disable();
        F.disable();
        x.disable()
    }
    ;
    this._onBetLineClicked = function(H) {
        this.refreshNumLines(H);
        s_oGame.activateLines(H)
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
        z && screenfull.isEnabled && G.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? m.call(window.document) : z.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oInterface = this;
    this._init(a, e, f);
    return this
}
var s_oInterface = null;
function CPayTablePanel() {
    var a, e, f, g;
    this._init = function() {
        g = new createjs.Container;
        f = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
        g.addChild(f);
        this._createPayouts();
        new CTLText(g,528,286,210,130,21,"center","#ffff00",FONT_GAME,1,0,0,TEXT_HELP_WILD,!0,!0,!0,!1);
        new CTLText(g,908,286,210,130,21,"center","#ffff00",FONT_GAME,1,0,0,TEXT_HELP_BONUS,!0,!0,!0,!1);
        g.visible = !1;
        s_oStage.addChild(g);
        var k = this;
        g.on("pressup", function() {
            k._onExit()
        })
    }
    ;
    this.unload = function() {
        var k = this;
        g.off("pressup", function() {
            k._onExit()
        });
        s_oStage.removeChild(g);
        for (var l = 0; l < a.length; l++)
            g.removeChild(a[l]);
        for (l = 0; l < e.length; l++)
            g.removeChild(e[l])
    }
    ;
    this._createPayouts = function() {
        a = [];
        e = [];
        for (var k = [{
            x: 430,
            y: 92
        }, {
            x: 630,
            y: 92
        }, {
            x: 860,
            y: 92
        }, {
            x: 1100,
            y: 92
        }, {
            x: 430,
            y: 195
        }, {
            x: 650,
            y: 195
        }, {
            x: 870,
            y: 195
        }, {
            x: 1100,
            y: 195
        }], l = 0, r = 0; r < s_aSymbolWin.length; r++) {
            for (var p = [], h = 0; h < s_aSymbolWin[r].length; h++)
                p[h] = s_aSymbolWin[r][h];
            do
                h = p.indexOf(0),
                -1 !== h && p.splice(h, 1);
            while (-1 !== h);
            h = p.length;
            if (0 !== h) {
                var d = 30;
                4 === h && (d = 22);
                var v = k[l].y;
                a[r] = [];
                e[r] = [];
                for (var z = 0; z < h; z++) {
                    var m = new createjs.Text("X" + (5 - z),"25px " + FONT_GAME,"#ffffff");
                    m.textAlign = "center";
                    m.x = k[l].x;
                    m.y = v;
                    m.textBaseline = "alphabetic";
                    g.addChild(m);
                    a[r][z] = m;
                    var u = new createjs.Text(p[h - z - 1],"25px " + FONT_GAME,"#ffff00");
                    u.textAlign = "center";
                    u.x = m.x + 50;
                    u.y = m.y;
                    u.textBaseline = "alphabetic";
                    g.addChild(u);
                    e[r][z] = u;
                    v += d
                }
                l++
            }
        }
    }
    ;
    this.show = function() {
        g.visible = !0
    }
    ;
    this.hide = function() {
        g.visible = !1
    }
    ;
    this.resetHighlightCombo = function() {
        for (var k = 0; k < a.length; k++)
            for (var l = 0; l < a[k].length; l++)
                a[k][l].color = "#ffffff",
                e[k][l].color = "#ffff00",
                createjs.Tween.removeTweens(e[k][l]),
                e[k][l].alpha = 1
    }
    ;
    this.highlightCombo = function(k, l) {
        k !== BONUS_SYMBOL && (e[k - 1][NUM_REELS - l].color = "#ff0000",
        this.tweenAlpha(e[k - 1][NUM_REELS - l], 0))
    }
    ;
    this.tweenAlpha = function(k, l) {
        var r = this;
        createjs.Tween.get(k).to({
            alpha: l
        }, 200).call(function() {
            1 === l ? r.tweenAlpha(k, 0) : r.tweenAlpha(k, 1)
        })
    }
    ;
    this._onExit = function() {
        s_oGame.hidePayTable()
    }
    ;
    this.isVisible = function() {
        return g.visible
    }
    ;
    this._init()
}
function CStaticSymbolCell(a, e, f, g) {
    var k = -1, l, r, p, h;
    this._init = function(d, v, z, m) {
        h = new createjs.Container;
        h.visible = !1;
        r = [];
        for (d = 0; d < NUM_SYMBOLS; d++)
            v = createSprite(s_aSymbolAnims[d], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE),
            v.stop(),
            v.x = z,
            v.y = m,
            v.on("animationend", this._onAnimEnded, null, !1, {
                index: d
            }),
            h.addChild(v),
            r[d] = v,
            r[d].visible = !1;
        d = {
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
        d = new createjs.SpriteSheet(d);
        p = new createSprite(d,"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
        p.stop();
        p.x = z;
        p.y = m;
        h.addChild(p);
        s_oStage.addChild(h)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(h)
    }
    ;
    this.hide = function() {
        -1 < k && (p.gotoAndStop("static"),
        p.visible = !1,
        r[k].gotoAndPlay("static"),
        h.visible = !1)
    }
    ;
    this.show = function(d) {
        p.gotoAndPlay("anim");
        p.visible = !0;
        for (var v = 0; v < NUM_SYMBOLS; v++)
            r[v].visible = v + 1 === d ? !0 : !1;
        r[d - 1].gotoAndPlay("anim");
        k = d - 1;
        l = r[d - 1].spriteSheet.getNumFrames();
        h.visible = !0
    }
    ;
    this._onAnimEnded = function(d, v) {
        r[v.index].currentFrame !== l && (r[v.index].stop(),
        setTimeout(function() {
            r[v.index].gotoAndPlay(1)
        }, 100))
    }
    ;
    this.stopAnim = function() {
        r[k].gotoAndStop("static");
        r[k].visible = !1;
        p.gotoAndStop("static");
        p.visible = !1
    }
    ;
    this._init(a, e, f, g)
}
function CTweenController() {
    this.tweenValue = function(a, e, f) {
        return a + f * (e - a)
    }
    ;
    this.easeLinear = function(a, e, f, g) {
        return f * a / g + e
    }
    ;
    this.easeInCubic = function(a, e, f, g) {
        g = (a /= g) * a * a;
        return e + f * g
    }
    ;
    this.easeBackInQuart = function(a, e, f, g) {
        g = (a /= g) * a;
        return e + f * (2 * g * g + 2 * g * a + -3 * g)
    }
    ;
    this.easeInBack = function(a, e, f, g) {
        return f * (a /= g) * a * (2.70158 * a - 1.70158) + e
    }
    ;
    this.easeOutCubic = function(a, e, f, g) {
        return f * ((a = a / g - 1) * a * a + 1) + e
    }
}
function CBonusPanel() {
    var a, e, f, g, k, l, r, p, h, d, v, z, m, u, q, x, F;
    this._init = function() {
        F = new createjs.Container;
        s_oStage.addChild(F);
        var A = createBitmap(s_oSpriteLibrary.getSprite("bonus_bg"));
        F.alpha = 0;
        F.visible = !1;
        F.addChild(A);
        h = [];
        A = s_oSpriteLibrary.getSprite("bonus_item");
        for (var c = [{
            x: 530,
            y: 496
        }, {
            x: 684,
            y: 496
        }, {
            x: 838,
            y: 496
        }, {
            x: 376,
            y: 496
        }, {
            x: 992,
            y: 496
        }], n = 0; 5 > n; n++) {
            var G = createBitmap(A);
            G.on("click", this._onItemReleased, this, !1, n);
            G.x = c[n].x;
            G.y = c[n].y;
            G.regY = A.height;
            G.visible = !1;
            F.addChild(G);
            h[n] = G
        }
        x = new createjs.Container;
        x.visible = !1;
        F.addChild(x);
        d = [];
        for (c = 0; 25 > c; c++)
            A = s_oSpriteLibrary.getSprite("bonus_item_" + c),
            n = createBitmap(A),
            x.addChild(n),
            0 < c && (n.visible = !1),
            d.push(n);
        x.regY = A.height;
        A = s_oSpriteLibrary.getSprite("star_bonus");
        c = new createjs.SpriteSheet({
            framerate: 10,
            images: [A],
            frames: {
                width: Math.floor(A.width / NUM_PRIZES),
                height: A.height,
                regX: Math.floor(A.width / NUM_PRIZES) / 2,
                regY: A.height / 2
            },
            animations: {
                star_0: [0],
                star_1: [1],
                star_2: [2]
            }
        });
        u = createSprite(c, "star_0", Math.floor(A.width / NUM_PRIZES) / 2, A.height / 2, Math.floor(A.width / NUM_PRIZES), A.height);
        F.addChild(u);
        z = [];
        m = [];
        z[0] = createSprite(c, "star_0", Math.floor(A.width / NUM_PRIZES) / 2, A.height / 2, Math.floor(A.width / NUM_PRIZES), A.height);
        z[0].x = 340;
        z[0].y = CANVAS_HEIGHT - 70;
        F.addChild(z[0]);
        n = new createjs.Text("100","34px " + FONT_GAME,"#ffff00");
        n.textAlign = "left";
        n.x = z[0].x + A.width / NUM_PRIZES / 2 + 6;
        n.y = z[0].y + 12;
        n.textBaseline = "alphabetic";
        F.addChild(n);
        m.push(n);
        z[1] = createSprite(c, "star_1", Math.floor(A.width / NUM_PRIZES) / 2, A.height / 2, Math.floor(A.width / NUM_PRIZES), A.height);
        z[1].x = 640;
        z[1].y = CANVAS_HEIGHT - 70;
        F.addChild(z[1]);
        n = new createjs.Text("200","34px " + FONT_GAME,"#ffff00");
        n.textAlign = "left";
        n.x = z[1].x + +(A.width / NUM_PRIZES) / 2 + 6;
        n.y = z[1].y + 12;
        n.textBaseline = "alphabetic";
        F.addChild(n);
        m.push(n);
        z[2] = createSprite(c, "star_2", Math.floor(A.width / NUM_PRIZES) / 2, A.height / 2, Math.floor(A.width / NUM_PRIZES), A.height);
        z[2].x = 940;
        z[2].y = CANVAS_HEIGHT - 70;
        F.addChild(z[2]);
        n = new createjs.Text("300","34px " + FONT_GAME,"#ffff00");
        n.textAlign = "left";
        n.x = z[2].x + +(A.width / NUM_PRIZES) / 2 + 6;
        n.y = z[2].y + 12;
        n.textBaseline = "alphabetic";
        F.addChild(n);
        m.push(n);
        q = new createjs.Text("+ 300$","80px " + FONT_GAME,"#ffff00");
        q.alpha = 0;
        q.textAlign = "center";
        q.shadow = new createjs.Shadow("#000",2,2,2);
        q.x = CANVAS_WIDTH / 2;
        q.y = 150;
        q.textBaseline = "alphabetic";
        F.addChild(q)
    }
    ;
    this.unload = function() {
        for (var A = 0; 5 > A; A++)
            h[A].off("click", this._onItemReleased)
    }
    ;
    this.show = function(A, c) {
        $(s_oMain).trigger("bonus_start");
        e = c;
        a = !1;
        l = k = q.alpha = 0;
        r = 4;
        switch (A) {
        case 3:
            v = BONUS_PRIZE[0];
            break;
        case 4:
            v = BONUS_PRIZE[1];
            break;
        case 5:
            v = BONUS_PRIZE[2];
            break;
        default:
            v = BONUS_PRIZE[0]
        }
        m[0].text = "X" + v[0];
        m[1].text = "X" + v[1];
        m[2].text = "X" + v[2];
        u.x = 118;
        u.y = 308;
        u.rotation = 0;
        u.gotoAndStop("star_0");
        for (var n = 0; n < A; n++)
            h[n].visible = !0;
        F.visible = !0;
        createjs.Tween.get(F).to({
            alpha: 1
        }, 1E3);
        setVolume("soundtrack", 0);
        playSound("soundtrack_bonus", 1, !0)
    }
    ;
    this._onItemReleased = function(A, c) {
        if (!a) {
            a = !0;
            p = c;
            do
                var n = Math.floor(Math.random() * s_aBonusItemOccurence.length);
            while (v[s_aBonusItemOccurence[n]] * e > SLOT_CASH);
            h[p].visible = !1;
            this.playItemAnim(p, s_aBonusItemOccurence[n]);
            playSound("bonus_item_choosen", 1, !1)
        }
    }
    ;
    this.playItemAnim = function(A, c) {
        f = v[c];
        u.gotoAndStop("star_" + c);
        x.x = h[A].x;
        x.y = h[A].y;
        x.visible = !0;
        var n = this;
        g = setInterval(function() {
            n.update()
        }, FPS_TIME)
    }
    ;
    this.endBonus = function() {
        q.text = "X " + f;
        createjs.Tween.get(q).to({
            alpha: 1
        }, 500);
        setTimeout(function() {
            F.alpha = 0;
            F.visible = !1;
            for (var A = 0; A < h.length; A++)
                h[A].visible = !1;
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
                setVolume("soundtrack", SOUNDTRACK_VOLUME),
                stopSound("soundtrack_bonus");
            s_oGame.endBonus(f)
        }, 4E3)
    }
    ;
    this.setFrame = function(A, c) {
        d[A].visible = !1;
        k = c;
        d[k].visible = !0
    }
    ;
    this.nextFrame = function() {
        d[k].visible = !1;
        k++;
        d[k].visible = !0
    }
    ;
    this.update = function() {
        19 === k && l < r ? (this.setFrame(19, 7),
        l++) : (this.nextFrame(),
        l === r && 24 === k && (clearInterval(g),
        d[d.length - 1].visible = !1,
        this.endBonus(),
        playSound("reveal_prize", 1, !1)))
    }
    ;
    this._init()
}
function CCreditsPanel() {
    var a, e, f, g, k, l, r, p, h, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        s_oStage.addChild(d);
        e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(e);
        r = new createjs.Shape;
        r.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        r.alpha = .01;
        r.on("click", this._onLogoButRelease);
        d.addChild(r);
        var v = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 250;
        g = new CGfxButton(a,210,v,d);
        g.addEventListener(ON_MOUSE_UP, this.unload, this);
        l = new createjs.Text(TEXT_CREDITS_DEVELOPED,"34px " + FONT_GAME,"#000");
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = CANVAS_WIDTH / 2;
        l.y = 270;
        l.outline = 2;
        d.addChild(l);
        k = new createjs.Text(TEXT_CREDITS_DEVELOPED,"34px " + FONT_GAME,"#fff");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 270;
        d.addChild(k);
        v = s_oSpriteLibrary.getSprite("logo_ctl");
        f = createBitmap(v);
        f.regX = v.width / 2;
        f.regY = v.height / 2;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        d.addChild(f);
        h = new createjs.Text("www.codethislab.com","30px " + FONT_GAME,"#000");
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.x = CANVAS_WIDTH / 2;
        h.y = 385;
        h.outline = 2;
        d.addChild(h);
        p = new createjs.Text("www.codethislab.com","30px " + FONT_GAME,"#fff");
        p.textAlign = "center";
        p.textBaseline = "alphabetic";
        p.x = CANVAS_WIDTH / 2;
        p.y = 385;
        d.addChild(p);
        createjs.Tween.get(d).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(v, z) {}
    ;
    this.unload = function() {
        r.off("click", this._onLogoButRelease);
        g.unload();
        g = null;
        s_oStage.removeChild(d)
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
    setVisible: function(a) {
        this._oContainer.visible = a
    },
    setShadow: function(a, e, f, g) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,e,f,g))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setY: function(a) {
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
function CTLText(a, e, f, g, k, l, r, p, h, d, v, z, m, u, q, x, F) {
    this._oContainer = a;
    this._x = e;
    this._y = f;
    this._iWidth = g;
    this._iHeight = k;
    this._bMultiline = x;
    this._iFontSize = l;
    this._szAlign = r;
    this._szColor = p;
    this._szFont = h;
    this._iPaddingH = v;
    this._iPaddingV = z;
    this._bVerticalAlign = q;
    this._bFitText = u;
    this._bDebug = F;
    this._oDebugShape = null;
    this._fLineHeightFactor = d;
    this._oText = null;
    m && this.__createText(m)
}
function CRechargePanel() {
    var a, e, f, g, k, l, r = this;
    this._init = function() {
        l = new createjs.Container;
        l.visible = !1;
        s_oStage.addChild(l);
        e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        a = e.on("click", function() {});
        l.addChild(e);
        k = new CTLText(l,CANVAS_WIDTH / 2 - 240,170,480,150,40,"center","#000",FONT_GAME,1,0,0,TEXT_NO_MONEY,!0,!0,!0,!1);
        k.setOutline(3);
        new CTLText(l,CANVAS_WIDTH / 2 - 240,170,480,150,40,"center","#fff",FONT_GAME,1,0,0,TEXT_NO_MONEY,!0,!0,!0,!1);
        g = new CTextButton(CANVAS_WIDTH / 2 - 150,CANVAS_HEIGHT / 2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_EXIT,FONT_GAME,"#fff",40,l);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = new CTextButton(CANVAS_WIDTH / 2 + 150,CANVAS_HEIGHT / 2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_RECHARGE,FONT_GAME,"#fff",40,l);
        f.addEventListener(ON_MOUSE_UP, this._onRecharge, this)
    }
    ;
    this.unload = function() {
        e.off("click", a);
        g.unload();
        g = null;
        f.unload();
        s_oStage.removeChild(l)
    }
    ;
    this.show = function() {
        l.alpha = 0;
        l.visible = !0;
        createjs.Tween.get(l).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut)
    }
    ;
    this.hide = function() {
        l.visible = !1
    }
    ;
    this._onExit = function() {
        r.hide();
        s_oInterface.enableGuiButtons()
    }
    ;
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
        r.hide()
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
    var e = a.split(".")
      , f = e.length;
    2 < f && (a = e[f - 2] + "." + e[f - 1]);
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
    } catch (f) {
        e = !0
    }
    return {
        topFrame: a,
        err: e
    }
}
  , getBestPageUrl = function(a) {
    var e = a.topFrame
      , f = "";
    if (a.err)
        try {
            try {
                f = window.top.location.href
            } catch (k) {
                var g = window.location.ancestorOrigins;
                f = g[g.length - 1]
            }
        } catch (k) {
            f = e.document.referrer
        }
    else
        f = e.location.href;
    return f
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), e = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], f = 0; f < e.length; f++)
        if (e[f] === a)
            return !0;
    return !1
}
;
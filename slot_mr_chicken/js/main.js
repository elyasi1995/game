/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    function a(h) {
        h = String(h);
        return h.charAt(0).toUpperCase() + h.slice(1)
    }
    function e(h, y) {
        var G = -1
          , x = h ? h.length : 0;
        if ("number" == typeof x && -1 < x && x <= t)
            for (; ++G < x; )
                y(h[G], G, h);
        else
            g(h, y)
    }
    function f(h) {
        h = String(h).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(h) ? h : a(h)
    }
    function g(h, y) {
        for (var G in h)
            z.call(h, G) && y(h[G], G, h)
    }
    function m(h) {
        return null == h ? a(h) : J.call(h).slice(8, -1)
    }
    function k(h, y) {
        var G = null != h ? typeof h[y] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(G) && ("object" == G ? !!h[y] : !0)
    }
    function r(h) {
        return String(h).replace(/([ -])(?!$)/g, "$1?")
    }
    function n(h, y) {
        var G = null;
        e(h, function(x, C) {
            G = y(G, x, C, h)
        });
        return G
    }
    function l(h) {
        function y(R) {
            return n(R, function(Q, O) {
                var V = O.pattern || r(O);
                !Q && (Q = RegExp("\\b" + V + " *\\d+[.\\w_]*", "i").exec(h) || RegExp("\\b" + V + " *\\w+-[\\w]*", "i").exec(h) || RegExp("\\b" + V + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(h)) && ((Q = String(O.label && !RegExp(V, "i").test(O.label) ? O.label : Q).split("/"))[1] && !/[\d.]+/.test(Q[0]) && (Q[0] += " " + Q[1]),
                O = O.label || O,
                Q = f(Q[0].replace(RegExp(V, "i"), O).replace(RegExp("; *(?:" + O + "[_-])?", "i"), " ").replace(RegExp("(" + O + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return Q
            })
        }
        function G(R) {
            return n(R, function(Q, O) {
                return Q || (RegExp(O + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(h) || 0)[1] || null
            })
        }
        var x = p
          , C = h && "object" == typeof h && "String" != m(h);
        C && (x = h,
        h = null);
        var K = x.navigator || {}
          , A = K.userAgent || "";
        h || (h = A);
        var D = C ? !!K.likeChrome : /\bChrome\b/.test(h) && !/internal|\n/i.test(J.toString())
          , P = C ? "Object" : "ScriptBridgingProxyObject"
          , S = C ? "Object" : "Environment"
          , E = C && x.java ? "JavaPackage" : m(x.java)
          , T = C ? "Object" : "RuntimeObject";
        S = (E = /\bJava/.test(E) && x.java) && m(x.environment) == S;
        var I = E ? "a" : "\u03b1", X = E ? "b" : "\u03b2", Z = x.document || {}, U = x.operamini || x.opera, aa = w.test(aa = C && U ? U["[[Class]]"] : m(U)) ? aa : U = null, b, q = h;
        C = [];
        var F = null
          , M = h == A;
        A = M && U && "function" == typeof U.version && U.version();
        var H = function(R) {
            return n(R, function(Q, O) {
                return Q || RegExp("\\b" + (O.pattern || r(O)) + "\\b", "i").exec(h) && (O.label || O)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , v = function(R) {
            return n(R, function(Q, O) {
                return Q || RegExp("\\b" + (O.pattern || r(O)) + "\\b", "i").exec(h) && (O.label || O)
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
          , N = y([{
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
          , W = function(R) {
            return n(R, function(Q, O, V) {
                return Q || (O[N] || O[/^[a-z]+(?: +[a-z]+\b)*/i.exec(N)] || RegExp("\\b" + r(V) + "(?:\\b|\\w*\\d)", "i").exec(h)) && V
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
          , B = function(R) {
            return n(R, function(Q, O) {
                var V = O.pattern || r(O);
                if (!Q && (Q = RegExp("\\b" + V + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(h))) {
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
                    V && ba && /^Win/i.test(Y) && !/^Windows Phone /i.test(Y) && (ca = ca[/[\d.]+$/.exec(Y)]) && (Y = "Windows " + ca);
                    Y = String(Y);
                    V && ba && (Y = Y.replace(RegExp(V, "i"), ba));
                    Q = Y = f(Y.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return Q
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        H && (H = [H]);
        W && !N && (N = y([W]));
        if (b = /\bGoogle TV\b/.exec(N))
            N = b[0];
        /\bSimulator\b/i.test(h) && (N = (N ? N + " " : "") + "Simulator");
        "Opera Mini" == v && /\bOPiOS\b/.test(h) && C.push("running in Turbo/Uncompressed mode");
        "IE" == v && /\blike iPhone OS\b/.test(h) ? (b = l(h.replace(/like iPhone OS/, "")),
        W = b.manufacturer,
        N = b.product) : /^iP/.test(N) ? (v || (v = "Safari"),
        B = "iOS" + ((b = / OS ([\d_]+)/i.exec(h)) ? " " + b[1].replace(/_/g, ".") : "")) : "Konqueror" != v || /buntu/i.test(B) ? W && "Google" != W && (/Chrome/.test(v) && !/\bMobile Safari\b/i.test(h) || /\bVita\b/.test(N)) || /\bAndroid\b/.test(B) && /^Chrome/.test(v) && /\bVersion\//i.test(h) ? (v = "Android Browser",
        B = /\bAndroid\b/.test(B) ? B : "Android") : "Silk" == v ? (/\bMobi/i.test(h) || (B = "Android",
        C.unshift("desktop mode")),
        /Accelerated *= *true/i.test(h) && C.unshift("accelerated")) : "PaleMoon" == v && (b = /\bFirefox\/([\d.]+)\b/.exec(h)) ? C.push("identifying as Firefox " + b[1]) : "Firefox" == v && (b = /\b(Mobile|Tablet|TV)\b/i.exec(h)) ? (B || (B = "Firefox OS"),
        N || (N = b[1])) : !v || (b = !/\bMinefield\b/i.test(h) && /\b(?:Firefox|Safari)\b/.exec(v)) ? (v && !N && /[\/,]|^[^(]+?\)/.test(h.slice(h.indexOf(b + "/") + 8)) && (v = null),
        (b = N || W || B) && (N || W || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(B)) && (v = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(B) ? B : b) + " Browser")) : "Electron" == v && (b = (/\bChrome\/([\d.]+)\b/.exec(h) || 0)[1]) && C.push("Chromium " + b) : B = "Kubuntu";
        A || (A = G(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", r(v), "(?:Firefox|Minefield|NetFront)"]));
        if (b = "iCab" == H && 3 < parseFloat(A) && "WebKit" || /\bOpera\b/.test(v) && (/\bOPR\b/.test(h) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(h) && !/^(?:Trident|EdgeHTML)$/.test(H) && "WebKit" || !H && /\bMSIE\b/i.test(h) && ("Mac OS" == B ? "Tasman" : "Trident") || "WebKit" == H && /\bPlayStation\b(?! Vita\b)/i.test(v) && "NetFront")
            H = [b];
        "IE" == v && (b = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(h) || 0)[1]) ? (v += " Mobile",
        B = "Windows Phone " + (/\+$/.test(b) ? b : b + ".x"),
        C.unshift("desktop mode")) : /\bWPDesktop\b/i.test(h) ? (v = "IE Mobile",
        B = "Windows Phone 8.x",
        C.unshift("desktop mode"),
        A || (A = (/\brv:([\d.]+)/.exec(h) || 0)[1])) : "IE" != v && "Trident" == H && (b = /\brv:([\d.]+)/.exec(h)) && (v && C.push("identifying as " + v + (A ? " " + A : "")),
        v = "IE",
        A = b[1]);
        if (M) {
            if (k(x, "global"))
                if (E && (b = E.lang.System,
                q = b.getProperty("os.arch"),
                B = B || b.getProperty("os.name") + " " + b.getProperty("os.version")),
                S) {
                    try {
                        A = x.require("ringo/engine").version.join("."),
                        v = "RingoJS"
                    } catch (R) {
                        (b = x.system) && b.global.system == x.system && (v = "Narwhal",
                        B || (B = b[0].os || null))
                    }
                    v || (v = "Rhino")
                } else
                    "object" == typeof x.process && !x.process.browser && (b = x.process) && ("object" == typeof b.versions && ("string" == typeof b.versions.electron ? (C.push("Node " + b.versions.node),
                    v = "Electron",
                    A = b.versions.electron) : "string" == typeof b.versions.nw && (C.push("Chromium " + A, "Node " + b.versions.node),
                    v = "NW.js",
                    A = b.versions.nw)),
                    v || (v = "Node.js",
                    q = b.arch,
                    B = b.platform,
                    A = (A = /[\d.]+/.exec(b.version)) ? A[0] : null));
            else
                m(b = x.runtime) == P ? (v = "Adobe AIR",
                B = b.flash.system.Capabilities.os) : m(b = x.phantom) == T ? (v = "PhantomJS",
                A = (b = b.version || null) && b.major + "." + b.minor + "." + b.patch) : "number" == typeof Z.documentMode && (b = /\bTrident\/(\d+)/i.exec(h)) ? (A = [A, Z.documentMode],
                (b = +b[1] + 4) != A[1] && (C.push("IE " + A[1] + " mode"),
                H && (H[1] = ""),
                A[1] = b),
                A = "IE" == v ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof Z.documentMode && /^(?:Chrome|Firefox)\b/.test(v) && (C.push("masking as " + v + " " + A),
                v = "IE",
                A = "11.0",
                H = ["Trident"],
                B = "Windows");
            B = B && f(B)
        }
        A && (b = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(h + ";" + (M && K.appMinorVersion)) || /\bMinefield\b/i.test(h) && "a") && (F = /b/i.test(b) ? "beta" : "alpha",
        A = A.replace(RegExp(b + "\\+?$"), "") + ("beta" == F ? X : I) + (/\d+\+?/.exec(b) || ""));
        if ("Fennec" == v || "Firefox" == v && /\b(?:Android|Firefox OS)\b/.test(B))
            v = "Firefox Mobile";
        else if ("Maxthon" == v && A)
            A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(N))
            "Xbox 360" == N && (B = null),
            "Xbox 360" == N && /\bIEMobile\b/.test(h) && C.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(v) && (!v || N || /Browser|Mobi/.test(v)) || "Windows CE" != B && !/Mobi/i.test(h))
            if ("IE" == v && M)
                try {
                    null === x.external && C.unshift("platform preview")
                } catch (R) {
                    C.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(N) || /\bBB10\b/.test(h)) && (b = (RegExp(N.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(h) || 0)[1] || A) ? (b = [b, /BB10/.test(h)],
                B = (b[1] ? (N = null,
                W = "BlackBerry") : "Device Software") + " " + b[0],
                A = null) : this != g && "Wii" != N && (M && U || /Opera/.test(v) && /\b(?:MSIE|Firefox)\b/i.test(h) || "Firefox" == v && /\bOS X (?:\d+\.){2,}/.test(B) || "IE" == v && (B && !/^Win/.test(B) && 5.5 < A || /\bWindows XP\b/.test(B) && 8 < A || 8 == A && !/\bTrident\b/.test(h))) && !w.test(b = l.call(g, h.replace(w, "") + ";")) && b.name && (b = "ing as " + b.name + ((b = b.version) ? " " + b : ""),
                w.test(v) ? (/\bIE\b/.test(b) && "Mac OS" == B && (B = null),
                b = "identify" + b) : (b = "mask" + b,
                v = aa ? f(aa.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(b) && (B = null),
                M || (A = null)),
                H = ["Presto"],
                C.push(b));
        else
            v += " Mobile";
        if (b = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(h) || 0)[1]) {
            b = [parseFloat(b.replace(/\.(\d)$/, ".0$1")), b];
            if ("Safari" == v && "+" == b[1].slice(-1))
                v = "WebKit Nightly",
                F = "alpha",
                A = b[1].slice(0, -1);
            else if (A == b[1] || A == (b[2] = (/\bSafari\/([\d.]+\+?)/i.exec(h) || 0)[1]))
                A = null;
            b[1] = (/\bChrome\/([\d.]+)/i.exec(h) || 0)[1];
            537.36 == b[0] && 537.36 == b[2] && 28 <= parseFloat(b[1]) && "WebKit" == H && (H = ["Blink"]);
            M && (D || b[1]) ? (H && (H[1] = "like Chrome"),
            b = b[1] || (b = b[0],
            530 > b ? 1 : 532 > b ? 2 : 532.05 > b ? 3 : 533 > b ? 4 : 534.03 > b ? 5 : 534.07 > b ? 6 : 534.1 > b ? 7 : 534.13 > b ? 8 : 534.16 > b ? 9 : 534.24 > b ? 10 : 534.3 > b ? 11 : 535.01 > b ? 12 : 535.02 > b ? "13+" : 535.07 > b ? 15 : 535.11 > b ? 16 : 535.19 > b ? 17 : 536.05 > b ? 18 : 536.1 > b ? 19 : 537.01 > b ? 20 : 537.11 > b ? "21+" : 537.13 > b ? 23 : 537.18 > b ? 24 : 537.24 > b ? 25 : 537.36 > b ? 26 : "Blink" != H ? "27" : "28")) : (H && (H[1] = "like Safari"),
            b = (b = b[0],
            400 > b ? 1 : 500 > b ? 2 : 526 > b ? 3 : 533 > b ? 4 : 534 > b ? "4+" : 535 > b ? 5 : 537 > b ? 6 : 538 > b ? 7 : 601 > b ? 8 : "8"));
            H && (H[1] += " " + (b += "number" == typeof b ? ".x" : /[.+]/.test(b) ? "" : "+"));
            "Safari" == v && (!A || 45 < parseInt(A)) && (A = b)
        }
        "Opera" == v && (b = /\bzbov|zvav$/.exec(B)) ? (v += " ",
        C.unshift("desktop mode"),
        "zvav" == b ? (v += "Mini",
        A = null) : v += "Mobile",
        B = B.replace(RegExp(" *" + b + "$"), "")) : "Safari" == v && /\bChrome\b/.exec(H && H[1]) && (C.unshift("desktop mode"),
        v = "Chrome Mobile",
        A = null,
        /\bOS X\b/.test(B) ? (W = "Apple",
        B = "iOS 4.3+") : B = null);
        A && 0 == A.indexOf(b = /[\d.]+$/.exec(B)) && -1 < h.indexOf("/" + b + "-") && (B = String(B.replace(b, "")).replace(/^ +| +$/g, ""));
        H && !/\b(?:Avant|Nook)\b/.test(v) && (/Browser|Lunascape|Maxthon/.test(v) || "Safari" != v && /^iOS/.test(B) && /\bSafari\b/.test(H[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(v) && H[1]) && (b = H[H.length - 1]) && C.push(b);
        C.length && (C = ["(" + C.join("; ") + ")"]);
        W && N && 0 > N.indexOf(W) && C.push("on " + W);
        N && C.push((/^on /.test(C[C.length - 1]) ? "" : "on ") + N);
        if (B) {
            var da = (b = / ([\d.+]+)$/.exec(B)) && "/" == B.charAt(B.length - b[0].length - 1);
            B = {
                architecture: 32,
                family: b && !da ? B.replace(b[0], "") : B,
                version: b ? b[1] : null,
                toString: function() {
                    var R = this.version;
                    return this.family + (R && !da ? " " + R : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (b = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(q)) && !/\bi686\b/i.test(q) ? (B && (B.architecture = 64,
        B.family = B.family.replace(RegExp(" *" + b), "")),
        v && (/\bWOW64\b/i.test(h) || M && /\w(?:86|32)$/.test(K.cpuClass || K.platform) && !/\bWin64; x64\b/i.test(h)) && C.unshift("32-bit")) : B && /^OS X/.test(B.family) && "Chrome" == v && 39 <= parseFloat(A) && (B.architecture = 64);
        h || (h = null);
        x = {};
        x.description = h;
        x.layout = H && H[0];
        x.manufacturer = W;
        x.name = v;
        x.prerelease = F;
        x.product = N;
        x.ua = h;
        x.version = v && A;
        x.os = B || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        x.parse = l;
        x.toString = function() {
            return this.description || ""
        }
        ;
        x.version && C.unshift(A);
        x.name && C.unshift(v);
        B && v && (B != String(B).split(" ")[0] || B != v.split(" ")[0] && !N) && C.push(N ? "(" + B + ")" : "on " + B);
        C.length && (x.description = C.join(" "));
        return x
    }
    var d = {
        "function": !0,
        object: !0
    }
      , p = d[typeof window] && window || this
      , u = d[typeof exports] && exports;
    d = d[typeof module] && module && !module.nodeType && module;
    var c = u && d && "object" == typeof global && global;
    !c || c.global !== c && c.window !== c && c.self !== c || (p = c);
    var t = Math.pow(2, 53) - 1
      , w = /\bOpera/;
    c = Object.prototype;
    var z = c.hasOwnProperty
      , J = c.toString
      , L = l();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (p.platform = L,
    define(function() {
        return L
    })) : u && d ? g(L, function(h, y) {
        u[y] = h
    }) : p.platform = L
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
        var m = f.createElement("body");
        m.id = "vpw-test-b";
        m.style.cssText = "overflow:scroll";
        var k = f.createElement("div");
        k.id = "vpw-test-d";
        k.style.cssText = "position:absolute;top:-1000px";
        k.innerHTML = "<style>@media(" + e + ":" + g["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + e + ":7px!important}}</style>";
        m.appendChild(k);
        g.insertBefore(m, f.head);
        a = 7 == k["offset" + a] ? g["client" + a] : window["inner" + a];
        g.removeChild(m)
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
            var m = a - f;
            f += m;
            g += CANVAS_WIDTH / CANVAS_HEIGHT * m
        } else
            g < e && (m = e - g,
            g += m,
            f += CANVAS_HEIGHT / CANVAS_WIDTH * m);
        m = a / 2 - f / 2;
        var k = e / 2 - g / 2
          , r = CANVAS_WIDTH / g;
        if (k * r < -EDGEBOARD_X || m * r < -EDGEBOARD_Y)
            f = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            g = Math.round(CANVAS_WIDTH * f),
            f = Math.round(CANVAS_HEIGHT * f),
            m = (a - f) / 2,
            k = (e - g) / 2,
            r = CANVAS_WIDTH / g;
        s_iOffsetX = -1 * k * r;
        s_iOffsetY = -1 * m * r;
        0 <= m && (s_iOffsetY = 0);
        0 <= k && (s_iOffsetX = 0);
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
        0 > m || (m = (a - f) / 2);
        $("#canvas").css("top", m + "px");
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
function createBitmap(a, e, f) {
    var g = new createjs.Bitmap(a)
      , m = new createjs.Shape;
    e && f ? m.graphics.beginFill("#fff").drawRect(0, 0, e, f) : m.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    g.hitArea = m;
    return g
}
function createSprite(a, e, f, g, m, k) {
    a = null !== e ? new createjs.Sprite(a,e) : new createjs.Sprite(a);
    e = new createjs.Shape;
    e.graphics.beginFill("#000000").drawRect(-f, -g, m, k);
    a.hitArea = e;
    return a
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
    var a = {}, e, f, g, m, k, r;
    this.init = function(n, l, d) {
        e = {};
        g = f = 0;
        m = n;
        k = l;
        r = d
    }
    ;
    this.addSprite = function(n, l) {
        if (a.hasOwnProperty(n))
            return !1;
        var d = new Image;
        a[n] = e[n] = {
            szPath: l,
            oSprite: d,
            bLoaded: !1
        };
        f++;
        return !0
    }
    ;
    this.getSprite = function(n) {
        return a.hasOwnProperty(n) ? a[n].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        f = 0;
        k.call(r)
    }
    ;
    this._onSpriteLoaded = function() {
        m.call(r);
        ++g === f && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var n in e)
            e[n].oSprite.oSpriteLibrary = this,
            e[n].oSprite.szKey = n,
            e[n].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            e[n].oSprite.onerror = function(l) {
                var d = l.currentTarget;
                setTimeout(function() {
                    e[d.szKey].oSprite.src = e[d.szKey].szPath
                }, 500)
            }
            ,
            e[n].oSprite.src = e[n].szPath
    }
    ;
    this.setLoaded = function(n) {
        a[n].bLoaded = !0
    }
    ;
    this.isLoaded = function(n) {
        return a[n].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return f
    }
}
var CANVAS_WIDTH = 1500, CANVAS_HEIGHT = 640, EDGEBOARD_X = 300, EDGEBOARD_Y = 0, FONT_GAME = "walibi0615bold", FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, GAME_STATE_IDLE = 0, GAME_STATE_SPINNING = 1, GAME_STATE_SHOW_ALL_WIN = 2, GAME_STATE_SHOW_WIN = 3, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, REEL_OFFSET_X = 380, REEL_OFFSET_Y = 123, NUM_REELS = 5, NUM_ROWS = 3, NUM_SYMBOLS = 10, WILD_SYMBOL = 10, BONUS_SYMBOL = 9, NUM_PAYLINES = 5, SYMBOL_SIZE = 140, SPACE_BETWEEN_SYMBOLS = 10, MAX_FRAMES_REEL_EASE = 16, MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE, REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE, TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET, MAX_BET, TOTAL_MONEY, MAX_NUM_HOLD, CHICKEN_WIDTH = 166, CHICKEN_HEIGHT = 187, NUM_PRIZES = 3, NUM_SYMBOLS_FOR_BONUS = 3, PERC_WIN_EGG_1, PERC_WIN_EGG_2, PERC_WIN_EGG_3, SOUNDTRACK_VOLUME = .5, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, BONUS_OCCURRENCE, PAYTABLE_VALUES, BONUS_PRIZE = [[5, 50, 100], [10, 100, 200], [50, 200, 500]], ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, SOUNDTRACK_VOLUME_IN_GAME = 1;
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
        s_aEggOccurence = [];
        var a;
        for (a = 0; a < PERC_WIN_EGG_1; a++)
            s_aEggOccurence.push(0);
        for (a = 0; a < PERC_WIN_EGG_2; a++)
            s_aEggOccurence.push(1);
        for (a = 0; a < PERC_WIN_EGG_3; a++)
            s_aEggOccurence.push(2)
    }
    ;
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols, s_aEggOccurence, TEXT_MONEY = "MONEY", TEXT_PLAY = "PLAY", TEXT_BET = "BET", TEXT_COIN = "COIN", TEXT_MAX_BET = "MAX BET", TEXT_INFO = "INFO", TEXT_LINES = "LINES", TEXT_SPIN = "SPIN", TEXT_WIN = "WIN", TEXT_HOLD = "HOLD", TEXT_HELP_WILD = "JOLLY SYMBOL CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO", TEXT_HELP_BONUS = "3 OR MORE MR CHICKEN LET YOU PLAY THE BONUS GAME!", TEXT_CREDITS_DEVELOPED = "DEVELOPED BY", TEXT_CURRENCY = "$", TEXT_PRELOADER_CONTINUE = "START", TEXT_NO_MONEY = "NO MONEY! DO YOU WANT TO RECHARGE?", TEXT_RECHARGE = "RECHARGE", TEXT_EXIT = "EXIT", TEXT_CONGRATULATIONS = "Congratulations!", TEXT_MSG_SHARE1 = "You collected <strong>", TEXT_MSG_SHARE2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_MSG_SHARING1 = "My score is ", TEXT_MSG_SHARING2 = " points! Can you do better?";
function CPreloader() {
    var a, e, f, g, m, k, r, n, l;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        l = new createjs.Container;
        s_oStage.addChild(l)
    }
    ;
    this.unload = function() {
        l.removeAllChildren()
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
        l.addChild(d);
        d = s_oSpriteLibrary.getSprite("200x200");
        r = createBitmap(d);
        r.regX = .5 * d.width;
        r.regY = .5 * d.height;
        r.x = CANVAS_WIDTH / 2;
        r.y = CANVAS_HEIGHT / 2 - 180;
        l.addChild(r);
        n = new createjs.Shape;
        n.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(r.x - 100, r.y - 100, 200, 200, 10);
        l.addChild(n);
        r.mask = n;
        d = s_oSpriteLibrary.getSprite("progress_bar");
        g = createBitmap(d);
        g.x = CANVAS_WIDTH / 2 - d.width / 2;
        g.y = CANVAS_HEIGHT / 2 + 50;
        l.addChild(g);
        a = d.width;
        e = d.height;
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, 1, e);
        l.addChild(m);
        g.mask = m;
        f = new createjs.Text("","30px " + FONT_GAME,"#fff");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 + 100;
        f.textBaseline = "alphabetic";
        f.textAlign = "center";
        l.addChild(f);
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(k);
            l.removeChild(k)
        })
    }
    ;
    this.refreshLoader = function(d) {
        f.text = d + "%";
        100 === d && (s_oMain._onRemovePreloader(),
        f.visible = !1,
        g.visible = !1);
        m.graphics.clear();
        d = Math.floor(d * a / 100);
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, d, e)
    }
    ;
    this._init()
}
function CMain(a) {
    var e, f = 0, g = 0, m = STATE_LOADING, k, r;
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
        k = new CPreloader
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
        k.refreshLoader(Math.floor(f / g * 100))
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
            filename: "choose_chicken",
            loop: !1,
            volume: 1,
            ingamename: "choose_chicken"
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
            filename: "press_hold",
            loop: !1,
            volume: 1,
            ingamename: "press_hold"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reveal_egg",
            loop: !1,
            volume: 1,
            ingamename: "reveal_egg"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack_bonus",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack_bonus"
        });
        g += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var d = 0; d < s_aSoundsInfo.length; d++)
            this.tryToLoadSound(s_aSoundsInfo[d], !1)
    }
    ;
    this.tryToLoadSound = function(d, p) {
        setTimeout(function() {
            s_aSounds[d.ingamename] = new Howl({
                src: [d.path + d.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: d.loop,
                volume: d.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(u, c) {
                    for (var t = 0; t < s_aSoundsInfo.length; t++)
                        if (u === s_aSounds[s_aSoundsInfo[t].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[t], !0);
                            break
                        }
                },
                onplayerror: function(u) {
                    for (var c = 0; c < s_aSoundsInfo.length; c++)
                        if (u === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[c].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[c].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[c].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, p ? 200 : 0)
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
        s_oSpriteLibrary.addSprite("chicken", "./sprites/chicken.png");
        s_oSpriteLibrary.addSprite("hit_area_chicken", "./sprites/hit_area_chicken.png");
        s_oSpriteLibrary.addSprite("egg", "./sprites/egg.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        for (var d = 1; d < NUM_SYMBOLS + 1; d++)
            s_oSpriteLibrary.addSprite("symbol_" + d, "./sprites/symbol_" + d + ".png"),
            s_oSpriteLibrary.addSprite("symbol_" + d + "_anim", "./sprites/symbol_" + d + "_anim.png");
        for (d = 1; d < NUM_PAYLINES + 1; d++)
            s_oSpriteLibrary.addSprite("payline_" + d, "./sprites/payline_" + d + ".png");
        g += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        f++;
        k.refreshLoader(Math.floor(f / g * 100))
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this._onRemovePreloader = function() {
        k.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        m = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        r = new CGame(n);
        m = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        m = STATE_HELP
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
            var p = (new Date).getTime();
            s_iTimeElaps = p - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = p;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            m === STATE_GAME && r.update();
            s_oStage.update(d)
        }
    }
    ;
    s_oMain = this;
    var n = a;
    PAYTABLE_VALUES = [];
    for (var l = 0; 8 > l; l++)
        PAYTABLE_VALUES[l] = a["paytable_symbol_" + (l + 1)];
    ENABLE_FULLSCREEN = n.fullscreen;
    ENABLE_CHECK_ORIENTATION = n.check_orientation;
    SHOW_CREDITS = n.show_credits;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_bFullscreen = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null, s_aSoundsInfo;
function CTextButton(a, e, f, g, m, k, r, n) {
    var l, d, p, u, c, t, w, z, J, L;
    this._init = function(h, y, G, x, C, K, A) {
        l = !1;
        d = 1;
        p = [];
        u = [];
        L = createBitmap(G);
        z = new createjs.Container;
        z.x = h;
        z.y = y;
        z.regX = G.width / 2;
        z.regY = G.height / 2;
        s_bMobile || (z.cursor = "pointer");
        z.addChild(L, J);
        n.addChild(z);
        J = new CTLText(z,10,0,G.width - 20,G.height,A,"center",K,C,1,2,2,x,!0,!0,!1,!1);
        this._initListener()
    }
    ;
    this.unload = function() {
        z.off("mousedown", c);
        z.off("pressup", t);
        n.removeChild(z)
    }
    ;
    this.setVisible = function(h) {
        z.visible = h
    }
    ;
    this.setAlign = function(h) {
        J.textAlign = h
    }
    ;
    this.setTextX = function(h) {
        J.x = h
    }
    ;
    this.setScale = function(h) {
        d = z.scaleX = z.scaleY = h
    }
    ;
    this.enable = function() {
        l = !1
    }
    ;
    this.disable = function() {
        l = !0
    }
    ;
    this._initListener = function() {
        c = z.on("mousedown", this.buttonDown);
        t = z.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(h, y, G) {
        p[h] = y;
        u[h] = G
    }
    ;
    this.addEventListenerWithParams = function(h, y, G, x) {
        p[h] = y;
        u[h] = G;
        w = x
    }
    ;
    this.buttonRelease = function() {
        l || (playSound("press_but", 1, !1),
        z.scaleX = d,
        z.scaleY = d,
        p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(u[ON_MOUSE_UP], w))
    }
    ;
    this.buttonDown = function() {
        l || (z.scaleX = .9 * d,
        z.scaleY = .9 * d,
        p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    }
    ;
    this.setPosition = function(h, y) {
        z.x = h;
        z.y = y
    }
    ;
    this.tweenPosition = function(h, y, G, x, C, K, A) {
        createjs.Tween.get(z).wait(x).to({
            x: h,
            y: y
        }, G, C).call(function() {
            void 0 !== K && K.call(A)
        })
    }
    ;
    this.changeText = function(h) {
        J.refreshText(h)
    }
    ;
    this.setX = function(h) {
        z.x = h
    }
    ;
    this.setY = function(h) {
        z.y = h
    }
    ;
    this.getButtonImage = function() {
        return z
    }
    ;
    this.getX = function() {
        return z.x
    }
    ;
    this.getY = function() {
        return z.y
    }
    ;
    this.getSprite = function() {
        return z
    }
    ;
    this.getScale = function() {
        return z.scaleX
    }
    ;
    this._init(a, e, f, g, m, k, r)
}
function CGfxButton(a, e, f, g) {
    var m, k, r, n, l, d, p, u, c;
    this._init = function(t, w, z, J) {
        m = !1;
        n = [];
        l = [];
        c = createBitmap(z);
        c.x = t;
        c.y = w;
        k = z.width;
        r = z.height;
        c.regX = z.width / 2;
        c.regY = z.height / 2;
        c.cursor = "pointer";
        !1 !== J && s_oStage.addChild(c);
        this._initListener()
    }
    ;
    this.unload = function() {
        c.off("mousedown", d);
        c.off("pressup", p);
        s_oStage.removeChild(c)
    }
    ;
    this.setVisible = function(t) {
        c.visible = t
    }
    ;
    this.enable = function() {
        m = !1;
        c.filters = [];
        c.cache(0, 0, k, r)
    }
    ;
    this.disable = function() {
        m = !0;
        var t = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        c.filters = [new createjs.ColorMatrixFilter(t)];
        c.cache(0, 0, k, r)
    }
    ;
    this._initListener = function() {
        d = c.on("mousedown", this.buttonDown);
        p = c.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(t, w, z) {
        n[t] = w;
        l[t] = z
    }
    ;
    this.addEventListenerWithParams = function(t, w, z, J) {
        n[t] = w;
        l[t] = z;
        u = J
    }
    ;
    this.buttonRelease = function() {
        m || (playSound("press_but", 1, !1),
        c.scaleX = 1,
        c.scaleY = 1,
        n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(l[ON_MOUSE_UP], u))
    }
    ;
    this.buttonDown = function() {
        m || (c.scaleX = .9,
        c.scaleY = .9,
        n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], u))
    }
    ;
    this.setPosition = function(t, w) {
        c.x = t;
        c.y = w
    }
    ;
    this.setX = function(t) {
        c.x = t
    }
    ;
    this.setY = function(t) {
        c.y = t
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
    this.getSprite = function() {
        return c
    }
    ;
    this._init(a, e, f, g);
    return this
}
function CToggle(a, e, f, g, m) {
    var k, r, n, l, d, p, u;
    this._init = function(c, t, w, z, J) {
        u = void 0 !== J ? J : s_oStage;
        r = [];
        n = [];
        J = new createjs.SpriteSheet({
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
        k = z;
        l = createSprite(J, "state_" + k, w.width / 2 / 2, w.height / 2, w.width / 2, w.height);
        l.x = c;
        l.y = t;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        u.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        l.off("mousedown", d);
        l.off("pressup", p);
        u.removeChild(l)
    }
    ;
    this._initListener = function() {
        d = l.on("mousedown", this.buttonDown);
        p = l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(c, t, w) {
        r[c] = t;
        n[c] = w
    }
    ;
    this.setCursorType = function(c) {
        l.cursor = c
    }
    ;
    this.setActive = function(c) {
        k = c;
        l.gotoAndStop("state_" + k)
    }
    ;
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("press_but", 1, !1);
        k = !k;
        l.gotoAndStop("state_" + k);
        r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(n[ON_MOUSE_UP], k)
    }
    ;
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(c, t) {
        l.x = c;
        l.y = t
    }
    ;
    this._init(a, e, f, g, m)
}
function CBetBut(a, e, f) {
    var g, m, k, r = [], n;
    this._init = function(l, d, p) {
        g = !1;
        m = [];
        k = [];
        p = s_oSpriteLibrary.getSprite("bet_but");
        var u = new createjs.SpriteSheet({
            images: [p],
            frames: {
                width: p.width / 2,
                height: p.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        n = createSprite(u, "on", 0, 0, p.width / 2, p.height);
        n.stop();
        n.x = l;
        n.y = d;
        n.regX = p.width / 2;
        n.regY = p.height / 2;
        s_oStage.addChild(n);
        this._initListener()
    }
    ;
    this.unload = function() {
        n.off("mousedown", this.buttonDown);
        n.off("pressup", this.buttonRelease);
        s_oStage.removeChild(n)
    }
    ;
    this.disable = function(l) {
        g = l
    }
    ;
    this.setVisible = function(l) {
        n.visible = l
    }
    ;
    this.setOn = function() {
        n.gotoAndStop("on")
    }
    ;
    this.setOff = function() {
        n.gotoAndStop("off")
    }
    ;
    this._initListener = function() {
        n.on("mousedown", this.buttonDown);
        n.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(l, d, p) {
        m[l] = d;
        k[l] = p
    }
    ;
    this.addEventListenerWithParams = function(l, d, p, u) {
        m[l] = d;
        k[l] = p;
        r = u
    }
    ;
    this.buttonRelease = function() {
        m[ON_MOUSE_UP] && !1 === g && (playSound("press_but", 1, !1),
        m[ON_MOUSE_UP].call(k[ON_MOUSE_UP], r))
    }
    ;
    this.buttonDown = function() {
        m[ON_MOUSE_DOWN] && !1 === g && m[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], r)
    }
    ;
    this.setPosition = function(l, d) {
        n.x = l;
        n.y = d
    }
    ;
    this.setX = function(l) {
        n.x = l
    }
    ;
    this.setY = function(l) {
        n.y = l
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
    this._init(a, e, f)
}
function CMenu() {
    var a, e, f, g, m, k, r = null, n = null, l, d, p, u, c, t;
    this._init = function() {
        l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(l);
        var w = s_oSpriteLibrary.getSprite("but_play_bg");
        d = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 60,w,TEXT_PLAY,FONT_GAME,"#ffffff",32,s_oStage);
        d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            w = s_oSpriteLibrary.getSprite("audio_icon"),
            m = CANVAS_WIDTH - w.width / 4 - 10,
            k = w.height / 2 + 10,
            p = new CToggle(m,k,w,s_bAudioActive,s_oStage),
            p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            null === s_oSoundTrack ? s_oSoundTrack = playSound("soundtrack", SOUNDTRACK_VOLUME, !0) : setVolume("soundtrack", 1);
        SHOW_CREDITS ? (w = s_oSpriteLibrary.getSprite("but_credits"),
        a = w.height / 2 + 10,
        e = w.height / 2 + 10,
        u = new CGfxButton(a,e,w,s_oStage),
        u.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        f = a + w.width + 10,
        g = e) : (f = w.height / 2 + 10,
        g = w.height / 2 + 10);
        w = window.document;
        var z = w.documentElement;
        r = z.requestFullscreen || z.mozRequestFullScreen || z.webkitRequestFullScreen || z.msRequestFullscreen;
        n = w.exitFullscreen || w.mozCancelFullScreen || w.webkitExitFullscreen || w.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (r = !1);
        r && screenfull.isEnabled && (w = s_oSpriteLibrary.getSprite("but_fullscreen"),
        c = new CToggle(f,g,w,s_bFullscreen,s_oStage),
        c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        t = new createjs.Shape;
        t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(t);
        createjs.Tween.get(t).to({
            alpha: 0
        }, 600).call(function() {
            t.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(w, z) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || p.setPosition(m - w, z + k);
        SHOW_CREDITS && u.setPosition(a + w, e + z);
        r && screenfull.isEnabled && c.setPosition(f + w, g + z)
    }
    ;
    this.unload = function() {
        d.unload();
        d = null;
        SHOW_CREDITS && u.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            p.unload(),
            p = null;
        r && screenfull.isEnabled && c.unload();
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
        r && screenfull.isEnabled && c.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? n.call(window.document) : r.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a) {
    var e = !1, f, g = !0, m, k, r, n, l, d, p, u, c, t, w, z, J = 0, L, h, y, G, x, C, K, A, D, P, S, E, T, I, X = null, Z, U;
    this._init = function() {
        k = GAME_STATE_IDLE;
        m = !0;
        h = z = l = r = 0;
        C = [0, 1, 2, 3, 4];
        n = C[0];
        d = NUM_PAYLINES;
        w = TOTAL_MONEY;
        c = MIN_BET;
        t = c * d;
        K = [];
        for (var b = 0; b < NUM_ROWS; b++) {
            K[b] = [];
            for (var q = 0; q < NUM_REELS; q++)
                K[b][q] = 0
        }
        s_oTweenController = new CTweenController;
        E = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(E);
        this._initReels();
        T = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(T);
        this._initStaticSymbols();
        this._initHitAreaColumn();
        I = new CInterface(c,t,w);
        Z = new CBonusPanel;
        X = new CPayTablePanel;
        U = new CRechargePanel;
        w < t && (U.show(),
        I.disableSpin());
        e = !0
    }
    ;
    this.unload = function() {
        stopSound("reels");
        s_oStage.removeChild(E);
        s_oStage.removeChild(T);
        I.unload();
        X.unload();
        U.unload();
        for (var b = 0; b < y.length; b++)
            y[b].unload();
        for (b = 0; b < NUM_ROWS; b++)
            for (var q = 0; q < NUM_REELS; q++)
                G[b][q].unload();
        Z.unload()
    }
    ;
    this._initReels = function() {
        var b = REEL_OFFSET_X
          , q = REEL_OFFSET_Y
          , F = 0;
        y = [];
        for (var M = 0; M < NUM_REELS; M++)
            y[M] = new CReelColumn(M,b,q,F),
            y[M + NUM_REELS] = new CReelColumn(M + NUM_REELS,b,q + SYMBOL_SIZE * NUM_ROWS,F),
            b += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS,
            F += REEL_DELAY
    }
    ;
    this._initStaticSymbols = function() {
        var b = REEL_OFFSET_X
          , q = REEL_OFFSET_Y;
        G = [];
        for (var F = 0; F < NUM_ROWS; F++) {
            G[F] = [];
            for (var M = 0; M < NUM_REELS; M++) {
                var H = new CStaticSymbolCell(F,M,b,q);
                G[F][M] = H;
                b += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            b = REEL_OFFSET_X;
            q += SYMBOL_SIZE
        }
    }
    ;
    this._initHitAreaColumn = function() {
        S = [];
        P = [];
        F = 376;
        M = 120;
        for (var b = 0; b < NUM_REELS; b++) {
            var q = createBitmap(s_oSpriteLibrary.getSprite("hold_col"));
            q.x = F;
            q.y = M;
            q.visible = !1;
            s_oStage.addChild(q);
            F += 150;
            P.push(q);
            S[b] = !1
        }
        A = [];
        D = [];
        var F = 381
          , M = 108;
        b = s_oSpriteLibrary.getSprite("hit_area_col");
        for (q = 0; q < NUM_REELS; q++) {
            var H = new CTLText(s_oStage,F,M + b.height - 20,b.width,22,22,"center","#fff",FONT_GAME,1,0,0," ",!0,!0,!1,!1);
            H.setShadow("#000", 2, 2, 2);
            A[q] = H;
            H = new CGfxButton(F + b.width / 2,M + b.height / 2,b);
            H.setVisible(!1);
            H.addEventListenerWithParams(ON_MOUSE_UP, this._onHitAreaCol, this, {
                index: q
            });
            F += 150;
            D.push(H)
        }
    }
    ;
    this.generateFinalSymbols = function() {
        for (var b = 0; b < NUM_ROWS; b++)
            for (var q = 0; q < NUM_REELS; q++)
                !1 === y[q].isHold() && (K[b][q] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]);
        b = this._checkForCombos();
        this._checkForBonus();
        return b
    }
    ;
    this._checkForCombos = function() {
        x = [];
        for (var b = L = 0; b < d; b++) {
            var q = s_aPaylineCombo[b]
              , F = []
              , M = K[q[0].row][q[0].col];
            if (M !== BONUS_SYMBOL) {
                var H = 1
                  , v = 1;
                for (F.push({
                    row: q[0].row,
                    col: q[0].col,
                    value: K[q[0].row][q[0].col]
                }); M === WILD_SYMBOL && v < NUM_REELS; )
                    H++,
                    M = K[q[v].row][q[v].col],
                    F.push({
                        row: q[v].row,
                        col: q[v].col,
                        value: K[q[v].row][q[v].col]
                    }),
                    v++;
                for (; v < q.length; v++)
                    if (K[q[v].row][q[v].col] === M || K[q[v].row][q[v].col] === WILD_SYMBOL) {
                        if (K[q[v].row][q[v].col] === BONUS_SYMBOL)
                            break;
                        H++;
                        F.push({
                            row: q[v].row,
                            col: q[v].col,
                            value: K[q[v].row][q[v].col]
                        })
                    } else
                        break;
                M !== BONUS_SYMBOL && 0 < s_aSymbolWin[M - 1][H - 1] && (L += s_aSymbolWin[M - 1][H - 1],
                x.push({
                    line: b + 1,
                    amount: s_aSymbolWin[M - 1][H - 1],
                    num_win: H,
                    value: M,
                    list: F
                }))
            }
        }
        return L * c > t ? !0 : !1
    }
    ;
    this._checkForBonus = function() {
        f = !1;
        J = 0;
        for (var b = [], q = 0; q < NUM_ROWS; q++)
            for (var F = 0; F < NUM_REELS; F++)
                K[q][F] === BONUS_SYMBOL && (b.push({
                    row: q,
                    col: F,
                    value: K[q][F]
                }),
                J++);
        J >= NUM_SYMBOLS_FOR_BONUS && (x.push({
            line: -1,
            amount: 0,
            num_win: J,
            value: BONUS_SYMBOL,
            list: b
        }),
        5 < J && (J = 5),
        f = !0)
    }
    ;
    this._generateRandSymbols = function() {
        for (var b = [], q = 0; q < NUM_ROWS; q++)
            b[q] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return b
    }
    ;
    this.reelArrived = function(b, q) {
        if (r > MIN_REEL_LOOPS)
            if (n === q) {
                if (!1 === y[b].isReadyToStop()) {
                    var F = b;
                    b < NUM_REELS ? (F += NUM_REELS,
                    y[F].setReadyToStop(),
                    y[b].restart([K[0][b], K[1][b], K[2][b]], !0)) : (F -= NUM_REELS,
                    y[F].setReadyToStop(),
                    y[b].restart([K[0][F], K[1][F], K[2][F]], !0))
                }
            } else
                y[b].restart(this._generateRandSymbols(), !1);
        else
            y[b].restart(this._generateRandSymbols(), !1),
            0 === b && r++
    }
    ;
    this.increaseReelLoops = function() {
        r += 2
    }
    ;
    this.stopNextReel = function() {
        l++;
        0 === l % 2 && (playSound("reel_stop", .3, !1),
        n = C[l / 2],
        l === 2 * NUM_REELS && this._endReelAnimation())
    }
    ;
    this._endReelAnimation = function() {
        stopSound("reels");
        l = r = 0;
        n = C[0];
        for (var b = 0; b < NUM_REELS; b++)
            S[b] = !1,
            P[b].visible = !1,
            y[b].setHold(!1),
            y[b + NUM_REELS].setHold(!1);
        z = 0;
        if (0 < x.length) {
            for (var q = 0; q < x.length; q++) {
                X.highlightCombo(x[q].value, x[q].num_win);
                -1 !== x[q].line && I.showLine(x[q].line);
                var F = x[q].list;
                for (b = 0; b < F.length; b++)
                    G[F[b].row][F[b].col].show(F[b].value)
            }
            L *= c;
            w += L;
            SLOT_CASH -= L;
            0 < L && (I.refreshMoney(w),
            I.refreshWinText(L));
            p = 0;
            k = GAME_STATE_SHOW_ALL_WIN;
            playSound("win", 1, !1);
            m = !0;
            !1 === f && (I.disableBetBut(!1),
            I.enableGuiButtons())
        } else
            m ? (this.enableColumnHitArea(),
            m = !1,
            I.enableSpin(),
            I.disableMaxBet()) : (I.disableBetBut(!1),
            I.enableGuiButtons(),
            m = !0),
            k = GAME_STATE_IDLE;
        h++;
        h === aa && (h = 0,
        $(s_oMain).trigger("show_interlevel_ad"));
        $(s_oMain).trigger("save_score", w)
    }
    ;
    this.hidePayTable = function() {
        X.hide()
    }
    ;
    this._showWin = function() {
        if (0 < u) {
            stopSound("win");
            if (-1 !== x[u - 1].line) {
                var b = x[u - 1].line;
                I.hideLine(b)
            }
            b = x[u - 1].list;
            for (var q = 0; q < b.length; q++)
                G[b[q].row][b[q].col].stopAnim()
        }
        u === x.length && (u = 0);
        -1 !== x[u].line && (b = x[u].line,
        I.showLine(b));
        b = x[u].list;
        for (q = 0; q < b.length; q++)
            G[b[q].row][b[q].col].show(b[q].value);
        u++
    }
    ;
    this._hideAllWins = function() {
        for (var b = 0; b < x.length; b++)
            for (var q = x[b].list, F = 0; F < q.length; F++)
                G[q[F].row][q[F].col].stopAnim();
        I.hideAllLines();
        u = p = 0;
        p = TIME_SHOW_WIN;
        k = GAME_STATE_SHOW_WIN;
        f && Z.show(J, c)
    }
    ;
    this.enableColumnHitArea = function() {
        for (var b = 0; b < NUM_REELS; b++)
            A[b].refreshText(TEXT_HOLD),
            D[b].setVisible(!0)
    }
    ;
    this.disableColumnHitArea = function() {
        for (var b = 0; b < NUM_REELS; b++)
            A[b].refreshText(" "),
            D[b].setVisible(!1)
    }
    ;
    this.activateLines = function(b) {
        d = b;
        this.removeWinShowing();
        t = b = c * d;
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        b > w ? I.disableSpin() : I.enableSpin()
    }
    ;
    this.addLine = function() {
        d === NUM_PAYLINES ? d = 1 : d++;
        var b = c * d;
        t = b;
        t = Math.floor(100 * t) / 100;
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        b > w ? I.disableSpin() : I.enableSpin()
    }
    ;
    this.changeCoinBet = function() {
        var b = Math.floor(100 * (c + .05)) / 100;
        b > MAX_BET ? (c = MIN_BET,
        t = c * d,
        t = Math.floor(100 * t) / 100,
        I.refreshBet(c),
        I.refreshTotalBet(t),
        b = t) : (b *= d,
        c += .05,
        c = Math.floor(100 * c) / 100,
        t = b,
        t = Math.floor(100 * t) / 100,
        I.refreshBet(c),
        I.refreshTotalBet(t));
        b > w ? I.disableSpin() : I.enableSpin()
    }
    ;
    this.onMaxBet = function() {
        var b = MAX_BET;
        d = NUM_PAYLINES;
        b *= d;
        c = MAX_BET;
        t = b;
        I.refreshBet(c);
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        b > w ? (I.disableSpin(),
        U.show()) : (I.enableSpin(),
        this.onSpin())
    }
    ;
    this._onHitAreaCol = function(b) {
        b = b.index;
        !0 === S[b] ? (S[b] = !1,
        P[b].visible = !1,
        A[b].refreshText(TEXT_HOLD),
        z--,
        y[b].setHold(!1),
        y[b + NUM_REELS].setHold(!1)) : z < MAX_NUM_HOLD && (S[b] = !0,
        z++,
        P[b].visible = !0,
        A[b].refreshText(" "),
        y[b].setHold(!0),
        y[b + NUM_REELS].setHold(!0),
        playSound("press_hold", 1, !1))
    }
    ;
    this.removeWinShowing = function() {
        X.resetHighlightCombo();
        I.resetWin();
        for (var b = 0; b < NUM_ROWS; b++)
            for (var q = 0; q < NUM_REELS; q++)
                G[b][q].hide();
        for (b = 0; b < y.length; b++)
            y[b].activate();
        k = GAME_STATE_IDLE
    }
    ;
    this.endBonus = function(b) {
        b *= c;
        w += b;
        I.refreshMoney(w);
        SLOT_CASH -= b;
        I.disableBetBut(!1);
        I.enableGuiButtons();
        $(s_oMain).trigger("bonus_end", w);
        $(s_oMain).trigger("save_score", w)
    }
    ;
    this.setMoney = function(b) {
        w = b;
        I.refreshMoney(w);
        I.enableGuiButtons()
    }
    ;
    this.onSpin = function() {
        if (m && w < t)
            U.show();
        else {
            stopSound("win");
            playSound("reels", .3, !1);
            this.disableColumnHitArea();
            I.disableBetBut(!0);
            this.removeWinShowing();
            MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
            for (var b = 0; b < s_aSymbolWin.length; b++)
                for (var q = s_aSymbolWin[b], F = 0; F < q.length; F++)
                    0 !== q[F] && q[F] < MIN_WIN && (MIN_WIN = q[F]);
            MIN_WIN *= c;
            m && (w -= t,
            I.refreshMoney(w),
            SLOT_CASH += t,
            $(s_oMain).trigger("bet_placed", {
                bet: c,
                tot_bet: t
            }));
            if (!g && y[0].visible && y[1].visible && this._checkForCombos())
                this._assignWin();
            else if (SLOT_CASH < MIN_WIN) {
                do
                    b = this.generateFinalSymbols();
                while (!0 === b || f)
            } else if (Math.floor(100 * Math.random()) > WIN_OCCURRENCE) {
                do
                    b = this.generateFinalSymbols();
                while (!0 === b || f)
            } else
                this._assignWin();
            I.hideAllLines();
            I.disableGuiButtons();
            g = !1;
            k = GAME_STATE_SPINNING
        }
    }
    ;
    this._printFinalSymbols = function() {
        for (var b = 0; b < NUM_ROWS; b++)
            for (var q = 0; q < NUM_REELS; q++)
                trace("_aFinalSymbolCombo[" + b + "][" + q + "]: " + K[b][q])
    }
    ;
    this._assignWin = function() {
        if (SLOT_CASH < BONUS_PRIZE[0][0] * c) {
            var b = 0;
            do {
                var q = this.generateFinalSymbols();
                b++
            } while ((!1 === q || L * c > SLOT_CASH || f) && 1E4 >= b)
        } else if (Math.floor(100 * Math.random()) >= BONUS_OCCURRENCE) {
            b = 0;
            do
                q = this.generateFinalSymbols(),
                b++;
            while ((!1 === q || L * c > SLOT_CASH || f) && 1E4 >= b)
        } else {
            b = 0;
            do {
                q = this.generateFinalSymbols();
                var F = 0;
                f && (F = J - 3);
                b++
            } while ((!1 === q || L * c + BONUS_PRIZE[F][0] * c > SLOT_CASH || !1 === f) && 1E4 >= b)
        }
        if (1E4 < b) {
            do
                q = this.generateFinalSymbols();
            while (!0 === q || f)
        }
    }
    ;
    this.onInfoClicked = function() {
        k !== GAME_STATE_SPINNING && (X.isVisible() ? X.hide() : X.show())
    }
    ;
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", {
            img: "200x200.jpg",
            title: TEXT_CONGRATULATIONS,
            msg: TEXT_MSG_SHARE1 + w + TEXT_MSG_SHARE2,
            msg_share: TEXT_MSG_SHARING1 + w + TEXT_MSG_SHARING2
        })
    }
    ;
    this.getState = function() {
        return k
    }
    ;
    this.update = function() {
        if (!1 !== e)
            switch (k) {
            case GAME_STATE_SPINNING:
                for (var b = 0; b < y.length; b++)
                    y[b].update(n);
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                p += s_iTimeElaps;
                p > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                p += s_iTimeElaps,
                p > TIME_SHOW_WIN && (p = 0,
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
    PERC_WIN_EGG_1 = a.perc_win_egg_1;
    PERC_WIN_EGG_2 = a.perc_win_egg_2;
    PERC_WIN_EGG_3 = a.perc_win_egg_3;
    var aa = a.num_spin_ads_showing;
    new CSlotSettings;
    this._init()
}
var s_oGame, s_oTweenController;
function CReelColumn(a, e, f, g) {
    var m, k, r, n, l, d, p, u, c, t, w, z, J, L, h;
    this._init = function(y, G, x, C) {
        n = r = k = m = !1;
        u = 0;
        l = y;
        p = C;
        d = l < NUM_REELS ? l : l - NUM_REELS;
        t = 0;
        w = MAX_FRAMES_REEL_EASE;
        c = REEL_STATE_START;
        z = x;
        J = z + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(G, x)
    }
    ;
    this.initContainer = function(y, G) {
        h = new createjs.Container;
        h.x = y;
        h.y = G;
        var x = 0;
        L = [];
        for (var C = 0; C < NUM_ROWS; C++) {
            var K = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            K.stop();
            K.x = 0;
            K.y = x;
            h.addChild(K);
            L[C] = K;
            x += SYMBOL_SIZE
        }
        s_oStage.addChild(h)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(h)
    }
    ;
    this.activate = function() {
        z = h.y;
        J = z + SYMBOL_SIZE * NUM_ROWS;
        m = !0
    }
    ;
    this._setSymbol = function(y) {
        h.removeAllChildren();
        for (var G = 0, x = 0; x < y.length; x++) {
            var C = new createSprite(s_aSymbolData[y[x]],"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
            C.stop();
            C.x = 0;
            C.y = G;
            h.addChild(C);
            L[x] = C;
            G += SYMBOL_SIZE
        }
    }
    ;
    this.setHold = function(y) {
        m = !1;
        n = y;
        u = 0
    }
    ;
    this.restart = function(y, G) {
        h.y = z = REEL_START_Y;
        J = z + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(y);
        if (k = G) {
            t = 0;
            w = MAX_FRAMES_REEL_EASE;
            c = REEL_STATE_STOP;
            for (var x = 0; x < NUM_ROWS; x++)
                L[x].gotoAndStop("static");
            r = !0
        } else
            for (x = 0; x < NUM_ROWS; x++)
                L[x].gotoAndStop("moving")
    }
    ;
    this.setReadyToStop = function() {
        t = 0;
        w = MAX_FRAMES_REEL_EASE;
        c = REEL_STATE_STOP
    }
    ;
    this.isReadyToStop = function() {
        return k
    }
    ;
    this.isHold = function() {
        return n
    }
    ;
    this._updateStart = function() {
        0 === t && l < NUM_REELS && playSound("start_reel", .3, !1);
        t++;
        t > w && (t = 0,
        w /= 2,
        c++,
        z = h.y,
        J = z + SYMBOL_SIZE * NUM_ROWS);
        var y = s_oTweenController.easeInBack(t, 0, 1, w);
        y = s_oTweenController.tweenValue(z, J, y);
        h.y = y
    }
    ;
    this._updateMoving = function() {
        t++;
        t > w && (t = 0,
        z = h.y,
        J = z + SYMBOL_SIZE * NUM_ROWS);
        var y = s_oTweenController.easeLinear(t, 0, 1, w);
        y = s_oTweenController.tweenValue(z, J, y);
        h.y = y
    }
    ;
    this._updateStopping = function() {
        t++;
        if (t >= w)
            m = !1,
            t = 0,
            w = MAX_FRAMES_REEL_EASE,
            c = REEL_STATE_START,
            u = 0,
            k = !1,
            r && (r = !1,
            h.y = REEL_OFFSET_Y),
            s_oGame.stopNextReel();
        else {
            var y = s_oTweenController.easeOutCubic(t, 0, 1, w);
            y = s_oTweenController.tweenValue(z, J, y);
            h.y = y
        }
    }
    ;
    this.update = function(y) {
        if (!1 !== m && (u++,
        u > p))
            if (n)
                y === l && (m = !1,
                s_oGame.stopNextReel(),
                s_oGame.stopNextReel(),
                0 === l && s_oGame.increaseReelLoops());
            else
                switch (!1 === k && h.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(l, d),
                c) {
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
    var g, m, k, r, n, l, d, p, u, c, t, w, z, J, L, h, y = null, G = null, x, C, K, A;
    this._init = function(D, P, S) {
        var E = s_oSpriteLibrary.getSprite("but_exit");
        k = CANVAS_WIDTH - E.width / 2 - 10;
        r = E.height / 2 + 10;
        u = new CGfxButton(k,r,E,!0);
        u.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var T = s_oSpriteLibrary.getSprite("audio_icon");
            n = u.getX() - T.width / 2;
            l = E.height / 2 + 10;
            z = new CToggle(n,l,T,s_bAudioActive,s_oStage);
            z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            g = n - T.width / 2;
            m = l
        } else
            g = u.getX() - E.width,
            m = E.height / 2 + 10;
        E = window.document;
        T = E.documentElement;
        y = T.requestFullscreen || T.mozRequestFullScreen || T.webkitRequestFullScreen || T.msRequestFullscreen;
        G = E.exitFullscreen || E.mozCancelFullScreen || E.webkitExitFullscreen || E.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (y = !1);
        y && screenfull.isEnabled && (E = s_oSpriteLibrary.getSprite("but_fullscreen"),
        h = new CToggle(g,m,E,s_bFullscreen,s_oStage),
        h.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        E = s_oSpriteLibrary.getSprite("spin_but");
        c = new CTextButton(1090 + E.width / 2,CANVAS_HEIGHT - E.height / 2,E,"",FONT_GAME,"#ffde00",22,s_oStage);
        c.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        E = s_oSpriteLibrary.getSprite("info_but");
        t = new CTextButton(328 + E.width / 2,CANVAS_HEIGHT - E.height / 2,E,TEXT_INFO,FONT_GAME,"#ffffff",30,s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        E = s_oSpriteLibrary.getSprite("but_lines_bg");
        w = new CTextButton(494 + E.width / 2,CANVAS_HEIGHT - E.height / 2,E,TEXT_LINES,FONT_GAME,"#ffffff",30,s_oStage);
        w.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        A = new CTLText(s_oStage,494,CANVAS_HEIGHT - 86,E.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,NUM_PAYLINES,!0,!0,!1,!1);
        A.setShadow("#000", 2, 2, 2);
        E = s_oSpriteLibrary.getSprite("coin_but");
        J = new CTextButton(680 + E.width / 2,CANVAS_HEIGHT - E.height / 2,E,TEXT_COIN,FONT_GAME,"#ffffff",30,s_oStage);
        J.addEventListener(ON_MOUSE_UP, this._onBet, this);
        x = new CTLText(s_oStage,680,CANVAS_HEIGHT - 86,E.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,D.toFixed(2),!0,!0,!1,!1);
        x.setShadow("#000", 2, 2, 2);
        E = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        L = new CTextButton(866 + E.width / 2,CANVAS_HEIGHT - E.height / 2,E,TEXT_MAX_BET,FONT_GAME,"#ffffff",30,s_oStage);
        L.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        K = new CTLText(s_oStage,866,CANVAS_HEIGHT - 86,E.width,26,26,"center","#ffffff",FONT_GAME,1,0,0,TEXT_BET + ": " + P.toFixed(2),!0,!0,!1,!1);
        K.setShadow("#000", 2, 2, 2);
        C = new CTLText(s_oStage,349,22,E.width - 20,60,60,"center","#ffde00",FONT_GAME,1,0,0,TEXT_MONEY + "\n" + S.toFixed(2) + TEXT_CURRENCY,!0,!0,!0,!1);
        E = s_oSpriteLibrary.getSprite("bet_but");
        d = [];
        D = new CBetBut(334 + E.width / 2,282 + E.height / 2);
        D.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        d[0] = D;
        D = new CBetBut(334 + E.width / 2,180 + E.height / 2);
        D.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        d[1] = D;
        D = new CBetBut(334 + E.width / 2,432 + E.height / 2);
        D.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        d[2] = D;
        D = new CBetBut(334 + E.width / 2,114 + E.height / 2);
        D.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        d[3] = D;
        D = new CBetBut(334 + E.width / 2,502 + E.height / 2);
        D.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        d[4] = D;
        p = [];
        for (D = 0; D < NUM_PAYLINES; D++)
            P = new createjs.Bitmap(s_oSpriteLibrary.getSprite("payline_" + (D + 1))),
            P.visible = !1,
            s_oStage.addChild(P),
            p[D] = P;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        u.unload();
        u = null;
        c.unload();
        c = null;
        t.unload();
        t = null;
        w.unload();
        w = null;
        J.unload();
        J = null;
        L.unload();
        L = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            z.unload(),
            z = null;
        y && screenfull.isEnabled && h.unload();
        for (var D = 0; D < NUM_PAYLINES; D++)
            d[D].unload();
        s_oStage.removeAllChildren();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(D, P) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || z.setPosition(n - D, P + l);
        y && screenfull.isEnabled && h.setPosition(g - D, m + P);
        u.setPosition(k - D, P + r)
    }
    ;
    this.refreshMoney = function(D) {
        C.refreshText(TEXT_MONEY + "\n" + D.toFixed(2) + TEXT_CURRENCY)
    }
    ;
    this.refreshBet = function(D) {
        x.refreshText(D.toFixed(2))
    }
    ;
    this.refreshTotalBet = function(D) {
        K.refreshText(TEXT_BET + ": " + D.toFixed(2))
    }
    ;
    this.refreshNumLines = function(D) {
        A.refreshText(D);
        for (var P = 0; P < NUM_PAYLINES; P++)
            P < D ? (d[P].setOn(),
            p[P].visible = !0) : d[P].setOff();
        setTimeout(function() {
            for (var S = 0; S < NUM_PAYLINES; S++)
                p[S].visible = !1
        }, 1E3)
    }
    ;
    this.resetWin = function() {
        c.changeText("")
    }
    ;
    this.refreshWinText = function(D) {
        c.changeText(TEXT_WIN + "\n" + D.toFixed(2))
    }
    ;
    this.showLine = function(D) {
        p[D - 1].visible = !0
    }
    ;
    this.hideLine = function(D) {
        p[D - 1].visible = !1
    }
    ;
    this.hideAllLines = function() {
        for (var D = 0; D < NUM_PAYLINES; D++)
            p[D].visible = !1
    }
    ;
    this.disableBetBut = function(D) {
        for (var P = 0; P < NUM_PAYLINES; P++)
            d[P].disable(D)
    }
    ;
    this.enableGuiButtons = function() {
        c.enable();
        L.enable();
        J.enable();
        w.enable();
        t.enable()
    }
    ;
    this.enableSpin = function() {
        c.enable();
        L.enable()
    }
    ;
    this.disableSpin = function() {
        c.disable();
        L.disable()
    }
    ;
    this.enableMaxBet = function() {
        L.enable()
    }
    ;
    this.disableMaxBet = function() {
        L.disable()
    }
    ;
    this.disableGuiButtons = function() {
        c.disable();
        L.disable();
        J.disable();
        w.disable();
        t.disable()
    }
    ;
    this._onBetLineClicked = function(D) {
        this.refreshNumLines(D);
        s_oGame.activateLines(D)
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
        y && screenfull.isEnabled && h.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? G.call(window.document) : y.call(window.document.documentElement);
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
        new CTLText(g,528,286,210,130,21,"center","#ffde00",FONT_GAME,1,0,0,TEXT_HELP_WILD,!0,!0,!0,!1);
        new CTLText(g,908,286,210,130,21,"center","#ffde00",FONT_GAME,1,0,0,TEXT_HELP_BONUS,!0,!0,!0,!1);
        g.visible = !1;
        s_oStage.addChild(g);
        var m = this;
        g.on("pressup", function() {
            m._onExit()
        })
    }
    ;
    this.unload = function() {
        var m = this;
        g.off("pressup", function() {
            m._onExit()
        });
        s_oStage.removeChild(g);
        for (var k = 0; k < a.length; k++)
            g.removeChild(a[k]);
        for (k = 0; k < e.length; k++)
            g.removeChild(e[k])
    }
    ;
    this._createPayouts = function() {
        a = [];
        e = [];
        for (var m = [{
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
        }], k = 0, r = 0; r < s_aSymbolWin.length; r++) {
            for (var n = [], l = 0; l < s_aSymbolWin[r].length; l++)
                n[l] = s_aSymbolWin[r][l];
            do
                l = n.indexOf(0),
                -1 !== l && n.splice(l, 1);
            while (-1 !== l);
            l = n.length;
            if (0 !== l) {
                var d = 30;
                4 === l && (d = 22);
                var p = m[k].y;
                a[r] = [];
                e[r] = [];
                for (var u = 0; u < l; u++) {
                    var c = new createjs.Text("X" + (5 - u),"25px " + FONT_GAME,"#ffffff");
                    c.textAlign = "center";
                    c.x = m[k].x;
                    c.y = p;
                    c.textBaseline = "alphabetic";
                    g.addChild(c);
                    a[r][u] = c;
                    var t = new createjs.Text(n[l - u - 1],"25px " + FONT_GAME,"#ffff00");
                    t.textAlign = "center";
                    t.x = c.x + 50;
                    t.y = c.y;
                    t.textBaseline = "alphabetic";
                    g.addChild(t);
                    e[r][u] = t;
                    p += d
                }
                k++
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
        for (var m = 0; m < a.length; m++)
            for (var k = 0; k < a[m].length; k++)
                a[m][k].color = "#ffffff",
                e[m][k].color = "#ffff00",
                createjs.Tween.removeTweens(e[m][k]),
                e[m][k].alpha = 1
    }
    ;
    this.highlightCombo = function(m, k) {
        m !== BONUS_SYMBOL && (e[m - 1][NUM_REELS - k].color = "#ff0000",
        this.tweenAlpha(e[m - 1][NUM_REELS - k], 0))
    }
    ;
    this.tweenAlpha = function(m, k) {
        var r = this;
        createjs.Tween.get(m).to({
            alpha: k
        }, 200).call(function() {
            1 === k ? r.tweenAlpha(m, 0) : r.tweenAlpha(m, 1)
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
    var m = -1, k, r, n, l;
    this._init = function(d, p, u, c) {
        l = new createjs.Container;
        l.visible = !1;
        r = [];
        for (d = 0; d < NUM_SYMBOLS; d++)
            p = createSprite(s_aSymbolAnims[d], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE),
            p.stop(),
            p.x = u,
            p.y = c,
            p.on("animationend", this._onAnimEnded, null, !1, {
                index: d
            }),
            l.addChild(p),
            r[d] = p,
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
        n = new createSprite(d,"static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
        n.stop();
        n.x = u;
        n.y = c;
        l.addChild(n);
        s_oStage.addChild(l)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(l)
    }
    ;
    this.hide = function() {
        -1 < m && (n.gotoAndStop("static"),
        n.visible = !1,
        r[m].gotoAndPlay("static"),
        l.visible = !1)
    }
    ;
    this.show = function(d) {
        n.gotoAndPlay("anim");
        n.visible = !0;
        for (var p = 0; p < NUM_SYMBOLS; p++)
            r[p].visible = p + 1 === d ? !0 : !1;
        r[d - 1].gotoAndPlay("anim");
        m = d - 1;
        k = r[d - 1].spriteSheet.getNumFrames();
        l.visible = !0
    }
    ;
    this._onAnimEnded = function(d, p) {
        r[p.index].currentFrame !== k && (r[p.index].stop(),
        setTimeout(function() {
            r[p.index].gotoAndPlay(1)
        }, 100))
    }
    ;
    this.stopAnim = function() {
        r[m].gotoAndStop("static");
        r[m].visible = !1;
        n.gotoAndStop("static");
        n.visible = !1
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
    var a, e, f, g, m, k, r, n, l, d;
    this._init = function() {
        d = new createjs.Container;
        s_oStage.addChild(d);
        var p = createBitmap(s_oSpriteLibrary.getSprite("bonus_bg"));
        d.alpha = 0;
        d.visible = !1;
        d.addChild(p);
        p = {
            framerate: 3,
            images: [s_oSpriteLibrary.getSprite("chicken")],
            frames: {
                width: CHICKEN_WIDTH,
                height: CHICKEN_HEIGHT,
                regX: CHICKEN_WIDTH / 2,
                regY: CHICKEN_HEIGHT / 2
            },
            animations: {
                idle: [0, 5, "idle"],
                lay_egg: [6, 9, "lay_egg"],
                idle_rand_0: [1, 5, "idle"],
                idle_rand_1: [2, 5, "idle"],
                idle_rand_2: [3, 5, "idle"],
                idle_rand_3: [4, 5, "idle"],
                right: [3],
                left: [4]
            }
        };
        p = new createjs.SpriteSheet(p);
        g = [];
        for (var u = 420, c = 0; 5 > c; c++) {
            var t = createSprite(p, "idle", CHICKEN_WIDTH / 2, CHICKEN_HEIGHT / 2, CHICKEN_WIDTH, CHICKEN_HEIGHT);
            t.on("click", this._onChickenReleased, this, !1, c);
            t.x = u;
            t.y = 286;
            t.stop();
            t.visible = !1;
            d.addChild(t);
            u += 164;
            g[c] = t
        }
        u = s_oSpriteLibrary.getSprite("egg");
        p = {
            framerate: 10,
            images: [u],
            frames: {
                width: Math.floor(u.width / NUM_PRIZES),
                height: u.height,
                regX: Math.floor(u.width / NUM_PRIZES) / 2,
                regY: u.height / 2
            },
            animations: {
                egg_0: [0],
                egg_1: [1],
                egg_2: [2]
            }
        };
        p = new createjs.SpriteSheet(p);
        n = createSprite(p, "egg_0", Math.floor(u.width / NUM_PRIZES) / 2, u.height / 2, Math.floor(u.width / NUM_PRIZES), u.height);
        d.addChild(n);
        c = new createjs.Shape;
        c.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(110, 390, 1E3, 160);
        d.addChild(c);
        n.mask = c;
        k = [];
        r = [];
        k[0] = createSprite(p, "egg_0", Math.floor(u.width / NUM_PRIZES) / 2, u.height / 2, Math.floor(u.width / NUM_PRIZES), u.height);
        k[0].x = 350;
        k[0].y = CANVAS_HEIGHT - 70;
        d.addChild(k[0]);
        c = new createjs.Text("100","34px " + FONT_GAME,"#ffff00");
        c.textAlign = "left";
        c.x = k[0].x + u.width / NUM_PRIZES / 2 + 6;
        c.y = k[0].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        r.push(c);
        k[1] = createSprite(p, "egg_1", Math.floor(u.width / NUM_PRIZES) / 2, u.height / 2, Math.floor(u.width / NUM_PRIZES), u.height);
        k[1].x = 650;
        k[1].y = CANVAS_HEIGHT - 70;
        d.addChild(k[1]);
        c = new createjs.Text("200","34px " + FONT_GAME,"#ffff00");
        c.textAlign = "left";
        c.x = k[1].x + +(u.width / NUM_PRIZES) / 2 + 6;
        c.y = k[1].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        r.push(c);
        k[2] = createSprite(p, "egg_2", Math.floor(u.width / NUM_PRIZES) / 2, u.height / 2, Math.floor(u.width / NUM_PRIZES), u.height);
        k[2].x = 950;
        k[2].y = CANVAS_HEIGHT - 70;
        d.addChild(k[2]);
        c = new createjs.Text("300","34px " + FONT_GAME,"#ffff00");
        c.textAlign = "left";
        c.x = k[2].x + +(u.width / NUM_PRIZES) / 2 + 6;
        c.y = k[2].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        r.push(c);
        l = new createjs.Text("X 300","80px " + FONT_GAME,"#ffff00");
        l.alpha = 0;
        l.textAlign = "center";
        l.shadow = new createjs.Shadow("#000",2,2,2);
        l.x = CANVAS_WIDTH / 2;
        l.y = 150;
        l.textBaseline = "alphabetic";
        d.addChild(l)
    }
    ;
    this.unload = function() {
        for (var p = 0; 5 > p; p++)
            g[p].off("click", this._onChickenReleased)
    }
    ;
    this.show = function(p, u) {
        $(s_oMain).trigger("bonus_start");
        f = u;
        a = !1;
        l.alpha = 0;
        switch (p) {
        case 3:
            m = BONUS_PRIZE[0];
            break;
        case 4:
            m = BONUS_PRIZE[1];
            break;
        case 5:
            m = BONUS_PRIZE[2];
            break;
        default:
            m = BONUS_PRIZE[0]
        }
        r[0].text = "X" + m[0];
        r[1].text = "X" + m[1];
        r[2].text = "X" + m[2];
        n.x = 118;
        n.y = 308;
        n.rotation = 0;
        n.gotoAndStop("egg_0");
        for (var c = 0; c < p; c++) {
            var t = Math.floor(4 * Math.random());
            g[c].framerate = 3;
            g[c].visible = !0;
            g[c].gotoAndPlay("idle_rand_" + t)
        }
        d.visible = !0;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 1E3);
        setVolume("soundtrack", 0);
        playSound("soundtrack_bonus", 1, !0)
    }
    ;
    this._onChickenReleased = function(p, u) {
        if (!a) {
            a = !0;
            do
                var c = Math.floor(Math.random() * s_aEggOccurence.length);
            while (m[s_aEggOccurence[c]] * f > SLOT_CASH);
            this.playChickenLayAnim(u, s_aEggOccurence[c]);
            playSound("choose_chicken", 1, !1)
        }
    }
    ;
    this.playChickenLayAnim = function(p, u) {
        e = m[u];
        n.gotoAndStop("egg_" + u);
        for (var c = 0; 5 > c; c++)
            c < p ? g[c].gotoAndStop("right") : c === p ? (g[p].framerate = 10,
            g[p].gotoAndPlay("lay_egg")) : g[c].gotoAndStop("left");
        var t = this;
        setTimeout(function() {
            t.layEgg(p)
        }, 2500)
    }
    ;
    this.layEgg = function(p) {
        g[p].gotoAndStop(5);
        n.x = g[p].x;
        var u = this;
        createjs.Tween.get(n).to({
            y: 460
        }, 300).call(function() {
            u.endBonus()
        });
        playSound("reveal_egg", 1, !1)
    }
    ;
    this.endBonus = function() {
        l.text = "X " + e;
        createjs.Tween.get(l).to({
            alpha: 1
        }, 500);
        createjs.Tween.get(n).to({
            rotation: 110
        }, 500);
        setTimeout(function() {
            d.alpha = 0;
            d.visible = !1;
            for (var p = 0; p < g.length; p++)
                g[p].visible = !1;
            setVolume("soundtrack", SOUNDTRACK_VOLUME);
            stopSound("soundtrack_bonus");
            s_oGame.endBonus(e)
        }, 4E3)
    }
    ;
    this._init()
}
function CCreditsPanel() {
    var a, e, f, g, m, k, r, n, l, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        s_oStage.addChild(d);
        var p = new createjs.Shape;
        p.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.addChild(p);
        e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(e);
        r = new createjs.Shape;
        r.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        r.alpha = .01;
        r.on("click", this._onLogoButRelease);
        d.addChild(r);
        p = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 245;
        g = new CGfxButton(a,155,p,d);
        g.addEventListener(ON_MOUSE_UP, this.unload, this);
        k = new createjs.Text(TEXT_CREDITS_DEVELOPED,"40px " + FONT_GAME,"#000");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 270;
        k.outline = 2;
        d.addChild(k);
        m = new createjs.Text(TEXT_CREDITS_DEVELOPED,"40px " + FONT_GAME,"#fff");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 270;
        d.addChild(m);
        p = s_oSpriteLibrary.getSprite("logo_ctl");
        f = createBitmap(p);
        f.regX = p.width / 2;
        f.regY = p.height / 2;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        d.addChild(f);
        l = new createjs.Text("www.codethislab.com","34px " + FONT_GAME,"#000");
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = CANVAS_WIDTH / 2;
        l.y = 395;
        l.outline = 2;
        d.addChild(l);
        n = new createjs.Text("www.codethislab.com","34px " + FONT_GAME,"#fff");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.x = CANVAS_WIDTH / 2;
        n.y = 395;
        d.addChild(n);
        createjs.Tween.get(d).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(p, u) {}
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
function CTLText(a, e, f, g, m, k, r, n, l, d, p, u, c, t, w, z, J) {
    this._oContainer = a;
    this._x = e;
    this._y = f;
    this._iWidth = g;
    this._iHeight = m;
    this._bMultiline = z;
    this._iFontSize = k;
    this._szAlign = r;
    this._szColor = n;
    this._szFont = l;
    this._iPaddingH = p;
    this._iPaddingV = u;
    this._bVerticalAlign = w;
    this._bFitText = t;
    this._bDebug = J;
    this._oDebugShape = null;
    this._fLineHeightFactor = d;
    this._oText = null;
    c && this.__createText(c)
}
function CRechargePanel() {
    var a, e, f, g, m, k, r = this;
    this._init = function() {
        k = new createjs.Container;
        k.visible = !1;
        s_oStage.addChild(k);
        e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        a = e.on("click", function() {});
        k.addChild(e);
        m = new CTLText(k,CANVAS_WIDTH / 2 - 240,170,480,150,40,"center","#000",FONT_GAME,1,0,0,TEXT_NO_MONEY,!0,!0,!0,!1);
        m.setOutline(3);
        new CTLText(k,CANVAS_WIDTH / 2 - 240,170,480,150,40,"center","#fff",FONT_GAME,1,0,0,TEXT_NO_MONEY,!0,!0,!0,!1);
        g = new CTextButton(CANVAS_WIDTH / 2 - 150,CANVAS_HEIGHT / 2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_EXIT,FONT_GAME,"#fff",40,k);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = new CTextButton(CANVAS_WIDTH / 2 + 150,CANVAS_HEIGHT / 2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_RECHARGE,FONT_GAME,"#fff",40,k);
        f.addEventListener(ON_MOUSE_UP, this._onRecharge, this)
    }
    ;
    this.unload = function() {
        e.off("click", a);
        g.unload();
        g = null;
        f.unload();
        s_oStage.removeChild(k)
    }
    ;
    this.show = function() {
        k.alpha = 0;
        k.visible = !0;
        createjs.Tween.get(k).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut)
    }
    ;
    this.hide = function() {
        k.visible = !1
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
            } catch (m) {
                var g = window.location.ancestorOrigins;
                f = g[g.length - 1]
            }
        } catch (m) {
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
$globale = {
    emptyFn: function () {
    }
};
function $id(domid) {
    return typeof domid === "object" ? domid : document.getElementById(domid)
}
function $ns(str, fn) {
    if (!/^\w+(\.\w+)*$/.test(str)) {
        return false
    }
    var arr = str.split("."), _parent = this;
    for (var i = 0, l = arr.length; i < l; i++) {
        var o = arr[i];
        !_parent[o] && (_parent[o] = {});
        _parent = _parent[o]
    }
    if (fn) {
        fn.call(_parent)
    }
}
function $select(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i];
        if (fn(item) === true) {
            return item
        }
    }
    return null
}
function $addEvent(el, eName, fn) {
    if ("addEventListener"in el) {
        el.addEventListener(eName, fn)
    } else if ("attachEvent"in el) {
        el.attachEvent("on" + eName, fn)
    }
}
function $preventDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault()
    } else {
        window.event.returnValue = false
    }
    return false
}
function $removeEvents(el, eName, fn) {
    if ("addEventListener"in el) {
        el.removeEventListener(eName, fn, false)
    } else if ("attachEvent"in el) {
        el.detachEvent("on" + eName, fn)
    }
}
function $getTimer() {
    return Date.now ? Date.now() : (new Date).getTime()
}
function $fnProxy(opt) {
    if (parent) {
        parent.PLS.client.externalProxy(opt)
    }
}
function $dateFormat(date, fmt) {
    if (typeof date === "number") {
        date = new Date(date)
    }
    var isValidDate = date instanceof Date && !isNaN(date.getYear());
    if (!isValidDate) {
        return false
    }
    var _date_format = /(Y{2,4})|(M{1,2})|(D{1,2})|(h{1,2})|(m{1,2})|(s{1,2})/g;
    return fmt.replace(_date_format, function (self, Y, M, D, h, m, s) {
        var txt;
        switch (true) {
            case!!Y:
                txt = date.getFullYear().toString();
                return txt.substr(txt.length - Y.length);
            case!!M:
                txt = "0" + (date.getMonth() + 1);
                return txt.substr(txt.length - M.length);
            case!!D:
                txt = "0" + date.getDate();
                return txt.substr(txt.length - D.length);
            case!!h:
                txt = "0" + date.getHours();
                return txt.substr(txt.length - h.length);
            case!!m:
                txt = "0" + date.getMinutes();
                return txt.substr(txt.length - m.length);
            case!!s:
                txt = "0" + date.getSeconds();
                return txt.substr(txt.length - s.length);
            default:
                return ""
        }
    })
}
var $cookie = {
    set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true
    }, get: function (name) {
        if (!name || !this.has(name)) {
            return null
        }
        var reg = new RegExp("(?:^|.*;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*");
        return decodeURIComponent(document.cookie.replace(reg, "$1"))
    }, del: function (name, domain) {
        if (!name || !this.has(name)) {
            return false
        }
        document.cookie = encodeURIComponent(name) + "=; max-age=0; path=/; " + "domain=" + domain;
        return true
    }, has: function (name) {
        var reg = new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=");
        return reg.test(document.cookie)
    }
};
function $isBrowser(str) {
    var str = str.toLowerCase(), b = navigator.userAgent.toLowerCase();
    var arrB = {
        firefox: b.indexOf("firefox") > -1,
        opera: b.indexOf("opera") > -1,
        safari: b.indexOf("safari") > -1,
        chrome: b.indexOf("chrome") > -1
    };
    arrB["gecko"] = !arrB["opera"] && !arrB["safari"] && b.indexOf("gecko") > -1;
    arrB["ie"] = !arrB["opera"] && b.indexOf("msie") > -1;
    arrB["ie6"] = !arrB["opera"] && b.indexOf("msie 6") > -1;
    arrB["ie7"] = !arrB["opera"] && b.indexOf("msie 7") > -1;
    arrB["ie8"] = !arrB["opera"] && b.indexOf("msie 8") > -1;
    arrB["ie9"] = !arrB["opera"] && b.indexOf("msie 9") > -1;
    arrB["ie10"] = !arrB["opera"] && b.indexOf("msie 10") > -1;
    return arrB[str]
}
function $getKeyCode(e) {
    var e = e || window.event;
    return e.keyCode || e.which
}
function $getSrcNode(e) {
    e = e || window.event;
    return e.srcElement || e.target
}
function $hasSubString(str, substr, slice) {
    if (typeof str !== "string" || typeof substr !== "string") {
        return false
    }
    if (!slice) {
        slice = ""
    }
    return (slice + substr + slice).indexOf(slice + str + slice) == -1 ? false : true
}
function $mkHtmlTmp(obj, tmp) {
    var htmlCode, re;
    if (typeof obj === "object" && typeof tmp === "string") {
        htmlCode = tmp;
        for (var n in obj) {
            if (typeof obj[n] === "string" || typeof obj[n] === "number") {
                re = new RegExp("{#" + n + "#}", "gi");
                htmlCode = htmlCode.replace(re, obj[n])
            }
        }
    }
    return htmlCode || ""
}
function $formatSeconds(seconds) {
    seconds *= 1;
    if (isNaN(seconds) || seconds < 0) {
        return ""
    }
    var h = parseInt(seconds / 3600), m = parseInt((seconds - h * 3600) / 60), s = seconds % 60;
    var times = h > 0 ? [h, m, s] : [m, s];
    return fixnum(times);
    function fixnum(nums) {
        var result = [];
        for (var i = 0, l = nums.length; i < l; i++) {
            var num = "0" + nums[i], len = num.length;
            result.push(num.substr(len - 2, len))
        }
        return result.join(":")
    }
}
function $loadScript(url, charset, callback) {
    var sid = Math.floor(Math.random() * 1e4), s = document.createElement("script");
    s.charset = charset || "UTF-8";
    s.id = sid;
    document.getElementsByTagName("head")[0].appendChild(s);
    s.src = url;
    if (typeof callback === "function") {
        if ("onload"in s) {
            s.onload = callback
        } else if ("onreadystatechange"in s) {
            s.onreadystatechange = function () {
                if (this.readyState === "complete" || this.readyState == "loaded") {
                    callback()
                }
            }
        }
    }
    return s
}
function $checkFrame() {
    return true;
}
function $getUinFlag(callback) {
    var flagStr, flagArr = [], ver, tempStr;
    if (!window["getClientInfoCallBack"]) {
        window["getClientInfoCallBack"] = function (flagObj) {
            $ns("PLS");
            PLS.client = {
                puin: flagObj["uin"],
                pkey: flagObj["pkey"],
                aid: flagObj["zone"],
                version: flagObj["version"]
            };
            $cookie.set("puin", flagObj["uin"], "", "/", "tgp.qq.com");
            $cookie.set("paid", flagObj["zone"], "", "/", "tgp.qq.com");
            $cookie.set("pkey", flagObj["pkey"], "", "/", "tgp.qq.com");
            if (!!callback) {
                callback(PLS.client.aid + ":" + PLS.client.puin)
            }
        }
    }
    try {
        if ($checkFrame()) {
            var st = parent.PLS.status, uin, aId;
            if (st["UIN"] && st["aid"]) {
                uin = st["UIN"];
                aId = st["aid"]
            } else {
                parent.PLS.client.getUinInfo()
            }
            if (!!callback) {
                callback(aId + ":" + uin)
            }
            return aId + ":" + uin
        } else {
            tempStr = '{"callbackFun":"getClientInfoCallBack"}';
            window.external.pallasCallCpp("requestClientInfo", tempStr)
        }
    } catch (e) {
        if (!!callback) {
            callback(null)
        }
        return null
    }
}
function $jumpWebView(data) {
    var st = PLS.status, tempObj = {gotoUrl: "", gotoParam: null, backUrl: location.href, backParam: null};
    for (var n in data) {
        tempObj[n] = data[n]
    }
    try {
        window.external.gotoPage(JSON.stringify(tempObj))
    } catch (e) {
    }
}
function $openVideo(options) {
    if (/\.swf\??/i.test(options.url)) {
        options.source = options.url
    }
    var pageParams = {title: options.title || "��?����??��?��???????�C?????��?", width: undefined, height: undefined};
    if (options.source) {
        pageParams.source = options.source;
        if (!options.height) {
            options.height = 517
        }
        pageParams.height = options.height;
        if (!options.width) {
            options.width = 668
        }
        pageParams.width = options.width
    } else {
        pageParams.url = options.url;
        if (!options.height) {
            options.height = 526
        }
        pageParams.height = options.height;
        if (!options.width) {
            options.width = 913
        }
        pageParams.width = options.width
    }
    var theOpenPageUrl = "http://api.tgp.qq.com/common/liveFrame.html?" + $URL.serialize(pageParams), clientParams = JSON.stringify({
        width: options.width + "",
        height: options.height + "",
        needlogin: Number(!!options.needLogin) + "",
        url: encodeURIComponent(theOpenPageUrl)
    });
    try {
        if ($checkFrame()) {
            var tempObj = {frame: "rightFrame", fn: "playVideo", params: clientParams};
            $fnProxy(tempObj)
        } else {
            window.external.playVideo(clientParams)
        }
    } catch (e) {
    }
}
function $observeLiveGame(options) {
    if ($checkFrame()) {
        var tempObj = {
            frame: "rightFrame",
            fn: "pallas_observerGame",
            params: JSON.stringify({
                platform_id: options.platform_id,
                gameId: options.gameId,
                server_ip: options.server_ip,
                server_port: options.server_port,
                encryption_key: options.encryption_key,
                cur_page: 1,
                game_type: "unknown"
            })
        };
        $fnProxy(tempObj)
    } else {
        try {
            window.external.pallas_observerGame(options.gameId, options.platform_id, options.encryption_key, options.server_ip, options.server_port, "unknown", 1)
        } catch (e) {
            alert("����????????????��??????��?��?��??��?��??��??")
        }
    }
}
function $observeVideoGame(cfg, onLoad, onFail) {
    if ($checkFrame()) {
        var tempObj = {
            frame: "rightFrame",
            fn: "pallas_watchGame",
            params: JSON.stringify({
                url: cfg.url,
                zoneid: cfg.zoneid,
                gameid: cfg.gameid,
                progress_callback: cfg.progress_callback,
                end_callback: cfg.end_callback,
                error_callback: cfg.error_callback
            }),
            onload: onLoad,
            onerror: onFail
        };
        $fnProxy(tempObj)
    } else {
        try {
            window.external.pallas_observerGame(cfg.url, cfg.zoneid, cfg.gameid, cfg.progress_callback, cfg.end_callback, cfg.error_callback);
            typeof onLoad === "function" && onLoad(cfg)
        } catch (e) {
            typeof onFail === "function" && onFail(cfg)
        }
    }
}
function $sendSpeedRpt() {
    var delay, args = arguments, speedNode = $id("speedRptInfoScript"), lastPoint;
    delay = arguments[0] && !isNaN(arguments[0]) ? arguments[0] : 2e3;
    lastPoint = speedNode.getAttribute("lastest");
    if (!lastPoint || lastPoint != "1") {
        speedTimePoint.push(new Date);
        speedNode.setAttribute("lastest", 1)
    }
    setTimeout(function () {
        var rate = .1, s = [], sp, speedNode = $id("speedRptInfoScript"), syncNum, loadedNum, tryNum, syncComplate = false;
        if (!window.speedTimePoint)return;
        if (speedTimePoint.length < 2)return;
        if (speedNode) {
            syncNum = speedNode.getAttribute("sync");
            loadedNum = parseInt(speedNode.getAttribute("loaded"), 10);
            tryNum = speedNode.getAttribute("num") ? parseInt(speedNode.getAttribute("num"), 10) : 1;
            if (syncNum) {
                if (parseInt(loadedNum, 10) >= parseInt(syncNum, 10)) {
                    syncComplate = true
                }
            } else {
                syncComplate = true
            }
            if (syncComplate || tryNum > 5) {
                sp = speedTimePoint;
                for (var i = 1; i < sp.length; i++) {
                    if (!!sp[i]) {
                        s.push(i + "=" + (sp[i] - sp[0][0]))
                    }
                }
                var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=" + sp[0][1] + "&flag2=" + sp[0][2] + "&flag3=" + sp[0][3] + "&" + s.join("&");
                if (Math.random() < rate) {
                    var o = new Image;
                    o.src = url
                }
            } else {
                tryNum++;
                speedNode.setAttribute("num", tryNum);
                $sendSpeedRpt(500)
            }
        }
    }, delay)
}
function $setSyncLoadNum() {
    var speedNode = $id("speedRptInfoScript"), tempStr;
    if (speedNode) {
        tempStr = speedNode.getAttribute("loaded");
        tempStr = isNaN(tempStr) ? 1 : parseInt(tempStr, 10) + 1;
        speedNode.setAttribute("loaded", tempStr);
        tempStr = speedNode.getAttribute("lastest");
        if (tempStr && tempStr == "1") {
            speedTimePoint[speedTimePoint.length - 1] = new Date
        }
    }
}
var $TCSS = function () {
    var jsFileLoad = false;
    return {
        visited: function (param) {
            try {
                jsFileLoad ? pgvMain(param) : loadJSFile(function () {
                    typeof pgvMain === "function" && pgvMain(param)
                })
            } catch (e) {
            }
        }, clicked: function (path_of_tag, virtualURL, virtualDomain) {
            if (top !== self) {
                //top.$TCSS.clicked(path_of_tag, virtualURL, virtualDomain);
                return
            }
            try {
                var sendParams = {hottag: path_of_tag, virtualURL: virtualURL, virtualDomain: virtualDomain};
                jsFileLoad ? pgvSendClick(sendParams) : loadJSFile(function () {
                    typeof pgvSendClick === "function" && pgvSendClick(sendParams)
                })
            } catch (e) {
            }
        }
    };
    function loadJSFile(callback) {
        var node = document.createElement("script"), script = document.getElementsByTagName("script")[0];
        node.src = "http://pingjs.qq.com/tcss.ping.js";
        node.type = "text/javascript";
        node.onload = node.onerror = node.onreadystatechange = function () {
            /loaded|complete|undefined/.test(node.readyState) && function () {
                node.onload = node.onerror = node.onreadystatechange = null;
                node.parentNode.removeChild(node);
                node = undefined;
                jsFileLoad = true;
                callback()
            }()
        };
        script.parentNode.insertBefore(node, script)
    }
}();
var $URL = function () {
    var _temp_a_link = document.createElement("a");
    return {
        serialize: function (obj) {
            var res = [];
            if (typeof obj !== "object") {
                return ""
            }
            for (var k in obj) {
                res.push(k + "=" + encodeURIComponent(obj[k]))
            }
            return res.join("&")
        }, unserialize: function (str) {
            var res = {};
            if (!str) {
                return res
            }
            var arr = str.split("&");
            for (var i = 0, l = arr.length; i < l; i++) {
                var item = arr[i];
                var o = item.split("=");
                res[o[0]] = decodeURIComponent(o[1])
            }
            return res
        }, make: function (path, search, hash) {
            if (search) {
                if (typeof search === "object") {
                    search = this.serialize(search)
                }
                search && (search = "?" + search)
            } else {
                search = ""
            }
            if (hash) {
                if (typeof hash === "object") {
                    hash = this.serialize(hash)
                }
                hash && (hash = "#" + hash)
            } else {
                hash = ""
            }
            return path + search + hash
        }, getSearches: function (url) {
            var search;
            if (url) {
                _temp_a_link.href = url;
                search = _temp_a_link.search
            } else {
                search = location.search
            }
            return this.unserialize(search.replace(/^\?/, ""))
        }, getSearch: function (key) {
            return this.getSearches()[key]
        }, getHashes: function (url) {
            var hash;
            if (url) {
                _temp_a_link.href = url;
                hash = _temp_a_link.hash
            } else {
                hash = location.hash
            }
            return this.unserialize(hash.replace(/^#/, ""))
        }, getHash: function (key) {
            return this.getHashes()[key]
        }, setHash: function (key, value) {
            var o = this.getHashes();
            if (typeof key === "string" && typeof value === "string") {
                o[key] = value
            } else if (typeof key === "object") {
                if (value) {
                    o = key
                } else {
                    for (var i in key) {
                        o[i] = key[i]
                    }
                }
            }
            location.hash = this.serialize(o)
        }
    }
}();
var $HTML = function () {
    var __temp_dom = document.createElement("span");
    return {
        encode: function (txt) {
            var t = document.createTextNode(txt), res = __temp_dom.appendChild(t).parentNode.innerHTML;
            __temp_dom.innerHTML = "";
            return res
        }, decode: function (html) {
            __temp_dom.innerHTML = html;
            return __temp_dom.innerText || __temp_dom.textContent
        }, fix: function (html) {
            __temp_dom.innerHTML = html;
            return __temp_dom.innerHTML
        }, compile: function (options) {
            if (typeof options === "string") {
                var o = {data: arguments[1], format: ["{#", "#}"]};
                o[!/\w/.test(options) ? "str" : "tmplId"] = options;
                options = o;
                o = null
            }
            var tmplId = options.tmplId || options.id;
            if (!tmplId && !options.str) {
                return false
            }
            var compile = arguments.callee, str = options.str, data = options.data, dom = options.dom, format = options.format || ["<%", "%>"];
            var fn;
            if (tmplId) {
                if (!compile[tmplId]) {
                    compile[tmplId] = compile({
                        str: document.getElementById(tmplId).innerHTML,
                        format: format,
                        dom: dom
                    })
                }
                fn = compile[tmplId]
            } else {
                var left = format[0], right = format[1];
                fn = new Function("obj", "var p=[];with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split(left).join("	").replace(new RegExp("((^|" + right + ")[^\\t]*)'", "g"), "$1\r").replace(new RegExp("	=(.*?)" + right, "g"), "',$1,'").split("	").join("');").split(right).join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
            }
            if (data) {
                if (dom && "innerHTML"in dom) {
                    dom.innerHTML = fn(data);
                    return dom
                }
                return fn(data)
            } else {
                return fn
            }
        }
    }
}();
function $float(opt) {
    var option = {
        id: "",
        left: 0,
        top: 0,
        width: 400,
        height: 0,
        title: "",
        html: "",
        leaver: 2,
        zindex: 255,
        autoResize: false,
        opacity: .5,
        cover: true,
        isCoverClose: false,
        coverLeft: 0,
        coverTop: 0,
        dragble: false,
        fix: false,
        titleId: "",
        showClose: true,
        closeId: "",
        bgframeLeft: 0,
        bgframeTop: 0,
        cName: "skill-intro",
        style: "stand",
        contentStyle: "",
        needOutCss: 0,
        cssUrl: window.config_float_css || "http://static.paipaiimg.com/module/module_box.css",
        onInit: $empty(),
        onClose: $empty()
    };
    for (var i in opt) {
        option[i] = opt[i]
    }
    var that = arguments.callee;
    var _host = window.location.hostname;
    that.data ? "" : init(option.cssUrl, option.needOutCss);
    option.id = option.id ? option.id : ++that.data.zIndex;
    option.close = closeFloat;
    option.destruct = destructFloat;
    option.closeOther = closeOther;
    option.keepBoxFix = keepBoxFix;
    option.resize = resize;
    option.show = showBox;
    option.setPos = setPos;
    option.closeOther();
    option.show();
    that.data.list.push(option);
    if (option.dragble) {
        $initDragItem({barDom: option.boxTitleHandle, targetDom: option.boxHandle})
    }
    return option;
    function closeFloat() {
        if (!option.onClose(option)) {
            return
        }
        option.closeOther();
        option.destruct()
    }

    function destructFloat() {
        var _this = this;
        _this.cover ? that.data.closeCover() : "";
        if (_this.sizeTimer) {
            clearInterval(_this.sizeTimer)
        }
        if (_this.fixTimer) {
            clearInterval(_this.fixTimer)
        }
        _this.boxHandle ? document.body.removeChild(_this.boxHandle) : "";
        _this.boxHandel = _this.boxHandle = null;
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue
            }
            if (_this.id == that.data.list[i].id) {
                that.data.list[i] = null
            }
        }
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = null;
                    _el = null
                }
            }
        }
    }

    function closeOther() {
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue
            }
            if (that.data.list[i].leaver >= this.leaver && this.id != that.data.list[i].id) {
                that.data.list[i].destruct()
            }
        }
    }

    function showBox() {
        this.cover ? that.data.showCover() : "";
        var c = document.createElement("div"), content = "", _style = option.contentStyle ? ' style="' + option.contentStyle + '" ' : "";
        c.id = this.boxId = "float_box_" + this.id;
        c.style.position = "absolute";
        if ($isBrowser("ie6")) {
            content = '<iframe frameBorder="0" scrolling="no" frameBorder="0" style="position:absolute;left:' + option.bgframeLeft + "px;top:" + option.bgframeTop + 'px;z-index:-1;border:none;background-color:transparent;" id="float_iframe_' + this.id + '"></iframe>'
        }
        switch (option.style + "") {
            case"stand":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_title" id="float_title_' + this.id + '"><a href="javascript:;" style="display:' + (this.showClose ? "" : "none") + ';"  class="bt_close" id="float_closer_' + this.id + '">?��</a><h4>' + this.title + '</h4></div><div class="box_content" ' + _style + ">" + this.html + "</div>";
                break;
            case"":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + "</div>";
                break;
            case"none":
                c.className = option.cName;
                c.innerHTML = content + this.html;
                break;
            case"new":
                c.className = option.cName;
                c.innerHTML = content + '<div class="layer_inner"><div class="layer_hd" ' + _style + ' id="float_title_' + this.id + '"><div class="layer_hd_title">' + this.title + '</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_' + this.id + '">close</a></div><div class="layer_bd">' + this.html + "</div></div></div>";
                break
        }
        document.body.appendChild(c);
        c = null;
        this.boxHandel = this.boxHandle = $id("float_box_" + this.id);
        if ($isBrowser("ie6")) {
            this.boxIframeHandle = $id("float_iframe_" + this.id)
        }
        this.boxTitleHandle = $id(option.titleId || "float_title_" + this.id);
        this.boxCloseHandle = $id("float_closer_" + this.id);
        this.isCoverClose ? this.closeId += ",float_cover" : "";
        this.height ? this.boxHandle.style.height = option.height == "auto" ? option.height : option.height + "px" : "";
        this.width ? this.boxHandle.style.width = option.width == "auto" ? option.width : option.width + "px" : "";
        this.boxHandle.style.zIndex = that.data.zIndex;
        this.sw = parseInt(this.boxHandle.offsetWidth);
        this.sh = parseInt(this.boxHandle.offsetHeight);
        if (isNaN(this.left) || isNaN(this.top)) {
            this.boxHandle.style.left = this.left;
            this.boxHandle.style.top = this.top
        } else {
            this.setPos()
        }
        var _this = this;
        _this.boxCloseHandle ? _this.boxCloseHandle.onclick = function () {
            _this.close();
            return false
        } : "";
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = function () {
                        _this.close();
                        return false
                    };
                    _el = null
                }
            }
        }
        _this.keepBoxFix();
        if (!_this.onInit(option)) {
            return
        }
    }

    function setPos(left, top) {
        var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
        var p = [0, 0];
        left && (this.left = left);
        top && (this.top = top);
        p[0] = parseInt(this.left ? this.left : psw + (ww - this.sw) / 2);
        p[1] = parseInt(this.top ? this.top : psh + (wh - this.sh) / 2);
        p[0] + this.sw > psw + ww ? p[0] = psw + ww - this.sw - 10 : "";
        p[1] + this.sh > psh + wh ? p[1] = psh + wh - this.sh - 10 : "";
        p[1] < psh ? p[1] = psh : "";
        p[0] < psw ? p[0] = psw : "";
        if ($isBrowser("ie6")) {
            this.boxIframeHandle.height = this.sh - 2 + "px";
            this.boxIframeHandle.width = this.sw - 2 + "px"
        }
        this.boxHandle.style.left = p[0] + "px";
        this.boxHandle.style.top = p[1] + "px";
        this.keepBoxFix()
    }

    function resize(w, h) {
        if (w && w.constructor === Number) {
            this.sw = w;
            this.boxHandle.style.width = this.sw + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.width = this.sw - 2 + "px"
            }
        }
        if (h && h.constructor === Number) {
            this.sh = h;
            this.boxHandle.style.height = this.sh + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.height = this.sh - 2 + "px"
            }
        }
        this.setPos()
    }

    function keepBoxFix() {
        if (this.fix) {
            var _this = this;
            if ($isBrowser("ie6")) {
                !_this.fixTimer && (_this.fixTimer = setInterval(function () {
                    _this.boxHandle.style.left = (_this.left ? _this.left : $getPageScrollWidth() + ($getWindowWidth() - _this.sw) / 2) + "px";
                    _this.boxHandle.style.top = (_this.top ? _this.top : $getPageScrollHeight() + ($getWindowHeight() - _this.sh) / 2) + "px"
                }, 30))
            } else {
                _this.boxHandle.style.position = "fixed";
                _this.boxHandle.style.left = (_this.left ? _this.left : ($getWindowWidth() - _this.sw) / 2) + "px";
                _this.boxHandle.style.top = (_this.top ? _this.top : ($getWindowHeight() - _this.sh) / 2) + "px"
            }
        }
    }

    function autoResize() {
        if (this.autoResize) {
            var _this = this;
            _this.sizeTimer = setInterval(function () {
                _this.sw = _this.boxHandle.offsetWidth;
                _this.sh = _this.boxHandle.offsetHeight;
                if ($isBrowser("ie6")) {
                    _this.boxIframeHandle.height = _this.sh - 2 + "px";
                    _this.boxIframeHandle.width = _this.sw - 2 + "px"
                }
            }, 50)
        }
    }

    function init(cssUrl, needOutCss) {
        if (cssUrl && needOutCss) {
            $loadCss(cssUrl)
        }
        that.data = {};
        that.data.zIndex = option.zindex;
        that.data.list = [];
        createCover();
        that.data.showCover = showCover;
        that.data.closeCover = closeCover;
        function createCover() {
            var c = document.createElement("div");
            c.id = "float_cover";
            c.style.display = "none";
            c.style.width = "0px";
            c.style.height = "0px";
            c.style.backgroundColor = "#000000";
            c.style.zIndex = 250;
            c.style.position = "fixed";
            c.style.hasLayout = -1;
            c.style.left = "0px";
            c.style.top = "0px";
            c.style.filter = "alpha(opacity=" + option.opacity * 100 + ");";
            c.style.opacity = option.opacity;
            document.body.appendChild(c);
            if ($isBrowser("ie6")) {
                c.innerHTML = '<iframe frameBorder="0" scrolling="no" allowtransparency="true" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;background-color:transparent;" id="float_cover_iframe"></iframe>';
                c.style.position = "absolute"
            }
            that.data.cover = $id("float_cover");
            that.data.coverIframe = $id("float_cover_iframe");
            that.data.coverIsShow = false;
            that.data.coverSize = [0, 0];
            c = null
        }

        function showCover() {
            that.data.cover.style.display = "block";
            that.data.coverIsShow = true;
            keepCoverShow();
            that.data.coverTimer = setInterval(function () {
                keepCoverShow()
            }, 50);
            function keepCoverShow() {
                var _d = that.data;
                if (_d.coverIsShow) {
                    var ch = $getContentHeight(), wh = $getWindowHeight(), cw = $getContentWidth(), ww = $getWindowWidth(), ns = [wh, ww];
                    if ($isBrowser("ie6")) {
                        _d.cover.style.top = $getPageScrollHeight() + "px"
                    }
                    if (ns.toString() != that.data.coverSize.toString()) {
                        _d.coverSize = ns;
                        _d.cover.style.height = ns[0].toFixed(0) + "px";
                        _d.cover.style.width = ns[1].toFixed(0) + "px";
                        if (option.coverTop > 0) {
                            _d.cover.style.top = option.coverTop + "px"
                        }
                        if (option.coverLeft) {
                            _d.cover.style.top = option.coverLeft + "px"
                        }
                        if (_d.coverIframe) {
                            _d.coverIframe.style.height = ns[0].toFixed(0) + "px";
                            _d.coverIframe.style.width = ns[1].toFixed(0) + "px"
                        }
                    }
                }
            }
        }

        function closeCover() {
            that.data.cover.style.display = "none";
            that.data.coverIsShow = false;
            clearInterval(that.data.coverTimer)
        }
    }
}
function $empty() {
    return function () {
        return true
    }
}
function $getContentHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
    return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollHeight : doeCath.scrollHeight
}
function $getContentWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
    return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollWidth : doeCath.scrollWidth
}
function $getMousePosition(e) {
    var e = window.event ? window.event : e;
    if (e.evt)e = e.evt;
    var pos = [];
    if (typeof e.pageX != "undefined") {
        pos = [e.pageX, e.pageY]
    } else if (typeof e.clientX != "undefined") {
        pos = [e.clientX + $getScrollPosition()[0], e.clientY + $getScrollPosition()[1]]
    }
    return pos
}
function $getPageScrollHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
    var ua = navigator.userAgent.toLowerCase();
    return window.MessageEvent && ua.indexOf("firefox") == -1 && ua.indexOf("opera") == -1 && ua.indexOf("msie") == -1 ? bodyCath.scrollTop : doeCath.scrollTop
}
function $getPageScrollWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
    return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollLeft : doeCath.scrollLeft
}
function $getScrollPosition() {
    var _docElement = document.documentElement, _body = document.body, scrollLeft = _docElement && _docElement.scrollLeft || _body && _body.scrollLeft || window.pageXOffset || 0, scrollTop = _docElement && _docElement.scrollTop || _body && _body.scrollTop || window.pageYOffset || 0;
    return [scrollLeft, scrollTop]
}
function $getWindowHeight() {
    var bodyCath = document.body;
    return (document.compatMode == "BackCompat" ? bodyCath : document.documentElement).clientHeight
}
function $getWindowWidth() {
    var bodyCath = document.body;
    return (document.compatMode == "BackCompat" ? bodyCath : document.documentElement).clientWidth
}
function $initDragItem(opt) {
    var option = {barDom: "", targetDom: ""};
    for (var i in opt) {
        option[i] = opt[i]
    }
    var that = arguments.callee;
    that.option ? "" : that.option = {};
    option.barDom.style.cursor = "move";
    option.targetDom.style.position = "absolute";
    option.barDom.onmousedown = function (e) {
        var e = window.event || e;
        that.option.barDom = this;
        that.option.targetDom = option.targetDom;
        var currPostion = [parseInt(option.targetDom.style.left) ? parseInt(option.targetDom.style.left) : 0, parseInt(option.targetDom.style.top) ? parseInt(option.targetDom.style.top) : 0];
        that.option.diffPostion = [$getMousePosition({evt: e})[0] - currPostion[0], $getMousePosition({evt: e})[1] - currPostion[1]];
        document.onselectstart = function () {
            return false
        };
        window.onblur = window.onfocus = function () {
            document.onmouseup()
        };
        return false
    };
    option.targetDom.onmouseup = document.onmouseup = function () {
        if (that.option.barDom) {
            that.option = {};
            document.onselectstart = window.onblur = window.onfocus = null
        }
    };
    option.targetDom.onmousemove = document.onmousemove = function (e) {
        try {
            var e = window.event || e;
            if (that.option.barDom && that.option.targetDom) {
                that.option.targetDom.style.left = $getMousePosition({evt: e})[0] - that.option.diffPostion[0] + "px";
                that.option.targetDom.style.top = $getMousePosition({evt: e})[1] - that.option.diffPostion[1] + "px"
            }
        } catch (e) {
        }
    }
}
function $loadCss(path, callback) {
    if (!path) {
        return
    }
    var l;
    if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
        l = document.createElement("link");
        l.setAttribute("type", "text/css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("href", path);
        l.setAttribute("id", "loadCss" + Math.random());
        document.getElementsByTagName("head")[0].appendChild(l);
        window["_loadCss"] ? window["_loadCss"] += "|" + path : window["_loadCss"] = "|" + path
    }
    l && typeof callback == "function" && (l.onload = callback);
    return true
}
function $getY(e) {
    var t = e.offsetTop || 0;
    while (e = e.offsetParent) {
        t += e.offsetTop
    }
    return t
}
function $getX(e) {
    var t = e.offsetLeft || 0;
    while (e = e.offsetParent)t += e.offsetLeft;
    return t
}
function $getWidth(e) {
    var box = e.getBoundingClientRect();
    return box.width ? box.width : box.right - box.left
}
function $getHeight(e) {
    var show = e.style.display;
    show == "none" && (e.style.display = "");
    var box = e.getBoundingClientRect();
    var h = box.height ? box.height : box.bottom - box.top;
    e.style.display = show;
    return h
}
function $inArray(t, arr) {
    if (arr.indexOf) {
        return arr.indexOf(t)
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === t) {
            return i * 1
        }
    }
    return -1
}
function $hasClass(old, cur) {
    if (!old || !cur)return null;
    var arr = (typeof old == "object" ? old.className : old).split(" ");
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cur == arr[i]) {
            return cur
        }
    }
    return null
}
function $delClass(ids, cName) {
    $setClass(ids, cName, "remove")
}
function $addClass(ids, cName) {
    $setClass(ids, cName, "add")
}
function $setClass(ids, cName, kind) {
    if (!ids) {
        return
    }
    var set = function (obj, cName, kind) {
        if (!obj) {
            return
        }
        var oldName = obj.className, arrName = oldName ? oldName.split(" ") : [];
        if (kind == "add") {
            if (!$hasClass(oldName, cName)) {
                arrName.push(cName);
                obj.className = arrName.join(" ")
            }
        } else if (kind == "remove") {
            var newName = [];
            for (var i = 0, l = arrName.length; i < l; i++) {
                if (cName != arrName[i] && " " != arrName[i]) {
                    newName.push(arrName[i])
                }
            }
            obj.className = newName.join(" ")
        }
    };
    if (typeof ids == "string") {
        var arrDom = ids.split(",");
        for (var i = 0, l = arrDom.length; i < l; i++) {
            if (arrDom[i]) {
                set($id(arrDom[i]), cName, kind)
            }
        }
    } else if (ids instanceof Array) {
        for (var i = 0, l = ids.length; i < l; i++) {
            if (ids[i]) {
                set(ids[i], cName, kind)
            }
        }
    } else {
        set(ids, cName, kind)
    }
}
function $scrollBox(obj) {
    var opt = {
        initEvent: false,
        isScroll: false,
        wheelData: -1,
        scrollBar: null,
        scrollBox: null,
        mainBox: null,
        contentBox: null,
        topBtn: null,
        bottomBtn: null,
        offsetTop: 0,
        inteSpace: 15,
        offsetbtnHeight: 0,
        bw: 0,
        bh: 0,
        cw: 0,
        ch: 0,
        sw: 0,
        sh: 0,
        oh: 0,
        ot: 0,
        min_sh: 20,
        cur_sh: 0,
        scrollSlotBG: "",
        scrollBarHtml: "",
        scrollBarClass: "",
        scrollBarHover: "",
        topBtnClass: "",
        bottomBtnClass: "",
        scrollFn: null,
        resizeScroll: function () {
            this.ch = this.contentBox.offsetHeight;
            if (this.ch >= this.bh) {
                var sTop = Math.abs(parseFloat(this.contentBox.style.top, 10));
                this.sh = parseInt(this.bh * ((this.bh - this.offsetbtnHeight) / this.ch), 10);
                this.cur_sh = this.sh < this.min_sh ? this.min_sh : this.sh;
                this.scrollBar.style.height = this.cur_sh + "px";
                this.ot = this.bh - this.cur_sh - this.offsetbtnHeight * 2;
                this.oh = (this.ch - this.bh) / (this.bh - this.cur_sh - this.offsetbtnHeight * 2);
                if (sTop > this.offsetbtnHeight * 2) {
                    this.scrollGo(sTop)
                }
                return true
            } else {
                this.resetState();
                return false
            }
        },
        resetState: function () {
            if (this.scrollBar) {
                var sBox = this.scrollBar.parentNode, cont = this.contentBox, p = sBox.parentNode;
                this.isScroll = false;
                this.initEvent = false;
                this.wheelData = -1;
                this.offsetTop = 0;
                if (cont) {
                    $delClass(cont, "has-scroll");
                    cont.style.width = this.bw + "px";
                    cont.style.top = "0px"
                }
                this.sw = 0;
                this.sh = 0;
                this.cur_sh = 0;
                document.onmouseup = null;
                document.onmousemove = null;
                $removeEvents(p, "mousewheel", p.onmousewheel);
                sBox.onmousedown = null;
                p.removeChild(sBox)
            }
        },
        scrollGo: function (num) {
            var flag = num / this.oh;
            if (flag > this.ot) {
                flag = this.ot
            } else if (flag < this.offsetbtnHeight) {
                flag = 0
            }
            this.scrollBar.style.top = flag + this.offsetbtnHeight + "px";
            this.contentBox.style.top = -flag * this.oh + "px";
            this["wheelData"] = num;
            if (typeof opt["scrollFn"] == "function") {
                opt["scrollFn"](-flag * this.oh)
            }
        }
    };
    for (var n in obj) {
        opt[n] = obj[n]
    }
    checkScroll();
    if (opt.isScroll) {
        createScroll();
        resizeScroll();
        hoverBar();
        wheelChange();
        clickScroll();
        return opt
    } else {
        return null
    }
    function checkScroll() {
        if (typeof opt.mainBox == "string") {
            opt.mainBox = document.getElementById(opt.mainBox)
        }
        if (typeof opt.contentBox == "string") {
            opt.contentBox = document.getElementById(opt.contentBox)
        }
        if (opt.mainBox && opt.contentBox) {
            opt.bw = opt.mainBox.clientWidth;
            opt.bh = opt.mainBox.clientHeight;
            opt.cw = opt.contentBox.offsetWidth;
            opt.ch = opt.contentBox.offsetHeight;
            opt.wheelData = -1;
            opt.contentBox.style.top = "0px";
            if (opt.scrollBar) {
                opt.scrollBar.style.top = "0px"
            }
            if (opt.ch >= opt.bh) {
                opt.isScroll = true;
                if (!$hasClass(opt.contentBox, "has-scroll")) {
                    $addClass(opt.contentBox, "has-scroll")
                }
            } else {
                opt.resetState()
            }
        }
    }

    function hoverBar() {
        if (opt["scrollBarHover"] != "") {
            opt.scrollBar.onmouseover = function () {
                opt.style.background = opt["scrollBarHover"]
            };
            opt.scrollBar.onmouseout = function () {
                opt.style.background = opt["scrollBarClass"]
            }
        }
    }

    function createScroll() {
        var scrollBox, doc, tempNode;
        scrollBox = document.createElement("div");
        doc = document.createDocumentFragment();
        if (opt.topBtnClass != "" && opt.bottomBtnClass != "") {
            tempNode = document.createElement("div");
            tempNode.className = opt.topBtnClass;
            doc.appendChild(tempNode);
            opt.topBtn = tempNode;
            tempNode = document.createElement("div");
            tempNode.className = opt.bottomBtnClass;
            doc.appendChild(tempNode);
            opt.bottomBtn = tempNode
        }
        tempNode = document.createElement("div");
        tempNode.className = opt.scrollBarClass;
        if (opt.scrollBarHtml) {
            tempNode.innerHTML = opt.scrollBarHtml
        }
        doc.appendChild(tempNode);
        scrollBox.appendChild(doc);
        opt.mainBox.appendChild(scrollBox);
        opt.scrollBar = tempNode
    }

    function resizeScroll() {
        var p = opt.scrollBar.parentNode;
        opt.sw = opt.scrollBar.offsetWidth;
        var left = opt.bw - opt.sw;
        p.style.width = opt.sw + "px";
        p.style.height = opt.bh - opt.offsetTop * 2 + "px";
        p.style.left = left - opt.offsetTop * 2 + "px";
        p.style.top = 0;
        p.style.position = "absolute";
        p.style.background = opt.scrollSlotBG ? opt.scrollSlotBG : "#1f2735";
        opt.contentBox.style.width = opt.bw - opt.sw - opt.offsetTop * 2 + "px";
        if (opt.topBtn && opt.bottomBtn) {
            opt.offsetbtnHeight = opt.topBtn.offsetHeight;
            opt.bottomBtn.style.top = opt.bh - opt.offsetbtnHeight + "px";
            opt.scrollBar.style.top = opt.offsetbtnHeight + "px"
        }
        setTimeout(function () {
            opt.ch = opt.contentBox.offsetHeight;
            opt.sh = parseInt(opt.bh * ((opt.bh - opt.offsetbtnHeight) / opt.ch), 10);
            opt.cur_sh = opt.sh < opt.min_sh ? opt.min_sh : opt.sh;
            opt.scrollBar.style.height = opt.cur_sh + "px";
            opt.ot = opt.bh - opt.cur_sh - opt.offsetbtnHeight * 2;
            opt.oh = (opt.ch - opt.bh) / (opt.bh - opt.cur_sh - opt.offsetbtnHeight * 2)
        }, 0)
    }

    function tragScroll(event) {
        var scrollTop = opt.scrollBar.offsetTop;
        var e = event || window.event;
        var top = e.clientY || e.pageY;
        document.onmousemove = scrollGo;
        document.onmouseup = function (event) {
            this.onmousemove = null
        };
        function scrollGo(event) {
            var e = event || window.event, btnHeight = 0, curTop = e.clientY || e.pageY, t = curTop - top + scrollTop;
            if (t > opt.ot) {
                t = opt.ot
            }
            if (t <= opt.offsetbtnHeight) {
                t = 0
            }
            opt.scrollBar.style.top = t + opt.offsetbtnHeight + "px";
            opt.contentBox.style.top = -t * opt.oh + "px";
            opt["wheelData"] = t * opt.oh;
            if (typeof opt["scrollFn"] == "function") {
                opt["scrollFn"](-t * opt.oh)
            }
        }
    }

    function wheelChange() {
        var flag = 0, rate = 0;
        if (opt.mainBox) {
            mouseWheel(opt.mainBox, function (data) {
                data = data / 10;
                if (opt.wheelData >= 0) {
                    opt.wheelData += data;
                    flag = opt.wheelData
                } else {
                    opt.wheelData = data;
                    flag = opt.wheelData;
                }
                if (flag <= 0) {
                    flag = 0;
                    opt.wheelData = -1
                }
                if (flag >= opt.ch - opt.bh) {
                    flag = opt.ch - opt.bh;
                    opt.wheelData = flag
                }
                opt.scrollBar.style.top = flag / opt.oh + opt.offsetbtnHeight + "px";
                opt.contentBox.style.top = -flag + "px";
                if (typeof opt["scrollFn"] == "function") {
                    opt["scrollFn"](-flag)
                }
            })
        }
    }

    function clickScroll() {
        var p = opt.scrollBar.parentNode;
        if (!opt.initEvent) {
            p.onmousedown = function (event) {
                var e = event || window.event;
                var t = e.target || e.srcElement;
                var curTop, flag, oh = opt.inteSpace, bt = $getY(opt.mainBox);
                var docTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
                if (t == opt.topBtn || t == opt.bottomBtn) {
                    curTop = opt.scrollBar.offsetTop - opt.offsetbtnHeight;
                    flag = curTop + docTop;
                    flag += t == opt.bottomBtn ? oh : -oh;
                    if (flag <= opt.offsetbtnHeight) {
                        flag = 0
                    }
                    if (flag >= opt.ot) {
                        flag = opt.ot
                    }
                    opt.scrollBar.style.top = flag + opt.offsetbtnHeight + "px";
                    opt.contentBox.style.top = -flag * opt.oh + "px";
                    opt.wheelData = flag * opt.oh;
                    if (typeof opt["scrollFn"] == "function") {
                        opt["scrollFn"](-flag * opt.oh)
                    }
                } else if (t == opt.scrollBar) {
                    tragScroll(event)
                } else {
                    curTop = e.clientY || e.pageY;
                    flag = curTop + docTop - bt - opt.sh / 2;
                    if (flag <= opt.offsetbtnHeight) {
                        flag = 0
                    }
                    if (flag >= opt.ot) {
                        flag = opt.ot
                    }
                    opt.scrollBar.style.top = flag + opt.offsetbtnHeight + "px";
                    opt.contentBox.style.top = -flag * opt.oh + "px";
                    opt.wheelData = flag * opt.oh;
                    if (typeof opt["scrollFn"] == "function") {
                        opt["scrollFn"](-flag * opt.oh)
                    }
                }
            }
        }
    }

    function mouseWheel(obj, handler) {
        var node = typeof obj == "string" ? document.getElementById(obj) : obj;
        if (!this.initEvent) {
            $addEvent(node, "mousewheel", function (event) {
                if (opt.isScroll) {
                    var data = -getWheelData(event);
                    handler(data);
                    $preventDefault(event)
                }
            });
            $addEvent(node, "DOMMouseScroll", function (event) {
                if (opt.isScroll) {
                    var data = getWheelData(event);
                    handler(data);
                    $preventDefault(event)
                }
            })
        }
        function getWheelData(event) {
            var e = event || window.event;
            return e.wheelDelta ? e.wheelDelta : e.detail * 40
        }
    }
}
!window.JSON && (window.JSON = function () {
    var otherType2String = function (data) {
        if (typeof data === "undefined" || data === null) {
            return '""'
        }
        switch (data.constructor) {
            case String:
                return '"' + escape(data) + '"';
            case Number:
                return data + "";
            case Boolean:
                return data + "";
            case Function:
                return undefined;
            case Array:
                var all = [];
                for (var i = 0, l = data.length; i < l; i++) {
                    all.push(otherType2String(data[i]))
                }
                return "[" + all.join(",") + "]";
            default:
                var all = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var value = data[key];
                        all.push('"' + escape(key) + '":' + otherType2String(value))
                    }
                }
                return "{" + all.join(",") + "}"
        }
    };
    return {
        parse: function (str) {
            return (1, eval)("(" + str + ")")
        }, stringify: function (json) {
            if (typeof json === "string") {
                return json
            } else {
                return otherType2String(json)
            }
        }
    };
    function escape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
    }
}());
function $ajax(options) {
    if (!window.jQuery) {
        return new Error("jQuery required.")
    }
    var requestPath = "http://api.pallas.tgp.qq.com/core/tcall";
    window.$ajax = function (options) {
        var defaults = {
            params: [],
            succ: $globale.emptyFn,
            err: $globale.emptyFn,
            type: "GET",
            dataType: "json",
            cacheTime: false,
            dtag: ""
        };
        for (var i in options) {
            !options[i] && (options[i] = defaults[i])
        }
        var params = options.params, dtag = options.dtag, cacheTime = options.cacheTime, type = options.type, dataType = options.dataType, jsonpCallbackName = options.jsonpCallbackName, succ = options.succ, err = options.err;
        if (!(params instanceof Array)) {
            params = [params]
        }
        var _queriesObj = [];
        for (var i = 0, l = params.length; i < l; i++) {
            _queriesObj.push([params[i].cmd, params[i].query])
        }
        var queries = {p: JSON.stringify(_queriesObj), dtag: dtag};
        cacheTime && cacheTime > 0 && (queries["_cache_time"] = cacheTime);
        var _ajaxSettings = {
            url: requestPath,
            data: queries,
            type: type,
            dataType: dataType,
            cache: true,
            success: function (json) {
                if (json.retCode * 1 !== 0) {
                    typeof err === "function" && err.call(this, json);
                    return false
                }
                var data = json.data;
                typeof succ === "function" && succ.apply(this, data.concat(json))
            },
            error: function () {
                typeof err === "function" && err.call(this, {retCode: -1e4, msg: "???����????"})
            }
        };
        if (dataType === "jsonp") {
            _ajaxSettings["jsonp"] = options.callbackKey || "callback";
            if (jsonpCallbackName) {
                delete _ajaxSettings.success;
                delete _ajaxSettings.error
            }
        }
        $.ajax(_ajaxSettings)
    };
    $ajax(options)
}
function $setFlash(options) {
    var movieName = options.movieName;
    if (!movieName) {
        var cle = arguments.callee;
        cle.flashId = cle.flashId ? ++cle.flashId : 1;
        movieName = "pallasFlash" + cle.flashId
    }
    var params = {
        name: movieName,
        src: options.src,
        wmode: options.wmode || "Transparent",
        width: options.width || 650,
        height: options.height || 472,
        bgcolor: options.bgcolor || "#FFFFFF",
        networking: options.networking || "all",
        scriptAccess: options.scriptAccess || "always"
    };
    var htmlTmpl = '				<object width="{#width#}" height="{#height#}" align="middle" id="{#name#}"						classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" 						codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=10,0,0,0">					<param name="Movie" value="#"/>					<param name="Src" value="{#src#}"/>					<param name="WMode" value="{#wmode#}"/>					<param name="Quality" value="high"/>					<param name="AllowScriptAccess" value="{#scriptAccess#}"/>					<param name="AllowNetworking" value="{#networking#}"/>					<param name="AllowFullScreen" value="true"/>					<embed width="{#width#}" height="{#height#}" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer"						type="application/x-shockwave-flash" allowfullscreen="true" 						name="{#name#}" quality="high" src="{#src#}" bgcolor="{#bgcolor#}" 						wmode="{#wmode#}" invokeurls="invokeurls" allownetworking="{#networking#}" 						allowscriptaccess="{#scriptAccess#}">				</object>';
    if (typeof options.callbackName === "string" && typeof options.callback === "function") {
        window[options.callbackName] = options.callback
    }
    options.dom.innerHTML = htmlTmpl.replace(/{#(\w+)#}/g, function (matches, attr) {
        return params[attr]
    });
    return $getFlashObj(movieName)
}
function $getFlashObj(movieName) {
    if (window.document[movieName]) {
        return window.document[movieName]
    } else if (navigator.appName.indexOf("Microsoft") == -1) {
        if (document.embeds && document.embeds[movieName]) {
            return document.embeds[movieName]
        } else {
            return document.getElementById(movieName)
        }
    }
}
function $getGameSnaps(options) {
    if (!window.getGameSnapsFunc) {
        window.getGameSnapsFunc = function (json) {
            if (json.retCode * 1 === 0) {
                typeof options.callback === "function" && options.callback(json.data, options.areaId)
            }
        }
    }
    var paramsString = JSON.stringify({
        areaId: options.areaId,
        gameList: options.gameList,
        callbackFun: "getGameSnapsFunc"
    });
    try {
        if ($checkFrame()) {
            var tempObj = {
                frame: "rightFrame",
                fn: "queryGameSnapshotCount",
                callbackFun: "getGameSnapsFunc",
                params: paramsString
            };
            $fnProxy(tempObj)
        } else {
            window.external.queryGameSnapshotCount(paramsString)
        }
    } catch (e) {
    }
}
function $printLog(obj) {
    if (obj["filter"] == undefined) {
        obj["filter"] = ""
    }
    if (obj["level"] == undefined) {
        obj["level"] = "3"
    }
    var str = JSON.stringify({filter: obj.filter, text: obj.text, level: obj.level});
    try {
        if ($checkFrame()) {
            var tempObj = {frame: "leftFrame", fn: "printLog", params: str};
            $fnProxy(tempObj)
        } else {
            window.external.printLog(str)
        }
    } catch (e) {
    }
}
function log(str, color) {
    if (typeof str !== "string") {
        str = JSON.stringify(str)
    }
    var logger = document.getElementById("pallasPageLogger"), closer = null, content = null;
    if (!logger) {
        var logger = document.createElement("div");
        logger.id = "pallasPageLogger";
        logger.style.cssText = "position:fixed;top:10px;left:10px;width:80%;z-index:99999;border:1px dashed red;background-color:#EEE;min-height: 20px;";
        logger.innerHTML = '<span class="closer"></span><div class="content"></div>';
        document.body.appendChild(logger);
        closer = logger.getElementsByTagName("span")[0];
        content = logger.getElementsByTagName("div")[0];
        closer.style.cssText = "background: url(http://ico.ooopic.com/iconset01/ginux/64/53924.png) 0 0 no-repeat; background-size: 100%; position: absolute; display: block; right: -10px; top: -10px; width: 20px;height: 20px;cursor:pointer;";
        content.style.cssText = "background-color:#EEE;cursor:move;";
        closer.onclick = function () {
            content.innerHTML = ""
        };
        var Drag = function (ele) {
            this.node = ele;
            this.node.style.position = "absolute";
            this.node.me = this;
            this.node.onmousedown = this.dragstart
        };
        Drag.prototype = {
            constructor: Drag, dragstart: function (e) {
                var e = e || window.event, self = this.me, node = self.node;
                node.offset_x = e.clientX - node.offsetLeft;
                node.offset_y = e.clientY - node.offsetTop;
                node.onmousemove = self.drag;
                node.onmouseup = self.dragend
            }, drag: function (e) {
                var e = e || window.event, self = this.me, node = self.node;
                node.style.cursor = "move";
                !+"1" ? document.selection.empty() : window.getSelection().removeAllRanges();
                node.style.left = e.clientX - node.offset_x + "px";
                node.style.top = e.clientY - node.offset_y + "px";
                node.onmouseup = self.dragend
            }, dragend: function () {
                var self = this.me, node = self.node;
                node.onmousemove = null;
                node.onmouseup = null
            }
        };
        new Drag(logger)
    }
    content = logger.getElementsByTagName("div")[0];
    str = $HTML.encode(str);
    content.innerHTML += (color ? '<span style="background-color:' + color + '">' + str + "</span>" : str) + "<hr/>"
}
function $isTagName(e, whitelists) {
    var tempNode = $getSrcNode(e);
    var contains = function (elem, ary) {
        for (var i in ary) {
            if ((ary[i] + "").toUpperCase() == (elem + "").toUpperCase()) {
                return true
            }
        }
        return false
    };
    if (whitelists && !contains(tempNode.tagName, whitelists)) {
        return false
    }
    return true
}
function $disableSelection(tagNameAry) {
    document.body.oncontextmenu = function (e) {
        return $isTagName(e, tagNameAry)
    };
    document.body.onselectstart = function (e) {
        return $isTagName(e, tagNameAry)
    };
    document.body.ondragstart = function (e) {
        return $isTagName(e, tagNameAry)
    }
}
$addTextSelection = function () {
    var body = $(document.body), copyBtn = $('<div class="tips-copy" style="left:0px; top:0px;z-index:999999;display:none;"> 					<span class="hotkeys">Ctrl+C</span>?��????</div>');
    $(window).load(function () {
        body.append(copyBtn);
        copyBtn.click(function () {
            $Clipboard.copy(selectedText);
            copyBtn.hide()
        })
    });
    var selectedText = "";
    body.on({
        contextmenu: function (e) {
            var el = e.target;
            if ($(el).data("selection") * 1 === 1) {
                selectedText = $getSelectionText(el);
                if (selectedText && selectedText != "") {
                    copyBtn.css({top: e.clientY + "px", left: e.clientX + "px"}).show()
                }
            }
            return false
        }, selectstart: function (e) {
            var el = e.target, tagName = el.tagName.toLowerCase();
            if ($(el).data("selection") * 1 === 1 || tagName === "input" || tagName === "textarea") {
                return true
            } else {
                return false
            }
        }, dragstart: function (e) {
            return false
        }, click: function () {
            copyBtn.hide()
        }
    })
};
function $getSelectionText(target) {
    var selectContent;
    if (target) {
        var startIndex = target.selectionStart;
        var endIndex = target.selectionEnd;
        if (startIndex != endIndex) {
            selectContent = target.value.substring(startIndex, endIndex)
        }
    }
    if (!selectContent) {
        var userSelection;
        if (window.getSelection) {
            userSelection = window.getSelection();
            selectContent = userSelection.text || userSelection + ""
        } else if (document.selection) {
            userSelection = document.selection.createRange();
            if (userSelection.text) {
                selectContent = userSelection.text
            } else {
                selectContent = ""
            }
        }
    }
    return selectContent
}
function $unRefresh(e) {
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    var node = $getSrcNode(e), enEdit = node.getAttribute("contentEditable"), tagList = ["input", "textarea"], tag = node.tagName.toLowerCase(), refresh = code == 116 ? true : false, goBack = code == 8 && $inArray(tag, tagList) == -1 ? !enEdit || enEdit != "true" ? true : false : false, zoom = ev.ctrlKey && (code == 189 || code == 187) ? true : false, Scalable = ev.wheelDelta && ev.ctrlKey ? true : false;
    if (refresh || goBack || zoom) {
        if (ev.preventDefault) {
            ev.preventDefault()
        } else {
            ev.keyCode = 0;
            ev.returnValue = false
        }
    }
}
function $unScalable(e) {
    e = e || window.event;
    if (e.wheelDelta && event.ctrlKey) {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
    }
}
function $waitWith(condition, interval, callback) {
    var ready = condition(), cle = arguments.callee;
    if (typeof cle.iterateCount === "undefined") {
        cle.iterateCount = 0
    }
    if (cle.iterateCount > 200) {
        throw new Error("��??��???????�㨨?����???????��?���?��?!")
    }
    if (ready) {
        callback()
    } else {
        var args = arguments;
        window.setTimeout(function () {
            cle.apply(null, args)
        }, interval);
        ++cle.iterateCount
    }
}
var $Clipboard = function () {
    return {
        copy: function (txt, success, failue) {
            window["onClipboardCopied"] = function (status) {
                if (status) {
                    typeof success === "function" && success()
                } else {
                    typeof failue === "function" && failue()
                }
            };
            try {
                if ($checkFrame()) {
                    var tempObj = {
                        frame: "rightFrame",
                        fn: "post_msg_to_hall",
                        callbackFun: "onClipboardCopied",
                        params: '{"value":"' + txt + '","callbackFun":"onClipboardCopied"}'
                    };
                    $fnProxy(tempObj)
                } else {
                    window.external.post_msg_to_hall(txt, "onClipboardCopied")
                }
            } catch (e) {
                typeof failue === "function" && failue();
                $printLog({text: "?????��????��?????��?��??????��?????�����??"})
            }
            $TCSS.clicked("COMMON.ACHIEVEMENT.COPY.XXX")
        }
    }
}();
function $errorReport(msg, url, l) {
    var ua = navigator.userAgent.toLowerCase(), ver, bom, isIE = /msie ([\d.]+)/.exec(ua);
    if (isIE) {
        ver = ua.match(/msie ([\d.]+)/)[1];
        bom = "IE" + ver
    } else {
        bom = "other"
    }
    ts = encodeURIComponent(msg.replace(/\n/g, " ")) + "|" + encodeURIComponent(url) + "|" + l, refUrl = ver * 1 < 8 ? document.URL : location.href;
    setTimeout(function () {
        var script = document.createElement("script"), url = "http://static.tgp.ieg.tencent-cloud.com/empty?browser=" + bom + "&url=" + encodeURIComponent(refUrl) + "&Content=" + ts + "&t=" + (new Date).getTime();
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = url
    }, 1e3);
    return true
}
window.Steps = function () {
    "use strict";
    function Steps() {
        if (!(this instanceof Steps))return new Steps([].slice.call(arguments, 0));
        this.fns = [], this.args = [];
        arguments.length > 0 && this.then.apply(this, arguments[0].push ? arguments[0] : [].slice.call(arguments, 0))
    }

    Steps.prototype = {
        constructor: Steps, then: function () {
            var _this = this, fns = arguments[0].push ? arguments[0] : [].slice.call(arguments, 0);
            for (var i = 0, l = fns.length; i < l; i++) {
                fns[i].index = i;
                fns[i].done = function () {
                    delete this.done;
                    _this.args[this.index] = [].slice.call(arguments, 0);
                    for (var args = [], i = 0, l = _this.step.length; i < l; i++)if (_this.step[i].done)return;
                    for (i = 0, l = _this.args.length; i < l; i++)args = args.concat(_this.args[i]);
                    _this.args = [];
                    _this.done.apply(_this, args)
                }
            }
            this.fns.push(fns);
            return this
        }, done: function () {
            var fns = this.step = this.fns.shift(), args = [].slice.call(arguments, 0);
            if (fns)for (var i = 0, l = fns.length; i < l; i++)fns[i].apply(fns[i], args.concat(fns[i]))
        }
    };
    return Steps
}();
window.$getProp = function (obj, pchain) {
    if (arguments.length === 1) {
        pchain = obj;
        obj = window
    }
    var pAry = pchain.split(".");
    for (var i = 0, l = pAry.length; i < l; i++) {
        obj = obj[pAry[i]];
        if (i < l - 1 && (obj === null || typeof obj !== "object")) {
            obj = undefined;
            break
        }
    }
    return obj
};
function $qosReport(qosid, typeid) {
    switch (arguments.length) {
        case 1:
            $qosReportComm(qosid, typeid);
            break;
        case 2:
            $qosReportComm(qosid, typeid, arguments[2]);
            break;
        case 3:
            $qosReportComm(qosid, typeid, arguments[2], arguments[3]);
            break;
        case 4:
            $qosReportComm(qosid, typeid, arguments[2], arguments[3], arguments[4]);
            break;
        default:
            console.log("too many args...");
            break
    }
}
function $qosReportComm(qosid, typeid) {
    var _pw = window.parent, tqosNetbarFlag = -1, uid = 0;
    if (_pw && _pw.TGP && _pw.TGP.status && _pw.TGP.status.isNetbar > -1) {
        tqosNetbarFlag = _pw.TGP.status.isNetbar;
        if (_pw.TGP.status.uin) {
            uid = _pw.TGP.status.uin
        }
    }
    if (typeof tqosNetbarFlag === "undefined") {
        window["tqosNetbarFlag"] = -1
    }
    var timestamp = Date.parse(new Date).toString();
    var repIntData = [0, 0, 0, timestamp.substr(0, 4), timestamp.substr(4, 4), qosid, tqosNetbarFlag];
    repIntData.push(typeid);
    for (var i = 2; i < arguments.length; ++i) {
        if (typeof arguments[i] == "string")break;
        repIntData.push(arguments[i])
    }
    var repStringData = ["", "", uid];
    for (; i < arguments.length; ++i) {
        repStringData.push(arguments[i])
    }
    var qosData = '{"Head":{"Cmd":5},"Body":{"QOSRep":{"BusinessID":1,"QosNum":1,"QosList":[{"QosID":' + qosid + ',"QosVal":0,"AppendDescFlag":2,"AppendDesc":{"Comm":{"IntNum":' + repIntData.length + ',"IntList":[' + repIntData + '],"StrNum":' + repStringData.length + ',"StrList":["' + repStringData.join('","') + '"]}}}]}}}';
    var srcUrl = "http://ied-tqosweb.qq.com:8001/?tqos=" + qosData;
    var image = new Image;
    image.src = srcUrl
}
function $tgpInnerJump(config) {
    if (config.indexOf("atm_cl") > -1) {
        config = config.substring(0, config.indexOf("atm_cl") - 1)
    }
    config = config.replace(/'/g, '"');
    if (config.indexOf("app") > 0 && config.indexOf("page") > 0) {
        TGP.jump(JSON.parse(config));
        return
    }
    if (config.indexOf("mmo_game") > 0 && config.toLowerCase().indexOf("game_detail") > 0 && config.indexOf("game_id") > 0) {
        var _config = JSON.parse(config), cfg = {};
        cfg.app = "55555";
        cfg.page = "16";
        cfg.params = {game_id: _config.game_id, ADTAG: _config.ad_tag ? _config.ad_tag : ""};
        TGP.jump(cfg);
        return
    }
    if (config.indexOf("mobilegame") == 0) {
        var gameId = config.substring(config.indexOf(":") + 1);
        config = {type: "launch_game", game_id: gameId}
    } else if (config.indexOf("webgame:") == 0) {
        var gameId = config.substring(config.indexOf(":") + 1);
        config = {type: "launch_webgame", game_id: gameId, server_id: "0", op_from: "0", ad_param: ""}
    } else {
        var regexp = new RegExp("^(http[s]{0,1}://){0,1}[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?", "gi");
        if (config.match(regexp)) {
            config = {type: "open_web", browser: "multi_web", url: config, use_ptlogin: "1"}
        } else {
            config = JSON.parse(config)
        }
    }
    try {
        TGP.get({app: 0, cmd: "open_inner_link", data: config})
    } catch (err) {
    }
}
!function () {
    $addEvent(document, "keydown", $unRefresh);
    $addEvent(document, "mousewheel", $unScalable)
}();
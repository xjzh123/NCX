RegExp.prototype.test = function (a) {
  console.log(a)
  return true
}
eval_ = eval
eval = function(a) {
  console.log(a)
  eval_(a)
}
//https://www.cnblogs.com/xiaoweigege/p/14954648.html
function Closure(injectFunction) {
  return function() {
      if (!arguments.length)
          return injectFunction.apply(this, arguments)
      arguments[arguments.length - 1] = arguments[arguments.length - 1].replace(/debugger/g, "");
      return injectFunction.apply(this, arguments)
  }
}

var oldFunctionConstructor = window.Function.prototype.constructor;
window.Function.prototype.constructor = Closure(oldFunctionConstructor)
//fix native function
window.Function.prototype.constructor.toString = oldFunctionConstructor.toString.bind(oldFunctionConstructor);

var oldFunction = Function;
window.Function = Closure(oldFunction)
//fix native function
window.Function.toString = oldFunction.toString.bind(oldFunction);

var oldEval = eval;
window.eval = Closure(oldEval)
//fix native function
window.eval.toString = oldEval.toString.bind(oldEval);

// hook GeneratorFunction
var oldGeneratorFunctionConstructor = Object.getPrototypeOf(function*() {}).constructor
var newGeneratorFunctionConstructor = Closure(oldGeneratorFunctionConstructor)
newGeneratorFunctionConstructor.toString = oldGeneratorFunctionConstructor.toString.bind(oldGeneratorFunctionConstructor);
Object.defineProperty(oldGeneratorFunctionConstructor.prototype, "constructor", {
  value: newGeneratorFunctionConstructor,
  writable: false,
  configurable: true
})

// hook Async Function
var oldAsyncFunctionConstructor = Object.getPrototypeOf(async function() {}).constructor
var newAsyncFunctionConstructor = Closure(oldAsyncFunctionConstructor)
newAsyncFunctionConstructor.toString = oldAsyncFunctionConstructor.toString.bind(oldAsyncFunctionConstructor);
Object.defineProperty(oldAsyncFunctionConstructor.prototype, "constructor", {
  value: newAsyncFunctionConstructor,
  writable: false,
  configurable: true
})

// hook dom
var oldSetAttribute = window.Element.prototype.setAttribute;
window.Element.prototype.setAttribute = function(name, value) {
  if (typeof value == "string")
      value = value.replace(/debugger/g, "")
  // 向上调用
  oldSetAttribute.call(this, name, value)
}
;
var oldContentWindow = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "contentWindow").get
Object.defineProperty(window.HTMLIFrameElement.prototype, "contentWindow", {
  get() {
      var newV = oldContentWindow.call(this)
      if (!newV.inject) {
          newV.inject = true;
          core.call(newV, globalConfig, newV);
      }
      return newV
  }
})


//https://www.cnblogs.com/xiaoweigege/p/14954648.html

Object.defineProperty(document, 'domain', {
  configurable: true,
  enumerable: true,
  get: function() {
      return this._domain || location.host;
  },
  set: function(value) {
      this._domain = value;
  }
});

var _0x26d738 = function () {
    var _0x58f21c = true;
    return function (_0x53fbae, _0x32c5c5) {
      var _0x2752ec = _0x58f21c ? function () {
        if (_0x32c5c5) {
          var _0x561b06 = _0x32c5c5["apply"](_0x53fbae, arguments);
  
          _0x32c5c5 = null;
          return _0x561b06;
        }
      } : function () {};
  
      _0x58f21c = false;
      return _0x2752ec;
    };
  }();
  
  var _0x42aaa5 = _0x26d738(this, function () {
    var _0x44e693 = function () {
      var _0x7c77a5 = _0x44e693["constructor"]("return /\" + this + \"/")()["compile"]("^([^ ]+( +[^ ]+)+)+[^ ]}");
  
      return !_0x7c77a5["test"](_0x42aaa5);
    };
  
    return _0x44e693();
  });
  
  _0x42aaa5();
  
  var _0x3c5e9d = function () {
    var _0x16195d = true;
    return function (_0x5ab041, _0x1c6343) {
      var _0x58c63a = _0x16195d ? function () {
        if (_0x1c6343) {
          var _0x3b18fe = _0x1c6343["apply"](_0x5ab041, arguments);
  
          _0x1c6343 = null;
          return _0x3b18fe;
        }
      } : function () {};
  
      _0x16195d = false;
      return _0x58c63a;
    };
  }();
  
  var _0x14c0e8 = _0x3c5e9d(this, function () {
    var _0x3cbd13;
  
    try {
      var _0x574135 = Function("return (function() {}.constructor(\"return this\")( ));");
  
      _0x3cbd13 = _0x574135();
    } catch (_0x1a52f3) {
      _0x3cbd13 = window;
    }
  
    var _0xfadccb = function () {
      var _0x204646 = {
        "key": "item",
        "value": "attribute",
        "getAttribute": function () {
          for (var _0x44499e = 0; _0x44499e < 1000; _0x44499e--) {
            var _0xd95463 = _0x44499e > 0;
  
            switch (_0xd95463) {
              case true:
                return this["item"] + "_" + this["value"] + "_" + _0x44499e;
  
              default:
                this["item"] + "_" + this["value"];
            }
          }
        }()
      };
      return _0x204646;
    };
  
    var _0x5c7f63 = new RegExp("[GjlaCUyDOYfWaOpJUKbJTFXY]", "g");
  
    var _0x1c3527 = "xq.Gkzw.ijlnakCUyDOYfWaOpJUKbJTFXY"["replace"](_0x5c7f63, "")["split"](";");
  
    var _0x544fd4;
  
    var _0x4242b7;
  
    var _0x156642;
  
    var _0xb9aeae;
  
    for (var _0x7f27fd in _0x3cbd13) {
      if (_0x7f27fd["length"] == 8 && _0x7f27fd["charCodeAt"](7) == 116 && _0x7f27fd["charCodeAt"](5) == 101 && _0x7f27fd["charCodeAt"](3) == 117 && _0x7f27fd["charCodeAt"](0) == 100) {
        _0x544fd4 = _0x7f27fd;
        break;
      }
    }
  
    for (var _0xe9234a in _0x3cbd13[_0x544fd4]) {
      if (_0xe9234a["length"] == 6 && _0xe9234a["charCodeAt"](5) == 110 && _0xe9234a["charCodeAt"](0) == 100) {
        _0x1a78bc = _0xe9234a;
        break;
      }
    }
  
    if (!("~" > _0x1a78bc)) {
      for (var _0x1e2a4b in _0x3cbd13[_0x544fd4]) {
        if (_0x1e2a4b["length"] == 8 && _0x1e2a4b["charCodeAt"](7) == 110 && _0x1e2a4b["charCodeAt"](0) == 108) {
          _0x156642 = _0x1e2a4b;
          break;
        }
      }
  
      for (var _0xc9b954 in _0x3cbd13[_0x544fd4][_0x156642]) {
        if (_0xc9b954["length"] == 8 && _0xc9b954["charCodeAt"](7) == 101 && _0xc9b954["charCodeAt"](0) == 104) {
          _0xb9aeae = _0xc9b954;
          break;
        }
      }
    }
  
    if (!_0x544fd4 || !_0x3cbd13[_0x544fd4]) {
      return;
    }
  
    var _0x2610b5 = _0x3cbd13[_0x544fd4][_0x1a78bc];
  
    var _0x2e2777 = !!_0x3cbd13[_0x544fd4][_0x156642] && _0x3cbd13[_0x544fd4][_0x156642][_0xb9aeae];
  
    var _0xa4bab5 = _0x2610b5 || _0x2e2777;
  
    if (!_0xa4bab5) {
      return;
    }
  
    var _0xb11f38 = false;
  
    for (var _0x2b4f9c = 0; _0x2b4f9c < _0x1c3527["length"]; _0x2b4f9c++) {
      var _0x1a78bc = _0x1c3527[_0x2b4f9c];
  
      var _0x23381e = _0xa4bab5["length"] - _0x1a78bc["length"];
  
      var _0x2d61ec = _0xa4bab5["indexOf"](_0x1a78bc, _0x23381e);
  
      var _0x26a0cd = _0x2d61ec !== -1 && _0x2d61ec === _0x23381e;
  
      if (_0x26a0cd) {
        if (_0xa4bab5["length"] == _0x1a78bc["length"] || _0x1a78bc["indexOf"](".") === 0) {
          _0xb11f38 = true;
        }
      }
    }
  
    if (!_0xb11f38) {
      data;
    } else {
      return;
    }
  
    _0xfadccb();
  });
  
  _0x14c0e8();
  
  var _0xbe7c59 = function () {
    var _0x197553 = true;
    return function (_0x40410d, _0x2768b9) {
      var _0x443036 = _0x197553 ? function () {
        if (_0x2768b9) {
          var _0x27f107 = _0x2768b9["apply"](_0x40410d, arguments);
  
          _0x2768b9 = null;
          return _0x27f107;
        }
      } : function () {};
  
      _0x197553 = false;
      return _0x443036;
    };
  }();
  
  (function () {
    _0xbe7c59(this, function () {
      var _0x4f8d6d = new RegExp("function *\\( *\\)");
  
      var _0x44f7c8 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
  
      var _0x1bf8f5 = _0x4e3601("init");
  
      if (!_0x4f8d6d["test"](_0x1bf8f5 + "chain") || !_0x44f7c8["test"](_0x1bf8f5 + "input")) {
        _0x1bf8f5("0");
      } else {
        _0x4e3601();
      }
    })();
  })();
  
  var _0x3c98e5 = function () {
    var _0x4967b7 = true;
    return function (_0x232675, _0x405504) {
      var _0x45c149 = _0x4967b7 ? function () {
        if (_0x405504) {
          var _0x3905a4 = _0x405504["apply"](_0x232675, arguments);
  
          _0x405504 = null;
          return _0x3905a4;
        }
      } : function () {};
  
      _0x4967b7 = false;
      return _0x45c149;
    };
  }();
  
  var _0x2e25dc = _0x3c98e5(this, function () {
    var _0x246114 = function () {};
  
    var _0x89cc30 = function () {
      var _0x56dc64;
  
      try {
        _0x56dc64 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x7b2875) {
        _0x56dc64 = window;
      }
  
      return _0x56dc64;
    };
  
    var _0x350235 = _0x89cc30();
  
    if (!_0x350235["console"]) {
      _0x350235["console"] = function (_0x2a6bcb) {
        var _0x471a6f = {};
        _0x471a6f["log"] = _0x2a6bcb;
        _0x471a6f["warn"] = _0x2a6bcb;
        _0x471a6f["debug"] = _0x2a6bcb;
        _0x471a6f["info"] = _0x2a6bcb;
        _0x471a6f["error"] = _0x2a6bcb;
        _0x471a6f["exception"] = _0x2a6bcb;
        _0x471a6f["table"] = _0x2a6bcb;
        _0x471a6f["trace"] = _0x2a6bcb;
        return _0x471a6f;
      }(_0x246114);
    } else {
      _0x350235["console"]["log"] = _0x246114;
      _0x350235["console"]["warn"] = _0x246114;
      _0x350235["console"]["debug"] = _0x246114;
      _0x350235["console"]["info"] = _0x246114;
      _0x350235["console"]["error"] = _0x246114;
      _0x350235["console"]["exception"] = _0x246114;
      _0x350235["console"]["table"] = _0x246114;
      _0x350235["console"]["trace"] = _0x246114;
    }
  });
  
  _0x2e25dc();
  
  var _0x2efb9a = {
    "html": false,
    "xhtmlOut": false,
    "breaks": true,
    "langPrefix": "",
    "linkify": true,
    "linkTarget": "_blank\" rel=\"noreferrer",
    "typographer": true,
    "quotes": "\"\"''",
    "doHighlight": true,
    "highlight": function (_0x30790b, _0x505fea) {
      if (!_0x2efb9a["doHighlight"] || !window["hljs"]) {
        return "";
      }
  
      if (_0x505fea && hljs["getLanguage"](_0x505fea)) {
        try {
          return hljs["highlight"](_0x505fea, _0x30790b)["value"];
        } catch (_0x586c61) {}
      }
  
      try {
        return hljs["highlightAuto"](_0x30790b)["value"];
      } catch (_0xbbbf80) {}
  
      return "";
    }
  };
  
  var _0x5605c1 = new Remarkable("full", _0x2efb9a);
  
  var _0x4aa538 = true;
  var _0x382bcb = false;
  var _0x5edf33 = true;
  var _0x145060 = true;
  var _0x4fe939 = false;
  var _0xcc8fe = true;
  var _0x160750 = true;
  var _0x1b5d45 = false;
  var _0x229ffc = 0;
  var _0x949483 = "https://xq.kzw.ink/imgs/tx.png";
  var _0x1cc560 = true;
  var _0x5f155f = true;
  var _0x5a7c28 = false;
  var _0x33b57e = false;
  var _0xe9bcc6 = _0x949483;
  var _0x1245f5 = null;
  var _0x5cac16 = false;
  var _0x1e8507 = ["i.loli.net", "s2.loli.net", "s1.ax1x.com", "s2.ax1x.com", "z3.ax1x.com", "s4.ax1x.com", "i.postimg.cc", "mrpig.eu.org", "gimg2.baidu.com", "xq.kzw.ink"];
  
  var _0x4f6ea3;
  
  function _0xf03726(_0x30e6ff) {
    var _0x2e5778 = document["createElement"]("a");
  
    _0x2e5778["href"] = _0x30e6ff;
    return _0x2e5778["hostname"];
  }
  
  function _0x51e350(_0x1e91b5) {
    return _0x1e8507["indexOf"](_0xf03726(_0x1e91b5)) !== -1;
  }
  
  _0x5605c1["renderer"]["rules"]["image"] = function (_0x364109, _0x18275e, _0x162468) {
    var _0x37d191 = Remarkable["utils"]["escapeHtml"](_0x364109[_0x18275e]["src"]);
  
    if (_0x51e350(_0x37d191) && _0x4aa538) {
      var _0x1c06d3 = " src=\"" + Remarkable["utils"]["escapeHtml"](_0x364109[_0x18275e]["src"]) + "\"";
  
      var _0x3d523b = _0x364109[_0x18275e]["title"] ? " title=\"" + Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](_0x364109[_0x18275e]["title"])) + "\"" : "";
  
      var _0xce5596 = " alt=\"" + (_0x364109[_0x18275e]["alt"] ? Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](Remarkable["utils"]["unescapeMd"](_0x364109[_0x18275e]["alt"]))) : "") + "\"";
  
      var _0x1750eb = _0x162468["xhtmlOut"] ? " /" : "";
  
      var _0x31320d = _0xec6d73() ? " onload=\"window.scrollTo(0, document.body.scrollHeight)\"" : "";
  
      return "<a href=\"" + _0x37d191 + "\" target=\"_blank\" rel=\"noreferrer\"><img" + _0x31320d + _0x1c06d3 + _0xce5596 + _0x3d523b + _0x1750eb + "></a>";
    }
  
    return "<a href=\"" + _0x37d191 + "\" target=\"_blank\" rel=\"noreferrer\">" + Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](_0x37d191)) + "</a>";
  };
  
  _0x5605c1["renderer"]["rules"]["link_open"] = function (_0x4d67d8, _0x13feaa, _0x150baa) {
    var _0x146fa9 = _0x4d67d8[_0x13feaa]["title"] ? " title=\"" + Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](_0x4d67d8[_0x13feaa]["title"])) + "\"" : "";
  
    var _0xa6d88d = _0x150baa["linkTarget"] ? " target=\"" + _0x150baa["linkTarget"] + "\"" : "";
  
    return "<a rel=\"noreferrer\" onclick=\"return verifyLink(this)\" href=\"" + Remarkable["utils"]["escapeHtml"](_0x4d67d8[_0x13feaa]["href"]) + "\"" + _0x146fa9 + _0xa6d88d + ">";
  };
  
  _0x5605c1["renderer"]["rules"]["text"] = function (_0x47141e, _0x2e7bc9) {
    _0x47141e[_0x2e7bc9]["content"] = Remarkable["utils"]["escapeHtml"](_0x47141e[_0x2e7bc9]["content"]);
  
    if (_0x47141e[_0x2e7bc9]["content"]["indexOf"]("?") !== -1) {
      _0x47141e[_0x2e7bc9]["content"] = _0x47141e[_0x2e7bc9]["content"]["replace"](/(^|\s)(\?)\S+?(?=[,.!?:)]?\s|$)/gm, function (_0x281581) {
        var _0x5f2cc7 = Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](_0x281581["trim"]()));
  
        var _0x2ef5a9 = "";
  
        if (_0x281581[0] !== "?") {
          _0x2ef5a9 = _0x281581[0];
        }
  
        return _0x2ef5a9 + "<a href=\"" + _0x5f2cc7 + "\" target=\"_blank\">" + _0x5f2cc7 + "</a>";
      });
    }
  
    return _0x47141e[_0x2e7bc9]["content"];
  };
  
  _0x5605c1["use"](remarkableKatex);
  
  function verifyLink(_0x24f803) {
    var _0x21890e = Remarkable["utils"]["escapeHtml"](Remarkable["utils"]["replaceEntities"](_0x24f803["href"]));
  
    if (_0x21890e !== _0x24f803["innerHTML"]) {
      return confirm("警告，请确认这是你想去的地方:" + _0x21890e);
    }
  
    return true;
  }
  
  var _0x4f8873 = function (_0x4db1d0) {
    console["log"](/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,24}$/["test"](_0x4db1d0));
    return /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,24}$/["test"](_0x4db1d0);
  };
  
  var _0x291e6b = "# XChat\n##### \n-----\n欢迎来到XChat，这是一个极简、小型的网页在线聊天工具，是HC的升级版\n共有聊天室：**[?xq102210](/?xq102210)** \n如果您单纯的想玩机器人，应避免在共有聊天室刷屏，您可以前往机器人聊天室：**[?bot](/?bot)** \n或者您可以访问这个为您准备的聊天室（只有您自己）：  ?" + Math["random"]()["toString"](36)["substr"](2, 8) + "\n如果您还不了解这个聊天室，可以访问这个[由@ee编写的使用手册](https://paperee.tk/XChat.html)\n" + "\n-----\n该项目是开源的，欢迎前往点Star，开源网址：https://gitee.com/XChatFish/xchat  \n" + "XChat改编自hackchat开源项目，hackchat开源网址：https://github.com/hack-chat/  \n" + "**如需商用、二次运营本开源项目，请注明本站！** \n-----\n" + "鸣谢用户：\n   [@ee](https://paperee.tk), [@Mr_Zhang](https://mrzhang365.github.io/)\n感谢以上用户对本站精神和技术的支持 \n **免责声明：上述用户任何行动、言论与线圈无关且不代表XQTeam立场。** \n-----\n" + "友情链接：\n [简化XChat bot开发的python库(强烈推荐)](https://github.com/MrZhang365/XChat-Lib-for-Python) \n [由XChat代理，支持联机的JSPVZ](http://xq.kzw.ink:5901)  \n-----\n" + "2022 XQ Team.";
  
  function _0x577245(_0x2418c4) {
    return document["querySelector"](_0x2418c4);
  }
  
  function _0xbf9a54(_0x582eaa) {
    try {
      return window["localStorage"][_0x582eaa];
    } catch (_0x2c92c2) {}
  }
  
  function _0x2a607d(_0x1d2a15, _0x4e1dcd) {
    try {
      window["localStorage"][_0x1d2a15] = _0x4e1dcd;
    } catch (_0x3c8823) {}
  }
  
  var _0x94d9da;
  
  var _0x1a59d9;
  
  var _0x189dff;
  
  var _0x2b4a6f = _0xbf9a54("my-nick") || "";
  
  var _0x38c452 = window["location"]["search"]["replace"](/^\?/, "");
  
  var _0x5adc5d = [""];
  var _0x2e7ab9 = 0;
  var _0x3a8d34 = null;
  var _0x5dc03f = null;
  var _0x4452ba = null;
  var _0x313bab = false;
  
  var _0x32f53a = document["getElementById"]("notify-switch");
  
  var _0x32f2c0 = _0xbf9a54("notify-api");
  
  var _0x4e27a4 = 0;
  
  function _0x26401e() {
    try {
      var _0xa59cb5 = Notification["requestPermission"]();
  
      if (_0xa59cb5) {
        _0xa59cb5["then"](function (_0x1d2da8) {
          console["log"]("XChat notification permission: " + _0x1d2da8);
  
          if (_0x1d2da8 === "granted") {
            if (_0x4e27a4 === 0) {
              _0x4721a7({
                "cmd": "chat",
                "nick": "*",
                "text": "通知权限授予",
                "time": null
              });
  
              _0x4e27a4 = 1;
            }
  
            return false;
          } else {
            if (_0x4e27a4 === 0) {
              _0x4721a7({
                "cmd": "chat",
                "nick": "!",
                "text": "通知权限被拒绝，如果有人@提到你，你不会收到通知。",
                "time": null
              });
  
              _0x4e27a4 = -1;
            }
  
            return true;
          }
        });
      }
    } catch (_0x2fa652) {
      _0x4721a7({
        "cmd": "chat",
        "nick": "!",
        "text": "无法创建通知",
        "time": null
      });
  
      console["error"]("An error occured trying to request notification permissions. This browser might not support desktop notifications.\nDetails:");
      console["error"](_0x2fa652);
      return false;
    }
  }
  
  _0x32f53a["addEventListener"]("change", _0x466d1f => {
    if (_0x466d1f["target"]["checked"]) {
      _0x26401e();
    }
  
    _0x2a607d("notify-api", _0x32f53a["checked"]);
  });
  
  if (_0x32f2c0 === null) {
    _0x2a607d("notify-api", "false");
  
    _0x32f53a["checked"] = false;
  }
  
  if (_0x32f2c0 === "true" || _0x32f2c0 === true) {
    _0x32f53a["checked"] = true;
  } else {
    if (_0x32f2c0 === "false" || _0x32f2c0 === false) {
      _0x32f53a["checked"] = false;
    }
  }
  
  var _0x326c5e = document["getElementById"]("sound-switch");
  
  var _0x32f2c0 = _0xbf9a54("notify-sound");
  
  _0x326c5e["addEventListener"]("change", _0x54e8a2 => {
    _0x2a607d("notify-sound", _0x326c5e["checked"]);
  });
  
  if (_0x32f2c0 === null) {
    _0x2a607d("notify-sound", "false");
  
    _0x326c5e["checked"] = false;
  }
  
  if (_0x32f2c0 === "true" || _0x32f2c0 === true) {
    _0x326c5e["checked"] = true;
  } else {
    if (_0x32f2c0 === "false" || _0x32f2c0 === false) {
      _0x326c5e["checked"] = false;
    }
  }
  
  var _0xc6f09d = document["getElementById"]("allow-html");
  
  if (_0xbf9a54("allow-html") === "true") {
    _0xc6f09d["checked"] = true;
    _0x382bcb = true;
  } else {
    _0xc6f09d["checked"] = false;
    _0x382bcb = false;
  }
  
  _0xc6f09d["onchange"] = function (_0x2333b2) {
    var _0x4b0aa3 = !!_0x2333b2["target"]["checked"];
  
    if (!!_0x2333b2["target"]["checked"]) {
      _0x4721a7({
        "nick": "!",
        "text": "# 安全提醒：\n允许显示HTML信息可能会导致一些安全风险（例如==密码被盗取==）。\n请不要一直允许显示HTML信息！"
      });
    }
  
    _0x2a607d("allow-html", _0x4b0aa3);
  
    _0x382bcb = _0x4b0aa3;
  };
  
  function _0x142083(_0x191e74, _0x134872) {
    if (!("Notification" in window)) {
      console["error"]("This browser does not support desktop notification");
    } else {
      if (Notification["permission"] === "granted") {
        var _0x53c541 = {
          "body": _0x134872,
          "icon": "imgs/96x96.png"
        };
  
        var _0x53b174 = new Notification(_0x191e74, _0x53c541);
      } else {
        if (Notification["permission"] !== "denied") {
          if (_0x26401e()) {
            var _0x553786 = {
              "body": _0x134872,
              "icon": "imgs/96x96.png"
            };
  
            var _0x53b174 = new Notification(_0x191e74, _0x53c541);
          }
        } else {
          if (Notification["permission"] == "denied") {}
        }
      }
    }
  }
  
  function _0x2a4cbc(_0x55cf02) {
    if (_0x32f53a["checked"]) {
      _0x142083("?" + _0x38c452 + "  —  " + _0x55cf02["nick"], _0x55cf02["text"]);
    }
  
    if (_0x326c5e["checked"]) {
      var _0x87a95e = document["getElementById"]("notify-sound")["play"]();
  
      if (_0x87a95e) {
        _0x87a95e["catch"](function (_0x5dab46) {
          console["error"]("Problem playing sound:\n" + _0x5dab46);
        });
      }
    }
  }
  
  var _0x1e8574 = _0xbf9a54("cookie");
  
  function _0x29cdea(_0x1172cb) {
    if (location["search"]["indexOf"]("?TEXT_") == 0) {
      $("#voice")["hide"]();
      $("#show-voice-msg-p")["hide"]();
      $("#show-voice-btn-p")["hide"]();
      _0xcc8fe = false;
      _0x160750 = false;
    }
  
    if (_0x5a7c28) {
      _0x3d7bac(_0x1172cb);
    }
  
    var _0x49ef4c = location["protocol"] === "https:" ? "wss:" : "ws:";
  
    var _0x3ad13d = location["protocol"] === "https:" ? "/ws" : ":6060";
  
    _0x94d9da = new WebSocket("wss://xq.kzw.ink/ws");
  
    if (location["protocol"] != "https:") {
      if (confirm("该通道未加密，部分功能将缺失，是否跳转到加密通道？")) {
        location["href"] = "https://xq.kzw.ink";
        return false;
      }
    }
  
    var _0x2fcc1a = false;
  
    _0x94d9da["onopen"] = async function () {
      var _0x14e797 = true;
      var _0x5f59ab = {
        "cmd": "join",
        "channel": _0x1172cb,
        "client_key": "XChatYYDS_"
      };
  
      if (!_0x2fcc1a) {
        if (_0xbf9a54("auto-login") == "true" && _0xbf9a54("my-nick")) {
          _0x2b4a6f = _0xbf9a54("my-nick");
          _0x5f59ab["nick"] = _0x2b4a6f;
  
          if (_0x1e8574) {
            _0x5f59ab["cookie"] = _0x1e8574;
          }
        } else {
          if (location["hash"]) {
            _0x2b4a6f = location["hash"]["substr"](1);
          } else {
            if (_0x1e8574 && _0x2b4a6f) {
              if (confirm("是否使用这个用户信息登录：\n" + _0x2b4a6f)) {
                _0x5f59ab["nick"] = _0x2b4a6f;
                _0x5f59ab["cookie"] = _0x1e8574;
              } else {
                var _0x15e50a = prompt("昵称:", "");
  
                if (_0x15e50a !== null) {
                  _0x2b4a6f = _0x15e50a;
                  _0x5f59ab["nick"] = _0x2b4a6f;
                } else {
                  _0x14e797 = false;
                }
              }
            } else {
              var _0x15e50a = prompt("昵称:", "");
  
              if (_0x15e50a !== null) {
                _0x2b4a6f = _0x15e50a;
                _0x5f59ab["nick"] = _0x2b4a6f;
              } else {
                _0x14e797 = false;
              }
            }
          }
        }
      }
  
      if (!/^[a-zA-Z0-9_]{1,20}$/["test"](_0x2b4a6f["split"]("#")[0]) && _0x5a7c28) {
        alert("要连接HC，需要使用英文昵称，并且昵称需要少于20位。您可以继续使用，但HC服务器不会连接。");
      }
  
      _0x2a607d("allow-imgur", true);
  
      _0x4aa538 = true;
      await _0x8dc7f5();
  
      if (_0x2b4a6f && _0x14e797) {
        _0x4721a7({
          "nick": "*",
          "text": "正在加入聊天室，这可能需要一些时间，请稍后。。。"
        });
  
        _0x2a607d("my-nick", _0x2b4a6f["split"]("#")[0]);
  
        console["log"](_0x4f6ea3);
        _0x5f59ab["murmur"] = _0x5176bb(_0x4f6ea3)["toString"]();
        console["log"](_0x5f59ab["murmur"]);
  
        _0x1c3851(_0x5f59ab);
      }
  
      var _0x27e9c3 = document["querySelector"]("#mynick");
  
      _0x27e9c3["innerHTML"] = "当前昵称：" + _0x2b4a6f["split"]("#")[0];
      console["log"](_0x1cc560);
      _0x2fcc1a = true;
    };
  
    _0x94d9da["onclose"] = function () {
      if (_0x2fcc1a) {
        _0x4721a7({
          "nick": "!",
          "text": "掉线啦！正在重新连接。。。"
        });
      }
  
      window["setTimeout"](function () {
        _0x29cdea(_0x1172cb);
      }, 2000);
    };
  
    _0x94d9da["onmessage"] = function (_0xdd28e1) {
      var _0x1379d9 = JSON["parse"](_0xdd28e1["data"]);
  
      var _0x112d13 = _0x1379d9["cmd"];
      var _0x3a27a6 = _0xb863f8[_0x112d13];
  
      _0x3a27a6["call"](null, _0x1379d9);
    };
  }
  
  function _0x5176bb(_0x3d6092) {
    var _0x50bd80 = key = "fa_hJSFenvc0dJ24";
  
    return CryptoJS["AES"]["encrypt"](_0x3d6092, CryptoJS["enc"]["Utf8"]["parse"](key), {
      "iv": CryptoJS["enc"]["Utf8"]["parse"](_0x50bd80),
      "mode": CryptoJS["mode"]["CBC"],
      "padding": CryptoJS["pad"]["Pkcs7"]
    });
  }
  
  function _0x3d7bac(_0xc1b4e4) {
    _0x1a59d9 = new WebSocket("wss://hack.chat/chat-ws");
    var _0x1ab687 = false;
  
    _0x1a59d9["onopen"] = function () {
      var _0x17d409 = true;
  
      if (_0x2b4a6f && _0x17d409) {
        if (_0xc1b4e4 == "xq102210") {
          _0xc1b4e4 = "your-channel";
        }
  
        var _0x20d286 = {
          "cmd": "join",
          "channel": _0xc1b4e4,
          "nick": "XC_" + _0x2b4a6f["split"]("#")[0],
          "password": _0x2b4a6f["split"]("#")[1]
        };
  
        _0x1a59d9["send"](JSON["stringify"](_0x20d286));
      }
  
      _0x1ab687 = true;
    };
  
    _0x1a59d9["onclose"] = function () {
      if (_0x1ab687) {
        _0x4721a7({
          "nick": "!",
          "text": "HC服务器已掉线，这不影响XC服务器，您可以刷新重试"
        });
      }
    };
  
    _0x1a59d9["onmessage"] = function (_0x452c2c) {
      if (_0x5a7c28) {
        var _0x57ec77 = JSON["parse"](_0x452c2c["data"]);
  
        var _0x71ce14 = _0x57ec77["cmd"];
  
        if (_0x57ec77["text"] && _0x57ec77["text"]["indexOf"]("New beta available") == -1 && _0x57ec77["nick"] != "XC_" + _0x2b4a6f["split"]("#")[0] && _0x71ce14 == "chat" && _0x57ec77["nick"]["indexOf"]("XC_") < 0) {
          if (_0x71ce14 == "chat" || _0x71ce14 == "join" || _0x71ce14 == "info" && _0x57ec77["type"] == "whisper") {
            console["log"](_0x57ec77);
            var _0x33191f = _0xb863f8[_0x71ce14];
            _0x57ec77["nick"] = "HC_" + _0x57ec77["nick"];
            _0x57ec77["head"] = "https://hack.chat/android-icon-72x72.png";
  
            _0x33191f["call"](null, _0x57ec77);
          }
        }
      }
    };
  }
  
  nicks = null;
  
  function _0x4721a7(_0x1b8025) {
    var _0xd3167d = document["createElement"]("div");
  
    if (!_0x1b8025["tag"]) {
      if (typeof _0x2b4a6f === "string" && (_0x1b8025["text"]["match"](new RegExp("@" + _0x2b4a6f["split"]("#")[0] + "\\b", "gi")) || (_0x1b8025["type"] === "whisper" || _0x1b8025["type"] === "invite") && _0x1b8025["from"])) {
        _0x2a4cbc(_0x1b8025);
      }
    }
  
    _0xd3167d["classList"]["add"]("message");
  
    if (_0x1b8025["nick"] == "!") {
      _0xd3167d["classList"]["add"]("warn");
    } else {
      if (_0x1b8025["nick"] == "*") {
        _0xd3167d["classList"]["add"]("info");
      } else {
        if (_0x1b8025["admin"]) {
          _0xd3167d["classList"]["add"]("admin");
        } else {
          if (_0x1b8025["mod"]) {
            _0xd3167d["classList"]["add"]("mod");
          } else {
            if (_0x1b8025["tag"] == "old") {
              _0xd3167d["classList"]["add"]("me");
            }
          }
        }
      }
    }
  
    var _0x5b50eb = document["createElement"]("span");
  
    _0x5b50eb["classList"]["add"]("nick");
  
    _0xd3167d["appendChild"](_0x5b50eb);
  
    if (_0x1b8025["trip"]) {
      var _0x31deca = document["createElement"]("span");
  
      if (_0x1b8025["mod"] || _0x1b8025["admin"]) {
        _0x31deca["textContent"] = String["fromCodePoint"](11088) + " " + _0x1b8025["trip"] + " ";
      } else {
        _0x31deca["textContent"] = _0x1b8025["trip"] + " ";
      }
  
      _0x31deca["classList"]["add"]("trip");
  
      _0x5b50eb["appendChild"](_0x31deca);
    }
  
    if (_0x1b8025["nick"]) {
      var _0x3e5b94 = document["createElement"]("a");
  
      _0x3e5b94["textContent"] = _0x1b8025["nick"];
  
      var _0x25fd9d = document["createElement"]("img");
  
      _0x25fd9d["src"] = _0xe9bcc6;
      _0x25fd9d["style"]["height"] = "25px";
      _0x25fd9d["style"]["width"] = "25px";
      _0x25fd9d["style"]["marginRight"] = "0.5rem";
      _0x25fd9d["style"]["verticalAlign"] = "top";
      _0x25fd9d["style"]["borderRadius"] = "50%";
  
      _0x3e5b94["onclick"] = function () {
        if (_0x1b8025["type"] == "whisper" || _0x1b8025["nick"] == "*" || _0x1b8025["nick"] == "!") {
          _0x40c1f7(_0x1b8025["text"]);
  
          _0x577245("#chat-input")["focus"]();
  
          return;
        } else {
          var _0x177ae2 = _0x1b8025["nick"];
  
          if (_0x1b8025["nick"]["startsWith"]("HC_")) {
            _0x177ae2 = _0x177ae2["replace"]("HC_", "");
          }
  
          _0x40c1f7("@" + _0x177ae2 + " ");
  
          _0x577245("#chatinput")["focus"]();
  
          return;
        }
      };
  
      _0x3e5b94["oncontextmenu"] = function (_0x5e8b84) {
        _0x5e8b84["preventDefault"]();
  
        var _0x4fb325 = "";
        var _0x4218fc = _0x1b8025["text"];
        var _0x520b4d = false;
  
        if (_0x4218fc["length"] > 350) {
          _0x4fb325 = _0x4218fc["slice"](0, 350);
          _0x520b4d = true;
        }
  
        if (_0x1b8025["trip"]) {
          _0x4fb325 = ">" + _0x1b8025["trip"] + " " + _0x1b8025["nick"] + "：\n";
        } else {
          _0x4fb325 = ">" + _0x1b8025["nick"] + "：\n";
        }
  
        _0x4218fc = _0x4218fc["split"]("\n");
  
        if (_0x4218fc["length"] >= 8) {
          _0x4218fc = _0x4218fc["slice"](0, 8);
          _0x520b4d = true;
        }
  
        for (var _0x55f60e of _0x4218fc) {
          if (!_0x55f60e["startsWith"](">>")) {
            _0x4fb325 += ">" + _0x55f60e + "\n";
          }
        }
  
        if (_0x520b4d) {
          _0x4fb325 += ">……\n";
        }
  
        _0x4fb325 += "\n";
  
        if (_0x1b8025["nick"] != _0x2b4a6f) {
          var _0x298091 = _0x1b8025["nick"];
  
          if (_0x1b8025["nick"]["startsWith"]("HC_")) {
            _0x298091 = _0x298091["replace"]("HC_", "");
          }
  
          _0x4fb325 += "@" + _0x298091 + " ";
        }
  
        _0x4fb325 += _0x577245("#chatinput")["value"];
        _0x577245("#chatinput")["value"] = "";
  
        _0x40c1f7(_0x4fb325);
  
        _0x577245("#chatinput")["focus"]();
      };
  
      var _0x59ba83 = new Date(_0x1b8025["time"] || Date["now"]());
  
      _0x3e5b94["title"] = _0x59ba83["toLocaleString"]();
  
      if (!(_0x1b8025["nick"] == "*" || _0x1b8025["nick"] == "!")) {
        if (_0x145060) {
          _0x5b50eb["appendChild"](_0x25fd9d);
        }
      }
  
      _0x5b50eb["appendChild"](_0x3e5b94);
    }
  
    if (_0x1b8025["color"] && /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i["test"](_0x1b8025["color"])) {
      _0x3e5b94["setAttribute"]("style", "color:#" + _0x1b8025["color"] + " !important");
    }
  
    var _0x56b048 = document["createElement"]("p");
  
    _0x56b048["classList"]["add"]("text");
  
    if (!_0x1b8025["tag"]) {
      var _0x84f3a7 = "";
  
      if (_0x1b8025["text"]["indexOf"]("USERSENDVOICE_") >= 0 && _0x160750) {
        _0x84f3a7 = "<audio controls><source src=\"https://xq.kzw.ink/oss/" + _0x1b8025["text"]["replace"]("USERSENDVOICE_", "")["replace"]("static/", "") + "\" type=\"audio/mpeg\"></audio>";
      } else {
        _0x84f3a7 = _0x5605c1["render"](_0x1b8025["text"]);
      }
  
      _0x56b048["innerHTML"] = _0x84f3a7;
    } else {
      var _0x84f3a7 = "";
  
      _0x1b8025["text"]["forEach"](_0x6a0e5a => {
        var _0x4ad62c = _0x5605c1["render"](_0x6a0e5a["content"]);
  
        if (_0x6a0e5a["head"]) {
          head_pic = _0x6a0e5a["head"];
        } else {
          head_pic = _0x949483;
        }
  
        console["log"]($(_0x4ad62c)["text"]());
  
        if (_0x4ad62c["indexOf"]("USERSENDVOICE_") >= 0 && _0x160750) {
          var _0x71c8c8 = $(_0x4ad62c)["text"]();
  
          if (_0x145060) {
            _0x84f3a7 = "<div class=\"message\"><span class=\"nick\"><span class=\"trip\">" + _0x6a0e5a["trip"] + " </span><img src=\"" + head_pic + "\" style=\"height: 25px; width: 25px; margin-right: 0.5rem; vertical-align: top; border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%;\"><a title=\"" + _0x6a0e5a["time"] + "\">" + _0x6a0e5a["nick"] + "</a></span><p class=\"text\"><p style=\"margin-left: 2rem;\"><audio controls><source src=\"https://xq.kzw.ink/oss/" + _0x71c8c8["replace"]("USERSENDVOICE_", "")["replace"]("static/", "") + "\" type=\"audio/mpeg\"></audio></p></p></div>" + _0x84f3a7;
          } else {
            _0x84f3a7 = "<div class=\"message\"><span class=\"nick\"><span class=\"trip\">" + _0x6a0e5a["trip"] + " </span><a title=\"" + _0x6a0e5a["time"] + "\">" + _0x6a0e5a["nick"] + "</a></span><p class=\"text\"><p><audio controls><source src=\"https://xq.kzw.ink/oss/" + _0x71c8c8["replace"]("USERSENDVOICE_", "")["replace"]("static/", "") + "\" type=\"audio/mpeg\"></audio></p></p></div>" + _0x84f3a7;
          }
        } else {
          if (_0x145060) {
            _0x84f3a7 = "<div class=\"message\"><span class=\"nick\"><span class=\"trip\">" + _0x6a0e5a["trip"] + " </span><img src=\"" + head_pic + "\" style=\"height: 25px; width: 25px; margin-right: 0.5rem; vertical-align: top; border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%;\"><a title=\"" + _0x6a0e5a["time"] + "\">" + _0x6a0e5a["nick"] + "</a></span><p class=\"text\"><p style=\"margin-left: 2rem;\">" + _0x4ad62c + "</p></p></div>" + _0x84f3a7;
          } else {
            _0x84f3a7 = "<div class=\"message\"><span class=\"nick\"><span class=\"trip\">" + _0x6a0e5a["trip"] + " </span><a title=\"" + _0x6a0e5a["time"] + "\">" + _0x6a0e5a["nick"] + "</a></span><p class=\"text\"><p>" + _0x4ad62c + "</p></p></div>" + _0x84f3a7;
          }
        }
      });
  
      _0x56b048["innerHTML"] = _0x84f3a7;
    }
  
    _0xd3167d["appendChild"](_0x56b048);
  
    var _0x46150a = _0xec6d73();
  
    _0x577245("#messages")["appendChild"](_0xd3167d);
  
    if (_0x46150a) {
      window["scrollTo"](0, document["body"]["scrollHeight"]);
    }
  
    _0x149942 += 1;
  
    _0x3f099b();
  }
  
  function _0x3da35a(_0x34b1cd) {
    var _0x46c57b = document["createElement"]("div");
  
    _0x46c57b["classList"]["add"]("message");
  
    if (_0x4f8873(_0x2b4a6f) && _0x34b1cd["nick"] == _0x2b4a6f) {
      _0x46c57b["classList"]["add"]("me");
    } else {
      if (_0x34b1cd["nick"] == "!") {
        _0x46c57b["classList"]["add"]("warn");
      } else {
        if (_0x34b1cd["nick"] == "*") {
          _0x46c57b["classList"]["add"]("info");
        } else {
          if (_0x34b1cd["admin"]) {
            _0x46c57b["classList"]["add"]("admin");
          } else {
            if (_0x34b1cd["mod"]) {
              _0x46c57b["classList"]["add"]("mod");
            }
          }
        }
      }
    }
  
    var _0x2206cf = document["createElement"]("span");
  
    _0x2206cf["classList"]["add"]("nick");
  
    _0x46c57b["appendChild"](_0x2206cf);
  
    if (_0x34b1cd["trip"]) {
      var _0x3e6c05 = document["createElement"]("span");
  
      if (_0x34b1cd["mod"] || _0x34b1cd["admin"]) {
        _0x3e6c05["textContent"] = String["fromCodePoint"](11088) + " " + _0x34b1cd["trip"] + " ";
      } else {
        _0x3e6c05["textContent"] = _0x34b1cd["trip"] + " ";
      }
  
      _0x3e6c05["classList"]["add"]("trip");
  
      _0x2206cf["appendChild"](_0x3e6c05);
    }
  
    if (_0x34b1cd["nick"]) {
      var _0x44a95b = document["createElement"]("a");
  
      _0x44a95b["textContent"] = _0x34b1cd["nick"];
  
      var _0x3552ac = new Date(_0x34b1cd["time"] || Date["now"]());
  
      _0x44a95b["title"] = _0x3552ac["toLocaleString"]();
  
      _0x2206cf["appendChild"](_0x44a95b);
    }
  
    var _0x47e22b = document["createElement"]("div");
  
    _0x47e22b["classList"]["add"]("text");
  
    _0x47e22b["innerHTML"] = _0x34b1cd["text"];
  
    _0x46c57b["appendChild"](_0x47e22b);
  
    var _0x2efc31 = _0xec6d73();
  
    _0x577245("#messages")["appendChild"](_0x46c57b);
  
    if (_0x2efc31) {
      window["scrollTo"](0, document["body"]["scrollHeight"]);
    }
  
    _0x3f099b();
  }
  
  function _0x40c1f7(_0x46f095) {
    var _0x63c656 = _0x577245("#chatinput");
  
    var _0x493fd3 = _0x63c656["selectionStart"] || 0;
  
    var _0x552304 = _0x63c656["value"]["substr"](0, _0x493fd3);
  
    var _0x5427e9 = _0x63c656["value"]["substr"](_0x493fd3);
  
    _0x552304 += _0x46f095;
    _0x63c656["value"] = _0x552304 + _0x5427e9;
    _0x63c656["selectionStart"] = _0x63c656["selectionEnd"] = _0x552304["length"];
  
    _0x550a53();
  }
  
  function _0x1c3851(_0x2c55b1) {
    if (_0x94d9da && _0x94d9da["readyState"] == _0x94d9da["OPEN"]) {
      console["log"](_0x2c55b1);
  
      if (_0x5f155f) {
        _0x2c55b1["show"] = 1;
      } else {
        _0x2c55b1["show"] = 0;
      }
  
      if (_0xbf9a54("head")) {
        _0x2c55b1["head"] = _0xbf9a54("head");
      } else {
        _0x2c55b1["head"] = _0x949483;
      }
  
      if (_0xbf9a54("killed") != 1) {
        if (_0x5edf33) {
          if (_0x2c55b1["text"]) {
            if (_0x2c55b1["text"]["startsWith"]("/")) {
              _0x2c55b1["text"] = _0x2c55b1["text"]["substr"](1);
  
              var [_0x374178, _0xf4f138] = _0x2c55b1["text"]["split"](" ");
  
              if (_0x374178 == "video") {
                console["log"](_0xf4f138);
                var _0x3af6dd = {
                  "cmd": "set_video",
                  "url": _0xf4f138
                };
  
                _0x94d9da["send"](JSON["stringify"](_0x3af6dd));
  
                return false;
              }
  
              _0x2c55b1["text"] = "/" + _0x2c55b1["text"];
            }
          }
  
          if (_0x313bab) {
            if (_0x5a7c28 && _0x1a59d9 && _0x1a59d9["readyState"] == _0x1a59d9["OPEN"] && _0x2c55b1["text"]["startsWith"]("hc-")) {
              _0x2c55b1["text"] = _0x2c55b1["text"]["replace"]("hc-", "");
  
              if (!_0x2c55b1["text"]["startsWith"]("/") || _0x2c55b1["text"]["startsWith"]("/w") || _0x2c55b1["text"]["startsWith"]("/r")) {
                _0x1a59d9["send"](JSON["stringify"](_0x2c55b1));
              }
            }
          }
  
          _0x94d9da["send"](JSON["stringify"](_0x2c55b1));
        } else {
          _0x4721a7({
            "nick": "*",
            "text": "当前昵称已被预留，请更换昵称"
          });
        }
      } else {
        alert("你已被管理员封杀，无法执行此操作。");
      }
    }
  }
  
  var _0x49a817 = true;
  var _0x149942 = 0;
  
  window["onfocus"] = function () {
    _0x49a817 = true;
  
    _0x3f099b();
  };
  
  window["onblur"] = function () {
    _0x49a817 = false;
  };
  
  window["onscroll"] = function () {
    if (_0xec6d73()) {
      _0x3f099b();
    }
  };
  
  setInterval(function () {
    _0x4e3601();
  }, 4000);
  
  function _0xec6d73() {
    return window["innerHeight"] + window["scrollY"] >= document["body"]["scrollHeight"] - 1;
  }
  
  function _0x3f099b() {
    if (_0x49a817 && _0xec6d73()) {
      _0x149942 = 0;
    }
  
    var _0x577888;
  
    if (_0x38c452) {
      _0x577888 = "?" + _0x38c452;
    } else {
      _0x577888 = "XChat";
    }
  
    if (_0x149942 > 0) {
      _0x577888 = "(" + _0x149942 + ") " + _0x577888;
    }
  
    document["title"] = _0x577888;
  }
  
  _0x577245("#footer")["onclick"] = function () {
    _0x577245("#chatinput")["focus"]();
  };
  
  _0x577245("#chatinput")["onkeydown"] = function (_0x2b79f8) {
    if (_0x2b79f8["keyCode"] == 13 && !_0x2b79f8["shiftKey"]) {
      _0x2b79f8["preventDefault"]();
  
      if (_0x2b79f8["target"]["value"] != "") {
        var _0xf71113 = _0x2b79f8["target"]["value"];
        _0x2b79f8["target"]["value"] = "";
  
        _0x1c3851({
          "cmd": "chat",
          "text": _0xf71113
        });
  
        _0x5adc5d[0] = _0xf71113;
  
        _0x5adc5d["unshift"]("");
  
        _0x2e7ab9 = 0;
  
        _0x550a53();
      }
    } else {
      if (_0x2b79f8["keyCode"] == 38) {
        if (_0x2b79f8["target"]["selectionStart"] === 0 && _0x2e7ab9 < _0x5adc5d["length"] - 1) {
          _0x2b79f8["preventDefault"]();
  
          if (_0x2e7ab9 == 0) {
            _0x5adc5d[0] = _0x2b79f8["target"]["value"];
          }
  
          _0x2e7ab9 += 1;
          _0x2b79f8["target"]["value"] = _0x5adc5d[_0x2e7ab9];
          _0x2b79f8["target"]["selectionStart"] = _0x2b79f8["target"]["selectionEnd"] = _0x2b79f8["target"]["value"]["length"];
  
          _0x550a53();
        }
      } else {
        if (_0x2b79f8["keyCode"] == 40) {
          if (_0x2b79f8["target"]["selectionStart"] === _0x2b79f8["target"]["value"]["length"] && _0x2e7ab9 > 0) {
            _0x2b79f8["preventDefault"]();
  
            _0x2e7ab9 -= 1;
            _0x2b79f8["target"]["value"] = _0x5adc5d[_0x2e7ab9];
            _0x2b79f8["target"]["selectionStart"] = _0x2b79f8["target"]["selectionEnd"] = 0;
  
            _0x550a53();
          }
        } else {
          if (_0x2b79f8["keyCode"] == 27) {
            _0x2b79f8["preventDefault"]();
  
            _0x2b79f8["target"]["value"] = "";
            _0x2e7ab9 = 0;
            _0x5adc5d[_0x2e7ab9] = "";
  
            _0x550a53();
          } else {
            if (_0x2b79f8["keyCode"] == 9) {
              if (_0x2b79f8["ctrlKey"]) {
                return;
              }
  
              _0x2b79f8["preventDefault"]();
  
              var _0x59cf31 = _0x2b79f8["target"]["selectionStart"] || 0;
  
              var _0xf71113 = _0x2b79f8["target"]["value"];
  
              var _0x5a6964 = _0xf71113["lastIndexOf"]("@", _0x59cf31);
  
              var _0x58c095 = false;
  
              if (_0x5a6964 >= 0) {
                var _0x3bffeb = _0xf71113["substring"](_0x5a6964 + 1, _0x59cf31)["toLowerCase"]();
  
                var _0x11334e = _0x4f9c27["filter"](function (_0x3b4b98) {
                  return _0x3b4b98["toLowerCase"]()["indexOf"](_0x3bffeb) == 0;
                });
  
                if (_0x11334e["length"] > 0) {
                  _0x58c095 = true;
  
                  if (_0x11334e["length"] == 1) {
                    _0x40c1f7(_0x11334e[0]["substr"](_0x3bffeb["length"]) + " ");
                  }
                }
              }
  
              if (!_0x58c095) {
                _0x40c1f7("\t");
              }
            }
          }
        }
      }
    }
  };
  
  function _0x550a53() {
    var _0x2eb3de = _0xec6d73();
  
    var _0x2b3335 = _0x577245("#chatinput");
  
    _0x2b3335["style"]["height"] = 0;
    _0x2b3335["style"]["height"] = _0x2b3335["scrollHeight"] + "px";
    document["body"]["style"]["marginBottom"] = _0x577245("#footer")["offsetHeight"] + "px";
  
    if (_0x2eb3de) {
      window["scrollTo"](0, document["body"]["scrollHeight"]);
    }
  }
  
  _0x577245("#chatinput")["oninput"] = function () {
    _0x550a53();
  };
  
  _0x550a53();
  
  _0x577245("#sidebar")["onmouseenter"] = _0x577245("#sidebar")["ontouchstart"] = function (_0x2023d2) {
    _0x577245("#sidebar-content")["classList"]["remove"]("hidden");
  
    _0x577245("#sidebar")["classList"]["add"]("expand");
  
    _0x2023d2["stopPropagation"]();
  };
  
  _0x577245("#sidebar")["onmouseleave"] = document["ontouchstart"] = function (_0x54262e) {
    var _0x2273f5 = _0x54262e["toElement"] || _0x54262e["relatedTarget"];
  
    try {
      if (_0x2273f5["parentNode"] == this || _0x2273f5 == this) {
        return;
      }
    } catch (_0x33e066) {
      return;
    }
  
    if (!_0x577245("#pin-sidebar")["checked"]) {
      _0x577245("#sidebar-content")["classList"]["add"]("hidden");
  
      _0x577245("#sidebar")["classList"]["remove"]("expand");
    }
  };
  
  _0x577245("#clear-messages")["onclick"] = function () {
    var _0x39fca8 = _0x577245("#messages");
  
    _0x39fca8["innerHTML"] = "";
  };
  
  _0x577245("#set-bgimage")["onclick"] = function () {
    if (_0xbf9a54("bgurl") != null) {
      var _0x1dfb92 = prompt("背景图片地址:", _0xbf9a54("bgurl"));
    } else {
      var _0x1dfb92 = prompt("背景图片地址:");
    }
  
    if (_0x1dfb92 == "") {
      alert("地址不能为空");
    } else {
      if (_0x1dfb92) {
        if (_0x577245(".bg-img")) {
          _0x577245("#body")["removeChild"](_0x577245(".bg-img"));
        }
  
        _0x577245("#scheme-link")["href"] = "schemes/clear.css";
        console["log"](_0x577245("#body")["style"]);
  
        var _0x5cb7b6 = document["createElement"]("div");
  
        console["log"](_0x5cb7b6);
        _0x5cb7b6["className"] = "bg-img";
        _0x5cb7b6["style"]["backgroundImage"] = "url(" + _0x1dfb92["replace"]("\"") + ")";
  
        _0x577245("#body")["appendChild"](_0x5cb7b6);
  
        var _0x149850 = document["querySelector"]("#scheme-selector");
  
        _0x149850["selectedIndex"] = 34;
  
        _0x2a607d("bgurl", _0x1dfb92);
      }
    }
  };
  
  _0x577245("#set-head")["onclick"] = function () {
    if (_0xbf9a54("head") != null) {
      var _0x5ed0b9 = prompt("头像地址:", _0xbf9a54("head"));
    } else {
      var _0x5ed0b9 = prompt("头像地址:");
    }
  
    if (_0x5ed0b9 == "") {
      alert("地址不能为空");
      _0xe9bcc6 = _0x949483;
  
      _0x2a607d("head", "");
    } else {
      if (_0x5ed0b9) {
        _0xe9bcc6 = _0x5ed0b9;
  
        _0x2a607d("head", _0xe9bcc6);
      }
    }
  };
  
  _0x577245("#clear-nick")["onclick"] = function () {
    _0x2a607d("my-nick", "");
  
    _0x2a607d("auto-login", "false");
  
    _0x2a607d("cookie", "");
  
    _0x4721a7({
      "cmd": "chat",
      "nick": "*",
      "text": "已清除您的登录信息！",
      "time": null
    });
  };
  
  _0x577245("#lay-video")["onclick"] = function () {
    _0x94d9da["send"](JSON["stringify"](_0x4bfd06));
  };
  
  if (_0xbf9a54("pin-sidebar") == "true") {
    _0x577245("#pin-sidebar")["checked"] = true;
  
    _0x577245("#sidebar-content")["classList"]["remove"]("hidden");
  }
  
  if (_0xbf9a54("joined-left") == "false") {
    _0x577245("#joined-left")["checked"] = false;
  }
  
  if (_0xbf9a54("parse-latex") == "false") {
    _0x577245("#parse-latex")["checked"] = false;
  
    _0x5605c1["inline"]["ruler"]["disable"](["katex"]);
  
    _0x5605c1["block"]["ruler"]["disable"](["katex"]);
  }
  
  _0x577245("#pin-sidebar")["onchange"] = function (_0x31a557) {
    _0x2a607d("pin-sidebar", !!_0x31a557["target"]["checked"]);
  };
  
  _0x577245("#joined-left")["onchange"] = function (_0x4192dc) {
    _0x2a607d("joined-left", !!_0x4192dc["target"]["checked"]);
  };
  
  _0x577245("#parse-latex")["onchange"] = function (_0x3dddfb) {
    if (!_0x1b5d45) {
      var _0x334f19 = !!_0x3dddfb["target"]["checked"];
  
      _0x2a607d("parse-latex", _0x334f19);
  
      if (_0x334f19) {
        _0x5605c1["inline"]["ruler"]["enable"](["katex"]);
  
        _0x5605c1["block"]["ruler"]["enable"](["katex"]);
      } else {
        _0x5605c1["inline"]["ruler"]["disable"](["katex"]);
  
        _0x5605c1["block"]["ruler"]["disable"](["katex"]);
      }
    }
  };
  
  if (_0xbf9a54("syntax-highlight") == "false") {
    _0x577245("#syntax-highlight")["checked"] = false;
    _0x2efb9a["doHighlight"] = false;
  }
  
  _0x577245("#syntax-highlight")["onchange"] = function (_0x217119) {
    var _0x51a48e = !!_0x217119["target"]["checked"];
  
    _0x2a607d("syntax-highlight", _0x51a48e);
  
    _0x2efb9a["doHighlight"] = _0x51a48e;
  };
  
  if (_0xbf9a54("allow-imgur") == "false") {
    _0x577245("#allow-imgur")["checked"] = false;
    _0x4aa538 = false;
  }
  
  _0x577245("#allow-imgur")["onchange"] = function (_0x5e1faa) {
    if (!_0x1b5d45) {
      var _0x128e1e = !!_0x5e1faa["target"]["checked"];
  
      _0x2a607d("allow-imgur", _0x128e1e);
  
      _0x4aa538 = _0x128e1e;
    }
  };
  
  if (_0xbf9a54("allow-old") == "false") {
    _0x577245("#allow-old")["checked"] = false;
    _0x1cc560 = false;
  }
  
  _0x577245("#allow-old")["onchange"] = function (_0x2fe29e) {
    var _0x5a13b9 = !!_0x2fe29e["target"]["checked"];
  
    _0x2a607d("allow-old", _0x5a13b9);
  
    _0x1cc560 = _0x5a13b9;
  };
  
  if (_0xbf9a54("add-old") == "false") {
    _0x577245("#add-old")["checked"] = false;
    _0x5f155f = false;
  }
  
  _0x577245("#add-old")["onchange"] = function (_0x139dd4) {
    var _0x43dd39 = !!_0x139dd4["target"]["checked"];
  
    _0x2a607d("add-old", _0x43dd39);
  
    _0x5f155f = _0x43dd39;
  };
  
  if (_0xbf9a54("show-head") == "false") {
    _0x577245("#show-head")["checked"] = false;
    _0x145060 = false;
  }
  
  _0x577245("#show-head")["onchange"] = function (_0x23ee97) {
    var _0x40387d = !!_0x23ee97["target"]["checked"];
  
    _0x2a607d("show-head", _0x40387d);
  
    _0x145060 = _0x40387d;
  };
  
  if (_0xbf9a54("auto-login") == "true") {
    _0x577245("#auto-login")["checked"] = true;
    _0x4fe939 = true;
  }
  
  _0x577245("#auto-login")["onchange"] = function (_0x5a745e) {
    var _0x59ad59 = !!_0x5a745e["target"]["checked"];
  
    _0x2a607d("auto-login", _0x59ad59);
  
    _0x4fe939 = _0x59ad59;
  };
  
  if (_0xbf9a54("show-voice-btn") == "false") {
    _0x577245("#show-voice-btn")["checked"] = false;
    _0xcc8fe = false;
    $("#voice")["hide"]();
  }
  
  _0x577245("#show-voice-btn")["onchange"] = function (_0x50df4f) {
    var _0x126bac = !!_0x50df4f["target"]["checked"];
  
    _0x2a607d("show-voice-btn", _0x126bac);
  
    _0xcc8fe = _0x126bac;
  
    if (_0xcc8fe) {
      $("#voice")["show"]();
    } else {
      $("#voice")["hide"]();
    }
  };
  
  if (_0xbf9a54("show-voice-msg") == "false") {
    _0x577245("#show-voice-msg")["checked"] = false;
    _0x160750 = false;
  }
  
  _0x577245("#show-voice-msg")["onchange"] = function (_0x49b9be) {
    var _0x517d3a = !!_0x49b9be["target"]["checked"];
  
    _0x2a607d("show-voice-msg", _0x517d3a);
  
    _0x160750 = _0x517d3a;
  };
  
  if (_0xbf9a54("ws-hc") == "true") {
    _0x577245("#ws-hc")["checked"] = true;
    _0x5a7c28 = true;
  }
  
  _0x577245("#ws-hc")["onchange"] = function (_0x14aa9d) {
    var _0x1be39a = !!_0x14aa9d["target"]["checked"];
  
    _0x2a607d("ws-hc", _0x1be39a);
  
    _0x5a7c28 = _0x1be39a;
  };
  
  var _0x4f9c27 = [];
  var _0xf3302b = [];
  
  function _0x282eb2(_0x374657) {
    var _0x2beefd = document["createElement"]("a");
  
    _0x2beefd["textContent"] = _0x374657;
  
    _0x2beefd["onclick"] = function (_0x20a6c1) {
      _0x43cf4b(_0x374657);
    };
  
    var _0x1eab11 = document["createElement"]("li");
  
    _0x1eab11["appendChild"](_0x2beefd);
  
    _0x577245("#users")["appendChild"](_0x1eab11);
  
    _0x4f9c27["push"](_0x374657);
  }
  
  function _0x4e3c08(_0x5cb985) {
    var _0x265639 = _0x577245("#users");
  
    var _0x506920 = _0x265639["children"];
  
    for (var _0x2b9e83 = 0; _0x2b9e83 < _0x506920["length"]; _0x2b9e83++) {
      var _0xc6030a = _0x506920[_0x2b9e83];
  
      if (_0xc6030a["textContent"] == _0x5cb985) {
        _0x265639["removeChild"](_0xc6030a);
      }
    }
  
    var _0x275791 = _0x4f9c27["indexOf"](_0x5cb985);
  
    if (_0x275791 >= 0) {
      _0x4f9c27["splice"](_0x275791, 1);
    }
  }
  
  function _0xa09642() {
    var _0x509ba1 = _0x577245("#users");
  
    while (_0x509ba1["firstChild"]) {
      _0x509ba1["removeChild"](_0x509ba1["firstChild"]);
    }
  
    _0x4f9c27["length"] = 0;
  }
  
  function _0x43cf4b(_0x121eb5) {
    _0x1c3851({
      "cmd": "invite",
      "nick": _0x121eb5
    });
  }
  
  function _0x213ba9(_0x528077) {
    _0xf3302b["push"](_0x528077);
  }
  
  var _0x217444;
  
  function _0x435d8e() {
    _0x217444 = Recorder();
  
    _0x217444["open"](function () {
      _0x217444["start"]();
  
      $("#voice")["text"]("结束录音");
    }, function (_0x7f2b5, _0x28dd73) {
      alert((_0x28dd73 ? "用户拒绝了权限，" : "") + "无法录音:" + _0x7f2b5);
    });
  }
  
  function _0x3e49fc() {
    _0x217444["stop"](function (_0x13e48b, _0x1d605b) {
      $("#voice")["text"]("发送语音");
  
      var _0x25bf01 = new FormData();
  
      _0x25bf01["append"]("upfile", _0x13e48b, "voice.mp3");
  
      var _0x1e5ea6 = new XMLHttpRequest();
  
      _0x1e5ea6["open"]("POST", "https://xq.kzw.ink/voice", Headers = _0x401395);
  
      _0x1e5ea6["onreadystatechange"] = function () {
        console["log"](_0x1e5ea6);
  
        if (_0x1e5ea6["readyState"] == 4) {
          var _0x56add2 = JSON["parse"](_0x1e5ea6["responseText"]);
  
          _0x1c3851({
            "cmd": "chat",
            "text": "USERSENDVOICE_" + _0x56add2["src"]
          });
        }
      };
  
      _0x1e5ea6["send"](_0x25bf01);
    }, function (_0x45a3dd) {
      alert("录音失败:" + _0x45a3dd);
    });
  }
  
  var _0x188b73;
  
  $("#voice")["click"](function () {
    if ($(this)["text"]() == "发送语音") {
      _0x435d8e();
  
      _0x50f49d();
    } else {
      clearInterval(_0x188b73);
  
      _0x3e49fc();
    }
  });
  
  function _0x50f49d() {
    var _0x2c363f = 60;
    _0x188b73 = setInterval(() => {
      _0x2c363f = _0x2c363f - 1;
      $("#voice")["text"]("结束录音（" + _0x2c363f + "秒）");
  
      if (_0x2c363f == 0) {
        clearInterval(_0x188b73);
  
        _0x3e49fc();
      }
    }, 1000);
  }
  
  async function _0x8dc7f5() {
    let _0x45bd13 = {};
    var _0x1aa706 = {
      "excludes": _0x45bd13
    };
    await Fingerprint2["getPromise"]({})["then"](_0x251137 => {
      var _0x454587 = _0x251137["map"](function (_0x23029b) {
        return _0x23029b["value"];
      });
  
      _0x4f6ea3 = Fingerprint2["x64hash128"](_0x454587[19]["join"](""), 31);
    });
  }
  
  var _0x4f4d2d = ["android", "android-white", "atelier-dune", "atelier-forest", "atelier-heath", "atelier-lakeside", "atelier-seaside", "banana", "bright", "bubblegum", "chalk", "default", "eighties", "fresh-green", "greenscreen", "hacker", "maniac", "mariana", "military", "mocha", "monokai", "nese", "ocean", "omega", "pop", "railscasts", "solarized", "tk-night", "tomorrow", "carrot", "lax", "Ubuntu", "gruvbox-light", "fried-egg", "background-img"];
  var _0x6d918a = ["agate", "androidstudio", "atom-one-dark", "darcula", "github", "rainbow", "tk-night", "tomorrow", "xcode", "zenburn"];
  var _0x9db73d = "atelier-dune";
  var _0x27cb07 = "darcula";
  
  function _0x10a413(_0x5be701) {
    _0x9db73d = _0x5be701;
    _0x577245("#scheme-link")["href"] = "schemes/" + _0x5be701 + ".css";
  
    _0x2a607d("scheme", _0x5be701);
  }
  
  function _0x546ee7(_0x35e7ca) {
    _0x27cb07 = _0x35e7ca;
    _0x577245("#highlight-link")["href"] = "vendor/hljs/styles/" + _0x35e7ca + ".min.css";
  
    _0x2a607d("highlight", _0x35e7ca);
  }
  
  _0x4f4d2d["forEach"](function (_0x22ebff) {
    var _0x305232 = document["createElement"]("option");
  
    _0x305232["textContent"] = _0x22ebff;
    _0x305232["value"] = _0x22ebff;
  
    if (_0x305232["value"] == "background-img") {
      _0x305232["disabled"] = true;
    }
  
    _0x577245("#scheme-selector")["appendChild"](_0x305232);
  });
  
  _0x6d918a["forEach"](function (_0x4c424a) {
    var _0x207735 = document["createElement"]("option");
  
    _0x207735["textContent"] = _0x4c424a;
    _0x207735["value"] = _0x4c424a;
  
    _0x577245("#highlight-selector")["appendChild"](_0x207735);
  });
  
  _0x577245("#scheme-selector")["onchange"] = function (_0x176913) {
    _0x10a413(_0x176913["target"]["value"]);
  };
  
  _0x577245("#highlight-selector")["onchange"] = function (_0x1bc190) {
    _0x546ee7(_0x1bc190["target"]["value"]);
  };
  
  if (_0xbf9a54("scheme")) {
    _0x10a413(_0xbf9a54("scheme"));
  }
  
  if (_0xbf9a54("highlight")) {
    _0x546ee7(_0xbf9a54("highlight"));
  }
  
  _0x577245("#scheme-selector")["value"] = _0x9db73d;
  _0x577245("#highlight-selector")["value"] = _0x27cb07;
  
  if (_0x38c452 == "") {
    var _0x383486 = {
      "text": _0x291e6b
    };
  
    _0x4721a7(_0x383486);
  
    _0x577245("#footer")["classList"]["add"]("hidden");
  
    _0x577245("#sidebar")["classList"]["add"]("hidden");
  } else {
    _0x29cdea(_0x38c452);
  }
  
  function _0x4e3601(_0x4aa36c) {
    function _0x5b55e9(_0x857f6d) {
      if (typeof _0x857f6d === "string") {
        return function (_0x959782) {}["constructor"]("while (true) {}")["apply"]("counter");
      } else {
        if (("" + _0x857f6d / _0x857f6d)["length"] !== 1 || _0x857f6d % 20 === 0) {
          (function () {
            return true;
          })["constructor"]("debugger")["call"]("action");
        } else {
          (function () {
            return false;
          })["constructor"]("debugger")["apply"]("stateObject");
        }
      }
  
      _0x5b55e9(++_0x857f6d);
    }
  
    try {
      if (_0x4aa36c) {
        return _0x5b55e9;
      } else {
        _0x5b55e9(0);
      }
    } catch (_0x4f01dc) {}
  }
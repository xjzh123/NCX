//todo: 测试exitafk时的页面反应

// initialize markdown engine
var markdownOptions = {
	html: false,
	xhtmlOut: false,
	breaks: true,
	langPrefix: '',
	linkify: true,
	linkTarget: '_blank" rel="noreferrer',
	typographer:  true,
	quotes: `""''`,

	doHighlight: true,
	highlight: function (str, lang) {
		if (!markdownOptions.doHighlight || !window.hljs) { return ''; }

		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (__) {}
		}

		try {
			return hljs.highlightAuto(str).value;
		} catch (__) {}

		return '';
	}
};

var md = new Remarkable('full', markdownOptions);

// image handler
var allowImages = true;
var allowHTML = false;
var allowSend = true;
var showHead = true;
var autoLogin = false;
var showVoiceBtn = true;
var showVoiceMsg = true;
var received_bye = false;
var onLineNum = 0;
var defaultHeadPic = 'https://xq.kzw.ink/imgs/tx.png'
var allowOld = true;
var addOld = true;
var connectHC = false;
var connectCC = false
var head = defaultHeadPic
var dp = null
var live = false
var imgHostWhitelist = [    //这些是由小张添加的
	'i.loli.net', 's2.loli.net',	//SM-MS图床
	's1.ax1x.com', 's2.ax1x.com', 'z3.ax1x.com', 's4.ax1x.com',		//路过图床
	'i.postimg.cc',		//postimages图床
	'mrpig.eu.org',		//慕容猪的图床
	'gimg2.baidu.com',	//百度
	'xq.kzw.ink'	//XChat
];
var murmur;

function getDomain(link) {
	var a = document.createElement('a');
	a.href = link;
	return a.hostname;
}

function isWhiteListed(link) {
	return imgHostWhitelist.indexOf(getDomain(link)) !== -1;
}

md.renderer.rules.image = function (tokens, idx, options) {
	var src = Remarkable.utils.escapeHtml(tokens[idx].src);

	if (isWhiteListed(src) && allowImages) {
		var imgSrc = ' src="' + Remarkable.utils.escapeHtml(tokens[idx].src) + '"';
		var title = tokens[idx].title ? (' title="' + Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(tokens[idx].title)) + '"') : '';
		var alt = ' alt="' + (tokens[idx].alt ? Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(Remarkable.utils.unescapeMd(tokens[idx].alt))) : '') + '"';
		var suffix = options.xhtmlOut ? ' /' : '';
		var scrollOnload = isAtBottom() ? ' onload="window.scrollTo(0, document.body.scrollHeight)"' : '';
		return '<a href="' + src + '" target="_blank" rel="noreferrer"><img' + scrollOnload + imgSrc + alt + title + suffix + '></a>';
	}

  return '<a href="' + src + '" target="_blank" rel="noreferrer">' + Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(src)) + '</a>';
};

md.renderer.rules.link_open = function (tokens, idx, options) {
	var title = tokens[idx].title ? (' title="' + Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(tokens[idx].title)) + '"') : '';
  var target = options.linkTarget ? (' target="' + options.linkTarget + '"') : '';
  return '<a rel="noreferrer" onclick="return verifyLink(this)" href="' + Remarkable.utils.escapeHtml(tokens[idx].href) + '"' + title + target + '>';
};

md.renderer.rules.text = function(tokens, idx) {
	tokens[idx].content = Remarkable.utils.escapeHtml(tokens[idx].content);

	if (tokens[idx].content.indexOf('?') !== -1) {
		tokens[idx].content = tokens[idx].content.replace(/(^|\s)(\?)\S+?(?=[,.!?:)]?\s|$)/gm, function(match) {
			var channelLink = Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(match.trim()));
			var whiteSpace = '';
			if (match[0] !== '?') {
				whiteSpace = match[0];
			}
			return whiteSpace + '<a href="' + channelLink + '" target="_blank">' + channelLink + '</a>';
		});
	}

  return tokens[idx].content;
};

md.use(remarkableKatex);

function verifyLink(link) {
	var linkHref = Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(link.href));
	if (linkHref !== link.innerHTML) {
		return confirm('警告，请确认这是你想去的地方:' + linkHref);
	}

	return true;
}

var verifyNickname = function (nick) {
	console.log(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,24}$/.test(nick))
	return /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,24}$/.test(nick);
	//return true
}

var homeText = "# XChat\n##### \n-----\n"+
"欢迎来到XChat，这是一个极简、小型的网页在线聊天工具，是HC的升级版\n"+
"共有聊天室：**[?xq102210](/?xq102210)** \n"+
"如果您单纯的想玩机器人，应避免在共有聊天室刷屏，您可以前往机器人聊天室：**[?bot](/?bot)** \n"+
"或者您可以访问这个为您准备的聊天室（只有您自己）：  ?" +Math.random().toString(36).substr(2, 8)+
"\n如果您还不了解这个聊天室，可以访问这个[由@ee编写的使用手册](https://paperee.tk/XChat.html)\n"+
"\n-----\n该项目是开源的，欢迎前往点Star，开源网址：https://gitee.com/XChatFish/xchat  \n"+
"XChat改编自hackchat开源项目，hackchat开源网址：https://github.com/hack-chat/  \n"+
"**如需商用、二次运营本开源项目，请注明本站！** \n-----\n"+
"鸣谢用户：\n   [@ee](https://paperee.tk), [@Mr_Zhang](https://mrzhang365.github.io/)\n感谢以上用户对本站精神和技术的支持 \n **免责声明：上述用户任何行动、言论与线圈无关且不代表XQTeam立场。** \n-----\n"+
"友情链接：\n [简化XChat bot开发的python库(强烈推荐)](https://github.com/MrZhang365/XChat-Lib-for-Python) \n [由XChat代理，支持联机的JSPVZ](http://xq.kzw.ink:5901)  \n-----\n"+
"2022 XQ Team.";

function $$(query) {
	return document.querySelector(query);
}

function localStorageGet(key) {
	try {
		return window.localStorage[key]
	} catch (e) { }
}

function localStorageSet(key, val) {
	try {
		window.localStorage[key] = val
	} catch (e) { }
}

var ws;
var wsHC;
var wsCC;
var myNick = localStorageGet('my-nick') || '';
var myChannel = window.location.search.replace(/^\?/, '');
var lastSent = [""];
var lastSentPos = 0;
var video_url = null
var userInfo = null
var cap_img = null
var pass = false

/** Notification switch and local storage behavior **/
var notifySwitch = document.getElementById("notify-switch")
var notifySetting = localStorageGet("notify-api")
var notifyPermissionExplained = 0; // 1 = granted msg shown, -1 = denied message shown



// Inital request for notifications permission
function RequestNotifyPermission() {
	try {
		var notifyPromise = Notification.requestPermission();
		if (notifyPromise) {
			notifyPromise.then(function (result) {
				console.log("XChat notification permission: " + result);
				if (result === "granted") {
					if (notifyPermissionExplained === 0) {
						pushMessage({
							cmd: "chat",
							nick: "*",
							text: "通知权限授予",
							time: null
						});
						notifyPermissionExplained = 1;
					}
					return false;
				} else {
					if (notifyPermissionExplained === 0) {
						pushMessage({
							cmd: "chat",
							nick: "!",
							text: "通知权限被拒绝，如果有人@提到你，你不会收到通知。",
							time: null
						});
						notifyPermissionExplained = -1;
					}
					return true;
				}
			});
		}
	} catch (error) {
		pushMessage({
			cmd: "chat",
			nick: "!",
			text: "无法创建通知",
			time: null
		});
		console.error("An error occured trying to request notification permissions. This browser might not support desktop notifications.\nDetails:")
		console.error(error)
		return false;
	}
}

// Update localStorage with value of checkbox
notifySwitch.addEventListener('change', (event) => {
	if (event.target.checked) {
		RequestNotifyPermission();
	}
	localStorageSet("notify-api", notifySwitch.checked)
})
// Check if localStorage value is set, defaults to OFF
if (notifySetting === null) {
	localStorageSet("notify-api", "false")
	notifySwitch.checked = false
}
// Configure notifySwitch checkbox element
if (notifySetting === "true" || notifySetting === true) {
	notifySwitch.checked = true
} else if (notifySetting === "false" || notifySetting === false) {
	notifySwitch.checked = false
}

/** Sound switch and local storage behavior **/
var soundSwitch = document.getElementById("sound-switch")
var notifySetting = localStorageGet("notify-sound")

// Update localStorage with value of checkbox
soundSwitch.addEventListener('change', (event) => {
	localStorageSet("notify-sound", soundSwitch.checked)
})
// Check if localStorage value is set, defaults to OFF
if (notifySetting === null) {
	localStorageSet("notify-sound", "false")
	soundSwitch.checked = false
}
// Configure soundSwitch checkbox element
if (notifySetting === "true" || notifySetting === true) {
	soundSwitch.checked = true
} else if (notifySetting === "false" || notifySetting === false) {
	soundSwitch.checked = false
}
var allow_HTML_check=document.getElementById('allow-html')
if (localStorageGet('allow-html') === 'true') {
	allow_HTML_check.checked = true;
	allowHTML = true;
}else{
	allow_HTML_check.checked = false;
	allowHTML = false;
}

allow_HTML_check.onchange = function (e) {
	var enabled = !!e.target.checked;
	if ( !!e.target.checked ) {
		pushMessage({ nick: '!', text: '# 安全提醒：\n允许显示HTML信息可能会导致一些安全风险（例如==密码被盗取==）。\n请不要一直允许显示HTML信息！'});
	}
	localStorageSet('allow-html', enabled);
	allowHTML = enabled;
}

// Create a new notification after checking if permission has been granted
function spawnNotification(title, body) {
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		console.error("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") { // Check if notification permissions are already given
		// If it's okay let's create a notification
		var options = {
			body: body,
			icon: "imgs/96x96.png"
		};
		var n = new Notification(title, options);
	}
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== "denied") {
		if (RequestNotifyPermission()) {
			var options = {
				body: body,
				icon: "imgs/96x96.png"
			};
			var n = new Notification(title, options);
		}
	} else if (Notification.permission == "denied") {
		// At last, if the user has denied notifications, and you
		// want to be respectful, there is no need to bother them any more.
	}
}

function notify(args) {
	// Spawn notification if enabled
	if (notifySwitch.checked) {
		spawnNotification("?" + myChannel + "  —  " + args.nick, args.text)
	}

	// Play sound if enabled
	if (soundSwitch.checked) {
		var soundPromise = document.getElementById("notify-sound").play();
		if (soundPromise) {
			soundPromise.catch(function (error) {
				console.error("Problem playing sound:\n" + error);
			});
		}
	}
}
var cookie = localStorageGet('cookie')
function join(channel) {
	if (location.search.indexOf('?TEXT_') == 0) {
		$("#voice").hide();
		$("#show-voice-msg-p").hide()
		$("#show-voice-btn-p").hide();
		showVoiceBtn = false
		showVoiceMsg = false
	}
	if (connectHC) {
		joinHC(channel)
	}
	/*
	if (connectCC) {
		joinCC(channel)
	}
	*/
	// for local installs
	var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
	// if you changed the port during the server config, change 'wsPath'
	// to the new port (example: ':8080')
	// if you are reverse proxying, change 'wsPath' to the new location
	// (example: '/chat-ws')
	var wsPath = location.protocol === 'https:' ? '/ws' : ':6060';
	ws = new WebSocket(protocol + '//' + document.domain + wsPath);
	if (location.protocol != 'https:') {
		if (confirm("该通道未加密，部分功能将缺失，是否跳转到加密通道？")) {
			location.href='https://xq.kzw.ink'
			return false
		}
	}
	var wasConnected = false;

	ws.onopen = async function () {
		
		var shouldConnect = true;
		var payload = {
			cmd:'join',
			channel:channel,
			client_key:'XChatYYDS_'
		}
		if (!wasConnected) {
			if(localStorageGet('auto-login') == 'true' && localStorageGet('my-nick')) {
				myNick = localStorageGet('my-nick')
				payload.nick = myNick
				if (cookie){
					payload.cookie = cookie
				}
			} else {
				if (location.hash) {
					myNick = location.hash.substr(1);
				} else {
					if (cookie && myNick){
						if (confirm(`是否使用这个用户信息登录：\n${myNick}`)){
							payload.nick = myNick
							payload.cookie = cookie
						}else{
							var newNick = prompt('昵称:', '');
							if (newNick !== null) {
								myNick = newNick;
								payload.nick = myNick
							} else {
								// The user cancelled the prompt in some manner
								shouldConnect = false;
							}
						}
					}else{
						var newNick = prompt('昵称:', '');
						if (newNick !== null) {
							myNick = newNick;
							payload.nick = myNick
						} else {
							// The user cancelled the prompt in some manner
							shouldConnect = false;
						}
					}
					
				}
			}
		}
		if (!(/^[a-zA-Z0-9_]{1,20}$/.test(myNick.split('#')[0])) && connectHC) {
			alert('要连接HC，需要使用英文昵称，并且昵称需要少于20位。您可以继续使用，但HC服务器不会连接。')
		}
		if (!(/^[a-zA-Z0-9_]{1,20}$/.test(myNick.split('#')[0])) && connectHC) {
			alert('要连接HC，需要使用英文昵称，并且昵称需要少于20位。您可以继续使用，但HC服务器不会连接。')
		}
		localStorageSet('allow-imgur', true);
		allowImages = true;
		
		//send({ cmd: 'warn', text:'--以上内容为历史记录--'});
		await getMurmur();
		if (myNick && shouldConnect) {
			pushMessage({ nick: '*', text: "正在加入聊天室，这可能需要一些时间，请稍后。。。" });
			localStorageSet('my-nick', myNick.split('#')[0]);
			console.log(murmur)
			payload.murmur = murmur
			send(payload);
		}
		var h5_mynick = document.querySelector("#mynick")
		h5_mynick.innerHTML = '当前昵称：'+myNick.split('#')[0]
		console.log(allowOld)
		wasConnected = true;
	}

	ws.onclose = function () {
		if (wasConnected) {
			pushMessage({ nick: '!', text: "掉线啦！正在重新连接。。。" });
		}

		window.setTimeout(function () {
			join(channel);
		}, 2000);
	}

	ws.onmessage = function (message) {
		var args = JSON.parse(message.data);
		var cmd = args.cmd;

		var command = COMMANDS[cmd];
		command.call(null, args);
		

		
	}
}

function joinHC(channel) {
	wsHC = new WebSocket('wss://hack.chat/chat-ws');
	//wsHC = new WebSocket('wss://ws.crosst.chat:35197/')
	var wasConnected = false;

	wsHC.onopen = function () {
		var shouldConnect = true;
		
		if (myNick && shouldConnect) {
			if (channel == 'xq102210') {
				channel = 'your-channel'
				//channel = 'crosst'
			}
			wsHC.send(JSON.stringify({ cmd: 'join', channel: channel, nick: 'XC_'+myNick.split('#')[0], password: myNick.split('#')[1] }));
		}
		wasConnected = true;
		//wsHC.send(JSON.stringify({ cmd: 'chat', text: '自动发送：[当前用户处于互通功能](https://xq.kzw.ink)'}));
	}

	wsHC.onclose = function () {
		if (wasConnected) {
			pushMessage({ nick: '!', text: "HC服务器已掉线，这不影响XC服务器，您可以刷新重试" });
		}
	}

	wsHC.onmessage = function (message) {
		if (connectHC) {
			var args = JSON.parse(message.data);
			var cmd = args.cmd;
			if(args.text && args.text.indexOf("New beta available") == -1 && args.nick!='XC_'+myNick.split('#')[0] && cmd=='chat' && args.nick.indexOf('XC_')<0) {
				if (cmd == 'chat' || cmd=='join' || (cmd=='info' && args.type == 'whisper')) {
					console.log(args)
					var command = COMMANDS[cmd];
					args.nick = 'HC_'+args.nick
					args.head = 'https://hack.chat/android-icon-72x72.png'
					command.call(null, args);
				}
				
			}
		}
		
	}
}
/*
function joinCC(channel) {
	wsCC = new WebSocket('wss://ws.crosst.chat:35197/');
	var wasConnected = false;

	wsCC.onopen = function () {
		var shouldConnect = true;
		
		if (myNick && shouldConnect) {
			if (channel == 'xq102210') {
				channel = 'crosst'
				//channel = 'crosst'
			}
			wsCC.send(JSON.stringify({ cmd: 'join', channel: channel, nick: 'XC_'+myNick.split('#')[0], password: myNick.split('#')[1] }));
		}
		wasConnected = true;
	}

	wsCC.onclose = function () {
		if (wasConnected) {
			pushMessage({ nick: '!', text: "CC服务器已掉线，这不影响XC服务器，您可以刷新重试" });
		}
	}

	wsCC.onmessage = function (message) {
		if (connectCC) {
			var args = JSON.parse(message.data);
			var cmd = args.cmd;
			if(args.text && args.text.indexOf("New beta available") == -1 && args.nick!='XC_'+myNick.split('#')[0] && args.nick.indexOf('XC_')<0) {
				if (cmd == 'chat' || cmd=='join' || (cmd=='info' && args.type == 'whisper')) {
					console.log(args)
					var command = COMMANDS[cmd];
					args.nick = 'CC_'+args.nick
					command.call(null, args);
				}
				
			}
		}
		
	}
}
*/
nicks = null
var COMMANDS = {
	list: function (args) {
		
		args.tag = 'old'
		pushMessage(args);
		console.log(args)
		if(args.text.length == 0) {
			pushMessage({ nick: '*', text: "----没有历史记录----"})
		} else {
			pushMessage({ nick: '*', text: "----以上为历史记录----"})
		}
		var a_nicks = []
		for (var i=0; i<nicks.length; i+=1) {
			if (!(nicks[i].indexOf('挂机') > 0)) {
				a_nicks.push(nicks[i])
			}
		}
		pushMessage({ nick: '*', text: "在线用户: " + a_nicks.join(", ") })
		window.scrollTo(0, document.body.scrollHeight);
		if (!localStorageGet("came")) {
			pushMessage({ nick: '*', text: "你好，欢迎来到XChat。第一次来到XChat？可以发送“^readme”来查看这里的帮助文件。玩的开心，最后别忘了把这里添加到收藏夹哦～" });
			localStorageSet("came", "true")
		}
	},
	rmCookie:function(args){
		localStorageSet("my-nick", '')
		localStorageSet('auto-login', 'false')
		localStorageSet("cookie", '')
		pushMessage({nick:'*',text:'已清除您的登录信息'})
	},
	chat: function (args) {
		console.log(args)
		if (ignoredUsers.indexOf(args.nick) >= 0) {
			return;
		}
		head = args.head
		pushMessage(args);
	},
	html:function (args){
		if (allowHTML){
			pushHTML(args)
		}else{
			pushMessage({nick:'!',text:`${args.nick} 发送了一条HTML信息，但由于你尚未允许显示HTML信息，所以未能显示。\n您可以在侧边栏中勾选“允许显示HTML信息”来开启这个功能。`})
		}
	},
	kill: function (args) {
		console.log(mynick)
		if(args.nick==myNick.split('#')[0]) {
			localStorageSet("killed", 1)
		}
		pushMessage({ nick: '*', text: "已==封杀== "+args.nick});
	},
	unkill: function (args) {
		console.log(args)
		if(args.nick==myNick.split('#')[0]) {
			localStorageSet("killed", 0)
		}
		pushMessage({ nick: '*', text: "已取消封杀 "+args.nick});
	},
	info: function (args) {
		args.nick = '*';
		pushMessage(args);
	},
	shout: function (args) {
		alert(args.text)
	},

	warn: function (args) {
		args.nick = '!';
		pushMessage(args);
		if (args.text == '该昵称已被其他用户预留') {
			allowSend = false
		}
	},

	onlineSet: function (args) {
		nicks = args.nicks;
		console.log(nicks)
		usersClear();

		nicks.forEach(function (nick) {
			userAdd(nick);
		});
		if (!allowOld) {
			var a_nicks = []
			for (var i=0; i<nicks.length; i+=1) {
				if (!(nicks[i].indexOf('挂机') > 0)) {
					a_nicks.push(nicks[i])
				}
			}
			pushMessage({ nick: '*', text: "在线用户: " + a_nicks.join(", ") })
			
		}
		if (args.cookie){
			localStorageSet('cookie',args.cookie)
		}
		
		
	},

	onlineAdd: function (args) {
		var nick = args.nick;

		userAdd(nick);
		console.log(args)
		if ($$('#joined-left').checked) {
			/*
			if (nick.indexOf('｜挂机') >0) {
				pushMessage({ nick: '*', text: nick + " 进入挂机状态" });
			} else {
				pushMessage({ nick: '*', text: nick + " 加入了聊天室" });
			}
			*/
			if (args.city === undefined) {args.city = '定位失败'}
			if (args.auth !== undefined) {
				pushMessage({ nick: '*', text: nick + " 加入了聊天室，该用户来自："+args.city+"\nTA正在使用 "+args.client+"\n系统认证："+args.auth});
			}else{
				pushMessage({ nick: '*', text: nick + " 加入了聊天室，该用户来自："+args.city+"\nTA正在使用 "+args.client });
			}
		}
	},

	onlineRemove: function (args) {
		var nick = args.nick;

		userRemove(nick);

		if ($$('#joined-left').checked) {
			pushMessage({ nick: '*', text: nick + " 离开了聊天室" });
		}
	},
	onafkAdd: function (args) {
		
		console.log(args.nick)
		var nick = args.nick;
		userRemove(nick.split('｜')[0].split(']')[1])
		userRemove(nick)
		userAdd(nick);
		if ($$('#joined-left').checked) {
			pushMessage({ nick: '*', text: nick + " 进入挂机状态" });
		}
	},
	onafkRemove: function (args) {
		console.log('onafkRemove')
		var nick = args.nick;
		console.log(nick)
		userRemove(nick);
		userRemove(nick.split(']')[1].split('｜')[0])
		userAdd(nick.split(']')[1].split('｜')[0]);
		if ($$('#joined-left').checked) {
			pushMessage({ nick: '*', text: nick + " 退出挂机状态" });
		}
	},
	onafkRemoveOnly: function (args) {
		console.log('onafkRemove')
		var nick = args.nick;
		console.log(nick)
		userRemove(nick);
		if ($$('#joined-left').checked) {
			pushMessage({ nick: '*', text: nick + " 退出挂机状态" });
		}
	},
	changenick: function (args) {
		var h5_mynick = document.querySelector("#mynick")
		h5_mynick.innerHTML = '当前昵称：'+args.nick.split('#')[0]
	},
	video: function(args) {
		video_url = args.url
		console.log('video url:', video_url)
		if (video_url == 'none') {
			alert('没有视频可以播放，请联系管理员添加视频')
			return false;
		}
		var base = btoa(encodeURI(video_url))
		console.log(base)
		dp = new DPlayer({
			container: document.getElementById('player'),
			screenshot: true,
			mutex: false,
			live: live,
			playbackSpeed: [1],
			video: {
				url: ''
			},
			danmaku: {
				id: base,
				//id: video_url.replace('/', '').replace(':', '').replace('&', '').replace('?','').replace('.','').replace('=', ''),
				//id: '!@#$%^#$%^&&*()fjksahjfkdlahu<>?..,/.\\||````',
				api: 'https://dplayer.moerats.com/',
				user:myNick,

			},
		});
		dp.on('seeked', function () {
			console.log(dp.video.currentTime)
			ws.send(JSON.stringify({ cmd: 'send_seeked', vtime:dp.video.currentTime, nick:myNick.split('#')[0]}));
		});
		dp.on('pause', function () {
			console.log(dp.video.currentTime)
			ws.send(JSON.stringify({ cmd: 'send_seeked', vtime:-10, nick:myNick.split('#')[0]}));
		});
		dp.on('play', function () {
			console.log(dp.video.currentTime)
			ws.send(JSON.stringify({ cmd: 'send_seeked', vtime:-20, nick:myNick.split('#')[0]}));
		});
		layer.open({
			type: 1,
			title: '一起看视频吧',
			shadeClose: true,
			shade: false,
			maxmin: true,
			area: ['80%', '80%'],
			content: $('#player'),
			end: function () {
				dp.volume(0, true, true);
				ws.send(JSON.stringify({cmd:'closed_video'}));
			}
		});
		dp.switchVideo({url: video_url});
		dp.play()
	},
	/*
	userInfo: function (args) {
		console.log(args)
		userInfo = args.content
		live = true
		if(userInfo.uType=='mod' || userInfo.uType=='admin') {
			live=false
		}
	},
	*/
	send_seeked: function (args) {
		if (dp.video.paused) {
			ws.send(JSON.stringify({ cmd: 'invate_seeked', vtime:-10, nick:args.nick}));
		}
		ws.send(JSON.stringify({ cmd: 'invate_seeked', vtime:dp.video.currentTime, nick:args.nick}));
	},
	set_seeked: function(args) {
		if (args.nick != myNick.split('#')[0]) {
			if (args.vtime == -10) {
				dp.pause()
			} else if (args.vtime == -20) {
				dp.play()
			} else {
				dp.seek(args.vtime)
			}
			
		}
		
	},
	cap: function(args) {
		cap_img = args.text
		window.setTimeout(function () {
			pushMessage({ nick: '*', text: cap_img})
		}, 500);
	},
	bye: function(args) {
		received_bye = true
		md.inline.ruler.enable([ 'katex' ]);
                md.block.ruler.enable([ 'katex' ]);
		allowImages = true

	},
	onpass: function (args) {
		if(args.ispass == 'true') {
			pass = true

			if (location.search.indexOf('?VOICE_') == 0) {
				$("#chatform").hide()
				$("#chatinput").hide()
				$("#show-voice-msg-p").hide()
				$("#show-voice-btn-p").hide()
				showVoiceBtn = true
				showVoiceMsg = true
				$("#voice").css('width', '100%').css('height', '3rem');
			}
			
			if(allowOld) {
				console.log('run1', localStorageGet('oldnum'))
				if(localStorageGet('oldnum')) {
					console.log('run2')
					setTimeout(() => {
						ws.send(JSON.stringify({ cmd: 'get_old', num: localStorageGet('oldnum')}));
					}, 100)
					
					
					
				} else {
					setTimeout(() => {
						ws.send(JSON.stringify({ cmd: 'get_old', num: '20'}));
					}, 100)
					
				}
				
			} else {
				if (!localStorageGet("came")) {
					pushMessage({ nick: '*', text: "你好，欢迎来到XChat。第一次来到XChat？可以发送“^readme”来查看这里的帮助文件。玩的开心，最后别忘了把这里添加到收藏夹哦～" });
					localStorageSet("came", "true")
				}
			}
		}
	}

}

function pushMessage(args) {
	// Message container
	var messageEl = document.createElement('div');
	
	if (!args.tag) {
		if (typeof (myNick) === 'string' && (args.text.match(new RegExp('@' + myNick.split('#')[0] + '\\b', "gi")) ||((args.type === "whisper" || args.type === "invite") && args.from))) {
			notify(args);
		}
	}
	

	messageEl.classList.add('message');

	if (args.nick == '!') {
		messageEl.classList.add('warn');
	} else if (args.nick == '*') {
		messageEl.classList.add('info');
	} else if (args.admin) {
		messageEl.classList.add('admin');
	} else if (args.mod) {
		messageEl.classList.add('mod');
	} else if(args.tag == 'old') {
		messageEl.classList.add('me');

	}

	// Nickname
	var nickSpanEl = document.createElement('span');
	nickSpanEl.classList.add('nick');
	messageEl.appendChild(nickSpanEl);

	if (args.trip) {
	    var tripEl = document.createElement('span');
	    if (args.mod || args.admin){
	        tripEl.textContent = String.fromCodePoint(11088) + " " + args.trip + " ";
	    }else{
	        tripEl.textContent = args.trip + " ";
	    }
	    tripEl.classList.add('trip');
	    nickSpanEl.appendChild(tripEl);
	}

	if (args.nick) {
		var nickLinkEl = document.createElement('a');
		nickLinkEl.textContent = args.nick;

		var imgEl = document.createElement('img')
		//下面注释代码已经弃用，原因是可以在发送的json中提取自己的头像地址
		/*
		if (verifyNickname(myNick) && args.nick == myNick) {
			imgEl.src = localStorageGet('head')
		} else {
			imgEl.src = head
		}
		*/
		imgEl.src = head
		imgEl.style.height = '25px'
		imgEl.style.width = '25px'
		imgEl.style.marginRight = '0.5rem'
		imgEl.style.verticalAlign = 'top'
		imgEl.style.borderRadius = '50%'
		/*
		nickLinkEl.onclick = function () {
			insertAtCursor("@" + args.nick + " ");
			$$('#chatinput').focus();
		}
		*/
		//感谢cc作出的贡献，以下内容来自cc
		nickLinkEl.onclick = function () {
			// Reply to a whisper or info is meaningless
			if ( args.type == 'whisper' || args.nick == '*' || args.nick == '!' ) {
				insertAtCursor( args.text );
				$$('#chat-input').focus();
				return;
			} else {
				var nick = args.nick
				if (args.nick.startsWith('HC_')) {
					nick = nick.replace('HC_', '')
				}
				/*
				if (args.nick.startsWith('CC_')) {
					nick = nick.replace('CC_', '')
				}
				*/
				insertAtCursor( '@' + nick + ' ' );
				$$('#chatinput').focus();
				return;
			}
			
		}
		// Mention someone when right-clicking
		nickLinkEl.oncontextmenu = function ( e ) {
			
			e.preventDefault();
			let replyText = '';
			let originalText = args.text;
			let overlongText = false;
			
			// Cut overlong text
			if ( originalText.length > 350 ) {
				replyText = originalText.slice(0, 350);
				overlongText = true;
			}

			// Add nickname
			if ( args.trip ) {
				replyText = '>' + args.trip + ' ' + args.nick + '：\n';
			} else {
				replyText = '>' + args.nick + '：\n';
			}

			// Split text by line
			originalText = originalText.split('\n');

			// Cut overlong lines
			if ( originalText.length >= 8 ) {
				originalText = originalText.slice(0, 8);
				overlongText = true;
			}

			for ( let replyLine of originalText ) {
				// Cut third replied text
				if ( !replyLine.startsWith('>>')) {
					replyText += '>' + replyLine + '\n';
				}
			}

			// Add elipsis if text is cutted
			if ( overlongText ) {
				replyText += '>……\n';
			}
			replyText += '\n';


			// Add mention when reply to others
			if ( args.nick != myNick ) {
				var nick = args.nick
				if (args.nick.startsWith('HC_')) {
					nick = nick.replace('HC_', '')
				}
				/*
				if (args.nick.startsWith('CC_')) {
					nick = nick.replace('CC_', '')
				}
				*/
				replyText += '@' + nick + ' ';
			}

			// Insert reply text
			replyText += $$('#chatinput').value;

			$$('#chatinput').value = '';
			insertAtCursor( replyText );
			$$('#chatinput').focus();
		}

		// 以上内容来自cc

		var date = new Date(args.time || Date.now());
		nickLinkEl.title = date.toLocaleString();
		if(!(args.nick == '*' || args.nick == '!')) {
			if(showHead) {
				nickSpanEl.appendChild(imgEl);
			}
			
		}
		nickSpanEl.appendChild(nickLinkEl);
	}
	if (args.color && /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(args.color)){
		nickLinkEl.setAttribute('style', 'color:#' + args.color + ' !important');
	}

	// Text
	var textEl = document.createElement('p');
	textEl.classList.add('text');
	if(!args.tag) {
		var html = ''
		if (args.text.indexOf('USERSENDVOICE_')>=0 && showVoiceMsg) {
			html = `<audio controls><source src="https://xq.kzw.ink/oss/${args.text.replace('USERSENDVOICE_', '').replace('static/', '')}" type="audio/mpeg"></audio>`
		} else {
			html = md.render(args.text)
		}
		textEl.innerHTML = html;
	}else {
		var html = ''
		args.text.forEach(v=> {
			var content = md.render(v.content)
			if (v.head) {
				head_pic = v.head
			} else {
				head_pic = defaultHeadPic
			}
			
			console.log($(content).text())
			if (content.indexOf('USERSENDVOICE_')>=0 && showVoiceMsg) {
				var content2 = $(content).text()
				if (showHead) {
					html = `<div class="message"><span class="nick"><span class="trip">${v.trip} </span><img src="${head_pic}" style="height: 25px; width: 25px; margin-right: 0.5rem; vertical-align: top; border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%;"><a title="${v.time}">${v.nick}</a></span><p class="text"><p style="margin-left: 2rem;"><audio controls><source src="https://xq.kzw.ink/oss/${content2.replace('USERSENDVOICE_', '').replace('static/', '')}" type="audio/mpeg"></audio></p></p></div>`+html
				} else {
					html = `<div class="message"><span class="nick"><span class="trip">${v.trip} </span><a title="${v.time}">${v.nick}</a></span><p class="text"><p><audio controls><source src="https://xq.kzw.ink/oss/${content2.replace('USERSENDVOICE_', '').replace('static/', '')}" type="audio/mpeg"></audio></p></p></div>`+html
				}
			} else {
				if (showHead) {
					html = `<div class="message"><span class="nick"><span class="trip">${v.trip} </span><img src="${head_pic}" style="height: 25px; width: 25px; margin-right: 0.5rem; vertical-align: top; border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%;"><a title="${v.time}">${v.nick}</a></span><p class="text"><p style="margin-left: 2rem;">${content}</p></p></div>`+html
				} else {
					html = `<div class="message"><span class="nick"><span class="trip">${v.trip} </span><a title="${v.time}">${v.nick}</a></span><p class="text"><p>${content}</p></p></div>`+html
				}
			}
			
			
		})
		textEl.innerHTML = html
	}

	messageEl.appendChild(textEl);
	//这种方法已弃用，原因是可能导致class中其他值出错
	/*
	var selector = document.querySelector("#font-selector")
	var index = selector.selectedIndex
    var value = selector.options[index].value
	messageEl.className = '';
	messageEl.classList.add('message')
	messageEl.classList.add(value)
	*/
	// Scroll to bottom
	var atBottom = isAtBottom();
	$$('#messages').appendChild(messageEl);
	if (atBottom) {
		window.scrollTo(0, document.body.scrollHeight);
	}

	unread += 1;
	updateTitle();
}
function pushHTML(args) {
	// Message container
	var messageEl = document.createElement('div');

	messageEl.classList.add('message');
	
	if (verifyNickname(myNick) && args.nick == myNick) {
		messageEl.classList.add('me');
	} else if (args.nick == '!') {
		messageEl.classList.add('warn');
	} else if (args.nick == '*') {
		messageEl.classList.add('info');
	} else if (args.admin) {
		messageEl.classList.add('admin');
	} else if (args.mod) {
		messageEl.classList.add('mod');
	}

	// Nickname
	var nickSpanEl = document.createElement('span');
	nickSpanEl.classList.add('nick');
	messageEl.appendChild(nickSpanEl);

	if (args.trip) {
	    var tripEl = document.createElement('span');
	    if (args.mod || args.admin){
	        tripEl.textContent = String.fromCodePoint(11088) + " " + args.trip + " ";
	    }else{
	        tripEl.textContent = args.trip + " ";
	    }
	    tripEl.classList.add('trip');
	    nickSpanEl.appendChild(tripEl);
	}

	if (args.nick) {
		var nickLinkEl = document.createElement('a');
		nickLinkEl.textContent = args.nick;

		var date = new Date(args.time || Date.now());
		nickLinkEl.title = date.toLocaleString();
		nickSpanEl.appendChild(nickLinkEl);
	}

	// Text
	var textEl = document.createElement('div');
	textEl.classList.add('text');
	textEl.innerHTML = args.text;

	messageEl.appendChild(textEl);

	// Scroll to bottom
	var atBottom = isAtBottom();
	$$('#messages').appendChild(messageEl);
	if (atBottom) {
		window.scrollTo(0, document.body.scrollHeight);
	}
	
	updateTitle();
}

function insertAtCursor(text) {
	var input = $$('#chatinput');
	var start = input.selectionStart || 0;
	var before = input.value.substr(0, start);
	var after = input.value.substr(start);

	before += text;
	input.value = before + after;
	input.selectionStart = input.selectionEnd = before.length;

	updateInputSize();
}

function send(data) {
	if (ws && ws.readyState == ws.OPEN) {
		console.log(data)
		if(addOld) {
			data.show = 1;
		} else {
			data.show = 0;
		}
		if (localStorageGet('head')) {
			data.head = localStorageGet('head')
		} else {
			data.head = defaultHeadPic
		}
		if(localStorageGet('killed') != 1) {
			if(allowSend) {
				//页面命令
				if (data.text) {
					if (data.text.startsWith('/')) {
						data.text = data.text.substr(1);
						var [cmd,args] = data.text.split(' ')

						//设置共享视频地址
						if (cmd == 'video') {
							console.log(args)
							ws.send(JSON.stringify({cmd:'set_video', url: args}));
							return false;
						}

						//完成后确认没有命令则添加斜杠
						data.text = '/'+data.text;
					}
					
				}
				if (pass) {
					if (connectHC && wsHC && wsHC.readyState == wsHC.OPEN && data.text.startsWith('hc-')) {
						data.text = data.text.replace('hc-', '')
						if(!data.text.startsWith('/') || data.text.startsWith('/w') || data.text.startsWith('/r') ) { //不允许向hc服务器发送命令
							wsHC.send(JSON.stringify(data));
						}
						
					}
					/*
					if (connectCC && wsCC && wsCC.readyState == wsCC.OPEN && data.text.startsWith('cc-')) {
						data.text = data.text.replace('cc-', '')
						if(!data.text.startsWith('/') || data.text.startsWith('/w') || data.text.startsWith('/r') ) { //不允许向cc服务器发送命令
							
							wsCC.send(JSON.stringify(data));
						}
						
					}
					*/
				}

				/* if(data.text == 'help') {
					// 该帮助文档为原创。
					let help_docs = `
# XChat帮助文件（版本：2.00）
###### 更新日期：北京时间 2022-6-4 10:00
## 前言
XChat，是一款由Hack.Chat改变的聊天平台，由线圈团队编写。它有着艰辛的发展历程。为推广XChat，Mr_Zhang特意编写了本帮助文件，希望诸位用户能细细阅读。
###### 小提示：某些像猪一样愚蠢的人只会胡乱贬低XChat，请不要相信他们。
## 基本教程
### 识别码
#### 介绍
识别码是一个六位的“乱码”，位于头像左侧，由你的密码生成，可以有效让其他用户识别是否是你本人。
#### 使用方法
1. 刷新网页；
2. 在昵称输入框中按照\`昵称#密码\`的格式填写，如\`Test#123456\`。
3. 点击确定或者按下回车，进入XChat。
4. 在这个例子中，\`123456\`就是密码，\`QTCCbB\`是其对应的识别码。
###### 小提示：一个密码只对应一个识别码。请确保你的密码足够特殊，让别人猜不到你的密码，不能冒充你。除了站长，其他人的识别码都是六位的，站长的识别码是\`Admin\`
### 机器人（bot）
#### 介绍
机器人，简称bot，是由其他开发者开发的，可以服务于大家，也可以活跃聊天气氛。机器人开发者可以通过机器人后台控制机器人发送信息。
#### 机器人列表
截至北京时间2022-6-4清晨，机器人有：\`eebot\`、\`SuMx_bot\`、\`Zhang系列Bot\`（昵称以\`Zhang\`开头）、\`dotbot\`、\`zzBot\`（常用昵称为\`zzChumo\`；有时是真人，有时是机器人）
###### 小提示：开发机器人需要向XChat管理员申请token来让机器人跳过验证码。
### 发送图片
#### 介绍
~~这个就不多介绍了。。。~~
#### 使用方法
1. 把头像图片上传到图片托管网站（图床）。
2. 复制图片托管网站提供的图片URL。
3. 回到XChat，按照\`![](图片URL)\`的格式发送信息。
### 设置头像
#### 介绍
头像可以让别人更快速地产生对你的第一印象，选择一个好看的头像可以在一定程度上改善别人对你的印象。
#### 使用方法
1. 把头像图片上传到图片托管网站（图床）。
2. 复制图片托管网站提供的图片URL。
3. 回到XChat，在侧边栏里点击\`设置头像\`按钮，在弹出来的输入框中粘贴图片URL，并点击确定或按下回车。
###### 小提示：请勿盗用他人头像。
### 设置背景
#### 介绍
~~这个不用多说了吧。。。~~
#### 使用方法
~~（和设置头像方法差不多，这里不再废话了）~~
### 一起看视频
#### 介绍
一起看视频，顾名思义，即在聊天室内观看视频，而且可以保证所有人的进度和视频播放者进度相同。属于XChat的特色功能。
#### 使用方法
1. 在侧边栏里点击\`一起看视频！\`按钮，即可观看视频。
###### 小提示：视频可能会失效，所以不是任何时候都能看视频。如需设置视频，可以联系XChat管理员。
### 连接到HC服务器
#### 介绍
该功能可以让你同时加入HackChat聊天室。是XChat的特色功能。
#### 使用方法
1. 在侧边栏里勾选\`连接HC服务器\`。
2. 重新进入XChat。
3. 把信息发送到HackChat，只需要给你要发送的信息加上前缀\`hc-\`即可。
#### 备注
1. 如果你在XChat里的\`?xq102210\`，那么在HackChat的\`?your-channel\`里，会有一名叫做\`XC_你的昵称\`的用户。
2. 当HackChat用户发信息的时候，你会在XChat看到以\`HC_\`开头的用户，那是HackChat内部的用户。
###### 小提示：除了XChat内的\`?xq102210\`聊天室，其他聊天室都会镜像连接到HackChat。例如在XChat内的\`?test\`，相应的，你也会加入HackChat的\`?test\`聊天室。
### 发送语音
#### 介绍
该功能可以让你在聊天室内发送语音信息，属于XChat特色功能。
#### 使用方法
1. 点击聊天框左侧的\`发送语音\`按钮（可能会弹出权限申请界面，请同意权限申请）。
2. 要结束录音并发送，可以点击\`结束录音\`按钮。
###### 小提示：录音最长时间为60秒，超时后会自动结束录音并发送。XChat提供文字聊天室和语音聊天室，即只能发送文字的聊天室和只能发送语音的聊天室。以\`TEXT_\`开头的是文字聊天室，以\`VOICE_\`开头的是语音聊天室（区分大小写）。
### 创建个人聊天室
#### 介绍
~~话不多说，直接进入正题。。。~~
#### 使用方法
1. 把网址\`https://xq.kzw.ink/?xq102210\`中的半角问号后更改为你要创建的聊天室的名称，即可创建。例如\`https://xq.kzw.ink/?test\`
### 私聊
#### 介绍
偷偷地给某人发送信息，只有你和对方能看到。
#### 使用方法
1. 在聊天室按照\`/w 对方的昵称 要发送的信息\`的格式发送信息即可发送私聊。例如\`/w 小明 你好！\`就是把内容为\`你好\`的信息发送给用户\`小明\`。
###### 小提示: 当有人向你发送私聊时, 你只需要发送\`/r 要发送的信息\`即可快速回复。
## 禁止的行为
1. 乱刷屏（包括发长信息之前没有提醒）
2. 传播色情内容
3. 随意攻击某人
4. 非网络原因进进出出
5. 所有违反中华人民共和国的内容
6. 诋毁线圈团队以及XChat（不包括提出问题和建议）
7. 发送引起公愤的内容
8. 使用令人反感的昵称
9. 发送令人反感的内容
10. 过度使用机器人

==如果违反以上规定，可能会受到踢出聊天室/禁言/封禁处罚==

## 结束语
我们希望此帮助对您有帮助，如有疑问，请联系XChat用户Mr_Zhang。
感谢您的阅读！祝您聊天愉快！`;

					pushMessage({nick:'*', text:help_docs})
					return false;
				}  */
				
				ws.send(JSON.stringify(data));
			} else {
				pushMessage({nick:'*', text:'当前昵称已被预留，请更换昵称'})
			}
		} else {
			alert('你已被管理员封杀，无法执行此操作。')
		}
		
	}
}

var windowActive = true;
var unread = 0;

window.onfocus = function () {
	windowActive = true;

	updateTitle();
}

window.onblur = function () {
	windowActive = false;
}

window.onscroll = function () {
	if (isAtBottom()) {
		updateTitle();
	}
}

function isAtBottom() {
	return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}

function updateTitle() {
	if (windowActive && isAtBottom()) {
		unread = 0;
	}

	var title;
	if (myChannel) {
		title = "?" + myChannel;
	} else {
		title = "XChat";
	}

	if (unread > 0) {
		title = '(' + unread + ') ' + title;
	}

	document.title = title;
}

$$('#footer').onclick = function () {
	$$('#chatinput').focus();
}

$$('#chatinput').onkeydown = function (e) {
	if (e.keyCode == 13 /* ENTER */ && !e.shiftKey) {
		e.preventDefault();

		// Submit message
		if (e.target.value != '') {
			var text = e.target.value;
			e.target.value = '';

			send({ cmd: 'chat', text: text });

			lastSent[0] = text;
			lastSent.unshift("");
			lastSentPos = 0;

			updateInputSize();
		}
	} else if (e.keyCode == 38 /* UP */) {
		// Restore previous sent messages
		if (e.target.selectionStart === 0 && lastSentPos < lastSent.length - 1) {
			e.preventDefault();

			if (lastSentPos == 0) {
				lastSent[0] = e.target.value;
			}

			lastSentPos += 1;
			e.target.value = lastSent[lastSentPos];
			e.target.selectionStart = e.target.selectionEnd = e.target.value.length;

			updateInputSize();
		}
	} else if (e.keyCode == 40 /* DOWN */) {
		if (e.target.selectionStart === e.target.value.length && lastSentPos > 0) {
			e.preventDefault();

			lastSentPos -= 1;
			e.target.value = lastSent[lastSentPos];
			e.target.selectionStart = e.target.selectionEnd = 0;

			updateInputSize();
		}
	} else if (e.keyCode == 27 /* ESC */) {
		e.preventDefault();

		// Clear input field
		e.target.value = "";
		lastSentPos = 0;
		lastSent[lastSentPos] = "";

		updateInputSize();
	} else if (e.keyCode == 9 /* TAB */) {
		// Tab complete nicknames starting with @

		if (e.ctrlKey) {
			// Skip autocompletion and tab insertion if user is pressing ctrl
			// ctrl-tab is used by browsers to cycle through tabs
			return;
		}
		e.preventDefault();

		var pos = e.target.selectionStart || 0;
		var text = e.target.value;
		var index = text.lastIndexOf('@', pos);

		var autocompletedNick = false;

		if (index >= 0) {
			var stub = text.substring(index + 1, pos).toLowerCase();
			// Search for nick beginning with stub
			var nicks = onlineUsers.filter(function (nick) {
				return nick.toLowerCase().indexOf(stub) == 0
			});

			if (nicks.length > 0) {
				autocompletedNick = true;
				if (nicks.length == 1) {
					insertAtCursor(nicks[0].substr(stub.length) + " ");
				}
			}
		}

		// Since we did not insert a nick, we insert a tab character
		if (!autocompletedNick) {
			insertAtCursor('\t');
		}
	}
}

function updateInputSize() {
	var atBottom = isAtBottom();

	var input = $$('#chatinput');
	input.style.height = 0;
	input.style.height = input.scrollHeight + 'px';
	document.body.style.marginBottom = $$('#footer').offsetHeight + 'px';

	if (atBottom) {
		window.scrollTo(0, document.body.scrollHeight);
	}
}

$$('#chatinput').oninput = function () {
	updateInputSize();
}

updateInputSize();

/* sidebar */

$$('#sidebar').onmouseenter = $$('#sidebar').ontouchstart = function (e) {
	$$('#sidebar-content').classList.remove('hidden');
	$$('#sidebar').classList.add('expand');
	e.stopPropagation();
}

$$('#sidebar').onmouseleave = document.ontouchstart = function (event) {
	var e = event.toElement || event.relatedTarget;
	try {
		if (e.parentNode == this || e == this) {
	     return;
	  }
	} catch (e) { return; }

	if (!$$('#pin-sidebar').checked) {
		$$('#sidebar-content').classList.add('hidden');
		$$('#sidebar').classList.remove('expand');
	}
}

$$('#clear-messages').onclick = function () {
	// Delete children elements
	var messages = $$('#messages');
	messages.innerHTML = '';
}

$$('#set-bgimage').onclick = function () {
	if(localStorageGet('bgurl') != null) {
		var bgurl = prompt('背景图片地址:', localStorageGet('bgurl'));
	} else {
		var bgurl = prompt('背景图片地址:');
	}
	if(bgurl == '') {
		alert('地址不能为空')
	} else if (bgurl) {
		if($$('.bg-img')) {
			$$('#body').removeChild($$('.bg-img'))
		}
		$$('#scheme-link').href = "schemes/clear.css";
		console.log($$('#body').style)
		var bgdiv = document.createElement('div')
		console.log(bgdiv)
		bgdiv.className = 'bg-img'
		//$$('#body').create(`<div class="bg-img" background="${bgurl}"></div>`)
		bgdiv.style.backgroundImage = `url(${bgurl.replace('"')})`
		$$('#body').appendChild(bgdiv)
		var bg_selector = document.querySelector("#scheme-selector")
		bg_selector.selectedIndex = 34
		//$$('#body').style.background = ``
		localStorageSet('bgurl', bgurl);
	}
}

$$('#set-head').onclick = function () {
	if(localStorageGet('head') != null) {
		var pic = prompt('头像地址:', localStorageGet('head'));
	} else {
		var pic = prompt('头像地址:');
	}
	if(pic == '') {
		alert('地址不能为空')
		head = defaultHeadPic
		localStorageSet('head', '');
		
	} else if (pic) {
		head = pic
		localStorageSet('head', head);
	}
}

$$('#clear-nick').onclick = function () {
	localStorageSet("my-nick", '')
	localStorageSet('auto-login', 'false')
	localStorageSet("cookie", '')
	pushMessage({
		cmd: "chat",
		nick: "*",
		text: "已清除您的登录信息！",
		time: null
	});
}

$$("#lay-video").onclick = function() {
	ws.send(JSON.stringify({ cmd: 'get_video'}));
}

// Restore settings from localStorage

if (localStorageGet('pin-sidebar') == 'true') {
	$$('#pin-sidebar').checked = true;
	$$('#sidebar-content').classList.remove('hidden');
}

if (localStorageGet('joined-left') == 'false') {
	$$('#joined-left').checked = false;
}

if (localStorageGet('parse-latex') == 'false') {
	$$('#parse-latex').checked = false;
	md.inline.ruler.disable([ 'katex' ]);
	md.block.ruler.disable([ 'katex' ]);
}

$$('#pin-sidebar').onchange = function (e) {
	localStorageSet('pin-sidebar', !!e.target.checked);
}

$$('#joined-left').onchange = function (e) {
	localStorageSet('joined-left', !!e.target.checked);
}

$$('#parse-latex').onchange = function (e) {
	if (!received_bye){
	var enabled = !!e.target.checked;
	localStorageSet('parse-latex', enabled);
	if (enabled) {
		md.inline.ruler.enable([ 'katex' ]);
		md.block.ruler.enable([ 'katex' ]);
	} else {
		md.inline.ruler.disable([ 'katex' ]);
		md.block.ruler.disable([ 'katex' ]);
	}
	}
}

if (localStorageGet('syntax-highlight') == 'false') {
	$$('#syntax-highlight').checked = false;
	markdownOptions.doHighlight = false;
}

$$('#syntax-highlight').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('syntax-highlight', enabled);
	markdownOptions.doHighlight = enabled;
}

if (localStorageGet('allow-imgur') == 'false') {
	$$('#allow-imgur').checked = false;
	allowImages = false;
}

$$('#allow-imgur').onchange = function (e) {
	if (!received_bye) {
	var enabled = !!e.target.checked;
	localStorageSet('allow-imgur', enabled);
	allowImages = enabled;
	}
}

if (localStorageGet('allow-old') == 'false') {
	$$('#allow-old').checked = false;
	allowOld = false;
}

$$('#allow-old').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('allow-old', enabled);
	allowOld = enabled;
}

if (localStorageGet('add-old') == 'false') {
	$$('#add-old').checked = false;
	addOld = false;
}

$$('#add-old').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('add-old', enabled);
	addOld = enabled;
}

if (localStorageGet('show-head') == 'false') {
	$$('#show-head').checked = false;
	showHead = false;
}

$$('#show-head').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('show-head', enabled);
	showHead = enabled;
}

if (localStorageGet('auto-login') == 'true') {
	$$('#auto-login').checked = true;
	autoLogin = true;
}

$$('#auto-login').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('auto-login', enabled);
	autoLogin = enabled;
}

if (localStorageGet('show-voice-btn') == 'false') {
	$$('#show-voice-btn').checked = false;
	showVoiceBtn = false;
	$("#voice").hide()
}

$$('#show-voice-btn').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('show-voice-btn', enabled);
	showVoiceBtn = enabled;
	if (showVoiceBtn) {
		$("#voice").show()
	} else {
		$("#voice").hide()
	}
	
}

if (localStorageGet('show-voice-msg') == 'false') {
	$$('#show-voice-msg').checked = false;
	showVoiceMsg = false;
}

$$('#show-voice-msg').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('show-voice-msg', enabled);
	showVoiceMsg = enabled;
}

if (localStorageGet('ws-hc') == 'true') {
	$$('#ws-hc').checked = true;
	connectHC = true;
}

$$('#ws-hc').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('ws-hc', enabled);
	connectHC = enabled;
}
/*
if (localStorageGet('ws-cc') == 'true') {
	$$('#ws-cc').checked = true;
	connectCC = true;
}

$$('#ws-cc').onchange = function (e) {
	var enabled = !!e.target.checked;
	localStorageSet('ws-cc', enabled);
	connectCC = enabled;
}
*/
// User list
var onlineUsers = [];
var ignoredUsers = [];

function userAdd(nick) {
	var user = document.createElement('a');
	user.textContent = nick;

	user.onclick = function (e) {
		userInvite(nick)
	}

	var userLi = document.createElement('li');
	userLi.appendChild(user);
	$$('#users').appendChild(userLi);
	onlineUsers.push(nick);
}

function userRemove(nick) {
	var users = $$('#users');
	var children = users.children;

	for (var i = 0; i < children.length; i++) {
		var user = children[i];
		if (user.textContent == nick) {
			users.removeChild(user);
		}
	}

	var index = onlineUsers.indexOf(nick);
	if (index >= 0) {
		onlineUsers.splice(index, 1);
	}
}

function usersClear() {
	var users = $$('#users');

	while (users.firstChild) {
		users.removeChild(users.firstChild);
	}

	onlineUsers.length = 0;
}

function userInvite(nick) {
	send({ cmd: 'invite', nick: nick });
}

function userIgnore(nick) {
	ignoredUsers.push(nick);
}

async function getMurmur() {
    let excludes = {}
    let options = {
        excludes: excludes
    }
    /*
    Fingerprint2.get(options, function (components) {
        // 参数
        const values = components.map(function (component) {
            return component.value
        });
        // 指纹
        murmur = Fingerprint2.x64hash128(values.webgl, 31);
        console.log(murmur)
    });
    */
    await Fingerprint2.getPromise({}).then(components => {
       // 参数
       const values = components.map(function (component) {
            return component.value
        });
        // 指纹
        murmur = Fingerprint2.x64hash128(values[19].join(''), 31);
        //console.log(murmur)
   })
}

/* color scheme switcher */

var schemes = [
	'android',
	'android-white',
	'atelier-dune',
	'atelier-forest',
	'atelier-heath',
	'atelier-lakeside',
	'atelier-seaside',
	'banana',
	'bright',
	'bubblegum',
	'chalk',
	'default',
	'eighties',
	'fresh-green',
	'greenscreen',
	'hacker',
	'maniac',
	'mariana',
	'military',
	'mocha',
	'monokai',
	'nese',
	'ocean',
	'omega',
	'pop',
	'railscasts',
	'solarized',
	'tk-night',
	'tomorrow',
	'carrot',
	'lax',
	'Ubuntu',
	'gruvbox-light',
	'fried-egg',
	'background-img'
];

var highlights = [
	'agate',
	'androidstudio',
	'atom-one-dark',
	'darcula',
	'github',
	'rainbow',
	'tk-night',
	'tomorrow',
	'xcode',
	'zenburn'
]

var currentScheme = 'atelier-dune';
var currentHighlight = 'darcula';

function setScheme(scheme) {
	currentScheme = scheme;
	$$('#scheme-link').href = "schemes/" + scheme + ".css";
	localStorageSet('scheme', scheme);
}

function setHighlight(scheme) {
	currentHighlight = scheme;
	$$('#highlight-link').href = "vendor/hljs/styles/" + scheme + ".min.css";
	localStorageSet('highlight', scheme);
}

// Add scheme options to dropdown selector
schemes.forEach(function (scheme) {
	var option = document.createElement('option');
	option.textContent = scheme;
	option.value = scheme;
	if (option.value == 'background-img') {
		option.disabled = true
	}
	$$('#scheme-selector').appendChild(option);
});

highlights.forEach(function (scheme) {
	var option = document.createElement('option');
	option.textContent = scheme;
	option.value = scheme;
	$$('#highlight-selector').appendChild(option);
});

$$('#scheme-selector').onchange = function (e) {
	setScheme(e.target.value);
}

$$('#highlight-selector').onchange = function (e) {
	setHighlight(e.target.value);
}

// Load sidebar configaration values from local storage if available
if (localStorageGet('scheme')) {
	setScheme(localStorageGet('scheme'));
}

if (localStorageGet('highlight')) {
	setHighlight(localStorageGet('highlight'));
}

$$('#scheme-selector').value = currentScheme;
$$('#highlight-selector').value = currentHighlight;

/* main */

if (myChannel == '') {
	pushMessage({ text: homeText });
	$$('#footer').classList.add('hidden');
	$$('#sidebar').classList.add('hidden');
} else {
	join(myChannel);
}

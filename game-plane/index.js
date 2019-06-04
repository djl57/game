var btg = $("battleground");
var Pause = $("Pause");
var cGame = $("consoleGame");
var scoresBox = $("scores");
var gameOver = $("gameOver");
var overImg = $("overImg");
var fPath = $("data_middle");
var overTit = $("overTit");
var home = $("home");
var restart = $("restart");
var nowHp = $("nowHp");
var bgRed = $("bgRed");
var bossView = $("boss");
var bossHp = $("bossNowHp");
var startGround = $("startGround")
var paih = $("paih")
var paihGround = $("paihGround")
var closePaih = $("closePaih")
var rule = $("rule")
var ruleGround = $("ruleGround")
var closeRule = $("closeRule")
var scoreWrap = $("scoreWrap")
var selectGame = $("selectGame")
var easy = $("easy")
var hard = $("hard")
var cPlane = btg.getElementsByClassName("hostilePlane");
var cBoss = btg.getElementsByClassName("boss");
var isPause = false;
var flightDistance = 0;
var scores = 0;
var bulletSpeed = 10;
var probability = 40;
var bulletLevel = 2;
var planeLevel = 0;
var bulletRows = 1;
var isDie = false;
var userHP = 100;
var times;
var myPlane;
var plane = [
	{
		width: 116,
		height: 92,
		positionX: -393,
		positionY: -102,
		background: "url(img/img_plane_main.png)"
	}, {
		width: 116,
		height: 94,
		positionX: -127,
		positionY: -107,
		background: "url(img/img_plane_main.png)"
	}, {
		width: 118,
		height: 100,
		positionX: -393,
		positionY: 0,
		background: "url(img/img_plane_main.png)"
	}, {
		width: 130,
		height: 106,
		positionX: -137,
		positionY: 0,
		background: "url(img/img_plane_main.png)"
	}
];
var bullet = [
	{
		width: 14,
		height: 32,
		speed: 10,
		positionX: -335,
		positionY: -171,
		background: "url(img/img_bullet.png)"
	}, {
		width: 14,
		height: 32,
		speed: 4,
		positionX: -335,
		positionY: -171,
		background: "url(img/img_bullet.png)"
	}
];
var easyhPlanes = [
	{
		width: 98,
		height: 76,
		speed: 5,
		score: 100,
		positionX: -267,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 1
	}, {
		width: 104,
		height: 76,
		speed: 5,
		score: 100,
		positionX: -162,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 1
	}, {
		width: 114,
		height: 82,
		speed: 20,
		score: 1000,
		positionX: -367,
		positionY: -440,
		background: "url(img/img_plane_enemy.png)",
		HP: 2
	}, {
		width: 104,
		height: 76,
		speed: 5,
		score: 200,
		positionX: -162,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 2
	}, {
		width: 175,
		height: 133,
		speed: 4,
		score: 500,
		positionX: -190,
		positionY: -340,
		background: "url(img/img_plane_enemy.png)",
		HP: 5
	}, {
		width: 260,
		height: 196,
		speed: 3,
		score: 2000,
		positionX: 0,
		positionY: -2,
		background: "url(img/img_plane_enemy.png)",
		HP: 20
	}
];
var hardhPlanes = [
	{
		width: 98,
		height: 76,
		speed: 10,
		score: 100,
		positionX: -267,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 2
	}, {
		width: 104,
		height: 76,
		speed: 10,
		score: 100,
		positionX: -162,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 2
	}, {
		width: 114,
		height: 82,
		speed: 30,
		score: 1000,
		positionX: -367,
		positionY: -440,
		background: "url(img/img_plane_enemy.png)",
		HP: 3
	}, {
		width: 104,
		height: 76,
		speed: 10,
		score: 200,
		positionX: -162,
		positionY: -474,
		background: "url(img/img_plane_enemy.png)",
		HP: 3
	}, {
		width: 175,
		height: 133,
		speed: 8,
		score: 500,
		positionX: -190,
		positionY: -340,
		background: "url(img/img_plane_enemy.png)",
		HP: 5
	}, {
		width: 260,
		height: 196,
		speed: 6,
		score: 2000,
		positionX: 0,
		positionY: -2,
		background: "url(img/img_plane_enemy.png)",
		HP: 20
	}
];
var hPlanes;
var bosses = [
	{
		width: 306,
		height: 236,
		score: 20000,
		speedX: 1,
		speedY: 1,
		src: "img/img_plane_boss_0.png",
		HP: 50
	}, {
		width: 350,
		height: 234,
		score: 20000,
		speedX: 1,
		speedY: 1,
		src: "img/img_plane_boss_1.png",
		HP: 100
	}, {
		width: 442,
		height: 258,
		score: 20000,
		speedX: 1,
		speedY: 1,
		src: "img/img_plane_boss_2.png",
		HP: 200
	}];
var bombImg = ["wsparticle_06.png", "wsparticle_07.png", "wsparticle_04.png"];
var bulletDrops = [
	{
		index: 1,
		width: 50,
		height: 30,
		src: "img/drop_0.png"
	}, {
		index: 2,
		width: 48,
		height: 30,
		src: "img/drop_1.png"
	}, {
		index: 3,
		width: 28,
		height: 24,
		src: "img/add_hp.png"
	}
];
var hostileBullets = [
	[{
		ATK: 20,
		width: 30,
		height: 30
	},
	["img/h_bullet_10.png", "img/h_bullet_11.png", "img/h_bullet_12.png", "img/h_bullet_13.png"]
	],
	[{
		ATK: 10,
		width: 30,
		height: 30
	},
	["img/h_bullet_20.png", "img/h_bullet_21.png", "img/h_bullet_22.png", "img/h_bullet_23.png"]
	]
];
var historyS
getPaih()
function getPaih() {
	historyS = localStorage.getItem('gamePlaneScores') || '-1'
	localStorage.setItem('gamePlaneScores', historyS)
	let splitS = historyS.split(',')
	scoreWrap.innerHTML = ''
	let len = splitS.length < 5? splitS.length: 5
	for (let i = 0; i < len; i++) {
		const li = document.createElement('li')
		if (splitS[i] === '-1') {
			li.innerHTML = '暂无记录'
		} else {
			li.innerHTML = splitS[i]
		}
		scoreWrap.appendChild(li)
	}
}
function $(id) {
	return document.getElementById(id);
}
cGame.onclick = function () {
	selectGame.style.display = 'block'
	cGame.style.display = 'none'
	cGame.blur();
};
easy.onclick = function() {
	battleground.style.background = 'url(img/img_bg_level_2.png) repeat-y';
	startGame(0);
}
hard.onclick = function() {
	battleground.style.background = 'url(img/img_bg_level_3.png) repeat-y';
	startGame(1);
}
restart.onclick = startGame;
home.onclick = function () {
	startGround.style.display = 'block'
	selectGame.style.display = 'none'
	cGame.style.display = 'block'
	getPaih()
};
Pause.onclick = function () {
	isPause = false;
	Pause.style.display = "none";
}
paih.onclick = function () {
	paihGround.style.display = 'block'
	startGround.style.display = 'none'
}
closePaih.onclick = function () {
	paihGround.style.display = 'none'
	startGround.style.display = 'block'
}
closeRule.onclick = function () {
	ruleGround.style.display = 'none'
	startGround.style.display = 'block'
}
rule.onclick = function () {
	ruleGround.style.display = 'block'
	startGround.style.display = 'none'
}
//初始化
function reset() {
	btg.innerHTML = "";
	flightDistance = 0;
	scores = 0;
	userHP = 100;
	isPause = false;
	isDie = false;
	bulletRows = 1;
	bulletLevel = 0;
	bulletSpeed = bullet[bulletLevel].speed;
	gameOver.style.display = "none";
	bossView.style.display = "none";
	overTit.getElementsByTagName("img")[0].style.display = "none";
	nowHp.style.width = "100px";
	startGround.style.display = 'none'
}
function resetMyPlane() {
	var startTop = 600;
	var startLeft = 256 - plane[planeLevel].width / 2;
	createPlane(planeLevel, plane, startTop, startLeft);
	document.onmousemove = function (e) {
		e = e || window.event;
		if (!isPause) {
			movePlane(e);
		}
	}
}
function startGame(mode) {
	if(mode) {
		hPlanes = hardhPlanes
	} else {
		hPlanes = easyhPlanes
	}
	reset();//初始化
	resetMyPlane();
	clearInterval(times);
	times = setInterval(function () {
		if (!isPause) {
			btg.style.backgroundPosition = "0px " + flightDistance + "px";
			flightDistance++; //飞行路程
			scores += 1;
			createScores(scores, scoresBox);
			if (flightDistance % bulletSpeed == 0) {
				createBulletRows(bulletRows, bulletLevel) //创建子弹
			}
			moveBullet(); //移动子弹
			chooseHostilePlane(); //随机生成敌机
			moveHostilePlane(); //移动敌机
			collideBullte(cPlane); //打中敌机检测
			collideBullte(cBoss);//打中boss
			chooseBoss();//生成boss
			moveBoss(); //boss移动
			myPlaneCollide(cPlane, struckMyPlane); //己方飞机碰撞敌机检测
			myPlaneCollide(cBoss, struckMyPlane); //己方飞机碰撞敌机检测
			var bDrop = btg.getElementsByClassName("bulletDrop");
			myPlaneCollide(bDrop, collideBulletDrop); //掉落 弹药加强 检测
			var hBullet = btg.getElementsByClassName("hBullet");
			myPlaneCollide(hBullet, collideMyPlane) //己方飞机中弹检测
			createflightDistance(flightDistance); //生成公里数
		}
	}, 20);
	document.onkeydown = function (e) {
		e = e || window.event;
		if (e.keyCode == 32) {
			isPause = true;
			Pause.style.display = "block";
			Pause.style.left = parseInt(myPlane.style.left) + 32 + "px";
			Pause.style.top = parseInt(myPlane.style.top) + 26 + "px";
		}
	}
}
//己方飞机受伤
function beInjured() {
	bgRed.style.display = "block";
	setTimeout(function () {
		bgRed.style.display = "none";
	}, 150);
}
//己方飞机碰撞敌机处理
function struckMyPlane(hElement) {
	if (userHP > 50) {
		userHP -= 50;
		beInjured();
		nowHp.style.width = userHP + "px";
		if (hElement.className == "hostilePlane") {
			bomb(hElement);
		}
	} else {
		beInjured();
		bomb(hElement);
		myPlaneBomb();
	}
}
//生成公里数
function createflightDistance(flightDistance) {
	flightDistance = flightDistance.toString();
	fPath.innerHTML = "";
	if (flightDistance.length < 4) {
		var fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_1.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		for (var i = flightDistance.length - 1; i >= 0; i--) {
			fPathImg = document.createElement("img");
			fPathImg.src = "img/path_" + flightDistance[i] + ".png";
			fPath.appendChild(fPathImg);
		}
	} else {
		var fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_1.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_2.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		for (var i = flightDistance.length - 2; i >= 0; i--) {
			if (i == flightDistance.length - 4) {
				fPathImg = document.createElement("img");
				fPathImg.src = "img/dian.png";
				fPathImg.style.width = "12px";
				fPathImg.style.marginTop = "5px";
				fPath.appendChild(fPathImg);
			}
			fPathImg = document.createElement("img");
			fPathImg.src = "img/path_" + flightDistance[i] + ".png";
			fPath.appendChild(fPathImg);
		}
	}
}
//打中敌机检测
function collideBullte(cPlane) {
	var bullets = btg.getElementsByClassName("myBullet");
	//子弹碰撞检测
	for (var i = 0; i < bullets.length; i++) {
		for (var j = 0; j < cPlane.length; j++) {
			if (!bullets[i]) {
				continue;
			}
			var bLeft = parseInt(bullets[i].style.left);
			var bTop = parseInt(bullets[i].style.top);
			var hLeft = parseInt(cPlane[j].style.left);
			var hTop = parseInt(cPlane[j].style.top);
			var bHeight = parseInt(bullets[i].offsetHeight);
			var bWidth = parseInt(bullets[i].offsetWidth);
			var hHeight = parseInt(cPlane[j].offsetHeight);
			var hWidth = parseInt(cPlane[j].offsetWidth);
			if (cPlane[j].HP > 0 && bLeft > hLeft - bWidth && bLeft < hLeft + hWidth && bTop < hTop + hHeight - bHeight && bTop > hTop - bHeight) {
				btg.removeChild(bullets[i]);
				cPlane[j].HP--;
				if (cPlane[j].className == "boss") {
					bossHp.style.width = Math.ceil(cPlane[j].HP / cPlane[j].maxHP * 120) + "px";
				}
				if (cPlane[j].HP <= 0) {
					scores = scores + cPlane[j].score;
					createScores(scores, scoresBox); //生成分数
					if (cPlane[j].className == "boss") {
						bossView.style.display = "none";
					}
					bomb(cPlane[j]);
				}
			}
		}
	}
}
//己方飞机爆炸处理
function myPlaneBomb() {
	bomb(myPlane);
	var localScore
	if (historyS === '-1') {
		localScore = scores
	} else {
		localScore = scores + ',' + historyS
	}
	localStorage.setItem("gamePlaneScores", localScore)
	overTit.getElementsByTagName("img")[0].style.display = "block";
	createScores(scores, overImg);
	gameOver.style.display = "block";
	isDie = true;
	clearInterval(times);
}
//生成分数
function createScores(scores, sElement) {
	scores = scores.toString();
	sElement.innerHTML = "";
	for (var i = 0; i < scores.length; i++) {
		var scoresImg = document.createElement("img");
		scoresImg.src = "img/number_" + scores[i] + ".png";
		sElement.appendChild(scoresImg);
	}
}
//吃到弹药处理
function collideBulletDrop(dElement) {
	switch (dElement.index) {
		case 1:
			{
				bulletSpeed -= 2;
				if (bulletSpeed < 2) {
					bulletSpeed = 2;
				}
				break;
			}
		case 2:
			{
				if (bulletRows < 4) {
					bulletRows++;
					var oLeft = myPlane.offsetLeft;
					var oTop = myPlane.offsetTop;
					btg.removeChild(myPlane);
					createPlane(bulletRows - 1, plane, oTop, oLeft);
				}
				break;
			}
		case 3:
			{
				if (userHP < 100) {
					userHP += 20;
					userHP = Math.min(userHP, 100);
					nowHp.style.width = userHP + "px";
				}
				break;
			}
	}
	btg.removeChild(dElement);
}
//己方飞机碰撞检测
function myPlaneCollide(sth, fn) {
	//飞机碰撞检测
	for (var j = 0; j < sth.length; j++) {
		var hLeft = parseInt(sth[j].style.left);
		var hTop = parseInt(sth[j].style.top);
		var hHeight = parseInt(sth[j].offsetHeight);
		var hWidth = parseInt(sth[j].offsetWidth);
		var mLeft = parseInt(myPlane.style.left);
		var mTop = parseInt(myPlane.style.top);
		var mHeight = parseInt(myPlane.offsetHeight);
		var mWidth = parseInt(myPlane.offsetWidth);
		if (mLeft + Math.floor(mWidth / 3 * 2) > hLeft && ((mLeft + mWidth / 3 * 1) < hLeft + hWidth) && mTop < hTop + hHeight / 2 && (mTop > hTop - mHeight / 2)) {
			fn(sth[j]);
		}
	}
}
//己方飞机中弹处理
function collideMyPlane(hBelement) {
	nowHp.style.width = parseInt(nowHp.style.width) - hBelement.ATK + "px";
	userHP -= hBelement.ATK;
	beInjured();
	if (userHP <= 0) {
		myPlaneBomb();
	}
	if (bulletSpeed < 10) {
		bulletSpeed += 2;
	}
	if (bulletRows > 1) {
		bulletRows--;
		var oLeft = myPlane.offsetLeft;
		var oTop = myPlane.offsetTop;
		btg.removeChild(myPlane);
		createPlane(bulletRows - 1, plane, oTop, oLeft);
	}
	bomb(hBelement);
}
//飞机爆炸
function bomb(bombPlane) {
	bombPlane.className = "bombPlane";
	bombPlane.style.backgroundImage = "url(img/" + bombImg[0] + ")";
	bombPlane.style.backgroundPosition = "center";
	bombPlane.style.backgroundRepeat = "no-repeat";
	var index = 1;
	clearInterval(bombPlane.times);
	bombPlane.times = setInterval(function () {
		bombPlane.style.backgroundImage = "url(img/" + bombImg[index] + ")";
		index++;
		if (index == 3) {
			chooseCreateDrop(bombPlane, probability) //生成掉落物 probability可能性
			clearInterval(bombPlane.times);
			try {
				btg.removeChild(bombPlane);
			} catch (e) {
				// handle the exception
			}
		}
	}, 50);
}
//移动敌机
function moveHostilePlane() {
	var hPlanes = btg.getElementsByClassName("hostilePlane");
	for (var i = 0; i < hPlanes.length; i++) {
		hPlanes[i].style.top = parseInt(hPlanes[i].style.top) + hPlanes[i].speed + "px";
		if (parseInt(hPlanes[i].style.top) > 675) {
			btg.removeChild(hPlanes[i]);
		}
	}
}
//随机生成掉落物
function chooseCreateDrop(bombPlane, probability) {
	var hTop = parseInt(bombPlane.style.top) + parseInt(bombPlane.offsetHeight) / 2;
	var hLeft = parseInt(bombPlane.style.left) + parseInt(bombPlane.offsetWidth) / 2;
	var level = Math.floor(Math.random() * (probability + 1));
	createDrop(hTop, hLeft, bulletDrops, level);
}
//创建掉落物
function createDrop(dTop, dLeft, arrDrop, level) {
	if (level > arrDrop.length - 1) {
		return;
	}
	var drop = document.createElement("img");
	drop.style.width = arrDrop[level].width + "px";
	drop.style.height = arrDrop[level].height + "px";
	drop.src = arrDrop[level].src;
	drop.index = arrDrop[level].index;
	drop.className = "bulletDrop";
	drop.style.position = "absolute";
	drop.style.top = dTop - arrDrop[level].height / 2 + "px";
	drop.style.left = dLeft - arrDrop[level].width / 2 + "px";
	btg.appendChild(drop);
	moveDrop(drop);
}
//移动掉落物
function moveDrop(dElement) {
	var xSpeed = Math.floor(Math.random() * 9) - 4;
	var ySpeed = -Math.floor(Math.random() * 10);
	var aSpeedY = 1;
	clearInterval(dElement.times);
	dElement.times = setInterval(function () {
		if (!isPause) {
			dElement.style.top = parseInt(dElement.style.top) + ySpeed + "px";
			dElement.style.left = parseInt(dElement.style.left) + xSpeed + "px";
			//aSpeedY++;
			if (ySpeed < 5) {
				ySpeed += aSpeedY;
			}
			if (parseInt(dElement.style.left) <= 0 || parseInt(dElement.style.left) >= 450 - dElement.offsetWidth) {
				xSpeed = xSpeed * -1;
			}
			if (parseInt(dElement.style.top) > 675) {
				clearInterval(dElement.times);
			}
		}
	}, 20)
}
//随机生成敌机
function chooseHostilePlane() {
	var pLeft = 0;
	var hp;
	if (flightDistance % 700 == 0) {
		pLeft = Math.floor(Math.random() * (451 - hPlanes[5].width));
		hp = createHostilePlane(pLeft, hPlanes, 5);
		var rows = 0;
		clearInterval(hp.times);
		hp.times = setInterval(function () {
			if (!isPause) {
				rows++;
				createSectorBullet(hp, 1);
				if (rows > 1 || isDie || (hp.HP == 0)) {
					clearInterval(hp.times);
				}
			}
		}, 500);
	} else if (flightDistance % 300 == 0) {
		pLeft = Math.floor(Math.random() * (451 - hPlanes[4].width));
		createHostilePlane(pLeft, hPlanes, 4)
	} else if (flightDistance % 150 == 0) {
		pLeft = Math.floor(Math.random() * (451 - hPlanes[2].width));
		createHostilePlane(pLeft, hPlanes, 2)
	} else if (flightDistance % 75 == 0) {
		pLeft = Math.floor(Math.random() * (451 - hPlanes[1].width));
		createHostilePlane(pLeft, hPlanes, 1)
	} else if (flightDistance % 30 == 0) {
		pLeft = Math.floor(Math.random() * (451 - hPlanes[0].width));
		createHostilePlane(pLeft, hPlanes, 0);
	}
}
//移动boss
function moveBoss() {
	var boss = btg.getElementsByClassName("boss");
	for (var i = 0; i < boss.length; i++) {
		boss[i].style.top = parseInt(boss[i].style.top) + boss[i].speedY + "px";
		boss[i].style.left = parseInt(boss[i].style.left) + boss[i].speedX + "px";
		if (parseInt(boss[i].style.top) >= 100 || parseInt(boss[i].style.top) <= -100) {
			boss[i].speedY = boss[i].speedY * -1;
		}
		if (parseInt(boss[i].style.left) >= (450 - boss[i].offsetWidth) || parseInt(boss[i].style.left) <= 0) {
			boss[i].speedX = boss[i].speedX * -1;
		}
	}
}
//生成boss的位置
function chooseBoss() {
	var pLeft = 0;
	var hp;
	if (flightDistance % 10000 == 0) {
		pLeft = Math.floor((450 - bosses[2].width) / 2);
		hp = createBoss(pLeft, bosses, 2);
		clearInterval(hp.times);
		hp.times = setInterval(function () {
			if (!isPause) {
				createSectorBullet(hp, 1);
				if (isDie || (hp.HP == 0)) {
					clearInterval(hp.times);
				}
			}
		}, 1000);
	} else if (flightDistance == 6000) {
		pLeft = Math.floor((450 - bosses[1].width) / 2);
		hp = createBoss(pLeft, bosses, 1);
		clearInterval(hp.times);
		hp.times = setInterval(function () {
			if (!isPause) {
				createSectorBullet(hp, 1);
				if (isDie || (hp.HP == 0)) {
					clearInterval(hp.times);
				}
			}
		}, 1000);
	} else if (flightDistance == 3000) {
		pLeft = Math.floor((450 - bosses[0].width) / 2);
		hp = createBoss(pLeft, bosses, 0);
		clearInterval(hp.times);
		hp.times = setInterval(function () {
			if (!isPause) {
				createSectorBullet(hp, 1);
				if (isDie || (hp.HP == 0)) {
					clearInterval(hp.times);
				}
			}
		}, 1000);
	}
}
//创建boss
function createBoss(pLeft, bosses, level) {
	var boss = document.createElement("img");
	bossView.style.display = "block";
	boss.style.width = bosses[level].width + "px";
	boss.style.height = bosses[level].height + "px";
	boss.src = bosses[level].src;
	boss.HP = bosses[level].HP * Math.ceil(flightDistance / 1000);
	boss.maxHP = boss.HP;
	boss.score = bosses[level].score;
	boss.className = "boss";
	boss.speedX = bosses[level].speedX;
	boss.speedY = bosses[level].speedY;
	boss.style.position = "absolute";
	boss.style.top = "10px";
	boss.style.left = pLeft + "px";
	btg.appendChild(boss);
	return boss;
}
//创建一颗敌方子弹
function createHostileBullet(bLeft, bTop, hostileBullet) { //坐标 和 子弹对象
	var hBullet = document.createElement("img");
	hBullet.className = "hBullet";
	hBullet.style.width = hostileBullet[0].width + "px";
	hBullet.style.height = hostileBullet[0].height + "px";
	hBullet.ATK = hostileBullet[0].ATK;
	hBullet.style.position = "absolute";
	hBullet.style.top = bTop + "px";
	hBullet.style.left = bLeft + "px";
	hBullet.index = 0;
	hBullet.src = hostileBullet[1][0];
	clearInterval(hBullet.times);
	hBullet.times = setInterval(function () {
		if (!isPause) {
			hBullet.index++;
			if (hBullet.index > 3) {
				hBullet.index = 0;
			}
			hBullet.src = hostileBullet[1][hBullet.index];
			if (parseInt(hBullet.style.top) >= 675 || parseInt(hBullet.style.left) <= -parseInt(hBullet.style.width) || parseInt(hBullet.style.left) >= 450) {
				clearInterval(hBullet.times);
			}
		}
	}, 200);
	btg.appendChild(hBullet);
	return hBullet;
}
//移动敌方子弹
function moveHostileBullet(xV, yV, hElement) { //x轴速度 y轴速度  定时器+自清除
	clearInterval(hElement.times2);
	hElement.times2 = setInterval(function () {
		if (!isPause) {
			hElement.style.top = parseInt(hElement.style.top) + yV + "px";
			hElement.style.left = parseInt(hElement.style.left) + xV + "px";
			if (isDie || parseInt(hElement.style.top) >= 675 || parseInt(hElement.style.left) <= -parseInt(hElement.style.width) || parseInt(hElement.style.left) >= 450) {
				clearInterval(hElement.times2);
				try {
					btg.removeChild(hElement);
				} catch (e) {
				}
			}
		}
	}, 30);
}
//生产扇形子弹
function createSectorBullet(HostilePlane, bLevel) { //敌方飞机对象  根据敌方飞机生成扇形子弹
	var hLeft = HostilePlane.offsetLeft;
	var hTop = HostilePlane.offsetTop;
	var hWidth = HostilePlane.offsetWidth;
	var hHeight = HostilePlane.offsetHeight;
	var bSpace = Math.floor(hWidth / 5);
	var hb = createHostileBullet(hLeft, hTop + hHeight / 2, hostileBullets[bLevel]);
	moveHostileBullet(-2, 8, hb);
	hb = createHostileBullet(hLeft + bSpace, hTop + hHeight / 2 + 30, hostileBullets[bLevel]);
	moveHostileBullet(-1, 8, hb);
	hb = createHostileBullet(hLeft + bSpace * 2, hTop + hHeight / 2 + 45, hostileBullets[bLevel]);
	moveHostileBullet(0, 8, hb);
	hb = createHostileBullet(hLeft + bSpace * 3, hTop + hHeight / 2 + 30, hostileBullets[bLevel]);
	moveHostileBullet(1, 8, hb);
	hb = createHostileBullet(hLeft + bSpace * 4, hTop + hHeight / 2, hostileBullets[bLevel]);
	moveHostileBullet(2, 8, hb);
}
//创建敌机
function createHostilePlane(pLeft, hPlanes, level) {
	var hPlane = document.createElement("div");
	hPlane.style.width = hPlanes[level].width + "px";
	hPlane.style.height = hPlanes[level].height + "px";
	hPlane.style.background = hPlanes[level].background;
	hPlane.style.backgroundPosition = hPlanes[level].positionX + "px " + hPlanes[level].positionY + "px";
	hPlane.HP = hPlanes[level].HP * Math.ceil(flightDistance / 1000);
	hPlane.score = hPlanes[level].score;
	hPlane.speed = hPlanes[level].speed;
	hPlane.className = "hostilePlane";
	hPlane.style.position = "absolute";
	hPlane.style.top = -hPlanes[level].height + "px";
	hPlane.style.left = pLeft + "px";
	btg.appendChild(hPlane);
	return hPlane;
}
//创建n排子弹
function createBulletRows(rows, level) {
	switch (rows) {
		case 1:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
				createBullet(createTop, createLeft, level);
				break;
			}
		case 2:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
				createBullet(createTop, createLeft, level);
				break;
			}
		case 3:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
				createBullet(createTop, createLeft, level);
				createTop = parseInt(myPlane.style.top) + 20;
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
				createBullet(createTop, createLeft, level);
				createTop = parseInt(myPlane.style.top) + 20;
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
				createBullet(createTop, createLeft, level);
				break;
			}
		case 4:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 8;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 22;
				createBullet(createTop, createLeft, level);
				var createTop = parseInt(myPlane.style.top) + 20;
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 38;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 52;
				createBullet(createTop, createLeft, level);
				break;
			}
	}

}
//创建1个子弹
function createBullet(bTop, bLeft, level) {
	var myBullet = document.createElement("div");
	myBullet.className = "myBullet";
	myBullet.style.width = bullet[level].width + "px";
	myBullet.style.height = bullet[level].height + "px";
	myBullet.style.background = bullet[level].background;
	myBullet.style.backgroundPosition = bullet[level].positionX + "px " + bullet[level].positionY + "px";
	myBullet.style.position = "absolute";
	myBullet.style.top = bTop + "px";
	myBullet.style.left = bLeft + "px";
	btg.appendChild(myBullet);
}
//移动子弹
function moveBullet() {
	var bullets = btg.getElementsByClassName("myBullet");
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].style.top = parseInt(bullets[i].style.top) - parseInt(bullets[0].style.height) + "px";
		//删除多余子弹
		if (parseInt(bullets[i].style.top) < -parseInt(bullets[0].style.height)) {
			btg.removeChild(bullets[i]);
		}
	}
}
//己方飞机移动
function movePlane(e) {
	var planeX = e.clientX - btg.offsetLeft - myPlane.offsetWidth / 2;
	var planeY = e.clientY - btg.offsetTop - myPlane.offsetHeight / 2;
	var btgWidth = btg.offsetWidth;
	var btgHeight = btg.offsetHeight;
	planeX = Math.min(Math.max(planeX, -myPlane.offsetWidth / 2), btgWidth - myPlane.offsetWidth / 2);
	planeY = Math.min(Math.max(planeY, -myPlane.offsetHeight / 2), btgHeight - myPlane.offsetHeight / 2);
	myPlane.style.top = planeY + "px";
	myPlane.style.left = planeX + "px";
}
//创建己方飞机
function createPlane(level, plane, oTop, oLeft) {
	myPlane = document.createElement("div");
	myPlane.style.width = plane[level].width + "px";
	myPlane.style.height = plane[level].height + "px";
	myPlane.style.background = plane[level].background;
	myPlane.style.backgroundPosition = plane[level].positionX + "px " + plane[level].positionY + "px";
	myPlane.style.position = "absolute";
	myPlane.style.zIndex = 99;
	myPlane.style.top = oTop + "px";
	myPlane.style.left = oLeft + "px";
	btg.appendChild(myPlane);
}

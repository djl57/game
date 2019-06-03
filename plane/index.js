class Plane {
  constructor() {
    this.btg = this.$("battleground") // 游戏开始后背景图
    this.Pause = this.$("Pause") // 暂停
    this.cGame = this.$("consoleGame") // 游戏开始
    this.scoresBox = this.$("scores") // 当前分数
    this.gameOver = this.$("gameOver") // 游戏结束
    this.overImg = this.$("overImg") // 游戏结束得分
    this.fPath = this.$("data_middle") // 行进路程
    this.overTit = this.$("overTit") // 游戏结束提示语
    this.maxScores = this.$("maxScores") // 本周最高分
    this.restart = this.$("restart") // 重新开始
    this.nowHp = this.$("nowHp") // 当前血量
    this.bgRed = this.$("bgRed") // 飞机受伤背景
    this.bossView = this.$("boss")
    this.bossHp = this.$("bossNowHp")
    this.isPause = false // 暂停判断
    this.flightPath = 0 // 飞行路程
    this.scores = 0 // 得分
    this.bulletSpeed = 10 // 子弹速度
    this.probability = 40 // 掉落物概率 总掉落率 = 掉落物种类/probability
    this.bulletLevel = 0 // 子弹等级
    this.planeLevel = 0 // 飞机等级
    this.bulletRows = 1 // 子弹排数
    this.isDie = false // 飞机是否死亡
    this.userHP = 100 // 用户血量
    this.times = null
    this.myPlane = null
    this.plane = [ // 本机 1级 - 4级
      { width: 116, height: 92, positionX: -393, positionY: -102, background: "url(img/img_plane_main.png)" },
      { width: 116, height: 94, positionX: -127, positionY: -107, background: "url(img/img_plane_main.png)" },
      { width: 118, height: 100, positionX: -393, positionY: 0, background: "url(img/img_plane_main.png)" },
      { width: 130, height: 106, positionX: -137, positionY: 0, background: "url(img/img_plane_main.png)" }
    ]
    this.bullet = [ // 相同子弹 速度不同 
      { width: 14, height: 32, speed: 10, positionX: -335, positionY: -171, background: "url(img/img_bullet.png)" },
      { width: 14, height: 32, speed: 4, positionX: -335, positionY: -171, background: "url(img/img_bullet.png)" }
    ]
    this.hPlanes = [ // 敌机 速度不停 得分不同 血量不同
      { width: 98, height: 76, speed: 5, score: 100, positionX: -267, positionY: -474, background: "url(img/img_plane_enemy.png)", HP: 1 },
      { width: 104, height: 76, speed: 5, score: 100, positionX: -162, positionY: -474, background: "url(img/img_plane_enemy.png)", HP: 1 },
      { width: 114, height: 82, speed: 20, score: 1000, positionX: -367, positionY: -440, background: "url(img/img_plane_enemy.png)", HP: 2 },
      { width: 104, height: 76, speed: 5, score: 200, positionX: -162, positionY: -474, background: "url(img/img_plane_enemy.png)", HP: 2 },
      { width: 175, height: 133, speed: 4, score: 500, positionX: -190, positionY: -340, background: "url(img/img_plane_enemy.png)", HP: 5 },
      { width: 260, height: 196, speed: 3, score: 2000, positionX: 0, positionY: -2, background: "url(img/img_plane_enemy.png)", HP: 20 }
    ]
    this.bosses = [ // 敌机boss 血量不同
      { width: 306, height: 236, score: 20000, speedX: 1, speedY: 1, src: "img/img_plane_boss_0.png", HP: 50 },
      { width: 350, height: 234, score: 20000, speedX: 1, speedY: 1, src: "img/img_plane_boss_1.png", HP: 100 },
      { width: 442, height: 258, score: 20000, speedX: 1, speedY: 1, src: "img/img_plane_boss_2.png", HP: 200 }
    ]
    this.bombImg = [ // 爆炸
      "wsparticle_06.png",
      "wsparticle_07.png",
      "wsparticle_04.png"
    ]
    this.bulletDrops = [ // 掉落物
      { index: 1, width: 50, height: 30, src: "img/drop_0.png" },
      { index: 2, width: 48, height: 30, src: "img/drop_1.png" },
      { index: 3, width: 28, height: 24, src: "img/add_hp.png" },
      // { id: 4, width: 46, height: 40, src: "img/drop_2.png" },
      // { id: 5, width: 48, height: 46, src: "img/drop_3.png" }
    ]
    this.hostileBullets = [ // 敌方子弹
      [
        { ATK: 20, width: 30, height: 30 },
        ["img/h_bullet_10.png", "img/h_bullet_11.png", "img/h_bullet_12.png", "img/h_bullet_13.png"]
      ],
      [
        { ATK: 10, width: 30, height: 30 },
        ["img/h_bullet_20.png", "img/h_bullet_21.png", "img/h_bullet_22.png", "img/h_bullet_23.png"]
      ]
    ]
    // this.show(this.hostileBullets[0][1])
    this.cGameClick()
    this.restartClick()
    this.PauseClick()
    this.cPlane = this.btg.getElementsByClassName("hostilePlane");
    this.cBoss = this.btg.getElementsByClassName("boss")
  }
  $(id) {
    return document.getElementById(id);
  }
  createEl(el) {
    return document.createElement(el)
  }
  cGameClick() {
    this.cGame.onclick = () => {
      this.startGame()
      this.cGame.blur() // 失去焦点
    }
  }
  restartClick() {
    this.restart.onclick = this.startGame
  }
  PauseClick() {
    this.Pause.onclick = () => {
      this.isPause = false
      Pause.style.display = "none"
    }
  }
  // 重置
  reset() {
    this.btg.innerHTML = "" // 游戏背景图为空
    this.flightPath = 0 // 飞行路程归0
    this.scores = 0 // 得分归0
    this.userHP = 100 // 用户血量归满
    this.isPause = false // 非暂停状态
    this.isDie = false // 非死亡状态
    this.bulletRows = 1 // 子弹排数归1
    this.bulletLevel = 0 // 子弹等级归0
    this.bulletSpeed = this.bullet[this.bulletLevel].speed // 子弹速度
    this.gameOver.style.display = "none" // 不显示游戏结束界面
    this.bossView.style.display = "none" // 不显示敌机boss
    this.overTit.getElementsByTagName("img")[0].style.display = "none" // 不显示游戏结束的提示语
    this.overTit.getElementsByTagName("img")[1].style.display = "none" // 不显示游戏结束的提示语
    this.nowHp.style.width = "100px"
  }
  resetMyPlane() {
    // 本机离顶部600px，且水平居中
    let startTop = 600;
    let startLeft = 256 - this.plane[this.planeLevel].width / 2;
    this.createPlane(this.planeLevel, this.plane, startTop, startLeft);
    document.onmousemove = function (e) {
      e = e || window.event;
      if (!isPause) {
        this.movePlane(e);
      }
    }
  }
  startGame() {
    this.reset()
    this.resetMyPlane()
    let max = /* cookieUtil.getCookie("scores") || */ 0
    this.createScores(max, this.maxScores)
    clearInterval(this.times)
    this.times = setInterval(() => {
      if (!isPause) {
        this.btg.style.backgroundPosition = "0px " + this.flightPath + "px"; // 通过改变backgroundPosition来改变背景图的位置，背景图在y方向是重复的
        this.flightPath++; // 每20ms飞行路程+1
        this.scores += 1; // 每20ms得分+1
        this.createScores(this.scores, this.scoresBox); // 将得分显示到页面上
        if (this.flightPath % this.bulletSpeed == 0) { // 当飞行路程是子弹速度的整数倍时创建子弹
          this.createBulletRows(this.bulletRows, this.bulletLevel) // 创建子弹
        }
        this.moveBullet(); // 移动子弹
        this.chooseHostilePlane(); // 随机生成敌机
        this.moveHostilePlane(); // 移动敌机
        this.collideBullte(this.cPlane); // 打中敌机检测
        this.collideBullte(this.cBoss);// 打中boss检测
        this.chooseBoss();// 随机生成boss
        this.moveBoss(); //boss移动
        this.myPlaneCollide(this.cPlane, this.struckMyPlane); // 己方飞机碰撞敌机检测
        this.myPlaneCollide(this.cBoss, this.struckMyPlane); // 己方飞机碰撞敌机boss检测
        this.bDrop = this.btg.getElementsByClassName("bulletDrop");
        this.myPlaneCollide(this.bDrop, this.collideBulletDrop); // 掉落 弹药加强 检测
        this.hBullet = btg.getElementsByClassName("hBullet");
        this.myPlaneCollide(this.hBullet, this.collideMyPlane) // 己方飞机中弹检测
        this.createFlightPath(this.flightPath); // 生成公里数
      }
    }, 20)
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == 32) { // 空格键
        this.isPause = true;
        this.Pause.style.display = "block";
        this.Pause.style.left = parseInt(this.myPlane.style.left) + 32 + "px";
        this.Pause.style.top = parseInt(this.myPlane.style.top) + 26 + "px";
      }
    }
  }
  /* 生成本机 */
  createPlane() {

  }
  /* 移动本机 */
  movePlane() {

  }
  /* 生成分数 */
  createScores(scores, sElement) {
    this.scores = scores.toString();
    sElement.innerHTML = "";
    for (let i = 0; i < this.scores.length; i++) {
      let scoresImg = document.createElement("img");
      scoresImg.src = "img/number_" + this.scores[i] + ".png";
      sElement.appendChild(scoresImg);
    }
  }
  /* 创建子弹 */
  createBulletRows() {

  }
  /* 移动子弹 */
  moveBullet() {

  }
  /* 随机生成敌机 */
  chooseHostilePlane() {

  }
  /* 移动敌机 */
  moveHostilePlane() {

  }
  /* 打中敌机检测，cPlane是所有敌机节点数组 */
  collideBullte(cPlane) {
    this.bullets = btg.getElementsByClassName("myBullet")
    //子弹碰撞检测
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < cPlane.length; j++) {
        if (!this.bullets[i]) { // 这个节点不存在
          continue; // 结束本次循环
        }
        let bLeft = parseInt(this.bullets[i].style.left);
        let bTop = parseInt(this.bullets[i].style.top);
        let hLeft = parseInt(cPlane[j].style.left);
        let hTop = parseInt(cPlane[j].style.top);
        let bHeight = parseInt(this.bullets[i].offsetHeight);
        let bWidth = parseInt(this.bullets[i].offsetWidth);
        let hHeight = parseInt(cPlane[j].offsetHeight);
        let hWidth = parseInt(cPlane[j].offsetWidth);

        if (cPlane[j].HP > 0 // 敌机的血量大于0
          && bLeft > hLeft - bWidth // 子弹的left大于敌机的left - 子弹的宽度
          && bLeft < hLeft + hWidth  // 子弹的left小于敌机的left + 子弹的宽度
          && bTop < hTop + hHeight - bHeight // 子弹的top小于敌机的top + 敌机的高度 - 子弹的高度
          && bTop > hTop - bHeight) { // 子弹的top大于敌机的top - 子弹的高度
          this.btg.removeChild(bullets[i]); // 才算打中敌机，把敌机移除
          cPlane[j].HP--;
          if (cPlane[j].className == "boss") {
            // 敌机的血量 / 敌机的最大血量 * 120
            this.bossHp.style.width = Math.ceil(cPlane[j].HP / cPlane[j].maxHP * 120) + "px";
          }
          if (cPlane[j].HP <= 0) {
            this.scores = this.scores + cPlane[j].score;
            this.createScores(this.scores, this.scoresBox); //生成分数
            if (cPlane[j].className == "boss") {
              this.bossView.style.display = "none";
            }
            this.bomb(cPlane[j]);
          }
        }
      }
    }
  }
  /* 随机生成boss */
  chooseBoss() {

  }
  /* boss移动 */
  moveBoss() {

  }
  myPlaneCollide() {

  }
  beInjured() {
    this.bgRed.style.display = "block";
    setTimeout(function () {
      this.bgRed.style.display = "none";
    }, 150);
  }
  bomb() {

  }
  myPlaneBomb() {
    this.bomb(myPlane); // 飞机炸掉
    // getScoresMax(userName);
    let max = /* cookieUtil.getCookie("scores") || */ 0;
    if (this.scores > max) { // 获得的分数大于以前的分数
      // cookieUtil.setCookie("scores", scores, 7);
      max = this.scores;
      this.overTit.getElementsByTagName("img")[0].style.display = "block";
    } else {
      this.overTit.getElementsByTagName("img")[1].style.display = "block";
    }
    tthis.createScores(this.scores, this.overImg);
    this.gameOver.style.display = "block";
    //isPause = true;
    this.isDie = true;
    this.clearInterval(this.times);
  }
  /* 己方飞机碰撞敌机检测 */
  struckMyPlane(hEl) {
    if (this.userHP > 50) { // 血量高于50
      this.userHP -= 50;
      this.beInjured();
      this.nowHp.style.width = this.userHP + "px";
      if (hEl.className == "hostilePlane") {
        this.bomb(hEl);
      }
    } else { // 血量低于50
      this.beInjured();
      this.bomb(hEl);
      this.myPlaneBomb();
    }
  }
  /* 碰到 掉落 弹药加强 检测 */
  collideBulletDrop(dElement) {
    switch (dElement.index) {
      case 1:
        {
          this.bulletSpeed -= 2;
          if (this.bulletSpeed < 2) {
            this.bulletSpeed = 2;
          }
          break;
        }
      case 2:
        {
          if (this.bulletRows < 4) {
            this.bulletRows++;
            let oLeft = this.myPlane.offsetLeft;
            let oTop = this.myPlane.offsetTop;
            this.btg.removeChild(this.myPlane);
            this.createPlane(this.bulletRows - 1, this.plane, oTop, oLeft);
          }
          break;
        }
      case 3:
        {
          if (this.userHP < 100) {
            this.userHP += 20;
            this.userHP = Math.min(this.userHP, 100);
            this.nowHp.style.width = this.userHP + "px";
          }
          break;
        }
    }
    this.btg.removeChild(dElement);
  }
  /* 己方飞机中弹检测 */
  collideMyPlane() {

  }
  /* 生成公里数 */
  createFlightPath(flightPath) {
    this.flightPath = flightPath.toString()
    this.fPath.innerHTML = ""
    if (this.flightPath.length < 4) {
      let fPathImg = document.createElement("img");
      fPathImg.src = "img/path_f_1.png"; // "m"
      fPathImg.style.width = "20px";
      this.fPath.appendChild(fPathImg);
      for (let i = this.flightPath.length - 1; i >= 0; i--) {
        fPathImg = document.createElement("img");
        fPathImg.src = "img/path_" + this.flightPath[i] + ".png"; // 2,1,0
        this.fPath.appendChild(fPathImg);
      }
    } else {
      let fPathImg = document.createElement("img");
      fPathImg.src = "img/path_f_1.png"; // 'm'
      fPathImg.style.width = "20px";
      this.fPath.appendChild(fPathImg);
      fPathImg = document.createElement("img");
      fPathImg.src = "img/path_f_2.png"; // 'k'
      fPathImg.style.width = "20px";
      this.fPath.appendChild(fPathImg);
      for (let i = this.flightPath.length - 2; i >= 0; i--) {
        if (i == this.flightPath.length - 4) {
          fPathImg = document.createElement("img");
          fPathImg.src = "img/dian.png";
          fPathImg.style.width = "12px";
          fPathImg.style.marginTop = "5px";
          this.fPath.appendChild(fPathImg);
        }
        fPathImg = document.createElement("img");
        fPathImg.src = "img/path_" + this.flightPath[i] + ".png";
        this.fPath.appendChild(fPathImg);
      }
    }
  }
  // show(item) {
  //   const ulist = this.$("ulist")
  //   item.forEach((el, i) => {
  //     const img = this.createEl('img')
  //     // img.width = el.width
  //     // img.height = el.height
  //     // img.src = el.src
  //     // img.src = 'img/' + el
  //     img.src = el
  //     // img.style.background = el.background
  //     // img.style.backgroundPosition = `${el.positionX}px ${el.positionY}px`
  //     ulist.appendChild(img)
  //   })
  // }
}

new Plane()
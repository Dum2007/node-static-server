
var HEIGHT = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
var WIDTH = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
var ASPECT = WIDTH / HEIGHT;
// var Config = require('./Config');
// var Text = require('./Text');

var GameUI = function (scene, camera, full2D, game) {
    var that = this;
    this.game = game;
    this.full2D = full2D;
    this.scene = scene;
    this.camera = camera;
    this.score = 0;
    this.double = 1;

    this.scoreText = new THREE.Text('0', { fillStyle: 0x252525, sumScore: true, opacity: 0.8 });
    this.scoreText.obj.position.set(0, 21, -10);
    //this.scoreText.obj.scale.set(1.4, 1.4, 1.4);
    this.scoreText.obj.updateMatrix();
    this.scoreText.obj.matrixAutoUpdate = false;
    this.camera.add(this.scoreText.obj);
    this.quickText = new THREE.Text('好快！', { fillStyle: 0x252525, chinese: true });
    this.quickText.obj.position.set(-13, 18, -10);
    this.quickText.obj.updateMatrix();
    this.quickText.obj.matrixAutoUpdate = false;
    this.quickText.obj.visible = false;
    this.perfectText = new THREE.Text('很好！', { fillStyle: 0x252525, chinese: true });
    this.perfectText.obj.position.set(-13, 16, -10);
    this.perfectText.obj.updateMatrix();
    this.perfectText.obj.matrixAutoUpdate = false;
    this.perfectText.obj.visible = false;
    this.camera.add(this.quickText.obj);
    this.camera.add(this.perfectText.obj);
}

GameUI.prototype.reset = function () {
    this.scoreText.setScore(0);
    //var bonus = this.gameOverPage.getObjectByName('bonus');
    //if (bonus) this.gameOverPage.remove(bonus);
    //this.camera.remove(this.gameOverPage);
    //this.bgAudio.currentTime = 0;
    //this.bgAudio.play();
    this.score = 0;
    this.double = 1;
    this.perfectText.obj.visible = false;
    this.quickText.obj.visible = false;
}
GameUI.prototype.update = function () {
    
}
GameUI.prototype.hideScore = function () {
    this.scoreText.obj.visible = false;
}
GameUI.prototype.showScore = function () {
    this.scoreText.obj.visible = true;
}
GameUI.prototype.addScore = function (score, double, quick, keepDouble) {
    if (keepDouble) {
        this.score += score;
        this.setScore(this.score);
        return;
    }
    if (double) {
        if (this.double === 1) this.double = 2;else this.double += 2;
    } else {
        this.double = 1;
    }
    if (quick && this.double <= 2) {
        this.double *= 2;
    }
    this.double = Math.min(32, this.double);
    score = score * this.double;
    this.score += score;
    this.setScore(this.score);
    // var showToast = Math.random() < 0.4;
    // if (double && showToast && (this.game.mode != 'observe')) {
    // 	//this.perfectText.obj.scale.set(0, 0, 0)
    // 	//TweenMax.to(this.perfectText.obj.scale, 0.4, { x: 0.8, y: 0.8, z: 0.8  });
    // 	var text = ['太棒了！', '很好！', '稳住！'];
    // 	//this.perfectText.setText(text[Math.floor(Math.random() * 3)]);
    // 	this.perfectText.obj.visible = true;
    // 	customAnimation.to(this.perfectText.material, 0.4, { opacity: 1 });
    // 	customAnimation.to(this.perfectText.material, 0.4, { opacity: 0, delay: 0.6, onComplete: () => {
    // 		this.perfectText.obj.visible = false;
    // 	}});
    // 	if (double && !quick) {
    // 		this.perfectText.obj.position.y = 18;
    // 	} else {
    // 		this.perfectText.obj.position.y = 16;
    // 	}
    // 	this.perfectText.obj.updateMatrix();
    // }
    // if (quick && showToast && (this.game.mode != 'observe')) {
    // 	//this.quickText.obj.scale.set(0, 0, 0)
    // 	//TweenMax.to(this.quickText.obj.scale, 0.4, { x: 0.8, y: 0.8, z: 0.8 });
    // 	var text = ['好快！', '给力！'];
    // 	//this.quickText.setText(text[Math.floor(Math.random() * 2)]);
    // 	this.quickText.obj.visible = true;
    // 	customAnimation.to(this.quickText.material, 0.4, { opacity: 1 });
    // 	customAnimation.to(this.quickText.material, 0.4, { opacity: 0, delay: 0.6, onComplete: () => {
    // 		this.quickText.obj.visible = false;
    // 	}});
    // }
}
GameUI.prototype.setScore = function (score) {
//console.log("setScore");
    this.scoreText.setScore(score);
    Config.BLOCK.minRadiusScale -= 0.005;
    //console.log("BBB", BLOCK.minRadiusScale, BLOCK.maxRadiusScale)
    Config.BLOCK.minRadiusScale = Math.max(0.25, Config.BLOCK.minRadiusScale);
    Config.BLOCK.maxRadiusScale -= 0.005;
    Config.BLOCK.maxRadiusScale = Math.max(Config.BLOCK.maxRadiusScale, 0.6);
    Config.BLOCK.maxDistance += 0.03;
    Config.BLOCK.maxDistance = Math.min(22, Config.BLOCK.maxDistance);

    // BLOCK.minRadiusScale = +BLOCK.minRadiusScale.toFixed(2);
    // BLOCK.maxRadiusScale = +BLOCK.maxRadiusScale.toFixed(2);
    // BLOCK.maxDistance = +BLOCK.maxDistance.toFixed(2);
}
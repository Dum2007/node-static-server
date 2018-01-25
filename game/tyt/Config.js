var Config = {};
Config.COLORS = {
    red: 0xCC463D,
    pureRed: 0xff0000,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xf39ab7,
    brownDark: 0x23190f,
    blue: 0x009FF7,
    yellow: 0xFFBE00,
    pureWhite: 0xffffff,
    orange: 0xf7aa6c,
    orangeDark: 0xFF8C00,
    black: 0x000000,
    cream: 0xF5F5F5,
    green: 0x2C9F67,
    lightBlue: 0xD1EEEE,
    cyan: 0x93e4ce,
    yellowBrown: 0xffcf8b,
    purple: 0x8a9ad6
};

Config.BOTTLE = {
    // bodyWidth: 2.8,
    // bodyDepth: 2.8,
    headRadius: 0.945,
    bodyWidth: 2.34,
    bodyDepth: 2.34,

    bodyHeight: 3.2,

    reduction: 0.005,
    minScale: 0.5,
    velocityYIncrement: 15,
    velocityY: 135,
    velocityZIncrement: 70
};

Config.PARTICLE = {
    radius: 0.3,
    detail: 2
};

Config.GAME = {
    BOTTOMBOUND: -55,
    TOPBOUND: 41,
    gravity: 720,
    //gravity: 750,
    touchmoveTolerance: 20,
    LEFTBOUND: -140,
    topTrackZ: -30,
    rightBound: 90,
    HEIGHT: window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
    WIDTH: window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth,
    canShadow: true
};

Config.WAVE = {
    innerRadius: 2.2,
    outerRadius: 3,
    thetaSeg: 25
};

Config.CAMERA = {
    fov: 60
};

Config.AUDIO = {
    success: 'res/success.mp3',
    perfect: 'res/perfect.mp3',
    scale_loop: 'res/scale_loop.mp3',
    scale_intro: 'res/scale_intro.mp3',
    restart: 'res/start.mp3',
    fall: 'res/fall.mp3',
    fall_2: 'res/fall_2.mp3',
    combo1: 'res/combo1.mp3',
    combo2: 'res/combo2.mp3',
    combo3: 'res/combo3.mp3',
    combo4: 'res/combo4.mp3',
    combo5: 'res/combo5.mp3',
    combo6: 'res/combo6.mp3',
    combo7: 'res/combo7.mp3',
    combo8: 'res/combo8.mp3',
    icon: 'res/icon.mp3',
    pop: 'res/pop.mp3',
    sing: 'res/sing.mp3',
    store: 'res/store.mp3',
    water: 'res/water.mp3'
};

Config.BLOCK = {
    radius: 5,
    width: 10,
    minRadiusScale: 0.8,
    maxRadiusScale: 1,
    height: 5.5,
    radiusSegments: [4, 50],
    floatHeight: 0,
    minDistance: 1,
    maxDistance: 17,
    minScale: Config.BOTTLE.minScale,
    reduction: Config.BOTTLE.reduction,
    moveDownVelocity: 0.07,
    fullHeight: 5.5 / 21 * 40
};

Config.FRUSTUMSIZE = window.innerHeight / window.innerWidth / 736 * 414 * 60;

Config.loader = new THREE.TextureLoader();

var cylinder_shadow = Config.cylinder_shadow = new THREE.MeshBasicMaterial({ map: Config.loader.load('res/cylinder_shadow.png'), transparent: true, alphaTest: 0.01 });
var desk_shadow = Config.desk_shadow = new THREE.MeshBasicMaterial({ map: Config.loader.load('res/desk_shadow.png'), transparent: true, alphaTest: 0.01 });
var shadow = Config.shadow = new THREE.MeshBasicMaterial({ map: Config.loader.load('res/shadow.png'), transparent: true, alphaTest: 0.01 });
var grayMaterial = Config.grayMaterial = new THREE.MeshLambertMaterial({ map: Config.loader.load('res/gray.png') });
var numberMaterial = Config.numberMaterial = new THREE.MeshLambertMaterial({ map: Config.loader.load('res/number.png'), alphaTest: 0.6 });

var REPORTERTIMEOUT = Config.REPORTERTIMEOUT = 60001;
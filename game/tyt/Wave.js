
var geometry = new THREE.RingGeometry(Config.WAVE.innerRadius, Config.WAVE.outerRadius, Config.WAVE.thetaSeg);
var Wave = function () {
    var material = new THREE.MeshBasicMaterial({ color: Config.COLORS.pureWhite, transparent: true });
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.rotation.x = -Math.PI / 2;
    this.obj.name = 'wave';
}

Wave.prototype.reset = function () {
    this.obj.scale.set(1, 1, 1);
    this.obj.material.opacity = 1;
    this.obj.visible = false;
}
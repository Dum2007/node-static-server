var loader = new THREE.FontLoader();
var loadFontCallback = null;
loader.load('./res/myfont.json', function (font) {
    THREE.myFONT = font;
    if (typeof loadFontCallback === 'function') {
        loadFontCallback();
    }
});
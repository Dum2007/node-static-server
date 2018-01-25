var ServerStatic = require('./static-server');

var configJ = process.argv[2];

console.log('----', configJ);

var config = null;
if (configJ) {
    config = require(configJ);
}
if (config) {
    var server_static = (new ServerStatic());
    server_static.start(config);
}
else {
    console.log('缺少config配置文件')
}

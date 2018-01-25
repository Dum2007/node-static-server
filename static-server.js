var http = require("http");            //提供web服务
var path = require('path');

var fs = require('fs');

var mineTypes = {
    "html" : "text/html",
    "css"  : "text/css",
    "js"   : "text/javascript",
    "json" : "application/json",
    "ico"  : "image/x-icon",
    "gif"  : "image/gif",
    "jpeg" : "image/jpeg",
    "jpg"  : "image/jpeg",
    "png"  : "image/png",
    "pdf"  : "application/pdf",
    "svg"  : "image/svg+xml",
    "swf"  : "application/x-shockwave-flash",
    "tiff" : "image/tiff",
    "txt"  : "text/plain",
    "wav"  : "audio/x-wav",
    "wma"  : "audio/x-ms-wma",
    "wmv"  : "video/x-ms-wmv",
    "xml"  : "text/xml",
    "default":"application/octet-stream"
}

class StaticServer {
    constructor() {
        this.config = null;
    }

    start(config) {
        this.config = config;
        var self = this;
        http.createServer(function(req, res){
            var pathname = path.join(self.config.path, path.normalize(req.url));
            fs.exists(pathname, function(exist){
                if (!exist) {
                        res.writeHead(404, {'Content-Type':'text/plain'});
                        res.write('404\nNot Found;\n');
                        res.end();
                }
                else {
                    console.log('---createServer---333-', self.getMineType(pathname));
                    res.writeHead(200, {'Content-Type':self.getMineType(pathname)});

                    var data = fs.readFileSync(pathname);
                    res.end(data);
                }
            })
        }).listen(this.config.port, function (err) {
            if (err) {
                console.log('server failed on port'+err);
            }
            else {
                console.log('server started on port '+self.config.port);
            }
        });
    }

    getMineType(file) {
        var idx = file.lastIndexOf('.');
        var ext = (idx===-1)? 'default':file.substr(idx+1);
        return mineTypes[ext.toLowerCase()];
    }
}

module.exports = StaticServer;
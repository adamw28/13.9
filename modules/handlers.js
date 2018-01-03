var formidable = require('formidable');
var url = require('url');
var fs = require('fs');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.readFile('templates/upload.html','utf-8',function(err,html){
        response.setHeader( "Content-Type", "text/html");
            if(files.upload){
            fs.renameSync(files.upload.path,files.upload.name);
            console.log(files.upload.name);
            
            html=html.replace('$$uri$$','/start?filename='+files.upload.name);
            response.write(html);
//            response.end();
    }
    else{response.write("<h4>no file specified</h4>");}
        response.end();
    });
    });
}


exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}
exports.show = function(request, response) {
    var img = url.parse(request.url,true).query.filename;
    fs.readFile('./'+img, function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");response.write(img);
        response.end();
    });
}
exports.cssstart = function(request,response){
    fs.readFile('css/start.css',function(err,css){
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });
}
exports.cssupload = function(request,response){
    fs.readFile('css/upload.css',function(err,css){
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });
}
//L3 Streams - Upload progress
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
    var newFile = fs.createWriteStream('/tmp/uploaded-file.txt');
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;

    request.on('readable', function() {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes) * 100;
            response.write("progress: "+parseInt(progress,10)+ "%\n");
        }
    });

    request.pipe(newFile);
    request.on('end', function() {
        response.end('uploaded!!');
    });

}).listen(8080);

//L3 Streams - Reading and writing a file
var fs = require('fs');

var file = fs.createReadStream("test.txt");
var newFile = fs.createWriteStream("test_copy.txt");

file.pipe(newFile);
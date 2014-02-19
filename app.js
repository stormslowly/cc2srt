"use strict";

var fs = require('fs');
var cc2str = require('./lib/cc2strlib.js').cc2str;
var program = require('commander');

program
  .version('0.0.1')
  .usage('cc2str <cc files>')
  .parse(process.argv);



var ccFiles = program.args;
console.log(ccFiles);
ccFiles.forEach(function handleCCFile(fileName){

  if( fileName.indexOf('.xml') ===-1 ){

    console.error('File: ' + fileName +
      'is not a XML file ommitted ');
    return;
  }

  fs.readFile( fileName , function (err,content){

    cc2str(content, function(err,transcript){
      if (err){
        console.error('File: ' +
          fileName + 'parse error ' + err);
        return;
      }

      var ccfileName = fileName.replace('.xml','.str');

      fs.writeFile(ccfileName,transcript,'utf8');

    });

  });
});








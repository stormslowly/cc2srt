"use strict";

var xmlParse = require('xml2js').parseString;


var ccTexts2str = function (texts){

  var str = '';
  for(var i=0,len = texts.length;i<len;i++){
    var text = texts[i];
    str += '' + i + '\n\n';



  }

  return str;

};

module.exports = {

  cc2str:function(ccString,callback){

    xmlParse(ccString,function(err,data){
        if(err){
          callback(err,null);
          return;
        }

        if(!data || !data.transcript ){
          callback(new Error('not a CC String'),null);
          return;
        }

        callback(err,data.transcript);


      }
    );

  }

};




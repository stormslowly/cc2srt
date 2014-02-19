"use strict";

var xmlParse = require('xml2js').parseString;

var SECONDSPERHOUR = 3600;
var SECONDSPERMINUTE = 60;

var repeatNstr = function (str, n){

  var result = '';
  for(var i=0;i<n;i++){
    result += str;
  }
  return result ;
};

var toNdigitals = function (num,n){
  var str = '' + num;
  return  repeatNstr('0', n - str.length) + num;
};

var floatStr2hhmmss = function (str){

  var dotIndex = str.indexOf('.');
  var afterDot = 0, beforeDot = 0;

  var hh,mm,ss,tail;
  if(dotIndex === -1){
    afterDot = 0;
    beforeDot = parseInt(str);
  }else{
    afterDot =  Math.floor(parseFloat( str.slice(dotIndex))*1000);
    beforeDot = parseInt( str.slice(0,dotIndex));
  }

  hh = Math.floor(beforeDot / SECONDSPERHOUR);
  mm = Math.floor((beforeDot - hh*SECONDSPERHOUR )/SECONDSPERMINUTE);
  ss = beforeDot%SECONDSPERMINUTE ;
  tail = afterDot;

  return toNdigitals(hh,2) + ':' +
         toNdigitals(mm,2) + ':' +
         toNdigitals(ss,2) + ',' +
         toNdigitals(tail,3);

};

var ccTexts2str = function (texts){

  var str = '';
  for(var i=0,len = texts.length;i<len;i++){
    var text = texts[i];

    var start = text.$.start;
    var end = '';

    end = (parseFloat(start) + parseFloat(text.$.dur)).toString();

    str += '' + (i+1) + '\n';
    str += floatStr2hhmmss(start) + " --> ";
    str += floatStr2hhmmss(end) + '\n';
    str += ununicode(text._) +'\n';
  }

  return str;
};

function ununicode(str) {
  return str.replace(/&#(0x)?([a-f0-9]+);?/g,
    function (matchStr, has0x, numbers) {
      return String.fromCharCode(parseInt(numbers, has0x ? 16 : 10));
    });
}

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

      var texts = data.transcript.text;
      callback(err,ccTexts2str(texts));
    });
  }
};

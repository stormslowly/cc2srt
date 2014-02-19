"use strict";
var expect = require('chai').expect;

var rewire = require('rewire');

describe("cc2str lib",function(){

  var cc2str = require('../lib/cc2strlib.js').cc2str;

  it("can't pares empty string",function (done){

    cc2str('',function(err,transcript){
      expect(err).to.be.ture;
      expect(transcript).is.a('null');
      done();
    });

  });


  it("can parse transcript",function (done){
    var ccstring = '<?xml version="1.0" encoding="utf-8" ?>' +
    '<transcript>' +
       '<text start="0.08" dur="3.45">' +
       "just want to show you uh... something i've been playing with lately</text>" +
       '<text start="3.53" dur="5.099">it&amp;#39;s a javascript engine' +
       ' called pixie js by good boy digital</text>'+
    '</transcript>';

    var expectStr = '' +
    '1\n'+
    '00:00:00,080 --> 00:00:03,530\n'+
    "just want to show you uh... something i've been playing with lately\n"+
    "2\n" +
    "00:00:03,530 --> 00:00:08,629\n"+
    "it's a javascript engine called pixie js by good boy digital\n";

    cc2str(ccstring, function(err,transcript){

      expect(transcript).to.equal(expectStr);
      done();
    });


  });


});

describe('texts2str', function (){

  var lib = rewire('../lib/cc2strlib.js');

  var cctexts2str = lib.__get__('ccTexts2str');

  it('transform text array to str ',function (){

    var str = cctexts2str(
      [
        { _: 'just want to show you', '$': { start: '0.08', dur: '3.45' } }
      ]);
    var expctStr = "1\n"+
                   "00:00:00,080 --> 00:00:03,530\n" +
                   "just want to show you\n" ;


    expect(str).to.equal(expctStr);

  });


})
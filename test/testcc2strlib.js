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
    var ccstring = '<?xml version="1.0" encoding="utf-8" ?><transcript><text start="0.08" dur="3.45">just want to show you</text></transcript> ';

    cc2str(ccstring, function(err,transcript){

      console.log(transcript);
      // expect(transcript).is.a('object');
      // expect(transcript).to.equal("1");

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
        { _: 'just want to show you', '$': [Object] }
      ]);

    expect(str).to.equal('');

  });


});
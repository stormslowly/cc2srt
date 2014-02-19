"use strict";
var expect = require('chai').expect;

describe('somke test ',function(){

  var exec = require('child_process').exec;

  it('cc2srt can run from cli ',function (done){
    exec('node ./bin/cc2srt',function(err,stdout,stderr){
      expect(stdout.toString()).to.have.string('Usage: cc2srt <cc files>');
      expect( stderr.toString() ).to.equal('');
      done();
    });
  });


});
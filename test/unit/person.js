/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Person    = require('../../app/models/person'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'people';

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var o = {name:'Bob Jones', photo:'http://www.google.com', cash:'100'},
          p = new Person(o);
      expect(p).to.be.instanceof(Person);
      expect(p.name).to.equal('Bob Jones');
      expect(p.photo).to.equal('http://www.google.com');
      expect(p.cash).to.equal(100);
      expect(p.assets).to.have.length(0);
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Person.all(function(err, people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });
  describe('#save', function(){
    it('should save a person to the database', function(done){
      var o = {name:'Bob Jones', photo:'http://www.google.com', cash:'100'},
          p = new Person(o);
      p.save(function(){
        expect(p._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});//last bracket

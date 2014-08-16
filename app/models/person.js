'use strict';

var _ = require('lodash');

function Person(object){
  this.name       = object.name;
  this.photo      = object.photo;
  this.cash       = parseFloat(object.cash);
  this.assets     = [];
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Person.all = function(cb){
  Person.collection.find().toArray(function(err, objects){
    var people = objects.map(function(object){
      return changePrototype(object);
    });
    cb(people);
  });
};

Person.prototype.save = function(cb){
  Person.collection.save(this, cb);
};

module.exports = Person;

//PRIVATE FUNCTIONS//
function changePrototype(object){
  return _.create(Person.prototype, object);
}

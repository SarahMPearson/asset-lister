'use strict';

var Person = require('../models/person');

exports.init = function(req, res){
  res.render('people/init');
};

exports.create = function(req, res){
  var person = new Person(req.body);
  person.save(function(){
    res.redirect('/people');
  });
};

exports.index = function(req, res){
  Person.all(function(dog){
    res.render('people/index', {people:dog});
  });
};

exports.show = function(req, res){
  Person.findById(req.params.id, function(people){
    res.render('people/show', {person:people});
  });
};

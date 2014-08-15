'use strict';

var Person = require('../models/person');

exports.init = function(req, res){
  res.render('people/init');
};

exports.create = function(req, res){
  Person.save(req.body, function(){
    res.redirect('/people');
  });
};


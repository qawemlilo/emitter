# Emitter

JavaScript events are very powerful and expressive. When I first started programming in JavaScript I used eventse mostly for interacting with DOM objects. However, lately I have been using Backbone.js and Node.js quite heavily and what has struct me is how useful events are on JavaScript objects.

Below I have 2 examples of how to convert ordinary JavaScript object to magical objects that listen to and emit events.

# Using Node.js
    var util = require('util');
    var EventEmitter = require('events').EventEmitter;
    
    // here is an ordinary object representing my Dog
    var myDog = {
        name: 'Spotty',
        likes: ['bones', 'biskuits'],
        ate: [],
        feed: function (food) {
            this.ate(food)
        }               
    };
    
    // Add some magic to my ordinary object
    util.inherits(myDog, EventEmitter);
    
    // Now my object can listen to eventse
    myDog.on('hungry', function () {
        myDog.feed('bone')
    });
    
    

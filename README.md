# Emitter

JavaScript events are very powerful, they give you the power to capture real world events in real time. For example, when a user moves their mouse in the browser or when they click on the page. Using JavaScript events to interact with DOM objects is what most front-end developers are familiar with, but that is changing. About a year or 2 ago I started using backbone.js and it opened my eyes to a whole new world of events.

Below I have 2 examples of how to convert ordinary JavaScript object to magical objects that listen to and emit events.

### With Node.js
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
    
    

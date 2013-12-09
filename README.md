# Emitter

JavaScript events are very powerful, they give you the power to capture real world events in real time. For example, when a user moves their mouse in the browser or when they click on the page. 

Using JavaScript events to interact with DOM objects is cool and awesome but limited, they are predefined and tied to the browser BOM and DOM. 

A more powerful implementation of JavaScript Events is in Event Emitters. Most of the popular JavaScript libraries and frameworks have their own implementation of Event Emitters.  

My framework of choice is backbone.js and uses Backbone.Events to implement event emitters.  

    var mySimpleObject = {
        name: "John",
        surname: "Doe",
        gender: "Male"
    };
    
    _.extend(mySimpleObject, Backbone.Events);
    
    mySimpleObject.on('customEvent', function () {
       // do something cool
    });
    
    mySimpleObject.trigger('customEvent');
    
In the above example we simply extend a normal object with Backbone.Events to give it more power and flexibility.

Node.js also has a powerful EventEmitter object that can be used to add some awesomeness to objects. 

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
    
Using event emitters has many advantages, you can emit events when an object's state changes, objects can eavesdrop on other objects, reduces callback nesting, e.t.c.

The more I use event emitters the more I feel that they should become part of a future version of JavaScript 


### Proposed API
An Event Emitter would the same api as Object in ES5

    
    // an empty
    var emitter1 = EventEmitter.create();
    
    var emitter2 = EventEmitter.create({});
    
    
Introducing Emitter.

Emitter is a fork of Backbone Events that allows you to create event emitters without the need of a fully blown Framework. It works both on the browser and in Node.js. 

        
    

# Emitter

JavaScript events are very powerful, they give you the power to capture real world events in real time. For example, when a user moves their mouse in the browser or when they click. 

Using JavaScript events to interact with DOM objects defined Web 2.0 and is still widely used (thanks to jQuery and similar libraries) but it has its limitations, the events are predefined and tied to the browser BOM and DOM. 

A more powerful implementation of JavaScript Events is in Event Emitters. Most of the popular JavaScript libraries/frameworks have their own implementation of Event Emitters.  

My framework of choice is backbone.js and it uses Backbone.Events to implement Event Emitters.  
```javascript
var mySimpleObject = {
    name: "John",
    surname: "Doe",
    gender: "Male"
};

// use underscore to extend mySimpleObject with Backbone.Events
_.extend(mySimpleObject, Backbone.Events);

mySimpleObject.on('customEvent', function () {
   // do something cool
});

mySimpleObject.trigger('customEvent');
```
    
In the above example we simply extend a normal object with Backbone.Events to turn it into an Event Emitter.

Node.js also has a powerful EventEmitter object that can be used to add some awesomeness to objects. 
```javascript
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// here is an ordinary object representing my Dog
var myDog = {
    name: 'Spotty',
    likes: ['bones', 'biskuits'],
    ate: [],
    feed: function (food) {
        this.ate.push(food)
    }               
};

// Add some magic to my ordinary object
util.inherits(myDog, EventEmitter);

// Now my object can listen to and emit events
myDog.on('hungry', function () {
    myDog.feed('bone')
});

myDog.emit('hungry');
```
    
Using Event Emitters has many advantages; you can emit events when an object's state changes, objects can eavesdrop on other objects, reduces callback nesting, e.t.c.

The more I use event emitters the more I feel that they should become part of a future version of JavaScript 

### My proposed API
Creating an Event Emitter would have the same API as creating Objects in ES5.

```javascript
// an empty
var emitter1 = EventEmitter.create(null);


var mySimpleObject = {
    name: "John",
    surname: "Doe",
    gender: "Male"
};

var emitter2 = EventEmitter.create(mySimpleObject);
```

### Introducing Emitter.

Since native Event Emitters are just but a wishlist for now, I have forked Backbone Events and created a small library called Emitter. You can drop it into your project to start messing with Event Emitters.

Emitter uses the same API as [Backbone.Events](http://backbonejs.org/#Events). The only difference is that I have renamed the `trigger` method to `emit`. Below is an example of how to use Emitter.
 
```javascript
"use strict";

// in Node require the module
var Emitter = require('emitter');

// In the browser include the script in your html 
// <script src="dest/emitter.min.js"></script>


var Dog = Emitter.extend({
    buck: function () {
        this.emit('buck');
    }
});

var Person = Emitter.extend({
    run: function () {
        this.emit('run');
        this.running = true;
    }
});

var intruder = new Person();
var myPet = new Dog();

myPet.on('buck', function () {
    console.log('My dog is bucking');
});

intruder.on('run', function () {
    console.log('The intruder is rinning away');
});


intruder.listenTo(myPet, 'buck', intruder.run);

myPet.buck();
```

### Installation
```
npm install emiter
```

### Examples
```
npm run-script example1

npm run-script example2
```

### Testing
```
npm test
```

### License
```
(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
        
    

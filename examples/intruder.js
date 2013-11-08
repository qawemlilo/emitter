"use strict";

var Emitter = require('../lib/emitter'), Dog, Person;


Dog = Emitter.extend({
    buck: function () {
        this.emit('buck');
    }
});

Person = Emitter.extend({
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

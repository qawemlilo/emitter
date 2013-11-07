"use strict";

var Emitter = require('../lib/emitter'), Animal, Dog, Cat;

Animal = function (name) {
    this.name = name;
};

Animal.prototype.getName = function () {
    return this.name;
}


Dog = Emitter.extend(Animal, {
    likes: 'bones'
});

Cat = Emitter.extend(Animal, {
    eats: 'rats'
});

var Sheepard = Emitter.extend(Dog, {
    likes: 'milk',
    eats: 'cake'
});


var cat = new Cat('Betty');
var dog = new Dog('Spot');
var shp = new Sheepard('Bruno');


console.log(cat.eats);
console.log(dog.likes);
console.log(cat.getName());
console.log(dog.getName());
console.log(shp.likes);
console.log(shp.eats);

console.log(cat instanceof Animal);
console.log(dog instanceof Animal);
console.log(shp instanceof Animal);
console.log(shp instanceof Animal);


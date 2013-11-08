"use strict";

var Emitter = require('../lib/emitter'),
    should = require('should');

describe('Emitter', function() { 
    var Animal = function (name) {
        this.name = name;
    };
        
    Animal.prototype.getName = function () {
        return this.name;
    };
    
    
    describe('#clone()', function(){
      it('should clone the Animal Function', function () {
        var Dog = Emitter.clone(Animal);
        var myPet = new Dog('Beast');
        var myPetName = myPet.getName();
        
        myPet.should.be.an.instanceOf(Dog).and.have.property('name', 'Beast');
        myPetName.should.equal('Beast');
      });
    });
    
    
    describe('#typeOf()', function () {
      it('should test variable types', function () {
        var obj = {};
        var arr = [];
        var num = 5;
        var fn = function () {};
        var qawe;
        
        (Emitter.typeOf(qawe).should.equal('undefined'));
        (Emitter.typeOf(obj).should.equal('object'));
        (Emitter.typeOf(arr).should.equal('array'));
        (Emitter.typeOf(fn).should.equal('function'));
      });
    });
    
    
    describe('#isEmpty()', function () {
      it('should be true', function () {
        var obj = {};
        var empty = Emitter.isEmpty(obj);
        
        empty.should.be.true;
      });
    });
    
    
    describe('#_once()', function () {
      it('should run a function only once', function () {

        var sayHelloOnce = Emitter._once(function (name) { return 'Hello ' + name; });

        (sayHelloOnce('qawe')).should.equal('Hello qawe');
        (sayHelloOnce('brian')).should.equal('Hello qawe');
      });
    });
    
    
    describe('#eventsFactory()', function () {
      it('should return backbone events', function () {

        var events = Emitter.eventsFactory();

        events.should.have.keys(['on', 'emit', 'once', 'off', 'listenTo', 'listenToOnce', 'stopListening']);
      });
    }); 
    
    
    describe('#extend()', function () {
      it('should extend an object', function () {

        var Dog = Emitter.extend(Animal, {
            likes: 'bones',
            breed: 'Alsatian'
        });
        
        var myPet = new Dog('Beast');
        var myPetName = myPet.getName();

        myPet.should.be.an.instanceOf(Dog).and.have.property('name', 'Beast');
        myPetName.should.equal('Beast');
        (myPet.likes).should.equal('bones');
        (myPet.breed).should.equal('Alsatian');
      });
    }); 
    
    
    describe('#listenTo() #emit()', function () {
      it('should extend an object', function () {

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
        
        var myPet = new Dog();
        var intruder = new Person();
        
        intruder.listenTo(myPet, 'buck', intruder.run);
        
        myPet.buck();

        intruder.running.should.be.true;
      });
    });      
});
 
 

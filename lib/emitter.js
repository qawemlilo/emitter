

(function (root) {  
    "use strict";
    
    /* 
         Globals 
    */
    var eventsApi, triggerEvents, Emitter, _typeOf, _once, _clone, isEmpty, eventsFactory;
    
    if (typeof exports !== 'undefined') {
        Emitter = exports;
    } else {
        Emitter = root.Emitter = {};
    }
    

    /*
        Helper functions
    */
    isEmpty = function(obj) {
        if (Object.keys) {
            return Object.keys(obj).length === 0;
        }
        for(var prop in obj) {
           if(obj.hasOwnProperty(prop)) {
               return false;
           }
       }
       
       return true;
    };
   
    
   _typeOf = root._typeOf = function (o) {
        // handle null in old IE
        if (o === null) {
            return 'null';
        }

        // handle DOM elements
        if (o && (o.nodeType === 1 || o.nodeType === 9)) {
            return 'element';
        }

        var s = Object.prototype.toString.call(o);
        var type = s.match(/\[object (.*?)\]/)[1].toLowerCase();

        // handle NaN and Infinity
        if (type === 'number') {
            if (isNaN(o)) {
                return 'nan';
            }
            if (!isFinite(o)) {
                return 'infinity';
            }
        }

        return type;
    };
    
    // clones a function
    _clone = root._clone = function(fn) {
        var key, temp;
        
        if (!fn.apply) {
            return fn;
        }
        
        temp = function temporary() { 
            return fn.apply(this, arguments); 
        };
        
        for( key in fn ) {
            temp[key] = fn[key];
        }
        
        return temp;
    };

    // Underscore once
    _once = root._once = function(func) {
        var ran = false, memo;
		
        return function () {
            if (ran) {
                console.log('has been called');
                return memo;
            }

            ran = true;
            memo = func.apply(this, arguments);
            func = null;
			
            return memo;
        };
    };
    
    
    // Backbone internal function for processing events api
    eventsApi = root.eventsApi = function(obj, action, name, rest) {
        if (!name) {
            return true;
        }
        
        // Regular expression used to split event strings
        var eventSplitter = /\s+/, key;
    
        // Handle event maps.
        if (_typeOf(name) === 'object') {
            for (key in name) {
              obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            
            return false;
        }
    
        // Handle space separated event names.
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter), i, l;
            
            for (i = 0, l = names.length; i < l; i++) {
              obj[action].apply(obj, [names[i]].concat(rest));
            }
            
            return false;
        }
    
        return true;
    };
    
	
    // Backbone internal function for triggering events
    triggerEvents = root.triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        
        switch (args.length) {
            case 0: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx);
                }
            return;
            
            case 1: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1);
                }
            return;
            
            case 2: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1, a2);
                }
            return;
            
            case 3: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                }
            return;
            
            default: 
                while (++i < l) {
                    (ev = events[i]).callback.apply(ev.ctx, args);
                }
        }
    };
    
    
    // my function for returning a copy of backbone events
    eventsFactory = root.eventsFactory = function () {
        return {
            on: function (name, callback, context) {
                if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
                    return this;
                }
                    
                if (!this._events) {
                    this._events = {};
                }
                
                var events = this._events[name];
                
                if (!events) {
                    events = this._events[name] = [];
                }
                    
                events.push({callback: callback, context: context, ctx: context || this});
                    
                return this;
            },
                
            
            // Bind an event to only be triggered a single time. After the first time
            // the callback is invoked, it will be removed.
            once: function(name, callback, context) {
                if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
                    return this;
                }
                    
                var self = this,
                once = _once(function() {
                    self.off(name, once);
                    callback.apply(this, arguments);
                });
                    
                once._callback = callback;
                    
                return this.on(name, once, context);
            },
            

            // Remove one or many callbacks. If `context` is null, removes all
            // callbacks with that function. If `callback` is null, removes all
            // callbacks for the event. If `name` is null, removes all bound
            // callbacks for all events.
            off: function(name, callback, context) {
                var retain, ev, events, names, i, l, j, k;
                    
                if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
                    return this;
                }
                    
                if (!name && !callback && !context) {
                    this._events = {};
                    return this;
                }
            
                if (name) {
                    names = [name]; 
                }
                else {
                    names = Object.keys(this._events);
                }
                    
                for (i = 0, l = names.length; i < l; i++) {
                    name = names[i];
                    events = this._events[name];
                        
                    if (events) {
                        this._events[name] = retain = [];
                            
                        if (callback || context) {
                            for (j = 0, k = events.length; j < k; j++) {
                                ev = events[j];
                                    
                                if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                    (context && context !== ev.context)) {
                                    retain.push(ev);
                                }
                            }
                        }
                            
                        if (!retain.length) {
                            delete this._events[name];
                        }
                    }
                }
                    
                return this;
            },
            

            // Emit one or many events, firing all bound callbacks. Callbacks are
            // passed the same arguments as `emit` is, apart from the event name
            // (unless you're listening on `"all"`, which will cause your callback to
            // receive the true name of the event as the first argument).
            emit: function(name) {
                if (!this._events) {
                    return this;
                }
                    
                var args = ([]).slice.call(arguments, 1), events, allEvents;
                    
                if (!eventsApi(this, 'emit', name, args)) {
                    return this;
                }
                    
                events = this._events[name]; 
                allEvents = this._events.all;
                    
                if (events) {
                    triggerEvents(events, args);
                }
                    
                if (allEvents) {
                    triggerEvents(allEvents, arguments);
                }
 
                return this;
            },


            listenTo: function(obj, name, callback) {
                var listeners = this._listeners || (this._listeners = {});
                var id = obj._listenerId || (obj._listenerId = 'id_' + Date.now());
                    
                listeners[id] = obj;
                    
                if (_typeOf(name) === 'object') {
                    callback = this;
                }
                    
                obj['on'](name, callback, this);
                    
                return this;
            },
            

            listenToOnce: function(obj, name, callback) {
                var listeners = this._listeners || (this._listeners = {});
                var id = obj._listenerId || (obj._listenerId = 'id_' + Date.now());
                    
                listeners[id] = obj;
                    
                if (_typeOf(name) === 'object') {
                    callback = this;
                }
                    
                obj['once'](name, callback, this);
                    
                return this;
            },
            

            // Tell this object to stop listening to either specific events ... or
            // to every object it's currently listening to.
            stopListening: function(obj, name, callback) {
                var listeningTo = this._listeningTo, remove, id;
                    
                if (!listeningTo) {
                    return this;
                }
                    
                remove = !name && !callback;
                    
                if (!callback && _typeOf(name) === 'object') {
                    callback = this;
                }
                    
                if (obj) {
                    (listeningTo = {})[obj._listenId] = obj;
                }
                    
                for (id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(name, callback, this);
                        
                    if (remove || isEmpty(obj._events)) {
                        delete this._listeningTo[id];
                    }
                }
                    
                return this;
            }
        };
    };

 
    /*
         Emitter object with 'extend' method that return a function Constructor
    */
    Emitter.extend = function(extObj, protoProps) {
		
            var args = [].slice.call(arguments),
                events = eventsFactory(),
                event,
                prop, 
                props, 
                Parent;
                
            if (args.length > 2) {
                throw new Error('Too many arguments');
            }
            
            if (args.length === 1) {
                Parent = function () {};
                props = args[0];
                
                Parent.prototype = events;
            }
            else {
                Parent = args[0];
                props = args[1];
                
                if (_typeOf(Parent) === 'function') {
                    Parent = _clone(Parent);
                    
                    for (event in events) {
                        Parent.prototype[event] = events[event];    
                    }
                }
                else if (_typeOf(Parent) === 'object') {
                    for (event in events) {
                        Parent[event] = events[event];    
                    } 
                }
            }
			
    
            if (_typeOf(props) === 'object' || _typeOf(props) === 'function') {
                
                if (_typeOf(props) === 'function') {
                    props = props.prototype;
                }
                
                for (prop in props) {
                    if  (props.hasOwnProperty(prop)) {
                        if (_typeOf(Parent) === 'function') {
                            Parent.prototype[prop] = props[prop]; 
                        }
                        else {
                            Parent[prop] = props[prop]; 
                        }
                    }					
                }
            }

            return Parent;  
    };
})(this);

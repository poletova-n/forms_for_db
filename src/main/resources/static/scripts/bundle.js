/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener('DOMContentLoaded', function() {
    var constraints = {

        name: {
            presence: true,
            length: {
                maximum: 30
            },
            format: {
                pattern: "[a-zА-Я \-]+",
                message: "enter correct name",
                flags: "i"
            }
        },
        birthday: {
            presence: true,
            data:true
        },
        number: {
            presence: true,
            format: {
                pattern: "8\(9[0-9]{2}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}",
                message: "enter correct phone number",
                flags: "i"
            }
        },
        email: {
            presence: true,
            email: true
        }
    };

var Form = __webpack_require__(1);

    var forms = document.getElementsByClassName("js-validating");
    var formsArr = [];
    for (var i=0;i<forms.length;i++) {
        var obj = new Form(forms.item(i), constraints);
        formsArr.push(obj);
    }

});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Eventable = __webpack_require__(2);
var extendConstructor = __webpack_require__(3);

var ADD_BUTTON = "add-button";
var DELETE_BUTTON = 'js-delete-button';
var lIST_ELEM = 'js-list-elem';
var SAVE_CHANGE_BUTTON = "js-save-change-button";

function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if( name ) {
            obj[ name ] = value;
        }
    }

    return JSON.stringify( obj );
}


function FormConstructor(form, constraints)
{
    this.__form = form;
    this.__constraints = constraints;
    this.__inputs = form.querySelectorAll("input, select, textarea");
    this.__errors = {};
    this.__deleteButton = form.querySelector("." + DELETE_BUTTON_CLASS);
    this.__saveButton = form.querySelector("." + SAVE_BUTTON);
    this._initEventable();

    this.__form.addEventListener("submit", this);
    if (this.__deleteButton) {
        this.__deleteButton.addEventListener("click", this);
    }
    
}

extendConstructor(FormConstructor, Eventable);


var FormConstructorPrototype = FormConstructor.prototype;



FormConstructorPrototype.validation = function(){

    this.__errors=validate(this.__form,this.__constraints);
//what about ADD_BUTTON?
    var button = this.getElementById(SAVE_CHANGE_BUTTON);
    if(button===null){
        button = this.getElementById(ADD_BUTTON);
    }
    if(!this.__errors){
        this.__errors={};
        button.disabled=false;
    } else {
        button.disabled=true;
    }
    return this.__errors !== 'false';
};

//add and change
FormConstructorPrototype.submitForm = function (event) {

    event.preventDefault();
    var fl = this.validation();

    if (fl) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                if(request.status !== 200) {
                    console.log(request.responseText);
                    alert('Something bad, try later');
                    window.location.reload();
                } else {

                }
            }
        };
        request.open('put', '/list',true);
        request.setRequestHeader( 'Content-Type', 'application/json' );
        request.send(toJSONString(this.__form));
    }
};



//delete
FormConstructorPrototype.deleteElement = function () {
    //

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState === 4) {
            if(request.status !== 200) {
                alert('Something bad, try later');
                window.location.reload();
            }
        }
    };
    request.open('delete', '/list',true);
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.send(toJSONString(this.__form));
};

//event
FormConstructorPrototype.handleEvent = function (event) {
    switch (e.type) {

        case 'submit':
                this.formSubmit(event);
            break;
        case 'click':
            this.deleteElement();
            break;
    }
};

module.exports = FormConstructor;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Eventable() {}

var eventablePrototype = Eventable.prototype;

eventablePrototype._initEventable = function () {
    this._eventable_registry = {};
};

function getEventSubscribers(eventable, eventName, needCreate) {
    var registry = eventable._eventable_registry;

    if (eventName in registry) {
        return registry[eventName];

    } else if (needCreate) {
        return registry[eventName] = [];
    }

    return null;
}

eventablePrototype.on = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName, true);

    subscribers.push({
        handler: handler,
        ctx: ctx
    });

    return this;
};

eventablePrototype.off = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        for (var i = subscribers.length; i-- ;) {
            if ((subscribers[i].handler === handler)
                && (subscribers[i].ctx === ctx)
            ) {
                subscribers.splice(i, 1);
                return this;
            }
        }
    }

    return this;
};

eventablePrototype.trigger = function (eventName, data) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        var subscribersCopy = subscribers.slice();
        for (var i = 0, l = subscribersCopy.length; i !== l; i += 1) {
            subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
        }
    }

    return this;
};

module.exports = Eventable;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * @param {Function} Extendable
 * @param {Function} Extension
 * @return {Function} Extendable
 */
function extendConstructor(Extendable, Extension) {
    var extendablePrototype = Extendable.prototype;
    var extensionPrototype = Extension.prototype;

    for (var p in extensionPrototype) {
        extendablePrototype[p] = extensionPrototype[p];
    }

    return Extendable;
}

module.exports = extendConstructor;

/***/ })
/******/ ]);
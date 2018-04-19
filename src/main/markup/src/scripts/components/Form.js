
var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');

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
    console.log("rrrrrrrrrrrrrrrrr");
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
                this.submitForm(event);
            break;
        case 'click':
            this.deleteElement();
            break;
    }
};

module.exports = FormConstructor;
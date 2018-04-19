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

var Form = require("./components/Form.js");

    var forms = document.getElementsByClassName("js-validating");
    var formsArr = [];
    for (var i=0;i<forms.length;i++) {
        var obj = new Form(forms.item(i), constraints);
        var x = obj.validation();
        if(x) {
            formsArr.push(obj);
        }
    }

});
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
        phone: {
            presence: true,
            format: {
                pattern: "[0-9\-]+",//"8\(9[0-9]{2}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}",
                message: "enter correct phone number",
                flags: "i"
            }
        },
        email: {
            presence: true,
            email: true
        }
    };

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

    function validateForm(form) {

        var result = validate(form, constraints);
        console.log(result);
        if(!result){
            result={};
        }
        if (Object.keys(result).length > 0){
          return false;
        }
        return true;
    }


    var button = document.querySelector('.add-button');
    var field = document.getElementsByClassName('info-block_input');
    var form=document.getElementById("form");
    for (var i=0;i<field.length;i++) {
        field[i].onchange = function (e) {

            var result = validateForm(form);
            console.log(result);
            button.disabled = !result;


        }
    }


    form.addEventListener("submit", myFunction);

    function myFunction() {

        var res = validateForm(form);

        if (!res)
        {
            event.preventDefault();
        } else {

            event.preventDefault();
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if(request.readyState === 4) {
                    if(request.status !== 200) {
                        console.log(request.responseText);
                        alert('Something bad, try later');
                        window.location.reload();
                    }
                }
            };
            request.open('put', '/list',true);
            request.setRequestHeader( 'Content-Type', 'application/json' );
            request.send(toJSONString(form));
        }
    };

});
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
            if (element.getAttribute('type') === "date")
            {
                var d = new Date(value);
                value = d.getTime();
            }
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


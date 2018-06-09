document.addEventListener('DOMContentLoaded', function() {

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
                    } else
                    {
                        form.reset();
                        alert('success!');

                    }
                }
            };
            request.open('put', '/list',true);
            request.setRequestHeader( 'Content-Type', 'application/json' );
            request.send( toJSONString(form));
        }
    };

});
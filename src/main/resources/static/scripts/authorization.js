document.addEventListener('DOMContentLoaded', function() {

    var button = document.querySelector('.button');
    var name = document.getElementById('.name');
    var pass = document.getElementById('.password');

    form.addEventListener("submit", myFunction);

    function myFunction() {

        if (name==="" || pass==="") {
            event.preventDefault();
            alert("something bad!");
        }
    };

});
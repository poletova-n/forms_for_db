document.addEventListener('DOMContentLoaded', function() {

    var saveButton = document.querySelector('.js-save-change-button');
   // var deleteButton = document.querySelector('.js-delete-button');
    var field = document.getElementsByClassName('list_elem_input');
    var forms = document.querySelectorAll(".js-form");
    for (var i=0;i<field.length;i++) {
        field[i].onchange = function (e) {
            var result = validateForm(form);
            console.log(result);
            saveButton.disabled = !result;


        }
    }

    for (var i=0;i<forms.length; i++) {
        var form = forms[i];
        form.addEventListener('submit', function () {
            var res = validate(form, constraints);

            if (!res) {
                event.preventDefault();
            } else {

                event.preventDefault();
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status !== 200) {
                            console.log(request.responseText);
                            alert('Something bad, try later');
                            window.location.reload();
                        }
                    }
                };
                request.open('put', '/list', true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(toJSONString(this));
            }
        });

        form.addEventListener('reset', function (e) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status !== 200) {
                        alert('Something bad, try later');
                        window.location.reload();
                    }
                }
            };

            request.open('delete', '/list', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(toJSONString(this));
            var form = this.closest('form');
            form.parentNode.removeChild(form);
        });
    }
});


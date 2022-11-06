function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* send a POST request to check if the user is authorized to send*/
fetch('http://localhost:3000/todolist/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': getCookie("email")
    })
})
    .then(function (response) {
        if (response.status != 200) {
            window.location.href = 'http://localhost:3000/views/login.html';
            return;
        }
    })["catch"](function (error) {
        console.log(error);
        window.location.href = 'http://localhost:3000/views/login.html';
    });
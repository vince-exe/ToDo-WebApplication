var hamburger = document.getElementsByClassName('hamburger')[0];
var mainNavBar = document.getElementsByClassName('.main-nav-bar')[0];
var titleInput = document.getElementById('title-input');
titleInput.value = "";
var bodyInput = document.getElementById('body-input');
bodyInput.value = "";
var createToDOButton = document.getElementById('create-todo-button');
var errorDiv = document.getElementsByClassName('error-div-container')[0];
var errorText = document.getElementsByClassName('error-text')[0];
function displayMessage(error) {
    errorDiv.style.display = 'flex';
    errorText.style.display = 'block';
    errorText.textContent = error;
}
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
hamburger.addEventListener('click', function (e) {
    hamburger.classList.toggle("active");
    mainNavBar.classList.toggle("active");
});
createToDOButton.addEventListener('click', function () {
    fetch('http://localhost:3000/homepage/api/add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': getCookie("email"),
            'title': titleInput.value,
            'body': bodyInput.value
        })
    })
        .then(function (response) {
        switch (response.status) {
            case 422:
                displayMessage('Invalid title or body');
                break;
            case 409:
                displayMessage('You already have a ToDo with this title');
                break;
            case 200:
                titleInput.value = "";
                bodyInput.value = "";
                displayMessage('Successfully created the ToDo');
                break;
        }
    })["catch"](function (error) {
        displayMessage(error);
    });
});
/* send a POST request to check if the user is authorized to send*/
fetch('http://localhost:3000/homepage/', {
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

var emailInput = document.getElementById('email-input');
var passwordInput = document.getElementById('password-input');
var loginButton = document.getElementById('login-button');
var errorTextDiv = document.getElementsByClassName('error-text-div')[0];
var errorText = document.getElementById('error-text');
/* do a get request to obtain the server settings */
fetch('http://localhost:3000/login/api/get-configs')
    .then(function (response) {
    response.text().then(function (value) {
        var settings = JSON.parse(value);
        emailInput.maxLength = settings.emailLen;
        passwordInput.maxLength = settings.passwordLen;
    });
})["catch"](function (reason) {
    console.log(reason);
    loginButton.disabled = true;
});
window.addEventListener('keyup', function (e) {
    if (e.code == 'Enter') {
        loginButton.click();
    }
});
loginButton.addEventListener('click', function (e) {
    /* send a POST request */
    fetch('http://localhost:3000/login/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': emailInput.value,
            'password': passwordInput.value
        })
    })
        .then(function (response) {
        switch (response.status) {
            /* successfully logged in */
            case 200:
                console.log('logged in');
                break;
            /* paramaters wrong */
            case 422:
                errorTextDiv.style.display = 'flex';
                errorText.style.display = 'block';
                errorText.textContent = "Email or password invalid";
                break;
            /* invalid credentials */
            case 401:
                errorTextDiv.style.display = 'flex';
                errorText.style.display = 'block';
                errorText.textContent = "There isn't an account associated at this email and password";
                break;
        }
    })["catch"](function (error) {
        errorTextDiv.style.display = 'flex';
        errorText.style.display = 'block';
        errorText.textContent = "".concat(error);
    });
});

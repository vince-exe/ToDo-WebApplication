var emailInput = document.getElementById('email-input');
var passwordInput = document.getElementById('password-input');
var loginButton = document.getElementById('login-button');
/* do a get request to obtain the server settings */
fetch('http://localhost:3000/login/api/get-configs')
    .then(function (response) {
    response.text().then(function (value) {
        var settings = JSON.parse(value);
        console.log(settings);
        console.log(typeof settings.emailLen);
        emailInput.maxLength = settings.emailLen;
        passwordInput.maxLength = settings.passwordLen;
    });
})["catch"](function (reason) {
    console.log(reason);
    loginButton.disabled = true;
});

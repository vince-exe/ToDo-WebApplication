var emailInput = document.getElementById('email-input');
emailInput.value = "";
var passwordInput = document.getElementById('password-input');
passwordInput.value = "";
var registrationButton = document.getElementById('registration-button');
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
    registrationButton.disabled = true;
});
window.addEventListener('keyup', function (e) {
    if (e.code == 'Enter') {
        registrationButton.click();
    }
});
registrationButton.addEventListener('click', function (e) {
    /* send a POST request */
    fetch('http://localhost:3000/registration/api/registration', {
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
            case 200:
                window.location.href = 'http://localhost:3000/views/homepage.html';
                break;
            case 422:
                errorTextDiv.style.display = 'flex';
                errorText.style.display = 'block';
                errorText.textContent = "Email or password invalid";
                break;
            case 409:
                errorTextDiv.style.display = 'flex';
                errorText.style.display = 'block';
                errorText.textContent = "There is already an account with this email";
                break;
            case 500:
                errorTextDiv.style.display = 'flex';
                errorText.style.display = 'block';
                errorText.textContent = "Application Error";
                break;
        }
    })["catch"](function (error) {
        errorTextDiv.style.display = 'flex';
        errorText.style.display = 'block';
        errorText.textContent = "".concat(error);
    });
});

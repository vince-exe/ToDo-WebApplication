const emailInput = document.getElementById('email-input') as HTMLInputElement
const passwordInput = document.getElementById('password-input') as HTMLInputElement
const loginButton = document.getElementById('login-button') as HTMLButtonElement

/* do a get request to obtain the server settings */
fetch('http://localhost:3000/login/api/get-configs') 
.then(response => {

    response.text().then(value => {
        let settings = JSON.parse(value)
        console.log(settings)
        console.log(typeof settings.emailLen)
        emailInput.maxLength = settings.emailLen
        passwordInput.maxLength = settings.passwordLen
    })
})
.catch(reason => {
    console.log(reason)
    loginButton.disabled = true
})

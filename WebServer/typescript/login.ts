const emailInput = document.getElementById('email-input') as HTMLInputElement
emailInput.value = ""

const passwordInput = document.getElementById('password-input') as HTMLInputElement
passwordInput.value = ""

const loginButton = document.getElementById('login-button') as HTMLButtonElement

const errorTextDiv = document.getElementsByClassName('error-text-div')[0] as HTMLDivElement
const errorText = document.getElementById('error-text') as HTMLHeadingElement

/* do a get request to obtain the server settings */
fetch('http://localhost:3000/login/api/get-configs')
    .then(response => {

        response.text().then(value => {
            let settings = JSON.parse(value)

            emailInput.maxLength = settings.emailLen
            passwordInput.maxLength = settings.passwordLen
        })
    })
    .catch(reason => {
        console.log(reason)
        loginButton.disabled = true
    })

window.addEventListener('keyup', e => {
    if (e.code == 'Enter') {
        loginButton.click()
    }
})

loginButton.addEventListener('click', (e) => {
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
    .then(response => {
        switch (response.status) {
            /* successfully logged in */
            case 200:
                document.cookie = `email=${emailInput.value}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`
                window.location.href = 'http://localhost:3000/views/homepage.html'
                break

            /* paramaters wrong */
            case 422:
                errorTextDiv.style.display = 'flex'
                errorText.style.display = 'block'
                errorText.textContent = "Email or password invalid"
                break

            /* invalid credentials */
            case 401:
                errorTextDiv.style.display = 'flex'
                errorText.style.display = 'block'
                errorText.textContent = "There isn't an account associated at this email and password"
                break
        }
    })
    .catch(error => {
        errorTextDiv.style.display = 'flex'
        errorText.style.display = 'block'
        errorText.textContent = `${error}`
    })  
})

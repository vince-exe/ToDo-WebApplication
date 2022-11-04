const emailInput = document.getElementById('email-input') as HTMLInputElement
emailInput.value = ""

const passwordInput = document.getElementById('password-input') as HTMLInputElement
passwordInput.value = ""

const registrationButton = document.getElementById('registration-button') as HTMLButtonElement

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
        registrationButton.disabled = true
    })

window.addEventListener('keyup', e => {
    if (e.code == 'Enter') {
        registrationButton.click()
    }
})

registrationButton.addEventListener('click', e => {
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
        .then(response => {
            switch (response.status) {
                case 200:
                    document.cookie = `email=${emailInput.value}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`
                    window.location.href = 'http://localhost:3000/views/homepage.html'
                    break

                case 422:
                    errorTextDiv.style.display = 'flex'
                    errorText.style.display = 'block'
                    errorText.textContent = "Email or password invalid"
                    break

                case 409:
                    errorTextDiv.style.display = 'flex'
                    errorText.style.display = 'block'
                    errorText.textContent = "There is already an account with this email"
                    break

                case 500:
                    errorTextDiv.style.display = 'flex'
                    errorText.style.display = 'block'
                    errorText.textContent = "Application Error"
                    break
            }
        })
        .catch(error => {
            errorTextDiv.style.display = 'flex'
            errorText.style.display = 'block'
            errorText.textContent = `${error}`
        })
})
const hamburger = document.getElementsByClassName('hamburger')[0] as HTMLDivElement
const mainNavBar = document.getElementsByClassName('.main-nav-bar')[0] as HTMLElement

const titleInput = document.getElementById('title-input') as HTMLInputElement
titleInput.value = ""

const bodyInput = document.getElementById('body-input') as HTMLTextAreaElement
bodyInput.value = ""

const createToDOButton = document.getElementById('create-todo-button') as HTMLButtonElement

const errorDiv = document.getElementsByClassName('error-div-container')[0] as HTMLDivElement
const errorText = document.getElementsByClassName('error-text')[0] as HTMLHeadingElement

const exitLink = document.getElementById('exit-link') as HTMLAnchorElement

function displayMessage(error: string): void {
    errorDiv.style.display = 'flex'
    errorText.style.display = 'block'
    errorText.textContent = error
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

hamburger.addEventListener('click', e => {
    hamburger.classList.toggle("active")
    mainNavBar.classList.toggle("active")
})

exitLink.addEventListener('click', () => {
    /* remove the cookie for the authentication */
    document.cookie = 'email=; Max-Age=0; path=/; domain=' + location.hostname;
    window.location.href = 'http://localhost:3000/view/login.html'
})

createToDOButton.addEventListener('click', () => {
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
    .then(response => {
        switch(response.status) {
            case 422:
                displayMessage('Invalid title or body')
                break

            case 409:
                displayMessage('You already have a ToDo with this title')
                break

            case 200:
                titleInput.value = ""
                bodyInput.value = ""
                displayMessage('Successfully created the ToDo')
                break
        }
    })
    .catch(error => {
        displayMessage(error)
    })
})

/* send a POST request to check if the user is authorized to send*/
fetch('http://localhost:3000/homepage/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': getCookie("email"),
    })
})
.then(response => {
    if(response.status != 200) {
        window.location.href = 'http://localhost:3000/views/login.html'
        return
    }
})
.catch(error => {
    console.log(error)
    window.location.href = 'http://localhost:3000/views/login.html'
}) 
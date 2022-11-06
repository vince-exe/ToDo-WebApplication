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

/* send a POST request to check if the user is authorized to send */
fetch('http://localhost:3000/todolist/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': getCookie("email")
    })
})
.then(response => {
    if (response.status != 200) {
        window.location.href = 'http://localhost:3000/views/login.html';
        return;
    }
})
.catch(error => {
    console.log(error);
    window.location.href = 'http://localhost:3000/views/login.html';
})

/* return the bigger multiply of the given number */
function calculateMultiply(n: number, n1: number): number {
    if(n1 < n) { return -1 }

    for(let i = n1; i > 0; i--) {
        if(i % n == 0) {
            return i
        }
    }   

    return n1
}

/* print n todo items for each row */
function printToDoOnTheSameRow(n: number, max: number, todoArray: any): void {
    for (let i = n; i <= max; i += n) {
        let containerDiv = document.createElement('div') as HTMLDivElement
        for (let j = i - n, k = 0; k < n; k++, j++) {
            containerDiv.classList.add('container1')

            let todoDiv = document.createElement('div') as HTMLDivElement
            todoDiv.classList.add('to-do-container')

            let title = document.createElement('h1') as HTMLHeadingElement
            title.textContent = 'Your ToDo'

            todoDiv.appendChild(title)

            let inputContainerTitleDiv = document.createElement('div') as HTMLDivElement
            inputContainerTitleDiv.classList.add('input-container-title')

            let titleInput = document.createElement('input') as HTMLInputElement
            titleInput.id = 'title-input'
            titleInput.type = 'text'
            titleInput.maxLength = 20
            titleInput.value = todoArray[j].title

            inputContainerTitleDiv.appendChild(titleInput)
            todoDiv.appendChild(inputContainerTitleDiv)

            let inputContainerBodyDiv = document.createElement('div') as HTMLDivElement
            inputContainerBodyDiv.classList.add('input-container-body-todo')

            let textArea = document.createElement('textarea') as HTMLTextAreaElement
            textArea.id = 'body-input'
            textArea.value = todoArray[j].body

            inputContainerBodyDiv.appendChild(textArea)
            todoDiv.appendChild(inputContainerBodyDiv)

            let updateButton = document.createElement('button') as HTMLButtonElement
            updateButton.textContent = 'Update'
            updateButton.classList.add('button')
            updateButton.id = 'update-todo-button'
            
            updateButton.addEventListener('click', () => {
                
            })

            let deleteButton = document.createElement('button') as HTMLButtonElement
            deleteButton.textContent = 'Delete'
            deleteButton.classList.add('button')
            deleteButton.id = 'remove-todo-button'

            deleteButton.addEventListener('click', () => {

            })
            
            todoDiv.appendChild(updateButton)
            todoDiv.appendChild(deleteButton)

            containerDiv.appendChild(todoDiv)
        }
        document.body.appendChild(containerDiv)
    }
}

/* print n todo items for each row */
function printToDoRange(min: number, max: number, todoArray: any): void {
    for (let i = min; i < max; i++) {
        let containerDiv = document.createElement('div') as HTMLDivElement

        containerDiv.classList.add('container1')

        let todoDiv = document.createElement('div') as HTMLDivElement
        todoDiv.classList.add('to-do-container')

        let title = document.createElement('h1') as HTMLHeadingElement
        title.textContent = 'Your ToDo'

        todoDiv.appendChild(title)

        let inputContainerTitleDiv = document.createElement('div') as HTMLDivElement
        inputContainerTitleDiv.classList.add('input-container-title')

        let titleInput = document.createElement('input') as HTMLInputElement
        titleInput.id = 'title-input'
        titleInput.type = 'text'
        titleInput.maxLength = 20
        titleInput.value = todoArray[i].title

        inputContainerTitleDiv.appendChild(titleInput)
        todoDiv.appendChild(inputContainerTitleDiv)

        let inputContainerBodyDiv = document.createElement('div') as HTMLDivElement
        inputContainerBodyDiv.classList.add('input-container-body-todo')

        let textArea = document.createElement('textarea') as HTMLTextAreaElement
        textArea.id = 'body-input'
        textArea.value = todoArray[i].body

        inputContainerBodyDiv.appendChild(textArea)
        todoDiv.appendChild(inputContainerBodyDiv)

        let updateButton = document.createElement('button') as HTMLButtonElement
        updateButton.textContent = 'Update'
        updateButton.classList.add('button')
        updateButton.id = 'update-todo-button'

        let deleteButton = document.createElement('button') as HTMLButtonElement
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('button')
        deleteButton.id = 'remove-todo-button'

        todoDiv.appendChild(updateButton)
        todoDiv.appendChild(deleteButton)

        containerDiv.appendChild(todoDiv)
        document.body.appendChild(containerDiv)
    }
}

/* send a POST request to get the to-do list of the user */
fetch('http://localhost:3000/todolist/api/get-todo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': getCookie("email")
    })
})
.then(async response => {
    if (response.status == 200) {
        let todoArray = JSON.parse(await response.text()).toDoList

        let max = calculateMultiply(3, todoArray.length)
        if(max == -1) {
            return printToDoRange(0, todoArray.length, todoArray)
        }

        printToDoOnTheSameRow(3, max, todoArray)

        /* there are more items to print */
        if (todoArray.length - max != 0) {
            return printToDoRange(max, todoArray.length, todoArray)
        }
    }
})
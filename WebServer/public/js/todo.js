var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
    .then(function (response) {
    if (response.status != 200) {
        window.location.href = 'http://localhost:3000/views/login.html';
        return;
    }
})["catch"](function (error) {
    console.log(error);
    window.location.href = 'http://localhost:3000/views/login.html';
});
/* return the bigger multiply of the given number */
function calculateMultiply(n, n1) {
    if (n1 < n) {
        return -1;
    }
    for (var i = n1; i > 0; i--) {
        if (i % n == 0) {
            return i;
        }
    }
    return n1;
}
/* call the API to remove the todo */
var removeTODO = function (title, email) {
    fetch('http://localhost:3000/todolist/api/delete-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'email': getCookie("email")
        })
    })
        .then(function (response) {
        if (response.status == 200) {
            window.location.href = 'http://localhost:3000/views/todo.html';
        }
    })["catch"](function (error) { console.log(error); });
};
/* call the API to update a todo */
var updtTODO = function (title, body, email) {
    fetch('http://localhost:3000/todolist/api/updt-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'body': body,
            'email': getCookie("email")
        })
    })
        .then(function (response) {
        if (response.status == 200) {
            window.location.href = 'http://localhost:3000/views/todo.html';
        }
    })["catch"](function (error) { console.log(error); });
};
/* print n todo items for each row */
function printToDoOnTheSameRow(n, max, todoArray) {
    for (var i = n; i <= max; i += n) {
        var containerDiv = document.createElement('div');
        var _loop_1 = function (j, k) {
            containerDiv.classList.add('container1');
            var todoDiv = document.createElement('div');
            todoDiv.classList.add('to-do-container');
            var title = document.createElement('h1');
            title.textContent = 'Your ToDo';
            todoDiv.appendChild(title);
            var inputContainerTitleDiv = document.createElement('div');
            inputContainerTitleDiv.classList.add('input-container-title');
            var titleInput = document.createElement('input');
            titleInput.id = 'title-input';
            titleInput.type = 'text';
            titleInput.maxLength = 20;
            titleInput.value = todoArray[j].title;
            inputContainerTitleDiv.appendChild(titleInput);
            todoDiv.appendChild(inputContainerTitleDiv);
            var inputContainerBodyDiv = document.createElement('div');
            inputContainerBodyDiv.classList.add('input-container-body-todo');
            var textArea = document.createElement('textarea');
            textArea.id = 'body-input';
            textArea.value = todoArray[j].body;
            inputContainerBodyDiv.appendChild(textArea);
            todoDiv.appendChild(inputContainerBodyDiv);
            var updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('button');
            updateButton.id = 'update-todo-button';
            updateButton.addEventListener('click', function () {
                updtTODO(titleInput.value, textArea.value, getCookie("email"));
            });
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('button');
            deleteButton.id = 'remove-todo-button';
            deleteButton.addEventListener('click', function () {
                removeTODO(todoArray[j].title, getCookie("email"));
            });
            todoDiv.appendChild(updateButton);
            todoDiv.appendChild(deleteButton);
            containerDiv.appendChild(todoDiv);
        };
        for (var j = i - n, k = 0; k < n; k++, j++) {
            _loop_1(j, k);
        }
        document.body.appendChild(containerDiv);
    }
}
/* print n todo items for each row */
function printToDoRange(min, max, todoArray) {
    var _loop_2 = function (i) {
        var containerDiv = document.createElement('div');
        containerDiv.classList.add('container1');
        var todoDiv = document.createElement('div');
        todoDiv.classList.add('to-do-container');
        var title = document.createElement('h1');
        title.textContent = 'Your ToDo';
        todoDiv.appendChild(title);
        var inputContainerTitleDiv = document.createElement('div');
        inputContainerTitleDiv.classList.add('input-container-title');
        var titleInput = document.createElement('input');
        titleInput.id = 'title-input';
        titleInput.type = 'text';
        titleInput.maxLength = 20;
        titleInput.value = todoArray[i].title;
        inputContainerTitleDiv.appendChild(titleInput);
        todoDiv.appendChild(inputContainerTitleDiv);
        var inputContainerBodyDiv = document.createElement('div');
        inputContainerBodyDiv.classList.add('input-container-body-todo');
        var textArea = document.createElement('textarea');
        textArea.id = 'body-input';
        textArea.value = todoArray[i].body;
        inputContainerBodyDiv.appendChild(textArea);
        todoDiv.appendChild(inputContainerBodyDiv);
        var updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('button');
        updateButton.id = 'update-todo-button';
        updateButton.addEventListener('click', function () {
            updtTODO(titleInput.value, textArea.value, getCookie("email"));
        });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('button');
        deleteButton.id = 'remove-todo-button';
        deleteButton.addEventListener('click', function () {
            removeTODO(todoArray[i].title, getCookie("email"));
        });
        todoDiv.appendChild(updateButton);
        todoDiv.appendChild(deleteButton);
        containerDiv.appendChild(todoDiv);
        document.body.appendChild(containerDiv);
    };
    for (var i = min; i < max; i++) {
        _loop_2(i);
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
    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
    var todoArray, _a, _b, max;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(response.status == 200)) return [3 /*break*/, 2];
                _b = (_a = JSON).parse;
                return [4 /*yield*/, response.text()];
            case 1:
                todoArray = _b.apply(_a, [_c.sent()]).toDoList;
                max = calculateMultiply(3, todoArray.length);
                if (max == -1) {
                    return [2 /*return*/, printToDoRange(0, todoArray.length, todoArray)];
                }
                printToDoOnTheSameRow(3, max, todoArray);
                /* there are more items to print */
                if (todoArray.length - max != 0) {
                    return [2 /*return*/, printToDoRange(max, todoArray.length, todoArray)];
                }
                _c.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });

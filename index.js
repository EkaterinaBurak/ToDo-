"use strict";

let DB = getTodosInStorage();
render();
initCardListeners($("#todo-list"));

$("#add-todo").addEventListener("click", function () {
    if (isLimitTodos()) {
        getToastActive();
        closeToast();
        clearInput(input);
    } else {
        createCard($("#input").value);
        setTodosInStorage($("#input").value);
        clearInput($("#input"));
        initCardListeners($("#todo-list"));
        printStorageLength()
    }
});

function initCardListeners(list) {
    list.childNodes.forEach(function (element, index) {
        const id = element.id;
        element.addEventListener("click", function (e) {
            if (e.target.className === "btn-close") {
                DB = deleteTodoFromStorage(id);
                localStorage.setItem("todos", JSON.stringify(DB));
                this.remove();
                printStorageLength();
            }
        });
    });
}

function $(selector) {
    return document.querySelector(selector);
}

function createElement(tag, classNames, text = "", id = "") {
    let element = document.createElement(tag);
    element.className = classNames;
    element.id = id;
    element.innerText = text;
    return element;
}
function createCard(text) {
    let card = createElement("div", "card", "", text);
    let cardText = createElement("div", "card-body d-flex justify-content-between", text);
    let btnClose = createElement("button", "btn-close");
    cardText.append(btnClose);
    card.append(cardText);
    $("#todo-list").append(card);
}

function clearInput(input) {
    input.value = "";
}

function getTodosInStorage() {
    let data = JSON.parse(localStorage.getItem("todos")) || [];
    return data;
}

function setTodosInStorage(todoValue) {
    DB.push(todoValue);
    localStorage.setItem("todos", JSON.stringify(DB));
}

function render() {
    DB.forEach((todo) => {
        createCard(todo);
    });
    printStorageLength();
}

function printStorageLength() {
    $('.badge').innerText = DB.length;
}

function isLimitTodos() {
    return DB.length > 5;

}

function getToastActive() {
    $('.toast').classList.add('show');
}

function closeToast() {
    $(".btn-close").addEventListener("click", function () {
        $('.toast').classList.remove('show');
    })
}

function deleteTodoFromStorage(id) {
    let deleteElement = 0;
    deleteElement = DB.filter(function (e) {
        return e != id;
    });
    return deleteElement;
}
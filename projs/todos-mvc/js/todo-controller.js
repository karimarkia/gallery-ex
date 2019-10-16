'use strict';


function init() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosToShow();
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li onclick="onToggleTodo(this, ${todo.id})" ${className}>
        <span class="removeBtn" onclick="onRemoveTodo(event, ${todo.id})">🗑</span>
        ${todo.txt} <span class="up"></span><span class="down"></span>
        </li>`
    })
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    renderStats();
}

function renderStats() {
    var totalCount = getTotalCount();
    var activeCount = getActiveCount();
    document.querySelector('.total-count').innerText = totalCount;
    document.querySelector('.active-count').innerText = activeCount;
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    removeTodo(todoId)
    renderTodos();
}

function onToggleTodo(elTodo, todoId) {
    toggleTodo(todoId)
    elTodo.classList.toggle('done');
    renderStats();
}

function onAddTodo() {
    var elTxt = document.querySelector('input');
    var txt = elTxt.value
    if (!txt) return
    elTxt.value = '';
    elTodoList.classList.add('todo-list')
    addTodo(txt);
    renderTodos(gTodos)
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}

// up down
function moveUp(element) {
    if (element.previousElementSibling)
        element.parentNode.insertBefore(element, element.previousElementSibling);
}

function moveDown(element) {
    if (element.nextElementSibling)
        element.parentNode.insertBefore(element.nextElementSibling, element);
}
document.querySelector('ul').addEventListener('click', function (e) {
    if (e.target.className === 'down') moveDown(e.target.parentNode);
    else if (e.target.className === 'up') moveUp(e.target.parentNode);
});
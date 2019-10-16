'use strict';


var gNextId = 101;
var gNextNum = 1;
var gTodos = createTodos();
var gFilterBy = 'All';
var gSortBy = 'Text';

function createTodos() {
    return [
        createTodo('cco that'),
        createTodo('aao this'),
        createTodo('bSleep now'),
    ]
}

function createTodo(txt) {
    return {
        id: gNextId++,
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: gNextNum++
    }
}

function removeTodo(todoId) {
    var res = confirm('Are you sure ?')
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    if (res) {
        gTodos.splice(todoIdx, 1);
    }
}

function getTodosToShow() {
    var todosToShow = gTodos.filter(function (todo) {
        return (gFilterBy === 'All' && todo) ||
            (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)
    })
    return todosToShow.sort(function (todo1, todo2) {
        if (gSortBy === 'Text') return (todo1.txt > todo2.txt) ? 1 : -1
        if (gSortBy === 'created') return (todo1.createdAt > todo2.createdAt) ? 1 : -1
    })
}

function getTotalCount() {
    return gTodos.length;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    // if (!todo) return;
    todo.isDone = !todo.isDone;
}

function addTodo(txt) {
    gTodos.push(createTodo(txt));
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length
}
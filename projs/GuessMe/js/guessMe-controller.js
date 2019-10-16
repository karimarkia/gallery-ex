'use strict';

var gLastRes = null;

$(document).ready(onInit);

function onInit() {
    loadFromLocalStorage();
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    $('.quest').show();
    renderQuest();
}

function renderQuest() {
    $('.quest h2').text(gCurrQuest.text)
}

function onUserResponse(res) {
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.quest').hide();
            $('.win').show();
        } else {
            $('.quest').hide();
            $('.new-quest').show();
            $('#new-guess').val('')
            $('#new-quest').val('')
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
    // console.log(gQuestsTree);
}

function onAddGuess() {
    var userThoughtOf = $('#new-guess').val()
    var userQuest = $('#new-quest').val()
    addGuess(userThoughtOf, userQuest, gLastRes)
    onRestartGame();
}

function onRestartGame() {
    $('.win').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    restartGame();
}
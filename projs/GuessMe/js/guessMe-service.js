var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const GUESS_KEY = 'Guess'

function createQuestsTree() {
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Is your character real?');
        gQuestsTree.yes = createQuest('Is it Madonna ?');
        gQuestsTree.no = createQuest('Is it Ghost ?');
        gCurrQuest = gQuestsTree;
        gPrevQuest = null;
    }
}

function createQuest(txt) {
    return {
        text: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    if (res === 'yes') gCurrQuest = gCurrQuest.yes
    else gCurrQuest = gCurrQuest.no;
}

function addGuess(newGuessTxt, newQuestTxt, lastRes) {
    gPrevQuest[lastRes] = createQuest(newQuestTxt)
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
    gPrevQuest[lastRes].no = gCurrQuest;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem(GUESS_KEY, JSON.stringify(gQuestsTree))
}

function loadFromLocalStorage() {
    gQuestsTree = JSON.parse(localStorage.getItem(GUESS_KEY));
    gCurrQuest = gQuestsTree;
}
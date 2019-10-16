
function toggleAside(ev) {
    ev.stopPropagation();
    document.querySelector('aside').classList.toggle('hidden');
    document.querySelector('.screen').classList.toggle('hide');
    document.querySelector('.drop-side').classList.add('hidden');
    document.querySelector('.drop-top').classList.add('hidden');
}

function onOpenModal(blogItemNum) {
    var elModal = document.querySelector('.modal');
    var elNav = document.querySelector('.main-nav');
    var elBlogItem = document.querySelector(`.blog-item:nth-child(${blogItemNum})`)
    elModal.classList.remove('hide')
    elModal.querySelector('img').src = elBlogItem.querySelector('img').src
    elModal.querySelector('h2').innerHTML = elBlogItem.querySelector('h2').innerHTML
    elModal.querySelector('p').innerHTML = elBlogItem.querySelector('p').innerHTML
    elNav.classList.add('z-index')


}

function onCloseModal(blogItemNum) {
    document.querySelector('.modal').classList.add('hide');
}

function onDropDownMenu(ev) {
    ev.stopPropagation();
    document.querySelector('.drop-top').classList.toggle('hidden');
    document.querySelector('.drop-side').classList.toggle('hidden');
}

function closeDropDown(ev) {
    ev.stopPropagation();
    document.querySelector('.drop-top').classList.add('hidden');
    document.querySelector('.drop-side').classList.add('hidden');
}
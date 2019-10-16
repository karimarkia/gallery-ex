// create functions bla ...

var elProjects = document.querySelector('.row1');

var gProjects = [{
        id: 'Board Game',
        name: 'Board Game',
        title: 'Board Game',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (6).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/chess-proj/index.html'
    },
    {
        id: 'MineSweeper',
        name: 'MineSweeper',
        title: 'MineSweeper',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (9).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/OPTIONAL DELIVERY - Saturday 2200/index.html'
    },
    {
        id: 'Pacman Game',
        name: 'Pacman Game',
        title: 'Pacman Game',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (10).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/pacman-starter/index.html'
    },
    {
        id: 'Todo List',
        name: 'Todo List',
        title: 'Todo List',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (11).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/todos-mvc/index.html'
    },
    {
        id: 'Guess Me ',
        name: 'Guess Me',
        title: 'Guess Me',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (12).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/GuessMe/index.html'
    },
    {
        id: 'Perfect Pixel Website',
        name: 'Perfect Pixel Website',
        title: 'Perfect Pixel Website',
        desc: 'A page of content is available for display only to logged in users, certain users have admin credentials and can view a special page with informatin about all users',
        url: 'img/portfolio/Screenshot (13).png',
        publishedAt: 1448693940000,
        labels: ['MVC', 'data tree'],
        projUrl: 'projs/LivePage/index.html'
    }
]

function getProjById(id) {
    return gProjects.find(function (proj) {
        return proj.id === id;

    });
}
// render function bla bla bla 

function init() {
  renderBoard();

}

function renderBoard() {
  var strHTMLs = gProjects.map(function (project) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="renderModal('${project.id}')">
        <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x" onclick="renderModal(${project.id})"></i>
            </div>
          </div>
          <img class="img-fluid" src="${project.url}">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
        </div>
      </div>`
  })
  elProjects.innerHTML = strHTMLs.join('');
}


function renderModal(projid) {
  var proj = getProjById(projid);
  var $modal = $('.modal');
  var $img = $modal.find('img')
  var badgesHtmlStr = proj.labels.reduce(function (acc, label) {
    return acc + `<span class="badge badge-secondary">${label}</span>`
  }, '')
  $modal.find('h2').html(proj.name);
  $modal.find('.item-intro').html(proj.title);
  $img.attr('src', proj.url);
  $img.off();
  $img.click(function () {
    gotoProj(projid)
  });
  $modal.find('.proj-description').html(proj.desc + badgesHtmlStr);
  $modal.find('.date-created').html(new Date(proj.publishedAt));
}

function gotoProj(id) {
  var projUrl = getProjById(id).projUrl;
  window.open(projUrl);
}


function onSubmitMail() {
  var mailAddress = $('.contact-email').val();
  var mailSubject = $('.contact-subject').val();
  var mailBody = $('.contact-message').val();
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=karimarkia@gmail.com.com&su=${mailSubject}&b
      ody=${mailBody}`)
}
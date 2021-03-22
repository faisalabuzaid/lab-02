'use strict';


$('document').ready(function () {

  const Gallery = function(name) {
    this.title= name.title;
    this.image_url = name.image_url;
    this.description = name.description;
    this.keyword = name.keyword;
    this.horns = name.horns;
  };

  Gallery.prototype.render = function() {
    let galleryContainer = $('.photoTemplate').clone();
    $('main').append(galleryContainer);
    let list = $('<option></option>').text(this.keyword);
    $('select').append(list);
    galleryContainer.find('h2').text(this.title);
    galleryContainer.find('img').attr('src', this.image_url);
    galleryContainer.find('p').text(this.description);
    galleryContainer.find('.keyword').text(this.keyword);
    galleryContainer.find('article').text(`Horns Number Is: ${this.horns}`);
    galleryContainer.attr('class', this.keyword);

  };

  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let buildup = new Gallery(item);
      buildup.render();
    });
  });
});

$('select').on('change', function () {
  let selected = this.value;
  $('section').hide();
  $(`.${selected}`).show();
});

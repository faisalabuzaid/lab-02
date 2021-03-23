'use strict';

let all =[];
$('document').ready(function () {

  const Gallery = function(name) {
    this.title= name.title;
    this.image_url = name.image_url;
    this.description = name.description;
    this.keyword = name.keyword;
    this.horns = name.horns;
    all.push(this);
  };

  // Gallery.prototype.render = function() {
  //   let galleryContainer = $('.photoTemplate').clone();
  //   $('main').append(galleryContainer);
  //   let list = $('<option></option>').text(this.keyword);
  //   $('select').append(list);
  //   galleryContainer.find('h2').text(this.title);
  //   galleryContainer.find('img').attr('src', this.image_url);
  //   galleryContainer.find('p').text(this.description);
  //   galleryContainer.find('.keyword').text(this.keyword);
  //   galleryContainer.find('article').text(`Horns Number Is: ${this.horns}`);
  //   galleryContainer.attr('class', this.keyword);

  // };
  Gallery.prototype.renderTwo = function() {
    let template = $('#mustache-template').html();
    console.log(template);
    //2. use Mustache to render new html .render method
    let html = Mustache.render(template, this);
    //3.return the html
    return html;

  };
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  // $.ajax('data/page-1.json', ajaxSettings).then(data => {
  //   data.forEach(item => {
  //     let buildup = new Gallery(item);
  //     buildup.render();
  //   });
  // });

  $.ajax('data/page-2.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let buildup = new Gallery(item);
      buildup.renderTwo();
    });
  }); });


// $('select').on('change', function () {
//   let selected = this.value;
//   if(this.value !== 'default') {
//     $('section').hide();
//     $(`.${selected}`).show();
//   } else {
//     $('section').show();
//   }

// });

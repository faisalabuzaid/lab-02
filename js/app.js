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
    // $('.filter')
    //   .find('option')
    //   .remove()
    //   .end()
    //   .append('<option value="whatever">'+this.keyword+'</option>')
    //   .val(this.keyword)
    // ;
    let template = $('#mustache-template-1').html();
    let pageHtml = Mustache.render(template, this);
    $('main').append(pageHtml);
    console.log(pageHtml);

    return pageHtml;


  };
  Gallery.prototype.renderTwo = function () {
    let template = $('#mustache-template').html();
    let pageHtml = Mustache.render(template, this);
    $('main').append(pageHtml);
    console.log(pageHtml);

    return pageHtml;
  };

  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $('.template').hide();
  $('.template-1').show();
  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let buildup = new Gallery(item);
      buildup.render();
    });
  });

  $('button').click(function() {
    if(this.id === 'firstpage') {
      $('.template-1').remove();
      $('.template').hide();
      $('.template-1').show();
      $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(item => {
          let buildup = new Gallery(item);
          buildup.render();
        });
      });
    } else if(this.id === 'secondpage'){
      $('.template').remove();
      $.ajax('data/page-2.json', ajaxSettings).then(data => {
        data.forEach(item => {
          let buildup = new Gallery(item);
          $('.template-1').hide();
          buildup.renderTwo();
        });
      });
    } else {
      $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(item => {
          let buildup = new Gallery(item);
          buildup.render();
        });
      });
    }
  });


  $('select').on('change', function () {
    let selected = this.value;
    if(this.value !== 'default') {
      $('.template').hide();
      $(`.${selected}`).show();
    } else {
      $('.template').show();
    }

  });
});

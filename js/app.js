'use strict';
let pageTwo =[];
let pageOne=[];
$('document').ready(function () {

  const Gallery = function(name) {
    this.title= name.title;
    this.image_url = name.image_url;
    this.description = name.description;
    this.keyword = name.keyword;
    this.horns = name.horns;
    // all.push(this);
  };

  Gallery.prototype.render = function() {
    $('select').append('<option>'+this.keyword+'</option>');
    let template = $('#mustache-template-1').html();
    let pageHtml = Mustache.render(template, this);
    $('main').append(pageHtml);

    return pageHtml;


  };
  Gallery.prototype.renderTwo = function () {
    $('select').append('<option>'+this.keyword+'</option>');
    let template = $('#mustache-template').html();
    let pageHtml = Mustache.render(template, this);
    $('main').append(pageHtml);

    return pageHtml;
  };

  Gallery.prototype.renderList = function() {
    var finishItems = {};
    $('select > option').each(function () {
      if(finishItems[this.text]) {
        $(this).remove();
      } else {
        finishItems[this.text] = this.value;
      }});
  };

  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  pageOne=[];
  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let buildup = new Gallery(item);
      buildup.render();
      buildup.renderList();
      pageOne.push(buildup);
    });

  });

  $('button').click(function() {
    if(this.id === 'firstpage') {
      pageOne=[];
      $('div').remove();
      $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(item => {
          let buildup = new Gallery(item);
          buildup.render();
          buildup.renderList();
          pageOne.push(buildup);
        });
      });
    } else if(this.id === 'secondpage'){
      pageTwo =[];
      $('div').remove();
      $.ajax('data/page-2.json', ajaxSettings).then(data => {
        data.forEach(item => {
          let buildup = new Gallery(item);
          buildup.renderTwo();
          buildup.renderList();
          pageTwo.push(buildup);
        });

      });
      console.log(pageTwo);
    }
  });


  $('select').on('change', function () {
    let selected = this.value;
    console.log(selected);
    if(this.value !== 'default') {
      $('div').hide();
      $(`div.${selected}`).show();
    } else {
      $('div').show();
    }

  });
});

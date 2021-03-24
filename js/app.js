'use strict';

$('document').ready(function () {

  let testArr =[];

  const Gallery = function(name) {
    this.title= name.title;
    this.image_url = name.image_url;
    this.description = name.description;
    this.keyword = name.keyword;
    this.horns = name.horns;
  };

  Gallery.prototype.render = function() {
    $('.filter').append('<option>'+this.keyword+'</option>');
    let template = $('#mustache-template-1').html();
    let pageHtml = Mustache.render(template, this);
    $('main').append(pageHtml);

    return pageHtml;


  };
  Gallery.prototype.renderTwo = function () {
    $('.filter').append('<option>'+this.keyword+'</option>');
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

  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    testArr =[];
    data.forEach(item => {
      let buildup = new Gallery(item);
      testArr.push(buildup);
      buildup.render();
      buildup.renderList();

    });
    console.log(testArr);
  });

  $('button').click(function() {
    if(this.id === 'firstpage') {
      $('div').remove();
      $.ajax('data/page-1.json', ajaxSettings).then(data => {
        testArr = [];
        data.forEach(item => {
          let buildup = new Gallery(item);
          testArr.push(buildup);
          buildup.render();
          buildup.renderList();

        });
        console.log(testArr);

      });
    } else if(this.id === 'secondpage'){
      $('div').remove();
      $.ajax('data/page-2.json', ajaxSettings).then(data => {
        testArr = [];
        data.forEach(item => {
          let buildup = new Gallery(item);
          testArr.push(buildup);
          buildup.renderTwo();
          buildup.renderList();
        });
        console.log(testArr);
      });
    }
  });


  $('.filter').on('change', function () {
    let selected = this.value;
    console.log(selected);
    if(this.value !== 'default') {
      $('div').hide();
      $(`div.${selected}`).show();
    } else {
      $('div').show();
    }

  });

  $('#sort').on('change', function () {
    let selected = this.value;
    console.log(selected);
    if(this.value === 'title') {
      $('div').hide();
      testArr.sort((a,b) => a.title > b.title ? 1 : -1);
      console.log(testArr);
      testArr.forEach(item => {
        item.render();

      });
    }
    //   $(`div.${selected}`).show();
    //  else {
    //   $('div').show();
    // }

  });

});

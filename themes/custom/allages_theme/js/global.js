/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.allages_theme = {
    attach: function (context, settings) {

    }
  };


  // Resize Font size
  $('#_biggify').on('click', function() {
    let fontSize = $('html').css('font-size');
    let newFontSize = parseInt(fontSize)+1;

    $('html').css('font-size', newFontSize+'px')
  })

  $('#_smallify').on('click', function() {
    let fontSize = $('html').css('font-size');
    let newFontSize = parseInt(fontSize)-1;

    $('html').css('font-size', newFontSize+'px')
  })


  // ACCORDION
  $('.page-view-glossary .views-field-name').each(function(){
    $(this).on('click', function(e){
      e.preventDefault();
      $(this).toggleClass('selected');
      $(this).siblings('.views-field-description__value').stop().slideToggle();
    });
  });

  // More-Info modal in Frontpage and Select-your-profile

  $('#moreInfoBut').on('click', 'a', function(e){
    e.preventDefault();
    $('#moreInfoDiv').stop().slideDown();
    $('body').append('<div class="overlay-custom-background"></div>');
  })
  $('#moreInfoDiv').on('click', '.close', function(e){
    e.preventDefault();
    $('#moreInfoDiv').stop().slideUp();
    setTimeout(function(){
      $('body').find('.overlay-custom-background').remove();
    }, 400);

  })


  // Did-you-know Source modal

  $('.buttonViewSource').on('click', '.viewSource', function(e){
    e.preventDefault();
    $(this).closest('.sourceLink').find('.pop-up-content').stop().slideDown();
    $('body').append('<div class="overlay-custom-background"></div>');
  })
  $('.pop-up-content').on('click', '.pop-up-close', function(e){
    e.preventDefault();
    $('.pop-up-content').stop().slideUp();
    setTimeout(function(){
      $('body').find('.overlay-custom-background').remove();
    }, 400);

  })

  //URL parameters when clicked on Front page Map
  var origin_url   = window.location.origin;
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  var param1 = getUrlParameter('c');
  var param2 = getUrlParameter('l');
  var newUrl = origin_url + '/all-ages/' + param1 + '_' + param2 + '/select-your-profile';

  //redirect to new page
  if (param1 != '0'){
    window.location = newUrl;
  }
})(jQuery, Drupal);



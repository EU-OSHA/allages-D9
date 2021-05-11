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

  // Glossary active class by default
  $('.view-glossary').each(function(){
    if($(this).find('.views-summary .is-active').length==0){
      $(this).find('.views-summary').eq(0).find('a').addClass('is-active');
    }
  });


  // Add index letter to the glossary
  $('.view-glossary').each(function(){
    if($(this).find('.views-summary .is-active').length>0){
      // let glossaryIndex= $(this).find('.views-summary .is-active').clone();
      // alert(glossaryIndex.html());
      // if($('.item-list').siblings('.glossary-index-custom').length==0) {
      //   $('.item-list').before(glossaryIndex);
      //   $('.item-list').siblings('.is-active').addClass('glossary-index-custom');
      // }


      let glossaryActiveIndex= $(this).find('.views-summary .is-active').html();
      let glossaryIndex='<div class="glossary-index-custom"><span>'+glossaryActiveIndex+'</span></div>';
      if($('.item-list').siblings('.glossary-index-custom').length==0) {
        $('.item-list').before(glossaryIndex);
      }
    }

  });

  // Did-you-know Source modal
  $('.view-did-you-know').on('click', '.viewSource', function(e){
    e.preventDefault();
    let windowHeight=$(window).height();
    let modalHeight=$(this).closest('.sourceLink').find('.pop-up-content').outerHeight();
    let modalPosition=(windowHeight-modalHeight)/2 + 'px';
    $(this).closest('.sourceLink').find('.pop-up-content').css({'top':modalPosition});
    $(this).closest('.sourceLink').find('.pop-up-content').stop().slideDown();
    $('body').append('<div class="overlay-custom-background"></div>');
  })
  $('.view-did-you-know').on('click', '.pop-up-close', function(e){
    e.preventDefault();
    $('.pop-up-content').stop().slideUp();
    setTimeout(function(){
      $('body').find('.overlay-custom-background').remove();
    }, 400);

  })

  $('.view-good-practices .views-view-grid .views-col').each(function(){
    $(this).on('mouseenter', function(){
      $(this).addClass('mouse-enter');
    });
    $(this).on('mouseleave', function(){
      $(this).removeClass('mouse-enter');
    });
    $(this).on('click', '.share-link', function(){
      $(this).siblings('.buttons-container').show(0);
    })
  });

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



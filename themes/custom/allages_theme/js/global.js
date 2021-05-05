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


  /** ACCORDION **/
  $('.page-view-glossary .views-field-name').each(function(){
    $(this).on('click', function(e){
      e.preventDefault();
      $(this).toggleClass('selected');
      $(this).siblings('.views-field-description__value').stop().slideToggle();
    });
  });

})(jQuery, Drupal);



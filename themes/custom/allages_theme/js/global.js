/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.napo_theme = {
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



  $(window).on('load', function() {

  });



  /** ACCORDION **/
  jQuery(document).ready(function () {

    function accordionOpen(elem){
      let contentDiv = jQuery(elem).next();
      let parentDiv = jQuery(elem).closest('.accordion-item');

      if ( parentDiv.hasClass("active")) {
        jQuery(contentDiv).slideUp(600).fadeOut(600);
        jQuery(parentDiv).removeClass('active');
        jQuery(elem).removeClass('active');
      } else {
        jQuery('.accordion-item').removeClass('active');
        jQuery('.accordion-item .field__label').removeClass('active');
        jQuery('.accordion-item .field__item').slideUp(600);
        jQuery(contentDiv).slideDown(600).fadeIn(600);
        jQuery(parentDiv).addClass('active');
        jQuery(elem).addClass('active');
      }
    }

    jQuery('.accordion-item .field__label').click(function () {
      accordionOpen( this );
    });
  });

})(jQuery, Drupal);



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
    let glossaryHasResults= $(this).find('.item-list').length;
    let glossaryHasActiveElement=$(this).find('.views-summary .is-active').length;
    if(glossaryHasActiveElement==0 && glossaryHasResults>0){
      $(this).find('.views-summary').eq(0).find('a').addClass('is-active');
    }
  });

  // Add index letter to the glossary
  $('.view-glossary').each(function(){
    if($(this).find('.views-summary .is-active').length>0){
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

  // Good practice - show the share-buttons at mouse enter
  $('.view-good-practices ').each(function(){
    $(this).on('mouseenter', ' .views-view-grid .views-col', function(){
      $(this).addClass('mouse-enter');
      if($(this).find('.onomasticon-custom-detail').length==0){
        $(this).find('.onomasticon').each(function(){
          let title=$(this).attr('title');
          $(this).prepend('<span class="onomasticon-custom-detail">'+ title +'</span>');
          $(this).removeAttr('title');
        });
      }
    });
    $(this).on('mouseleave', ' .views-view-grid .views-col', function(){
      $(this).removeClass('mouse-enter');
      $(this).find('.buttons-container').hide();
    });
    $(this).on('click', '.views-view-grid .views-col .share-link', function(){
      $(this).siblings('.buttons-container').toggle(0);
    })
  });

  // Tour animation
  $('#tour').on('click', function(){
    let windowWidth= $(window).outerWidth();
    $('.content-tour').stop().show();
    $('.content-tour').find('.tour').eq(0).addClass('active');
    if(windowWidth>1023){
      $('.content-tour').find('.next-tour a').addClass('disabled');
      setTimeout(function() {
        $('.next-tour a').removeClass('disabled');
      }, 2000);
    }
  });

  $('.content-tour').each(function(){
    let tourCounter=0;
    let tourAmount=$(this).find('.tour').length;
    $(this).on('click','.skip-tour a', function(e){
      e.preventDefault()
      $(this).closest('.content-tour').stop().hide();
      $(this).closest('.content-tour').find('.tour').removeClass('active');
      tourCounter=0
    })
    $(this).on('click','.close-tour', function(e){
      e.preventDefault()
      $(this).closest('.content-tour').stop().hide();
      $(this).closest('.content-tour').find('.tour').removeClass('active');
      tourCounter=0
    })
    $(this).on('click','.next-tour a', function(e){
      e.preventDefault()
      let windowWidth= $(window).outerWidth();
      if(windowWidth>1023){
        $(this).addClass('disabled');
      }
      if(tourCounter < tourAmount -1){
        tourCounter++;
        $(this).closest('.content-tour').find('.tour').removeClass('active');
        $(this).closest('.content-tour').find('.tour').eq(tourCounter).addClass('active');
        if(windowWidth>1023) {
          setTimeout(function () {
            $('.next-tour a').removeClass('disabled');
          }, 2000);
        }
      }
      else{
        $(this).closest('.content-tour').find('.tour').removeClass('active');
        $(this).closest('.content-tour').stop().hide();
        tourCounter=0;
        if(windowWidth>1023) {
          $('.next-tour a').removeClass('disabled');
        }
      }
    })
  });

  // Themes - Slice title to remove the number
  $('.view-themes .views-field-title-1 .field-content').each(function(){
    let title=$(this).text();
    let newTitle = title.split(': ');
    $(this).text(newTitle[1]);
  });

    // Themes - Show more info
  $('.view-themes').on('click', '.plus', function(){
    $(this).closest('li').find('.morethemeinfono').show();
  })
  $('.view-themes').on('click', '.minor', function(){
    $(this).closest('li').find('.morethemeinfono').hide();
  })

  // Themes detail - Slice title
  $('.content-themes-detail .left-column h1').each(function(){
    let $title=$(this);
    let titleText=$(this).text();
    let newTitle = titleText.split(': ');
    let newTitleText='<span class="title-custom-number">'+newTitle[0]+'</span><span class="title-custom-text">'+newTitle[1]+'</span>';
    $title.html(newTitleText);
    $title.closest('.left-column').addClass('js-custom-step-'+newTitle[0]);
  });

  // Themes - class for define the user profile icon
  $('.view-themes').each(function(){
    let profileID= $(this).find('.vocabulary-profile ').attr('id');
    $(this).find('.ico-profile').addClass(profileID);
  });

  //Select profile and/or language
  $('.language-profile-selector').on('click','.profileTab', function(){
    $(this).closest('.language-profile-selector').find('.containerC').stop().slideUp(0);
    $(this).closest('.language-profile-selector').find('#profileDiv').stop().slideToggle();
  });
  $('.language-profile-selector').on('click','.country', function(){
    $(this).closest('.language-profile-selector').find('#profileDiv').stop().slideUp(0);
    $(this).closest('.language-profile-selector').find('.containerC').stop().slideToggle();
  });

  // Language-profile-selector - Show languages per country
  $('.language-profile-selector #listText>ul>li>ul').each(function(){
    let amountLanguages = $(this).find('li').length;
    if(amountLanguages<=1){
      $(this).addClass('languagecount-custom-1');
    }
  });
  $('.language-profile-selector').on('click','#listText>ul>li', function(){
    $(this).siblings('li').find('ul').slideUp(0);
    if($(this).find('ul>li').length>1){
      $(this).find('ul').slideDown();
    }
  })

  // Show message for visitors
  $(window).on('load', function() {
    if (!$('body').hasClass('user-logged-in') && $('body').find('#sliding-popup').length >0) {
      let messageInfo = $('.eu-cookie-compliance-banner').find('.messageInfo').html();
      let visitorMessage = '<div class="message-custom-visitor"><span class="message-ico"></span><span class="message-text">' + messageInfo + '</span><span class="close">X</span></div>';
      if ($('body').find('.message-custom-visitor').length == 0)
        $('body').append(visitorMessage);
        $('body').append('<div class="overlay-custom-background"></div>');
    }
    $('body').on('click','.message-custom-visitor .close', function(){
      $('body').find('.message-custom-visitor').remove();
      $('body').find('.overlay-custom-background').remove();
    });
  });

  // Langselect - counter of the number of languages per country

  $('#langselect ul li ul').each(function(){
    let languageCount= $(this).find('li').length;
    $(this).addClass('languagecount-custom-' + languageCount);
  });

  // Useful-links active state on filter
  $('.page-view-useful-links, .page-vocabulary-categories-useful-links').each(function(){
    let visibleCategories=$(this).find('.view-useful-links h3, .view-taxonomy-term h3').length;
    if(visibleCategories > 1){
      $('.content-all-button').find('a').addClass('active');
    }
    else if(visibleCategories == 1){
      let visibleCategory=$(this).find('.view-useful-links h3, .view-taxonomy-term h3').html();
      $('.view-filter-useful-links a').each(function(){
        if($(this).find('div').html()==visibleCategory){
          $(this).addClass('active');
        }
      });
    }
  });

  // Quiz text placement
  $('.quiz-container').each(function(){
    let $text= $(this).find('.chose-caption');
    $(this).find('.table-responsive').prepend($text);
    $(this).find('#edit-question-7-answer--wrapper').before($text);
  });
})(jQuery, Drupal);



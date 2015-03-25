var IT_SCROLL = (function ($) {
  'use strict';

  /* html stuff */
  var
    $noveltyItem = $('#novelty-section').find('div.novelty-section__item'),
    $menuBlock = $('#menu-block-container'),
    $anchor = $('.section-navigation__bullet'),
    $root = $('html, body');

  function changeMenuBlock(scroll) {

    if (scroll >= 50) {
      $menuBlock
        .addClass('hide')
        .addClass('fixed')
        .find('button.buy-ticket-btn')
        .removeClass('hidden');
    } else {
      $menuBlock
        .removeClass('fixed')
        .removeClass('hide')
        .find('button.buy-ticket-btn')
        .addClass('hidden');
    }

  };

  function animateNoveltyItems(scroll) {
    if (scroll >= 350) {
      $noveltyItem.addClass('show-up');
    }
  }


  /* return public API */
  return {

    /* initialize function */
    init: function () {
      $(window).on('scroll', this.onScroll);
      $(window).on('load', this.onPageLoad);
      $anchor.on('click', this.animateAnchor);
    },

    /* do stuff when page loaded */
    onPageLoad: function () {
      var $scroll = $(this).scrollTop();

      /* change state of menu block */
      //changeMenuBlock($scroll);

      //animateNoveltyItems($scroll);

    },

    /* do stuff when scrolling */
    onScroll: function () {
      var $scroll = $(this).scrollTop();
      console.log($scroll);

      /* change state of menu block */
      changeMenuBlock($scroll);

      animateNoveltyItems($scroll);

    },

    animateAnchor: function () {
      $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
    }

  };


})(jQuery);


/* when document ready */
$(document).ready(function () {
  'use strict';

  IT_SCROLL.init();
});

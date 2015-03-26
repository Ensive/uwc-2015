var IT_UI_EVENTS = (function ($) {
  'use strict';

  /* html stuff */
  var
    $blockWord = $('#intro-section').find('.block-word'),
    $noveltyItem = $('#novelty-section').find('div.novelty-section__item'),
    $tabButton = $('#who-section').find('a.who-section__tab'),
    $menuBlock = $('#menu-block-container'),
    $anchor = $('.section-navigation__bullet'),
    $root = $('html, body');

  /**
   * Make menu block fixed when needed
   * @param {Number} scroll
   */
  function changeMenuBlock(scroll) {
    if (scroll >= 50) {
      $menuBlock.addClass('hide').addClass('fixed').find('button.buy-ticket-btn').removeClass('hidden');
    } else {
      $menuBlock.removeClass('fixed').removeClass('hide').find('button.buy-ticket-btn').addClass('hidden');
    }
  }

  function animateNoveltyItems(scroll) {
    return scroll >= 350 ? $noveltyItem.addClass('show-up') : false;
  }

  /* add some custom jquery methods */
  $.fn.extend({
    /**
     * method to make active current item and deactivate others
     * @param {String} $class
     * @returns {*}
     */
    makeActive: function ($class) {
      return this.addClass($class).siblings().removeClass($class);
    }

  });

  /* return public API */
  return {

    /* initialize function */
    init: function () {
      $(window).on('scroll', this.onScroll);
      $(window).on('load', this.onPageLoad);
      $anchor.on('click', this.animateAnchor);

      /* tabs */
      $tabButton.on('click', this.activateTab);
    },

    /* do stuff when page loaded */
    onPageLoad: function () {
      var $scroll = $(this).scrollTop();

      /* change state of menu block */
      changeMenuBlock($scroll);

      animateNoveltyItems($scroll);

      /* init animation of intro title */
      $blockWord.addClass('active');

    },

    /* do stuff when scrolling */
    onScroll: function () {
      var $scroll = $(this).scrollTop();
      //console.log($scroll);

      /* change state of menu block */
      changeMenuBlock($scroll);

      animateNoveltyItems($scroll);

    },

    animateAnchor: function () {
      var $this = $(this);

      $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 600);

      /* make current item active */
      $this.makeActive('active');

      return false;
    },

    activateTab: function () {
      var $this = $(this);

      /* make current item active */
      $this.makeActive('active');

      /* get value of href */
      var href = $this.attr('href');

      /* make active the content of item */
      $(href).makeActive('active');
    }

  };


})(jQuery);


/* when document ready */
$(document).ready(function () {
  'use strict';

  IT_UI_EVENTS.init();
});

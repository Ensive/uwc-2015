var IT_UI_EVENTS = (function ($) {
  'use strict';

  /* html stuff */
  var
    $blockWord = $('#intro-section').find('.block-word'),

    $noveltyItem = $('#novelty-section').find('div.novelty-section__item'),
    //$sectionTitle = $('.section-title'),

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

  function animateNoveltySection(scroll) {
    return scroll >= 350 ? $noveltyItem.addClass('show-up') : false;
  }

  //function animateSectionTitle(scroll) {
  //  (scroll >= 250 && $sectionTitle.hasClass('.novelty-section__title')) ? $sectionTitle.addClass('show-up') : false;
  //}

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
      $(window).on('scroll', this.doStuff);
      $(window).on('load', this.doStuff);
      $anchor.on('click', this.animateAnchor);

      /* tabs */
      $tabButton.on('click', this.activateTab);
    },

    /* do stuff when page loaded */
    doStuff: function () {
      var $scroll = $(this).scrollTop();
      //console.log($scroll);

      /* init animation of intro title */
      $blockWord.addClass('active');

      /* change state of menu block */
      changeMenuBlock($scroll);

      //
      animateNoveltySection($scroll);

      // @todo: check for scroll and make active particular bullet

      // init animation of section titles
      //animateSectionTitle($scroll);

    },

    /* do stuff when scrolling */
    //onScroll: function () {
    //  var $scroll = $(this).scrollTop();
    //  console.log($scroll);
    //
    //  /* change state of menu block */
    //  changeMenuBlock($scroll);
    //
    //  //
    //  animateNoveltySection($scroll);
    //
    //  // init animation of section titles
    //  animateSectionTitle($scroll);
    //
    //},

    animateAnchor: function () {
      var
        $this = $(this),
        href = $this.attr('href');

      $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 600, function () {
        window.location.hash = href;
      });

      /* make current item active */
      $this.makeActive('active');

      return false;
    },

    activateTab: function (e) {
      console.log($(window).width());
      e.preventDefault();
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

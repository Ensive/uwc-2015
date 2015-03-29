var IT_UI_EVENTS = (function ($) {
  'use strict';

  /* html stuff */
  var
    // menu
    $menuBlock = $('#menu-block-container'),
    $currentLanguageLink = $menuBlock.find('.current-language'),
    $menu = $('#menu-wrapper'),
    $menuLink = $menu.find('.menu__item'),
    $menuButton = $menuBlock.find('.menu-block__menu-btn'),
    $menuCloseButton = $menu.find('button.menu-close-btn'),

    // block with word
    $blockWord = $('#intro-section').find('.block-word'),

    $noveltyItem = $('#novelty-section').find('div.novelty-section__item'),
    $tabButton = $('#who-section').find('a.who-section__tab'),
    $programItem = $('#program-section').find('.program-section__tab-content__list__item'),
    //$sectionTitle = $('.section-title'),

    // partners section
    $partnersTab = $('#partners-section').find('.partners-section__tab'),
    $partnersContent = $('#partners-section__tab-content'),

    // anchor and body
    $anchor = $('.section-navigation__bullet'),
    $root = $('html, body');

  /**
   * Make menu block fixed when needed
   * @param {Number} scroll
   */
  function changeMenuBlock(scroll) {
    if (scroll >= 50) {
      $menuBlock.addClass('hide').addClass('fixed').find('a.buy-ticket-btn').removeClass('hidden');
    } else {
      $menuBlock.removeClass('fixed').removeClass('hide').find('a.buy-ticket-btn').addClass('hidden');
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
      $anchor.add($menuLink).on('click', this.animateAnchor);
      $menuLink.on('click', this.closeMenu);

      // menu
      $currentLanguageLink.on('click', this.showLanguages);
      $menuButton.add($menuCloseButton).on('click', this.toggleMenu);

      $programItem.on('mouseenter mouseleave', this.removeBorder);

      $partnersTab.on('click', this.filterPartners);

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

    toggleMenu: function (e) {
      e.preventDefault();
      //var $this = $(this);
      //$menu.toggleClass('show-up');
      $menu.toggle();
      $menuBlock.toggle();
    },

    closeMenu: function (e) {
      e.preventDefault();
      $menu.hide();
      $menuBlock.show();
    },

    // show languages list
    showLanguages: function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.parent().toggleClass('active');
      $this.siblings('.language-list').slideToggle('fast');
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

      return false;
    },

    removeBorder: function () {
      var $this = $(this);
      $this.prev().toggleClass('hide-border');
    },

    filterPartners: function (e) {
      e.preventDefault();
      var $this = $(this);

      // make current active
      $this.makeActive('active');

      // get data
      var data = $this.data('filter');

      if (data === 'info-partner') {
        $partnersContent
          .find('.partners-section__item[data-filter="info-partner"]')
          .fadeOut(300);
      } else if (data === 'all') {
        $partnersContent
          .find('.partners-section__item')
          .fadeIn(300);
      }

      return false;
    }

  };


})(jQuery);


/* when document ready */
$(document).ready(function () {
  'use strict';

  IT_UI_EVENTS.init();
});

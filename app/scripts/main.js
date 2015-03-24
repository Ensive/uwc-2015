var IT_SCROLL = (function ($) {
  'use strict';

  var
    noveltyItem = $('.novelty-section__item'),
    anchor = $('.section-navigation__bullet'),
    $root = $('html, body');


  return {

    init: function () {
      $(window).on('scroll', this.onScroll);
      anchor.on('click', this.animateAnchor);
    },

    // do stuff when scrolling
    onScroll: function () {
      var $scroll = $(this).scrollTop();

      if ($scroll >= 350) {
        noveltyItem.addClass('show-up');
      }
    },

    animateAnchor: function () {
      $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
    }

  };


})(jQuery);


$(document).ready(function () {
  'use strict';

  IT_SCROLL.init();
});

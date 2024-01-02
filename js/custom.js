(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link, .navbar-brand').on('click', function(event) {
        var $anchor = $(this);
        var offset = $anchor.is('navbar-brand') ? 0: -49;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + offset
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);

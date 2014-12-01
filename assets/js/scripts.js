 
  /*------------------PANEL SCROLLING-----------------*/
 var scrollElement = 'html, body';
  var $scrollElement;

  $(function() {
    $('html, body').each(function () {
      var initScrollLeft = $(this).attr('scrollLeft');

      $(this).attr('scrollLeft', initScrollLeft + 1);
      if ($(this).attr('scrollLeft') == initScrollLeft + 1) {
        scrollElement = this.nodeName.toLowerCase();
        $(this).attr('scrollLeft', initScrollLeft);
        return false; 
      }
    });
    $scrollElement = $(scrollElement);
  });

  /* Smooth scrolling of links between panels */
  $(function() {
    var $panels = $('.panel');

    $panels.each(function() {
      var $panel = $(this);
      var hash = '#' + this.id;

      $('a[href="' + hash + '"]').click(function(event) {
        $scrollElement.stop().animate({
          scrollLeft: $panel.offset().left
        }, 500, 'swing', function() {
          window.location.hash = hash;
        });

        event.preventDefault();
      });
    });
  });

  /* Force snap to panel on resize.*/
  $(function() {
    var $window = $(window);
    var timer;

    $window.resize(function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(function() {
        var hash = window.location.hash ? window.location.hash : '#about';

        $scrollElement.stop().animate({
          scrollLeft: $(hash).offset().left
        }, 200);
      }, 100);
    });
  });
 
  /* Fix scroll snapping during browser finds */
  $(function() {
    var $window = $(window);
    var timer;

    /* Most finds will scroll a single panel. */
    var scrollToPanel = function(panel) {
      $scrollElement.scrollLeft($(panel).offset().left);
    };

    /* Others will scroll between panels but not cause a panel scroll */
    var scrollToClosestPanel = function() {
      var currentScroll = $window.scrollLeft();
      var panelOffsets = $.map($('.panel').get(), function(el) {
        return $(el).offset().left;
      });
      var closestOffset = 0;
      var closestDistance = 99999999;

      $.each(panelOffsets, function(i, offset) {
        var offsetDistance = Math.abs(currentScroll - offset);
        if(offsetDistance < closestDistance) {
          closestDistance = offsetDistance;
          closestOffset = offset;
        }
      });
      $scrollElement.scrollLeft(closestOffset);
    };

    $('.panel').scroll(function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(scrollToPanel, 50, this);
    });

    /* 50ms is enough time to let the animation between panels do its
       thing without triggering this debounced panel snap. */
    $window.scroll(function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(scrollToClosestPanel, 50);
    }).bind('load', scrollToClosestPanel);
  });

 

/*------------------MAP and IMPRESS-----------------*/
$(function() {
  var map = impress();
  map.init();
  
  $('span.number').click(function(){
      var state = $(this).parent().parent().attr("id");
      var $st = $(this).parent().parent();
      stateid = "#"+state;
      state = "."+state;
 
      $('#plain li').not(state).addClass('inactive');
      $('.intro-text').fadeOut();
      $('.slide').not($st).fadeOut();
      $st.css('max-height', '600px');
      $st.css('overflow', 'auto');


  });

  $('#fullmap, .zoom-out a').click(function(){
      $('#plain li').removeClass('inactive');
      $('.intro-text').removeClass('inactive');
      $('.intro-text').fadeIn();
      $('.slide').fadeIn();
      $('.slide').css('max-height', '200px');
      $('.slide').css('overflow', 'hidden');
  });

  $('#map-read-more').click(function(e){
    $('#map-more').removeClass("hide");
    $('#map-more').addClass("show");
    e.preventDefault();
  });
  $('#map-read-close').click(function(e){
    $('#map-more').removeClass("show");
    $('#map-more').addClass("hide");
    e.preventDefault();
  });


});

 
/*------------------ MENU-----------------*/
$(function() {
 
    var $togglePushLeft = $(".toggle-push-left" );
    var $pushMenuLeft = $( ".push-menu-left" );
    var activeNav;
    var activeCredits;

   
    /* push menu left */
    $(".toggle-push-left").click(function(){
        $('body').addClass("pml-open");
        activeNav = "pml-open";

    });

    $(".mask").click(function(){
        $('body').removeClass(activeNav);
        activeNav = "";
 
    } );
 
    /* hide active menu if close menu button is clicked */
    $(".close-menu").click(function(){
        $('body').removeClass(activeNav);
        $('body').removeClass(activeCredits);
        activeNav = "";
    });

     $pushMenuLeft.hover(function(){
        $('body').addClass('pml-open');
      }, function(){
        $('body').removeClass('pml-open');
     });

    //CREDITS MENU --------------
    /* push menu left */
    $("#credit-link").click(function(){
        $('body').addClass("credits-open"); 
        activeCredits = "credits-open";
    });

    /* hide active menu if close menu button is clicked */
    $(".close-credits-menu").click(function(){
        $('body').removeClass(activeCredits);
        $(".secondary-menu li").removeClass('menu-active');
        activeCredits = "";
 
    });
});

/*------------------ MENU ACTIVE TOGGLE-----------------*/
$(function() {
  $(".main-menu a").click(function(){
    $("nav.menu a div").removeClass('menu-active');
    $(".secondary-menu li").removeClass('menu-active');
    $(this).children(".menu-item").addClass('menu-active');
  });

   $(".secondary-menu li a").click(function(){
    $("nav.menu a div").removeClass('menu-active');
    $(".secondary-menu li").removeClass('menu-active');
    $(this).parent("li").addClass('menu-active');
  });


});
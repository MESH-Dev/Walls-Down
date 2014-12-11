  /*------------------PANEL SCROLLING-----------------*/
 var scrollElement = 'html, body';
  var $scrollElement;
 
  $(function() {


    window.onpopstate = function(event)
     {
       var hash = window.location.hash;
       var $panel = $(hash);

       $scrollElement.stop().animate({
         scrollLeft: $panel.offset().left
       }, 500, 'swing', function() {
         window.location.hash = hash;
       });
     };


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

  /* Panel Scroll on keyup */
  $(function() {
    var $window = $(window);

    var $panels = $('.panel');
    var panelArr =[];
    $panels.each(function() {
      var idhash = "#" + $(this).attr('id');
      panelArr.push(idhash);
    });
  
    $('html').keydown(function(e){
      if(e.which == 37) //LEFT ARROW
      {
        var hash = window.location.hash ? window.location.hash : '#home';
        if (hash.indexOf("#/") >= 0) hash ="#map"; //Check if hash includes "/#/" ? set to #map
        var idx = panelArr.indexOf(hash);

        //check if hash is in panelArr 
        //- if yes, get prev id in array, set panel to hash and scroll
        if(idx != -1)
        {
          $panel = $(panelArr[idx-1]);
          $scrollElement.stop().animate({
            scrollLeft: $panel.offset().left
          }, 500, 'swing', function() {
            window.location.hash = panelArr[idx-1];
          });
        }
        e.preventDefault();
      }
 
      if(e.which == 39) //right ARROW
      {
        var hash = window.location.hash ? window.location.hash : '#home';
        if (hash.indexOf("#/") >= 0) hash ="#map"; //Check if hash includes "/#/" ? set to #map
        var idx = panelArr.indexOf(hash);

        //check if hash is in panelArr 
        //- if yes, get prev id in array, set panel to hash and scroll
        if(idx != -1)
        {
          $panel = $(panelArr[idx+1]);
          $scrollElement.stop().animate({
            scrollLeft: $panel.offset().left
          }, 500, 'swing', function() {
            window.location.hash = panelArr[idx+1];
          });
        }
        e.preventDefault();
      }
      
    });






  });




  /* Force snap to panel on resize.*/
  $(function() {
    var $window = $(window);
    var timer;

    $window.resize(function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(function() {
        var hash = window.location.hash ? window.location.hash : '#home';

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

  var isDesktop = (function() {
    return !('ontouchstart' in window) || !('onmsgesturechange' in window); // works on ie10
  })();

  var viewportwidth = $(window).width();
  $(window).resize(function() {
    viewportwidth= $(window).width();
  });
  
  window.isDesktop = isDesktop;
 
  if( isDesktop && viewportwidth >767){
    var map = impress();
    
    if (window.location.hash == "#map") {
      map.init();
      map.goto(0);
    }
    window.addEventListener("hashchange", function () {
      if (window.location.hash == "#map") {
        map.init();
          map.goto(0);
          $('#plain li').removeClass('inactive');
          $('.intro-text').removeClass('inactive');
          $('.intro-text').fadeIn();
          $('.slide').fadeIn();
          $('.slide').css('max-height', '200px');
          $('.slide').css('overflow', 'hidden');
      }
    }, false);
 
    $('div.number-wrap').click(function(){
        var state = $(this).parent().attr("id");
        var $st = $(this).parent();
        stateid = "#"+state;
        state = "."+state;
   
        $('#plain li').not(state).addClass('inactive');
        $('.intro-text').fadeOut();
        $('.slide').not($st).fadeOut();
        $st.css('max-height', '600px');
        $st.css('overflow', 'auto');
       //$("h1 #maptitle").css('font-size','26px');
        //$("h1 #maptitle").css('line-height','px');


    });

    $('#fullmap, .zoom-out a, a#maptitle ').click(function(){
        $('#plain li').removeClass('inactive');
        $('.intro-text').removeClass('inactive');
        $('.intro-text').fadeIn();
        $('.slide').fadeIn();
        $('.slide').css('max-height', '200px');
        $('.slide').css('overflow', 'hidden');
    });

    
  }

  $('#map-read-more').click(function(e){
    //$('#map-more').removeClass("hide");
    //$('#map-more').addClass("show");
    $('#map-more').fadeIn();
     $(this).hide();
    e.preventDefault();
  });
  $('#map-read-close').click(function(e){
    //$('#map-more').removeClass("show");
    //$('#map-more').addClass("hide");
    $('#map-more').fadeOut();
    $('#map-read-more').show();
    e.preventDefault();
  });


});

 
/*------------------ MENU-----------------*/
$(function() {
 
    var $togglePushLeft = $(".toggle-push-left" );
    var $pushMenuLeft = $( ".push-menu-left" );
    var activeNav;
    var activeCredits;

    //$('body').addClass("pml-open");
 
    var viewportwidth = $(window).width();
    if(viewportwidth < 768){
      $('body').removeClass("pml-open");
      //hidemenu on click out of menu
      $(".panel-wrap").click(function(){
          if($('body').hasClass('pml-open'))
          {
            $('body').removeClass('pml-open');
          }
      } );
    }

    $(window).resize(function() {
      viewportwidth= $(window).width();
      if(viewportwidth < 768){
       $('body').removeClass("pml-open");
      }
      else{
        $('body').addClass("pml-open");
      }
    });


    /* push menu left */
    $(".toggle-push-left").click(
      function(){
        if($('body').hasClass('pml-open')){
          $('body').removeClass('pml-open');
        }
        else{
          $('body').addClass('pml-open');
        }
      }
    );

    
 
    /* hide active menu if close menu button is clicked */
    $(".close-menu").click(function(){
        $('body').removeClass(activeNav);
        $('body').removeClass(".credits-open");
        activeNav = "";
    });

    /*
    $pushMenuLeft.hover(function(){
        $('body').addClass('pml-open');
      }, function(){
        $('body').removeClass('pml-open');
     });
    */


    //CREDITS MENU --------------
    /* push menu left */
    $("#credit-link").click(function(e){
        $('body').addClass("credits-open");
        activeCredits = "credits-open";
        $(this).parent().addClass('credit-active');
        e.preventDefault();
    });

    /* hide active menu if close menu button is clicked */
    $(".close-credits-menu").click(function(){
        $('body').removeClass(activeCredits);
        $(".secondary-menu li").removeClass('credit-active');
        activeCredits = "";
 
    });
});

/*------------------ MENU ACTIVE/Hover TOGGLE from hash-----------------*/
$(function() {

  var hash = window.location.hash ? window.location.hash : '#home';
  if (hash.indexOf("#/") >= 0) hash ="#map";
  $('.main-menu a[href="'+ hash +'"]').children(".menu-item").addClass('menu-active');


  window.addEventListener("hashchange", function () {
      var hash = window.location.hash ? window.location.hash : '#home';
      if (hash.indexOf("#/") >= 0) hash ="#map";
      $("nav.menu a div").removeClass('menu-active');
      $(".secondary-menu li").removeClass('menu-active');
      $('.main-menu a[href="'+ hash +'"]').children(".menu-item").addClass('menu-active');
      $('.secondary-menu li a[href="'+ hash +'"]').parent("li").addClass('menu-active');
      $('#brahms').trigger('pause');
      $('body').removeClass("credits-open");
   }, false);
});

/*------------------ TIMELINE SCROLLS -----------------*/
$(function() {
  $('#timeline').scroll( function(){
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},500);
                $(this).children('.vertical-line').animate({'height':'120px'},1500);
            }
        });
    });

  var playit = 1;
  $('#grady').scroll( function(){
        /* Check the location of each desired element */
        var $audio = $('#brahms');
        
        var bottom_of_object = $audio.position().top + $audio.outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
          if(playit == 1){
            $audio.trigger('play');
            playit = 0;
          }
           
        } 
       
    });
});



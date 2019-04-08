/*
--------------------------------------------------------* 

[Cadeniuc, Main Stylesheet ]

    Color        : BLUE  ( #00B6F9 )

    Name         : JOHN - Responsive Onepage Resume Template

    Version      :  1.0 

    Author       :  Cadeniuc

    Author URI   :  https://themeforest.net/user/cadeniuc

    Author Email : icadeniuc16@gmail.com

--------------------------------------------------------
*/
$(function(){
    "use strict";


/*  ------------------
    Remove Preloader
    ------------------  */

    $(window).on("load", function () {
        $('#preloader').delay(350).fadeOut('slow', function () {
            $('.profile-page, .resume-page, .contact-page, .portfolio-page').hide();
        });
    });



/*  ----------------------------------------
         Tooltip Starter for Social Media Icons
         ----------------------------------------  */

         $('.social-media [data-toggle="tooltip"]').tooltip({
            placement: 'bottom'
        });
         $('footer .social_media_footer [data-toggle="tooltip"]').tooltip({
            placement: 'top'
        });

/*  ----------------------------------------
         Hamburger Menu HEADER
         ----------------------------------------  */
         var button = document.getElementById( 'menu-toggle' );
         button.onclick = function() {
            if ( -1 !== button.className.indexOf( 'opened' ) ) {
                button.className = button.className.replace( ' opened', '' );
                button.setAttribute( 'aria-expanded', 'false' );
            } else {
             button.className += ' opened';
             button.setAttribute( 'aria-expanded', 'true' );
         }
     };
/*  ----------------------------------------
         Menu HEADER TOP SHOW
         ----------------------------------------  */
         var button_tog = $('.menu-toggle');
         button_tog.on("click", function () {
            if ($('.menu-toggle').hasClass('opened')) {
                $('.holder').addClass('active');
            } else {
                $('.holder').removeClass('active');
            }
        });

/*  ----------------------------------------
         Click Link Menu HEADER TOP
         ----------------------------------------  */
         $('#home nav a').on("click", function() {
            $('.holder').removeClass('active');
            $('button.menu-toggle').removeClass('opened')
         });


  /*  -------------------------------
         Filterizer ( for portfolio page )
         -------------------------------  */
          $('.items_portfolio').mixItUp();



/*
         * ----------------------------------------------------------------------------------------
         *  SMOTH SCROOL JS
         * ----------------------------------------------------------------------------------------
         */
         $('nav a[href*="#"]:not([href="#"]),.scroll_mouse a[href*="#"]:not([href="#"])').on("click", function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });


/*
         * ----------------------------------------------------------------------------------------
         *  MAGNIFIC POPUP JS
         * ----------------------------------------------------------------------------------------
         */

         var magnifPopup = function () {
            $('.work-popup').magnificPopup({
                type: 'image',
                removalDelay: 300,
                mainClass: 'mfp-with-zoom',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true, // By default it's false, so don't forget to enable it

                    duration: 300, // duration of the effect, in milliseconds
                    easing: 'ease-in-out', // CSS transition easing function

                    // The "opener" function should return the element from which popup will be zoomed in
                    // and to which popup will be scaled down
                    // By defailt it looks for an image tag:
                    opener: function (openerElement) {
                        // openerElement is the element on which popup was initialized, in this case its <a> tag
                        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });
        };
        // Call the functions 
        magnifPopup();



/*
         * ----------------------------------------------------------------------------------------
         *  FILTER ADD CLASS ACTIVE
         * ----------------------------------------------------------------------------------------
         */
         $('.project_controls button').on("click", function () {
            $('.project_controls button').removeClass('active');
            $(this).addClass('active');
        });

/*
         * ----------------------------------------------------------------------------------------
         *  CAROUSEL TESTIMONIALS
         * ----------------------------------------------------------------------------------------
         */

         $(".testimonial_items").owlCarousel({
            singleItem:true,
            pagination : true
        });

/*
         * ----------------------------------------------------------------------------------------
         *  CLOSE MENU MOBILE ON CLICK LINK
         * ----------------------------------------------------------------------------------------
         */
         if ($(window).width() < 691) {
            $('#home nav a').on("click", function () {
                $('.holder').removeClass('active');
                $('button.menu-toggle').removeClass('opened');
            })
        }

/*
         * ----------------------------------------------------------------------------------------
         *  COUNTER NUM
         * ----------------------------------------------------------------------------------------
         */
         $('.counter-num').counterUp({
            delay: 10,
            time: 1000
        });

         
/*
         * ----------------------------------------------------------------------------------------
         *  FORM AJAX
         * ----------------------------------------------------------------------------------------
         */
         new WOW().init();

/*
         * ----------------------------------------------------------------------------------------
         *  FORM AJAX
         * ----------------------------------------------------------------------------------------
         */
         $("form").on("submit", function(e) {
            e.preventDefault();
            var form = $(this);
            var button = form.children("button[type='submit']");
            var msg = form.serialize();
            var submitButton = form.children("button[type='submit']").html();
            if (submitButton == undefined) {
                var idForm = form.attr("id");
                var button = $("#" + idForm + " button");
                var submitButton = $("#" + idForm + " button").html();
            }
            $.ajax({
                type: 'POST',
                url: "php/mail.php",
                data: msg,
                success: function(data) {
                    if (data != "") {
                        $("input, textarea").val("");
                        button.html(data).addClass("");
                        setTimeout(function() {
                            button.html(submitButton).removeClass("");
                        }, 5000);
                        $('.sent_message').fadeIn();
                        $('.sent_message').fadeOut(5000);
                    }
                },
                error: function(xhr, str) {
                    alert('Error: ' + xhr.responseCode);
                }
            });
        });


});
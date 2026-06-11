$(window).on('load', function () {

    // Preloader
    $('#preloader').delay(1000).addClass('loaded');

    // Background music
    $('body').append('<audio loop autoplay volume="1" id="audio-player"><source src="audio/music.mp3" type="audio/mpeg"></audio>');
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.volume = 0.1;

    $('.music-bg').css({visibility: 'visible'});
    $('body').addClass('audio-on');
    if ($('body').hasClass('audio-off')) {
        $('body').removeClass('audio-on');
    }
    $('.music-bg').on('click', function () {
        $('body').toggleClass('audio-on audio-off');
        if ($('body').hasClass('audio-off')) {
            audioPlayer.pause();
        }
        if ($('body').hasClass('audio-on')) {
            audioPlayer.play();
        }
    });

    // Portfolio isotope filter
    if ($('.portfolio-items').length) {
        var $portfolio = $('.portfolio-items'),
            $filterItems = $('.portfolio-filter ul li');

        $portfolio.isotope({isOriginLeft: false});

        $filterItems.on('click', function () {
            $filterItems.removeClass('active');
            $(this).addClass('active');
            $('.portfolio-items').isotope({
                filter: $(this).data('filter'),
                hiddenStyle: {transform: 'scale(.2) skew(30deg)', opacity: 0},
                visibleStyle: {transform: 'scale(1) skew(0deg)', opacity: 1},
                transitionDuration: '.5s'
            });
        });
    }

    // Blog masonry
    $('.blog-masonry').isotope({layoutMode: 'moduloColumns', isOriginLeft: false});
});

$(document).ready(function () {
    'use strict';

    // Mobile menu
    $('.header-main ul li a').on('click', function () {
        if ($('.header-main.on').length) {
            $('.header-main').removeClass('on');
        }
    });
    $('.header-toggle').on('click', function () {
        $('.header-main').toggleClass('on');
    });

    // Testimonial carousel
    $('.testimonial .owl-carousel').owlCarousel({
        rtl: true,
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {items: 1},
            800: {items: 1},
            1000: {items: 2}
        }
    });

    // Skill charts
    if ($('.chart').length > 0) {
        $('.chart').easyPieChart({
            trackColor: '#0e0f10',
            scaleColor: false,
            easing: 'easeOutBounce',
            scaleLength: 4,
            lineCap: 'square',
            lineWidth: 5,
            size: 130,
            animate: {duration: 2500, enabled: true}
        });
    }

    // Portfolio tilt effect
    $('.pt-portfolio .portfolio-items .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: 0.6,
        reverse: true
    });

    // Magnific popup
    $.extend(true, $.magnificPopup.defaults, {
        tClose: 'بستن',
        tLoading: 'در حال بارگذاری ...',
        gallery: {
            tPrev: 'قبلی',
            tNext: 'بعدی',
            tCounter: '%curr% از %total%'
        },
        image: {tError: '<a href="%url%">تصویر</a> بارگذاری نشد.'},
        ajax: {tError: '<a href="%url%">درخواست</a> ناموفق بود.'}
    });
    $('.portfolio-items .image-link').magnificPopup({type: 'image'});
    $('.portfolio-items .video-link').magnificPopup({type: 'iframe'});
    $('.pt-blog .blog-item .thumbnail .btn-play').magnificPopup({type: 'iframe'});

    // Contact form
    if ($('#contact-form').length) {
        $('#contact-form').validate({
            rules: {
                name: {required: true, minlength: 2},
                email: 'required'
            },
            messages: {
                name: 'لطفا نام خود را وارد نمایید',
                email: 'لطفا آدرس ایمیل خود را وارد نمایید'
            },
            submitHandler: function (form) {
                $.ajax({
                    type: 'POST',
                    url: 'php/mail.php',
                    data: $(form).serialize(),
                    success: function () {
                        $('#loader').hide();
                        $('#success').slideDown('slow');
                        setTimeout(function () {
                            $('#success').slideUp('slow');
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $('#loader').hide();
                        $('#error').slideDown('slow');
                        setTimeout(function () {
                            $('#error').slideUp('slow');
                        }, 3000);
                    }
                });
                return false;
            }
        });
    }

    // Google map (only when no iframe is used)
    if ($('#map').length && $('#map iframe').length === 0) {
        initMap();
    }
});

function initMap() {
    var latitude = $('#map').data('latitude'),
        longitude = $('#map').data('longitude'),
        zoom = $('#map').data('zoom'),
        center = new google.maps.LatLng(latitude, longitude);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: center,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: [
            {stylers: [{saturation: -100}, {gamma: 0.8}, {lightness: 4}, {visibility: 'on'}]},
            {
                featureType: 'landscape.natural',
                stylers: [{visibility: 'on'}, {color: '#5dff00'}, {gamma: 4.97}, {lightness: -5}, {saturation: 100}]
            }
        ]
    });

    new google.maps.Marker({
        position: center,
        map: map,
        title: 'ما اینجا هستیم!'
    });
}

// Blog containers offset
var $blog_container = $('.blog-container');
var setBlogOffset = function () {
    var offset = $blog_container.parent().css('padding-left');
    if ($blog_container.css('position') == 'absolute') {
        $blog_container.css('left', offset);
    } else {
        $blog_container.css('left', 'auto');
    }
};
if ($blog_container.length) {
    $(window).on('load resize', setBlogOffset);
}

var $blog_list_container = $('.blog-list-container');
var setBlogListOffset = function () {
    var offset = $blog_list_container.parent().css('padding-left');
    if ($blog_list_container.css('position') == 'absolute') {
        $blog_list_container.css('left', offset);
    } else {
        $blog_list_container.css('left', 'auto');
    }
};
if ($blog_list_container.length) {
    $(window).on('load resize', setBlogListOffset);
}

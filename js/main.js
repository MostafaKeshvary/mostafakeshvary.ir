$(window).on('load', function () {

    // Preloader
    $('#preloader').delay(1000).addClass('loaded');

    // Background music
    $('body').append('<audio loop id="audio-player"><source src="audio/music.mp3" type="audio/mpeg"></audio>');
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.volume = 0.1;

    $('.music-bg').css({visibility: 'visible'});
    $('body').addClass('audio-on');

    // Browsers block autoplay with sound; if blocked, start on the first user interaction
    var tryPlay = audioPlayer.play();
    if (tryPlay !== undefined) {
        tryPlay.catch(function () {
            var resumeAudio = function () {
                if ($('body').hasClass('audio-on')) {
                    audioPlayer.play();
                }
                document.removeEventListener('pointerdown', resumeAudio);
                document.removeEventListener('keydown', resumeAudio);
            };
            document.addEventListener('pointerdown', resumeAudio);
            document.addEventListener('keydown', resumeAudio);
        });
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
});

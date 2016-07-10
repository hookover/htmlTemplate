var TeoThemes = {
    init : function() {
        $('.bs-tooltip').tooltip();
        this.resizeContent();
        this.initIsotope();
        this.initRatings();
        this.initFlexsliders();
        this.homepageShowcase();

        $('.downloads .changelog-text .text').mCustomScrollbar({
            horizontalScroll: false,
            scrollButtons: false,
            advanced:{
                updateOnContentResize: true,
                updateOnBrowserResize: true
            },
            mouseWheelPixels: 300,
            scrollInertia : 0
        });

        $('.downloads .changelog').click(TeoThemes.openChangelog);
        $('.downloads .changelog-text .close').click(TeoThemes.closeChangelog);
    },
    openChangelog : function(e) {
        var el = $(this);
        var id = el.attr('rel');
        var selected = $('.changelog-row[rel="'+id+'"]');
        if(!selected.is(":visible")) {
            selected.fadeIn('500', function() {
                $(this).find('.text').mCustomScrollbar('update');
            });
        }
        e.preventDefault();
    },
    closeChangelog : function(e) {
        var el = $(this);
        var id = el.attr('rel');
        var selected = $('.changelog-row[rel="'+id+'"]');
        if(selected.is(":visible")) {
            selected.fadeOut('300');
        }
        e.preventDefault();
    },
    resizeContent : function() {
        $('body').css('padding-top', $('.navbar').outerHeight()+"px");
        $('.main-container').css('min-height', $(window).height() - $('.navbar').outerHeight() - $('.page-title').outerHeight() - $('.main-footer').outerHeight() - $('.copyright').outerHeight());
    },
    initIsotope : function() {
        var $container = $('.themes').isotope({
            // options
            itemSelector : '.theme-item',
            layoutMode : 'fitRows'
        });
        $('.themes-selector a').click(function() {
            $('.themes-selector').find('.active').removeClass('active');
            var $el = $(this);
            $el.parent().addClass('active');
            var selector = $el.attr('data-filter');
            $container.isotope({ filter: selector });
            return false;
        });
    },
    initRatings : function() {
        $('.raty').raty({
            starHalf    : 'img/star-half.png',
            starOff     : 'img/star-off.png',
            starOn      : 'img/star-on.png',
            hints : ['', '', '', '', ''],
            size : 26,
            readOnly : true,
            score: function() {
                return $(this).attr('data-score');
            }
        });
        $('.raty-grey').raty({
            starHalf    : 'img/star-half-grey.png',
            starOff     : 'img/star-off-grey.png',
            starOn      : 'img/star-on-grey.png',
            hints : ['', '', '', '', ''],
            size : 26,
            readOnly : true,
            score: function() {
                return $(this).attr('data-score');
            }
        });
    },
    initFlexsliders : function() {
        $('.testimonial-slider').flexslider({
            animation: "slide",
            controlNav: true,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.screenshots-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.theme-slider .slider-controls .left').click(function() {
            $('.screenshots-slider').flexslider('prev');
        });
        $('.theme-slider .slider-controls .right').click(function() {
            $('.screenshots-slider').flexslider('next');
        });
        $('.image-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.image-slider .slider-controls .left').click(function() {
            $('.image-slider').flexslider('prev');
        });
        $('.image-slider .slider-controls .right').click(function() {
            $('.image-slider').flexslider('next');
        });
        $('.twitter-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.twitter-line .slider-controls .left').click(function() {
            $('.twitter-slider').flexslider('prev');
        });
        $('.twitter-line .slider-controls .right').click(function() {
            $('.twitter-slider').flexslider('next');
        });
        $('.activity-wrap').flexslider({
            animation: "fade",
            controlNav: false,
            directionNav : false,
            animationLoop: false,
            slideshow: false
        });
        $('.activity-widget .slider-controls .left').click(function() {
            $('.activity-wrap').flexslider('prev');
        });
        $('.activity-widget .slider-controls .right').click(function() {
            $('.activity-wrap').flexslider('next');
        });
        TeoThemes.initFlexByName($('.homepage-showcase .theme-detail:visible'));
    },
    initFlexByName : function(el) {
        el.find('.homepage-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        el.find('.slider-controls .left').click(function() {
            el.find('.homepage-slider').flexslider('prev');
        });
        el.find('.slider-controls .right').click(function() {
            el.find('.homepage-slider').flexslider('next');
        });
    },
    homepageShowcase : function() {
        var showcase = $('.homepage-showcase');
        showcase.find('.theme-names').find('button').click(function(e) {
            var el = $(this);
            var id = el.attr("rel");
            showcase.find('.theme-names').find('.active').removeClass('active');
            el.parent().addClass('active');
            showcase.find('.theme-detail:visible').fadeOut(400, function() {
                $(this).find('.homepage-slider').flexslider('destroy');
                showcase.find('.theme-detail[rel="'+id+'"]').fadeIn(400, function() {
                    TeoThemes.initFlexByName($(this));
                });
            });
            e.preventDefault();
        });
    }
};
$(document).ready(function() {
   TeoThemes.init();
});
$(window).resize(function() {
   TeoThemes.resizeContent();
});
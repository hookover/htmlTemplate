var Oldal = {
    init : function() {
        this.initInstagram();
        this.initFlexsliders();
        this.initTooltips();
        this.initPopovers();
        this.resizeContent();
        this.calculateMainMargin();

        $('.search-trigger').click(this.toggleSearch);

        $('.custom-select').selectBoxIt({
           autoWidth: false
        });
        $('.main-nav >li').each(this.addMobileButton);
        $(window).scroll(this.moveHeader);
        this.initFancybox();
    },
    initInstagram : function() {
        $('.insta').simpleInstagramFancybox({
            mode : 'user',
            accessToken : '730091552.e204b44.413a8d85e00f48d9a6985bf689c76a1c', // This a mandatory setting that allows you to specify a user token.
            userID : '1138644', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
            speed: 700, // Sets the speed of the images fade in effect, default is 700.
            delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
            captionOn : true, // Allows you to turn on captions
            tags: "", // Allows you limit photos based on a given tag
            numberOfImages: 8 // Number of images to display
        });
    },
    initFancybox : function() {
        $('.trigger-fancybox').fancybox({
            padding : 0,
            autoResize: true,
            arrows : false,
            closeBtn : false,
            prevEffect : 'fade',
            nextEffect : 'fade',
            helpers : {
                buttons	: {
                    position : 'top'
                }
            },
            beforeShow: function() {
                var closeButton = $('<button class="oldal-close oldal-fancy"><i class="entyp-cancel-1"></i></button>');
                var fullscreenButton = $('<button class="oldal-fullscreen oldal-fancy"><i class="entyp-resize-full-1"></i></button>');
                closeButton.click(function() {
                    $.fancybox.close();
                });
                fullscreenButton.click(function() {
                    $.fancybox.toggle();
                });
                $.fancybox.wrap.append(closeButton);
                $.fancybox.wrap.append(fullscreenButton);
            }
        });
        $('.fancybox-product').fancybox({
            padding : 0,
            autoResize: true,
            arrows : false,
            closeBtn : false,
            prevEffect : 'fade',
            nextEffect : 'fade',
            helpers : {
                buttons	: {
                    position : 'top'
                }
            },
            beforeShow: function() {
                var closeButton = $('<button class="oldal-close oldal-fancy"><i class="entyp-cancel-1"></i></button>');
                var fullscreenButton = $('<button class="oldal-fullscreen oldal-fancy"><i class="entyp-resize-full-1"></i></button>');
                closeButton.click(function() {
                    $.fancybox.close();
                });
                fullscreenButton.click(function() {
                    $.fancybox.toggle();
                });
                $.fancybox.wrap.append(closeButton);
                $.fancybox.wrap.append(fullscreenButton);
            }
        });
    },
    calculateMainMargin : function() {
        var mainWrap = $('.main-wrap');
        var height = 0;
        if(mainWrap.length) {
            $('.main-footer').length && (height = $('.main-footer').outerHeight());
            $('.simple-footer').length && (height = $('.simple-footer').outerHeight());
            mainWrap.css({
               "margin-bottom" : height + "px"
            });
        }
    },
    addMobileButton : function() {
        var el = $(this);
        var button = $('<button class="dropdown-toggle"><i class="glyphicon glyphicon-chevron-down"></i></button>');
        if(el.find('>ul').length) {
            el.append(button);
            button.click(Oldal.mobileDropdown);
        }
    },
    mobileDropdown : function() {
        var submenu = $(this).parent().find(">ul");
        if(submenu.is(':visible')) {
            submenu.slideUp(300);
            $(this).html('<i class="glyphicon glyphicon-chevron-down"></i>');
        } else {
            submenu.slideDown(300);
            $(this).html('<i class="glyphicon glyphicon-chevron-up"></i>');
        }
    },
    toggleSearch : function(e) {
        var searchWrap = $('.search-wrap');
        if(searchWrap.is(':visible')) {
            searchWrap.slideUp(300);
        } else {
            searchWrap.slideDown(300);
            searchWrap.find('.form-control').focus();
        }
        e.preventDefault();
    },
    hideBigSearch : function() {
        if($(window).width() < 768) {
            $('.search-wrap').hide();
        }
    },
    initFlexsliders : function() {
        $('.recent-work').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.recent-work .slider-controls .left').click(function() {
            $('.recent-work').flexslider('prev');
        });
        $('.recent-work .slider-controls .right').click(function() {
            $('.recent-work').flexslider('next');
        });
        $('.post-images').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.post-images .slider-controls .left').click(function() {
            $('.post-images').flexslider('prev');
        });
        $('.post-images .slider-controls .right').click(function() {
            $('.post-images').flexslider('next');
        });
        $('.recent-posts').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.recent-posts .slider-controls .left').click(function() {
            $('.recent-posts').flexslider('prev');
        });
        $('.recent-posts .slider-controls .right').click(function() {
            $('.recent-posts').flexslider('next');
        });
        $('.product-slider').flexslider({
            animation: "slide",
            controlNav: true,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.similar-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        $('.similar-slider .slider-controls .left').click(function() {
            $('.similar-slider').flexslider('prev');
        });
        $('.similar-slider .slider-controls .right').click(function() {
            $('.similar-slider').flexslider('next');
        });
    },
    initTooltips : function() {
        $('.oldal-tooltip').tooltip();
    },
    initPopovers : function() {
        $('.oldal-popover').popover();
    },
    resizeContent : function() {
        $('.main-container').css('min-height', ($(window).height() - $('.navbar').outerHeight() - $('.main-footer').outerHeight()) + "px");
    },
    moveHeader : function() {
        var firstHeader = $('.navbar .normal-color');
        var secondHeader = $('.navbar .inverse-color');
        var searchWrap = $('.navbar .search-wrap');
        var scrollTop = $(window).scrollTop();
        var secondHeaderH = secondHeader.outerHeight();
        var firstHeaderH = firstHeader.outerHeight();
        var headerSlider = $('.header-slider');
        var topOffset = firstHeaderH;
        if(headerSlider.length) {
            topOffset = headerSlider.outerHeight();
        }
        if(scrollTop >= topOffset) {
            secondHeader.addClass('sticky');
            firstHeader.addClass('opacity');
            searchWrap.addClass('sticky');
            searchWrap.css('top', secondHeaderH + "px");
            $("body").css('padding-top', secondHeaderH+'px');
        } else {
            firstHeader.removeClass('opacity');
            secondHeader.removeClass('sticky');
            searchWrap.removeClass('sticky');
            searchWrap.css('top', "100%");
            $("body").css('padding-top', 0);
        }
    }
};

$(document).ready(function() {
    Oldal.init();
});
$(window).resize(function() {
    Oldal.hideBigSearch();
    Oldal.resizeContent();
});


$(".post").fitVids();


/*
 * jQuery Simple Instagram Fancybox
 * Version: 2.0
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 2.0
 *
 */

/* Global Methods
------------------------------*/
function cmd(param, settings, curUserID){
   
	var cmdURL = "";

	if( settings.mode == 'user' ){
		// User Mode
		cmdURL = 'https://api.instagram.com/v1/users/' + curUserID + '/media/recent/?callback=?';
	} else {
		// Popular Mode
    	cmdURL = 'https://api.instagram.com/v1/media/popular?callback=?';
	}

   	$.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}

function onPhotoLoaded(data, settings){
		
    if( data.meta.code == 200 ){
        var photos = data.data;

        if( photos.length > 0 ){
	
			// console.log(photos);

            for( var key in photos ){
	
				/* Custom Feature
				-------------------------*/
				var isUnderMax = true;
				
				if( settings.numberOfImages != 00 ){
					
					// Convert the key to a number...
					var parsedKey = parseInt(key) + 1;
					
					// If iteration is greater than number of images...
					if( parsedKey > settings.numberOfImages ){
						isUnderMax = false;
					}
					
				}
               
				// Get Photo Data
				var photo = photos[key];
			
				// Build DOM
				var instagramPhoto = '';
				
				/* Version 2.0
				-------------------------------*/

				// Logic for tags
				var tagsArray = settings.tags;
				tagsArray = tagsArray.split(",");

				// If at least one tag exists... iterate through tag and only build the ones that match photos with these tags
				var tagMatches = false;
				
				if( tagsArray[0] ){
					// For each plugin tag, run a a check on each tag on this photo to find a match...
					$.each(tagsArray, function(index){
						
						$.each(photo['tags'], function(tagindex){
							
							// If Match, flag as true...
							if( tagsArray[index] == photo['tags'][tagindex] ){
								tagMatches = true;
							}
						});
					});
					
				} else {
					// Else they are all matches...
					tagMatches = true;
				}
				
				/*------------------------------------- */
				
				if( tagMatches == true && isUnderMax == true ){
									
					// Building...
					if( settings.captionOn ){							
				
						var photoCaption = "";
				
						if( photo.caption ){
							photoCaption = photo.caption.text;
						} else {
							photoCaption = "Instagram Photo";
						}
										
						instagramPhoto = '<a rel="group" class="instagram-photo" id="p' + photo.id + '" href="' + photo.images.standard_resolution.url + '" title="' + photoCaption + ' (' + photo.likes.count + ' Likes)" >';
			
					} else {
						instagramPhoto = '<a rel="group" class="instagram-photo" id="p' + photo.id + '" href="' + photo.images.standard_resolution.url + '">';
					}
				
					var photoTag = "None";
				
					if( photo.tags[0] ){
						photoTag = photo.tags[0];
					}
				
					instagramPhoto +=    '<img src="' + photo.images.thumbnail.url + '" width="100%" rel="' + photoTag + '">';
					instagramPhoto += '</a>';

		            $(instagramPhoto).appendTo('.insta');
	
				}
            }

			$('.instagram-photo').hide().each(function(index){
				
				// Store Current Photo
				currentPhoto = $(this);
				
				// Render Effect
				if( settings.appearEffect == "slide" ){
					currentPhoto.delay( settings.delayInterval * index ).slideDown(settings.speed);
				
				} else if( settings.appearEffect == 'motion' ){
					currentPhoto.delay( settings.delayInterval * index ).animate({
						width: ['toggle', 'swing'],
						height: ['toggle', 'swing']
					}, settings.speed, function() {
						// Animation complete.
					});
				
				} else {
					currentPhoto.delay( settings.delayInterval * index ).fadeIn(settings.speed);
				}
			});

        } else {
            alert('empty');
        }

    } else {
        alert(data.meta.error_message);
    }
}

function instagramFetch(settings){	
	var access_token = settings.accessToken;
    var param = {access_token:access_token};

	if( settings.mode == "user" ){
		// Multiple Entry Logic
		var curUserID = settings.userID;
		var allUserIDs = curUserID.split(',');

		// console.log(allUserIDs[0]);
		for ( var i = 0; i < allUserIDs.length; i++ ){
			// console.log(allUserIDs[i]);
			cmd( param, settings, allUserIDs[i] );
		}
		
	} else {
		cmd( param, settings, 'No User' );
	}
    
}

function startFancybox(){
	$("body").find("a.instagram-photo").fancybox({
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
                var prevButton = $('<button class="oldal-prev oldal-fancy"><i class="entyp-left-dir-1"></i></button>');
                var nextButton = $('<button class="oldal-next oldal-fancy"><i class="entyp-right-dir-1"></i></button>');
                closeButton.click(function() {
                    $.fancybox.close();
                });
                fullscreenButton.click(function() {
                    $.fancybox.toggle();
                });
                prevButton.click(function() {
                    $.fancybox.prev();
                });
                nextButton.click(function() {
                    $.fancybox.next();
                });
                $.fancybox.wrap.append(closeButton);
                $.fancybox.wrap.append(prevButton);
                $.fancybox.wrap.append(nextButton);
                $.fancybox.wrap.append(fullscreenButton);
            }
	});
}

$.fn.simpleInstagramFancybox = function ( options ) {
	
	/* Setting Up Variables
	------------------------------*/
	var settings = {
		mode : 'popular', // This sets the mode to either "user" or "popular". Either pull from the popular feed or your user feed. Default is set to popular
		accessToken : '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f', // This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f
		userID : '1138644', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
		speed: 700, // Sets the speed of the images fade in effect, default is 700.
		delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
		appearEffect : 'fade', // Allows you to set the effect used to show photos. Options include fade,slide,motion. Default is fade.
		captionOn : false, // Allows you to turn on captions
		tags: "", // Allows you limit photos based on a given tag
		numberOfImages: 12
	};
	
	// Combine your options with our settings...
	$.extend(settings, options);
	
	/* Plugin Logic
	------------------------------*/
	return this.each(function() {

		// Powers Activate...
		$(document).ready(function(){
			instagramFetch(settings);
			startFancybox();
		});
		
	

	});
}
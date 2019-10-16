(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  $(document).ready(function () {
    $('.counter-num').counterUp({
      delay: 10,
      time: 2000
    });
  });

  


  
})(jQuery); // End of use strict


var googleMap = function() {
	if ( $().gmap3 ) {
		$("#googlemap").gmap3({
			map:{
				options:{
					zoom: 11,
					mapTypeId: 'arch_style',
					mapTypeControlOptions: {
						mapTypeIds: ['arch_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
					},
					scrollwheel: false
				}
			},
			getlatlng:{
				address:  "PO Box 97845 Baker st. 567, Los Angeles, California, United States",
				callback: function(results) {
					if ( !results ) return;
					$(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
					$(this).gmap3({
						marker:{
							latLng:results[0].geometry.location,
							options:{

							}
						}
					});
				}
			},
			styledmaptype:{
				id: "arch_style",
				options:{
					name: "Arch Map"
				}, 
				styles: [
				{
					"featureType": "landscape",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 65
					},
					{
						"visibility": "on"
					}
					]
				},

				{
					"featureType": "poi",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 51
					},
					{
						"visibility": "simplified"
					}
					]
				},

				{
					"featureType": "road.highway",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"visibility": "simplified"
					}
					]
				},

				{
					"featureType": "road.arterial",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 30
					},
					{
						"visibility": "on"
					}
					]
				},
				{
					"featureType": "road.local",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 40
					},
					{
						"visibility": "on"
					}
					]
				},
				{
					"featureType": "transit",
					"stylers": [
					{
						"saturation": -100
					},
					{
						"visibility": "simplified"
					}
					]
				},

				{
					"featureType": "administrative.province",
					"stylers": [
					{
						"visibility": "off"
					}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels",
					"stylers": [
					{
						"visibility": "on"
					},
					{
						"lightness": -25
					},
					{
						"saturation": -100
					}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
					{
						"hue": "#edf0f4"
					},
					{
						"lightness": 17
					},
					{
						"saturation": -97
					}
					]
				}
				]                   
			},
		});
	}
}; 


googleMap();


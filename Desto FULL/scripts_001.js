(function($) {
	// Isotope
	var items = $('#portfolio-items');
	items.isotope({
		 itemSelector : '.portfolio-item'	 
	});
	
	// Isotope filtering
	$('#portfolio-filters a').click(function(){
	  var selector = $(this).attr('data-filter');
	  items.isotope({ filter: selector });
	  return false;
	});
	
	// Fancybox
  $("a[rel^='fancybox[']").fancybox({
    fitToView: true
  });
	// Google Map
	initialize();

	// Responsive menu
	$("<select />").appendTo("#navigation");
	
	// Create default option "Go to..."
	$("<option />", {
	"selected": "selected",
	"value": "",
	"text": "Go to..."
	}).appendTo("#navigation select");
	
	// Populate dropdown with menu items
	$(".main-nav a").not('#portfolio-filters a').each(function () {
	var el = $(this);
	$("<option />", {
	  "class": el.attr("class"),
	  "value": el.attr("href"),
	  "text": el.text()
	}).appendTo("nav select");
	});
	
	$("nav select").change(function(e) {
		var select 	= e.target;
 		var option 	= select.options[select.selectedIndex];
 		var trigger = $(option).attr('class');		
		var target = $('h4#'+trigger);
        {
            var top = target.offset().top;
            $('html,body').animate({scrollTop: top}, 1000);
            return false;
        }
	});	
	
	// Smooth Scroll
	$('.main-nav a').click(function() {
		$target = $(this).attr('class');
		$.smoothScroll({
			scrollTarget: 'h4#' + $target,
			 speed: 1000
		});
		return false;
	});
	
	// Scroll back to top
	$('#btop').click(function(){
		$.smoothScroll({
			scrollTarget: '.logo',
			 speed: 1000
		});
		return false;
	});
	
	// Conditional display	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			$('#btop').fadeIn('slow');
		} else {
			$('#btop').fadeOut('slow');
		}
	});
	

})( jQuery );

function initialize() {
	var myLatlng = new google.maps.LatLng(MustacheOption.map_coords_lat,MustacheOption.map_coords_long);

  var mapOptions = {
	  zoom: parseInt(MustacheOption.map_zoom_level),
scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	var contentString = '<div id="content">'+MustacheOption.map_tooltip+'</div>';
	
	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});
	
	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
	    title: ''
	});
	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});
}
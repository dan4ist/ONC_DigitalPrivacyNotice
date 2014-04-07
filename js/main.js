jQuery(document).ready(function ($) {

	//initialize Stellar.js
	$(window).stellar();
	
	//cache some variables
	var lastScrollTop = 0;
	var links = $('.navigation').find('li');
	slide = $('.transition');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');
	mover = $('.mover');
	var sticky = $('#sticky');

	//Setup waypoints plugin
	slide.waypoint(function (event, direction) {
		//cache the variable of the data-slide attribute associated with each slide
		dataslide = $(this).attr('data-slide');

		//If the user scrolls up, change the navigation link that has the same data-slide attribute as the slide to active 
		//and remove the active class from the previous navigation link
		if (direction == 'down') {
			$('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
		} else {
			$('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
		}
	});

	//waypoints doesnt detect the first slide when a user scrolls back up to the top
	//so we add the below that removes the class from navigation link slide 2 and adds it to navigation link slide 1
	mywindow.scroll(function() {
		if(mywindow.scrollTop() == 0) {
			$('.navigation li[data-slide="1"]').addClass('active');
			$('.navigation li[data-slide="2"]').removeClass('active');	
		}

		//handle left scrolling of section titles
		var bar = $('.mover');
		var w = bar.width();
		var st = $(this).scrollTop();
		var left = bar.position().left;
		if (st < lastScrollTop) {
			//bar.css("width", w-2);
			bar.css("left", left-.75);
		} else {
			//bar.css("width", w+2);
			bar.css("left", left+.75);
		}

		lastScrollTop = st;
	});

	//A function that will be passed a slide number and then will scroll to that slide using jquerys animate.  
	//We also passed in the easing method of 'easeInOutQuint' which is available via the easing plugin
	function goToByScroll(dataslide) {
		htmlbody.animate({
			scrollTop: $('.transition[data-slide="' + dataslide + '"]').offset().top
		}, 2000, 'easeInOutQuint');
	}

	//When a user clicks on the navigation links, get the data-slide attribute value
	//and pass to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
	});

	$('.oneline').hover(function() {
    	$(this).animate({
        	height: $(this)[0].scrollHeight+'px',
        	backgroundColor: 'rgba(0, 0, 0, 0.9)'
    	}, 300);
	},function() {
	    $(this).animate({
	        height: '28px',
	        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    	}, 300);
	});
	
	$('.twoline').hover(function() {
    	$(this).animate({
        	height: $(this)[0].scrollHeight+'px',
        	backgroundColor: 'rgba(0, 0, 0, 0.9)'
    	}, 300);
	},function() {
	    $(this).animate({
	        height: '55px',
	        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    	}, 300);
	});
});
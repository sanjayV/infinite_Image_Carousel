(function( $ ) {
	$.fn.carousel = function(options) {

		// default settings
        var settings = $.extend({
            auto         : true,
            animateSpeed : 500,
            autoSpeed    : 3000
        }, options);

		var currentImg = 0
			, newImg = 0
			, totalImg = 0
			, mainClass = this
			, innerClass = '.imageDiv'
			, carouselWidth = 0
			, animateSpeed = settings.animateSpeed
			, autoSpeed = settings.autoSpeed
			, isComplete = true
			, currentInterval = "";

		init = function() {
			totalImg = $(mainClass).find(innerClass).length;
			getCarouselPosition();
			bindEvents();

			if (settings.auto)
				autoSlide();
		};

		bindEvents = function() {

			$( window ).resize(function() {
				carouselWidth = $(mainClass).find(innerClass).width();
			});

			$('.arrowDiv.left').unbind('click').bind('click', function(e) {
				e.preventDefault();
				newImg = currentImg - 1;

				if (newImg < 0) {
					newImg = totalImg - 1;
				}

				if (isComplete)
					slideCarousel('prev');
			});

			$('.arrowDiv.right').unbind('click').bind('click', function(e) {
				e.preventDefault();
				newImg = currentImg + 1;

				if (newImg > totalImg - 1) {
					newImg = 0;
				}

				if (isComplete)
					slideCarousel('next');
			});

			$('.arrowDiv a').hover(function()  {
				if (currentInterval != "")
					clearInterval(currentInterval);
			}, function() {
				autoSlide();
			})
		};

		getCarouselPosition = function() {
			carouselWidth = $(mainClass).find(innerClass).width();
		};

		slideCarousel = function(direction) {
			isComplete = false;

			var newImgMove = carouselWidth+'px'
				, oldImgMove = -1*(carouselWidth) + 'px';


			if (direction == 'prev') {
				newImgMove = -1*(carouselWidth) + 'px';
				oldImgMove = carouselWidth + 'px';
			}

			$(mainClass).find(innerClass).eq(newImg).css({'left': newImgMove}).addClass('active');

			$(mainClass).find(innerClass).eq(newImg).animate({
				left: 0,
			}, animateSpeed);

			$(mainClass).find(innerClass).eq(currentImg).animate({
				left: oldImgMove,
			}, animateSpeed, function() {
				$(this).attr('style', "");
				$(mainClass).find(innerClass).eq(currentImg).removeClass('active');
				currentImg = newImg;

				isComplete = true;
			});
		};

		autoSlide = function() {

			currentInterval = setInterval(function() {
				newImg = currentImg + 1;

				if (newImg > totalImg - 1) {
					newImg = 0;
				}

				slideCarousel('next');
			}, autoSpeed);
		};

		init();

	};

}( jQuery ));
carousel =  {
	imgWidth: '1353',
	currentImg: 0,
	newImg: 0,
	totalImg: 0,
	mainClass: '.inner',
	innerClass: '.imageDiv',
	carouselWidth: 0,
	animateSpeed: 500,
	autoSpeed: 3000,
	isComplete: true, // for prevent multiclick on same time
	currentInterval: "",

	init: function() {
		this.totalImg = $(this.mainClass).find(this.innerClass).length;
		this.getCarouselPosition();
		this.bindEvents();
		this.autoSlide();
	},

	bindEvents: function() {
		var _this = this;

		$( window ).resize(function() {
			_this.carouselWidth = $(_this.mainClass).find(_this.innerClass).width();
		});

		$('.arrowDiv.left').unbind('click').bind('click', function(e) {
			e.preventDefault();
			_this.newImg = _this.currentImg - 1;;

			if (_this.newImg < 0) {
				_this.newImg = _this.totalImg - 1;
			}

			if (_this.isComplete)
				_this.slideCarousel('prev');
		});

		$('.arrowDiv.right').unbind('click').bind('click', function(e) {
			e.preventDefault();
			_this.newImg = _this.currentImg + 1;

			if (_this.newImg > _this.totalImg - 1) {
				_this.newImg = 0;
			}

			if (_this.isComplete)
				_this.slideCarousel('next');
		});

		$('.arrowDiv a').hover(function()  {
			if (_this.currentInterval != "")
				clearInterval(_this.currentInterval);
		}, function() {
			_this.autoSlide();
		})
	},

	getCarouselPosition: function() {
		var _this = this;
		_this.carouselWidth = $(_this.mainClass).find(_this.innerClass).width();
	},

	slideCarousel: function(direction) {
		var _this = this;
		_this.isComplete = false;

		var newImgMove = _this.carouselWidth+'px'
			, oldImgMove = -1*(_this.carouselWidth) + 'px';


		if (direction == 'prev') {
			newImgMove = -1*(_this.carouselWidth) + 'px';
			oldImgMove = _this.carouselWidth + 'px';
		}

		$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).css({'left': newImgMove}).addClass('active');

		$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).animate({
			left: 0,
		}, _this.animateSpeed);

		$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).animate({
			left: oldImgMove,
		}, _this.animateSpeed, function() {
			$(this).attr('style', "");
			$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).removeClass('active');
			_this.currentImg = _this.newImg;

			_this.isComplete = true;
		});
	},

	autoSlide: function() {
		var _this = this;

		_this.currentInterval = setInterval(function() {
			_this.newImg = _this.currentImg + 1;

			if (_this.newImg > _this.totalImg - 1) {
				_this.newImg = 0;
			}

			_this.slideCarousel('next');
		}, _this.autoSpeed);
	}
};
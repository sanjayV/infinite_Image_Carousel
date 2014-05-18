carousel =  {
	imgWidth: '1353',
	currentImg: 0,
	newImg: 0,
	totalImg: 0,
	mainClass: '.inner',
	innerClass: '.imageDiv',
	carouselWidth: 0,
	animateSpeed: 500,
	isComplete: true, // for prevent multiclick on same time

	init: function() {
		this.totalImg = $(this.mainClass).find(this.innerClass).length;
		this.getCarouselPosition();
		this.bindEvents();
	},

	bindEvents: function() {
		var _this = this;
		$('.prev').unbind('click').bind('click', function() {
			_this.newImg = _this.currentImg - 1;;

			if (_this.newImg < 0) {
				_this.newImg = _this.totalImg - 1;
			}

			if (_this.isComplete)
				_this.slideCarousel('prev');
		});

		$('.next').unbind('click').bind('click', function() {
			_this.newImg = _this.currentImg + 1;

			if (_this.newImg > _this.totalImg - 1) {
				_this.newImg = 0;
			}

			if (_this.isComplete)
				_this.slideCarousel('next');
		});
	},

	getCarouselPosition: function() {
		var _this = this;
		_this.carouselWidth = $(_this.mainClass).find(_this.innerClass).width();
		console.log(_this.carouselWidth)
	},

	slideCarousel: function(direction) {
		var _this = this;
		_this.isComplete = false;

		if (direction == 'next') {
			$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).css({'left': _this.carouselWidth+'px'}).addClass('active');

			$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).animate({
				left: 0,
			}, _this.animateSpeed);

			$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).animate({
				left: -1*(_this.carouselWidth),
			}, _this.animateSpeed, function() {
				$(this).attr('style', "");
				$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).removeClass('active');
				_this.currentImg = _this.newImg;

				_this.isComplete = true;
			});
		} else {
			$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).css({'left': -1*_this.carouselWidth+'px'}).addClass('active');

			$(_this.mainClass).find(_this.innerClass).eq(_this.newImg).animate({
				left: 0,
			}, _this.animateSpeed);

			$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).animate({
				left: (_this.carouselWidth),
			}, _this.animateSpeed, function() {
				$(_this.mainClass).find(_this.innerClass).eq(_this.currentImg).removeClass('active');
				$(this).attr('style', "");
				_this.currentImg = _this.newImg;

				_this.isComplete = true;
			});
		}
	}
};
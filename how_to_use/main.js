$(document).ready(function() {

	animFn = function(element) {
		element.addClass("active");
	}

	var firstSettings = {
		trigger: $(".page__grid"),
		element: $(".page__grid .page__children"),
		stagger: true,
		offset: 150,
		animFn: animFn
	};

	var secondSettings = {
		trigger: $(".informations-block"),
		element: $(".informations-block .rightPart div"),
		stagger: true,
		offset: -150,
		animFn: animFn,
		disable_breakpoint: 800
	};

	$(window).scroll($.throttle( 250, function() {

		mcirReveal(firstSettings);
		mcirReveal(secondSettings);

	}));

});
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
 (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/*
 * mcirReveal v1.1 - 3/17/16
 * My Client is Rich
 * http://myclientisrich.com
 * NOTE : jQuery is required for this to work. Ben Alman's throttle/debounce plugin has been packed with this
 * because we should all throttle this whenever we are listening for $(window).scroll.
 * I.E : $(window).scroll($.throttle( 250, myFunction ));
 * The later one comes packed with this, since it hasn't been subject to any change for over 5 years now.
 */

 (function($) {

 	jQuery.fn.mcirReveal = function($settings) {

 		var $this = $(this);

 		var $settings = $.extend({
 			element: $this,
 			stagger: false,
 			stagger_delay: 250,
 			offset: 0,
 			disable_breakpoint: 0,
 			animFn: function() {
 				console.log("%cMCIR_REVEAL — You better use a custom function though.", "color: red;");
 				$this.addClass("active");
 			}
 		}, $settings);

 		if($this.offset() == undefined || $this == undefined) {
 			return;
 		}

 		if($settings['animFn'] == undefined || typeof $settings['animFn'] !== "function") {
 			return;
 		}

 		if($(window).width() >= $settings['disable_breakpoint']) {
			/*
			** As long as locked is false, we keep trying.
			** Locked is a data attribute that is set to true whenever the animation cycle is complete. It prevents the script from running for no reason.
			*/
			if($this.data("locked") !== "true") {

				/*
				** If in viewport..
				*/
				if(($(window).scrollTop() + $(window).height() - $settings['offset']) >= $this.offset().top) {
					/*
					** If stagger is true
					*/
					if($settings['stagger'] == true) {
						/*
						** Reset stagger delay
						** We use a new variable so we can still access base delay later on.
						*/
						staggerDelay = $settings['stagger_delay'],
						nbIterations = $settings['element'].length;
						$settings['element'].each(function(i) {
							var thatElem = $(this);
							if(thatElem.data("displayed") !== "true") {
								thatElem.data("displayed", "true");
								setTimeout(function() {
									$settings['animFn'](thatElem);
									/*
									** Increment stagger delay to create a staggering effect.
									*/
								}, staggerDelay);
								staggerDelay += $settings['stagger_delay'];
								if(i == (nbIterations - 1)) {
									$this.data("locked", "true");
								}
							}
						});
					} else {
						/*
						** Else we simply show element.
						*/
						$settings['animFn']($settings['element']);
						$this.data("locked", "true");
					}
				}
			}
		}
	}

})(jQuery);
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
 * mcirReveal v1.0 - 3/17/16
 * My Client is Rich
 * http://myclientisrich.com
 * NOTE : jQuery is required for this to work. Ben Alman's throttle/debounce plugin has been packed with this
 * because we should all throttle this whenever we are listening for $(window).scroll.
 * I.E : $(window).scroll($.throttle( 250, myFunction ));
 * The later one comes packed with this, since it hasn't been subject to any change for over 5 years now.
 */

 (function($) {

 	mcirReveal = function($settings) {
			
		if($settings['trigger'].offset() == undefined || $settings['trigger'] == undefined) {
			return;
		}

		if($settings['trigger'] == undefined) {
			return;
		}

		if($settings['animFn'] == undefined || typeof $settings['animFn'] !== "function") {
			return;
		}

		if($settings['disable_breakpoint'] == undefined) {
			$settings['disable_breakpoint'] = 20000;
		}

		if($(window).width() <= $settings['disable_breakpoint']) {

			/*
			** If no element inputed, element is the same as trigger.
			*/
			if($settings['element'] == undefined) {
				$settings['element'] = $settings['trigger'];

				if($settings['element'].offset() == undefined) {
					return;
				}
			}

			/*
			** Default stagger delay is 250ms.
			*/

			if($settings['stagger_delay'] == undefined) {
				$settings['stagger_delay'] = 250;
			}

			/*
			** If no offset inputed, offset is 0.
			*/
			if($settings['offset'] == undefined) {
				$settings['offset'] = 0;
			}
			
			/*
			** As long as locked is false, we keep trying.
			** Locked is a data attribute that is set to true whenever the animation cycle is complete. It prevents the script from running for no reason.
			*/
			if($settings["trigger"].data("locked") !== "true") {
				var currentScroll = ($(window).scrollTop() + $(window).height()) - $settings['offset'],
				triggerOffset = $settings['trigger'].offset().top;

				/*
				** If in viewport..
				*/
				if(currentScroll >= triggerOffset) {
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
									/*
									** From this point on, nothing else than the listener will run.
									*/
									$settings['trigger'].data("locked", "true");
								}
							}
						});
					} else {
						/*
						** Else we simply show element.
						*/
						$settings['animFn']($settings['element']);
						/*
						** From this point on, nothing else than the listener will run.
						*/
						$settings['trigger'].data("locked", "true");
					}
				}
			}
		}
	}

})(jQuery);
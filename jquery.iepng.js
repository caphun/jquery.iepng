/**
 * jQuery IEPNG
 *
 * Copyright (c) 2009 Ca-Phun Ung <caphun at yelotofu dot com>
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://github.com/caphun/jquery.iepng
 *
 * This plugin fixes support for transparent PNGs in IE6 and below.
 */

(function($) {

$.fn.iepng = function(options) {

	options = $.extend({}
	, options);

	return $.each(this, function() {
		
		// define self
		var self = $(this);

		// IE opacity is false and version must be under 7
		if (!$.support.opacity && $.browser.version.substr(0,1) < 7) {
			// determine which fix to apply for the current element if any
			if (self.is('*[src$=.png]')) {
				$.iepng.fixAttr.apply(this, arguments);
			} else if (self.css('background-image').indexOf('.png')) {
				$.iepng.fixCss.apply(this, arguments);
			}
		}
		
		// return jQuery object
		return $;
	});
};

// iepng utility functions
$.iepng = {
	// fix elements with png-source
	fixAttr: function() {
		var png = $(this).attr('src'),
			sizing = 'crop';
		
		// TODO: implement a simplicistic solution
	},

	// fix css background pngs
	fixCss: function() {
		var png = $(this).css('background-image').replace(/url\(([^\)]+)\)/i, '$1'),
			sizing = 'crop';
		
		$(this).css({
			backgroundImage: 'none', 
			filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+ png +'\', sizingMethod=\''+ sizing +'\')'
		});
	}
}

})(jQuery);
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

	options = $.extend({
		sizing: 'crop',
		spacer: 'http://upload.wikimedia.org/wikipedia/commons/5/52/Spacer.gif'
	}, options);

	return $.each(this, function() {
		
		// define self
		var self = $(this);

		// IE opacity is false and version must be under 7
		if (!$.support.opacity && $.browser.version.substr(0,1) < 7) {
			// determine which fix to apply for the current element if any
			if (self.is('*[src]')) {
				$.iepng.fixAttr.apply(this, [options]);
			} else if (self.css('background-image')) {
				$.iepng.fixCss.apply(this, [options]);
			}
		}
		
		// return jQuery object
		return $;
	});
};

// iepng utility functions
$.iepng = {
	msfilter: function(png, sizing) {
		return {filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+ png +'\', sizingMethod=\''+ sizing +'\')'};
	},
	
	// fix elements with png-source
	fixAttr: function(o) {
		var self = $(this), 
			png = self.attr('src'),
			w = self.attr('width') || self.width(),
			h = self.attr('height') || self.height();

		self
			.attr({src: o.spacer, width: w, height: h})
			.css($.iepng.msfilter(png, o.sizing));
	},

	// fix css background pngs
	fixCss: function(o) {
		var self = $(this),
			png = self.css('background-image').replace(/url\(\u0022([^\)]+)\u0022\)/i, '$1');

		self.css(
			$.extend({
				backgroundImage: 'none'
			}, $.iepng.msfilter(png, o.sizing))
		);
	}
}

})(jQuery);
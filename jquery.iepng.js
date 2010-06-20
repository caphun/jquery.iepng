/**
 * jQuery IEPNG
 *
 * Copyright (c) 2009 Ca-Phun Ung <caphun at yelotofu dot com>
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://github.com/caphun/jquery.iepng
 *
 * This plugin fixes support for transparent PNGs in IE6 and below.
 */

(function($) {

var spacer = 'http://upload.wikimedia.org/wikipedia/commons/5/52/Spacer.gif',
    sizing = 'scale';

$.fn.iepng = function( options ) {
    return this.each( function() {

        var $self = $( this ), w = $self.width(), h = $self.height();

        // IE opacity is false and version must be under 7
        if (!$.support.opacity && $.browser.version.substr(0,1) < 7) {

            $self
                .css({ 
                    backgroundImage: "none", 
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + 
                        ($self[0].src || $self.css('background-image').replace(/url\(\u0022([^\)]+)\u0022\)/i, '$1')) + 
                        "', sizingMethod='" + sizing + "')"
                })
                .filter('[src]')
                    .attr({ 'src': spacer, 'width': w, 'height': h });

        }
    });
}

})(jQuery);
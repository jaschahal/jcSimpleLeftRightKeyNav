/**
 * Simple Left and Right key navigation
 * Pressed once shows hint for next page, directional key pressed twice will take you to the new page.
 * License Copyright 2012 Jaspreet Chahal
     http://jaspreetchahal.org/

     Permission is hereby granted, free of charge, to any person obtaining
     a copy of this software and associated documentation files (the
     "Software"), to deal in the Software without restriction, including
     without limitation the rights to use, copy, modify, merge, publish,
     distribute, sublicense, and/or sell copies of the Software, and to
     permit persons to whom the Software is furnished to do so, subject to
     the following conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
     LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
     OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * Tested on IE9,IE10, FF 10+, Chrome, Safari 4+, Opera 11+
 */

        jQuery.fn.jcNextPrev = function(settingsOrNextLinkText,nextLink,prevLinkText,PrevLink,theme /*TODO*/) {
            var settings = null;
            if(settingsOrNextLinkText instanceof Object) {
                settings = jQuery.extend({
                    nextLinkText:'',
                    nextLink:'',
                    prevLinkText:'',
                    prevLink:'',
                    callbackBeforeNext:function(){return true;},
                    callbackBeforePrev:function(){return true;},
                    theme:'grey'
                },settingsOrNextLinkText);
            }
            else {
                if(theme == undefined)
                    theme = 'grey';
                settings = {
                    nextLink:nextLink,
                    nextLinkText:settingsOrNextLinkText,
                    prevLink:PrevLink,
                    prevLinkText:prevLinkText,
                    theme:theme, 
                    callbackBeforeNext:function(){return true;},
                    callbackBeforePrev:function(){return true;}
                }
            }
            // draw element markup

            jQuery('<a href="'+settings.prevLink+'" class="jcNextPrevLink" id="prevLink">' +
                '<span class="arrow"></span>' +
                '<span class="title">Previous</span>' +
                '<div class="description"><span>'+settings.prevLinkText+'</span></div>' +
                '</a>' +
                '<a href="'+settings.nextLink+'" class="jcNextPrevLink" id="nextLink">' +
                '<span class="arrow"></span>' +
                '<span class="title">Next</span>' +
                '<div class="description"><span>'+settings.nextLinkText+'</span></div>' +
                '</a>').appendTo('body');

            // IDs of our next and prev containers
            var $prev = jQuery("#prevLink");
            var $next = jQuery("#nextLink");
            var nextHoverIn = function() {
                $next.children('.description').css({
                    width:'180px',
                    left: '-180px'
                });
                $prev.children('.description').css({
                    width:'0px'
                });
            }
            var nextHoverOut = function() {
                $next.children('.description').css({width:'0px',left: '0px'})
            }
            var prevHoverIn = function() {
                $prev.children('.description').css({
                    width:'180px',
                    left: $prev.children('.jcNextPrevLink').width()+'px'
                });
                $next.children('.description').css({
                    width:'0px',
                    left: '0px'
                });
            }
            var prevHoverOut = function() {
                $prev.children('.description').css({width:'0px'})
            }

            // if links are not set then don't show
            if(!settings.nextLink) {
                $next.hide();
            }
            if(!settings.prevLink) {
                $prev.hide();
            }
            // handles Hovers
            if($next.is(":visible")) {
                $next.mouseenter(function(){
                    nextHoverIn();
                }).mouseleave(function(){
                        nextHoverOut();
                    });
            }
            // do the same thing with prevLink
            if($prev.is(":visible")) {
                $prev.mouseenter(function(){
                    prevHoverIn();
                }).mouseleave(function(){
                        prevHoverOut();
                    });
            }
            // if either of nextLink or prevLink is set then we will bind
            if(settings.nextLink || settings.prevLink) {
                var keys = {left:{code:37,pressed:0},top:{code:38,pressed:0},right:{code:39,pressed:0},down:{code:40,pressed:0}};
                var resetKeyPress = function() {
                    keys.left.pressed =
                        keys.right.pressed = 0;
                }
                jQuery(document).keydown(function(e) {

                    if ( this !== e.target && (/textarea|select/i.test( e.target.nodeName ) ||
                        e.target.type === "text" || $(e.target).prop('contenteditable') == 'true' )) {
                        nextHoverOut();
                        prevHoverOut();
                        return;
                    }

                    switch (e.which) {
                        case keys.left.code:
                            if(settings.prevLink) {
                                var currentVal  = keys.left.pressed;
                                resetKeyPress();
                                keys.left.pressed = currentVal + 1;
                                if(keys.left.pressed % 2 == 1 && keys.left.pressed > 0) {
                                    prevHoverIn();
                                }
                                if(keys.left.pressed % 2 == 0 && keys.left.pressed > 0) {
                                    if(settings.callbackBeforeNext()) {
                                        document.location.href = settings.prevLink;
                                    }
                                }
                            }
                            break;
                        case keys.right.code:
                            if(settings.nextLink) {
                                var currentVal  = keys.right.pressed;
                                resetKeyPress();
                                keys.right.pressed = currentVal + 1;
                                if(keys.right.pressed % 2 == 1 && keys.right.pressed > 0) {
                                    nextHoverIn();
                                }
                                if(keys.right.pressed % 2 == 0 && keys.right.pressed > 0) {
                                    if(settings.callbackBeforePrev()) {
                                        document.location.href = settings.nextLink;
                                    }
                                }
                            }
                            break;
                        default:
                            keys.left.pressed =
                                keys.right.pressed = 0 ;
                            nextHoverOut();
                            prevHoverOut();
                            break;
                    }
                })
            }
        };
jcSimpleLeftRightKeyNav
=======================

This plugin enables left and right key post navigation.

Left arrow key will load passed Previous URL if pressed twice in a row, however if its pressed once then user will be able to see title of previous page. You are responsible to pass on valid URL's and page title.
The same thing applies to Right arrow key press too. It load the next page link as specified by you.

<h1>Usage</h1>

<code>
 $(document).ready(function(){
     jQuery().jcNextPrev({nextLink:'#',
                                nextLinkText:'Jaspreet Chahal\' blog',
                                prevLink:'#',
                                prevLinkText:'Demo Pill'});

});
</code>

Or use it as

<code>
 $(document).ready(function(){
// jcNextPrev('Next Link title','Next_URL','Previous Link title',"Previous_URL");
 jQuery().jcNextPrev('Jaspreet Chahal\' blog','http://jaspreetchahal.org','Remove SPAM twitter followers','http://blockfak.es');
});
</code>

<h3>
Press <- key once and twice. <br>
Press -> key once and twice. <br>

</h3>

For more details please visit my blog http://jaspreetchahal.org 

Article is hosted at http://jaspreetchahal.org/jquery-plugin-simple-page-navigation-with-left-and-right-arrow-keys

This plugin can be extended to new limits. If you find it usefule please consider donations.

<h2>Tested on</h2>

- IE 9
- IE 10
- FF 10+
- Chrome
- Safari 4+
- Opera 11+

IE 8 and 7 are not supported.


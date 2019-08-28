// ==UserScript==
// @name           Steam Workshop Downloader Button
// @namespace      http://github.com/fgblomqvist
// @description    Adds a button to the Steam Workshop pages (even collections) that lets you head straight to the specific addon page at steamworkshop.download
// @include        *steamcommunity.com/sharedfiles/filedetails/?id=*
// @version        1.0.3
// @downloadURL    http://steamworkshopdownloader.com/static/files/swd.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

// Let's first check to see if this is a shared collection. If it is, iterate though all the collectionItem divs and add the link to
// http://steamworkshop.download/download/view/id from the id parsed by the div's id: 'sharedfile_[id here]'

var mods = $(".collectionItem");
if (mods.length > 0) {
  $("head").append("<style type='text/css'>" +
    ".general_btn.subscribe.myDlBtn:hover {" +
    "background-image: url(https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/btn_blue.png) !important;"+
    "}"+
    "</style>");
  mods.each(function( index ) {
    var modId = $(this).attr("id").slice(11);

    var btn = document.createElement('a');
    btn.setAttribute('class', 'general_btn subscribe myDlBtn ');
    btn.setAttribute('href', 'http://steamworkshop.download/download/view/' + id);
    btn.innerHTML = '<div class="subscribeIcon"></div>' +
    '<span class="subscribeText">download</span>';

    $(this).find(".subscriptionControls").first().append(btn);
    //console.log( "collectionItem#" + index + " modId = " + modId );
  });
}
else {

  var patt = new RegExp("[0-9]{2,15}");
  var id = patt.exec(document.URL);

  var realButton = document.getElementById("SubscribeItemBtn");

  // shorten the text in the box because it will be in the way
  realButton.parentNode.getElementsByTagName("h1")[0].innerHTML = "Download/Subscribe to the right";

  var myButtonPosition = realButton.offsetWidth + 20;

  var button = document.createElement('a');
  button.setAttribute('class', 'btn_green_white_innerfade btn_border_2px btn_medium');
  button.setAttribute('href', 'http://steamworkshop.download/download/view/' + id);
  button.setAttribute('style', 'right: ' + myButtonPosition + 'px;');

  button.innerHTML = '<div class="subscribeIcon"></div>' +
    '<span class="subscribeText">' +
    '<div class="subscribeOption subscribe selected" id="SubscribeItemOptionAdd">Download</div>' +
    '</span>';

  // append the element after the real subscribe button
  if (realButton.nextSibling) {
    realButton.parentNode.insertBefore(button, realButton.nextSibling);
  }
  else {
    realButton.parentNode.appendChild(button);
  }
}
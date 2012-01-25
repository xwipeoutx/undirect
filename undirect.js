// Google
(function() {
  var googRegex = /https?.\/\/.+google[^\/]*/gi;
  if (document.location.href.match(googRegex)) {
                   
    var scrubLinks = function() {
      var els = document.getElementsByTagName('a');
      for(var i=0, il=els.length; i<il; i++) {
        var el = els[i];
        var ni = el.attributes.getNamedItem('onmousedown');
        if (ni && ni.textContent.substring(0, 10) === "return rwt") {
          el.attributes.removeNamedItem('onmousedown');
        }    
      }
    };
  
    var timeoutId = false;
    document.body.addEventListener("DOMNodeInserted", function() {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(scrubLinks, 1000);
    }, false);
  };
})();
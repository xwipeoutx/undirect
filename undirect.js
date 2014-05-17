var fn = (function() {
    var googRegex = /https?.\/\/.+google[^\/]*/gi;
    if (document.location.href.match(googRegex)) {

        var expectedRwt = function() { return true; };

        var scrubLinks = function() {
            if (window.rwt && window.rwt != expectedRwt) {
                delete window.rwt;
                Object.defineProperty(window, 'rwt', {
                    value: expectedRwt,
                    writable: false
                });
            }
        };

        scrubLinks();
        var timeoutId = 0;
        document.body.addEventListener("DOMNodeInserted", function() {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(scrubLinks, 1000);
        }, false);
    }
});

var fnContents = fn.toString();
var executeFnScript = '(' + fnContents + ')();';

var script = document.createElement('script');
script.textContent = executeFnScript;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
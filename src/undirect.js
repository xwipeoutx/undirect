(function() {
    var googlePagesPattern = /https?.\/\/.+google[^\/]*/gi;
    if (!document.location.href.match(googlePagesPattern))
        return;

    var scriptToExecute = (function() {
        var expectedRwt = function() { return true; };

        var replaceRwtFunction = function() {
            if (window.rwt && window.rwt != expectedRwt) {
                delete window.rwt;
                Object.defineProperty(window, 'rwt', {
                    value: expectedRwt,
                    writable: false
                });
            }
        };

        replaceRwtFunction();

        var timeoutId = 0;
        document.body.addEventListener("DOMNodeInserted", function() {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(replaceRwtFunction, 1000);
        }, false);
    });

    // Write script to page - since plugins often work in an isolated world, this gives us the
    // ability to replace javascript added by the page
    var fnContents = scriptToExecute.toString();
    var executeFnScript = '(' + fnContents + ')();';

    var script = document.createElement('script');
    script.textContent = executeFnScript;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
})();
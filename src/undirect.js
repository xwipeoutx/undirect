(function() {
    var googPagesPattern = /https?.\/\/.+google[^\/]*/gi;
    var yaPagesPattern = /https?.\/\/.*yandex[^\/]*/gi;
	var seType = 0;
	
	
	if (document.location.href.match(googPagesPattern) ) 
		seType = 1;
	if (document.location.href.match(yaPagesPattern) ) 
		seType = 2;
	if (seType == 0)
		return;

    var googExecute = (function() {
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

	var yaExecute = (function() {
	var expectedRC = function() { };
	var replaceRCFunction = function() {
		if (window.rc && window.rc != expectedRC) {
			delete window.rc;
			Object.defineProperty(window, 'rc', {
				value: expectedRC,
				writable: false
			});
		}
	};
	replaceRCFunction();
	var timeoutId = 0;
	document.body.addEventListener("DOMNodeInserted", function() {
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(replaceRCFunction, 1000);
	}, false);
});


    // Write script to page - since plugins often work in an isolated world, this gives us the
    // ability to replace javascript added by the page
    var fnContents;
	
	switch(seType){// for other se ... may be
		case 1: //google
			fnContents = googExecute.toString();
			break;
		case 2: // yandex

			fnContents = yaExecute.toString();
			break;
	}
	
    var executeFnScript = '(' + fnContents + ')();';

    var script = document.createElement('script');
    script.textContent = executeFnScript;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
})();
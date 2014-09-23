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
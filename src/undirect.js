(function () {
    var googlePagesPattern = /https?.\/\/.+google[^\/]*/gi;
    var facebookPagesPattern = /https?.\/\/.+facebook[^\/]*/gi;

    var isGoogle = document.location.href.match(googlePagesPattern);
    var isFacebook = document.location.href.match(facebookPagesPattern);

    if (!isGoogle && !isFacebook) {
        return;
    }

    var googleScript = (function () {
        var expectedRwt = function () { return true; };

        var replaceRwtFunction = function () {
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
        document.body.addEventListener("DOMNodeInserted", function () {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(replaceRwtFunction, 1000);
        }, false);
    });

    var facebookScript = (function () {
        var timeoutId = 0;
        window.addEventListener("scroll", function () {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(fixAll, 500);
        });

        fixAll();

        function fixAll() {
            var anchorTags = Array.from(document.getElementsByTagName("a"));
            anchorTags.forEach(fix);
        }

        function fix(anchorTag) {
            if (!anchorTag.href || !anchorTag.href.contains("//l.facebook"))
                return;

            anchorTag.href = getParameterByName("u", anchorTag.href);
        }

        function getParameterByName(name, url) {
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    });

    var script = isGoogle
        ? googleScript
        : facebookScript;

    // Write script to page - since plugins often work in an isolated world, this gives us the
    // ability to replace javascript added by the page
    var fnContents = script.toString();
    var executeFnScript = '(' + fnContents + ')();';

    var script = document.createElement('script');
    script.textContent = executeFnScript;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
})();
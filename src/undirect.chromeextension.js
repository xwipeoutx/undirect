(function() {
    var googlePagesPattern = /https?.\/\/.+google[^\/]*/gi;
    if (!document.location.href.match(googlePagesPattern))
        return;

    var scriptToExecute = (function() {
        //REPLACE_ME
    });

    // Write script to page - since the plugin works in an isolated world, this gives us the
    // ability to replace javascript added by the page
    var fnContents = scriptToExecute.toString();
    var executeFnScript = '(' + fnContents + ')();';

    var script = document.createElement('script');
    script.textContent = executeFnScript;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
})();
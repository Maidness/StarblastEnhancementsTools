(function(){
  chrome.devtools.panels.create("SET Portable",
                                null,
                                "/html/DevTools/DevTools.html",
                                function(panel) { console.log("Load completed!"); });
})();

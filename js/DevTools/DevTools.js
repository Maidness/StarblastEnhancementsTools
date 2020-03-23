window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
browser.devtools.panels.create("SET Portable",
                              null,
                              "/html/DevTools/DevTools.html",
                              function(panel) { console.log("hello from callback"); });

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
browser.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "starblast.io"},
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "dankdmitron.github.io"},
          }),
					new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "starblast.data.neuronality.com"},
          }),
        ],
        // And shows the extension's page action.
        actions: [ new browser.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

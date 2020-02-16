chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "starblast.io"},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "dankdmitron.github.io"},
          }),
					new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "starblast.data.neuronality.com"},
          }),
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

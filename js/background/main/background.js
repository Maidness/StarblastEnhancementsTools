var contents = [
  "starblast.io",
  "pleshkov.dev",
  "starblast.data.neuronality.com",
  "starblast-shipyard.github.io",
  "bhpsngum.github.io"
];
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: contents.map(i=> new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: i},
        })),
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

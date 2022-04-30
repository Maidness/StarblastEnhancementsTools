var contents = [
  "starblast.io",
  "starblast.pleshkov.dev",
  "starblast.dankdmitron.dev",
  "starblast.data.neuronality.com",
  "starblast-shipyard.github.io",
  "bhpsngum.github.io",
  "starblastio.gamepedia.com"
];
chrome.runtime.onInstalled.addListener(function(details) {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: contents.map(i => new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: i},
        })),
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
  // Show changelogs
  if (["install", "update"].includes(details.reason)) chrome.tabs.create({url: chrome.runtime.getURL("/html/Changelog/Changelog.html")})
});

var clickElem = function (query) {
  return '(function(){let elem = document.querySelector("'+query+'"); if (elem) elem.click()})()'
};

var shortcutRules = {
  "in-game-settings": {
    match: function (url) { return url.host == 'starblast.io' && !!url.pathname.match(/^\/+$/)},
    action: clickElem(".sbg-gears")
  },
  "info": {
    match: function (url) {
      if (url.host == 'starblast.io') return !!url.pathname.match(/^\/+(app\.html)*$/);
      else if (url.host.match(/^starblast\.(pleshkov|dankdmitron)\.dev$/)) return url.pathname == "/app";
      return false
    },
    scope: function(url) { return url.host == "starblast.io" },
    action: clickElem(".sbg-info, #about")
  },
  "changelog": {
    match: function (url) { return url.host == 'starblast.io' && !!url.pathname.match(/^\/+$/) },
    action: clickElem(".full-changelog")
  }
};

chrome.commands.onCommand.addListener(function (command, tab) {
  let shortcut = shortcutRules[command], url = new URL(tab.url);
  if (shortcut.match(url)) {
    let scripts = {
      code: shortcut.action,
      frameId: 0
    }
    if ("function" == typeof shortcut.scope) chrome.webNavigation.getAllFrames({tabId:tab.id},function (frames) {
      for (let frame of frames) {
        if (shortcut.scope(new URL(frame.url))) {
          scripts.frameId = frame.frameId;
          return chrome.tabs.executeScript(scripts)
        }
      }
    });
    else return chrome.tabs.executeScript(scripts)
  }
});

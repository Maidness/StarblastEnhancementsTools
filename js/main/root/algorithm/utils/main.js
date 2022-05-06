let files = [
  "parseUI.js",
  "preventReload.js",
  "allLanguages.js",
  "lowercaseName.js",
  "5emotes.js",
  "shipTag.js",
  "explosions.js",
  "crystalColor.js",
  "anonMode.js"
];
for (let file of files) executeJS("/js/main/root/algorithm/utils/loader/" + file, true)

let g = setInterval(function () {
  try {
    document.querySelector(".player-app, #player input").style.textTransform = "none";
    clearInterval(g)
  }
  catch (e) {}
}, 1);

let x = Object.values(Object.values(module.exports.settings).find(v => v && v.mode)).find(v => v && v.startModdingMode);
if (x) x.startGame = eval("(" + x.startGame.toString().replace(/\.toUpperCase\(\)/g, "") + ")");
ChatPanel.prototype.typed = Function("return " + ChatPanel.prototype.typed.toString().replace(/>=\s*4/, " >= 5"))()
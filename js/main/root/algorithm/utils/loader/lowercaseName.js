/*
  Allow users to set lowercase names
*/

let g = setInterval(function () {
  try {
    document.querySelector(".player-app, #player input").style.textTransform = "none";
    clearInterval(g)
  }
  catch (e) {}
}, 1);

let x = Object.values(Object.values(module.exports.settings).find(v => v && v.mode)).find(v => v && "function" == typeof v.startModdingMode);
if (x) x.startGame = Function("return " + x.startGame.toString().replace(/\.toUpperCase\(\)/g, ""))();

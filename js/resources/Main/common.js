let g = setInterval(function () {
  try {
    document.querySelector(".player-app, #player input").style.textTransform = "none";
    clearInterval(g)
  }
  catch (e) {}
}, 1);

let x = Object.values(Object.values(module.exports.settings).find(v => v && v.mode)).find(v => v && "function" == typeof v.startModdingMode);
if (x) x.startGame = Function("return " + x.startGame.toString().replace(/\.toUpperCase\(\)/g, ""))();
ChatPanel.prototype.typed = Function("return " + ChatPanel.prototype.typed.toString().replace(/>=\s*4/, " >= 5"))();

let regex = /(\w+\.getUint8\(1\)!==(this\.[^?]+)\.status\.id)\?((this\.[^?]+)\(\w+\)):\(/;

for (let i in window) try {
  let val = window[i].prototype;
  if (val != null) {
    for (let j in val) {
      let func = val[j];
      if ("function" == typeof func && func.toString().match(regex)) {
        val[j] = Function("return " + func.toString().replace(regex, function($0, $1, $2, $3, $4) {
          let array = $4.split(".");
          array.splice(-1);
          array = array.join(".");
          return $3 + ", " + $1 + " ? (void 0) : (this._self_ship_ == null && (this._self_ship_ = " + array + ".ships.find(function (fg) { return Object.values(fg).find(function (xg) { try { return xg.status.id } catch (e) {return false } }).status.id == " + $2 + ".status.id}.bind(this))), this._self_ship_ != null && (this._self_ship_.model.children = []), "
        }))();
        break;
      }
    }
  }
}
catch (e) {}

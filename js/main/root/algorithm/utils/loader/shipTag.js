/*
  Show ship tag under ship controlling by the client
  Side fix: make ships display with its right finish and name
*/

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
          let selfShip = $2.split("."), k = selfShip.pop();
          selfShip = selfShip.join(".");
          return $3 + ", " + $1 + " ? (void 0) : (this._self_ship_ == null && (this._self_ship_ = " + array + ".ships.find(function (fg) { return Object.values(fg).find(function (xg) { try { return xg.status.id } catch (e) {return false } }).status.id == " + $2 + ".status.id}.bind(this))), this._self_ship_ != null && (Object.values(" + array + ").find(function (xf) { return 'function' == typeof xf.remove}).remove(this._self_ship_.model), Object.values(" + selfShip + ").find(function(fh){ return fh && fh." + k + "}).ship.finish = this._self_ship_.shipmodel.finish, this._self_ship_.shipmodel.dispose()), "
        }))();
        break
      }
    }
  }
}
catch (e) {}

Names.prototype.set = Function("return " + Names.prototype.set.toString().replace(/return [^?]+\?/, "return false ?"))();

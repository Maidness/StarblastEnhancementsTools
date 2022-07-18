/*
  Show ship tag under ship controlling by the client
  Side fix: make ships display with its right finish and name
*/

let regex = /(\w+\.getUint8\(1\)!==(this\.[^?]+)\.status\.id)\?((this\.[^?]+)\(\w+\)):\(/, color = /([^,]+)("hsla\(180,100%,75%,\.75\)")/;

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
          return $3 + ", (" + $1 + ") || (this._self_ship_ == null && (this._self_ship_ = " + array + ".ships.find(function (fg) { return Object.values(fg).find(function (xg) { try { return xg.status.id } catch (e) {return false } }).status.id == " + $2 + ".status.id}.bind(this))), this._self_ship_ != null && (Object.values(" + array + ").find(function (xf) { return 'function' == typeof xf.remove}).remove(this._self_ship_.model), Object.values(" + selfShip + ").find(function(fh){ return fh && fh." + k + "}).ship.finish = this._self_ship_.shipmodel.finish, Object.values(" + selfShip + ").find(function(fh){ return fh && fh.custom}).custom.finish = this._self_ship_.shipmodel.finish, this._self_ship_.shipmodel.dispose()), "
        }))();
      }
      else if ("function" == typeof func && func.toString().match(color)) {
        let t;
        let k = Object.keys(val).find(f => "function" == typeof val[f] && (t = (val[f].toString().match(/===(\w+\.[^,]+)\.hue/) || [])[1]));
        val[k] = Function("return " + val[k].toString().replace(/(\.id)/, "$1, this.selfShip = this.shipid == " + t + ".id"))();
        val[j] = Function("return " + func.toString().replace(color, "$1 this.selfShip ? 'hsla(120, 100%, 75%, .75)' : $2"))()
      }
    }
  }
}
catch (e) {}

Names.prototype.set = Function("return " + Names.prototype.set.toString().replace(/return [^?]+\?/, "return false ?"))();

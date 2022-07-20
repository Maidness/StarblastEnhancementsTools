/*
  Show blank ECPs on leaderboard
*/

let pattern = /,(\s*"blank"\s*!={1,2}\s*this\.custom\.badge)/;

Search: for (let i in window) try {
  let val = window[i].prototype;
  for (let j in val) {
    let func = val[j];
    if ("function" == typeof func && func.toString().match(pattern)) {
      val[j] = Function("return " + func.toString().replace(pattern, ", localStorage.getItem('show_blank_badge') == 'true' || $1"))();
      found = true;
      val.drawIcon = Function("return " + val.drawIcon.toString().replace(/}\s*else\s*{/, '} else if (this.icon !== "blank") {'))();
      let gl = window[i];
      for (let k in gl) {
        if ("function" == typeof gl[k] && gl[k].toString().includes(".table")) {
          let oldF = gl[k];
          gl[k] = function () {
            let current = localStorage.getItem("show_blank_badge") == "true";
            if (this.showBlank !== current) {
              for (let i in this.table) if (i.startsWith("blank")) delete this.table[i];
              this.showBlank = current;
            }
            return oldF.apply(this, arguments)
          };
          break Search;
        }
      }
    }
  }
}
catch (e) {}

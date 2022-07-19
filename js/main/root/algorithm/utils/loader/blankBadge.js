/*
  Show blank ECPs on leaderboard
*/

let pattern = /,\s*"blank"\s*!={1,2}\s*this\.custom\.badge/;

Search: for (let i in window) try {
  let val = window[i].prototype;
  for (let j in val) {
    let func = val[j];
    if ("function" == typeof func && func.toString().match(pattern)) {
      val[j] = Function("return " + func.toString().replace(pattern, ""))();
      break Search;
    }
  }
}
catch (e) {}

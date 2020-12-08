(function(){
  let u = document.querySelector("#terminal_ingame_log"), g = $("#terminal").terminal(), o = g.commands(), tc = {
    log: function (bool) {
      return Modding.prototype.setLog(bool.split(" ")[1], !1);
    },
    clear: function () {
      return $("#terminal").terminal().clear();
    }
  }, clr = g.clear;
  g.set_interpreter(function(...args) {
    let e = (args[0]||"").toString().trim(), es = e.split(" ");
    if (typeof tc[es[0]] == "function") return void tc[es[0]](e);
    else return void o(...args);
  });
  if (!localStorage.getItem("terminal_ingame_log")) localStorage.setItem("terminal_ingame_log",true);
  g.clear = function(...args) {
    clr(...args);
    g.greetings();
    g.echo("Region set to "+ localStorage.modding_region);
    Modding.prototype.setLog(localStorage.getItem("terminal_ingame_log"), !1);
  };
  Modding.prototype.setLog = function(bool, reversed) {
    let c = ["Show","Hide"], color = ["grey","#eee"], cd = ["disabled","enabled"], t = ["false","true"].indexOf(bool);
    if (t != -1) {
      if (reversed) t = 1-t;
      u.setAttribute("data-tooltip",c[t]+" in-game log");
      u.getElementsByTagName("i")[0].setAttribute("style","color:"+color[t]);
      localStorage.setItem("terminal_ingame_log", !!t);
      g.echo("In-game logging set to "+cd[t]);
    }
    else g.error("Unknown identifier: " + bool);
  };
  Modding.prototype.setLog(localStorage.getItem("terminal_ingame_log"), !1);
  u.addEventListener('click', function(){Modding.prototype.setLog(localStorage.getItem("terminal_ingame_log"), !0)});
})();

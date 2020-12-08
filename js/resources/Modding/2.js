(function(){
  var e = Modding.prototype.stopped, f = Modding.prototype.modStarted, c = Modding.prototype.run, tx = Modding.prototype.stop, u = Modding.prototype.tick, v = Modding.prototype.setRegion, h = Modding.prototype.help, alternate = function(name) {
      var ct = ["stop","start"], cmd = ct.indexOf(name), title = ["Run","Terminate"], i = ["play","stop"], run = document.querySelector("#runstopmod");
      if (cmd != -1) {
          run.setAttribute("cmd", ct[Math.abs(cmd-1)]);
          run.setAttribute("data-tooltip", title[cmd]+" Mod");
          run.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-"+i[cmd]);
      }
  }, xg = function (func) {return eval("(function(){return "+func+"})();")};
  Modding.prototype.stopped= function(...args) {
      alternate("stop");
      document.querySelector("#test").setAttribute("style","display:none");
      return e.call(this,...args);
  };
  Modding.prototype.modStarted = function(...args) {
      alternate("start");
      document.querySelector("#test").removeAttribute("style");
      return f.call(this,...args);
  };
  Modding.prototype.run = xg(c.toString().replace(/(\?.+?\:\s*\(\s*)/, '$1alternate("start"),'));
  Modding.prototype.stop = xg(tx.toString().replace(/(\?\s*\(\s*)/, '$1alternate("stop"),'));
  Modding.prototype.tick = xg(u.toString().replace(/(return\s*)(.+)(,this.tick_count)/,'$1(localStorage.getItem("terminal_ingame_log") == "true")?($2):void 0$3'));
  Modding.prototype.setRegion = xg(v.toString().replace(/(\?\()(.+?)(\)\:)/,'$1$2,document.querySelector("#region-select").options.selectedIndex=["Asia","America","Europe"].indexOf(t)+1$3'));
  Modding.prototype.help = xg(h.toString().replace(/(this\.terminal\.echo)/,'this.terminal.echo("--------------------CONSOLE HELP--------------------"),this.terminal.echo("clear                     clear the console"),$1').replace(/(this\.terminal\.echo\("anything javascript)/i,'this.terminal.echo("log <true/false>          toggle in-game logging"),this.terminal.echo("  ex: log false"),$1'));
})();

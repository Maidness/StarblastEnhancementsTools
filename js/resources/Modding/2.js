(function(){
    var e = Modding.prototype.stopped, f = Modding.prototype.modStarted, c = Modding.prototype.run, tx = Modding.prototype.stop, u = Modding.prototype.tick, v = Modding.prototype.setRegion, alternate = function(name) {
        var cmd = ["stop","start"].indexOf(name), title = ["Run","Terminate"], i = ["play","stop"], run = document.querySelector("#runstopmod");
        if (cmd != -1) {
            run.setAttribute("cmd",name);
            run.setAttribute("data-tooltip", title[cmd]+" Mod");
            run.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-"+i[cmd]);
        }
    }, xg = function (func) {return eval("(function(){return "+func+"})();")};
    Modding.prototype.stopped= function() {
        alternate("stop");
        document.querySelector("#test").setAttribute("style","display:none");
        return e.call(this);
    };
    Modding.prototype.modStarted = function(t) {
        alternate("start");
        document.querySelector("#test").removeAttribute("style");
        return f.call(this);
    };
    Modding.prototype.run = xg(c.toString().replace(/(\?.+?\:\s*\(\s*)/, '$1alternate("start"),'));
    Modding.prototype.stop = xg(tx.toString().replace(/(\?\s*\(\s*)/, '$1alternate("stop"),'));
    Modding.prototype.tick = xg(u.toString().replace(/(return\s*)(.+)(,this.tick_count)/,'$1(localStorage.getItem("showtick") == "true")?($2)$3'));
    Modding.prototype.setRegion = xg(v.toString().replace(/(\?\()(.+?)(\)\:)/,'$1$2,document.querySelector("#region-select").options.selectedIndex=["Asia","America","Europe"].indexOf(t)+1$3'));
})();

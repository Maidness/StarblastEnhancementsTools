var term = $('#terminal').terminal();
term.clear();
term.greetings();
term.echo("Region set to "+ localStorage.modding_region);
Modding.prototype.setLog(localStorage.getItem("terminal_ingame_log"), !1);

var term = $('#terminal').terminal(function(command) {});
term.clear();
term.greetings();
term.echo("Region set to "+ localStorage.modding_region);

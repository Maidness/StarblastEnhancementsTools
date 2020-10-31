var client = new XMLHttpRequest(), SET_version;
client.open('GET',root+"js/version.js");
client.onreadystatechange = function (e) {
  if (client.readyState == 4) {
      if (client.status == 200) {
          eval(client.responseText);
          let clientver = SET_version, server = new XMLHttpRequest();
          server.open('GET',"https://raw.githubusercontent.com/Bhpsngum/StarblastEnhancementsTools/master/js/version.js");
          server.onreadystatechange = function (e) {
            if (server.readyState == 4) {
                if (server.status == 200) {
                    eval(server.responseText);
                    if (clientver !== SET_version) {
                      if (confirm("New version of Starblast Enhancements Tools (SET) is unavailable\nWould you like to download it now?")) window.open("https://github.com/bhpsngum/StarblastEnhancementsTools/#official-download-sources","_blank");
                    }
                }
            }
          };
          server.send(null);
      }
  }
};
client.send(null);

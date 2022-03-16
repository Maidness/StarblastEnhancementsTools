(function(){
	function doGET(path, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
						// The request is done; did it work?
						if (xhr.status == 200) {
								// ***Yes, use `xhr.responseText` here***
								callback(xhr.responseText);
						} else {
								// ***No, tell the callback the call failed***
								callback(null);
						}
				}
		};
		xhr.open("GET", path);
		xhr.send();
	}

	function handleFileData(fileData) {
		if (fileData) document.getElementById("Changelog").innerHTML = fileData.split("\n\r\n").map(i => i.split("\n\n")).flat().map(function(i){
      let l = i.split("\n"), ts = l[0].split("/");
      return "<h2>"+ts[0]+"</h2><h4>"+ts[1]+"</h4>"+"<ul>"+l.slice(1,l.length).map(u => u.replace(/^\*\s(.+)/,"<li>$1</li>").replace(/\[([^]*)\]\(([^)]+)\)/g,function(a,b,v){
				if (v.startsWith("e!")) v=chrome.runtime.getURL(v.slice(2,v.length));
				return `<a href='${v}' target='_blank'>${b||v}</a>`;
			})).join("").replace(/\\n/g,"<br>")+"</ul>";
    }).join("<br>");
	}
	doGET(chrome.runtime.getURL("Changelog.txt"),handleFileData);
})();

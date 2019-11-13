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
	if (fileData)
  {
    var text=fileData.replace(/(\d{4}-\d{2}-\d{2})/g,"<h id='$1'>$1</h>").replace(/\/v(\d\.\d\.\d)/g,"<a id='v$1'>&nbsp;v$1</a>");
    text=text.replace(/\*(\s.+)/g,"<li>$1</li>").replace(/\{/g,"<ul>").replace(/\}/g,"</ul>");
    document.getElementById("Changelog").innerHTML=text;
  }
}
doGET(chrome.runtime.getURL("Changelog.txt"),handleFileData);

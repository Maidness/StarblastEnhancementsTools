//This tool is created by GatoCreador887 and a little modified by the extension author
//see the author page: https://github.com/GatoCreador887/
//See the original code here: https://github.com/GatoCreador887/StarblastModding

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function convert() {
    var json = document.getElementById("jsonInput").value;
    var coffeescript = json;

    coffeescript = replaceAll(coffeescript, ",\"", "\n");
    coffeescript = replaceAll(coffeescript, "\t\"", "");
    coffeescript = replaceAll(coffeescript, "{\"", "\n");
    coffeescript = replaceAll(coffeescript, "\":", ": ");

    var indent = 0;

    try {
         indent = Number(document.getElementById("indentationInput").value);
    } catch (e) {

    }

    var coffeescriptLines =  coffeescript.split(/\r\n|\r|\n/);
var typespecIndex = -1;

    for (var i = 0; i < coffeescriptLines.length; i++) {
        var line = coffeescriptLines[i];

        for (var j = 0; j < indent; j++) {
            line = "  " + line;
        }

        if (line.length === line.indexOf(": ") + 2) {
            indent++;
line = replaceAll(line, ": ", ":");
        }

        indent -= (line.match(/}/g) || []).length;

line += "\n";

if (line.indexOf("typespec:") !== -1) {
typespecIndex = i;
//coffeescriptLines[i - 1] = replaceAll(coffeescriptLines[i - 1], "\n", "");
}

        if (i === 0) {
            line = "return model =\n";
        } else if (typespecIndex !== -1 && i >= typespecIndex) {
line = null;
}

        coffeescriptLines[i] = line;
    }

    //coffeescript = coffeescriptLines.join("\n");
coffeescript = coffeescriptLines.join("");

    coffeescript = replaceAll(coffeescript, "}", "");

    document.getElementById("coffeescriptOutput").innerHTML = coffeescript;
}
document.getElementById("convert").addEventListener("click", convert);

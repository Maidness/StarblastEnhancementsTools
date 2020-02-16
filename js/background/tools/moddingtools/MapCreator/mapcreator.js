//This tool is created by GatoCreador887 and a little modified by the extension author
//see the author page: https://github.com/GatoCreador887/
//See the original code here: https://github.com/GatoCreador887/StarblastModding

var gridSize = 30;
var canvas = document.getElementById("canvas");
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.width = document.getElementById("mapSize").value * gridSize+ 101;
canvas.height = document.getElementById("mapSize").value * gridSize+ 1;
var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;
var context = canvas.getContext("2d");
var canvasSize = canvas.height;
var pickedId = -1;
var mouseX = 0;
var mouseY = 0;
var mousePressed = false;
var grid = createArray(document.getElementById("mapSize").value, document.getElementById("mapSize").value);
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    grid[y][x] = -1;
  }
}

var asteroid = document.createElement("img");
asteroid.src = '/icons/tools/moddingtools/MapCreator/Asteroid.png';
asteroid.alt = "Asteroid";

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function process()
{
  console.log(grid);
  var text = "";

  for (let y = 0; y < grid.length; y++) {
    text += "\"";

    for (let x = 0; x < grid.length; x++) {
      var val = grid[y][x];
      var str = 9 - val;

      if (str > 9) {
        str = " ";
      }

      text += str;
    }

    if (y < grid.length - 1) {
      text += "\\n\" +\n";
    } else {
      text += "\"";
    }
  }
  return text.replace(/NaN/g," ");
}


function createArray(length) {
  var arr = new Array(length || 0);
  var i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);

    while (i--) {
      arr[length-1 - i] = createArray.apply(this, args);
    }
  }

  return arr;
}

function onMouseDown(event) {
  var x = event.pageX - canvasLeft;
  var y = event.pageY - canvasTop;
  mousePressed = true;
  var flag1 = false;
  var flag2 = false;

  if (pickedId < 0) {
    if (x > canvasSize + 60 && x < canvasSize + 99) {
      if (y > 0 && y < 40) {
        pickedId = 0;
      } else if (y > 40 && y < 80) {
        pickedId = 1;
      } else if (y > 80 && y < 120) {
        pickedId = 2;
      } else if (y > 120 && y < 160) {
        pickedId = 3;
      } else if (y > 160 && y < 200) {
        pickedId = 4;
      } else if (y > 200 && y < 240) {
        pickedId = 5;
      } else if (y > 240 && y < 280) {
        pickedId = 6;
      } else if (y > 280 && y < 320) {
        pickedId = 7;
      } else if (y > 320 && y < 360) {
        pickedId = 8;
      }
    }
  } else {
    flag1 = true;
  }

  if (y > 0 && y < canvasSize && x > 0 && x < canvasSize) {
    grid[Math.floor(y / gridSize)][Math.floor(x / gridSize)] = pickedId;
  } else {
    flag2 = true;
  }

  if (flag1 && flag2) {
    pickedId = -1;
  }
}

function onMouseUp(event) {
  mousePressed = false;
}

function onMouseMove(event) {
  mouseX = event.pageX - canvasLeft;
  mouseY = event.pageY - canvasTop;

  if (mousePressed && mouseY > 0 && mouseY < canvasSize && mouseX > 0 && mouseX < canvasSize) {
    grid[Math.floor(mouseY / gridSize)][Math.floor(mouseX / gridSize)] = pickedId;
  }
}

function sizeChange(input) {
  if (input.value < 20) {
    input.value = 20;
  } else if (input.value > 200) {
    input.value = 200;
  } else {
    input.value = Math.floor(input.value);
  }

  var size = input.value * gridSize+ 1;

  canvas.width = size + 100;
  canvas.height = size;
  canvasSize = size;

  grid = createArray(input.value, input.value);
  for (let y = 0; y < input.value; y++) {
    for (let x = 0; x < input.value; x++) {
      grid[y][x] = -1;
    }
  }
  draw();
}

function draw(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var x = 0; x <= canvasSize; x += gridSize) {
    context.moveTo(0.5 + x, 0);
    context.lineTo(0.5 + x, canvasSize);
  }

  for (var x = 0; x <= canvasSize; x += gridSize) {
    context.moveTo(0, 0.5 + x);
    context.lineTo(canvasSize, 0.5 + x);
  }

  context.moveTo(0.5 + canvasSize + 60, 360);
  context.lineTo(0.5 + canvasSize + 60, 0);

  context.moveTo(0.5 + canvasSize + 99, 360);
  context.lineTo(0.5 + canvasSize + 99, 0);

  for (var i = 0; i <= 360; i += 40) {
    context.moveTo(canvasSize + 60, 0.5 + i);
    context.lineTo(canvasSize + 100, 0.5 + i);
  }

  context.strokeStyle = "#CDE";
  context.stroke();

  context.drawImage(asteroid, canvasSize + 65, 5, 30, 30);
  context.drawImage(asteroid, canvasSize + 66, 46, 27, 27);
  context.drawImage(asteroid, canvasSize + 67, 87, 25, 25);
  context.drawImage(asteroid, canvasSize + 68, 128, 22, 22);
  context.drawImage(asteroid, canvasSize + 70, 170, 20, 20);
  context.drawImage(asteroid, canvasSize + 71, 212, 17, 17);
  context.drawImage(asteroid, canvasSize + 72, 253, 15, 15);
  context.drawImage(asteroid, canvasSize + 74, 296, 12, 12);
  context.drawImage(asteroid, canvasSize + 76, 338, 8, 8);

  switch (pickedId) {
    case 0:
      context.drawImage(asteroid, mouseX - 15, mouseY - 15, 30, 30);

      break;
    case 1:
      context.drawImage(asteroid, mouseX - 14, mouseY - 14, 27, 27);

      break;
    case 2:
      context.drawImage(asteroid, mouseX - 13, mouseY - 13, 25, 25);

      break;
    case 3:
      context.drawImage(asteroid, mouseX - 11, mouseY - 11, 22, 22);

      break;
    case 4:
      context.drawImage(asteroid, mouseX - 9, mouseY - 9, 20, 20);

      break;
    case 5:
      context.drawImage(asteroid, mouseX - 7, mouseY - 7, 17, 17);

      break;
    case 6:
      context.drawImage(asteroid, mouseX - 5, mouseY - 5, 15, 15);

      break;
    case 7:
      context.drawImage(asteroid, mouseX - 3, mouseY - 3, 12, 12);

      break;
    case 8:
      context.drawImage(asteroid, mouseX - 1, mouseY - 1, 8, 8);

      break;
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      var xPos = x * gridSize + gridSize / 2;
      var yPos = y * gridSize + gridSize / 2;

      switch (grid[y][x]) {
        case 0:
          context.drawImage(asteroid, xPos - 15, yPos - 15, 30, 30);

          break;
        case 1:
          context.drawImage(asteroid, xPos - 14, yPos - 14, 27, 27);

          break;
        case 2:
          context.drawImage(asteroid, xPos - 13, yPos - 13, 25, 25);

          break;
        case 3:
          context.drawImage(asteroid, xPos - 11, yPos - 11, 22, 22);

          break;
        case 4:
          context.drawImage(asteroid, xPos - 9, yPos - 9, 20, 20);

          break;
        case 5:
          context.drawImage(asteroid, xPos - 7, yPos - 7, 17, 17);

          break;
        case 6:
          context.drawImage(asteroid, xPos - 5, yPos - 5, 15, 15);

          break;
        case 7:
          context.drawImage(asteroid, xPos - 5, yPos - 4, 12, 12);

          break;
        case 8:
          context.drawImage(asteroid, xPos - 3, yPos - 3, 8, 8);

          break;
      }
    }
  }

  if (mouseY > 0 && mouseY < canvasSize && mouseX > 0 && mouseX < canvasSize) {
    context.font = "12px Sans-Serif";
    context.fillStyle = "#CDE";
    context.fillText(Math.floor(mouseX / gridSize) + ", " + Math.floor(mouseY / gridSize), mouseX + 7, mouseY - 7);
  }
}
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
var drawTimerId = setInterval(draw, 50);
document.getElementById("export").addEventListener("click",function() {
  var text=process();
  var d=new Date();
  var suff=d.getFullYear().toString()+(d.getMonth()+1).toString()+d.getDate().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getSeconds().toString();
  download("starblast-custommap_" + suff, text);
});
document.getElementById("copy").addEventListener("click",function() {
  copyToClipboard(process());
})
document.getElementById("mapSize").addEventListener("change", function() {
  sizeChange(this);
})
document.getElementById("clear").addEventListener("click", function() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      grid[y][x] = -1;
    }
  }
})

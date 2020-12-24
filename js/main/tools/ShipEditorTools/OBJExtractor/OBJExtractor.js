(function(){
  loadObj = function(event)
  {
    console.log("This ultity is in development");
    var myFile = event.target.files[0];
    var reader = new FileReader();
    var result;
    reader.readAsText(myFile);
    reader.onload=function()
    {
      result = reader.result;
      console.log(convertOBJ(result));
    }
  }
  function convertOBJ(str)
  {
    console.log(str);
    str="developing ultitiy\n"+str;
    return str;
  }
  let bar=document.getElementsByClassName("iconsbar editoriconsbar")[0];
  let obj=bar.childNodes[3].cloneNode(true);
  obj.setAttribute("data-tooltip","Load Ship from OBJ (coming soon)");
  let input=obj.getElementsByTagName("input")[0];
  input.setAttribute("id","loadObj");
  input.setAttribute("name","loadObj");
  input.setAttribute("accept",".obj");
  obj.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-cube");
  obj.setAttribute("style","display:none");
  obj.addEventListener("change",loadObj,!1);
  bar.insertBefore(obj, bar.childNodes[4]);
  bar.insertBefore(bar.childNodes[2].cloneNode(true),bar.childNodes[4]);
})();

function saveOptions(e) {
  e.preventDefault();
  localStorage.setItem("check", document.getElementById('onlog').options.selectedIndex);
}
function restoreOptions() {
  document.getElementById('onlog').options.selectedIndex=localStorage.check || 0;
}
document.getElementById("full-log").addEventListener('click',function(activeTab)
{
  if (localStorage.check==1) window.open('https://starblast.io/changelog.txt', '_blank');
});
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("onlog").addEventListener("change", saveOptions);

let colorButton = document.getElementById("color");
colorButton.onchange = function() {
    localStorage.setItem("color", colorButton.value);
}
var val = localStorage.getItem('color')
colorButton.value = val;
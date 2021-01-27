function Search() {
    input = document.getElementById('myInput');
    var filtervalue = input.value.toUpperCase();
    var list= document.getElementsByTagName("tr");
    for (var i = 1; i < list.length; i++) {
    var a = list[i];
    var txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filtervalue) > -1) {
      list[i].style.display = "";
    } else {
     list[i].style.display = "none";
    }
  }
}
'use strict'

/*if (window.File && window.FileReader && window.FileList && window.Blob){
  alert("all APIs r supported");
}
else{
  alert("nonono");
}8*/

var getNavBar = document.querySelector(".nav");
var navBarStatus = false;

var toggleNavOn = function() {
  getNavBar.style.visibility = "visible";
  getNavBar.style.height = "12vw";
}

var toggleNavOff = function() {
  getNavBar.style.visibility = "hidden";
  getNavBar.style.height = "6vw";
}

var toggleBar = function() {
  if (navBarStatus){
    toggleNavOff();
    navBarStatus = false;
  }
  else {
    toggleNavOn();
    navBarStatus = true;
  }
}

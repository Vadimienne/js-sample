'use strict'

//alert("preworking");
var xml = new XMLHttpRequest();
xml.open("GET", "lorem.txt", false);
xml.send();
if (xml.status != 200){
  alert("error!")
  alert(xml.status + ": " + xml.statusText);
}
else{
  //alert(xml.responseText);
}

var lorem = xml.responseText;
lorem = lorem.split(" ");
//alert(lorem.length);
//alert("LOREM: " + lorem[Math.floor(Math.random() * 100)]);
//alert(Math.floor(Math.random() * 100));

var genText = function(nWords){
  var text = "";
  var randomInt;
  var currentWord = "";
  var lastWord = ".";
  for (var i = 0; i < nWords; i++) {
    randomInt = Math.floor(Math.random() * lorem.length);
    currentWord = lorem[randomInt];
    if (lastWord.includes(".")) {
      text += currentWord[0].toUpperCase() + currentWord.slice(1);
    }
    else {
      text += currentWord;
    }
    lastWord = currentWord;
    text += " ";
  }
  text = text.trim();
  if (!lastWord.includes(".")) {
    text += ".";
  }
  return text;
}



//alert("working");
const defaultNumOfPosts = 5;
for (var i = 0; i < defaultNumOfPosts; i++) {
  var body = document.querySelector(".feed");
  var newElem = document.createElement("p");
  newElem.classList.add("post");
  var node = document.createTextNode(genText(70));
  newElem.appendChild(node);
  body.appendChild(newElem);
}

//document.querySelector(".post").style.color = "red";

/*function isScrolled() {
  var doc = document.documentElement;
  if (doc.offsetHeight + doc.scrollTop >= doc.scrollHeight){
    return true;
  }
  else {
    alert("false");
    return false;
  }
}*/

var isScrolled = function() {
  var lastPost = document.querySelector(".feed").lastChild;
  var lastCoords = lastPost.getBoundingClientRect().bottom;
  if (lastCoords <= document.documentElement.clientHeight)
  {
    alert("scrolled!");
    return true;
  }
}

/*document.documentElement.mousemove = function(){
if (isScrolled()){
  alert("jjjj");
  var newElem = document.createElement("p");
  newElem.classList.add("post");
  var node = document.createTextNode(genText(70));
  newElem.appendChild(node);
  body.appendChild(newElem);
}
}*/

/*window.onscroll = function() {
  var doc = document.documentElement;
  if (document.height - window.pageYOffset <= doc.clientHeight){
    var newElem = document.createElement("p");
    newElem.classList.add("post");
    var node = document.createTextNode(genText(70));
    newElem.appendChild(node);
    body.appendChild(newElem);
  }
}*/

window.onscroll = function() {
  var doc = document.documentElement;
  var lastPost = document.querySelector(".feed").lastElementChild;
  if (lastPost.getBoundingClientRect().top < document.documentElement.clientHeight){
    var newElem = document.createElement("p");
    newElem.classList.add("post");
    var node = document.createTextNode(genText(70));
    newElem.appendChild(node);
    body.appendChild(newElem);
    lastPost = document.querySelector(".feed").lastChild;
  }
}

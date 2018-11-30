'use strict'

//Генератор текста
//В случайном порядке чередует слова из заготовленного файла
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

//Изначально разметка для постов генерировалась
//через createElement и createTextNode.
//По мере добавления новых элементов,
//было принято решение написать шаблон разметки
//поста и работать с ним, т.к. стуктура всех
//постов одинакова,
//редактировать шаблон легче
//и читаемость лучше.
var createPost = function (text, userIcon, userName) {
  var postTemplate = `<div class="post-container">
    <div class="post-head">
      <img src="${userIcon}" alt="" class="userIcon">
      <div class="userName">${userName}</div>
    </div>
    <div class="post-content">
      <p class="content-text">${text}</p>
      <img src="" alt="" class="content-img">
    </div>
    <div class="post-footer">
      <div class="like_btn"></div>
    </div>
  </div>`;

  var feed = document.querySelector(".feed");
  feed.innerHTML += postTemplate;
}

//Генерируется достаточное для появления прокрутки
//количество постов, чтобы работало событие onscroll.
while (document.querySelector(".feed").clientHeight <=
      document.documentElement.clientHeight)
{
  createPost(genText(70), '/img/defaultico.png', "Default Person");
}


//Генерация нового поста, когда достигнута
//верхняя граница ныне существующего.
window.onscroll = function() {
  var doc = document.documentElement;
  var lastPost = document.querySelector(".feed").lastElementChild;
  if (lastPost.getBoundingClientRect().top < document.documentElement.clientHeight){
    createPost(genText(70), "/img/defaultico.png", "Default Person");
    lastPost = document.querySelector(".feed").lastChild;
  }
}


// Черновик.
// Код, который появился в ходе написания проекта,
// но был переписан правильно выше или
// убран за ненадобностью.

/*var createPost = function () {
  var body = document.querySelector(".feed");
  var newElem = document.createElement("p");
  newElem.classList.add("post");
  var node = document.createTextNode(genText(70));
  newElem.appendChild(node);
  body.appendChild(newElem);
  createButton();
}*/

/*var createButton = function () {
  var post = document.querySelector(".feed").lastChild;
  var button = document.createElement("img");
  button.classList.add("like_btn");
  button.src = "/img/like_btn.png"
  post.appendChild(button);
}*/

/*var body = document.querySelector(".feed");
var newElem = document.createElement("p");
newElem.classList.add("post");
var node = document.createTextNode(genText(70));
newElem.appendChild(node);
body.appendChild(newElem);*/

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

/*const defaultNumOfPosts = 5;
for (var i = 0; i < defaultNumOfPosts; i++) {
  createPost(genText(70), '/img/defaultico.png', "Default Person");
}*/

/*var isScrolled = function() {
  var lastPost = document.querySelector(".feed").lastChild;
  var lastCoords = lastPost.getBoundingClientRect().bottom;
  if (lastCoords <= document.documentElement.clientHeight)
  {
    alert("scrolled!");
    return true;
  }
}*/

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

var randInt = function (num) {
  return Math.floor(Math.random() * (num-5)) + 5;
}

//Изначально разметка для постов генерировалась
//через createElement и createTextNode.
//По мере добавления новых элементов,
//было принято решение написать шаблон разметки
//поста и работать с ним, т.к. стуктура всех
//постов одинакова,
//редактировать шаблон легче
//и читаемость лучше.
/*var createPost = function (text, userIcon, userName) {
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
}*/

function hoverHandler(event) {
  if (!event.target.classList.contains("like_active")){
    if (event.type == 'mouseover') {
      event.target.style.opacity = '1';
    }
    if (event.type == 'mouseout') {
      event.target.style.opacity = '0.3';
    }
  }
}

function toggleLikeBtn(event) {
  event.target.classList.toggle("like_active");
}

function toggleCommField(event) {

  var commentField = event.target.parentNode.parentNode.querySelector(".comment-field");
  commentField.classList.toggle("comment-field-active");
  if (commentField.classList.contains('no_comments')){
    commentField.querySelector('.comments').innerHTML = 'No comments yet';
  }
}

function enterPressHandler(event){
  //alert(event.keyCode);
  event.preventDefault;
  var tar = event.target.innerText;
  if(event.keyCode == 13) {
    if (!(isEmpty(tar))){
      var isFirstComm = event.target.parentNode.classList.contains("no_comments");
      if (isFirstComm) {
        event.target.parentNode.classList.remove("no_comments");
        event.target.parentNode.querySelector(".comments").innerHTML = "";
      }
      var comments = event.target.parentNode.querySelector('.comments');
      var newComment = document.createElement("div");
      var commIcon = document.createElement("img");
      var commText = document.createElement("div");

      newComment.classList.add("partic_comm");

      commIcon.src = "/img/youIcon.png";
      commIcon.classList.add("comm-icon");

      commText.innerHTML = tar;
      commText.classList.add("comm-text");

      newComment.appendChild(commIcon);
      newComment.appendChild(commText);
      comments.appendChild(newComment);
      event.target.innerText = "";
    }
  }
    //event.target.innerText

    //alert("Yahoo!");
}

function isEmpty(tar) {
  //alert(tar[0]);
  for (var i = 0; i < tar.length; i++) {
    if (!(tar[i] == " " || tar[i] == "\n")){
      return false;
    }
  }
  return true;
}

function inputFieldHandler(event) {
  //alert(666);
  //alert(event);
  var placeholder = "Watcha think?"
  if (event.type == 'focus'){
    //alert(2222);
    if (event.target.classList.contains("comm_input_placeholder")){
      event.target.innerHTML = "";
      event.target.classList.remove("comm_input_placeholder");
    }
    event.target.onkeydown = enterPressHandler;
  }
  if (event.type == 'blur'){
    var tar = event.target.innerText;
    //alert(tar);
    //alert(isEmpty(tar));
    if (isEmpty(tar))
    {
      event.target.innerHTML = placeholder;
      event.target.classList.add("comm_input_placeholder");
    }
    /*else{
      var comments = event.target.parentNode.querySelector('.comments');
      var newComment = document.createElement("div");
      var commIcon = document.createElement("img");
      var commText = document.createElement("div");
      commIcon.style.src = "/img/youIcon.png";
      commIcon.classList.add("comm-icon");

      commText.innerHTML = tar;
      commText.classList.add("comm-text");

      newComment.appendChild(commsIcon);
      newComment.appendChild(commText);
      comment.appendChild(newComment);
    }*/
  }
}

var createPost = function (text, userIcon, userName)  {
  var postTemplate = `
    <div class="post-head">
      <img src="${userIcon}" alt="" class="userIcon">
      <a class="userName" href="#">${userName}</a>
    </div>
    <div class="post-content">
      <p class="content-text">${text}</p>
      <img src="" alt="" class="content-img">
    </div>
    <div class="post-footer">
      <div class="like_btn"></div>
      <div class="comm_btn"></div>
    </div>
    <div class="comment-field">
      <div class="comments"></div>
      <div class="comment_inpt comm_input_placeholder" contenteditable="true">Watcha think?</div>
    </div>`;

    //<input type="text" class="comment_inpt" placeholder="Watcha think?">
  var newPost = document.createElement("div");
  newPost.classList.add("post-container");
  newPost.innerHTML = postTemplate;
  var feed = document.querySelector(".feed");
  feed.appendChild(newPost);

  var like_btns = feed.lastChild.querySelector('.like_btn');
  like_btns.onmouseover = like_btns.onmouseout = hoverHandler;
  like_btns.onclick = toggleLikeBtn;

  var comm_btns = feed.lastChild.querySelector('.comm_btn');
  comm_btns.onmouseover = comm_btns.onmouseout = hoverHandler;
  comm_btns.onclick = toggleCommField;

  var comm_field = feed.lastChild.querySelector('.comment-field');
  comm_field.classList.add('no_comments');

  var input_field = feed.lastChild.querySelector('.comment_inpt');
  //alert(input_field);
  input_field.onfocus = input_field.onblur = inputFieldHandler;

  //input_field.addEventListener('focus', inputFieldHandler, true);

  //feed.innerHTML += postTemplate; - так себе решение
}

//Генерируется достаточное для появления прокрутки
//количество постов, чтобы работало событие onscroll.
while (document.querySelector(".feed").clientHeight <=
      document.documentElement.clientHeight)
{
  createPost(genText(randInt(120)), '/img/defaultico.png', "Default Person");
}


//Генерация нового поста, когда достигнута
//верхняя граница ныне существующего.

var scrollingHandler = function () {
  var doc = document.documentElement;
  var lastPost = document.querySelector(".feed").lastElementChild;
  if (lastPost.getBoundingClientRect().top < document.documentElement.clientHeight){
    createPost(genText(randInt(120)), "/img/defaultico.png", "Default Person");
    lastPost = document.querySelector(".feed").lastChild;
  }
}

window.addEventListener("scroll", scrollingHandler);

/*window.onscroll = function() {
  var doc = document.documentElement;
  var lastPost = document.querySelector(".feed").lastElementChild;
  if (lastPost.getBoundingClientRect().top < document.documentElement.clientHeight){
    createPost(genText(70), "/img/defaultico.png", "Default Person");
    lastPost = document.querySelector(".feed").lastChild;
  }
}*/

/*var toggleLikeBtn = function(){
  like_btns.style.backgroundColor = "red";
}

var like_btns = document.querySelector(".like_btn");
like_btns.addEventListener("onmouseenter", toggleLikeBtn);*/






















/*like_btns.addEventListener("mouseover", function(event) {
  event.target.style.opacity = 1;
  //alert(1);
  //like_btns.style.opacity = 1;
  //var target = event.target;
  //target.style.background = "red";
});

like_btns.addEventListener("mouseout", function(event) {
  event.target.style.opacity = 0.3;
  //alert(2);
  //like_btns.style.opacity = 0.3;
});
*/
//alert("eeeee!");


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

'use strict'

//Генератор текста
//В случайном порядке чередует слова из заготовленного файла

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Pulvinar elementum integer enim neque volutpat ac. Felis donec et odio pellentesque diam volutpat commodo sed. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Sed cras ornare arcu dui vivamus. Consectetur adipiscing elit pellentesque habitant morbi tristique. Pretium aenean pharetra magna ac. Sed turpis tincidunt id aliquet risus feugiat. Arcu vitae elementum curabitur vitae nunc sed. Ut lectus arcu bibendum at varius vel pharetra vel. Dictumst quisque sagittis purus sit amet volutpat consequat. Quis vel eros donec ac odio tempor orci dapibus ultrices. Mi tempus imperdiet nulla malesuada pellentesque elit eget. In pellentesque massa placerat duis ultricies lacus. Fusce id velit ut tortor pretium viverra suspendisse potenti."
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

//Вспомогательные функции и ивент-хэндлеры
//для создаваемых постов

var randInt = function (num) {
  return Math.floor(Math.random() * (num-5)) + 5;
}


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

      commIcon.src = "img/youIcon.png";
      commIcon.classList.add("comm-icon");

      commText.innerHTML = tar;
      commText.classList.add("comm-text");

      newComment.appendChild(commIcon);
      newComment.appendChild(commText);
      comments.appendChild(newComment);
      event.target.innerText = "";
      event.target.blur();
    }
  }
}

function isEmpty(tar) {
  for (var i = 0; i < tar.length; i++) {
    if (!(tar[i] == " " || tar[i] == "\n")){
      return false;
    }
  }
  return true;
}

function inputFieldHandler(event) {
  var placeholder = "Watcha think?"
  if (event.type == 'focus'){
    if (event.target.classList.contains("comm_input_placeholder")){
      event.target.innerHTML = "";
      event.target.classList.remove("comm_input_placeholder");
    }
    event.target.onkeydown = enterPressHandler;
  }
  if (event.type == 'blur'){
    var tar = event.target.innerText;
    if (isEmpty(tar))
    {
      event.target.innerHTML = placeholder;
      event.target.classList.add("comm_input_placeholder");
    }
  }
}

//Изначально разметка для постов генерировалась
//через createElement и createTextNode.
//По мере добавления новых элементов,
//было принято решение написать шаблон разметки
//поста и работать с ним, т.к. стуктура всех
//постов одинакова,
//редактировать шаблон легче
//и читаемость лучше.

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
  input_field.onfocus = input_field.onblur = inputFieldHandler;

  //feed.innerHTML += postTemplate; - так себе решение
}

//Генерируется достаточное для появления прокрутки
//количество постов, чтобы работало событие onscroll.
while (document.querySelector(".feed").clientHeight <=
      document.documentElement.clientHeight)
{
  createPost(genText(randInt(120)), 'img/defaultico.png', "Default Person");
}


//Генерация нового поста, когда достигнута
//верхняя граница ныне существующего.

var scrollingHandler = function () {
  var doc = document.documentElement;
  var lastPost = document.querySelector(".feed").lastElementChild;
  if (lastPost.getBoundingClientRect().top < document.documentElement.clientHeight){
    createPost(genText(randInt(120)), "img/defaultico.png", "Default Person");
    lastPost = document.querySelector(".feed").lastChild;
  }
}

window.addEventListener("scroll", scrollingHandler);

'use strict';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_MESSAGES = 1;
var MAX_MESSAGES = 2;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Пётр',
  'Иван',
  'Мария',
  'Ольга',
  'Сергей',
  'Надежда'
];

function createRandomNumber(minNumber, maxNumber) {
  var randomIntegerNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));

  return randomIntegerNumber;
}

function createPicturesInfo() {
  var picturesInfo = [];
  for (var i = 0; i < 25; i++) {
    var randomPictureUrl =
      createPictureUrl(i + 1);
    var randomDescription = 'описание фотографии';
    var randomComments = createRandomComments();
    var randomlikes = createRandomNumber(MIN_LIKES, MAX_LIKES);
    var pictureInfo =
      createPictureInfo(randomPictureUrl, randomlikes,
          randomComments, randomDescription);
    picturesInfo.push(pictureInfo);
  }
  return picturesInfo;
}

var pictures = createPicturesInfo();

function createPictureUrl(pictureNumber) {
  return 'photos/' + pictureNumber + '.jpg';
}

function createRandomComments() {
  var commentsInfo = [];
  for (var i = 0; i < 6; i++) {
    var randomMessages = createRandomMessages(MESSAGES);
    var randomNames = createRandomNames(NAMES);
    var randomAvatars = createAvatars();
    var commentInfo =
  createCommentInfo(randomMessages, randomNames,
      randomAvatars);
    commentsInfo.push(commentInfo);
  }
  return commentsInfo;
}

function createAvatars(avatarNumber) {
  return 'img/avatar-' + avatarNumber + '.svg';
}

function createRandomNames(names) {
  var randomName = names[createRandomNumber(0, names.length - 1)];
  return randomName;
}
function createRandomMessages(messages) {
  var randomMessages = [];
  var randomQuantityOfComments =
  createRandomNumber(MIN_MESSAGES, MAX_MESSAGES);
  for (var i = 0; i < randomQuantityOfComments; i++) {
    var randomMessage =
messages[createRandomNumber(0, messages.length
- 1)];
    randomMessages.push(randomMessage);
  }
  return randomMessages.join(' ');
}

function createCommentInfo(randomMessages, randomNames,
    randomAvatars) {
  var commentInfo = {
    avatar: randomAvatars,
    message: randomMessages,
    name: randomNames
  };
  return commentInfo;
}

function createPictureInfo(randomPictureUrl, randomlikes,
    randomComments, randomDescription) {
  var pictureInfo = {
    url: randomPictureUrl,
    likes: randomlikes,
    comments: randomComments,
    description: randomDescription
  };
  return pictureInfo;
}

function renderGallery(picturesInfo) {
  var pictureItems = createPicturesItems(picturesInfo);
  var pictureItemsFragment = createPictureItemsFragment(pictureItems);
  renderPicturesFragment(pictureItemsFragment);
}

renderGallery(pictures);

function createPictureItemsFragment(pictureItems) {
  var pictureItemsFragment = document.createDocumentFragment();
  pictureItems.forEach(function (pictureItem) {
    pictureItemsFragment.appendChild(pictureItem);
  });

  return pictureItemsFragment;
}

function createPicturesItems(picturesInfo) {
  var pictureItems = [];
  picturesInfo.forEach(function (pictureInfo) {
    pictureItems.push(createPictureItem(pictureInfo));
  });

  return pictureItems;
}

function createPictureItem(pictureInfo) {
  var pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureItem = pictureItemTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = pictureInfo.url;
  pictureItem.querySelector('.picture__likes').textContent = pictureInfo.likes;
  pictureItem.querySelector('.picture__comments').textContent = pictureInfo.comments.length;

  return pictureItem;
}

function renderPicturesFragment(pictureItemsFragment) {
  var pictureItemsContainer = document.querySelector('.pictures');
  pictureItemsContainer.appendChild(pictureItemsFragment);
}

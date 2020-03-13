'use strict';

var MIN_PICTURE_NUMBER = 1;
var MAX_PICTURE_NUMBER = 25;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
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

var mathUtils = {
  createRandomNumber: function (minNumber, maxNumber) {
    var randomIntegerNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));

    return randomIntegerNumber;
  }
};

function createPicturesInfo() {
  var picturesInfo = [];
  var picturesNumbersPool = createPictureNumbers(MIN_PICTURE_NUMBER,
      MAX_PICTURE_NUMBER);
  for (var i = 0; i < 25; i++) {
    var randomPictureUrl =
      createPictureUrl(pullRandomUniqueNumber(picturesNumbersPool));
    var randomDescription = 'описание фотографии';
    var randomComments = createRandomComments();
    var randomlikes =
      mathUtils.createRandomNumber(MIN_LIKES,
          MAX_LIKES);
    var pictureInfo =
      createPictureInfo(randomPictureUrl, randomlikes,
          randomComments, randomDescription);
    picturesInfo.push(pictureInfo);
  }
  return picturesInfo;
}

createPicturesInfo();

function createPictureNumbers(minNumber, maxNumber) {
  var result = [];
  for (var i = minNumber; i <= maxNumber; i++) {
    result.push(i);
  }
  return result;
}

function createPictureUrl(pictureNumber) {
  return 'photos/' + pictureNumber + '.jpg';
}

function pullRandomUniqueNumber(numbersPool) {
  var randomIndex = mathUtils.createRandomNumber(0,
      numbersPool.length - 1);
  var randomUniqueNumber = numbersPool.splice(randomIndex, 1)[0];

  return randomUniqueNumber;
}
function createRandomComments() {
  var commentsInfo = [];
  var avatarNumbersPool = createAvatarNumbers(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER);
  for (var i = 0; i < 6; i++) {
    var randomMessages = createRandomMessages(MESSAGES);
    var randomNames = createRandomNames(NAMES);
    var randomAvatars = createAvatars(pullRandomUniqueNumber(avatarNumbersPool));
    var commentInfo =
  createCommentInfo(randomMessages, randomNames,
      randomAvatars);
    commentsInfo.push(commentInfo);
  }
  return commentsInfo;
}

function createAvatarNumbers(minNumber, maxNumber) {
  var result = [];
  for (var i = minNumber; i <= maxNumber; i++) {
    result.push(i);
  }
  return result;
}

function createAvatars(avatarNumber) {
  return 'img/avatar-' + avatarNumber + '.svg';
}

function createRandomNames(names) {
  var randomNames = [];
  for (var i = 0; i < names.lenght; i++) {
    var randomName =
names[mathUtils.createRandomNumber(0, names.length
- 1)];
    randomNames.push(randomName);
  }
  return randomNames;
}
function createRandomMessages(messages) {
  var randomMessages = [];
  var randomQuantityOfComments =
    mathUtils.createRandomNumber(MIN_MESSAGES,
        MAX_MESSAGES);
  for (var i = 0; i < randomQuantityOfComments; i++) {
    var randomMessage =
messages[mathUtils.createRandomNumber(0, messages.length
- 1)];
    randomMessages.push(randomMessage);
  }
  return randomMessages;
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
  var picturesItems = createPicturesItems(picturesInfo);
  var picturesItemsFragment = createPicturesItemsFragment(picturesItems);
  renderPicturesItems(picturesItemsFragment);
}

renderGallery();

function createPicturesItemsFragment(picturesItems) {
  var picturesItemsFragment = document.createDocumentFragment();
  picturesItems.forEach(function (pictureItem) {
    picturesItemsFragment.appendChild(pictureItem);
  });

  return picturesItemsFragment;
}

function createPicturesItems(picturesInfo) {
  var picturesItems = [];
  picturesInfo.forEach(function (pictureInfo) {
    picturesItems.push(createPictureItem(pictureInfo));
  });

  return picturesItems;
}

function createPictureItem(pictureInfo) {
  var pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureItem = pictureItemTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = pictureInfo.url;
  pictureItem.querySelector('.picture__likes').textContent = pictureInfo.likes;
  pictureItem.querySelector('.picture__comments').textContent = pictureInfo.comments;

  return pictureItem;
}

function renderPicturesItems(picturesItemsFragment) {
  var picturesItemsContainer = document.querySelector('.pictures');
  picturesItemsContainer.appendChild(picturesItemsFragment);
}

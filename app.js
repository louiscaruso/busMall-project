'use strict';
//code taken from in class demo

var section = document.getElementById('results');
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var clicksAllowed = 25;
var numberOfClicks = 0;
var renderArray = [];
var imgArray = [];

//constuctor
function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;
  imgArray.push(this);
}

//local storage
var savedProduct = localStorage.getItem('savedProducts');
if (savedProduct) {
  imgArray = JSON.parse(savedProduct);
} else {

  new Picture('bag', './img/bag.jpg');
  new Picture('banana', './img/banana.jpg');
  new Picture('bathroom', './img/bathroom.jpg');
  new Picture('boots', './img/boots.jpg');
  new Picture('breakfast', './img/breakfast.jpg');
  new Picture('bubblegum', './img/bubblegum.jpg');
  new Picture('chair', './img/chair.jpg');
  new Picture('cthulu', './img/cthulhu.jpg');
  new Picture('dog-duck', './img/dog-duck.jpg');
  new Picture('dragon', './img/dragon.jpg');
  new Picture('pen', './img/pen.jpg');
  new Picture('pet-sweep', './img/pet-sweep.jpg');
  new Picture('scissors', './img/scissors.jpg');
  new Picture('shark', './img/shark.jpg');
  new Picture('sweep', './img/sweep.png');
  new Picture('tauntaun', './img/tauntaun.jpg');
  new Picture('unicorn', './img/unicorn.jpg');
  new Picture('usb', './img/usb.gif');
  new Picture('water-can', './img/water-can.jpg');
  new Picture('wine-glass', './img/wine-glass.jpg');

}

//random picture function
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createRenderArray() {
  while (renderArray.length > 0) {
    renderArray.pop();
  }
  while (renderArray.length < 3) {
    var i = randomNumber(imgArray.length);
    while (renderArray.includes(i)) {
      i = randomNumber(imgArray.length);
    }
    renderArray.push(i);
  }
}

//render Image function
function renderImages() {
  createRenderArray();
  var imgOne = imgArray[renderArray[0]];
  var imgTwo = imgArray[renderArray[1]];
  var imgThree = imgArray[renderArray[2]];

  imgElOne.alt = imgOne.name;
  imgElOne.src = imgOne.src;
  imgElTwo.alt = imgTwo.name;
  imgElTwo.src = imgTwo.src;
  imgElThree.alt = imgThree.name;
  imgElThree.src = imgThree.src;

  imgOne.viewed++;
  imgTwo.viewed++;
  imgThree.viewed++;
}

function eventHandler(e) {
  // console.log('e', e);
  // console.log(e.target.alt);
  numberOfClicks++;
  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === e.target.alt) {
      imgArray[i].clicked++;
    }
  }

  renderImages();

  if (numberOfClicks === clicksAllowed) {
    imgElOne.removeEventListener('click', eventHandler);
    imgElTwo.removeEventListener('click', eventHandler);
    imgElThree.removeEventListener('click', eventHandler);

    for (i = 0; i < imgArray.length; i++) {
      var imageClickedAmount = document.createElement('ul');
      // imageClickedAmount.textContent = `${imgArray[i].name}, clicked ${imgArray[i].clicked} times, viewed ${imgArray[i].viewed} times.`;
      // console.log(`${imgArray[i].name}, clicked ${imgArray[i].clicked} times, viewed ${imgArray[i].viewed} times.`);
      section.appendChild(imageClickedAmount);
    }
    var stringifiedProducts = JSON.stringify(imgArray);
    localStorage.setItem('savedProducts', stringifiedProducts);
    // localStorageResults
    console.log(savedProduct[0]);

    renderCharts();
  }
}

//where we add event
imgElOne.addEventListener('click', eventHandler);
imgElTwo.addEventListener('click', eventHandler);
imgElThree.addEventListener('click', eventHandler);

renderImages();

//chart script
function renderCharts() {

  var namesArray = [];
  var viewsArray = [];
  var clicksArray = [];

  for (var i = 0; i < imgArray.length; i++) {
    namesArray.push(imgArray[i].name);
    viewsArray.push(imgArray[i].viewed);
    clicksArray.push(imgArray[i].clicked);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {//eslint-disable-line
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Clicks',
        data: clicksArray,
        backgroundColor: 'rgb color: (75, 74, 74)',
        borderColor: 'rgba(0, 49, 211, 0.973)',
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: 'rgba(7, 44, 167)',
        borderColor: 'rgba(0, 49, 211, 0.973)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

console.log(imgArray);
// document.getElementById('results').innerHTML = imgArray;


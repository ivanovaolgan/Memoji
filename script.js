/*-----------------------SET UP THE VARIABLES------------------------------------------- */
var emojiArr = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁",
		 "🐮", "🐷", "🐸", "🐙", "🐵", "🦄", "🐞", "🦀", "🐟", "🐊", "🐓", "🦃", "🐿"];
const emCount = 6;
var arr = aRandom(emojiArr).splice(0,emCount); // take first emCount elements from shuffled emoji array
const winColor = 'green';
const loseColor = 'red';
var countMin = 0;
var countSec = 60; //starting point of game time counter
var countTimeInSec = countMin*60 + countSec;
var gameOutTime = 0; //in seconds
var myT; //timer
var modal = document.getElementById("winLose");
var msgWord;
var wordWin = 'Win';
var wordLose = 'Lose';


/*------------------------PREPARE EMOJI ARRAY FOR CARDS----------------------------------*/
/* Get random integer from 0 to max exclusive*/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Create new Array from existing, choose new elements from existing array randomly*/
function aRandom(arr) {
	var newArr = [];
	var oldArr = arr; 
	for (i = (arr.length - 1); i >-1; i--){
		var j = getRandomInt(i); /* get random index*/
		newArr.push(oldArr[j]); /* build shuffled array */
		oldArr.splice(j,1); /*remove used element from old array*/
	}
	return  newArr
}
// add color to background
function foundTwins(elements, color) {
	//console.log('foundTwins');
	var l = elements.length;
	for (i=0; i<2; i++) {
		elements[i].classList.add(color, 'twin'); 
		elements[i].parentNode.classList.add(color, 'avoid-clicks'); 
	}
} 

// leave open two identical cards or close them(if they are different)
function firstTwoGameOut(elements){
	var idenTwin = [];
	elements.forEach((n,i) => {
		if (n.classList.contains('twin')) {
			idenTwin.push(n);
		}
	});
	idenTwin.forEach((n,i) => {
		if (n.classList.contains(winColor)) {
			n.parentNode.classList.remove('compare');	
		} else {
			n.classList.remove(loseColor, 'twin');
			n.parentNode.classList.remove(loseColor,'compare', 'avoid-clicks', 'is-flipped');
		  }
		}
	)

}

// show seconds or minutes in format 01:09 instead of 1:9
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

//
function gameStart(){
	myT = setInterval(gameTimer, 1000);
}

function gameStop(){
	clearInterval(myT);
}

function gameTimer(){
	
	countMin = Math.floor(countTimeInSec / 60);
	countSec = countTimeInSec % 60;
	countTimeInSec--;
	document.getElementById('timer').textContent = checkTime(countMin) +':'+ checkTime(countSec);
	if (countTimeInSec == gameOutTime){ 
		gameStop();
		gameMsg(wordLose);
	}

}
/*------------------------ MODAL FORM*/
// make message at the end of the game jumping
function gameMsg (msgWord){
	msgWord = msgWord;
	modal.style.display ='block';
	var wordArray = msgWord.split('');
	var elem = document.createElement('span');
	elem.className = 'modal-msg-word'; 
	for (var i = 0; i < wordArray.length; i++) {
			elem.textContent = wordArray[i];
			document.querySelector('.modal-msg').appendChild(elem);
			setTimeout(function (elem) { 
					return function() { elem.classList.add('wave');}
				}(elem), (i*150));
			elem = elem.cloneNode(true);
	}
}

/*--------------------------UPLOAD PAGE -----*/	
/* Greate shuffled array */
var arrRandom = aRandom(arr.concat(arr));
console.log(arrRandom);

/* Add shuffled images to cards */
document.querySelectorAll('.cardFace').forEach((n, i) => n.textContent = arrRandom[i])
gameTimer();


/*------------------------ FLIP THE CARD AND IDENTIFY TWINS*/
/* Flip the card*/
var cardSet = document.querySelector('.cardSet');
var clickCount = 0;
cardSet.addEventListener( 'click', function(event) { 
		if (clickCount == 0) {
			gameStart();}
		clickCount++;	
	 	let element = event.target;
	 	let card = element.parentNode;
 		card.classList.toggle('is-flipped');
 		card.classList.toggle('compare'); 
 		
 		
 		var cardsToCompare = cardSet.querySelectorAll('.card.compare .cardFace');

//--Step 1	
if (cardsToCompare.length == 2 ) {
	if (cardsToCompare[0].textContent == cardsToCompare[1].textContent) {
		foundTwins(cardsToCompare, winColor);
	} else {
		foundTwins(cardsToCompare, loseColor);
	}
}

//--Step 2
if (cardsToCompare.length == 3) {
	firstTwoGameOut(Array.prototype.slice.call(cardsToCompare));
}	

//--Step 3
var cardsCount = cardSet.querySelectorAll('.card .cardFace.green.twin');

if (cardsCount.length == emCount*2) { 
	gameStop();
	setTimeout(gameMsg(wordWin), 2000);
	}

}, true);

document.getElementById('btnPlayAgain').onclick = function(){
	window.location.reload();
};

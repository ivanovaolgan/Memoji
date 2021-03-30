/*Emoji array, length = 12 */
/*var arr = ['\u{1F436}',  '\u{1F431}', '\u{1F42D}', '\u{1F439}', '\u{1F430}',
 '\u{1F43B}', '\u{1F436}',  '\u{1F431}', '\u{1F42D}', '\u{1F439}', '\u{1F430}', '\u{1F43B}'];
*/
var emojiArr = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁",
		 "🐮", "🐷", "🐸", "🐙", "🐵", "🦄", "🐞", "🦀", "🐟", "🐊", "🐓", "🦃", "🐿"];
const emCount = 6;
var arr = aRandom(emojiArr).splice(0,emCount); // take first emCount elements from shuffled emoji array
const winColor = 'green';
const loseColor = 'red';

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
	console.log('foundTwins');
	var l = elements.length;
	for (i=0; i<2; i++) {
		elements[i].classList.add(color, 'twin'); 
		elements[i].parentNode.classList.add(color, 'avoid-clicks'); 
	}
} 

//
function firstTwoGameOut(elements){
	console.log('firstTwoGameOut');
	var idenTwin = [];
	elements.forEach((n,i) => {
		if (n.classList.contains('twin')) {
			idenTwin.push(n);
		}
	});
	idenTwin.forEach((n,i) => {
		if (n.classList.contains(winColor)) {
			n.parentNode.classList.remove('compare');	
			console.log(n.textContent, n.parentNode.classList);
		} else {
			n.classList.remove(loseColor, 'twin');
			n.parentNode.classList.remove(loseColor,'compare', 'avoid-clicks', 'is-flipped');
			console.log(n.textContent, n.parentNode.classList);
		  }
		}
	)

}

/* Greate shuffled array */
var arrRandom = aRandom(arr.concat(arr));
console.log(arrRandom);

/* Add shuffled images to cards */
document.querySelectorAll('.cardFace').forEach((n, i) => n.textContent = arrRandom[i])


/*------------------------ FLIP THE CARD AND IDENTIFY TWINS*/
/* Flip the card*/
var cardSet = document.querySelector('.cardSet');
var compareCount = 0;
cardSet.addEventListener( 'click', function(event) { 	
	 	let element = event.target;
	 	let card = element.parentNode;
 		card.classList.toggle('is-flipped');
 		card.classList.toggle('compare'); 
 		
 		
 		var cardsToCompare = cardSet.querySelectorAll('.card.compare .cardFace');
 		console.log(cardsToCompare)
	
if (cardsToCompare.length == 2 ) {
	if (cardsToCompare[0].textContent == cardsToCompare[1].textContent) {
		foundTwins(cardsToCompare, winColor);
		console.log(cardsToCompare[0].parentNode.classList);
		console.log(cardsToCompare[1].parentNode.classList);
	} else {
		foundTwins(cardsToCompare, loseColor);
		console.log(cardsToCompare[0].parentNode.classList);
		console.log(cardsToCompare[1].parentNode.classList);
	}
}
if (cardsToCompare.length == 3) {
	firstTwoGameOut(Array.prototype.slice.call(cardsToCompare));
}	


}, true);


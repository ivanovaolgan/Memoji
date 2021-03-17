/*Emoji array, length = 12 */
var arr = ['\u{1F436}',  '\u{1F431}', '\u{1F42D}', '\u{1F439}', '\u{1F430}',
 '\u{1F43B}', '\u{1F436}',  '\u{1F431}', '\u{1F42D}', '\u{1F439}', '\u{1F430}', '\u{1F43B}'];

/* get random integer from 0 to max exclusive*/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* shuffle existing array*/
function aRandom(arr) {
	var newArr = [];
	var oldArr = arr;
	for (i = arr.length; i >-1; i--){
		var j = getRandomInt(i); /* get random index*/
		newArr.push(oldArr[j]); /* build shuffled array */
		oldArr.splice(j,1); /*remove used element from old array*/

	}
	return  newArr

}

/* create shuffled array */
var arrRandom = aRandom(arr);

/* add shuffled images to cards */
document.querySelectorAll('.cardFace').forEach((n, i) => n.textContent = arrRandom[i])

/* flip the card*/
var cardSet = document.querySelector('.cardSet');
cardSet.addEventListener( 'click', function(event) {
  		 	
	 	let element=event.target;
	 	let card = element.parentNode;
 		card.classList.toggle('is-flipped'); 		

}, true);
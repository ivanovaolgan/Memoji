
var cardSet = document.querySelector('.cardSet');

cardSet.addEventListener( 'click', function(event) {
  		 	
	 	let element=event.target;
	 	let card = element.parentNode;
 		card.classList.toggle('is-flipped'); 		

}, true);
//function that shows front and back of card
var BasicCard = function (front, back) {
	if(this instanceof BasicCard) {
		this.front = front;
		this.back = back;
	} else {
		return new BasicCard(front,back);
	}

}

/*tester functions
BasicCard.prototype.printCard = function() {
	//console.log('Front: ' + this.front + ',' + 'Back: ' + this.back);
}

BasicCard.prototype.printFront = function() {
	//console.log(this.front);
}

BasicCard.prototype.printAnswer = function() {
	//console.log('The correct answer is ' + this.back);
}
*/


module.exports = BasicCard;
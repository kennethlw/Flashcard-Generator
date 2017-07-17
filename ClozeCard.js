var ClozeCard = function(text, cloze) {

	if (this instanceof ClozeCard){
    this.text = text;
    //this.cloze = this.text.match(/\(([^)]+)\)/)[0];
    this.cloze = cloze;

    this.partial = this.text.replace(this.cloze, '________');
	} else {
		return new ClozeCard(text, cloze);
	}
}

module.exports = ClozeCard;
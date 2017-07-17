var ClozeCard = function(text, cloze) {

    this.text = text;
    //this.cloze = this.text.match(/\(([^)]+)\)/)[0];
    this.cloze = cloze;

    this.partial = this.text.replace(this.cloze, '________');

}

module.exports = ClozeCard;
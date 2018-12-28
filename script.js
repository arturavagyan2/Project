class matchnwin{

	constructor(time, cards){
		this.time = time;
		this.remTime = time;
		this.cardsArr = cards;
		this.timer = document.getElementById("timer")
	}

	start(){
		this.checkCard = null;
		this.remTime = this.time
		this.matched = [];

		setTimeout(() => {
			this.shuffle(this.cardsArr);
			this.countdown = this.startCount();
		}, 500);

		this.hide();
		this.timer.innerText = this.remTime;
	}

	//Fisher-Yates shuffle algorithm
	shuffle(){
		for (var i = this.cardsArr.length-1; i > 0; i--) {
			let index = Math.floor(Math.random() * (i+1));
			this.cardsArr[index].style.order = i;
			this.cardsArr[i].style.order = index;
		}
	}

	hide(){
		this.cardsArr.map(cards => {
			cards.classList.remove("view");
			cards.classList.remove("matched");
		});
	}

	startCount(){
		return setInterval(() => {
			this.remTime --;
			this.timer.innerText = this.remTime;
			if (this.remTime === 0) {
				this.gameover();
			}
		}, 1000);
	}

	flip(cards){
		if (this.abletoflip(cards)) {
			cards.classList.add("view")
			if (this.checkCard) {
            	this.checkformatch(cards);
            } 
            else {
               this.checkCard = cards;
            }
		}
	}

	abletoflip(cards){	
		return !this.matched.includes(cards) && cards !== this.checkCard
	}

	checkformatch(cards){
		if (this.cardtype(cards) === this.cardtype(this.checkCard)){
			this.match(cards, this.checkCard);
		} 
		else {
			this.mismatch(cards, this.checkCard);
		}
		this.checkCard = null;
	}

	cardtype(cards){
		return cards.getElementsByClassName("frontside")[0].src;
	}

	match(card1, card2){
		this.matched.push(card1);
		this.matched.push(card2);
		card1.classList.add("matched");
		card2.classList.add("matched");
		if(this.matched.length === this.cardsArr.length){
			this.victory();
		}
	}

	mismatch(card1, card2) {
        setTimeout(() => {
            card1.classList.remove("view");
            card2.classList.remove("view");
        }, 1000);
    }

	victory(){
		clearInterval(this.countdown);
		document.getElementById("victory").classList.add("view");
	}

	gameover(){
		clearInterval(this.countdown);
		document.getElementById("gameover").classList.add("view");
	}
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init());
} 
else {
    init();
}

function init() {
    const overlays = Array.from(document.getElementsByClassName("overlay"));
    const cards = Array.from(document.getElementsByClassName("cards"));
    const game = new matchnwin(100, cards)
    overlays.map(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("view");
            game.start();
        });
    });

    cards.map(cards => {
        cards.addEventListener("click", () => {
            game.flip(cards);
        });
    });
}

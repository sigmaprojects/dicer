export class Character {
	constructor(id,name,attacks) {
		this.id = id || 0;
		this.name = name || "";
		if( Array.isArray(attacks) ) {
			this.attacks = attacks;
		} else {
			this.attacks = [new Attack()];
		}
	}
	getDiceCount() {
		let c = 0;
		for (let i = 0; i < this.attacks.length; i++) {
			c = c + this.attacks[i].dice.length;
		}
		return c;
	}
	getHumanReadableDiceForAttack(attackid) {
		let diceString = '';
		let diceCount = {};
		this.attacks[attackid].dice.forEach(function(i) { diceCount[i] = (diceCount[i]||0) + 1;});
		Object.entries(diceCount).forEach(([key,value])=>{
			diceString = diceString +  value + 'd' + key + ' ';
		});
		return diceString;
	}
    static fromJSON(serializedJson) {
        return Object.assign(new Character(), serializedJson)
    }
}

export class Attack {
	constructor(id,name,hit,dice,dmg) {
		this.id = id || 0;
		this.name = name || "";
		this.hit = hit || 0;
		this.dmg = dmg || 0;
		if( Array.isArray(dice) ) {
			this.dice = dice;
		} else {
			this.dice = [];
		}
	}
}


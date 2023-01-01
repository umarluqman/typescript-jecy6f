abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack() {
    return 'Hadoken';
  }

  get name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack() {
    return 'Lightning kick';
  }

  get name(): string {
    return 'Chun-Li';
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();

ryu.fight();
chunLi.fight();

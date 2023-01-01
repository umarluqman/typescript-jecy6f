class Doggy {
  constructor(public readonly name: string, public age: number) {}
}

const lgg = new Doggy('LG', 13);
// lgg.name = 'ad';

console.log(lgg.name);

class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() {}

  // public addDog(dog: Doggy) {
  //   this.doggies.push(dog);
  // }

  static addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

// DogList.instance.addDog(lgg);
DogList.addDog(lgg);

// const dl = new DogList();

console.log(DogList.instance.getDogs());

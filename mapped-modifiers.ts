export class State<T> {
  constructor(public current: T) {}
  update(next: Partial<T>) {
    this.current = { ...this.current, ...next };
  }
}

const state = new State({ x: 0, y: 0 });
state.update({ x: 13 });
console.log(state.current);

export type Point = {
  readonly x: number;
  y?: number;
};

export type Mapped<T> = {
  -readonly [P in keyof T]+?: T[P];
};

export type Result = Mapped<Point>;

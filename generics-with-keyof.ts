function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const plucked = <DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] => {
  return items.map((item) => item[key]);
};

const dogs = [
  { name: "Raul", age: 2 },
  { name: "Tika", age: 5 },
];

console.log(plucked(dogs, "name"));
console.log(plucked(dogs, "age"));

interface BaseEvent {
  time: number;
  user: string;
}

interface CommerceEventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

const sendEvent = <Name extends keyof CommerceEventMap>(
  name: Name,
  data: CommerceEventMap[Name]
): void => {
  console.log([name, data]);
};

sendEvent("checkout", { time: 12, user: "Ahmad" });

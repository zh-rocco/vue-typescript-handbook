interface Person {
  name: string;
  age?: number;
  [key: string]: any;
}

let tom: Person = {
  name: "Tom",
  age: 10,
  sex: "F",
};

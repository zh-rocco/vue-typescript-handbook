declare namespace OOO {
  const version = "1.0.0";
  interface Item {
    label: string;
    value: string | number;
  }
  function getName(id: number): string;
  class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number);
    private getName(): string;
  }
}

function isAnimal(target: any) {
  target.isAnimal = true;
  return target;
}
@isAnimal
class Cat {
  // ...
}

console.log((Cat as any).isAnimal); // true

function readonly(target: any, name: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class Cat {
  @readonly
  say() {
    console.log("meow ~");
  }
}

const kitty = new Cat();
kitty.say = function() {
  console.log("woof !");
}; // Error

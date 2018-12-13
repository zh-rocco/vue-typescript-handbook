---
sidebar: auto
sidebarDepth: 3
prev: ./generics.md
next: ./other.md
---

# 装饰器

_装饰器_ 是一种特殊类型的声明，它能够被附加到 `类声明`，`方法`，`访问符`，`属性` 或 `参数` 上。 装饰器使用 `@expression` 这种形式，`expression` 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

定义装饰器的时候，参数 **最多有三个**，`target`、`name`、`descriptor`。

`Decorators` 的本质是利用了 ES5 的 `Object.defineProperty` 属性，这三个参数其实是和 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 参数一致的，因此不能更改，详细分析请见 细说 ES7 JavaScript Decorators

## 在 TS 中使用装饰器

`tsconfig.json`

```json{4}
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## 装饰器种类

### 作用于类的装饰器

类装饰器只有一个参数：`target`。

```ts{1}
function isAnimal(target: any) {
  target.isAnimal = true;
  return target;
}
@isAnimal
class Cat {
  // ...
}

console.log((Cat as any).isAnimal); // true
```

### 作用于类属性的装饰器

属性装饰器有三个参数：`target`、`name`、`descriptor`。

```ts
function readonly(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
  descriptor.writable = false;
  return descriptor;
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
```

## 装饰类的编译

### 编译前

```ts
@annotation
class MyClass {}

function annotation(target: any) {
  target.annotated = true;
}
```

### TSC 编译后

```js
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

var MyClass = /** @class */ (function() {
  function MyClass() {}
  MyClass.prototype.method = function() {};
  __decorate([readonly], MyClass.prototype, "method", null);
  return MyClass;
})();

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```

### 精简整理一下

```js{7}
var __decorate = function(decorators, target, key, desc) {
  var d;
  var r;

  r = target;

  for (var i = decorators.length - 1; i >= 0; i--) {
    d = decorators[i];
    if (d) {
      r = d(r) || r;
    }
  }

  return r;
};

var MyClass = /** @class */ (function() {
  function MyClass() {}
  MyClass = __decorate([annotation], MyClass);
  return MyClass;
})();

function annotation(target) {
  target.annotated = true;
}
```

### Babel 编译后

```js
var _class;

let MyClass = annotation((_class = class MyClass {})) || _class;

function annotation(target) {
  target.annotated = true;
}
```

### 装饰器原理

从上面可以看到对于类的装饰，其原理就是：

```ts
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

## 多个装饰器

```ts
function f() {
  console.log("f(): evaluated");
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  };
}

function g() {
  console.log("g(): evaluated");
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  };
}

class C {
  @f()
  @g()
  method() {}
}
```

`console:`

```plain
f(): evaluated
g(): evaluated
g(): called
f(): called
```

::: tip
从 [这里](#精简整理一下) 可以看出，如果同一个方法有多个装饰器会 **由内向外执行**。
类似于高阶函数里的 [`compose`](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html)。
:::

## 其他

## 装饰模式 VS 适配器模式

装饰模式和适配器模式都是 **包装模式** (Wrapper Pattern)，它们都是通过封装其他对象达到设计的目的的，但是它们的形态有很大区别。

- **适配器模式** 我们使用的场景比较多，比如连接不同数据库的情况，你需要包装现有的模块接口，从而使之适配数据库 —— 好比你手机使用转接口来适配插座那样。

- **装饰模式** 不一样，仅仅包装现有的模块，使之 “更加华丽” ，并不会影响原有接口的功能 —— 好比你给手机添加一个外壳罢了，并不影响手机原有的通话、充电等功能。

### 在线编译

- [TypeScript Playground](https://www.typescriptlang.org/play/)
- [Babel Playground](https://babeljs.io/repl)

## 参考

- [Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/decorator)
- [ES7 Decorator 装饰者模式](http://taobaofed.org/blog/2015/11/16/es7-decorator/)
- [TypeScript Handbook（中文版）](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Decorators.html)
- [ES6 系列之我们来聊聊装饰器](https://github.com/mqyqingfeng/Blog/issues/109)

const arr = [
  { id: 0, name: "0" },
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  // ...
];

const find = (idx: number) => {
  const res = arr.find(({ id }) => id === idx);
  if (typeof res === "object") {
    return res.name;
  }
};

console.log(find(1));
console.log(find(4));

const f = name;

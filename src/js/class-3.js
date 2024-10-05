/** 建立一個原型鍊屬性的物件 */

function Pets(name) {
  this.name = name;
}

Pets.prototype.speak = function () {
  // console.log(this.name + " makes a noise.");
}

const dog = new Pets('dog');

// 利用for...in迭代原型鍊上的屬性
for (let props in dog) {
  // console.log('### dog (in): ', props, dog);
}

// 利用hasOwnProperty檢查dog是否有該屬性
for (let props in dog) {
  if (dog.hasOwnProperty(props)) {
    // console.log('### dog (hasOwnProperty): ', props);
  }
}

/** 可迭代對象 */
const arr = ['a', 'b', 'c'];

// 利用for...of迭代陣列
for (let i of arr) {
  // console.log('### arr (for...of): ', i); // a, b, c
}

// for...in迭代陣列
for (let i in arr) {
  // console.log('### arr (for...in): ', i); // 0, 1, 2
}

const arr2 = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
]

// for...of迭代物件
for (let i of arr2) {
  // console.log('### arr2 (for...of): ', i); // { name: 'a' }, { name: 'b' }, { name: 'c' }
}

// for...in迭代物件
for (let i in arr2) {
  // console.log('### arr2 (for...in): ', i); // 0, 1, 2
}

// ------>

/** 陣列的操作 */

const gameArr = [ '動物之森', '明星大亂鬥' ];

// push() - 在陣列尾端新增元素

gameArr.push('薩爾達傳說');
// console.log('### gameArr (push): ', gameArr); // [ '動物之森', '明星大亂鬥', '薩爾達傳說' ]

// unshift() - 在陣列最前端新增元素

gameArr.unshift('魔物獵人RISE');
// console.log('### gameArr (unshift): ', gameArr); // [ '魔物獵人RISE', '動物之森', '明星大亂鬥', '薩爾達傳說' ]

// pop() - 移除陣列尾端元素

// gameArr.pop();
// console.log('### gameArr (pop): ', gameArr); // [ '魔物獵人RISE', '動物之森', '明星大亂鬥' ]

// shift() - 移除陣列最前端元素

// gameArr.shift();
// console.log('### gameArr (shift): ', gameArr); // [ '動物之森', '明星大亂鬥' ]

// 尋找陣列項目的索引值

// const index = gameArr.indexOf('明星大亂鬥');
// console.log('### gameArr (indexOf): ', index);

// splice() - 刪除陣列中的元素
// const target = gameArr.indexOf('魔物獵人RISE')
// console.log('### gameArr (indexOf): ', target);
// gameArr.splice(target, 2);
// console.log('### gameArr (splice): ', gameArr);


// 連接兩個不同的陣列
// const arr_1 = [ '動物之森', '明星大亂鬥' ];
// const arr_2 = [ '薩爾達傳說', '魔物獵人RISE' ];

// const connectedArr = arr_1.concat(arr_2);
// console.log('### arr_3 (concat): ', connectedArr);

// find 與 filter
const gameStoreArr = [
  { name: '動物之森', price: 2000 },
  { name: '明星大亂鬥', price: 2500 },
  { name: '薩爾達傳說', price: 3000 },
  { name: '魔物獵人RISE', price: 3500 },
];

// find() - 找出符合條件的第一個元素
const findGame = gameStoreArr.find(game => game.price >= 3000);
console.log('### gameStoreArr (find): ', findGame);

// filter() - 找出符合條件的所有元素

const filterGame = gameStoreArr.filter(game => game.price >= 2500);
console.log('### gameStoreArr (filter): ', filterGame);

// string.split() - 將字串轉換為陣列

const str = '890-123-456';
const splitStr = str.split('-');
console.log('### str (split): ', splitStr);

// array.join() - 將陣列轉換為字串
splitStr.join('-');
console.log('### splitStr (join): ', splitStr);


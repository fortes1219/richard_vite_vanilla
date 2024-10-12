/** Array.slice */
const chracters = ['孫大聖', '三藏法師', '豬八戒', '沙悟淨'];
// console.log(chracters.slice(1, 3)); // [ '三藏法師', '豬八戒' ]

/** Array.splice */

const bossList = ['黑風大王', '黃風大聖', '黃眉', '百眼魔君', '紅孩兒', '大聖殘軀'];
bossList.splice(1, 0, '二郎顯聖真君');
// console.log(bossList); // [ '黑風大王', '二郎顯聖真君', '黃風大聖', '黃眉', '百眼魔君', '紅孩兒', '大聖殘軀' ]

const hasSpliced = bossList.splice(1, 3); // [ '二郎顯聖真君', '黃風大聖', '黃眉' ]

/** Array.map */

const players = [
  { name: '泡泡', currentExp: 200 },
  { name: '花花', currentExp: 1000 },
  { name: '毛毛', currentExp: 800 },
];

const newPlayers = players.map((player) => {
  return {
    ...player,
    currentExp: player.currentExp * 2,
  };
});
// console.log(newPlayers); // [ { name: '泡泡', currentExp: 400 }, { name: '花花', currentExp: 2000 }, { name: '毛毛', currentExp: 1600 } ]

/** 閉包 closure */

// 基本例子
const createCounter = () => {
  let count = 0;
  return () => {
    return ++count;
  };
};
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// 效能開銷會非常大的例子

function createExpensiveClosure() {
  const expensiveData = new Array(1000000).fill(Math.random());
  return function (index) {
    return expensiveData[index];
  };
}
// 每次調用都會需要遍歷長度很長的陣列，效能開銷過大
const getExpensiveData = createExpensiveClosure();

// 生成器函式搭配 yield 語句優化效能
// 創建生成器函式: function後面加上萬用字元 '*'
function* createExpensiveGenerator() {
  while (true) {
    // yield : 每次都會中斷生成器函式執行並回傳當前的值
    yield Math.random();
  }
}
function createGeneratorClosure() {
  const generator = createExpensiveGenerator();
  const cache = [];
  return function (index) {
    if (cache[index] === undefined) {
      cache[index] = generator.next().value;
    }
    return cache[index];
  };
}

// 延遲初始化也是個方法，React的useState底層也用過
function createLazyClosure() {
  let data = null;
  return function (index) {
    if (data === null) {
      data = new Array(1000000).fill(Math.random());
    }
    return data[index];
  };
}

// 性能測試
console.time('Generator');
for (let i = 0; i < 1000000; i += 100000) {
  getData(i);
}
console.timeEnd('Generator');
console.time('Lazy Initialization');
for (let i = 0; i < 1000000; i += 100000) {
  getLazyData(i);
}
console.timeEnd('Lazy Initialization');

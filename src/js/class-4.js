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
// console.log(counter()); // 1
// console.log(counter()); // 2

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
// console.time('Generator');
// for (let i = 0; i < 1000000; i += 100000) {
//   getData(i);
// }
// console.timeEnd('Generator');
// console.time('Lazy Initialization');
// for (let i = 0; i < 1000000; i += 100000) {
//   getLazyData(i);
// }
// console.timeEnd('Lazy Initialization');

/** 二元樹 */
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: {
    value: 3,
    left: { value: 6 },
  },
};

// 使用遞迴
function dfsRecursive(node, target, counter = { count: 0 }) {
  // 如果節點不存在或者為空，返回null
  if (!node || node === null) {
    return null;
  }
  counter.count++;
  console.log('訪問節點：', node.value);
  // 如果找到目標值，返回當前節點
  if (node.value === target) {
    return node;
  }
  // 以左節點為始，使用遞迴搜索目標值
  const leftResult = dfsRecursive(node.left, target, counter);
  // 如果左節點找到目標值，直接返回
  if (leftResult !== null) {
    return leftResult;
  }
  // 以右節點為始，使用遞迴搜索目標值
  // 右節點放最後的原因是，如果左節點找到目標值，右節點就不需要再搜索了
  // 左邊沒找到目標，才會繼續往右邊找
  return dfsRecursive(node.right, target, counter);
}

// 使用迭代
function dfsIterative(node, target, counter = { count: 0 }) {
  if (!node || node === null) {
    return null;
  }
  const stack = [node];
  while (stack.length > 0) {
    const temp = stack.pop();
    counter.count++;
    console.log('訪問節點：', temp.value);
    if (temp.value === target) {
      return temp;
    }
    // 注意：先將右子節點壓入堆疊，以保持與遞迴版本相同的訪問順序
    if (temp.right) {
      stack.push(temp.right);
    }
    if (temp.left) {
      stack.push(temp.left);
    }
  }
  return null;
}

// 動態創建大規模且有深度的樹狀資料結構
function createLargeTree(depth) {
  if (depth === 0) {
    return null;
  }
  return {
    value: Math.floor(Math.random() * 1000),
    left: createLargeTree(depth - 1),
    right: createLargeTree(depth - 1),
  };
}

// 定義一個深度為15的二元樹
const largeTree = createLargeTree(15);

// 計算樹的總節點數量
function countTotalNodes(tree) {
  if (tree === null) {
    return 0;
  }
  return 1 + countTotalNodes(tree.left) + countTotalNodes(tree.right);
}

console.log('### 節點總數量: ', countTotalNodes(largeTree));

// 創建性能比較用途的函數
function comparePerformance(treeDepth, target) {
  const largeTree = createLargeTree(treeDepth);
  const totalNodes = countTotalNodes(largeTree);
  console.log(`\n比較 DFS 在深度為 ${treeDepth} 的樹搜尋 ${target} ：`);
  console.log(`總節點數：${totalNodes}`);
  const recursiveCounter = { count: 0 };
  const start1 = performance.now();
  const result1 = dfsRecursive(largeTree, target, recursiveCounter);
  const end1 = performance.now();
  console.log(`
  遞迴 DFS：${result1 ? '找到' : '未找到'}目標。
  共訪問 ${recursiveCounter.count} 個節點。
  耗費 ${(end1 - start1).toFixed(2)} 毫秒
  `);
  const iterativeCounter = { count: 0 };
  const start2 = performance.now();
  const result2 = dfsIterative(largeTree, target, iterativeCounter);
  const end2 = performance.now();
  console.log(`
  迭代 DFS：${result2 ? '找到' : '未找到'}目標。
  共訪問 ${iterativeCounter.count} 個節點。
  耗費 ${(end2 - start2).toFixed(2)} 毫秒
  `);
}

//// comparePerformance(15, 999); // 深度為15的樹，搜尋value = 999
/** ES6 尚未出現以前的異步處理例子 */

// 建立一個function，用來執行TASK Queue
function actions(tasks, callback) {
  var step = tasks.length;
  var result = [];
  function check(r) {
    result.push(r);
    if (result.length === step) {
      // 如果task都完成就執行這個callback
      callback();
    }
  }
  tasks.forEach(function (f) {
    f(check);
  });
}

// task function A~C
function funcA(check) {
  window.setTimeout(function () {
    console.log('執行 A');
    check('A');
  }, (Math.random() + 1) * 1000);
}

function funcB(check) {
  window.setTimeout(function () {
    console.log('執行 B');
    check('B');
  }, (Math.random() + 1) * 1000);
}

function funcC(check) {
  window.setTimeout(function () {
    console.log('執行 C');
    check('C');
  }, (Math.random() + 1) * 1000);
}

// callBack

function funcD() {
  console.log('異步處理全數完成！');
}

// 執行actions

// actions([funcA, funcB, funcC], funcD);

/** 改用Promise來處理 */

var requestStatus = 1; // 模擬請求狀態，1為成功，0為失敗

function promiseFuncA() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      console.log('執行 A');
      if (requestStatus === 1) {
        resolve('A');
        console.log('A 完成');
      } else {
        reject();
        console.log('A 發生錯誤 ');
      }
    }, (Math.random() + 1) * 1000);
  });
}

function promiseFuncB() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      console.log('執行 B');
      if (requestStatus === 1) {
        resolve('B');
        console.log('B 完成');
      } else {
        reject();
        console.log('B 發生錯誤 ');
      }
    }, (Math.random() + 1) * 1000);
  });
}

function promiseFuncC() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      console.log('執行 C');
      if (requestStatus === 1) {
        resolve('C');
        console.log('C 完成');
      } else {
        reject();
        console.log('C 發生錯誤 ');
      }
    }, (Math.random() + 1) * 1000);
  });
}

// 等待A完成後再執行B，B完成後再執行C
// promiseFuncA().then(promiseFuncB).then(promiseFuncC);

// 同時全部執行

// Promise.all([promiseFuncA(), promiseFuncB(), promiseFuncC()]).then(() => {
//   console.log('異步處理全數完成！');
// });

// Promise 請求國家API

// const getCountry = async (keywords) => {
//   const apiPath = `https://restcountries.com/v2/name/${keywords}?fullText=false`;
//   const res = await fetch(apiPath).then((response) => response.json());
//   console.log('#### res: ', res);
// }

// getCountry('taiwan');

// ASYNC/AWAIT

async function asyncFuncD() {
  try {
    await promiseFuncA();
    await promiseFuncB();
    await promiseFuncC();
    console.log('異步處理全數完成！');
  } catch (error) {
    throw new Error('發生錯誤！');
  } finally {
    console.log('不論成功或失敗都會執行這裡');
  }
}
// asyncFuncD();

async function asyncAllFuncD() {
  await Promise.all([promiseFuncA(), promiseFuncB(), promiseFuncC()]);
  console.log('ALL: 全數完成！');
}

// asyncAllFuncD();

/** 用戶訂單的Event Loop例子 */

// 模擬資料
const mockData = {
  user: { id: 1, name: 'John' },
  orders: [
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
  ],
  notifications: [{ id: 1, message: '新訂單提醒' }],
};

// 模擬API
const mockFetch = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// 實際業務場景
console.log('=== 使用者開啟頁面 ==='); // 同步

const loadUserDashboard = async () => {
  console.log('開始載入 Dashboard'); // 同步
  // 第一次 Event Loop：取得用戶資料
  const userData = await mockFetch(mockData.user, 1000);
  console.log('用戶資料載入完成', userData); // 第一個 await 後的Microtask
  // 第二次 Event Loop：同時取得訂單和通知
  const [orders, notifications] = await Promise.all([
    mockFetch(mockData.orders, 500),
    mockFetch(mockData.notifications, 800),
  ]);
  console.log('訂單和通知載入完成'); // 第二個 await 後的Microtask
  return { userData, orders, notifications };
};

// 模擬用戶操作
setTimeout(() => {
  console.log('用戶點擊按鈕'); // Macrotask
}, 0);

loadUserDashboard().then((data) => {
  console.log('Dashboard 載入完成', data); // 最終的Microtask
});

console.log('=== 頁面初始化完成 ==='); // 同步

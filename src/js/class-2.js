// 載入cloneDeep
import { cloneDeep } from 'lodash';

var developer = {
  name: 'Fortes',
  job: 'Front-end Developer',
  skill: 'JavaScript',
  helloWorld: () => {
    console.log(`Hi, my name is ${this.name}`);
    console.log(`My job is ${this.job}`);
  },
  anotherWorld: function () {
    console.log(`Hi, my name is ${this.name}`);
    console.log(`My job is ${this.job}`);
  },
};

/** 說明arrow function和一般function在this上的差異 */

// developer["helloWorld"]();
// developer["anotherWorld"]();

/** 對物件賦值 */
// developer.hobby = 'Cocktail';
// console.log(developer, developer.hobby); // 顯示當時的靜態快照

// /** 刪除物件屬性 */
// delete developer.hobby;
// console.log(developer, developer.hobby); // 顯示當時的靜態快照
// console.log('#### delete hobby ####');

// developer.hobby = 'TV Game';
// console.log(developer, developer.hobby); // 顯示新的靜態快照

// developer.hobby = 'Sleep';

/** 注意!!!! 如果你只打印developer這個物件，log只會看到最後被賦值的refrence物件
 * 除非使用developer.XXX的方式去查看，才能看到物件的靜態快照
 */

/* -------- */

// if ('hobby' in developer) {
//   console.log('hobby is exist.', 'toString' in developer);
// } else {
//   console.log('hobby is not exist.');
// }

// if (developer.hasOwnProperty('hobby')) {
//   console.log('hobby is exist.', developer.hasOwnProperty("toString"));
// } else {
//   console.log('hobby is not exist.');
// }

/** 創建一個原型物件 */

function Person() {
  this.name = 'Fortes';
  this.job = 'Front-end Developer';
}

Person.prototype.helloWorld = function () {
  console.log(`Hi, my name is ${this.name}`);
  console.log(`My job is ${this.job}`);
}

function Developer() {
  this.skill = 'JavaScript';
}

Developer.prototype = new Person();

const dev = new Developer();

// 看看 in 和 hasOwnProperty 在原型鍊上的差異
// console.log('#### in dev: ', 'name' in dev);
// console.log('#### hasOwnProperty dev: ', dev.hasOwnProperty('name'));

// console.log('#### dev: ', dev);

// 利用dev的例子創造一個完整且全新的正常物件

function mergeProperties(obj) {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    } else {
      // 從原型鍊上繼承的屬性
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const dev2 = mergeProperties(dev);

// console.log('#### dev2: ', dev2);


/** 遍歷物件處理 */

const scoreStatus = {
  score: 15000,
  objective: 3,
  special: 5000,
  compelete: 10000,
}

/** 完整深拷貝物件後再遍歷處理 */
// const newScoreStatus = JSON.parse(JSON.stringify(scoreStatus))

// const rate = scoreStatus.objective

// Object.keys(scoreStatus).forEach(key => {
//   // 檢查是否物件中含有key
//   if ( !scoreStatus.hasOwnProperty(key) ) {
//     return
//   }
//   if (key !== 'objective') {
//     scoreStatus[key] = scoreStatus[key] * rate
//     console.log(`#### ${key}: `, scoreStatus[key])
//   }
// })

// console.log('#### new obj values: ', scoreStatus)

/** 對複雜物件，或者深度較深的物件深拷貝後處理 */

const complexObj = {
  name: "Vue.js",
  details: {
    year: "2024",
    features: ["Composition API", "Teleport", "Suspense"],
  },
  created: new Date(),
}

// 使用 ES 2021 structuredClone

// const newComplexObj = structuredClone(complexObj)

// 使用 lodash cloneDeep
const newComplexObj = cloneDeep(complexObj)

newComplexObj.details.year = "2030"

// 比較新舊物件在日誌上的差異
console.log('#### complexObj: ', complexObj)
console.log('#### newComplexObj: ', newComplexObj)
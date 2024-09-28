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
developer.hobby = 'Cocktail';
console.log(developer, developer.hobby); // 顯示當時的靜態快照

/** 刪除物件屬性 */
delete developer.hobby;
console.log(developer, developer.hobby); // 顯示當時的靜態快照
console.log('#### delete hobby ####');

developer.hobby = 'TV Game';
console.log(developer, developer.hobby); // 顯示新的靜態快照

developer.hobby = 'Sleep';

/** 注意!!!! 如果你只打印developer這個物件，log只會看到最後被賦值的refrence物件
 * 除非使用developer.XXX的方式去查看，才能看到物件的靜態快照
 */

/* -------- */

if ('hobby' in developer) {
  console.log('hobby is exist.', 'toString' in developer);
} else {
  console.log('hobby is not exist.');
}

if (developer.hasOwnProperty('hobby')) {
  console.log('hobby is exist.', developer.hasOwnProperty("toString"));
} else {
  console.log('hobby is not exist.');
}

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
console.log('#### in dev: ', 'name' in dev);
console.log('#### hasOwnProperty dev: ', dev.hasOwnProperty('name'));

console.log('#### dev: ', dev);

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

console.log('#### dev2: ', dev2);
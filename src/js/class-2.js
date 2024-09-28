var developer = {
  name: "Fortes",
  job: "Front-end Developer",
  skill: "JavaScript",
  helloWorld: () => {
    console.log( `Hi, my name is ${this.name}` );
    console.log( `My job is ${this.job}` );
  },
  anotherWorld: function () {
    console.log( `Hi, my name is ${this.name}` );
    console.log( `My job is ${this.job}` );
  }
}

/** 說明arrow function和一般function在this上的差異 */

// developer["helloWorld"]();
// developer["anotherWorld"]();

/** 對物件賦值 */
developer.hobby = "Cocktail";
console.log(developer, developer.hobby);  // 顯示當時的靜態快照

/** 刪除物件屬性 */
delete developer.hobby;
console.log(developer, developer.hobby);  // 顯示當時的靜態快照
console.log('#### delete hobby ####'); 

developer.hobby = "TV Game";
console.log(developer, developer.hobby);  // 顯示新的靜態快照

developer.hobby = "Sleep";

/** 注意!!!! 如果你只打印developer這個物件，log只會看到最後被賦值的refrence物件
 * 除非使用developer.XXX的方式去查看，才能看到物件的靜態快照
 */

/* -------- */


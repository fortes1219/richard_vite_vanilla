/** Click */
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const textMsg = document.getElementById('textMsg');

// 監聽按鈕點擊事件
submitBtn.addEventListener('click', () => {
  const name = nameInput.value; // 取得 input 中的值
  textMsg.textContent = `Hello, ${name}!`; // 將值顯示在 <p> 元素中
});

/** Input */
const inputUsername = document.getElementById('inputUserName');
const changeOutput = document.getElementById('changeOutput');
// 監聽 input 事件，實時更新結果
inputUsername.addEventListener('input', (event) => {
  const value = event.target.value;
  changeOutput.textContent = `Your username is: ${value}`;
});

/** Change */

const lang = document.getElementById('language');
const selectedLang = document.getElementById('selectedLang');

// 監聽 change 事件，當選擇語言變更時更新顯示
lang.addEventListener('change', (event) => {
  const selectedOption = event.target.value;
  selectedLang.textContent = `Selected language: ${selectedOption}`;
});

/** Keydown / Keyup */

const keyInput = document.getElementById('keyInput');
const keyPressedOutput = document.getElementById('keyPressed');
// 監聽 keydown 事件，實時顯示按下的鍵
keyInput.addEventListener('keydown', (event) => {
  keyPressedOutput.textContent = `Key pressed: ${event.key}`;
});

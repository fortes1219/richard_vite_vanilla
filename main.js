import 'styles/style.scss';

// 定義一個策略物件，用來映射不同頁面對應的 H1 標題
const pageTitleStrategy = {
  '/index.html': () => 'Home Page',
  '/topic.html': () => 'RWD: Topics',
  '/products.html': () => 'RWD: Products',
  '/js-day-1.html': () => 'Javascript DAY-1: 資料型別與型別轉換',
  '/default': () => 'Welcome to Our Website',  // 預設標題
};

// 判斷當前頁面並設定標題
const getCurrentPageTitle = () => {
  const path = window.location.pathname;

  // 根據當前頁面的 path，從策略物件中選擇對應的標題
  return pageTitleStrategy[path] ? pageTitleStrategy[path]() : pageTitleStrategy['/default']();
};

// 動態將nav相關的內容加入到頁面上
const appContent = document.getElementById('app');
appContent.insertAdjacentHTML('afterbegin',`
  <nav class="navigator">
    <div class="navigator-title">${getCurrentPageTitle()}</div>
    <div id="nav-trigger" class="navigator-trigger"><i></i></div>
  </nav>
  <div id="nav-mask" class="nav-mask"></div>
  <div id="nav-panel" class="nav-panel">
    <b>HTML/CSS</b>
    <ul class="nav-list">
      <li>
        <a href="index.html">HOME</a>
      </li>
      <li>
        <a href="topic.html">TOPIC</a>
      </li>
      <li>
        <a href="products.html">PRODUCTS</a>
      </li>
    </ul>
    <b>Javascript</b>
    <ul class="nav-list">
      <li>
        <a href="js-day-1.html">Day-1: 資料型別與型別轉換</a>
      </li>
      <li>
        <a href="javascript: void()">Day Extra: 偵聽器與DOM操作</a>
      </li>
    </ul>
  </div>
`);

document.addEventListener('DOMContentLoaded', () => {
  /** 選單事件 */
  const navTrigger = document.getElementById('nav-trigger');
  const navMask = document.getElementById('nav-mask');
  const navPanel = document.getElementById('nav-panel');

  // 初始化，隱藏選單且不顯示 transition 效果，並且清除選單的 disabled 狀態
  navPanel.classList.remove('is-disabled');

  // 切換選單狀態的函式 toggle 是反覆add和remove的意思
  const toggleNav = (isOpen) => {
    navPanel.classList.toggle('is-active', isOpen);
    navPanel.classList.toggle('is-disabled', !isOpen);
    navMask.classList.toggle('is-active', isOpen);
  };

  // 監聽觸發器的點擊事件，開啟選單
  navTrigger.addEventListener('click', () => toggleNav(true));

  // 監聽遮罩的點擊事件，關閉選單
  navMask.addEventListener('click', () => toggleNav(false));
});

// const firstTextElement = document.querySelector(".user-info");

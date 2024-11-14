(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const n={"index.html":()=>"Home Page","topic.html":()=>"RWD: Topics","products.html":()=>"RWD: Products","js-day-1.html":()=>"Javascript DAY-1: 資料型別與型別轉換","js-day-2.html":()=>"Javascript DAY-2: 變數、作用域、運算子與物件",default:()=>"Welcome to Our Website"},o=()=>{const a=window.location.pathname;return a.substring(a.lastIndexOf("/")+1)},c=()=>{const a=o();return n[a]?n[a]():n.default()},d=document.getElementById("app");d.insertAdjacentHTML("afterbegin",`
  <nav class="navigator">
    <div class="navigator-title">${c()}</div>
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
        <a href="js-day-2.html">Day-2: 變數、作用域、運算子與物件</a>
      </li>
      <li>
        <a href="js-day-3.html">Day-3: 迴圈與陣列(一)</a>
      </li>
      <li>
        <a href="js-day-3-dijikstra.html">Day-3: 迪傑斯特拉演算法</a>
      </li>
      <li>
        <a href="js-day-4.html">Day-4: 陣列(二)、閉包、遞迴</a>
      </li>
      <li>
        <a href="js-day-5.html">Day-5: 原型鍊與類別(class)</a>
      </li>
      <li>
        <a href="js-day-6.html">Day-6: 異步處理 & 正則表示法</a>
      </li>
    </ul>
  </div>
`);document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("nav-trigger"),i=document.getElementById("nav-mask"),s=document.getElementById("nav-panel");s.classList.remove("is-disabled");const l=e=>{s.classList.toggle("is-active",e),s.classList.toggle("is-disabled",!e),i.classList.toggle("is-active",e)};a.addEventListener("click",()=>l(!0)),i.addEventListener("click",()=>l(!1))});

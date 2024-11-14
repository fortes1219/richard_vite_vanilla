(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(a){if(a.ep)return;a.ep=!0;const t=i(a);fetch(a.href,t)}})();const n={"index.html":()=>"Home Page","topic.html":()=>"RWD: Topics","products.html":()=>"RWD: Products","js-day-1.html":()=>"Javascript DAY-1: 資料型別與型別轉換","js-day-2.html":()=>"Javascript DAY-2: 變數、作用域、運算子與物件","js-day-3.html":()=>"Javascript Day-3: 迴圈與陣列(一)","js-day-3-dijikstra-v1.html":()=>"Javascript Day-3: Dijkstra's algorithm V.1 (Original-Version)","js-day-3-dijikstra-v2.html":()=>"Javascript Day-3: Dijkstra's algorithm V.2 (Class-Version)","js-day-4.html":()=>"Javascript Day-4: 陣列(二)、閉包、遞迴","js-day-4-FFVII.html":()=>"Javascript Day-4: 仿製一個FFVII的戰鬥系統","js-day-5.html":()=>"Javascript Day-5: 原型鍊與類別(class)","js-day-6.html":()=>"Javascript Day-6: 異步處理 & 正則表示法","js-day-6_extra-1.html":()=>"Javascript Day-6 Extra-1: 網址驗證","js-day-6_extra-2.html":()=>"Javascript Day-6 Extra-2: 異步處理：Axios",default:()=>"Welcome to Our Website"},o=()=>{const e=window.location.pathname;return e.substring(e.lastIndexOf("/")+1)},d=()=>{const e=o();return n[e]?n[e]():n.default()},c=document.getElementById("app");c.insertAdjacentHTML("afterbegin",`
  <nav class="navigator">
    <div class="navigator-title">${d()}</div>
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
        <a href="js-day-3-dijikstra-v1.html">Day-3: Dijkstra's algorithm V.1</a>
      </li>
      <li>
        <a href="js-day-3-dijikstra-v2.html">Day-3: Dijkstra's algorithm V.2</a>
      </li>
      <li>
        <a href="js-day-4.html">Day-4: 陣列(二)、閉包、遞迴</a>
      </li>
      <li>
        <a href="js-day-4-FFVII.html">Day-4: 仿製一個FFVII的戰鬥系統</a>
      </li>
      <li>
        <a href="js-day-5.html">Day-5: 原型鍊與類別(class)</a>
      </li>
      <li>
        <a href="js-day-6.html">Day-6: 異步處理 & 正則表示法</a>
      </li>
      <li>
        <a href="js-day-6_extra-1.html">Day-6 Extra-1: 網址驗證</a>
      </li>
      <li>
        <a href="js-day-6_extra-2.html">Day-6 Extra-2: 異步處理：Axios</a>
      </li>
    </ul>
  </div>
`);document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("nav-trigger"),s=document.getElementById("nav-mask"),i=document.getElementById("nav-panel");i.classList.remove("is-disabled");const r=a=>{i.classList.toggle("is-active",a),i.classList.toggle("is-disabled",!a),s.classList.toggle("is-active",a)};e.addEventListener("click",()=>r(!0)),s.addEventListener("click",()=>r(!1))});

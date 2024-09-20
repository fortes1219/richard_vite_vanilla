(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const l={"index.html":()=>"Home Page","topic.html":()=>"RWD: Topics","products.html":()=>"RWD: Products","js-day-1.html":()=>"Javascript DAY-1: 資料型別與型別轉換",default:()=>"Welcome to Our Website"},o=()=>{const a=window.location.pathname;return a.substring(a.lastIndexOf("/")+1)},c=()=>{const a=o();return l[a]?l[a]():l.default()},d=document.getElementById("app");d.insertAdjacentHTML("afterbegin",`
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
        <a href="javascript: void()">Day Extra: 偵聽器與DOM操作</a>
      </li>
    </ul>
  </div>
`);document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("nav-trigger"),i=document.getElementById("nav-mask"),s=document.getElementById("nav-panel");s.classList.remove("is-disabled");const r=e=>{s.classList.toggle("is-active",e),s.classList.toggle("is-disabled",!e),i.classList.toggle("is-active",e)};a.addEventListener("click",()=>r(!0)),i.addEventListener("click",()=>r(!1))});

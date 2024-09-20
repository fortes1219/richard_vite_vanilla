(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const l={"/index.html":()=>"Home Page","/topic.html":()=>"RWD: Topics","/products.html":()=>"RWD: Products","/js-day-1.html":()=>"Javascript DAY-1: 資料型別與型別轉換","/default":()=>"Welcome to Our Website"},o=()=>{const i=window.location.pathname;return l[i]?l[i]():l["/default"]()},c=document.getElementById("app");c.insertAdjacentHTML("afterbegin",`
  <nav class="navigator">
    <div class="navigator-title">${o()}</div>
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
`);document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("nav-trigger"),a=document.getElementById("nav-mask"),s=document.getElementById("nav-panel");s.classList.remove("is-disabled");const r=e=>{s.classList.toggle("is-active",e),s.classList.toggle("is-disabled",!e),a.classList.toggle("is-active",e)};i.addEventListener("click",()=>r(!0)),a.addEventListener("click",()=>r(!1))});

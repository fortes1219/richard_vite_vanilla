(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("nav-trigger"),r=document.getElementById("nav-mask"),s=document.getElementById("nav-panel");s.classList.remove("is-disabled");const o=e=>{s.classList.toggle("is-active",e),s.classList.toggle("is-disabled",!e),r.classList.toggle("is-active",e)};i.addEventListener("click",()=>o(!0)),r.addEventListener("click",()=>o(!1))});

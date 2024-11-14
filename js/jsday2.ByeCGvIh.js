import"./main.DtBq9meY.js";import{l as a}from"./lodash.TVC-EY0t.js";function n(){this.name="Fortes",this.job="Front-end Developer"}n.prototype.helloWorld=function(){console.log(`Hi, my name is ${this.name}`),console.log(`My job is ${this.job}`)};function c(){this.skill="JavaScript"}c.prototype=new n;const m=new c;function u(e){let t={};for(let o in e)e.hasOwnProperty(o),t[o]=e[o];return t}u(m);const p={name:"Vue.js",details:{year:"2024",features:["Composition API","Teleport","Suspense"]},created:new Date},b=a.cloneDeep(p);b.details.year="2030";const s={score:"",special:"",objective:"",compelete:""},i=Object.keys(s),f=document.getElementById("submitBtn"),y=document.querySelectorAll("#ass1 #work input"),N=document.getElementById("rate_2x"),v=document.getElementById("rate_4x"),$=document.getElementById("result1");f.addEventListener("click",()=>{y.forEach(e=>{const o=String(e.placeholder).toLowerCase();`${o}`in s&&(s[`${o}`]=e.value)}),N.checked&&(s.objective=2),v.checked&&(s.objective=4);for(let e=0;e<Object.keys(s).length;e++)e!=2&&(s[i[e]]*=s[i[2]]);$.innerHTML=`
    Score: ${s.score}<br/>
    Special: ${s.special}<br/>
    Objective: ${s.objective}<br/>
    compelete: ${s.compelete}
    `});const r={firstName:"John",lastName:"Doe",address:{street:"123 Main St",city:"New York"},email:"johndoe@example.com"},l=document.getElementById("result2");l.innerHTML=`
  First Name: ${r.firstName}<br/>
  Last Name: ${r.lastName}<br/>
  Street: ${r.address.street}<br/>
  City: ${r.address.city}<br/>
  Email: ${r.email}
`;const h=document.getElementById("submitBtn2"),d=document.querySelectorAll("#ass2 #work input");d.forEach(e=>{const t=String(e.id).replace("Val","");e.value||(r[t]?r[t]!==void 0&&(e.value=r[t]):(console.log("Found Adress"),e.value=r.address[t]))});const g=a.cloneDeep(r);h.addEventListener("click",()=>{j(g)});function j(e){d.forEach(t=>{const o=String(t.id).replace("Val","");t.value&&(e[o]?e[o]!==void 0&&(e[o]=t.value):e.address[o]=t.value)}),l.innerHTML=`
  First Name: ${e.firstName}<br/>
  Last Name: ${e.lastName}<br/>
  Street: ${e.address.street}<br/>
  City: ${e.address.city}<br/>
  Email: ${e.email}
  `}

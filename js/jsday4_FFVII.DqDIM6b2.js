import"./main.DtBq9meY.js";import{l as p}from"./lodash.TVC-EY0t.js";const u=[{name:"Cloud",class:"戰士",hp:5500,mp:500,status:"正常",skill:[{id:0,name:"攻擊",cost:0,damage:400},{id:1,name:"超究武神霸斬",cost:50,damage:2e3}]},{name:"Tifa",class:"格鬥家",hp:5e3,mp:500,status:"正常",skill:[{id:2,name:"攻擊",cost:0,damage:600},{id:3,name:"ファイナルヘブン（最終天堂）",cost:80,damage:2e3}]},{name:"Aerith",class:"魔法師",hp:4800,mp:800,status:"正常",skill:[{id:4,name:"攻擊",cost:0,damage:800},{id:5,name:"ケアルガ（全體恢復）",cost:50,damage:2e3},{id:6,name:"ホーリー（聖光）",cost:80,damage:900},{id:7,name:"デブチョコボ召喚（召喚胖陸行鳥）",cost:100,damage:1500}]}],g=[{name:"巴哈姆特",class:"BOSS",hp:1e4,mp:2e4,status:"不爽",skill:[{name:"メガフレア（超巨爆）",cost:0,damage:3e3}]}];let o=p.cloneDeep(u),c=p.cloneDeep(g);const v=()=>{let e="";for(let t in c)e+=`
      <div class="cards">
        <div class="row horizontal space">
          <b>${c[t].name}</b>
          <span>${c[t].class}</span>
        </div>
        <div class="row horizontal space">
          <b>HP</b>
          <span>${c[t].hp}</span>
        </div>
        <div class="row horizontal space">
          <b>MP</b>
          <span>${c[t].mp}</span>
        </div>
        <div class="row horizontal space">
          <b>狀態</b>
          <span>${c[t].status}</span>
        </div>
      </div>
    `;const a=document.getElementById("mob");a.innerHTML=e},b=()=>{let e="",a=[];for(let s in o)a.push(o[s].skill.map(l=>l.name));for(let s in o){const l=()=>{let i="",d=o[s].skill.map(r=>r.name);for(let r in d)i+=`<button data-player="${s}" data-skill="${r}">${d[r]}</button>`;return i};e+=`
      <div class="cards row horizontal">
        <div class="row vertical" data-space="space-next">
          <div class="row horizontal space">
            <b>${o[s].name}</b>
            <span>${o[s].class}</span>
          </div>
          <div class="row horizontal space">
            <b>HP</b>
            <span>${o[s].hp}</span>
          </div>
          <div class="row horizontal space">
            <b>MP</b>
            <span>${o[s].mp}</span>
          </div>
          <div class="row horizontal space">
            <b>狀態</b>
            <span>${o[s].status}</span>
          </div>
        </div>
        <div class="row vertical">
          <b>技能</b>
          ${l()}
        </div>
      </div>
    `}const t=document.getElementById("players");t.innerHTML=e,t.querySelectorAll("button").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.getAttribute("data-player")),i=parseInt(s.getAttribute("data-skill"));w(l,i)})})};b();v();let h=!1;const $=()=>{y(),x(),B(),M()},y=()=>{o.forEach(e=>{e.hp=Math.max(0,Math.min(e.hp,f(e.name))),e.mp=Math.max(0,Math.min(e.mp,P(e.name))),e.status=e.hp<=0?"無法戰鬥":"正常"})},x=()=>{c.forEach(e=>{e.hp=Math.max(0,e.hp),e.status=e.hp<=0?"已擊敗":"不爽"})},B=()=>{const e=o.every(t=>t.hp<=0),a=c[0].hp<=0;(e||a)&&(h=!0,H(a?"victory":"defeat"))},M=()=>{b(),v()},H=e=>{const a=document.getElementById("result"),t=document.createElement("button");t.textContent="重新開始",t.className="reset-button",t.addEventListener("click",E);const n=e==="victory"?`恭喜擊敗${c[0].name}！`:"戰鬥失敗...";a.innerHTML="",a.insertAdjacentHTML("beforeend",`<p>${n}</p>`),a.appendChild(t)},f=e=>{const a=u.find(t=>t.name===e);return a?a.hp:0},P=e=>{const a=u.find(t=>t.name===e);return a?a.mp:0},E=()=>{h=!1,o=p.cloneDeep(u),c=p.cloneDeep(g),document.getElementById("result").innerHTML="",b(),v(),m=0},w=(e,a)=>{if(h)return;const t=o[e],n=t.skill[a],s=document.getElementById("result");if(n.cost>t.mp){s.innerHTML=`${t.name} 的 MP 不足！`;return}t.mp-=n.cost,n.id===5?I(t,n):L(t,n)},I=(e,a)=>{o.forEach(n=>{n.hp>0&&(n.hp=Math.min(f(n.name),n.hp+a.damage))}),$();const t=`${e.name} 對 我方成員 使出 ${a.name} 恢復了 <span class="heal-number">${a.damage}</span> HP！`;k(t)};let m=0;const L=(e,a)=>{const t=c[0];t.hp-=a.damage,m+=a.damage;let n=`${e.name} 對 ${t.name} 使出 ${a.name} 造成了 <span class="damage-number">${a.damage}</span> 傷害！`;t.hp>0&&m>=2e3&&(n+=T(),m=0),$(),k(n)},k=e=>{const a=document.getElementById("result"),t=o.every(l=>l.hp<=0),n=c[0].hp<=0;let s=`<div class="battle-message">${e}</div>`;if(t||n){h=!0;const l=n?`<div class="battle-result">恭喜擊敗${c[0].name}！</div>`:'<div class="battle-result">戰鬥失敗...</div>';s=`
      <div class="message-container">
        ${s}
        ${l}
      </div>
    `,a.innerHTML=s;const i=document.createElement("button");i.textContent="重新開始",i.className="reset-button",i.addEventListener("click",E);const d=document.createElement("div");d.className="button-container",d.appendChild(i),a.appendChild(d)}else s=`
      <div class="message-container">
        ${s}
      </div>
    `,a.innerHTML=s;M()},T=()=>{const e=c[0],a=e.skill[0];return o.forEach(t=>{t.hp>0&&(t.hp=Math.max(0,t.hp-a.damage))}),`<br>${e.name} 發動反擊！使出 ${a.name} 對我方全體造成 <span class="damage-number">${a.damage}</span> 傷害！`};

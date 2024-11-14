var E=i=>{throw TypeError(i)};var y=(i,t,e)=>t.has(i)||E("Cannot "+e);var s=(i,t,e)=>(y(i,t,"read from private field"),e?e.call(i):t.get(i)),c=(i,t,e)=>t.has(i)?E("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),o=(i,t,e,r)=>(y(i,t,"write to private field"),r?r.call(i,e):t.set(i,e),e),g=(i,t,e)=>(y(i,t,"access private method"),e);import"./main.BTRTY6jQ.js";class S{constructor(t,e){this.name=t,this.contry=e}hello(){console.log(`I am ${this.name}, I am from ${this.contry}`)}}const q=new S("Richard","Taiwan");q.hello();class w{constructor(t,e,r,a){this.id=t,this.name=e,this.price=r,this.image=a}}var n,m,v,C;class A{constructor(){c(this,v);c(this,n,new Map);c(this,m,new Map);s(this,m).set("itemsChanged",[])}addItem(t){const e=s(this,n).get(t)||0;s(this,n).set(t,e+1),g(this,v,C).call(this)}removeItem(t){const e=s(this,n).get(t);e===1?s(this,n).delete(t):e>1&&s(this,n).set(t,e-1),g(this,v,C).call(this)}getItems(){return s(this,n)}getTotalPrice(){let t=0;for(const[e,r]of s(this,n))t+=e.price*r;return t}onItemsChanged(t){s(this,m).get("itemsChanged").push(t)}}n=new WeakMap,m=new WeakMap,v=new WeakSet,C=function(){s(this,m).get("itemsChanged").forEach(t=>t())};var l,p,I,$,L;class M{constructor(t,e,r){c(this,$);c(this,l);c(this,p);c(this,I);o(this,l,t),o(this,p,e),o(this,I,r),this.render()}render(){s(this,l).innerHTML=`
          <h2>商品列表</h2>
          <div class="products-grid">
              ${s(this,p).map(t=>g(this,$,L).call(this,t)).join("")}
          </div>
      `,s(this,l).querySelectorAll(".add-to-cart-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.productId),r=s(this,p).find(a=>a.id===e);r&&s(this,I).addItem(r)})})}}l=new WeakMap,p=new WeakMap,I=new WeakMap,$=new WeakSet,L=function(t){return`
          <div class="product-card">
              <img src="${t.image}" alt="${t.name}" class="product-image">
              <h3>${t.name}</h3>
              <p>$${t.price}</p>
              <button class="add-to-cart-btn" data-product-id="${t.id}">
                  加入購物車
              </button>
          </div>
      `};var h,d,u,f,P;class T{constructor(t,e,r){c(this,f);c(this,h);c(this,d);c(this,u);o(this,h,t),o(this,d,e),o(this,u,r),s(this,d).onItemsChanged(()=>this.render()),this.render()}render(){s(this,h).innerHTML=`
          <h2>購物車</h2>
          <div class="cart-items">
              ${g(this,f,P).call(this)}
          </div>
          <div class="cart-total">
              總計: $${s(this,d).getTotalPrice()}
          </div>
      `,s(this,h).querySelectorAll(".cart-item-add").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.productId),r=s(this,u).find(a=>a.id===e);r&&s(this,d).addItem(r)})}),s(this,h).querySelectorAll(".cart-item-remove").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.productId),r=s(this,u).find(a=>a.id===e);r&&s(this,d).removeItem(r)})})}}h=new WeakMap,d=new WeakMap,u=new WeakMap,f=new WeakSet,P=function(){const t=Array.from(s(this,d).getItems());return t.length===0?"<p>購物車是空的</p>":t.map(([e,r])=>`
          <div class="cart-item">
              <img src="${e.image}" alt="${e.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <h4>${e.name}</h4>
                  <p>$${e.price} x ${r}</p>
                  <div class="cart-item-controls">
                      <button class="cart-item-remove" data-product-id="${e.id}">-</button>
                      <span>${r}</span>
                      <button class="cart-item-add" data-product-id="${e.id}">+</button>
                  </div>
              </div>
          </div>
      `).join("")};function b(){const i=[new w(1,"iPhone 15",35e3,"src/img/product-1.png"),new w(2,"MacBook Air",42e3,"src/img/product-2.png"),new w(3,"AirPods Pro",7500,"src/img/product-3.png")],t=new A,e=document.getElementById("shop");e.innerHTML=`
      <div class="container">
          <div class="products-section"></div>
          <div class="cart-section"></div>
      </div>
  `;const r=e.querySelector(".products-section"),a=e.querySelector(".cart-section");new M(r,i,t),new T(a,t,i)}document.addEventListener("DOMContentLoaded",b);

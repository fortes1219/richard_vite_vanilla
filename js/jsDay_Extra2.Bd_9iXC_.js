import"./main.DtBq9meY.js";let e=[];const l=()=>{const n=`https://restcountries.com/v2/name/${document.getElementById("queryStr").value}?fullText=false`;axios.get(n).then(t=>{e=t.data,c("Value")}).catch(t=>{e=[],c("Value"),console.error("Error:",t)})},c=s=>{const n=document.getElementById("result"),r=e.map(o=>o.name).map(o=>`<li>${o}</li>`).join("");n.innerHTML=`
    <p>${s} 共有 ${e.length} 筆資料</p>
    <p>搜尋結果：</p>
    <ul>
      ${r}
    </ul>
  `},a=document.getElementById("action");a.addEventListener("click",l);

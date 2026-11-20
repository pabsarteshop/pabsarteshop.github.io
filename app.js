const $ = s => document.querySelector(s);
const eur = n => n.toLocaleString("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0});
const bg = o => o.foto ? `url(${o.foto})` : o.color;
$("#y").textContent = new Date().getFullYear();

function pintar(f="todas"){
  $("#galeria").innerHTML = OBRAS.filter(o=>!o.oculto&&(f==="todas"||o.estado===f)).map(o=>`
    <article class="card ${o.estado}" data-id="${o.id}">
      <div class="img" style="background-image:${bg(o)}">${o.estado==="vendido"?'<span class="tag">Vendido</span>':""}</div>
      <div class="meta"><h3>${o.titulo}</h3><span class="p">${eur(o.precio)}</span></div>
    </article>`).join("");
}
pintar();

document.querySelectorAll(".filtros button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".filtros button").forEach(x=>x.classList.remove("on"));
  b.classList.add("on"); pintar(b.dataset.f);
});

$("#galeria").onclick = e => {
  const c = e.target.closest(".card"); if(!c) return;
  const o = OBRAS.find(x=>x.id==c.dataset.id);
  $("#m-img").style.backgroundImage = bg(o);
  $("#m-titulo").textContent = o.titulo;
  $("#m-det").textContent = DETALLE;
  $("#m-desc").textContent = o.desc;
  $("#m-precio").textContent = eur(o.precio) + " + envío";
  const btn = $("#m-btn");
  btn.href = o.pago;
  btn.textContent = o.estado==="vendido" ? "Vendido" : "Comprar";
  btn.classList.toggle("off", o.estado==="vendido");
  $("#modal").hidden = false;
};
const cerrar = () => $("#modal").hidden = true;
$(".x").onclick = cerrar;
$("#modal").onclick = e => { if(e.target.id==="modal") cerrar(); };
document.onkeydown = e => { if(e.key==="Escape") cerrar(); };

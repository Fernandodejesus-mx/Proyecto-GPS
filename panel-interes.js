// HU-48 · «Mi carrera»: lo que ve el jefe de carrera sobre el interés en su carrera (archivo de Gloria)
const interesEstado = { dias: 30 };

function abrirInteres() {
  mostrarSeccion("interes", "Mi carrera", "navInteres");
  pintarInteres();
}

function tarjetaInteres(valor, titulo, nota) {
  return `<div class="int-dato"><b>${escHTML(valor)}</b><span>${escHTML(titulo)}</span>${nota ? `<small>${escHTML(nota)}</small>` : ""}</div>`;
}

function graficaVisitas(porDia) {
  const max = Math.max(1, ...porDia.map(d => d.visitas));
  const barras = porDia.map(d => `<span class="int-barra" title="${escHTML(d.fecha)}: ${d.visitas}" style="height:${Math.max(2, Math.round(d.visitas * 100 / max))}%"></span>`).join("");
  const total = porDia.reduce((n, d) => n + d.visitas, 0);
  return `<div class="int-grafica" role="img" aria-label="Visitas por día: ${total} en total, el máximo en un día fue ${max}">${barras}</div>
    <p class="int-eje"><span>${escHTML(porDia[0].fecha)}</span><span>${escHTML(porDia[porDia.length - 1].fecha)}</span></p>`;
}

function dibujarInteres(r, carrera, dias) {
  const t = r.totales;
  if (r.sinDatos) {
    return `<p class="int-vacio">Todavía no hay datos de ${escHTML(carrera.nombre)} en los últimos ${dias} días. Los números empiezan a contarse cuando los alumnos usan el sitio.</p>`;
  }
  return `<div class="int-datos">
      ${tarjetaInteres(String(t.visitas), "visitas al perfil de la carrera", "Cada persona cuenta una vez por visita al sitio")}
      ${tarjetaInteres(r.pctPrimera + " %", "de los cuestionarios te dieron como primera opción", t.primera + " de " + r.cuestionarios + " cuestionarios")}
      ${tarjetaInteres(r.pctEnLista + " %", "de los cuestionarios te recomendaron", t.enLista + " de " + r.cuestionarios + " cuestionarios")}
      ${tarjetaInteres(String(t.duelo), "veces que ganó un duelo de carreras", "")}
      ${tarjetaInteres(String(t.huellas), "veces que vieron tus huellas", "")}
      ${tarjetaInteres(String(t.mapa), "veces que tocaron tu edificio en el mapa", "")}
      ${tarjetaInteres(String(t.quieroIr), "«Quiero ir» en tus eventos", "")}
      ${tarjetaInteres(r.lugar ? "N.º " + r.lugar + " de " + r.de : "—", "en interacciones entre todas las carreras", r.interacciones + " interacciones: visitas, huellas, mapa, «Quiero ir», duelos y cuestionarios")}
    </div>
    <h3>Visitas por día</h3>${graficaVisitas(r.porDia)}`;
}

function pintarInteres() {
  const sec = document.getElementById("interes");
  const jefe = sesionJefe.jefe;
  if (!jefe) {
    sec.innerHTML = `<div class="int-aviso"><h2>Mi carrera</h2><p>Esta sección es solo para jefes de carrera. Inicia sesión con «Acceso jefes de carrera».</p></div>`;
    return;
  }
  const c = carreras.find(x => x.id === jefe.carreraId);
  const dias = interesEstado.dias;
  sec.innerHTML = `<div class="int carrera-${CARRERA_SLUG[c.id]}">
    <div class="int-cab"><p class="eyebrow">MI CARRERA · ${escHTML(c.area)}</p><h1>${escHTML(c.nombre)}</h1>
      <p class="int-sub">Así ven los aspirantes tu carrera en Tu Carrera Tec. Los datos son anónimos: solo conteos por día.</p></div>
    <div class="int-barra-sup"><label for="intDias">Periodo</label>
      <select id="intDias">${[7, 30, 90].map(n => `<option value="${n}"${n === dias ? " selected" : ""}>Últimos ${n} días</option>`).join("")}</select>
      <button type="button" id="intActualizar" class="int-sec">Actualizar</button></div>
    <div id="intCuerpo" aria-live="polite"><p class="int-vacio">Cargando…</p></div></div>`;
  document.getElementById("intDias").addEventListener("change", e => { interesEstado.dias = Number(e.target.value); pintarInteres(); });
  document.getElementById("intActualizar").addEventListener("click", pintarInteres);
  leerMetricas(dias).then(docs => {
    const cuerpo = document.getElementById("intCuerpo");
    if (cuerpo) cuerpo.innerHTML = dibujarInteres(resumenInteres(docs, c.id, dias), c, dias);
  }).catch(() => {
    const cuerpo = document.getElementById("intCuerpo");
    if (cuerpo) cuerpo.innerHTML = `<p class="int-vacio">No pudimos leer los datos. Revisa tu conexión e inténtalo de nuevo.</p>`;
  });
}

// El botón «Mi carrera» solo existe para quien tiene sesión de jefe
function agregarBotonInteres() {
  const cab = document.querySelector(".ev-panel-cab");
  if (!sesionJefe.jefe || !cab || document.getElementById("evInteres")) return;
  const b = document.createElement("button");
  b.type = "button"; b.id = "evInteres"; b.className = "ev-sec"; b.textContent = "Ver el interés en mi carrera";
  b.addEventListener("click", abrirInteres);
  cab.appendChild(b);
}
document.addEventListener("sesion-jefe", e => {
  document.getElementById("navInteres").classList.toggle("hidden", !e.detail);
  if (!e.detail && !document.getElementById("interes").classList.contains("hidden")) document.getElementById("navInicio").click();
  agregarBotonInteres();
});
document.addEventListener("calendario:render", agregarBotonInteres);
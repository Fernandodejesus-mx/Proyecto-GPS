// HU-38 · Une textos oficiales, titulares y retícula en la lista de apartados de cada carrera (archivo de Gloria)
// Devuelve, para una carrera, sus 4 apartados en orden, con la forma:
//   { id, orden, nombre, titular, icono, validado, bloques, reticula }
//   bloques  = texto oficial (lista de bloques p / h / ul) en ingreso, egreso y laboral
//   reticula = { titulo, especialidades:[{nombre, pdf}] } solo en el apartado "reticula"
const APARTADOS_BASE = [
  { id: "ingreso",  orden: 1, nombre: "Perfil de Ingreso", icono: "🎓" },
  { id: "egreso",   orden: 2, nombre: "Perfil de Egreso",  icono: "🧭" },
  { id: "laboral",  orden: 3, nombre: "Campo laboral",     icono: "💼" },
  { id: "reticula", orden: 4, nombre: "Retícula",          icono: "🗺️" }
];

function escaparPerfil(t) {
  return String(t).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function obtenerApartados(carreraId) {
  const tit = perfilTitulares[carreraId] || {};
  return APARTADOS_BASE.map(a => {
    const t = (a.id === "laboral" ? perfilTitularesLaboral[carreraId] : tit[a.id]) || {};
    const origen = a.id === "laboral" ? perfilLaboral : perfilIngresoEgreso;
    return {
      id: a.id, orden: a.orden, nombre: a.nombre,
      titular: t.titular || a.nombre,
      icono: t.icono || a.icono,
      validado: !!t.validado,
      bloques: a.id === "reticula" ? [] : ((origen[carreraId] && origen[carreraId][a.id]) || []),
      reticula: a.id === "reticula" ? (perfilReticula[carreraId] || null) : null
    };
  });
}

// ---- HTML del texto oficial (lo usan el reverso de la carta y la vista de lista)
function listaPerfilHTML(items) {
  return "<ul>" + items.map(it => typeof it === "string"
    ? `<li>${escaparPerfil(it)}</li>`
    : `<li>${escaparPerfil(it.x)}<ul>${(it.sub || []).map(s => `<li>${escaparPerfil(s)}</li>`).join("")}</ul></li>`
  ).join("") + "</ul>";
}
function textoApartadoHTML(ap) {
  if (ap.id === "reticula") {
    const r = ap.reticula;
    if (!r) return `<p class="carta-vacio">Este apartado aún no está disponible.</p>`;
    return `<p><strong>${escaparPerfil(r.titulo)}</strong></p><h4>Especialidades</h4><ul class="carta-reticula">` +
      r.especialidades.map(e => `<li>${escaparPerfil(e.nombre)}<br><a class="carta-pdf" href="${encodeURI(e.pdf)}" target="_blank" rel="noopener">Ver retícula oficial (PDF) ↗</a></li>`).join("") + `</ul>`;
  }
  if (!ap.bloques.length) return `<p class="carta-vacio">La página oficial del ITSX aún no publica este apartado para esta carrera.</p>`;
  return ap.bloques.map(b => {
    if (b.t === "h") return `<h4>${escaparPerfil(b.x)}</h4>`;
    if (b.t === "ul") return listaPerfilHTML(b.x);
    return `<p>${escaparPerfil(b.x)}</p>`;
  }).join("");
}

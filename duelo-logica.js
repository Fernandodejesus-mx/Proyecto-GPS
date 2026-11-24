// HU-46 · Lógica del torneo del Duelo de carreras (archivo de Guillermo). No toca la pantalla.
// Regla: la primera carrera de la lista es la campeona; enfrenta a cada retadora una por una.
// La que gana sigue; la que pierde sale. Al final queda una sola.
function generadorAzar(semilla) {
  let a = (semilla >>> 0) || 1;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function crearTorneo(ids, semilla) {
  const unicos = [...new Set(ids)];
  if (unicos.length < 2 || unicos.length > 5) throw new Error("El duelo necesita entre 2 y 5 carreras.");
  return { campeona: unicos[0], retadoras: unicos.slice(1), duelo: 0, total: unicos.length - 1, historial: [], actual: null, azar: generadorAzar(semilla) };
}

// El duelo que toca ahora (si se pide dos veces, es el mismo)
function siguienteDuelo(t) {
  if (!t.retadoras.length) return null;
  if (!t.actual) {
    const retadora = t.retadoras[0];
    const invertir = t.azar() < 0.5;
    t.actual = {
      numero: t.duelo + 1, total: t.total, dimension: DIMENSIONES[t.duelo % DIMENSIONES.length],
      izquierda: invertir ? retadora : t.campeona, derecha: invertir ? t.campeona : retadora
    };
  }
  return t.actual;
}

function votar(t, ganadoraId) {
  const d = siguienteDuelo(t);
  if (!d || (ganadoraId !== d.izquierda && ganadoraId !== d.derecha)) throw new Error("Esa carrera no está en este duelo.");
  t.historial.push({ numero: d.numero, izquierda: d.izquierda, derecha: d.derecha, ganadora: ganadoraId });
  t.campeona = ganadoraId;
  t.retadoras.shift();
  t.duelo++;
  t.actual = null;
}

function ganadoraFinal(t) {
  return t.retadoras.length === 0 ? t.campeona : null;
}

// Carreras para el duelo a partir del resultado del cuestionario (Resultados.procesar), máximo 5
function idsDeResultado(r, max) {
  if (!r || r.sinInteres) return [];
  const ids = [];
  r.destacadas.forEach(a => a.carreraIds.forEach(id => { if (!ids.includes(id)) ids.push(id); }));
  return ids.slice(0, max || 5);
}
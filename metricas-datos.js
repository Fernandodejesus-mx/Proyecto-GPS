// HU-48 · Interés en cada carrera: contadores anónimos por día
// No se guarda ningún dato de personas: solo cuántas veces pasó algo en cada carrera cada día.
const CONTADORES = {
  visitas: "Visitas al perfil de la carrera",
  huellas: "Veces que vieron sus huellas",
  mapa: "Veces que tocaron su edificio en el mapa",
  quieroIr: "«Quiero ir» en sus eventos",
  duelo: "Veces que ganó un duelo de carreras",
  primera: "Cuestionarios donde salió como primera opción",
  enLista: "Cuestionarios donde salió entre las recomendadas",
  cuestionarios: "Cuestionarios completados (total del sitio)"
};
const SUMAN_INTERES = ["visitas", "huellas", "mapa", "quieroIr", "duelo", "primera", "enLista"];

function fechaMenos(dias, hoy) {
  const [a, m, d] = (hoy || hoyISO()).split("-").map(Number);
  const f = new Date(a, m - 1, d - dias);
  return f.getFullYear() + "-" + String(f.getMonth() + 1).padStart(2, "0") + "-" + String(f.getDate()).padStart(2, "0");
}
function idMetrica(carreraId, fecha) { return "c" + carreraId + "_" + fecha; }

// Cada cosa se cuenta una sola vez por visita al sitio (así recargar la página no infla los números)
const metricasVistas = {};
function unaVez(clave) {
  try {
    if (sessionStorage.getItem(clave)) return false;
    sessionStorage.setItem(clave, "1");
    return true;
  } catch (e) {
    if (metricasVistas[clave]) return false;
    metricasVistas[clave] = true;
    return true;
  }
}

// Suma 1 al contador de una carrera (0 = total del sitio) en el día de hoy. Nunca interrumpe la página.
function registrarMetrica(carreraId, contador, clave) {
  if (!firebaseActivo || !(contador in CONTADORES)) return Promise.resolve(false);
  if (sesionJefe.jefe) return Promise.resolve(false);   // lo que hace un jefe al revisar el sitio no cuenta como interés
  if (!unaVez("tct_m_" + (clave || carreraId + "_" + contador))) return Promise.resolve(false);
  const fecha = hoyISO();
  const datos = { carreraId: carreraId, fecha: fecha };
  datos[contador] = firebase.firestore.FieldValue.increment(1);
  return dbEventos.collection("metricas").doc(idMetrica(carreraId, fecha)).set(datos, { merge: true })
    .then(() => true).catch(() => false);
}

// Solo un jefe con sesión puede leerlas (lo exigen las reglas de Firebase)
function leerMetricas(dias) {
  return dbEventos.collection("metricas").where("fecha", ">=", fechaMenos(dias - 1)).get()
    .then(s => s.docs.map(d => d.data()));
}

function totalesDeCarrera(docs, carreraId) {
  const t = {};
  Object.keys(CONTADORES).forEach(c => { t[c] = 0; });
  docs.forEach(d => { if (d.carreraId === carreraId) Object.keys(CONTADORES).forEach(c => { t[c] += d[c] || 0; }); });
  return t;
}
function totalCuestionarios(docs) {
  return docs.filter(d => d.carreraId === 0).reduce((n, d) => n + (d.cuestionarios || 0), 0);
}
function porcentaje(parte, total) { return total ? Math.round(parte * 1000 / total) / 10 : 0; }
function interaccionesDe(t) { return SUMAN_INTERES.reduce((n, c) => n + (t[c] || 0), 0); }

// Todo lo que muestra la pantalla «Mi carrera»
function resumenInteres(docs, carreraId, dias, hoy) {
  const totales = totalesDeCarrera(docs, carreraId);
  const cuestionarios = totalCuestionarios(docs);
  const interacciones = interaccionesDe(totales);
  const ranking = carreras.map(c => ({ id: c.id, n: interaccionesDe(totalesDeCarrera(docs, c.id)) }))
    .sort((a, b) => b.n - a.n || a.id - b.id);
  const porDia = [];
  for (let i = dias - 1; i >= 0; i--) {
    const fecha = fechaMenos(i, hoy);
    const v = docs.filter(d => d.carreraId === carreraId && d.fecha === fecha).reduce((n, d) => n + (d.visitas || 0), 0);
    porDia.push({ fecha: fecha, visitas: v });
  }
  return {
    totales, cuestionarios, interacciones, porDia,
    pctPrimera: porcentaje(totales.primera, cuestionarios),
    pctEnLista: porcentaje(totales.enLista, cuestionarios),
    lugar: interacciones ? ranking.findIndex(r => r.id === carreraId) + 1 : null,
    de: ranking.length,
    sinDatos: interacciones === 0 && cuestionarios === 0
  };
}
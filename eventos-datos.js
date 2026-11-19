// Contenido temporal de la Base (T-157): se llena más adelante.
// HU-44 · Datos de eventos y acceso de jefes de carrera (archivo de Gloria)
let dbEventos = null;
let authJefe = null;

// Conecta con Firebase. Si algo falla, la página sigue funcionando con los eventos de ejemplo.
function iniciarFirebase() {
  if (typeof firebase === "undefined" || FIREBASE_CONFIG.projectId.indexOf("PEGA_AQUI") === 0) return false;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    dbEventos = firebase.firestore();
    authJefe = firebase.auth();
    console.log("Firebase conectado");
    return true;
  } catch (e) {
    console.warn("Firebase no disponible:", e.message);
    return false;
  }
}
const firebaseActivo = iniciarFirebase();
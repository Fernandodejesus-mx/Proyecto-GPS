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
// ---- Sesión del jefe de carrera
const sesionJefe = { jefe: null, error: "" };   // jefe = { uid, correo, carreraId } o null

function mensajeErrorAcceso(codigo) {
  const m = {
    "auth/invalid-email": "Escribe un correo válido.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/wrong-password": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "Correo o contraseña incorrectos.",
    "auth/too-many-requests": "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
    "auth/network-request-failed": "No hay conexión. Revisa tu internet.",
    "sin-servidor": "El acceso no está disponible en este momento.",
    "no-jefe": "Tu cuenta no está registrada como jefe de carrera."
  };
  return m[codigo] || "No se pudo iniciar sesión. Inténtalo de nuevo.";
}

function iniciarSesion(correo, clave) {
  if (!firebaseActivo) return Promise.reject({ code: "sin-servidor" });
  return authJefe.signInWithEmailAndPassword(correo, clave);
}

function cerrarSesion() {
  return firebaseActivo ? authJefe.signOut() : Promise.resolve();
}

function avisarSesion() {
  document.dispatchEvent(new CustomEvent("sesion-jefe", { detail: sesionJefe.jefe }));
}

// Cada vez que Firebase cambia de sesión, buscamos a qué carrera pertenece el jefe
function observarSesion() {
  if (!firebaseActivo) return;
  authJefe.onAuthStateChanged(user => {
    if (!user) { sesionJefe.jefe = null; avisarSesion(); return; }
    dbEventos.collection("jefes").doc(user.uid).get().then(doc => {
      if (!doc.exists) {
        sesionJefe.jefe = null; sesionJefe.error = "no-jefe";
        authJefe.signOut();
      } else {
        sesionJefe.error = "";
        sesionJefe.jefe = { uid: user.uid, correo: user.email, carreraId: doc.data().carreraId };
      }
      avisarSesion();
    }).catch(() => { sesionJefe.jefe = null; avisarSesion(); });
  });
}
observarSesion();
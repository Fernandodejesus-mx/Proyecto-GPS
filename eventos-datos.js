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
// ---- Eventos: validación y escritura
const TIPOS_EVENTO = { expo: "Exposición", taller: "Taller", concurso: "Concurso", visita: "Visita", conferencia: "Conferencia" };

function hoyISO() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

// Devuelve la lista de errores (vacía si el evento es válido)
function validarEvento(ev, hoy) {
  const e = [];
  const titulo = (ev.titulo || "").trim();
  if (titulo.length < 5 || titulo.length > 80) e.push("El título debe tener entre 5 y 80 caracteres.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ev.fecha || "") || isNaN(new Date(ev.fecha + "T00:00:00"))) e.push("Elige una fecha válida.");
  else if (ev.fecha < hoy) e.push("La fecha no puede ser anterior a hoy.");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(ev.hora || "")) e.push("Escribe la hora en formato de 24 horas, por ejemplo 10:30.");
  if ((ev.lugar || "").trim().length < 3) e.push("Escribe el lugar del evento.");
  if (!TIPOS_EVENTO[ev.tipo]) e.push("Elige el tipo de evento.");
  if ((ev.descripcion || "").length > 400) e.push("La descripción no puede pasar de 400 caracteres.");
  if (ev.enlace && !/^https:\/\/\S+$/.test(ev.enlace)) e.push("El enlace debe empezar con https://");
  return e;
}

// La carrera siempre sale de la sesión, nunca del formulario
function guardarEvento(ev, id) {
  if (!sesionJefe.jefe) return Promise.reject(new Error("Inicia sesión primero."));
  const datos = {
    carreraId: sesionJefe.jefe.carreraId,
    titulo: ev.titulo.trim(), fecha: ev.fecha, hora: ev.hora,
    lugar: ev.lugar.trim(), edificio: ev.edificio || "", tipo: ev.tipo,
    descripcion: (ev.descripcion || "").trim(), enlace: (ev.enlace || "").trim()
  };
  const col = dbEventos.collection("eventos");
  return id ? col.doc(id).set(datos) : col.add(datos);
}

function borrarEvento(id) {
  return dbEventos.collection("eventos").doc(id).delete();
}

function eventosDeMiCarrera() {
  return dbEventos.collection("eventos").where("carreraId", "==", sesionJefe.jefe.carreraId).get()
    .then(s => s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora)));
}
// ---- Lectura pública de eventos (con respaldo si el servidor no responde)
const eventosEstado = { origen: "ninguno", lista: [] };   // origen: servidor | respaldo

function ordenarEventos(lista) {
  return lista.slice().sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
}

function leerServidor() {
  const limite = new Promise((_, rechazar) => setTimeout(() => rechazar(new Error("tiempo agotado")), 4000));
  // Solo se leen los eventos de hoy en adelante: así se gastan menos lecturas del plan gratuito
  const lectura = dbEventos.collection("eventos").where("fecha", ">=", hoyISO()).get().then(s => s.docs.map(d => ({ id: d.id, ...d.data() })));
  return Promise.race([lectura, limite]);
}

function cargarEventos() {
  const respaldo = () => {
    eventosEstado.origen = "respaldo";
    eventosEstado.lista = ordenarEventos(EVENTOS_EJEMPLO);
    return eventosEstado.lista;
  };
  if (!firebaseActivo) return Promise.resolve(respaldo());
  return leerServidor().then(lista => {
    eventosEstado.origen = "servidor";
    eventosEstado.lista = ordenarEventos(lista);
    return eventosEstado.lista;
  }).catch(respaldo);
}

function filtrarFuturos(lista, carreraId, hoy) {
  return lista.filter(e => e.fecha >= hoy && (!carreraId || e.carreraId === carreraId));
}

// Contrato público: lo usan el mapa y el duelo
function obtenerEventosFuturos(carreraId) {
  return cargarEventos().then(lista => filtrarFuturos(lista, carreraId, hoyISO()));
}
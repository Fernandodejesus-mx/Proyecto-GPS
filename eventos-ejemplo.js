// HU-44 · Eventos de ejemplo para cuando el servidor no responde (archivo de Gloria).
// Las fechas se calculan desde hoy para que siempre sean futuras. Todos están marcados como ejemplo.
function fechaMas(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

const EVENTOS_EJEMPLO = [
  { id: "ej-1", carreraId: 1, titulo: "Muestra de proyectos de Sistemas", fecha: fechaMas(7), hora: "10:00", lugar: "Edificio de Sistemas", edificio: "E", tipo: "expo", descripcion: "Los estudiantes presentan sus proyectos de software. Evento de ejemplo.", enlace: "", ejemplo: true },
  { id: "ej-2", carreraId: 2, titulo: "Taller de mejora de procesos", fecha: fechaMas(14), hora: "12:30", lugar: "Laboratorio de Industrial", edificio: "D", tipo: "taller", descripcion: "Una dinámica para mejorar un proceso real. Evento de ejemplo.", enlace: "", ejemplo: true },
  { id: "ej-3", carreraId: 10, titulo: "Visita a la cocina de Gastronomía", fecha: fechaMas(21), hora: "11:00", lugar: "Taller de Gastronomía", edificio: "K", tipo: "visita", descripcion: "Recorrido por el taller y degustación. Evento de ejemplo.", enlace: "", ejemplo: true }
];
// HU-43 · Huellas del ITSX: eventos que ya ocurrieron en cada carrera (archivo de Fernando).
// Solo hay 3 de EJEMPLO escritos por el equipo; todos llevan ejemplo: true.
// Para agregar uno real, copia un bloque, cambia sus datos y quita la línea "ejemplo: true".
const TIPOS_HUELLA = { expo: "Exposición", taller: "Taller", concurso: "Concurso", visita: "Visita", conferencia: "Conferencia" };

const EVENTOS_PASADOS = [
  { id: "hp-1", carreras: [1], titulo: "Muestra de proyectos de Sistemas", fecha: "2025-05-14", tipo: "expo", edificio: "E",
    descripcion: "Estudiantes de Sistemas presentaron aplicaciones web y móviles a visitantes de bachillerato.", ejemplo: true },
  { id: "hp-2", carreras: [2, 5], titulo: "Reto de Industrial y Electrónica", fecha: "2025-10-08", tipo: "concurso", edificio: "D",
    descripcion: "Equipos mixtos resolvieron un reto de mejora de una línea de producción con sensores.", ejemplo: true },
  { id: "hp-3", carreras: [10], titulo: "Taller abierto de cocina mexicana", fecha: "2026-03-19", tipo: "taller", edificio: "K",
    descripcion: "Aspirantes cocinaron junto a estudiantes de Gastronomía en el taller de la carrera.", ejemplo: true }
];

// Huellas de una carrera en orden cronológico; "tipo" es opcional para filtrar
function obtenerHuellas(carreraId, tipo) {
  return EVENTOS_PASADOS
    .filter(h => h.carreras.includes(carreraId) && (!tipo || h.tipo === tipo))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}
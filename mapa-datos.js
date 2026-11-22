// HU-47 · Mapa del campus: imagen y medidas de las zonas (archivo de Fernando)
// La imagen es el mapa oficial del ITSX (recurso de terceros: se lista en el expediente INDAUTOR).
// Cada zona es [x, y, ancho, alto] en píxeles de la imagen, que mide 1030 × 490.
const MAPA_IMAGEN = "recursos/mapa-itsx.png";
const MAPA_ANCHO = 1030;
const MAPA_ALTO = 490;

// Qué carreras usan cada edificio y qué hay en él (según la lista oficial «Puntos de interés»).
// PENDIENTE de confirmar con el equipo: Civil comparte el edificio A; Gestión Empresarial usa N y O.
const EDIFICIOS = {
  A: { nombre: "Edificio A", carreras: [9, 8, 7], zonas: [[680, 186, 94, 42]],
    puntos: ["Oficinas administrativas", "Oficinas académicas", "Aulas", "Laboratorio de Bioquímica", "Laboratorio de Mecatrónica", "Laboratorio de Física", "Baños"] },
  B: { nombre: "Edificio B", carreras: [], zonas: [[505, 298, 90, 38]],
    puntos: ["Aulas", "Baños"] },
  C: { nombre: "Edificio C", carreras: [], zonas: [[513, 181, 93, 41]],
    puntos: ["Aulas", "Baños"] },
  D: { nombre: "Edificio Industrial D", carreras: [2, 5, 8], zonas: [[371, 90, 90, 69]],
    puntos: ["Auditorio", "Sala de Titulación", "Laboratorio de Industrial", "Laboratorio de Robótica", "Taller de Electrónica", "Laboratorio de Control de Calidad", "Baños"] },
  E: { nombre: "Edificio Sistemas E", carreras: [1], zonas: [[267, 60, 88, 78]],
    puntos: ["Aulas", "Cubículos de profesores", "Laboratorio de Sistemas Computacionales", "Baños"] },
  F: { nombre: "Edificio F", carreras: [6], zonas: [[468, 67, 39, 141], [513, 79, 31, 96]],
    puntos: ["Aulas", "Laboratorio de Industrias Alimentarias"] },
  G: { nombre: "Edificio G", carreras: [], zonas: [[779, 126, 97, 20], [779, 152, 21, 67], [855, 158, 22, 70]],
    puntos: ["CLE · Coordinación de Lenguas Extranjeras"] },
  H: { nombre: "Edificio de Investigación H", carreras: [], zonas: [[183, 50, 25, 82]],
    puntos: ["Oficinas académicas", "Laboratorios de cómputo en la nube", "Taller de Posgrados e Investigación", "Centro de reciclaje", "Área experimental", "Baños"] },
  I: { nombre: "Edificio I · Centro de información", carreras: [], zonas: [[212, 55, 47, 92]],
    puntos: ["Biblioteca", "Aulas de posgrado", "Oficinas de Cultura y Deporte"] },
  J: { nombre: "Edificio J", carreras: [3], zonas: [[561, 360, 34, 40], [524, 393, 33, 17]],
    puntos: ["Taller de Electromecánica"] },
  K: { nombre: "Edificio K", carreras: [10], zonas: [[379, 39, 80, 30]],
    puntos: ["Taller de Gastronomía", "Coordinaciones académicas", "Baños"] },
  L: { nombre: "Edificio L", carreras: [], zonas: [[49, 225, 24, 74], [49, 312, 86, 21], [49, 344, 86, 21]],
    puntos: ["Aulas", "Baños"] },
  M: { nombre: "Edificio M", carreras: [7], zonas: [[794, 254, 78, 54]],
    puntos: ["Laboratorio de Bioquímica"] },
  N: { nombre: "Edificio N", carreras: [4], zonas: [[925, 285, 27, 66]],
    puntos: ["Aulas", "Sala de usos múltiples", "Baños"] },
  O: { nombre: "Edificio O", carreras: [4], zonas: [[925, 213, 27, 66]],
    puntos: ["Aulas"] }
};

// Lugares que no son edificios de una carrera (capa «Puntos de interés»)
const PUNTOS_INTERES = [
  { id: "consultorio", nombre: "Consultorio médico escolar", icono: "🩺", descripcion: "Atención médica básica para la comunidad estudiantil.", zonas: [[609, 200, 34, 24]] },
  { id: "domo", nombre: "Domo", icono: "🏟️", descripcion: "Espacio techado para actividades deportivas y eventos.", zonas: [[143, 317, 99, 99]] },
  { id: "campo", nombre: "Campo deportivo", icono: "⚽", descripcion: "Cancha para deportes y actividades al aire libre.", zonas: [[248, 318, 185, 98]] },
  { id: "humedales", nombre: "Humedales", icono: "🌿", descripcion: "Áreas verdes del campus.", zonas: [[276, 258, 125, 39], [783, 79, 104, 32]] },
  { id: "area-exp", nombre: "Área experimental", icono: "🧪", descripcion: "Espacio abierto para prácticas y proyectos.", zonas: [[125, 50, 54, 82]] },
  { id: "estacionamiento", nombre: "Estacionamiento de estudiantes", icono: "🅿️", descripcion: "Lugar para estacionar vehículos de estudiantes.", zonas: [[740, 367, 217, 116]] },
  { id: "entradas", nombre: "Entradas", icono: "🚪", descripcion: "Entrada principal, peatonal y de estacionamiento.", zonas: [[52, 138, 62, 14], [972, 132, 29, 69], [973, 366, 31, 76]] }
];

// Edificios donde se encuentra una carrera
function edificiosDeCarrera(carreraId) {
  return Object.keys(EDIFICIOS).filter(l => EDIFICIOS[l].carreras.includes(carreraId));
}

// HU-47 · Mapa del campus: imagen y medidas de las zonas
// Imagen oficial del ITSX.
// Coordenadas ajustadas a la imagen original de 1030 × 490 px.

const MAPA_IMAGEN = "recursos/mapa-itsx.png";
const MAPA_ANCHO = 1030;
const MAPA_ALTO = 490;

// Cada zona utiliza [x, y, ancho, alto].
// Las coordenadas corresponden a la ubicación visual de cada edificio.

// Edificios del campus
const EDIFICIOS = {
  A: {
    nombre: "Edificio A",
    carreras: [9, 8, 7],
    zonas: [[652, 201, 94, 41]],
    puntos: [
      "Oficinas administrativas",
      "Oficinas académicas",
      "Aulas",
      "Laboratorio de Bioquímica",
      "Laboratorio de Mecatrónica",
      "Laboratorio de Física",
      "Baños"
    ]
  },

  B: {
    nombre: "Edificio B",
    carreras: [],
    zonas: [[481, 304, 89, 38]],
    puntos: ["Aulas", "Baños"]
  },

  C: {
    nombre: "Edificio C",
    carreras: [],
    zonas: [[487, 195, 94, 40]],
    puntos: ["Aulas", "Baños"]
  },

  D: {
    nombre: "Edificio Industrial D",
    carreras: [2, 5, 8],
    zonas: [[348, 111, 88, 65]],
    puntos: [
      "Auditorio",
      "Sala de Titulación",
      "Laboratorio de Industrial",
      "Laboratorio de Robótica",
      "Taller de Electrónica",
      "Laboratorio de Control de Calidad",
      "Baños"
    ]
  },

  E: {
    nombre: "Edificio Sistemas E",
    carreras: [1],
    zonas: [[245, 84, 88, 73]],
    puntos: [
      "Aulas",
      "Cubículos de profesores",
      "Laboratorio de Sistemas Computacionales",
      "Baños"
    ]
  },

  F: {
    nombre: "Edificio F",
    carreras: [6],
    zonas: [
      [443, 90, 40, 132],
      [487, 101, 32, 88]
    ],
    puntos: [
      "Aulas",
      "Laboratorio de Industrias Alimentarias"
    ]
  },

  G: {
    nombre: "Edificio G",
    carreras: [],
    zonas: [
      [750, 145, 97, 20],
      [750, 171, 22, 61],
      [825, 177, 22, 64]
    ],
    puntos: [
      "CLE · Coordinación de Lenguas Extranjeras"
    ]
  },

  H: {
    nombre: "Edificio de Investigación H",
    carreras: [],
    zonas: [[163, 75, 25, 78]],
    puntos: [
      "Oficinas académicas",
      "Laboratorios de cómputo en la nube",
      "Taller de Posgrados e Investigación",
      "Centro de reciclaje",
      "Área experimental",
      "Baños"
    ]
  },

  I: {
    nombre: "Edificio I · Centro de información",
    carreras: [],
    zonas: [[191, 79, 47, 86]],
    puntos: [
      "Biblioteca",
      "Aulas de posgrado",
      "Oficinas de Cultura y Deporte"
    ]
  },

  J: {
    nombre: "Edificio J",
    carreras: [3],
    zonas: [
      [534, 360, 38, 42],
      [498, 392, 33, 16]
    ],
    puntos: ["Taller de Electromecánica"]
  },

  K: {
    nombre: "Edificio K",
    carreras: [10],
    zonas: [[355, 65, 80, 29]],
    puntos: [
      "Taller de Gastronomía",
      "Coordinaciones académicas",
      "Baños"
    ]
  },

  L: {
    nombre: "Edificio L",
    carreras: [],
    zonas: [
      [30, 208, 24, 22],
      [30, 238, 24, 68],
      [30, 317, 85, 20],
      [30, 347, 85, 20]
    ],
    puntos: ["Aulas", "Baños"]
  },

  M: {
    nombre: "Edificio M",
    carreras: [7],
    zonas: [[765, 264, 78, 50]],
    puntos: ["Laboratorio de Bioquímica"]
  },

  N: {
    nombre: "Edificio N",
    carreras: [4],
    zonas: [[893, 292, 28, 62]],
    puntos: [
      "Aulas",
      "Sala de usos múltiples",
      "Baños"
    ]
  },

  O: {
    nombre: "Edificio O",
    carreras: [4],
    zonas: [[893, 226, 28, 62]],
    puntos: ["Aulas"]
  }
};


// Lugares que no son edificios de una carrera.
// Capa: Puntos de interés.

const PUNTOS_INTERES = [
  {
    id: "consultorio",
    nombre: "Consultorio médico escolar",
    icono: "🩺",
    descripcion: "Atención médica básica para la comunidad estudiantil.",
    zonas: [[584, 216, 20, 19]]
  },

  {
    id: "domo",
    nombre: "Domo",
    icono: "🏟️",
    descripcion: "Espacio techado para actividades deportivas y eventos.",
    zonas: [[123, 321, 99, 93]]
  },

  {
    id: "campo",
    nombre: "Campo deportivo",
    icono: "⚽",
    descripcion: "Cancha para deportes y actividades al aire libre.",
    zonas: [[227, 322, 183, 91]]
  },

  {
    id: "humedales",
    nombre: "Humedales",
    icono: "🌿",
    descripcion: "Áreas verdes del campus.",
    zonas: [
      [254, 267, 124, 39],
      [754, 101, 104, 32]
    ]
  },

  {
    id: "area-exp",
    nombre: "Área experimental",
    icono: "🧪",
    descripcion: "Espacio abierto para prácticas y proyectos.",
    zonas: [[105, 75, 54, 78]]
  },

  {
    id: "estacionamiento",
    nombre: "Estacionamiento de estudiantes",
    icono: "🅿️",
    descripcion: "Lugar para estacionar vehículos de estudiantes.",
    zonas: [[711, 367, 216, 109]]
  },

  {
    id: "entradas",
    nombre: "Entradas",
    icono: "🚪",
    descripcion: "Entrada principal, peatonal y de estacionamiento.",
    zonas: [
      [33, 156, 62, 14],
      [940, 150, 30, 66],
      [941, 367, 30, 72]
    ]
  }
];


// Obtener los edificios donde se encuentra una carrera.
function edificiosDeCarrera(carreraId) {
  return Object.keys(EDIFICIOS).filter(
    edificio => EDIFICIOS[edificio].carreras.includes(carreraId)
  );
}

// HU-38 · Perfil de Ingreso y Perfil de Egreso OFICIALES (Sprint 4)
// Fuente: página oficial de cada carrera en itsx.edu.mx/oferta-academica/
// REGLA: el texto se copia TAL CUAL de la página oficial (con sus errores). No se resume ni se corrige.
// Clave = id de la carrera en script.js. Cada apartado es una lista de "bloques":
//   { t: "p",  x: "Texto de un párrafo" }
//   { t: "h",  x: "Subtítulo (ej. Conocimientos)" }
//   { t: "ul", x: ["viñeta 1", "viñeta 2"] }          (una viñeta con sub-viñetas: { x: "viñeta", sub: ["a", "b"] })
const perfilIngresoEgreso = {
  1: { ingreso: [], egreso: [] },   // Sistemas Computacionales
  2: { ingreso: [], egreso: [] },   // Industrial
  3: { ingreso: [], egreso: [] },   // Electromecánica
  4: { ingreso: [], egreso: [] },   // Gestión Empresarial
  5: { ingreso: [], egreso: [] },   // Electrónica
  6: { ingreso: [], egreso: [] },   // Industrias Alimentarias
  7: { ingreso: [], egreso: [] },   // Bioquímica
  8: { ingreso: [], egreso: [] },   // Mecatrónica
  9: {                              // Civil (ejemplo ya capturado, tomado de la captura de pantalla oficial)
    ingreso: [
      { t: "p", x: "Un aspirante a estudiar la carrera de Ingeniería Civil debe dominar las habilidad en las áreas de matemáticas, física y química, también debe poseer habilidades analíticas y de pensamiento crítico, una mentalidad de resolución de problemas y habilidades de trabajo en equipo." }
    ],
    egreso: [
      { t: "p", x: "Un estudiante de Ingeniería Civil al graduarse debe tener la capacidad de aplicar conocimientos y técnicas para diseñar y construir infraestructuras que satisfagan las necesidades de la sociedad, teniendo en cuenta al mismo tiempo la sostenibilidad del medio ambiente. También debe ser capaz de comunicarse eficazmente, trabajar en equipo y poseer dotes de liderazgo." }
    ]
  },
  10: { ingreso: [], egreso: [] }   // Gastronomía
};

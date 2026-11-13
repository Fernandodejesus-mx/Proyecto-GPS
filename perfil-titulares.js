// HU-38 · Titular e ícono de Ingreso, Egreso y Retícula, por carrera (archivo de Gloria)
// Clave = id de la carrera en script.js. Apartados de este archivo: ingreso, egreso, reticula.
// (Los titulares de Campo laboral están en perfil-titulares-laboral.js, que es de Fernando.)
// REGLAS DEL TITULAR (las valida la profesora o un jefe de carrera):
//   1) Máximo 6 palabras.   2) Dirigido al alumno y en futuro (ej. "Programarás soluciones reales").
//   3) Dice lo mismo que el texto oficial, sin prometer nada extra (ni sueldos, ni empleo asegurado).
//   4) No se repite dentro de la misma carrera.
// ícono: un emoji que represente la idea del apartado.
// validado: pasa a true SOLO cuando quien validó ya aprobó ese titular (T-136).
// Mientras un titular esté vacío, el visor muestra el nombre del apartado y la página de pruebas lo marca.
const T0 = { titular: "", icono: "", validado: false };
const perfilTitulares = {
  1:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  2:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  3:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  4:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  5:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  6:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  7:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  8:  { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  9:  { // Civil: ejemplos redactados con el texto oficial (pendientes de validar)
        ingreso: { titular: "Necesitarás ciencias y trabajo en equipo", icono: "📐", validado: false },
        egreso:  { titular: "Diseñarás infraestructura sostenible", icono: "🏗️", validado: false },
        reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },
  10: { ingreso: { ...T0 }, egreso: { ...T0 }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } }
};

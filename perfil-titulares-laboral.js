// HU-38 · Titular e ícono del apartado Campo laboral, por carrera (archivo de Fernando)
// Clave = id de la carrera en script.js.
// REGLAS DEL TITULAR (las valida la profesora o un jefe de carrera):
//   1) Máximo 6 palabras.   2) Dirigido al alumno y en futuro (ej. "Trabajarás en industrias y empresas").
//   3) Dice lo mismo que el texto oficial, sin prometer nada extra (ni sueldos, ni empleo asegurado).
//   4) No se repite dentro de la misma carrera.
// icono: un emoji que represente la idea. validado: pasa a true SOLO cuando quien validó ya aprobó ese titular.
// Mientras un titular esté vacío, el visor muestra el nombre del apartado y la página de pruebas lo marca.
const L0 = { titular: "", icono: "", validado: false };
const perfilTitularesLaboral = {
  1: { ...L0 },   // Sistemas Computacionales
  2: { ...L0 },   // Industrial
  3: { ...L0 },   // Electromecánica
  4: { ...L0 },   // Gestión Empresarial
  5: { ...L0 },   // Electrónica (la página oficial no publica Campo laboral)
  6: { ...L0 },   // Industrias Alimentarias
  7: { ...L0 },   // Bioquímica
  8: { ...L0 },   // Mecatrónica (la página oficial no publica Campo laboral)
  9: { ...L0 },   // Civil
  10: { ...L0 }   // Gastronomía
};

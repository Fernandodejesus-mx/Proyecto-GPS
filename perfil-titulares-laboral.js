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
  1: { titular: "Desarrollarás sistemas y software", icono: "💻", validado: false },   // Sistemas Computacionales
  2: { titular: "Mejorarás procesos industriales", icono: "⚙️", validado: false },   // Industrial
  3: { titular: "Diseñarás sistemas electromecánicos", icono: "🔧", validado: false },   // Electromecánica
  4: { titular: "Gestionarás empresas y proyectos", icono: "📊", validado: false },   // Gestión Empresarial
  5: { ...L0 },   // Electrónica
  6: { titular: "Desarrollarás productos alimenticios", icono: "🥫", validado: false },   // Industrias Alimentarias
  7: { titular: "Crearás productos biotecnológicos", icono: "🧬", validado: false },   // Bioquímica
  8: { ...L0 },   // Mecatrónica
  9: { titular: "Diseñarás y construirás infraestructura", icono: "🏗️", validado: false },   // Civil
  10: { titular: "Gestionarás negocios gastronómicos 👨‍🍳", icono: "👨‍🍳", validado: false }   // Gastronomía
};

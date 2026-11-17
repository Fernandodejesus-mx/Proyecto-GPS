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
  1:  { ingreso: { titular: "Usarás lógica, tecnología y creatividad", icono: "💻", validado: false }, egreso: { titular: "Construirás software, redes y datos", icono: "🖥️", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Sistemas Computacionales
  2:  { ingreso: { titular: "Razonarás, analizarás y resolverás problemas", icono: "🔧", validado: false }, egreso: { titular: "Mejorarás sistemas productivos y de calidad", icono: "⚙️", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Industrial
  3:  { ingreso: { titular: "Te interesarán electricidad y mecánica", icono: "⚡", validado: false }, egreso: { titular: "Diseñarás y controlarás sistemas electromecánicos", icono: "🔌", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Electromecánica
  4:  { ingreso: { titular: "Razonarás con lógica y espíritu emprendedor", icono: "📊", validado: false }, egreso: { titular: "Dirigirás organizaciones y negocios sustentables", icono: "💼", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Gestión Empresarial
  5:  { ingreso: { titular: "Te atraerán ciencias, matemáticas y tecnología", icono: "🔬", validado: false }, egreso: { titular: "Diseñarás sistemas analógicos y digitales", icono: "📡", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Electrónica
  6:  { ingreso: { titular: "Te atraerán química, biología y alimentos", icono: "🧪", validado: false }, egreso: { titular: "Producirás alimentos seguros y de calidad", icono: "🍎", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Industrias Alimentarias
  7:  { ingreso: { titular: "Aplicarás ciencias naturales, matemáticas y lógica", icono: "🧬", validado: false }, egreso: { titular: "Diseñarás procesos con recursos bióticos sustentables", icono: "🌱", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Bioquímica
  8:  { ingreso: { titular: "Pensarás con lógica, trabajarás en equipo", icono: "🤖", validado: false }, egreso: { titular: "Innovarás productos y sistemas mecatrónicos", icono: "🦾", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Mecatrónica
  9:  { ingreso: { titular: "Necesitarás ciencias y trabajo en equipo", icono: "📐", validado: false }, egreso: { titular: "Diseñarás infraestructura sostenible", icono: "🏗️", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } },   // Civil
  10: { ingreso: { titular: "Tendrás vocación de servicio y comunicación", icono: "🍳", validado: false }, egreso: { titular: "Crearás platillos y dirigirás tu negocio", icono: "🍽️", validado: false }, reticula: { titular: "Conocerás tu retícula", icono: "🗺️", validado: false } }   // Gastronomía
};

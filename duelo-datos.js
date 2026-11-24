// HU-46 · Duelo de carreras: lo que dice cada carta (archivo de Guillermo)
// Todo sale de datos que el equipo ya tiene (perfil de egreso oficial, campo laboral y plan de estudios).
// Aquí no se inventa ningún dato.
const DIMENSIONES = [
  { id: "hacer",    pregunta: "¿Qué te gustaría saber hacer?" },
  { id: "trabajar", pregunta: "¿Dónde te imaginas trabajando?" },
  { id: "estudiar", pregunta: "¿Qué te gustaría estudiar?" }
];

// Devuelve { icono, texto } de una carrera para una dimensión
function cartaDeCarrera(carreraId, dimensionId) {
  const c = carreras.find(x => x.id === carreraId);
  if (dimensionId === "hacer") {
    const egreso = obtenerApartados(carreraId).find(a => a.id === "egreso");
    return { icono: egreso.icono, texto: egreso.titular };
  }
  if (dimensionId === "trabajar") {
    return { icono: "💼", texto: c.laboral.slice(0, 2).map(x => x[0]).join(" · ") };
  }
  const ultimo = c.plan[c.plan.length - 1];
  return { icono: "📚", texto: ultimo[1].join(" · ") };
}
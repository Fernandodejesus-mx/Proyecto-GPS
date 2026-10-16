// ============================================================
// HU-08 · Cuestionario de intereses profesionales
// T-57 · Procesamiento de respuestas (cálculo de puntaje por área)
// ============================================================
//
// Qué hace este archivo (solo lógica, no toca la pantalla):
//   1. Recibe las respuestas { "AP-01-P01": 3, ... } (valores de 0 a 4).
//   2. Suma los puntos de cada pregunta en su área profesional.
//   3. Calcula el porcentaje de afinidad de cada área:
//          porcentaje = puntos obtenidos / puntos máximos posibles
//      (puntos máximos = nº de preguntas del área x valor más alto de la
//      escala; con 20 preguntas y escala 0-4, el máximo es 80).
//   4. Ordena las áreas de mayor a menor afinidad.
//   5. Relaciona cada área con las carreras del catálogo (carreraIds).
//
// La pantalla de resultados (T-58) usa window.Resultados.procesar().
//
// Datos: preguntas.js (areasCuestionario, preguntasCuestionario,
// escalaCuestionario) y script.js (carreras).
// ============================================================

(function () {
  // Relación área profesional -> ids de carreras de script.js.
  // El primer id es la carrera que más se relaciona con el área.
  const carrerasPorArea = {
    "AP-01": [1],        // Tecnología y sistemas        -> Sistemas Computacionales
    "AP-02": [4],        // Gestión y negocios           -> Gestión Empresarial
    "AP-03": [2],        // Industria y procesos         -> Industrial
    "AP-04": [5, 3, 8],  // Electrónica y automatización -> Electrónica, Electromecánica, Mecatrónica
    "AP-05": [7, 6],     // Ciencias y alimentos         -> Bioquímica, Industrias Alimentarias
    "AP-06": [9],        // Construcción e infraestructura -> Civil
    "AP-07": [10]        // Gastronomía y servicios      -> Gastronomía
  };

  const valorMaximo = Math.max(...escalaCuestionario.map(o => o.valor));
  const valoresValidos = escalaCuestionario.map(o => o.valor);

  // Un resultado se considera "sin interés marcado" si el mejor área queda por
  // debajo de este porcentaje (ej. alguien que contestó casi todo "No me interesa").
  const UMBRAL_INTERES = 25;

  /**
   * Calcula el puntaje de cada área.
   * @param {Object} respuestas  { idPregunta: valor }
   * @returns {Array} áreas ordenadas de mayor a menor porcentaje:
   *   { idArea, nombre, descripcion, puntos, maximo, porcentaje, respondidas, total, carreraIds }
   */
  function calcularPuntajes(respuestas) {
    const datos = respuestas || {};

    const areas = areasCuestionario.map((area, orden) => {
      const preguntas = preguntasCuestionario.filter(p => p.idArea === area.id);
      let puntos = 0;
      let respondidas = 0;

      preguntas.forEach(p => {
        const v = datos[p.id];
        // Solo se cuentan valores que existen en la escala (ignora basura o vacíos)
        if (valoresValidos.includes(v)) {
          puntos += v;
          respondidas++;
        }
      });

      const maximo = preguntas.length * valorMaximo;
      return {
        idArea: area.id,
        nombre: area.nombre,
        descripcion: area.descripcion,
        puntos,
        maximo,
        porcentaje: maximo > 0 ? Math.round(puntos / maximo * 100) : 0,
        respondidas,
        total: preguntas.length,
        carreraIds: carrerasPorArea[area.id] || [],
        orden
      };
    });

    // Mayor puntaje primero; si empatan, se conserva el orden original de las áreas
    return areas.sort((a, b) => (b.puntos - a.puntos) || (a.orden - b.orden));
  }

  /**
   * Resultado completo listo para mostrarse.
   * - areas: todas las áreas ordenadas
   * - destacadas: las áreas con mayor afinidad (hasta 3, solo si tienen puntos)
   * - sinInteres: true si ningún área llega al umbral de interés
   * - hayEmpate: true si el 1er y 2do lugar tienen el mismo puntaje
   */
  function procesar(respuestas) {
    const areas = calcularPuntajes(respuestas);
    const mejor = areas[0];
    return {
      areas,
      destacadas: areas.filter(a => a.puntos > 0).slice(0, 3),
      sinInteres: !mejor || mejor.porcentaje < UMBRAL_INTERES,
      hayEmpate: areas.length > 1 && areas[0].puntos === areas[1].puntos && areas[0].puntos > 0
    };
  }

  const api = { calcularPuntajes, procesar, carrerasPorArea, UMBRAL_INTERES };

  if (typeof window !== "undefined") window.Resultados = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();

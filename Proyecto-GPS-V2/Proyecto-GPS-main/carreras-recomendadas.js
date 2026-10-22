// ============================================================
// NUEVA FUNCIONALIDAD: T-67 a T-71 - Carreras Recomendadas ITSX
// Pantalla para consultar carreras por resultado/área de interés
// con explicaciones específicas (matriz T-62, justificaciones T-65)
// ============================================================

// Datos extendidos para Carreras Recomendadas
// Combina carreras existentes (script.js) + nueva carrera ITI + 14 resultados + 44 relaciones
const CarrerasRecomendadasData = {
  // 11 Carreras (las 10 existentes + ITI nueva)
  carreras: [
    { id: 1, nombre: "Ingeniería en Sistemas Computacionales", clave: "ISC", area: "Tecnologías" },
    { id: 2, nombre: "Ingeniería Industrial", clave: "II", area: "Ingeniería" },
    { id: 3, nombre: "Ingeniería Electrónica", clave: "IE", area: "Ingeniería" },
    { id: 4, nombre: "Ingeniería Electromecánica", clave: "IEM", area: "Ingeniería" },
    { id: 5, nombre: "Ingeniería Mecatrónica", clave: "IM", area: "Ingeniería" },
    { id: 6, nombre: "Ingeniería Civil", clave: "IC", area: "Ingeniería" },
    { id: 7, nombre: "Ingeniería en Gestión Empresarial", clave: "IGE", area: "Administración" },
    { id: 8, nombre: "Ingeniería Bioquímica", clave: "IBQ", area: "Ingeniería" },
    { id: 9, nombre: "Ingeniería en Industrias Alimentarias", clave: "IIA", area: "Alimentos y Gastronomía" },
    { id: 10, nombre: "Licenciatura en Gastronomía", clave: "LG", area: "Alimentos y Gastronomía" },
    { id: 11, nombre: "Ingeniería en Tecnologías de la Información", clave: "ITI", area: "Tecnologías" }
  ],

  // 14 Resultados / Áreas de interés (más granulares que las 7 del cuestionario original)
  resultados: [
    {
      id: 1,
      nombre: "Desarrollo de software y aplicaciones",
      descripcion: "Creación, diseño y mantenimiento de programas, aplicaciones y sistemas informáticos que resuelven problemas mediante la tecnología.",
      area: "Tecnologías",
      icon: "💻"
    },
    {
      id: 2,
      nombre: "Redes, bases de datos y ciberseguridad",
      descripcion: "Administración de redes, organización de información y protección de sistemas digitales frente a amenazas.",
      area: "Tecnologías",
      icon: "🔒"
    },
    {
      id: 3,
      nombre: "Automatización y control de procesos",
      descripcion: "Diseño e implementación de sistemas automáticos para controlar maquinaria y procesos industriales.",
      area: "Ingeniería",
      icon: "⚙️"
    },
    {
      id: 4,
      nombre: "Mantenimiento de maquinaria y equipos",
      descripcion: "Preservación y funcionamiento adecuado de sistemas mecánicos, eléctricos y electromecánicos.",
      area: "Ingeniería",
      icon: "🔧"
    },
    {
      id: 5,
      nombre: "Optimización de procesos productivos",
      descripcion: "Mejora de la productividad, reducción de costos y aprovechamiento eficiente de recursos en empresas.",
      area: "Ingeniería/Administración",
      icon: "📈"
    },
    {
      id: 6,
      nombre: "Control de calidad",
      descripcion: "Establecimiento de métodos para verificar que productos y procesos cumplan con estándares establecidos.",
      area: "Ingeniería/Alimentos y Gastronomía",
      icon: "✅"
    },
    {
      id: 7,
      nombre: "Automatización y robótica",
      descripcion: "Integración de mecánica, electrónica y programación para desarrollar máquinas automatizadas y robots.",
      area: "Ingeniería",
      icon: "🤖"
    },
    {
      id: 8,
      nombre: "Construcción e infraestructura",
      descripcion: "Diseño, construcción y supervisión de edificios, carreteras y otras obras civiles.",
      area: "Ingeniería",
      icon: "🏗️"
    },
    {
      id: 9,
      nombre: "Administración y gestión de empresas",
      descripcion: "Planeación, organización y administración de recursos para mejorar el desempeño organizacional.",
      area: "Administración",
      icon: "🏢"
    },
    {
      id: 10,
      nombre: "Análisis químico y control de calidad",
      descripcion: "Aplicación de conocimientos de química y biología para analizar sustancias y mejorar procesos productivos.",
      area: "Ingeniería/Alimentos y Gastronomía",
      icon: "🧪"
    },
    {
      id: 11,
      nombre: "Producción y conservación de alimentos",
      descripcion: "Desarrollo de métodos de procesamiento, conservación y control de inocuidad de los alimentos.",
      area: "Alimentos y Gastronomía",
      icon: "🍎"
    },
    {
      id: 12,
      nombre: "Innovación culinaria y servicios gastronómicos",
      descripcion: "Aplicación de técnicas culinarias y conocimientos de administración para elaborar alimentos y mejorar servicios de alimentación.",
      area: "Alimentos y Gastronomía",
      icon: "🍽️"
    },
    {
      id: 13,
      nombre: "Investigación e innovación tecnológica",
      descripcion: "Desarrollo de soluciones, investigación y aplicación de nuevas tecnologías para mejorar procesos, productos y servicios.",
      area: "Transversal",
      icon: "🔬"
    },
    {
      id: 14,
      nombre: "Sustentabilidad y cuidado ambiental",
      descripcion: "Implementación de prácticas sostenibles y tecnologías limpias para reducir impacto ambiental.",
      area: "Transversal",
      icon: "🌱"
    }
  ],

  // 44 Relaciones Resultado-Carrera con nivel (1=Bajo, 2=Medio, 3=Alto) y explicación (T-65)
  relaciones: [
    // Desarrollo de software y aplicaciones
    { idResultado: 1, idCarrera: 1, nivelRelacion: 3, explicacion: "Se relaciona porque sus estudiantes desarrollan programas, aplicaciones y sistemas informáticos para resolver problemas mediante la tecnología." },
    { idResultado: 1, idCarrera: 11, nivelRelacion: 2, explicacion: "Se relaciona porque forma profesionales capaces de desarrollar soluciones de software para la gestión de información tecnológica." },

    // Redes, bases de datos y ciberseguridad
    { idResultado: 2, idCarrera: 1, nivelRelacion: 3, explicacion: "Sus conocimientos permiten administrar redes, organizar información y proteger sistemas digitales frente a amenazas." },
    { idResultado: 2, idCarrera: 11, nivelRelacion: 2, explicacion: "Se relaciona por su enfoque en la gestión segura de infraestructura tecnológica y datos." },

    // Automatización y control de procesos
    { idResultado: 3, idCarrera: 3, nivelRelacion: 3, explicacion: "Permite diseñar circuitos y sistemas electrónicos para controlar máquinas y procesos industriales." },
    { idResultado: 3, idCarrera: 4, nivelRelacion: 2, explicacion: "Contribuye con conocimientos de sistemas electromecánicos para el control de procesos." },
    { idResultado: 3, idCarrera: 5, nivelRelacion: 3, explicacion: "Integra mecánica, electrónica y programación para crear sistemas de control automatizados." },

    // Mantenimiento de maquinaria y equipos
    { idResultado: 4, idCarrera: 4, nivelRelacion: 3, explicacion: "Contribuye al mantenimiento y funcionamiento adecuado de sistemas mecánicos y eléctricos." },
    { idResultado: 4, idCarrera: 5, nivelRelacion: 2, explicacion: "Aplica conocimientos de mecatrónica para el mantenimiento predictivo y correctivo de equipos automatizados." },
    { idResultado: 4, idCarrera: 3, nivelRelacion: 2, explicacion: "Sus conocimientos en electrónica son base para el diagnóstico y reparación de equipos." },

    // Optimización de procesos productivos
    { idResultado: 5, idCarrera: 2, nivelRelacion: 3, explicacion: "Permite mejorar la productividad, reducir costos y aprovechar eficientemente los recursos de una empresa." },
    { idResultado: 5, idCarrera: 7, nivelRelacion: 2, explicacion: "Aplica métodos de gestión para optimizar procesos organizacionales." },
    { idResultado: 5, idCarrera: 5, nivelRelacion: 2, explicacion: "Integra automatización para eficientar líneas de producción." },
    { idResultado: 5, idCarrera: 9, nivelRelacion: 2, explicacion: "Optimiza procesos de transformación y conservación de alimentos." },

    // Control de calidad
    { idResultado: 6, idCarrera: 2, nivelRelacion: 2, explicacion: "Ayuda a establecer métodos para verificar que los productos y procesos cumplan con los estándares establecidos." },
    { idResultado: 6, idCarrera: 8, nivelRelacion: 3, explicacion: "Aplica conocimientos de química y biología para analizar sustancias y mejorar procesos productivos." },
    { idResultado: 6, idCarrera: 9, nivelRelacion: 3, explicacion: "Permite desarrollar métodos de control de inocuidad y calidad en alimentos." },
    { idResultado: 6, idCarrera: 10, nivelRelacion: 2, explicacion: "Aplica estándares de calidad en la preparación y servicio de alimentos." },

    // Automatización y robótica
    { idResultado: 7, idCarrera: 5, nivelRelacion: 3, explicacion: "Integra mecánica, electrónica y programación para desarrollar máquinas automatizadas y robots." },
    { idResultado: 7, idCarrera: 3, nivelRelacion: 2, explicacion: "Diseña la electrónica de control y potencia para sistemas robóticos." },
    { idResultado: 7, idCarrera: 4, nivelRelacion: 2, explicacion: "Construye la parte mecánica y de actuadores de sistemas robóticos." },
    { idResultado: 7, idCarrera: 1, nivelRelacion: 2, explicacion: "Programa la inteligencia y control de software para robots y automatización." },

    // Construcción e infraestructura
    { idResultado: 8, idCarrera: 6, nivelRelacion: 3, explicacion: "Contribuye al diseño, construcción y supervisión de edificios, carreteras y otras obras civiles." },

    // Administración y gestión de empresas
    { idResultado: 9, idCarrera: 7, nivelRelacion: 3, explicacion: "Permite planear, organizar y administrar recursos para mejorar el desempeño de las organizaciones." },
    { idResultado: 9, idCarrera: 2, nivelRelacion: 2, explicacion: "Aplica ingeniería industrial para la gestión eficiente de operaciones." },
    { idResultado: 9, idCarrera: 10, nivelRelacion: 2, explicacion: "Combina conocimientos culinarios con administración para gestionar negocios gastronómicos." },

    // Análisis químico y control de calidad
    { idResultado: 10, idCarrera: 8, nivelRelacion: 3, explicacion: "Aplica conocimientos de química y biología para analizar sustancias y mejorar procesos productivos." },
    { idResultado: 10, idCarrera: 9, nivelRelacion: 2, explicacion: "Realiza análisis fisicoquímicos y microbiológicos para garantizar calidad de alimentos." },

    // Producción y conservación de alimentos
    { idResultado: 11, idCarrera: 9, nivelRelacion: 3, explicacion: "Permite desarrollar métodos de procesamiento, conservación y control de inocuidad de los alimentos." },
    { idResultado: 11, idCarrera: 8, nivelRelacion: 2, explicacion: "Aplica biotecnología para innovar en producción y conservación de alimentos." },
    { idResultado: 11, idCarrera: 10, nivelRelacion: 2, explicacion: "Desarrolla técnicas de preparación y conservación en contextos gastronómicos." },

    // Innovación culinaria y servicios gastronómicos
    { idResultado: 12, idCarrera: 10, nivelRelacion: 3, explicacion: "Aplica técnicas culinarias y conocimientos de administración para elaborar alimentos y mejorar los servicios de alimentación." },
    { idResultado: 12, idCarrera: 9, nivelRelacion: 2, explicacion: "Innova en desarrollo de productos alimentarios para el sector gastronómico." },

    // Investigación e innovación tecnológica (Transversal)
    { idResultado: 13, idCarrera: 1, nivelRelacion: 3, explicacion: "Permite desarrollar software, aplicaciones y sistemas informáticos que resuelven problemas mediante la tecnología." },
    { idResultado: 13, idCarrera: 5, nivelRelacion: 3, explicacion: "Integra mecánica, electrónica y programación para crear sistemas automatizados y soluciones robóticas innovadoras." },
    { idResultado: 13, idCarrera: 2, nivelRelacion: 2, explicacion: "Permite optimizar procesos productivos mediante herramientas tecnológicas y métodos de mejora continua." },
    { idResultado: 13, idCarrera: 8, nivelRelacion: 2, explicacion: "Aplica conocimientos científicos y tecnológicos para mejorar procesos bioquímicos y desarrollar soluciones innovadoras." },
    { idResultado: 13, idCarrera: 3, nivelRelacion: 2, explicacion: "Diseña sistemas electrónicos innovadores para nuevas aplicaciones tecnológicas." },
    { idResultado: 13, idCarrera: 9, nivelRelacion: 2, explicacion: "Investiga nuevas tecnologías de procesamiento y conservación de alimentos." },

    // Sustentabilidad y cuidado ambiental (Transversal)
    { idResultado: 14, idCarrera: 6, nivelRelacion: 2, explicacion: "Diseña infraestructura sostenible y edificaciones de bajo impacto ambiental." },
    { idResultado: 14, idCarrera: 2, nivelRelacion: 2, explicacion: "Optimiza procesos industriales para reducir residuos y consumo energético." },
    { idResultado: 14, idCarrera: 8, nivelRelacion: 2, explicacion: "Desarrolla bioprocesos y bioproductos sostenibles y amigables con el ambiente." },
    { idResultado: 14, idCarrera: 9, nivelRelacion: 2, explicacion: "Implementa tecnologías limpias en la industria alimentaria." },
    { idResultado: 14, idCarrera: 5, nivelRelacion: 1, explicacion: "Crea sistemas automatizados de bajo consumo energético." },
    { idResultado: 14, idCarrera: 7, nivelRelacion: 1, explicacion: "Gestiona empresas bajo modelos de negocio sostenibles." }
  ]
};

// Funciones de utilidad
function getCarreraById(id) {
  return CarrerasRecomendadasData.carreras.find(c => c.id === id);
}

function getResultadoById(id) {
  return CarrerasRecomendadasData.resultados.find(r => r.id === id);
}

function getRelacionesByResultado(idResultado) {
  return CarrerasRecomendadasData.relaciones
    .filter(r => r.idResultado === idResultado)
    .map(r => ({ ...r, carrera: getCarreraById(r.idCarrera) }))
    .filter(r => r.carrera);
}

function getAllResultados() {
  return [...CarrerasRecomendadasData.resultados].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function sortCarreras(carreras, criterio = 'nivel') {
  const copia = [...carreras];
  if (criterio === 'alfabetico') {
    return copia.sort((a, b) => a.carrera.nombre.localeCompare(b.carrera.nombre));
  }
  return copia.sort((a, b) => {
    if (b.nivelRelacion !== a.nivelRelacion) return b.nivelRelacion - a.nivelRelacion;
    return a.carrera.nombre.localeCompare(b.carrera.nombre);
  });
}

function getNivelTexto(nivel) {
  const niveles = { 1: 'Bajo', 2: 'Medio', 3: 'Alto' };
  return niveles[nivel] || 'No definido';
}

function getNivelClass(nivel) {
  if (nivel === 3) return 'alto';
  if (nivel === 2) return 'medio';
  return 'bajo';
}

function getNivelColor(nivel) {
  const colores = { 1: '#f59e0b', 2: '#3b82f6', 3: '#10b981' };
  return colores[nivel] || '#6b7280';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Iconos para carreras
const CARRERA_ICONS = {
  1: '💻', 2: '🏭', 3: '📡', 4: '⚡', 5: '🤖',
  6: '🏗️', 7: '📊', 8: '🧪', 9: '🍎', 10: '🍽️', 11: '☁️'
};

// Exponer globalmente
window.CarrerasRecomendadasData = CarrerasRecomendadasData;
window.CarrerasRecomendadasAPI = {
  getCarreraById,
  getResultadoById,
  getRelacionesByResultado,
  getAllResultados,
  sortCarreras,
  getNivelTexto,
  getNivelClass,
  escapeHtml,
  CARRERA_ICONS
};
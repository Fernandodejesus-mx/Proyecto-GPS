const carreras = [
  {
    id: 1,
    nombre: "Ingeniería en Sistemas Computacionales",
    area: "Tecnologías",
    resumen: "Desarrollo de soluciones de software, sistemas computacionales y tecnologías de información.",
    info: "Esta carrera forma profesionales capaces de analizar problemas y desarrollar soluciones mediante tecnologías de información. El contenido combina programación, bases de datos, redes, sistemas y desarrollo de software.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Fundamentos de Programación", "Matemáticas Discretas"]],
      ["2do semestre", ["Cálculo Integral", "Programación Orientada a Objetos", "Probabilidad y Estadística"]],
      ["3er semestre", ["Estructura de Datos", "Bases de Datos", "Sistemas Operativos"]],
      ["4to semestre", ["Desarrollo Web", "Redes de Computadoras", "Ingeniería de Software"]]
    ],
    perfil: [
      "Conocimientos de programación y desarrollo de sistemas.",
      "Capacidad para analizar problemas y proponer soluciones tecnológicas.",
      "Competencia para diseñar, desarrollar y mantener aplicaciones.",
      "Capacidad para trabajar en equipo en proyectos de tecnología."
    ],
    laboral: [
      ["Desarrollo de software", "Desarrollador web, desarrollador de aplicaciones o programador."],
      ["Tecnologías de información", "Soporte, administración y gestión de sistemas."],
      ["Bases de datos", "Diseño y administración de bases de datos."],
      ["Proyectos tecnológicos", "Análisis y participación en proyectos de software."]
    ]
  },
  {
    id: 2,
    nombre: "Ingeniería Industrial",
    area: "Ingeniería",
    resumen: "Mejora de procesos, productividad, calidad y aprovechamiento de recursos.",
    info: "La carrera se enfoca en analizar y mejorar procesos productivos y administrativos. Integra conocimientos de calidad, logística, seguridad, producción y optimización de recursos.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Fundamentos de Investigación", "Taller de Ética"]],
      ["2do semestre", ["Cálculo Integral", "Estadística", "Procesos de Fabricación"]],
      ["3er semestre", ["Control Estadístico", "Estudio del Trabajo", "Electricidad Industrial"]],
      ["4to semestre", ["Investigación de Operaciones", "Logística", "Administración de Operaciones"]]
    ],
    perfil: [
      "Conocimientos de procesos productivos y administrativos.",
      "Capacidad para analizar y mejorar procesos.",
      "Competencia para aplicar herramientas de calidad.",
      "Capacidad para administrar recursos de manera eficiente."
    ],
    laboral: [
      ["Producción", "Planeación, supervisión y control de procesos."],
      ["Calidad", "Control y gestión de calidad."],
      ["Logística", "Planeación y gestión de cadenas de suministro."],
      ["Mejora de procesos", "Análisis y mejora continua de operaciones."]
    ]
  },
  {
    id: 3,
    nombre: "Ingeniería Electromecánica",
    area: "Ingeniería",
    resumen: "Integración de conocimientos eléctricos, mecánicos y de automatización.",
    info: "Esta carrera integra conocimientos de electricidad, mecánica y automatización para participar en el diseño, operación y mantenimiento de equipos y sistemas industriales.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Fundamentos de Investigación", "Programación"]],
      ["2do semestre", ["Cálculo Integral", "Circuitos Eléctricos", "Mecánica"]],
      ["3er semestre", ["Máquinas Eléctricas", "Mecánica de Materiales", "Electrónica"]],
      ["4to semestre", ["Control Automático", "Sistemas Hidráulicos", "Mantenimiento"]]
    ],
    perfil: [
      "Conocimientos de electricidad, mecánica y automatización.",
      "Capacidad para analizar equipos y sistemas industriales.",
      "Competencia para participar en mantenimiento y mejora de sistemas.",
      "Capacidad para resolver problemas técnicos."
    ],
    laboral: [
      ["Mantenimiento industrial", "Mantenimiento preventivo y correctivo de equipos."],
      ["Automatización", "Control y automatización de procesos."],
      ["Instalaciones", "Participación en instalaciones eléctricas industriales."],
      ["Operaciones", "Supervisión y operación de sistemas industriales."]
    ]
  },
  {
    id: 4,
    nombre: "Ingeniería en Gestión Empresarial",
    area: "Administración",
    resumen: "Gestión de organizaciones, recursos y proyectos para mejorar su funcionamiento.",
    info: "La carrera integra conocimientos administrativos, económicos y estratégicos para apoyar la planeación, organización y mejora de empresas y proyectos.",
    plan: [
      ["1er semestre", ["Fundamentos de Gestión Empresarial", "Cálculo Diferencial", "Contabilidad"]],
      ["2do semestre", ["Cálculo Integral", "Mercadotecnia", "Estadística"]],
      ["3er semestre", ["Costos Empresariales", "Gestión del Capital Humano", "Derecho Empresarial"]],
      ["4to semestre", ["Finanzas", "Plan de Negocios", "Calidad"]]
    ],
    perfil: [
      "Conocimientos de administración y gestión empresarial.",
      "Capacidad para planear y evaluar proyectos.",
      "Competencia para administrar recursos.",
      "Capacidad para proponer mejoras organizacionales."
    ],
    laboral: [
      ["Administración", "Gestión de empresas y organizaciones."],
      ["Recursos humanos", "Gestión y desarrollo del personal."],
      ["Proyectos", "Planeación y evaluación de proyectos."],
      ["Emprendimiento", "Desarrollo y gestión de iniciativas empresariales."]
    ]
  }
  ,
  {
    id: 5,
    nombre: "Ingeniería en Electrónica",
    area: "Ingeniería",
    resumen: "Diseño, análisis y mantenimiento de circuitos y sistemas electrónicos.",
    info: "Esta carrera se relaciona con el diseño, análisis y mantenimiento de sistemas electrónicos utilizados en equipos, procesos industriales y dispositivos tecnológicos.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Fundamentos de Investigación", "Programación"]],
      ["2do semestre", ["Cálculo Integral", "Circuitos Eléctricos", "Mediciones Eléctricas"]],
      ["3er semestre", ["Dispositivos Electrónicos", "Análisis de Circuitos", "Instrumentación"]],
      ["4to semestre", ["Sistemas Digitales", "Microcontroladores", "Electrónica Analógica"]]
    ],
    perfil: [
      "Conocimientos de circuitos y sistemas electrónicos.",
      "Capacidad para analizar y diagnosticar fallas en equipos.",
      "Competencia para diseñar y probar soluciones electrónicas.",
      "Capacidad para utilizar instrumentos de medición."
    ],
    laboral: [
      ["Diseño electrónico", "Apoyo en diseño y prueba de circuitos y dispositivos."],
      ["Mantenimiento", "Diagnóstico y mantenimiento de equipos electrónicos."],
      ["Automatización", "Integración de sensores y sistemas de control."],
      ["Pruebas y calidad", "Verificación del funcionamiento de equipos."]
    ]
  },
  {
    id: 6,
    nombre: "Ingeniería en Industrias Alimentarias",
    area: "Alimentos y Gastronomía",
    resumen: "Procesamiento, conservación e inocuidad de productos alimenticios.",
    info: "Esta carrera se enfoca en los procesos para transformar, conservar y evaluar alimentos, considerando la calidad, la higiene y el aprovechamiento de materias primas.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Química", "Biología"]],
      ["2do semestre", ["Cálculo Integral", "Química Orgánica", "Microbiología"]],
      ["3er semestre", ["Análisis de Alimentos", "Balances de Materia", "Termodinámica"]],
      ["4to semestre", ["Tecnología de Alimentos", "Operaciones Unitarias", "Control de Calidad"]]
    ],
    perfil: [
      "Conocimientos de procesamiento y conservación de alimentos.",
      "Capacidad para evaluar calidad e inocuidad.",
      "Competencia para participar en el desarrollo de productos alimenticios.",
      "Capacidad para mejorar procesos de producción de alimentos."
    ],
    laboral: [
      ["Producción de alimentos", "Participación en procesos de elaboración y envasado."],
      ["Calidad e inocuidad", "Revisión de higiene, calidad y seguridad alimentaria."],
      ["Desarrollo de productos", "Apoyo en la formulación y mejora de productos."],
      ["Laboratorio", "Análisis de materias primas y productos terminados."]
    ]
  },
  {
    id: 7,
    nombre: "Ingeniería Bioquímica",
    area: "Ingeniería",
    resumen: "Aplicación de la química y la biología en procesos industriales y biotecnológicos.",
    info: "La carrera aplica conocimientos de química, biología y procesos para desarrollar y mejorar productos, analizar muestras y participar en procesos biotecnológicos.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Química", "Biología"]],
      ["2do semestre", ["Cálculo Integral", "Química Orgánica", "Bioquímica"]],
      ["3er semestre", ["Microbiología", "Balances de Materia", "Fisicoquímica"]],
      ["4to semestre", ["Biología Molecular", "Termodinámica", "Análisis Instrumental"]]
    ],
    perfil: [
      "Conocimientos de química, biología y procesos bioquímicos.",
      "Capacidad para realizar e interpretar análisis de laboratorio.",
      "Competencia para participar en procesos biotecnológicos.",
      "Capacidad para evaluar calidad y proponer mejoras."
    ],
    laboral: [
      ["Laboratorio", "Análisis de muestras y pruebas de calidad."],
      ["Biotecnología", "Apoyo en procesos biológicos y de fermentación."],
      ["Industria", "Participación en procesos químicos y biológicos."],
      ["Medio ambiente", "Apoyo en análisis y tratamiento de residuos."]
    ]
  },
  {
    id: 8,
    nombre: "Ingeniería Mecatrónica",
    area: "Ingeniería",
    resumen: "Integración de mecánica, electrónica, control y programación.",
    info: "Esta carrera integra sistemas mecánicos, electrónicos y de control para diseñar, operar y mejorar equipos automatizados y soluciones robóticas.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Fundamentos de Investigación", "Programación"]],
      ["2do semestre", ["Cálculo Integral", "Circuitos Eléctricos", "Estática"]],
      ["3er semestre", ["Electrónica", "Mecánica de Materiales", "Sistemas Digitales"]],
      ["4to semestre", ["Microcontroladores", "Control", "Diseño Mecánico"]]
    ],
    perfil: [
      "Conocimientos de mecánica, electrónica y programación.",
      "Capacidad para integrar componentes de sistemas automatizados.",
      "Competencia para diseñar y probar soluciones mecatrónicas.",
      "Capacidad para resolver problemas de control y automatización."
    ],
    laboral: [
      ["Robótica", "Apoyo en diseño y programación de sistemas robóticos."],
      ["Automatización", "Integración y mejora de procesos automatizados."],
      ["Mantenimiento", "Diagnóstico de sistemas mecánicos y electrónicos."],
      ["Diseño", "Modelado y pruebas de prototipos."]
    ]
  },
  {
    id: 9,
    nombre: "Ingeniería Civil",
    area: "Ingeniería",
    resumen: "Planeación, diseño y construcción de infraestructura y obras civiles.",
    info: "Esta carrera prepara para participar en la planeación, diseño, construcción y supervisión de obras como edificios, caminos y sistemas de infraestructura.",
    plan: [
      ["1er semestre", ["Cálculo Diferencial", "Dibujo", "Química"]],
      ["2do semestre", ["Cálculo Integral", "Estática", "Topografía"]],
      ["3er semestre", ["Resistencia de Materiales", "Geología", "Materiales de Construcción"]],
      ["4to semestre", ["Análisis Estructural", "Mecánica de Suelos", "Hidráulica"]]
    ],
    perfil: [
      "Conocimientos de materiales, estructuras y construcción.",
      "Capacidad para interpretar planos y datos de campo.",
      "Competencia para apoyar la planeación y supervisión de obras.",
      "Capacidad para considerar seguridad, costos y uso responsable de recursos."
    ],
    laboral: [
      ["Construcción", "Apoyo en ejecución y supervisión de obras."],
      ["Diseño y cálculo", "Colaboración en proyectos de infraestructura."],
      ["Topografía", "Levantamientos y mediciones de terrenos."],
      ["Agua e infraestructura", "Participación en proyectos hidráulicos y urbanos."]
    ]
  },
  {
    id: 10,
    nombre: "Licenciatura en Gastronomía",
    area: "Alimentos y Gastronomía",
    resumen: "Preparación de alimentos, técnicas culinarias y administración de servicios gastronómicos.",
    info: "Esta licenciatura combina técnicas culinarias, planeación de menús, higiene, costos y organización de servicios de alimentos.",
    plan: [
      ["1er semestre", ["Bases Culinarias", "Higiene y Seguridad", "Introducción a la Gastronomía"]],
      ["2do semestre", ["Cocina Mexicana", "Nutrición", "Costos de Alimentos"]],
      ["3er semestre", ["Panadería", "Repostería", "Administración de Restaurantes"]],
      ["4to semestre", ["Cocina Internacional", "Planeación de Menús", "Servicio de Alimentos y Bebidas"]]
    ],
    perfil: [
      "Conocimientos de técnicas culinarias y preparación de alimentos.",
      "Capacidad para planear menús y organizar operaciones de cocina.",
      "Competencia para aplicar normas de higiene y seguridad alimentaria.",
      "Capacidad para calcular costos y colaborar en la administración de servicios gastronómicos."
    ],
    laboral: [
      ["Restaurantes y hoteles", "Preparación de alimentos y coordinación de cocina."],
      ["Desarrollo de menús", "Diseño de propuestas culinarias."],
      ["Administración gastronómica", "Control de costos y operación de establecimientos."],
      ["Servicios y eventos", "Organización de banquetes y servicios de alimentos."]
    ]
  }

];

const $ = id => document.getElementById(id);
let carreraActual = null;

function renderCatalogo() {
  const text = $("buscador").value.toLowerCase().trim();
  const area = $("filtroArea").value;

  const resultados = carreras.filter(c => {
    const matchText = c.nombre.toLowerCase().includes(text) || c.area.toLowerCase().includes(text);
    const matchArea = area === "Todas" || c.area === area;
    return matchText && matchArea;
  });

  $("listaCarreras").innerHTML = resultados.map((c, i) => `
    <article class="career-card">
      <div class="card-top">
        <span class="pill">${c.area}</span>
        <span class="number">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3>${c.nombre}</h3>
      <p>${c.resumen}</p>
      <button class="open-career" onclick="abrirCarrera(${c.id})">Conocer esta carrera →</button>
    </article>
  `).join("");

  $("contador").textContent = `${resultados.length} resultado${resultados.length === 1 ? "" : "s"}`;
  $("sinResultados").classList.toggle("hidden", resultados.length > 0);
}

function abrirCarrera(id) {
  const c = carreras.find(x => x.id === id);
  if (!c) return;
  carreraActual = c;

  $("catalogo").classList.add("hidden");
  $("detalle").classList.remove("hidden");
  $("breadcrumb").textContent = `Explorar carreras  /  ${c.nombre}`;

  $("detalleArea").textContent = c.area;
  $("detalleNombre").textContent = c.nombre;
  $("detalleResumen").textContent = c.resumen;
  $("careerCode").textContent = `0${c.id}`;

  document.querySelectorAll(".detail-tab").forEach(b => b.classList.remove("active"));
  document.querySelector('[data-tab="info"]').classList.add("active");
  renderPanel(c, "info");
  window.scrollTo(0, 0);
}

function renderPanel(c, tab) {
  if (tab === "info") {
    $("panelDetalle").innerHTML = `
      <p class="eyebrow">HU-02 · INFORMACIÓN GENERAL</p>
      <h2>Conoce la carrera</h2>
      <p>${c.info}</p>
      <h3>¿Qué encontrarás aquí?</h3>
      <ul>
        <li>Descripción general de la carrera.</li>
        <li>Área a la que pertenece.</li>
        <li>Acceso directo al plan de estudios.</li>
        <li>Acceso al perfil de egreso y campo laboral.</li>
        <li>Actividades relacionadas con la carrera.</li>
      </ul>
      <button class="btn-link" onclick="irATab('actividades')">Conocer las actividades de esta carrera →</button>
    `;
  }

  if (tab === "plan") {
    $("panelDetalle").innerHTML = `
      <p class="eyebrow">HU-03 · PLAN DE ESTUDIOS</p>
      <h2>Materias por semestre</h2>
      <p>Consulta una vista organizada de las materias que forman parte de la carrera.</p>
      <div class="semester-grid">
        ${c.plan.map(s => `
          <div class="semester">
            <h4>${s[0]}</h4>
            <ul>${s[1].map(m => `<li>${m}</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (tab === "perfil") {
    $("panelDetalle").innerHTML = `
      <p class="eyebrow">HU-04 · PERFIL DE EGRESO</p>
      <h2>¿Qué desarrolla el egresado?</h2>
      <p>La información se presenta de forma organizada para facilitar su consulta.</p>
      <ul>${c.perfil.map(x => `<li>${x}</li>`).join("")}</ul>
    `;
  }

  if (tab === "laboral") {
    $("panelDetalle").innerHTML = `
      <p class="eyebrow">HU-05 · CAMPO LABORAL</p>
      <h2>¿Dónde puede trabajar?</h2>
      <p>Algunas áreas y ejemplos de actividades relacionadas con la carrera son:</p>
      <div class="area-grid">
        ${c.laboral.map(x => `
          <div class="area-box">
            <strong>${x[0]}</strong>
            <p>${x[1]}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (tab === "actividades") {
    const acts = obtenerActividades(c.id);
    $("panelDetalle").innerHTML = `
      <p class="eyebrow">HU-06 · ACTIVIDADES</p>
      <h2>¿Qué podrías hacer en esta carrera?</h2>
      <p>Estas actividades representan, de forma sencilla, situaciones del área profesional de ${c.nombre}.</p>
      ${acts.length ? `
        <div class="activity-list">
          ${acts.map((a, i) => `
            <div class="activity-card">
              <div class="activity-num">${i + 1}</div>
              <div>
                <h4>${a.nombre}</h4>
                <p>${a.descripcion}</p>
                <span class="aspect-tag">Representa: ${a.aspecto}</span>
              </div>
            </div>
          `).join("")}
        </div>
      ` : `<p>Las actividades de esta carrera estarán disponibles próximamente.</p>`}
    `;
  }
}

function irATab(tab) {
  if (!carreraActual) return;
  document.querySelectorAll(".detail-tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  renderPanel(carreraActual, tab);
}

document.querySelectorAll(".detail-tab").forEach(button => {
  button.addEventListener("click", () => irATab(button.dataset.tab));
});

$("btnVolver").addEventListener("click", () => {
  $("detalle").classList.add("hidden");
  $("catalogo").classList.remove("hidden");
  $("breadcrumb").textContent = "Explorar carreras";
  window.scrollTo(0, 0);
});

$("navInicio").addEventListener("click", () => {
  $("detalle").classList.add("hidden");
  $("catalogo").classList.remove("hidden");
  $("breadcrumb").textContent = "Explorar carreras";
  window.scrollTo(0, 0);
});

$("navExplorar").addEventListener("click", () => {
  $("detalle").classList.add("hidden");
  $("carrerasRecomendadas").classList.add("hidden");
  $("catalogo").classList.remove("hidden");
  $("breadcrumb").textContent = "Explorar carreras";
});

$("navCarrerasRecomendadas").addEventListener("click", () => {
  $("detalle").classList.add("hidden");
  $("catalogo").classList.add("hidden");
  $("carrerasRecomendadas").classList.remove("hidden");
  $("breadcrumb").textContent = "Carreras recomendadas";
  window.scrollTo(0, 0);
});

$("buscador").addEventListener("input", renderCatalogo);
$("filtroArea").addEventListener("change", renderCatalogo);

renderCatalogo();

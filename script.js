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
];

const $ = id => document.getElementById(id);

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
      </ul>
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
}

document.querySelectorAll(".detail-tab").forEach(button => {
  button.addEventListener("click", () => {
    const cName = $("detalleNombre").textContent;
    const c = carreras.find(x => x.nombre === cName);
    document.querySelectorAll(".detail-tab").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderPanel(c, button.dataset.tab);
  });
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
  $("catalogo").classList.remove("hidden");
  $("breadcrumb").textContent = "Explorar carreras";
});

$("buscador").addEventListener("input", renderCatalogo);
$("filtroArea").addEventListener("change", renderCatalogo);

renderCatalogo();

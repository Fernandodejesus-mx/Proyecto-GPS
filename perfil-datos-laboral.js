// HU-40 · Campo laboral OFICIAL (Sprint 4)
// Fuente: página oficial de cada carrera en itsx.edu.mx/oferta-academica/
// REGLA: texto TAL CUAL, mismo formato de bloques que perfil-datos-ingreso-egreso.js.
// Si la página oficial NO tiene contenido en "Campo laboral" (hoy: Electrónica y Mecatrónica) se deja [] .
const perfilLaboral = {
  1: { laboral: [
    { t: "p", x: "Un ingeniero en sistemas computacionales está capacitado para trabajar en áreas de sistemas en sector público o privado, en firmas de manufactura de hardware y software, colaborando y dirigiendo equipos multiculturales, desarrollando software o como consultor independiente, desempeñándose en áreas tales como:" },
    { t: "h", x: "Análisis y diseño de sistemas informáticos" },
    { t: "ul", x: [
      "Dirección de desarrollo de software.",
      "Mantenimiento de infraestructuras.",
      "Administración de bases de datos.",
      "Comunicaciones.",
      "Consultoría técnica.",
      "Auditoría informática.",
      "Diseño, selección y evaluación de infraestructuras tecnológicas.",
      "Diseño, evaluación y control de proyectos informáticos."
    ] },
    { t: "h", x: "Sector Público y Privado" },
    { t: "ul", x: [
      "Gerente de Informática.",
      "Analista programador de sistemas.",
      "Líder de proyectos Informáticos.",
      "Auditor de Informática.",
      "Gerente de soporte técnico.",
      "Agente vendedor."
    ] },
    { t: "h", x: "Como Asesor/Consultor Independiente" },
    { t: "ul", x: [
      "Asesor Informático en el sector financiero, manufactura, y empresas de comunicación, entre otros.",
      "Instituciones educativas.",
      "Desarrollo de sistemas.",
      "Auditor de informática.",
      "Consultor externo.",
      "Instructor en los diferentes tópicos de informática.",
      "Investigador y desarrollador de proyectos de aplicación práctica.",
      "Agente distribuidor de tecnologías informáticas y de telecomunicaciones."
    ] }
  ] },   // Sistemas Computacionales
  2: { laboral: [
    { t: "p", x: "El campo de trabajo del Ingeniero Industrial se ubica tanto en el sector productivo como en el de servicios. El ingeniero industrial podrá desempeñarse en una gran variedad de ámbitos laborales, destacando:" },
    { t: "ul", x: [
      "Sector Público:",
      "Docencia.",
      "Investigación y Desarrollo.",
      "Diversas áreas de la administración pública.",
      "Sector Privado:",
      "Industrias manufactureras.",
      "Manufactura textil.",
      "Industrias extractivas.",
      "Industrias de transformación.",
      "Industria del plástico.",
      "Industria de la construcción.",
      "Industria automotriz.",
      "Logística y cadenas de suministro.",
      "Terrestre.",
      "Aeroportuaria.",
      "Marina.",
      "Plataformas digitales.",
      "Ingenios azucareros y alcoholeros.",
      "Empresas comercializadoras.",
      "Prestadoras de Servicios.",
      "Servicios de consultoría.",
      "En salud y seguridad en el trabajo.",
      "En capacitación.",
      "En reclutamiento y selección.",
      "Emprendimiento."
    ] }
  ] },   // Industrial
  3: { laboral: [
    { t: "p", x: "El campo laboral para ingeniero electromecánico es bastante diverso, se puede ocupar en cualquier tipo de industria manufacturera, la metalmecánica, la industria automotriz, la industria eléctrica, las empresas de servicios, hospitales, en hotelería, en instituciones educativas y en empresas transnacionales del manejo, producción transmisión y distribución de energía asi como en plantas generadoras, parques eólicos, en sistemas de generación solar solo por mencionar algunos." }
  ] },   // Electromecánica
  4: { laboral: [
    { t: "p", x: "Consultoría Administrativa, que abarca la aplicación correcta del proceso administrativo coordinando las áreas funcionales y delimitando actividades de cada una para el logro eficiente de los objetivos Institucionales" },
    { t: "ul", x: [
      "Aplicación de herramientas de liderazgo, fundamentadas en habilidades directivas, para el óptimo funcionamiento del recurso humano en la empresa."
    ] },
    { t: "p", x: "Evaluación Financiera de las Organizaciones, determinando el buen manejo de sus activos y pasivos y con ello lograr un equilibrio en los niveles de apalancamientos tanto operativo como financiero." },
    { t: "p", x: "Diseño Mercadológico de productos, desde su diseño hasta la elaboración de campañas de promoción, publicidad, fuerza de ventas y relaciones públicas que las organizaciones necesiten para el impulso idóneo de sus estrategias de comercialización." }
  ] },   // Gestión Empresarial
  5: { laboral: [] },   // Electrónica (la página oficial no muestra contenido)
  6: { laboral: [
    { t: "ul", x: [
      "El campo de trabajo del Ingeniero en industrias alimentarias se ubica tanto en el sector productivo como en el de servicios.",
      "Podrá desempeñarse en una gran variedad de ámbitos laborales, destacando:",
      "Plantas procesadoras de alimentos de origen animal y vegetal.",
      "Laboratorios de control de calidad y de certificación.",
      "Promoción y gestión de empresas agroalimentarias.",
      "Desarrollo de nuevos productos alimenticios.",
      "Consultoría, asesoría y control en el área de inocuidad.",
      "Creador y gestor de sus propias empresas.",
      "Aplicación en la docencia y/o investigación en instituciones públicas y privadas.",
      "Gestión de Proyectos de inversión en industrias de alimentos."
    ] }
  ] },   // Industrias Alimentarias
  7: { laboral: [
    { t: "p", x: "Los Ingenieros Bioquímicos trabajan actualmente en empresas nacionales e internacionales y en organismos públicos, en diversos sectores y puestos, incluyendo directivos de alto nivel." },
    { t: "ul", x: [
      "En el Sector Alimentario:"
    ] },
    { t: "p", x: "Los ingenieros bioquímicos están trabajando en industrias que elaboran productos lácteos (leches, quesos, cremas, yogurt, etc.), cárnicos (jamón, salchichas, etc.), de frutas y vegetales (conservas, néctares y jugos, mermeladas, etc.), de cereales (pan, harinas, cereales para desayuno, galletas, etc.), y otros diversos productos como dulces, helados, refrescos, vinos, cervezas, botanas, cafés y tés, ingredientes y aditivos." },
    { t: "ul", x: [
      "En el Sector Biotecnológico y Farmacéutico:"
    ] },
    { t: "p", x: "Trabajan en empresas que utilizan un microorganismo para elaborar sus productos como antibióticos, enzimas, vitaminas, aminoácidos, ácidos orgánicos, que fabrican otros productos biológicos como antígenos, anticuerpos, hormonas, vacunas, así como productos farmacéuticos intermedios y terminales (substancias activas crudas o el medicamento final)." },
    { t: "ul", x: [
      "Otros Campos Laborales:"
    ] },
    { t: "p", x: "Se desempeñan en el sector público y privado de servicios como centros de investigación, instituciones educativas, en ventas técnicas especializadas (de equipo sofisticado de medición y análisis, equipo industrial de procesos e ingredientes o aditivos para la industria alimentaria y biotecnológica). También en organismos gubernamentales y no gubernamentales de normalización, regulación y supervisión." }
  ] },   // Bioquímica
  8: { laboral: [] },   // Mecatrónica (la página oficial no muestra contenido)
  9: { laboral: [
    { t: "p", x: "Un ingeniero civil es un profesional capacitado para diseñar, construir y mantener infraestructuras como edificios, carreteras, puentes, sistemas de abastecimiento de agua y alcantarillado, entre otros. El campo de trabajo de un ingeniero civil es muy amplio y diverso, ya que estos profesionales pueden trabajar en una amplia gama de industrias y sectores, incluyendo:" },
    { t: "ul", x: [
      "Construcción de edificios residenciales y comerciales: los ingenieros civiles pueden diseñar y construir todo tipo de edificios, desde pequeñas casas hasta grandes rascacielos.",
      "Infraestructura vial: los ingenieros civiles también pueden trabajar en la construcción de carreteras, autopistas y puentes, asegurándose de que estén diseñados y construidos de manera segura y eficiente.",
      "Sistemas de agua y alcantarillado: los ingenieros civiles también pueden trabajar en la planificación, diseño y construcción de sistemas de abastecimiento de agua y alcantarillado, garantizando que las comunidades tengan acceso a agua potable y un sistema de saneamiento adecuado.",
      "Energía y medio ambiente: algunos ingenieros civiles se especializan en la energía y el medio ambiente, trabajando en proyectos como la construcción de plantas de energía renovable o la remediación de sitios contaminados.",
      "Gobierno y sector público: los ingenieros civiles también pueden trabajar para el gobierno y otras organizaciones del sector público, ayudando a planificar y ejecutar proyectos de infraestructura a nivel local, estatal o nacional."
    ] },
    { t: "p", x: "En resumen, el campo de trabajo de un ingeniero civil es muy amplio y ofrece muchas oportunidades para trabajar en diferentes proyectos y sectores." }
  ] },   // Civil
  10: { laboral: [
    { t: "p", x: "Campo Laboral del Licenciado en Gastronomía" },
    { t: "p", x: "El egresado puede desempeñarse en:" },
    { t: "p", x: "Restaurantes y servicios de alimentos" },
    { t: "ul", x: [
      { x: "Chef, sous chef o jefe de cocina", sub: ["Gerente o administrador de restaurantes", "Consultor gastronómico y diseñador de menús"] }
    ] },
    { t: "p", x: "Hoteles y sector turístico" },
    { t: "ul", x: [
      { x: "Chef ejecutivo en hoteles y resorts", sub: ["Gerente de alimentos y bebidas", "Coordinador de banquetes y eventos"] }
    ] },
    { t: "p", x: "Industria de alimentos" },
    { t: "ul", x: [
      { x: "Supervisor de producción y control de calidad", sub: ["Desarrollo e innovación de productos alimenticios", "Implementación de normas de higiene y manejo de alimentos"] }
    ] },
    { t: "p", x: "Emprendimiento" },
    { t: "ul", x: [
      "Creación y dirección de restaurantes, cafeterías y diversos emprendimientos gastronómicos."
    ] },
    { t: "h", x: "Desarrollo de planes de negocio gastronómicos" },
    { t: "p", x: "Sector público y proyectos turísticos" },
    { t: "ul", x: [
      "Desarrollo de proyectos gastronómicos para el impulso turístico regional, estatal y nacional."
    ] }
  ] }   // Gastronomía
};

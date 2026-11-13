// HU-38 · Perfil de Ingreso y Perfil de Egreso OFICIALES (Sprint 4)
// Fuente: página oficial de cada carrera en itsx.edu.mx/oferta-academica/
// REGLA: el texto se copia TAL CUAL de la página oficial (con sus errores). No se resume ni se corrige.
// Clave = id de la carrera en script.js. Cada apartado es una lista de "bloques":
//   { t: "p",  x: "Texto de un párrafo" }
//   { t: "h",  x: "Subtítulo (ej. Conocimientos)" }
//   { t: "ul", x: ["viñeta 1", "viñeta 2"] }          (una viñeta con sub-viñetas: { x: "viñeta", sub: ["a", "b"] })
const perfilIngresoEgreso = {
    1: {   // Sistemas Computacionales
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Ingeniería deberá contar con las siguientes características para ingresar al plan de estudios:",
        "Conocimientos:",
        "Ciencias básicas y exactas.",
        "Informática.",
        "Ciencia y tecnología computacional.",
        "Bases de Metodología de Investigación.",
        "Inglés Básico.",
        "Usos y beneficios de los sistemas computacionales.",
        "Uso y aprovechamiento de redes de computadoras.",
        "Habilidades:",
        "Razonamiento lógico – matemático.",
        "Uso básico de software de aplicación.",
        "Capacidad de abstracción y síntesis.",
        "Gestión de información y uso eficiente de la tecnología.",
        "Capacidad creativa.",
        "Trabajo de forma autónoma.",
        "Capacidad para el trabajo en equipo."
      ] },
      { t: "h", x: "Actitudes y valores" },
      { t: "ul", x: [
        "Interés en los avances de la ciencia y tecnología computacional.",
        "Honesto en el manejo de información confidencial.",
        "Adaptabilidad y apertura al cambio.",
        "Respeto, confidencialidad y empatía con las personas.",
        "Honestidad y responsabilidad.",
        "Liderazgo y humanismo.",
        "Actitud de servicio.",
        "Flexibilidad y disponibilidad.",
        "Participativo y colaborativo.",
        "Entusiasta ante el nuevo aprendizaje."
      ] }
    ],
    egreso: [
      { t: "ul", x: [
        "Diseñar, configurar y administrar redes computacionales aplicando las normas y estándares vigentes."
      ] },
      { t: "p", x: "Desarrollar, implementar y administrar software de sistemas o de aplicación apegado a los estándares de calidad que apoyan la productividad y competitividad de las organizaciones." },
      { t: "ul", x: [
        "Aplicar la Inteligencia Artificial y la Computación Gráfica en la solución de problemas.",
        "Identificar y comprender las tecnologías de hardware para proponer, desarrollar y mantener aplicaciones eficientes."
      ] },
      { t: "p", x: "Diseñar, desarrollar y administrar bases de datos conforme a requerimientos definidos, normas organizacionales de manejo y seguridad de la información, utilizando tecnologías emergentes." },
      { t: "ul", x: [
        "Integrar soluciones computacionales con diferentes tecnologías, plataformas o dispositivos."
      ] },
      { t: "p", x: "Desarrollar una visión empresarial para detectar áreas de oportunidad que le permitan emprender y desarrollar proyectos aplicando las tecnologías de la información y comunicación." },
      { t: "ul", x: [
        "Seleccionar y aplicar herramientas técnicas para el modelado, diseño y desarrollo de tecnología computacional.",
        "Desarrollar Proyectos de Investigación que permitan mejorar la toma de decisiones en procesos específicos y globales en las empresas."
      ] }
    ]
  },
  2: {   // Industrial
    ingreso: [
      { t: "p", x: "El aspirante de ingeniería deberá tener competencias genéricas predictivas en las áreas del pensamiento matemático, pensamiento analítico, estructura de la lengua y compresión lectora, así como manejar competencias disciplinarias básicas e intereses por descubrir nuevos hechos y resolver problemas, trabajo con máquinas, herramientas de mejora y personas, además de la utilización de técnicas administrativas. También debe contar con las siguientes características para ingresar al plan de estudios:" },
      { t: "ul", x: [
        "Conocimientos:",
        "De redacción, ciencias naturales, matemáticas y lógica matemática.",
        "De cultura general.",
        "Cultura ambiental.",
        "Física y química.",
        "Habilidades:",
        "Para comunicarse con las personas independientemente de su situación socioeconómica y nivel educativo.",
        "Habilidad lógica en la comprensión de conceptos y problemas reales.",
        "Para integrarse a equipos de trabajo.",
        "Para la lectura y comprensión de textos.",
        "Para comunicarse en forma oral y escrita.",
        "Interés por la investigación y la tecnología.",
        "Creatividad e interés por la aplicación de la ciencia y la tecnología en beneficio de la región."
      ] },
      { t: "h", x: "Actitudes y valores" },
      { t: "ul", x: [
        "De ayuda a las personas.",
        "De respeto, confidencialidad y empatía con las personas.",
        "De honestidad y responsabilidad.",
        "De liderazgo y humanismo.",
        "Actitud de servicio.",
        "Flexibilidad y disponibilidad."
      ] },
      { t: "p", x: "Lo anterior, garantiza que el (a) egresado (a) pueda realizar actividades dirigidas a la formulación, toma de decisiones y mejoramiento continuo de productos y servicios en empresas." }
    ],
    egreso: [
      { t: "ul", x: [
        "Diseña, mejora e integra sistemas productivos de bienes y servicios aplicando tecnologías para su optimización.",
        "Diseña, implementa y mejora sistemas de trabajo para elevar la productividad.",
        "Implanta sistemas de calidad utilizando métodos estadísticos para mejorar la competitividad de las organizaciones.",
        "Administra sistemas de mantenimiento en procesos de bienes y servicios para la optimización en el uso de los recursos."
      ] },
      { t: "p", x: "Gestiona sistemas de seguridad, salud ocupacional de manera sustentable, en sistemas productivos de bienes y servicios atendiendo los lineamientos legales." },
      { t: "ul", x: [
        "Formula, evalúa y gestiona proyectos de inversión, sociales y de transferencia de tecnología para el desarrollo regional."
      ] },
      { t: "p", x: "Implementa el diseño, el rediseño, el análisis, la operación, la administración, el control, la implantación y la mejora continua de los sistemas productivos y de servicios integrados por personas, materiales, tecnologías, información y recursos financieros." }
    ]
  },
    3: {   // Electromecánica
    ingreso: [
      { t: "p", x: "Para la carrera de ingeniería electromecánica, considera aspirantes con habilidades en el manejo de las matemáticas y la física en general, con un interés especial en todo lo que tenga que ver con la electricidad y la mecánica." }
    ],
    egreso: [
      { t: "p", x: "Formula, gestiona y evalúa proyectos de ingeniería relacionados con sistemas y dispositivos en el área electromecánica, proponiendo soluciones con tecnologías de vanguardia, en el marco del desarrollo sustentable." },
      { t: "p", x: "Diseña e implementa sistemas y dispositivos electromecánicos, utilizando estrategias para el uso eficiente de la energía en los sectores productivo y de servicios apegado a normas y acuerdos nacionales e internacionales vigentes." },
      { t: "p", x: "Diseña e implementa estrategias y programas para el control y/o automatización de los procesos productivos y los dispositivos en los sistemas electromecánicos." },
      { t: "p", x: "Proyectar, gestionar, implementar y controlar actividades de instalación y operación de los sistemas electromecánicos para hacer eficientes los procesos productivos." },
      { t: "ul", x: [
        "Formula administra y supervisa programas de mantenimiento para la continuidad y optimización de procesos productivos.",
        "Genera y participa en proyectos de investigación para el desarrollo científico y tecnológico contribuyendo al bienestar social.",
        "Ejerce actitudes de liderazgo y de trabajo en equipo, para la toma de decisiones a partir de un sentido ético y profesional.",
        "Asume una actitud emprendedora en la creación e incubación de empresas, para el desarrollo económico."
      ] },
      { t: "p", x: "Aplica herramientas computacionales de acuerdo a las tecnologías de vanguardia, para el diseño, simulación y operación de sistemas electromecánicos acordes a la demanda del sector industrial." },
      { t: "ul", x: [
        "Utiliza el lenguaje oral y escrito con claridad y fluidez para interactuar en distintos contextos sociales.",
        "Comprende un segundo idioma para comunicar ideas e interpretar documentos de distinta índole."
      ] }
    ]
  },
  4: { ingreso: [], egreso: [] },   // Gestión Empresarial
  5: { ingreso: [], egreso: [] },   // Electrónica
  6: { ingreso: [], egreso: [] },   // Industrias Alimentarias
  7: { ingreso: [], egreso: [] },   // Bioquímica
  8: { ingreso: [], egreso: [] },   // Mecatrónica
  9: {                              // Civil (ejemplo ya capturado, tomado de la captura de pantalla oficial)
    ingreso: [
      { t: "p", x: "Un aspirante a estudiar la carrera de Ingeniería Civil debe dominar las habilidad en las áreas de matemáticas, física y química, también debe poseer habilidades analíticas y de pensamiento crítico, una mentalidad de resolución de problemas y habilidades de trabajo en equipo." }
    ],
    egreso: [
      { t: "p", x: "Un estudiante de Ingeniería Civil al graduarse debe tener la capacidad de aplicar conocimientos y técnicas para diseñar y construir infraestructuras que satisfagan las necesidades de la sociedad, teniendo en cuenta al mismo tiempo la sostenibilidad del medio ambiente. También debe ser capaz de comunicarse eficazmente, trabajar en equipo y poseer dotes de liderazgo." }
    ]
  },
  10: { ingreso: [], egreso: [] }   // Gastronomía
};

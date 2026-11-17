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
    4: {   // Gestión Empresarial
    ingreso: [
      { t: "p", x: "Los aspirantes a estudiar este programa deberán tener un razonamiento crítico y matemático, ser analíticos, precisos, estructurados, organizados y solucionador de problemar. Además de mostrar interés por el emprendedurismo." },
      { t: "ul", x: [
        "Interesado en cualquiera de los siguientes campos profesionales:"
      ] },
      { t: "h", x: "Las Finanzas y la Administración" },
      { t: "p", x: "Mejora los procesos administrativos y productivos de una empresa del cualquier sector/industria (transformación, gobierno, servicios, salud, educación)." },
      { t: "ul", x: [
        "Crear y dirigir empresas del ramo industrial o de servicios.",
        "Gestionar los procesos productivos y administrativos de una empresa familiar."
      ] }
    ],
    egreso: [
      { t: "p", x: "Desarrollar y aplicar habilidades directivas y la ingeniería en el diseño, creación, gestión, desarrollo, fortalecimiento e innovación de las organizaciones, con una orientación sistémica y sustentable para la toma de decisiones en forma efectiva" },
      { t: "p", x: "Diseñar e innovar estructuras administrativas y procesos, con base en las necesidades de las organizaciones para competir eficientemente en mercados globales." },
      { t: "ul", x: [
        "Gestionar eficientemente los recursos de la organización con visión compartida, con el fin de suministrar bienes y servicios de calidad"
      ] },
      { t: "p", x: "Aplicar métodos cuantitativos y cualitativos para el análisis e interpretación de datos y modelado de sistemas, en los procesos organizacionales para la mejora continua, atendiendo estándares de calidad mundial." },
      { t: "p", x: "Diseñar, evaluar y emprender nuevos negocios y proyectos empresariales, que promuevan el desarrollo sustentable y la responsabilidad social, en un mercado competitivo." },
      { t: "p", x: "Diseñar e implementar estrategias de mercadotecnia basadas en información recopilada de fuentes primarias y secundarias del consumidor o usuario de algún producto, de acuerdo aoportunidades y amenazas del mercado." },
      { t: "ul", x: [
        "Establecer programas para el fortalecimiento de la seguridad e higiene en las organizaciones.",
        "Gestionar sistemas integrales de calidad, ejerciendo un liderazgo efectivo y un compromiso ético, aplicando las herramientas básicas de la ingeniería.",
        "Interpretar y aplicar normas legales que incidan en la creación y desarrollo de las organizaciones.",
        "Integrar, dirigir y desarrollar equipos de trabajo para la mejora continua y el crecimiento integral de las organizaciones."
      ] },
      { t: "p", x: "Analizar e interpretar la información financiera para detectar oportunidades de mejora e inversión en un mundo global, que incidan en la rentabilidad del negocio." },
      { t: "ul", x: [
        "Utilizar las nuevas tecnologías de información en la organización, para optimizar los procesos de comunicación y eficientar la toma de decisiones."
      ] },
      { t: "p", x: "Propiciar el desarrollo del capital humano, para la realización de los objetivos organizacionales, dentro de un marco ético y un contexto multicultural." },
      { t: "ul", x: [
        "Aplicar métodos de investigación para desarrollar e innovar sistemas, procesos y productos en las diferentes dimensiones de la organización.",
        "Gestionar la cadena de suministros de las organizaciones con un enfoque orientado a procesos.",
        "Analizar e interpretar la economía global para facilitar la toma de decisiones en la organización."
      ] }
    ]
  },
    5: {   // Electrónica
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Ingeniería deberá contar con las siguientes características para ingresar al plan de estudios:"
      ] },
      { t: "p", x: "Habilidades para la comprensión lectora, para la comunicación oral y escrita, para el razonamiento matemático y el pensamiento crítico, para adaptarse a diversas situaciones, para la fácil integración a equipos de trabajo, con interés por las ciencias naturales, matemáticas, física, la investigación, la tecnología, la cultura ambiental, que posea creatividad, actitud positiva y valores, con deseos de ayudar a su comunidad." }
    ],
    egreso: [
      { t: "h", x: "Al egresar el ingeniero electrónico podrá" },
      { t: "p", x: "Diseñar, analizar, adaptar, operar, construir dirigir y participar en equipos de trabajo inter y multidisciplinarios en la instalación, operación y mantenimiento en proyectos de investigación y desarrollo tecnológico de sistemas analógicos y digitales. de una manera responsable eficaz, eficiente, legal y ética." },
      { t: "p", x: "Ejercer actitudes emprendedoras de liderazgo y desarrollar habilidades para la toma de decisiones en su ámbito profesional, promoviendo y participando en programas de mejora continúa aplicando normas de calidad." }
    ]
  },
    6: {   // Industrias Alimentarias
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Ingeniería deberá contar con las siguientes características para ingresar al plan de estudios:",
        "Orientación hacia las ciencias de la química, biología, matemáticas y lógica-matemática.",
        "Iniciativa, creatividad e interés por la investigación.",
        "Habilidad para la comunicación oral y de redacción.",
        "Interés de proyectos orientados a la producción y transformación de alimentos.",
        "Interés en el uso y transformación de la materia prima y recursos del sector agropecuario.",
        "Actitudes:",
        "Capacidad de observación, análisis, discusión y síntesis de la información.",
        "Capacidad de trabajo individual y en equipo.",
        "Sensibilidad hacia la problemática social y ambiental.",
        "Aptitudes:",
        "Vocación de servicio.",
        "Curiosidad intelectual orientada a la búsqueda de soluciones.",
        "Responsabilidad, disponibilidad, honestidad, lealtad y disciplina.",
        "Gusto por el trabajo al aire libre."
      ] }
    ],
    egreso: [
      { t: "ul", x: [
        "El egresado en Ingeniería podrá realizar:"
      ] },
      { t: "p", x: "Evalúa sistemas de producción industrial para satisfacer los requerimientos de la industria alimentaria, considerando aspectos de factibilidad y sustentabilidad." },
      { t: "ul", x: [
        "Aplica e innova técnicas tradicionales y emergentes para la conservación de alimentos.",
        "Desarrolla proyectos para la creación de empresas de alimentos.",
        "Aplica herramientas estadísticas para la toma de decisiones en las industrias alimentarias.",
        "Aplica métodos de análisis para la estandarización de procesos y características de los productos.",
        "Inspecciona, controla y evalúa procesos, equipo e instalaciones para asegurar la inocuidad y calidad en la industria alimentaria.",
        "Conoce los sistemas de gestión para cumplir con la normatividad nacional e internacional.",
        "Implementa sistemas de gestión de la calidad e inocuidad en industrias productoras de alimentos y productos relacionados.",
        "Desarrolla nuevos productos para incrementar su valor agregado en la industria alimentaria.",
        "Desarrolla tecnologías para el aprovechamiento de subproductos alimentarios."
      ] },
      { t: "p", x: "Integra cadenas desde el almacenamiento hasta la comercialización de los productos de acuerdo a las oportunidades del mercado nacional e internacional de los cuales se aplican o se mejoran la utilización de los envases, empaque y embalajes de acuerdo con la normatividad de los diferentes productos y del cliente teniendo un enfoque sustentable." }
    ]
  },
    7: {   // Bioquímica
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Ingeniería deberá contar con las siguientes características para ingresar al plan de estudios:",
        "Conocimientos:",
        "De redacción, ciencias naturales, matemáticas y lógica matemática.",
        "De cultura general.",
        "Cultura Ambiental.",
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
        "De Honestidad y responsabilidad.",
        "De liderazgo y humanismo.",
        "Actitud de servicio.",
        "Flexibilidad y disponibilidad."
      ] }
    ],
    egreso: [
      { t: "ul", x: [
        "Trabajar en equipos multidisciplinarios y multiculturales con liderazgo, sentido crítico, disposición al cambio y comprometido con la calidad.",
        "Diseñar, seleccionar, adaptar y escalar equipos y procesos en los que se aprovechen de manera sustentable los recursos bióticos.",
        "Identificar, prevenir, controlar y dar solución a problemas de alta dirección dentro de la práctica de la ingeniería bioquímica.",
        "Identificar y aplicar tecnologías emergentes relacionadas con el campo de acción del Ingeniero Bioquímico."
      ] },
      { t: "p", x: "Participar en el diseño y aplicación de normas y programas de gestión y aseguramiento de la calidad, en empresas e instituciones del ámbito de la Ingeniería Bioquímica." },
      { t: "ul", x: [
        "Formular y evaluar proyectos de Ingeniería Bioquímica con criterios de sustentabilidad.",
        "Realizar investigación científica y tecnológica en el campo de la Ingeniería Bioquímica y difundir sus resultados.",
        "Crear, implementar y administrar con sustentabilidad, empresas de productos y servicios del ámbito de la Ingeniería Bioquímica."
      ] }
    ]
  },
    8: {   // Mecatrónica
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Ingeniería deberá contar con las siguientes características para ingresar al plan de estudios:",
        "Conocimientos:",
        "De redacción, ciencias naturales, matemáticas y lógica matemática.",
        "De cultura general.",
        "Cultura Ambiental.",
        "Física y química.",
        "Habilidades:",
        "Para comunicarse con las personas independientemente de su situación socioeconómica y nivel educativo.",
        "Habilidad lógica en la comprensión de conceptos y problemas reales.",
        "Para integrarse a equipos de trabajo.",
        "Para la lectura y comprensión de textos.",
        "Para comunicarse en forma oral y escrita.",
        "Interés por la investigación y la tecnología.",
        "Creatividad e interés por la aplicación de la ciencia y la tecnología en beneficio de la región.",
        "Actitudes y valores:",
        "De ayuda a las personas.",
        "De respeto, confidencialidad y empatía con las personas.",
        "De Honestidad y responsabilidad.",
        "De liderazgo y humanismo.",
        "Actitud de servicio.",
        "Flexibilidad y disponibilidad."
      ] }
    ],
    egreso: [
      { t: "ul", x: [
        "Al egresar el ingeniero mecatrónico podrá:",
        "Ejercer su profesión, dentro de un marco legal, teniendo un sentido de responsabilidad social, con apego a las normas nacionales e internacionales."
      ] },
      { t: "p", x: "Analizar, sintetizar, diseñar, simular, construir e innovar productos, procesos, equipos y sistemas mecatrónicos, con una actitud investigadora, de acuerdo a las necesidades tecnológicas y sociales actuales y emergentes, impactando positivamente en el entorno global." },
      { t: "p", x: "Integrar, instalar, construir, optimizar, operar, controlar, mantener, administrar y/o automatizar sistemas mecánicos utilizando tecnologías eléctricas, electrónicas y herramientas computacionales." },
      { t: "ul", x: [
        "Evaluar y generar proyectos industriales y de carácter social"
      ] },
      { t: "p", x: "Coordinar y dirigir grupos multidisciplinarios fomentando el trabajo en equipo para la implementación de proyectos mecatrónicos, asegurando su calidad, eficiencia, productividad y rentabilidad con sentido de responsabilidad de su entorno social y cultural para un desarrollo sustentable." },
      { t: "p", x: "Desarrollar capacidades de liderazgo, comunicación e interrelaciones personales para transmitir ideas, facilitar conocimientos, trabajar en equipos multidisciplinarios y multiculturales con responsabilidad colectiva para la solución de problemas y desarrollo de proyectos con un sentido crítico y autocrítico." },
      { t: "p", x: "Ser creativo, emprendedor y comprometido con su actualización profesional continua y autónoma, para estar a la vanguardia en los cambios científicos y tecnológicos que se dan en el ejercicio de su profesión." },
      { t: "p", x: "Interpretar información técnica de las áreas que componen la Ingeniería Mecatrónica para la transferencia, adaptación, asimilación e innovación de tecnologías de vanguardia." }
    ]
  },
  9: {                              // Civil (ejemplo ya capturado, tomado de la captura de pantalla oficial)
    ingreso: [
      { t: "p", x: "Un aspirante a estudiar la carrera de Ingeniería Civil debe dominar las habilidad en las áreas de matemáticas, física y química, también debe poseer habilidades analíticas y de pensamiento crítico, una mentalidad de resolución de problemas y habilidades de trabajo en equipo." }
    ],
    egreso: [
      { t: "p", x: "Un estudiante de Ingeniería Civil al graduarse debe tener la capacidad de aplicar conocimientos y técnicas para diseñar y construir infraestructuras que satisfagan las necesidades de la sociedad, teniendo en cuenta al mismo tiempo la sostenibilidad del medio ambiente. También debe ser capaz de comunicarse eficazmente, trabajar en equipo y poseer dotes de liderazgo." }
    ]
  },
    10: {   // Gastronomía
    ingreso: [
      { t: "ul", x: [
        "El aspirante a Gastronomía deberá contar con las siguientes características para ingresar al plan de estudios:",
        "Conocimientos:",
        "De redacción, ciencias naturales, matemáticas y lógica matemática."
      ] },
      { t: "h", x: "De cultura general" },
      { t: "h", x: "Cultura Ambiental" },
      { t: "h", x: "Física y química" },
      { t: "ul", x: [
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
        "De Honestidad y responsabilidad.",
        "De liderazgo y humanismo.",
        "Actitud de servicio.",
        "Flexibilidad y disponibilidad."
      ] }
    ],
    egreso: [
      { t: "h", x: "Al egresar el gastrónomo podrá" },
      { t: "p", x: "Aplicar los principios básicos de la administración y la contabilidad en las actividades propias de las organizaciones de alimentos y bebidas, para el mejor manejo de los ingresos y egresos" },
      { t: "p", x: "Realizar actividades específicas en el área de ventas y servicio al cliente tales como la creación de programas de comercialización de servicios de alimentos y bebidas." },
      { t: "p", x: "Aplicar los conocimientos mercadológicos para una mejor comercialización de los diferentes productos y servicios que ofrece una empresa de alimentos y bebidas." },
      { t: "ul", x: [
        "Aplicar los conocimientos administrativos básicos en empresas que prestan servicios, compran, transforman y venden alimentos y bebidas.",
        "Comprender el comportamiento físico-químico de los alimentos para mejorar la elaboración, conservación, innovación y presentación de los mismos.",
        "Diseñar estructuras administrativas del ámbito gastronómico acorde a los requisitos, aspectos legales, económicos, financieros y comerciales.",
        "Solucionar problemas y tomar decisiones para el óptimo cumplimiento de las actividades gastronómicas.",
        "Elaborar planes de negocios y establecer controles de calidad de alimentos y bebidas.",
        "Organizar y administrar recursos humanos y técnicos en los establecimientos de Alimentos y Bebidas.",
        "Integrar, organizar, planear y administrar su propio negocio.",
        "Establecer sistemas de información y control en empresas gastronómicas.",
        "Generar estrategias para el logro de los objetivos organizacionales.",
        "Identificar el origen y evolución de la gastronomía mediante el estudio de su desarrollo histórico.",
        "Implementar las diferentes normas nacionales e internacionales de seguridad e higiene, operando programas para el manejo higiénico de los alimentos.",
        "Diseñar, implementar y evaluar los procedimientos de recepción, almacenaje y elaboración de alimentos y bebidas.",
        "Diseñar e implementar cartas y menús.",
        "Diferenciar el origen y procedimientos de elaboración de las principales bebidas alcohólicas y no alcohólicas."
      ] },
      { t: "p", x: "Propiciar la creación y desarrollo de platillos de vanguardia analizando la composición de los alimentos con diversas técnicas y métodos de preparación de la cocina nutricional." },
      { t: "ul", x: [
        "Aplicar los conocimientos de las diferentes cocinas para la elaboración de platillos de autor y fusión."
      ] },
      { t: "p", x: "Manejar software especializado en organización y control del área de producción y del área de servicio para una mejor administración en los establecimientos de alimentos y bebidas." },
      { t: "ul", x: [
        "Aplicar los conocimientos técnicos especializados del idioma francés e inglés en el área gastronómica.",
        "Desarrollar investigación en torno al fenómeno gastronómico desde el punto de vista, cultural, culinario y administrativo para innovar."
      ] }
    ]
  }
};

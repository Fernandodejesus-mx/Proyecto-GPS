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
  4: { laboral: [] },   // Gestión Empresarial
  5: { laboral: [] },   // Electrónica (la página oficial no muestra contenido)
  6: { laboral: [] },   // Industrias Alimentarias
  7: { laboral: [] },   // Bioquímica
  8: { laboral: [] },   // Mecatrónica (la página oficial no muestra contenido)
  9: { laboral: [] },   // Civil
  10: { laboral: [] }   // Gastronomía
};

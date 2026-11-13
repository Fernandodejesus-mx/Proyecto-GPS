// HU-40 · Retícula oficial por carrera (Sprint 4)
// Fuente: página oficial de cada carrera en itsx.edu.mx/oferta-academica/ (sección "Retícula").
// Cada especialidad tiene su retícula oficial en PDF. NO se copia el PDF: se enlaza al oficial.
// Clave = id de la carrera en script.js.
const perfilReticula = {
  1: { titulo: "Retícula Ingeniería en Sistemas Computacionales", especialidades: [
    { nombre: "Cómputo en la Nube", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/ISC_Computo_en_la_nube.pdf" },
    { nombre: "Ciencia de Datos", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/ISC_Ciencia_de_Datos.pdf" } ] },
  2: { titulo: "Retícula Ingeniería Industrial", especialidades: [
    { nombre: "Producción y Mejora Continua de los Procesos", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IIND_Produccion_y_Mejora_01.pdf" },
    { nombre: "Sistemas de Manufactura Integrada", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IIND_Sistemas_de_Manufactura_Integrada.pdf" } ] },
  3: { titulo: "Retícula Ingeniería Electromecánica", especialidades: [
    { nombre: "Automatización en la Industria", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IEME_Automatizacion_en_la_industria.pdf" } ] },
  4: { titulo: "Retícula Ingeniería en Gestión Empresarial", especialidades: [
    { nombre: "Alta Dirección", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IGE_Alta_Direccion.pdf" } ] },
  5: { titulo: "Retícula Ingeniería Electrónica", especialidades: [
    { nombre: "Automatización y Comunicaciones", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IELEC_Automatizacion_y_comunicaciones.pdf" } ] },
  6: { titulo: "Retícula Ingeniería en Industrias Alimentarias", especialidades: [
    { nombre: "Dirección de Procesos Alimentarios Sostenibles", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IIAL_Direccion_de_Procesos_Alimentarios_Sostenibles.pdf" } ] },
  7: { titulo: "Retícula Ingeniería Bioquímica", especialidades: [
    { nombre: "Biotecnología Ambiental", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IBQ_Biotecnologia_Ambiental_1.pdf" },
    { nombre: "Bioprocesos", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IBQ_Bioprocesos.pdf" } ] },
  8: { titulo: "Retícula Ingeniería Mecatrónica", especialidades: [
    { nombre: "Sistemas Mecatrónicos Inteligentes", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/IMCT_Sistemas_Mecatronicos_Inteligentes.pdf" } ] },
  9: { titulo: "Retícula Ingeniería Civil", especialidades: [
    { nombre: "Ingeniería Urbana", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/ICIV_Ingenieria_Urbana.pdf" },
    { nombre: "Planeación y Construcción", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/ICIV- Planeacion_y_Construccion.pdf" } ] },
  10: { titulo: "Retícula Licenciatura en Gastronomía", especialidades: [
    { nombre: "Alta Dirección en Restaurantes y Hoteles", pdf: "https://www.itsx.edu.mx/downloads/reticulas/2025/GAST_Alta_Direccion_en_Restaurantes_y_Hoteles_GASE-DRH-2024-01.pdf" } ] }
};

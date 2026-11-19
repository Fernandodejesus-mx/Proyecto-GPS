// ============================================================
// HU-08 · Cuestionario de intereses profesionales
// T-52 · Estructura de datos  |  T-53 · Captura de preguntas y opciones
// Versión reducida: 5 preguntas por área
// ============================================================
//
// Tres arreglos relacionados entre sí:
//
//   areasCuestionario      Áreas profesionales (7)
//       id, nombre, descripcion, carreras
//
//   preguntasCuestionario  Preguntas del cuestionario (35 = 7 áreas x 5)
//       id, idArea (debe coincidir con el id de un área), texto,
//       idOriginal (id que tenía la pregunta en el banco de 140 de la T-50)
//
//   escalaCuestionario     Cinco opciones de respuesta, iguales para todas
//                          las preguntas. "valor" es el puntaje (0 a 4)
//                          que se usa en el cálculo de resultados.
//
// Relación: UNA área tiene VARIAS preguntas; TODAS las preguntas usan la
// misma escala de respuesta.
//
// Puntaje máximo por área: 5 preguntas x 4 puntos = 20 (se calcula solo
// en resultados.js; no hay que cambiar nada más al agregar o quitar preguntas).
//
// Las 5 preguntas de cada área se eligieron del banco de 140 para cubrir
// temas distintos de esa área. Equivalencia de identificadores:
//       AP-01-P01  <-  AP-01-P01
//       AP-01-P02  <-  AP-01-P03
//       AP-01-P03  <-  AP-01-P04
//       AP-01-P04  <-  AP-01-P08
//       AP-01-P05  <-  AP-01-P19
//       AP-02-P01  <-  AP-02-P01
//       AP-02-P02  <-  AP-02-P03
//       AP-02-P03  <-  AP-02-P04
//       AP-02-P04  <-  AP-02-P08
//       AP-02-P05  <-  AP-02-P10
//       AP-03-P01  <-  AP-03-P01
//       AP-03-P02  <-  AP-03-P03
//       AP-03-P03  <-  AP-03-P04
//       AP-03-P04  <-  AP-03-P06
//       AP-03-P05  <-  AP-03-P18
//       AP-04-P01  <-  AP-04-P01
//       AP-04-P02  <-  AP-04-P02
//       AP-04-P03  <-  AP-04-P03
//       AP-04-P04  <-  AP-04-P04
//       AP-04-P05  <-  AP-04-P12
//       AP-05-P01  <-  AP-05-P01
//       AP-05-P02  <-  AP-05-P03
//       AP-05-P03  <-  AP-05-P06
//       AP-05-P04  <-  AP-05-P07
//       AP-05-P05  <-  AP-05-P08
//       AP-06-P01  <-  AP-06-P01
//       AP-06-P02  <-  AP-06-P02
//       AP-06-P03  <-  AP-06-P03
//       AP-06-P04  <-  AP-06-P05
//       AP-06-P05  <-  AP-06-P08
//       AP-07-P01  <-  AP-07-P01
//       AP-07-P02  <-  AP-07-P02
//       AP-07-P03  <-  AP-07-P04
//       AP-07-P04  <-  AP-07-P05
//       AP-07-P05  <-  AP-07-P13
// ============================================================

const areasCuestionario = [
  {"id":"AP-01","nombre":"Tecnología y sistemas","descripcion":"Interés por software, computadoras, datos y soluciones digitales.","carreras":"Ingeniería en Sistemas Computacionales"},
  {"id":"AP-02","nombre":"Gestión y negocios","descripcion":"Interés por organizar recursos, coordinar proyectos y desarrollar negocios.","carreras":"Ingeniería en Gestión Empresarial"},
  {"id":"AP-03","nombre":"Industria y procesos","descripcion":"Interés por mejorar producción, calidad, logística y eficiencia.","carreras":"Ingeniería Industrial"},
  {"id":"AP-04","nombre":"Electrónica y automatización","descripcion":"Interés por sistemas eléctricos, electrónicos, máquinas y control automático.","carreras":"Ingeniería Electrónica, Electromecánica y Mecatrónica"},
  {"id":"AP-05","nombre":"Ciencias y alimentos","descripcion":"Interés por experimentos, laboratorio, química, procesos y calidad de alimentos.","carreras":"Ingeniería Bioquímica e Ingeniería en Industrias Alimentarias"},
  {"id":"AP-06","nombre":"Construcción e infraestructura","descripcion":"Interés por estructuras, planos, obras civiles y planificación de espacios.","carreras":"Ingeniería Civil"},
  {"id":"AP-07","nombre":"Gastronomía y servicios","descripcion":"Interés por preparación de alimentos, creación de menús y operación de servicios gastronómicos.","carreras":"Licenciatura en Gastronomía"}
];

const preguntasCuestionario = [
  {"id":"AP-01-P01","idArea":"AP-01","texto":"¿Te interesa desarrollar programas o aplicaciones informáticas?","idOriginal":"AP-01-P01"},
  {"id":"AP-01-P02","idArea":"AP-01","texto":"¿Te interesa diseñar páginas web o aplicaciones para dispositivos móviles?","idOriginal":"AP-01-P03"},
  {"id":"AP-01-P03","idArea":"AP-01","texto":"¿Te gustaría investigar cómo funcionan las redes y los sistemas informáticos?","idOriginal":"AP-01-P04"},
  {"id":"AP-01-P04","idArea":"AP-01","texto":"¿Te gustaría diseñar bases de datos para organizar información?","idOriginal":"AP-01-P08"},
  {"id":"AP-01-P05","idArea":"AP-01","texto":"¿Te interesa aprender sobre inteligencia artificial y sus aplicaciones?","idOriginal":"AP-01-P19"},
  {"id":"AP-02-P01","idArea":"AP-02","texto":"¿Te interesa organizar proyectos y coordinar las actividades de un equipo?","idOriginal":"AP-02-P01"},
  {"id":"AP-02-P02","idArea":"AP-02","texto":"¿Te interesa crear un plan para iniciar un negocio?","idOriginal":"AP-02-P03"},
  {"id":"AP-02-P03","idArea":"AP-02","texto":"¿Te gustaría analizar información para tomar decisiones empresariales?","idOriginal":"AP-02-P04"},
  {"id":"AP-02-P04","idArea":"AP-02","texto":"¿Te gustaría elaborar presupuestos y controlar gastos?","idOriginal":"AP-02-P08"},
  {"id":"AP-02-P05","idArea":"AP-02","texto":"¿Te gustaría proponer estrategias para atraer clientes?","idOriginal":"AP-02-P10"},
  {"id":"AP-03-P01","idArea":"AP-03","texto":"¿Te interesa encontrar formas de mejorar los procesos de producción?","idOriginal":"AP-03-P01"},
  {"id":"AP-03-P02","idArea":"AP-03","texto":"¿Te interesa analizar la calidad de los productos?","idOriginal":"AP-03-P03"},
  {"id":"AP-03-P03","idArea":"AP-03","texto":"¿Te gustaría reducir desperdicios y aprovechar mejor los recursos?","idOriginal":"AP-03-P04"},
  {"id":"AP-03-P04","idArea":"AP-03","texto":"¿Te gustaría medir tiempos y movimientos en un proceso de trabajo?","idOriginal":"AP-03-P06"},
  {"id":"AP-03-P05","idArea":"AP-03","texto":"¿Te gustaría planear la entrega de productos a tiempo?","idOriginal":"AP-03-P18"},
  {"id":"AP-04-P01","idArea":"AP-04","texto":"¿Te interesa trabajar con circuitos y componentes electrónicos?","idOriginal":"AP-04-P01"},
  {"id":"AP-04-P02","idArea":"AP-04","texto":"¿Te gustaría comprender cómo funcionan los sistemas eléctricos?","idOriginal":"AP-04-P02"},
  {"id":"AP-04-P03","idArea":"AP-04","texto":"¿Te interesa diseñar sistemas que realicen tareas automáticamente?","idOriginal":"AP-04-P03"},
  {"id":"AP-04-P04","idArea":"AP-04","texto":"¿Te gustaría reparar o mejorar el funcionamiento de máquinas y dispositivos?","idOriginal":"AP-04-P04"},
  {"id":"AP-04-P05","idArea":"AP-04","texto":"¿Te gustaría conocer cómo funcionan los robots?","idOriginal":"AP-04-P12"},
  {"id":"AP-05-P01","idArea":"AP-05","texto":"¿Te interesa realizar experimentos para comprender fenómenos científicos?","idOriginal":"AP-05-P01"},
  {"id":"AP-05-P02","idArea":"AP-05","texto":"¿Te interesa participar en la elaboración o mejora de productos alimenticios?","idOriginal":"AP-05-P03"},
  {"id":"AP-05-P03","idArea":"AP-05","texto":"¿Te gustaría conocer cómo ocurren las reacciones químicas?","idOriginal":"AP-05-P06"},
  {"id":"AP-05-P04","idArea":"AP-05","texto":"¿Te interesa analizar muestras en un laboratorio?","idOriginal":"AP-05-P07"},
  {"id":"AP-05-P05","idArea":"AP-05","texto":"¿Te gustaría investigar cómo se conservan los alimentos?","idOriginal":"AP-05-P08"},
  {"id":"AP-06-P01","idArea":"AP-06","texto":"¿Te interesa diseñar edificios, viviendas u otras construcciones?","idOriginal":"AP-06-P01"},
  {"id":"AP-06-P02","idArea":"AP-06","texto":"¿Te gustaría participar en la planificación de carreteras y otras obras?","idOriginal":"AP-06-P02"},
  {"id":"AP-06-P03","idArea":"AP-06","texto":"¿Te interesa conocer las propiedades de los materiales de construcción?","idOriginal":"AP-06-P03"},
  {"id":"AP-06-P04","idArea":"AP-06","texto":"¿Te interesa interpretar planos de una construcción?","idOriginal":"AP-06-P05"},
  {"id":"AP-06-P05","idArea":"AP-06","texto":"¿Te gustaría participar en la supervisión de una obra?","idOriginal":"AP-06-P08"},
  {"id":"AP-07-P01","idArea":"AP-07","texto":"¿Te interesa preparar alimentos utilizando diferentes técnicas culinarias?","idOriginal":"AP-07-P01"},
  {"id":"AP-07-P02","idArea":"AP-07","texto":"¿Te gustaría experimentar con ingredientes para crear nuevos platillos?","idOriginal":"AP-07-P02"},
  {"id":"AP-07-P03","idArea":"AP-07","texto":"¿Te gustaría planear menús para diferentes tipos de clientes?","idOriginal":"AP-07-P04"},
  {"id":"AP-07-P04","idArea":"AP-07","texto":"¿Te interesa conocer técnicas de presentación y decoración de platillos?","idOriginal":"AP-07-P05"},
  {"id":"AP-07-P05","idArea":"AP-07","texto":"¿Te interesa coordinar el trabajo del personal de cocina?","idOriginal":"AP-07-P13"}
];

const escalaCuestionario = [
  {"valor":0,"texto":"No me interesa"},
  {"valor":1,"texto":"Me interesa poco"},
  {"valor":2,"texto":"No estoy seguro"},
  {"valor":3,"texto":"Me interesa"},
  {"valor":4,"texto":"Me interesa mucho"}
];
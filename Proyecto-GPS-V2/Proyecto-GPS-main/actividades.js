// ============================================================
// HU-06 · Actividades relacionadas con cada carrera
// T-41 · Estructura de datos  |  T-42 · Captura de actividades
// ============================================================
//
// Cada actividad es un objeto con 5 campos:
//
//   id          (texto)   Identificador único. Formato: CÓDIGO-A# (ej. "ISC-A1")
//   carreraId   (número)  id de la carrera a la que pertenece. Debe coincidir
//                         con el campo "id" del arreglo "carreras" de script.js
//   nombre      (texto)   Título corto de la actividad
//   descripcion (texto)   En qué consiste la actividad (1 o 2 oraciones)
//   aspecto     (texto)   Aspecto de la carrera que representa la actividad
//
// Relación: UNA carrera tiene VARIAS actividades (1 a muchas).
//
// carreraId 1 a 4: carreras ya existentes en script.js.
// carreraId 5 a 10: carreras por agregar al sistema (ids propuestos en T-41).
// ============================================================

const actividades = [
  // 1. Ingeniería en Sistemas Computacionales
  { id: "ISC-A1", carreraId: 1, nombre: "Encuentra el error en el programa", descripcion: "Revisa un fragmento corto de código que no funciona y descubre qué instrucción provoca la falla.", aspecto: "Desarrollo de software" },
  { id: "ISC-A2", carreraId: 1, nombre: "Organiza la información de una tienda", descripcion: "Decide en qué tablas guardar los datos de productos, clientes y ventas para encontrarlos fácilmente.", aspecto: "Bases de datos" },
  { id: "ISC-A3", carreraId: 1, nombre: "Conecta la red de una oficina", descripcion: "Elige cómo conectar computadoras, impresora y servidor para que todos puedan trabajar sin interrupciones.", aspecto: "Redes e infraestructura tecnológica" },

  // 2. Ingeniería Industrial
  { id: "IND-A1", carreraId: 2, nombre: "Mejora una línea de producción", descripcion: "Observa el recorrido de un producto en una línea de trabajo y propón cómo reducir los tiempos de espera.", aspecto: "Mejora de procesos y productividad" },
  { id: "IND-A2", carreraId: 2, nombre: "Detecta productos defectuosos", descripcion: "Revisa una muestra de productos, registra cuántos no cumplen las especificaciones y decide si el lote se acepta.", aspecto: "Calidad" },
  { id: "IND-A3", carreraId: 2, nombre: "Organiza un almacén", descripcion: "Acomoda productos y elige la ruta de entrega más corta para surtir los pedidos a tiempo.", aspecto: "Logística y cadena de suministro" },

  // 3. Ingeniería Electromecánica
  { id: "EMC-A1", carreraId: 3, nombre: "Reduce el consumo de energía", descripcion: "Analiza el consumo de los equipos de un edificio y decide cuáles conviene cambiar para ahorrar energía.", aspecto: "Eficiencia energética" },
  { id: "EMC-A2", carreraId: 3, nombre: "Planea el mantenimiento de un motor", descripcion: "Ordena las revisiones que necesita un motor industrial para evitar que falle durante la producción.", aspecto: "Mantenimiento de sistemas electromecánicos" },
  { id: "EMC-A3", carreraId: 3, nombre: "Automatiza una banda transportadora", descripcion: "Define cuándo debe arrancar y detenerse una banda para mover piezas sin que se acumulen.", aspecto: "Automatización de procesos" },

  // 4. Ingeniería en Gestión Empresarial
  { id: "GEM-A1", carreraId: 4, nombre: "Calcula si un negocio es rentable", descripcion: "Con los ingresos y gastos de una cafetería, determina si el negocio deja ganancias.", aspecto: "Finanzas" },
  { id: "GEM-A2", carreraId: 4, nombre: "Diseña una promoción", descripcion: "Elige a quién dirigirte y qué mensaje usar para dar a conocer un producto nuevo.", aspecto: "Mercadotecnia" },
  { id: "GEM-A3", carreraId: 4, nombre: "Forma un equipo de trabajo", descripcion: "Asigna a cada persona el rol que mejor se ajusta a sus habilidades para lograr una meta de la empresa.", aspecto: "Recursos humanos y dirección de equipos" },

  // 5. Ingeniería en Electrónica
  { id: "ELN-A1", carreraId: 5, nombre: "Arma un circuito sencillo", descripcion: "Conecta una fuente, una resistencia y un LED en el orden correcto para lograr que la luz encienda.", aspecto: "Sistemas electrónicos analógicos" },
  { id: "ELN-A2", carreraId: 5, nombre: "Diagnostica un equipo que no enciende", descripcion: "Sigue un procedimiento paso a paso para descubrir en qué parte de un equipo se encuentra la falla.", aspecto: "Operación y mantenimiento de equipos" },
  { id: "ELN-A3", carreraId: 5, nombre: "Controla una luz con un sensor", descripcion: "Define las reglas para que una lámpara se encienda sola cuando el sensor detecte poca luz.", aspecto: "Automatización y sistemas digitales" },

  // 6. Ingeniería en Industrias Alimentarias
  { id: "ALI-A1", carreraId: 6, nombre: "Diseña un nuevo producto alimenticio", descripcion: "Elige los ingredientes y las características de una botana nueva pensando en qué le gustaría a los consumidores.", aspecto: "Desarrollo de productos" },
  { id: "ALI-A2", carreraId: 6, nombre: "Detecta riesgos en un proceso", descripcion: "Revisa los pasos de producción de un alimento e identifica en cuáles podría contaminarse.", aspecto: "Inocuidad y control de calidad" },
  { id: "ALI-A3", carreraId: 6, nombre: "Elige cómo conservar un alimento", descripcion: "Compara métodos como refrigerar, deshidratar o envasar y decide cuál es mejor para cada producto.", aspecto: "Conservación de alimentos" },

  // 7. Ingeniería en Bioquímica
  { id: "BIO-A1", carreraId: 7, nombre: "Elige las condiciones de un proceso biológico", descripcion: "Decide la temperatura y el tiempo adecuados para que un proceso de fermentación dé buenos resultados.", aspecto: "Bioprocesos" },
  { id: "BIO-A2", carreraId: 7, nombre: "Interpreta una prueba de laboratorio", descripcion: "Revisa los resultados de una muestra y decide si el producto cumple con los requisitos de calidad.", aspecto: "Control de calidad" },
  { id: "BIO-A3", carreraId: 7, nombre: "Aprovecha residuos orgánicos", descripcion: "Propón cómo convertir residuos orgánicos en un producto útil de manera sustentable.", aspecto: "Biotecnología ambiental y sustentabilidad" },

  // 8. Ingeniería Mecatrónica
  { id: "MEC-A1", carreraId: 8, nombre: "Programa el movimiento de un brazo robótico", descripcion: "Define la secuencia de movimientos para que un brazo tome una pieza y la coloque en otro lugar.", aspecto: "Robótica y automatización" },
  { id: "MEC-A2", carreraId: 8, nombre: "Combina mecánica y electrónica", descripcion: "Elige el motor, el sensor y el controlador necesarios para que un mecanismo funcione solo.", aspecto: "Integración de sistemas mecatrónicos" },
  { id: "MEC-A3", carreraId: 8, nombre: "Prueba un diseño antes de construirlo", descripcion: "Usa una simulación para comprobar si una pieza resiste antes de fabricarla.", aspecto: "Diseño y simulación" },

  // 9. Ingeniería Civil
  { id: "CIV-A1", carreraId: 9, nombre: "Planea la construcción de una casa", descripcion: "Ordena las etapas de una obra pequeña, desde el terreno hasta los acabados.", aspecto: "Planeación y gestión de obras" },
  { id: "CIV-A2", carreraId: 9, nombre: "Elige dónde construir un puente", descripcion: "Compara dos terrenos considerando la seguridad, el costo y el tráfico que usará el puente.", aspecto: "Diseño de infraestructura" },
  { id: "CIV-A3", carreraId: 9, nombre: "Lleva agua a una comunidad", descripcion: "Decide por dónde conviene pasar la tubería para que el agua llegue a todas las casas.", aspecto: "Sistemas de agua y saneamiento" },

  // 10. Licenciatura en Gastronomía
  { id: "GAS-A1", carreraId: 10, nombre: "Diseña un menú", descripcion: "Arma un menú de tres tiempos para un restaurante, cuidando que los platillos combinen y sean rentables.", aspecto: "Diseño de menús y técnicas culinarias" },
  { id: "GAS-A2", carreraId: 10, nombre: "Calcula el costo de un platillo", descripcion: "Suma el costo de los ingredientes y decide el precio de venta para que el restaurante gane.", aspecto: "Administración de establecimientos" },
  { id: "GAS-A3", carreraId: 10, nombre: "Detecta fallas de higiene en la cocina", descripcion: "Observa una situación de cocina e identifica qué prácticas pueden contaminar los alimentos.", aspecto: "Seguridad e higiene alimentaria" }
];

// Devuelve las actividades de una carrera (se usará en la vista de actividades)
function obtenerActividades(carreraId) {
  return actividades.filter(a => a.carreraId === carreraId);
}

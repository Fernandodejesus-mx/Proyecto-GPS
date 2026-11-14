// HU-39 · Visor del perfil: portada, historias deslizables y vista de lista (archivo de Gloria)
// Se abre desde script.js:  if (tab === "perfil") { abrirVisorPerfil(c); return; }

const estadoPerfil = { carreraId: null, indice: 0, descubiertas: new Set(), volteada: false };
let carreraVisor = null;
let modoVisor = "portada";   // portada | historia | lista | final

function visorEl() { return document.getElementById("visorPerfil"); }

function abrirVisorPerfil(carrera) {
  if (estadoPerfil.carreraId !== carrera.id) {
    estadoPerfil.carreraId = carrera.id; estadoPerfil.indice = 0; estadoPerfil.descubiertas = new Set(); estadoPerfil.volteada = false;
  }
  carreraVisor = carrera;
  document.getElementById("panelDetalle").innerHTML = `<div id="visorPerfil" class="visor"></div>`;
  mostrarPortada();
}

function mostrarPortada() {
  modoVisor = "portada";
  const n = obtenerApartados(carreraVisor.id).length;
  visorEl().innerHTML = `
    <div class="visor-portada">
      <p class="visor-etiqueta">PERFIL DE LA CARRERA</p>
      <h2>${escaparPerfil(carreraVisor.nombre)}</h2>
      <p class="visor-pregunta">¿Cómo será tu carrera?</p>
      <p class="visor-n">${n} apartados por descubrir</p>
      <div class="visor-botones">
        <button id="visorEmpezar" type="button">Empezar</button>
        <button id="visorLista" type="button" class="visor-sec">Ver como lista</button>
      </div>
    </div>`;
  document.getElementById("visorEmpezar").addEventListener("click", () => irAHistoria(0));
  document.getElementById("visorLista").addEventListener("click", () => mostrarLista());
}

// Alternativa accesible: todos los apartados con su texto oficial completo, sin gestos ni animaciones
function mostrarLista() {
  modoVisor = "lista";
  const aps = obtenerApartados(carreraVisor.id);
  visorEl().innerHTML = `
    <div class="visor-lista">
      <p class="visor-etiqueta">PERFIL DE LA CARRERA · LISTA</p>
      <h2>${escaparPerfil(carreraVisor.nombre)}</h2>
      ${aps.map(ap => `
        <section class="visor-item">
          <h3><span aria-hidden="true">${ap.icono}</span> ${escaparPerfil(ap.titular)}</h3>
          <p class="visor-item-nombre">${escaparPerfil(ap.nombre)}</p>
          <div class="carta-texto">${textoApartadoHTML(ap)}</div>
        </section>`).join("")}
      <button id="visorHistorias" type="button" class="visor-sec">Ver como historias</button>
    </div>`;
  document.getElementById("visorHistorias").addEventListener("click", mostrarPortada);
}
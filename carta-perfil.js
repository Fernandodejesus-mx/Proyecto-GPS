// HU-40 · Carta de dos caras, giro, contador "Descubiertas X de N" y barra de progreso (archivo de Fernando)
// El visor (Gloria) llama a crearCartaApartado dentro de cada historia.

// T-ESTRUCTURA · devuelve un <div class="carta-apartado"> con frente (botón) y reverso
function crearCartaApartado(apartado, numero, total, estado) {
  const el = document.createElement("div");
  el.className = "carta-apartado" + (estado.volteada ? " volteada" : "");
  el.dataset.id = apartado.id;
  el.innerHTML = `
    <button class="carta-frente" type="button" aria-pressed="${estado.volteada}" aria-label="Voltear carta: ${escaparPerfil(apartado.titular)}">
      <span class="carta-icono" aria-hidden="true">${apartado.icono}</span>
      <strong class="carta-titular">${escaparPerfil(apartado.titular)}</strong>
      <em class="carta-pista">Toca la carta para ver el texto oficial</em>
    </button>
    <div class="carta-reverso">
      <p class="carta-etiqueta">${escaparPerfil(apartado.nombre.toUpperCase())} · ${numero} DE ${total}</p>
      <div class="carta-texto">${textoApartadoHTML(apartado)}</div>
      <p class="carta-fuente">Fuente: página oficial del ITSX</p>
      <button class="carta-volver" type="button">Voltear de nuevo</button>
    </div>`;
  el.querySelector(".carta-frente").addEventListener("click", () => voltearCarta(el, apartado, true));
  el.querySelector(".carta-volver").addEventListener("click", () => voltearCarta(el, apartado, false));
  return el;
}
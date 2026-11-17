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

// Contador "Descubiertas: X de N" (el visor crea el elemento .contador-descubiertas)
function actualizarContador(estado, total) {
  const el = document.querySelector(".contador-descubiertas");
  if (el) el.textContent = `Descubiertas: ${estado.descubiertas.size} de ${total}`;
}

// Barra de progreso: los segmentos de las cartas descubiertas se marcan en amarillo
function marcarBarras() {
  const aps = obtenerApartados(estadoPerfil.carreraId);
  document.querySelectorAll(".visor-barra").forEach((b, i) => b.classList.toggle("descubierta", !!aps[i] && estadoPerfil.descubiertas.has(aps[i].id)));
}

// Giro: alterna .volteada. Solo la primera vez que se voltea una carta cuenta como descubierta.
function voltearCarta(el, apartado, volteada) {
  el.classList.toggle("volteada", volteada);
  estadoPerfil.volteada = volteada;
  el.querySelector(".carta-frente").setAttribute("aria-pressed", String(volteada));
  if (!volteada || estadoPerfil.descubiertas.has(apartado.id)) return;
  estadoPerfil.descubiertas.add(apartado.id);
  const total = obtenerApartados(estadoPerfil.carreraId).length;
  actualizarContador(estadoPerfil, total);
  marcarBarras();
  document.dispatchEvent(new CustomEvent("carta-descubierta", { detail: { carreraId: estadoPerfil.carreraId, apartadoId: apartado.id, descubiertas: estadoPerfil.descubiertas.size, total } }));
}
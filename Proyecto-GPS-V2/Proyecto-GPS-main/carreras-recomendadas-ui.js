// ============================================================
// T-67 a T-71: Pantalla Carreras Recomendadas - Lógica de presentación
// Integrada en Proyecto-GPS-main
// ============================================================

(function () {
  const $ = id => document.getElementById(id);
  const API = window.CarrerasRecomendadasAPI;
  const Data = window.CarrerasRecomendadasData;

  // Estado
  let selectedResultadoId = null;
  let sortCriterion = 'nivel';
  let sidePanelOpen = false;
  let modalOpen = false;

  // Elementos DOM
  const DOM = {
    // Selector
    resultadoSelect: null,
    // Tarjeta resultado
    resultadoCard: null,
    cardResultadoIcon: null,
    cardResultadoNombre: null,
    cardResultadoArea: null,
    cardResultadoDescripcion: null,
    // Controles
    sortControls: null,
    sortSelect: null,
    // Grid carreras
    carrerasGrid: null,
    emptyState: null,
    noCarrerasState: null,
    noCarrerasMsg: null,
    // Side panel
    sidePanel: null,
    closePanel: null,
    emptySidePanel: null,
    resultadoDetail: null,
    resultadoIcon: null,
    resultadoNombre: null,
    resultadoArea: null,
    resultadoDescripcion: null,
    resumenStats: null,
    resumenLista: null,
    // Modal
    modalOverlay: null,
    closeModal: null,
    modalTitle: null,
    modalBody: null
  };

  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    // Cachear elementos DOM
    cacheDOM();
    // Poblar selector
    populateResultadoSelect();
    // Event listeners
    setupEventListeners();
    // Verificar parámetro URL ?resultado=X (integración T-70)
    checkURLParam();
    console.log('✅ Carreras Recomendadas inicializado');
  });

  function cacheDOM() {
    DOM.resultadoSelect = $('crResultadoSelect');
    DOM.resultadoCard = $('crResultadoCard');
    DOM.cardResultadoIcon = $('crCardResultadoIcon');
    DOM.cardResultadoNombre = $('crCardResultadoNombre');
    DOM.cardResultadoArea = $('crCardResultadoArea');
    DOM.cardResultadoDescripcion = $('crCardResultadoDescripcion');
    DOM.sortControls = $('crSortControls');
    DOM.sortSelect = $('crSortSelect');
    DOM.carrerasGrid = $('crCarrerasGrid');
    DOM.emptyState = $('crEmptyState');
    DOM.noCarrerasState = $('crNoCarrerasState');
    DOM.noCarrerasMsg = $('crNoCarrerasMsg');
    DOM.sidePanel = $('crSidePanel');
    DOM.closePanel = $('crClosePanel');
    DOM.emptySidePanel = $('crEmptySidePanel');
    DOM.resultadoDetail = $('crResultadoDetail');
    DOM.resultadoIcon = $('crResultadoIcon');
    DOM.resultadoNombre = $('crResultadoNombre');
    DOM.resultadoArea = $('crResultadoArea');
    DOM.resultadoDescripcion = $('crResultadoDescripcion');
    DOM.resumenStats = $('crResumenStats');
    DOM.resumenLista = $('crResumenLista');
    DOM.modalOverlay = $('crModalOverlay');
    DOM.closeModal = $('crCloseModal');
    DOM.modalTitle = $('crModalTitle');
    DOM.modalBody = $('crModalBody');
  }

  function populateResultadoSelect() {
    const resultados = API.getAllResultados();
    const select = DOM.resultadoSelect;
    while (select.options.length > 1) select.remove(1);
    resultados.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.nombre;
      select.appendChild(opt);
    });
  }

  function setupEventListeners() {
    DOM.resultadoSelect.addEventListener('change', handleResultadoChange);
    DOM.sortSelect.addEventListener('change', handleSortChange);
    DOM.closePanel.addEventListener('click', closeSidePanel);
    DOM.closeModal.addEventListener('click', closeModal);
    DOM.modalOverlay.addEventListener('click', e => { if (e.target === DOM.modalOverlay) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (modalOpen) closeModal();
        if (sidePanelOpen) closeSidePanel();
      }
    });
  }

  function checkURLParam() {
    const params = new URLSearchParams(window.location.search);
    const r = params.get('resultado');
    if (r) {
      const id = parseInt(r);
      if (!isNaN(id) && API.getResultadoById(id)) {
        DOM.resultadoSelect.value = id;
        handleResultadoChange({ target: { value: id } });
        history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }

  function handleResultadoChange(e) {
    const id = parseInt(e.target.value) || null;
    selectedResultadoId = id;
    if (id) {
      showResultadoCard(id);
      showSortControls();
      renderCarreras(id);
      updateSidePanel(id);
    } else {
      hideResultadoCard();
      hideSortControls();
      showEmptyState();
      resetSidePanel();
    }
  }

  function handleSortChange(e) {
    sortCriterion = e.target.value;
    if (selectedResultadoId) renderCarreras(selectedResultadoId);
  }

  function renderCarreras(resultadoId) {
    const relaciones = API.getRelacionesByResultado(resultadoId);
    const sorted = API.sortCarreras(relaciones, sortCriterion);

    DOM.emptyState.style.display = 'none';
    DOM.noCarrerasState.style.display = 'none';

    if (sorted.length === 0) {
      showNoCarrerasState();
      return;
    }

    DOM.carrerasGrid.innerHTML = sorted.map((rel, i) => createCarreraCard(rel, i)).join('');
    attachCarreraCardListeners();
  }

  function createCarreraCard(rel, index) {
    const c = rel.carrera;
    const nivel = rel.nivelRelacion;
    const nivelTexto = API.getNivelTexto(nivel);
    const nivelClass = API.getNivelClass(nivel);
    const icon = API.CARRERA_ICONS[c.id] || '📚';

    return `
      <article class="cr-carrera-card" data-carrera-id="${c.id}" style="animation-delay: ${index * 50}ms" tabindex="0" role="listitem" aria-label="${c.nombre}, nivel de relación ${nivelTexto.toLowerCase()}">
        <div class="cr-card-header">
          <div class="cr-carrera-icon" aria-hidden="true">${icon}</div>
          <div class="cr-carrera-info">
            <h3 class="cr-carrera-nombre">${API.escapeHtml(c.nombre)}</h3>
            <span class="cr-carrera-clave">${API.escapeHtml(c.clave)}</span>
            <span class="cr-nivel-relacion ${nivelClass}" aria-label="Nivel de relación: ${nivelTexto}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              ${nivelTexto}
            </span>
          </div>
        </div>
        <p class="cr-carrera-explicacion">${API.escapeHtml(rel.explicacion)}</p>
        <div class="cr-card-footer">
          <button class="cr-btn-detalle" data-carrera-id="${c.id}" aria-label="Ver detalle de ${API.escapeHtml(c.nombre)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Ver detalle
          </button>
        </div>
      </article>
    `;
  }

  function attachCarreraCardListeners() {
    document.querySelectorAll('.cr-btn-detalle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openCarreraModal(parseInt(btn.dataset.carreraId));
      });
    });
    document.querySelectorAll('.cr-carrera-card').forEach(card => {
      card.addEventListener('click', () => openCarreraModal(parseInt(card.dataset.carreraId)));
    });
  }

  function showNoCarrerasState() {
    const r = API.getResultadoById(selectedResultadoId);
    DOM.noCarrerasMsg.textContent = r
      ? `El resultado "${r.nombre}" no tiene carreras asociadas en la matriz actual.`
      : 'Este resultado no tiene carreras asociadas en la matriz actual.';
    DOM.noCarrerasState.style.display = 'flex';
  }

  function showEmptyState() {
    DOM.emptyState.style.display = 'flex';
    DOM.noCarrerasState.style.display = 'none';
    DOM.carrerasGrid.innerHTML = '';
  }

  function showResultadoCard(id) {
    const r = API.getResultadoById(id);
    if (!r) return;
    DOM.cardResultadoIcon.textContent = r.icon;
    DOM.cardResultadoNombre.textContent = r.nombre;
    DOM.cardResultadoArea.textContent = r.area;
    DOM.cardResultadoDescripcion.textContent = r.descripcion;
    DOM.resultadoCard.style.display = 'block';
  }

  function hideResultadoCard() { DOM.resultadoCard.style.display = 'none'; }

  function showSortControls() { DOM.sortControls.style.display = 'flex'; }
  function hideSortControls() { DOM.sortControls.style.display = 'none'; }

  function updateSidePanel(resultadoId) {
    const r = API.getResultadoById(resultadoId);
    if (!r) return;

    const rels = API.getRelacionesByResultado(resultadoId);
    const sorted = API.sortCarreras(rels, 'nivel');

    const counts = { alto: 0, medio: 0, bajo: 0 };
    sorted.forEach(x => {
      if (x.nivelRelacion === 3) counts.alto++;
      else if (x.nivelRelacion === 2) counts.medio++;
      else counts.bajo++;
    });

    DOM.resultadoIcon.textContent = r.icon;
    DOM.resultadoNombre.textContent = r.nombre;
    DOM.resultadoArea.textContent = r.area;
    DOM.resultadoDescripcion.textContent = r.descripcion;

    DOM.resumenStats.innerHTML = `
      <span class="cr-stat-badge total">Total: ${sorted.length}</span>
      ${counts.alto > 0 ? `<span class="cr-stat-badge alto">Alto: ${counts.alto}</span>` : ''}
      ${counts.medio > 0 ? `<span class="cr-stat-badge medio">Medio: ${counts.medio}</span>` : ''}
      ${counts.bajo > 0 ? `<span class="cr-stat-badge bajo">Bajo: ${counts.bajo}</span>` : ''}
    `;

    DOM.resumenLista.innerHTML = sorted.map(rel => {
      const nc = API.getNivelClass(rel.nivelRelacion);
      return `<li><span class="cr-res-nombre">${API.escapeHtml(rel.carrera.nombre)}</span><span class="cr-res-nivel ${nc}" aria-label="Nivel ${API.getNivelTexto(rel.nivelRelacion).toLowerCase()}"></span></li>`;
    }).join('');

    DOM.emptySidePanel.style.display = 'none';
    DOM.resultadoDetail.style.display = 'block';

    if (window.innerWidth <= 1024 && !sidePanelOpen) openSidePanel();
  }

  function resetSidePanel() {
    DOM.emptySidePanel.style.display = 'flex';
    DOM.resultadoDetail.style.display = 'none';
    DOM.resumenStats.innerHTML = '';
    DOM.resumenLista.innerHTML = '';
  }

  function openSidePanel() {
    DOM.sidePanel.classList.add('open');
    sidePanelOpen = true;
    if (!document.querySelector('.cr-side-overlay')) {
      const ov = document.createElement('div');
      ov.className = 'cr-side-overlay';
      ov.addEventListener('click', closeSidePanel);
      document.body.appendChild(ov);
      requestAnimationFrame(() => ov.classList.add('visible'));
    }
  }

  function closeSidePanel() {
    DOM.sidePanel.classList.remove('open');
    sidePanelOpen = false;
    const ov = document.querySelector('.cr-side-overlay');
    if (ov) { ov.classList.remove('visible'); setTimeout(() => ov.remove(), 200); }
  }

  function openCarreraModal(carreraId) {
    const c = API.getCarreraById(carreraId);
    const r = API.getResultadoById(selectedResultadoId);
    const rel = Data.relaciones.find(x => x.idResultado === selectedResultadoId && x.idCarrera === carreraId);
    if (!c || !r || !rel) return;

    const nivel = rel.nivelRelacion;
    const nivelTexto = API.getNivelTexto(nivel);
    const nivelClass = API.getNivelClass(nivel);
    const icon = API.CARRERA_ICONS[c.id] || '📚';

    DOM.modalTitle.textContent = c.nombre;
    DOM.modalBody.innerHTML = `
      <div class="cr-modal-header-info">
        <div class="cr-modal-carrera-icon" aria-hidden="true">${icon}</div>
        <div class="cr-modal-carrera-info">
          <h3>${API.escapeHtml(c.nombre)}</h3>
          <p class="cr-modal-clave">Clave: ${API.escapeHtml(c.clave)}</p>
          <span class="cr-modal-nivel ${nivelClass}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Nivel de relación: ${nivelTexto}
          </span>
        </div>
      </div>
      <div class="cr-modal-explicacion">
        <h4>¿Por qué se relaciona con "${API.escapeHtml(r.nombre)}"?</h4>
        <p>${API.escapeHtml(rel.explicacion)}</p>
      </div>
      <div class="cr-modal-resultado-info">
        <h4>Resultado seleccionado</h4>
        <p><strong>${API.escapeHtml(r.nombre)}</strong> — ${API.escapeHtml(r.descripcion)}</p>
      </div>
    `;

    DOM.modalOverlay.style.display = 'flex';
    modalOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => DOM.closeModal.focus(), 100);
  }

  function closeModal() {
    DOM.modalOverlay.style.display = 'none';
    modalOpen = false;
    document.body.style.overflow = '';
  }

  // Exponer para debugging
  window.CarrerasRecomendadasUI = {
    state: () => ({ selectedResultadoId, sortCriterion, sidePanelOpen, modalOpen }),
    renderCarreras: (id) => renderCarreras(id)
  };
})();
// HU-48 · Recolecta lo que hace el alumno y lo cuenta por carrera (archivo de Gloria)
// No cambia ningún otro archivo: solo escucha los avisos del sitio.
(function () {
  // Visitas al perfil: cada vez que se abre el detalle de una carrera
  const abrirOriginal = abrirCarrera;
  abrirCarrera = function (id) {
    const resultado = abrirOriginal.apply(this, arguments);
    if (carreras.some(c => c.id === Number(id))) registrarMetrica(Number(id), "visitas");
    return resultado;
  };

  // Resultado del cuestionario: total, primera opción y carreras recomendadas
  document.addEventListener("cuestionario:finalizado", () => {
    let ids = [];
    try { ids = idsDeResultado(Resultados.procesar(Cuestionario.obtenerRespuestas()), 5); } catch (e) { ids = []; }
    if (!ids.length) return;
    registrarMetrica(0, "cuestionarios", "cuestionario-total");
    registrarMetrica(ids[0], "primera", "cuestionario-primera");
    ids.forEach(id => registrarMetrica(id, "enLista", "cuestionario-lista-" + id));
  });

  document.addEventListener("huellas-vistas", e => registrarMetrica(e.detail.carreraId, "huellas"));
  document.addEventListener("carrera-elegida", e => registrarMetrica(e.detail.carreraId, "duelo"));
  document.addEventListener("edificio-visitado", e => {
    const edificio = EDIFICIOS[e.detail.edificio];
    if (edificio) edificio.carreras.forEach(id => registrarMetrica(id, "mapa", "mapa-" + id));
  });
  document.addEventListener("quiero-ir", e => {
    const ev = eventosEstado.lista.find(x => x.id === e.detail.id);
    if (ev) registrarMetrica(ev.carreraId, "quieroIr", "ir-" + ev.id);
  });
})();
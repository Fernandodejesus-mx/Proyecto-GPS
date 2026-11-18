// Contenido temporal de la Base (T-157): se reemplaza en T-175.
function renderHuellas() {
  document.getElementById("panelDetalle").innerHTML = enConstruccion("Huellas del ITSX");
}
function abrirHuellas(carreraId) {
  irACarrera(carreraId);
  irATab("huellas");
}

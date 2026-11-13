// HU-39 · Visor del perfil: portada, historias deslizables y vista de lista (archivo de Gloria)
// Se abre desde script.js:  if (tab === "perfil") { abrirVisorPerfil(c); return; }

// TEMPORAL (se borra en T-139): evita que la pestaña se rompa mientras se construye el visor
function abrirVisorPerfil() { document.getElementById("panelDetalle").innerHTML = "<p>Perfil de la carrera en construcción.</p>"; }

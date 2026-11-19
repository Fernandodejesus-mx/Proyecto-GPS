// HU-44 · Pantalla de acceso del jefe de carrera (archivo de Gloria)
let esperandoAcceso = false;

function crearAcceso() {
  const pie = document.querySelector(".sidebar-bottom");
  const boton = document.createElement("button");
  boton.type = "button"; boton.id = "btnAccesoJefe"; boton.className = "acceso-btn";
  boton.textContent = "Acceso jefes de carrera";
  pie.prepend(boton);

  const fondo = document.createElement("div");
  fondo.id = "accesoFondo"; fondo.className = "acceso-fondo hidden";
  fondo.innerHTML = `
    <div class="acceso-caja" role="dialog" aria-modal="true" aria-labelledby="accesoTitulo">
      <h2 id="accesoTitulo">Acceso para jefes de carrera</h2>
      <p>Si eres jefe de carrera, entra para publicar los eventos de tu carrera. Las cuentas las crea la administración.</p>
      <form id="accesoForm" novalidate>
        <label for="accesoCorreo">Correo</label>
        <input id="accesoCorreo" type="email" autocomplete="username">
        <label for="accesoClave">Contraseña</label>
        <input id="accesoClave" type="password" autocomplete="current-password">
        <p id="accesoError" class="acceso-error" role="alert"></p>
        <div class="acceso-botones">
          <button type="submit" id="accesoEntrar">Entrar</button>
          <button type="button" id="accesoCancelar" class="acceso-sec">Cancelar</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(fondo);

  const abrir = () => { document.getElementById("accesoError").textContent = ""; fondo.classList.remove("hidden"); document.getElementById("accesoCorreo").focus(); };
  const cerrar = () => { fondo.classList.add("hidden"); document.getElementById("accesoClave").value = ""; esperandoAcceso = false; };

  boton.addEventListener("click", () => { if (sesionJefe.jefe) abrirCalendario(); else abrir(); });
  document.getElementById("accesoCancelar").addEventListener("click", cerrar);
  fondo.addEventListener("click", e => { if (e.target === fondo) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !fondo.classList.contains("hidden")) cerrar(); });

  document.getElementById("accesoForm").addEventListener("submit", e => {
    e.preventDefault();
    const error = document.getElementById("accesoError");
    const correo = document.getElementById("accesoCorreo").value.trim();
    const clave = document.getElementById("accesoClave").value;
    if (!correo || !clave) { error.textContent = "Escribe tu correo y tu contraseña."; return; }
    error.textContent = "";
    esperandoAcceso = true;
    iniciarSesion(correo, clave).catch(err => { esperandoAcceso = false; error.textContent = mensajeErrorAcceso(err.code); });
  });

  // Cuando Firebase confirma la sesión: se cierra la ventana y se abre el panel del jefe
  document.addEventListener("sesion-jefe", e => {
    boton.textContent = e.detail ? "Mi panel de jefe" : "Acceso jefes de carrera";
    if (e.detail && esperandoAcceso) { cerrar(); abrirCalendario(); }
    else if (!e.detail && esperandoAcceso && sesionJefe.error) {
      document.getElementById("accesoError").textContent = mensajeErrorAcceso(sesionJefe.error); esperandoAcceso = false;
    }
  });
}
crearAcceso();
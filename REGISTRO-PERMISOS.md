# Registro de pruebas de permisos (HU-44)

Fecha: __ / __ / 2026 · Probó: Gloria · Dirección probada: https://…github.io/…

| # | Prueba | Esperado | Resultado | ¿Pasó? |
|---|---|---|---|---|
| 1 | Publico ve el calendario sin sesión | Se ven eventos | | |
| 2 | Sin sesión, intentar guardar | Bloqueado (permission-denied) | | |
| 3 | jefe1 crea evento desde el panel | Se guarda  | | |
| 4 | jefe1 edita y borra su evento | Se puede | | |
| 5 | jefe2 borra evento de Sistemas | Bloqueado (permission-denied) | | |
| 6 | jefe1 guarda con otra carrera | Bloqueado (permission-denied) | | |

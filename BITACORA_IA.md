# Bitácora de IA · Duelo 64

Registro de cómo usamos la IA (agente de código) en el proyecto: prompts clave, errores del agente o del código generado y cómo se corrigieron.

> Los prompts marcados "(reconstruido)" se escribieron después, revisando `git log` y el código del juego; no son el texto exacto.

## Prompts clave

| Momento | Prompt usado | Resultado |
|---|---|---|
| Montar el SDD (U3, 2026-11-14) | "Con base en la documentación técnica del juego y las pantallas de referencia, arma el SDD de Duelo 64: documento maestro SDD.md, producto, specs con criterios de aceptación verificables, arquitectura, despliegue, identidad visual, decisiones, tareas, plantillas y la skill ui-componentes." | Repositorio `duelo64-sdd` con `docs/SDD.md` v1.0 y 5 specs |
| Reglas del juego | "Pasa las reglas de Duelo 64 a un archivo `juego.ts` sin React: elegir, marcar, encontrar, pasar a los 15 s y rendirse. Que la hora y el azar entren por parámetro para poder probarlo sin pantalla." (reconstruido) | `juego.ts` como lógica pura |
| Multijugador | "Quiero que dos personas jueguen cada una en su celular. Haz que el creador de la sala sea el árbitro: recibe las jugadas del otro por Realtime, las aplica con `juego.ts` y guarda el estado en Supabase para poder recargar." (reconstruido) | Modelo de árbitro con Broadcast y Presence |
| Responsive sin scroll | "En el celular la partida tiene scroll y no se ve todo. Arréglalo sin achicar la vista de computador: en celular muestra solo lo que necesito en cada momento (la nube o mi tablero) y que funcione también acostado." (reconstruido) | Foco por pantalla, variantes `bajo` y `medio` |
| Verificación | "Comprueba con Playwright que ninguna pantalla de la partida tenga scroll en 7 tamaños, del celular pequeño al monitor grande, y dime cuáles fallan." (reconstruido) | Playwright: 7 tamaños, 112/112 sin scroll |
| Conectar GitHub y Vercel (2026-11-14) | "Conecta `gh` con mi cuenta y el conector de Vercel en Claude Code, y comprueba que puedes ver el repositorio y el despliegue." | `gh auth status` con la cuenta sgabrielaca25-pixel y conector MCP de Vercel (evidencias 05 y 07) |
| Referencias con Playwright (2026-11-14) | "Genera las pantallas de referencia del juego en móvil y escritorio con Playwright, desde el código real, sin instalar nada en los repos, y deja un script para regenerarlas." | `scripts/capturas-referencia.ts` y 36 imágenes (SDD v1.4) |
| Logo Opción A (PR #2, 2026-11-14) | "Pon el logo Opción A en el header y como ícono de la pestaña, sin fondo negro y que se vea bien sobre el fondo claro. Abre un PR." | Header con `logo-header-duelo64.png`, `icon.png` y `apple-icon.png` (SDD v1.5) |
| Historial en el perfil (PR #3, 2026-11-14) | "Primero el SDD: spec006 con el historial dentro del perfil, sin página aparte. Después el código con pruebas, lint y build, y abre el PR." | spec006, `historial.ts` con 5 pruebas Vitest y sección en `/jugar/perfil` (SDD v1.6) |
| Tarea de cierre (2026-11-14) | "Borra el SQL del trigger porque la tabla ya existe, une los PR #2 y #3, confirma el despliegue en Vercel, sube el SDD a 1.7, regenera todas las referencias y completa evidencias y bitácora." | PR #2 y #3 unidos, producción Ready, SDD v1.7, 38 referencias y evidencias 01, 02, 05 y 07 |

## Errores encontrados y cómo se corrigieron

| # | Síntoma | Causa | Corrección | Qué aprendimos |
|---|---|---|---|---|
| 1 | La partida no se guardaba y las estadísticas no cambiaban | `supabase.rpc()` es perezoso: sin `await` o `.then` no se ejecuta | Función `llamar()` que espera cada llamada | Hay que entender la librería, no solo copiar el código |
| 2 | Al recargar, la partida empezaba de nuevo | No se leía el estado guardado | La página lee `salas.partida` y lo pasa como `inicial` | El estado debe vivir en un lugar persistente |
| 3 | Error de hydration en el cronómetro | Servidor y navegador calculaban horas distintas | Hook `useEnNavegador()` con `useSyncExternalStore` | Lo que depende de la hora se dibuja en el navegador |
| 4 | En desarrollo se abrían dos canales | React Strict Mode monta dos veces | `setTimeout(conectar, 0)` y limpieza del canal | Siempre limpiar efectos |
| 5 | La nube cambiaba de forma al ocultarse | Se quitaban los números | Tapa blanca encima de la misma nube | Ocultar ≠ eliminar del layout |
| 6 | Al salir un jugador del resultado, el otro se quedaba | No se detectaba la salida | Presence: si el rival se va 3 s, vuelves al menú | — |
| 7 | Si alguien cerraba la pestaña, la partida seguía | No había control de abandono | Latido cada 5 s y `reclamar_abandono` a los 15 s | La base de datos valida, no el navegador |
| 8 | Partida rápida: invitado atascado en "Preparando la partida" | Se perdía el primer mensaje de Realtime | `setAuth`, reconexión, respaldo de 3 s del árbitro y consulta cada 1,5 s | El tiempo real necesita respaldos |
| 9 | Dos jugadores buscando a la vez quedaban en salas distintas | Carrera entre transacciones | `pg_advisory_xact_lock` y `seguir_esperando` | Concurrencia se resuelve en la BD |
| 10 | El código de recuperación no llegaba a otros correos | El correo de prueba de Supabase solo envía al equipo | SMTP propio con Gmail | — |
| 11 | Gmail daba error 504 | Puerto 465 bloqueado | Puerto 587 | — |
| 12 | SQL: "unterminated dollar-quoted string" | El texto pegado se cortaba | Dividir el SQL en partes | — |
| 13 | La foto salía gigante y cuadrada | Faltaban medidas fijas | `width`, `height` y `borderRadius: 50%` | — |
| 14 | Había scroll en celulares | Diseño pensado solo para computador | `h-dvh`, foco por pantalla, variantes `bajo` y `medio` | Pensar mobile first desde el inicio |
| 15 | El responsive achicó la vista de computador | La variante `medio` aplicaba también en laptops | Limitar `medio` a `max-width: 1023px` | Probar en varios tamaños después de cada cambio |
| 16 | En Vercel no se enviaba el código de recuperación | Variables guardadas como Secret | Borrarlas, crearlas de nuevo y Redeploy | Las `NEXT_PUBLIC_` se incrustan al compilar |
| 17 | Windows no dejaba borrar la carpeta | OneDrive la tenía bloqueada | Pausar OneDrive y cerrar la terminal | — |
| 18 | El SDD se subió a un repositorio que no era el del proyecto | El remoto `origin` apuntaba a otra cuenta de GitHub | Cambiar `origin` a `sgabrielaca25-pixel/duelo64-sdd` y volver a subir | Revisar `git remote -v` antes del primer push |
| 19 | Error de "Jest worker" al capturar pantallas con Next.js | Había dos `next dev` a la vez: al detener `npm`, el proceso de Next seguía vivo en el puerto 3000 | Dejar un solo servidor y cerrar el proceso sobrante, comprobando antes que era del juego | Detener `npm` no siempre cierra Next: confirmar que el puerto quedó libre |
| 20 | El logo del header se veía con un cuadro negro sobre el fondo claro | El PNG de la X tenía fondo negro, no transparente | PNG transparente (`a6e4468`) y, con la Opción A, nube con borde azul `#3898EC` (PR #2) | Revisar el logo sobre el fondo real de la app |
| 21 | El SQL del trigger del historial nunca se ejecutó | `historial_partidas` ya existía en Supabase y `terminar_partida` y `reclamar_abandono` ya insertaban una fila por partida; el trigger habría duplicado filas | Borrar `supabase/historial-partidas.sql` y documentar las columnas reales (decisión 20, SDD v1.7) | Revisar qué hay en la base de datos antes de proponer SQL |

## Reflexión
- Construir sin planos funcionó, pero unir el trabajo de tres personas costó: el front estaba sobre una copia vieja del backend (decisión 13). Con `docs/` y specs desde el inicio, ese choque se habría evitado.
- Desde ahora, cualquier cambio sigue la regla de oro: primero el documento, después el código.

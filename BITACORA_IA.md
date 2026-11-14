# Bitácora de IA · Duelo 64

Registro de cómo usamos la IA (agente de código) en el proyecto: prompts clave, errores del agente o del código generado y cómo se corrigieron.

## Prompts clave

| Momento | Prompt usado | Resultado |
|---|---|---|
| Montar el SDD (U3) | "Con base en la documentación técnica del juego y las pantallas de referencia, arma el SDD de Duelo 64: documento maestro SDD.md, producto, specs con criterios de aceptación verificables, arquitectura, despliegue, identidad visual, decisiones, tareas, plantillas y la skill ui-componentes." | Repositorio `duelo64-sdd` con `docs/SDD.md` v1.0 y 5 specs |
| Reglas del juego | "Escribe las reglas de Duelo 64 en `app/lib/juego.ts` como lógica pura, sin React, sin `Date.now()` ni `Math.random()`: la hora y la semilla entran por parámetro y cada jugada (elegir, marcar, encontrar, pasar, rendirse) devuelve un estado nuevo." (reconstruido) | `juego.ts` como lógica pura |
| Multijugador | "Conecta la partida en línea con Supabase Realtime: que el jugador 1 sea el árbitro, el invitado le mande sus jugadas por Broadcast, y usa Presence y un latido cada 5 s para detectar si alguien abandona." (reconstruido) | Modelo de árbitro con Broadcast y Presence |
| Responsive sin scroll | "La pantalla de partida no puede tener scroll en ningún dispositivo: en celular muestra solo el foco (la nube o el tablero propio) y crea variantes para pantallas bajas y medianas." (reconstruido) | Foco por pantalla, variantes `bajo` y `medio` |
| Verificación | "Haz pruebas con Playwright que abran cada pantalla en 7 tamaños, de 375×667 a 1920×1080, y comprueben que ninguna tenga scroll." (reconstruido) | Playwright: 7 tamaños, 112/112 sin scroll |
| Leer el SDD | "Lee @docs/SDD.md y resúmeme en 5 viñetas el sistema, sus reglas principales y los riesgos de la sección 12." | Resumen correcto del SDD |
| Conectar GitHub | `gh auth login` | Sesión activa |
| Conectar Vercel | `claude mcp add vercel` + `/mcp` | "Authentication successful" |
| Completar la bitácora | Este mismo prompt | Bitácora completa |

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

## Reflexión
- Construir sin planos funcionó, pero unir el trabajo de tres personas costó: el front estaba sobre una copia vieja del backend (decisión 13). Con `docs/` y specs desde el inicio, ese choque se habría evitado.
- Desde ahora, cualquier cambio sigue la regla de oro: primero el documento, después el código.

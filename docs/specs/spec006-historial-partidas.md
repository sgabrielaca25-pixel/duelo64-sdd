# Spec 006 · Historial de partidas (en el perfil)

## Historia
Como jugador, quiero ver en mi perfil mis últimas partidas, contra quién jugué y cómo terminó cada una, para seguir mi progreso sin salir de la pantalla de perfil.

## Comportamiento
1. En `/jugar/perfil`, debajo de las estadísticas (jugadas, ganadas, perdidas), aparece la sección **"Historial de partidas"**.
2. Muestra las **últimas 20 partidas terminadas**, de la más reciente a la más antigua.
3. Cada partida es una tarjeta con:
   - fecha (ej. "6 nov 2026", hora de Colombia),
   - resultado: **Victoria**, **Derrota** o **Empate**,
   - "vs" y el nombre del rival,
   - marcador de casillas: "Tú: 40 · Carlos: 24".
4. Si hay muchas partidas, la lista tiene su propio desplazamiento dentro de la tarjeta del perfil, para que la página no crezca sin control.
5. Si el jugador aún no ha terminado partidas, se muestra: "Todavía no tienes partidas en tu historial".
6. No hay botón "Historial" en el menú ni una página aparte: todo vive en el perfil.

## Criterios de aceptación
- [x] La sección "Historial de partidas" aparece en `/jugar/perfil` debajo de las estadísticas.
- [x] El menú `/jugar` no tiene un botón "Historial".
- [x] Se muestran como máximo 20 partidas, la más reciente primero.
- [x] Cada partida muestra fecha, resultado, nombre del rival y casillas de cada jugador.
- [x] Si el jugador fue el ganador, dice "Victoria"; si ganó el rival, "Derrota"; si no hubo ganador, "Empate".
- [x] El marcador muestra primero mis casillas ("Tú") y después las del rival, sin importar si fui jugador 1 o 2.
- [x] Sin partidas, se ve el mensaje "Todavía no tienes partidas en tu historial".
- [x] Un jugador solo ve sus propias partidas (RLS).
- [x] Con 20 partidas, a 390 px la página del perfil se puede usar y la lista se desplaza dentro de su sección.
- [x] Al terminar una partida (por 64 casillas, números agotados, abandono o desconexión), aparece en el historial de los dos jugadores.

## Datos
Tabla `historial_partidas` en Supabase (ya existía antes de esta spec, con filas y su política RLS):

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | bigint (PK) | Identificador |
| `sala_id` | uuid, not null | Sala donde se jugó (`salas.id`) |
| `codigo` | text, not null | Código de la sala |
| `jugador1`, `jugador2` | uuid | Jugadores de la partida |
| `nombre1`, `nombre2` | text | Nombres al momento de jugar |
| `ganador` | uuid o null | null = empate |
| `casillas_jugador1`, `casillas_jugador2` | integer | Casillas marcadas por cada uno |
| `finalizada_en` | timestamptz, default `now()` | Cuándo terminó |

- La fila la insertan las funciones SQL **`terminar_partida`** y **`reclamar_abandono`**, una por partida (incluida cada revancha). No hay trigger: se descartó para no duplicar filas (decisión 20).
- RLS: un jugador solo puede leer las filas donde es `jugador1` o `jugador2`. Nadie inserta ni modifica desde el navegador.
- El front solo lee: `obtenerHistorial()` filtra por el jugador, ordena por `finalizada_en` descendente y trae 20 filas.

> **Nota:** las partidas jugadas antes de crear la tabla no aparecen en el historial, aunque sí cuentan en las estadísticas del perfil (`jugadas`, `ganadas`, `perdidas`).

## Diseño
- Tarjetas `#EEF4FF`, redondeadas (`1.5rem`), dentro de la tarjeta del perfil.
- Colores del resultado: Victoria `#8A6100` (dorado, contraste 5.0:1), Derrota `#B3261E`, Empate `#0061A2`. Todos pasan AA sobre `#EEF4FF`.
- Referencia: `docs/diseno/referencias/05-perfil-movil.png` y `05-perfil-escritorio.png` (con varias partidas) y `05-perfil-vacio-movil.png` / `05-perfil-vacio-escritorio.png` (sin partidas).

## Archivos
`app/lib/historial.ts` (`obtenerHistorial()`), `app/lib/historial.test.ts`, `app/ui/historial-partidas.tsx`, `app/jugar/perfil/page.tsx`, `app/ui/perfil-jugador.tsx`, `vitest.config.ts`. No hay SQL en el repositorio del juego: la tabla y la inserción ya viven en Supabase.

## Pruebas
`app/lib/historial.test.ts` (Vitest, 5 casos con Supabase simulado): victoria como jugador 1, derrota como jugador 2, empate con ganador null, lista vacía sin sesión y error cuando Supabase falla.

## Fuera de alcance
Paginación más allá de 20 partidas, filtros, detalle jugada por jugada, historial del rival.

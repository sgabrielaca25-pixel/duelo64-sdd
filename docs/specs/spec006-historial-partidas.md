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
- [ ] La sección "Historial de partidas" aparece en `/jugar/perfil` debajo de las estadísticas.
- [ ] El menú `/jugar` no tiene un botón "Historial".
- [ ] Se muestran como máximo 20 partidas, la más reciente primero.
- [ ] Cada partida muestra fecha, resultado, nombre del rival y casillas de cada jugador.
- [ ] Si el jugador fue el ganador, dice "Victoria"; si ganó el rival, "Derrota"; si no hubo ganador, "Empate".
- [ ] El marcador muestra primero mis casillas ("Tú") y después las del rival, sin importar si fui jugador 1 o 2.
- [ ] Sin partidas, se ve el mensaje "Todavía no tienes partidas en tu historial".
- [ ] Un jugador solo ve sus propias partidas (RLS).
- [ ] Con 20 partidas, a 390 px la página del perfil se puede usar y la lista se desplaza dentro de su sección.
- [ ] Al terminar una partida (por 64 casillas, números agotados, abandono o desconexión), aparece en el historial de los dos jugadores.

## Datos
Tabla `historial_partidas` en Supabase:

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | bigint (PK) | Identificador |
| `sala_codigo` | text | Código de la sala donde se jugó |
| `inicio` | bigint | Momento de inicio de la partida (ms, `partida.inicio`) |
| `jugador1`, `jugador2` | uuid | Jugadores de la partida |
| `nombre1`, `nombre2` | text | Nombres al momento de jugar |
| `ganador` | uuid o null | null = empate |
| `casillas_jugador1`, `casillas_jugador2` | integer | Casillas marcadas por cada uno |
| `finalizada_en` | timestamptz | Cuándo terminó |

Único: `(sala_codigo, inicio)`. Una revancha en la misma sala tiene otro `inicio`, así que cuenta como otra partida.

- RLS: un jugador solo puede leer filas donde `auth.uid()` sea `jugador1` o `jugador2`. Nadie inserta ni modifica desde el navegador.
- La fila la crea un **trigger en `salas`** (`registrar_historial`) cuando `salas.estado` pasa de `jugando` a `terminada`, una sola vez por partida (`on conflict do nothing`). Toma el ganador (0, 1 o null) y las casillas (`marcadas`) de `salas.partida`. Cubre los cuatro finales: 64 casillas, números agotados (con empate), rendición y abandono.
- **El trigger nunca bloquea el fin de partida:** la inserción está envuelta en `begin … exception when others then raise warning … end` y la función siempre devuelve `NEW`.
  Si el historial falla, solo queda un aviso en el log de Postgres; la sala termina igual y las estadísticas se suman como siempre.
- SQL: `supabase/historial-partidas.sql` en el repositorio del juego. Se revisa y se ejecuta a mano en el SQL Editor de Supabase.

## Diseño
- Tarjetas `#EEF4FF`, redondeadas (`1.5rem`), dentro de la tarjeta del perfil.
- Colores del resultado: Victoria `#8A6100` (dorado, contraste 5.0:1), Derrota `#B3261E`, Empate `#0061A2`. Todos pasan AA sobre `#EEF4FF`.
- Referencia: `docs/diseno/referencias/05-perfil-movil.png` y `05-perfil-escritorio.png` (se regeneran con el historial).

## Archivos
`app/lib/historial.ts` (`obtenerHistorial()`), `app/lib/historial.test.ts`, `app/ui/historial-partidas.tsx`, `app/jugar/perfil/page.tsx`, `app/ui/perfil-jugador.tsx`, `vitest.config.ts`; tabla, política y trigger en `supabase/historial-partidas.sql`.

## Pruebas
`app/lib/historial.test.ts` (Vitest, 5 casos con Supabase simulado): victoria como jugador 1, derrota como jugador 2, empate con ganador null, lista vacía sin sesión y error cuando Supabase falla.

## Fuera de alcance
Paginación más allá de 20 partidas, filtros, detalle jugada por jugada, historial del rival.

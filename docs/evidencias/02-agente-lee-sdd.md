# 02 · El agente lee el SDD

Resumen que hizo Claude Code (Opus 5.5) leyendo `docs/SDD.md` v1.7, el 2026-11-14:

- **Sistema:** Duelo 64 es un juego web 1 contra 1 en tiempo real (8×8, 64 casillas), hecho con Next.js 16, React 19, Tailwind 4, Supabase (Postgres, Auth, Storage, Realtime) y Vercel; se publica en https://juegoduelo64.vercel.app y cubre 25 requerimientos funcionales (RF-01 a RF-25, todos publicados) repartidos en 6 specs.
- **Multijugador:** el jugador 1 es el árbitro: recibe las jugadas del invitado por Broadcast, las aplica con `aplicarJugada()` de `juego.ts` (lógica pura) y reparte y guarda el estado oficial; el abandono se valida con `latido()` + Presence y `reclamar_abandono()`.
- **Reglas:** se sortea quién empieza; el activo elige un número de la nube en 15 s o pierde el turno; mientras el rival lo busca, el activo marca casillas; los números usados quedan bloqueados. Gana quien complete 64 casillas, quien tenga más X al agotar los 64 números (o empate), o el que se queda si el otro se rinde o se desconecta más de 15 s.
- **Datos y seguridad:** RLS en todas las tablas; las estadísticas y el historial solo los escriben `terminar_partida` y `reclamar_abandono` (una fila de `historial_partidas` por partida); el jugador solo edita nombre y foto, y en el perfil ve sus últimas 20 partidas.
- **Riesgos (§12):** contraste del botón principal (3.1:1, no pasa AA); Geist Sans cargada casi sin uso; la autoridad está en el navegador del jugador 1 (un cliente modificado podría alterar el estado → Edge Function a futuro); dependencia del árbitro si se desconecta (aceptado para el MVP); el logo del header ya está resuelto (Opción A) y las referencias regeneradas.

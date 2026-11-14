# Tareas · Duelo 64

> El juego se construyó antes de aplicar SDD. Estas tareas reconstruyen el orden en que se hizo el front para dejar trazabilidad con las specs. Todas están terminadas y publicadas.

## Front (U3)
- [x] 1.1 Layout base con identidad visual (Arial en textos, Geist Mono en números, fondo `#E9F2FE`, tarjetas, colores de jugador)
- [x] 1.2 Pantallas de cuenta: login y registro con validación y ojo de contraseña — spec001
- [x] 1.3 Recuperar contraseña en 3 pasos (correo, código, nueva) — spec001
- [x] 1.4 Header con nombre, foto y cerrar sesión; `proxy.ts` protege rutas — spec001
- [x] 1.5 Menú `/jugar`: partida rápida, crear sala, unirse con clave — spec002
- [x] 1.6 Sala de espera con código, fotos de los dos jugadores e indicador — spec002
- [x] 1.7 Reglas del juego en `juego.ts` y partida local en una pantalla (datos locales) — spec003
- [x] 1.8 Escena de partida: nube, dos tableros 8×8, header con cronómetro y Rendirse — spec003
- [x] 1.9 Turno de 15 s con aviso rojo y números usados pintados — spec003
- [x] 1.10 Partida en línea con árbitro, Broadcast y recarga sin perder estado — spec003
- [x] 1.11 Responsive sin scroll: foco en celular, variantes `bajo` y `medio` — spec003
- [x] 1.12 Confirmar rendición, aviso de abandono y pantalla de resultado — spec004
- [x] 1.13 Revancha cuando ambos la piden — spec004
- [x] 1.14 Perfil: estadísticas, editar nombre y cambiar foto con recorte — spec005
- [x] 1.15 Pruebas: Vitest (simulación) y Playwright (7 tamaños, 112/112 sin scroll)
- [x] 1.16 Despliegue en Vercel con variables de entorno

## Lab render (U3)
- [x] 2.1 Pantallas de referencia de las 14 vistas en `docs/diseno/referencias/`
- [x] 2.2 Registrar la pantalla de referencia en docs/decisiones.md (decisión 14)
- [x] 2.3 Referencias completas: 15 pantallas en móvil y escritorio, 2 mapas (36 imágenes) y script `scripts/capturas-referencia.ts`

## Back (U4)
- [x] Tablas `perfiles` y `salas` con RLS
- [x] Funciones SQL de salas, partida rápida, guardado, abandono y revancha
- [x] Storage `avatars` y SMTP propio
<!-- En la U4 se agrega docs/contratos/api.md con las funciones RPC y los eventos del canal -->

## Historial de partidas en el perfil (spec006, SDD v1.6–1.7)
- [x] 3.1 SDD v1.6: spec006, RF-25, modelo de datos, RLS, pruebas y decisiones 19 y 20
- [x] 3.2 `app/lib/historial.ts` (`obtenerHistorial()`, últimas 20) y `historial.test.ts` (Vitest, 5 casos); script `npm test`
- [x] 3.3 `app/ui/historial-partidas.tsx` como sección del perfil, con lista desplazable y sin "Volver al menú"
- [x] 3.4 Mostrar el historial en `/jugar/perfil` debajo de las estadísticas; si falla la consulta, lista vacía
- [x] 3.5 ~~`supabase/historial-partidas.sql` con trigger~~ → no hacía falta: la tabla ya existía y la llenan `terminar_partida` y `reclamar_abandono`; se borró el SQL (decisión 20, SDD v1.7)
- [x] 3.6 Revisar el perfil a 390 y 1366 px; regenerar `05-perfil-*` (con partidas y vacío)
- [x] 3.7 PR #3 `historial-en-perfil` → `master` unido y publicado en https://juegoduelo64.vercel.app

## Logo Opción A (decisión 17, SDD v1.5)
- [x] 4.1 Header con `public/logo-header-duelo64.png`, `app/icon.png` y `app/apple-icon.png` con el ícono completo — PR #2 `logo-opcion-a` unido y publicado
- [x] 4.2 Regenerar todas las referencias desde `master` con el logo nuevo y el historial: 38 imágenes (SDD v1.7)

## Mejoras pendientes (propuestas, aún fuera del MVP)
- [x] Quitar la carga de **Geist Sans** en `layout.tsx` (SDD v1.8, PR `quitar-geist-sans`): el placeholder de "Código de sala" (`placeholder:font-sans`) pasa a Arial con `--font-sans`. **Geist Mono sí se usa** (`font-mono`) y se queda
- [ ] Ajustar textos blancos pequeños sobre `#3898EC` / `#E5536B` para cumplir AA (ver identidad-visual.md)

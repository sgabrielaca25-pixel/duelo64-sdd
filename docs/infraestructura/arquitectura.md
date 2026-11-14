# Arquitectura · Duelo 64

## Visión general
```
Navegador (React)  ──>  Next.js en Vercel (páginas, Server Actions, proxy)  ──>  Supabase
      │                                                                     (Postgres, Auth, Storage)
      └──────────── Supabase Realtime (Broadcast, Presence, Postgres Changes) ────┘
```
El navegador muestra las pantallas con React. Next.js corre en Vercel y atiende páginas y Server Actions.
Supabase guarda los datos, maneja las cuentas y transmite las jugadas en tiempo real entre los dos jugadores.

## Por qué este stack (y no Spring Boot + MySQL)
El stack de referencia del diplomado es Next.js + Spring Boot + MySQL + AWS. La guía permite Supabase y Vercel como alternativa rápida para el MVP, y la elegimos porque:
- Un juego en tiempo real necesita conexiones abiertas largas. Vercel no las mantiene; Supabase Realtime sí. No tuvimos que programar ni mantener un servidor de WebSockets.
- Un solo servicio da base de datos, autenticación, tiempo real y archivos, con plan gratuito.
- La seguridad se define en la base de datos (RLS), cerca de los datos.
Ver docs/decisiones.md.

## Front
- Next.js 16, App Router, TypeScript, Tailwind CSS 4.
- Fuentes: Arial para textos (`body` en `globals.css`) y Geist Mono para números y códigos (`next/font/google` en `layout.tsx`, clase `font-mono`). El logotipo del header es una imagen (`public/logo-duelo64-horizontal.png`). `layout.tsx` también carga Geist Sans, casi sin uso (mejora pendiente).
- Server Components leen datos de Supabase con la sesión; Client Components (`"use client"`) manejan clics, temporizadores, sonidos y canales.
- Server Actions (`app/lib/acciones-*.ts`) + `useActionState` para formularios sin escribir `fetch`.
- `proxy.ts` (antes `middleware`): renueva la sesión y protege `/jugar` y `/partida`.

### Rutas
| Ruta | Página |
|---|---|
| `/` | Redirige a `/jugar` |
| `/login`, `/registro` | Cuenta (grupo `(auth)`, layout centrado) |
| `/recuperar-contrasena` → `/codigo` → `/nueva` | Recuperación en 3 pasos |
| `/jugar` | Menú: partida rápida, crear sala, unirse con clave |
| `/jugar/perfil` | Foto, nombre, estadísticas e historial de las últimas 20 partidas (spec006; el historial vive aquí, no tiene ruta propia) |
| `/jugar/sala/[codigo]` | Sala de espera |
| `/partida/[codigo]` | Partida en línea (otro header: cronómetro y Rendirse) |
| `/partida/local` | Partida local de prueba (dos jugadores, una pantalla) |

### Estructura
```
proxy.ts
app/
  (auth)/          pantallas de cuenta
  jugar/           menú, perfil, sala, resultado (con Header)
  partida/         pantalla de juego
  lib/             lógica sin diseño
    juego.ts           REGLAS (lógica pura)
    partida-online.ts  MULTIJUGADOR (hook usePartidaOnline)
    partida-store.ts   estado de la partida local
    historial.ts       obtenerHistorial(): últimas 20 partidas del jugador (+ historial.test.ts)
    acciones-*.ts      Server Actions
    supabase/          clientes de navegador y servidor
  ui/              componentes visuales (historial-partidas.tsx: sección del perfil)
```

## Back (Supabase)
| Servicio | Uso |
|---|---|
| Auth | Registro, sesión en cookies, recuperación con código (SMTP propio de Gmail, puerto 587) |
| Postgres | Tablas `perfiles`, `salas` e `historial_partidas`, funciones SQL, triggers, RLS |
| Realtime | Postgres Changes (sala de espera), Broadcast (jugadas), Presence (conexión) |
| Storage | Bucket público `avatars`, cada usuario escribe solo en `avatars/<su-id>/`, máx. 2 MB |

### Funciones SQL (todas `security definer`, validan `auth.uid()`)
`crear_sala`, `unirse_sala`, `salir_sala`, `buscar_partida_rapida`, `seguir_esperando`, `guardar_partida`, `terminar_partida`, `reiniciar_partida`, `latido`, `reclamar_abandono`.
Triggers: `crear_perfil`, `al_empezar_partida`, `copiar_fotos_sala`.
`terminar_partida` y `reclamar_abandono` también insertan la fila de `historial_partidas` (una por partida; no hay trigger para eso, decisión 20).

## Datos
Entidades: Usuario (auth.users), Perfil, Sala, Partida (jsonb dentro de Sala)
- Usuario 1—1 Perfil
- Usuario 1—N Sala (como jugador 1 o jugador 2)
- Sala 1—1 Partida (`salas.partida`, estado completo `EstadoPartida`)
- Sala 1—N Historial (`historial_partidas`, por `sala_id`, una fila por partida terminada)

**perfiles**: `id` (uuid, FK auth.users), `nombre` (3–15), `jugadas`, `ganadas`, `perdidas`, `foto_url`, `creado_en`
**salas**: `id`, `codigo` (6 caracteres, sin O/0 ni I/1), `estado` (esperando | jugando | terminada), `jugador1`, `jugador2`, `nombre1`, `nombre2`, `foto1`, `foto2`, `partida` (jsonb), `publica`, `activa_en`, `visto1`, `visto2`, `creada_en`
**historial_partidas**: `id` (bigint), `sala_id` (uuid), `codigo`, `jugador1`, `jugador2`, `nombre1`, `nombre2`, `ganador` (uuid o null), `casillas_jugador1`, `casillas_jugador2`, `finalizada_en` (default `now()`). Solo lectura para el jugador (RLS)

## Multijugador: modelo de árbitro
- El jugador 1 (creador de la sala) es el árbitro y tiene el estado oficial.
- El invitado envía jugadas por Broadcast; el árbitro las aplica con `aplicarJugada()` en orden de llegada, reenvía el estado (evento `estado`) y lo guarda con `guardar_partida` (agrupa cada 150 ms).
- El invitado aplica su jugada de inmediato (predicción) y la reemplaza cuando llega el estado oficial.
- El árbitro manda su hora para sincronizar relojes. Solo el árbitro aplica `pasar` a los 15 s.
- Abandono: `latido()` cada 5 s + Presence; `reclamar_abandono()` solo acepta si el rival lleva más de 15 s sin latido.
- Concurrencia: `select … for update` y `pg_advisory_xact_lock` en partida rápida.

Eventos del canal `partida-CÓDIGO`: `jugada`, `estado`, `pedir-estado`, `revancha`.

## Seguridad
- RLS en todas las tablas. Cada jugador ve solo su perfil y las salas donde juega.
- Del perfil solo se puede actualizar `nombre` y `foto_url` (no estadísticas).
- Las contraseñas las maneja Supabase Auth con hash.
- Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (pública por diseño; lo que protege es RLS).

## Despliegue
- Front: Vercel, despliegue continuo desde `master` → https://juegoduelo64.vercel.app
- Supabase → URL Configuration: Site URL = dominio de Vercel; Redirect URLs incluye `localhost:3000/**`.

# Duelo 64 — Software Design Document

**Versión:** 1.5
**Actualizado:** 2026-11-14
**Estado:** MVP implementado y publicado. Documentación SDD formalizada en la Unidad 3 (M4).
**Producto:** juego web multijugador 1 contra 1, en tiempo real
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase y Vercel
**Código:** repositorio `sgabrielaca25-pixel/nextjs-dashboard` (rama `master`)
**Publicado en:** https://juegoduelo64.vercel.app

> Este documento recoge el diseño completo del sistema. El detalle de cada funcionalidad está en `docs/specs/`, la arquitectura técnica en `docs/infraestructura/` y la identidad visual en `docs/diseno/`. Ninguna funcionalidad nueva debe programarse sin una spec aprobada.

> **Nota:** el juego se construyó antes de aplicar SDD. Esta versión 1.0 documenta el sistema tal como está publicado. Desde aquí rige la regla de oro: primero se actualiza este documento y la spec, después el código.

---

## 1. Resumen ejecutivo
Duelo 64 es un juego de agilidad visual y velocidad para dos personas. Cada jugador tiene un tablero de 8×8 (64 casillas) y gana quien primero las marque todas. En cada ronda un jugador elige un número de una "nube" desordenada; mientras el rival lo busca, el primero marca casillas en su tablero. Cuando el rival lo encuentra, se invierten los papeles.

Se juega en línea, cada persona desde su propio celular, tablet o computador, sin instalar nada. Una partida dura entre 2 y 5 minutos.

## 2. Objetivos
| Objetivo | Cómo se mide |
|---|---|
| Jugar en línea sin instalar nada | La app funciona en navegador de celular, tablet y computador |
| Partidas cortas | Duración típica de 2 a 5 minutos |
| Estado idéntico en los dos dispositivos | Ninguna partida termina desincronizada |
| Interfaz sin scroll en el juego | 112 de 112 pruebas de Playwright sin scroll en 7 tamaños |
| Estadísticas confiables | Se suman una sola vez por partida y nadie puede alterarlas |

## 3. Alcance

### Dentro del MVP
- Cuentas: registro, inicio y cierre de sesión, recuperar contraseña con código al correo → `spec001`
- Encontrar rival: sala privada con código y partida rápida automática → `spec002`
- Partida en línea en tiempo real → `spec003`
- Fin de partida, abandono y revancha → `spec004`
- Perfil, foto y estadísticas → `spec005`

### Fuera del MVP
Ranking global, chat, torneos o más de 2 jugadores, jugar contra la computadora, inicio de sesión con Google, app móvil nativa, niveles de dificultad, modo oscuro (la app es solo de tema claro).

## 4. Usuarios
| Usuario | Necesidad |
|---|---|
| Jugador (estudiante, joven) | Un juego corto para jugar con un amigo o con un desconocido |
| Docente | Una actividad de agilidad mental para la clase |

Hay un solo rol en el sistema: **jugador autenticado**. No hay administradores.

## 5. Reglas del juego (reglas de negocio)

### Elementos
- **Nube:** números del 1 al 64 desordenados; el orden se sortea en cada partida.
- **Tableros:** uno por jugador, 8×8. El jugador 1 siempre es azul y el jugador 2 siempre es rojo.
- **Contador X/64**, cronómetro general y cuenta regresiva de 15 s para elegir.

### Ronda
1. **Eligiendo:** el jugador activo toca un número de la nube (15 s).
2. **Buscando:** la nube se tapa para el activo; el rival busca el número; el activo marca casillas.
3. Si el rival acierta, se invierten los papeles. Si falla, la nube tiembla y sigue buscando.

### Reglas especiales
| ID | Regla |
|---|---|
| RN-01 | Se sortea al azar quién empieza |
| RN-02 | Si el activo no elige en 15 s, pierde el turno (aviso rojo en los últimos 5 s) |
| RN-03 | Un número encontrado queda del color de quien lo eligió y no se puede volver a elegir |
| RN-04 | Una casilla con X no cuenta dos veces |
| RN-05 | Solo el activo marca; el que busca solo busca |
| RN-06 | Cualquiera puede abandonar (rendirse) con confirmación; gana el otro |
| RN-07 | Si un jugador se desconecta y no vuelve en 15 s, el otro gana por abandono |

### Fin de partida
| ID | Condición | Resultado |
|---|---|---|
| RF-FIN-1 | Un jugador completa 64 casillas | Gana al instante |
| RF-FIN-2 | Se usan los 64 números | Gana quien tenga más X; si empatan, empate |
| RF-FIN-3 | Un jugador abandona | Gana el otro |
| RF-FIN-4 | Un jugador se desconecta más de 15 s | Gana el que se quedó |

Estadísticas: se actualizan una sola vez; el empate solo suma a "jugadas". Revancha: si los dos la piden, nueva partida en la misma sala con otra nube y otro sorteo.

## 6. Requerimientos funcionales
| Código | Requerimiento | Spec |
|---|---|---|
| RF-01 | Registrarse con nombre, correo y contraseña | 001 |
| RF-02 | Validar nombre (3 a 15) y contraseña (mínimo 6) | 001 |
| RF-03 | Iniciar sesión | 001 |
| RF-04 | Cerrar sesión | 001 |
| RF-05 | Proteger `/jugar` y `/partida` sin sesión | 001 |
| RF-06 | Recuperar contraseña con código de 6 dígitos al correo | 001 |
| RF-07 | Reenviar el código | 001 |
| RF-08 | Ver perfil con estadísticas | 005 |
| RF-09 | Cambiar el nombre | 005 |
| RF-10 | Cambiar la foto (recorte y vista previa) | 005 |
| RF-11 | Crear sala privada con código de 6 caracteres | 002 |
| RF-12 | Unirse con código y ver errores claros | 002 |
| RF-13 | Sala de espera que se actualiza sola | 002 |
| RF-14 | Partida rápida con emparejamiento automático | 002 |
| RF-15 | Jugar en tiempo real, cada uno en su dispositivo | 003 |
| RF-16 | Turno de 15 s con paso automático | 003 |
| RF-17 | Ocultar la nube al activo mientras el rival busca | 003 |
| RF-18 | Números usados pintados y bloqueados | 003 |
| RF-19 | Abandonar con confirmación | 004 |
| RF-20 | Victoria por abandono a los 15 s de desconexión | 004 |
| RF-21 | Revancha cuando ambos la piden | 004 |
| RF-22 | Diseño responsive sin scroll | 003 |
| RF-23 | Foto de los dos jugadores en la sala de espera | 002 |
| RF-24 | Aplicación publicada en internet | — |

Estado: los 24 están implementados y publicados.

## 7. Requerimientos no funcionales
| Código | Atributo | Requisito |
|---|---|---|
| RNF-01 | Seguridad | RLS en todas las tablas; contraseñas solo en Supabase Auth con hash; escrituras sensibles solo por funciones SQL que validan `auth.uid()` |
| RNF-02 | Rendimiento | Las jugadas viajan por Broadcast, sin pasar por la base de datos |
| RNF-03 | Usabilidad | Sin scroll en la partida; colores fijos por jugador; sonidos y animaciones de error |
| RNF-04 | Confiabilidad | Reconexión automática, estado guardado en BD, respaldo si falla el tiempo real |
| RNF-05 | Mantenibilidad | Reglas en un archivo puro (`juego.ts`) independiente de la UI |
| RNF-06 | Compatibilidad | Celular, tablet y computador; probado en 7 tamaños de 375×667 a 1920×1080 |
| RNF-07 | Accesibilidad | `lang="es"`, avisos con `role="alert"`/`aria-live`, botones con estado de carga. Pendiente: contraste del botón principal (ver §12) |

## 8. Arquitectura
```
Navegador (React)  ──>  Next.js en Vercel (páginas, Server Actions, proxy)  ──>  Supabase
      │                                                            (Postgres, Auth, Storage)
      └──────── Supabase Realtime (Broadcast · Presence · Postgres Changes) ────────┘
```
- **Front:** Next.js 16 App Router. Server Components leen datos con la sesión; Client Components manejan clics, temporizadores y canales. Server Actions + `useActionState` para formularios. `proxy.ts` protege rutas y renueva la sesión.
- **Back:** Supabase (alternativa rápida al stack Spring Boot + MySQL del diplomado; ver decisión 1).
- **Despliegue:** Vercel con despliegue continuo desde `master`.

Detalle completo (rutas, estructura de carpetas, funciones SQL): `docs/infraestructura/arquitectura.md`.

### 8.1 Multijugador: modelo de árbitro
1. El jugador 1 (creador de la sala) es el **árbitro** y tiene el estado oficial.
2. El invitado propone jugadas por Broadcast (evento `jugada`).
3. El árbitro las aplica con `aplicarJugada()` en orden de llegada; si una jugada es inválida, el estado no cambia.
4. El árbitro envía el estado oficial (evento `estado`) con su hora, y lo guarda con `guardar_partida` (agrupado cada 150 ms).
5. El invitado aplica su jugada de inmediato (predicción) y la reemplaza al recibir el estado oficial.
6. Solo el árbitro aplica `pasar` a los 15 s. Abandono por `latido()` cada 5 s + Presence; `reclamar_abandono()` lo valida en la BD.

Eventos del canal `partida-CÓDIGO`: `jugada`, `estado`, `pedir-estado`, `revancha`.

### 8.2 Lógica del juego
`app/lib/juego.ts` es lógica pura: no usa React, `Date.now()` ni `Math.random()`. La hora y la semilla entran por parámetro (nube con Fisher-Yates y generador mulberry32). La misma función `aplicarJugada()` sirve para la partida local, el árbitro y la predicción del invitado.

## 9. Modelo de datos
```
auth.users 1 ── 1 perfiles
auth.users 1 ── N salas (como jugador1 o jugador2)
salas      1 ── 1 partida (jsonb dentro de salas)
```
**perfiles:** `id` (uuid, FK auth.users), `nombre` (3–15), `jugadas`, `ganadas`, `perdidas`, `foto_url`, `creado_en`
**salas:** `id`, `codigo` (6 caracteres, sin O/0 ni I/1), `estado` (esperando · jugando · terminada), `jugador1`, `jugador2`, `nombre1`, `nombre2`, `foto1`, `foto2`, `partida` (jsonb), `publica`, `activa_en`, `visto1`, `visto2`, `creada_en`
**Storage:** bucket público `avatars`, ruta `avatars/<id>/avatar.jpg`, máx. 2 MB.

Estado de la partida (`EstadoPartida`): `fase`, `nombres`, `nube`, `activo`, `objetivo`, `usados`, `tableros`, `marcadas`, `ganador`, `ronda` y tiempos.

## 10. Seguridad
- RLS: cada jugador ve solo su perfil y las salas donde juega.
- Del perfil solo se puede actualizar `nombre` y `foto_url`; las estadísticas solo las cambian `terminar_partida` y `reclamar_abandono`.
- Las salas no se insertan ni modifican directamente: solo por funciones `security definer` con `set search_path = ''`.
- Concurrencia: `select … for update` y `pg_advisory_xact_lock` en partida rápida; `terminar_partida` no suma dos veces.
- Claves: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (públicas por diseño; protege RLS). Viven en `.env.local` y en Vercel; nunca en el repositorio.

## 11. Diseño de interfaz
- Identidad visual completa: `docs/diseno/identidad-visual.md`
- Logo oficial (Opción A, nube "64" azul y roja): `docs/diseno/marca/logo-opcion-a.png`. El header usa `logo-header-duelo64.png` y la pestaña y el apple-icon usan el ícono completo `icono-duelo64.png` (ver `docs/diseno/identidad-visual.md`)
- Tipografía (decisión 16): Arial en textos, Geist Mono en números y códigos, logotipo del header como imagen
- Pantallas de referencia: `docs/diseno/referencias/`, 36 imágenes en móvil y escritorio (empezar por `00-mapa-de-pantallas.png`); se regeneran con `scripts/capturas-referencia.ts`

Recorrido: Login → Menú (`/jugar`) → Sala de espera o Partida rápida → Partida → Resultado → Revancha o Menú. Perfil desde el header.

## 12. Riesgos, limitaciones y deuda técnica
| # | Tema | Detalle | Acción propuesta |
|---|---|---|---|
| 1 | Contraste | Texto blanco sobre `#3898EC` = 3.1:1 (no pasa AA) | Oscurecer el botón o usar texto oscuro |
| 2 | Tipografía | La oficial es la actual (decisión 16): Arial en textos (`globals.css`), Geist Mono en números (`font-mono`, cargada en `layout.tsx`) y el logotipo del header como imagen (logo Opción A). `layout.tsx` también carga Geist Sans, que solo usa el placeholder del campo "Código de sala" | Quitar la carga de Geist Sans en `layout.tsx` (mantener Geist Mono). Pendiente en tareas.md |
| 3 | Autoridad en el cliente | El árbitro es el navegador del jugador 1; un cliente modificado del creador podría alterar el estado | Mover la validación a una función del servidor (Edge Function) en una versión futura |
| 4 | Dependencia del árbitro | Si el árbitro se desconecta, la partida depende del mecanismo de abandono | Aceptado para el MVP |
| 5 | Logo del header | ✓ Resuelto en v1.5: el header usa `logo-header-duelo64.png` (Opción A) y la pestaña y el apple-icon usan `icono-duelo64.png` | Regenerar las capturas de `docs/diseno/referencias/`, que aún muestran la X cian |

## 13. Pruebas y calidad
- **Vitest:** simulación de partidas con dos jugadores falsos y Supabase simulado (sincronización, turno de 15 s, abandono, partida rápida).
- **Postgres local:** pruebas de todas las funciones SQL.
- **Playwright:** capturas en 7 tamaños; 112 de 112 sin scroll.
- **Manual:** dos navegadores (normal e incógnito) con cuentas distintas.
- Cada criterio de aceptación de `docs/specs/` es una prueba de sí o no (se automatizan en la U5).

## 14. Despliegue y entornos
Ver `docs/infraestructura/despliegue.md`.

## 15. Documentos relacionados
| Documento | Contenido |
|---|---|
| `docs/producto.md` | Problema, usuario, objetivo del MVP |
| `docs/specs/spec001…005` | Funcionalidades con criterios de aceptación |
| `docs/infraestructura/arquitectura.md` | Rutas, carpetas, funciones SQL, Realtime |
| `docs/infraestructura/despliegue.md` | Vercel, Supabase y variables |
| `docs/diseno/` | Identidad, logo y referencias |
| `docs/decisiones.md` | Por qué se hizo cada cosa |
| `docs/sprints/tareas.md` | Tareas del front y pendientes |
| `docs/templates/` | Plantillas para nuevas specs y decisiones |
| `scripts/capturas-referencia.ts` | Regenera las capturas de referencia con Playwright (con la ruta temporal de `scripts/referencia-tmp/`) |
| `BITACORA_IA.md` | Uso de IA, errores y correcciones |

## 16. Historial de versiones
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | 2026-11-14 | Primera versión del SDD: documenta el MVP publicado, 5 specs, identidad visual y referencias |
| 1.1 | 2026-11-14 | Regla de color (jugador 1 azul, jugador 2 rojo), Arial como fuente oficial y pantalla de referencia (decisiones 14 y 16) |
| 1.2 | 2026-11-14 | Logo oficial Opción A (decisión 17), nueva URL https://juegoduelo64.vercel.app y repositorio en la cuenta sgabrielaca25-pixel (decisión 18) |
| 1.3 | 2026-11-14 | Se quitan las referencias y la propuesta de modo oscuro: la app es solo de tema claro |
| 1.4 | 2026-11-14 | Fuente actual como oficial: Arial + Geist Mono + letra del logo en el header (decisión 16). Riesgo 5: el header aún usa el logo X cian. Referencias completas: 15 pantallas en móvil y escritorio y 2 mapas (36 imágenes), con el script `scripts/capturas-referencia.ts` |
| 1.5 | 2026-11-14 | Logo Opción A aplicado: ícono de la pestaña y apple-icon con el ícono completo (cuadro azul con nube "64"), header con `logo-header-duelo64.png` sobre `#F5F8FF`; se copian ambos PNG a `docs/diseno/marca/`. Riesgo 5 resuelto. El logotipo pasa a "Duelo 64" con la letra de la Opción A |

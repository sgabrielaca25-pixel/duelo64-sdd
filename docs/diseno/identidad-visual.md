# Identidad visual · Duelo 64

## Nombre y marca
**Duelo 64** — el logo lleva al menú.

### Logo oficial: Opción A, nube "64" azul y roja
Hoja completa: `docs/diseno/marca/logo-opcion-a.png`. Archivos que usa la app: `docs/diseno/marca/icono-duelo64.png` (ícono completo) y `docs/diseno/marca/logo-header-duelo64.png` (logo del header). La app es solo de tema claro: del logo se usan las versiones claras (el header oscuro de la hoja no aplica).
- **Símbolo:** nube blanca con el número **64**: el **6 en azul** (`#0061A2`, jugador 1) y el **4 en rojo** (`#B3261E`, jugador 2). Representa el duelo entre los dos colores del juego y retoma la nube que ya usaba la app.
- **Logotipo:** "Duelo 64" (mayúscula inicial) en una sans geométrica redondeada, negrita, en azul oscuro.

| Aplicación | Cómo se usa |
|---|---|
| Ícono de la pestaña del navegador (`app/icon.png`) | Ícono completo `icono-duelo64.png`: cuadro redondeado azul `#3898EC` con la nube "64" azul y roja |
| Apple-icon (`app/apple-icon.png`) | El mismo ícono completo `icono-duelo64.png` |
| Header claro (`app/ui/header.tsx`) | Imagen `logo-header-duelo64.png` (en el juego, `public/logo-header-duelo64.png`): nube "64" + "Duelo 64", PNG transparente a 2x (596×136) sobre fondo `#F5F8FF`; en el header la nube lleva borde azul `#3898EC` para verse sobre el fondo claro. Alto de unos 36 px en celular y 44 px en escritorio. Tocarla lleva al menú (`/jugar`) |
| Una tinta | Negro sobre blanco, o calado en blanco sobre azul `#0061A2` |

Reglas:
- No cambiar los colores del 6 y el 4: siempre azul y rojo, en ese orden.
- El ícono de la pestaña también usa el ícono completo con el "64" (no hay versión de solo la nube).
- La imagen del header es transparente; la nube lleva borde azul `#3898EC` para no perderse sobre el fondo claro del header (`#F5F8FF`).
- El logotipo es imagen; los textos de la interfaz van en Arial y los números en Geist Mono (decisión 16).

> El logo anterior (X entrelazada en cian) se descartó y queda archivado en `docs/diseno/marca/descartados/` (decisión 17).

### Estado en la app
- El header de menú, perfil y sala usa el logo Opción A (`logo-header-duelo64.png`) y la pestaña y el apple-icon usan `icono-duelo64.png` (SDD v1.5, rama `logo-opcion-a` del juego).
- El header de partida no cambia: sigue con un círculo "64" y "DUELO 64" en Arial negrita.
- Las capturas de `docs/diseno/referencias/` ya muestran este header (regeneradas en el SDD v1.7).

## Tono de voz
Directo, competitivo y amigable. Frases cortas. Tutea al jugador.
Ejemplos reales de la interfaz:
- "Partida rápida" · "Crear sala privada" · "O CONÉCTATE CON UNA CLAVE"
- "Buscando rival"
- "⚠ Fulano se desconectó. Si no vuelve en 15 s, ganas la partida"
- Errores claros: "La sala ya está llena", "Código de sala inválido"

## Paleta
| Rol | HEX | Uso |
|---|---|---|
| Fondo | `#E9F2FE` | Fondo general (azul muy claro) |
| Tarjetas | `#FDFEFF` | Tarjetas y paneles |
| Azul · jugador 1 | `#3898EC` | Botón principal; X, tablero y números usados del jugador 1 |
| Azul · texto | `#0061A2` | Textos del jugador 1, "64" del logo |
| Rojo · jugador 2 | `#E5536B` | X, tablero y números usados del jugador 2 |
| Rojo · texto | `#B3261E` | Textos del jugador 2, errores, "Abandonar" |
| Superficie secundaria | `#EEF4FF` | Botones secundarios, inputs, chips |
| Dorado · victoria | `#8A6100` | "Victoria" en el historial y número de "Ganadas" en el perfil (spec005, spec006). Derrota usa `#B3261E` y empate `#0061A2` |
| Resaltado amarillo | `#FFF1C2` (borde `#F5D77A`) | Lo que se busca o se copia: número objetivo, código de sala |
| Texto principal | `#000000` | Títulos y texto |
| Texto secundario | `#505961` | Ayudas, etiquetas |

> **Regla de color:** el jugador 1 (quien crea la sala) **siempre es azul** y el jugador 2 (invitado) **siempre es rojo**, en las dos pantallas. En las referencias, David es el jugador 1 y Camila el jugador 2 (decisión 9).

### Contraste (WCAG AA pide 4.5:1 en texto normal)
| Combinación | Contraste | Resultado |
|---|---|---|
| Texto secundario sobre fondo | 6.3:1 | ✓ AA |
| Texto secundario sobre tarjeta | 7.1:1 | ✓ AA |
| Texto J1 `#0061A2` sobre tarjeta | 6.4:1 | ✓ AA |
| Texto J2 `#B3261E` sobre tarjeta | 6.5:1 | ✓ AA |
| Victoria `#8A6100` sobre `#EEF4FF` (tarjeta del historial) | 5.0:1 | ✓ AA |
| Derrota `#B3261E` / empate `#0061A2` sobre `#EEF4FF` | 5.9:1 | ✓ AA |
| Blanco sobre `#3898EC` | 3.1:1 | ⚠ Solo texto grande/negrita (≥ 18.7 px bold) |
| Blanco sobre `#E5536B` | 3.6:1 | ⚠ Solo texto grande/negrita |
| Blanco sobre `#0061A2` / `#B3261E` | 6.5:1 | ✓ AA |

**Regla:** texto blanco pequeño va sobre los tonos oscuros (`#0061A2`, `#B3261E`). Sobre los tonos claros (`#3898EC`, `#E5536B`) solo números grandes en negrita, como los de la nube.

## Tipografía
La tipografía oficial es **la que se ve hoy en la app** (decisión 16):

| Uso | Fuente | Dónde se define |
|---|---|---|
| Todos los textos (títulos en negrita, texto en regular) | **Arial**, con respaldo Helvetica y sans-serif | `body` en `app/globals.css` (y `--font-sans`, para la clase `font-sans`) |
| Números y códigos (`font-mono`): nube, contadores X/64, cronómetro, cuenta de 15 s, número objetivo, código de sala, código de 6 dígitos | **Geist Mono**, en negrita | `next/font/google` en `app/layout.tsx` → `--font-geist-mono` → `--font-mono` en `globals.css` |
| Logotipo del header de menú, perfil y sala | **Imagen** (`public/logo-header-duelo64.png`, logo Opción A): "Duelo 64" con mayúscula inicial, sans geométrica redondeada en negrita. No es una fuente instalada | `app/ui/header.tsx` |
| "DUELO 64" del header de partida | Arial negrita | `app/ui/header-partida.tsx` |

- Los números de la nube van en Geist Mono negrita, con 3 tamaños y un pequeño desorden fijo.
- Ya no se carga **Geist Sans** (SDD v1.8, riesgo 2 resuelto). `font-sans` equivale a Arial; solo se usa para volver a Arial dentro de un campo `font-mono`, como el placeholder de "Código de sala" (`placeholder:font-sans`).
- No agregues otras fuentes.

## Estilo de componentes
- Tarjetas blancas con bordes muy redondeados (`rounded-[3rem]`) y sombra grande.
- Todos los botones son píldoras (`rounded-full`). Principal azul `#3898EC`; secundarios `#EEF4FF`.
- Nube blanca con "bultos" arriba; 8 columnas en celular, 16 desde 640 px y 22 desde 1024 px.
- Tablero 8×8 siempre cuadrado (container queries).
- Botones con estado de carga mientras el servidor responde; área táctil mínima de 44 px.
- Pantalla de partida a alto completo (`h-dvh`), sin scroll.
- Animaciones: sacudida de la nube al equivocarse, pulso en la espera, resaltado de la última X.
- Sonidos: elegir, marcar, encontrar y error.

## Responsive
| Pantalla | Qué se ve |
|---|---|
| ≥ 1024 px (computador, tablet horizontal) | Header, aviso de turno, nube y los dos tableros lado a lado |
| Celular y tablet vertical | Solo el foco: la nube o el tablero propio; arriba las X del rival |
| Celular horizontal (alto ≤ 520 px) | Dos columnas: información a la izquierda, nube o tablero a la derecha |

Variantes propias en `globals.css`: `bajo` (alto ≤ 520 px) y `medio` (alto ≤ 800 px y ancho ≤ 1023 px).

## Referencias
Las 38 imágenes de `docs/diseno/referencias/` muestran cómo debe verse cada pantalla, en móvil (390×844) y escritorio (1366×768) (explicación completa en su `README.md`):
- `00-mapa-de-pantallas.png` (móvil) y `00-mapa-de-pantallas-escritorio.png`: todas las pantallas en una sola imagen.
- `01` a `15`: login, login con error, registro, menú, perfil (con historial y vacío), sala privada, partida rápida, fases de la partida, desconexión, abandono, resultados y recuperar contraseña (3 pasos).
- Se regeneran con `scripts/capturas-referencia.ts`.

Antes de terminar una tarea de UI, compara la pantalla con su referencia.

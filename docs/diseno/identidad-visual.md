# Identidad visual · Duelo 64

## Nombre y marca
**DUELO 64** — el logo lleva al menú.
- Logo oficial: `docs/diseno/marca/logo-duelo64.png` (X entrelazada que evoca las casillas marcadas, "DUELO" en blanco y "64" en cian).
- Colores del logo: cian claro `#B4EFFF`, cian `#16C1DF` sobre fondo oscuro `#222222`.
- Dentro de la app se usa la versión simple: icono de nube + "DUELO" en negro y "64" en azul `#0061A2`.

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
| Blanco sobre `#3898EC` | 3.1:1 | ⚠ Solo texto grande/negrita (≥ 18.7 px bold) |
| Blanco sobre `#E5536B` | 3.6:1 | ⚠ Solo texto grande/negrita |
| Blanco sobre `#0061A2` / `#B3261E` | 6.5:1 | ✓ AA |

**Regla:** texto blanco pequeño va sobre los tonos oscuros (`#0061A2`, `#B3261E`). Sobre los tonos claros (`#3898EC`, `#E5536B`) solo números grandes en negrita, como los de la nube.

## Tipografía
- Fuente oficial: **Arial** (aplicada al `body` en `globals.css`). Títulos en negrita, texto en regular (decisión 16).
- `layout.tsx` todavía carga Geist con `next/font` sin usarla: se puede quitar (ver SDD §12).
- Los números de la nube van en **monoespaciada negrita**, con 3 tamaños y un pequeño desorden fijo.

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
Las 43 imágenes de `docs/diseno/referencias/` muestran cómo debe verse cada pantalla (explicación completa en su `README.md`):
- `00-mapa-de-pantallas.png`: recorrido completo en celular.
- `01` a `14`: login, registro, menú, perfil, sala privada, partida rápida, fases de la partida, desconexión, abandono y resultados.
- Cada una tiene versión `-oscuro.png`: propuesta de modo oscuro "cielo de noche", **no implementada** (fuera del MVP).

Antes de terminar una tarea de UI, compara la pantalla con su referencia.

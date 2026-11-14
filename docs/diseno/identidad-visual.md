# Identidad visual · Duelo 64

## Nombre y marca
**Duelo 64** — el logo lleva al menú.

### Logo oficial: Opción A, nube "64" azul y roja
Archivo: `docs/diseno/marca/logo-opcion-a.png`. La app es solo de tema claro: del logo se usan las versiones claras (el header oscuro de la hoja no aplica).
- **Símbolo:** nube blanca con el número **64**: el **6 en azul** (`#0061A2`, jugador 1) y el **4 en rojo** (`#B3261E`, jugador 2). Representa el duelo entre los dos colores del juego y retoma la nube que ya usaba la app.
- **Logotipo:** "Duelo 64" en una sans geométrica redondeada, negrita.

| Aplicación | Cómo se usa |
|---|---|
| Ícono de app (180, 120 y 64 px) | Nube con "64" azul y rojo sobre cuadro redondeado azul `#3898EC` |
| Favicon (32 y 16 px) | Solo la nube blanca sobre azul (sin número: no se lee a ese tamaño) |
| Header claro | Nube + "Duelo 64" en negro sobre `#F5F8FF` |
| Una tinta | Negro sobre blanco, o calado en blanco sobre azul `#0061A2` |

Reglas:
- No cambiar los colores del 6 y el 4: siempre azul y rojo, en ese orden.
- Por debajo de 32 px se usa solo la nube.
- El logotipo es imagen; los textos de la interfaz siguen en Arial (decisión 16).

> El logo anterior (X entrelazada en cian) se descartó y queda archivado en `docs/diseno/marca/descartados/` (decisión 17).
> Las imágenes de `docs/diseno/referencias/` muestran el header anterior (icono de nube + "DUELO 64"); la estructura y los colores siguen vigentes.

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
Las 21 imágenes de `docs/diseno/referencias/` muestran cómo debe verse cada pantalla (explicación completa en su `README.md`):
- `00-mapa-de-pantallas.png`: recorrido completo en celular.
- `01` a `14`: login, registro, menú, perfil, sala privada, partida rápida, fases de la partida, desconexión, abandono y resultados.

Antes de terminar una tarea de UI, compara la pantalla con su referencia.

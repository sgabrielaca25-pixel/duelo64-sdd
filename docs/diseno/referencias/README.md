# Referencias visuales · Duelo 64

Estas imágenes muestran **cómo debe verse cada pantalla** de Duelo 64. Se generaron a partir del código actual (`app/ui/`), con sus colores, textos y estados reales.

Si construyes o cambias una pantalla, compárala con su imagen antes de terminar la tarea. Si el diseño cambia a propósito, regenera la imagen y anota la decisión.

Datos de ejemplo: el jugador es **David** (azul) y el rival es **Camila** (rojo).

## Pantallas

| Imagen | Ruta | Qué muestra |
|---|---|---|
| `00-mapa-de-pantallas.png` | — | Vista general del recorrido en celular |
| `01-login-movil.png` | `/login` | Formulario vacío |
| `02-login-error-movil.png` | `/login` | Error de credenciales: píldora roja arriba y el correo conservado |
| `03-registro-movil.png` | `/registro` | Nombre del jugador, correo y contraseña |
| `04-menu-jugar-movil.png` / `-escritorio.png` | `/jugar` | Saludo, partida rápida, crear sala, unirse con código, acceso al perfil |
| `05-perfil-movil.png` | `/jugar/perfil` | Foto con botón de cámara, nombre editable ("✓ Nombre guardado"), estadísticas, cerrar sesión |
| `06-sala-privada-movil.png` | `/jugar/sala/[codigo]` | Código copiable en amarillo y puesto del rival vacío (borde punteado) |
| `07-partida-rapida-buscando-movil.png` | `/jugar/sala/[codigo]` | Partida rápida: "Buscando rival..." y sin código |
| `08-partida-eligiendo-*.png` | `/partida/[codigo]` | Fase **eligiendo**: el activo toca la nube |
| `09-partida-buscando-vista-buscador-*.png` | `/partida/[codigo]` | Fase **buscando**, vista de quien busca: número objetivo en amarillo y número errado con destello rojo |
| `10-partida-buscando-vista-activo-*.png` | `/partida/[codigo]` | Fase **buscando**, vista del activo: la nube se tapa ("¡Marca casillas rápido!") y su tablero tiene un anillo azul |
| `11-rival-desconectado-*.png` | `/partida/[codigo]` | Aviso rojo con la cuenta regresiva de abandono |
| `12-confirmar-abandono-*.png` | `/partida/[codigo]` | Diálogo de confirmación; el foco empieza en "Seguir jugando" |
| `13-resultado-victoria-movil.png` | resultado | Trofeo, marcador de casillas, tiempo, Revancha |
| `14-resultado-derrota-movil.png` | resultado | Bandera roja, mismo esquema |

## Reglas visuales que se ven en las imágenes
- Fondo de la app `#E9F2FE`. Tarjetas `#FDFEFF` muy redondeadas (3rem) con sombra grande.
- El jugador 1 (creador de la sala) siempre es **azul** (`#3898EC` / `#0061A2`) y el jugador 2 siempre es **rojo** (`#E5536B` / `#B3261E`). En estas imágenes David es el jugador 1.
- Todos los botones son píldoras (`rounded-full`). El principal es azul `#3898EC`; los secundarios son `#EEF4FF`.
- Lo que se busca o se copia va en amarillo `#FFF1C2` con borde `#F5D77A` (número objetivo, código de sala).
- La nube es blanca con "bultos" arriba. Los números van en monoespaciada negrita, con 3 tamaños y un pequeño desorden fijo. Tiene 8 columnas en celular, 16 desde 640 px y 22 desde 1024 px.
- Tableros de 8 x 8. Las casillas marcadas llevan una X del color del jugador, la última marcada va un tono más fuerte y el tablero del jugador activo lleva un anillo.
- En escritorio los dos tableros van lado a lado; en celular van uno debajo del otro.

## Modo oscuro (propuesta)
Cada imagen tiene su versión `-oscuro.png`, y el mapa general también (`00-mapa-de-pantallas-oscuro.png`).
**Hoy la app no tiene modo oscuro**: los colores están fijos en las clases de Tailwind. Estas imágenes son la propuesta "cielo de noche" para cuando se implemente. Todos sus contrastes pasan AA.

| Uso | Claro | Oscuro |
|---|---|---|
| Fondo de la app | `#E9F2FE` | `#0B1626` |
| Header | `#F5F8FF` | `#0F1D31` |
| Tarjetas y tableros | `#FDFEFF` / blanco | `#132439` (borde `#1F3550`) |
| Superficie secundaria (inputs, chips, stats) | `#EEF4FF` | `#1B3150` |
| Nube | blanco | `#1D3150` |
| Texto principal / secundario | `#000000` / `#505961` | `#EAF2FD` / `#A9B6C6` |
| Texto apagado | `#A4AAB1` | `#8796AA` |
| Botón principal | `#3898EC` con texto blanco | `#4BA3F0` con texto `#06111F` (7:1) |
| Jugador (azul) | `#0061A2` / `#3898EC` | `#7CC4F5` / `#4BA3F0` |
| Rival (rojo) | `#B3261E` / `#E5536B` | `#FF8A9B` / `#FF6F84`, fondo `#3A1B26` |
| Resaltado amarillo | `#FFF1C2` / `#F5D77A` | `#3D3210` / `#8A7230`, texto `#FFE7A0` |
| Casilla vacía | `#F7F9FC` | `#17293F` (borde `#22395A`) |
| Casilla marcada (azul / rojo) | `#DDF0FD` / `#FCE4E8` | `#12365A` / `#3A1B26` |
| Cronómetro | `#B86E00` | `#F5B44A` |

## Pendiente de diseño (no corregido en las imágenes claras)
- El texto blanco sobre el botón `#3898EC` tiene un contraste de 3.1:1 y no pasa WCAG AA (4.5:1).
- ~~Los textos usan Arial aunque `layout.tsx` carga Geist.~~ Resuelto: Arial es la fuente oficial (decisión 16); falta quitar la carga de Geist en `layout.tsx`.

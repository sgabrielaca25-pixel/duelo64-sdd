# Referencias visuales · Duelo 64

Estas imágenes muestran **cómo debe verse cada pantalla** de Duelo 64. Se generaron a partir del código actual (`app/ui/`), con sus colores, textos y estados reales.

Si construyes o cambias una pantalla, compárala con su imagen antes de terminar la tarea. Si el diseño cambia a propósito, regenera la imagen y anota la decisión.

Datos de ejemplo: el jugador es **David** (azul) y el rival es **Camila** (rojo).

## Pantallas
36 imágenes: 17 capturas en **móvil (390×844)** y 17 en **escritorio (1366×768)**, más un mapa de cada tamaño. Cada pantalla tiene dos archivos: `NN-nombre-movil.png` y `NN-nombre-escritorio.png`.

| # | Imagen (`-movil.png` / `-escritorio.png`) | Ruta | Qué muestra |
|---|---|---|---|
| 00 | `00-mapa-de-pantallas.png` / `00-mapa-de-pantallas-escritorio.png` | — | Todas las pantallas en una sola imagen |
| 01 | `01-login` | `/login` | Formulario vacío |
| 02 | `02-login-error` | `/login` | Error real de credenciales ("Datos no coinciden…") en píldora roja y el correo conservado |
| 03 | `03-registro` | `/registro` | Nombre del jugador, correo y contraseña |
| 04 | `04-menu-jugar` | `/jugar` | Header actual, saludo "¡Hola, David!", partida rápida, crear sala, unirse con código, acceso al perfil |
| 05 | `05-perfil` | `/jugar/perfil` | Foto con botón de cámara, nombre editable, estadísticas (24 jugadas, 15 ganadas, 8 perdidas), cerrar sesión |
| 06 | `06-sala-privada` | `/jugar/sala/[codigo]` | Código copiable en amarillo y puesto del rival vacío (borde punteado) |
| 07 | `07-partida-rapida-buscando` | `/jugar/sala/[codigo]` | Partida rápida: "Buscando rival" y sin código |
| 08 | `08-partida-eligiendo` | `/partida/[codigo]` | Fase **eligiendo**: David elige en la nube, cuenta de 15 s |
| 09 | `09-partida-buscando-vista-buscador` | `/partida/[codigo]` | Fase **buscando**, vista de quien busca (David): número objetivo en amarillo; el tablero de Camila (activa) tiene anillo rojo |
| 10 | `10-partida-buscando-vista-activo` | `/partida/[codigo]` | Fase **buscando**, vista del activo (David): la nube se tapa ("¡Marca casillas rápido!") y su tablero tiene anillo azul |
| 11 | `11-rival-desconectado` | `/partida/[codigo]` | Aviso rojo con la cuenta regresiva de abandono |
| 12 | `12-confirmar-abandono` | `/partida/[codigo]` | Diálogo "¿Quieres rendirte?"; el foco empieza en "Cancelar" |
| 13 | `13-resultado-victoria` | `/partida/[codigo]` (al terminar) | Trofeo, marcador de casillas, tiempo, Revancha |
| 14 | `14-resultado-derrota` | `/partida/[codigo]` (al terminar) | Bandera roja, mismo esquema |
| 15 | `15-recuperar-contrasena-1-correo` | `/recuperar-contrasena` | Paso 1: correo para recibir el código |
| 15 | `15-recuperar-contrasena-2-codigo` | `/recuperar-contrasena/codigo` | Paso 2: código de 6 dígitos ("da***@ejemplo.test") y reenviar |
| 15 | `15-recuperar-contrasena-3-nueva` | `/recuperar-contrasena/nueva` | Paso 3: nueva contraseña y confirmación |

## Cómo se generan
Con `scripts/capturas-referencia.ts` (Playwright, tema claro). Las pantallas sin sesión (01, 02, 03, 15-1 y 15-2) se capturan en sus rutas reales. Las que necesitan sesión o una partida en curso se muestran con la ruta temporal `scripts/referencia-tmp/`, que renderiza los componentes reales de `app/ui` con datos de ejemplo (estado armado con `app/lib/juego.ts`). Esa carpeta se copia al juego solo para capturar y se borra al terminar. Instrucciones en el encabezado del script.

## Reglas visuales que se ven en las imágenes
- Fondo de la app `#E9F2FE`. Tarjetas `#FDFEFF` muy redondeadas (3rem) con sombra grande.
- El jugador 1 (creador de la sala) siempre es **azul** (`#3898EC` / `#0061A2`) y el jugador 2 siempre es **rojo** (`#E5536B` / `#B3261E`). En estas imágenes David es el jugador 1.
- Todos los botones son píldoras (`rounded-full`). El principal es azul `#3898EC`; los secundarios son `#EEF4FF`.
- Lo que se busca o se copia va en amarillo `#FFF1C2` con borde `#F5D77A` (número objetivo, código de sala).
- La nube es blanca con "bultos" arriba. Los números van en monoespaciada negrita, con 3 tamaños y un pequeño desorden fijo. Tiene 8 columnas en celular, 16 desde 640 px y 22 desde 1024 px.
- Tableros de 8 x 8. Las casillas marcadas llevan una X del color del jugador, la última marcada va un tono más fuerte y el tablero del jugador activo lleva un anillo.
- En escritorio los dos tableros van lado a lado; en celular solo se ve el foco (la nube o tu tablero) y arriba el progreso de los dos.

## Pendiente de diseño (se ve así en las imágenes)
- El texto blanco sobre el botón `#3898EC` tiene un contraste de 3.1:1 y no pasa WCAG AA (4.5:1).
- Tipografía: la oficial es la actual (decisión 16): Arial en textos y Geist Mono en números. Falta quitar la carga de Geist Sans en `layout.tsx`, que casi no se usa.
- El header muestra el logo X cian descartado (decisión 17); falta cambiarlo por la nube Opción A (SDD §12, riesgo 5).

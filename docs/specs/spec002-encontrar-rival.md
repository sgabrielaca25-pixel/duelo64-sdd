# Spec 002 · Encontrar rival

## Historia
Como jugador, quiero jugar con un amigo usando un código o con cualquier persona de forma automática, para empezar una partida rápido.

## Comportamiento
1. Desde `/jugar` elige:
   - **Crear sala privada**: se crea una sala con código de 6 caracteres y va a la sala de espera.
   - **Unirse con clave** ("O CONÉCTATE CON UNA CLAVE"): escribe el código del amigo.
   - **Partida rápida** (insignia AUTO 1v1): el sistema lo empareja con otro jugador que esté buscando.
2. En la sala de espera ve el código para compartir, las fotos o iniciales de los dos jugadores y un indicador de espera.
3. Cuando entra el rival, la sala pasa sola a `/partida/CÓDIGO`.

## Criterios de aceptación
- [x] El código de sala tiene 6 caracteres y no usa O, 0, I ni 1.
- [x] Con un código que no existe se muestra "Código de sala inválido".
- [x] Con una sala que ya tiene dos jugadores se muestra "La sala ya está llena".
- [x] Con una sala que ya empezó o terminó se muestra "Esa sala ya no está disponible".
- [x] La sala de espera se actualiza sola, sin recargar, cuando entra el rival.
- [x] La sala de espera muestra la foto (o inicial) de los dos jugadores.
- [x] En partida rápida se muestra "Buscando rival" mientras espera.
- [x] Si dos personas pulsan Partida rápida al mismo tiempo, quedan en la misma sala.
- [x] Una sala pública sin señal por más de 30 s no se usa para emparejar.
- [x] El jugador puede salir de la sala de espera y vuelve al menú.

## Archivos
`jugar-menu.tsx`, `boton-partida-rapida.tsx`, `unirse-sala-form.tsx`, `sala-espera.tsx`, `acciones-sala.ts`; SQL `crear_sala`, `unirse_sala`, `salir_sala`, `buscar_partida_rapida`, `seguir_esperando`, `copiar_fotos_sala`

## Fuera de alcance
Lista pública de salas, invitar amigos por enlace o red social.

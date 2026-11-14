# Spec 003 · Partida en línea

## Historia
Como jugador, quiero jugar cada uno desde mi dispositivo y ver las jugadas del rival al instante, para competir de verdad en tiempo real.

## Comportamiento
1. Se sortea quién empieza (activo). Tableros vacíos, ningún número usado.
2. **Eligiendo**: el activo toca un número de la nube (tiene 15 s).
3. **Buscando**: la nube se oculta al activo; el rival busca ese número; el activo marca X en su tablero.
4. Si el rival toca el número correcto, se invierten los papeles. Si se equivoca, la nube tiembla, suena error y sigue buscando.
5. El header muestra nombres, cronómetro y botón "Abandonar" (rendirse).

## Criterios de aceptación
- [x] La nube muestra los números del 1 al 64 en un orden distinto en cada partida.
- [x] El jugador 1 siempre es azul y el jugador 2 siempre es rojo.
- [x] Si el activo no elige en 15 s, el turno pasa al rival.
- [x] La cuenta regresiva se pone roja en los últimos 5 s.
- [x] Mientras el rival busca, el activo no ve la nube.
- [x] Un número encontrado queda pintado del color de quien lo eligió y no se puede volver a elegir.
- [x] Una casilla que ya tiene X no suma dos veces.
- [x] El jugador que busca no puede marcar casillas.
- [x] Al tocar un número equivocado, la nube tiembla y suena un error.
- [x] Una jugada en un dispositivo se ve en el otro en menos de 1 segundo.
- [x] El cronómetro y la cuenta de 15 s marcan lo mismo en los dos dispositivos.
- [x] Al recargar la página, la partida continúa en el mismo estado.
- [x] A 390 px se ve solo la nube o el tablero propio, y arriba las X del rival.
- [x] Ninguna pantalla de la partida tiene scroll en los 7 tamaños probados.

## Archivos
`juego.ts`, `partida-online.ts`, `partida-online.tsx`, `escena-partida.tsx`, `header-partida.tsx`, `nube-numeros.tsx`, `tablero-jugador.tsx`, `estado-turno.tsx`, `barra-turno.tsx`, `progreso-jugadores.tsx`, `sonidos.ts`; SQL `guardar_partida`

## Fuera de alcance
Espectadores, chat, repetición de partidas.

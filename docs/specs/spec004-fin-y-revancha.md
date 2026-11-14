# Spec 004 · Fin de partida y revancha

## Historia
Como jugador, quiero que la partida termine de forma justa en cualquier situación y poder pedir la revancha, para seguir jugando con el mismo rival.

## Comportamiento
1. La partida termina por: 64 casillas, números agotados, rendición o abandono.
2. Se muestra el resultado: victoria, derrota o empate, casillas de cada uno y tiempo total.
3. Si los dos piden revancha, empieza una partida nueva en la misma sala.

## Criterios de aceptación
- [x] El primero que completa 64 casillas gana al instante.
- [x] Si se usan los 64 números, gana quien tenga más X; con las mismas X es empate.
- [x] Al pulsar "Abandonar" (rendirse) aparece una ventana de confirmación; al confirmar, gana el rival.
- [x] Si el rival se desconecta aparece el aviso "Si no vuelve en 15 s, ganas la partida" con cuenta regresiva.
- [x] Si el rival vuelve antes de 15 s, el aviso desaparece y la partida sigue.
- [x] Si no vuelve, el que se quedó gana por abandono.
- [x] La pantalla de resultado muestra el resultado, las casillas de cada jugador y el tiempo total.
- [x] La revancha empieza solo cuando los dos la piden, con otra nube y otro sorteo.
- [x] Si el rival sale de la pantalla de resultado, vuelves al menú.

## Archivos
`juego.ts` (jugadas `rendirse` y `pasar`), `confirmar-rendirse.tsx`, `resultado-partida.tsx`, `resultado-conectado.tsx`; SQL `terminar_partida`, `latido`, `reclamar_abandono`, `reiniciar_partida`

## Fuera de alcance
Penalizaciones por abandono, sistema de puntos tipo ELO.

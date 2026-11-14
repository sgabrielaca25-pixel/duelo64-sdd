# Producto · Duelo 64

## Problema
Los juegos rápidos para jugar con un amigo suelen pedir instalar una app o estar en el mismo dispositivo.
Queremos un duelo corto (2 a 5 minutos), en línea, cada persona desde su propio celular o computador, sin instalar nada.

## Usuario
- Principal: estudiantes y jóvenes que buscan un juego corto para jugar con un amigo o con un desconocido.
- Secundario: docentes que quieren una actividad de agilidad mental en clase.
- Contexto: celular, tablet o computador con navegador y conexión a internet.

## Propuesta de valor
Un juego de agilidad visual y velocidad: encontrar rápido un número en una nube desordenada y marcar rápido mientras el rival busca. Cada turno es una pequeña carrera.

## Cómo se juega (resumen)
1. Se sortea quién empieza (jugador activo).
2. El activo elige un número de la nube (15 s).
3. La nube se oculta al activo; el rival busca ese número mientras el activo marca X en su tablero de 8×8.
4. Cuando el rival lo encuentra, se invierten los papeles.
5. Gana quien complete 64 casillas. Si se usan los 64 números, gana quien tenga más X (o empate).
Reglas completas: docs/SDD.md §5

## Objetivo del MVP
Que dos personas, cada una en su dispositivo, puedan registrarse, encontrarse y jugar una partida completa sincronizada en tiempo real, en menos de 1 minuto desde que abren el enlace.

## Funcionalidades (ver docs/specs/)
- spec001 · Cuentas: registro, inicio y cierre de sesión, recuperar contraseña con código al correo
- spec002 · Encontrar rival: sala privada con código de 6 caracteres y partida rápida automática
- spec003 · Partida en línea: nube, tableros, turnos de 15 s, sincronización en tiempo real
- spec004 · Fin de partida y revancha: victoria, empate, rendición, abandono, revancha
- spec005 · Perfil y estadísticas: nombre editable, foto de perfil, jugadas/ganadas/perdidas

## Fuera del MVP
- Ranking global o tabla de líderes
- Chat entre jugadores
- Partidas de más de 2 jugadores o torneos
- Jugar contra la computadora (IA)
- Inicio de sesión con Google u otras redes
- App móvil nativa (la web ya funciona en celular)
- Niveles de dificultad o tableros de otros tamaños

## Cómo sabremos que funciona
- Dos jugadores en dispositivos distintos terminan una partida sin quedar desincronizados.
- Una partida dura entre 2 y 5 minutos.
- Ninguna pantalla tiene scroll en los 7 tamaños probados (112 de 112 pruebas pasaron).
- Las estadísticas del perfil se actualizan una sola vez por partida.

# Decisiones · Duelo 64

> Estas decisiones se tomaron durante la construcción del juego y se documentaron después, al aplicar SDD en la Unidad 3. La columna "Registrada" indica cuándo se escribió aquí.

| # | Decisión | Por qué | Registrada |
|---|---|---|---|
| 1 | Supabase en lugar de Spring Boot + MySQL | Realtime incluido (Vercel no mantiene sockets), Auth y Storage en un solo servicio, plan gratuito. La guía lo permite como alternativa rápida para el MVP. | 2026-11-14 |
| 2 | El jugador 1 es el árbitro de la partida | Un solo orden de jugadas: los dos ven exactamente el mismo estado. El invitado no puede jugar ni rendirse por el creador. | 2026-11-14 |
| 3 | Reglas en un archivo puro (`juego.ts`) | La misma función sirve para partida local, árbitro y predicción del invitado. Se prueba sin pantalla. | 2026-11-14 |
| 4 | Jugadas por Broadcast, no por la base de datos | Respuesta casi instantánea. La base de datos solo guarda el estado para recargar. | 2026-11-14 |
| 5 | Turno de 15 s para elegir | Evita que un jugador congele la partida. | 2026-11-14 |
| 6 | Ocultar la nube al jugador activo | Evita que memorice o "ayude" a encontrar su número. | 2026-11-14 |
| 7 | Números usados bloqueados y límite de 64 números | Evita elegir siempre el número fácil y garantiza que toda partida termina. | 2026-11-14 |
| 8 | Pantalla de juego sin scroll, con "foco" en celular | En celular solo se ve lo que el jugador necesita en ese momento (nube o su tablero). | 2026-11-14 |
| 9 | Colores fijos: jugador 1 azul, jugador 2 rojo | El jugador identifica al instante de quién es cada número y cada tablero. | 2026-11-14 |
| 10 | SMTP propio de Gmail para recuperar contraseña | El correo de prueba de Supabase solo envía al equipo y tiene límites bajos. | 2026-11-14 |
| 11 | Código de sala sin O/0 ni I/1 | Evita confusiones al dictar o escribir el código. | 2026-11-14 |
| 12 | Estadísticas solo desde funciones SQL | Nadie puede ponerse victorias falsas: el usuario solo puede editar nombre y foto. | 2026-11-14 |
| 13 | Unión final conservando modelo de datos del backend y diseño del frontend | El front se había hecho sobre una copia vieja del backend; así no se perdió trabajo de nadie (rama `union-final`). | 2026-11-14 |
| 14 | Pantalla de referencia: el diseño actual, documentado en 43 imágenes (`docs/diseno/referencias/`) | Las pantallas ya están construidas y probadas; las imágenes se generaron del código real y cubren las 14 vistas en celular y escritorio. Se evaluaron con la rúbrica de la guía (claridad, jerarquía, consistencia, responsivo, accesibilidad); el único fallo es el contraste del botón principal (SDD §12). | 2026-11-14 |
| 15 | Documentación SDD en un repositorio aparte (`duelo64-sdd`) | Separa los planos del código, como en el proyecto de referencia de la clase; el código sigue en `nextjs-dashboard` | 2026-11-14 |
| 16 | Arial como fuente oficial | Es la que se ve hoy en todas las pantallas (`globals.css`); cambiarla no aporta al MVP. Se quitará la carga sin uso de Geist en `layout.tsx` | 2026-11-14 |

---
name: ui-componentes
description: Crear o modificar componentes y pantallas de Duelo 64 respetando su identidad visual, el responsive sin scroll y la separación entre UI y lógica. Úsala cada vez que la tarea toque algo en app/ui/ o en una page.tsx.
---

# Cómo construimos UI en Duelo 64

1. Lee `docs/diseno/identidad-visual.md` antes de escribir estilos.
2. Usa solo los colores de la paleta:
   - Fondo `#E9F2FE`, tarjetas `#FDFEFF`, texto secundario `#505961`.
   - Jugador 1 SIEMPRE azul (`#3898EC`, texto `#0061A2`); jugador 2 SIEMPRE rojo (`#E5536B`, texto `#B3261E`).
   - Texto blanco pequeño solo sobre `#0061A2` o `#B3261E` (contraste AA).
3. Tipografía (la actual, decisión 16):
   - Textos en Arial (aplicada al `body` en `globals.css`). Títulos en negrita.
   - Números y códigos con `font-mono` = Geist Mono (cargada en `layout.tsx`), en negrita: nube, contadores, cronómetro, códigos.
   - El logotipo del header es la imagen `public/logo-header-duelo64.png` (no se escribe con una fuente). El header de partida usa "DUELO 64" en Arial negrita.
   - No agregues otras fuentes ni uses `font-sans` (Geist Sans se va a quitar).
4. Componentes en `app/ui/`, uno por archivo, nombre en español en minúsculas con guiones (`barra-turno.tsx`), props tipadas con TypeScript.
5. La UI no decide reglas: llama a funciones de `app/lib/juego.ts` o recibe el estado por props. Nada de `Math.random()` ni lógica de turnos en componentes.
6. `"use client"` solo si hay clics, estado, efectos, temporizadores o canales. Si solo muestra datos, déjalo como Server Component.
7. Formularios: Server Action de `app/lib/acciones-*.ts` + `useActionState`. Muestra el error y el estado de carga del botón.
8. Responsive:
   - Mobile first; amplía con `sm:` y `lg:`.
   - En la partida: `h-dvh overflow-hidden`, `flex` con `min-h-0` y `flex-1`. Nunca scroll.
   - Usa las variantes `bajo:` (celular acostado) y `medio:` cuando haga falta.
   - Tableros cuadrados con container queries.
9. Accesibilidad mínima:
   - Botones con texto claro y área táctil de 44 px.
   - Imágenes con `alt`; inputs con `label`.
   - Avisos importantes con `role="alert"` o `aria-live`.
10. Estados: muestra siempre cargando, vacío y error.
11. Compara la pantalla con su imagen en `docs/diseno/referencias/` (claro) antes de terminar.
12. Al terminar, lista los componentes creados o cambiados y cómo verlos (ruta y tamaño de pantalla: 390 px y 1366 px).

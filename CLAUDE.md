# Proyecto: Duelo 64 · SDD

Repositorio de documentación (Spec-Driven Development) del juego Duelo 64.
Aquí NO hay código. El código está en `saludable57/nextjs-dashboard` y se publica en https://duelo64-theta.vercel.app

## Documentación (léela antes de cualquier cambio)
- Documento maestro: @docs/SDD.md
- Producto y alcance: @docs/producto.md
- Funcionalidades y criterios de aceptación: docs/specs/
- Arquitectura y despliegue: docs/infraestructura/
- Identidad visual: @docs/diseno/identidad-visual.md
- Pantallas de referencia: docs/diseno/referencias/ (empezar por 00-mapa-de-pantallas.png)
- Decisiones: docs/decisiones.md
- Tareas: docs/sprints/tareas.md

## Reglas de trabajo
- Las specs nuevas se crean con @docs/templates/spec-plantilla.md y se numeran `specNNN-nombre.md`.
- Cada criterio de aceptación debe poder comprobarse en el navegador con un sí o un no.
- No agregues funcionalidades fuera del alcance de docs/SDD.md §3 sin proponerlo primero.
- Cuando cambie el diseño o el alcance: actualiza docs/SDD.md, sube la versión en §16 y registra la decisión en docs/decisiones.md.
- Mantén coherencia entre SDD.md, las specs y la arquitectura: si cambias uno, revisa los otros.
- Nunca escribas llaves, tokens ni contraseñas en estos documentos.
- Textos en español, claros y cortos.

## Cuando trabajes en el repositorio de código
Estas reglas también aplican allá:
- Implementa UNA tarea a la vez y márcala en docs/sprints/tareas.md.
- Las reglas del juego viven solo en `app/lib/juego.ts` (lógica pura).
- Toda pantalla sigue la skill ui-componentes y se compara con su referencia en docs/diseno/referencias/.

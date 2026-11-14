# Spec 005 · Perfil y estadísticas

## Historia
Como jugador, quiero ver mis estadísticas y personalizar mi nombre y mi foto, para que el rival me reconozca y yo vea mi progreso.

## Comportamiento
1. Desde el header (clic en el nombre) va a `/jugar/perfil`.
2. Ve su foto o inicial, su nombre y sus estadísticas: jugadas, ganadas, perdidas.
3. Puede editar el nombre y cambiar la foto (recorte y vista previa antes de subir).

## Criterios de aceptación
- [x] El perfil muestra partidas jugadas, ganadas y perdidas.
- [x] Al terminar una partida las estadísticas se actualizan una sola vez.
- [x] Un empate suma solo a "jugadas".
- [x] Un nombre de menos de 3 o más de 15 caracteres muestra un error.
- [x] Al cambiar el nombre, el header muestra el nombre nuevo sin recargar.
- [x] Al elegir una foto se ve una vista previa recortada en círculo antes de guardar.
- [x] Una foto de más de 2 MB o que no sea imagen no se sube.
- [x] La foto nueva aparece de inmediato (no la vieja guardada en caché).
- [x] Un jugador no puede cambiar sus estadísticas desde el navegador.

## Archivos
`perfil-jugador.tsx`, `editar-nombre-form.tsx`, `cambiar-foto.tsx`, `avatar.tsx`, `acciones-perfil.ts`, `jugador.ts`; bucket `avatars`

## Fuera de alcance
Historial detallado de partidas, logros, perfiles públicos.

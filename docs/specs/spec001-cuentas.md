# Spec 001 · Cuentas

## Historia
Como jugador, quiero crear una cuenta e iniciar sesión para guardar mis estadísticas y jugar en línea.

## Comportamiento
1. En `/registro` escribe nombre, correo y contraseña. Al registrarse entra a `/jugar`.
2. En `/login` inicia sesión con correo y contraseña.
3. Si olvidó la contraseña: `/recuperar-contrasena` (correo) → `/codigo` (código de 6 dígitos) → `/nueva` (nueva contraseña) → `/jugar`.
4. Desde el header puede cerrar sesión.

## Criterios de aceptación
- [x] Con un nombre de menos de 3 o más de 15 caracteres se muestra un error y no se crea la cuenta.
- [x] Con una contraseña de menos de 6 caracteres se muestra un error.
- [x] Si hay un error, el formulario conserva el nombre y el correo escritos.
- [x] El campo de contraseña tiene un botón de ojo que la muestra y la oculta.
- [x] Sin sesión, entrar a `/jugar` o `/partida/...` redirige a `/login`.
- [x] Con sesión, entrar a `/login` o `/registro` redirige a `/jugar`.
- [x] Al pedir recuperación llega al correo un código de 6 dígitos (también a correos fuera del equipo).
- [x] El botón "Reenviar código" envía un código nuevo.
- [x] Con un código incorrecto se muestra un error; con el correcto se pasa a escribir la nueva contraseña.
- [x] Después de cerrar sesión, entrar a `/jugar` redirige a `/login`.

## Archivos
`registro-form.tsx`, `login-form.tsx`, `acciones-auth.ts`, `acciones-recuperar.ts`, `proxy.ts`, `header.tsx`

## Fuera de alcance
Inicio de sesión con Google, verificación en dos pasos.

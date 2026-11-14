# Despliegue y entornos · Duelo 64

## Entornos
| Entorno | Dónde | Para qué |
|---|---|---|
| Local | `http://localhost:3000` (`npm run dev`) | Desarrollo y pruebas |
| Preview | URL que Vercel crea por cada rama con push | Revisar cambios antes de unir |
| Producción | https://juegoduelo64.vercel.app | Versión pública (rama `master`) |

## Flujo
1. Rama propia → commits → `git push`.
2. Pull Request hacia `master` en GitHub.
3. Revisión y merge.
4. Vercel detecta el cambio en `master`, ejecuta `next build` y publica.

## Variables de entorno
| Variable | Dónde se configura |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` (local) y Vercel → Settings → Environment Variables |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Igual |

- `.env.local` está en `.gitignore`: nunca se sube.
- Las variables `NEXT_PUBLIC_` se incrustan al compilar: si cambian, hay que hacer **Redeploy**.
- No guardarlas como tipo *Secret* en Vercel: no se pueden editar (hay que borrarlas y crearlas de nuevo).

## Supabase
- El proyecto de Vercel está en la cuenta `sgabrielaca25-pixel` (equipo `sara-3f83`), conectado a `sgabrielaca25-pixel/nextjs-dashboard`, rama de producción `master`.
- Authentication → URL Configuration: Site URL = `https://juegoduelo64.vercel.app`; Redirect URLs = `https://juegoduelo64.vercel.app/**` y `http://localhost:3000/**`.
- SMTP propio (Gmail del juego, puerto 587, contraseña de aplicación) para el código de recuperación.
- Realtime activado en la tabla `salas` (`alter publication supabase_realtime add table public.salas;`).
- SQL en archivos numerados `1-perfiles.sql` … `10-fotos-sala.sql`, ejecutados en orden en el SQL Editor.

## Conectores del agente (MCP)
| Servicio | Cómo |
|---|---|
| GitHub | CLI oficial: `gh auth login` |
| Vercel | `claude mcp add --transport http vercel https://mcp.vercel.com` y luego `/mcp` → Authenticate |
| Supabase (U4) | `claude mcp add --transport http supabase https://mcp.supabase.com/mcp` (proyecto de desarrollo, mínimo permiso) |

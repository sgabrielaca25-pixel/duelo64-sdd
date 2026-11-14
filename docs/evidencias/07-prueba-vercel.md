# 07 · El agente consulta el despliegue en Vercel

Consulta real hecha por Claude Code con el conector MCP de Vercel el 2026-11-14, justo después de unir los PR #2 y #3. Horas en UTC (Colombia = UTC−5).

## Llamadas
1. `list_teams` → equipo **Sara** (`sara-3f83`).
2. `list_projects` (equipo) → proyecto **nextjs-dashboard** (`prj_dcuY4oJqzthBiSR01ia3Qu7XO1hU`).
3. `list_deployments` (target `production`, 3 últimos).
4. `list_project_domains` → dominios del proyecto.
5. `get_deployment("juegoduelo64.vercel.app")` → a qué despliegue apunta la URL pública.

## Resultado
| Despliegue | Commit en `master` | Estado | Creado (UTC) |
|---|---|---|---|
| `dpl_8YiX3RRgL5XJT6YArTSjBPxmbhzz` | `a4e04d4` Merge PR #3 (historial en el perfil) | **READY** | 19:00:27 |
| `dpl_6toQ1ejLoko5U8BkMYvY7S7aHKnX` | `d9c7197` Merge PR #2 (logo Opción A) | READY | 19:00:18 |
| `dpl_qN7krZk7S1gRkxbkvTmABerg4jTY` | `bdc6357` Header con la misma letra del logo | READY | (anterior) |

`get_deployment("juegoduelo64.vercel.app")`:
- `id`: `dpl_8YiX3RRgL5XJT6YArTSjBPxmbhzz`, `target`: `production`, `readyState`: **READY**, `aliasError`: null
- Build: empezó 19:00:44 y quedó listo 19:01:07 (≈23 s), región `iad1`, framework `nextjs`
- Alias: `juegoduelo64.vercel.app`, `nextjs-dashboard-sara-3f83.vercel.app`, `nextjs-dashboard-git-master-sara-3f83.vercel.app` y `nextjs-dashboard-ten-beta-9x0rscjmt5.vercel.app` (este último redirige con 307 a `juegoduelo64.vercel.app`)

**Conclusión:** producción quedó en **Ready** con el último commit de `master` (`a4e04d4`, PR #3) y la URL pública es **https://juegoduelo64.vercel.app** (dominio verificado).

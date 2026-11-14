# 05 · GitHub conectado (`gh auth status`)

Salida real del 2026-11-14 en la máquina de desarrollo (Windows 11, `gh version 2.104.0`). El token se reemplazó por `(oculto)`.

```text
$ gh auth status
github.com
  ✓ Logged in to github.com account sgabrielaca25-pixel (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token: (oculto)
  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'
```

Con esta sesión el agente unió los PR #2 y #3 de `nextjs-dashboard` (`gh pr merge --merge`) y subió este repositorio.

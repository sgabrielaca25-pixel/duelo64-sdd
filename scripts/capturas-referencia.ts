// Capturas de referencia de Duelo 64 (docs/diseno/referencias/).
//
// Requisitos:
//   1. El juego (repo nextjs-dashboard) corriendo con `npm run dev`.
//   2. La ruta TEMPORAL app/referencia-tmp/[pantalla] en el juego, que muestra
//      los componentes reales de app/ui con datos de ejemplo (David azul,
//      Camila roja). Copia la carpeta scripts/referencia-tmp/ de este repo a
//      app/referencia-tmp/ del juego, captura y BÓRRALA al terminar
//      (git status del juego debe quedar limpio).
//
// Uso (desde la raíz de duelo64-sdd, sin instalar nada en los repos):
//   npx -y playwright@1.56.1 install chromium
//   npx -y -p playwright@1.56.1 -p tsx tsx scripts/capturas-referencia.ts [URL]
// URL por defecto: http://localhost:3000
// Nota: 02 (login con error) intenta entrar con un correo inexistente
// (david@ejemplo.test) para mostrar el error real de Supabase.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { Browser, Page } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const SALIDA = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "diseno", "referencias");

// npx deja playwright fuera del proyecto: se busca también en NODE_PATH/PATH.
function cargarPlaywright(): typeof import("playwright") {
  const rutas = [process.cwd(), ...(process.env.NODE_PATH ?? "").split(/[;:](?!\\)/)];
  for (const p of (process.env.PATH ?? "").split(process.platform === "win32" ? ";" : ":")) {
    if (p.includes("_npx")) rutas.push(join(p, ".."));
  }
  const require = createRequire(import.meta.url);
  for (const r of rutas.filter(Boolean)) {
    try {
      return require(require.resolve("playwright", { paths: [r] }));
    } catch {}
  }
  return require("playwright");
}

type Pantalla = {
  archivo: string; // NN-nombre (sin -movil/-escritorio)
  titulo: string;
  ruta: string;
  antes?: (page: Page) => Promise<void>; // acciones antes de capturar
  cookie?: { name: string; value: string };
};

const PANTALLAS: Pantalla[] = [
  { archivo: "01-login", titulo: "Login", ruta: "/login" },
  {
    archivo: "02-login-error",
    titulo: "Login con error",
    ruta: "/login",
    antes: async (page) => {
      await page.fill('input[name="email"]', "david@ejemplo.test");
      await page.fill('input[name="password"]', "clave123");
      await page.locator('button[type="submit"]').click();
      // Ojo: Next tiene su propio role="alert" (anunciador de rutas); se
      // espera el aviso DENTRO del formulario y que el botón deje de cargar.
      await page.locator('form [role="alert"]').first().waitFor({ timeout: 20_000 });
      await page.waitForFunction(() => !document.body.innerText.includes("Entrando"), null, { timeout: 20_000 });
    },
  },
  { archivo: "03-registro", titulo: "Registro", ruta: "/registro" },
  { archivo: "04-menu-jugar", titulo: "Menú /jugar", ruta: "/referencia-tmp/menu" },
  { archivo: "05-perfil", titulo: "Perfil", ruta: "/referencia-tmp/perfil" },
  { archivo: "06-sala-privada", titulo: "Sala privada", ruta: "/referencia-tmp/sala-privada" },
  { archivo: "07-partida-rapida-buscando", titulo: "Partida rápida", ruta: "/referencia-tmp/partida-rapida" },
  { archivo: "08-partida-eligiendo", titulo: "Eligiendo", ruta: "/referencia-tmp/eligiendo" },
  { archivo: "09-partida-buscando-vista-buscador", titulo: "Buscando · quien busca", ruta: "/referencia-tmp/vista-buscador" },
  { archivo: "10-partida-buscando-vista-activo", titulo: "Buscando · activo", ruta: "/referencia-tmp/vista-activo" },
  { archivo: "11-rival-desconectado", titulo: "Rival desconectado", ruta: "/referencia-tmp/desconectado" },
  { archivo: "12-confirmar-abandono", titulo: "Confirmar abandono", ruta: "/referencia-tmp/abandono" },
  { archivo: "13-resultado-victoria", titulo: "Victoria", ruta: "/referencia-tmp/victoria" },
  { archivo: "14-resultado-derrota", titulo: "Derrota", ruta: "/referencia-tmp/derrota" },
  { archivo: "15-recuperar-contrasena-1-correo", titulo: "Recuperar · correo", ruta: "/recuperar-contrasena" },
  {
    archivo: "15-recuperar-contrasena-2-codigo",
    titulo: "Recuperar · código",
    ruta: "/recuperar-contrasena/codigo",
    cookie: { name: "recuperar-email", value: "david@ejemplo.test" },
  },
  { archivo: "15-recuperar-contrasena-3-nueva", titulo: "Recuperar · nueva", ruta: "/referencia-tmp/nueva-contrasena" },
];

const TAMANOS = [
  { sufijo: "movil", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { sufijo: "escritorio", viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
] as const;

// Oculta el indicador de Next en desarrollo y deja quietas las animaciones
// (el destello rojo del número errado queda a la mitad para que se vea).
const ESTILO_CAPTURA = `
  nextjs-portal { display: none !important; }
  .anim-sacudir { animation: none !important; }
  .anim-destello-err { animation-delay: -0.15s !important; animation-play-state: paused !important; }
  .anim-pulso, .anim-punto, .anim-flotar { animation-play-state: paused !important; }
`;

async function capturar(browser: Browser) {
  const hechas: Record<string, { titulo: string; archivo: string }[]> = { movil: [], escritorio: [] };
  for (const t of TAMANOS) {
    for (const p of PANTALLAS) {
      const contexto = await browser.newContext({
        viewport: t.viewport,
        deviceScaleFactor: t.deviceScaleFactor,
        isMobile: t.isMobile,
        hasTouch: t.hasTouch,
        colorScheme: "light",
        locale: "es-CO",
      });
      if (p.cookie) await contexto.addCookies([{ ...p.cookie, url: BASE }]);
      const page = await contexto.newPage();
      // Las pantallas con datos de ejemplo no deben hablar con Supabase.
      if (p.ruta.startsWith("/referencia-tmp")) {
        await page.route(/supabase\.co/, (r) => r.abort());
      }
      await page.goto(BASE + p.ruta, { waitUntil: "load" });
      await page.waitForTimeout(1200);
      if (p.antes) await p.antes(page);
      await page.addStyleTag({ content: ESTILO_CAPTURA });
      await page.waitForTimeout(800);
      const archivo = `${p.archivo}-${t.sufijo}.png`;
      await page.screenshot({ path: join(SALIDA, archivo), fullPage: true });
      hechas[t.sufijo].push({ titulo: p.titulo, archivo });
      console.log("✓", archivo);
      await contexto.close();
    }
  }
  return hechas;
}

// Mapa: todas las capturas de un tamaño en una cuadrícula con su nombre.
async function mapa(browser: Browser, items: { titulo: string; archivo: string }[], movil: boolean, salida: string) {
  const columnas = movil ? 6 : 4;
  const ancho = movil ? 300 : 460;
  const tarjetas = items
    .map(({ titulo, archivo }) => {
      const datos = readFileSync(join(SALIDA, archivo)).toString("base64");
      return `<figure><img src="data:image/png;base64,${datos}"><figcaption><b>${archivo.slice(0, 2)}</b> ${titulo}</figcaption></figure>`;
    })
    .join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    body { margin: 0; padding: 40px; background: #E9F2FE; font-family: Arial, Helvetica, sans-serif; }
    h1 { margin: 0 0 6px; font-size: 32px; } p { margin: 0 0 28px; color: #505961; font-size: 16px; }
    main { display: grid; grid-template-columns: repeat(${columnas}, ${ancho}px); gap: 28px; align-items: start; }
    figure { margin: 0; background: #FDFEFF; border-radius: 24px; padding: 12px; box-shadow: 0 10px 25px rgba(56,152,236,.15); }
    img { width: 100%; display: block; border-radius: 14px; border: 1px solid #DDE7F5; }
    figcaption { margin-top: 10px; font-size: 15px; color: #000; } b { color: #0061A2; }
  </style></head><body>
    <h1>Duelo 64 · Mapa de pantallas (${movil ? "móvil 390×844" : "escritorio 1366×768"})</h1>
    <p>Login → Menú → Sala privada o Partida rápida → Partida → Resultado. David es el jugador 1 (azul) y Camila el jugador 2 (rojo).</p>
    <main>${tarjetas}</main></body></html>`;
  const contexto = await browser.newContext({ viewport: { width: 1200, height: 800 }, colorScheme: "light" });
  const page = await contexto.newPage();
  await page.setContent(html, { waitUntil: "load" });
  const anchoTotal = 80 + columnas * ancho + (columnas - 1) * 28;
  await page.setViewportSize({ width: anchoTotal, height: 800 });
  await page.screenshot({ path: join(SALIDA, salida), fullPage: true });
  console.log("✓", salida);
  await contexto.close();
}

async function main() {
  const { chromium } = cargarPlaywright();
  const browser = await chromium.launch();
  try {
    const hechas = await capturar(browser);
    await mapa(browser, hechas.movil, true, "00-mapa-de-pantallas.png");
    await mapa(browser, hechas.escritorio, false, "00-mapa-de-pantallas-escritorio.png");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

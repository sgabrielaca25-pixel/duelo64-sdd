// TEMPORAL (capturas de referencia del SDD). Se borra al terminar.
// Renderiza los componentes reales de app/ui con datos de ejemplo.
import Header from "@/app/ui/header";
import JugarMenu from "@/app/ui/jugar-menu";
import NuevaContrasenaForm from "@/app/ui/nueva-contrasena-form";
import PerfilJugador from "@/app/ui/perfil-jugador";
import type { PartidaHistorial } from "@/app/lib/historial";
import Escenas from "./escenas";

const tarjeta =
  "w-full rounded-[2rem] bg-[#FDFEFF] p-6 shadow-xl sm:rounded-[3rem] sm:p-10 lg:min-h-[55vh] medio:p-5 bajo:rounded-[2rem] bajo:p-4";

// Historial de ejemplo de David (spec006): ya viene con "Tú" primero.
const historialDemo: PartidaHistorial[] = [
  { id: 8, fecha: "14 nov 2026", rival: "Camila", resultado: "victoria", misCasillas: 64, casillasRival: 41 },
  { id: 7, fecha: "14 nov 2026", rival: "Camila", resultado: "derrota", misCasillas: 37, casillasRival: 64 },
  { id: 6, fecha: "13 nov 2026", rival: "Andrés", resultado: "empate", misCasillas: 32, casillasRival: 32 },
  { id: 5, fecha: "12 nov 2026", rival: "Valentina", resultado: "victoria", misCasillas: 64, casillasRival: 28 },
  { id: 4, fecha: "11 nov 2026", rival: "Mateo", resultado: "victoria", misCasillas: 45, casillasRival: 19 },
  { id: 3, fecha: "10 nov 2026", rival: "Camila", resultado: "derrota", misCasillas: 22, casillasRival: 64 },
];

// Copia de app/jugar/layout.tsx con David como jugador.
function LayoutJugar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#E9F2FE]">
      <Header nombre="David" foto={null} />
      <main className="flex flex-1 items-center justify-center py-6 medio:py-3 bajo:py-2">
        <div className="mx-4 flex w-full min-w-0 max-w-xl flex-col items-center gap-6 medio:gap-3 bajo:max-w-3xl bajo:gap-2">
          {children}
        </div>
      </main>
    </div>
  );
}

export default async function Referencia({ params }: { params: Promise<{ pantalla: string }> }) {
  const { pantalla } = await params;

  if (pantalla === "menu") {
    return (
      <LayoutJugar>
        <header className="flex flex-col items-center gap-2 medio:gap-1 bajo:hidden">
          <div className="flex cursor-default items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#0061A2] shadow-md">
            BIENVENIDO A DUELO 64
          </div>
          <h1 className="text-center text-4xl font-bold text-black sm:text-5xl medio:text-3xl">¡Hola, David!</h1>
          <p className="text-center text-lg text-[#505961] medio:hidden">
            El cielo está despejado y listo para un duelo táctico 1v1.
          </p>
        </header>
        <div className={tarjeta}>
          <JugarMenu nombre="David" foto={null} />
        </div>
      </LayoutJugar>
    );
  }

  if (pantalla === "perfil" || pantalla === "perfil-vacio") {
    const vacio = pantalla === "perfil-vacio";
    return (
      <LayoutJugar>
        <div className={tarjeta}>
          <PerfilJugador
            perfil={{ id: "demo", nombre: "David", jugadas: vacio ? 0 : 24, ganadas: vacio ? 0 : 15, perdidas: vacio ? 0 : 8, foto: null }}
            historial={vacio ? [] : historialDemo}
          />
        </div>
      </LayoutJugar>
    );
  }

  if (pantalla === "sala-privada" || pantalla === "partida-rapida") {
    return (
      <LayoutJugar>
        <div className={tarjeta}>
          <Escenas pantalla={pantalla} />
        </div>
      </LayoutJugar>
    );
  }

  if (pantalla === "nueva-contrasena") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#E9F2FE]">
        <NuevaContrasenaForm />
      </main>
    );
  }

  return <Escenas pantalla={pantalla} />;
}

// TEMPORAL (capturas de referencia del SDD). Se borra al terminar.
// Renderiza los componentes reales de app/ui con datos de ejemplo.
import Header from "@/app/ui/header";
import JugarMenu from "@/app/ui/jugar-menu";
import NuevaContrasenaForm from "@/app/ui/nueva-contrasena-form";
import PerfilJugador from "@/app/ui/perfil-jugador";
import Escenas from "./escenas";

const tarjeta =
  "w-full rounded-[2rem] bg-[#FDFEFF] p-6 shadow-xl sm:rounded-[3rem] sm:p-10 lg:min-h-[55vh] medio:p-5 bajo:rounded-[2rem] bajo:p-4";

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

  if (pantalla === "perfil") {
    return (
      <LayoutJugar>
        <div className={tarjeta}>
          <PerfilJugador perfil={{ id: "demo", nombre: "David", jugadas: 24, ganadas: 15, perdidas: 8, foto: null }} />
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

"use client";
// TEMPORAL (capturas de referencia del SDD). Se borra al terminar.
import { aplicarJugada, crearPartida, type EstadoPartida, type Jugador } from "@/app/lib/juego";
import { formatearTiempo } from "@/app/lib/partida-store";
import BarraTurno from "@/app/ui/barra-turno";
import ConfirmarRendirse from "@/app/ui/confirmar-rendirse";
import EscenaPartida, { type Foco } from "@/app/ui/escena-partida";
import EstadoTurno from "@/app/ui/estado-turno";
import HeaderPartida from "@/app/ui/header-partida";
import NubeNumeros from "@/app/ui/nube-numeros";
import PuntosEspera from "@/app/ui/puntos-espera";
import ResultadoPartida from "@/app/ui/resultado-partida";
import TableroJugador from "@/app/ui/tablero-jugador";
import SalaEspera from "@/app/ui/sala-espera";

const T0 = 1_700_000_000_000;
const nada = () => {};

// Partida a mitad de camino: varias rondas jugadas con las reglas reales.
function partidaBase(): { estado: EstadoPartida; t: number } {
  let e: EstadoPartida = { ...crearPartida({ nombres: ["David", "Camila"], ahora: T0, semilla: 64 }), activo: 0 };
  let t = T0;
  const marcas: Record<Jugador, number[]> = { 0: [], 1: [] };
  const casillasPorRonda = [6, 5, 7, 6, 5, 6, 4, 5];
  for (let r = 0; r < casillasPorRonda.length; r++) {
    const activo = e.activo;
    const numero = e.nube.find((n) => !(n in (e.usados ?? {})) && n % 3 === r % 3)!;
    t += 4_000;
    e = aplicarJugada(e, { tipo: "elegir", jugador: activo, numero, ahora: t });
    for (let k = 0; k < casillasPorRonda[r]; k++) {
      const casilla = (marcas[activo].length * 7 + activo * 3) % 64;
      marcas[activo].push(casilla);
      t += 600;
      e = aplicarJugada(e, { tipo: "marcar", jugador: activo, casilla, ahora: t });
    }
    t += 1_000;
    e = aplicarJugada(e, { tipo: "encontrar", jugador: activo === 0 ? 1 : 0, numero, ahora: t });
  }
  return { estado: e, t };
}

function IconoSinConexion() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h.01" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
      <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
      <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
      <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

// Misma composición que app/ui/partida-online.tsx (partida en curso).
function Escena({
  estado,
  soy,
  ahora,
  errado,
  desconectado,
  confirmando,
}: {
  estado: EstadoPartida;
  soy: Jugador;
  ahora: number;
  errado?: number;
  desconectado?: number;
  confirmando?: boolean;
}) {
  const otro: Jugador = soy === 0 ? 1 : 0;
  const soyActivo = estado.activo === soy;
  const ocultarNube = soyActivo && estado.fase === "buscando";
  const puedoMarcar = soyActivo && estado.fase === "buscando";
  const tocable = (estado.fase === "eligiendo" && soyActivo) || (estado.fase === "buscando" && !soyActivo);
  const foco: Foco = puedoMarcar ? soy : "nube";
  const tablero = (j: Jugador) => (
    <TableroJugador
      nombre={j === soy ? `${estado.nombres[j]} (tú)` : estado.nombres[j]}
      encontrados={estado.marcadas[j]}
      casillas={estado.tableros[j]}
      ultima={estado.ultima[j]}
      color={j === 0 ? "azul" : "rojo"}
      activo={estado.fase === "buscando" && estado.activo === j}
      onMarcar={j === soy && puedoMarcar ? nada : undefined}
    />
  );

  return (
    <EscenaPartida
      estado={estado}
      soy={soy}
      foco={foco}
      header={
        <HeaderPartida
          jugador={estado.nombres[0]}
          rival={estado.nombres[1]}
          tiempo={formatearTiempo(ahora - estado.inicio, true)}
          onRendirse={nada}
        />
      }
      aviso={
        desconectado !== undefined && (
          <p
            role="alert"
            className="anim-aparecer mx-auto flex shrink-0 items-center gap-2 rounded-[1.25rem] border border-[#F8C9D1] bg-[#FDECEF] px-4 py-1.5 text-center text-xs font-semibold text-[#B3261E] shadow-sm sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <IconoSinConexion />
            {`${estado.nombres[otro]} se desconectó. Si no vuelve en ${desconectado} s, ganas la partida`}
            <PuntosEspera color="bg-[#E5536B]" />
          </p>
        )
      }
      turno={<EstadoTurno estado={estado} ahora={ahora} />}
      nube={
        <div className="relative">
          <NubeNumeros
            orden={estado.nube}
            usados={estado.usados}
            errado={errado}
            onSeleccionar={ocultarNube || !tocable ? undefined : nada}
          />
          {ocultarNube && (
            <div className="absolute inset-x-0 top-8 bottom-0 mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 rounded-[4rem] bg-white px-6 text-center bajo:top-4">
              <span className="text-xl font-bold text-[#0061A2] sm:text-2xl">¡Marca casillas rápido!</span>
              <span className="text-sm text-[#505961]">{estado.nombres[otro]} está buscando tu número en la nube.</span>
            </div>
          )}
        </div>
      }
      tableros={[tablero(0), tablero(1)]}
      barra={<BarraTurno estado={estado} soy={soy} />}
    >
      {confirmando && (
        <ConfirmarRendirse
          titulo="¿Quieres rendirte?"
          texto={`${estado.nombres[otro]} ganará la partida y contará como derrota en tus estadísticas.`}
          opciones={[{ texto: "Sí, rendirme", color: "rojo", alElegir: nada }]}
          alCancelar={nada}
        />
      )}
    </EscenaPartida>
  );
}

// Misma composición que el final de app/ui/partida-online.tsx.
function Resultado({ victoria }: { victoria: boolean }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#E9F2FE] px-4 py-6">
      <div className="w-full max-w-xl rounded-[3rem] bg-[#FDFEFF] p-6 shadow-xl sm:p-10">
        <ResultadoPartida
          resultado={victoria ? "victoria" : "derrota"}
          jugador="David"
          rival="Camila"
          casillasJugador={victoria ? 64 : 47}
          casillasRival={victoria ? 52 : 64}
          tiempo={victoria ? "03:42" : "04:15"}
          alRevancha={nada}
        />
      </div>
    </div>
  );
}

export default function Escenas({ pantalla }: { pantalla: string }) {
  if (pantalla === "sala-privada" || pantalla === "partida-rapida") {
    const publica = pantalla === "partida-rapida";
    return <SalaEspera codigo={publica ? "QWERTY" : "K7M4PZ"} nombre1="David" nombre2={null} soy={1} publica={publica} />;
  }
  if (pantalla === "victoria") return <Resultado victoria />;
  if (pantalla === "derrota") return <Resultado victoria={false} />;

  const { estado, t } = partidaBase(); // activo: David, fase eligiendo
  const eligiendo = { ...estado, inicioTurno: t };

  // David elige y Camila busca (David marca casillas).
  const objetivoDavid = estado.nube.find((n) => !(n in (estado.usados ?? {})))!;
  let davidMarca = aplicarJugada(eligiendo, { tipo: "elegir", jugador: 0, numero: objetivoDavid, ahora: t + 3_000 });
  for (const casilla of [40, 41, 49]) {
    davidMarca = aplicarJugada(davidMarca, { tipo: "marcar", jugador: 0, casilla, ahora: t + 4_000 });
  }

  // Camila elige y David busca.
  const camilaElige = { ...eligiendo, activo: 1 as Jugador };
  const objetivoCamila = estado.nube.filter((n) => !(n in (estado.usados ?? {})))[5];
  const camilaMarca = aplicarJugada(camilaElige, { tipo: "elegir", jugador: 1, numero: objetivoCamila, ahora: t + 3_000 });
  const errado = estado.nube.filter((n) => !(n in (estado.usados ?? {})) && n !== objetivoCamila)[9];

  switch (pantalla) {
    case "eligiendo":
      return <Escena estado={eligiendo} soy={0} ahora={t + 6_000} />;
    case "vista-buscador":
      return <Escena estado={camilaMarca} soy={0} ahora={t + 7_400} errado={errado} />;
    case "vista-activo":
      return <Escena estado={davidMarca} soy={0} ahora={t + 7_400} />;
    case "desconectado":
      return <Escena estado={eligiendo} soy={0} ahora={t + 6_000} desconectado={9} />;
    case "abandono":
      return <Escena estado={eligiendo} soy={0} ahora={t + 6_000} confirmando />;
  }
  return <p>Pantalla desconocida</p>;
}

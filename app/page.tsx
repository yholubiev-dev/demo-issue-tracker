import Board from "@/components/Board";
import Embers from "@/components/Embers";

export default function Home() {
  return (
    <div className="hb-scene">
      <div className="hb-vignette" aria-hidden="true" />
      <div className="hb-glow" aria-hidden="true" />
      <Embers />
      <main className="app">
        <header className="hb-header">
          <div className="hb-eyebrow">Abandon all hope</div>
          <h1 className="hb-title">TORMENTS</h1>
          <div className="hb-divider" />
        </header>
        <Board />
      </main>
    </div>
  );
}

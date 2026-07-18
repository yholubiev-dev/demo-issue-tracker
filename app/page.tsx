import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="app">
      <div className="masthead">
        <div className="masthead-eyebrow">Established MMXXVI · No. XI</div>
        <h1>The Register of Issues</h1>
        <div className="masthead-subtitle">
          A faithful ledger of matters outstanding &amp; matters resolved
        </div>
      </div>
      <div className="divider" />

      <Board />

      <div className="colophon">～ Recorded in good faith by the Keeper of the Board ～</div>
    </main>
  );
}

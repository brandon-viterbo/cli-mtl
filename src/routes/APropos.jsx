function APropos() {
  return (
    <>
      <header>
        <h1>À Propos</h1>
      </header>
      <main>
        <div className="word-container">
          <p>
            Une carte interactif qui montre les lieux publics climatisés à
            Montréal. Cette carte est utile pour les gens qui ont pas leur propre
            climatisation (comme le developpeur derrière celui-ci!).
          </p>
          <p>
            Elle utilise des{" "}
            <a href="https://donnees.montreal.ca/dataset/lieux-publics-climatises">
              données ouverte
            </a>{" "}
            disponible grace à la ville de Montréal.
            <a href="https://www.flaticon.com/free-icons/red" title="red icons">
              Marqueurs
            </a>{" "}
            <a href="https://www.flaticon.com/free-icons/1" title="1 icons">
              sur
            </a>{" "}
            la carte par hqrloveq - Flaticon.
          </p>
        </div>
      </main>
    </>
  );
}

export default APropos;

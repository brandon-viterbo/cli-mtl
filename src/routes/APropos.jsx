function APropos() {
  return (
    <>
      <header>
        <h1>À Propos</h1>
      </header>
      <main>
        <div className="word-container">
          <p>
            Une carte interactive qui montre les lieux publics climatisés à
            Montréal. Cette carte est utile pour les gens qui n'ont pas leur
            propre climatisation (comme le développeur derrière celui-ci!).
          </p>
          <p>
            Face à la crise climatique, c'est important que telles informations
            soit faciles à trouver.{" "}
            <a href="https://www.inspq.qc.ca/changements-climatiques/menaces/chaleur/mesures-populationnelles">
              Selon l'INSPQ
            </a>
            , les lieux publics climatisés sont une mesure de protection contre
            la chaleur. En plus, les applications cartographiques sont utiles
            pour visualiser « les facteurs de protection ou de vulnérabilité
            pouvant influencer les effets de la chaleur sur la santé humaine. »
          </p>
          <p>
            Elle utilise des{" "}
            <a href="https://donnees.montreal.ca/dataset/lieux-publics-climatises">
              données ouvertes
            </a>{" "}
            disponibles grâce à la ville de Montréal. La carte elle-même est
            fait avec <a href="https://openlayers.org/">OpenLayers.</a>
            <a href="https://www.flaticon.com/free-icons/red" title="red icons">
              Marqueurs
            </a>{" "}
            <a href="https://www.flaticon.com/free-icons/1" title="1 icons">
              sur
            </a>{" "}
            la carte par hqrloveq à Flaticon.
          </p>
        </div>
      </main>
    </>
  );
}

export default APropos;

import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Map from "../components/Map/Map";
import CheckboxFilter from "../components/CheckboxFilter/CheckboxFilter";
import { removeWhiteSpace } from "../scripts/utils";

function Filters({ setAccessFilters, setNeighbourhoodFilters }) {
  const context = useOutletContext();

  const accessibilityFeaturesList = [...context.accessibilityFeatures].map(
    (element) => (
      <CheckboxFilter
        key={removeWhiteSpace(element)}
        item={element}
        setFilter={setAccessFilters}
      />
    ),
  );
  const neighbourhoodsList = [...context.neighbourhoods].map((element) => (
    <CheckboxFilter
      key={removeWhiteSpace(element)}
      item={element}
      setFilter={setNeighbourhoodFilters}
    />
  ));

  return (
    <form>
      <h2>Filtres</h2>
      <div className="center_with_flex">
        <fieldset>
          <legend>Accessibilité</legend>
          <div>{accessibilityFeaturesList}</div>
        </fieldset>
        <fieldset>
          <legend>Arrondissement</legend>
          <div>{neighbourhoodsList}</div>
        </fieldset>
      </div>
    </form>
  );
}

function LaCarte() {
  const [accessFilters, setAccessFilters] = useState(new Set());
  const [neighbourhoodFilters, setNeighbourhoodFilters] = useState(new Set());

  return (
    <>
      <header>
        <h1>Les Lieux Publics Climatisés à Montréal</h1>
      </header>
      <main>
        <Map
          accessFilters={accessFilters}
          neighbourhoodFilters={neighbourhoodFilters} />
        <Filters
          setAccessFilters={setAccessFilters}
          setNeighbourhoodFilters={setNeighbourhoodFilters}
        />
      </main>
    </>
  );
}

export default LaCarte;

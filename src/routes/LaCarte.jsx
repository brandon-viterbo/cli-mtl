import { useOutletContext } from "react-router-dom";
import Map from "../components/Map/Map";
import CheckboxSelect from "../components/CheckboxSelect/CheckboxSelect";

function Filters() {
  const context = useOutletContext();

  const accessibilityFeaturesList = [...context.accessibilityFeatures].map(
    (element) => <CheckboxSelect item={element} />
  );
  const neighbourhoodsList = [...context.neighbourhoods].map((element) => (
    <CheckboxSelect item={element} />
  ));

  return (
    <form>
      <h3>Filtres</h3>
      <div style={{ display: "flex" }}>
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
  return (
    <>
      <h2>Les Lieux Publics Climatisés à Montréal</h2>
      <Map />
      <Filters />
    </>
  );
}

export default LaCarte;

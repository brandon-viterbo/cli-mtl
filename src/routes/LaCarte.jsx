import { useOutletContext } from "react-router-dom";
import Map from "../components/Map/Map";

function Filters() {
  const context = useOutletContext();

  console.log(context.neighbourhoods);

  const accessibilityFeaturesList = [...context.accessibilityFeatures].map(
    (element) => <li key={crypto.randomUUID()}>{element}</li>,
  );
  const neighbourhoodsList = [...context.neighbourhoods].map((element) => (
    <li key={crypto.randomUUID()}>{element}</li>
  ));

  return (
    <div style={{ display: "flex" }}>
      <ul>{accessibilityFeaturesList}</ul>
      <ul>{neighbourhoodsList}</ul>
    </div>
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

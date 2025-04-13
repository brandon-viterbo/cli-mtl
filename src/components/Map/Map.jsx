import { useOutletContext } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <>
      <h3>{place.nom}</h3>
      <ul>
        <li>
          Adresse: {place.adresse_principale}, {place.ville}
        </li>
        <li>Arrondissement: {place.arrdondissement}</li>
        <li>Téléphone: {place.telephone}</li>
        <li>Accessibilité: {place.accessibilite}</li>
        <li>Lat: {place.lat}</li>
        <li>Long: {place.long}</li>
      </ul>
    </>
  );
}

function Map({ accessFilters, neighbourhoodFilters }) {
  const context = useOutletContext();
  let filterFunc;

  if (accessFilters.size === 0 && neighbourhoodFilters.size === 0) {
    filterFunc = (place) => true;
  } else if (accessFilters.size !== 0 && neighbourhoodFilters.size === 0) {
    filterFunc = (place) => accessFilters.has(place.properties.accessibilite);
  } else if (accessFilters.size === 0 && neighbourhoodFilters.size !== 0) {
    filterFunc = (place) =>
      neighbourhoodFilters.has(place.properties.arrdondissement);
  } else if (accessFilters.size !== 0 && neighbourhoodFilters.size !== 0) {
    filterFunc = (place) =>
      accessFilters.has(place.properties.accessibilite) &&
      neighbourhoodFilters.has(place.properties.arrdondissement);
  }

  const placeList = context.places.filter(filterFunc).map((place) => (
    <li key={place.id}>
      <PlaceCard place={place.properties} />
    </li>
  ));

  console.log(accessFilters.size === 0);
  console.log(neighbourhoodFilters.size === 0);

  return <ul>{placeList}</ul>;
}

export default Map;

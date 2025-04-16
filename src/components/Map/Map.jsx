import { useOutletContext } from "react-router-dom";
import styles from "./Map.module.css";

function PlaceCard({ place }) {
  return (
    <>
      <div className={styles.places_list__card}>
        <h3>{place.nom}</h3>
        <ul>
          <li>
            <span>Adresse: </span>{place.adresse_principale}, {place.ville}
          </li>
          <li><span>Arrondissement: </span>{place.arrdondissement}</li>
          <li><span>Téléphone: </span>{place.telephone}</li>
          <li><span>Accessibilité: </span>{place.accessibilite}</li>
          <li><span>Lat: </span>{place.lat}</li>
          <li><span>Long: </span>{place.long}</li>
        </ul>
      </div>
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

  return(
  <div className={styles.places_list}>
    <ul>{placeList}</ul>
  </div>);
}

export default Map;

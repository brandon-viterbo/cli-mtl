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

function Map() {
  const context = useOutletContext();

  const placeList = context.places.map((place) => (
    <li key={place.id}>
      <PlaceCard place={place.properties} />
    </li>
  ));

  return <ul>{placeList}</ul>;
}

export default Map;

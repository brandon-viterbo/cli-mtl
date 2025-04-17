import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Map.module.css";
import { Map as OlMap, Overlay } from "ol";
import { View } from "ol";
import { toLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { Feature } from "ol";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

function PlaceCard({ place }) {
  return (
    <>
      <div className={styles.places_list__card}>
        <h3>{place.nom}</h3>
        <ul>
          <li>
            <span>Adresse: </span>
            {place.adresse_principale}, {place.ville}
          </li>
          <li>
            <span>Arrondissement: </span>
            {place.arrdondissement}
          </li>
          <li>
            <span>Téléphone: </span>
            {place.telephone}
          </li>
          <li>
            <span>Accessibilité: </span>
            {place.accessibilite}
          </li>
          <li>
            <span>Lat: </span>
            {place.lat}
          </li>
          <li>
            <span>Long: </span>
            {place.long}
          </li>
        </ul>
      </div>
    </>
  );
}

function Map({ accessFilters, neighbourhoodFilters }) {
  const context = useOutletContext();
  const mapRef = useRef();
  const [showPlacesList, setShowPlacesList] = useState(true);

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

  const osm = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  });

  const iconFeature = new Feature({
    geometry: new Point([-73.619499, 45.520019]),
    name: "Aréna d'Outremont",
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "https://openlayers.org/en/latest/examples/data/icon.png",
    }),
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current,
      layers: [osm, vectorLayer],
      view: new View({
        center: [-73.619499, 45.520019],
        zoom: 3,
      }),
    });

    return () => map.setTarget(null);
  }, []);

  return (
    <>
      <div ref={mapRef} className={styles.map}>
        <div className={showPlacesList ? styles.places_list : "hide"}>
          <ul>{placeList}</ul>
        </div>
        <button onClick={() => setShowPlacesList((prev) => !prev)}>
          Montrer la liste
        </button>
      </div>
      <p>
        ©{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank">
          OpenStreetMap
        </a>{" "}
        contributors.
      </p>
    </>
  );
}

export default Map;

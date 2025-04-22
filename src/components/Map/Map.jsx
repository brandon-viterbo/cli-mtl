import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Map.module.css";
import { Map as OlMap, Overlay } from "ol";
import { View } from "ol";
import { fromLonLat, transform, transformExtent } from "ol/proj";
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
  const listRef = useRef(null);

  function toggleVisibility() {
    if (listRef.current.style.display === "none") {
      listRef.current.style.display = "block";
    } else {
      listRef.current.style.display = "none"
    }
  }

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

  const placesArr = context.places.filter(filterFunc);
  const placesListItems = placesArr.map((place) => (
    <li key={place.id}>
      <PlaceCard place={place.properties} />
    </li>
  ));

  const osm = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "https://openlayers.org/en/latest/examples/data/icon.png",
    }),
  }); 

  const iconFeatures = placesArr.map((place) => {
    const result = new Feature({
      geometry: new Point(
        transform(
          [place.properties.long, place.properties.lat],
          "EPSG:4326",
          "EPSG:3857",
        )
      ),
      name: place.properties.nom,
      id: place.id,
    });

    result.setStyle(iconStyle);

    return result;
  });

  const vectorSource = new VectorSource({
    features: iconFeatures,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current,
      layers: [osm, vectorLayer],
      view: new View({
        center: fromLonLat([-73.8067895764, 45.5494342941]),
        zoom: 0,
        minZoom: 0,
        maxZoom: 17,
        extent: transformExtent(
          [-74.62539719128334, 45.32722229453976, -72.98818196154667, 45.77164629360345],
          'EPSG:4326', 
          'EPSG:3857'
        )
      }),
    });

    return () => map.setTarget(null);
  }, [vectorLayer]);

  return (
    <>
      <div ref={mapRef} className={styles.map}>
        <div ref={listRef} className={styles.places_list}>
          <ul>{placesListItems}</ul>
        </div>
        <button onClick={() => toggleVisibility()}>
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

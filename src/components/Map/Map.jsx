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
import defaultMarker from "../../resources/images/default-map-marker.png";
import selectedMarker from "../../resources/images/selected-map-marker.png";

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
        </ul>
      </div>
    </>
  );
}

function Map({ accessFilters, neighbourhoodFilters }) {
  const context = useOutletContext();
  const mapRef = useRef();
  const listContainerRef = useRef(null);
  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const selectedPlaceRef = useRef(null);

  function toggleVisibility() {
    if (listContainerRef.current.style.display === "none") {
      listContainerRef.current.style.display = "block";
      buttonRef.current.style.display = "none";
    } else {
      listContainerRef.current.style.display = "none";
      buttonRef.current.style.display = "block";
    }
  }

  function getClassName(id) {
    return `c${id}`;
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
    <li
      key={place.id}
      className={getClassName(place.id)}
      onClick={() => handleListClick(place.id)}
    >
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
      src: defaultMarker,
    }),
  });

  const selectedIconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: selectedMarker,
      scale: 1.25,
    }),
  });

  const iconFeatures = placesArr.map((place) => {
    const result = new Feature({
      geometry: new Point(
        transform(
          [place.properties.long, place.properties.lat],
          "EPSG:4326",
          "EPSG:3857",
        ),
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

  function highlightSelectedPlace(placeId) {
    iconFeatures.forEach((place) => {
      if (place.values_.id === placeId) {
        place.setStyle(selectedIconStyle);
      } else {
        place.setStyle(iconStyle);
      }
    });
  }

  function scrollToSelectedPlace(listNode, className) {
    const prevSelected = listNode.querySelector(
      `[class=${selectedPlaceRef.current}]`,
    );
    const placeNode = listNode.querySelector(`[class=${className}]`);
    if (prevSelected !== null) {
      prevSelected.style.backgroundColor = "white";
    }

    selectedPlaceRef.current = className;
    placeNode.style.backgroundColor = "hsl(0deg, 0%, 70%)";
    placeNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function handleListClick(placeId) {
    scrollToSelectedPlace(listRef.current, getClassName(placeId));
    highlightSelectedPlace(placeId);
  }

  function handleIconClick(pixel) {
    vectorLayer.getFeatures(pixel).then((features) => {
      const thisFeature = features.length ? features[0] : undefined;

      if (thisFeature !== undefined) {
        scrollToSelectedPlace(
          listRef.current,
          getClassName(thisFeature.values_.id),
        );
        highlightSelectedPlace(thisFeature.values_.id);
      }
    });
  }

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
          [
            -74.62539719128334, 45.32722229453976, -72.98818196154667,
            45.77164629360345,
          ],
          "EPSG:4326",
          "EPSG:3857",
        ),
      }),
    });

    map.on("click", (e) => {
      handleIconClick(e.pixel);
    });

    return () => map.setTarget(null);
  }, [vectorLayer]);

  return (
    <>
      <div ref={mapRef} className={styles.map}>
        <div ref={listContainerRef} className={styles.list_container}>
          <button
            aria-label="fermer"
            onClick={() => toggleVisibility()}
            className={styles.places_list__close_button}
          >
            x
          </button>
          <ul ref={listRef} className={styles.places_list}>
            {placesListItems}
          </ul>
        </div>
        <button ref={buttonRef} onClick={() => toggleVisibility()}>
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
      <div className="word-container">
        <p>
          <strong>
            Avertissement: Malheureusement,{" "}
            <a href="https://donnees.montreal.ca/dataset/lieux-publics-climatises">
              les données
            </a>{" "}
            ustilisées par ce site ne sont pas toujours bonnes pour
            l'arrondissement. Par exemple, pour la Bibliothèque Benny,
            l'arrondissement dans les données est Ahuntsic-Cartierville. En
            réalité, elle se trouve dans Côte-des-Neiges-Notre-Dame-de-Grâce.
          </strong>
        </p>
      </div>
    </>
  );
}

export default Map;

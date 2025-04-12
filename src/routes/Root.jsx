import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import fetchPlaces from "../scripts/placesAPI";

let didInit = false;

function Root() {
  const [places, setPlaces] = useState([]);
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      fetchPlaces()
        .then((response) => {
          setPlaces(response);
          return response;
        })
        .then((response) => {
          const neighbourhoods = response
            .map((place) => {
              return place.properties.arrdondissement;
            })
            .filter((element) => typeof element === "string");
          setNeighbourhoods(new Set(neighbourhoods));
          return response;
        })
        .then((response) => {
          const accessibilityFeatures = response
            .map((place) => place.properties.accessibilite)
            .filter((element) => typeof element === "string");
          setAccessibilityFeatures(new Set(accessibilityFeatures));
        });
    }
  }, []);

  return (
    <>
      <NavBar isError={false} />
      <Outlet
        context={{
          places: places,
          neighbourhoods: neighbourhoods,
          accessibilityFeatures: accessibilityFeatures,
        }}
      />
    </>
  );
}

export default Root;

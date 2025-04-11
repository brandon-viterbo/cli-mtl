import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import fetchPlaces from "../scripts/placesAPI";

let didInit = false;

function Root() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      fetchPlaces().then((response) => setPlaces(response));
    }
  }, []);

  return (
    <>
      <NavBar isError={false} />
      <Outlet context={{ places: places }} />
    </>
  );
}

export default Root;

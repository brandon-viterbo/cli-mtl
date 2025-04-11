import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

let didInit = false;

function Root() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      //TODO: Implement fetchPlaces()
    }
  }, []);

  return (
    <>
      <NavBar isError={false} />
      <Outlet />
    </>
  );
}

export default Root;

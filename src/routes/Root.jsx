import { useEffect } from "react";
import { Outlet } from "react-router-dom";

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
      <h1>Cli-MTL</h1>
      <Outlet />
    </>
  );
}

export default Root;

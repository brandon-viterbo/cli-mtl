import NavBar from "../components/NavBar/NavBar";

function Erreur() {
  return (
    <>
      <NavBar isError={true} />
      <h2>404 Error Not found</h2>
    </>
  );
}

export default Erreur;

import NavBar from "../components/NavBar/NavBar";

function Erreur() {
  return (
    <>
      <NavBar isError={true} />
      <header>
        <h1>404 Error Not found</h1>
      </header>
    </>
  );
}

export default Erreur;

import { useOutletContext } from "react-router-dom";

function LaCarte() {
  const context = useOutletContext();

  console.log(context.places);

  return (
    <>
      <h2>Les Lieux Publics Climatisés à Montréal</h2>
      <p>Quelques endroit</p>
    </>
  );
}

export default LaCarte;

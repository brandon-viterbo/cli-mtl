import backupPlaces from "../resources/lieux_publics_climatises.json";

const places =
  "https://donnees.montreal.ca/dataset/c7ed69e0-a265-4e8b-a1fc-cf4aa8de4a6b/resource/8103851f-1887-4ff3-b0c0-9c2a53f3af08/download/lieux_publics_climatises.geojson";

async function fetchPlaces() {
  let result = await fetch(places)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  if (result !== undefined) {
    result = result.features.map((place) => {
      return { ...place, id: crypto.randomUUID() };
    });
  } else {
    result = backupPlaces.features.map((place) => {
      return { ...place, id: crypto.randomUUID() };
    });
  }

  return result;
}

export default fetchPlaces;

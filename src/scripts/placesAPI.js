const places =
  "https://montreal-prod.storage.googleapis.com/resources/8103851f-1887-4ff3-b0c0-9c2a53f3af08/lieux_publics_climatises.geojson?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=test-datapusher-delete%40amplus-data.iam.gserviceaccount.com%2F20250409%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250409T162703Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&x-goog-signature=5deddfb17bc72ec7156d79b3f0ebd8a6bccca7793bdd91ed5b8bf3ac9977fb9a80697baa40ebed2e94b6ef4c4ff4f1b2e78ba18d8fb3c16911c73a3710ca1f8ea1b263152c4fabc6db786f7a5dbca8c0eb1d3efead2090f88befbe95b6447774151b9126eca92e0a9fbab78b27f07abeec249f1f31bfa78842a9d78bf6861ebefaa4793715f93d1033355a791fc98761a728b111058f56ccf9196a29282479042edede6f5b93d42bfeb1f2d587b55d24c6d7c89a9c4ac3844b4eae80d12aaee14a7e54026dc0ec65f8118c6ddd31554d920d4d429fbf3c971d7c3a17774099f43f2f1f8426ed70af82e468eac9652cd73681e0f92ea4c3013c4f39388a909350";

async function fetchPlaces() {
  const result = await fetch(places)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return result.features;
}

export default fetchPlaces;

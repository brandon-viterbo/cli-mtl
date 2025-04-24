import backupPlaces from "../resources/lieux_publics_climatises.json";

const places =
  "https://montreal-prod.storage.googleapis.com/resources/8103851f-1887-4ff3-b0c0-9c2a53f3af08/lieux_publics_climatises.geojson?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=test-datapusher-delete%40amplus-data.iam.gserviceaccount.com%2F20250416%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250416T220050Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&x-goog-signature=ae07c0b19c7fca18a44078ffa06bde51e3d31adb3f9ea29572c95b0416d3fc1f7ae5ca700922941e2234eb34fd5c02af8d0a582c647638e3722bcbf81672c2ad5584129cef5b617a190daf102b706c6bffb6ce1606650f1267e83b3814174c9a6188f75c80b3f5de6153f09d44ece00233e79b8ceea32bf3ee8c29613951bcc73b61661124d91efca5b236926e02f0b78d8463df8780c26d88dd362a8c36b29e30b866cf350d58cd8eaf05d9427dc33195eb0a2f2c4851304b3ef3bd65e7ac67a92a9c3670d6a722685c7af2597424ed95aeca6989e41eeaabbd468c03a0da21b73f459e1994e67866e19e5e7b1eacfbfacaefdd5c13d006822340441e7b6e8c";

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

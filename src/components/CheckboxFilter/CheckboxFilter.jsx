import { removeWhiteSpace } from "../../scripts/utils";
import styles from "./CheckboxFilter.module.css"

function CheckboxFilter({ item, setFilter }) {
  function handleClick(e, item) {
    console.log(item);

    if (e.target.checked) {
      setFilter((prev) => new Set([...prev, item]));
    } else {
      setFilter((prev) => new Set([...prev].filter((x) => x !== item)));
    }
  }

  return (
    <div className={styles.checkbox_filter}>
      <input
        type="checkbox"
        id={removeWhiteSpace(item)}
        name={removeWhiteSpace(item)}
        value={item}
        onChange={(e) => handleClick(e, item)}
      />
      <label htmlFor={removeWhiteSpace(item)}>{item}</label>
    </div>
  );
}

export default CheckboxFilter;

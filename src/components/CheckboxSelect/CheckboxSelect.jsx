import { removeWhiteSpace } from "../../scripts/utils";

function CheckboxSelect({ item }) {
  return (
    <div key={removeWhiteSpace(item)}>
      <input
        type="checkbox"
        id={removeWhiteSpace(item)}
        name={removeWhiteSpace(item)}
        value={item}
      />
      <label htmlFor={removeWhiteSpace(item)}>{item}</label>
    </div>
  );
}

export default CheckboxSelect;

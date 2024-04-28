import { useEffect, useState, useRef } from "react";
import "./input.css";

export default function useSelectOptions(
  options = [],
  placeholder = "",
  minLength = 0
) {
  const [value, setValue] = useState("");
  const optionsList = useRef();

  const input = (
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        onChange={handleOnChange}
        onFocus={() => optionsList.current.classList.toggle("hidden")}
        onBlur={() => optionsList.current.classList.toggle("hidden")}
        placeholder=""
        data-placeholder={placeholder}
        value={value}
        minLength={minLength}
        required
      />
      <span className="placeholder">{placeholder}</span>
      <div ref={optionsList} className="options-list box-shadow hidden">
        {renderOptions()}
      </div>
    </div>
  );

  function handleOnChange(e) {
    setValue(e.target.value);
  }

  function renderOptions() {
    let filteredOptions = options.filter((option) =>
      option.toString().toLowerCase().includes(value.toLowerCase())
    );
    return filteredOptions.sort().map((option) => {
      return (
        <button
          key={option}
          className="option-wrapper flex-row align-center"
          onMouseDown={() => setValue(option)}
        >
          {option}
        </button>
      );
    });
  }

  return { value, input, setValue };
}

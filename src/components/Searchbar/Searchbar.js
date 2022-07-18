import PropTypes from "prop-types";
import { useState } from "react";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name);

    reset();
  };
  const reset = () => {
    setName("");
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s["SearchForm-button"]}>
          <span className={s["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          className={s["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;

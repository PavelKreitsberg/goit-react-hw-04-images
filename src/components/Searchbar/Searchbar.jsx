import { useState } from 'react';

import { BiSearchAlt2 } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import css from '../Searchbar/Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    onSubmit(inputValue.trim());

    setInputValue('');
  };

  return (
    <div className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <IconContext.Provider value={{ size: '32px' }}>
            <BiSearchAlt2 />
          </IconContext.Provider>
        </button>
        <input
          className={css.SearchForm_input}
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

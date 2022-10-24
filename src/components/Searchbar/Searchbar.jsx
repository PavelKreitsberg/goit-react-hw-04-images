import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import css from '../Searchbar/Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.inputValue);

    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <IconContext.Provider value={{ size: '32px' }}>
              <BiSearchAlt2 />
            </IconContext.Provider>
          </button>
          <input
            className={css.SearchForm_input}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

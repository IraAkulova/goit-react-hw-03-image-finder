import React, { Component } from 'react';
import css from '../searchbar/Searchbar.module.css'

export class Searchbar extends Component {
    state = {
      query: ''
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return alert('enter search query');
    };
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({query: ''});
  };

    render() {
      return (
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
              value={this.state.query}
            />
          </form>
        </header>
      );
  }
}

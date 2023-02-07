import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import initialState from './initialState';
import useForm from 'hooks/useForm';
import style from './Searchbar.module.css';

function SearchForm({ onSubmit }) {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });

  const { search } = state;

  return (
    <div className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button className={style.SearchFormButton} type="submit">
          <span>
            <AiOutlineSearch color="black" size="2rem" />
          </span>
        </button>

        <input
          className={style.SearchFormInput}
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

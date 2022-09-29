import React, { useState } from 'react';
import './index.css';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(search);
  };

  const onChangehandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Search people"
        value={search}
        onChange={onChangehandler}
        className="input"></input>
      <input type="submit" value="search" style={{ display: 'none' }} />
    </form>
  );
};

export default SearchInput;

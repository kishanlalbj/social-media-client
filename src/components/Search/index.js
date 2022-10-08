import React, { useState } from 'react';
import Select from 'react-select';
import './index.css';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const [options, setOptions] = useState([
    { value: 'Kishan', label: 'Kishan' },
    { value: 'Radhe', label: 'Radhe' }
  ]);

  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(search);
  };

  const onChangehandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Select defaultValue={selectedOption} options={options}></Select>
      {/* <input
        type="text"
        placeholder="Search people"
        value={search}
        onChange={onChangehandler}
        className="input"></input>
      <input type="submit" value="search" style={{ display: 'none' }} /> */}
    </form>
  );
};

export default SearchInput;

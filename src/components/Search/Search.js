import React from 'react';
import { Autocomplete, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';

const Search = (props) => {
  const { loading, options, onSearch, onOptionClick } = props;

  const handleClick = (e) => {
    if (!options) return null;
    onOptionClick(options[e.target.value].id);
  };

  return (
    <Autocomplete
      freeSolo={true}
      disableClearable={true}
      getOptionLabel={(option) => option.title}
      noOptionsText={'No Users found'}
      options={options}
      onChange={handleClick}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Users"
          onChange={(e) => onSearch(e.target.value)}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
            type: 'search'
          }}></TextField>
      )}></Autocomplete>
  );
};

export default Search;

import React from 'react';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListboxComponent from './listbox';
import { Typography } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

const Automcomplete = (params) => {
  return (
    <Autocomplete 
      id="company-name-box"
      size="small"
      disableListWrap
      openOnFocus={false}
      ListboxComponent={ListboxComponent}
      renderGroup={(params) => [
        <ListSubheader key={params.key} component="div">
          {params.key}
        </ListSubheader>,
        params.children,
      ]}
      options={params.options}
      getOptionLabel={option => option}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onChange={params.onNameSearchChange}
      renderInput={
        ({ inputProps, ...ps}) => {
        inputProps.autocomplete = 'new-password'
        return <TextField {...ps} label={params.labelName} variant="outlined" inputProps={inputProps} />
      }
      }
    />
  );
}

export default Automcomplete
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
      openOnFocus
      disableListWrap
      ListboxComponent={ListboxComponent}
      renderGroup={(params) => [
        <ListSubheader key={params.key} component="div">
          {params.key}
        </ListSubheader>,
        params.children,
      ]}
      options={params.companyNames}
      groupBy={(option) => option[0].toUpperCase()}
      getOptionLabel={option => option}
      renderInput={(params) => <TextField {...params} label="Company Name" variant="outlined" />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onChange={params.onNameSearchChange}
      renderInput={
        ({ inputProps, ...params}) => {
        inputProps.autocomplete = 'new-password'
        return <TextField {...params} label="Company Name" variant="outlined" inputProps={inputProps} />
      }
      }
    />
  );
}

export default Automcomplete
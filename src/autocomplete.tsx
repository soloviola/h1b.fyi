import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListboxComponent from './Listbox';
import { Typography } from '@material-ui/core';

import Autocomplete, { RenderGroupParams } from '@material-ui/lab/Autocomplete';

const Automcomplete = (
  params: { 
    companyNames: Array<string>, 
    onNameSearchChange: (event: ChangeEvent<{}>, val: any) => any 
  }) => {

  return (
    <Autocomplete 
      id="company-name-box"
      size="small"
      openOnFocus
      disableListWrap
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      renderGroup={(params: RenderGroupParams) => [
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
    />
  );
}

export default Automcomplete
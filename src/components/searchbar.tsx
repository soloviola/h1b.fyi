import React from 'react';
import TextField from '@material-ui/core/TextField';
import CompanyAutoComplete from './autocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { STATES, MAJOR_CITIES, JOB_TITLES } from '../Consts';

const Searchbar = (params: any) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
          <Autocomplete
            size="small"
            freeSolo
            selectOnFocus
            options={JOB_TITLES}
            getOptionLabel={option => option}
            onInputChange={params.onTitleChange}
            renderInput={
              ({ inputProps, ...params}) => {
                (inputProps as any).autocomplete = 'new-password'
              return <TextField {...params} autoFocus label="Job Title" variant="outlined" inputProps={inputProps} />
            }
            }
          />
      </Grid>
      <Grid item xs={3}>
          <CompanyAutoComplete 
            companyNames={params.companyNames}
            onNameSearchChange={params.onNameSearchChange}
          />
      </Grid>
      <Grid item xs={3}>
          <Autocomplete
            size="small"
            freeSolo
            selectOnFocus
            options={MAJOR_CITIES}
            getOptionLabel={option => option}
            onInputChange={params.onCityChange}
            renderInput={
              ({ inputProps, ...params}) => {
                (inputProps as any).autocomplete = 'new-password'
              return <TextField {...params} label="City" variant="outlined" inputProps={inputProps} />
            }
            }
          />
      </Grid>
      <Grid item xs={2}>
          <Autocomplete
            size="small"
            selectOnFocus
            options={STATES}
            getOptionLabel={option => option}
            onInputChange={params.onStateChange}
            renderInput={
              ({ inputProps, ...params}) => {
                (inputProps as any).autocomplete = 'new-password'
              return <TextField {...params} label="State" variant="outlined" inputProps={inputProps} />
            }
            }
          />
      </Grid>
      <Grid item xs={1}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={params.searchByCriteria}
          disabled={params.querying}
          > Search </Button>
      </Grid>
    </Grid>
  );
}

export default Searchbar
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import VisualizedAutoComplete from './autocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { STATES, JOB_TITLES } from '../Consts';

const Searchbar = (params: any) => {
  return (
    <Grid container spacing={1}>
      <Grid container spacing={1}>
        <Grid item md={3} sm={12} xs={12}>
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
              }}
            />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
            <VisualizedAutoComplete 
              labelName={"Company"}
              options={params.companyNames}
              onNameSearchChange={params.onNameSearchChange}
            />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <VisualizedAutoComplete 
            labelName={"City"}
            options={params.cityNames}
            onNameSearchChange={params.onCityChange}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
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
      </Grid>
      <Box m={0.5} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={params.searchByCriteria}
            disabled={params.querying}
            > Search </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Searchbar
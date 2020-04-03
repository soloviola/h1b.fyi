import React, { Component, ChangeEvent } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Autocomplete, { RenderGroupParams } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import H1bTable from './h1bTable';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListboxComponent from './Listbox';
import { Typography } from '@material-ui/core';

class App extends Component {
  state = {
    companyNames: [],
    searchResult: []
  }

  componentDidMount() {
    fetch('/getCompanyNames')
      .then(res => res.json())
      .then(companyNames => { 
        companyNames = companyNames.filter((name: Array<any>) => {
          if (!name || name.length == 0) {
            return false
          }
          if (typeof name[0] == "string" && name[0].length > 0) {
            return true
          }
          return false
        }).map((name: Array<String>) => {
            return name[0]
        }).sort((a: string, b: string) => a.toUpperCase().localeCompare(b.toUpperCase()));
        this.setState({ companyNames })
      });
  }

  onNameSearchChange = (event: ChangeEvent<{}>, val: any) => {
    console.log(val)
    if (!val) {
      return this.setState({ searchResult: [] })
    }
    let name = val
    fetch('/getRecordByCompanyName?' + new URLSearchParams({ name }))
      .then(res => res.json())
      .then(searchResult => {
        console.log(searchResult);
        return this.setState({ searchResult })
      });
  }
  render() {
    return (
      <div className="App">
        <h1>H1b Data Analysis</h1>
        <Grid container spacing={3}>
          <Grid item xs >
          </Grid>
          <Grid item xs={6}>
            <Autocomplete 
              id="company-name-box"
              size="small"
              style={{ width: 300 }}
              disableListWrap
              ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
              renderGroup={(params: RenderGroupParams) => [
                <ListSubheader key={params.key} component="div">
                  {params.key}
                </ListSubheader>,
                params.children,
              ]}
              options={this.state.companyNames}
              groupBy={(option) => option[0].toUpperCase()}
              getOptionLabel={option => option}
              renderInput={(params) => <TextField {...params} label="Company Name" variant="outlined" />}
              renderOption={(option) => <Typography noWrap>{option}</Typography>}
              onChange={this.onNameSearchChange}
            />
            <H1bTable searchResult={this.state.searchResult} />
          </Grid>
          <Grid item xs >
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
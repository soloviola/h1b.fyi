import React, { Component, ChangeEvent } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Autocomplete from './autocomplete';
import H1bTable from './h1bTable';

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
        console.log('mounted')
      });
  }

  onNameSearchChange = (event: ChangeEvent<{}>, val: any) => {
    if (!val) {
      return this.setState({ searchResult: [] })
    }
    let name = val
    fetch('/getRecordByCompanyName?' + new URLSearchParams({ name }))
      .then(res => res.json())
      .then(searchResult => {
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
          <Grid item xs={10}>
            <Autocomplete 
              companyNames={this.state.companyNames}
              onNameSearchChange={this.onNameSearchChange}
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
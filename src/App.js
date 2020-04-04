import React, { Component, ChangeEvent } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CompanyAutoComplete from './autocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import H1bTable from './h1bTable';
import { STATES, MAJOR_CITIES } from './Consts';

class App extends Component {
  state = {
    companyNames: [],
    searchResult: [],
    searchCompanyName: "",
    searchCompanyState: "",
    searchCompanyCity: "",
    searchTitle: ""
  }

  componentDidMount() {
    fetch('/getCompanyNames')
      .then(res => res.json())
      .then(companyNames => { 
        companyNames = companyNames.filter((name) => {
          if (!name || name.length == 0) {
            return false
          }
          if (typeof name[0] == "string" && name[0].length > 0) {
            return true
          }
          return false
        }).map((name) => {
            return name[0]
        }).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
        this.setState({ companyNames })
        console.log('mounted')
      });
  }

  onNameSearchChange = (event, val) => {
    this.setState({searchCompanyName: val || ""})
  }
  onCityChange = (event, val) => {
    this.setState({searchCompanyCity: val || ""})
  }
  onStateChange = (event, val) => {
    this.setState({searchCompanyState: val || ""})
  }
  onTitleChange = (event, val) => {
    this.setState({searchTitle: val || ""})
  }
  searchByCriteria = () => {
    const searchParams = {
      companyName: this.state.searchCompanyName,
      state: this.state.searchCompanyState,
      city: this.state.searchCompanyCity,
      title: this.state.searchTitle
    }
    console.log(searchParams)
    fetch('/getRecordsByCriteria?' + new URLSearchParams(searchParams))
      .then(res => res.json())
      .then(searchResult => {
        console.log(searchResult)
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
            <Grid container spacing={1}>
              <Grid item xs={3}>
                {/* <form noValidate autoComplete="off"> */}
                  <CompanyAutoComplete 
                    companyNames={this.state.companyNames}
                    onNameSearchChange={this.onNameSearchChange}
                  />
                  {/* </form> */}
              </Grid>
              <Grid item xs={3}>
                 {/* <form noValidate autoComplete="off"> */}
                  <Autocomplete
                    size="small"
                    freeSolo
                    selectOnFocus
                    options={MAJOR_CITIES}
                    getOptionLabel={option => option}
                    onChange={this.onCityChange}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                  />
                {/* </form> */}
              </Grid>
              <Grid item xs={2}>
                {/* <form noValidate autoComplete="off"> */}
                  <Autocomplete
                    size="small"
                    selectOnFocus
                    options={STATES}
                    getOptionLabel={option => option}
                    onChange={this.onStateChange}
                    renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                  />
                {/* </form> */}
              </Grid>
              <Grid item xs={3}>
                {/* <form noValidate autoComplete="off"> */}
                  <Autocomplete
                    size="small"
                    freeSolo
                    selectOnFocus
                    options={STATES}
                    getOptionLabel={option => option}
                    onChange={this.onTitleChange}
                    renderInput={(params) => <TextField {...params} label="Title" variant="outlined" />}
                  />
                {/* </form> */}
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" color="primary" onClick={this.searchByCriteria}> Search </Button>
              </Grid>
            </Grid>
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
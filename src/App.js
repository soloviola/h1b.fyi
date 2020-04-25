import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Searchbar from './components/searchbar';
import H1bTable from './components/h1bTable';

class App extends Component {
  state = {
    companyNames: [],
    cityNames: [],
    searchResult: [],
    searchCompanyName: "",
    searchCompanyState: "",
    searchCompanyCity: "",
    searchTitle: "",
    querying: false
  }

  componentDidMount() {
    fetch('/getCompanyNames')
      .then(res => res.json())
      .then(companyNames => {
        this.setState({ "companyNames": this.parseResult(companyNames)})
      });
    fetch('/getCityNames')
      .then(res => res.json())
      .then(cityNames => {
        this.setState({ "cityNames": this.parseResult(cityNames) })
      });
  }

  parseResult = (results) => {
    results = results.filter((name) => {
      if (!name || name.length === 0) {
        return false
      }
      if (typeof name[0] === "string" && name[0].length > 0) {
        return true
      }
      return false
    })
    return results
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
    this.setState({querying: true})
    const searchParams = {
      companyName: this.state.searchCompanyName,
      state: this.state.searchCompanyState,
      city: this.state.searchCompanyCity,
      title: this.state.searchTitle
    }
    fetch('/getRecordsByCriteria?' + new URLSearchParams(searchParams))
      .then(res => res.json())
      .then(searchResult => {
        console.log("results = ", searchResult.length)
        this.setState({ searchResult, querying: false })
      });
  }

  render() {
    return (
      <div className="App">
        <h1>H1b Data Analysis</h1>
        <Grid container spacing={3}>
          <Grid item xs >
          </Grid>
          <Grid item xl={8} xs={8}>
            <Searchbar 
              companyNames={this.state.companyNames} 
              cityNames={this.state.cityNames}
              onNameSearchChange={this.onNameSearchChange}
              onCityChange={this.onCityChange}
              onStateChange={this.onStateChange}
              onTitleChange={this.onTitleChange}
              searchByCriteria={this.searchByCriteria}
              querying={this.state.querying}/>
            <H1bTable 
              searchResult={this.state.searchResult} 
              querying={this.state.querying}/>
          </Grid>
          <Grid item xs >
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
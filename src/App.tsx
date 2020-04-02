import React, { Component, ChangeEvent } from 'react';
import './App.css';
import { COLUMN_INDEX } from './Consts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  state = {
    companyNames: [], 
    searchResult: []
  }

  componentDidMount() {
    fetch('/getCompanyNames')
      .then(res => res.json())
      .then(companyNames => this.setState({ companyNames }));
  }

  onNameSearchChange = (event: ChangeEvent<{}>, val: any) => {
    console.log(val)
    if (!val) {
      return this.setState({searchResult: []})
    }
    let name = val[0]
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
        <h1>Search</h1>
        <Autocomplete
          id="company-name-box"
          options={this.state.companyNames}
          getOptionLabel={(option) => option[0]}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Company Name" variant="outlined" />}
          onChange={this.onNameSearchChange}
        />
        {this.state.searchResult.map((item, key) => <li key={item[0]}>
          {item[COLUMN_INDEX['JOB_TITLE']]} | {item[COLUMN_INDEX['EMPLOYER_NAME']]} | {item[COLUMN_INDEX['PREVAILING_WAGE_1']]}  </li>)}
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const COLUMN_INDEX = {
  CASE_NUMBER: 0,
  CASE_STATUS: 1,
  CASE_SUBMITTED: 2,
  DECISION_DATE: 3,
  ORIGINAL_CERT_DATE: 4,
  VISA_CLASS: 5,
  JOB_TITLE: 6,
  SOC_CODE: 7,
  SOC_TITLE: 8,
  FULL_TIME_POSITION: 9,
  PERIOD_OF_EMPLOYMENT_START_DATE: 10,
  PERIOD_OF_EMPLOYMENT_END_DATE: 11,
  TOTAL_WORKER_POSITIONS: 12,
  NEW_EMPLOYMENT: 13,
  CONTINUED_EMPLOYMENT: 14,
  CHANGE_PREVIOUS_EMPLOYMENT: 15,
  NEW_CONCURRENT_EMPLOYMENT: 16,
  CHANGE_EMPLOYER: 17,
  AMENDED_PETITION: 18,
  EMPLOYER_NAME: 19,
  EMPLOYER_BUSINESS_DBA: 20,
  EMPLOYER_ADDRESS1: 21,
  EMPLOYER_ADDRESS2: 22,
  EMPLOYER_CITY: 23,
  EMPLOYER_STATE: 24,
  EMPLOYER_POSTAL_CODE: 25,
  EMPLOYER_COUNTRY: 26,
  EMPLOYER_PROVINCE: 27,
  EMPLOYER_PHONE: 28,
  EMPLOYER_PHONE_EXT: 29,
  NAICS_CODE: 30,
  AGENT_REPRESENTING_EMPLOYER: 31,
  AGENT_ATTORNEY_LAW_FIRM_BUSINESS_NAME: 32,
  AGENT_ATTORNEY_ADDRESS1: 33,
  AGENT_ATTORNEY_ADDRESS2: 34,
  AGENT_ATTORNEY_CITY: 35,
  AGENT_ATTORNEY_STATE: 36,
  AGENT_ATTORNEY_POSTAL_CODE: 37,
  AGENT_ATTORNEY_COUNTRY: 38,
  AGENT_ATTORNEY_PROVINCE: 39,
  AGENT_ATTORNEY_PHONE: 40,
  AGENT_ATTORNEY_PHONE_EXT: 41,
  STATE_OF_HIGHEST_COURT: 42,
  NAME_OF_HIGHEST_STATE_COURT: 43,
  WORKSITE_WORKERS_1: 44,
  SECONDARY_ENTITY_1: 45,
  SECONDARY_ENTITY_BUSINESS_NAME_1: 46,
  WORKSITE_ADDRESS1_1: 47,
  WORKSITE_ADDRESS2_1: 48,
  WORKSITE_CITY_1: 49,
  WORKSITE_COUNTY_1: 50,
  WORKSITE_STATE_1: 51,
  WORKSITE_POSTAL_CODE_1: 52,
  WAGE_RATE_OF_PAY_FROM_1: 53,
  WAGE_RATE_OF_PAY_TO_1: 54,
  WAGE_UNIT_OF_PAY_1: 55,
  PREVAILING_WAGE_1: 56,
  PW_UNIT_OF_PAY_1: 57,
  PW_TRACKING_NUMBER_1: 58,
  PW_WAGE_LEVEL_1: 59,
  PW_OES_YEAR_1: 60,
  PW_OTHER_SOURCE_1: 61,
  PW_NON_OES_YEAR_1: 62,
  PW_SURVEY_PUBLISHER_1: 63,
  PW_SURVEY_NAME_1: 64,
}

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

  onNameSearchChange = (event, val) => {
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
          {item[COLUMN_INDEX['JOB_TITLE']]} | {item[COLUMN_INDEX['EMPLOYER_NAME']]} | {item[COLUMN_INDEX['PREVAILING_WAGE_1']]} | {item[COLUMN_INDEX['JOB_WAGE_UNIT_OF_PAY_1TITLE']]}  </li>)}
      </div>
    );
  }
}

export default App;
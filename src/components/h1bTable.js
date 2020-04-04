import React, { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { COLUMN_INDEX } from '../Consts';
import MaterialTable from 'material-table';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {
  createStyles,
  makeStyles
} from "@material-ui/core/styles";

const tableColumns = [
  { field: "jobTitle", title: "Job Title", cellStyle: { width: "27%" }, headerStyle: { width: "27%" }},
  { field: "employerName", title: "Company Name", cellStyle: { width: "27%" }, headerStyle: { width: "27%" }},
  { field: "city", title: "City", cellStyle: { width: "7%" }, headerStyle: { width: "7%" }},
  { field: "state", title: "State", cellStyle: { width: "7%" }, headerStyle: { width: "7%" }},
  { field: "wage", title: "Wage", type: 'numeric',cellStyle: { minWidth: "250" }, headerStyle: { minWidth: "250" }}
];

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const H1bTable = (params) => {
  const classes = useStyles();

  const formattedResult = params.searchResult.map((item, key) => {
    let wage = 0
    if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]
    }
    else if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]
    }
    else {
      wage = item[COLUMN_INDEX['PREVAILING_WAGE_1']]
    }
    if (item[COLUMN_INDEX['WAGE_UNIT_OF_PAY_1']] === 'Hour') {
      wage = -1
    }
    return {
      jobTitle: item[COLUMN_INDEX["JOB_TITLE"]],
      employerName: item[COLUMN_INDEX['EMPLOYER_NAME']],
      city: item[COLUMN_INDEX["WORKSITE_CITY_1"]],
      state: item[COLUMN_INDEX["WORKSITE_STATE_1"]],
      wage
    }
  }).filter((item) => { // remove hour pay for now
    if (item.wage === -1) {
      return false
    }
    return true
  })
  const tableVisibility = params.querying ? "none": "block"
  const queryingLabelDisplay = params.querying ? "block": "none"
  return (
    <Box>
      <Box display={queryingLabelDisplay} className={classes.paper}>
          <CircularProgress />
      </Box>
      <Box display={tableVisibility}>
        <Paper className={classes.paper}>
          <MaterialTable
            icons={tableIcons}
            title=""
            columns={tableColumns}
            data={formattedResult}
            options={{
              sorting: true, 
              filtering: true,
              padding: 'dense',
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
              paginationType: "normal"
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default H1bTable